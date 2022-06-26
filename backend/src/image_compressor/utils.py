import os
from django.db.models.fields.files import ImageFieldFile


def compare_with_and_height_image(compare_width: int, compare_height: int, file: ImageFieldFile):
    return file.width > compare_width and file.height > compare_height


def get_format_file(file_path: str):
    return os.path.splitext(file_path)[-1]
