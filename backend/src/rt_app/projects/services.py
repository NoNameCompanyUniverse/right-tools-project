from django.core.exceptions import ValidationError
from config.settings import BASE_DIR


def get_path_to_picture(instance, filename):
    return f'picture/project_{instance.pk}/{filename}'
