FROM node

WORKDIR /usr/src/app/my-app

COPY package*.json ./
# COPY . /usr/src/app/my-app
# COPY . ./

# RUN npm install -g npm@9.1.3
RUN npm install

#RUN chmod a+rwx /usr/src/app/my-app/node_modules/

CMD ["npm", "start"]
