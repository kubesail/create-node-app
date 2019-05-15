# Create Node App

Create Node apps with no build configuration. Inspired by and based on [create-react-app](https://github.com/facebook/create-react-app). This tool let you create an app in a single command which closely follows [The Twelve Factors](https://12factor.net) of web application development.

## What's included?

`create-node-app` automatically sets up and manages:

- A complete web app with React and Express, deployable to any Kubernetes cluster
- Developer tools: ESLint, editorconfig, prettier, automatic reload
- Secure and optimized `Dockerfile` setup for easy containerized production deploys
  - _Optional containerized development & testing is on the roadmap_
- Production ready Kubernetes configurations for your app and all its dependencies
- A metamodule system for easy development and deployment of dependencies, like PostgreSQL, Redis, and MySQL, all with no configuration
- Build, test, and deploy helpers (with instant & free Kubernetes hosting powered by [kubesail.com](kubesail.com))

`create-node-app` is modular, some popular optional modules include:

- Redis, Postgres, and other backend services (local containerized services, as well as production ready Kubernetes configurations)
- [Explore other modules](https://github.com/nodeapp-metamodules) or help [create them](#contributing) if the one you want doesn't exist

## Quick start

#### Create an app

    npx create-node-app my-app

#### Add a meta-module

Add redis to our project:

    npm install @nodeapp/redis

then

    ```js
    const redis = require('@nodeapp/redis')()

    // This "just works" both in development and production,
    // without needing to install or configure redis, as the
    // containers are created by deploy-node-app
    redis.get('my-key', function(err, reply) {
      console.log(reply);
    })
    ```

[Explore other modules](https://github.com/nodeapp-metamodules)

#### Build, test and deploy:

    npm build [environment]
    npm test [environment]
    npm deploy [environment]

## Free App Hosting

This project is maintained by [kubesail.com](kubesail.com), which provides free-tier provides hosting. After creating an app, try `npm run deploy` to easily launch your app on a Kubernetes cluster with built-in load-balancing, HTTPS, and high-availability!

## Project Goals and Aspirations

While this project is usable as-is, we'd like to include the following features before considering this project "feature complete":

- `git-crypt` for secure encrypted app secrets (secrets as environment variables)
- Automatic set up of CI scaffolding (Jenkins, CircleCI)
- HTTPS (Letsencrypt, express boilerplate, HSTS, etc)
- Optional typing (Typescript & Flowtype)

## Contributing

- If you feel that this tool can be improved in any way, feel free to open an issue or pull request!
- If you've created a metamodule you want us to include, please open an issue and let us know!
- We also value contributions on [deploy-node-app](https://github.com/kubesail/deploy-node-app) which contains the bulk of the logic for creating and deploying development and production environments.
