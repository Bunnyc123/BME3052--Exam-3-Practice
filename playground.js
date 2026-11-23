/* Small educational MATLAB-like interpreter, NOT MATLAB or GNU Octave. */
(()=>{'use strict';
const $=id=>document.getElementById(id);let example='for i = 1:5\n    if mod(i,2) == 0\n        disp(i)\n    end\nend';
const examples={loop:example,while:'n = 1;\nwhile n < 20\n    n = n * 2;\nend\ndisp(n)',matrix:'A = [1 2; 3 4];\nb = [5; 6];\nx = A \\ b;\ndisp(x)',trapezoid:'x = [0 1 2];\ny = x.^2;\narea = trapz(x,y);\ndisp(area)'};
$('codeInput').value=example;
$('codeExample').addEventListener('change',e=>{$('codeInput').value=examples[e.target.value];$('codeOutput').textContent='Ready to run.'});
$('codeClear').onclick=()=>{$('codeInput').value='';$('codeOutput').textContent='Cleared.'};
$('codeRun').onclick=()=>{let source=$('codeInput').value;let output=$('codeOutput');try{const result=run(source);output.textContent=result.length?result.join('\n'):'Finished (no printed output). Add disp(variable) to display a value.';output.className='code-output ok'}catch(e){output.textContent='⚠ '+e.message+'\n\nFor full MATLAB compatibility, use MATLAB or GNU Octave.';output.className='code-output error'}};
window.BMEPracticeRun = run;
function run(src){if(!window.math)throw Error('Math engine not loaded. Check internet connection and refresh.');if(src.length>5000)throw Error('Keep examples under 5,000 characters.');const lines=src.split(/\r?\n/).flatMap(line=>line.replace(/%.*$/,'').split(/;(?![^\[]*\])/)).map(s=>s.trim()).filter(Boolean);const env=Object.create(null),logs=[];let count=0;
function expr(s){s=s.trim();if(/(?:\b(?:import|createUnit|evaluate|parse|simplify|derivative|resolve|compile)\s*\()/i.test(s))throw Error('Unsupported function in the practice runner.');s=s.replace(/\bmod\s*\(/g,'mod(').replace(/\btrue\b/gi,'true').replace(/\bfalse\b/gi,'false').replace(/~= /g,' != ');s=s.replace(/~=/g,'!=');s=s.replace(/&&/g,' and ').replace(/\|\|/g,' or ');s=s.replace(/\.\^/g,'^').replace(/\.\*/g,'.*').replace(/\.\//g,'./');s=s.replace(/(^|[^=<>!])==(?!=)/g,'$1==');try{return math.evaluate(s,env)}catch(e){throw Error('Cannot evaluate "'+s+'": '+e.message)}}
function fmt(v){if(typeof v==='number')return String(Number(v.toPrecision(9)));if(v&&v.toArray)v=v.toArray();return typeof v==='string'?v:JSON.stringify(v)}
function block(start){let depth=0;for(let j=start+1;j<lines.length;j++){if(/^(for|while|if|switch)\b/i.test(lines[j]))depth++;else if(/^end\b/i.test(lines[j])){if(depth===0)return j;depth--}}throw Error('Missing end for '+lines[start]);}
function exec(a,b){for(let i=a;i<b;i++){if(++count>2000)throw Error('Stopped after 2,000 operations (possible infinite loop).');const line=lines[i];if(/^end\b/i.test(line))continue;
let m;if((m=line.match(/^for\s+([A-Za-z]\w*)\s*=\s*(.+)$/i))){const end=block(i);let parts=m[2].split(':').map(x=>Number(expr(x)));if(parts.length<2||parts.length>3||parts.some(x=>!Number.isFinite(x)))throw Error('Use for i = start:end or start:step:end');let [start,step,stop]=parts.length===2?[parts[0],1,parts[1]]:parts;if(step===0)throw Error('Loop step cannot be zero.');for(let v=start;(step>0?v<=stop:v>=stop);v+=step){env[m[1]]=v;exec(i+1,end)}i=end;continue}
if((m=line.match(/^while\s+(.+)$/i))){let end=block(i);while(Boolean(expr(m[1]))){exec(i+1,end);if(++count>2000)throw Error('Infinite-loop protection activated.')}i=end;continue}
if((m=line.match(/^if\s+(.+)$/i))){let end=block(i),split=end;let depth=0;for(let j=i+1;j<end;j++){if(/^(for|while|if)\b/.test(lines[j]))depth++;else if(/^end\b/.test(lines[j]))depth--;else if(depth===0&&/^else\b/.test(lines[j])){split=j;break}}if(Boolean(expr(m[1])))exec(i+1,split);else if(split<end)exec(split+1,end);i=end;continue}
if(/^else(if)?\b/i.test(line))throw Error('Unexpected else/elseif. This runner supports if/else/end, not elseif.');
if((m=line.match(/^disp\s*\((.*)\)$/i))){logs.push(fmt(expr(m[1])));continue}
if((m=line.match(/^([A-Za-z]\w*)\s*=\s*(.+)$/))){if(['__proto__','constructor','prototype'].includes(m[1]))throw Error('Invalid variable name.');env[m[1]]=expr(m[2]);continue}
throw Error('Unsupported line: '+line+' (try assignment, for, while, if/else, disp).');}}
exec(0,lines.length);return logs;}
})();
