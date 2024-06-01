import os, math
import torch
import torch.nn as nn
import torch.nn.functional as F

import torch.optim as optim
# from metrics import MetronAtK

from copy import deepcopy
import random
import pandas as pd

from torch.utils.data import DataLoader, Dataset
from sklearn.model_selection import train_test_split

class NeuralCF(nn.Module):
    def __init__(self, config):
        super(NeuralCF, self).__init__()
        num_users = config['num_users']
        num_items = config['num_items']
        embed_dim = config['embed_dim']
        hidden_dims = config['hidden_dims']

        self.user_embedding = nn.Embedding(num_users + 1, embed_dim)
        self.item_embedding = nn.Embedding(num_items + 1, embed_dim)
        self.fc_layers = nn.ModuleList()
        input_dim = 2 * embed_dim
        for dim in hidden_dims:
            self.fc_layers.append(nn.Linear(input_dim, dim))
            input_dim = dim
        self.output_layer = nn.Linear(input_dim, 1)

    def forward(self, user_ids, item_ids):
        user_embed = self.user_embedding(user_ids)
        item_embed = self.item_embedding(item_ids)
        x = torch.cat([user_embed, item_embed], dim=-1)
        for layer in self.fc_layers:
            x = F.relu(layer(x))
        x = self.output_layer(x)
        return x

class CPLayer(nn.Module):
    def __init__(self, input_dim, output_dim, rank):
        super(CPLayer, self).__init__()
        self.rank = rank
        self.factor_input = nn.Parameter(torch.randn(input_dim, rank))
        self.factor_output = nn.Parameter(torch.randn(output_dim, rank))
        self.weight = nn.Parameter(torch.ones(rank))

        # 初始化
        nn.init.kaiming_uniform_(self.factor_input, a=math.sqrt(5))
        nn.init.kaiming_uniform_(self.factor_output, a=math.sqrt(5))
        nn.init.constant_(self.weight, 0.1)

    def forward(self, x):
        # 张量乘积操作
        interaction = torch.matmul(x, self.factor_input)  # [batch_size, rank]
        interaction = interaction * self.weight  # 广播权重
        output = torch.matmul(interaction, self.factor_output.t())  # [batch_size, output_dim]
        return F.relu(output)  # 添加ReLU非线性

class TensorNet(nn.Module):
    def __init__(self, config):
        super(TensorNet, self).__init__()
        num_users = config['num_users']
        num_items = config['num_items']
        embed_dim = config['embed_dim']
        hidden_dims = config['hidden_dims']

        self.user_embedding = nn.Embedding(num_users + 1, embed_dim)
        self.item_embedding = nn.Embedding(num_items + 1, embed_dim)
        self.fc_layers = nn.ModuleList()
        
        rank = 4 

        input_dim = 2 * embed_dim
        for dim in hidden_dims:
            self.fc_layers.append(CPLayer(input_dim, dim, rank=rank))
            input_dim = dim
        self.output_layer = nn.Linear(input_dim, 1)

    def forward(self, user_ids, item_ids):
        user_embed = self.user_embedding(user_ids)
        item_embed = self.item_embedding(item_ids)
        x = torch.cat([user_embed, item_embed], dim=-1)
        for layer in self.fc_layers:
            x = F.relu(layer(x))
        x = self.output_layer(x)
        return x

class Engine(object):

    def __init__(self, config) -> None:
        
        self.config = config
        self.opt = use_optimizer(self.model, config)
        self.crit = torch.nn.MSELoss()

    def train_single_batch(self, users, items, ratings):
        assert hasattr(self, 'model'), 'Please specify the exact model !'
        if self.config['use_cuda'] is True:
            users, items, ratings = users.cuda(), items.cuda(), ratings.cuda()
        self.opt.zero_grad()
        ratings_pred = self.model(users, items).squeeze()
        loss = self.crit(ratings_pred, ratings)
        loss.backward()
        self.opt.step()
        loss = loss.item()
        return loss
    
    def train_an_epoch(self, train_loader, epoch_id):
        assert hasattr(self, 'model'), 'Please specify the exact model !'
        self.model.train()
        total_loss = 0
        for batch_id, batch in enumerate(train_loader):
            assert isinstance(batch[0], torch.LongTensor)
            user, item, rating = batch[0], batch[1], batch[2]
            rating = rating.float()
            loss = self.train_single_batch(user, item, rating)
            print('[Training Epoch {}] Batch {}, Loss {}'.format(epoch_id, batch_id, loss))
            total_loss += loss
        # self._writer.add_scalar('model/loss', total_loss, epoch_id)

    def evaluate(self, test_loader, epoch_id=None):
        self.model.eval()  # Set model to evaluation mode
        total_loss = 0
        total_count = 0

        with torch.no_grad():  # No need to track gradients
            for user_ids, item_ids, ratings in test_loader:
                if self.config['use_cuda']:
                    user_ids, item_ids, ratings = user_ids.cuda(), item_ids.cuda(), ratings.cuda()

                predictions = self.model(user_ids, item_ids)
                loss = F.mse_loss(predictions.squeeze(), ratings, reduction='sum')
                total_loss += loss.item()
                total_count += user_ids.size(0)

        mse = total_loss / total_count
        rmse = mse ** 0.5
        print(f'Evaluation - MSE: {mse}, RMSE: {rmse}')
        return mse, rmse

    def save(self, alias, epoch_id, mse, rmse):
        assert hasattr(self, 'model'), 'Please specify the exact model !'
        model_dir = self.config['model_dir'].format(alias, epoch_id, mse, rmse)
        save_checkpoint(self.model, model_dir)

class NeuCFEngine(Engine):
    def __init__(self, config):
        self.model = NeuralCF(config)
        if config['use_cuda'] is True:
            use_cuda(True, config['device_id'])
            self.model.cuda()
        super(NeuCFEngine, self).__init__(config)

