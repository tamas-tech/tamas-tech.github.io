function kuldes(elem) {
    var message = elem.nextElementSibling.nextElementSibling.nextElementSibling.innerText
    window.parent.postMessage(message, '*');
};

function kuldesgo() {
    var message = "gotook";
    window.parent.postMessage(message, '*');
};

function pretoggle(elem) {
    elem.nextElementSibling.classList.toggle('show')
    elem.classList.toggle('hide')
    if (elem.innerText == "Show code")
        elem.innerText = "Hide code";
    else
        elem.innerText = "Show code";
};

const COLORS = [
    "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#e98125", "#d0743c", "#635222", "#6ada6a",
    "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
    "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
    "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
    "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
];

var lepessor = [];
var mode = "Li";
var mode1 = "Li";
var mode0 = "Li";
var Hmode = "H";
var Zmode = "Z0";
var denom = false;
var arga = false;
var Hmax = 500;
var maxsor = 100;
var maxreach = false;
var poz = 0;
const oo = 12345678912321;
const BIG = 1000;
var SOR = [];
var SOR2 = [];
const pat = new RegExp("(?<=[^,])oo|oo(?=[^,])");
const maxLi = [100, 100, 100, 100, 100, 100, 60, 40, 30, 25, 20];
const maxZ = [200, 200, 200, 200, 100, 60, 40, 30, 25];
var sorhiba = false;
var Hreszletes = false;
var fazis1 = "";
var mathfazis1 = "";
var showmathout = true;
var showgenmathout = false;
var mathoutformat = false;
var reducedv = false;
var insertonselect = false;
//var fastrun = false;


var amode = "Li";
var bmode = "Li";
var narg = false;
var aarg = false;
var barg = false;
var nargtxt = "x";
var aargtxt = "x";
var bargtxt = "x";
var genmaxsor = 400;
var fazis = {
    init: nov,
    std: nov,
    atv: bov,
    veg: bov,
};
const fltx = { "nov": "\\boldsymbol{_{+}b}", "bov": "\\boldsymbol{^{+}b}", "mnov": "-\\left(\\boldsymbol{_{+}b}\\right)", "mbov": "-\\left(\\boldsymbol{^{+}b}\\right)", "bovnov": "\\boldsymbol{^{+}b}+\\boldsymbol{_{+}b}", "bovmnov": "\\boldsymbol{^{+}b}-\\boldsymbol{_{+}b}", "mbovnov": "\\boldsymbol{_{+}b}-\\boldsymbol{^{+}b}", "mbovmnov": "-\\left(\\boldsymbol{^{+}b}+\\boldsymbol{_{+}b}\\right)" }

// MULTISET

var msh = ""
var mreducedv = false;
var multierror = false;

var teststr = "1∗(1,1)+(1,4) + 2∗(2,3) + 5 ∗(1,4)+3∗(2,3)+4∗(1,2,3)+(2,3)+(4,5,3) + (2,3)+ 2∗ (4,5,3)";
var teststr1 = "1∗(1,1)+(1,4) + 2 ∗ (2,3) + 5∗(1,4)+3 ∗(2,3)+4∗(1,2,3)+2∗(2,3)+(4,5,3)+ (2,3)+2∗(4,5,3)"
var teststr2 = "(1,1,2,2) + 3*(1,2,1,2) + 3*(1,2,2,1) + 6*(1,2,3,0) + 6*(1,3,0,2) + 3*(1,3,1,1) + 6*(1,3,2,0) + 5*(2,1,1,2) + 9*(2,1,2,1) + 18*(2,1,3,0) + 8*(2,2,0,2) + 9*(2,2,1,1) + 16*(2,2,2,0) + 6*(2,3,0,1) + 6*(2,3,1,0) + 6*(3,0,1,2) + 18*(3,0,2,1) + 36*(3,0,3,0) + 6*(3,1,0,2) + 9*(3,1,1,1) + 18*(3,1,2,0) + 6*(3,2,0,1) + 6*(3,2,1,0)+(1,2,1,2) + 4*(1,2,2,1) + 6*(1,2,3,0) + 9*(1,3,1,1) + 12*(1,3,2,0) + 12*(1,4,0,1) + 12*(1,4,1,0) + 4*(2,1,1,2) + 9*(2,1,2,1) + 18*(2,1,3,0) + 4*(2,2,0,2) + 12*(2,2,1,1) + 20*(2,2,2,0) + 12*(2,3,0,1) + 12*(2,3,1,0) + 6*(3,0,1,2) + 18*(3,0,2,1) + 36*(3,0,3,0) + 6*(3,1,0,2) + 9*(3,1,1,1) + 18*(3,1,2,0) + 6*(3,2,0,1) + 6*(3,2,1,0)"

var teststr2 = "(1,1,2,2) + 3∗(1,2,1,2) + 3∗(1,2,2,1) + 6∗(1,2,3,0) + 6∗(1,3,0,2) + 3∗(1,3,1,1) + 6*(1,3,2,0) + 5*(2,1,1,2) + 9*(2,1,2,1) + 18*(2,1,3,0) + 8*(2,2,0,2) + 9*(2,2,1,1) + 16*(2,2,2,0) + 6*(2,3,0,1) + 6*(2,3,1,0) + 6*(3,0,1,2) + 18*(3,0,2,1) + 36*(3,0,3,0) + 6*(3,1,0,2) + 9*(3,1,1,1) + 18*(3,1,2,0) + 6*(3,2,0,1) + 6*(3,2,1,0)+(1,2,1,2) + 4*(1,2,2,1) + 6*(1,2,3,0) + 9*(1,3,1,1) + 12*(1,3,2,0) + 12*(1,4,0,1) + 12*(1,4,1,0) + 4*(2,1,1,2) + 9*(2,1,2,1) + 18*(2,1,3,0) + 4*(2,2,0,2) + 12*(2,2,1,1) + 20*(2,2,2,0) + 12*(2,3,0,1) + 12*(2,3,1,0) + 6*(3,0,1,2) + 18*(3,0,2,1) + 36*(3,0,3,0) + 6*(3,1,0,2) + 9*(3,1,1,1) + 18*(3,1,2,0) + 6*(3,2,0,1) + 6*(3,2,1,0)"

var teststr3 = "6∗(1,2,1,2) + 24∗(1,2,2,1) + 36∗(1,2,3,0) + 54∗(1,3,1,1) + 72∗(1,3,2,0) + 72∗(1,4,0,1) + 72∗(1,4,1,0) + 24∗(2,1,1,2) + 54∗(2,1,2,1) + 108∗(2,1,3,0) + 24∗(2,2,0,2) + 72∗(2,2,1,1) + 120∗(2,2,2,0) + 72∗(2,3,0,1) + 72∗(2,3,1,0) + 36∗(3,0,1,2) + 108∗(3,0,2,1) + 216∗(3,0,3,0) + 36∗(3,1,0,2) + 54∗(3,1,1,1) + 108∗(3,1,2,0) + 36∗(3,2,0,1) + 36∗(3,2,1,0) + 2∗(1,2,1,2) + 8∗(1,2,2,1) + 12∗(1,2,3,0) + 18∗(1,3,1,1) + 24∗(1,3,2,0) + 24∗(1,4,0,1) + 24∗(1,4,1,0) + 8∗(2,1,1,2) + 18∗(2,1,2,1) + 36∗(2,1,3,0) + 8∗(2,2,0,2) + 24∗(2,2,1,1) + 40∗(2,2,2,0) + 24∗(2,3,0,1) + 24∗(2,3,1,0) + 12∗(3,0,1,2) + 36∗(3,0,2,1) + 72∗(3,0,3,0) + 12∗(3,1,0,2) + 18∗(3,1,1,1) + 36∗(3,1,2,0) + 12∗(3,2,0,1) + 12∗(3,2,1,0)"

var teststr4 = "6∗(1,2,1,2) + 24∗(1,2,2,1) + 36∗(1,2,3,0) + 54∗(1,3,1,1) + 72∗(1,3,2,0) + 72∗(1,4,0,1) + 72∗(1,4,1,0) + 24∗(2,1,1,2) + 54∗(2,1,2,1) + 108∗(2,1,3,0) + 24∗(2,2,0,2) + 72∗(2,2,1,1) + 120∗(2,2,2,0) + 72∗(2,3,0,1) + 72∗(2,3,1,0) + 36∗(3,0,1,2) + 108∗(3,0,2,1) + 216∗(3,0,3,0) + 36∗(3,1,0,2) + 54∗(3,1,1,1) + 108∗(3,1,2,0) + 36∗(3,2,0,1) + 36∗(3,2,1,0) + -6∗(1,2,1,2) + -24∗(1,2,2,1) + -36∗(1,2,3,0) + -54∗(1,3,1,1) + -72∗(1,3,2,0) + -72∗(1,4,0,1) + -72∗(1,4,1,0) + -24∗(2,1,1,2) + -54∗(2,1,2,1) + -108∗(2,1,3,0) + -24∗(2,2,0,2) + -72∗(2,2,1,1) + -120∗(2,2,2,0) + -72∗(2,3,0,1) + -72∗(2,3,1,0) + -36∗(3,0,1,2) + -108∗(3,0,2,1) + -216∗(3,0,3,0) + -36∗(3,1,0,2) + -54∗(3,1,1,1) + -108∗(3,1,2,0) + -36∗(3,2,0,1) + -36∗(3,2,1,0)";


var deriv_table = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1];
var deriv_tableinS = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1];
var deriv_tableA = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1];
var deriv_tableB = [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0];
var derivab = false;
var cJ_a = [];
var cJ_b = [];
var cJ_c = [];
var cJ_J = [];
var cJ_it = [];
var cJIndex = [];
var lastindex = [
    [],
    []
];
var autoindex = false;
var statmode = false;
var cStore = {};
var cStore_active = [];
var statby = "length";
var ireszben = "";
var Ipolytop = [];

var LeC = {};
var pqnplot = false;
var plotall = false;
var kummode = false;
var kums = [];

function setMode(t) {
    mode = t.value;
    setKeplet();
    urites();
};

function setMode0(t) {
    mode1 = t.value;
    sorfejtesLi0();
};

function setMode1(t) {
    mode1 = t.value;
    sorfejtesLi();
};

function setHmode(t) {
    Hmode = t.value;
    azonHecmplusHa();
};

function setZmode(t) {
    Zmode = t.value;
    document.getElementById("okbtn2").click();
};

function setKeplet0() {
    var a = document.querySelector("#av").value;
    var b = document.querySelector("#bv").value;
    var na = a.length;
    var nb = b.length;
    a = a.replaceAll("oo", "∞");
    b = b.replaceAll("oo", "∞");
    var tort = "x";
    if (denom)
        tort = "1-x";
    var arg = "x";
    if (arga)
        arg = "1-x";

    totr = "1-x";
    var txt = "";
    var txt1 = "";
    var txt2 = "";
    var szorzat = "\\cdot";
    if (na * nb == 0)
        szorzat = "";
    if (na > 0)
        txt1 = "{\\rm " + mode + "}_{(" + a + ")}(" + arg + ")";
    if (nb > 0)
        txt2 = "{\\rm " + mode + "}_{(" + b + ")}(x)";
    txt = "\\int \\dfrac{" + txt1 + szorzat + txt2 + "}{" + tort + "}\\,{\\text{d} x}"
    return txt;
};

function setKeplet() {
    const elem = document.querySelector("#k7set");
    const txt = setKeplet0();
    elem.innerText = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function setDenom(elem) {
    denom = elem.checked;
    const masik = document.getElementById("setarga")
    if (denom && arga) {
        masik.click();
    };
    setKeplet();
    urites();
};

function setArga(elem) {
    arga = elem.checked;
    const masik = document.getElementById("setdenom");
    const bbtn = document.getElementById("bvl");
    const lbtn = document.getElementById("linit");
    if (arga) {
        lepesinit();
        bbtn.style.opacity = 0.2;
        lbtn.style.opacity = 0.2;
    } else {
        bbtn.style.opacity = 1;
        lbtn.style.opacity = 1;
    }
    if (arga && denom) {
        masik.click();
    };
    setKeplet();
    urites();
};

std = function(LL) {
    var L = _.cloneDeep(LL);
    var a = L[0];
    var b = L[1];
    a[0] = a[0] - 1;
    b[0] = b[0] + 1;
    lepessor.push("⋯");
    return [a, b];
};

csokk0 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a[0] = a[0] - 1;
    a.unshift(0);
    b.shift();
    b[0] = b[0] + 1;
    lepessor.push(" ⟵⌊0");
    return [a, b];
};

csokk1 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a.shift();
    b.unshift(1);
    lepessor.push("1⌋⟶");
    return [a, b];
};

veg0 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a[0] = a[0] - 1;
    a.unshift(1);
    b.shift();
    lepessor.push("■⟵⌊0");
    return [a, b];
};

veg1 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a.shift();
    b.unshift(1);
    lepessor.push("1⌋⟶■");
    return [a, b];
};

Le_rapakol = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    let na = a.length;
    if (na == 0) {
        b[1] = b[1] + b[0];
        b.shift();
    } else {
        a[1] = a[1] + a[0];
        a.shift();
    };
    lepessor.push("1↷");
    return [a, b];
};

pozcsere = function(L) {
    let a = L[0];
    let b = L[1];
    lepessor.push("↻");
    return [b, a];
};

rstd = function(LL) {
    var L = _.cloneDeep(LL);
    var a = L[0];
    var b = L[1];
    a[0] = a[0] - 1;
    b.unshift(1);
    lepessor.push("^⋯");
    return [a, b];
};

rcsokk1 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a.shift();
    b[0] = b[0] + 1;
    lepessor.push("^1⌋⟶");
    return [a, b];
};

fazis2 = false;

lepes = function(LL0) {
    var poz = LL0[0];
    var L0 = LL0[1];
    var h, ut, ujpoz, out, Out;
    if (poz == -100)
        return;
    else if (poz == 50) {
        out = Le_rapakol(L0);
        if (denom)
            fazis2 = true;
        else
            fazis2 = false;
        ujpoz = -100;
    } else {
        L = L0[poz];
        h = L.length;
        ut = L[0];
        ujpoz = poz;
    }
    if (poz == 0) {
        if (ut > 1) {
            if (!arga)
                out = std(L0);
            else
                out = rstd(L0);
        } else if (ut < 1 && !arga) {
            out = pozcsere(L0);
            ujpoz = (poz + 1) % 2;
        } else if (ut < 1 && arga) {
            out = rstd(L0);
            ujpoz = poz;
        } else if (ut == 1) {
            if (h > 1) {
                if (!arga)
                    out = csokk1(L0);
                else
                    out = rcsokk1(L0);
            } else {
                if (!arga)
                    out = veg1(L0);
                else
                    out = rcsokk1(L0);
                if (mode == "Le")
                    ujpoz = 50;
                else
                    ujpoz = -100;
            }
        }
    } else {
        if (poz == 1) {
            if (ut < 0) {
                if (!arga)
                    out = std(L0);
                else
                    out = rstd(L0);
            } else if (ut > 0 && !arga) {
                out = pozcsere(L0);
                ujpoz = (poz + 1) % 2;
            } else if (ut > 0 && arga) {
                out = rstd(L0);
                ujpoz = poz;
            } else if (ut == 0) {
                if (h > 1) {
                    out = csokk0(L0);
                } else {
                    out = veg0(L0);
                    if (mode == "Le")
                        ujpoz = 50;
                    else
                        ujpoz = -100;
                }
            }
        }
    }
    Out = [ujpoz, out];
    return Out;
};

lepesinit = function() {
    var av, bv, na, nb, ha, hb;
    na = document.getElementById("as").innerText * 1;
    nb = document.getElementById("bs").innerText * 1;

    var av = document.getElementById("av").value;
    var bv = document.getElementById("bv").value;
    var outelem = document.getElementById("mpout");
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    }
    if (!bv.startsWith("[")) {
        bv = "[" + bv;
    }
    if (!bv.endsWith("]")) {
        bv = bv + "]";
    }

    av = av.replaceAll('oo', oo);
    bv = bv.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        bv = JSON.parse(bv);
        ha = av.length;
        hb = bv.length;

        if (arga) {
            refreskiura();
            return;
        }
        var aindx = av.indexOf(oo);
        var bindx = bv.indexOf(oo);
        if (aindx > -1 && bindx < 0) {
            refreskiurb();
        } else if (bindx > -1 && aindx < 0) {
            refreskiura();
        } else if (bindx < 0 && aindx < 0) {
            if (na < nb) {
                refreskiura();
            } else if (na > nb) {
                refreskiurb();
            } else if (ha < hb) {
                refreskiura();
            } else if (ha > hb) {
                refreskiurb();
            } else {
                if (ha + hb > 0)
                    refreskiura();
                else {
                    outelem.innerText = "Mind a két vektor nem lehet ÜRES!";
                    outelem.style.opacity = "1";
                    outelem.style.color = "#ff2211";
                    return;
                }
            }
        } else {
            outelem.innerText = "Mind a két vektor nem tartalmazhat ∞-t!";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211"
            return;
        };

        if (outelem.style.color == "rgb(255, 34, 17)")
            outelem.innerText = "";
    } catch (error) {
        outelem.innerText = "A bevitt adatok valamelyike hibás";
        outelem.style.opacity = "1";
        outelem.style.color = "#ff2211"
    }
};

sor = function(S) {
    fazis2 = false;
    var poz, n, elem, out, szamlalo;
    out = [...S];
    poz = 1;
    szamlalo = 0
    while (poz > -1 && szamlalo < maxsor) {
        n = out.length - 1;
        elem = [...out[n]];
        elem = lepes(elem);
        poz = elem[0];
        out.push(elem);
        szamlalo++;
    };
    if (szamlalo == maxsor)
        maxreach = true;
    return out;
};

felojel = function(e) {
    var out;
    if (e < 0) {
        out = " - ";
    } else {
        out = " + ";
    }
    return out;
};

elojele = function(e) {
    var out;
    if (e == 1) {
        out = " + ";
    } else {
        out = " - ";
    }
    return out;
};

oo2Inf = function(v) {
    var out = v.map(function(y) {
        if (y == oo) return Infinity;
        else return y;
    });
    return out;
};

oo2strInf = function(v) {
    var out = v.map(function(y) {
        if (y == oo) return "∞";
        else return y;
    });
    return out;
};

Inf2oo = function(v) {
    var out = v.map(function(y) {
        if (y == Infinity) return 'oo';
        else return y;
    });
    return out;
};

Inf2big = function(v) {
    var out = v.map(function(y) {
        if (y == Infinity) return BIG;
        else return y;
    });
    return out;
};

oo2Inf1000 = function(v) {
    var out = v.map(function(y) {
        if (y == oo) return BIG;
        else return y;
    });
    return out;
};

oo2Inf100 = function(v) {
    var out = v.map(function(y) {
        if (y == oo) return 100;
        else return y;
    });
    return out;
};

oostr2Inf = function(v) {
    var out = v.map(function(y) {
        if (y == 'oo') return BIG;
        else return y;
    });
    return out;
};

sformaz = function(s) {
    var x, y, l, out;
    x = s[1][0];
    y = s[1][1];
    if (s[0] == 0 && y.length > 0) {
        l = "⌋";
    } else if (s[0] == 1 && x.length > 0) {
        l = "⌊";
    } else {
        l = "";
    };

    var xindx = x.indexOf(Infinity);
    var yindx = y.indexOf(Infinity);
    if (xindx > -1)
        x = Inf2oo(x);
    if (yindx > -1)
        y = Inf2oo(y);

    x = JSON.stringify(x).replace("[", "(").replace("]", "").replaceAll("\"oo\"", "∞");
    y = JSON.stringify(y).replace("[", "").replace("]", ")").replaceAll("\"oo\"", "∞");

    out = x + l + y;
    return out;
};

ltxformaz = function(s) {
    var x, y, out;
    x = s[1][0];
    y = s[1][1];
    var arg = "x";
    var szorzat = "\\cdot";
    if (arga)
        if (s[0] == 1 && y.length == 0)
            arg = "x";
        else
            arg = "1-x";
    var xindx = x.indexOf(Infinity);
    var yindx = y.indexOf(Infinity);
    if (xindx > -1)
        x = Inf2oo(x);
    if (yindx > -1)
        y = Inf2oo(y);
    if (x.length == 0) {
        x = "";
        szorzat = "";
    } else {
        x = JSON.stringify(x).replaceAll("\"oo\"", "∞").replace("[", "\\left(").replace("]", "\\right)");
        x = "\\text{" + mode + "}_{" + x + "}(" + arg + ")";
    };

    if (y.length == 0) {
        y = "";
        szorzat = "";
    } else {
        y = JSON.stringify(y).replaceAll("\"oo\"", "∞").replace("[", "\\left(").replace("]", "\\right)")
        y = "\\text{" + mode + "}_{" + y + "}(x)";
    };
    out = x + szorzat + y;
    return out;
};


var sForma = 1;

SFormaz = function(S) {
    var out = "";
    var n = S.length;
    var szamlalo = 0;
    var korlat = n;

    for (var i = 0; i < korlat; i++) {
        var str = S[i];
        var e = elojele(Math.pow(-1, i));
        if (fazis1 !== "")
            e = elojele(Math.pow(-1, i + 1));
        if (arga)
            if (n > 1)
                e = " + ";
            else
                e = " - ";
        var kiesik = "";
        if (lepessor[i] == "↻" || lepessor[i - 1] == "↻")
            kiesik = "*";
        if (sForma == 1) {
            out = out + JSON.stringify(i) + "." + kiesik + " " + e + sformaz(str) + "\u00a0\u00a0\u00a0\u00a0 " + (lepessor[i] || " ") + "\n";
        } else if (sForma == 2) {
            if (kiesik !== "*") {
                out = out + JSON.stringify(szamlalo) + ". " + e + sformaz(str) + "\u00a0\u00a0\u00a0\u00a0 " + (lepessor[i] || " ") + "\n";
            }
        } else if (sForma == 3) {
            if (kiesik !== "*") {
                out = out + e + sformaz(str);
            }
        } else {
            out = out + e + sformaz(str) + kiesik;
        }
        szamlalo++;
    };
    if (sForma == 1 || sForma == 2) {
        if (sForma == 1)
            ut = n - 1 + ". ";
        if (sForma == 2)
            ut = szamlalo + ". ";
        vegtor = "\n \u00a0\u00a0\u00a0\u00a0 \u00a0\u00a0\u00a0";
    };

    if ((sForma == 0 || sForma == 3) && n > 1) {
        out = out.slice(3);
    };
    return out;
};


LTXFormaz = function(S) {
    var out = "";
    var n = S.length;
    var korlat = n;

    for (var i = 0; i < korlat; i++) {
        var str = S[i];
        var e = elojele(Math.pow(-1, i));
        if (fazis1 !== "")
            e = elojele(Math.pow(-1, i + 1));
        if (arga)
            if (n > 1)
                e = " + ";
            else if (S[0][0] == 0) {
            e = " - ";
        }
        var kiesik = false;
        if (lepessor[i] == "↻" || lepessor[i - 1] == "↻")
            kiesik = true;

        if (sForma == 1 || sForma == 0) {
            if (!kiesik) {
                out = out + e + ltxformaz(str);
            } else
                out = out + e + "\\cancel{" + ltxformaz(str) + "}"
        } else {
            if (!kiesik)
                out = out + e + ltxformaz(str);
        }
    };
    if (out.startsWith(" + "))
        out = out.slice(2);
    if (mathfazis1 == "")
        out = setKeplet0() + " = " + out;
    return out;
};

var uout = "";
var mathout = "";

