from django.core.exceptions import ValidationError
from config.settings import BASE_DIR


def get_path_to_photo(instance, filename):
    return f'avatars/user_{instance.pk}/{filename}'


def get_path_to_banner(instance, filename):
    return f'banners/user_{instance.pk}/{filename}'
