(() => {
  const title = document.getElementById('results-title');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!title || motion.matches) return;

  // Keep the complete heading in the accessibility tree and reserve its layout.
  title.setAttribute('aria-label', title.innerHTML.replace(/<br\s*\/?\s*>/gi, ' '));
  const characters = [];
  for (const node of Array.from(title.childNodes)) {
    if (node.nodeType !== Node.TEXT_NODE) continue;
    const fragment = document.createDocumentFragment();
    for (const character of Array.from(node.textContent)) {
      const span = document.createElement('span');
      span.textContent = character;
      span.setAttribute('aria-hidden', 'true');
      span.style.opacity = '0';
      characters.push(span);
      fragment.append(span);
    }
    node.replaceWith(fragment);
  }

  let frame;
  let start;
  let visible = 0;
  const finish = () => {
    cancelAnimationFrame(frame);
    characters.forEach(span => { span.style.opacity = '1'; });
    motion.removeEventListener('change', onMotionChange);
  };
  const onMotionChange = () => { if (motion.matches) finish(); };
  motion.addEventListener('change', onMotionChange);
  const tick = time => {
    start ??= time;
    const count = Math.min(characters.length, Math.floor((time - start) / 65) + 1);
    while (visible < count) characters[visible++].style.opacity = '1';
    if (visible < characters.length) frame = requestAnimationFrame(tick);
    else finish();
  };
  frame = requestAnimationFrame(tick);
})();
