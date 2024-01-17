var page = {};
module.exports = (q, _, filter, config, jwt) => {

    page.signout = (req, res) => {
        var token = jwt.sign({date: new Date()}, config.secret, { expiresIn: '1s' });
        return res.status(200).json({ success: true, msg: 'session expired', token:token });
    }

    
    page.login = (req, res, next) => {
        res.setHeader("Content-Type", 'text/html');

        res.render('login', {
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


      page.checkSession = (req, res) => {
          var token = req.session.accessToken;
          if (!token) {
              return res.status(400).json({ error: true, message: 'your session expired' });
          }
          if (token) {
              verifyAccess(req, token, (ok) => {
                  if (ok) {
                      res.status(200).json({
                          message: `you are good`,
                          success: true,
                          user: req.username,
                      });
                  } else {
                      req.session.accessToken = null;
                      console.log('that is the wrong token', token)
                      return res.status(400).json({ error: true, message: 'your session expired' });
                  }
              })
          }

      }

 
    /// not a page!
    page.errorChecker = (err, req, res, next) => {
        var _err;
        if (err.stack) {
            if (err.stack.toString().indexOf('ERR_IPC_CHANNEL_CLOSED') !== -1) {
                _err = 'ERR_IPC_CHANNEL_CLOSED';
            }

        } else {
            _err = err.stack;
        }
        console.error(_err);
        console.log(err)
        res.status(500).json({ error: _err, success: false, message: 'server error' })
    }


    return page;
}
