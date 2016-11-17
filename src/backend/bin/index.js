import createServer from '../libs/createServer';
import conf from '../config';

let APP_PORT = conf.get('ports:appPort');

createServer(APP_PORT)
.then(
		result => {
      console.log(`Started on http://localhost:${APP_PORT}/`);
	},
		err => {
      console.error('Could not start webServer:');
      console.error(err);
	}
);
