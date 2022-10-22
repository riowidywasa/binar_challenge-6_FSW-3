// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfignlu94", // TODO: Ganti dengan cloudname-mu
  api_key: "676377244439362", // TODO: Ganti dengan API Key-mu
  api_secret: "ZL5_ru6i2kjW6CiPA62jKZ2BDr0", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

module.exports = cloudinary;
