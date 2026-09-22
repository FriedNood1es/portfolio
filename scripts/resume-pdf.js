// Regenerates public/resume/*.pdf from resume-source/*.html.
// Usage: npm run resume:pdf
// Uses system Chrome over CDP (header/footer off). Override binary via CHROME_PATH.
// NOTE: Chrome CLI --print-to-pdf-no-header is silently ignored in recent
// versions, hence CDP instead of a one-liner.
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");

const root = path.join(__dirname, "..");
const pairs = [
  ["Kent_Lozano_Resume.html", "Kent_Lozano_Resume.pdf"],
  ["KentLozano-Resume.html", "KentLozano-Resume-Original.pdf"],
  ["KentLozano-Resume-Web.html", "KentLozano-Resume-Web.pdf"],
  ["KentLozano-Resume-QA.html", "KentLozano-Resume-QA.pdf"],
  ["KentLozano-Resume-Mobile.html", "KentLozano-Resume-Mobile.pdf"],
];

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);
  const hit = candidates.find((p) => fs.existsSync(p));
  if (!hit) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");
  return hit;
}

(async () => {
  const browser = await chromium.launch({
    executablePath: findChrome(),
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  for (const [html, pdf] of pairs) {
    await page.goto(
      "file:///" + path.join(root, "resume-source", html).replace(/\\/g, "/")
    );
    await page.pdf({
      path: path.join(root, "public", "resume", pdf),
      format: "Letter",
      displayHeaderFooter: false,
      printBackground: false,
      // Must match @page margin in the HTML sources.
      margin: { top: "0.55in", bottom: "0.55in", left: "0.65in", right: "0.65in" },
    });
    console.log("wrote", pdf);
  }
  await browser.close();
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
