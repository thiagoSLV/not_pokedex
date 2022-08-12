FROM node:lts-alpine

RUN npm install -g http-server
VOLUME [ "/app" ]
WORKDIR /app
COPY package*.json ./
COPY . .
RUN rm -rf node_modules package-lock.json
RUN npm cache clean -f
RUN npm install

EXPOSE 8080
CMD ["npm", "run", "serve"]