# koa-continuation-local-storage

> `continuation-local-storage` middleware for `koa`

## install

Install the [`package`](https://npmjs.com/koa-continuation-local-storage) with [npm](https://npmjs.com):

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
  .use(cls({
    ns: ns
  }))
  .use(function* (next) {
    ns.set('foo', 'bar');
    yield* next;
  })
  .use(function* () {
    this.body = ns.get('foo');
  });
```

## api

### `cls(opts)`

Create middleware that wraps downstream middlewares to `opts.ns` namespace.

## license

MIT
