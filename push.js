var webPush = require('web-push');
 
const keys = {
   "publicKey": "BOZn8CErs6kN5pioue5V6a2rDjBIOJj9LQsbbhDQQpqibL6M2RevvSGzHBr-W6oEyuxvQjGgd4UAlvF3bzXbOcY",
   "privateKey": "VZo-A4X5WM3e2nT6VvSn9gzkb8UQMuczzMblFov73aA",
   "endpoint": "https://fcm.googleapis.com/fcm/send/cJlelgd1ddc:APA91bGXYGFpxoe_5SLPg6NhRytAf-n3NJNw0j6Ra7xjS6HPPbc6EesMG0XH4mUNpiBqWsWY_63cHWi1crqwQCUxzc-Q-qJNZPY7Owx4LYsJ6CcQQAQJY4uu5m7qidlyJifSYifnKGu9",
   "p256dh": "BNa0xTDbbKiJUvQbOxmIfa72ZKlWJJOq2UDgO4JHp54EJPiz1UJZlNuUzPhkVzj3jkF10GHW2ZkZ2xk9zHYEDuU=",
   "auth": "aeddM1nFaam/z02wUWQJhg=="
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