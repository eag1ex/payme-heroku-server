### Payme firebase server


#### About
Express.js server with Firebase/firestore SDK api


#### Depreciation notice
This project is no longer maintained *(because Im busy building new exciting things!).* If you find something is not working, please check release date of the project, and adjust to corresponding Node.js (even) version, then it should work.

If you are interested in my work and have questions about this project, **please drop me a comment, or email me, thanks!**




#### AVAILABLE APIS

```sh
{BASE}/allInvoices GET
{BASE}/invoice/{id} GET
{BASE}/invoices/add POST
{BASE}/invoices/{id} DELETE
```

#### Firebase quick start
https://firebase.google.com/docs/firestore/server/quickstart

Database rules
https://www.securecoding.com/blog/cloud-firestore-security-policy/


#### MongoDB installation guide
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
https://www.mongodb.com/docs/manual/reference/configuration-options/#std-label-conf-file

```sh
## on ubuntu database config is here
cat /etc/mongod.conf

## start mongodb
sudo systemctl start mongod
```

