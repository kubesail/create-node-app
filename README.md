# Create Node App

Create Node apps with no build configuration. Inspired by and based on [create-react-app](https://github.com/facebook/create-react-app). In a single command, this tool lets you create an app which closely follows [The Twelve Factors](https://12factor.net) of web application development.

## What's included?

`create-node-app` automatically sets up and manages:

- A complete web app with React and Express, deployable to any Kubernetes cluster
- Developer tools: ESLint, editorconfig, prettier, automatic reload
- Secure and optimized `Dockerfile` setup for easy containerized production deploys
  - _Optional containerized development & testing is on the roadmap_
- Production ready Kubernetes configurations for your app and its dependencies
- A metamodule system for easy development with sercices like PostgreSQL, Redis, and MySQL, all with no configuration
- Build, test, and deploy helpers

`create-node-app` has a simple core, with a small ecosystem of "meta-modules".

# Meta-Modules

Meta-Modules are NPM Modules which contain:

  - A validated and secure Node.js driver
  - Metadata for configuring said driver (Environment Variables)
  - A Docker Container Image which is validated to work properly with the chosen driver
  - Metadata for configuring the service container

For example, the [redis metamodule](https://github.com/nodeapp-metamodules/redis) bundles the Node `redis` driver, a Redis 5 Docker image, and knows how to connect to Redis, without any configuration! Metamodules wrap some of the complexity of building microservices with Node.js, allowing you to rapidly iterate with the stack of your choice!

Explore modules [here](https://github.com/nodeapp-metamodules) or help [create them](#contributing) if the one you want doesn't exist!

## Quick start

### Create an app

    npx create-node-app my-app

Checkout the readme for more details about building and deploying your app!

### Add a meta-module

Add redis to our project:

    npm install @nodeapp/redis

then

```js
const redis = require("@nodeapp/redis")();

// This "just works" both in development and production!
redis.get("my-key", function(err, reply) {
  console.log(reply);
});
```

Run `npm run start` to begin development using Redis and Node!

[Explore other meta-modules](https://github.com/nodeapp-metamodules)

#### Build, test and deploy:

    npm build [environment]
    npm test [environment]
    npm deploy [environment]

## Free App Hosting

This project is maintained by [kubesail.com](kubesail.com), which provides free-tier provides hosting. After creating an app, try `npm run deploy` to easily launch your app on a Kubernetes cluster with built-in load-balancing, HTTPS, and high-availability! KubeSail also offers the best way to iterate on Kubernetes resources - check us out!

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
