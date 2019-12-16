var webPush = require('web-push');
 
const keys = {
   "publicKey": "BOZn8CErs6kN5pioue5V6a2rDjBIOJj9LQsbbhDQQpqibL6M2RevvSGzHBr-W6oEyuxvQjGgd4UAlvF3bzXbOcY",
   "privateKey": "VZo-A4X5WM3e2nT6VvSn9gzkb8UQMuczzMblFov73aA",
   "endpoint": "https://fcm.googleapis.com/fcm/send/fdMHH6LGHvA:APA91bEJ89rELB_KBtXzVUdcAZSHscZt2X_n1oJVQSY9b2Rv5Jfcy4sgiwOn-QjThgaRl76_Lk5A2MJVWF2-FpXAPPIoZH_BMF2qGS611LKOrHwU31okudG-QBhp5eM4Dh0EcxyKZxkb",
   "p256dh": "BOf2O3Fb6t6XZSNJdx+qoy9r1nSE+dK1PtKjT2QfDZOBwGln9MhPEzqmjC71miE+Zi0rXtlTpMpgWiFS6C4QUpg=",
   "auth": "khCfklq5J3+KwKyDKjCWDQ=="
};
 
 
webPush.setVapidDetails(
   'mailto:contact@uclzones.com',
   keys.publicKey,
   keys.privateKey
)
var pushSubscription = {
   "endpoint": keys.endpoint,
   "keys": {
       "p256dh": keys.p256dh,
       "auth": keys.auth
   }
};
var payload = 'Bayern Munchen berhasil mengambil alih posisi 1 di Group B. Cek statistik lengkapnya di UCL Zones.';
 
var options = {
   gcmAPIKey: '542504873041',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);