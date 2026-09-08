const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "public", "images");

const extensions = [".png", ".jpg", ".jpeg"];

function getFiles(dir) {
  let files = [];

  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(getFiles(fullPath));
    } else if (extensions.includes(path.extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function compressImages() {
  const files = getFiles(inputDir);

  console.log(`\nDitemukan ${files.length} gambar.\n`);

  for (const file of files) {
    try {
      const ext = path.extname(file);
      const output = file.slice(0, -ext.length) + ".webp";

      const before = fs.statSync(file).size;

      await sharp(file)
        .webp({ quality: 80 })
        .toFile(output);

      const after = fs.statSync(output).size;

      const beforeMB = (before / 1024 / 1024).toFixed(2);
      const afterMB = (after / 1024 / 1024).toFixed(2);
      const reduction = ((1 - after / before) * 100).toFixed(1);

      console.log(
        `${path.relative(inputDir, file)}`
      );
      console.log(
        `  ${beforeMB} MB → ${afterMB} MB (${reduction}% lebih kecil)`
      );
      console.log("");
    } catch (error) {
      console.error(`Gagal: ${file}`);
      console.error(error.message);
    }
  }

  console.log("=================================");
  console.log("SELESAI!");
  console.log("=================================");
}

compressImages();