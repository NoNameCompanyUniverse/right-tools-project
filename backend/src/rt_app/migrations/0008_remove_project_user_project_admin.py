# Generated by Django 4.0.4 on 2022-06-16 16:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rt_app', '0007_project_date_create'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='user',
        ),
        migrations.AddField(
            model_name='project',
            name='admin',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='admin', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
