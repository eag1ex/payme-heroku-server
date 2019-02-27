class Fireconfig{
    constructor(){
      process.env.FIREBASE_CONFIG = 'wallet_1';
    }
  
    get databaseURL(){
      return `https://wallet-d71a2.firebaseio.com`
    }
  
    get DB_SETTINGS(){
      return { timestampsInSnapshots: true};
    }
    
    get serviceAccount(){
      return require('./cert/wallet-d71a2-4854f571b692');
    }
  
    get dbHash(){
      return {
        inv:'invoices'
      }
    }
  }
  module.exports = Fireconfig;