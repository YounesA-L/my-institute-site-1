const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// مسیر پوشه‌ی عکس‌ها - اگه ساختار پروژه‌ت فرق داره این خط رو اصلاح کن
const imagesDir = path.join(__dirname, "images");

// کیفیت WebP - بین 0 تا 100، عدد 80 تعادل خوبی بین حجم و کیفیته
const QUALITY = 80;

async function convertImages() {
  const files = fs.readdirSync(imagesDir);
  const pngFiles = files.filter((f) => f.toLowerCase().endsWith(".png"));

  console.log(`تعداد ${pngFiles.length} فایل PNG پیدا شد.\n`);

  for (const file of pngFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputName = file.replace(/\.png$/i, ".webp");
    const outputPath = path.join(imagesDir, outputName);

    const beforeSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const afterSize = fs.statSync(outputPath).size;
    const savedPercent = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);

    console.log(
      `${file} -> ${outputName} | ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB (${savedPercent}% کمتر)`
    );
  }

  console.log("\nتمام شد! فایل‌های PNG اصلی همچنان تو پوشه هستن، هیچی حذف نشده.");
}

convertImages().catch((err) => console.error("خطا:", err));