FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV NODE_OPTIONS="--max_old_space_size=512"
CMD [ "npm", "start"]