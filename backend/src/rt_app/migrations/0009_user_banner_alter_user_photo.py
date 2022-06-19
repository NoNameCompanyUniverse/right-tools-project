# Generated by Django 4.0.4 on 2022-06-17 14:08

import django.core.validators
from django.db import migrations, models
import image_compressor.storages
import rt_app.users.services
import rt_app.common.services


class Migration(migrations.Migration):

    dependencies = [
        ('rt_app', '0008_remove_project_user_project_admin'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='banner',
            field=models.ImageField(null=True, storage=image_compressor.storages.OverwriteStorage, upload_to=rt_app.users.services.get_path_to_banner, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg']), rt_app.common.services.validate_size_image]),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=models.ImageField(null=True, storage=image_compressor.storages.OverwriteStorage, upload_to=rt_app.users.services.get_path_to_photo, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg']), rt_app.common.services.validate_size_image]),
        ),
    ]
