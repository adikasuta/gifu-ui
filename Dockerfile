# Use an official Node.js runtime as a parent image
FROM node:16.15.1

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN rm -rf node_modules
RUN npm install

# Build the Vue.js app
RUN npm run build
RUN ls node_modules/.bin

# Expose port 3000 for the Vue.js app
EXPOSE 3000

# Start the server using the command "npm start"
CMD ["npm", "run", "serve", "--", "--port", "3000"]