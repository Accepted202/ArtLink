FROM node:18-alpine as build

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