urites = function() {
    lepessor = [];
    maxreach = false;
    var elem, masik, inp;
    var av = document.getElementById("av").value;
    var bv = document.getElementById("bv").value;
    var outelem = document.getElementById("mpout");
    var mathelem = document.getElementById("keplet_math");
    if (pat.test(av) || pat.test(bv)) {
        outelem.innerText = "Valamelyik ∞ jel hibás!";
        outelem.style.opacity = "1";
        outelem.style.color = "#ff2211";
        mathelem.innerText = "";
        return;
    };
    seriesClear();
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };
    if (!bv.startsWith("[")) {
        bv = "[" + bv;
    };
    if (!bv.endsWith("]")) {
        bv = bv + "]";
    };
    av = av.replaceAll('oo', oo);
    bv = bv.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        bv = JSON.parse(bv);
        var aindx = av.indexOf(oo);
        var bindx = bv.indexOf(oo);
        if (aindx > -1)
            av = oo2Inf(av);
        if (bindx > -1)
            bv = oo2Inf(bv);

        if (arga && av.some(v => v <= 0)) {
            outelem.innerText = "Az a indexvektor most csak pozitív elemeket tartalmazhat!";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211";
            mathelem.innerText = "";
            return;
        }
        if (poz == 0 && aindx < 0) {
            elem = av;
            masik = bv;
        } else if (poz == 1 && bindx < 0) {
            elem = bv;
            masik = av;
        } else {
            outelem.innerText = "A kiüritendő vektor nem tartalmazhat ∞-t!";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211";
            mathelem.innerText = "";
            return;
        }
        outelem.style.color = "";
    } catch (error) {
        outelem.innerText = "A bevitt adatok valamelyike hibás!";
        outelem.style.opacity = "1";
        outelem.style.color = "#ff2211";
        mathelem.innerText = "";
        return;
    };

    var ne = elem.length;
    var nm = masik.length;
    if (ne == 0 && nm == 0) {
        outelem.innerText = "Mind a két vektor nem lehet ÜRES!";
        outelem.style.opacity = "1";
        outelem.style.color = "#ff2211";
        mathelem.innerText = "";
        return;
    }; // ez nem volt
    //} else if (sForma == 4) {
    if (sForma == 4) { // a felette levo helyett
        if (denom) {
            outelem.innerText = "Sorry, not implemented yet!";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211";
            //if (!showmathout)
            return;
        } else {
            var kiur = document.querySelector('.kiur').getAttribute('id').slice(0, 1);
            if (kiur == "a")
                LiMatrix(av, bv);
            else
                LiMatrix(bv, av);
            outelem.style.opacity = "1";
            if (!showmathout)
                return;
        }
    }; // ez nem volt
    // } else if (ne == 0 && nm > 0) {
    if (ne == 0 && nm > 0) { // a felette levo helyett
        if (!denom) {
            var mfirst = masik[0];
            var tmasik = masik.slice(1)
            tmasik.unshift(mfirst + 1);
            tmasik = Inf2oo(tmasik);
            uout = JSON.stringify(tmasik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
            mathout = LTXFormaz([
                [1, [
                    tmasik, []
                ]]
            ]);
            tmasik = oostr2Inf(tmasik)
            SOR = [
                [1, [
                    tmasik, []
                ]]
            ];
        } else {
            if (mode == "Le") {
                var mfirst = masik[0];
                var tmasik = masik.slice(1)
                tmasik.unshift(mfirst + 1);
                tmasik = Inf2oo(tmasik);

                masik.unshift(1);
                masik = Inf2oo(masik);
                uout = JSON.stringify(masik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞") + " - " + JSON.stringify(tmasik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
                mathout = LTXFormaz([
                    [0, [
                        masik, []
                    ]],
                    [1, [
                        tmasik, []
                    ]]
                ]);

                masik = oostr2Inf(masik);
                tmasik = oostr2Inf(tmasik);
                SOR = [
                    [0, [
                        masik, []
                    ]],
                    [1, [
                        tmasik, []
                    ]]
                ];
            } else {
                masik.unshift(1);
                masik = Inf2oo(masik);
                uout = JSON.stringify(masik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
                mathout = LTXFormaz([
                    [0, [
                        masik, []
                    ]]
                ]);

                masik = oostr2Inf(masik)
                SOR = [
                    [0, [
                        masik, []
                    ]]
                ];
            }
        }
    } else if (ne > 0 && nm == 0) {
        if (!denom) {
            if (mode == "Li" && arga) {
                elem.unshift(1);
                elem = Inf2oo(elem);
                uout = JSON.stringify(elem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
                SOR = [
                    [0, [
                        elem, []
                    ]]
                ];
                uout = SFormaz(SOR);
                mathout = LTXFormaz(SOR);
            } else {
                var efirst = elem[0];
                var telem = elem.slice(1)
                telem.unshift(efirst + 1);
                telem = Inf2oo(telem);
                uout = JSON.stringify(telem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
                SOR = [
                    [0, [
                        telem, []
                    ]]
                ];
                mathout = LTXFormaz(SOR);
            }
        } else {
            if (mode == "Le") {
                var efirst = elem[0];
                var telem = elem.slice(1)
                telem.unshift(efirst + 1);
                telem = Inf2oo(telem);

                elem.unshift(1);
                elem = Inf2oo(elem);
                uout = JSON.stringify(elem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞") + " - " + JSON.stringify(telem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
                mathout = LTXFormaz([
                    [0, [
                        elem, []
                    ]],
                    [1, [
                        telem, []
                    ]]
                ]);

                elem = oostr2Inf(elem);
                telem = oostr2Inf(telem);
                SOR = [
                    [0, [
                        elem, []
                    ]],
                    [1, [
                        telem, []
                    ]]
                ];
            } else {
                elem.unshift(1);
                elem = Inf2oo(elem);
                uout = JSON.stringify(elem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
                SOR = [
                    [0, [
                        elem, []
                    ]]
                ];
                mathout = LTXFormaz(SOR);
            }
        }
    } else {
        if (!denom) {
            var efirst = elem[0];
            var mfirst = masik[0];
            if (efirst >= 0) {
                var tmasik = masik.slice(1);
                tmasik.unshift(mfirst + 1);
                inp = [
                    [0, [elem, tmasik]]
                ];
            } else {
                var telem = elem.slice(1)
                telem.unshift(efirst + 1);
                inp = [
                    [1, [masik, telem]]
                ];
            };
        } else {
            var efirst = elem[0];
            if (efirst >= 0) {
                masik.unshift(1);
                inp = [
                    [0, [elem, masik]]
                ];
            } else {
                elem.unshift(1);
                inp = [
                    [1, [masik, elem]]
                ];
            };
        };
        SOR = sor(inp);
        uout = SFormaz(SOR);
        mathout = LTXFormaz(SOR);
    };
    if (maxreach)
        uout = "Elértük a maximálisan megengedet " + maxsor + " lépésszámot.\nA számítás valószínűleg nem teljes.\n............\n " + uout + "........";
    if (fazis2) {
        fazis1 = uout;
        mathfazis1 = mathout;
        denom = false;
        SOR2 = _.cloneDeep(SOR);
        urites();
    };
    if (fazis1 != "") {
        var elvalaszto = ".......... 2.fázis ..........\n";
        if (sForma == 0 || sForma == 3) {
            elvalaszto = "\n  2. fázis>>>\n - ";
        }
        uout = fazis1 + elvalaszto + uout;
        mathout = mathfazis1 + "\\overset{(2)}{-}" + mathout;
        fazis1 = "";
        mathfazis1 = "";
        denom = true;
    };
    if (sForma != 4) {
        outelem.innerText = uout;
        outelem.style.opacity = "1";
    };
    if (showmathout) {
        mathelem.innerText = "\\[" + mathout + "\\]";
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, mathelem]);
    }
};

setsForma = function() {
    var forma = document.getElementById("setsForma").value;
    var sf = document.getElementById("sorftarto");
    sForma = forma * 1;
    if (sForma == 4)
        sf.style.display = "none";
    else
        sf.style.display = "block";
    urites();
};

setMaxsor = function() {
    var mr = document.getElementById("setmaxsor").value;
    maxsor = mr * 1;
    mpoutClear();
};

aSumRefresh = function() {
    document.getElementById("mpout").style.opacity = "0.3";
    var av = document.getElementById("av").value;
    var asv = "";

    if (av.indexOf('oo') > -1) {
        asv = "∞";
        document.getElementById("as").innerText = asv;
        setKeplet();
        return;
    } else {
        if (!av.startsWith("[")) {
            av = "[" + av;
        };
        if (!av.endsWith("]")) {
            av = av + "]";
        };

        try {
            av = JSON.parse(av);
            asv = av.reduce((x, y) => Math.abs(x) + Math.abs(y), 0);
            document.getElementById("as").innerText = asv;
            setKeplet();
        } catch {}
    };
};

bSumRefresh = function() {
    document.getElementById("mpout").style.opacity = "0.3";
    var bv = document.getElementById("bv").value;
    var bsv = "";
    if (bv.indexOf('oo') > -1) {
        bsv = "∞";
        document.getElementById("bs").innerText = bsv;
        setKeplet();
        return;
    } else {
        if (!bv.startsWith("[")) {
            bv = "[" + bv;
        };
        if (!bv.endsWith("]")) {
            bv = bv + "]";
        };
        try {
            bv = JSON.parse(bv);
            bsv = bv.reduce((x, y) => Math.abs(x) + Math.abs(y), 0);
            document.getElementById("bs").innerText = bsv;
            setKeplet();
        } catch {}
    };
};


function uritesClear() {
    const outelem = document.getElementById("mpout");
    const mathelem = document.getElementById("keplet_math");
    outelem.innerText = "";
    mathelem.innerText = "";
    seriesClear();
};

function mpoutClear() {
    document.getElementById("mpout").style.opacity = "0.3";
};

refreskiura = function() {
    poz = 0;
    document.getElementById("avl").classList.add("kiur");
    document.getElementById("bvl").classList.remove("kiur");
};

refreskiurb = function() {
    if (arga) {
        poz = 0;
        return;
    };
    poz = 1;
    document.getElementById("bvl").classList.add("kiur");
    document.getElementById("avl").classList.remove("kiur");
};

function sbTgl(id) {
    var elem = document.getElementById(id);
    var open = elem.style.display;
    if (open == "none")
        elem.style.display = "block";
    else
        elem.style.display = "none";
};

function helpTgl(id) {
    var elem = document.getElementById(id);
    var open = elem.style.display;
    if (open == "none")
        elem.style.display = "block";
    else
        elem.style.display = "none";
};

function setOutputFont(v) {
    var elem = document.getElementById("mpout");
    elem.style.fontSize = v + '%';
    setTimeout(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    }, 100);
    var elem2 = document.getElementById("keplet_math");
    elem2.style.fontSize = v + '%';
    setTimeout(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem2]);
    }, 100);
};

/*   Ha, He  implementálása  */

function HeREGI(S, k) {
    var n, SS, h, g;
    n = S.length;
    if (n == 0)
        h = 1 / k;
    else if (n == 1)
        h = 1 / Math.pow(k, S[0]);
    else {
        SS = S.slice(1);
        var hh = 1 / Math.pow(k, S[0]);
        g = new Array(k)
        for (var i = 0; i < k; i++) {
            g[i] = He(SS, i + 1);
        };
        h = _.sum(g) * hh;
    }
    return h;
};

function He(S, n) {
    var r, SS, h, g;
    r = S.length;
    if (r == 0 && n == 0)
        h = 1;
    else if (r == 0 && n > 0)
        h = 0;
    else if (n == 0 && r > 0)
        h = 0;
    else if (r == 1)
        h = 1 / Math.pow(n, S[0]);
    else {
        SS = S.slice(1);
        var hh = 1 / Math.pow(n, S[0]);
        g = new Array(n)
        for (var i = 0; i < n; i++) {
            g[i] = He(SS, i + 1);
        };
        h = _.sum(g) * hh;
    }
    return h;
};

function Hez(S, n) {
    var r, SS, h, g;
    r = S.length;
    if (r == 0)
        h = 1;
    else if (r == 1) {
        var S1 = S[0];
        h = He([0, S1], n);
    } else {
        SS = S.slice(1);
        var S1 = S[0];
        g = new Array(n)
        for (var i = 1; i < n + 1; i++) {
            g[i] = Hez(SS, i) / Math.pow(i, S1);
        };
        h = _.sum(g);
    }
    return h;
};

function Ha(S, n) {
    var r, SS, h, g;
    r = S.length;
    if (r == 0 && n == 0)
        h = 1;
    else if (r == 0 && n > 0)
        h = 0;
    else if (n < r)
        h = 0;
    else if (r == 1)
        h = 1 / Math.pow(n, S[0]);
    else {
        SS = S.slice(1);
        var hh = 1 / Math.pow(n, S[0]);
        g = new Array(n - r + 1)
        for (var i = r - 1; i < n; i++) {
            g[i] = Ha(SS, i);
        };
        h = _.sum(g) * hh;
    }
    return h;
};

function Haz(S, n) {
    var r, SS, h, g;
    r = S.length;
    if (n < r)
        h = 0;
    else if (r == 0)
        h = 1;
    else if (r == 1) {
        var S1 = S[0];
        h = Ha([1, S1], n + 1) * (n + 1);
    } else {
        SS = S.slice(1);
        var S1 = S[0];
        g = new Array();
        for (var i = r - 1; i < n + 1; i++) {
            g[i] = Haz(SS, i - 1) / Math.pow(i, S1);
        };
        h = _.sum(g);
    }
    return h;
};

// sorfejtesLi 

function seriesLiClear() {
    var elem = document.querySelector("#sorLi");
    var elemfn = document.querySelector("#fnpl");
    var elemfigy = document.querySelector("#figy");
    elem.innerText = "";
    functionPlot({
        target: '#plotLi',
        title: 'y = 0',
        grid: true,
        xAxis: {
            domain: [-1, 1]
        },
        data: [{
            fn: "0",
            graphType: 'polyline',
        }]
    });
    elemfn.style.display = "none";
    elemfigy.style.display = "none";
};

function setfigy(str, id) {
    var elem = document.getElementById(id);
    if (str == "")
        elem.style.display = "none";
    else
        elem.style.display = "block";
    elem.innerHTML = str;
};


function Li(N) {
    var av = document.getElementById("avLi").value;
    var figy = "";
    var str1 = "";
    var fn = "";
    if (pat.test(av)) {
        sorhiba = true;
        return [str1, fn];
    };
    var avtxt = av.replaceAll('oo', '∞');
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        var aindx = av.indexOf(oo);
        if (aindx > -1) {
            av = oo2Inf1000(av);
        };
        var na = av.length;
        var maxN = maxLi[na];
        if (na > 10) {
            figy = "Az a vektor hossza (" + na + ") meghaladja a maximalisan megengedett 10-et.";
            str1 = "\\text{" + figy + "}";
            fn = "0";
            setfigy(figy, "figy");
            return [str1, fn];
        } else if (maxN < N) {
            var slid = document.getElementById("series-sliderLi");
            figy = " Egy " + na + " hosszú a vektor esetén N legnagyobb megengedett értéke: " + maxN + ". Mivel N beállított értéke (" + N + ") ezt meghaladta, ezért N értékét beállítottuk a maximálisan megengedett " + maxN + " értékre, és végig ezzel számoltunk.\n";
            N = maxN;
            slid.value = maxN;
            setNLi(slid);
        };
        var str0 = "\\text{Li}_{\\left(" + avtxt + "\\right)}\\,\\left(x\\right)\\approx ";
        var vege = na + N + 1;
        for (var i = na; i < vege; i++) {
            var ci = Ha(av, i);
            if (i == na) {
                str1 += ci + "\\,x^{" + i + "}";
                fn += ci + "*x^" + i;
            } else {
                str1 += "+" + ci + "\\,x^{" + i + "}";
                fn += "+" + ci + "*x^" + i
            };
        };
        str1 = str0 + str1;
    } catch (error) {
        sorhiba = true;
    };
    setfigy(figy, "figy");
    return [str1, fn];
};

function Le(N) {
    var av = document.getElementById("avLi").value;
    var figy = "";
    var str1 = "";
    var fn = "";
    if (pat.test(av)) {
        sorhiba = true;
        return [str1, fn];
    };
    var avtxt = av.replaceAll('oo', '∞');
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        var aindx = av.indexOf(oo);
        if (aindx > -1)
            av = oo2Inf1000(av);
        var str0 = "\\text{Le}_{\\left(" + avtxt + "\\right)}\\,\\left(x\\right)\\approx ";
        var na = av.length;
        var maxN = maxLi[na];
        if (na > 10) {
            figy = "Az a vektor hossza (" + na + ") meghaladja a maximalisan megengedett 10-et.";
            str1 = "\\text{" + figy + "}";
            fn = "0";
            setfigy(figy, "figy");
            return [str1, fn];
        } else if (maxN < N) {
            var slid = document.getElementById("series-sliderLi");
            figy = " Egy " + na + " hosszú a vektor esetén N legnagyobb megengedett értéke: " + maxN + ". Mivel N beállított értéke (" + N + ") ezt meghaladta, ezért N értékét beállítottuk a maximálisan megengedett " + maxN + " értékre, és végig ezzel számoltunk.\n";
            N = maxN;
            slid.value = maxN;
            setNLi(slid);
        };
        var vege = N + 2;
        for (var i = 0; i < vege; i++) {
            var ci = He(av, i);
            if (i == 0) {
                str1 += ci + "\\,x^{" + i + "}";
                fn += ci + "*x^" + i
            } else {
                str1 += "+" + ci + "\\,x^{" + i + "}";
                fn += "+" + ci + "*x^" + i
            }
        };
        str1 = str0 + str1;
    } catch (error) {
        sorhiba = true;
    };
    setfigy(figy, "figy");
    return [str1, fn];
};

function sorfejtesLi() {
    sorhiba = false;
    var lengtelem = document.querySelector("#series-sliderLi");
    var elem = document.querySelector("#sorLi");
    var elemfn = document.querySelector("#fnpl");
    elemfn.style.display = "block";
    var N = lengtelem.value * 1;
    var inp = [];
    var txt = "";
    var fn = "";
    if (mode1 == "Li") {
        inp = Li(N);
        txt = inp[0];
        fn = inp[1];
    } else if (mode1 == "Le") {
        inp = Le(N);
        txt = inp[0];
        fn = inp[1];
    } else {
        elem.innerText = "\\[\\text{Sorry, not implemented yet!}\\]";
    };
    if (!sorhiba) {
        txt = txt.replaceAll('Infinity', '∞');
        fn = fn.replaceAll('Infinity', '10000');
        elem.innerText = "\\[" + txt + "\\]";
        functionPlot({
            target: '#plotLi',
            title: mode1 + "_a(x)",
            grid: true,
            yAxis: {
                domain: [-1, 1.2]
            },
            xAxis: {
                domain: [-1, 1]
            },
            data: [{
                fn: fn,
                graphType: 'polyline',
            }]
        });
        document.querySelector('svg.function-plot text.title').setAttribute('x', 70);
    } else {
        var pl = document.querySelector('.function-plot');
        if (pl)
            pl.remove();
        elem.innerText = "\\[\\text{There is some problem with input data!}\\]";
    };
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

// x0 ertekkel 

function seriesLiClear0() {
    var elem = document.querySelector("#sorLi0");
    var elemfigy = document.querySelector("#figy0");
    elem.innerText = "";
    elemfigy.style.display = "none";
};

function setNLi0(elem) {
    var N = elem.value;
    var Nelem = document.getElementById("seriesNLi0");
    Nelem.innerHTML = N;
};

function setNLi(elem) {
    var N = elem.value;
    var Nelem = document.getElementById("seriesNLi");
    Nelem.innerHTML = N;
    sorfejtesLi();
};

function setNLi1(elem) {
    var N = elem.value;
    var Nelem = document.getElementById("seriesN");
    Nelem.innerHTML = N;
};

function setn(elem, id) {
    var n = elem.value;
    var Nelem = document.getElementById(id + "kijelzo");
    Nelem.innerHTML = n;
    if (id == "n1")
        azonHecmplusHa();
};

function Li0(N, x0) {
    var av = document.getElementById("avLi0").value;
    var figy = "";
    var avtxt = av.replaceAll('oo', '∞');
    var txt = "\\text{Li}_{\\left(" + avtxt + "\\right)}\\,\\left(" + x0 + "\\right)\\approx ";
    var fn = 0;
    if (av == "") {
        txt = "\\text{Li}_{∅}\\approx ";
        fn = 1;
    } else {
        if (!av.startsWith("[")) {
            av = "[" + av;
        }
        if (!av.endsWith("]")) {
            av = av + "]";
        };

        av = av.replaceAll('oo', oo);
        try {
            av = JSON.parse(av);
            var na = av.length;
            var maxN = maxLi[na];
            if (na > 10) {
                figy = "Az a vektor hossza (" + na + ") meghaladja a maximalisan megengedett 10-et.";
                txt = "\\text{" + figy + "}";
                setfigy(figy, "figy0");
                return txt;
            } else if (maxN < N) {
                var slid = document.getElementById("series-sliderLi0");
                figy = " Egy " + na + " hosszú a vektor esetén N legnagyobb megengedett értéke: " + maxN + ". Mivel N beállított értéke (" + N + ") ezt meghaladta, ezért N értékét beállítottuk a maximálisan megengedett " + maxN + " értékre, és végig ezzel számoltunk.\n";
                N = maxN;
                slid.value = maxN;
                setNLi0(slid);
            };
            var aindx = av.indexOf(oo);
            if (aindx > -1)
                av = oo2Inf1000(av);
        } catch (error) {
            sorhiba = true;
            return;
        };
        var na = av.length;
        var vege = na + N;
        for (var i = na; i < vege; i++) {
            fn += Ha(av, i) * Math.pow(x0, i);
        };
    };
    setfigy(figy, "figy0");
    return txt + fn;
};

function Le0(N, x0) {
    var av = document.getElementById("avLi0").value;
    var figy = "";
    var avtxt = av.replaceAll('oo', '∞');
    var txt = "\\text{Le}_{\\left(" + avtxt + "\\right)}\\,\\left(" + x0 + "\\right)\\approx ";
    var fn = 0;
    if (av == "") {
        txt = "\\text{Li}_{∅}\\approx ";
        fn = 1;
    } else {
        if (!av.startsWith("[")) {
            av = "[" + av;
        }
        if (!av.endsWith("]")) {
            av = av + "]";
        };

        av = av.replaceAll('oo', oo);

        try {
            av = JSON.parse(av);
            var aindx = av.indexOf(oo);
            var na = av.length;
            var maxN = maxLi[na];
            if (na > 10) {
                figy = "Az a vektor hossza (" + na + ") meghaladja a maximalisan megengedett 10-et.";
                txt = "\\text{" + figy + "}";
                setfigy(figy, "figy0");
                return txt;
            } else if (maxN < N) {
                var slid = document.getElementById("series-sliderLi0");
                figy = " Egy " + na + " hosszú a vektor esetén N legnagyobb megengedett értéke: " + maxN + ". Mivel N beállított értéke (" + N + ") ezt meghaladta, ezért N értékét beállítottuk a maximálisan megengedett " + maxN + " értékre, és végig ezzel számoltunk.\n";
                N = maxN;
                slid.value = maxN;
                setNLi0(slid);
            };
            if (aindx > -1)
                av = oo2Inf1000(av);
        } catch (error) {
            sorhiba = true;
            return;
        };

        var vege = N + 1;

        var fn = 0;
        for (var i = 1; i < vege; i++) {
            fn += He(av, i) * Math.pow(x0, i);
        };
    }
    setfigy(figy, "figy0");
    return txt + fn;
};

function sorfejtesLi0() {
    sorhiba = false;
    var lengtelem = document.querySelector("#series-sliderLi0");
    var elem = document.querySelector("#sorLi0");
    var elemx0 = document.querySelector("#x0");
    var N = lengtelem.value * 1;
    var x0 = elemx0.value * 1;
    var fn = "";
    if (mode1 == "Li") {
        fn = Li0(N, x0);
    } else if (mode1 == "Le") {
        fn = Le0(N, x0);
    } else {
        elem.innerText = "\\[\\text{Sorry, not implemented yet!}\\]";
    };
    if (!sorhiba) {
        fn = fn.replaceAll('Infinity', '∞');
        elem.innerText = "\\[" + fn + "\\]";
    } else {
        elem.innerText = "\\[\\text{There is some problem with input data!}\\]";
    };
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

///////

function HeSORnxk(n, k, sor) {
    if (sor == 1)
        var ab = SOR[n][1];
    else
        var ab = SOR2[n][1];
    var a = ab[0];
    var b = ab[1];
    a = Inf2big(a)
    b = Inf2big(b)
    var sum = 0;
    if (a.length == 0) {
        sum = He(b, k);
    } else if (b.length == 0) {
        sum = He(a, k);
    } else {
        for (var i = 1; i < k; i++) {
            sum += He(a, i) * He(b, k - i);
        };
    }
    return sum;
};

function HaSORnxk(n, k) {
    var ab = SOR[n][1];
    var a = ab[0];
    var b = ab[1];
    a = Inf2big(a)
    b = Inf2big(b)
    var sum = 0;
    if (a.length == 0) {
        sum = Ha(b, k);
    } else if (b.length == 0) {
        sum = Ha(a, k);
    } else {
        for (var i = 1; i < k; i++) {
            sum += Ha(a, i) * Ha(b, k - i);
        };
    }
    return sum;
};

function HeSORxk(k) {
    var n = SOR.length;
    sum = 0;
    for (var i = 0; i < n; i++) {
        sum += Math.pow(-1, i) * HeSORnxk(i, k, 1);
    };
    if (denom && mode == "Le") {
        if (n == 2) {
            sum = 0;
            for (var j = 0; j < n; j++) {
                sum -= Math.pow(-1, j) * HeSORnxk(j, k, 1);
            };
            return -sum;
        } else {
            var m = SOR2.length;
            for (var j = 0; j < m; j++) {
                sum -= Math.pow(-1, j) * HeSORnxk(j, k, 2);
            };
            return -sum;
        }
    };
    return sum;
};

function HaSORxk(k) {
    var n = SOR.length;
    sum = 0;
    for (var i = 0; i < n; i++) {
        sum += Math.pow(-1, i) * HaSORnxk(i, k);
    };
    return sum;
};

function HeIntxk(a, b, k) {
    var sum = 0;
    if (!denom) {
        if (a.length == 0)
            sum += He(b, k);
        else if (b.length == 0)
            sum += He(a, k);
        else
            for (var i = 1; i < k; i++) {
                sum += He(a, i) * He(b, k - i);
            };
    } else {
        if (a.length == 0 || b.length == 0) {
            var n = SOR.length;
            sum = 0;
            for (var i = 0; i < n; i++) {
                sum += Math.pow(-1, i) * HeSORnxk(i, k, 1);
            };
            return sum;
        } else
            for (var i = 1; i < k - 1; i++) {
                for (var j = 1; j < k - i; j++) {
                    sum += He(a, i) * He(b, j);
                }
            };
    };
    return sum / k;
};

function HaIntxk(a, b, k) {
    var sum = 0;
    if (!denom) {
        if (a.length == 0)
            sum += Ha(b, k);
        else if (b.length == 0)
            sum += Ha(a, k);
        else
            for (var i = 1; i < k; i++) {
                sum += Ha(a, i) * Ha(b, k - i);
            };
    } else {
        if (a.length == 0)
            for (var i = 1; i < k; i++)
                sum += Ha(b, i);
        else if (b.length == 0)
            for (var i = 1; i < k; i++)
                sum += Ha(a, i);
        else
            for (var i = 1; i < k; i++) {
                for (var j = 1; j < k - i; j++) {
                    sum += Ha(a, i) * Ha(b, j);
                }
            };
    };
    return sum / k;
};

// sorfejtes integralokra 3.


function LiLi(N) {
    var av = document.getElementById("av").value;
    var bv = document.getElementById("bv").value;
    var n = document.getElementById("series-slider").value;
    var figy = "";
    if (pat.test(av) || pat.test(bv)) {
        sorhiba = true;
        return;
    };

    var avtxt = av.replaceAll('oo', '∞');
    var bvtxt = bv.replaceAll('oo', '∞');
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };
    if (!bv.startsWith("[")) {
        bv = "[" + bv;
    };
    if (!bv.endsWith("]")) {
        bv = bv + "]";
    };
    av = av.replaceAll('oo', oo);
    bv = bv.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        bv = JSON.parse(bv);

        var aindx = av.indexOf(oo);
        var bindx = bv.indexOf(oo);
        if (aindx > -1)
            av = oo2Inf1000(av);
        if (bindx > -1)
            bv = oo2Inf1000(bv);
    } catch (error) {
        sorhiba = true;
        return;
    };

    var na = av.length;
    var nb = bv.length;
    if ((na + nb) * n > 120) {
        N = Math.max(3, Math.ceil(120 / (na + nb)));
        var slid = document.getElementById("series-slider");
        var N0 = slid.value;
        figy = " Az adott számítás legfeljebb " + N + " értékkel megengedett. Mivel N beállított értéke (" + N0 + ") ezt meghaladta, ezért N értékét beállítottuk a maximálisan megengedett " + N + " értékre, és végig ezzel számoltunk.\n";
        slid.value = N;
        setNLi1(slid);
    };
    var den = "x";
    if (denom)
        den = "1-x"
    var arg = "x";
    if (arga)
        arg = "1-x";
    var str0 = "\\int\\frac{1}{" + den + "}\\,\\text{Li}_{\\left(" + avtxt + "\\right)}\\,\\left(" + arg + "\\right)\\cdot\\text{Li}_{\\left(" + bvtxt + "\\right)}\\,\\left(x\\right)\\,\\text{d}x &=";
    var str1 = "";
    var hezag = "";
    if (N > 4)
        hezag = "\\hspace{" + (0.05 * N + 0.1) + "cm}";
    var kezdo = na + nb;
    var vege = kezdo + N;
    for (var i = kezdo; i < vege; i++) {
        if (i == kezdo)
            str1 += HaIntxk(av, bv, i) + "\\,x^{" + i + "}";
        else
            str1 += "+" + HaIntxk(av, bv, i) + "\\,x^{" + i + "}";
    };
    str1 = "\\begin{align}\\left(1\\right)\\," + str0 + str1 + hezag + "\\\\ \\\\ \\left(2\\right)\\," + str0;
    var str2 = "";
    for (var i = kezdo; i < vege; i++) {
        if (i == kezdo)
            str2 += HaSORxk(i) + "\\,x^{" + i + "}";
        else
            str2 += "+" + HaSORxk(i) + "\\,x^{" + i + "}";
    };
    str2 += "\\end{align}"
    setfigy(figy, "figy1");
    return str1 + str2;
};

