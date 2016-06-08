function testXHRWithPreflight(preflightCode, expectedSuccess) {
    return promise_test(function(test) {
        var client = new XMLHttpRequest();

        var resolvePromise;
        var promise = new Promise(function(resolve) {
            resolvePromise = resolve;
        });

        var success = false;
        client.onload = function() {
            resolvePromise(client.responseText =="DIRECT");
        }
        client.onerror = function() {
            resolvePromise(false);
        }

        client.open("GET", "https://" + window.location.hostname + ":" + "{{ports[https][0]}}" + "/XMLHttpRequest/resources/preflight.py?preflightCode=" + preflightCode);
        // Set progress event handler to activate preflight.
        client.setRequestHeader("x-test", "x-value");
        client.send();

        return promise.then(function(success) {
             assert_equals(success, expectedSuccess);
        });
    }, "Test CORS preflight response code " + preflightCode);
}

testXHRWithPreflight(200, true);
testXHRWithPreflight(201, true);
testXHRWithPreflight(204, true);
testXHRWithPreflight(299, true);
testXHRWithPreflight(300, false);
testXHRWithPreflight(301, false);
testXHRWithPreflight(302, false);
testXHRWithPreflight(303, false);
testXHRWithPreflight(404, false);
testXHRWithPreflight(500, false);
testXHRWithPreflight(600, false);
