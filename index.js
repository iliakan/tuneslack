const buttons = require('sdk/ui/button/action');
// let { Cc, Ci } = require('chrome');

var os = require("sdk/system").platform.toLowerCase();
var child_process = require("sdk/system/child_process");

buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  doOpen("http://ya.ru/");
}

function doOpen(url) {
  let args, path;
  if (os == "winnt") {
    path = "C:\\Windows\\System32\\cmd.exe";
    args = ["/c", "start", "https://google.com"];
  }
  else if (os == "darwin") {
    path = "/usr/bin/open";
    args = ["https://google.com"];
  }
  else if (os == "linux") {
    path = "/usr/bin/xdg-open";
    args = ["https://google.com"];
  }

  console.log("!!!!", os, path, args);

  var ls = child_process.spawn(path, args);

  ls.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

  ls.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });

  ls.on('close', function(code) {
    console.log('child process exited with code ' + code);
  });
}
