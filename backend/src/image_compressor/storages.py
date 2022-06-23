import hashlib
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage


class UploadFileManager:
    @staticmethod
    def form_a_path(path: str) -> str:
        ext = os.path.splitext(path)[1].lower()
        path = path.split('/')
        byte_str = path[1].encode()
        result = hashlib.sha256(byte_str).hexdigest()
        path[-1] = result + ext
        return '/'.join(path)


class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name
