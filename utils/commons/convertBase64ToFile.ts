/**
 * @see https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
 * @param URL
 * @returns
 */
const convertEase64ToFile = (URL: string, name = "fileName.png") => {
  return fetch(URL)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], name));
};

export default convertEase64ToFile;
