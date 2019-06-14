# Create Node App - Ideation

## Project Goals and Aspirations

While this project is usable as-is, we'd like to include the following features before considering this project "feature complete":

- `git-crypt` for secure encrypted app secrets (secrets as environment variables)
- Automatic set up of CI scaffolding (Jenkins, CircleCI)
- HTTPS (Letsencrypt, express boilerplate, HSTS, etc)
- Optional typing (Typescript & Flowtype)

#### Ideas

1. Universal Node bootstrapper

   1. Start simple: `create-node-app myapp`

      Comes with a set of default meta-modules:

      - `@kubesail/node-runtime`

        manages common Nodejs elements like `unhandledRejection`, `exitHook`

      - `@kubesail/logging`

        Adds `winston` with JSON/Plaintext output controls

      - `@kubesail/eslint`

        Adds eslint with [Standard Javascript](https://standardjs.com/)

   2. Easily extend projects `create-node-app --add @kubesail/redis`

      - MetaModules include:

        - NPM dependency (`ioredis`)
        - Driver stub (`src/_shared/redis.js`)
        - Configuration stubs (`process.env.REDIS_HOSTS`, etc)
        - Container for development (`docker run redis...`)
        - Production-ready configuration (`kubectl apply -f...`)

      - Managed via package.json like normal packages:
        `json { "name": "myApp", "dependencies": { "@kubesail/redis": "^1.0.0" } }`
        Metamodules are entirely optional, but provide a level of plug-and-play not currently available in the JavaScript ecosystem. With a single package, I get not only a custom-tuned Node.js driver (in this case redis), I also get a Docker container for development and a Kubernetes definition for deploying to production. Additionally, configuration details are automatically added to my configuration files. While a normal NPM module simply represents a bundle of JavaScript - a MetaModule represents everything you need to accomplish a particular goal. You can think of it as a way of bundling together both the service and the driver. **We'll take care of auditing and testing version compatability, you worry about building applications**!

   3. Run your stack locally with Docker or Kubernetes:

      `yarn run dev` (defaults to Docker)

      \- or -

      `yarn run dev --kube`

      Notes:

      1. In development, node is run locally
      2. Containers will be started with either Docker or Kubernetes
      3. Service configuration from Docker or K8s will be fed to your application
      4. Drivers will be automatically configured to talk to your development services

   4. Deploy:

      1. Have a valid Kubernetes Context. You can get a free Kubernetes cluster from https://kubesail.com to get started, but any Kubernetes cluster will work.
      2. `yarn run deploy production/staging/qa`
      3. The first deploy will prompt you with some questions about your environment
      4. Subsequent deploys "just work"!
      5. Kubernetes configurations are managed by your MetaPackages
