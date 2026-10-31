(() => {
  const papers = [...document.querySelectorAll('.paper')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('#paper-search');
  let active = 'All';
  function update() {
    const query = search.value.toLocaleLowerCase().trim();
    let count = 0;
    for (const paper of papers) {
      const visible = (active === 'All' ? paper.dataset.hideFromAll !== 'true' : paper.dataset.topic === active) && paper.textContent.toLocaleLowerCase().includes(query);
      paper.hidden = !visible;
      count += Number(visible);
    }
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === active)));
    document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'paper' : 'papers'}${active === 'All' ? ' · all research topics' : ' · ' + active}`;
    document.querySelector('.empty').hidden = count > 0;
  }
  filters.forEach(button => button.addEventListener('click', () => { active = button.dataset.filter; update(); }));
  document.querySelectorAll('[data-filter-link]').forEach(link => link.addEventListener('click', () => { active = link.dataset.filterLink; search.value = ''; update(); }));
  search.addEventListener('input', update);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('#about, #research, #publications').forEach(section => observer.observe(section));
  }
  update();
})();

// Enhance optional paper figures; image links still work without dialog support.
(() => {
  document.querySelectorAll('[data-paper-dialog]').forEach(trigger => {
    const dialog = document.getElementById(trigger.dataset.paperDialog);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    trigger.addEventListener('click', event => {
      event.preventDefault();
      if (dialog.open) return;
      dialog.returnFocus = trigger;
      dialog.previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      dialog.scrollTop = 0;
      dialog.querySelector('.paper-dialog-close').focus();
    });
  });
  document.querySelectorAll('.paper-dialog').forEach(dialog => {
    dialog.querySelector('.paper-dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = dialog.previousOverflow || '';
      if (dialog.returnFocus && dialog.returnFocus.isConnected) dialog.returnFocus.focus();
    });
  });
})();
