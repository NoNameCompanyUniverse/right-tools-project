import os
from django.db.models.fields.files import ImageFieldFile
from image_compressor import comressor, utils


class ImageService:
    @staticmethod
    def check_image(file: ImageFieldFile, width: int, height: int):
        file_path = file.path
        print(file_path)
        file_format = utils.get_format_file(file.path)
        if file_format in ['.png']:
            comressor.compress_img(
                file_path,
                new_size_ratio=1.0,
                to_jpg=True
            )
        if utils.compare_with_and_height_image(width, height, file):
            comressor.compress_img(
                file_path,
                new_size_ratio=1.0,
                width=width,
                height=height
            )
        os.remove(file_path)
