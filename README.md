# @nuxtjs/newrelic

> New Relic module for Nuxt.js

## Features

The module enables Nuxt.Js instrumentation for [New Relic](https://docs.newrelic.com/docs/agents/nodejs-agent/installation-configuration/install-nodejs-agent/).

This plugin expects the Node.js agent [newrelic npm package](https://www.npmjs.com/package/newrelic) has already been installed in your application.

## Setup

- Add `@nuxtjs/newrelic` dependency using yarn or npm to your project

```js
  npm install newrelic
  npm install git+https://github.com/preddy-newrelic/nuxt-newrelic-module.git#1.0.0
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
