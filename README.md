# BME 3053 Practice Lab — Visual Learning Edition

A static GitHub Pages study app with a question bank, progress tracking, mathematical notation, and narrated interactive mini-lessons.

## Install/update GitHub Pages

1. Open your existing GitHub repository.
2. Upload or replace the **seven files** from this folder directly in the repository root (not the enclosing folder and not the ZIP).
3. Commit changes. GitHub Pages will automatically redeploy from the `main` branch and `/ (root)`.
4. Refresh your website after deployment; use Ctrl+Shift+R if the old version remains cached.

Files: `index.html`, `questions.js`, `app.js`, `lessons.js`, `lesson-app.js`, `math-app.js`, `README.md`.

## Features

- Three narrated step-by-step lessons: trapezoidal rule, bisection, MATLAB accumulator loops.
- Browser speech synthesis with play/stop/speed; voice availability and quality vary by device and browser.
- KaTeX textbook-style mathematical notation. Internet is required to load KaTeX from its CDN.
- Existing 14 questions, hints, answers, topic filters, browser-local mastery tracking, custom questions, JSON import/export.
- Visual SVG diagrams and shortcuts/exam warnings for every lesson step.

## Notes

The 14-question bank is an **adapted practice bank**, not a complete transcription of the exam. Lesson material beyond the photographed Test #2 is illustrative and should be compared with later lecture uploads. No lecture PowerPoints or textbook chapters have yet been incorporated. Browser localStorage progress remains under the original `bme3053-v1` key; do not click Reset Progress if you wish to keep it. Voice narration uses device/browser voices, not downloadable prerecorded MP4 audio.

The repository is public. Avoid publishing exam photos containing student names or IDs.
