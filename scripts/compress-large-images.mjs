import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "src/assets/articles";
const limit = 500 * 1024;
const files = fs.readdirSync(dir).filter((name) => /\.(png|jpe?g)$/i.test(name));
const changed = [];

for (const name of files) {
  const file = path.join(dir, name);
  const before = fs.statSync(file).size;
  if (before < limit) continue;
  const image = sharp(file);
  const meta = await image.metadata();
  const width = meta.width && meta.width > 1600 ? 1600 : undefined;
  const ext = path.extname(name).toLowerCase();
  let pipeline = sharp(file).rotate();
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  const tmp = `${file}.tmp`;
  if (ext === ".png") {
    await pipeline.png({ compressionLevel: 9, effort: 8 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 78, mozjpeg: true }).toFile(tmp);
  }
  const after = fs.statSync(tmp).size;
  if (after < before) {
    fs.renameSync(tmp, file);
    changed.push({ name, before, after });
  } else {
    fs.unlinkSync(tmp);
  }
}

for (const row of changed) {
  console.log(
    `${row.name} ${(row.before / 1024).toFixed(0)}KB -> ${(row.after / 1024).toFixed(0)}KB`,
  );
}
console.log(`compressed ${changed.length}`);
