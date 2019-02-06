// 
// website https://newsapi.org/register/success

// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('b6b5bb24183348a98f2f9dd37ceebda6');

const request= require('request');
const querystring = require('querystring');  

module.exports = (search='',type,cb)=>{

    // type  `top-headlines?`; // everything?
    var typeUpdate=''
    var parameters = {
        category:'business',
        country:'us',
        apiKey: `b6b5bb24183348a98f2f9dd37ceebda6`
    };

    if(type==='headlines'){
        typeUpdate = 'top-headlines?'
    }

    if(type==='everything'){
        typeUpdate = 'everything?'

        if(!search) search='apple';
        delete parameters.country;
        delete parameters.category;
    }

    var url = "https://newsapi.org/v2/"+ typeUpdate; 

  
    if(search)parameters.q = search;

   url = url + querystring.stringify(parameters);
 
   console.log('-- calling',url)
   var options = {
        method: "GET",
        timeout:6000,
        checkServerIdentity: function (host, cert) {
            return undefined;
        },
        json:true,
        url: url,
        
        gzip: true,
        port:'443',
        headers: {
            'User-Agent': `Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36 OPR/40.0.2308.62`,
            'Cache-Control': "no-cache, no-store, must-revalidate",
            'Surrogate-Control': "maxAge=0",
            'Last-Modified': "(NOW)"      
        }
    };
          
    var r = request(options, async function (error, response,data) {
        if(error){
             cb({error:error, query:url})
             return;
        }else{
            data.query = url
            cb(data);
        }
        
    })

}