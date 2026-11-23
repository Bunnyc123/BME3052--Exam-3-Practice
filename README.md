# BME 3053 Study App

A free, offline-capable-after-loading static study website for GitHub Pages.

## Features
- 14 starter questions based on selected photographed Test #2 questions and introductory numerical integration practice. This is **not** a complete 33-question transcription.
- One-question-at-a-time practice, hints, detailed explanations, retry, wrong-answer review, and mastery tracking (two consecutive correct attempts).
- Topic filters and a formula library.
- Custom questions with JSON import/export.
- Progress and custom questions stored in browser localStorage; they do not sync between devices.

## GitHub Pages setup
1. Create a public repository (e.g. `bme3053-practice`).
2. Upload the contents of this folder (`index.html`, `app.js`, `questions.js`) to the repository root.
3. Go to Settings → Pages → Deploy from a branch → main → /(root) → Save.
4. Open the resulting GitHub Pages URL.

## Notes
- Never upload personal exam photos or student identifiers to a public GitHub repository.
- The original exam Q12 was multi-select; its practice version is single-answer.
- New trapezoidal-rule questions are illustrative and not claimed to come from class notes.
- Questions may be expanded or corrected by editing `questions.js`.
