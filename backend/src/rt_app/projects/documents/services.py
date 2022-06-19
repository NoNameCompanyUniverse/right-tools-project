def get_path_to_document(instance, filename):
    return f'document/project_{instance.project.pk}/{filename}'
