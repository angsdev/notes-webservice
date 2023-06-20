FROM node:17-alpine3.14
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 80
CMD npm run start