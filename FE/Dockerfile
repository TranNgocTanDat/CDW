## build stage ##
FROM node:22-alpine AS build

WORKDIR /app

# Dockerfile trong FE
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN npm install 
RUN npm run build

## run stage ##
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5002
ENTRYPOINT ["nginx", "-g", "daemon off;"]
