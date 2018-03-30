const { postMedia } = require("./twit/twitter");
const tarot = require("./tarot");

const handleReply = tweet => {
  // const userHandle = tweet.user.screen_name;
  const in_reply_to_status_id = tweet.id_str;
  const { reading, name, suit, rank } = tarot();
  postMedia({
    filename: `./data/images/${suit}/${rank}.jpg`,
    alt_text: `${name}`,
    status: reading,
    in_reply_to_status_id,
    auto_populate_reply_metadata: true
  }).then(data => {
    console.log(`Sent tweet ${data.id_str}`);
  });
};

module.exports = { handleReply };
