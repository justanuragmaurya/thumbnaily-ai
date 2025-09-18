FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./


# copy package for packages
COPY packages/db/package.json ./packages/db/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/types/package.json ./packages/types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/

COPY apps/web/package.json  ./apps/web/

# install pnpm 
RUN npm install -g pnpm

# install dependencies without invoking scripts since the scheme.prisma isn't copied yet.
RUN pnpm install --ignore-scripts

# copy individually to minimize buildtime on subsequent changes
# ordered from least to frequest changing packages
COPY packages/eslint-config ./packages/eslint-config/
COPY packages/types ./packages/types
COPY packages/typescript-config ./packages/typescript-config
COPY packages/db ./packages/db
COPY packages/ui ./packages/ui


COPY apps/web ./apps/web


RUN pnpm --filter web run build

EXPOSE 3000

# Default command to run the app
CMD ["pnpm", "--filter", "web", "run", "start"]