function LeLe(N) {
    var av = document.getElementById("av").value;
    var bv = document.getElementById("bv").value;
    var n = document.getElementById("series-slider").value;
    var figy = "";
    if (pat.test(av) || pat.test(bv)) {
        sorhiba = true;
        return;
    };

    var avtxt = av.replaceAll('oo', '∞');
    var bvtxt = bv.replaceAll('oo', '∞');
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };
    if (!bv.startsWith("[")) {
        bv = "[" + bv;
    };
    if (!bv.endsWith("]")) {
        bv = bv + "]";
    };
    av = av.replaceAll('oo', oo);
    bv = bv.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        bv = JSON.parse(bv);

        var aindx = av.indexOf(oo);
        var bindx = bv.indexOf(oo);
        if (aindx > -1)
            av = oo2Inf1000(av);
        if (bindx > -1)
            bv = oo2Inf1000(bv);
    } catch (error) {
        sorhiba = true;
        return;
    };
    var na = av.length;
    var nb = bv.length;
    if ((na + nb) * n > 180) {
        N = Math.max(3, Math.ceil(140 / (na + nb)));
        var slid = document.getElementById("series-slider");
        var N0 = slid.value;
        figy = " Az adott számítás legfeljebb " + N + " értékkel megengedett. Mivel N beállított értéke (" + N0 + ") ezt meghaladta, ezért N értékét beállítottuk a maximálisan megengedett " + N + " értékre, és végig ezzel számoltunk.\n";
        slid.value = N;
        setNLi1(slid);
    };
    var den = "x";
    if (denom)
        den = "1-x"
    var str0 = "\\int\\frac{1}{" + den + "}\\,\\text{Le}_{\\left(" + avtxt + "\\right)}\\,\\left(x\\right)\\cdot\\text{Le}_{\\left(" + bvtxt + "\\right)}\\,\\left(x\\right)\\,\\text{d}x &=";
    var str1 = "";
    if (N > 4)
        hezag = "\\hspace{" + (0.05 * N + 1.4) + "cm}";
    var kezdo = 1;
    if (denom)
        kezdo = 2;
    var vege = kezdo + N;
    for (var i = kezdo; i < vege; i++) {
        if (i == kezdo)
            str1 += HeIntxk(av, bv, i) + "\\,x^{" + i + "}";
        else
            str1 += "+" + HeIntxk(av, bv, i) + "\\,x^{" + i + "}";
    };
    str1 = "\\begin{align}\\left(1\\right)\\," + str0 + str1 + "\\\\ \\\\ \\left(2\\right)\\," + str0;
    var str2 = "";
    for (var i = kezdo; i < vege; i++) {
        if (i == kezdo)
            str2 += HeSORxk(i) + "\\,x^{" + i + "}";
        else
            str2 += "+" + HeSORxk(i) + "\\,x^{" + i + "}";
    };
    str2 += "\\end{align}"
    setfigy(figy, "figy1");
    return str1 + str2;
};

function setN(elem) {
    var N = elem.value;
    var Nelem = document.getElementById("seriesN");
    Nelem.innerHTML = N;
};

function sorfejtes() {
    sorhiba = false;
    var lengtelem = document.querySelector("#series-slider");
    var elem = document.querySelector("#keplet_sor");
    var N = lengtelem.value * 1;
    var txt = "";
    if (mode == "Li") {
        txt = LiLi(N)
        if (!sorhiba)
            elem.innerText = "\\[" + txt + "\\]";
    } else if (mode == "Le") {
        txt = LeLe(N)
        if (!sorhiba)
            elem.innerText = "\\[" + txt + "\\]";
    } else {
        elem.innerText = "\\[\\text{Sorry, not implemented yet!}\\]";
    };
    if (sorhiba)
        elem.innerHTML = "\\[\\text{There is some problem with input data!}\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function seriesClear() {
    var elem = document.querySelector("#keplet_sor");
    var elemfigy = document.querySelector("#figy1");
    elem.innerText = "";
    elemfigy.style.display = "none";
};

function big2inf(x) {
    var out;
    if (x == oo || x == Infinity || x == -oo)
        out = "∞";
    else
        out = x;
    return out;
};

function LiIndx(a, b) {
    var na = a.length;
    var nb = b.length;
    var nn = na + nb;
    let out = new Array(nn);
    for (let i = 0; i < na + 1; i++) {
        out[i] = new Array(nn);
    }
    a = a.map(y => big2inf(y));
    b = b.map(y => big2inf(y));
    var e = felojel(b[0]);
    var b0 = b[0];
    if (b0 !== "∞")
        b0 = Math.abs(b[0]);

    for (let i = 0; i < na + 1; i++) {
        for (let j = 0; j < nn; j++) {
            if (j == 0)
                out[i][j] = "\\langle" + a[i] + "\\rangle";
            else if (j == na - i && i == 0)
                out[i][j] = "\\langle" + a[na - j] + "\\rangle\\scriptsize{" + e + b0 + "}";
            else if (j == na - i && i > 0)
                out[i][j] = "\\langle" + a[na - j] + "\\rangle";
            else if (j == na)
                out[i][j] = a[0] + "\\scriptsize{" + e + b0 + "}";
            else if (j > na - i && j < na)
                out[i][j] = a[na - j];
            else if (j < na)
                out[i][j] = a[i + j];
            else
                out[i][j] = b[j - na];
        }
    };
    return out;
};

function LiMatrix(a, b) {
    var elem = document.getElementById('mpout');
    var na = a.length;
    var nb = b.length;
    var nn = na + nb;
    var M = LiIndx(a, b);
    var out = "\\[\\begin{array}{";
    if (na * nb == 0)
        out = "\\[\\text{Nem értelmezett.}\\]";
    else {
        for (let i = 1; i < nn + 1; i++) {
            if (i == na || i == na + 1)
                out += "c|";
            else
                out += "c";
        }
        out += "}";
        for (let j = 0; j < nn; j++) {
            if (j < nn - 1)
                out += M[0][j] + " & ";
            else
                out += M[0][j] + "\\\\";
        }
        for (let i = 1; i < na - 1; i++) {
            for (let j = 0; j < nn; j++) {
                if (j < nn - 1)
                    out += M[i][j] + " & ";
                else
                    out += M[i][j] + "\\\\";
            };
        };
        for (let j = 0; j < nn; j++) {
            if (j < nn - 1)
                out += M[na - 1][j] + " & ";
            else
                out += M[na - 1][j];
        }
        out += "\\end{array}\\]";
    }
    elem.innerHTML = out;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

// SageMathCell

function LiLe0PARI() {
    var av = document.getElementById("avLi0").value;
    var x0 = document.querySelector("#x0").value * 1;
    var pari = "";
    var avtxt = av.replaceAll('oo', '∞');
    var txt = "\\text{Li}_{\\left(" + avtxt + "\\right)}\\,\\left(" + x0 + "\\right) = ";
    var kapcs = "0";
    if (mode1 == "Le")
        kapcs = "1";
    if (av == "") {
        pari = "show(LatexExpr(r'" + txt + "'),1)";
    } else {
        if (!av.startsWith("[")) {
            av = "[" + av;
        }
        if (!av.endsWith("]")) {
            av = av + "]";
        };

        av = av.replaceAll('oo', oo);
        try {
            av = JSON.parse(av);
            var na = av.length;
            var aindx = av.indexOf(oo);
            if (aindx > -1)
                av = oo2Inf100(av);
            var xv = Array(na).fill(1);
            xv[0] = x0;
            pari = "a = " + "gp(\"polylogmult(" + JSON.stringify(av) + "," + JSON.stringify(xv) + "," + kapcs + ")\");show(LatexExpr(r'" + txt + "'),a)";
        } catch (error) {
            pari = error;
        };
    };
    return pari;
};

function setOutputFont1(v) {
    $('div.sagecell_sessionOutput,div.sagecell_sessionOutput pre').css('font-size', v + 'px');
};

function HZPARI() {
    document.getElementById("figyZ").style.display = "none";
    var elemfn = document.querySelector("#fnpz");
    elemfn.style.display = "none";

    var av = document.getElementById("sv2").value;
    var pari = "";
    var cs = "";
    var avtxt = av.replaceAll('oo', '∞');
    var kapcs = "0";
    if (Zmode == "Z1") {
        kapcs = "1";
        cs = "^{*}";
    }
    var txt = "\\zeta" + cs + "\\left(" + avtxt + "\\right) = ";
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás!", "figyZ");
        return "vegtelenhiba";
    } else if (av == "") {
        pari = "show(LatexExpr(r'" + txt + "'),1)";
    } else {
        if (!av.startsWith("[")) {
            av = "[" + av;
        }
        if (!av.endsWith("]")) {
            av = av + "]";
        };

        av = av.replaceAll('oo', oo);
        try {
            av = JSON.parse(av);
            var aindx = av.indexOf(oo);
            if (aindx > -1)
                av = oo2Inf100(av);
            pari = "a = " + "gp(\"zetamult(" + JSON.stringify(av) + "," + kapcs + ")\");show(LatexExpr(r'" + txt + "'),a)";
        } catch (error) {
            setfigy("Hibás bemenet", "figyZ");
            return "hiba";
        };
    };
    return pari;
};

function setOutputFont2(v) {
    $('div.sagecell_sessionOutput,div.sagecell_sessionOutput pre').css('font-size', v + 'px');
};

function setOutputFontHacom(v) {
    document.getElementById("Hacom").style.fontSize = v + "px";
};

$(document).ready(function() {
    document.getElementById("okbtn").onclick = function() {
        var txt = LiLe0PARI();
        $('#mycell1 .sagecell_editor textarea.sagecell_commands').val(txt);
        $('#mycell1 .sagecell_input button.sagecell_evalButton').click();
        setOutputFont1($('#outfont-slider1').val());
    };
    document.getElementById("okbtn2").onclick = function() {
        var outelem = document.querySelector('#ideout2 .sagecell_sessionOutput');
        var txt = HZPARI();
        if (txt == "vegtelenhiba") {
            if (outelem)
                outelem.innerHTML = "<span class='outhiba'>Valamelyik ∞ jel hibás!</span>";
        } else if (txt == "hiba") {
            if (outelem)
                outelem.innerHTML = "<span class='outhiba'>Hibás bemenet!</span>";
        } else {
            $('#mycell2 .sagecell_editor textarea.sagecell_commands').val(txt);
            $('#mycell2 .sagecell_input button.sagecell_evalButton').click();
            setOutputFont2($('#outfont-slider2').val());
        };
    };
    $(document).on('click', 'table#pqntbl td', function() {
        $('table#pqntbl td.active').removeClass('active');
        $(this).addClass('active');
    });
});

// H,ZETA

function binomial(n, k) {
    if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k === 1 || k === n - 1) return n;
    if (n - k < k) k = n - k;

    let res = n;
    for (let i = 2; i <= k; i++) res *= (n - i + 1) / i;
    return Math.round(res);
};

function HClear(kell) {
    var elem = document.querySelector("#H");
    var elem1 = document.querySelector("#Hs");
    var elem2 = document.querySelector("#Z");
    var elem3 = document.querySelector("#Zs");
    var elemfigy = document.querySelector("#figyH");
    elem.innerText = "";
    elem1.innerText = "";
    elem2.innerText = "";
    elem3.innerText = "";
    if (kell)
        elemfigy.style.display = "none";
};

function HcomClear() {
    var elem = document.querySelector("#Hacom");
    var elemfigy = document.querySelector("#figyHacom");
    elem.innerText = "";
    elemfigy.style.display = "none";
};

function kiszed_av(id) {
    var elemfigy = document.querySelector("#figyH");
    elemfigy.style.display = "none";
    var av = document.getElementById(id).value;
    if (pat.test(av)) {
        if (id == "sv2")
            setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "figyZ");
        else
            setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "figyH");
        HClear(false);
        return "vegtelenhiba";
    };

    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figyH");
        HClear(false);
        return;
    };
    return av;
};

function toABC(id) {
    let sv = kiszed_av(id);
    let e = sv[0];
    let num = Math.min(6, e);
    let ABC = ["a", "b", "c", "d", "e", "f"]
    let str = '';
    for (var i = 0; i < num; i++)
        str += "\"" + ABC[i] + "\",";
    str = str.slice(0, -1);
    document.getElementById(id).value = str;
};

function Combnr(n, r, ism) {
    const nv = Array.from({ length: n }, (_, i) => n - i);
    const c = new YourCombinations(nv);
    let cb = c.combinations(r, ism);
    return cb;
};

function zhFormaz(nv, sv) {
    var ooindx = sv.indexOf(oo);
    if (ooindx > -1)
        sv = oo2strInf(sv);
    var txt = "+\\frac{1}{";
    const nl = nv.length;
    for (let i = 0; i < nl - 1; i++) {
        txt += nv[i] + "^{" + sv[i] + "}\\cdot "
    };
    txt += nv[nl - 1] + "^{" + sv[nl - 1] + "}}"
    return txt;
};

function Hltx(sv, n, ism) {
    const r = sv.length;
    const sv1 = sv.slice(1);
    let n1 = n;
    if (!ism)
        n1 = n - 1;
    let cb = Combnr(n1, r - 1, ism);
    let cs = "";
    let koz = "";
    var Hv;
    var meret = 1;
    if (ism) {
        cs = "*";
        Hv = He(sv, n);
        meret = binomial(n + r - 2, r - 1) * (r - 3);
    } else {
        Hv = Ha(sv, n);
        meret = binomial(n - 1, r - 1) * (r - 1);
    };
    if (!isNaN(Hv))
        koz = "\\approx" + Hv;
    var ooindx = sv.indexOf(oo);
    if (ooindx > -1)
        sv = oo2strInf(sv);
    const sltx = "(" + JSON.stringify(sv).replaceAll('"', '').slice(1, -1) + ")";
    var ltx = "";
    if (r == 0) {
        if (n == 0)
            ltx = 1;
        else
            ltx = 0;
        ltx = "{\\rm H}_{" + n + "}^{" + cs + sltx + "}=" + ltx;
        return ltx;
    };
    if (r == 1) {
        ltx = "\\frac{1}{" + n + "^{" + sv[0] + "}}";
        ltx = "{\\rm H}_{" + n + "}^{" + cs + sltx + "}=" + ltx + koz;
        return ltx;
    };
    if (meret > Hmax)
        ltx = "\\text{ Az Összeg mérete meghaladja a " + Hmax + "-at}";
    else {
        while (true) {
            const item = cb.next();
            if (item.done) break;
            ltx += zhFormaz(item.value, sv1);
        };
        ltx = ltx.slice(1);
    };
    if (ltx == "")
        ltx = 0;
    else
        ltx = "\\frac{1}{" + n + "^{" + sv[0] + "}}\\left(" + ltx + "\\right)";
    ltx = "{\\rm H}_{" + n + "}^{" + cs + sltx + "}=" + ltx + koz;
    return ltx;
};

function zetaltx(sv, n, ism) {
    const r = sv.length;
    let cb = Combnr(n, r, ism);
    let cs = "";
    let koz = "";
    var Zv;
    var meret = 1;
    if (ism) {
        cs = "^{*}";
        Zv = Hez(sv, n);
        meret = binomial(n + r - 1, r) * (r - 2);
    } else {
        Zv = Haz(sv, n);
        meret = binomial(n, r) * (r - 2);
    };
    var ooindx = sv.indexOf(oo);
    if (ooindx > -1)
        sv = oo2strInf(sv);
    const sltx = "(" + JSON.stringify(sv).replaceAll('"', '').slice(1, -1) + ")";
    var ltx = "";
    if (r == 0) {
        ltx = 1;
        if (n == 1)
            ltx = 1;
        ltx = "{\\zeta}_{" + n + "}" + cs + "{" + sltx + "}=" + ltx;
        return ltx;
    };
    if (meret > Hmax)
        ltx = "\\text{ Az összeg mérete meghaladja a " + Hmax + "-at}";
    else {
        while (true) {
            const item = cb.next();
            if (item.done) break;
            ltx += zhFormaz(item.value, sv);
        };
        ltx = ltx.slice(1);
    }
    if (ltx == "")
        ltx = 0;
    if (!isNaN(Zv))
        koz = "\\approx" + Zv;
    ltx = "{\\zeta}_{" + n + "}" + cs + "{" + sltx + "}=" + ltx + koz;
    return ltx;
};

function kitoltH(n, ism, idfrom, idto) {
    const sv = kiszed_av(idfrom);
    const elemto = document.getElementById(idto);
    let ltx = "";
    if (sv == "vegtelenhiba" || sv == "hiba" || sv == undefined)
        return;
    else {
        ltx = Hltx(sv, n, ism);
        elemto.innerHTML = "\\[" + ltx + "\\]";
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
    }
};

function kitoltZ(n, ism, idfrom, idto) {
    const sv = kiszed_av(idfrom);
    const elemto = document.getElementById(idto);
    let ltx = "";
    if (sv == "vegtelenhiba" || sv == "hiba" || sv == undefined)
        return;
    else {
        ltx = zetaltx(sv, n, ism);
        elemto.innerHTML = "\\[" + ltx + "\\]";
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
    }
};

function HZszamitas() {
    const n = document.getElementById("n").value * 1;
    kitoltH(n, false, "sv", "H");
    kitoltH(n, true, "sv", "Hs");
    kitoltZ(n, false, "sv", "Z");
    kitoltZ(n, true, "sv", "Zs");
};

//PARI-val

function szamkiszedes() {
    const szam1 = document.querySelector("#ideout2 .sagecell_sessionOutput script[type='math/tex']").innerText.split("|")[1];
    var szam2 = document.querySelector("#ideout2 .sagecell_sessionOutput .mtext").innerText;
    if (isNaN(szam1 * 1))
        return szam2;
    else
        return szam1;
};

function zetaltxp(sv, n, ism) {
    var svtxt = sv;
    const r = sv.length;
    var maxN = maxZ[r];
    let cs = "";
    let cshtml = "";
    let koz = "";
    var outelem = document.querySelector("#ideout2 .sagecell_sessionOutput .mtext"); //NETEN EZ KELL
    if (ism)
        cshtml = "<sup>*</sup>"
    if (outelem) {

        var Zv = szamkiszedes();
        if (Zv.startsWith("gp")) {
            setfigy("A PARI / GP nem tudta a bemenetet kiszámítani.", "figyZ");
            return;
        }
    } else {
        setfigy("A konvergencia megjelenítése elött számitsa ki &zeta;" + cshtml + "(" + sv + ") pontos értékét a <span style='padding:0 5px;border:1px solid #777;border-radius:3px;'>PARI</span> gombra kattintva!", "figyZ");
        return;
    };

    var ooindx = svtxt.indexOf(oo);
    if (ooindx > -1)
        svtxt = oo2strInf(sv);
    const sltx = "(" + JSON.stringify(svtxt).replaceAll('"', '').slice(1, -1) + ")";
    if (r > 8) {
        figy = "Az s vektor hossza (" + r + ") meghaladja a maximalisan megengedett 8-at.";
        setfigy(figy, "figyZ");
        return;
    } else if (maxN < n) {
        var slid = document.getElementById("np");
        figy = " Egy " + r + " hosszú a vektor esetén N legnagyobb megengedett értéke: " + maxN + ". Mivel N beállított értéke (" + n + ") ezt meghaladta, ezért N értékét beállítottuk a maximálisan megengedett " + maxN + " értékre, és végig ezzel számoltunk.\n";
        n = maxN;
        setfigy(figy, "figyZ")
        slid.value = maxN;
        setn(slid, "np");
    };
    var Zvn = 1;
    if (ism) {
        cs = "^{*}";
        Zvn = Hez(sv, n);
    } else {
        Zvn = Haz(sv, n);
    };
    if (!isNaN(Zvn))
        koz = "\\approx" + Zvn;
    //plot
    var elemfn = document.querySelector("#fnpz");
    elemfn.style.display = "block";
    var fn = Zv.toString();
    var points = [];
    if (ism) {
        for (var i = 1; i < n + 1; i++) {
            points.push([i, Hez(sv, i)]);
        };
    } else {
        for (var i = 1; i < n + 1; i++) {
            points.push([i, Haz(sv, i)]);
        };
    };
    functionPlot({
        target: '#plotZ',
        title: "lim zeta",
        grid: true,
        yAxis: {
            domain: [-0.1 * Zv, Zv * 1.2]
        },
        xAxis: {
            domain: [-1, n]
        },
        data: [{
            fn: fn,
            graphType: 'polyline',
            color: 'red',
        }, {
            points: points,
            fnType: 'points',
            graphType: 'scatter',
            color: 'black',
        }]
    });
    document.querySelector('svg.function-plot text.title').setAttribute('x', 70);
    var rel = 100 * (Zv - Zvn) / Zv;
    rel = rel.toFixed(3)
    ltx = "{\\zeta}_{" + n + "}" + cs + "{" + sltx + "}" + koz + "\\hspace{5mm}( \\Delta = " + rel + "\\% )";
    return ltx;
};

function kitoltZp(n, ism, idfrom, idto) {
    const sv = kiszed_av(idfrom);
    const elemto = document.getElementById(idto);
    let ltx = "";
    if (sv == "vegtelenhiba" || sv == "hiba" || sv == undefined)
        return;
    else {
        ltx = zetaltxp(sv, n, ism);
        elemto.innerHTML = "\\[" + ltx + "\\]";
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
    }
};

function HZpariszamitas() {
    const n = document.getElementById("np").value * 1;
    document.getElementById("figyZ").style.display = "none";
    if (Zmode == "Z0")
        kitoltZp(n, false, "sv2", "Zp");
    else
        kitoltZp(n, true, "sv2", "Zp");
};

function sumHez(sv, p, N) {
    let sv2 = sv.slice(1);
    let psv = [p, ...sv];
    let psv2 = [sv[0] + p, ...sv2];
    let s1p = [sv[0], p];
    let jo = Hez(psv, N) + Hez(sv2, N) * Hez(s1p, N) - Hez(psv2, N) - Hez([p], N) * Hez(sv, N);
    let sum = 0;
    for (var j = 1; j < N + 1; j++) {
        sum += He(sv2, j) * Hez(s1p, j - 1);
    };
    return [sum, jo];
};


///////

function str2arr(str) {
    if (str.indexOf('"') > -1)
        return str;
    str = str.replaceAll('+', ',').replaceAll('-', ',-');
    if (str.startsWith(','))
        str = str.slice(1);
    str = "[" + str + "]"
    var v = JSON.parse(str);
    return _.sum(v);
}

function commaIndxs(str) {
    let regexp = /,/g;
    let matches = [...str.matchAll(regexp)];
    let indx = [];
    matches.forEach((match) => {
        indx.push(match.index);
    });
    return indx;
};

function replaceAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
};

function kicserel(str, indx) {
    let k = indx.length;
    for (var i = 0; i < k; i++) {
        str = replaceAt(str, indx[i], '+')
    };
    return str.replaceAll("+-", "-");
};

function comma2plusk(str, k) {
    let w = [];
    if (k == 0) {
        w = JSON.parse("[" + str + "]");
        return [
            [
                [str], w
            ]
        ];
    }
    let indx = commaIndxs(str);
    const c = new YourCombinations(indx);
    let cb = c.combinations(k, false);
    while (true) {
        const item = cb.next();
        if (item.done) break;
        var tt = kicserel(str, item.value).split(',');
        var t0 = tt.map(function(y) {
            if (y.indexOf('"oo"') > -1) return y.replaceAll("'\"oo\"'", 'oo').replaceAll("-'", "&#8722;");
            else return y
        });
        var ts = tt.map(function(y) {
            if (y.indexOf('"oo"') > -1) return "oo";
            else return y
        });
        var t1 = ts.map(function(z) {
            if (z != "oo") return str2arr(z);
            else return z
        });
        w.push([t0, t1]);
    };
    return w;
};

function setHreszletes(elem) {
    Hreszletes = elem.checked;
    azonHecmplusHa();
    return;
};

function showMathout(elem) {
    showmathout = elem.checked;
    var elem = document.getElementById("keplet_math");
    if (showmathout) {
        elem.style.display = "block";
        urites();
    } else
        elem.style.display = "none";
};

function comma2plusHe(str, n) {
    str = str.replaceAll("oo", "\"oo\"");
    let sv = [];
    let s = 0;
    let he = 0;
    let fejHe = "H<sub><small>" + n + "</small></sub><sup><small>*(" + str.replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup> "
    let fejHa = "";
    try {
        sv = JSON.parse("[" + str + "]");
        let ns = sv.length;
        let w = [];
        for (var k = 0; k < Math.max(1, ns); k++) {
            w = comma2plusk(str, k);
            for (let j of w) {
                s += Ha(oostr2Inf(j[1]), n)
                if (Hreszletes)
                    fejHa += "H<sub><small>" + n + "</small></sub><sup><small> (" + JSON.stringify(j).slice(1, -1).replaceAll("],[", "=</span>").replaceAll(']', '</b>').replaceAll('[', '<span class=\"hr\">').replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>+";
                else
                    fejHa += "H<sub><small>" + n + "</small></sub><sup><small> (" + JSON.stringify(j[1]).slice(1, -1).replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>+";
            }
        };
        fejHa = fejHa.slice(0, -1);
        he = He(oostr2Inf(sv), n)
    } catch (error) {
        setfigy("Hibás bemenet!", "figyHacom");
        return "hiba";
    };
    if (!isNaN(he))
        fejHe += " = " + he;
    if (!isNaN(s))
        fejHa += " = " + s;
    return fejHe + "<hr style='opacity: 0.5;border-style: dashed;'>" + fejHa;
};

function comma2plusHez(str, n) {
    str = str.replaceAll("oo", "\"oo\"");
    let sv = [];
    let s = 0;
    let he = 0;
    let fejHe = "&zeta;<sub><small>" + n + "</small></sub><sup><small>*(" + str.replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup> "
    let fejHa = "";
    try {
        sv = JSON.parse("[" + str + "]");
        let ns = sv.length;
        let w = [];
        for (var k = 0; k < Math.max(1, ns); k++) {
            w = comma2plusk(str, k);
            for (let j of w) {
                s += Haz(oostr2Inf(j[1]), n)
                if (Hreszletes)
                    fejHa += "&zeta;<sub><small>" + n + "</small></sub><sup><small> (" + JSON.stringify(j).slice(1, -1).replaceAll("],[", "=</span>").replaceAll(']', '</b>').replaceAll('[', '<span class=\"hr\">').replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>+";
                else
                    fejHa += "&zeta;<sub><small>" + n + "</small></sub><sup><small> (" + JSON.stringify(j[1]).slice(1, -1).replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>+";
            }
        };
        fejHa = fejHa.slice(0, -1);
        he = Hez(oostr2Inf(sv), n)
    } catch (error) {
        setfigy("Hibás bemenet!", "figyHacom");
        return "hiba";
    };
    if (!isNaN(he))
        fejHe += " = " + he;
    if (!isNaN(s))
        fejHa += " = " + s;
    return fejHe + "<hr style='opacity: 0.5;border-style: dashed;'>" + fejHa;
};

function comma2plusHa(str, n) {
    str = str.replaceAll("oo", "\"oo\"");
    let sv = [];
    let s = 0;
    let ha = 0;
    let fejHa = "H<sub><small>" + n + "</small></sub><sup><small> (" + str.replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>"
    let fejHe = "";
    try {
        sv = JSON.parse("[" + str + "]");
        let ns = sv.length;
        let w = [];
        for (var k = 0; k < Math.max(1, ns); k++) {
            if ((ns - k) % 2 == 1)
                elojel = "&#8722;";
            else
                elojel = " + ";
            w = comma2plusk(str, k);
            for (let j of w) {
                s += Math.pow(-1, k) * He(oostr2Inf(j[1]), n)
                if (Hreszletes)
                    fejHe += elojel + "H<sub><small>" + n + "</small></sub><sup><small>*(" + JSON.stringify(j).slice(1, -1).replaceAll("],[", "=</span>").replaceAll(']', '</b>').replaceAll('[', '<span class=\"hr\">').replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>";
                else
                    fejHe += elojel + "H<sub><small>" + n + "</small></sub><sup><small>*(" + JSON.stringify(j[1]).slice(1, -1).replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>";
            }
        };
        if (fejHe.startsWith(" +"))
            fejHe = fejHe.slice(3);
        ha = Ha(oostr2Inf(sv), n)
    } catch (error) {
        setfigy("Hibás bemenet!", "figyHacom");
        return "hiba";
    };
    if (!isNaN(ha))
        fejHa += " = " + ha;
    if (!isNaN(s))
        fejHe += " = " + s;
    return fejHa + "<hr style='opacity: 0.5;border-style: dashed;'>" + fejHe;
};

