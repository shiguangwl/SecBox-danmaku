FROM node:16.18.0-alpine
ENV TZ Asia/Shanghai

WORKDIR /app
COPY package*.json ./
RUN npm install --production && npm prune --production
COPY . .
EXPOSE 3000
ENV NODE_ENV production
CMD [ "npm", "run", "start" ]
