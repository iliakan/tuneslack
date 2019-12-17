
chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.cmd === 'open-in-default') {
    open(request.href, sender.tab.id);
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

  chrome.runtime.sendNativeMessage(app.id, {
    cmd: 'exec',
    path: command,
    arguments: args,
  }, console.log);
}
