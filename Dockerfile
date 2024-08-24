# Step 1: Use the official Node.js image as a base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Step 4: Install the Node.js dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Expose the port that your application will run on
EXPOSE 4000

# Step 7: Define the command to run your application
CMD ["npm", "start"]
