FROM python:3.9.1-alpine3.13

ARG target_env="dev"
ARG django_settings="config.settings.${target_env}"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV TARGET_ENV $target_env
ENV DJANGO_SETTINGS_MODULE $django_settings
ENV DJANGO_PORT=8000

RUN mkdir /application /var/secrets
WORKDIR /application

RUN apk add --no-cache \
    postgresql-dev zlib-dev jpeg-dev libpq \
    gcc musl-dev python3-dev libffi-dev openssl-dev

# Copia requirements
COPY ./requirements/ /requirements/

# UPDATE PIP
RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r /requirements/${TARGET_ENV}.txt

# Copia proyecto
COPY . .

#RUN python manage.py makemigrations
#RUN echo "from apps.users.models import User; User.objects.create_superuser('admin', 'admin@gts.com', 'P@$$W0RD!')" | python manage.py shell

RUN adduser docker -g docker --uid 1000 --disabled-password && \
    chown -R docker:docker /var/secrets /application

USER docker

CMD ["sh", "/entrypoint.sh"]