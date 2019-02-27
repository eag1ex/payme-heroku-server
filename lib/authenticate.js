

var obj = {};
var q = require('q');
module.exports = (app, jwt, config) => {


    obj.allowed = ['auth', 'login', 'signout','checkSession'];//api/
    obj.allowedGet = ['login'];

    function _validate(url, allowed) {

        var validate = allowed.filter((val, inx) => {
            return url.indexOf(val) !== -1
        }).length >= 1 ? true : false
        return validate;
    }


    obj.postAuth = () => {
        app.post('/auth', function (req, res) {
         var defer = q.defer();   
         var auth = req.body;
            //console.log('what is the auth.body',req.body);

            if (!auth) {
                console.log('wrong auth provided!')
                return res.status(400).json({ error: true, message: 'wrong auth provided!' });
            }

            if(auth.username.indexOf('payme')==-1 || auth.password.indexOf('payme')==-1){
                return res.status(400).json({ error: true, message: 'wrong auth combination provided!' });
            }
            //console.log('generateNewToken auth',auth)
            var authentication = {
                username: auth.username,
                password: auth.password,
                date: new Date()
            };
            
            // we are sending the profile in the token
            var token = jwt.sign(authentication, config.secret, { expiresIn: '30m' });
            req.session.accessToken = token

            setTimeout(()=>{
                console.log('auth success');
                defer.resolve(true);
            },500);

            defer.promise.then(()=>{
                res.redirect(config.HOST + '/app/');
            })
            
            //res.status(200).json({ success: true, token: 'JWT ' + token });

        });
    }


    function verifyAccess(req, token, cb) {

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log('There was an error with the authentication');
                cb(false)
            } else {
                req.token = decoded //[1]
                cb(true)
            }
        })
    }

    function getToken(headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };



    obj.authCheck = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token-expiry");

        var isValid = _validate(req.url, obj.allowed);
        //// allow
        if (isValid) {
            return next();
        }

   
        if (!isValid) {
            // console.log('doing auth test check');
        //     console.log('what is req.session.accessToken',req.session.accessToken)
            var token = req.session.accessToken || getToken(req.headers);

           // console.log('what is token',token)
      //      console.log('what is req.headers',req.headers)
            if (token) {
                verifyAccess(req, token, (ok) => {
                    if (ok) {
                        console.log(`token valid!`);
                        return next();
                    } else {
                        console.log('that is the wrong token', token)
                        return res.status(400).send({ error: true, msg: 'wrong token provided' });
                    }
                })
            }

            else {
                return res.status(400).send({ error: true, msg: 'No token provided.' });
            }
        }

    }/// authCheck

    obj.AppUseAuth = () => {
        app.use(obj.authCheck);
    }

    return obj;

}

