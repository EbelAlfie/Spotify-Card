FROM node:16

WORKDIR /git-card

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "deploy"]
