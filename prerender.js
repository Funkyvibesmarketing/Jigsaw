const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  const url = "https://jigsaw.funkyvibes.co.uk";
  console.log("Rendering:", url);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 0
  });

  // wait for React to fully render
  await new Promise(resolve => setTimeout(resolve, 5000));

  const html = await page.content();

  fs.writeFileSync(
    path.join(__dirname, "build", "index.html"),
    html
  );

  await browser.close();
})();