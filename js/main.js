var endpoint;

navigator.serviceWorker.register('/js/service-worker.js')
    .then(function(registration) {
        return registration.pushManager.getSubscription()
            .then(function(subscription) {
                if (subscription) {
                    return subscription;
                }
                return registration.pushManager.subscribe({ userVisibleOnly: true });
            });
    }).then(function(subscription) {
        endpoint = subscription.endpoint;

        fetch('./register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                endpoint: subscription.endpoint
            })
        });
    });


var counter = makeCounter(),
    couterBlock = document.getElementById('count'),
    couterStrBlock = document.getElementById('countStrRes');

document.getElementById('subscribe').onclick = function(){
    var inputInt = document.getElementById('countStrNum').value;

    couterBlock.innerHTML = "Нажатий на кнопку " + counter();
    couterStrBlock.innerHTML = renderStrInt(inputInt);

    fetch('./sendNotification?endpoint=' + endpoint + '&delay=1&ttl=1',
        {
            method: 'post'
        }
    );
};


function makeCounter() {

    var currentCount = 1;

    function counter() {
        return currentCount++;
    }
    counter.set = function(value) {
        currentCount = value;
    };
    counter.reset = function() {
        currentCount = 1;
    };

    return counter;
}

function renderStrInt(num){
    var str = '',
        count = 1;

    if( isNaN(num) || num < 1) return str += "Ввели не число/ или меньше 1";

    while(count <= num){

        if(!(count % 2) || !(count % 3)){
            if( !(count % 2) ){
                str += "foo";
            }
            if( !(count % 3) ){
                str += "bar";
            }
        }else{
            str += count.toString();
        }
        str += " ";
        count++;
    }

    return str;
}












