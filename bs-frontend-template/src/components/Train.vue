<template>
    <div>
      <h1>Train Model</h1>
      <button @click="trainModel">Train</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      trainModel() {
        fetch('http://localhost:8000/api/train/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ config: this.getConfig() }),  // Define your getConfig method to return the config
        })
        .then(response => response.json())
        .then(data => {
          alert(data.status);
        })
        .catch(error => console.error('Error:', error));
      },
      getConfig() {
        return {
          alias: 'gmf_factor8neg4-implict',
          num_epoch: 200,
          batch_size: 1024,
          embed_dim: 100,
          hidden_dims: [64, 32, 16, 8],
          optimizer: 'adam',
          adam_lr: 1e-3,
          num_users: 6040,
          num_items: 3952,
          latent_dim: 8,
          num_negative: 4,
          l2_regularization: 0,
          weight_init_gaussian: true,
          use_cuda: false,
          device_id: 0,
          model_dir: 'checkpoints/{}_Epoch{}_HR{:.4f}_NDCG{:.4f}.model'
        };
      }
    }
  }
  </script>
  