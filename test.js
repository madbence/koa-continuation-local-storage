const test = require('tape');
const koa = require('koa');
const req = require('supertest');
const create = require('continuation-local-storage').createNamespace;
const cls = require('./');

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

test('cls-middleware', function (t) {
  const app = koa();
  const ns = create('foo');
  app.use(cls({
    ns: ns,
  })).use(function* (next) {
    ns.set('foo', 'bar');
    yield sleep(100);
    yield* next;
  }).use(function* () {
    this.body = ns.get('foo');
  });

  const server = app.listen();
  req(server)
    .get('/')
    .expect('bar')
    .end(function (err) {
      t.error(err);
      t.end();
      server.close();
    });
});
