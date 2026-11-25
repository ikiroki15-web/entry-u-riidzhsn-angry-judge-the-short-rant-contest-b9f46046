// Angry Judge: The Short Rant Contest
// Writes one short, funny rant about an everyday annoyance to entry.txt.
// Stdlib only, deterministic, no network, no randomness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The self-checkout weighed my crisps, decided I was a thief, and screamed UNEXPECTED ITEM IN THE BAGGING AREA so loudly the whole shop turned to stare. I had already paid. The crisps were paid for. A machine that cannot count to four has just announced my criminal career to strangers, while a member of staff strolls over like this happens every day. It does. That is the worst part.";

const MAX_CHARS = 400;

function main(): void {
  // Runtime validation: the gate requires UTF-8 text of 1..400 characters,
  // not only whitespace.
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1..${MAX_CHARS} characters, got ${ENTRY.length}`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  // Validate by code points as well as UTF-16 units, so a stray astral
  // character cannot silently push the text over the 400-character gate.
  if ([...ENTRY].length > MAX_CHARS) {
    throw new Error(
      `entry must be at most ${MAX_CHARS} code points, got ${[...ENTRY].length}`,
    );
  }
  // The text must be plain printable text: no control characters.
  if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
    throw new Error("entry must not contain control characters");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Write exactly the entry text: no trailing newline, no extra bytes.
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  // Post-write verification: read the file back and confirm it is
  // byte-for-byte the validated text before reporting success.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("written entry.txt does not match the validated text");
  }
  if (written.length < 1 || written.length > MAX_CHARS) {
    throw new Error(
      `written entry must be 1..${MAX_CHARS} characters, got ${written.length}`,
    );
  }
}

main();
