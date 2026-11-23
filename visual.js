/* Presentation for the existing question IDs. MATLAB syntax stays in code spans. */
const worked = {
  "exam-q2": {
    prompt:
      String.raw`Given \[A=\begin{bmatrix}1&2&3\\4&5&6\\7&8&9\end{bmatrix}\] what does ` +
      "`A(3,1) || A(1,3)`" +
      " return?",
    steps: [
      [
        "Read each matrix entry",
        String.raw`Row 3, column 1 gives \(A_{31}=7\). Row 1, column 3 gives \(A_{13}=3\).`,
      ],
      [
        "Apply logical OR",
        "Both entries are nonzero, so each is true. MATLAB returns logical `1`.",
      ],
    ],
  },
  "exam-q12": {
    prompt: "Which distribution does MATLAB `rand` sample from?",
    options: [
      String.raw`Uniform between \(0\) and \(1\)`,
      "Normal bell curve",
      "Right-skewed bell curve",
      "Only integers",
    ],
    steps: [
      [
        "Identify the range",
        String.raw`The outputs of ` + "`rand`" + String.raw` lie in \((0,1)\).`,
      ],
      [
        "Identify the shape",
        "Equal-width intervals within that range have equal probability, which is what makes the distribution uniform.",
      ],
    ],
  },
  "exam-q14": {
    steps: [
      [
        "Identify the functions",
        "One MATLAB file can contain a main function and local functions.",
      ],
      [
        "Check visibility",
        "Functions can call each other when the called function is in scope. The statement is false.",
      ],
    ],
  },
  "exam-q21": {
    prompt:
      "Use these columns:\n~~~\ntimes = left_knee_flexion(:,1);\nknee_angle = left_knee_flexion(:,2);\n~~~\nWhich pair fills the blanks?\n~~~\nr = range(____);\n[peak,peak_index] = max(knee_angle);\npeak_time = times(____);\n~~~",
    steps: [
      [
        "Measure the spread of the angles",
        "Use `range(knee_angle)` to find the difference between the maximum and minimum angles.",
      ],
      [
        "Look up the matching time",
        "`max` returns the peak value and its position. Use `times(peak_index)` to read the time at that position.",
      ],
    ],
  },
  "exam-q24": {
    prompt: String.raw`For plotting transistor density from 1955 to 2018 with \(t=\text{year}-1955\), which line correctly defines elapsed years?`,
    steps: [
      [
        "Check the starting year",
        String.raw`In 1955, elapsed time is \(1955-1955=0\).`,
      ],
      [
        "Subtract the starting year",
        "With `y` holding the years, use `x = y - 1955;`.",
      ],
    ],
  },
  "exam-q27": {
    prompt:
      "What is `asum` after the first two iterations?\n~~~\nasum = 0;\nfor a = 1:5\n    asum = asum + a^3 + a^2 + a;\nend\n~~~",
    steps: [
      [
        "First iteration",
        String.raw`\[1^3+1^2+1=3\] The running total becomes \(3\).`,
      ],
      [
        "Second iteration",
        String.raw`\[2^3+2^2+2=8+4+2=14\] Add this to the previous total: \(3+14=17\).`,
      ],
    ],
  },
  "exam-q28": {
    prompt:
      "In MATLAB `switch grade`, how do you match uppercase `A` or lowercase `a` in one case?",
    steps: [
      [
        "Group the accepted values",
        "Put both character values in a cell array: `{'A','a'}`.",
      ],
      [
        "Use one case label",
        "Write `case {'A','a'}` so either value matches the same branch.",
      ],
    ],
  },
  "exam-q29": {
    prompt: String.raw`Which MATLAB loop header visits all the terms in \[\sum_{n=1}^{N}\left(\frac{n+1}{\sqrt n}+n^2\right)?\]`,
    steps: [
      [
        "Read the limits of the sum",
        String.raw`The index starts at \(n=1\) and ends at \(n=N\), inclusive.`,
      ],
      [
        "Accumulate one term at a time",
        "Initialize `total = 0;`, then use `for n = 1:N` to add each term.\n~~~\ntotal = total + (n+1)/sqrt(n) + n^2;\n~~~",
      ],
    ],
  },
  "exam-q30": {
    prompt: String.raw`Which recursive expression gives the Fibonacci term for \(n>2\)?`,
    steps: [
      ["Start with the base cases", String.raw`\[f(1)=1,\qquad f(2)=1\]`],
      [
        "Add the previous two terms",
        String.raw`\[f(n)=f(n-1)+f(n-2),\qquad n>2\]`,
      ],
    ],
  },
  "exam-q31": {
    prompt: String.raw`For a nonsingular \(3\times3\) coefficient matrix \(A\) and right-hand-side vector \(b\), what MATLAB command solves \(Ax=b\)?`,
    steps: [
      [
        "Identify the unknown",
        String.raw`Find the vector \(x\) whose product with \(A\) gives \(b\).`,
      ],
      ["Use MATLAB left division", "Enter `x = A\\b;` to solve the system."],
    ],
  },
  "exam-q32": {
    prompt: String.raw`Which expression calculates the midpoint of a bisection interval \([x_\ell,x_u]\)?`,
    options: [
      String.raw`\(\dfrac{x_\ell+x_u}{2}\)`,
      String.raw`\(\dfrac{x_\ell-x_u}{2}\)`,
      String.raw`\(x_\ell x_u\)`,
      String.raw`\(x_\ell+x_u\)`,
    ],
    steps: [
      ["Average the endpoints", String.raw`\[x_m=\frac{x_\ell+x_u}{2}\]`],
      [
        "Choose the next bracket",
        "If the midpoint is a root, stop. Otherwise keep the half whose endpoint values have opposite signs.",
      ],
    ],
    graph: "bisection",
  },
  "exam-q33": {
    prompt: String.raw`Given true value \(T\ne0\) and approximation \(P\), which expression gives the absolute percent relative true error?`,
    options: [
      String.raw`\(\dfrac{|T-P|}{|T|}\times100\)`,
      String.raw`\(\dfrac{|T-P|}{|P|}\times100\)`,
      String.raw`\(\dfrac{|T+P|}{|T|}\times100\)`,
      String.raw`\((T-P)\times100\)`,
    ],
    steps: [
      [
        "Find the absolute difference",
        String.raw`Subtract the approximation from the true value and take the magnitude, \(|T-P|\).`,
      ],
      [
        "Scale by the true value",
        String.raw`Divide by \(|T|\), then multiply by \(100\) to report the error as a percentage.`,
      ],
    ],
  },
  "new-trap-1": {
    prompt: String.raw`Use one trapezoid to approximate \[\int_0^2 x^2\,dx.\] What is the result?`,
    options: [
      String.raw`\(4\)`,
      String.raw`\(\dfrac{8}{3}\)`,
      String.raw`\(2\)`,
      String.raw`\(8\)`,
    ],
    steps: [
      [
        "Find the width and heights",
        String.raw`\[b-a=2-0=2,\qquad f(0)=0,\qquad f(2)=4\]`,
      ],
      [
        "Multiply width by average height",
        String.raw`\[T_1=\frac{2}{2}(0+4)=4\]`,
      ],
      [
        "Compare with the curve",
        String.raw`The exact area is \(\frac{8}{3}\). On this interval the straight edge lies above the curve, so the shaded estimate is larger.`,
      ],
    ],
    graph: "trapezoid",
  },
  "new-trap-2": {
    prompt: String.raw`For the composite trapezoidal rule on \([1,5]\) with \(n=4\) equal intervals, what is the step size \(h\)?`,
    steps: [
      ["Find the total width", String.raw`\[b-a=5-1=4\]`],
      [
        "Divide by the number of intervals",
        String.raw`\[h=\frac{b-a}{n}=\frac{4}{4}=1\]`,
      ],
    ],
    graph: "spacing",
  },
};

