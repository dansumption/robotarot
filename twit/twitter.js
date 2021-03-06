const Twit = require("twit");
const { promisify } = require("util");
const fs = require("fs");

let bot;
let __post;
let __get;

const initialize = botHandle => {
  const env = process.env.BOT_CONSUMER_KEY ? process.env : require("./config");
  bot = new Twit({
    consumer_key: env.BOT_CONSUMER_KEY,
    consumer_secret: env.BOT_CONSUMER_SECRET,
    access_token: env.BOT_ACCESS_TOKEN,
    access_token_secret: env.BOT_ACCESS_TOKEN_SECRET
  });
  bot.handle = env.botHandle || botHandle;
  __post = promisify(bot.post).bind(bot);
  __get = promisify(bot.get).bind(bot);
};

const logMessage = console.log;

const sendTweet = parameters =>
  __post("statuses/update", parameters)
    .then(data => {
      console.log(
        `SENT: ${data.id_str}\n\t${parameters.in_reply_to_status_id}\n\t${
          parameters.status
        }`
      );
      return data;
    })
    .catch(err => {
      console.error(`ERROR SENDING: ${parameters.status}\n\t${err}`);
    });

const getBase64 = file => {
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
};

const postMedia = ({
  filename,
  alt_text,
  status,
  in_reply_to_status_id,
  auto_populate_reply_metadata
}) => {
  const media_data = getBase64(filename);
  return __post("media/upload", { media_data })
    .then(data => {
      const media_id = data.media_id_string;
      console.log(media_id, alt_text);

      var meta_params = {
        media_id
        // alt_text
      };
      __post("media/metadata/create", meta_params);
      return media_id;
    })
    .then(media_id => {
      const params = {
        status,
        media_ids: [media_id],
        in_reply_to_status_id,
        auto_populate_reply_metadata
      };
      return sendTweet(params);
    })
    .catch(err => {
      console.error(`ERROR POSTING MEDIA:\n\t${err}`);
    });
};

const monitorReplies = callback => {
  return monitorSearchTerm(`@${bot.handle}`, callback);
};

const monitorSearchTerm = (term, callback) => {
  if (bot) {
    const stream = bot.stream("statuses/filter", { track: term });
    stream.on("tweet", callback);
    stream.on("error", logMessage);
    stream.on("limit", logMessage);
    stream.on("disconnect", logMessage);
    stream.on("reconnect", (request, response, connectInterval) =>
      logMessage("Reconnecting in " + connectInterval + "ms...")
    );
    return stream;
  }
};

const searchTweets = q => {
  __get("search/tweets", { q })
    .then(data => {
      const texts = data.statuses.map(status => status.text);
      console.dir(texts);
      return data;
    })
    .catch(err => {
      console.error(`ERROR SEARCHNG FOR: ${q}\n\t${err}`);
    });
};

module.exports = {
  initialize,
  sendTweet,
  searchTweets,
  monitorReplies,
  monitorSearchTerm,
  postMedia
};
