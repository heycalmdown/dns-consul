FROM node:slim

WORKDIR /app
COPY package.json /app/
COPY .gitignore .npmignore /app/
RUN npm i
RUN ls
COPY lib /app/lib
