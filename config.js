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
        'secret': 'dflku89745iojgjdf9gu905jfdg095i56',
        port:port,
        HOST:(localhost)? `http://localhost:${port}`:'https://blooming-journey-82987.herokuapp.com',
        localhostAuth:`localhost-234667788987334` // localhost dev skip authorization
    };
