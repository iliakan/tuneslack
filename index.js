const os = require("sdk/system").platform.toLowerCase();
const pageMod = require("sdk/page-mod");
const child_process = require("sdk/system/child_process");

function openLink(url) {
  let args, path;
  if (os == "winnt") {
    path = "C:\\Windows\\System32\\cmd.exe";
    args = ["/c", "start", url];
  }
  else if (os == "darwin") {
    path = "/usr/bin/open";
    args = [url];
  }
  else if (os == "linux") {
    path = "/usr/bin/xdg-open";
    args = [url];
  }

  console.log("Open", os, path, args);

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

pageMod.PageMod({
  include: "*.slack.com",
  // include: "*",
  contentScriptFile: "./onclick.js",
  contentScriptWhen: "ready",
  onAttach: function(worker) {
    worker.port.on("openLink", openLink);
  }
});
