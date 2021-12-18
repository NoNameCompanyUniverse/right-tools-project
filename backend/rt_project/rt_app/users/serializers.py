from rest_framework import serializers
from rt_app.models import CustomUser, Specialty


class SpecialtySerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=5, max_length=150)

    class Meta:
        model = Specialty
        fields = '__all__'


class UserShortInfoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, max_length=150)
    specialty = SpecialtySerializer()

    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'specialty'
        )


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, max_length=150)
    first_name = serializers.CharField(min_length=1, max_length=250)
    last_name = serializers.CharField(min_length=1, max_length=250)
    email = serializers.EmailField(required=False, max_length=255)
    phone_number = serializers.CharField(required=False, max_length=255)
    about_me = serializers.CharField(required=False)
    specialty = SpecialtySerializer()

    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'first_name', 'last_name',
            'email', 'phone_number', 'about_me', 'specialty'
        )


class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, max_length=150)
    password = serializers.CharField(write_only=True, min_length=5, max_length=150)
    first_name = serializers.CharField(min_length=1, max_length=250)
    last_name = serializers.CharField(min_length=1, max_length=250)
    email = serializers.EmailField(required=False, max_length=255)
    phone_number = serializers.CharField(required=False, max_length=255)
    about_me = serializers.CharField(required=False)

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'password', 'first_name', 'last_name',
            'email', 'phone_number', 'about_me', 'specialty', 'organization'
        )


class UpdateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, max_length=150)
    password = serializers.CharField(write_only=True, min_length=5, max_length=150)
    first_name = serializers.CharField(min_length=1, max_length=250)
    last_name = serializers.CharField(min_length=1, max_length=250)
    email = serializers.EmailField(required=False, max_length=255)
    phone_number = serializers.CharField(required=False, max_length=255)
    about_me = serializers.CharField(required=False)

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'password', 'first_name', 'last_name',
            'email', 'phone_number', 'about_me'
        )
