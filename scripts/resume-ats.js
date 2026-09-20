const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "resume-source");
const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));

const EXPECTED_HEADINGS = [
  "summary",
  "technical skills",
  "skills",
  "key projects",
  "projects",
  "work experience",
  "experience",
  "education",
];

const BULLET_WORD_LIMIT = 30;

let totalWarnings = 0;

for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const warnings = [];

  // Extract body content (strip style/script tags first)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) {
    warnings.push("No <body> tag found");
    printResult(file, warnings);
    continue;
  }
  // Remove <style> and <script> blocks so CSS/JS don't trigger false positives
  const body = bodyMatch[1]
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");

  // Strip tags for plain text checks
  const plain = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  // --- Contact info ---
  const hasEmail = /\S+@\S+\.\S+/.test(plain);
  const hasPhone = /\+?\d[\d\s\-()]{7,}/.test(plain);
  if (!hasEmail) warnings.push("No email address found");
  if (!hasPhone) warnings.push("No phone number found");

  // --- Section headings ---
  const headingMatches = [...body.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
  const headings = headingMatches.map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim().toLowerCase()
  );
  for (const h of headings) {
    if (!EXPECTED_HEADINGS.some((e) => h.includes(e))) {
      warnings.push(`Non-standard section heading: "${h}"`);
    }
  }

  // --- Tables ---
  if (/<table[\s>]/i.test(body)) {
    warnings.push("Contains <table> tag — ATS-unfriendly layout detected");
  }

  // --- Special characters / emojis ---
  const emojiRe = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojis = plain.match(emojiRe);
  if (emojis) {
    warnings.push(`Contains emoji: ${[...new Set(emojis)].join(" ")}`);
  }

  // --- Date format on work experience entries ---
  const bodyStart = html.indexOf("<body");
  const bodyLineOffset = html.substring(0, bodyStart).split("\n").length;
  const lines = body.split("\n");
  let inWorkExp = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/<h2[^>]*>.*work\s+experience.*<\/h2>/i.test(line)) {
      inWorkExp = true;
      continue;
    }
    if (/<h2[^>]*>/i.test(line) && inWorkExp) {
      inWorkExp = false;
    }
    if (inWorkExp) {
      const dateSpans = [
        ...line.matchAll(/<span[^>]*>(.*?)<\/span>/gi),
      ].filter((m) => /\d{4}/.test(m[1]) && !/[a-zA-Z]/.test(m[1].replace(/\d{4}/g, "")));
      for (const ds of dateSpans) {
        const text = ds[1].trim();
        if (/^\d{4}$/.test(text)) {
          warnings.push(
            `Line ${bodyLineOffset + i}: Bare year "${text}" in work experience — consider adding months`
          );
        }
      }
    }
  }

  // --- Bullet length ---
  const liMatches = [...body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  for (const m of liMatches) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    const words = text.split(/\s+/).length;
    if (words > BULLET_WORD_LIMIT) {
      const pos = bodyStart + m.index;
      const lineNum = html.substring(0, pos).split("\n").length;
      warnings.push(
        `Line ${lineNum}: Bullet is ${words} words (limit ${BULLET_WORD_LIMIT})`
      );
    }
  }

  printResult(file, warnings);
  totalWarnings += warnings.length;
}

console.log(
  `\n${totalWarnings === 0 ? "✓ All clear" : `${totalWarnings} warning(s) total`}`
);

function printResult(file, warnings) {
  if (warnings.length === 0) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`⚠ ${file}`);
    for (const w of warnings) {
      console.log(`  - ${w}`);
    }
  }
}
