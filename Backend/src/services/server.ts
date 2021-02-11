#!/usr/bin/env node

import http from 'http';
import fs from 'fs';
import { Application } from 'express';

export function createServer(app: Application) {
	// const sslOptions = {
	// 	key: fs.readFileSync('keys/server.key'),
	// 	cert: fs.readFileSync('keys/server.crt'),
	// 	ca: fs.readFileSync('keys/ca.crt'),
	// 	requestCert: true,
	// 	rejectUnauthorized: false
	// };

	app.set('port', process.env.PORT || 3000);

	const server = http.createServer(app);

	server.listen(app.get('port'), () => {
		console.debug('Express server listening on port ' + server.address()?.toString());
	});


	return server;
}
