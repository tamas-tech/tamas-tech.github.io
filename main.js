var lastlist = [];
var numrows = 2;
var opt_sotet = false;
var opt_help = false;
var opt_wrap = false;
var opt_wrapltx = false;

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

function setLtxFont(v) {
    $('div#output').css('font-size', v + 'px');
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

$(document).ready(function() {
    cmeditor = document.querySelector(".CodeMirror").CodeMirror;
    $('#cm-select').val('default');

    document.getElementById('optsotet').checked = opt_sotet;

    $('#optsotet').attr('checked', opt_sotet);

    document.getElementById('optsotet').onchange = function() {
        opt_sotet = this.checked;
        themeSwitch();
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

    $('.sagecell_input').append('<label class="switch"><input id="optwrap" type="checkbox"><span class="slider round"></span></label><input id="outfont-slider" oninput="setOutputFont(this.value);" type="range" min="12" max="24" value="12" style="display:inline-block;width:120px;vertical-align: middle;margin-left:10px;" title="set output\'s fontsize">')
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
            var w = document.getElementById('optwrap')
            document.getElementById('outfont-slider').value = 12;
            /*   if (w && w.checked) {
                  w.click();
              } */
        } catch {
            console.log('NEM SIKERÜLT')
        }
    }
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

function afterResize() {;
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
