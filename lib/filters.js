
var obj = {}
var _ = require('lodash');
var q = require('q');
obj.config = obj.config || {};



obj.respHandler = (res, params)=>{
    if(!res ||  !params){
        console.log('-- need to provide res and params to respHandler')
        return {ok:false,error: true, message:'need to provide res and params to respHandler'};
    }
       if(!params){
           return { error: true, message:'no params specified' };
    }
    
    if(!params.url){
        return { error: true, message:'url param not specified!' }
    }

    if(!params.num){
        return { error: true, message:'num param not specified!' }
    }

    if(!_.isObject(params)){
       return { error: true, message:'wrong params specified!' }
    }

    return {ok:true,error: false};

}



module.exports = obj;