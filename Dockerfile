FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:16

# Port mà ứng dụng lắng nghe
ENV PORT=8087

# Chuỗi kết nối MongoDB
ENV MONGO_URI=mongodb+srv://admin:1@cluster0.swg4v.mongodb.net/authorize?retryWrites=true&w=majority

# Secret cho JWT
ENV JWT_SECRET=roczzjyowiwaaiwozkgupfxwrybwchqs
ENV JWT_SECRET_REFRESH=nbcaiuechasrsgyokkvvyhnxcvyizwkh

USER node

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE $PORT

CMD [ "node", "dist/index.js" ]