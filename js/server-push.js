var webPush = require('web-push');

webPush.setGCMAPIKey('AIzaSyBUyrfj6_pGWkGbAOkjGc6xjaeaKObkcmI');

module.exports = function(app, route) {
    app.post(route + 'register', function(req, res) {
            res.sendStatus(201);
    });

    app.post(route + 'sendNotification', function(req, res) {
        setTimeout(function() {
            webPush.sendNotification(req.query.endpoint, {
                TTL: req.query.ttl
            })
                .then(function() {
                    res.sendStatus(201);
                });
        }, req.query.delay * 1000);
    });
};