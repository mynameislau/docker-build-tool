FROM node:7.7.3
RUN mkdir -p /usr/tool
WORKDIR /usr/tool
COPY ./ /usr/tool/
RUN npm install
CMD ["npm", "run", "start"]
