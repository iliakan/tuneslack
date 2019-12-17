
document.addEventListener('click', function(e) {
  let a = e.target.closest('a');
  if (!a) return;

  let href = a.getAttribute('href');
  if (href.includes('://')) {
    self.port.emit("openLink", href);
    e.preventDefault();
  }
});
