FROM node:18-bullseye

WORKDIR /app

EXPOSE 3000

#copiamos origen 
COPY . .

#instalaa todas las librerias 
RUN npm install
#comandos para la ejecucion dl proyecto
CMD [ "npm","start" ]