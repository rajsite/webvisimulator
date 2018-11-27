(function () {
    'use strict';
    const invokeAsWebVI = window.webvisimulator.invokeAsWebVI;
    let value = 0;
    const increment = function () {
        value += 1;
        return value;
    };
    const incrementElement = document.getElementById('increment');
    const incrementResultElement = document.getElementById('incrementResult');

    incrementElement.addEventListener('click', function () {
        const result = invokeAsWebVI('webvitests.increment', []);
        incrementResultElement.textContent = result;
    });

    window.webvitests = {
        increment
    };
}());
