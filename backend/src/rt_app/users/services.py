from image_compressor.storages import UploadFileManager


def get_path_to_photo(instance, filename):
    return UploadFileManager.form_a_path(f'photos/user_{instance.pk}/{filename}')


def get_path_to_banner(instance, filename):
    return UploadFileManager.form_a_path(f'banners/user_{instance.pk}/{filename}')
