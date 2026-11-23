/* Original study material based on the supplied chapters, lectures and homework. */
const courseUnits = [
  {
    topic: "Algorithms and flowcharts",
    source: "Algorithms, Pseudo Code and Flowcharting lecture · Chapter 4 §4.2",
    lesson:
      "List inputs and outputs, then write the process in order. In a flowchart, use a parallelogram for input/output, a rectangle for a calculation, and a diamond for a yes/no decision.",
    example:
      "~~~\nREAD temperature\nIF temperature >= limit\n    OUTPUT 'Alert'\nELSE\n    OUTPUT 'Normal'\nEND IF\n~~~",
    questions: [
      [
        "decision",
        "Which flowchart symbol represents checking whether a signal exceeds a limit?",
        ["Rectangle", "Diamond", "Parallelogram", "Start/end oval"],
        1,
        "Does the test produce one path or two possible paths?",
        [
          ["Find the decision", "The comparison can be true or false."],
          ["Draw both exits", "Use a diamond with exits labeled Yes and No."],
        ],
      ],
      [
        "boundary",
        "The instruction says to flag values at or above the limit. Which pseudocode test matches?",
        [
          "signal > limit",
          "signal < limit",
          "signal == limit",
          "signal >= limit",
        ],
        3,
        "Try the case where the two values are equal.",
        [
          ["Test the boundary", "A signal equal to the limit must be flagged."],
          [
            "Test above the boundary",
            "The test must also accept greater values. The combined comparison is `signal >= limit`.",
          ],
        ],
      ],
    ],
  },
  {
    topic: "Branching structures",
    source: "Chapter 2 §§2.2–2.4 · Branching Structures lecture",
    lesson:
      "Trace an if/elseif/else chain from the top. MATLAB executes the first branch whose condition is true. Use switch when a single expression is matched against discrete case values.",
    example:
      "~~~\nif score >= 90\n    band = 'high';\nelseif score >= 70\n    band = 'middle';\nelse\n    band = 'low';\nend\n~~~",
    questions: [
      [
        "first-true",
        "What is stored in `band`?\n~~~\nx = 94;\nif x >= 70\n    band = 'pass';\nelseif x >= 90\n    band = 'high';\nelse\n    band = 'retry';\nend\n~~~",
        ["high", "retry", "pass", "Both pass and high"],
        2,
        "Read the conditions in execution order.",
        [
          ["Evaluate the first test", "`94 >= 70` is true."],
          [
            "Exit the chain",
            "MATLAB assigns `'pass'` and skips the remaining branches. To distinguish the high band, test the higher cutoff first.",
          ],
        ],
      ],
      [
        "short-circuit",
        "Which condition tests a scalar index safely before reading an element of a nonempty vector `v`? Assume `i` is a positive integer.",
        [
          "`v(i)>0 && i<=numel(v)`",
          "`i<=numel(v) && v(i)>0`",
          "`i<=numel(v) || v(i)>0`",
          "`i>numel(v) && v(i)>0`",
        ],
        1,
        "Put the bounds check where it can prevent the read.",
        [
          [
            "Check bounds first",
            "If `i<=numel(v)` is false, the index is outside the vector.",
          ],
          [
            "Short-circuit the read",
            "`&&` skips its right operand when the left operand is false.",
          ],
        ],
      ],
    ],
  },
  {
    topic: "MATLAB loops",
    source: "Chapter 2 §§2.5–2.9 · Iterative Structures lecture · Week 12 HW",
    lesson:
      "Use a for loop when you know how many times to repeat. Use a while loop when the next iteration depends on a condition, such as whether the latest error exceeds a tolerance. Initialize any values used in the condition and update them inside the loop.",
    example: "~~~\ns = 0;\nfor k = 2:2:6\n    s = s + k;\nend\n~~~",
    questions: [
      [
        "trace",
        "What is `r` after this loop?\n~~~\nr = 1;\nfor k = 2:2:6\n    r = r * k;\nend\n~~~",
        ["12", "24", "48", "720"],
        2,
        "List the three values supplied by the colon expression.",
        [
          [
            "List the visited values",
            String.raw`The start, stride and endpoint give \(2,4,6\).`,
          ],
          ["Carry the product forward", String.raw`\[1\to2\to8\to48\]`],
        ],
      ],
      [
        "loop-choice",
        "A solver should continue until the error is small enough or the iteration cap is reached. Which condition belongs on its `while` line?",
        [
          "`err > tol || k < maxIter`",
          "`err <= tol && k < maxIter`",
          "`err > tol && k >= maxIter`",
          "`err > tol && k < maxIter`",
        ],
        3,
        "Each reason to stop must be able to end the loop by itself.",
        [
          [
            "Write the continuation tests",
            "The error must still exceed tolerance, and another iteration must be available.",
          ],
          [
            "Combine the tests",
            "Use `&&`. Update both the error and iteration count each pass.",
          ],
        ],
      ],
    ],
  },
  {
    topic: "MATLAB functions",
    source: "Chapter 3 §§3.2, 3.5, 3.9–3.10 · Functions lecture",
    lesson:
      "Read the header to identify outputs, the function name, and inputs. Pass values explicitly to a function. For recursion, identify a stopping case and ensure that each call moves toward it.",
    example:
      "~~~\nfunction [lo, hi] = bounds(x)\n    lo = min(x);\n    hi = max(x);\nend\n~~~",
    questions: [
      [
        "outputs",
        "Given `function [lo, hi] = bounds(x)`, which call stores only the upper output in `peak`?",
        [
          "`peak = bounds(x)`",
          "`[~, peak] = bounds(x)`",
          "`[peak, ~] = bounds(x)`",
          "`bounds(peak) = x`",
        ],
        1,
        "Outputs follow the order in the function header.",
        [
          ["Read the positions", "`lo` is first and `hi` is second."],
          [
            "Skip the first slot",
            "Use `~` for an output you do not need and assign the second slot to `peak`.",
          ],
        ],
      ],
      [
        "scope",
        "A regular function in its own file needs a variable `gain` from a calling script. Which change passes that value explicitly?",
        [
          "Declare `gain` only inside the script",
          "Rename the output to `gain`",
          "Add `gain` as an input and pass it in the call",
          "Use `clear gain` before the call",
        ],
        2,
        "Check what crosses the boundary between workspaces.",
        [
          ["Identify the scope", "A regular function has its own workspace."],
          [
            "Use the input list",
            "Add `gain` to the function header and supply the script's value when calling it.",
          ],
        ],
      ],
      [
        "recursion",
        String.raw`A function has \(g(0)=1\) and \(g(n)=2g(n-1)\) for positive integers. What is \(g(3)\)?`,
        ["4", "6", "8", "16"],
        2,
        "Trace down to the base case and then return.",
        [
          [
            "Reach the base case",
            String.raw`\(g(3)\) calls \(g(2)\), then \(g(1)\), then \(g(0)\).`,
          ],
          ["Return from each call", String.raw`\[1\to2\to4\to8\]`],
        ],
      ],
    ],
  },
  {
    topic: "Program development",
    source: "Chapter 4 §§4.2–4.6 · Algorithms lecture",
    lesson:
      "Build one part at a time. Make a small input with a result you can work out by hand, test an edge case, and use a breakpoint just before the first unexpected value.",
    example:
      "For a routine that averages a numeric vector, check a short known case such as `[2 4 6]`, a single value, and the empty-input behavior defined by your requirements.",
    questions: [
      [
        "input-check",
        "A MATLAB function divides by a scalar sample interval `dt`, which must be finite and strictly positive. Assume `dt` is real. Which test should trigger an input error?",
        [
          "`dt < 0`",
          "`dt == 0`",
          "`~isfinite(dt) || dt <= 0`",
          "`isfinite(dt) && dt > 0`",
        ],
        2,
        "Consider zero, infinity and NaN along with negative values.",
        [
          [
            "List the invalid cases",
            "Zero and negative intervals violate positivity. Inf and NaN violate finiteness.",
          ],
          [
            "Reject either failure",
            "Use OR so either invalid condition is sufficient to trigger the error.",
          ],
        ],
      ],
      [
        "debug",
        "An accumulator should start at zero, but the final total is too large. Which check most directly isolates an initialization problem?",
        [
          "Change every loop bound",
          "Inspect the total before its first update",
          "Round the final total",
          "Suppress all warnings",
        ],
        1,
        "Look at the first moment when actual and expected values can differ.",
        [
          [
            "Make a tiny test",
            "Pick a vector with a sum you can calculate by hand.",
          ],
          [
            "Inspect before updating",
            "A breakpoint at the first update lets you check whether the starting value is zero.",
          ],
        ],
      ],
    ],
  },
  {
    topic: "Relative errors",
    source: "Week 11 HW and solution · Measuring Errors and Sources of Error",
    lesson: String.raw`Use true percent relative error when the true value \(T\) is known and nonzero. Use approximate percent relative error to compare successive estimates when the current estimate is nonzero.`,
    example: String.raw`\[\varepsilon_t=\left|\frac{T-P}{T}\right|100\%,\qquad
    \varepsilon_a=\left|\frac{P_{\mathrm{new}}-P_{\mathrm{old}}}{P_{\mathrm{new}}}\right|100\%\]`,
    questions: [
      [
        "true-error",
        "The exact value is 80 and an approximation is 76. What is the absolute percent relative true error?",
        [
          String.raw`\(4\%\)`,
          String.raw`\(5\%\)`,
          String.raw`\(5.26\%\)`,
          String.raw`\(95\%\)`,
        ],
        1,
        "Use the true value in the denominator.",
        [
          ["Find the difference", String.raw`\(|80-76|=4\).`],
          [
            "Scale and convert to percent",
            String.raw`\[\frac{4}{80}\times100\%=5\%\]`,
          ],
        ],
      ],
      [
        "approx-error",
        "A series estimate changes from 0.96 to 1.00. What is the absolute percent relative approximate error?",
        [
          String.raw`\(0.04\%\)`,
          String.raw`\(4.17\%\)`,
          String.raw`\(4\%\)`,
          String.raw`\(96\%\)`,
        ],
        2,
        "Divide the change by the current estimate.",
        [
          ["Subtract successive estimates", String.raw`\(1.00-0.96=0.04\).`],
          [
            "Normalize by the new estimate",
            String.raw`\[\frac{0.04}{1.00}\times100\%=4\%\]`,
          ],
        ],
      ],
      [
        "truncation",
        String.raw`You approximate \(e^x\) by \(1+x+x^2/2\) and evaluate the polynomial using exact arithmetic. What causes the remaining approximation error?`,
        [
          "Round-off",
          "An invalid denominator",
          "A binary conversion",
          "Truncation of the series",
        ],
        3,
        "Consider the terms with powers higher than two.",
        [
          [
            "Identify the approximation",
            "The polynomial keeps the first three terms of an infinite series.",
          ],
          [
            "Identify the omitted terms",
            "Their contribution is truncation error. Exact arithmetic removes round-off in this example.",
          ],
        ],
      ],
      [
        "sigfig",
        String.raw`Using the course rule \(\varepsilon_s=0.5\times10^{2-n}\%\), what tolerance corresponds to three significant digits?`,
        [
          String.raw`\(0.05\%\)`,
          String.raw`\(0.5\%\)`,
          String.raw`\(0.005\%\)`,
          String.raw`\(5\%\)`,
        ],
        0,
        String.raw`Substitute \(n=3\) in the stopping formula.`,
        [
          ["Compute the exponent", String.raw`\(2-3=-1\).`],
          [
            "Read the result as percent",
            String.raw`\[0.5\times10^{-1}\%=0.05\%\]`,
          ],
        ],
      ],
    ],
  },
  {
    topic: "Binary conversion",
    source: "Week 11 HW and solution · Binary Representation",
    lesson:
      "From right to left, whole-number places have weights 1, 2, 4, 8, and so on. Fractional places halve as you move right. To convert a whole number to binary, divide by two repeatedly and read the remainders in reverse.",
    example: String.raw`\[(101.01)_2=4+1+\frac14=(5.25)_{10}\]`,
    questions: [
      [
        "decimal-to-binary",
        String.raw`Convert \((22)_{10}\) to binary.`,
        [
          String.raw`\((10110)_2\)`,
          String.raw`\((11010)_2\)`,
          String.raw`\((10101)_2\)`,
          String.raw`\((11100)_2\)`,
        ],
        0,
        "Start with the largest power of two that fits.",
        [
          ["Decompose the value", String.raw`\(22=16+4+2\).`],
          [
            "Mark the occupied places",
            String.raw`For weights \(16,8,4,2,1\), the bits are \(1,0,1,1,0\).`,
          ],
        ],
      ],
      [
        "binary-fraction",
        String.raw`Convert \((0.101)_2\) to decimal.`,
        [
          String.raw`\(0.5\)`,
          String.raw`\(0.75\)`,
          String.raw`\(0.625\)`,
          String.raw`\(0.125\)`,
        ],
        2,
        "Start with one-half at the first position after the point.",
        [
          [
            "Assign weights",
            String.raw`The three positions weigh \(2^{-1},2^{-2},2^{-3}\).`,
          ],
          ["Add the set bits", String.raw`\[\frac12+\frac18=0.625\]`],
        ],
      ],
    ],
  },
  {
    topic: "Bisection",
    source: "Bisection Method lecture · Week 12 HW and answer key",
    lesson:
      "For a continuous function, start with opposite endpoint signs. Evaluate the midpoint and keep the half with opposite signs. If the midpoint gives zero, you have found a root.",
    example: String.raw`\[x_m=\frac{x_\ell+x_u}{2}\]`,
    graph: "bisection",
    questions: [
      [
        "bracket",
        String.raw`For \(f(x)=x^2-10\) with starting bracket \([3,4]\), which bracket remains after one bisection step?`,
        [
          String.raw`\([3.5,4]\)`,
          String.raw`\([3,3.5]\)`,
          String.raw`\([3,4]\)`,
          String.raw`\([3,3.25]\)`,
        ],
        1,
        "Compute the sign at the midpoint.",
        [
          [
            "Evaluate midpoint and lower endpoint",
            String.raw`\[x_m=3.5,\qquad f(3.5)=2.25,\qquad f(3)=-1\]`,
          ],
          [
            "Keep the sign change",
            String.raw`The opposite signs are at \(3\) and \(3.5\).`,
          ],
        ],
      ],
      [
        "width",
        "An initial bisection bracket has width 8. What is its width after three midpoint updates, assuming none finds the root exactly?",
        ["4", "2", "0.5", "1"],
        3,
        "Every update divides the bracket width by two.",
        [
          ["Track the widths", String.raw`\[8\to4\to2\to1\]`],
          [
            "Check with the general rule",
            String.raw`The new width is \(8/2^3=1\).`,
          ],
        ],
      ],
    ],
  },
  {
    topic: "Newton–Raphson",
    source:
      "Non-Linear Equation Newton-Raphson Method lecture · Week 12 HW and answer key",
    lesson:
      "Evaluate the function and its derivative at the current guess. Follow that tangent to its crossing with the horizontal axis to obtain the next guess. A zero derivative makes the update undefined.",
    example: String.raw`\[x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}\]`,
    graph: "newton",
    questions: [
      [
        "first-step",
        String.raw`Use \(f(x)=x^2-10\) and \(x_0=4\). What is the first Newton–Raphson estimate?`,
        ["3.75", "3.25", "3.5", "4.75"],
        1,
        "Evaluate both the function and its slope at 4.",
        [
          [
            "Evaluate the numerator and slope",
            String.raw`\[f(4)=6,\qquad f'(4)=8\]`,
          ],
          ["Follow the tangent", String.raw`\[x_1=4-\frac68=3.25\]`],
        ],
        "newton",
      ],
      [
        "zero-slope",
        String.raw`Why does the Newton update for \(f(x)=x^3-1\) fail from \(x_0=0\)?`,
        [
          "The starting guess is already a root",
          "The function is discontinuous",
          "The slope is zero at the starting guess",
          "The method requires two endpoint guesses",
        ],
        2,
        "Compute the derivative before substituting.",
        [
          [
            "Check the residual",
            String.raw`\(f(0)=-1\), so the guess is not a root.`,
          ],
          [
            "Check the denominator",
            String.raw`\(f'(x)=3x^2\) gives \(f'(0)=0\), so the tangent has no horizontal-axis crossing.`,
          ],
        ],
      ],
    ],
  },
  {
    topic: "Numerical differentiation",
    source: "Divided Difference Methods lecture · Week 13 HW and solution",
    lesson:
      "Choose a stencil based on which samples you have. A forward difference uses the current and next point. A backward difference uses the previous and current points. A central difference uses samples one step either side of the target.",
    example: String.raw`\[D_+=\frac{f(x+h)-f(x)}{h}\]
    \[D_-=\frac{f(x)-f(x-h)}{h}\]
    \[D_0=\frac{f(x+h)-f(x-h)}{2h}\]`,
    questions: [
      [
        "central",
        String.raw`Use the central difference with \(h=0.5\) to estimate the derivative of \(f(x)=x^2\) at \(x=2\).`,
        ["2", "4.5", "8", "4"],
        3,
        "Use the values at 1.5 and 2.5.",
        [
          [
            "Find both sample values",
            String.raw`\(f(2.5)=6.25\) and \(f(1.5)=2.25\).`,
          ],
          [
            "Divide by the sample spacing",
            String.raw`\[\frac{6.25-2.25}{2(0.5)}=4\]`,
          ],
        ],
      ],
      [
        "forward",
        String.raw`Use the forward difference with \(h=0.5\) to estimate the derivative of \(f(x)=x^2\) at \(x=2\).`,
        ["4.5", "4", "3.5", "2.25"],
        0,
        "Use the values at the target and one step ahead.",
        [
          ["Find the forward change", String.raw`\[f(2.5)-f(2)=6.25-4=2.25\]`],
          ["Divide by one step", String.raw`\[\frac{2.25}{0.5}=4.5\]`],
        ],
      ],
      [
        "halving",
        "Forward-difference estimates change from 2.08 to 2.04 after halving the step. What absolute percent relative approximate error should you report, to two decimal places?",
        [
          String.raw`\(0.04\%\)`,
          String.raw`\(1.96\%\)`,
          String.raw`\(1.92\%\)`,
          String.raw`\(4.00\%\)`,
        ],
        1,
        "Normalize by the estimate from the smaller step.",
        [
          ["Find the absolute change", String.raw`\(|2.04-2.08|=0.04\).`],
          [
            "Use the current estimate",
            String.raw`\[\frac{0.04}{2.04}\times100\%\approx1.96\%\]`,
          ],
        ],
      ],
    ],
  },
  {
    topic: "Trapezoidal rule",
    source: "Integrative Numerical Methods lecture · Week 13 HW and solution",
    lesson:
      "Sketch straight segments between sampled points. Multiply the step width by the sum of the interior heights plus half of each endpoint height.",
    example: String.raw`\[T_n=h\left[\frac{f_0+f_n}{2}+\sum_{i=1}^{n-1}f_i\right]\]`,
    graph: "trapezoid",
    questions: [
      [
        "two-panels",
        String.raw`Use two equal trapezoids for \(\int_0^2 x^2\,dx\). What is the estimate?`,
        [String.raw`\(\frac83\)`, "4", "3", "2"],
        2,
        "Split at 1 and count the middle height twice in the endpoint-average form.",
        [
          [
            "Make a node table",
            String.raw`\[\begin{array}{c|rrr}x&0&1&2\\ \hline f(x)&0&1&4\end{array}\]`,
          ],
          [
            "Apply the composite weights",
            String.raw`\[T_2=\frac{1}{2}(0+2\cdot1+4)=3\]`,
          ],
        ],
      ],
      [
        "units",
        String.raw`Velocity samples at times \(0,1,2\) seconds are \(2,4,6\) meters per second. What displacement does the composite trapezoidal rule give?`,
        ["4 m", "8 m/s", "12 m", "8 m"],
        3,
        "Multiply each interval width by its average velocity.",
        [
          [
            "Average the endpoint velocities",
            String.raw`The averages on the two intervals are \(3\) and \(5\) meters per second.`,
          ],
          ["Multiply and sum", String.raw`\[(1)(3)+(1)(5)=8\,\mathrm{m}\]`],
        ],
      ],
    ],
  },
  {
    topic: "Simpson’s rule",
    source: "Integrative Numerical Methods lecture · Week 13 HW and solution",
    lesson:
      "Simpson’s one-third rule groups equal-width intervals in pairs and fits a parabola through each group of three nodes. For the composite rule, use an even number of subintervals.",
    example: String.raw`\[S_2=\frac{h}{3}(f_0+4f_1+f_2)\]`,
    questions: [
      [
        "one-panel",
        String.raw`Use two equal subintervals and Simpson’s one-third rule for \(\int_0^2x^2\,dx\). What do you obtain?`,
        [String.raw`\(\frac83\)`, "3", "4", String.raw`\(\frac43\)`],
        0,
        "The weights across the three nodes are 1, 4, and 1.",
        [
          [
            "Evaluate the three heights",
            String.raw`At \(x=0,1,2\), the heights are \(0,1,4\), and \(h=1\).`,
          ],
          [
            "Apply Simpson’s weights",
            String.raw`\[S_2=\frac13(0+4\cdot1+4)=\frac83\]`,
          ],
        ],
      ],
      [
        "weights",
        "Which weight pattern does composite Simpson’s one-third rule use with four equal subintervals?",
        [
          String.raw`\((1,2,2,2,1)\)`,
          String.raw`\((1,4,4,4,1)\)`,
          String.raw`\((1,4,2,4,1)\)`,
          String.raw`\((1,2,4,2,1)\)`,
        ],
        2,
        "Write the weights for two adjacent groups of two subintervals.",
        [
          ["Start with two groups", String.raw`Each group uses \((1,4,1)\).`],
          [
            "Combine at the shared node",
            String.raw`The shared endpoint receives \(1+1=2\), giving \((1,4,2,4,1)\).`,
          ],
        ],
      ],
    ],
  },
];

