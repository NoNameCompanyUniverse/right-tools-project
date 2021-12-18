FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

ADD . /right-tools-project

WORKDIR /right-tools-project

RUN pip install "poetry==1.1.12"

RUN poetry config virtualenvs.create false

RUN poetry install

EXPOSE 8000

CMD cd rt_project && python manage.py runserver 0.0.0.0:8000