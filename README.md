# Create Node App

Create Node apps with no build configuration. Inspired by and based on [create-react-app](https://github.com/facebook/create-react-app). Create apps that closely follow [The Twelve Factors](https://12factor.net/) of web application development with a single command.

## What's included?

`create-node-app` automatically sets up and manages:
  - Developer tools: ESLint, optional typing (Typescript & Flowtype), editorconfig, prettier, automatic reload
  - Production ready Kubernetes configurations
  - `git-crypt` for secure encrypted app secrets (secrets as environment variables)
  - Secure and optimized `Dockerfile` setup for easy containerized development, testing, and production
  - CI scaffolding (Jenkins, CircleCI)
  - Build, test & deploy helpers (with instant & free Kubernetes hosting powered by [kubesail.com](kubesail.com))

`create-node-app` is modular, some popular optional modules include:

  - HTTPS (Letsencrypt, express boilerplate, HSTS, etc)
  - Redis, Postgres, and other backend services (local containerized services, as well as production ready Kubernetes configurations)
  - Many more: [Explore other modules](/modules)



## Quick start

#### Create an apps:
    npx create-node-app my-new-app


#### Add a module:
Add HTTPS boilerplate and Redis to our project:

    cd my-new-app
    create-node-app --add https redis

[Explore other modules](/modules)

#### Build, test and deploy:

    npm build [environment]
    npm test [environment]
    npm deploy [environment]

## Free hosting
This project is sponsored by [kubesail.com](kubesail.com), which provides free-tier Kubernetes hosting. After creating an app with `create-node-app`, try `npm deploy production`!
