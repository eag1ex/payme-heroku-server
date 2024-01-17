/*
 * AVAILABLE APIS:
 * {BASE}/allInvoices GET
 * {BASE}/invoice/{id} GET
 * {BASE}/invoices/add POST
 * {BASE}/invoices/{id} DELETE
 */
const express = require("express");
const app = express();
const InvoiceModelLayer = require("./invoice-model-layer");
const fireStore = require("../firestore/fire.module");
const fstor = new fireStore(true);

module.exports = (app) => {
  app.post("/api/invoices/add", function (req, res) {
    const body = req.body || {};

    if (Number(body.name)) {
      return res
        .status(400)
        .json({ error: true, message: "name cannot be a number" });
    }
    const validName = validationForSpecialchar(
      body.name.toString(),
      `^*_|~={}[]:;<>@#]$%()!?'"+&`
    );
    const validValue = validationForSpecialchar(
      body.value.toString(),
      `^*_|~={}[]:;<>@#]$%()!?.,'"+&`
    );
    const validEmail = validationForSpecialchar(
      body.email.toString(),
      `^*|~={}[]:;,<>#]$%()!?'"+&`
    );
    if (!validName || !validValue || !validEmail) {
      console.log("validEmail", validEmail);
      return res.status(400).json({
        error: true,
        message: "name, email or value fields are not valid",
      });
    }

    /// set our model
    body.date = new Date().getTime();
    const invoiceModel = new InvoiceModelLayer();
    Object.assign(invoiceModel, body);
    /// end
    if (!invoiceModel.ok())
      return res
        .status(400)
        .json({ error: true, message: "wrong params setting" });

    fstor.setNewDynamicDocument("inv", invoiceModel.data(), (resp) => {
      if (resp.error) return res.status(400).json(resp);
      else return res.status(200).json(resp);
    });
  });

  app.get("/api/allInvoices", function (req, res) {
    fstor.getAllInCollection("inv", (resp) => {
      if (resp.error) {
        return res.status(400).json(resp);
      } else {
        return res.status(200).json(resp);
      }
    });
  });

  app.delete("/api/invoices/:ids", function (req, res) {
    let ids = decodeURIComponent(req.params.ids);
    let idsArr = ids.split(",");
    if (!idsArr.length) {
      return res.status(400).json({ error: true, message: "no ids found" });
    }
    const testZero = idsArr.filter((n) => Number(n) === 0).length;
    if (testZero)
      return res
        .status(400)
        .json({ error: true, message: "you cannot specify 0 as an id" });

    const testNumbers = idsArr.filter((n) => Number(n) === NaN).length;
    if (testNumbers)
      return res
        .status(400)
        .json({ error: true, message: "you must specify number for id" });

    fstor.deleteDocuments(idsArr, "inv", (resp) => {
      console.log("deleteDocuments", resp);
      if (resp.error) return res.status(400).json(resp);
      else return res.status(200).json(resp);
    });
  });

  app.get("/api/invoice/:id", function (req, res) {
    var id = Number(req.params.id);
    if (id === 0)
      return res
        .status(400)
        .json({ error: true, message: "id:0 is not valid" });
    if (!id)
      return res
        .status(400)
        .json({ error: true, message: "you must specify number for id" });
    fstor.getOne(id, "inv", (resp) => {
      if (resp.error) return res.status(400).json(resp);
      else return res.status(200).json(resp);
    });
  });

  app.all("/api/*", function (req, res) {
    return res
      .status(400)
      .json({ error: true, message: "api route not found", query: req.url });
  });

  function validationForSpecialchar(str, validatefor = `[^*_|~={}[]:;<>@#]`) {
    if (!str) return true;
    const bad = validatefor || `[^*_|~={}[]:;<>@#]`.toLowerCase();
    let invalid = false;
    for (let i = 0; i < bad.length; i++) {
      if (str.toLowerCase().indexOf(bad[i]) !== -1) {
        console.log("bad ", bad[i], str);
        invalid = true;
        break;
      }
    }
    return !invalid;
  }
};
