FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/nginx.conf

RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]