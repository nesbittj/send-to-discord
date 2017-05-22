
function storageError(error) {
  console.log(`Error: ${error}`);
}

function storageGet(item) {
    var path = "";
    if (item.webhook) {
        path = item.webhook;
    }

    if(path == "") {
        return false;
    }

    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        var httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Error creating XMLHttpRequest');
            return false;
        }

        // httpRequest.onreadystatechange = function() {
        //     if(httpRequest.readyState == XMLHttpRequest.DONE) {
        //         console.log("send_to_discord http result: " + httpRequest.status);
        //     }
        // };
        httpRequest.open('POST', path, true);
        httpRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        httpRequest.send(JSON.stringify({ "content": tabs[0].url }));
    });
}

function handleClick(tabs) {
    var getting = browser.storage.local.get("webhook");
    getting.then(storageGet, storageError);
}

browser.browserAction.onClicked.addListener(handleClick);
