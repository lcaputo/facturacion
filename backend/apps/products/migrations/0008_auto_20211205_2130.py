# Generated by Django 3.1.6 on 2021-12-06 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_auto_20211119_2122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplier',
            name='phone',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]
