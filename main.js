var lastlist = [];
var numrows = 2;
var opt_sotet = false;
var opt_help = false;
var opt_wrap = false;
var opt_wrapltx = false;
var opt_hist = true;
var searchCmds = ["max_symbolic(a,b,...)", "abs(x)", "floor(x)", "ceil(x)", "frac(x)", "sgn(x)", "min_symbolic(a,b,...)", "piecewise([[(a1,b1),f1],[(a2,b2),f2],...])", "integrate(f,x)", "integrate(f,x,a,b)", "derivative(f,x)", "plot(f,x,a,b)", "airy_ai(z)", "airy_ai_prime(z)", "airy_bi(z)", "airy_bi_prime(z)", "spherical_bessel_J(n,z)", "spherical_bessel_Y(n,z)", "spherical_hankel1(n,z)", "spherical_hankel2(n,z)", "bessel_J(n,z)", "bessel_I(n,z)", "bessel_Y(n,z)", "bessel_K(n,z)", "hankel1(n,z)", "hankel2(n,z)", "spherical_bessel_J(n,z)", "spherical_bessel_Y(n,z)", "spherical_hankel1(n,z)", "spherical_hankel2(n,z)", "bessel_J(n,z)", "bessel_I(n,z)", "bessel_Y(n,z)", "bessel_K(n,z)", "hankel1(n,z)", "hankel2(n,z)", "spherical_bessel_J(n,z)", "spherical_bessel_Y(n,z)", "spherical_hankel1(n,z)", "spherical_hankel2(n,z)", "binomial(n,k)", "beta(x,y)", "gamma(x)", "gamma_inc(a,x)", "log_gamma(x)", "psi(a,x)", "erf(x)", "factorial(x)", "binomial(n,k)", "beta(x,y)", "gamma(x)", "gamma_inc(a,x)", "log_gamma(x)", "psi(a,x)", "erf(x)", "factorial(x)", "binomial(n,k)", "beta(x,y)", "kronecker_delta(n,m)", "dirac_delta(x)", "heaviside(x)", "unit_step(x)", "spike_function([(x1,f1),(x2,f2),...],approx)", "bernoulli(n)", "zeta(x)", "zeta_symmetric(x)", "zetaderiv(n,x)", "hurwitz_zeta(x,a)", "harmonic_number(n)", "harmonic_number(n,m)", "bernoulli(n)", "zeta(x)", "zeta_symmetric(x)", "zetaderiv(n,x)", "hurwitz_zeta(x,a)", "harmonic_number(n)", "harmonic_number(n,m)", "bernoulli(n)", "atan2(x,y)", "sin(z)", "cos(z)", "tan(z)", "cot(z)", "sec(z)", "csc(z)", "asin(z)", "acos(z)", "atan(z)", "acot(z)", "asec(z)", "acsc(z)", "atan2(x,y)", "sin(z)", "cos(z)", "tan(z)", "cot(z)", "sec(z)", "csc(z)", "asin(z)", "acos(z)", "atan(z)", "acot(z)", "asec(z)", "acsc(z)", "atan2(x,y)", "asinh(z)", "acosh(z)", "atanh(z)", "acoth(z)", "asech(z)", "acsch(z)", "sinh(z)", "cosh(z)", "tanh(z)", "coth(z)", "sech(z)", "csch(z)", "asinh(z)", "acosh(z)", "atanh(z)", "acoth(z)", "asech(z)", "acsch(z)", "sinh(z)", "cosh(z)", "tanh(z)", "coth(z)", "sech(z)", "csch(z)", "asinh(z)", "acosh(z)", "atanh(z)", "acoth(z)", "asech(z)", "acsch(z)", "hypergeometric([a1,...],[b1,...],z)", "hypergeometric_M(a,b,z)", "hypergeometric_U(a,b,z)", "inverse_jacobi_ds(z,m)", "inverse_jacobi_dc(z,m)", "jacobi(kind,z,m)", "jacobi_sn(z,m)", "jacobi_cn(z,m)", "jacobi_dn(z,m)", "jacobi_ns(z,m)", "jacobi_nc(z,m)", "jacobi_nd(z,m)", "jacobi_sc(z,m)", "jacobi_sd(z,m)", "jacobi_cs(z,m)", "jacobi_cd(z,m)", "jacobi_ds(z,m)", "jacobi_dc(z,m)", "inverse_jacobi(kind,z,m)", "inverse_jacobi_sn(z,m)", "inverse_jacobi_cn(z,m)", "inverse_jacobi_dn(z,m)", "inverse_jacobi_ns(z,m)", "inverse_jacobi_nc(z,m)", "inverse_jacobi_nd(z,m)", "inverse_jacobi_sc(z,m)", "inverse_jacobi_sd(z,m)", "inverse_jacobi_cs(z,m)", "inverse_jacobi_cd(z,m)", "inverse_jacobi_ds(z,m)", "inverse_jacobi_dc(z,m)", "jacobi(kind,z,m)", "jacobi_sn(z,m)", "jacobi_cn(z,m)", "jacobi_dn(z,m)", "jacobi_ns(z,m)", "jacobi_nc(z,m)", "jacobi_nd(z,m)", "jacobi_sc(z,m)", "jacobi_sd(z,m)", "jacobi_cs(z,m)", "jacobi_cd(z,m)", "jacobi_ds(z,m)", "jacobi_dc(z,m)", "inverse_jacobi(kind,z,m)", "inverse_jacobi_sn(z,m)", "inverse_jacobi_cn(z,m)", "inverse_jacobi_dn(z,m)", "inverse_jacobi_ns(z,m)", "inverse_jacobi_nc(z,m)", "inverse_jacobi_nd(z,m)", "inverse_jacobi_sc(z,m)", "inverse_jacobi_sd(z,m)", "inverse_jacobi_cs(z,m)", "inverse_jacobi_cd(z,m)", "inverse_jacobi_ds(z,m)", "inverse_jacobi_dc(z,m)", "lambert_w(x)", "exp(x)", "exp_polar(x)", "ln(x)", "log(x,a)", "polylog(n,x)", "diloglog(x)", "lambert_w(x)", "exp(x)", "exp_polar(x)", "ln(x)", "log(x,a)", "polylog(n,x)", "diloglog(x)", "lambert_w(x)", "Si(z)", "Ci(z)", "Shi(z)", "Chi(z)", "Ei(z)", "exp_integral_e1(z)", "exponential_integral_1(z)", "exp_integral_e(n,z)", "li(z)", "Li(z)", "Si(z)", "Ci(z)", "Shi(z)", "Chi(z)", "Ei(z)", "exp_integral_e1(z)", "exponential_integral_1(z)", "exp_integral_e(n,z)", "li(z)", "Li(z)", "Si(z)", "Ci(z)", "Shi(z)", "Chi(z)", "elliptic_f(z,m)", "elliptic_kc(m)", "elliptic_e(z,m)", "elliptic_ec(z)", "elliptic_eu(z,m)", "elliptic_pi(n,z,m)", "gen_legendre_Q(n,m,z)", "spherical_harmonic(n,m,θ,φ)", "chebyshev_T(n,z)", "chebyshev_U(n,z)", "jacobi_P(n,a,b,z)", "gegenbauer(n,a,z)", "hermite(n,z)", "laguerre(n,z)", "gen_laguerre(n,a,z)", "legendre_P(n,z)", "legendre_Q(n,z)", "gen_legendre_P(n,m,z)", "gen_legendre_Q(n,m,z)", "spherical_harmonic(n,m,θ,φ)", "chebyshev_T(n,z)", "chebyshev_U(n,z)", "jacobi_P(n,a,b,z)", "gegenbauer(n,a,z)", "laguerre(n,z)", "gen_laguerre(n,a,z)", "legendre_P(n,z)", "legendre_Q(n,z)", "gen_legendre_P(n,m,z)", "gen_legendre_Q(n,m,z)", "spherical_harmonic(n,m,θ,φ)", "chebyshev_T(n,z)", "chebyshev_U(n,z)", "jacobi_P(n,a,b,z)", "gegenbauer(n,a,z)", "wigner_9j(j1,j2,j3,j4,j5,j6,j7,j8,j9)", "clebsch_gordan(j1,j2,j3,m1,m2,m3)", "clebsch_gordan(j1,j2,j3,m1,m2,m3)", "racah(j1,j2,j3,j4,j5,j6)", "dickman_rho(z)", "elliptic_j(z)", "legendre_phi(x,n)", "prime_pi(x)", "wigner_3j(j1,j2,j3,m1,m2,m3)", "wigner_6j(j1,j2,j3,j4,j5,j6)", "wigner_9j(j1,j2,j3,j4,j5,j6,j7,j8,j9)", "clebsch_gordan(j1,j2,j3,m1,m2,m3)", "clebsch_gordan(j1,j2,j3,m1,m2,m3)", "racah(j1,j2,j3,j4,j5,j6)", "dickman_rho(z)", "elliptic_j(z)", "legendre_phi(x,n)", "prime_pi(x)", "wigner_3j(j1,j2,j3,m1,m2,m3)", "wigner_6j(j1,j2,j3,j4,j5,j6)", "wigner_9j(j1,j2,j3,j4,j5,j6,j7,j8,j9)", "clebsch_gordan(j1,j2,j3,m1,m2,m3)", "clebsch_gordan(j1,j2,j3,m1,m2,m3)", "racah(j1,j2,j3,j4,j5,j6)", "show(x)", "latex(x)", "n(x,digits=10)", "pi", "e", "i", "show(x)", "n(x,digits=10)", "real(x)", "imag(x)", "sqrt(x)"]

