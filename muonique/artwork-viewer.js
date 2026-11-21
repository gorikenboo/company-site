const artworkGallery = document.querySelector('#mq-artworks .mq-gallery');
const artworkViewer = document.querySelector('#mq-art-viewer');

if (artworkGallery && typeof artworkViewer?.showModal === 'function') {
  const viewerTitle = artworkViewer.querySelector('h2');
  const viewerImage = artworkViewer.querySelector('img');

  artworkGallery.querySelectorAll('.mq-art-photo').forEach((link) => {
    const artworkTitle = link.closest('figure').querySelector('h3').textContent;
    const artworkImage = link.querySelector('img');
    link.setAttribute('aria-haspopup', 'dialog');

    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      viewerTitle.textContent = artworkTitle;
      viewerImage.alt = artworkImage.alt;
      viewerImage.src = link.href;
      artworkViewer.showModal();
    });
  });
}
