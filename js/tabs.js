document.querySelectorAll('.tab-page').forEach((page) => {
  const tabs = Array.from(page.querySelectorAll('[role="tab"]'));

  function selectTab(tab, focus = false) {
    page.classList.add('has-selection');
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[next], true);
    });
  });

  const initial = tabs.find((tab) => `#${tab.getAttribute('aria-controls')}` === location.hash);
  if (initial) selectTab(initial);
  else if (tabs[0]) tabs[0].tabIndex = 0;
});
