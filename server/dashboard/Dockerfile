FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Open port
EXPOSE 3000

# Bundle app source
COPY . /app

CMD npm start