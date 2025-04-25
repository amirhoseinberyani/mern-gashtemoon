FROM nginx:1.16.0-alpine
# RUN apk update && apk add --no-cache nano curl
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]