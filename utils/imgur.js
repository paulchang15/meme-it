var imgur = require("imgur");
let image = "";

// add this to public javascript file
imgur.setClientId("ebe2f73bc0d1a0d");

imgur.getClientId();
//

async function saveId() {
  try {
    await imgur.saveClientId(path);
    await function () {
      console.log("Saved.");
    };
  } catch (err) {
    console.error(err.message);
  }
}

async function loadId() {
  try {
    await imgur.loadClientId(path);
    await imgur.setClientId();
  } catch (err) {
    console.error(err.message);
  }
}

async function fileUpload(image) {
  try {
    await imgur.uploadFile(image);
    await function (json) {
      console.log(json.data.link);
    };
  } catch (err) {
    console.error(err.message);
  }
}

async function urlUpload(image) {
  try {
    await imgur.uploadUrl(image);
    await function (json) {
      console.log(json.data.link);
    };
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { fileUpload, urlUpload };
