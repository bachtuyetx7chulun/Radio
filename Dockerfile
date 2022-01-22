# pull official base image
FROM node:17.4.0-alpine3.15

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . ./

CMD ["npm", "run", "start"]