function comma2plusHaz(str, n) {
    str = str.replaceAll("oo", "\"oo\"");
    let sv = [];
    let s = 0;
    let ha = 0;
    let fejHa = "&zeta;<sub><small>" + n + "</small></sub><sup><small> (" + str.replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup> "
    let fejHe = "";
    try {
        sv = JSON.parse("[" + str + "]");
        let ns = sv.length;
        let w = [];
        let elojel = " + ";
        for (var k = 0; k < Math.max(1, ns); k++) {
            if ((ns - k) % 2 == 1)
                elojel = "&#8722;";
            else
                elojel = " + ";
            w = comma2plusk(str, k);
            for (let j of w) {
                s += Math.pow(-1, k) * Hez(oostr2Inf(j[1]), n)
                if (Hreszletes)
                    fejHe += elojel + "&zeta;<sub><small>" + n + "</small></sub><sup><small>*(" + JSON.stringify(j).slice(1, -1).replaceAll("],[", "=</span>").replaceAll(']', '</b>').replaceAll('[', '<span class=\"hr\">').replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>";
                else
                    fejHe += elojel + "&zeta;<sub><small>" + n + "</small></sub><sup><small>*(" + JSON.stringify(j[1]).slice(1, -1).replace(/[\\"\\\\"]/g, '').replaceAll("oo", "∞") + ")</small></sup>";
            }
        };
        if (fejHe.startsWith(" +"))
            fejHe = fejHe.slice(3);
        ha = Haz(oostr2Inf(sv), n)
    } catch (error) {
        setfigy("Hibás bemenet!", "figyHacom");
        return "hiba";
    };
    if (!isNaN(ha))
        fejHa += " = " + ha;
    if (!isNaN(s))
        fejHe += " = " + s;
    return fejHa + "<hr style='opacity: 0.5;border-style: dashed;'>" + fejHe;
};

function azonHecmplusHa() {
    document.getElementById("figyHacom").style.display = "none";
    let str = document.getElementById("sv1").value;
    let n = document.getElementById("n1").value * 1;
    var outelem = document.getElementById("Hacom");
    var out = "";
    if (pat.test(str)) {
        setfigy("Valamelyik ∞ jel hibás!", "figyHacom")
        outelem.innerHTML = "Valamelyik ∞ jel hibás: " + '<span class="outhiba">' + str + '</span>';
        return;
    };
    if (Hmode == "H")
        out = comma2plusHa(str, n);
    else if (Hmode == "Hs")
        out = comma2plusHe(str, n);
    else if (Hmode == "Z")
        out = comma2plusHaz(str, n);
    else if (Hmode == "Zs")
        out = comma2plusHez(str, n);
    else
        out = "?";
    if (out == "hiba") {
        out = "Hibás bemenet: " + '<span class="outhiba">' + str + '</span>';
        setfigy("Hibás bemenet!", "figyHacom");
    };
    document.getElementById("Hacom").innerHTML = out;
};

// duality of He 

function ragasztVV(a, b) {
    const na = a.length;
    const nb = b.length;
    let c = Array(na + nb - 1);
    for (var i = 0; i < na; i++) {
        c[i] = a[i];
    };
    c[na - 1] = a[na - 1] + b[0]
    for (var i = na; i < na + nb - 1; i++) {
        c[i] = b[i - na];
    };
    return c;
};

function ragasztVn(a, n) {
    const na = a.length;
    let c = Array(na + n - 1);
    for (var i = 0; i < na; i++) {
        c[i] = a[i];
    };
    c[na - 1] = a[na - 1] + 1
    for (var i = na; i < na + n - 1; i++) {
        c[i] = 1;
    };
    return c;
};

function conjugate(v) {
    const n = v.length;
    let c = Array(v[0]).fill(1);
    for (i = 1; i < n; i++) {
        c = ragasztVn(c, v[i]);
    }
    return c;
};

function dualityHe(s, n) {
    var sum = 0;
    for (i = 1; i < n + 1; i++) {
        sum += Math.pow(-1, i) * binomial(n - 1, i - 1) * He(s, i);
    }
    sum = -sum;
    let sconj = conjugate(s);
    let jo = He(sconj, n);
    return [sum, jo];
};

function cdualityHe(s, n) {
    var sum = 0;
    let sconj = conjugate(s);
    for (i = 1; i < n + 1; i++) {
        sum += Math.pow(-1, i) * binomial(n - 1, i - 1) * He(sconj, i);
    }
    sum = -sum;
    let jo = He(s, n);
    return [sum, jo];
};

function DClear(kell) {
    var elem = document.querySelector("#D");
    var elemfigy = document.querySelector("#figyD");
    elem.innerText = "";
    if (kell)
        elemfigy.style.display = "none";
};

function dualOfHe() {
    var elemfigy = document.getElementById("figyD");
    elemfigy.style.display = "none";
    var elem = document.getElementById("D");
    var av = document.getElementById("sd").value;
    var n = document.getElementById("nd").value * 1;
    var txt = "";
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "figyD");
        DClear(false);
        return;
    };

    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    var av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        var aindx = av.indexOf(oo);
        if (aindx > -1) {
            setfigy("A bemenet nem tartalmazhat ∞ jelet :", "figyD");
            DClear(false);
            return;
        };

        var ov = cdualityHe(av, n);
        var cav = conjugate(av);
        txt = "(" + av + ")^{*} = " + "(" + cav + ")\\\\[5mm]" + ov[1] + "={\\rm H}_{" + n + "}^{*(" + cav + ")} \\hspace{" + n + "mm}=\\hspace{2mm}-\\sum_{k=1}^{" + n + "}{\\rm (-1)}^{k}\\binom{" + (n - 1) + "}{k-1}{\\rm H}_{k}^{*(" + av + ")}\\hspace{2mm}=\\hspace{2mm}" + ov[0];
        elem.innerHTML = "\\[" + txt + "\\]";
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);

    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figyD");
        DClear(false);
        return;
    };
}


// genpolylog 

function genClear() {
    if (showgenmathout) {
        const elemmath = document.getElementById("gen_math");
        elemmath.innerText = "";
    } else {
        const elemhtml = document.getElementById("genout");
        elemhtml.innerHTML = "";
    }
};

function seriesgenClear() {
    var elemfigy = document.querySelector("#figygen");
    elemfigy.style.display = "none";
};

function setgenOutputFont(v) {
    if (showgenmathout) {
        var elem = document.getElementById("gen_math");
        elem.style.fontSize = v + '%';
        setTimeout(() => {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
        }, 100);
    } else {
        var elem = document.getElementById("genout");
        elem.style.fontSize = v + '%';
    }
};

function agSumRefresh() {
    var av = document.getElementById("avg").value;
    var asv = "";

    if (av.indexOf('oo') > -1) {
        asv = "∞";
        document.getElementById("asg").innerText = asv;
        setgenKeplet();
        return;
    } else {
        if (!av.startsWith("[")) {
            av = "[" + av;
        };
        if (!av.endsWith("]")) {
            av = av + "]";
        };

        try {
            av = JSON.parse(av);
            asv = av.reduce((x, y) => Math.abs(x) + Math.abs(y), 0);
            document.getElementById("asg").innerText = asv;
            setKeplet();
        } catch {}
    };
};

function bgSumRefresh() {
    var bv = document.getElementById("bvg").value;
    var bsv = "";
    if (bv.indexOf('oo') > -1) {
        bsv = "∞";
        document.getElementById("bsg").innerText = bsv;
        setgenKeplet();
        return;
    } else {
        if (!bv.startsWith("[")) {
            bv = "[" + bv;
        };
        if (!bv.endsWith("]")) {
            bv = bv + "]";
        };
        try {
            bv = JSON.parse(bv);
            bsv = bv.reduce((x, y) => Math.abs(x) + Math.abs(y), 0);
            document.getElementById("bsg").innerText = bsv;
            setKeplet();
        } catch {}
    };
};

function setgenKeplet0() {
    var a = document.querySelector("#avg").value;
    var b = document.querySelector("#bvg").value;
    var na = a.length;
    var nb = b.length;
    a = a.replaceAll("oo", "∞");
    b = b.replaceAll("oo", "∞");
    var tort = "x";
    if (narg)
        tort = "1-x";
    var arg_a = "x";
    var arg_b = "x";
    if (aarg)
        arg_a = "1-x";
    if (barg)
        arg_b = "1-x";

    totr = "1-x";
    var txt = "";
    var txt1 = "";
    var txt2 = "";
    var szorzat = "\\cdot";
    if (na * nb == 0)
        szorzat = "";
    if (na > 0)
        txt1 = "{\\rm " + amode + "}_{(" + a + ")}(" + arg_a + ")";
    if (nb > 0)
        txt2 = "{\\rm " + bmode + "}_{(" + b + ")}(" + arg_b + ")";
    txt = "\\int \\dfrac{" + txt1 + szorzat + txt2 + "}{" + tort + "}\\,{\\text{d} x}"
    txt += "\\hspace{2cm}\\begin{bmatrix}" + fltx[fazis.init.name] + " &" + fltx[fazis.std.name] + "\\\\" + fltx[fazis.atv.name] + " &" + fltx[fazis.veg.name] + "\\end{bmatrix}";
    return txt;
};

function setgenKeplet() {
    const elem = document.querySelector("#k1set");
    const txt = setgenKeplet0();
    elem.style.visibility = "hidden";
    elem.innerText = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    setTimeout(() => {
        elem.style.visibility = "visible";
    }, 200);
    cJClear();
};

function setaMode(elem) {
    var ckd = elem.checked;
    if (ckd)
        amode = "Le";
    else
        amode = "Li";
    setFazis();
    setgenKeplet();
};

function setbMode(elem) {
    var ckd = elem.checked;
    if (ckd)
        bmode = "Le";
    else
        bmode = "Li";
    setFazis();
    setgenKeplet();
};

function setnArg(elem) {
    narg = elem.checked;
    if (narg)
        nargtxt = "1-x";
    else
        nargtxt = "x";
    setFazis();
    setgenKeplet();
};

function setaArg(elem) {
    aarg = elem.checked;
    if (aarg)
        aargtxt = "1-x";
    else
        aargtxt = "x";
    setFazis();
    setgenKeplet();
};

function setbArg(elem) {
    barg = elem.checked;
    if (barg)
        bargtxt = "1-x";
    else
        bargtxt = "x";
    setFazis();
    setgenKeplet();
};

function tukrozes() {
    document.getElementById("setnarg").click();
    document.getElementById("setaarg").click();
    document.getElementById("setbarg").click();
    setTimeout(() => { genoutput(); }, 300);
};

function pozValtas() {
    var a = document.getElementById("avg");
    var b = document.getElementById("bvg");
    var al = document.getElementById("avgl");
    var bl = document.getElementById("bvgl");
    a.id = "bvg";
    b.id = "avg";
    al.id = "bvgl";
    bl.id = "avgl";
    al.innerText = "b";
    bl.innerText = "a";
    if (al.classList.contains("kiur")) {
        al.classList.remove("kiur");
        bl.classList.add("kiur");
    } else {
        bl.classList.remove("kiur");
        al.classList.add("kiur");
    }
    setTimeout(() => { genoutput(); }, 300);
};

function setgenOut(elem) {
    showgenmathout = elem.checked;
    const elemmath = document.querySelector("#gen_math");
    const elemhtml = document.querySelector("#genout");
    if (showgenmathout) {
        elemhtml.innerHTML = "";
        elemhtml.style.display = "none";
        elemmath.style.display = "block";
    } else {
        elemmath.innerText = "";
        elemhtml.style.display = "block";
        elemmath.style.display = "none";
    };
};

function setMathoutmode(elem) {
    mathoutformat = elem.checked;
};

setoutMaxsor = function() {
    var mr = document.getElementById("setgenmaxsor").value;
    genmaxsor = mr * 1;
    genClear();
};

function setReduced(elem) {
    reducedv = elem.checked;
    cJClear();
};

function setInsertOnSelect(elem) {
    insertonselect = elem.checked;
};

// lepesek

function novel(a) {
    var out = _.cloneDeep(a);
    out[0] = out[0] + 1;
    return out;
};

function bovit(a) {
    var out = _.cloneDeep(a);
    out = [1, ...a];
    return out;
};

function minus(a) {
    var out = _.cloneDeep(a);
    out = _.dropRight(a);
    out = [...out, -1 * _.last(a)];
    return out;
};

function bov(B) {
    return B.map(y => bovit(y));
};

function nov(B) {
    return B.map(y => novel(y));
};

function mbov(B) {
    return B.map(y => minus(bovit(y)));
};

function mnov(B) {
    return B.map(y => minus(novel(y)));
};

function bovnov(B) {
    return [...bov(B), ...nov(B)];
};

function mbovnov(B) {
    return [...mbov(B), ...nov(B)];
};

function bovmnov(B) {
    return [...bov(B), ...mnov(B)];
};

function mbovmnov(B) {
    return [...mbov(B), ...mnov(B)];
};

function bb1() {
    return "bb1";
};

function bb2() {
    return "bb2";
};

function setInit() {
    var fn = nov;
    if (bmode == "Li") {
        if (narg && barg) {
            fn = mnov;
        } else if (narg && !barg) {
            fn = bov;
        } else if (!narg && barg) {
            fn = mbov;
        }
    } else if (bmode == "Le") {
        if (narg && barg) {
            fn = mnov;
        } else if (narg && !barg) {
            fn = bovmnov;
        } else if (!narg && barg) {
            fn = mbovnov;
        }
    };
    return fn;
};

function setStd() {
    var fn = nov;
    if (aarg !== barg) {
        if (bmode == "Li") {
            fn = mbov;
        } else
            fn = mbovnov;
    }
    return fn;
};

function setAtv() {
    var fn = mnov;
    if (amode == "Li") {
        if (aarg == barg) {
            if (bmode == "Li")
                fn = bov;
            else
                fn = bovmnov;
        };
    } else {
        if (bmode == "Li") {
            if (aarg == barg)
                fn = bovnov;
            else
                fn = mbovmnov;
        } else {
            if (aarg == barg)
                fn = bov;
            else
                fn = mbov;
        }
    }
    return fn;
};

function setVeg() {
    var fn = mnov;
    if (aarg == barg) {
        if (bmode == "Li")
            fn = bov;
        else
            fn = bovmnov;
    };
    return fn;
};

function setFazis() {
    fazis.init = setInit();
    fazis.std = setStd();
    fazis.atv = setAtv();
    fazis.veg = setVeg();
};

function kiszed_v(id) {
    var av = document.getElementById(id).value;
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "figygen");
        genClear();
        return;
    };

    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        var indx = av.indexOf(oo);
        if (id == "avg" && av.some(v => v <= 0)) {
            setfigy("Az <b>a</b> indexvektor most csak pozitív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figygen");
            genClear();
            return;
        } else if (id == "avg" && indx > -1) {
            av = oo2strInf(av);
            setfigy("A kiüritendő <b>a</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figygen");
            genClear();
            return;
        } else if (id == "bvg" && av.length == 0 && document.getElementById("avg").value.trim() !== "") {
            setfigy("A <b>b</b> indexvektor nem lrhet üres! " + '<span class="outhiba"> <b>b</b> = ( )</span> <br/>Ha a <b>b</b> indexvektor helyett az <b>a</b> indexvektort választja üresnek, és az <b>a</b> indexvektort jelenlegi értékét a <b>b</b> helyébe írja, akkor egy a jelenlegivel ekvivalens feladatot kap.', "figygen");
            genClear();
            return;
        }
        if (id == "bvg" && indx > -1)
            av = oo2Inf(av);

    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figygen");
        genClear();
        return;
    };
    return av;
};

var BSOR = [];
var ASOR = [];
var AFAZIS = [];

function aSor() {
    ASOR = [];
    const a = kiszed_v("avg");
    if (a == undefined)
        return [];
    const n = a.length;
    ASOR.push(a);
    for (var i = 0; i < n; i++) {
        var aa = _.drop(a, i);
        var t = aa[0];
        var v = _.drop(aa);
        for (var j = 0; j < t; j++) {
            ASOR.push([aa[0] - j, ...v]);
        };
    };
    ASOR.push([]);

    return ASOR;
};

function kum(v) {
    var k = [];
    var sum = 0;
    for (let j of v) {
        sum += j;
        k.push(sum);
    }
    return k;
};

function aFazis() {
    AFAZIS = [];
    const a = kiszed_v("avg");
    if (a == undefined)
        return;
    AFAZIS = ["init"];
    if (a.length > 0) {
        const k = kum(a);
        const n = _.last(k);
        for (var j = 1; j < n + 1; j++) {
            if (_.includes(k, j))
                AFAZIS.push("atv");
            else
                AFAZIS.push("std");
        };
        AFAZIS = _.dropRight(AFAZIS);
        AFAZIS.push("veg");
    }
    return AFAZIS;
};

function bSor() {
    BSOR = [];
    const L = aFazis();
    if (L == undefined)
        return [];
    var b = kiszed_v("bvg");
    if (b == undefined)
        return [];
    BSOR.push([
        [...b, 1]
    ]);
    for (let i of L) {
        var fn = fazis[i];
        BSOR.push(fn(_.last(BSOR)));;
    };
    return BSOR;
};

function genmeret() {
    var m = AFAZIS.map(function(y) { if (fazis[y].name.length > 4) { return 2 } else { return 1 } });
    var d = 0;
    var p = 1;
    for (let j of m) {
        p *= j;
        d += p;
    };
    return d;
};

function formazb(b) {
    return elojele(_.last(b)) + "\\left(" + _.dropRight(b) + "\\right)";
};

function abltx(i) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    var ltx = "\\begin{array}[t]{l}" + elojele(Math.pow(-1, i)) + "\\left(" + a + "\\right)\\\\ \\hline";
    for (var j = 0; j < n; j++) {
        ltx += formazb(b[j]) + "\\\\";
    }
    ltx = ltx.slice(0, -2);
    ltx += "\\end{array}";
    return ltx;
};

function genltx() {
    const n = BSOR.length - 1;
    var ltx = "\\begin{array}[t]{c|l}\\text{" + amode + "}_{" + "a}(" + aargtxt + ") & \\left(" + ASOR[0] + "\\right) \\\\ \\hline\\text{" + bmode + "}_{" + "b}(" + bargtxt + ") & \\left(" + _.dropRight(BSOR[0][0]) + "\\right)\\end{array}\\overset{\\text{" + AFAZIS[0] + "}}{\\rightarrow}";
    for (var i = 0; i < n; i++) {
        ltx += abltx(i);
        if (i < n - 1)
            ltx += "\\overset{\\text{" + AFAZIS[i + 1] + "}}{\\rightarrow}"
    };
    ltx = ltx.replaceAll('Infinity', '∞');
    return ltx;
};

function formazbfgv(b, j) {
    var e = elojele(_.last(b))
    if (j == 0 && e == " + ")
        e = "";
    return e + "\\text{" + bmode + "}_{\\left(" + _.dropRight(b) + "\\right)}(" + bargtxt + ")";
};

function abltxfgv(i) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    if (n > 1) {
        var ltx = elojele(Math.pow(-1, i)) + "\\text{" + amode + "}_{\\left(" + a + "\\right)}(" + aargtxt + ")\\cdot\\left[";
        for (var j = 0; j < n; j++) {
            ltx += formazbfgv(b[j], j);
        }
        ltx += "\\right]";
    } else {
        var e = elojele(Math.pow(-1, i) * _.last(b[0]));
        if (i == 0 && e == " + ")
            e = "";
        var ltx = e + "\\text{" + amode + "}_{\\left(" + a + "\\right)}(" + aargtxt + ")\\cdot\\text{" + bmode + "}_{\\left(" + _.dropRight(b[0]) + "\\right)}(" + bargtxt + ")";
    }
    return ltx;
};

function genltxfgv() {
    const n = BSOR.length - 1;
    var ltx = "\\int\\dfrac{\\text{" + amode + "}_{\\left(" + ASOR[0] + "\\right)}(" + aargtxt + ")\\cdot\\text{" + bmode + "}_{\\left(" + _.dropRight(BSOR[0][0]) + "\\right)}(" + bargtxt + ")}{" + nargtxt + "}\\,\\text{d}x =";
    for (var i = 0; i < n; i++) {
        ltx += abltxfgv(i);
    };
    ltx = ltx.replaceAll('Infinity', '∞');
    return ltx;
};


function formazbhtml(b) {
    return "<tr><td class='bsor'>" + elojele(_.last(b)) + "(" + _.dropRight(b) + ")</td></tr>";
};

function formazbhtmlsep(b) {
    return "<tr><td class='bsor sep'>" + elojele(_.last(b)) + "(" + _.dropRight(b) + ")</td></tr>";
};

function abhtml(i) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    const n1 = BSOR[i].length || 0;
    var ltx = "<table class='genout-sor'><tr><td class='asor' style='border-bottom:1px solid #777;'>" + elojele(Math.pow(-1, i)) + "(" + a + ")</td></tr>";
    for (var j = 0; j < n; j++) {
        if (n != n1) {
            if (j == (n / 2 - 1))
                ltx += formazbhtmlsep(b[j]);
            else
                ltx += formazbhtml(b[j]);
        } else {
            ltx += formazbhtml(b[j]);
        }
    }
    ltx += "</table>";
    return ltx;
};

function genhtml() {
    const n = BSOR.length - 1;
    var ltx = "<div class='meret'>Az integrál <b>" + genmeret() + "</b> általánosított polilogaritmus függvény szorzatösszege:</div><table class='genout-fej'><tr><td style='border-bottom:1px solid #449bd1;;border-right:1px solid #449bd1;'>" + amode + "<sub>a</sub>(" + aargtxt + ")</td><td style='border-bottom:1px solid #449bd1;'>(" + ASOR[0] + ")</td></tr><tr><td style='border-right:1px solid #449bd1;'>" + bmode + "<sub>b</sub>(" + bargtxt + ")</td><td>(" + _.dropRight(BSOR[0][0]) + ")</td></tr></table><table class='genout-nyil'><tr><td>" + AFAZIS[0] + "</td></tr><tr><td>&rarr;</td></tr></table>";
    for (var i = 0; i < n; i++) {
        ltx += abhtml(i);
        if (i < n - 1)
            ltx += "<table class='genout-nyil'><tr><td>" + AFAZIS[i + 1] + "</td></tr><tr><td>&rarr;</td></tr></table>"
    };
    ltx = ltx.replaceAll('Infinity', '∞');
    return ltx;
};


function genoutput() {
    const elemfigy = document.getElementById("figygen");
    elemfigy.style.display = "none";
    const ures = document.getElementById("avg").value.trim() + document.getElementById("bvg").value.trim() == "";
    if (ures) {
        setfigy("Mind a két indexvektor nem lehet üres!", "figygen");
        genClear();
        return;
    }
    var txt = "HIBA";
    aSor();
    bSor();
    if (showgenmathout) {
        const me = genmeret();
        if (me > genmaxsor) {
            setfigy("A feladat mérete " + me + " meghaladja a megengedett " + genmaxsor + "-at/et!", "figygen");
            return;
        };
        if (AFAZIS.length * BSOR.length * ASOR.length > 0)
            if (mathoutformat)
                txt = genltxfgv();
            else
                txt = genltx();
        const elem = document.querySelector("#gen_math");
        elem.innerText = "\\[" + txt + "\\]";
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);

    } else {
        if (AFAZIS.length * BSOR.length * ASOR.length > 0)
            txt = genhtml();
        const elem = document.querySelector("#genout");
        elem.innerHTML = txt;
    }
};
if (console.log(document.title != "Explicit formula"))
    $(document).on('selectionchange', function() {
        if (insertonselect) {
            const foo = document.querySelector('p#genout')
            var isin = window.getSelection().containsNode(foo, true);
            var selection = window.getSelection().toString();
            if (isin) {
                var cl = getElementsInSelection()
                if (cl[0] == "asor")
                    $("#avg").val(selection).trigger('input');
                else if (cl[0] == "bsor")
                    $("#bvg").val(selection).trigger('input');
                else
                    return;
            }
        } else
            return;
    });

$(document).on('mouseup', '#genout tr td.asor,#genout tr td.bsor', function() {
    if (insertonselect) {
        const foo = document.querySelector('p#genout')
        var isin = window.getSelection().containsNode(foo, true);
        if (isin) {
            var cl = getElementsInSelection();
            if (cl[0] == "asor")
                $("#avg").trigger('focus');
            else if (cl[0] == "bsor")
                $("#bvg").trigger('focus');
            else
                return;
        }
    } else
        return;
});

function getElementsInSelection() {
    let selection = window.getSelection();
    if (!selection.rangeCount) return [];
    let elements = [];
    document.querySelectorAll('*').forEach(node => {
        if (selection.containsNode(node, true)) elements.push(node);
    });
    if (elements)
        if (_.last(elements).classList)
            return _.last(elements).classList;
        else
            return;
    else
        return;
};
// SHUFFLE PRODUCT

function shClear() {
    const elem = document.getElementById("shout");
    elem.innerHTML = "";
};

function out3Clear() {
    const elem = document.querySelector("#ideout3 .sagecell_output_elements div");
    if (elem)
        elem.innerHTML = "";
};

function out4Clear() {
    const elem = document.querySelector("#ideout4 .sagecell_output_elements pre");
    if (elem)
        elem.innerHTML = "";
};

function sagetransfClear() {
    const elem = document.getElementById("sagetransf");
    elem.innerHTML = "";
};

function idClear(id) {
    const elem = document.querySelector(id);
    elem.innerHTML = "";
};

function composition(n, callback) {
    for (var i = 1; i < n; i++) {
        composition(n - i, function(ret) {
            ret.push(i);
            callback(ret);
        });
    }
    callback([n]);
};

//https://stackoverflow.com/questions/15577651/generate-all-compositions-of-an-integer-into-k-parts
// translated from C++ code 

function get_first_weak_composition(n, k, composition) {
    /* if (n < k) {
        return false;
    } */
    for (var i = 0; i < k - 1; i++) {
        composition[i] = 0;
    }
    composition[k - 1] = n;
    return true;
};

function get_next_weak_composition(n, k, composition) {
    if (composition[0] == n) {
        return false;
    }

    var last = k - 1;
    while (composition[last] == 0) {
        last--;
    }

    var z = composition[last];
    composition[last - 1] += 1;
    composition[last] = 0;
    composition[k - 1] = z - 1;
    return true;
}

function display_composition(base, composition) {
    base.push([...composition]);
};

function comp0(n, k) {
    allcomp0 = [];
    if (k == 0)
        allcomp0 = []
    else {
        var composition = [];
        for (var exists = get_first_weak_composition(n, k, composition); exists; exists = get_next_weak_composition(n, k, composition)) {
            display_composition(allcomp0, composition);
        };
    }
    return allcomp0;
};

//////////////////////

