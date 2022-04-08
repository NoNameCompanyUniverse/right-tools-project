FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

ADD /backend /backend

WORKDIR /backend

RUN pip install -r requirements.txt

EXPOSE 8000

WORKDIR ./src

CMD python manage.py runserver 0.0.0.0:8000