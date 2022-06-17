from django.core.exceptions import ValidationError
from config.settings import BASE_DIR


def get_path_to_photo(instance, filename):
    return f'avatars/user_{instance.pk}/{filename}'


def get_path_to_banner(instance, filename):
    return f'banners/user_{instance.pk}/{filename}'


def validate_size_image(file_obj):
    """ Проверка размера файла
    """
    megabyte_limit = 2
    if file_obj.size > megabyte_limit * 1024 * 1024:
        raise ValidationError(f"Максимальный размер файла {megabyte_limit}MB")
