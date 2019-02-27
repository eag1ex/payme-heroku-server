
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

module.exports = (app, appRouter, config) => {


    var loadcontentType = (req, res, file) => {
        var extension = path.extname(req.url);
        switch (extension) {

            
            case '.ico':
                res.setHeader("Content-Type", 'image/x-icon');
                res.write(fs.readFileSync(file));
                
                return res.end();

             case '.js':
                res.setHeader("Content-Type", 'text/javascript');
                res.write(fs.readFileSync(file));
                return res.end();
              

            case '.wmv':
                res.setHeader("Content-Type", 'video/x-ms-wmv');
                res.write(fs.readFileSync(file));
               return res.end();
              
               

            case '.avi':
                res.setHeader("Content-Type", 'video/x-msvideo');
                res.write(fs.readFileSync(file));
               return  res.end();
              
 
            case '.mov': 
                res.setHeader("Content-Type", 'video/quicktime');
                res.write(fs.readFileSync(file));
                return res.end();
              

            case '.3gp':
                res.setHeader("Content-Type", 'video/3gpp');
                res.write(fs.readFileSync(file));
               return  res.end();
              

            case '.m3u8':
                res.setHeader("Content-Type", 'application/x-mpegURL');
                res.write(fs.readFileSync(file));
               return  res.end();
               

            case '.mp4':
                res.setHeader("Content-Type", 'video/mp4');
                res.write(fs.readFileSync(file));
               return  res.end();
              

            case '.flv':
                res.setHeader("Content-Type", 'video/x-flv');
                res.write(fs.readFileSync(file));
               return  res.end();
               

            case '.svg':
                res.setHeader("Content-Type", 'image/svg+xml');
                res.write(fs.readFileSync(file));
               return res.end();
               

            case '.css':
                res.setHeader("Content-Type", 'text/css');
                res.write(fs.readFileSync(file));
               return res.end();
              

            case '.png':
                res.setHeader("Content-Type", 'image/png');
                res.write(fs.readFileSync(file));
               return res.end();
               

            case '.jpg':
                res.setHeader("Content-Type", 'image/jpeg');
                res.write(fs.readFileSync(file));
                return res.end();
               

            default:
                res.setHeader("Content-Type", 'text/html');

               return fs.exists(file, function (exists) {

                    if (exists) {
                        if (file.indexOf('index.html') !== -1) {
                      
                          return  res.render('../app/index', {
                                'APP_URL': config.HOST
                            });

                        } else {
                           
                            res.write(fs.readFileSync(file));
                          return  res.end();
                        }

                    }
                });   

        }

    }

    appRouter.get('*', (req, res) => {

        var match_ = ['.css', '.png', '.jpg', '.mov', '.avi', '.html', '.svg', '.js','.wmv','.flv','.mp4','.m3u8','.3gp','.ico'];
        var getFile = req.url.split('/').filter((file, inx) => {
            return _.find(match_, (m) => {
                return file.indexOf(m) !== -1;
            })
        })[0] || false


        var file;
        if (getFile) {
            file = path.join(__dirname, '../' + config.PUBLIC + '/app/' + getFile);
        }

        if (!getFile) {
                //  console.log('what is config',config)
           // console.log('flename ',file)
           return res.render('../app/index', {
                'APP_URL': config.HOST
            });

            //  res.write(fs.readFileSync(path.join(__dirname, '../'+ config.PUBLIC+'/app/index.html')));
            // return res.end();

        }
             
        loadcontentType(req, res, file);
        

    });


    var appInit = () => {
        app.use('/app', appRouter);
    }

    return {
        init: appInit
    }

}