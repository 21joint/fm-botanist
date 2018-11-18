import "../assets/scss/index.scss";
import BotanistHtml from "../botanist/botanist.html";
import Logo from "../assets/botanist logo.png";
const pageId = "BotanistHtml";

function component() {
  let element = document.createElement("div");

  element.id = pageId;

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = BotanistHtml + "<img width='100px' src='" + Logo + "'>";

  return element;
}

export default component();
