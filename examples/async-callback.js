(function () {
    'use strict';
    const invokeAsWebVI = window.webvisimulator.invokeAsWebVI;
    let value = 0;
    const TIMEOUT_MS = 10;
    const increment = function (jsapi) {
        const completionCallback = jsapi.getCompletionCallback();
        setTimeout(function () {
            value += 1;
            completionCallback(value);
        }, TIMEOUT_MS);
    };
    const incrementElement = document.getElementById('increment');
    const incrementResultElement = document.getElementById('incrementResult');

    incrementElement.addEventListener('click', async function () {
        const result = await invokeAsWebVI('webvitests.increment', []);
        incrementResultElement.textContent = result;
    });

    window.webvitests = {
        increment
    };
}());
