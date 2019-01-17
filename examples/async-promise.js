(function () {
    'use strict';
    const invokeAsWebVI = window.webvisimulator.invokeAsWebVI;
    const asyncTimeout = function (waitms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, waitms);
        });
    };

    let value = 0;
    const TIMEOUT_MS = 10;
    const increment = async function () {
        await asyncTimeout(TIMEOUT_MS);
        value += 1;
        return value;
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
