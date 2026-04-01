const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const PREVIEW_PORT = 4173;
const PREVIEW_URL = `http://127.0.0.1:${PREVIEW_PORT}`;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return;
    } catch (_err) {
      // ignore until server is ready
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not become ready within ${timeoutMs}ms: ${url}`);
}

(async () => {
  const previewCmd = process.platform === "win32" ? "npx.cmd" : "npx";
  const previewProcess = spawn(previewCmd, [
    "vite",
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    String(PREVIEW_PORT),
    "--strictPort"
  ], {
    stdio: ["ignore", "inherit", "inherit"],
    shell: true
  });

  try {
    await waitForServer(PREVIEW_URL);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    console.log("Rendering local build:", PREVIEW_URL);

    await page.goto(PREVIEW_URL, {
      waitUntil: "domcontentloaded",
      timeout: 0
    });

    // wait for React to fully render
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const html = await page.content();
    fs.writeFileSync(path.join(__dirname, "build", "index.html"), html);

    await browser.close();
  } finally {
    if (previewProcess) {
      previewProcess.kill("SIGINT");
    }
  }
})();
