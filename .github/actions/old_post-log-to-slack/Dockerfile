FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

COPY index.ts .

ENTRYPOINT [ "bun", "run", "index.ts" ]