/* var cmsuggests = ["vektorter{}{}{}{}", "feladat", "form", "konyv", "fajl", "fajlvalaszto", "csatolmany", "link", "Link", "media", "sqrt", "sqrt{}", "gyok", "gyok{}", "frac", "frac{}{}", "tort", "tort{}{}", "ph{}", "figy{}", "%", "&", "'", "+", "-", "<", "=", ">", "@", "AA", "BB", "C", "CC", "DD", "Delta", "Downarrow", "EE", "FF", "GG", "Gamma", "H", "HH", "II", "Im", "JJ", "KK", "LL", "Lambda", "Leftarrow", "Leftrightarrow", "Longleftarrow", "Longleftrightarrow", "Longrightarrow", "MM", "N", "NN", "OO", "Omega", "P", "PP", "Phi", "Pi", "Psi", "Q", "QQ", "R", "RR", "Re", "Rightarrow", "SS", "Sigma", "TT", "Theta", "UU", "Uparrow", "Updownarrow", "Upsilon", "VV", "Vdash", "XX", "Xi", "YY", "Z", "ZZ", "^circ", "acos", "acosec", "acosech", "acosh", "acot", "acotan", "acotanh", "acoth", "acsc", "acsch", "aleph", "alpha", "amalg", "angle", "approx", "arccos", "arccosec", "arccosh", "arccot", "arccotan", "arccotanh", "arccoth", "arccsc", "arccsch", "arcsec", "arcsech", "arcsin", "arctan", "arctanh", "asec", "asech", "asin", "asinh", "ast", "atan", "atanh", "backslash", "because", "beta", "bigcap", "bigcirc", "bigcup", "bigodot", "bigoplus", "bigotimes", "bigsqcup", "bigtriangledown", "bigtriangleup", "biguplus", "bigvee", "bigwedge", "bot", "bowtie", "bullet", "cap", "caret", "cdot", "cdots", "chi", "circ", "closecurlybrace", "clubsuit", "cong", "coprod", "cos", "cosec", "cosech", "cosh", "cot", "cotan", "cotanh", "coth", "csc", "csch", "cup", "dagger", "dashleftarrow", "dashrightarrow", "dashv", "ddagger", "ddots", "delta", "det", "diamond", "digamma", "dim", "div", "doteq", "dots", "downarrow", "ell", "enter", "epsilon", "equiv", "eta", "exists", "nexists", "f", "flat", "frown", "gamma", "gcd", "gcf", "ge", "gets", "gg", "gt", "hcf", "heartsuit", "hookleftarrow", "hookrightarrow", "implies", "impliedby", "in", "infty", "int", "sint", "sdefint", "iota", "kappa", "lambda", "lceil", "lcm", "ldots", "le", "left(", "left[", "left\\langle", "left\{", "leftarrow", "leftarrowtail", "leftharpoondown", "leftharpoonup", "leftrightarrow", "left|", "lfloor", "lg", "lim", "ll", "ln", "log", "longleftarrow", "longleftrightarrow", "longmapsto", "longrightarrow", "lowercase", "lt", "mapsto", "mathbf", "mathit", "mathrm", "mathsf", "mathtt", "mathfrak", "mathcal", "mathscr", "mathbb", "max", "mid", "min", "mod", "models", "mp", "mu", "multimap", "nabla", "natural", "ne", "nearrow", "neg", "ni", "nmid", "notin", "notni", "notsubset", "notsubseteq", "notsupset", "notsupseteq", "nparallel", "nu", "nwarrow", "odot", "oint", "omega", "ominus", "opencurlybrace", "oplus", "otimes", "overline", "parallel", "partial", "perp", "phi", "pi", "pm", "prec", "preceq", "prod", "proj", "propto", "psi", "qquad", "quad", "rceil", "rfloor", "rho", "right)", "right\\rangle", "right\}", "right]", "rightarrow", "rightarrowtail", "rightharpoondown", "rightharpoonup", "right|", "searrow", "sec", "sech", "setminus", "sharp", "sigma", "sim", "simeq", "sin", "sinh", "slash", "smile", "spadesuit", "span", "sqcap", "sqcup", "sqsubset", "sqsubseteq", "sqsupset", "sqsupseteq", "square", "subset", "subseteq", "succ", "succeq", "sum", "supset", "supseteq", "surd", "swarrow", "tab", "tan", "tanh", "tau", "textbf", "textit", "textrm", "textsf", "texttt", "therefore", "theta", "times", "to", "top", "triangle", "triangleleft", "triangleright", "twoheadleftarrow", "twoheadrightarrow", "underline", "underscore", "uparrow", "updownarrow", "uplus", "uppercase", "upsilon", "varepsilon", "varkappa", "varnothing", "varphi", "varpi", "varrho", "varsigma", "vartheta", "vdash", "vdots", "vector", "vee", "wedge", "wp", "wr", "xi", "zeta", "|", "boxminus", "boxplus", "boxtimes", "boxdot", "circledast", "circleddash", "circledcirc", "ltimes", "rtimes", "leftthreetimes", "rightthreetimes", "divideontimes", "centerdot", "intercal", "oslash", "doublebarwedge", "dotplus", "barwedge", "veebar", "curlywedge", "curlyvee", "biconditional", "roundimplies", "Lleftarrow", "Rrightarrow", "leftrightarrows", "rightleftarrows", "curvearrowleft", "curvearrowright", "looparrowleft", "looparrowright", "circlearrowleft", "circlearrowright", "leftleftarrows", "rightrightarrows", "upuparrows", "downdownarrows", "Lsh", "Rsh", "upharpoonleft", "upharpoonright", "downharpoonleft", "downharpoonright", "leftrightsquigarrow", "rightsquigarrow", "nrightarrow", "nleftarrow", "nRightarrow", "nLeftarrow", "nleftrightarrow", "nLeftrightarrow", "lessapprox", "leqslant", "gtrapprox", "geqslant", "precapprox", "succapprox", "lesssim", "gtrsim", "asymp", "approxeq", "backsim", "backsimeq", "succsim", "precsim", "eqsim", "leqq", "geqq", "eqslantless", "eqslantgtr", "lll", "ggg", "lessgtr", "lesseqgtr", "lesseqqgtr", "gtrless", "gtreqless", "gtreqqless", "llles", "gggtr", "preccurlyeq", "succurlyeq", "curlyeqprec", "curlyeqsucc", "lessdot", "gtrdot", "coloneq", "measeq", "eqdef", "questeq", "doteqdot", "Doteq", "fallingdotseq", "risingdotseq", "bumpeq", "Bumpeq", "circeq", "eqcirc", "vDash", "lhd", "rhd", "shortparallel", "shortmid", "varpropto", "Vvdash", "between", "pitchfork", "stilus", "rajzlap", "gsor", "doboz", "kepletdoboz", "keplet", "hasab", "sorszam", "vektorter", "szintvonal", "grafikon", "grafikone", "grafikonhd", "firka", "kep", "svg", "video", "audio", "ID", "lap", "slider", "jsx", "ltx", "sgeo", "gomb", "asciisvg"] */


