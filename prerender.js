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

    // CRITICAL: Inject the flag BEFORE the page loads so React sees it on first render.
    // Previously this was set after load, meaning React rendered without it.
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER_IN_PROGRESS__ = true;
    });

    await page.goto(PREVIEW_URL, {
      waitUntil: "networkidle0",
      timeout: 30000
    });

    // Extra wait for any async React renders triggered by the flag
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const html = await page.content();
    fs.writeFileSync(path.join(__dirname, "build", "index.html"), html);

    await browser.close();
  } finally {
    if (previewProcess) {
      previewProcess.kill("SIGINT");
    }
  }
})();
