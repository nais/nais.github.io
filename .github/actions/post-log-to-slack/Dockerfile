FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json  /package.json
COPY bun.lockb /bun.lockb
RUN bun install --frozen-lockfile --production

COPY index.ts /index.ts

# RUN ls -la

# ENTRYPOINT [ "bun", "run", "index.ts" ]

ENTRYPOINT [ "ls", "-la"]