
var session = require('express-session');
// to replace with https://www.npmjs.com/package/cookie-session
module.exports = (app )=>{

    app.use(session({
        cookie: {
            path: '/',
            httpOnly: false,
            maxAge: 2 * 48 * 60 * 60, // 3 days
       //     secure: true,
         //   sameSite:true
        },
        secret: 'xcv98734jkdfs896324jhdsf',
          //saveUninitialized: false, // don't create session until something stored
        resave: false, //don't save session if unmodified

    }));
}