setTimeout(() => {
    if (!onlineSt)
        alert('You are offline! For the correct operate of calculator you need to be online.');
}, 1000);


function setCmFont(v) {
    cmeditor.getWrapperElement().style["font-size"] = v + "px";
    cmeditor.refresh();
};

function setOutputFont(v) {
    $('div.sagecell_sessionOutput,div.sagecell_sessionOutput pre').css('font-size', v + 'px');
};

function setCmTheme(theme) {
    cmeditor.setOption("theme", theme);
}
var beilleszt = function(x, n) {
    if (!opt_help) {
        var btntxt = x.getAttribute('data-btn');
        insertText(btntxt, n);
    } else {
        var slno = x.getAttribute('data-slickno') * 1;
        $('#myslickhelp').slick('slickGoTo', slno, false)
    }
};

function searchIn() {
    var cmd = $("#searchcmd").val();
    var btn = $('.kbdbtn[data-btn="' + cmd + '"]')[0];
    if (btn !== undefined)
        btn.click();
    else
        insertText(cmd, 0)

}


/* function cmsuggest(cm, option) {
    return new Promise(function(accept) {
        setTimeout(function() {
            var cursor = cm.getCursor(),
                line = cm.getLine(cursor.line)
            var start = cursor.ch,
                end = cursor.ch
            while (start && /\w|\>/.test(line.charAt(start - 1))) --start
            while (end < line.length && /\w/.test(line.charAt(end))) ++end
            var word = line.slice(start, end);
            var prefix = line.slice(start - 1, start);
            var talalat = [];
            for (var i = 0; i < cmsuggests.length; i++) {
                var el = cmsuggests[i];
                var ta = el;
                var tt = el;
                if (typeof el == "object") {
                    ta = el.displayText;
                    tt = el.text;
                }
                if (tt.startsWith(word) || tt.startsWith(">>>" + word)) {
                    if (/\\|\>/.test(prefix) || tt.startsWith(">>>"))
                        talalat.push(el);
                    else
                        talalat.push("\\" + ta);
                }
            }
            console.log($('.CodeMirror-hints .CodeMirror-hint-active.multiline'))
            return accept({
                list: talalat,
                from: CodeMirror.Pos(cursor.line, start),
                to: CodeMirror.Pos(cursor.line, end)
            })

        }, 100)
    })
};
setTimeout(() => {
    cmeditor.options['hint'] = cmsuggest;
    cmeditor.options['extraKeys']['Ctrl-Space'] = "autocomplete";
    cmeditor.options['completeSingle'] = false

}, 4000) */
var insertText = (text, n) => {
    var last = cmeditor.getSelection();
    if (last.length > 0) {
        cmeditor.replaceSelection(text);
        if (n > 0) {
            var back = 1;
            if (n > 1)
                back = n + 1;
            var pos = cmeditor.getCursor();
            cmeditor.setCursor({
                line: pos.line,
                ch: pos.ch - back
            });
            cmeditor.setSelection({
                line: pos.line,
                ch: pos.ch - back - 1
            }, {
                line: pos.line,
                ch: pos.ch - back
            });
            cmeditor.replaceSelection(last);
            var pos1 = cmeditor.getCursor();
            cmeditor.setCursor({
                line: pos1.line,
                ch: pos1.ch - last.length
            });
            cmeditor.setSelection({
                line: pos1.line,
                ch: pos1.ch - last.length
            }, {
                line: pos1.line,
                ch: pos1.ch + back - 1
            });
        }
    } else {
        cmeditor.replaceSelection(text);
        if (n > 0) {
            var back = 1;
            if (n > 1)
                back = n + 1
            cmeditor.execCommand('goCharLeft')
            var pos = cmeditor.getCursor();
            cmeditor.setSelection({
                line: pos.line,
                ch: pos.ch - back
            }, pos);
        }
    }
    cmeditor.focus();
};

