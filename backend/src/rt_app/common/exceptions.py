class NameExist(Exception):
    def __init__(self, name):
        self.name = name
        super.__init__()

    def __str__(self):
        return f"Запись с именем {self.name} уже существует"

    def __repr__(self):
        return f"Запись с именем {self.name} уже существует"
