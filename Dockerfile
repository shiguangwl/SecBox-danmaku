FROM node:16.18.0-alpine
ENV TZ Asia/Shanghai

WORKDIR /app
COPY ./package.json /app
RUN npm install --production && npm prune --production
COPY . /app
ENV NODE_ENV production

CMD [ "npm", "run", "start" ]
