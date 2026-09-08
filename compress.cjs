const sharp = require("sharp");

sharp("public/images/events/tirakatan1.png")
  .webp({ quality: 80 })
  .toFile("public/images/events/tirakatan1.webp")
  .then(() => console.log("Berhasil: tirakatan1.webp"))
  .catch(console.error);