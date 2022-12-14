FROM nginx:1.23

RUN apt-get update \
    && apt-get install -y curl git

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -  \
    && apt-get install -y nodejs \
    && npm install --global yarn

WORKDIR /opt/app

COPY nginx.conf /etc/nginx/conf.d/default.conf