var undocm = () => {
    cmeditor.execCommand('undo');
    cmeditor.focus();
};

var redocm = () => {
    cmeditor.execCommand('redo');
    cmeditor.focus();
};

var homecm = () => {
    cmeditor.execCommand('goLineStart');
    cmeditor.focus();
};

var endcm = () => {
    cmeditor.execCommand('goLineEnd');
    cmeditor.focus();
};

var tabcm = () => {
    cmeditor.execCommand('insertTab');
    cmeditor.focus();
};

var torolTextLeft = () => {
    cmeditor.execCommand('delCharBefore');
    cmeditor.focus();
};

var moveLeft = () => {
    cmeditor.execCommand('goCharLeft');
    cmeditor.focus();
};

var moveRight = () => {
    cmeditor.execCommand('goCharRight');
    cmeditor.focus();
};

var torol = function() {
    cmeditor.setValue('');
    cmeditor.focus();
};

var clearOutput = function() {
    var outputs = document.querySelector('div.sagecell_sessionOutput *:not(img.sagecell_spinner)');
    if (outputs)
        outputs.remove();
    output.innerHTML = "";
};

function themeSwitch() {
    var t1 = document.getElementById('stylelight');
    var t2 = document.getElementById('styledark');
    t1.disabled = !t1.disabled;
    t2.disabled = !t1.disabled;
};

