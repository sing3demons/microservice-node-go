FROM node:16.17.0-alpine
RUN apk update && apk add git
ENV TZ=Asia/Bangkok
WORKDIR /usr/src/app

# ARG GITHUB_TOKEN=${GITHUB_TOKEN}
# RUN git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

COPY package*.json ./
RUN npm install
COPY . .
RUN git log -1 > APPLICATION_VERSION.txt
RUN npx prisma generate
RUN npm run build
RUN rm -rf src
EXPOSE 3000
CMD ["npm", "start"]
