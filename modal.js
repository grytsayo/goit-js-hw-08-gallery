import galleryItems from './app.js';

const refs = {
    galleryRef: document.querySelector('.js-gallery'),
    lightboxRef: document.querySelector('.js-lightbox'),
    lightboxImageRef: document.querySelector('.lightbox__image'),
    // overlayRef: document.querySelector('.lightbox__overlay'),
    // lightboxContentRef: document.querySelector('.lightbox__content'),
    // lightboxButtonRef: document.querySelector('.lightbox__button'),
};

const galleryMarkup = createGallery().join(' ');
refs.galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGallery() {
    return galleryItems.map(({preview, original, desc}, index) => {
        return `
        <li class="js-gallery__item">
            <a class="js-gallery__link" href="${original}">
                 <img class="gallery__image" 
                 src="${preview}" 
                 alt="${desc}" 
                 data-source="${original}"
                 data-picture="${index}"
                 />
            </a>
        </li>
        `;
    });
};

//modal 

refs.galleryRef.addEventListener('click', onOpenModal);
refs.lightboxRef.addEventListener('click', onCloseModal);

function onOpenModal(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== "IMG") {
        return;
    }
    refs.lightboxRef.classList.add("is-open");
    refs.lightboxImageRef.src = evt.target.dataset.source;
    window.addEventListener("keyup", closeByEscape);
}

function onCloseModal(evt) {
    if (evt.target.nodeName === "IMG") {
        return;
    }
    window.removeEventListener("keyup", closeByEscape);
    refs.lightboxRef.classList.remove("is-open");
    refs.lightboxImageRef.src = "#";
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        onCloseModal(evt);
    }
}