function helpSwitch() {
    var elem = $('#myslickhelp');
    if (opt_help) {
        $('#fnhelp').show(300);
        setTimeout(() => {
            elem.slick('setPosition');
        }, 330);
        $('.myslick.fn .kbdbtn').addClass('help');
    } else {
        $('#fnhelp').hide(300);
        $('.myslick.fn .kbdbtn.help').removeClass('help');
    }
    $('#fnhelp iframe').css('display', '');
};

function menuTgl() {
    $('#menubar').toggle(300);
};

function sbTgl() {
    $('#settingbar').toggle(300);
};

function sampleTgl() {
    $('#sample-container').toggle(300);
    $('.btn-open').toggleClass('shown');
    var btn = $('.sample-open');
    var txt = btn.text();
    if (txt == 'Show samples') {
        btn.text('Hide samples')
        setTimeout(() => {
            document.querySelector('#samples').scrollIntoView({
                behavior: "smooth",
                block: 'end'
            });
        }, 300)
    } else
        btn.text('Show samples')
};

function megnyitfn(x) {
    $('.fnbtn.kbdbtn.active').removeClass('active');
    $(x).addClass('active');
    var fncel = x.getAttribute('data-btn');
    $('.myslick.fn.show,#lastused.show').removeClass('show');
    var elem = $('.myslick.fn[data-name=' + fncel + ']')
    elem.addClass('show');
    elem.slick('setPosition')
};

