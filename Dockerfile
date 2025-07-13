#avant, il faut faire un build: ng build --configuration=development
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/mon-beau-jardin-front-v2/browser /usr/share/nginx/html
EXPOSE 80