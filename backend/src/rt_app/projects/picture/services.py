from image_compressor.storages import UploadFileManager


def get_path_to_picture(instance, filename):
    return UploadFileManager.form_a_path(f'picture/project_{instance.pk}/{filename}')
