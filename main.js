// alert("hello")

if ('serviceWorker' in navigator) {
    //console.log("service worker register");
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log("Service worker registered"))
            .catch(err => console.log("Error while sw registeration"))


        navigator.serviceWorker.ready.then(function (swreg) {
            return swreg.sync.register('outbox');
        });
        // document.querySelector('#btn').addEventListener('click', async () => {
        //     console.log("btn clicked")
        //     navigator.serviceWorker.ready.then(function (registration) {
        //         registration.sync.register('outbox').then(function () {
        //             // registration succeeded
        //         }, function () {
        //             // registration failed
        //         });
        //     });
        // });


        // navigator.serviceWorker.ready.then(function (registration) {
        //     return registration.sync.register('outbox').then(function () {
        //         // registration succeeded
        //     }, function () {
        //         // registration failed
        //     });
        // });
    });


}