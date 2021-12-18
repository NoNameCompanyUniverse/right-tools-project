from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    username = models.CharField(unique=True, max_length=150)
    password = models.CharField(max_length=150)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.EmailField(unique=True, max_length=254, blank=True)
    phone_number = models.CharField(unique=True, max_length=30, blank=True)
    about_me = models.TextField()
    date_updated = models.DateTimeField(auto_now=True)
    organization = models.ForeignKey('Organization', on_delete=models.SET_NULL, null=True)
    specialty = models.ForeignKey('Specialty', on_delete=models.SET_NULL, null=True)


class Organization(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Specialty(models.Model):
    name = models.CharField(max_length=150)


class InvitationLink(models.Model):
    name = models.CharField(max_length=150)
    date_create = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)


