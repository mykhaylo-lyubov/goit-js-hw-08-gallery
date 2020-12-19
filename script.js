import primaryArrayOfImages from "./gallery-items.js";

const refs = {
  listOfImages: document.querySelector(".js-gallery"),
  divToOpenModal: document.querySelector(".js-lightbox"),
  btnToCloseModal: document.querySelector(
    "button[data-action='close-lightbox']"
  ),
  modalContentImgRef: document.querySelector(".lightbox__image"),
  divOverlay: document.querySelector(".lightbox__overlay"),
};

const createListItems = () => {
  //   let newArrOfTags = [];
  let newArrOfTags = primaryArrayOfImages.map((item, idx) => {
    const tagLi = document.createElement("li");
    tagLi.classList.add("gallery__item");

    const tagA = document.createElement("a");
    tagA.classList.add("gallery__link");
    tagA.setAttribute("href", item.original);

    const imgTag = document.createElement("img");
    imgTag.classList.add("gallery__image");
    imgTag.setAttribute("data-lazy", item.preview);
    imgTag.setAttribute("data-source", item.original);
    imgTag.setAttribute("alt", item.description);
    imgTag.setAttribute("data-index", idx);

    tagA.append(imgTag);
    tagLi.append(tagA);

    return tagLi;
    // newArrOfTags.push(tagLi);
  });
  refs.listOfImages.append(...newArrOfTags);
};
createListItems();
let indexOfImgToShow;

refs.listOfImages.addEventListener("click", onImgClickOpenModal);

refs.btnToCloseModal.addEventListener("click", onBtnCloseModal);

refs.divOverlay.addEventListener("click", onDivOverlay);

function onImgClickOpenModal(event) {
  window.addEventListener("keydown", onPressEscape);
  window.addEventListener("keydown", onArrowKeys);

  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const clickedImgRef = event.target.dataset.source;
  const indexOfImgClicked = Number(event.target.dataset.index);
  indexOfImgToShow = indexOfImgClicked;
  const clickedImgAltRef = event.target.getAttribute("alt");

  refs.divToOpenModal.classList.add("is-open");

  refs.modalContentImgRef.src = clickedImgRef;
  refs.modalContentImgRef.alt = clickedImgAltRef;
}

function onBtnCloseModal() {
  window.removeEventListener("keydown", onPressEscape);
  window.removeEventListener("keydown", onArrowKeys);
  classAndAttributesRemoval();
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    classAndAttributesRemoval();
    onBtnCloseModal();
  }
}

function onDivOverlay() {
  onBtnCloseModal();
}

function onArrowKeys(event) {
  if (event.code === "ArrowLeft") {
    indexOfImgToShow -= 1;
    if (indexOfImgToShow < 0) {
      indexOfImgToShow = 0;
      return;
    }
    const nextImgToShowLeft = document.querySelector(
      `img[data-index='${indexOfImgToShow}']`
    );
    const leftImgToShowRef = nextImgToShowLeft.dataset.source;
    const leftImgAltRef = nextImgToShowLeft.getAttribute("alt");

    refs.modalContentImgRef.src = leftImgToShowRef;
    refs.modalContentImgRef.alt = leftImgAltRef;
  }

  if (event.code === "ArrowRight") {
    indexOfImgToShow += 1;
    if (indexOfImgToShow > primaryArrayOfImages.length - 1) {
      indexOfImgToShow = primaryArrayOfImages.length - 1;
      return;
    }
    const nextImgToShowRight = document.querySelector(
      `img[data-index='${indexOfImgToShow}']`
    );
    const rightImgToShowRef = nextImgToShowRight.dataset.source;
    const rightImgAltRef = nextImgToShowRight.getAttribute("alt");

    refs.modalContentImgRef.src = rightImgToShowRef;
    refs.modalContentImgRef.alt = rightImgAltRef;
  }
}

function classAndAttributesRemoval() {
  refs.divToOpenModal.classList.remove("is-open");
  refs.modalContentImgRef.src = "";
  refs.modalContentImgRef.alt = "";
}

// =========== intersectionObserver ==================

const allImagesRefs = refs.listOfImages.querySelectorAll(".gallery__image");

const options = {
  rootMargin: "100px",
};

const onEntries = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imageInViewport = entry.target;
      const src = imageInViewport.dataset.lazy;
      imageInViewport.src = src;

      observer.unobserve(imageInViewport);
    }
  });
};

const io = new IntersectionObserver(onEntries, options);

allImagesRefs.forEach((image) => io.observe(image));
