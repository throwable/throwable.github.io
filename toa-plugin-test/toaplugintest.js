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
    var destination;
    if (document.referrer != null)
        destination = getDomain(document.referrer);
    else
        destination = getDomain(window.opener.document.location.toString());

    var buffer;
    if (typeof data === 'string')
        buffer = data;
    else
        buffer = JSON.stringify(data);
    console.log("*** Send message to "+ destination + "\n", data);
    parent.postMessage(buffer, destination);
};

window.addEventListener("message", getPostMessageData, false);
var openerLocation;
if (window.opener != null)
    openerLocation = .document.location.toString();
console.log('*** Plugin loaded, referrer: ' + document.referrer + ", openerLocation: " + openerLocation);
sendPostMessageData('{"apiVersion": 1,"method": "ready"}');
