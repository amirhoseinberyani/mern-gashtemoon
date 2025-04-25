FROM node:12-alpine
# RUN apk update && apk add --no-cache nano curl
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]
EXPOSE 8080