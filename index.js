const { initialize, monitorReplies } = require("./twit/twitter");
const { handleReply } = require("./tweet");

const setup = () => {
  initialize("tarotbot");
  monitorReplies(handleReply);
};

setup();