for (const id of [
  "exam-q21",
  "exam-q24",
  "exam-q28",
  "exam-q29",
  "exam-q30",
  "exam-q31",
]) {
  worked[id].options = window.BASE_QUESTIONS.find(
    (q) => q.id === id,
  ).options.map((option) => "`" + option + "`");
}

function richText(value) {
  return String(value)
    .split(/(~~~[\s\S]*?~~~|`[^`\n]+`|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g)
    .map((part, index) => {
      if (index % 2 === 0)
        return escapeHTML(
          part.trimEnd() === "" ? part.replaceAll("\n", "") : part,
        ).replaceAll("\n", "<br>");
      if (part.startsWith("~~~"))
        return (
          "<pre><code>" + escapeHTML(part.slice(3, -3).trim()) + "</code></pre>"
        );
      if (part.startsWith("`"))
        return "<code>" + escapeHTML(part.slice(1, -1)) + "</code>";
      const display = part.startsWith("\\[");
      const rendered =
        window.katex?.renderToString(part.slice(2, -2), {
          displayMode: display,
          throwOnError: false,
          trust: false,
        }) ?? escapeHTML(part);
      return display
        ? '<div class="equation">' + rendered + "</div>"
        : rendered;
    })
    .join("");
}

const formulas = {
  trapezoid: String.raw`For one interval, average the two endpoint heights and multiply by the width.
\[T_1=\frac{b-a}{2}[f(a)+f(b)]\]
For \(n\) equal intervals, the interior heights are shared by neighboring trapezoids.
\[h=\frac{b-a}{n}\]
\[T_n=\frac{h}{2}\left[f(x_0)+2\sum_{i=1}^{n-1}f(x_i)+f(x_n)\right]\]`,
  bisection: String.raw`\[x_m=\frac{x_\ell+x_u}{2}\]
For a continuous function with opposite signs at the endpoints, check the sign at the midpoint. Keep the half with opposite signs at its endpoints. Stop if the midpoint is a root or the stopping criterion is met.`,
  matlab: String.raw`~~~
||             logical OR (scalars)
&&             logical AND (scalars)
==             equality comparison
A(row,column)  read a matrix entry
A\b            solve the system below
rand           uniform random numbers
randn          normal random numbers
~~~
\[Ax=b\]`,
  error: String.raw`Absolute percent relative true error, for true value \(T\ne0\) and approximation \(P\).
\[\left|\frac{T-P}{T}\right|\times100\%\]
Absolute percent approximate relative error, for current value \(C\ne0\) and previous value \(P\).
\[\left|\frac{C-P}{C}\right|\times100\%\]`,
};