function kozte(v, a, f) {
    var k = true;
    const n = v.length;
    for (var i = 0; i < n; i++) {
        k = k && (a[i] - 1 < v[i]) && v[i] < (f[i] + 1);
        if (!k)
            return k;
    }
    return k;
}

function compaf(n, k, a, f) {
    var all = comp0(n, k);
    all = all.filter(y => kozte(y, a, f));
    return all;
}

////////////////

function Choose(n, k) {
    var w = [];
    let cb = Combnr(n, k, false);
    while (true) {
        const item = cb.next();
        if (item.done) break;
        w.push([...item.value]);
    };
    return w;
};

var a_sor = [];
var b_sor = [];
var c_sor = [];
var sumab = 0;
var it = [];
var nnn = 0;
var kk = 0;

function komb(n, J, a) {
    if (a === undefined) a = 1;
    var na, nb, c, k, inc, inc1;
    c = 1;
    k = 0;
    na = 0;
    nb = 0;
    for (var j = 1; j < n + 1 && c > 0; j++) {
        inc = _.includes(J, j);
        inc1 = _.includes(J, j - 1);
        if (inc) {
            na += 1;
            k = k + c_sor[j - 1] - a_sor[na - 1];
        } else {
            nb += 1;
            k = k + c_sor[j - 1] - b_sor[nb - 1];
        };
        if (j == 1) {
            if (inc)
                c = c * binomial(c_sor[0], a_sor[0]);
            else
                c = c * binomial(c_sor[0], b_sor[0]);
        } else if (inc && inc1) {
            c = c * binomial(c_sor[j - 1], a_sor[na - 1]);
        } else if (!inc && !inc1) {
            c = c * binomial(c_sor[j - 1], b_sor[nb - 1]);
        } else
            c = c * binomial(c_sor[j - 1], k);
    };
    return a * c;
};

function cegyutth() {
    var sum = 0;
    for (let y of it) {
        sum += komb(nnn, y);
    }
    if (sum == 0)
        sum = "";
    else if (sum == 1)
        sum = "(" + c_sor.toString() + ") + ";
    else
        sum += "&lowast;(" + c_sor.toString() + ") + ";
    return sum;
};

var javitas = 1;

function eshuff() {
    const maxa = _.max(a_sor);
    const maxb = _.max(b_sor);
    const maxab = maxa + maxb + 1;
    var cek = comp0(sumab, nnn);
    var n1 = cek.length;
    cek = cek.filter(y => y.every(v => v < maxab));
    var n2 = cek.length;
    javitas = (n1 / n2).toFixed(2);
    var LL = "";

    for (let c of cek) {
        c_sor = c;
        LL += cegyutth();
    }
    return LL;
};

function kiszed_sh(id) {
    var av = document.getElementById(id).value;
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "figysh");
        shClear();
        return;
    };

    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        var indx = av.indexOf(oo);
        if (reducedv && av.some(v => v < 1)) {
            setfigy("Az <b>a</b>, illetve <b>b</b>  indexvektor csak pozitív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figysh");
            shClear();
            return;
        };
        if (av.some(v => v < 0)) {
            setfigy("Az <b>a</b>, illetve <b>b</b>  indexvektor csak nem negatív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figysh");
            shClear();
            return;
        } else if (indx > -1) {
            av = oo2strInf(av);
            setfigy("'Shuffle-product'-ban egyik indexvektor sem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figysh");
            shClear();
            return;
        }
        if (id == "bvg" && indx > -1)
            av = oo2Inf(av);

    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figysh");
        shClear();
        return;
    };
    return av;
};


function calc_sh() {
    const elem1 = document.getElementById("figysh");
    elem1.innerHTML = "";
    const elem = document.getElementById("shout");
    a_sor = kiszed_sh("avg");
    b_sor = kiszed_sh("bvg");
    if (reducedv && a_sor !== undefined && b_sor != undefined) {
        a_sor = a_sor.map(y => y - 1);
        b_sor = b_sor.map(y => y - 1);
    }
    var sh, meret;
    if (a_sor == undefined || b_sor == undefined)
        sh = "HIBA";
    else if (a_sor.length + b_sor.length == 0)
        sh = "( )&#x29E2;( ) = ( )";
    else if (a_sor.length == 0)
        sh = "( )&#x29E2;(" + b_sor + ") = (" + b_sor + " )";
    else {
        sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
        kk = a_sor.length;
        nnn = kk + b_sor.length;
        meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
        if (meret < 150000000) {
            it = Choose(nnn, kk);
            sh = eshuff();
            if (sh == "")
                sh = "Nem megfelelő bemenet"
            else {
                sh = "(" + a_sor.toString() + ") <span style='font-size:28px;'>&#x29E2;</span> (" + b_sor.toString() + ") = " + sh;
                var db = sh.match(/ \+ /g).length;
                sh = sh.slice(0, -3)
                sh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b> (gyorsítás: &#10761;" + javitas + ") futás. " + sumab + "-nak(nek) összesen <b>" + binomial(sumab + nnn - 1, nnn - 1) + "</b> darab " + nnn + " hosszú nem-negatív kompozíciója van. Az összegben ezekből <b>" + db + "</b> szerepel. Vagyis, nagyjából minden " + (binomial(sumab + nnn - 1, nnn - 1) / db).toFixed(3) + "-dik. </div>" + sh;
            }
        } else {
            sh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b>  meghaladja a maximálisan megengedett 150 000 000-t</div>";
        }
    };
    elem.innerHTML = sh;
};

function convertstr01(v) {
    str = "";
    for (let i of v) {
        for (var j = 0; j < i; j++) {
            str += "0";
        }
        str += 1;
    }
    return str;
};

function str2vec(str) {
    var v = "[[" + str.replace(/1/g, "],[").replace(/0(?!])/g, '0,') + "]]";
    v = JSON.parse(v);
    v = _.dropRight(v);
    v = v.map(y => y.length);
    return v;
}

function sagesh() {
    var a = kiszed_sh("avg");
    var b = kiszed_sh("bvg");
    if (reducedv && a !== undefined && b != undefined) {
        a = a.map(y => y - 1);
        b = b.map(y => y - 1);
    };
    var txt = "show('HIBA');";
    if (a != undefined && b != undefined && !a.some(v => v < 0) && !b.some(v => v < 0)) {
        const astr = convertstr01(a);
        const bstr = convertstr01(b);
        var txt = 'from sage.combinat.shuffle import ShuffleProduct;\nfrom collections import Counter;\nL=list(ShuffleProduct(\"' + astr + '\",\"' + bstr + '\",element_constructor="".join));\nLL= Counter(L);LL;';
    };
    $('#mycell3 .sagecell_editor textarea.sagecell_commands').val(txt);
    $('#mycell3 .sagecell_input button.sagecell_evalButton').click();
    setOutputFont2($('#outfont-slider3').val());
};

function vadd(a, b) {
    var sum = a.map(function(num, idx) {
        return num + b[idx];
    });
    return sum;
}

function sageshtransf() {
    const elem = document.getElementById("sagetransf");
    var str = "";
    var sum = 1;
    var a = kiszed_sh("avg");
    var b = kiszed_sh("bvg");
    if (reducedv) {
        a = a.map(y => y - 1);
        b = b.map(y => y - 1);
    };
    if (a == undefined || b == undefined)
        str = "HIBA";
    else if (a.length + b.length == 0)
        str = "( )&#x29E2;( ) = ( )";
    else {
        const melem = document.querySelector("#ideout3 .sagecell_output_elements .sagecell_messages div");
        if (melem == null)
            str = "Előbb számítsa ki a sageMath kimenetet a 'SAGE' gombra kattintva!"
        else {
            var back = melem.innerHTML.match(/Counter\(.+\)/);
            if (back) {
                back = back[0].slice(8, -1).replace(/'/g, '"');
                var obj = JSON.parse(back);
                sum = 0;
                _.forEach(obj, function(value, key) {
                    if (value == 1)
                        str += " + (" + str2vec(key) + ")";
                    else
                        str += " + " + value + "&lowast;(" + str2vec(key) + ")";
                    sum++;
                });
                str = "(" + a.toString() + ") <span style='font-size:28px;font-size:800;'>&#x29E2;</span> (" + b.toString() + ") = " + str.slice(3);
            } else
                str = "HIBA";
        }
    };
    elem.innerHTML = "<div class='meret'>A szorzat <b>" + sum + "</b> kompozíció összege.</div>" + str;
};

// Shuffle of 3 vectors

function sagesh3() {
    var a = kiszed_sh("av3");
    var b = kiszed_sh("bv3");
    var c = kiszed_sh("cv3");
    var txt = "show('HIBA');";
    if (a != undefined && b != undefined && b != undefined && !a.some(v => v < 0) && !b.some(v => v < 0) && !c.some(v => v < 0)) {
        const astr = convertstr01(a);
        const bstr = convertstr01(b);
        const cstr = convertstr01(c);
        var txt = 'from sage.combinat.shuffle import ShuffleProduct;\nfrom collections import Counter;\nL=list(ShuffleProduct(\"' + astr + '\",\"' + bstr + '\",element_constructor="".join));\nM = flatten([list(ShuffleProduct(x,\"' + cstr + '\",element_constructor="".join)) for x in L])\nLL= Counter(M);LL;';
    };
    $('#mycell4 .sagecell_editor textarea.sagecell_commands').val(txt);
    $('#mycell4 .sagecell_input button.sagecell_evalButton').click();
    setOutputFont2($('#outfont-slider4').val());
};

function sageshtransf3() {
    const elem = document.getElementById("sagetransf3");
    var str = "";
    var sum = 1;
    var a = kiszed_sh("av3");
    var b = kiszed_sh("bv3");
    var c = kiszed_sh("cv3");
    if (reducedv) {
        a = a.map(y => y - 1);
        b = b.map(y => y - 1);
        c = c.map(y => y - 1);
    };
    if (a == undefined || b == undefined || c == undefined)
        str = "HIBA";
    else if (a.length + b.length + c.length == 0)
        str = "( )&#x29E2;( )&#x29E2;( ) = ( )";
    else {
        const melem = document.querySelector("#ideout4 .sagecell_output_elements .sagecell_messages div");
        if (melem == null)
            str = "Előbb számítsa ki a sageMath kimenetet a 'SAGE' gombra kattintva!"
        else {
            var back = melem.innerHTML.match(/Counter\(.+\)/);
            if (back) {
                back = back[0].slice(8, -1).replace(/'/g, '"');
                var obj = JSON.parse(back);
                sum = 0;
                _.forEach(obj, function(value, key) {
                    if (value == 1)
                        str += " + (" + str2vec(key) + ")";
                    else
                        str += " + " + value + "&lowast;(" + str2vec(key) + ")";
                    sum++;
                });
                str = "(" + a.toString() + ") <span style='font-size:28px;font-size:800;'>&#x29E2;</span> (" + b.toString() + ") <span style='font-size:28px;font-size:800;'>&#x29E2;</span> (" + c.toString() + ") = " + str.slice(3);
            } else
                str = "HIBA";
        }
    };
    elem.innerHTML = "<div class='meret'>A szorzat <b>" + sum + "</b> kompozíció összege.</div>" + str;
};

function setSearch33() {
    const query = document.getElementById("query3");
    const article = document.querySelector("#searcharea3");
    const target = document.querySelector("#sagetransf3");
    const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    if (!CSS.highlights) {
        const dvan = document.getElementById("nohighlight")
        if (dvan == undefined) {
            let d = document.createElement('div');
            d.style.color = "#ff2211";
            d.id = "nohighlight";
            target.prepend(d);
            d.prepend("CSS Custom Highlight API not supported.");
        }
        return;
    }

    CSS.highlights.clear();

    const str = query.value.trim().toLowerCase();
    if (!str) {
        return;
    }

    const ranges = allTextNodes
        .map((el) => {
            return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(str, startPos);
                if (index === -1) break;
                indices.push(index);
                startPos = index + str.length;
            }

            return indices.map((index) => {
                const range = new Range();
                range.setStart(el, index);
                range.setEnd(el, index + str.length);
                return range;
            });
        });

    const searchResultsHighlight = new Highlight(...ranges.flat());
    CSS.highlights.set("search-results", searchResultsHighlight);
};

$(document).on('input focus', '#query3', function() {
    setSearch33();
});

/////

function setSearch() {
    const query = document.getElementById("query2");
    const article = document.querySelector("#searcharea");
    const target = document.querySelector("#sagetransf");
    const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    if (!CSS.highlights) {
        const dvan = document.getElementById("nohighlight")
        if (dvan == undefined) {
            let d = document.createElement('div');
            d.style.color = "#ff2211";
            d.id = "nohighlight";
            target.prepend(d);
            d.prepend("CSS Custom Highlight API not supported.");
        }
        return;
    }

    CSS.highlights.clear();

    const str = query.value.trim().toLowerCase();
    if (!str) {
        return;
    }

    const ranges = allTextNodes
        .map((el) => {
            return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(str, startPos);
                if (index === -1) break;
                indices.push(index);
                startPos = index + str.length;
            }

            return indices.map((index) => {
                const range = new Range();
                range.setStart(el, index);
                range.setEnd(el, index + str.length);
                return range;
            });
        });

    const searchResultsHighlight = new Highlight(...ranges.flat());
    CSS.highlights.set("search-results", searchResultsHighlight);
};

function setSearch2(str) {
    const article = document.querySelector("#searcharea");
    const target = document.querySelector("#sagetransf");
    const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    if (!CSS.highlights) {
        const dvan = document.getElementById("nohighlight")
        if (dvan == undefined) {
            let d = document.createElement('div');
            d.style.color = "#ff2211";
            d.id = "nohighlight";
            target.prepend(d);
            d.prepend("CSS Custom Highlight API not supported.");
        }
        return;
    }

    CSS.highlights.clear();
    if (!str) {
        return;
    }

    const ranges = allTextNodes
        .map((el) => {
            return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(str, startPos);
                if (index === -1) break;
                indices.push(index);
                startPos = index + str.length;
            }

            return indices.map((index) => {
                const range = new Range();
                range.setStart(el, index);
                range.setEnd(el, index + str.length);
                return range;
            });
        });

    const searchResultsHighlight = new Highlight(...ranges.flat());
    CSS.highlights.set("search-results", searchResultsHighlight);
};

$(document).on('input focus', '#query2', function() {
    setSearch();
});

if (console.log(document.title != "Explicit formula"))
    $(document).on('selectionchange', function() {
        const foo = document.querySelector('#shout')
        const foo1 = document.querySelector('#sagetransf');
        const foo2 = document.querySelector('#iresz');
        var isin = window.getSelection().containsNode(foo, true) || window.getSelection().containsNode(foo1, true) || window.getSelection().containsNode(foo2, true);
        var selection = window.getSelection().toString();
        if (isin)
            setSearch2(selection);
    });

// Multiset

// (\(([^\)])+\)) az összes (2,3,1,...) vektor kivélasztása
//       (\(([^\)])+\))$  kiválasztja az utolsó vektort
// teststr.match(/(\d+)\*\(2,3\)|\(2,3\)/g).map(y=>y.split("*")[0].replace(/\(2,3\)/,"1")*1) 
// ((\+?\d+)(\*)?|(\+?))\(2,3\)|\(2,3\) + jellel a vektor

function mshClear() {
    const elem = document.getElementById("mshout");
    elem.innerHTML = "";
};

function setmReduced(elem) {
    mreducedv = elem.checked;
    mshClear();
};

function strSum(str) {
    var lastv, pat1, pat2, eh = [],
        coeff = 0,
        newstr = "";
    str = str.replaceAll(" ", "");
    while (/(\(([^\)])+\))$/.test(str)) {
        lastv = "\\" + str.match(/(\(([^\)])+\))$/g)[0].slice(0, -1) + "\\)";
        pat1 = new RegExp(lastv);
        pat2 = new RegExp("((\\\+? *\\\-?\\d+)(∗)?|(\\\+? *\\\-))" + lastv + "|" + lastv, "g");
        eh = str.match(pat2).map(y => y.split("∗")[0].replace(pat1, "1").replace("+-", "-") * 1);
        coeff = _.sum(eh);
        if (coeff == "1")
            coeff = "";
        else
            coeff += "∗";
        if (coeff != "0∗")
            newstr = coeff + lastv.replace(/\\/g, "") + " + " + newstr;
        str = str.replace(pat2, "");
    }
    return newstr.slice(0, -3);
};

function mcegyutth(a) {
    var sum = 0;
    for (let y of it) {
        sum += komb(nnn, y, a);
    }
    if (sum == 0)
        sum = "";
    else if (sum == 1)
        sum = "(" + c_sor.toString() + ") + ";
    else
        sum += "∗(" + c_sor.toString() + ") + ";
    //sum += "*(" + c_sor.toString() + ") + ";
    return sum;
};

function meshuff(a) {
    const maxa = _.max(a_sor);
    const maxb = _.max(b_sor);
    const maxab = maxa + maxb + 1;
    var cek = comp0(sumab, nnn);
    cek = cek.filter(y => y.every(v => v < maxab));
    var LL = "";
    for (let c of cek) {
        c_sor = c;
        LL += mcegyutth(a);
    };
    msh += LL;
};

function mkiszed_sh(id) {
    var av = document.getElementById(id).value;
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "mfigysh");
        multierror = true;
        return;
    };

    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        var indx = av.indexOf(oo);
        if (mreducedv && av.some(v => v < 1)) {
            setfigy("Az <b>a</b>, illetve <b>b</b>  indexvektor csak pozitív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "mfigysh");
            multierror = true;
            return;
        }
        if (av.some(v => v < 0)) {
            setfigy("Az <b>a</b>, illetve <b>b</b>  indexvektor csak nem negatív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "mfigysh");
            multierror = true;
            return;
        } else if (indx > -1) {
            av = oo2strInf(av);
            setfigy("Az indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "mfigysh");
            multierror = true;
            return;
        }
        if (id == "bvg" && indx > -1)
            av = oo2Inf(av);

    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "mfigysh");
        multierror = true;
        return;
    };
    return av;
};

function makeRunList() {
    var lista = {};
    var listb = {};

    const ma1 = document.getElementById("ma1").value * 1;
    var mav1;
    if (ma1 != 0)
        mav1 = mkiszed_sh("mav1")
    if (mav1 && mav1.length > 0)
        lista["a1"] = [ma1, mav1];

    const ma2 = document.getElementById("ma2").value * 1;
    var mav2;
    if (ma2 != 0)
        mav2 = mkiszed_sh("mav2")
    if (mav2 && mav2.length > 0)
        lista["a2"] = [ma2, mav2];

    const ma3 = document.getElementById("ma3").value * 1;
    var mav3;
    if (ma3 != 0)
        mav3 = mkiszed_sh("mav3")
    if (mav3 && mav3.length > 0)
        lista["a3"] = [ma3, mav3];

    const mb1 = document.getElementById("mb1").value * 1;
    var mbv1;
    if (mb1 != 0)
        mbv1 = mkiszed_sh("mbv1")
    if (mbv1 && mbv1.length > 0)
        listb["b1"] = [mb1, mbv1];

    const mb2 = document.getElementById("mb2").value * 1;
    var mbv2;
    if (mb2 != 0)
        mbv2 = mkiszed_sh("mbv2")
    if (mbv2 && mbv2.length > 0)
        listb["b2"] = [mb2, mbv2];

    const mb3 = document.getElementById("mb3").value * 1;
    var mbv3;
    if (mb3 != 0)
        mbv3 = mkiszed_sh("mbv3")
    if (mbv3 && mbv3.length > 0)
        listb["b3"] = [mb3, mbv3];

    return { "lista": lista, "listb": listb };
};

function headFromList(lista) {
    var head = "";
    for (let i of Object.keys(lista)) {
        var coeff = lista[i][0];
        var vec = lista[i][1];
        if (mreducedv) {
            vec = vec.map(y => y - 1);
        };
        if (coeff == "1")
            coeff = ""
        else if (coeff == -1)
            coeff = "-";
        else
            coeff += "∗";
        head += coeff + "(" + vec.toString() + ") + ";
    }
    head.replace(/\+ *\-/g, " - ");
    head = head.slice(0, -3);
    if (_.size(lista) > 1)
        head = "<span class='bzj'>[</span>" + head + "<span class='bzj'>]</span>";
    return head;
};

function mcalc_sh() {
    multierror = false;
    msh = "";
    const elem1 = document.getElementById("mfigysh");
    elem1.innerHTML = "";
    const elem = document.getElementById("mshout");
    var meret = 0;
    var osszmeret = 0;
    const obj = makeRunList();
    const la = obj["lista"];
    const lb = obj["listb"];
    const heada = headFromList(la);
    const headb = headFromList(lb);
    if (multierror) {
        elem.innerHTML = "HIBA";
        return;
    }

    for (let i of Object.keys(la)) {
        const lai = la[i];
        a_sor = lai[1];
        const ma1 = lai[0];
        if (mreducedv) {
            a_sor = a_sor.map(y => y - 1);
        };
        for (let j of Object.keys(lb)) {
            const lbj = lb[j]
            b_sor = lbj[1];
            const mb1 = lbj[0];
            if (mreducedv) {
                b_sor = b_sor.map(y => y - 1);
            };
            sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
            kk = a_sor.length;
            nnn = kk + b_sor.length;
            meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
            osszmeret += meret;
            if (meret < 150000000) {
                it = Choose(nnn, kk);
                meshuff(ma1 * mb1);
            } else {
                msh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b>  meghaladja a maximálisan megengedett 150 000 000-t</div>";
                return;
            }
        }
    }
    msh = strSum(msh.slice(0, -3));

    // msh kiírása

    if (msh == "") {
        db = 0
    } else
        var db = msh.match(/ \+ /g).length + 1;
    if (heada == "" && headb !== "")
        msh = "( )" + " <span style='font-size:28px;font-weight:800;'>&#x29E2;</span> " + headb + " = " + headb.replace("<span class='bzj'>[</span>", "").replace("<span class='bzj'>]</span>", "");
    else if (heada != "" && headb == "")
        msh = heada + " <span style='font-size:28px;font-weight:800;'>&#x29E2;</span> " + "( )" + " = " + heada.replace("<span class='bzj'>[</span>", "").replace("<span class='bzj'>]</span>", "");
    else if (heada == "" && headb == "")
        msh = "( )" + " <span style='font-size:28px;font-weight:800;'>&#x29E2;</span> " + "( )" + " = " + "( )";
    else
        msh = heada + " <span style='font-size:28px;font-weight:800;'>&#x29E2;</span> " + headb + " = " + msh;
    msh = "<div class='meret'>A számítás mérete: <b>" + osszmeret + " </b> futás.  Az összeg <b>" + db + "</b> tagú.</div>" + msh;

    msh = msh.replace(/\+ *-/g, "- ")
    elem.innerHTML = msh;
};

function setSearch3() {
    const query = document.getElementById("mquery");
    const article = document.querySelector("#mshout");
    const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const allTextNodes = [];
    let currentNode = treeWalker.nextNode();
    while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
    }

    if (!CSS.highlights) {
        const dvan = document.getElementById("mnohighlight")
        if (dvan == undefined) {
            let d = document.createElement('div');
            d.style.color = "#ff2211";
            d.id = "mnohighlight";
            article.prepend(d);
            d.prepend("CSS Custom Highlight API not supported.");
        }
        return;
    }

    CSS.highlights.clear();

    const str = query.value.trim().toLowerCase();
    if (!str) {
        return;
    }

    const ranges = allTextNodes
        .map((el) => {
            return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(str, startPos);
                if (index === -1) break;
                indices.push(index);
                startPos = index + str.length;
            }

            return indices.map((index) => {
                const range = new Range();
                range.setStart(el, index);
                range.setEnd(el, index + str.length);
                return range;
            });
        });

    const searchResultsHighlight = new Highlight(...ranges.flat());
    CSS.highlights.set("search-results", searchResultsHighlight);
};

$(document).on('input focus', '#mquery', function() {
    setSearch3();
});
if (document.title != "Explicit formula")
    $(document).on('selectionchange', function() {
        const foo = document.querySelector('p#mshout')
        var isin = window.getSelection().containsNode(foo, true);
        var selection = window.getSelection().toString();
        if (isin && selection != "") {
            $("#mquery").val(selection).trigger('input');
        }
    });

// derive set

function setDeriv(elem) {
    derivab = elem.checked;
    const n = document.getElementById('N').value * 1;
    derivInit(n);
};

function derivSet(J) {
    const n = J.length;
    var dJ = [1];
    for (var j = 1; j < n; j++) {
        if (J[j - 1] == J[j])
            dJ[j] = 1;
        else
            dJ[j] = 0;
    };
    return dJ;
};

function derivPath(J) {
    const J0 = [1, ...J.slice(1)];
    const Jc0 = [1, ...J.slice(1).map(y => (y + 1) % 2)];
    var dJ = derivSet(J);
    var dJs = [J, dJ];
    while (!_.isEqual(J0, dJ) && !_.isEqual(Jc0, dJ)) {
        dJ = derivSet(dJ);
        dJs.push(dJ);
    };
    return dJs;
};

function sorKep0(sor) {
    const n = sor.length;
    var txt = "<td style='border-bottom:1px solid #aaaaaa'>"
    for (var j = 0; j < n; j++) {
        txt += "<span class='tgomb' onclick='tdat(" + j + ")'>"
        if (sor[j] == 1)
            txt += "&#x25CF;</span> ";
        else
            txt += "&#x25CB;</span> ";
    };
    txt += "</td></tr>";
    return txt;
};

function sorKep(sor) {
    var txt = "<td>"
    for (let s of sor) {
        if (s == 1)
            txt += "&#x25CF; ";
        else
            txt += "&#x25CB; ";
    };
    txt += "</td></tr>";
    return txt;
};

function derivKep(d) {
    var n = d.length;
    var m = d[0].length;
    var txt = "<table style='border-collapse:collapse;'><thead ><tr><th id='dnum' style='font-size:16px;width:45px;background-color:#eee'>" + (n - 1) + "</th><th>";
    for (var i = 1; i < m + 1; i++) {
        txt += "<span class='tsorszam'>" + i + ".</span>";
    };
    txt += "</th></tr></thead>";
    for (var i = 0; i < n; i++) {
        if (i == 0)
            txt += "<tr style='cursor:pointer;color:red;'><td>A<sup>" + i + "</sup></td>" + sorKep0(d[i]);
        else if (i == n - 1)
            txt += "<tr class='derivlast'><td>A<sup>" + i + "</sup></td>" + sorKep(d[i]);
        else
            txt += "<tr><td>A<sup>" + i + "</sup></td>" + sorKep(d[i]);
    };
    txt += "</table>";
    return txt;
};

function pathKep(J) {
    const elem = document.getElementById("derivT");
    const d = derivPath(J);
    const kep = derivKep(d);
    elem.innerHTML = kep;
};

function derivInitk(n) {
    deriv_table = [];
    var x;
    for (var i = 0; i < n; i++) {
        x = Math.round(Math.random());
        deriv_table.push(x)
    };
    pathKep(deriv_table);
}

function tdat(j) {
    var jedik = deriv_table[j];
    deriv_table[j] = (jedik + 1) % 2;
    pathKep(deriv_table);
};

// A B deriv

function szimDiff(A, B) {
    const n = Math.min(A.length, B.length);
    var sd = [];
    for (j = 0; j < n; j++)
        if (A[j] !== B[j])
            sd.push(1);
        else
            sd.push(0);
    return sd;
};

function tdata(j) {
    var jedik = deriv_tableA[j];
    deriv_tableA[j] = (jedik + 1) % 2;
    derivKepAB();
};

