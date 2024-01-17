const { ENVS } = require("../../lib/utils");
class FireConfig {
  constructor() {
    process.env.FIREBASE_CONFIG = "cyclic-2781b";
  }

  get databaseURL() {
    return ENVS().FIREBASE_DB;
  }

  get DB_SETTINGS() {
    return { timestampsInSnapshots: true };
  }

  get serviceAccount() {
    return require("../serviceAccount/cyclic-2781b-firebase-adminsdk-v25ko-9c14767d48.json");
  }

  get dbHash() {
    return {
      inv: "invoices",
    };
  }
}
module.exports = FireConfig;
