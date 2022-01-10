FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . /usr/src/app
RUN npx prisma migrate dev init
RUN npx prisma generate
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
CMD ["node", "dist/main.js"]
