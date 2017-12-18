const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const PORT = 8080;
const HOST = '127.0.0.1';

const resourcesPath = path.resolve(__dirname, '../dist');

const app = new Koa();

app.use(serve(resourcesPath, {
    index: 'index.html',
    gzip: true,
    extensions: ['.js', '.css', '.html']
}));

app.listen(PORT, HOST, () => console.log(`Server listening on: ${HOST}:${PORT}`));
