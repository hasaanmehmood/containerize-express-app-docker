FROM node:22
WORKDIR /app

# Copy package.json and package-lock.json
# Install dependencies
#Copy Source code
#Expose port of application
#Start the application

COPY package*.json ./

RUN npm ci

COPY src/index.js index.js

EXPOSE 3000

CMD ["node", "/app/index.js"]