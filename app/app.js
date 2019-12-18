#!/usr/local/bin/node
const util = require('util');
const fs = require('fs');
const spawn = require('child_process').spawn;


const LOG_ENABLED = false;


function log(...args) {
  if (!LOG_ENABLED) return;
  
  fs.appendFileSync('/tmp/app.log', new Date().toString());
  for(let arg of args) fs.appendFileSync('/tmp/app.log', ' ' + util.inspect(arg));
  fs.appendFileSync('/tmp/app.log', '\n');
}


function openLink(url) {
  let args, path;
  if (process.platform == "win32") {
    path = "C:\\Windows\\System32\\cmd.exe";
    args = ["/c", "start", url];
  } else if (process.platform == "darwin") {
    path = "/usr/bin/open";
    args = [url];
  } else if (process.platform == "linux") {
    path = "/usr/bin/xdg-open";
    args = [url];
  } else {
    log("Unsupported platform");
  }

  log("Open", path, args);
  let child = spawn(path, args);

  child.stdout.on('data', function(data) {
    log('stdout: ' + data);
  });

  child.stderr.on('data', function(data) {
    log('stderr: ' + data);
  });

  child.on('close', function(code) {
    log('child process exited with code ' + code);
  });
}


try {
  fs.unlinkSync('/tmp/app.log');
} catch(e) {}

log("started");

process.stdin.on('data', (input) => {
  log("DATA", JSON.stringify(input));

  let msgLen = input.readUInt32LE(0);
  let dataLen = msgLen + 4;
  log("dataLen", msgLen);

  if (input.length >= dataLen) {
    let content = input.slice(4, dataLen).toString();
    let json = JSON.parse(content)
    log("Got", content, json);
    openLink(json.url);
    // sendMessage(json);
  }
});

// doesn't work somewhy
function sendMessage(msg) {
  msg = JSON.stringify(msg);
  let header = Buffer.alloc(4);
  header.writeUInt32LE(msg.length, 0);

  log("Send", header, msg);

  process.stdout.write(header);
  process.stdout.write(msg);
}

process.on('uncaughtException', (err) => {
  log("Error", err);
});
