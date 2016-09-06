self.addEventListener('push', function(event) {
    event.waitUntil(
        self.registration.showNotification('Test push message', {
            body: 'Test for UT',
            vibrate: [500, 100, 500]
        })
    );
});