
const brand = "pastoe";
const product = "frame";
const title = "frame";

var search = document.createElement('script');
search.src = `https://${brand}-${product}.web.app/projects/${brand}-${product}/search.js`;
document.head.appendChild(search);