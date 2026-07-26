 var nerdcmds = [
     // Formázás
     { value: "- << ${0} >>", tag: "&#x27E8;&#x27E8;  &#x27E9;&#x27E9;", meta: "nerd" },
     { value: "- $ ${0} $", tag: "$ $", meta: "nerd" },
     { value: "- $$ ${0} $$", tag: "$$ $$", meta: "nerd" },
     { value: "- § ${0} §", tag: "§ §", meta: "nerd" },
     { value: "- §§ ${0} §§", tag: "§§ §§", meta: "nerd" },
     { value: "- ●●●START", tag: "●●●START", meta: "nerd" },
     { value: "- ●●●END", tag: "●●●END", meta: "nerd" },
     { value: "- ▶START", tag: "▶START", meta: "nerd" },
     { value: "- ▶END", tag: "▶END", meta: "nerd" },
     { value: "- ●●●DOCSTART", tag: "●●●DOCSTART", meta: "nerd" },
     { value: "- ●●●DOCEND", tag: "●●●DOCEND", meta: "nerd" },
     //Nerdamer Constants
     { value: "pi", tag: "&pi;", meta: "nerd" },
     { value: "i", tag: "i (Imaginary)", meta: "nerd" },
     { value: "e", tag: "e (Euler)", meta: "nerd" },
     { value: "Infinity", tag: "&#x221E;", meta: "nerd" },
     // Nerdamer hatasok
     { value: "Fseq(${0},,)", tag: "Fseq(F,a,n)", meta: "nerd" },
     { value: "hatas1_n(${0},,)", tag: "hatas1_n(F1,a,n)", meta: "nerd" },
     { value: "hatas1(${0},,)", tag: "hatas1(F1,a,n)", meta: "nerd" },
     { value: "hatas2_n(${0},,,)", tag: "hatas2_n(F1,F2,a,n)", meta: "nerd" },
     { value: "hatas2(${0},,,)", tag: "hatas2(F1,F2,a,n)", meta: "nerd" },
     { value: "hatas3_n(${0},,,,)", tag: "hatas3_n(F1,..,a,n)", meta: "nerd" },
     { value: "hatas3(${0},,,,)", tag: "hatas3(F1,..,a,n)", meta: "nerd" },
     { value: "hatas4_n(${0},,,,,)", tag: "hatas4_n(F1,..,a,n)", meta: "nerd" },
     { value: "hatas4(${0},,,,,)", tag: "hatas4(F1,..,a,n)", meta: "nerd" },

     // Nerdamer aritmetikai fgvs
     { value: "pent(${0})", tag: "&delta;<sub>5</sub>(n)", meta: "nerd" },
     { value: "sigma(${0})", tag: "&sigma;(n)", meta: "nerd" },
     { value: "sigmaM(${0},)", tag: "&sigma;<sub>m</sub>(n)", meta: "nerd" },
     { value: "tau(${0})", tag: "&tau;(n)", meta: "nerd" },
     { value: "rtau(${0})", tag: "rtau(n)", meta: "nerd" },
     { value: "part(${0})", tag: "p(n)", meta: "nerd" },
     { value: "partM(${0},)", tag: "p<sub>m</sub>(n)", meta: "nerd" },
     { value: "pell(${0})", tag: "pell(n)", meta: "nerd" },
     { value: "phi(${0})", tag: "&phi;(n)", meta: "nerd" },
     { value: "mobius(${0})", tag: "&mu;(n)", meta: "nerd" },
     { value: "mahonian(${0},)", tag: "mahonian(n,m)", meta: "nerd" },
     { value: "binomial(${0},)", tag: "binomial(n,m)", meta: "nerd" },
     //  Nerdamer többv polinomok
     { value: "fgv(${0}:)", tag: "fgv(F:képlet)", meta: "nerd" },
     { value: "Fgv(${0},[],)", tag: "Fgv(F,[x_1,..],képlet)", meta: "nerd" },
     { value: "Zyc_${0}(,,)", tag: "Zyc_n(x<sub>1</sub>,..)", meta: "nerd" },
     { value: "Fab_${0}(,,)", tag: "Fab_n(x<sub>1</sub>,..)", meta: "nerd" },
     { value: "Fib_${0}(,,)", tag: "Fib_n(x<sub>1</sub>,..)", meta: "nerd" },
     { value: "Luc_${0}(,,)", tag: "Luc_n(x<sub>1</sub>,..)", meta: "nerd" },
     { value: "Sti_${0}(,,)", tag: "Sti_n(x<sub>1</sub>,..)", meta: "nerd" },
     { value: "Har_${0}(,,)", tag: "Har_n(x<sub>1</sub>,..)", meta: "nerd" },
     { value: "Witt_${0}(,,)", tag: "Witt_n(x<sub>1</sub>,..)", meta: "nerd" },
     { value: "comp2(${0},,)", tag: "comp2(F1,F2,n)", meta: "nerd" },
     { value: "comp3(${0},,,)", tag: "comp3(F1,F2,F3,n)", meta: "nerd" },
     { value: "comp4(${0},,,,)", tag: "comp4(F1,..,F4,n)", meta: "nerd" },
     { value: "showTPS(${0},)", tag: "showTPS(F,n,[mat])", meta: "nerd" },
     { value: "lincombTPS(${0},,,)", tag: "lincombTPS(Fsor,Csor,nev,n)", meta: "nerd" },
     { value: "compTPS(${0},,,)", tag: "compTPS(F1,F2,Név,n)", meta: "nerd" },
     { value: "makePPS(${0},,,,)", tag: "makePPS(F,x,n,C,b)", meta: "nerd" },
     { value: "makeTPS(${0},,)", tag: "makeTPS(F,expr,n)", meta: "nerd" },
     { value: "polyToTPS(${0},,)", tag: "polyToTPS(F,expr,var)", meta: "nerd" },
     { value: "makeTPX(${0},,)", tag: "makeTPX(F,F0,n)", meta: "nerd" },
     { value: "makeLPS(${0},)", tag: "makeLPS(F,mat)", meta: "nerd" },

     // Nerdamer math functions
     { value: "sqrt(${0})", tag: "sqrt(x)=√x", meta: "nerd" },
     { value: "dirichletZ(${0},)", tag: "dirichletZ(n_<sub>0</sub>,n)", meta: "nerd" },
     { value: "fib(${0})", tag: "fib(n)", meta: "nerd" },
     { value: "exp(${0})", tag: "exp(x)=e<sup>x</sup>", meta: "nerd" },
     { value: "log(${0})", tag: "log(x)=ln(x)", meta: "nerd" },
     { value: "log10(${0})", tag: "lg(x)", meta: "nerd" },
     { value: "min(${0},,)", tag: "min(x,y,...)", meta: "nerd" },
     { value: "max(${0},,)", tag: "max(x,y,...)", meta: "nerd" },
     { value: "abs(${0})", tag: "abs(x)=|x|", meta: "nerd" },
     { value: "floor(${0})", tag: "floor(x)=⌊x⌋", meta: "nerd" },
     { value: "ceil(${0})", tag: "ceil(x)=⌈x⌉", meta: "nerd" },
     { value: "simplify(${0})", tag: "simplify(expr)", meta: "nerd" },
     { value: "expand(${0})", tag: "expand(expr)", meta: "nerd" },
     { value: "collect(${0})", tag: "collect(expr)", meta: "nerd" },
     { value: "factorial(${0})", tag: "factorial(x)=x!", meta: "nerd" },
     { value: "dfactorial(${0})", tag: "dfactorial(x)=x!!", meta: "nerd" },
     { value: "mod(${0},)", tag: "mod(x,y)", meta: "nerd" },

     // Nerdamer Trigonometric
     { value: "cos(${0})", tag: "cos( )", meta: "nerd" },
     { value: "sin(${0})", tag: "sin( )", meta: "nerd" },
     { value: "tan(${0})", tag: "tan( )", meta: "nerd" },
     { value: "cot(${0})", tag: "cot( )", meta: "nerd" },
     { value: "csc(${0})", tag: "csc( )", meta: "nerd" },
     { value: "sec(${0})", tag: "sec( )", meta: "nerd" },
     { value: "acos(${0})", tag: "acos( )", meta: "nerd" },
     { value: "asin(${0})", tag: "asin( )", meta: "nerd" },
     { value: "atan(${0})", tag: "atan( )", meta: "nerd" },
     // Nerdamer Hyperbolic
     { value: "cosh(${0})", tag: "cosh( )", meta: "nerd" },
     { value: "sinh(${0})", tag: "sinh( )", meta: "nerd" },
     { value: "tanh(${0})", tag: "tanh( )", meta: "nerd" },
     { value: "coth(${0})", tag: "coth( )", meta: "nerd" },
     { value: "csch(${0})", tag: "csch( )", meta: "nerd" },
     { value: "sech(${0})", tag: "sech( )", meta: "nerd" },
     { value: "acosh(${0})", tag: "acosh( )", meta: "nerd" },
     { value: "asinh(${0})", tag: "asinh( )", meta: "nerd" },
     { value: "atanh(${0})", tag: "atanh( )", meta: "nerd" },
     // Nerdamer Matrix
     { value: "matrix([${0},],[,])", tag: "matrix", meta: "nerd" },
     { value: "matExpr(${0},,)", tag: "matExpr(n,m,expr|fgv)", meta: "nerd" },
     { value: "matMap(${0},,)", tag: "matMap(expr,mat,[kib])", meta: "nerd" },
     { value: "matTri(${0},,)", tag: "matTri(n,expr,[kib])", meta: "nerd" },
     { value: "matDiag([${0},,])", tag: "matDiag(vec)", meta: "nerd" },
     { value: "matDiag(${0},,)", tag: "matDiag(n,expr,[kib])", meta: "nerd" },
     { value: "matrix([${0},], [,], [,]))", tag: "matrix 3&times;2", meta: "nerd" },
     { value: "matrix([${0},,], [,,], [,,])", tag: "matrix 3&times;3", meta: "nerd" },
     { value: "matrix([${0},,,], [,,,], [,,,])", tag: "matrix 3&times;4", meta: "nerd" },
     { value: "matrix([${0},], [,], [,], [,])", tag: "matrix 4&times;2", meta: "nerd" },
     { value: "matrix([${0},,], [,,], [,,], [,,])", tag: "matrix 4&times;3", meta: "nerd" },
     { value: "matrix([${0},,,], [,,,], [,,,], [,,,])", tag: "matrix 4&times;4", meta: "nerd" },
     { value: "imatrix(${0})", tag: "imatrix", meta: "nerd" },
     { value: "determinant(${0})", tag: "determináns", meta: "nerd" },
     { value: "invert(${0})", tag: "inverz", meta: "nerd" },
     { value: "transpose(${0})", tag: "transzponált", meta: "nerd" },
     { value: "size(${0})", tag: "méret", meta: "nerd" },
     { value: "matgetrow(${0},)", tag: "matgetrow(<b>A</b>,i)", meta: "nerd" },
     { value: "matgetcol(${0},)", tag: "matgetcol(<b>A</b>,i)", meta: "nerd" },
     { value: "matsetrow(${0},,)", tag: "matsetrow(<b>A</b>,i,<b>s</b>)", meta: "nerd" },
     { value: "matsetcol(${0},,)", tag: "matsetcol(<b>A</b>,i,<b>o</b>)", meta: "nerd" },
     { value: "matget(${0},,)", tag: "matget(<b>A</b>,i,j)", meta: "nerd" },
     { value: "matset(${0},,,)", tag: "matset(<b>A</b>,i,j,a<sub>i,j</sub>)", meta: "nerd" },
     { value: "matToeplitz([${0},,])", tag: "matToeplitz(<b>v</b>)", meta: "nerd" },
     // Nerdamer Vector
     { value: "-- [${0},||]", tag: "[a_1, a_2,||n]", meta: "nerd" },
     { value: "-- [${0},,...||]", tag: "[a_1,a_2,... ||n]", meta: "nerd" },
     { value: "-- [${0},...f(k)||]", tag: "[a_1,a_2,...f(k) ||n]", meta: "nerd" },
     { value: "vector(${0},,)", tag: "vector(,,)", meta: "nerd" },
     { value: "ivector(${0},)", tag: "ivector(dim,k)", meta: "nerd" },
     { value: "seq(${0},,)", tag: "seq(f,a,b)", meta: "nerd" },
     { value: "randseq(${0},,)", tag: "randseq(min,max,db)", meta: "nerd" },
     { value: "Fvec(${0},)", tag: "Fvec(F,vec)", meta: "nerd" },
     { value: "seqvar(${0},,,?)", tag: "seqvar(f(k,.),k,a,b,[exp])", meta: "nerd" },
     { value: "map(${0},,?)", tag: "map(f,vec,[exp])", meta: "nerd" },
     { value: "map_n(${0},,,?)", tag: "map_n(f,k,vec,[exp])", meta: "nerd" },
     { value: "dot(${0},)", tag: "<b>a</b>&centerdot;<b>b</b> (skaláris)", meta: "nerd" },
     { value: "concat(${0},)", tag: "<b>a</b>&bullet;<b>b</b> (összefűzés)", meta: "nerd" },
     { value: "conv(${0},,[röv])", tag: "<b>a</b>*<b>b</b> (konv.)", meta: "nerd" },
     { value: "convinv(${0})", tag: "<b>a</b><sup> -&lowast;</sup> (röv.konv. inverz)", meta: "nerd" },
     { value: "cross(${0},)", tag: "<b>a</b>&times;<b>b</b> (vektoriális)", meta: "nerd" },
     { value: "vecget(${0},)", tag: "vecget(<b>v</b>,i)", meta: "nerd" },
     { value: "vecset(${0},)", tag: "vecset(<b>v</b>,i)", meta: "nerd" },
     // Nerdamer Calculus
     { value: "sum(f${0},k,a,b)", tag: "&sum;<sub>k=a..b</sub>f(..,k)", meta: "nerd" },
     { value: "Sum(f${0},k,a,b)", tag: "&sum;<sub>k=a..b</sub>f<sub>k</sub>(..,x)", meta: "nerd" },
     { value: "product(f${0},k,a,b)", tag: "&prod;<sub>k=a..b</sub>f(..,k)", meta: "nerd" },
     { value: "Product(f${0},k,a,b)", tag: "&prod;<sub>k=a..b</sub>f<sub>k</sub>(..,x)", meta: "nerd" },
     { value: "truncprod(f${0},g,Nev,[n])", tag: "f&nbsp;&bullet;<sub>n</sub>&nbsp;g", meta: "nerd" },
     { value: "limit(f${0},x,a)", tag: "lim<sub>x&rightarrow;a</sub>f(x)", meta: "nerd" },
     { value: "diff(f${0},x,n)", tag: "&part;<sup style='vertical-align:0.7em;'>(n)</sup><sub style='margin-left:-1.1em;margin-right:0.7em;'>x</sub>f(x,..)", meta: "nerd" },
     { value: "int(f${0},x)", tag: "&int;f(x)dx", meta: "nerd" },
     { value: "defint(f${0},a,b,x)", tag: "&int;<sup style='margin-left:0.1em;vertical-align:0.7em;'>b</sup><sub style='margin-left:-0.6em;margin-right:0.3em;'>a</sub>f(x)dx", meta: "nerd" },
     { value: "laplace(f${0},s,t)", tag: "&#x2112;[f,s,t]", meta: "nerd" },
     { value: "ilt(f${0},s,t)", tag: "&#x2112;<sup>-1</sup>[f,s,t]", meta: "nerd" },
     // Nerdamer Algebra
     { value: "divide(${0},)", tag: "divide(f,g)", meta: "nerd" },
     { value: "factor(${0})", tag: "factor(f)", meta: "nerd" },
     { value: "partfrac(${0},)", tag: "partfrac(f,x)", meta: "nerd" },
     { value: "lcm(${0},)", tag: "lcm(f,g)", meta: "nerd" },
     { value: "gcd(${0},)", tag: "gcd(f,g)", meta: "nerd" },
     { value: "roots(${0})", tag: "roots(f)", meta: "nerd" },
     { value: "coeffs(${0},)", tag: "coeffs(f,x)", meta: "nerd" },
     { value: "deg(${0})", tag: "deg(f)", meta: "nerd" },
     { value: "sqcomp(${0},)", tag: "sqcomp(f,x)", meta: "nerd" },
 ];

 var nerditor = ace.edit("pentcinput");
 nerditor.setTheme("ace/theme/one_dark");
 nerditor.session.setMode("ace/mode/text");
 var nerditor2 = ace.edit("pentcinput2");
 nerditor2.setTheme("ace/theme/solarized_light");
 nerditor2.session.setMode("ace/mode/text");
 // trigger extension
 var langTools = ace.require('ace/ext/language_tools');
 var aceoptns = {
     showPrintMargin: false,
     enableBasicAutocompletion: true,
     enableLiveAutocompletion: true,
     enableSnippets: true,
 };
 nerditor.setOptions(aceoptns);
 nerditor2.setOptions(aceoptns);

 var snippetManager = ace.require("ace/snippets").snippetManager;

 var nerdamerCompleter = {
     //hideInlinePreview: false,
     getCompletions: function(editor, session, pos, prefix, callback) {
         callback(null, nerdcmds.map(function(elem) {
             return {
                 caption: elem.value.replace(/\$\{0\}/, ''),
                 snippet: elem.value.replace(/(-* )/, ''),
                 docHTML: elem.tag,
                 meta: elem.meta
             };
         }));
     }
 };

 langTools.addCompleter(nerdamerCompleter);
 $('#pentcinput').resizable();
 $('#pentcinput2').resizable();
 setTimeout(() => {
     nerditor.focus();
 }, 500);

 function setAceComp(b, num) {
     if (num == 1)
         nerditor.setOptions({
             enableBasicAutocompletion: b,
             enableLiveAutocompletion: b,
             enableSnippets: b,
         });
     else
         nerditor2.setOptions({
             enableBasicAutocompletion: b,
             enableLiveAutocompletion: b,
             enableSnippets: b,
         });
 }