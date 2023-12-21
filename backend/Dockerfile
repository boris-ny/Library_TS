FROM node:18.17.0-alpine
WORKDIR /app
# Copy and download dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
# Copy the source files into the image
COPY . .
# Build the app
RUN yarn build

# Run the app
EXPOSE 5000
CMD yarn start