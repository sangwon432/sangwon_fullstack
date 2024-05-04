FROM node:16-alpine3.11
WORKDIR /front
COPY package*.json ./
RUN npm install --force
COPY . .
CMD [ "npm", "start" ]
EXPOSE 3000


#
#FROM node:18-alpine
#
#WORKDIR /src
#
#COPY package.json .
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 3000
#
#CMD [ "npm", "start"]