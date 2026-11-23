(() => {
  const mapping = {
    'exam-q2': String.raw`A=\begin{bmatrix}1&2&3\\4&5&6\\7&8&9\end{bmatrix}`,
    'exam-q27': String.raw`S=\sum_{a=1}^{2}(a^3+a^2+a)`,
    'exam-q29': String.raw`\sum_{n=1}^{N}\left(\frac{n+1}{\sqrt n}+n^2\right)`,
    'exam-q30': String.raw`F_n=F_{n-1}+F_{n-2}`,
    'exam-q31': String.raw`A\mathbf{x}=\mathbf{b}`,
    'exam-q32': String.raw`x_m=\frac{x_l+x_u}{2}`,
    'exam-q33': String.raw`\varepsilon_t=\left|\frac{T-P}{T}\right|\times100\%`,
    'new-trap-1': String.raw`\int_0^2 x^2\,dx\approx T_1`,
    'new-trap-2': String.raw`h=\frac{b-a}{n},\quad a=1,\ b=5,\ n=4`
  };
  const labelMath = {'8/3':String.raw`\frac83`};
  const card = document.getElementById('questionCard');
  let observer;
  function render() {
    if (!window.katex) return;
    const title = document.getElementById('questionTitle').textContent;
    const m = title.match(/Q(\d+)/);
    let id = m ? 'exam-q'+m[1] : null;
    const prompt = document.getElementById('questionBody');
    if (!prompt.querySelector('.math-display')) {
      delete prompt.dataset.mathid;
      prompt.dataset.raw = prompt.textContent;
    }
    const text = prompt.dataset.raw || prompt.textContent;
    if (!id && text.includes('one trapezoid')) id = 'new-trap-1';
    if (!id && text.includes('composite trapezoidal')) id = 'new-trap-2';
    if (mapping[id] && prompt.dataset.mathid !== id) {
      const el = document.createElement('div');
      el.className = 'math-display';
      katex.render(mapping[id], el, {displayMode:true,throwOnError:false});
      prompt.append(el);
      prompt.dataset.mathid = id;
    }
    document.querySelectorAll('#answers label.option').forEach(label => {
      const value = label.textContent.trim();
      if (labelMath[value] && !label.dataset.math) {
        const math = document.createElement('span');
        katex.render(labelMath[value], math, {throwOnError:false});
        label.replaceChildren(label.querySelector('input'),document.createTextNode(' '),math);
        label.dataset.math = '1';
      }
    });
    if (window.renderMathInElement) {
      document.querySelectorAll('details').forEach(el => {
        if (!el.dataset.rendered) {
          renderMathInElement(el,{delimiters:[{left:'$$',right:'$$',display:true}],throwOnError:false});
          el.dataset.rendered='1';
        }
      });
    }
  }
  function refresh() {
    observer.disconnect();
    render();
    observer.observe(card,{childList:true,subtree:true});
  }
  observer = new MutationObserver(refresh);
  observer.observe(card,{childList:true,subtree:true});
  window.addEventListener('load',refresh);
})();
