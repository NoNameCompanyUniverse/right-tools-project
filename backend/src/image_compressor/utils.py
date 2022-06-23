from PIL import Image


def compare_with_and_height_image(compare_width, compare_height, file: Image):
    return file.width > compare_width and file.height > compare_height
