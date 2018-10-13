"use strict";
const config = {
  crudApp: {
    localhost: {
      db: "mongodb://localhost:27017/crud-app",
      username: "",
      pass: ""
    },
    atlas: {
      db: '',
      username: "",
      pass: ""
    }
  },
};

module.exports = config;