function megnyitLast(x) {
    $('.fnbtn.kbdbtn.active').removeClass('active');
    $(x).addClass('active');
    var fncel = x.getAttribute('data-btn');
    $('.myslick.fn.show').removeClass('show');
    var elem = $('#lastused')
    elem.addClass('show');
};

function clearRecent() {
    lastlist = [];
    $('#lastused .kbdbtn').remove();
};

function clearHistory() {
    var conf = confirm("Are you sure you really want to clear all the items of history?")
    if (conf)
        $("#historylist").empty();
    else
        return;
}

function clearHistItem(item) {
    $(item).parent('li').remove();
}

const normalizeLineEndings = (str, normalized = '\r\n') =>
    str.replace(/\r?\n/g, normalized);

function downloadTxt() {
    var str = normalizeLineEndings(cmeditor.getValue());
    const aletolt = document.createElement("a");
    aletolt.href = URL.createObjectURL(new Blob([str], {
        type: "text/plain"
    }));
    aletolt.setAttribute("download", "sagecode.txt");
    document.body.appendChild(aletolt);
    aletolt.addEventListener('click', (e) => {
        setTimeout(() => URL.revokeObjectURL(aletolt.href), 30 * 1000);
    });
    console.log(aletolt)
    aletolt.click();
    document.body.removeChild(aletolt);
}

