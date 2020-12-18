FROM node:14.13.1
ENV NODE_ENV production

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package.json ./package.json

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Open port
EXPOSE 3002

# Bundle app source
COPY . .

CMD [ "node", "app.js" ]