export const searchPhoto = (namePhoto, page) =>
  fetch(
    `https://pixabay.com/api/?q=${namePhoto}&page=${page}&key=39745319-841edc3a2cc705a9928c764d8&image_type=photo&orientation=horizontal&per_page=12`
  ).then(responce => responce.json());
