# egg logger

![Node.js CI](https://github.com/CoderIvan/koa-logger/workflows/Node.js%20CI/badge.svg)
![Node.js Package](https://github.com/CoderIvan/koa-logger/workflows/Node.js%20Package/badge.svg)

# How to use

```javascript
npm i @z-ivan/koa-logger --save
```

```javascript
const koa = require('koa')
const logger = require('@z-ivan/koa-logger')

var app = koa()
app.use(logger(
  console.log.bind(console),
  { level: isProd ? 0 : 3 }
))
```