$(document).ready(function() {
    cmeditor = document.querySelector(".CodeMirror").CodeMirror;
    $('#cm-select').val('default');

    document.getElementById('optsotet').checked = opt_sotet;

    $('#optsotet').attr('checked', opt_sotet);

    document.getElementById('optsotet').onchange = function() {
        opt_sotet = this.checked;
        themeSwitch();
    };


    $('#histtglbtn').attr('checked', opt_hist);

    document.getElementById('histtglbtn').onchange = function() {
        opt_hist = this.checked;
        var op = $('.snapshot').css('opacity') * 1
        if (op < 0.95)
            $('.snapshot').css('opacity', '1')
        else
            $('.snapshot').css('opacity', '0.3')
    };




    document.getElementById('optlinewrap').onchange = function() {
        cmeditor.setOption('lineWrapping', this.checked)
    };

    document.getElementById('opthelp').checked = opt_help;

    $('#opthelp').attr('checked', opt_help);

    document.getElementById('opthelp').onchange = function() {
        opt_help = this.checked;
        helpSwitch();
    };

    document.getElementById('fntglbtn').onchange = function() {
        $('#tabcontainer').toggle(300);
    };

    document.getElementById('btglbtn').onchange = function() {
        $('#tabcontainer1').toggle(300);
    };

    $('.sagecell_input').append('<label class="switch"><input id="optwrap" type="checkbox"><span class="slider round"></span></label><input id="outfont-slider" oninput="setOutputFont(this.value);" type="range" min="12" max="24" value="12" style="display:inline-block;width:110px;vertical-align: middle;margin-left:10px;" title="set output\'s fontsize"><div class="toggle-switch-container"><div class="toggle-switch switch-vertical"><input id="toggle-a" type="radio" name="switch" checked="checked"><input id="toggle-b" type="radio" name="switch"><span class="toggle-outside"><span class="toggle-inside">H</span></span></div></div><span class="snapshot">&#x25c9;</span><div id="historydiv" style="display:none;"><button class="clrhbtn" onclick="clearHistory();">Clear History</button><ol id="historylist" reversed></ol></div>')
    $(document).on('click', '.myslick.fn .kbdbtn', function() {
        var elem = $(this)
        var name = elem.attr('data-btn')
        if (lastlist.indexOf(name) < 0) {
            lastlist.push(name)
            Clone = elem.clone(true);
            $(lastelem).append(Clone);
        };
    });

    document.getElementById('optwrap').onchange = function() {
        opt_wrap = this.checked;
        wrapSwitch();
        $('button.sagecell_evalButton').trigger('click');
    };

    document.getElementById('toggle-a').onclick = function() {
        $("#historydiv").toggle(300);
        //$("#historydiv").fadeOut(500)
        $(".switch-vertical .toggle-outside").css("background-color", "");
    };

    document.getElementById('toggle-b').onclick = function() {
        $("#historydiv").toggle(300);
        // $("#historydiv").fadeIn(500);
        if (opt_sotet)
            $(".switch-vertical .toggle-outside").css("background-color", "#1a2d3b");
        else
            $(".switch-vertical .toggle-outside").css("background-color", "#54738b");
    };

    $('#optwrap')[0].checked = opt_wrap;

    $('.rown').on('change', function() {
        numrows = $(this).val() * 1;
        afterResize();
    });
    var lastelem = document.getElementById('lastused');

    $('li.veg a').on('click', function(e) {
        e.preventDefault();
        $('#samples').attr('src', $(this).attr('data-src'));
        document.querySelector('#samples').scrollIntoView({
            behavior: "smooth",
            block: 'end'
        });
    })

    document.querySelector('.sagecell_evalButton').onclick = function() {
        try {
            setOutputFont($('#outfont-slider').val());
            var txt = cmeditor.getValue('');
            if (opt_hist)
                $('#historylist').prepend('<li><span class="hbtn"></span><pre>' + txt + '</pre><span class="hbtnclear" onclick="clearHistItem(this);">&#x274c;</span></li>')
        } catch {
            console.log('NEM SIKERÜLT')
        }
    }

    $(document).on('click', '#historylist  li .hbtn', function() {
        txt = this.nextElementSibling.innerText
        cmeditor.setValue(txt);
        cmeditor.execCommand('selectAll');
        setTimeout(() => { cmeditor.execCommand('goDocStart') }, 700)
    });

    $(document).on('click', 'span.snapshot', function() {
        var txt = cmeditor.getValue(txt);
        cmeditor.execCommand('selectAll');
        setTimeout(() => { cmeditor.execCommand('goDocStart') }, 300);
        if (opt_hist)
            $('#historylist').prepend('<li class="lisnap"><span class="hbtn"></span><pre>' + txt + '</pre><span class="hbtnclear" onclick="clearHistItem(this);">&#x274c;</span></li>')
        else {
            alert("In the settings panel tha 'Record history list' button is switch off. To make history list you have to turn it on.")
        }
    });

    $(document).on('click', '#fnhelp .helpdiv>a', function() {
        $('#fnhelp iframe').css('display', 'inline');
    });

    $('#myslickhelp').on('beforeChange', function() {
        $('#fnhelp iframe').css('display', '');
    });

    document.getElementById('felsorfile')
        .addEventListener('input', function() {
            var fr = new FileReader();
            fr.onload = (evt) => {
                var txt = evt.target.result;
                cmeditor.setValue(txt)
            };
            fr.readAsText(this.files[0]);
        });

    document.getElementById('felsorfilehtml')
        .addEventListener('input', function() {
            var fr = new FileReader();
            fr.onload = (evt) => {
                var file = evt.target.result;
                $('#samples').attr('src', file);
            };
            fr.readAsDataURL(this.files[0]);
        });


    $(function() {
        /* $('.kbdbtn:not(.fnbtn)').each(function() {
               searchCmds.push($(this).attr('data-btn'))
           }); */

        $("#searchcmd").autocomplete({
            source: searchCmds
        });
    });
});


