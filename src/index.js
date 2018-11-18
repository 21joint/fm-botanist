import Botanist from "./botanist/index";

document.body.appendChild(Botanist);

if (module.hot) {
  module.hot.accept("./botanist/index", BotanistNew => {
    document.body.removeChild(Botanist);
    document.body.appendChild(BotanistNew);
  });
}