const graphNotes = {
  newton: String.raw`For \(f(x)=x^2-10\), the blue tangent touches the green curve at \((4,6)\) and crosses the axis at the next guess \(x_1=3.25\).`,
  trapezoid: String.raw`The blue line connects the sampled endpoints of \(f(x)=x^2\). The shaded trapezoid shows the area estimate between \(x=0\) and \(x=2\).`,
  bisection: String.raw`Example with \(f(x)=x^2-2\). The interval is \([1,2]\). The signs at \(x=1\) and the midpoint \(x=1.5\) are opposite, so the shaded half is the next bracket.`,
  spacing: String.raw`Five sample points form four equal subintervals on \([1,5]\). Each shaded segment has width \(h=1\).`,
};

function addGraph(container, kind) {
  if (!Object.hasOwn(graphNotes, kind)) return;
  const figure = document.createElement("figure");
  const canvas = document.createElement("canvas");
  const caption = document.createElement("figcaption");
  canvas.width = 720;
  canvas.height = kind === "spacing" ? 160 : 360;
  canvas.setAttribute("aria-hidden", "true");
  caption.innerHTML = richText(graphNotes[kind]);
  figure.append(canvas, caption);
  container.append(figure);

  const ctx = canvas.getContext("2d");
  const isTrap = kind === "trapezoid";
  const spacing = kind === "spacing";
  const newton = kind === "newton";
  const a = newton ? 2.8 : isTrap ? 0 : 1;
  const b = newton ? 4.2 : spacing ? 5 : 2;
  const low = newton ? -3 : isTrap ? 0 : -1.2;
  const high = newton ? 8 : isTrap ? 4.5 : 2.3;
  const x = (value) => 76 + ((value - a) / (b - a)) * 568;
  const y = (value) =>
    spacing ? 80 : 28 + ((high - value) / (high - low)) * 254;
  const f = (value) => value ** 2 - (newton ? 10 : isTrap ? 0 : 2);

  function path(points, stroke, fill) {
    ctx.beginPath();
    points.forEach(([px, py], index) =>
      index ? ctx.lineTo(px, py) : ctx.moveTo(px, py),
    );
    if (fill) {
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
  function label(value, px, py, align = "center") {
    ctx.font = "30px system-ui";
    ctx.textAlign = align;
    ctx.fillStyle = "#24394f";
    ctx.fillText(value, px, py);
  }
  if (spacing) {
    for (let i = a; i < b; i++) {
      ctx.fillStyle = i % 2 ? "#c9e3f8" : "#a7d2f3";
      ctx.fillRect(x(i), 48, x(i + 1) - x(i), 32);
    }
  } else if (isTrap) {
    path(
      [
        [x(a), y(0)],
        [x(b), y(f(b))],
        [x(b), y(0)],
      ],
      null,
      "#c9e3f8",
    );
  } else if (!newton) {
    ctx.fillStyle = "#d2ebdf";
    ctx.fillRect(x(a), y(high), x(1.5) - x(a), y(low) - y(high));
  }

  path(
    [
      [x(a), y(0)],
      [x(b) + 24, y(0)],
    ],
    "#52677b",
  );
  if (!spacing) {
    path(
      [
        [x(a), y(low)],
        [x(a), y(high)],
      ],
      "#52677b",
    );
    for (const tick of newton
      ? [-2, 0, 2, 4, 6, 8]
      : isTrap
        ? [0, 1, 2, 3, 4]
        : [-1, 0, 1, 2]) {
      path(
        [
          [x(a) - 6, y(tick)],
          [x(a), y(tick)],
        ],
        "#52677b",
      );
      label(tick, x(a) - 12, y(tick) + 9, "right");
    }
    label("f(x)", x(a) + 12, 30, "left");
    const curve = Array.from({ length: 81 }, (_, i) => a + ((b - a) * i) / 80);
    path(
      curve.map((value) => [x(value), y(f(value))]),
      "#14634f",
    );
    if (newton)
      path(
        [
          [x(3.25), y(0)],
          [x(4.1), y(6.8)],
        ],
        "#2458a5",
      );
    if (isTrap)
      path(
        [
          [x(a), y(f(a))],
          [x(b), y(f(b))],
        ],
        "#2458a5",
      );
  }
  const ticks = newton
    ? [3.25, 4]
    : spacing
      ? [1, 2, 3, 4, 5]
      : isTrap
        ? [0, 1, 2]
        : [1, 1.5, 2];
  ticks.forEach((tick) => {
    path(
      [
        [x(tick), y(0) - 6],
        [x(tick), y(0) + 7],
      ],
      "#52677b",
    );
    label(tick, x(tick), spacing ? 120 : 324);
    if (!spacing && (!isTrap || tick !== 1)) {
      ctx.beginPath();
      ctx.arc(
        x(tick),
        y(newton && tick === 3.25 ? 0 : f(tick)),
        6,
        0,
        2 * Math.PI,
      );
      ctx.fillStyle = isTrap || newton ? "#2458a5" : "#14634f";
      ctx.fill();
    }
  });
  label("x", x(b) + 36, spacing ? 120 : 324);
}

function questionView(question) {
  if (courseQuestions.includes(question)) return question;
  return window.BASE_QUESTIONS.includes(question) ? worked[question.id] : null;
}

function showSolution(question, ok, progressEntry) {
  const view = questionView(question);
  const answer = (view?.options ?? question.options)[question.correct];
  const steps = view?.steps ?? [["Read the explanation", question.explanation]];
  const status = ok
    ? progressEntry.streak >= 2
      ? "Mastered! Two correct in a row."
      : "One more correct attempt will mark this mastered."
    : "This stays in Wrong answers only until you answer it correctly twice in a row.";

  $("feedback").innerHTML = `
    <div class="result ${ok ? "good" : "bad"}">
      <strong>${ok ? "Correct!" : "Not quite."}</strong>
      <span>Correct answer: ${richText(answer)}</span>
      <p>${status}</p>
    </div>
    <h3>Worked solution</h3>
    ${steps
      .map(
        ([title, body], index) => `
      <details class="step">
        <summary><span class="step-number">${index + 1}</span>${escapeHTML(title)}</summary>
        <div class="step-body">${richText(body)}</div>
      </details>`,
      )
      .join("")}`;
  if (view?.graph) {
    const details = document.createElement("details");
    details.className = "step";
    details.innerHTML = "<summary>See the graph</summary>";
    addGraph(details, view.graph);
    $("feedback").append(details);
  }
}

function showFormulas() {
  for (const [id, content] of Object.entries(formulas)) {
    const slot = document.getElementById("formula-" + id);
    slot.innerHTML = richText(content);
    if (Object.hasOwn(graphNotes, id)) addGraph(slot, id);
  }
}

function showLessons() {
  const list = $("lessonList");
  for (const unit of courseUnits) {
    const details = document.createElement("details");
    details.innerHTML = `
      <summary>${escapeHTML(unit.topic)}</summary>
      <div class="step-body">
        <p>${richText(unit.lesson)}</p>
        <div>${richText(unit.example)}</div>
        <p class="muted">${escapeHTML(unit.source)}</p>
        <button type="button">Practice ${escapeHTML(unit.topic)}</button>
      </div>`;
    const body = details.querySelector(".step-body");
    const exercise = matlabExercises[unit.topic];
    const button = body.querySelector("button");
    if (unit.graph) {
      addGraph(body, unit.graph);
      body.append(button);
    }
    if (exercise) {
      const task = document.createElement("details");
      task.innerHTML = `
        <summary>Write the MATLAB code</summary>
        <div class="step-body">
          <p>${richText(exercise.prompt)}</p>
          <textarea aria-label="Your MATLAB code for ${escapeHTML(unit.topic)}" spellcheck="false"></textarea>
          <details>
            <summary>Reveal sample solution</summary>
            <div class="step-body">${richText(exercise.solution)}</div>
          </details>
        </div>`;
      body.insertBefore(task, button);
    }
    button.addEventListener("click", () => {
      $("topic").value = unit.topic;
      $("mode").value = "all";
      queue = [];
      next();
      $("questionCard").focus();
    });
    list.append(details);
  }
}
