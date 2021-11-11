from .base import *

DEBUG = False

ALLOWED_HOSTS = []

SECRET_KEY = env.str('DJANGO_SECRET_KEY')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env.str('DB_NAME'),
        'USER': env.str('DB_NAME'),
        'PASSWORD': env.str('DB_PASSWORD'),
        'HOST': env.str('DB_HOST'),
        'PORT': '5432',
    }
}

CELERY_BROKER_URL = env.str('CELERY_URL')

# CONFIGURACIÓN DEL TOKEN
# 'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
# 'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'RS256',
    'SIGNING_KEY': env.str('JWT_SIGNING_KEY', multiline=True),
    'VERIFYING_KEY': env.str('JWT_VERIFYING_KEY'),
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
}

