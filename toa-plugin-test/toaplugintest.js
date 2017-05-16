function getDomain(url)
{
    if (url != '') {
        if (url.indexOf("://") > -1) {
            var parts = url.split('/');
            return parts[0]+"//"+parts[2];
        }
        else {
            return url.split('/')[0];
        }
    }
    return '';
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function getPostMessageData(event)
{
    console.log("*** Message received from "+ getDomain(event.origin) + "\n", event);
    var pre = document.getElementById("message_body");
    pre.innerHTML = syntaxHighlight(event.data);
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
    openerLocation = window.opener.document.location.toString();

console.log('*** Plugin loaded, referrer: ' + document.referrer + ", openerLocation: " + openerLocation);
sendPostMessageData('{"apiVersion": 1,"method": "ready"}');
