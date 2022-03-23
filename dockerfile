FROM node:17-alpine3.14
RUN mkdir /var/www/html/webservice
COPY . /var/www/html/webservice/
WORKDIR /var/www/html/webservice/
RUN npm install
EXPOSE 8000
CMD npm run start