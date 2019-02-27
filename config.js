var localhost=false;
if (process.env.USERDOMAIN !== undefined) {
            if (process.env.USERDOMAIN.indexOf('bull-PC') !== -1) {
                localhost= true;
            }else{
                localhost=false
            }
}
var port = process.env.PORT || 5000;

module.exports = {
        'PUBLIC': "./views",
        'secret': '097359075op3208070kgdf;ljg8y3hru0935',
        port:port,
        HOST:(localhost)? `http://localhost:${port}`:'https://mysterious-hollows-67349.herokuapp.com'
        
    };