function tdatb(j) {
    var jedik = deriv_tableB[j];
    deriv_tableB[j] = (jedik + 1) % 2;
    derivKepAB();
};

function sorKep0ab(sor, ab) {
    const n = sor.length;
    var txt = "<td>"
    for (var j = 0; j < n; j++) {
        txt += "<span class='tgomb' onclick='tdat" + ab + "(" + j + ")'>"
        if (sor[j] == 1)
            txt += "&#x25CF;</span> ";
        else
            txt += "&#x25CB;</span> ";
    };
    txt += "</td></tr>";
    return txt;
};

function derivKepAB() {
    const n = Math.min(deriv_tableA.length, deriv_tableB.length)
    var txt = "<table style='border-collapse:collapse;'><thead ><tr><th style='font-size:16px;width:70px;background-color:#eee'> </th><th>";
    for (var i = 1; i < n + 1; i++) {
        txt += "<span class='tsorszam'>" + i + ".</span>";
    };
    txt += "</th></tr></thead>";
    txt += "<tr style='cursor:pointer;color:#3d6c95;'><td  class='derivkezd'>A</td>" + sorKep0ab(deriv_tableA, "a");
    txt += "<tr style='cursor:pointer;color:#df4242;'><td  class='derivkezd'>B</td>" + sorKep0ab(deriv_tableB, "b");
    const AsB = szimDiff(deriv_tableA, deriv_tableB)
    txt += "<tr ><td class='derivkezd'>A<span>&#x2206;</span>B</td>" + sorKep(AsB);
    const dA = derivSet(deriv_tableA)
    txt += "<tr><td  class='derivkezd'>∂A</td>" + sorKep(dA);
    const dB = derivSet(deriv_tableB)
    txt += "<tr  style='border-bottom:1px solid #aaa;'><td  class='derivkezd'>∂B</td>" + sorKep(dB);
    txt += "<tr ><td  class='derivkezd'>∂A<span>&#x2206;</span>∂B</td>" + sorKep(szimDiff(dA, dB));
    txt += "<tr ><td  class='derivkezd'>∂(A<span>&#x2206;</span>B)</td>" + sorKep(derivSet(AsB));
    txt += "</table>";
    const elem = document.getElementById("derivT");
    elem.innerHTML = txt;
};

function derivInitAB(n) {
    deriv_tableA = [];
    deriv_tableB = [];
    var x;
    for (var i = 0; i < n; i++) {
        x = Math.round(Math.random());
        deriv_tableA.push(x)
    };
    for (var i = 0; i < n; i++) {
        x = Math.round(Math.random());
        deriv_tableB.push(x)
    };

    derivKepAB();
};

function derivInit(n) {
    if (derivab)
        derivInitAB(n);
    else
        derivInitk(n);
};

//  Shuffle calculation

function cJClear() {
    const elem = document.getElementById("cwithJ");
    const elem1 = document.getElementById("c_index");
    const elem2 = document.getElementById("c_indexstat");
    const elem3 = document.getElementById("iresz");
    elem.innerHTML = "";
    elem1.innerHTML = "Index";
    elem2.innerHTML = "Index statisztika";
    elem3.innerHTML = "";
};

function setAutoIndex(elem) {
    autoindex = elem.checked;
};

function setStatByVal(elem) {
    if (elem.checked) {
        statby = "value";
    } else {
        statby = "length";
    };
    if (autoindex)
        makeShIndex();
    else {
        const target = document.getElementById("c_index");
        const target2 = document.getElementById("c_indexstat");
        var txt = "érték"
        if (statby == "length")
            txt = "méret"
        target2.innerHTML = "Index statisztika";
        target.innerHTML = "<b>A feladathoz nins <b style='text-decoration:underline;'>" + txt + "</b> szerinti index</b>.<br>A \"Make Index\" gombra kattintva készíthet indexet. Ha az \"autoindex\" jelölőnégyzetet kipipálja, akkor minden feladathoz automatikusan készül index.";
    };
};

function setStatMode(id) {
    if (id == "c_indexstat")
        statmode = true;
    else
        statmode = false;
    $(".statactive").removeClass("statactive");
    $("#" + id).addClass("statactive");
    if (statmode) {
        $('#J_sora').removeClass("active");
        $('#c_sora').addClass("active");
        $(".lepteto").css('background-color', '#cbf7b7')
        const cindex = _.findIndex(cStore_active, y => _.isEqual(y, cJ_c));
        const m = cStore_active.length;
        setKijelzo(cindex + 1, m);

    } else {
        $('#J_sora').addClass("active");
        $('#c_sora').removeClass("active");
        $(".lepteto").css('background-color', '#eccccc')
        const nn = cJ_it.length;
        const cv = digit2set(cJ_J);
        var indx = _.findIndex(cJ_it, y => _.isEqual(y, cv));
        setKijelzo(indx + 1, nn);
        cindredclass(indx);
    };
};

function drawBinomial(n, k) {
    return "<span style='display:inline-block;border-left: 2px solid;border-right: 2px solid;border-radius: 30%;'><table style='border-collapse: collapse;margin: 0 5px;'><tr><td>" + n + "</td></tr><tr><td>" + k + "</td></tr></table></span>";
};

function abcJ(a, b, c, J) {
    const n = J.length;
    const cJ = J.map(y => (y + 1) % 2);
    const k = kum(J);
    const ck = kum(cJ);
    var av = [];
    var bv = [];
    var cab = [];
    for (i = 0; i < n; i++) {
        av.push(J[i] * (a[k[i] - 1] || 0));
        bv.push(cJ[i] * (b[ck[i] - 1] || 0));
        cab.push(c[i] - av[i] - bv[i]);
    };
    var kcab = kum(cab);
    return [av, bv, cab, kcab];
};

function drawShuffle(a, b, c, J) {
    const elem = document.getElementById("cwithJ");
    const f = abcJ(a, b, c, J);
    const n = J.length;
    const dJ = derivSet(J);
    const av = f[0];
    const bv = f[1];
    const cab = f[2];
    const kcab = f[3];

    const cna = cJ_J.reduce((x, y) => x + y, 0);
    const na = cJ_a.length;
    const sumc = c.reduce((x, y) => x + y, 0);
    const sumab = a.reduce((x, y) => x + y, 0) + b.reduce((x, y) => x + y, 0);
    const diff = na - cna;
    const sumdiff = sumab - sumc;
    var col = "";
    var fdiff = "";
    var fdiffcls = "";
    var sdiffcls = "";
    var clsJ = "";
    var clsC = "";
    var binvec = [];

    if (diff != 0) {
        col = "#00000077";
        fdiffcls = "class='diff'";
        clsJ = "error";
        fdiff = diff;
        if (fdiff > 0)
            fdiff = "+" + fdiff;
    };
    var fsumdiff = "";
    if (sumdiff != 0) {
        col = "#00000077";
        sdiffcls = "class='sdiff'";
        clsC = "error";
        fsumdiff = sumdiff;
        if (fsumdiff > 0)
            fsumdiff = "+" + fsumdiff;
    };

    if (!statmode)
        clsJ += " active";
    var tbl = "<table style='color:" + col + ";border-collapse:separate;border-spacing: 2px 5px;text-align:center;'><tr id='J_sora' class='" + clsJ + "'><td style='width:50px;' onclick=\"setStatMode('c_index');\">J</td>";

    for (var j = 0; j < n; j++) {
        tbl += "<td><span class='tgomb' onclick='updcJJ" + "(" + j + ")'>"
        if (J[j] == 1)
            tbl += "&#x25CF;</span></td>";
        else
            tbl += "&#x25CB;</span></td>";
    };

    if (statmode)
        clsC += " active";
    tbl += "<td id='fdiff' onclick=\"setStatMode('c_index');\" " + fdiffcls + ">" + fdiff + "</td></tr><tr id='c_sora' class='" + clsC + "' style='border-bottom:1px solid #777;'><td  onclick=\"setStatMode('c_indexstat');\"><b>c</b></td>";
    for (var j = 0; j < n; j++) {
        tbl += "<td><input type='text' id='ci" + j + "'class='cinput' onclick='toStatmode();' value='" + c[j] + "' onchange='updcJ(this," + j + ");'/></td>";
    };
    tbl += "<td id='sumdiff'  onclick=\"setStatMode('c_indexstat');\" " + sdiffcls + ">" + fsumdiff + "</td></tr><tr><td><b>a|b</b></td>";
    for (var j = 0; j < n; j++) {
        if (J[j] == 1)
            tbl += "<td style='text-decoration:underline;'>" + av[j], "</td>";
        else
            tbl += "<td>" + bv[j], "</td>";
    };
    tbl += "</tr><tr><td>Δκ</td>";
    for (var j = 0; j < n; j++) {
        if (dJ[j] == 1)
            tbl += "<td style='background-color:#d1dfdd;border-radius: 4px;border: 1px solid #9bb8c1'>" + cab[j], "</td>";
        else
            tbl += "<td>" + cab[j], "</td>";
    };
    tbl += "</tr><tr><td>κ</td>";
    for (var j = 0; j < n; j++) {
        if (dJ[j] == 0)
            tbl += "<td style='background-color:#d1dfdd;border-radius: 4px;border: 1px solid #9bb8c1'>" + kcab[j], "</td>";
        else
            tbl += "<td>" + kcab[j], "</td>";
    };
    tbl += "</tr><tr style='font-size:85%;'><td></td>";
    for (var i = 0; i < n; i++) {
        if (dJ[i] > 0) {
            tbl += "<td>" + drawBinomial(c[i], cab[i]) + "</td>";
            binvec[i] = binomial(c[i], cab[i]);
        } else if (dJ[i] == 0) {
            tbl += "<td>" + drawBinomial(c[i], kcab[i]) + "</td>";
            binvec[i] = binomial(c[i], kcab[i]);
        };
    };
    tbl += "</tr><tr><td>c(J)</td>";

    for (var j = 0; j < n; j++) {
        if (binvec[j] <= 0)
            tbl += "<td style='border:1px solid red'>" + binvec[j], "</td>";
        else
            tbl += "<td>" + binvec[j], "</td>";
    };
    var coeff = binvec.reduce((x, y) => x * y, 1);
    tbl += "<td style='font-weight:800;min-width:50px;'> = " + coeff + "</td></tr></table>";
    elem.innerHTML = tbl;
};

function setKijelzo(l, n) {
    var lk = document.getElementById("lepeskijelzo");
    var lp = document.getElementById("lepesall");
    if (isNaN(l))
        lk.value = l;
    else
        lk.value = l * 1;

    lp.innerHTML = "/ " + n * 1;
};

function initcInshuff() {
    cJ_a = kiszed_sh("avg");
    cJ_b = kiszed_sh("bvg");
    if (reducedv && cJ_a !== undefined && cJ_b != undefined) {
        cJ_a = cJ_a.map(y => y - 1);
        cJ_b = cJ_b.map(y => y - 1);
    };
    const na = cJ_a.length;
    const nb = cJ_b.length;
    const n = na + nb;
    cJ_it = Choose(n, na).map(y => _.reverse(y)).sort();
    cJ_J = [];
    cJ_c = [];
    for (var i = 0; i < na; i++)
        cJ_J.push(1);
    for (var i = 0; i < nb; i++)
        cJ_J.push(0);
    for (var i = 0; i < na; i++)
        cJ_c.push(cJ_a[i]);
    for (var i = 0; i < nb; i++)
        cJ_c.push(cJ_b[i]);

    drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);

    const nn = cJ_it.length;
    setKijelzo(1, nn);
    const target = document.getElementById("c_index");
    var vanindx = _.isEqual(cJ_a, lastindex[0]) && _.isEqual(cJ_b, lastindex[1]);
    if (vanindx) {
        indexStat();
        updcJall(cJ_c);
    } else {
        if (autoindex)
            makeShIndex();
        target.innerHTML = "<b>A feladathoz még nem készült index</b>.<br>A \"Make Index\" gombra kattintva készíthet indexet. Ha az \"autoindex\" jelölőnégyzetet kipipálja, akkor minden feladathoz automatikusan készül index.";
    };
    setStatMode("c_index");
    setTimeout(() => {
        szinkronCJ();
        szinkronTbl();
    }, 100);
};

function formazIndex(v) {
    const n = v.length;
    var sum = 0;
    var f = "<table style='text-align:center;order-collapse: separate;border-spacing: 10px 4px;font-size: 20px;user-select:none;'><thead><tr><th style='padding-right:10px;'>(" + cJ_c.toString() + ")</th>";
    var indx = 0;
    for (var i = 0; i < n; i++) {
        indx = v[i][0];
        f += "<th class='cindh' onclick='ugrik(" + indx + ")'>" + (indx + 1) + "</th>";
    };
    f += "</tr></thead><tr>";
    var f2 = "";
    for (var j = 0; j < n; j++) {
        var cj = v[j][1];
        f2 += "<td  class='cindd'>" + cj + "</td>";
        sum += cj;
    };
    f2 = "<td style='font-weight:800'>" + sum + "</td>" + f2 + "</tr>";
    f += f2;
    return f;
};

function toStatmode() {
    if (!statmode)
        setStatMode("c_indexstat");
};

function updcJ(elem, j) {
    const cj = elem.value * 1;
    var cJ_c0 = [...cJ_c];
    cJ_c0[j] = cj;
    cJ_c = [...cJ_c0];
    //cJ_c[j] = cj; // ez érthetetlen átírás
    drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);
    const target = document.getElementById("c_index");
    const indx = _.findIndex(cJIndex, y => _.isEqual(y[0], cJ_c));
    if (indx > -1) {
        target.innerHTML = formazIndex(cJIndex[indx][1]);
    } else {
        target.innerHTML = "<b>(" + cJ_c.toString() + ")</b> nem szerepel <b>(" + cJ_a.toString() + ")</b><span style='margin:0 3px;font-size:160%;line-height:0.4;'>⧢</span><b>(" + cJ_b.toString() + ")</b>-ben";
    };
    setTimeout(() => {
        szinkronCJ();
        szinkronTbl();
    }, 100)
};

function updcJall(v) {
    cJ_c = v;
    drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);
    const target = document.getElementById("c_index");
    setTimeout(() => {
        var indx = _.findIndex(cJIndex, y => _.isEqual(y[0], cJ_c));
        if (indx > -1) {
            target.innerHTML = formazIndex(cJIndex[indx][1]);
        } else {
            target.innerHTML = "Index";
        };
        cindredclass(indx);
        //cdbindredclass(indx);
    }, 100);
};

function updcJJ(j) {
    if (statmode)
        setStatMode("c_index");
    var jedik = cJ_J[j];
    cJ_J[j] = (jedik + 1) % 2;
    drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);

    const nn = cJ_it.length;
    const cv = digit2set(cJ_J);
    var indx = _.findIndex(cJ_it, y => _.isEqual(y, cv)) * 1;
    if (indx == -1 || isNaN(indx)) {
        setKijelzo("☹", nn);
    } else {
        setKijelzo(indx + 1, nn);
    };
    cindredclass(indx);
    szinkronTbl();
    kiemelClear();
};

function set2digit(v, n) {
    var d = Array(n).fill(0);
    for (let a of v)
        d[a - 1] = 1;
    return d;
};

function digit2set(d) {
    var v = [];
    const n = d.length;
    for (var i = 0; i < n; i++)
        if (d[i] > 0)
            v.push(i + 1);
    return v;
}

function cindredclass(indx) {
    $("th.cindh.cindred").removeClass("cindred");
    var elem = $("th.cindh").filter(function() { return this.innerHTML == (indx + 1) });
    if (elem != undefined)
        elem.addClass("cindred");
};

function leptet(b) {
    if (statmode) {
        document.getSelection().empty();
        var indx = document.getElementById("lepeskijelzo").value * 1;
        const nn = cStore_active.length;
        if (b) {
            if (indx == 1)
                indx = nn;
            else
                indx -= 1;
        } else {
            if (indx == (nn))
                indx = 1;
            else
                indx += 1;
        };
        setcINactive(indx);
    } else {
        const n = cJ_J.length;
        const nn = cJ_it.length;
        const cv = digit2set(cJ_J);
        var indx = _.findIndex(cJ_it, y => _.isEqual(y, cv));
        if (b) {
            if (indx == 0)
                indx = nn - 1;
            else
                indx -= 1;
        } else {
            if (indx == (nn - 1))
                indx = 0;
            else
                indx += 1;
        };
        const back = cJ_it[indx];
        if (back != undefined) {
            cJ_J = set2digit(back, n);
            drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);
            setKijelzo(indx + 1, nn);
            cindredclass(indx);
        }
    }
    szinkronTbl();
    kiemelClear();
};

function ugrik0(indx) {
    if (statmode) {
        const nn = cStore_active.length;
        if (indx > 0 && indx < nn + 1) {
            setcINactive(indx);
        } else {
            setKijelzo("☹", nn);
        }
        cdbindredclass(indx);
    } else {
        indx = indx * 1 - 1;
        const n = cJ_J.length;
        const nn = cJ_it.length;
        if (indx > -1 && indx < nn) {
            const back = cJ_it[indx];
            if (back != undefined) {
                cJ_J = set2digit(back, n);
                drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);
                setKijelzo(indx * 1 + 1, nn);
            };
        } else {
            setKijelzo("☹", nn);
        }
        cindredclass(indx);
    }
    szinkronTbl();
    kiemelClear();
};

function ugrik(indx) {
    const n = cJ_J.length;
    const nn = cJ_it.length;
    if (indx > -1 && indx < nn) {
        const back = cJ_it[indx];
        if (back != undefined) {
            cJ_J = set2digit(back, n);
            drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);
            setKijelzo(indx * 1 + 1, nn);
        };
    } else {
        setKijelzo("☹", nn);
    };
    cindredclass(indx);
    szinkronTbl();
    kiemelClear();
};

// Make Index

function cegyutthIndex(n) {
    var sum = 0;
    var cy = 0;
    var cIk = [];
    var y;
    for (var i = 0; i < n; i++) {
        y = cJ_it[i];
        cy = komb(nnn, y);
        sum += cy;
        if (cy > 0)
            cIk.push([i, cy]);
    };
    if (sum > 0)
        cJIndex.push([c_sor, cIk])
};

function eshuffIndex() {
    const n = binomial(nnn, a_sor.length);
    const maxa = _.max(a_sor);
    const maxb = _.max(b_sor);
    const maxab = maxa + maxb + 1;
    var cek = comp0(sumab, nnn);
    cek = cek.filter(y => y.every(v => v < maxab));
    for (let c of cek) {
        c_sor = c;
        cegyutthIndex(n);
    };
};

