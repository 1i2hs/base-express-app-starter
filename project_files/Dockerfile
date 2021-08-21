# Reference: https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
FROM node:14-alpine
RUN apk add --no-cache tini
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm ci --only=production
USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./bin/www"]