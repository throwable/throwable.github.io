function getDomain(url)
{
    if (url != '') {
        if (url.indexOf("://") > -1) {
            return url.split('/')[2];
        }
        else {
            return url.split('/')[0];
        }
    }
    return '';
}

function getPostMessageData(event)
{
    console.log("*** Message received from "+ getDomain(event.origin) + "\n", event);
};

function sendPostMessageData(data)
{
    var destination = getDomain(document.referrer);

    var buffer;
    if (typeof data === 'string')
        buffer = data;
    else
        buffer = JSON.stringify(data);
    console.log("*** Send message to "+ destination + "\n", data);
    parent.postMessage(buffer, destination);
};

window.addEventListener("message", getPostMessageData, false);
console.log('*** Plugin loaded')
sendPostMessageData('{"apiVersion": 1,"method": "ready"}');
