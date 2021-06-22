const logger = require("../utils/logger");
const { AppError, commonErrors } = require("../error");

function create(/* some dependencies */) {
  // check whether dependencies are null OR undefined at here
  return {
    getMessage: async function () {
      return "This is a sample message";
    },
  };
}

module.exports = {
  create,
};
