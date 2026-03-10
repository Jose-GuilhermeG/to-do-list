from datetime import timedelta

from configs.settings import env

CORS_ALLOW_ALL_ORIGINS = True   

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME' : timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME' : timedelta(days=5),
    'SIGNING_KEY' : env('JWT_SIGNING_KEY'),
    'TOKEN_OBTAIN_SERIALIZER' : 'account.serializers.LoginSerializer',
    'UPDATE_LAST_LOGIN' : True
}


REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication'
    ),
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '50/min'
    }

}