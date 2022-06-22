# Generated by Django 4.0.4 on 2022-06-22 13:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rt_app', '0012_remove_kanbanboard_compress_background_url_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MindCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(null=True)),
                ('type_card', models.CharField(choices=[('S', 'source'), ('D', 'default'), ('T', 'target')], max_length=1)),
                ('x_coord', models.IntegerField()),
                ('y_coord', models.IntegerField()),
                ('mind_map', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='rt_app.mindmap')),
                ('parent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='rt_app.mindcard', verbose_name='target')),
            ],
        ),
    ]
