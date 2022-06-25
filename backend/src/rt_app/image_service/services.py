import os
import pathlib

from django.core.files.base import File
from django.db.models.fields.files import ImageFieldFile

from image_compressor import compressor, utils


class ImageService:
    def check_image(self, file: ImageFieldFile, width: int, height: int):
        file_format = utils.get_format_file(file.path)
        return (file_format in ['.png']) or utils.compare_with_and_height_image(width, height, file)

    def compress(self, file: ImageFieldFile, width: int, height: int):
        file_path = file.path
        buffer, new_file_name = compressor.compress_img(
            file_path,
            new_size_ratio=1.0,
            width=width,
            height=height
        )
        os.remove(file_path)
        new_file_name = pathlib.Path(new_file_name).name
        new_image = File(buffer)
        file.save(name=str(new_file_name), content=new_image, save=True)
        buffer.close()
