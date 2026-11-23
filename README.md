# BME 3053 Practice Lab

A browser-based practice app for MATLAB and numerical methods. Includes the original 14 questions plus 28 original questions based on the supplied chapters, course lectures, and Weeks 11–13 homework. Open **Learn a method** for 12 topic lessons, short examples, and three write-the-code exercises with sample solutions. Questions have expandable worked steps and typeset math. Graphs illustrate trapezoids, bisection, and a Newton tangent.

## Update the existing GitHub Pages site

1. Extract the release ZIP.
2. Open the repository's [upload page for the main branch](https://github.com/bunnyc123/BME3052--Exam-3-Practice/upload/main).
3. Drag these items from **inside** the extracted folder onto the upload page together: `index.html`, `app.js`, `questions.js`, `course.js`, `visual.js`, `styles.css`, `README.md`, and the entire `katex` folder. Keep its `fonts` subfolder. The repository root should contain `index.html` directly.
4. Choose **Commit directly to the main branch** and click **Commit changes**. The existing Pages source is `main` and `/ (root)`.
5. After the [Pages deployment](https://github.com/bunnyc123/BME3052--Exam-3-Practice/actions) succeeds, reopen [your Practice Lab](https://bunnyc123.github.io/BME3052--Exam-3-Practice/). If you still see the previous layout, press **Ctrl+F5**.

You can also open the extracted `index.html` for a local preview. Keep all the extracted files together. KaTeX and its fonts are included.

## Saved practice

The published site uses the same browser storage keys and question IDs. To see existing scores and custom questions, open the existing Pages address in the same browser and profile. The custom-question JSON export contains custom questions. Scores are saved in the browser.

For custom questions, put inline TeX between `\(` and `\)`, for example `\(\frac{1}{2}\)`. Use `\[` and `\]` for centered equations. Ordinary text also works.

The code-writing exercises are for self-checking. You can type a draft and reveal a sample answer in the lesson.
