document.addEventListener('DOMContentLoaded', () => {
  const chapterCards = document.querySelectorAll('.chapter-card');
  const searchInput = document.getElementById('chapter-search');

  // Store original summary HTML to remove highlights later
  chapterCards.forEach(card => {
    const summary = card.querySelector('.summary');
    if (summary) {
      summary.dataset.originalHtml = summary.innerHTML;
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.trim().toLowerCase();

      chapterCards.forEach(card => {
        const summary = card.querySelector('.summary');
        const originalHtml = summary ? summary.dataset.originalHtml : '';
        let isMatch = false;

        if (summary && originalHtml) {
          const content = summary.textContent.toLowerCase();
          isMatch = content.includes(searchTerm);

          // Reset and highlight
          summary.innerHTML = originalHtml;
          if (searchTerm && isMatch) {
            const regex = new RegExp(`(${e.target.value})`, 'gi');
            summary.innerHTML = originalHtml.replace(regex, `<mark>$1</mark>`);
          }
        }
        
        card.style.display = isMatch || !searchTerm ? '' : 'none';
      });
    });
  }

  chapterCards.forEach(card => {
    const header = card.querySelector('.chapter-header');
    const body = card.querySelector('.chapter-body');

    header.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('is-expanded');

      // Close all cards
      chapterCards.forEach(c => {
        c.classList.remove('is-expanded');
        c.querySelector('.chapter-body').style.maxHeight = '0';
      });

      // If the clicked card was not previously expanded, expand it.
      if (!wasExpanded) {
        card.classList.add('is-expanded');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
});