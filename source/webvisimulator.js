(function () {
    'use strict';

    const validPrimitives = ['boolean', 'string', 'number', 'undefined'];
    const validInstances = [Uint8Array, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array];
    const validateReturnType = function (val) {
        const isValid = validPrimitives.find(name => typeof val === name) !== undefined || validInstances.find(klass => val instanceof klass) !== undefined;
        if (isValid === false) {
            throw new Error(`Return value is not a type supported by the JSLI. Returned value: ${val}`);
        }
        return val;
    };

    // A simulator for invoking a JS function in a manner similar to WebVIs
    // Error handling is not as comprehensive as for WebVIs so behaviors will differ
    const invokeAsWebVI = function (functionName, args) {
        // Lookup function and context in global scope
        const fn = functionName.split('.').reduce((obj, ns) => obj[ns], window);
        const context = functionName.split('.').slice(0, -1).reduce((obj, ns) => obj[ns], window);

        if (fn === undefined || context === undefined) {
            throw new Error(`Could not find function and context for function named: ${functionName}`);
        }

        // Used to flag that the user will complete the function asynchronously
        let completePromise;
        const createCallbackAndSetAsyncFlag = function () {
            if (completePromise !== undefined) {
                throw new Error('Completion callback already retrieved for this JSLI instance');
            }

            let callback;
            // Set flag that user wants to complete asynchronously
            completePromise = new Promise(function (resolve, reject) {
                callback = function (result) {
                    if (result instanceof Error) {
                        reject(result);
                        return;
                    }

                    resolve(validateReturnType(result));
                };
            });
            return callback;
        };

        const createJSAPI = function () {
            const getCompletionCallback = function () {
                return createCallbackAndSetAsyncFlag();
            };

            return {
                getCompletionCallback
            };
        };

        // User signals wanting access to the jsapi
        let result;
        if (fn.length === args.length + 1) {
            result = fn.apply(context, [...args, createJSAPI()]);

            // Asynchronous completion, so user synchronous result ignored
            if (completePromise !== undefined) {
                return completePromise;
            }
        }

        result = fn.apply(context, args);
        if (result instanceof Promise) {
            const jsapi = createJSAPI();
            const completionCallback = jsapi.getCompletionCallback();
            result.then(completionCallback).catch(completionCallback);
            return completePromise;
        }

        // Users wants simple synchronous function execution
        return validateReturnType(result);
    };

    // Wrapper to expose called function name and parameters in call stack
    const maxArgLength = 100;
    const createNewName = function (functionName, args) {
        const parametersMerged = args
            .map(arg => String(arg))
            .map(arg => {
                if (arg.length > maxArgLength) {
                    return arg.substring(0, maxArgLength) + '...';
                }
                return arg;
            })
            .join(' 💌 ');

        let parametersFormatted = '';
        if (args.length > 0) {
            parametersFormatted = ` 📌 ${parametersMerged} 📌 `;
        }
        return `invokeAsWebVI 🚀 ${functionName}${parametersFormatted}`;
    };

    const invokeAsWebVIWithName = function (functionName, args) {
        const newName = createNewName(functionName, args);
        const invokeAsWebVIWrapper = function () {
            return invokeAsWebVI(functionName, args);
        };
        Object.defineProperty(invokeAsWebVIWrapper, 'name', {
            value: newName
        });
        return invokeAsWebVIWrapper();
    };

    window.webvisimulator = {};
    window.webvisimulator.invokeAsWebVI = invokeAsWebVIWithName;
}());
