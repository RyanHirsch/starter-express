FROM node:8.7
RUN useradd --user-group --create-home --shell /bin/false nodejs

ENV HOME=/home/nodejs
ENV NODE_ENV=production

COPY package.json package-lock.json $HOME/app/
RUN chown -R nodejs:nodejs $HOME/*
USER nodejs
WORKDIR $HOME/app
RUN npm install --production
COPY dist/ $HOME/app/
COPY data/ $HOME/data/

CMD [ "node" , "index.js" ]
