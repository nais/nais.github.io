FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json  ./
COPY bun.lockb ./
RUN bun install --frozen-lockfile --production

COPY index.ts ./

# RUN ls -la

# ENTRYPOINT [ "bun", "run", "index.ts" ]

ENTRYPOINT [ "ls", "-la"]