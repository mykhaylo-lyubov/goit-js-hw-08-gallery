import primaryArrayOfImages from "./gallery-items.js";

const refs = {
  list: document.querySelector(".js-gallery"),
  divToOpenModal: document.querySelector(".js-lightbox"),
  btnToCloseModal: document.querySelector(
    "button[data-action='close-lightbox']"
  ),
  modalContentImgRef: document.querySelector(".lightbox__image"),
  divOverlay: document.querySelector(".lightbox__overlay"),
};

const createListItems = () => {
  let newArrOfTags = [];
  primaryArrayOfImages.map((item) => {
    const tagLi = document.createElement("li");
    tagLi.classList.add("gallery__item");

    const tagA = document.createElement("a");
    tagA.classList.add("gallery__link");
    tagA.setAttribute("href", item.original);

    const imgTag = document.createElement("img");
    imgTag.classList.add("gallery__image");
    imgTag.setAttribute("src", item.preview);
    imgTag.setAttribute("data-source", item.original);
    imgTag.setAttribute("alt", item.description);

    tagA.append(imgTag);
    tagLi.append(tagA);

    newArrOfTags.push(tagLi);
  });
  refs.list.append(...newArrOfTags);
};

createListItems();

refs.list.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const clickedImgRef = event.target.dataset.source;
  const clickedImgAltRef = event.target.getAttribute("alt");

  refs.divToOpenModal.classList.add("is-open");

  refs.modalContentImgRef.setAttribute("src", clickedImgRef);
  refs.modalContentImgRef.setAttribute("alt", clickedImgAltRef);
});

refs.btnToCloseModal.addEventListener("click", () => {
  refs.divToOpenModal.classList.remove("is-open");
  refs.modalContentImgRef.setAttribute("src", "");
  refs.modalContentImgRef.setAttribute("alt", "");
});

refs.divOverlay.addEventListener("click", () => {
  refs.divToOpenModal.classList.remove("is-open");
  refs.modalContentImgRef.setAttribute("src", "");
  refs.modalContentImgRef.setAttribute("alt", "");
});
