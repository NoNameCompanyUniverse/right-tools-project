class SubdivisionException(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__()

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message


class SubdivisionNameExist(Exception):
    def __init__(self):
        super().__init__()

    def __str__(self):
        return "Подразделение с таким именем существует"

    def __repr__(self):
        return "Подразделение с таким именем существует"


class LevelException(Exception):
    def __init__(self):
        super().__init__()

    def __str__(self):
        return "Уровень должен быть ниже родительского подразделения"

    def __repr__(self):
        return "Уровень должен быть ниже родительского подразделения"