const courseQuestions = courseUnits.flatMap(({ topic, source, questions }) =>
  questions.map(([slug, prompt, options, correct, hint, steps, graph]) => ({
    id: "course-" + slug,
    topic,
    source,
    prompt,
    options,
    correct,
    hint,
    steps,
    graph,
  })),
);

const matlabExercises = {
  "MATLAB loops": {
    prompt:
      "Write a loop that sums the squares of the even integers from 2 through 8. Check that the result is 120.",
    solution:
      "~~~\ntotal = 0;\nfor k = 2:2:8\n    total = total + k^2;\nend\n~~~\nInitialize before the loop so every pass adds to the same running total.",
  },
  "MATLAB functions": {
    prompt:
      "Write a function named `span` that returns the maximum minus the minimum of a nonempty numeric vector. Check your code with `span([2 9 5])`, which should return 7.",
    solution:
      "~~~\nfunction width = span(values)\n    width = max(values) - min(values);\nend\n~~~\nSave the primary function in `span.m`. The vector enters through `values` and the result leaves through `width`.",
  },
  "Newton–Raphson": {
    prompt: String.raw`Starting at \(x_0=4\), write a loop that prints three Newton estimates for \(f(x)=x^2-10\).`,
    solution:
      "~~~\nx = 4;\nfor k = 1:3\n    slope = 2*x;\n    if slope == 0\n        error('Newton slope is zero');\n    end\n    x = x - (x^2 - 10)/slope;\n    fprintf('%d: %.6f\\n', k, x);\nend\n~~~\nThe first estimate is 3.250000. All three updates use the previous iteration’s estimate.",
  },
};
