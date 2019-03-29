if (window.location.pathname === '/projects') {
  function ready(fn) {
    if (
      document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'
    ) {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(() => {
    const projects = document.getElementById('sortable');
    const sortable = Sortable.create(projects);
  });
}
