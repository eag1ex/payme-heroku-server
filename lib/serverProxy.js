var httpProxy = require('http-proxy');
// serverAddress > http://httpbin.org
module.exports = (req, res, serverAddress)=>{
    var apiProxy = httpProxy.createProxyServer();
    console.log(`--- running proxy:`,serverAddress)
    return apiProxy.web(req, res, {target: serverAddress});
}
