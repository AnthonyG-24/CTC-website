const fs = require("fs");
const path = require("path");

const folderPath = path.join(
  __dirname,
  "assets",
  "church-family-assets",
  "churchfamily"
);
const webBasePath = "assets/church-family-assets/churchfamily/";

const files = fs.readdirSync(folderPath);

const imageSources = files
  .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  .map((file) => {
    return {
      src: `${webBasePath}${file}`,
      alt: path.parse(file).name.replace(/[-_]/g, " "),
    };
  });

const output =
  "const imageSources = " + JSON.stringify(imageSources, null, 4) + ";";

fs.writeFileSync(path.join(__dirname, "imageSources.js"), output);

console.log("✅ imageSources.js generated!");
