
document.addEventListener('click', function(e) {
  let a = e.target.closest('a');
  if (!a) return;

  let href = a.getAttribute('href');
  if (href.includes('://')) {
    e.preventDefault();
    browser.runtime.sendMessage({
      cmd: 'open.in.default',
      url: href
    });
  }
});
