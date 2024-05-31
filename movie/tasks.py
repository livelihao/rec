from __future__ import absolute_import, unicode_literals
from celery import shared_task
from time import sleep  # 假设用 sleep 来模拟长时间运行的训练过程
from movie.models import Progress

@shared_task
def test_train_model():
    for i in range(10):
        # 模拟长时间运行的任务
        sleep(1)
        # 假设这里更新了某个模型的训练进度
        # 可以使用 Django model 来存储进度信息
        Progress.objects.update_or_create(defaults={'progress': i * 10})
