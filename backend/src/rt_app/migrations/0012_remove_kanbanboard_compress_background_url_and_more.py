# Generated by Django 4.0.4 on 2022-06-22 12:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rt_app', '0011_delete_background_alter_document_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='kanbanboard',
            name='compress_background_url',
        ),
        migrations.RemoveField(
            model_name='kanbanboard',
            name='original_background_url',
        ),
        migrations.RemoveField(
            model_name='mindmap',
            name='compress_background_url',
        ),
    ]