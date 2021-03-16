# @nuxtjs/newrelic

> New Relic module for Nuxt.js

## Features

The module enables Nuxt.Js instrumentation for [New Relic](https://docs.newrelic.com/docs/agents/nodejs-agent/installation-configuration/install-nodejs-agent/).

## Setup

- Add `@nuxtjs/newrelic` dependency using yarn or npm to your project

```js
  npm install git+https://github.com/preddy-newrelic/nuxt-newrelic-module.git
```

- Then, add `@nuxtjs/newrelic` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    '@nuxtjs/newrelic',
  ],
  newrelic: {

  }
}
```
