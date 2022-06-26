import os
from io import BytesIO
from PIL import Image


def compress_img(image_name, new_size_ratio=0.9, quality=90, width=None, height=None, to_jpg=True):
    img = Image.open(image_name)
    if new_size_ratio < 1.0:
        # if resizing ratio is below 1.0, then multiply width & height with this ratio to reduce image size
        img = img.resize((int(img.size[0] * new_size_ratio), int(img.size[1] * new_size_ratio)), Image.ANTIALIAS)
    elif width and height:
        # if width and height are set, resize with them instead
        img = img.resize((width, height), Image.ANTIALIAS)

    # split the filename and extension
    filename, ext = os.path.splitext(image_name)
    # make new filename appending _compressed to the original file name
    if to_jpg:
        # change the extension to JPEG
        new_filename = f"{filename}_compress.jpg"
    else:
        # retain the same extension of the original image
        new_filename = f"{filename}_compress{ext}"
    buffer = BytesIO()
    try:
        # save the image with the corresponding quality and optimize set to True
        img.save(buffer, format='JPEG', quality=quality, optimize=True)
    except OSError:
        # convert the image to RGB mode first
        img = img.convert("RGB")
        # save the image with the corresponding quality and optimize set to True
        img.save(buffer, format='JPEG', quality=quality, optimize=True)
    return buffer, new_filename
