document.addEventListener('DOMContentLoaded', () => {
  const chapterCards = document.querySelectorAll('.chapter-card');

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