'use strict'
const {isObject } = require('lodash');

/// show bold notifications 


var obj = {};
const color = require('bash-color');
module.exports = function (CONFIG=null) {

    function _string(err){
        var t1 = (err || '').toString();
        var t2 = isObject(err) ? JSON.stringify(err) : t1;
        return t2;
    }
  /// advanced
    obj.n = (l = false, err = false) => {
        l =_string(l)
        if (err) {
            console.log(color.red('----'))
            console.log(color.wrap(l, color.colors.RED, color.styles.hi_background));
            console.log(color.red('----'))
            console.log(" ")
            return;
        } else {
            console.log(color.blue('----'))
            console.log(color.wrap(l, color.colors.BLUE, color.styles.hi_background));
            console.log(color.blue('----'))
            console.log(" ")
        }
    }

    //simple
    obj.s = (l = false, err = false) => {
        l =_string(l)
        if (err) {      
            console.log('--- ',color.wrap(l, color.colors.RED, color.styles.hi_background));
            console.log(" ")
            return;
        } else {
            console.log('--- ',color.wrap(l, color.colors.BLUE, color.styles.hi_background));
            console.log(" ")
        }
    }    
    return obj
};           