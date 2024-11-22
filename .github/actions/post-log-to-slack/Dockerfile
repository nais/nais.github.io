FROM oven/bun:1
WORKDIR /usr/src/app

COPY .github/actions/post-log-to-slack/package.json .github/actions/post-log-to-slack/bun.lockb ./
RUN bun install --frozen-lockfile --production

COPY .github/actions/post-log-to-slack/index.ts ./

# RUN ls -la

# ENTRYPOINT [ "bun", "run", "index.ts" ]

ENTRYPOINT [ "ls", "-la"]