function kiemelClear() {
    const elsh = document.getElementById("shout");
    var txtsh = elsh.innerHTML;
    if (txtsh != "") {
        txtsh = txtsh.replace(/(\<span style=\"background-color:(\#fbf6b0|\#ffd0cb);border-radius:12px;\"\>)(\((.*?)\))(\<\/span\>)/g, '$3');
        elsh.innerHTML = txtsh
    }
};

function szinkronTbl() {
    const e = document.getElementById("fdiff");
    const el = document.getElementById("sumdiff");
    const n = cJ_c.length;
    const indx = _.findIndex(cJIndex, y => _.isEqual(y[0], cJ_c))
    if (indx > -1 && nnn !== undefined && n == nnn) {
        var on = 0;
        if (statby == "length") {
            on = cJIndex[indx][1].length;
        } else {
            on = _.size(_.groupBy(cJIndex[indx][1].map(y => y[1])));
        }
        const cStore_act = cStore[on];


        const cindex = _.findIndex(cStore_act, y => _.isEqual(y, cJ_c)) * 1;
        if (cindex > -1)
            el.innerHTML = cindex + 1;
        else
            el.innerHTML = "☹";
        var setJ = digit2set(cJ_J)
        var indx1 = _.findIndex(cJ_it, y => _.isEqual(y, setJ));
        if (indx > -1 && !e.classList.contains("diff")) {
            e.innerHTML = indx1 * 1 + 1;
            makeIindex(indx1 * 1, setJ);
        }
    };
};

function szinkronCJ() {
    const n = cJ_c.length;
    const indx = _.findIndex(cJIndex, y => _.isEqual(y[0], cJ_c))
    if (indx > -1 && nnn !== undefined && n == nnn) {
        var on = 0;
        if (statby == "length") {
            on = cJIndex[indx][1].length;
        } else {
            on = _.size(_.groupBy(cJIndex[indx][1].map(y => y[1])));
        }
        const cStore_act = cStore[on];
        cdbindredclass(on - 1);

        const cindex = _.findIndex(cStore_act, y => _.isEqual(y, cJ_c)) * 1;
        const m = cStore_act.length;
        if (statmode)
            setKijelzo(cindex + 1, m);
        var setJ = digit2set(cJ_J)
        var indx1 = _.findIndex(cJ_it, y => _.isEqual(y, setJ));
        cindredclass(indx1)
    };
};

function makeShIndex() {
    var vanindx = _.isEqual(cJ_a, lastindex[0]) && _.isEqual(cJ_b, lastindex[1]);
    if (vanindx) {
        indexStat();
        updcJall(cJ_c);
        setTimeout(() => {
            szinkronCJ();
            szinkronTbl();
        }, 100)
    } else {
        a_sor = kiszed_sh("avg");
        b_sor = kiszed_sh("bvg");
        if (reducedv && a_sor !== undefined && b_sor != undefined) {
            a_sor = a_sor.map(y => y - 1);
            b_sor = b_sor.map(y => y - 1);
        }
        var meret;
        if (a_sor == undefined || b_sor == undefined)
            sh = "HIBA";
        else if (a_sor.length + b_sor.length == 0)
            sh = "( )&#x29E2;( ) = ( )";
        else if (a_sor.length == 0)
            sh = "( )&#x29E2;(" + b_sor + ") = (" + b_sor + " )";
        else {
            cJIndex = [];
            sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
            kk = a_sor.length;
            nnn = kk + b_sor.length;
            meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
            if (meret < 150000000) {
                cJ_it = Choose(nnn, kk).map(y => _.reverse(y)).sort();
                eshuffIndex();
            };
            lastindex[0] = a_sor;
            lastindex[1] = b_sor;
            indexStat();
            const first = Object.keys(cStore)[0];
            setcact(first);
            vanindx = _.isEqual(cJ_a, lastindex[0]) && _.isEqual(cJ_b, lastindex[1]);
            if (vanindx) {
                indexStat()
                updcJall(cJ_c);
            };
        };
    };
    setTimeout(() => {
        szinkronCJ();
        szinkronTbl();
    }, 100);
};

function makeIindex(n, J) {
    const eJ = document.getElementById("iresz");
    if (n > -1) {
        var chasI = cJIndex.filter(y => y[1].some(z => z[0] == n));
        chasI = chasI.map(y => [y[0], y[1].filter(z => z[0] == n)[0][1]]);
        const N = chasI.length;
        var txt = "<hr style='border-color:#f4f4f4;'>A J = {" + J.toString() + "}[indexe = " + (n + 1) + "] indexhalmaz egy " + N + " darab egész koordinátájú rácspontot tartalmazó politópot határoz meg.<br> (" + a_sor + ") <span style='font-size:28px;'>⧢</span><sub>J</sub> (" + b_sor + ") = ";
        var ce = 0;
        var cv = "";
        var polytop = [];
        for (let j of chasI) {
            polytop.push(j);
            cv = j[0].toString();
            ce = j[1] * 1;
            if (ce == 1)
                txt += "(" + cv + ") + ";
            else
                txt += ce + "&lowast;(" + cv + ") + ";
        }
        txt = txt.slice(0, -3);
        if (txt != ireszben) {
            chasI = chasI.map(y => y[0]);
            makeIpolytop(n, chasI);
            eJ.innerHTML = txt;
            ireszben = txt;
        } else
            return;
    } else {
        eJ.innerHTML = "";
        ireszben = "";
    };
};

function makeIpolytop(n, chasI) {
    if (n > -1) {
        var polytop = [];
        for (let j of chasI) {
            polytop.push(j);
        }
        var strpolytop = polytop = JSON.stringify(polytop);
        Ipolytop = strpolytop;
        var txt = "pretty_print(html('<button class=\\\"kiemelo\\\" onclick=\\\"boldVertices();\\\">Kiemel</button>'));\nP = Polyhedron(vertices = " + strpolytop + ");\nV = P.vertices();\nVV = [list(x) for x in V];\nVV;\nNice_repr = LatexExpr(P.Hrepresentation_str(latex=True));\nshow(LatexExpr(r'J = \\lbrace" + digit2set(cJ_J).toString() + "\\rbrace'),'\\n\\n');\nshow(LatexExpr(r'P ='),VV);\nshow('\\n',LatexExpr(r'---------------------------------'));\nshow(Nice_repr);";

        $('#mycell3 .sagecell_editor textarea.sagecell_commands').val(txt);
        $('#mycell3 .sagecell_input button.sagecell_evalButton').click();
        setOutputFont2($('#outfont-slider3').val());
    } else {
        return
    };
};

function getVertices() {
    const vert = JSON.parse($('#ideout3 .sagecell_sessionOutput script')[1].innerText.replaceAll('\\left', '').replaceAll('\\right', '').replaceAll('\\displaystyle P = ', ''));
    return vert;
};

function boldVertices() {
    const el = document.getElementById("iresz");
    const vert = getVertices();
    var txt = el.innerHTML;
    var vstr = "";
    for (let v of vert) {
        vstr = "(" + v.toString() + ")";
        txt = txt.replace(vstr, "<span style='background-color:#ffd0cb;border-radius:12px;'>" + vstr + "</span>");
    };
    el.innerHTML = txt;

    const elsh = document.getElementById("shout");
    var txtsh = elsh.innerHTML;
    if (txtsh != "") {
        txtsh = txtsh.replace(/(\<span style=\"background-color:(\#fbf6b0|\#ffd0cb);border-radius:12px;\"\>)(\((.*?)\))(\<\/span\>)/g, '$3');
        const ip = JSON.parse(Ipolytop);
        var vstrsh = "";
        for (let w of ip) {
            vstrsh = "(" + w.toString() + ")";
            if (_.findIndex(vert, y => _.isEqual(y, w)) > -1)
                txtsh = txtsh.replace(vstrsh, "<span style='background-color:#ffd0cb;border-radius:12px;'>" + vstrsh + "</span>");
            else
                txtsh = txtsh.replace(vstrsh, "<span style='background-color:#fbf6b0;border-radius:12px;'>" + vstrsh + "</span>");
        };
        elsh.innerHTML = txtsh;
    };
};

if (document.title != "Explicit formula")
    $(document).on('selectionchange', function() {
        const foo = document.querySelector('p#shout');
        const foo2 = document.querySelector('span#iresz');
        var isin = window.getSelection().containsNode(foo, true) || window.getSelection().containsNode(foo2, true);
        var selection = window.getSelection().toString();
        if (isin) {
            var sv = selection.split(",").map(y => y * 1);
            const n = sv.length;
            const indx = _.findIndex(cJIndex, y => _.isEqual(y[0], sv))
            if (indx > -1 && nnn !== undefined && n == nnn) {
                var on = 0;
                if (statby == "length") {
                    on = cJIndex[indx][1].length;
                    cStore_active = cStore[on];
                    cdbindredclass(on - 1);
                } else {
                    on = _.size(_.groupBy(cJIndex[indx][1].map(y => y[1])));
                    cStore_active = cStore[on];
                    cdbindredclass(on - 1);
                }

                const cindex = _.findIndex(cStore_active, y => _.isEqual(y, sv));
                const m = cStore_active.length;
                if (statmode)
                    setKijelzo(cindex + 1, m);

                var setJ = digit2set(cJ_J)
                var indx1 = _.findIndex(cJ_it, y => _.isEqual(y, setJ));
                setTimeout(() => {
                    cindredclass(indx1)
                }, 150);

                updcJall(sv);
                setTimeout(() => {
                    for (i = 0; i < n; i++) {
                        $('#ci' + i).trigger("input");
                    };
                }, 100);
                setTimeout(() => { szinkronTbl(); }, 200);
            }
        }
    });

function indexStat() {
    indexGroupStat();
    const target = document.getElementById("c_indexstat");
    //if (statby == "length") {
    /*  const st = _.countBy(cJIndex, y => y[1].length);
     const h = Object.keys(st).map(y => y * 1);
     const db = Object.values(st).map(y => y * 1); */

    const h = Object.keys(cStore).map(y => y * 1);
    const db = Object.values(cStore).map(y => y.length * 1);
    var fej1 = "Hossz";
    if (statby == "value")
        fej1 = "Érték"
    var txt = "<table style='text-align:center;order-collapse: separate;border-spacing: 10px 4px;font-size: 20px;'><thead><tr><th>" + fej1 + "</th>"
    for (var i = 0; i < h.length; i++)
        txt += "<th class='cdbindh' onclick='setcact(" + h[i] + ")'>" + h[i] + "</th>";
    txt += "</tr></thead><tr><td>Darab</td>";
    for (var j = 0; j < db.length; j++)
        txt += "<td>" + db[j] + "</td>";
    txt += "</tr></table>";
    target.innerHTML = txt;
};

function indexGroupStat() {
    if (statby == "value")
        var st = _.groupBy(_.mapValues(cJIndex, z => [z[0], _.size(_.groupBy(z[1].map(y => y[1])))]), t => t[1]);
    else
        var st = _.groupBy(cJIndex.map(y => [y[0], y[1].length]), z => z[1]);
    st = _.mapValues(st, function(value) { return value.map(y => y[0]); });
    cStore = st;
};

function cdbindredclass(indx) {
    $("th.cdbindh.cindred").removeClass("cindred");
    var elem = $("th.cdbindh").filter(function() { return this.innerHTML == (indx + 1) });
    if (elem != undefined)
        elem.addClass("cindred");
};

function setcINactive(i) {
    if (isNaN(i))
        i = 1;
    cJ_c = cStore_active[i - 1];
    if (cJ_c) {
        drawShuffle(cJ_a, cJ_b, cJ_c, cJ_J);
        const target = document.getElementById("c_index");
        var indx = _.findIndex(cJIndex, y => _.isEqual(y[0], cJ_c));
        if (indx > -1) {
            target.innerHTML = formazIndex(cJIndex[indx][1]);
            setKijelzo(i, cStore_active.length)
        } else {
            target.innerHTML = "Index";
        };
    } else
        return;
}

function setcact(i) {
    cStore_active = cStore[i];
    const first = Object.keys(cStore_active)[0] + 1;
    setcINactive(first);
    cdbindredclass(i - 1);
    szinkronTbl();
};


// Integral set

function intSet(J) {
    const n = J.length;
    var intJ = [1];
    for (var j = 0; j < n - 1; j++) {
        if (J[j + 1] == 1)
            intJ[j + 1] = intJ[j];
        else
            intJ[j + 1] = (intJ[j] + 1) % 2;
    };
    return intJ;
};

function intSetN(J, n) {
    var intJ = [1];
    for (var j = 0; j < n - 1; j++) {
        if (J[j + 1] == 1)
            intJ[j + 1] = intJ[j];
        else
            intJ[j + 1] = (intJ[j] + 1) % 2;
    };
    return intJ;
};

function Combvr(v, r, ism) {
    const c = new YourCombinations(v);
    let cb = c.combinations(r, ism);
    return cb;
};

function Choosevr(v, k) {
    var w = [];
    let cb = Combvr(v, k, false);
    while (true) {
        const item = cb.next();
        if (item.done) break;
        w.push([...item.value]);
    };
    return w;
};

function powerSet(v) {
    const your_combinations = new YourCombinations(v);
    return [...your_combinations.powerSet(v)];
};

function derivJinS(S, n) {
    const sp1 = _.filter(powerSet(S), y => _.includes(y, 1));
    //const sp1 = powerSet(S);
    var out = _.uniq(sp1.map(y => intSetN(set2digit(y, n), n))); //.sort();
    out = [set2digit(S, n), ...out]
    return out;
}

function sorKep0InS(sor) {
    const n = sor.length;
    var txt = "<td style='border-bottom:1px solid #aaaaaa'>"
    for (var j = 0; j < n; j++) {
        txt += "<span class='tgomb' onclick='tinSdat(" + j + ")'>"
        if (sor[j] == 1)
            txt += "&#x25CF;</span> ";
        else
            txt += "&#x25CB;</span> ";
    };
    txt += "</td></tr>";
    return txt;
};

function sorKepInS(sor) {
    var txt = "<td>"
    for (let s of sor) {
        if (s == 1)
            txt += "&#x25CF; ";
        else
            txt += "&#x25CB; ";
    };
    txt += "</td></tr>";
    return txt;
};

function derivKepInS(d) {
    var n = d.length;
    var m = d[0].length;
    var txt = "<table style='border-collapse:collapse;'><thead ><tr><th id='dnum' style='font-size:16px;width:45px;background-color:#eee'>" + (n - 1) + "</th><th>";
    for (var i = 1; i < m + 1; i++) {
        txt += "<span class='tsorszam'>" + i + ".</span>";
    };
    txt += "</th></tr></thead>";
    for (var i = 0; i < n; i++) {
        if (i == 0)
            txt += "<tr style='cursor:pointer;color:red;'><td>C</td>" + sorKep0InS(d[i]);
        else
            txt += "<tr><td>I<sub>" + i + "</sub></td>" + sorKepInS(d[i]);
    };
    txt += "</table>";
    return txt;
};

function pathKepInS(J, n) {
    const elem = document.getElementById("derivTinS");
    const d = derivJinS(J, n);
    const kep = derivKepInS(d);
    elem.innerHTML = kep;
};

function derivInitInS(n) {
    deriv_tableinS = [1];
    for (var i = 1; i < n; i++) {
        x = Math.round(Math.random());
        deriv_tableinS[i] = x;
    };
    const S = digit2set(deriv_tableinS, n);
    pathKepInS(S, n);
}

function tinSdat(j) {
    const n = document.getElementById("Nn").value * 1;
    var jedik = deriv_tableinS[j];
    deriv_tableinS[j] = (jedik + 1) % 2;
    const S = digit2set(deriv_tableinS, n);
    pathKepInS(S, n);
};


function sumuJ(u, J) {
    var out = [];
    const n = u.length;
    const ku = kum(u);
    const d = derivSet(J);
    for (var i = 0; i < n; i++)
        if (d[i] == 1)
            out[i] = u[i];
        else
            out[i] = ku[i];
    return out;
};

function parcDiff(u, J) {
    var out = [u[0]];
    const n = u.length;
    for (var i = 1; i < n; i++)
        if (J[i] == 1)
            out[i] = u[i] - u[i - 1];
        else
            out[i] = u[i];
    return out;
};

function LMatrix(J) {
    const n = J.length;
    out = [];
    var u = Array(n).fill(0);
    for (var i = 0; i < n; i++) {
        u = Array(n).fill(0);
        u[i] = 1;
        out[i] = sumuJ(u, J);
    };
    return out;
};

//Le shuffle Le

function vLeFormaz(obj) {
    const keys = Object.keys(obj).sort();
    var txt = "";
    for (let k of keys) {
        var val = obj[k]
        if (val == 0)
            val = "";
        else if (val == 1)
            val = " + Le<sub>(" + k + ")</sub>";
        else if (val == -1)
            val = " - Le<sub>(" + k + ")</sub>";
        else if (val > 0)
            val = " + " + val + "&lowast;Le<sub>(" + k + ")</sub>";
        else if (val < 0)
            val = " - " + (-1 * val) + "&lowast;Le<sub>(" + k + ")</sub>";
        else
            val = "HIBA";
        txt += val;
    }
    return txt;
}

function visszaLeC() {
    const keys = Object.keys(LeC);
    var obj = {};
    for (let s of keys) {
        var e = LeC[s];
        var ns = s.split(',').length;
        for (var k = 0; k < ns; k++) {
            var v = comma2pluskLe(s, k);
            var vk = Math.pow(-1, k) * e;
            for (let st of v) {
                st = st.toString();
                if (obj[st])
                    obj[st] += vk;
                else
                    obj[st] = vk;
            };
        };
    };
    var out = vLeFormaz(obj);
    return out;
};

function calc_shLe() {
    LeC = {};
    const elem1 = document.getElementById("figyshLe");
    elem1.innerHTML = "";
    const elem = document.getElementById("shoutLe");
    const a = document.getElementById("avle").value;
    const b = document.getElementById("bvle").value;
    let na = a.length;
    let wa = [];
    for (var k = 0; k < Math.max(1, na); k++)
        wa.push(comma2pluskLe(a, k));
    wa = _.flatten(wa);

    let nb = b.length;
    let wb = [];
    for (var k = 0; k < Math.max(1, nb); k++)
        wb.push(comma2pluskLe(b, k));
    wb = _.flatten(wb);
    for (let i of wa) {
        for (let j of wb)
            calc_shab(i, j);
    }
    var str = "Le<sub>(" + a + ")</sub>&lowast;Le<sub>(" + b + ")</sub> = " + visszaLeC().slice(3);
    //elem.innerHTML = JSON.stringify(wa) + "<br>" + JSON.stringify(wb) + "<br>" + JSON.stringify(LeC);
    elem.innerHTML = str;
};

function comma2pluskLe(str, k) {
    let w = [];
    if (k == 0) {
        w = JSON.parse("[" + str + "]");
        return [w];
    }
    let indx = commaIndxs(str);
    const c = new YourCombinations(indx);
    let cb = c.combinations(k, false);
    while (true) {
        const item = cb.next();
        if (item.done) break;
        var tt = kicserel(str, item.value).split(',');
        var t1 = tt.map(function(z) {
            return str2arr(z);
        });
        w.push(t1);
    };
    return w;
};

function cegyutthLe() {
    var sum = 0;
    for (let y of it) {
        sum += komb(nnn, y);
    }
    if (sum == 0)
        return;
    else {
        var key = c_sor.map(y => y + 1).toString();
        if (LeC[key])
            LeC[key] += sum;
        else
            LeC[key] = sum;
    }
};

function eshuffLe() {
    const maxa = _.max(a_sor);
    const maxb = _.max(b_sor);
    const maxab = maxa + maxb + 1;
    var cek = comp0(sumab, nnn);
    cek = cek.filter(y => y.every(v => v < maxab));
    for (let c of cek) {
        c_sor = c;
        cegyutthLe();
    }
};

function calc_shab(a, b) {
    a_sor = a.map(y => y - 1);
    b_sor = b.map(y => y - 1);
    var sh, meret;
    if (a_sor == undefined || b_sor == undefined)
        sh = "HIBA";
    else if (a_sor.length + b_sor.length == 0)
        sh = "( )&#x29E2;( ) = ( )";
    else if (a_sor.length == 0)
        sh = "( )&#x29E2;(" + b_sor + ") = (" + b_sor + " )";
    else {
        sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
        kk = a_sor.length;
        nnn = kk + b_sor.length;
        meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
        if (meret < 150000000) {
            it = Choose(nnn, kk);
            sh = eshuffLe();
        } else {
            sh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b>  meghaladja a maximálisan megengedett 150 000 000-t</div>";
        }
    };
    return sh;
};

// ln^p(x)ln^q(1-x)/x^n ntegrál

function setOutputFontpq(v) {
    document.getElementById("pqnout").style.fontSize = v + "px";
    document.getElementById("tsout").style.fontSize = v + "px";
};

function setPlot(elem) {
    plotall = false;
    pqnplot = elem.checked;
    var elemfn = document.querySelector("#fnpqn");
    if (pqnplot)
        elemfn.style.display = 'block';
    else
        elemfn.style.display = 'none';
    const act = document.querySelector("#pqntbl td.active");
    if (act)
        act.click();

};

function factorial(n) {
    if (n == 0 || n == 1)
        return 1;
    else {
        var f = 1;
        for (var i = 2; i < n + 1; i++)
            f *= i;
        return f;
    };
};

function pqnClear() {
    idClear('#pqnout');
    idClear('#tsout');
    idClear('#plotpqn');
    plotall = false;
    kummode = false;
};

function pqnBlur() {
    document.getElementById('pqnout').style.opacity = "0.2";
    document.getElementById('tsout').style.opacity = "0.2";
    document.getElementById('plotpqn').style.opacity = "0.2";
};

function pqnUnBlur() {
    document.getElementById('pqnout').style.opacity = "1";
    document.getElementById('tsout').style.opacity = "1";
    document.getElementById('plotpqn').style.opacity = "1";
};

//https://stackoverflow.com/questions/15577651/generate-all-compositions-of-an-integer-into-k-parts
// translated from C++ code 

function get_first_composition(n, k, composition) {
    if (n < k) {
        return false;
    }
    for (var i = 0; i < k - 1; i++) {
        composition[i] = 1;
    }
    composition[k - 1] = n - k + 1;
    return true;
};

function get_next_composition(n, k, composition) {
    if (composition[0] == n - k + 1) {
        return false;
    }

    var last = k - 1;
    while (composition[last] == 1) {
        last--;
    }

    var z = composition[last];
    composition[last - 1] += 1;
    composition[last] = 1;
    composition[k - 1] = z - 1;
    return true;
};

function comp(n, k) {
    allcomp = [];
    if (k == 0)
        allcomp = []
    else {
        var composition = [];
        for (var exists = get_first_composition(n, k, composition); exists; exists = get_next_composition(n, k, composition)) {
            display_composition(allcomp, composition);
        };
    }
    return allcomp;
};

function stirlingNumber(r, n) {
    if (n > r)
        return -1;
    if (n == 0)
        if (r == 0)
            return 1;
        else
            return 0;
    if (r == n)
        return 1;
    if (n == 1)
        return factorial(r - 1);
    if (r - n == 1)
        return binomial(r, 2);
    else
        return stirlingNumber(r - 1, n - 1) +
            (r - 1) * stirlingNumber(r - 1, n);
};

function fractionReduce(numerator, denominator) {
    var a = numerator;
    var b = denominator;
    var c;
    while (b) {
        c = a % b;
        a = b;
        b = c;
    }
    return [numerator / a, denominator / a];
};

function kvalLast(v, k) {
    return [..._.dropRight(v), _.last(v) - k];
}

function addTScoeffLi(t, s) {
    const elem = document.getElementById("tsout");
    const details = document.getElementById("setdetails").checked;
    const p = document.getElementById("p").value * 1;
    const q = document.getElementById("q").value * 1;
    const n = document.getElementById("n").value * 1;
    const N = p + q + 1 - t - s;
    const K = q + 1 - s;
    const ts = factorial(p) * factorial(q) / (factorial(s) * factorial(t)); //* factorial(n - 1)
    const fn = factorial(n - 1);
    var elojel = " + ";
    var relojel = "";
    if ((p + t) % 2 == 1) {
        elojel = " - ";
        relojel = " - "
    };
    comp(N, K);
    const nc = allcomp.length;
    var str = "";
    var strr = "";
    if (details) {
        var strcomp = allcomp.map(y => " (" + y.toString() + ")").toString();
        var C = ts / fn;
        if (ts % fn != 0) {
            C = fractionReduce(ts, fn)
            C = "\\dfrac{" + C[0] + "}{" + C[1] + "}";
        };
        strr += "A feladat paraméterei: <i>p</i> = " + p + ", <i>q</i> = " + q + ", <i>n</i> = " + n + ", <i>t</i> = " + t + ", <i>s</i> = " + s + "<hr/>";
        strr += "Az \\(\\ln^{" + t + "}(x)\\cdot\\ln^{" + s + "}(1-x)\\) függvényhez tartozó \\[\\begin{gather*} \\Psi_{" + p + "," + q + "," + n + "}(" + t + "," + s + ",x) = (-1)^{p+t}\\,\\dfrac{p!\\,q!\\,t!\\,s!}{(n-1)!}\\cdot{\\sum_{k=0}^{n-1}\\,\\left[\\begin{array}{c} n-1\\\\ k \\end{array}\\right]\\sum_{\\begin{subarray}{c} C_{1}+\\cdots+C_{q+1-\\large{s}}\\,=\\,p+q+1-t-s\\\\ 1\\leq C_{1},\\ldots,C_{q+1-s} \\end{subarray}}\\text{Li}_{(C_{1},\\ldots,C_{q+1-\\large{s}}\\,-\\,k)}(x)}=\\\\= C\\cdot{\\sum_{k=0}^{" + (n - 1) + "}\\,\\left[\\begin{array}{c} " + (n - 1) + "\\\\ k \\end{array}\\right]\\sum_{\\begin{subarray}{c} C_{1}+\\cdots+C_{q+1-\\large{s}}\\,=\\," + N + "\\\\ 1\\leq C_{1},\\ldots,C_{" + K + "} \\end{subarray}}\\text{Li}_{(C_{1},\\ldots,C_{" + K + "}\\,-\\,k)}(x)}\\end{gather*}\\] függvényt kell kiszámítanunk.<hr/>";
        strr += "<span>\\(\\displaystyle C = (-1)^{p+t}\\dfrac{p! \\cdot q!}{(n-1)!\\cdot t! \\cdot s!} = (-1)^{" + p + "+" + t + "}\\dfrac{" + p + "! \\cdot " + q + "!}{(" + n + "-1)!\\cdot " + t + "! \\cdot " + s + "!} = " + relojel + "\\dfrac{" + factorial(p) + "\\cdot " + factorial(q) + "}{" + fn + "\\cdot " + factorial(t) + " \\cdot " + factorial(s) + "} = " + relojel + C + "\\) &nbsp;(A táblázat aktuális mezőjében éppen ezen C érték van feltüntetve.)</span><hr/>";
        strr += "A képlet szerint meg kell adnunk a <i>p</i>+<i>q</i>+1-<i>t</i>-<i>s</i> = " + p + "+" + q + "+1-" + t + "-" + s + " = <b>" + N + "</b> szám összes <i>q</i>+1-<i>s</i> = <b>" + K + "</b> hosszú felbontását. Ezek száma \\(\\displaystyle \\binom{" + N + "-1}{" + K + "-1} = \\binom{" + (N - 1) + "}{" + (K - 1) + "} =" + binomial(N - 1, K - 1) + "\\).<br/>";
        strr += "<span class='fsor'><i>F</i> = {" + strcomp + "}</span><hr/>";
        strr += "A <i>k</i> összegzési index  0-tól  n-1 = " + (n - 1) + "-ig fut. A képlet szerint minden egyes <i>k</i> összegzési indexhez két dolgot kell tennünk:<ol><li>A  C = " + relojel + C + " számot megszorozni a nemelőjeles  \\(\\displaystyle \\left[\\begin{array}{c} n-1\\\\k \\end{array}\\right] = \\left[\\begin{array}{c} " + (n - 1) + "\\\\k \\end{array}\\right]\\) Stirling-számmal. Ezek lesznek a <i>k</i> összegzési indexhez tartozó általánosított polilogaritmus függvények együtthatói.</li><li>A felbontások <i>F</i> halmazában minden vektor utolsó elemét a <i>k</i> összegzési indexszel csökkenteni. Ezek lesznek a <i>k</i> összegzési indexhez tartozó általánosított polilogaritmus függvények indexei.</li></ol>A szükséges számításokat az alábbi táblázatban foglaltuk össze.<br/>";

        strr += "<table class='stable'><tr><th><i>k</i></th><th>\\(\\displaystyle \\left[\\begin{array}{c} n - 1 \\\\k \\end{array}\\right]\\)</th><th>\\(\\displaystyle C\\cdot\\left[\\begin{array}{c} n - 1 \\\\k \\end{array}\\right]\\)</th><th>\\(\\displaystyle \\text{Li}_{\\left(C_{1},\\ldots,C_{q+1-\\large{s}}\\,- k\\right)} = \\text{Li}_{\\left(C_{1},\\ldots,C_{" + (q + 1 - s) + "}-k\\right)}\\)</th></tr>";
        for (var k = 0; k < n; k++) {
            var b = ts * stirlingNumber(n - 1, k);
            if (b % fn == 0)
                var r = b / fn;
            else {
                var r = fractionReduce(b, fn);
                r = r[0] + "/" + r[1];
            };

            //if (b % fn == 0)
            //    strr += "<tr>"
            strr += "<tr><th>" + k + "</th><td>\\(\\displaystyle \\left[\\begin{array}{c} " + (n - 1) + "\\\\" + k + "\\end{array}\\right] = " + stirlingNumber(n - 1, k) + "\\)</td><td>\\(\\displaystyle" + relojel + C + "\\cdot " + stirlingNumber(n - 1, k) + " = " + relojel + r + " \\)</td>";
            var ksor = allcomp.map(y => "Li<sub>(" + kvalLast(y, k).toString() + ")</sub>(x) + ").toString();
            ksor = ksor.replaceAll(",Li", "Li").slice(0, -3);
            strr += "<td>" + ksor + "</td>"
            strr += "</tr>"
        };
        strr += "</tr></table>";
        strr += "<b>A  táblázat függvényeit a megfelelő együtthatókkal megszorozva, majd  összegezve, megkapjuk a végeredményt:</b><br/>"
    }
    for (var k = 0; k < n; k++) {
        var b = ts * stirlingNumber(n - 1, k);
        if (b !== 0) {
            if (b % fn == 0) {
                var r = b / fn;
                for (var c = 0; c < nc; c++) {
                    let cv = [...allcomp[c]];
                    cv[K - 1] -= k;
                    if (r == 1)
                        str += elojel + "Li<sub>(" + cv + ")</sub>(x)";
                    else
                        str += elojel + r + "·Li<sub>(" + cv + ")</sub>(x)";
                };
            } else {
                var r = fractionReduce(b, fn)
                for (var c = 0; c < nc; c++) {
                    let cv = [...allcomp[c]];
                    cv[K - 1] -= k;
                    str += elojel + r[0] + "/" + r[1] + "·Li<sub>(" + cv + ")</sub>(x)";
                };
            }
        };
    };
    if (str.startsWith(" + "))
        str = str.slice(2);
    strr += str;
    elem.innerHTML = strr;
    if (details)
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function addTScoeffPlot(t, s) {
    const elemfn = document.querySelector("#fnpqn");
    elemfn.style.display = "block";
    const elem = document.getElementById("tsout");
    const p = document.getElementById("p").value * 1;
    const q = document.getElementById("q").value * 1;
    const n = document.getElementById("n").value * 1;
    const NN = document.getElementById("NN").value * 1;
    const N = p + q + 1 - t - s;
    const K = q + 1 - s;
    const elojel = Math.pow(-1, p + t);
    const ts = elojel * factorial(p) * factorial(q) / (factorial(s) * factorial(t) * factorial(n - 1));
    comp(N, K);
    var fn = "";
    var ev = [];
    const nc = allcomp.length;
    for (var l = q + 1 - s; l < NN + 1; l++) {
        for (var k = 0; k < n; k++) {
            var sum = 0;
            for (var c = 0; c < nc; c++) {
                let cv = [...allcomp[c]];
                cv[K - 1] -= k;
                sum += Ha(cv, l);
            };
            sum *= stirlingNumber(n - 1, k);
        };
        fn += " + " + sum + "*x^" + l + "";
        ev.push([sum, l]);
    }
    if (fn.startsWith(" + "))
        fn = fn.slice(2);
    fn = ts + "*log(x)^" + t + "*log(1-x)^" + s + "*(" + fn + ")";

    var mima = [];

    for (var u = 1; u < 21; u++) {
        let z = Math.min(0.99, u / 20);
        let sum = 0;
        for (let c of ev) {
            sum += c[0] * Math.pow(z, c[1]);
        }
        sum = elojel * sum * Math.pow(Math.log(z), t) * Math.pow(Math.log(1 - z), s);
        mima.push(sum);
    };

    var mi = _.min(mima) * Math.abs(ts) * 1.15;
    var ma = _.max(mima) * Math.abs(ts) * 1.15;
    if (Math.abs(ma) > Math.abs(mi))
        mi = -ma * 0.1;
    else
        ma = -mi * 0.1;
    var yAx = [mi, ma];
    functionPlot({
        target: '#plotpqn',
        title: ts + " ⋅ ln^" + t + "(x) ⋅ ln^" + s + "(1-x) ⋅ Ψ" + "(" + t + "," + s + ")",
        grid: true,
        disableZoom: true,
        yAxis: {
            domain: yAx
        },
        xAxis: {
            domain: [-0.05, 1.05]
        },
        tip: {
            xLine: true,
            yLine: true,
            renderer: function(x, y, index) {}
        },
        data: [{
            fn: fn,
            range: [0, 1],
            closed: true,
            color: "#076964"
        }]
    });
    var fnt = fn.replaceAll("*", " ⋅ ").replace(/(log\(x\))\^(\d*)/g, "<b>$1<sup>$2</sup></b>").replace(/\^(\d*)/g, "<sup>$1</sup>")
    elem.innerHTML = fnt;
    document.querySelector("#plotpqn svg.function-plot .canvas .content g.graph").setAttribute("opacity", "0.6")
};

function addTScoeff(t, s) {
    if (pqnplot)
        addTScoeffPlot(t, s);
    else
        addTScoeffLi(t, s)
};

function addTScoeffpLi(t) {
    const elem = document.getElementById("tsout");
    const details = document.getElementById("setdetails").checked;
    const p = document.getElementById("p").value * 1;
    const q = document.getElementById("q").value * 1;
    const n = document.getElementById("n").value * 1;
    const ts = factorial(p) * factorial(q) / factorial(t);
    var q1 = "";
    for (var j = 0; j < q; j++)
        q1 += ",1";
    var elojel = " + ";
    var relojel = "";
    if ((p + q + t) % 2 == 1) {
        elojel = " - ";
        relojel = " - ";
    }
    var str = "";
    var strr = "";

    if (details) {
        strr += "A feladat paraméterei: <i>p</i> = " + p + ", <i>q</i> = " + q + ", <i>n</i> = " + n + ", <i>t</i> = " + t + "<hr/>";
        strr += "Az \\(\\ln^{" + t + "}(x)\\) függvényhez tartozó \\[\\begin{gather*}\\Psi_{" + p + "," + q + "," + n + "}(" + t + ",x) = (-1)^{p+q+t}\\,\\dfrac{\\,p!\\,q!}{t!}\\,\\sum_{k=0}^{n-1}\\,\\binom{n-1}{k}\\,\\text{Li}_{\\left(p+1-t,0^{k},1^{q}\\right)}(x) =\\\\= C\\cdot\\sum_{k=0}^{" + (n - 1) + "}\\,\\binom{" + (n - 1) + "}{k}\\,\\text{Li}_{\\left(" + (p + 1 - t) + ",0^{k}" + q1 + "\\right)}(x)  \\end{gather*}\\] függvényt kell kiszámítanunk.<hr/>";
        strr += "<span>\\(\\displaystyle C = (-1)^{p+q+t}\\cdot \\dfrac{p! \\cdot q!}{t!} = (-1)^{" + p + "+" + q + "+" + t + "}\\cdot\\dfrac{" + p + "! \\cdot " + q + "!}{" + t + "!} = " + relojel + "\\dfrac{" + factorial(p) + "\\cdot " + factorial(q) + "}{" + factorial(t) + "} = " + relojel + ts + "\\) &nbsp;(A táblázat aktuális mezőjében éppen ezen C érték van feltüntetve.)</span><hr/>";
        strr += "A <i>k</i> összegzési index  0-tól  n-1 = " + (n - 1) + "-ig fut. A képlet szerint minden egyes <i>k</i> összegzési indexhez két dolgot kell tennünk:<ol><li>A  C = " + relojel + ts + " számot megszorozni a \\(\\displaystyle \\binom{n-1}{k} = \\binom{" + (n - 1) + "}{k}\\) binomiális együtthatóval. Ez lesz a <i>k</i> összegzési indexhez tartozó általánosított polilogaritmus függvény együtthatója.</li><li>A \\(\\left(p+1-t,0^{k},1^{q}\\right)=\\left(" + (p + 1 - t) + ",0^{k}" + q1 + "\\right)\\) vektort megadni. Ez lesz a <i>k</i> összegzési indexhez tartozó általánosított polilogaritmus függvény indexe.</li></ol>A szükséges számításokat az alábbi táblázatban foglaltuk össze.<br/>";
        strr += "<table class='stable'><tr><th><i>k</i></th><th>\\(\\displaystyle \\binom{n-1}{k}\\)</th><th>\\(\\displaystyle C\\cdot\\binom{n-1}{k}\\)</th><th>\\(\\displaystyle \\text{Li}_{\\left(p+1-t,0^{k},1^{q}\\right)} = \\text{Li}_{\\left(" + (p + 1 - t) + ",0^{k}" + q1 + "\\right)}\\)</th></tr>";
        for (var k = 0; k < n; k++) {
            var k0 = "";
            for (var i = 0; i < k; i++)
                k0 += ",0"
            strr += "<tr><th>" + k + "</th><td>\\(\\displaystyle \\binom{" + (n - 1) + "}{" + k + "} = " + binomial(n - 1, k) + "\\)</td><td>\\(\\displaystyle" + relojel + binomial(n - 1, k) * ts + " \\)</td>";
            strr += "<td>\\(\\text{Li}_{\\left(" + (p + 1 - t) + k0 + q1 + "\\right)}(x)\\)</td>"
            strr += "</tr>"
        };
        strr += "</tr></table>";
        strr += "<b>A  táblázat függvényeit a megfelelő együtthatókkal megszorozva, majd  összegezve, megkapjuk a végeredményt:</b><br/>"
    };

    for (var k = 0; k < n; k++) {
        var b = ts * binomial(n - 1, k);
        var k0 = "";
        for (var i = 0; i < k; i++)
            k0 += ",0"
        if (b == 1)
            str += elojel + "Li<sub>(" + (p + 1 - t) + k0 + q1 + ")</sub>(x)";
        else
            str += elojel + b + "·Li<sub>(" + (p + 1 - t) + k0 + q1 + ")</sub>(x)";
    };
    if (str.startsWith(" + "))
        str = str.slice(2);
    strr += str;
    elem.innerHTML = strr;
    if (details)
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function addTScoeffpLiKum(T) {
    const elem = document.getElementById("tsout");
    const p = document.getElementById("p").value * 1;
    const q = document.getElementById("q").value * 1;
    const n = document.getElementById("n").value * 1;
    var kumstr = "";
    for (var t = 0; t <= T; t++) {
        var ts = factorial(p) * factorial(q) / factorial(t);
        var q1 = "";
        for (var j = 0; j < q; j++)
            q1 += ",1";
        var elojel = " + ";
        if ((p + q + t) % 2 == 1)
            elojel = " - ";
        var str = "";
        for (var k = 0; k < n; k++) {
            var b = ts * binomial(n - 1, k);
            var k0 = "";
            for (var i = 0; i < k; i++)
                k0 += ",0"
            if (b == 1)
                str += " + " + "Li<sub>(" + (p + 1 - t) + k0 + q1 + ")</sub>(x)";
            else
                str += " + " + b + "·Li<sub>(" + (p + 1 - t) + k0 + q1 + ")</sub>(x)";
        };
        if (str.startsWith(" + "))
            str = str.slice(3);
        kumstr += elojel + "<b>ln<sup>" + t + "</sup>(x)</b> · " + "(" + str + ")";
    }
    if (kumstr.startsWith(" + "))
        kumstr = kumstr.slice(2);
    elem.innerHTML = kumstr;
};

function addTScoeffpPlot(t) {
    plotall = false;
    idClear('#plotpqn');
    const elemfn = document.querySelector("#fnpqn");
    elemfn.style.display = "block";
    const elem = document.getElementById("tsout");
    const p = document.getElementById("p").value * 1;
    const q = document.getElementById("q").value * 1;
    const n = document.getElementById("n").value * 1;
    const NN = document.getElementById("NN").value * 1;
    const elojel = Math.pow(-1, p + q + t);
    const ts = elojel * factorial(p) * factorial(q) / factorial(t);
    var fn = "";
    var ev = [];
    for (var l = 1; l < NN + 1; l++) {
        var sum = 0;
        for (var k = 0; k < n; k++) {
            let cv = [p + 1 - t];
            for (var j = 1; j <= k; j++)
                cv.push(0);
            for (var i = 1; i <= q; i++)
                cv.push(1);
            sum += binomial(n - 1, k) * Ha(cv, l);
        };
        if (sum > 0)
            fn += " + " + sum + "*x^" + l + "";
        ev.push(sum);
    };
    var mima = [];
    for (var u = 1; u < 11; u++) {
        let z = u / 10;
        let s = 0;
        for (var l = 0; l < NN; l++) {
            s += ev[l] * Math.pow(z, l + 1);
        }
        s = elojel * s * Math.pow(Math.log(z), t);
        mima.push(s);
    };
    var mi = _.min(mima) * Math.abs(ts) * 1.15;
    var ma = _.max(mima) * Math.abs(ts) * 1.15;
    if (ma == 0)
        ma = -mi * 0.1
    if (mi == 0)
        mi = -ma * 0.1
    var yAx = [mi, ma];
    if (fn.startsWith(" + "))
        fn = fn.slice(2);
    fn = ts + "*log(x)^" + t + "*(" + fn + ")";
    functionPlot({
        target: '#plotpqn',
        title: ts + " ⋅ ln^" + t + "(x) ⋅ Ψ" + "(" + t + ")",
        grid: true,
        disableZoom: true,
        yAxis: {
            domain: yAx
        },
        xAxis: {
            domain: [-0.05, 1.05]
        },
        tip: {
            xLine: true,
            yLine: true,
            renderer: function(x, y, index) {}
        },
        data: [{
            fn: fn,
            range: [0, 1],
            closed: true,
            color: "#076964"
        }]
    });
    var fnt = fn.replaceAll("*", " ⋅ ").replace(/(log\(x\))\^(\d*)/g, "<b>$1<sup>$2</sup></b>").replace(/\^(\d*)/g, "<sup>$1</sup>")
    elem.innerHTML = fnt;
    document.querySelector("#plotpqn svg.function-plot .canvas .content g.graph").setAttribute("opacity", "0.6")
};

function addTScoeffpPlotAll() {
    plotall = true;
    if (pqnplot) {
        const elemfn = document.querySelector("#fnpqn");
        elemfn.style.display = "block";
        const elem = document.getElementById("tsout");
        const p = document.getElementById("p").value * 1;
        const q = document.getElementById("q").value * 1;
        const n = document.getElementById("n").value * 1;
        const NN = document.getElementById("NN").value * 1;
        var fn = "";
        var fnkum = "";
        var fnkum1 = "";
        var fnt = "";
        var elojel;
        var hezag = "";
        var ts;
        var dat = [];
        var hat = 0;
        for (var t = 0; t <= p; t++) {
            fn = "";
            elojel = Math.pow(-1, p + q + t);
            ts = elojel * factorial(p) * factorial(q) / factorial(t);
            if (t > 0 && elojel > 0)
                hezag = " + ";
            var sum;
            for (var l = 1; l < NN + 1; l++) {
                sum = 0;
                for (var k = 0; k < n; k++) {
                    let cv = [p + 1 - t];
                    for (var j = 1; j <= k; j++)
                        cv.push(0);
                    for (var i = 1; i <= q; i++)
                        cv.push(1);
                    sum += binomial(n - 1, k) * Ha(cv, l);
                };
                if (sum > 0)
                    fn += " + " + sum + "*x^" + l + "";
                if (t == 0)
                    if (elojel > 0)
                        hat += sum;
                    else
                        hat -= sum;
            };
            if (elojel < 0) {
                hezag = " - ";
            };
            fnt += "<span class='allpqn num-" + t + "'><b style='color:" + COLORS[t] + ";cursor:pointer;border-bottom: 1px solid;' onclick='kiemelfgv(" + t + ",true);'>" + hezag + Math.abs(ts) + " ⋅ log(x)^" + t + "</b> ⋅ (" + fn + ")</span>";
            fn = ts + "*log(x)^" + t + "*(" + fn + ")";
            fnkum += "+" + fn;
            if (t > 0)
                fnkum1 += "+" + fn;
            dat.push({ fn: fn, "range": [0, 1], "graphType": "polyline", "color": COLORS[t] });
        };
        dat.push({ fn: fnkum, "range": [0, 1], "color": "#aaaaaa88", "closed": true });
        dat.push({ fn: fnkum1, "range": [0, 1], "color": "#88888833", "closed": true });
        hat = factorial(p) * factorial(q) * hat * 1.1;
        if ((p + q) % 2 == 0) {
            var yAx = [-0.1 * hat, hat];
        } else
            var yAx = [hat, -0.1 * hat, ];
        if (fnt.startsWith(" + "))
            fnt = fnt.slice(2);
        functionPlot({
            target: '#plotpqn',
            title: "all Ψ" + "(t)",
            grid: true,
            disableZoom: true,
            yAxis: {
                domain: yAx
            },
            xAxis: {
                domain: [-0.05, 1.05]
            },
            data: dat
        });
        var fnt = fnt.replaceAll("*", " ⋅ ").replace(/\^(\d*)/g, "<sup>$1</sup>")
        elem.innerHTML = fnt;
        $("#plotpqn svg.function-plot .canvas .content g.graph path").each(function() {
            this.setAttribute("stroke-width", "2");
        });
        //const kump = $("#plotpqn svg.function-plot .canvas .content g.graph path.line-" + (p + 1) + "")[0];
        //kump.setAttribute("stroke-dasharray", "3");
        //kum.setAttribute("opacity", "0.5");
    } else
        return;
};

function addTScoeffpPlotAllkum() {
    plotall = true;
    if (pqnplot) {
        const elemfn = document.querySelector("#fnpqn");
        elemfn.style.display = "block";
        const elem = document.getElementById("tsout");
        const p = document.getElementById("p").value * 1;
        const q = document.getElementById("q").value * 1;
        const n = document.getElementById("n").value * 1;
        const NN = document.getElementById("NN").value * 1;
        var fn = "";
        var elojel;
        kums = Array(p + 1).fill("");
        var ts;
        var dat = [];
        var hat = 0;
        for (var t = 0; t <= p; t++) {
            fn = "";
            elojel = Math.pow(-1, p + q + t);
            ts = elojel * factorial(p) * factorial(q) / factorial(t);
            var sum;
            for (var l = 1; l < NN + 1; l++) {
                sum = 0;
                for (var k = 0; k < n; k++) {
                    let cv = [p + 1 - t];
                    for (var j = 1; j <= k; j++)
                        cv.push(0);
                    for (var i = 1; i <= q; i++)
                        cv.push(1);
                    sum += binomial(n - 1, k) * Ha(cv, l);
                };
                if (sum > 0)
                    fn += " + " + sum + "*x^" + l + "";
                if (t == 0)
                    if (elojel > 0)
                        hat += sum;
                    else
                        hat -= sum;
            };
            fn = fn.slice(3);
            fn = ts + "*log(x)^" + t + "*(" + fn + ")";
            for (var j = t; j <= p; j++)
                kums[j] += " + " + fn;
        };
        for (var l = 0; l <= p; l++)
            dat.push({ fn: kums[l], "range": [0, 1], "graphType": "polyline", "color": COLORS[l] })
        hat = factorial(p) * factorial(q) * hat * 1.1;
        if ((p + q) % 2 == 0) {
            var yAx = [-0.1 * hat, hat];
        } else
            var yAx = [hat, -0.1 * hat, ];

        functionPlot({
            target: '#plotpqn',
            title: "∑{k=0..t}Ψ(k)",
            grid: true,
            disableZoom: true,
            yAxis: {
                domain: yAx
            },
            xAxis: {
                domain: [-0.05, 1.05]
            },
            data: dat
        });
        elem.innerHTML = "";
        $("#plotpqn svg.function-plot .canvas .content g.graph path").each(function() {
            this.setAttribute("stroke-width", "2");
        });
    } else
        return;
};

function hakellplotAll() {
    if (pqnplot) {
        if (!plotall) {
            if (kummode)
                addTScoeffpPlotAllkum();
            else
                addTScoeffpPlotAll();
        } else
            return;
    } else
        return;
};

function kiemelfgv(t, scroll) {
    const e = $("#plotpqn svg.function-plot .canvas .content g.graph path:nth(" + t + ")");
    const ek = $("#plotpqn svg.function-plot .canvas .content g.graph path.kiemelt");
    if (ek[0] == undefined)
        $(e).addClass("kiemelt");
    else {
        ek.removeClass("kiemelt");
        const nth = ek[0].classList[1].split('-')[1] * 1;
        if (nth !== t) {
            e.addClass("kiemelt");
            if (scroll)
                e[0].scrollIntoView({
                    behavior: "smooth",
                    block: 'center'
                });
        };
    };

    const apq = $("#tsout .allpqn.num-" + t + "");
    const apqk = $("#tsout .allpqn.kiemelt");
    if (apqk[0] == undefined)
        $(apq).addClass("kiemelt");
    else {
        apqk.removeClass("kiemelt");
        const nth = apqk[0].classList[1].split('-')[1] * 1;
        if (nth !== t) {
            apq.addClass("kiemelt");
        };
    };

    if (pqnplot) {
        if (kummode) {
            const elem = document.getElementById("tsout");
            var fnt = "";
            fnt += kums[t];
            if (fnt.startsWith(" + "))
                fnt = fnt.slice(3);
            fnt = fnt.replaceAll("*", " ⋅ ").replace(/(log\(x\))\^(\d*)/g, "<b>$1<sup>$2</sup></b>").replace(/\^(\d*)/g, "<sup>$1</sup>").replaceAll("+ -", " - ");
            elem.innerHTML = fnt;
        }
    } else {
        if (kummode)
            addTScoeffpLiKum(t);
        else
            addTScoeffpLi(t);
    };
};

function addTScoeffp(t) {
    if (pqnplot)
        addTScoeffpPlot(t);
    else
        addTScoeffpLi(t)
};

function setKum(elem) {
    plotall = false;
    if (kummode)
        elem.innerText = "t";
    else
        elem.innerText = "∑t";
    kummode = !kummode;
    hakellplotAll();
}

function makeTable() {
    var tmode = document.getElementById("setTmode").checked;
    const elem = document.getElementById("pqnout");
    const p = document.getElementById("p").value * 1;
    const q = document.getElementById("q").value * 1;
    const n = document.getElementById("n").value * 1;
    const nf = factorial(n - 1);
    const fix = factorial(p) * factorial(q);
    if (tmode) {
        var tbl = "<table id='pqntbl'><tr><td><sub>t</sub>\\<sup>s</sup></td>"
        for (var i = 0; i < q + 1; i++)
            tbl += "<td><b>" + i + "</b></td>";
        tbl += "</tr>";
        for (var t = 0; t < p + 1; t++) {
            tbl += "<tr><td><b>" + t + "</b></td>";
            for (var s = 0; s < q + 1; s++) {
                var hanyad = fix / (factorial(t) * factorial(s));
                var meret = +binomial(p + q - t - s, q - s) * Math.max(n - 1, 1)

                if (hanyad % nf == 0)
                    tbl += "<td onclick='addTScoeff(" + t + "," + s + ");'>" + Math.pow(-1, t + p) * (hanyad / nf) + "<sub style='color:blue;'>(" + meret + ")</sub></td>";
                else {
                    var r = fractionReduce(hanyad, nf)
                    tbl += "<td onclick='addTScoeff(" + t + "," + s + ");'>" + Math.pow(-1, t + p) * r[0] + "/" + r[1] + "<sub style='color:blue;'>(" + meret + ")</sub></td>";
                }
            }
            tbl += "</tr>";
        }
        tbl += "</table>";
    } else {
        var tbl = "<table id='pqntbl'><tr><td style='min-width:50px;background-color:#b5eefb;outline: 2px solid #3d7723;outline-offset: -1px;' onclick='setKum(this);'>t</td>"
        for (var i = 0; i < p + 1; i++)
            tbl += "<td onclick='hakellplotAll();kiemelfgv(" + i + ",false);'>" + i + "</td>";
        tbl += "</tr><tr><td onclick='hakellplotAll();'>0.." + p + "</td>";
        for (var t = 0; t < p + 1; t++) {
            var hanyad = fix / factorial(t);
            tbl += "<td onclick='addTScoeffp(" + t + ");'>" + Math.pow(-1, t + p + q) * hanyad + "</td>";
        }
        tbl += "</tr></table>";
    };
    elem.innerHTML = tbl;
};

$(document).on('click', 'table#pqntbl td', function() {
    $('table#pqntbl td.active').removeClass('active');
    $(this).addClass('active');
});

// rStirling

function rStClear() {
    idClear('#rStout');
    idClear('#figygen5');
};

function setOutputFontrSt(v) {
    document.getElementById("rStout").style.fontSize = v + "px";
};

function r_stirlingNumber(n, k, r) {
    if (n < 0 || r < 0 || k < r || n < r || n < k)
        return 0;
    else if (r == 0)
        return stirlingNumber(n, k);
    else {
        var sum = 0;
        for (j = k - r; j <= n - r; j++)
            sum += stirlingNumber(j, k - r) * binomial(n - 1 - j, r - 1) / factorial(j);
        sum *= factorial(n - r);
        return Math.round(sum);
    }
};

function rowhl(elem) {
    $('#rStbl tr').removeClass("rowhl");
    $(elem).addClass("rowhl");
};

function colhl(k) {
    $('#rStbl td').removeClass("colhl");
    const N = document.getElementById("NSt").value * 1;
    for (var j = 0; j <= N; j++)
        $('#rStbl tr:nth(' + j + ') td:nth(' + k + ')').addClass("colhl");
};

function makerStTable() {
    var rstmode = document.getElementById("setrStmode").checked;
    const elem = document.getElementById("rStout");
    const r = document.getElementById("rSt").value * 1;
    const N = document.getElementById("NSt").value * 1;
    if (rstmode) {
        var tbl = "Még nincs implementálva."
    } else {
        var tbl = "<table id='rStbl'><tr><td class='rstb'><sub>n</sub>\\<sup>k</sup></td>"
        for (var k = r; k < N + r; k++)
            tbl += "<td class='rstb' onclick='colhl(" + (k + 1 - r) + ");'><b>" + k + "</b></td>";
        for (var n = r; n < N + r; n++) {
            tbl += "<tr  onclick='rowhl(this);'><td class='rstb'><b>" + n + "</b></td>";
            for (var k = r; k < N + r; k++)
                tbl += "<td>" + r_stirlingNumber(n, k, r) + "</td>";
            tbl += "</tr>";
        };

        tbl += "</tr></table>";
    };
    elem.innerHTML = tbl;
};


const reducer = (accumulator, currentValue) => accumulator + currentValue;

const hasElementGreaterThanOne = (array = []) => {
    let begin = array.length - 2;
    let result = false;
    if (begin > 0) {
        for (let i = begin; i > 0; i--) {
            if (array[i] > 1) {
                result = i;
                break;
            }
        }
    }
    return result;
};

function part(num1) {
    let a = num1;
    let singleSum = [];
    let result = [];
    let b;
    while (a > 0) {
        singleSum.push(a);
        if (singleSum.reduce(reducer) === num1) {
            result.push([...singleSum]);
            if (singleSum[singleSum.length - 1] > 1) {
                a = singleSum[singleSum.length - 1] - 1;
                singleSum.pop();
            } else if (
                singleSum[singleSum.length - 1] === 1 &&
                hasElementGreaterThanOne(singleSum)
            ) {
                let idx = hasElementGreaterThanOne(singleSum);
                singleSum = [...singleSum.slice(0, idx + 1)];
                a = singleSum[singleSum.length - 1] - 1;
                singleSum.pop();
            } else if (singleSum[0] >= 1) {
                a = singleSum[0] - 1;
                singleSum = [];
            } else {
                a--;
                singleSum = [];
            }
        } else if (singleSum.reduce(reducer) < num1) {
            if (singleSum.length < num1) {
                continue;
            } else if (singleSum.length === num1) {
                singleSum.pop();
                continue;
            }
        } else if (singleSum.reduce(reducer) > num1) {
            singleSum.pop();
            a--;
        }
    }
    return result;
}

function formazCy(data) {
    var str = "";
    var c = 1;
    _.forEach(data, function(key, value) {
        c *= Math.pow(value, key) * factorial(key * 1);
        str += "x<sub>" + value + "</sub><sup>" + key + "</sup>*"
    });
    str = "1/" + c + "*" + str;
    str = str.slice(0, -1);
    return str;
}

function cycleIndex(n) {
    var parts = part(n);
    parts = parts.map(y => _.countBy(y));
    parts = parts.map(y => formazCy(y)).join(" + ");
    document.getElementById("shoutLe").innerHTML = parts;
};

// Pz implementacioja 

function twofracAdd(a, b) {
    return fractionReduce(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
};

function fracsAdd(L) {
    const n = L.length;
    if (n == 1)
        return fractionReduce(L[0][0], L[0][1])
    else {
        var fr = [0, 1];
        for (var i = 0; i < n; i++) {
            var v = L.shift();
            fr = twofracAdd(fr, v)
        }
        return fr;
    };
};

function cartesian(arr) {
    return arr.reduce(function(a, b) {
        return a.map(function(x) {
            return b.map(function(y) {
                return x.concat([y]);
            })
        }).reduce(function(a, b) { return a.concat(b) }, [])
    }, [
        []
    ])
}

function toBinom(a, v) {
    const gr = _.countBy(v);
    var frac = 1;
    var binom = 1;
    _.forEach(gr, function(key, value) {
        frac *= factorial(key * 1);
        binom *= Math.pow(binomial(a, value), key);
    });
    return [binom, frac];
}

function grp(s, a, f) {
    var out = [];
    for (var i = f; i <= f * (a - 1); i++) {
        var parts = part(i);
        parts = parts.filter(y => (_.sum(y) == s && y.length == f)).map(z => _.reverse(z));
        parts = parts.filter(v => v.every(y => y < a));
        var np = parts.length;
        for (k = 0; k < np; k++) {
            out.push(parts[k]);
        }
    };
    return out;
};

function grps(cv, av, fv) {
    var out = [];
    for (var i = 0; i < cv.length; i++)
        out.push(grp(cv[i], av[i], fv[i]).map(y => toBinom(av[i], y)));
    out = cartesian(out);
    return out;
}

function vlistProd(L) {
    var frac = 1;
    var binom = 1;
    for (let v of L) {
        binom *= v[0]
        frac *= v[1];
    };
    return [binom, frac];
}

function elocomp(n, av, fv) {
    const r = av.length;
    var comps = comp(n, r);
    for (var i = 0; i < r; i++)
        comps = comps.filter(y => fv[i] <= y[i] && y[i] <= fv[i] * (av[i] - 1));
    //comps = _.flatten(comps.map(y => grps(y, av, fv))).map(z => vlistProd(z));
    comps = fracsAdd(_.flatten(comps.map(y => grps(y, av, fv))).map(z => vlistProd(z)));
    return comps;
};

function prCoeff(k, n, av, fv) {
    const N = av.length;
    var elojel = " + ";
    if (((k + n + _.sum(fv)) % 2) == 1)
        elojel = " - ";
    var oszto = 1;
    for (var i = 0; i < N; i++)
        oszto *= Math.pow(av[i], fv[i]);
    var s = elocomp(n, av, fv);
    s = fractionReduce(s[0], s[1] * oszto);
    return [elojel, s];
};


function formazottTortHTML(a, b) {
    var txt = "";
    if (b == 1 && a !== 1)
        txt = a;
    else if (b > 1)
        txt = "<span style='display:inline-block;vertical-align: middle;text-align:center;font-size:80%;margin-right: -0.2em;'><table style='border-collapse: collapse;margin: 0 5px;'><tr><td style='border-bottom:1px solid;'>" + a + "</td></tr><tr><td>" + b + "</td></tr></table></span>";
    return txt;
};

function formazottExpHTML(a) {
    var txt = "";
    if (a != 1)
        txt = "<sup>" + a + "</sup>";
    return txt;
};


function PzHTML(k, n) {
    var p = "";
    var parts = part(k, n);
    parts = parts.map(y => _.countBy(y)).map(z => [Object.keys(z).map(t => 1 * t), Object.values(z)]);
    for (let v of parts) {
        var av = v[0];
        var fv = v[1];
        var c = prCoeff(k, n, av, fv);
        if (c[1][0] != 0) {
            var m = "";
            for (var i = 0; i < av.length; i++)
                m += "&zwj;x<sub>" + av[i] + "</sub>" + formazottExpHTML(fv[i]);
            p += c[0] + formazottTortHTML(c[1][0], c[1][1]) + "&nbsp;" + m;
        };
    };

    if (p.startsWith(" + "))
        p = p.slice(2);
    return p;
};

function formazottTort(a, b) {
    var ltx = "";
    if (b == 1)
        ltx = a + "\\,";
    else
        ltx = "\\frac{" + a + "}{" + b + "}\\,";
    return ltx;
};

function formazottExp(a) {
    var ltx = "";
    if (a != 1)
        ltx = "^{" + a + "}";
    return ltx;
};

function PzLatex(k, n) {
    var p = "";
    var parts = part(k, n);
    parts = parts.map(y => _.countBy(y)).map(z => [Object.keys(z).map(t => 1 * t), Object.values(z)]);
    for (let v of parts) {
        var av = v[0];
        var fv = v[1];
        var c = prCoeff(k, n, av, fv);
        if (c[1][0] != 0) {
            var m = "";
            for (var i = 0; i < av.length; i++)
                m += "x_{" + av[i] + "}" + formazottExp(fv[i]);
            p += c[0] + formazottTort(c[1][0], c[1][1]) + m;
        };
    };
    if (p.startsWith(" + "))
        p = p.slice(2);
    return p;
};

function Pz() {
    const k = document.querySelector("#k1 #k").value * 1;
    const n = document.querySelector("#k1 #n").value * 1;
    const ltx = document.getElementById("setPzmode").checked;
    const elem = document.getElementById("pzout");

    if (ltx) {
        const p = PzLatex(k, n);
        elem.innerHTML = "\\[" + p + "\\]";
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    } else {
        const p = PzHTML(k, n);
        elem.innerHTML = p;
    }
};

function setOutputFontPz(v) {
    var elem = document.getElementById("pzout");
    elem.style.fontSize = v + '%';
    const ltx = document.getElementById("setPzmode").checked;
    if (ltx)
        setTimeout(() => {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
        }, 100);
};
