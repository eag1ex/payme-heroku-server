

class InvoiceModelLayer{
    constructor(){
        this._id = null;
        this._value=null;
        this._name = null;
        this._email = null
        this._date = null;
        this.isOK = null;
    }
    get id(){
        return this._id;
    }
    set id(val){
        // ID IS SET LATER
        this._id = Number(val);
        //this.isOK=false;
        console.log('-- id set')
    }
    get value(){
        return this._value;
    }
    set value(val){
        this._value = val;
        this.isOK=false;
        console.log('-- value set')
    }

    get name(){
        return this._name;
    }
    set name(val){
        this._name = val.trim();
        this.isOK=false;
        console.log('-- name set')
    }
  
    get email(){
        return this._email;
    }
    set email(val){ 
        this._email = val.trim();
        this.isOK=false;
        console.log('-- email set')
    }
    
    get date(){
        return this._date
    }
    set date(val){ 
        this._date = val;
        this.isOK=false;
        console.log('-- date set')
       
    }
  
    ok(){ 

      //  if(isEmpty(this.id) || isNaN(this.id)) return false;
        if(!this.value) return false;
        if(!this.name) return false;
        if(!this.email) return false;
        if(!this.date) return false;

        this.isOK = true;
        return true;
    }
    data(){
        return {
            date:this.date,
            value:this.value,
            email:this.email,
            name:this.name,
            id:this.id
        }
    }

}

module.exports = InvoiceModelLayer;