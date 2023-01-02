FROM node:16-alpine 

# Set the working directory to /app inside the container
RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD [ "npm", "start"]

# docker build . -t image-enhancement-react:0.1
# docker run -p 3000:3000 -d image-enhancement-react:0.1