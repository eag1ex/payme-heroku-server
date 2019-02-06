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
        'secret': '5646dfgfg6767uytyu7687454557678789',
        port:port,
        HOST:(localhost)? `http://localhost:${port}`:'https://nameless-shore-60398.herokuapp.com'
        
    };