function debounce(func) {
    var timer;
    return function(event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
};

window.addEventListener("resize", debounce(function(e) {
    afterResize();
}));

function afterResize() {
    var ww = $('#tabs').width();
    var btnNo = Math.floor(ww / 76);
    if (btnNo > 1) {
        $('.myslick').slick('unslick');
        var btnw = Math.floor(ww / btnNo) - 1;
        console.log(ww, btnNo, btnw);
        console.log(typeof(btnNo), typeof(btnw))
        $('.myslick').slick({
            mobileFirst: true,
            rows: numrows,
            slidesPerRow: btnNo,
        });

        $('.kbdbtn').css({
            'max-width': btnw - 16,
            'width': btnw - 16
        });
        $("#searchcmd").autocomplete({
            source: searchCmds
        });
        setTimeout(() => {
            $('#searchok').css('width', '');
            $('#searchcmd').css({ 'margin': '5px', 'width': 'calc(100% - 70px)', 'user-select': 'none', 'font-size': '14px', 'line-height': '14px', 'vertical-align': 'middle' });
        }, 300)

    }
};

if (window.addEventListener) {
    window.addEventListener("message", displayMessage, false);
} else {
    window.attachEvent("onmessage", displayMessage);
}

function displayMessage(evt) {
    var message;
    message = evt.data;
    cmeditor.setValue(message);
    document.querySelector('.CodeMirror').scrollIntoView({
        behavior: "smooth",
        block: 'center'
    });
    cmeditor.execCommand('selectAll');
    setTimeout(() => { cmeditor.execCommand('goDocStart') }, 700)
};

function wrapSwitch() {
    if (opt_wrap) {
        $('div.sagecell_sessionOutput pre').css({
            overflow: 'auto',
            'white-space': 'pre-wrap'
        })
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [
                    ["$", "$"],
                    ["\\(", "\\)"]
                ]
            },
            "HTML-CSS": {
                linebreaks: { automatic: true, width: "container" }
            }
        });
    } else {
        $('div.sagecell_sessionOutput pre').css({
            'white-space': 'nowrap',
            'word-wrap': 'wrap none'
        })

        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [
                    ["$", "$"],
                    ["\\(", "\\)"]
                ]
            },
            "HTML-CSS": {
                linebreaks: { automatic: false, width: "container" }
            }
        });
    }
};

//zeynep

$(function() {

    var zeynep = $('.zeynep').zeynep({
        opened: function() {
            document.querySelector('#sample-cc').scrollIntoView({
                block: 'start'
            });
            setTimeout(() => {
                $('#samples').addClass('shrinked');
            }, 100)
        }
    })

    // dynamically bind 'closing' event
    zeynep.on('closing', function() {
        $('#samples').removeClass('shrinked');
    })

    // handle zeynepjs overlay click
    $('.zeynep-overlay').on('click', function() {
        zeynep.close()
    })

    // open zeynepjs side menu
    $('.btn-open').on('click', function() {
        zeynep.open()
    })

})
