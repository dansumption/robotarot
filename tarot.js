const tarot = require("./data/tarot").tarot_interpretations;

const randomItem = array => array[Math.floor(Math.random() * array.length)];

const getCard = () => randomItem(tarot);

const robotName = "The robot fortune-teller";
const intros = [
  "speaks",
  "rolls its eyes and says",
  "inspects the card closely before saying",
  "looks you up and down and says"
];

const getFortune = card => randomItem(card.fortune_telling);
const getLight = card =>
  `You can look forward to ${randomItem(card.meanings.light).replace(
    /^(\w)/,
    letter => letter.toLowerCase()
  )}`;
const getShadow = card =>
  `Beware of ${randomItem(card.meanings.shadow).replace(/^(\w)/, letter =>
    letter.toLowerCase()
  )}`;
const cardCase = name =>
  name.replace(/\b\S/g, text => text.toUpperCase()).replace(" Of ", " of ");
const getReading = card => ({
  reading: `You draw a card: ${cardCase(
    card.name
  )}.\n\n${robotName} ${randomItem(intros)}: '${randomItem([
    getFortune,
    getLight,
    getShadow
  ])(card)}'.\n`,
  card,
  name: card.name,
  rank: card.rank,
  suit: card.suit
});
module.exports = () => getReading(getCard());
