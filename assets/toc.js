// Marks the table of contents link for the section currently being read.
(function () {
  const links = Array.from(document.querySelectorAll('.toc a'));
  const targets = links.map((link) => document.getElementById(link.hash.slice(1)));

  function update() {
    const line = window.innerHeight * 0.3;
    let current = 0;
    targets.forEach((target, i) => {
      if (target.getBoundingClientRect().top <= line) current = i;
    });
    // At the bottom of the page the last sections may never cross the line.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) current = targets.length - 1;
    links.forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', update);
  document.addEventListener('toggle', update, true);
  update();
})();
