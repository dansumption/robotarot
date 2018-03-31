// const https = require('https');
const tarot = require("./tarot");

for (let index = 0; index < 100; index++) {
  console.log(tarot().suit);
}

// let OKcards = 0;
// let notOKcards = 0;
// for (let index = 0; index < tarot.length; index++) {
//   const card = tarot[index];
//   https.get(tarot.getUrl1(card), res => {
//     if (res.statusCode !== 200) {
//       https.get(tarot.getUrl(card), res => {
//         if (res.statusCode !== 200)
//           console.log(++notOKcards, card.name, res.statusCode, res.location);
//         else {
//           card.url = tarot.getUrl(card);
//           console.log("OK", ++OKcards, card.url);
//         }
//       });
//     }
//     else {
//       card.url = tarot.getUrl1(card);
//       console.log("OK", ++OKcards, card.url);
//     }
//   });
// }
