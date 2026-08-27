const dialog = document.querySelector('[data-search-dialog]');
const input = document.querySelector('[data-search-input]');
const results = document.querySelector('[data-search-results]');
const openButton = document.querySelector('[data-search-open]');
const closeButton = document.querySelector('[data-search-close]');

if (dialog instanceof HTMLDialogElement && input instanceof HTMLInputElement && results) {
  let pagefind = null;
  let loadFailed = false;

  async function ensureIndex() {
    if (pagefind || loadFailed) return;

    try {
      pagefind = await import('/pagefind/pagefind.js');
      await pagefind.init();
    } catch (error) {
      console.error('Documentation search could not load.', error);
      loadFailed = true;
    }
  }

  function showMessage(text) {
    const message = document.createElement('p');
    message.className = 'search__message';
    message.textContent = text;
    results.replaceChildren(message);
  }

  function showHits(hits) {
    const links = hits.map((hit) => {
      const link = document.createElement('a');
      const title = document.createElement('strong');
      const excerpt = document.createElement('span');

      link.className = 'search__hit';
      link.href = hit.url;
      title.textContent = hit.meta.title ?? 'Untitled';
      // Pagefind encodes source HTML before it adds its own mark elements.
      excerpt.innerHTML = hit.excerpt;
      link.append(title, excerpt);

      return link;
    });

    results.replaceChildren(...links);
  }

  async function run(term) {
    if (term.trim().length < 2) {
      results.replaceChildren();
      return;
    }

    await ensureIndex();

    if (!pagefind) {
      showMessage('Search is available after a production build.');
      return;
    }

    const search = await pagefind.search(term);
    const hits = await Promise.all(search.results.slice(0, 8).map((hit) => hit.data()));

    if (hits.length === 0) {
      showMessage(`No results for “${term}”.`);
      return;
    }

    showHits(hits);
  }

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => run(input.value), 140);
  });

  const open = () => {
    dialog.showModal();
    input.value = '';
    results.replaceChildren();
    input.focus();
  };

  openButton?.addEventListener('click', open);
  closeButton?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener('keydown', (event) => {
    const typingElsewhere =
      event.target instanceof HTMLElement &&
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);

    if (event.key === '/' && !dialog.open && !typingElsewhere) {
      event.preventDefault();
      open();
    }

    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      dialog.open ? dialog.close() : open();
    }
  });
}
