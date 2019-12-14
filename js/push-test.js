var webPush = require('web-push');
 
const keys = {
   "publicKey": "BOZn8CErs6kN5pioue5V6a2rDjBIOJj9LQsbbhDQQpqibL6M2RevvSGzHBr-W6oEyuxvQjGgd4UAlvF3bzXbOcY",
   "privateKey": "VZo-A4X5WM3e2nT6VvSn9gzkb8UQMuczzMblFov73aA",
   "endpoint": "https://fcm.googleapis.com/fcm/send/fZF0t6IZQUM:APA91bEWUqJFOWQtjD9I6dWJ-U9LuVQOqpZ3BWwhFvskSHLhSwwlsBcw0oCqU6rtpEs0JvUjNOKc2dXdycyX5kBriVEsawJeZ3zr7POA3JKMi7iXm_lNXOCTsKncQ5LN0CQNLs1YCPbt",
   "p256dh": "BLR9SchiZ9WOXOnVmEDYbzZ7deuzP4faRMvcYn6Nw2Nq4Z47M3Qycvg+sRR/KPWkxmQd/0qm1vOCYVDjgEjyPF4=",
   "auth": "Z8tQFCTKZUPNTaY2y1r8pw=="
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