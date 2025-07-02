document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded');
  const chapterCards = document.querySelectorAll('.chapter-card');
  console.log(`Found ${chapterCards.length} chapter cards`);

  chapterCards.forEach(card => {
    const header = card.querySelector('.chapter-header');
    const body = card.querySelector('.chapter-body');

    header.addEventListener('click', () => {
      console.log('Card clicked', card);
      card.classList.toggle('is-expanded');
      if (card.classList.contains('is-expanded')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0';
      }
    });
  });
});