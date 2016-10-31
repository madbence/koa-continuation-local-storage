# koa-continuation-local-storage [![Build Status](https://travis-ci.org/madbence/koa-continuation-local-storage.svg)](https://travis-ci.org/madbence/koa-continuation-local-storage)

> [`continuation-local-storage`](https://npmjs.com/continuation-local-storage) middleware for [`koa`](https://npmjs.org/koa).

## install

Install the [package](https://npmjs.com/koa-continuation-local-storage) with [npm](https://npmjs.com):

```sh
$ npm install koa-continuation-local-storage
```

## usage

```js
import cls from 'koa-continuation-local-storage';
import koa from 'koa';
import { createNamespace } from 'continuation-local-storage';

const ns = createNamespace('ns');
const app = koa();

app
  .use(cls(ns))
  .use(function* (next) {
    ns.set('foo', 'bar');
    yield* next;
  })
  .use(function* () {
    this.body = ns.get('foo');
  });
```

## api

### `cls(ns)`, `cls(opts)`

Create middleware that wraps downstream middlewares to `opts.ns` namespace.

## license

MIT
