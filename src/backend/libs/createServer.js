import Router from 'koa-router';
import convert from 'koa-convert';
import serve from 'koa-static';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import graffiti from '@risingstack/graffiti';
import indexView from '../views/index';
import schema from '../data/index';
import conf from '../config';
import scoreData from './parser/homeParser';

export default async function createServer(port) {

	const app = new Koa();
	const router = new Router();


	if (process.env.NODE_ENV == 'production') {
    app.use(convert(serve('/home/eddie/node/chat/src/frontend/public')));
    console.log("true production");
  } else {
    console.log("false production");
    const devServer = require('../middleware/webpackDevServer').default;
    devServer(app);
  }

	app.use(router.allowedMethods())
		.use(router.routes())
		.use(convert(bodyParser()))
		.use(convert( graffiti.koa({ schema }) ) );

	app.use((ctx) => {
		if (ctx.url === '/') {
      ctx.body = indexView();
    }
	});

	app.listen(port);

}
