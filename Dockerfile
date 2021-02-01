# The Node version that we'll be running for our version of React.
FROM node:12.14.0-alpine as react-build

RUN mkdir /app

WORKDIR /app

# Copy from local folder structure to docker image
COPY package.json package-lock.json ./

RUN npm install --production 

# Copy all other application files
COPY . ./

RUN npm install webpack

# Expose the port on which your server will be running
EXPOSE 8080

CMD ["npm", "start"]