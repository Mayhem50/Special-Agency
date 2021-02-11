import app from '../app';
import session from 'express-session';

app.use(session({
    secret: 'special-agency-s3cr3t',
    name: 'special-agency-cookie',
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
