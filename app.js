const $ = (id) => document.getElementById(id);
const key = "bme3053-v1";
const read = (k, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? fallback;
  } catch {
    return fallback;
  }
};
let progress = read(key + "-progress", {}),
  custom = read(key + "-custom", []),
  current = null,
  locked = false,
  queue = [];
const all = () => [...window.BASE_QUESTIONS, ...courseQuestions, ...custom];
function save() {
  localStorage.setItem(key + "-progress", JSON.stringify(progress));
  localStorage.setItem(key + "-custom", JSON.stringify(custom));
}
function escapeHTML(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function update() {
  const qs = all(),
    attempted = Object.values(progress).filter((x) => x.attempts > 0).length,
    wrong = Object.values(progress).filter((x) => x.wrong > 0).length;
  const mastered = Object.values(progress).filter(
    (x) => (x.streak || 0) >= 2,
  ).length;
  $("stats-total").textContent = qs.length;
  $("stats-attempted").textContent = attempted;
  $("stats-wrong").textContent = wrong;
  $("stats-mastered").textContent = mastered;
  const t = $("topic").value;
  const topics = [...new Set(qs.map((q) => q.topic))].sort();
  $("topic").innerHTML =
    '<option value="all">All topics</option>' +
    topics
      .map((x) => `<option value="${escapeHTML(x)}">${escapeHTML(x)}</option>`)
      .join("");
  $("topic").value = topics.includes(t) ? t : "all";
}
function pool() {
  return all().filter(
    (q) =>
      ($("topic").value === "all" || q.topic === $("topic").value) &&
      ($("mode").value === "all" ||
        ($("mode").value === "wrong"
          ? (progress[q.id]?.wrong || 0) > 0 &&
            (progress[q.id]?.streak || 0) < 2
          : $("mode").value === "mastered"
            ? (progress[q.id]?.streak || 0) >= 2
            : !progress[q.id]?.attempts)),
  );
}
function next() {
  const p = pool();
  if (!p.length) {
    current = null;
    $("hint").disabled = true;
    $("retry").disabled = true;
    $("hintText").hidden = true;
    $("questionTitle").textContent = "No questions match these filters";
    $("questionSource").textContent = "";
    $("questionBody").textContent = "Try another topic or mode.";
    $("answers").innerHTML = "";
    $("check").disabled = true;
    $("feedback").innerHTML = "";
    return;
  }
  const ids = p.map((q) => q.id);
  queue = queue.filter((id) => ids.includes(id));
  if (!queue.length) {
    queue = [...ids].sort(() => Math.random() - 0.5);
    if (queue.length > 1 && queue[0] === current?.id) queue.push(queue.shift());
  }
  const id = queue.shift();
  current = p.find((q) => q.id === id);
  locked = false;
  const view = questionView(current);
  $("questionTitle").textContent = current.topic;
  $("questionSource").textContent = current.source;
  $("questionBody").innerHTML = richText(view?.prompt ?? current.prompt);
  $("answers").innerHTML = (view?.options ?? current.options)
    .map(
      (option, i) =>
        `<label class="option"><input type="radio" name="answer" value="${i}"><span>${richText(option)}</span></label>`,
    )
    .join("");
  $("hint").disabled = false;
  $("retry").disabled = false;
  $("feedback").innerHTML = "";
  $("hintText").hidden = true;
  $("hintText").textContent = "";
  $("check").disabled = false;
}
function check() {
  if (!current || locked) return;
  const pick = document.querySelector('input[name="answer"]:checked');
  if (!pick) {
    $("feedback").textContent = "Choose an answer first.";
    return;
  }
  locked = true;
  const ok = Number(pick.value) === current.correct;
  const p = progress[current.id] || { attempts: 0, correct: 0, wrong: 0 };
  p.attempts++;
  p[ok ? "correct" : "wrong"]++;
  p.streak = ok ? (p.streak || 0) + 1 : 0;
  progress[current.id] = p;
  save();
  showSolution(current, ok, p);
  $("check").disabled = true;
  document
    .querySelectorAll('input[name="answer"]')
    .forEach((x) => (x.disabled = true));
  update();
}
$("next").onclick = next;
$("hint").onclick = () => {
  if (!current) return;
  $("hintText").innerHTML = richText(
    current.hint ||
      "Identify what the question is asking, then eliminate answers that do not match the MATLAB syntax or formula.",
  );
  $("hintText").hidden = false;
};
$("retry").onclick = () => {
  if (!current) return;
  locked = false;
  $("feedback").innerHTML = "";
  $("hintText").hidden = true;
  document.querySelectorAll("input[name=answer]").forEach((x) => {
    x.disabled = false;
    x.checked = false;
  });
  $("check").disabled = false;
};
$("topic").onchange = () => {
  queue = [];
  next();
};
$("mode").onchange = () => {
  queue = [];
  next();
};
$("check").onclick = check;
$("reset").onclick = () => {
  if (confirm("Erase saved practice scores on this browser?")) {
    progress = {};
    save();
    update();
    next();
  }
};
$("add").onclick = () => {
  const topic = $("customTopic").value.trim(),
    prompt = $("customPrompt").value.trim(),
    options = $("customOptions")
      .value.split("\n")
      .map((x) => x.trim())
      .filter(Boolean),
    explanation = $("customExplanation").value.trim();
  if (!topic || !prompt || options.length !== 4 || !explanation) {
    $("customMessage").textContent =
      "Enter a topic, prompt, exactly four choices, and an explanation.";
    return;
  }
  custom.push({
    id: "custom-" + Date.now(),
    topic,
    source: "Your custom question",
    prompt,
    options,
    correct: Number($("customCorrect").value),
    explanation,
  });
  save();
  update();
  $("customMessage").textContent = "Question added!";
  ["customPrompt", "customOptions", "customExplanation"].forEach(
    (id) => ($(id).value = ""),
  );
};
$("export").onclick = () => {
  const blob = new Blob(
      [JSON.stringify({ version: 1, questions: custom }, null, 2)],
      { type: "application/json" },
    ),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = "my-bme3053-questions.json";
  a.click();
  URL.revokeObjectURL(url);
};
$("import").onchange = async (e) => {
  try {
    const obj = JSON.parse(await e.target.files[0].text());
    if (
      !Array.isArray(obj.questions) ||
      !obj.questions.every(
        (q) =>
          typeof q.prompt === "string" &&
          typeof q.topic === "string" &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          Number.isInteger(q.correct) &&
          q.correct >= 0 &&
          q.correct < 4 &&
          typeof q.explanation === "string",
      )
    )
      throw Error("Invalid question bank");
    custom = obj.questions.map((q, i) => ({
      ...q,
      id: "import-" + Date.now() + "-" + i,
      source: "Imported question",
    }));
    save();
    update();
    $("customMessage").textContent =
      "Imported " + custom.length + " custom questions.";
  } catch (err) {
    $("customMessage").textContent = "Import failed: " + err.message;
  }
};
update();
next();

$("openImport").onclick = () => $("import").click();
showFormulas();
showLessons();