class TensNetEngine(Engine):
    def __init__(self, config):
        self.model = TensorNet(config)
        if config['use_cuda'] is True:
            use_cuda(True, config['device_id'])
            self.model.cuda()
        super(TensNetEngine, self).__init__(config)


def use_optimizer(network, params):
    if params['optimizer'] == 'sgd':
        optimizer = optim.SGD(network.parameters(),
                                    lr=params['sgd_lr'],
                                    momentum=params['sgd_momentum'],
                                    weight_decay=params['l2_regularization'])
    elif params['optimizer'] == 'adam':
        optimizer = optim.Adam(network.parameters(), 
                                    lr=params['adam_lr'],
                                    weight_decay=params['l2_regularization'])
    elif params['optimizer'] == 'rmsprop':
        optimizer = optim.RMSprop(network.parameters(),
                                    lr=params['rmsprop_lr'],
                                    alpha=params['rmsprop_alpha'],
                                    momentum=params['rmsprop_momentum'])
    return optimizer

def save_checkpoint(model, model_dir):
    os.makedirs(os.path.dirname(model_dir), exist_ok=True)

    torch.save(model.state_dict(), model_dir)
    
# Hyper params
def use_cuda(enabled, device_id=0):
    if enabled:
        assert torch.cuda.is_available(), 'CUDA is not available'
        torch.cuda.set_device(device_id)
    
def train(config, model):
    user_ids, item_ids, ratings = load_data('/home/sdust307/Disk2/lh/rec/movie_it/ratings.dat')

    # /home/sdust307/Disk2/lh/rec/movie_it/ratings.dat

    # max_user_id = max(user_ids)
    # max_item_id = max(item_ids)
    # print("Max user ID:", max_user_id)
    # print("Max item ID:", max_item_id)
    # exit()
    train_ids, test_ids, train_ratings, test_ratings = train_test_split(
        list(zip(user_ids, item_ids)), ratings, test_size=0.2, random_state=42)

    train_users, train_items = zip(*train_ids)
    test_users, test_items = zip(*test_ids)

    train_dataset = RatingDataset(train_users, train_items, train_ratings)
    test_dataset = RatingDataset(test_users, test_items, test_ratings)

    train_loader = DataLoader(train_dataset, batch_size=config['batch_size'], shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=config['batch_size'], shuffle=False)

    if model == 'NeuralCF':
        engine = NeuCFEngine(config)
    else:
        engine = TensNetEngine(config)
    
    res_mse, res_rmse = [], []

    for epoch in range(config['num_epoch']):
        print('Epoch {} starts !'.format(epoch))
        print('-' * 80)
        engine.train_an_epoch(train_loader, epoch_id=epoch)
        mse, rmse = engine.evaluate(test_loader, epoch_id=epoch)  # Assuming `evaluate` accepts a DataLoader
        # engine.save(config['alias'], epoch, mse, rmse)

        res_mse.append(format(mse, ".5f"))
        res_rmse.append(format(rmse, ".5f"))
    return res_mse, res_rmse

def count_parameters(model, trainable_only=True):
    """
    计算模型的参数量。
    
    参数:
    model (torch.nn.Module): 需要计算参数量的模型。
    trainable_only (bool): 如果为True，则只计算可训练的参数。
    
    返回:
    total_params (int): 模型的总参数量。
    """
    total_params = 0
    for name, param in model.named_parameters():
        # 检查这些参数是否属于嵌入层
        if 'embedding' not in name:
            if trainable_only and param.requires_grad:
                total_params += param.numel()
            elif not trainable_only:
                total_params += param.numel()
    return total_params

def count_NeurCF(config):
    model = NeuralCF(config)
    return count_parameters(model)

def count_TensNet(config):
    model = TensorNet(config)
    return count_parameters(model)

def get_param(config):
    param_TensNet = count_TensNet(config)
    param_NeurCF = count_NeurCF(config)
    
    rat = (param_NeurCF - param_TensNet) / param_NeurCF * 100
    rat = format(rat, ".2f")
    return float(rat), param_NeurCF, param_TensNet


class RatingDataset(Dataset):
    def __init__(self, user_ids, item_ids, ratings):
        self.user_ids = user_ids
        self.item_ids = item_ids
        self.ratings = ratings

    def __len__(self):
        return len(self.ratings)

    def __getitem__(self, idx):
        return self.user_ids[idx], self.item_ids[idx], self.ratings[idx]

def load_data(file_path):
    data = pd.read_csv(file_path, sep='::', engine='python', names=['userid', 'itemid', 'rating', 'timestamp'])
    return data['userid'].values - 1, data['itemid'].values - 1, data['rating'].values
    
if __name__ == '__main__':
    config = {'alias': '',
              'num_epoch': 5,
              'batch_size': 4096,
              'embed_dim':100,
              'hidden_dims':[64,32,16,8],
              'optimizer': 'adam',
              'adam_lr': 1e-3,
              'num_users': 6040,
              'num_items': 3952,
              'latent_dim': 8,
              'num_negative': 4,
              'l2_regularization': 0,  # 0.01
              'weight_init_gaussian': True,
              'use_cuda': False,
              'device_id': 0,
              'model_dir': './logs/NeuralCF{}_Epoch{}_MSE{:.4f}_RMSE{:.4f}.model'}
    # res_mse, res_rmse = train(config=config, model='TensNet')
    res_mse, res_rmse = 1.0, 0.8
    print("res_mse, res_rmse = " )
    print(res_mse)
    print(res_rmse)

    print(count_NeurCF(config=config))
    print(count_TensNet(config=config))
    
    print(get_param(config=config))
