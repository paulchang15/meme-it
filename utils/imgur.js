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
    const upload = await imgur.uploadFile(image);

    return upload.data.link;
  } catch (err) {
    console.error(err.message);
  }
}

async function urlUpload(image) {
  try {
    const urlUpload = await imgur.uploadUrl(image);

    return urlUpload.data.link;
  } catch (err) {
    console.error(err.message);
  }
}

//route to get image from
async function getImage(imageId) {
  try {
    const image = await imgur.getInfo(imageId);
    console.log(image);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function deleteImage(image) {}

module.exports = { saveId, loadId, fileUpload, urlUpload };
