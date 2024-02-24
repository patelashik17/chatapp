# pull the Node.js Docker image
FROM node:18-alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN yarn install

# copy the generated modules and all other files to the container
COPY . .

RUN npm run build

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000

# the command that starts our app
CMD ["node", "server/server.js"]
