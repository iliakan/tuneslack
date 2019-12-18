/*
function failedConnect(reason) {
	console.error('failed to connect port to native!, error:', reason.error);
}

let port = browser.runtime.connectNative("open.in.default");

port.onDisconnect.addListener(failedConnect);
console.log(port.error);
console.log(browser.runtime.lastError);
*/
browser.runtime.onMessage.addListener((request, sender) => {
  if (request.cmd === 'open.in.default') {
    console.log("SEND", request.url);
    browser.runtime.sendNativeMessage("open.in.default", {
      url: request.url
      // cmd: 'exec',
      // path: command,
      // arguments: args,
    });
  }
});

function open(url) {
  let args, path;

  if (navigator.userAgent.indexOf('Mac')) {
    path = "/usr/bin/open";
    args = [url];
  } else if (navigator.userAgent.indexOf('Linux')) {
    path = "/usr/bin/xdg-open";
    args = [url];
  } else {
    path = "C:\\Windows\\System32\\cmd.exe";
    args = ["/c", "start", url];
  }


}
