// Angry Judge entry: one short, funny rant about an everyday annoyance.
// The program assembles the rant from its beats, checks the 400-char gate
// itself, and writes the finished text to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const LIMIT = 400;

const beats: string[] = [
  "The self-checkout weighed my crisps, decided I was a thief, and screamed UNEXPECTED ITEM IN THE BAGGING AREA so loudly the whole shop turned to stare.",
  "I had already paid. The crisps were paid for.",
  "A machine that cannot count to four has just announced my criminal career to strangers, while a member of staff strolls over like this happens every day.",
  "It does. That is the worst part.",
];

function buildRant(parts: string[]): string {
  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  if (text.length === 0 || text.length > LIMIT) {
    throw new Error(`rant is ${text.length} chars, must be 1..${LIMIT}`);
  }
  return text;
}

const rant = buildRant(beats);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", rant, "utf8");
console.log(`${rant.length} chars written to /output/entry.txt`);
console.log(rant);
