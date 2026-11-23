// Curated from the user's photographed Test #2. Questions with ambiguous grading are not asserted as definitively incorrect.
window.BASE_QUESTIONS = [
{id:'exam-q2',topic:'MATLAB logic',source:'Test #2 Q2',prompt:'Given A = [1 2 3; 4 5 6; 7 8 9], what does A(3,1) || A(1,3) return?',options:['Logical 1','3','7','Logical 0'],correct:0,explanation:'A(3,1)=7 and A(1,3)=3. Both are nonzero (true). true OR true = logical 1.'},
{id:'exam-q12',topic:'Random numbers',source:'Test #2 Q12 — adapted to one correct answer',prompt:'Which distribution does MATLAB rand sample from?',options:['Uniform between 0 and 1','Normal bell curve','Right-skewed bell curve','Only integers'],correct:0,explanation:'rand samples a uniform distribution on (0,1). Equal-width intervals have equal probability. The original exam asked for multiple selections; this version uses one answer.'},
{id:'exam-q14',topic:'MATLAB functions',source:'Test #2 Q14',prompt:'True or false: A MATLAB function file can contain more than one function, but the functions may not call each other.',options:['True','False','Only with global variables','Only with rand'],correct:1,explanation:'False. A function file can contain local functions, and functions can call other functions subject to scope and visibility.'},
{id:'exam-q21',topic:'Matrix indexing',source:'Test #2 Q21',prompt:'times = left_knee_flexion(:,1); knee_angle = left_knee_flexion(:,2); Which pair completes r = range(____); [peak,peak_index] = max(knee_angle); peak_time = times(____);?',options:['knee_angle, peak_index','times, peak','peak_index, knee_angle','times, peak_index'],correct:0,explanation:'range(knee_angle) measures angle spread. max returns the position peak_index, which indexes the corresponding time.'},
{id:'exam-q24',topic:'MATLAB loops',source:'Test #2 Q24 — adapted',prompt:'For plotting transistor density from 1955 to 2018 with t = year − 1955, which line correctly defines elapsed years?',options:['x = y - 1955;','x = 1955 - y;','x = y + 1955;','x = y;'],correct:0,explanation:'If y = 1955:2018, elapsed time since 1955 is x = y - 1955. The exam used a related semilogy plotting task.'},
{id:'exam-q27',topic:'MATLAB loops',source:'Test #2 Q27',prompt:'asum = 0; for a=1:5; asum = asum + a^3 + a^2 + a; end. What is asum after the first TWO iterations?',options:['18','15','21','14'],correct:0,explanation:'Iteration 1 adds 1+1+1=3. Iteration 2 adds 8+4+2=14. Cumulative sum = 3+14=17. NOTE: The correct answer is 17; the answer choices in this item are corrected below.'},
{id:'exam-q28',topic:'Switch-case',source:'Test #2 Q28 — concept',prompt:'In MATLAB switch grade, how do you match uppercase A or lowercase a in one case?',options:["case {'A','a'}","case 'A' || 'a'","case 'A' && 'a'","case 'A' == 'a'"],correct:0,explanation:'Use a cell array of matching values: case {\'A\',\'a\'}. Logical OR is not the syntax for multiple case labels.'},
{id:'exam-q29',topic:'MATLAB loops',source:'Test #2 Q29 — concept',prompt:'To compute sum from n=1 to N of (n+1)/sqrt(n) + n^2 in a MATLAB script, which loop header is appropriate?',options:['for n = 1:N','while n == N','for n = N:1','switch n'],correct:0,explanation:'Start total = 0, then for n = 1:N, add (n+1)/sqrt(n) + n^2 to total, then end.'},
{id:'exam-q30',topic:'Recursion',source:'Test #2 Q30 — concept',prompt:'Which recursive expression gives the Fibonacci term for n > 2?',options:['fibonacci(n-1) + fibonacci(n-2)','fibonacci(n-1) * fibonacci(n-2)','fibonacci(n) + 1','fibonacci(n-2) - fibonacci(n-1)'],correct:0,explanation:'The base cases are f(1)=1 and f(2)=1. For n>2, f(n)=f(n-1)+f(n-2).'},
{id:'exam-q31',topic:'Linear systems',source:'Test #2 Q31 — concept',prompt:'For a nonsingular 3×3 coefficient matrix A and right-hand-side vector b, what MATLAB command solves A*x=b?',options:['x = A\\b;','x = A.*b;','x = A+b;','x = b/A;'],correct:0,explanation:'MATLAB left division A\\b solves the linear system directly. The original exam also required building a 3×3 random coefficient matrix using loops.'},
{id:'exam-q32',topic:'Bisection',source:'Test #2 Q32 — concept',prompt:'Which expression calculates the midpoint of a bisection interval [xl,xu]?',options:['(xl+xu)/2','(xl-xu)/2','xl*xu','xl+xu'],correct:0,explanation:'The midpoint is the average of the lower and upper bounds. Recheck the function signs to choose which bound to replace.'},
{id:'exam-q33',topic:'Relative errors',source:'Test #2 Q33 — concept',prompt:'Given true value T and approximation P, which expression computes absolute percent relative true error (T nonzero)?',options:['abs(T-P)*100/abs(T)','abs(T-P)*100/abs(P)','abs(T+P)*100/abs(T)','(T-P)*100'],correct:0,explanation:'Percent true relative error uses the true value in the denominator: |T-P|/|T| × 100.'},
{id:'new-trap-1',topic:'Trapezoidal rule',source:'New material — illustrative practice',prompt:'Use one trapezoid to approximate integral from x=0 to x=2 of f(x)=x². What is the result?',options:['4','8/3','2','8'],correct:0,explanation:'Width = 2, f(0)=0 and f(2)=4. T = (2/2)(0+4)=4. Exact integral is 8/3, but trapezoidal approximation is 4.'},
{id:'new-trap-2',topic:'Trapezoidal rule',source:'New material — illustrative practice',prompt:'For composite trapezoidal rule on [1,5] with n=4 equal intervals, what is h?',options:['1','4','0.25','5'],correct:0,explanation:'h=(b-a)/n=(5-1)/4=1.'}
];
// Q27 cumulative total after two iterations is 17.
window.BASE_QUESTIONS.find(q=>q.id==='exam-q27').options=['17','14','18','21'];
window.BASE_QUESTIONS.forEach(q=>{q.hint=({
'exam-q2':'Check whether the operator returns a logical value or a matrix element.',
'exam-q12':'Think about the shape of the distribution rather than whether the numbers are unpredictable.',
'exam-q14':'Consider how local functions can be organized in one MATLAB file.',
'exam-q21':'The max function returns both a value and its position.',
'exam-q24':'Check what elapsed time equals at the starting year.',
'exam-q27':'The accumulator keeps its previous total at each iteration.',
'exam-q28':'A switch case can match several literal values using one grouping syntax.',
'exam-q29':'Identify which variable must visit every integer in the range.',
'exam-q30':'A recursive function needs a base case and a smaller subproblem.',
'exam-q31':'Think of a matrix equation rather than elementwise multiplication.',
'exam-q32':'Bisection repeatedly halves an interval.',
'exam-q33':'Which quantity is the reference for a true error?',
'new-trap-1':'A trapezoid uses endpoint heights and the interval width.',
'new-trap-2':'Count the number of subintervals, not the number of sample points.'
})[q.id]||''});
