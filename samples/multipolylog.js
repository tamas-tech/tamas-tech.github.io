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
var haspv = false;
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
var int01ertek = "";
var intd01ertek = "";
var mapleertek = "";
var xllmeret = 0;

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
        out = " − ";
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
        out = " − ";
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
                e = " − ";
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
            e = " − ";
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
                uout = JSON.stringify(masik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞") + " − " + JSON.stringify(tmasik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
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
                uout = JSON.stringify(elem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞") + " − " + JSON.stringify(telem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
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
    var doc = elem.childNodes[1].src;
    if (open == "none" || !doc.endsWith("int_xnLixLi1_x.pdf")) {
        elem.childNodes[1].src = "../docs/int_xnLixLi1_x.pdf";
        elem.style.display = "block";
    } else
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

function FHa(S, n) {
    var r, SS, h, g;
    r = S.length;
    if (r == 0 && n == 0)
        h = Fraction(1);
    else if (r == 0 && n > 0)
        h = Fraction(0);
    else if (n < r)
        h = Fraction(0);
    else if (r == 1)
        h = Fraction(1, Math.pow(n, S[0]));
    else {
        SS = S.slice(1);
        var hh = Fraction(1, Math.pow(n, S[0]));
        g = new Fraction(0);
        for (var i = r - 1; i < n; i++) {
            g = g.add(FHa(SS, i));
        };
        h = g.mul(hh);
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
    const elem1 = document.getElementById("okbtn");
    const elem2 = document.getElementById("okbtn2");
    if (elem1)
        elem1.onclick = function() {
            var txt = LiLe0PARI();
            $('#mycell1 .sagecell_editor textarea.sagecell_commands').val(txt);
            $('#mycell1 .sagecell_input button.sagecell_evalButton').click();
            setOutputFont1($('#outfont-slider1').val());
        };
    if (elem2)
        elem2.onclick = function() {
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
    if (k == 0) return 1;
    if (n == 0 && k != 0) return 0;
    if (n < 0 && k > 0) return Math.pow(-1, k) * binomial(-n + k - 1, -n - 1);
    if (n < 0 && k < 0) return Math.pow(-1, k + n) * binomial(-k - 1, -n - 1);
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
    if (elemfigy)
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
    setTimeout(() => { genoutput(); }, 30);
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
    const iav = document.getElementById(id);
    var av = iav.value;
    const namea = iav.name || "";
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
        if (id == "avg" && av.some(v => v <= 0) && namea != "ribbonb") {
            setfigy("Az <b>a</b> indexvektor most csak pozitív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figygen");
            genClear();
            return;
        } else if (id == "avg" && indx > -1) {
            av = oo2strInf(av);
            setfigy("A kiüritendő <b>a</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figygen");
            genClear();
            return;
        } else if (id == "bvg" && av.length == 0 && document.getElementById("avg").value.trim() !== "") {
            setfigy("A <b>b</b> indexvektor nem lehet üres! " + '<span class="outhiba"> <b>b</b> = ( )</span> <br/>Ha a <b>b</b> indexvektor helyett az <b>a</b> indexvektort választja üresnek, és az <b>a</b> indexvektort jelenlegi értékét a <b>b</b> helyébe írja, akkor egy a jelenlegivel ekvivalens feladatot kap.', "figygen");
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
        BSOR.push(fn(_.last(BSOR)));
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

function toribbon(el, i) {
    const zz = document.getElementById("derivJ2");
    const $el = $(el);
    if (zz == undefined) {
        return;
    } else {
        if ($el.hasClass("zztbl")) {
            console.log("zztbl elem")
            return;
        } else {
            const aa = _.sum(kiszed_cd('avg'));
            const bb = _.sum(kiszed_cd('bvg'));
            if (!haspv) {
                if (egyezes == 1 && narg != aarg)
                    $('#derivT2 .tgomb.shown:nth(' + (aa + 1 - i) + ')').trigger('click');
                else
                    $('#derivT2 .tgomb.shown:nth(' + (bb + i) + ')').trigger('click');
            } else {
                if (egyezes == 1 && narg != barg)
                    $('#derivT2 .tgomb.shown:nth(' + (bb + i) + ')').trigger('click');
                else
                    $('#derivT2 .tgomb.shown:nth(' + (aa + 1 - i) + ')').trigger('click');
            }
        }
    }
};

function abhtml(i) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    const n1 = BSOR[i].length || 0;
    var ltx = "<table class='genout-sor' onclick='toribbon(this," + (i + 1) + ");'><tr><td class='asor' style='border-bottom:1px solid #777;'>" + elojele(Math.pow(-1, i)) + "(" + a + ")</td></tr>";
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
    var ltx = "<div class='meret'>Az integrál <b style='margin:0 5px;'>" + genmeret() + "</b> általánosított polilogaritmus függvény szorzatösszege:</div><table class='genout-fej'><tr><td style='border-bottom:1px solid #449bd1;border-right:1px solid #449bd1;'>" + amode + "<sub>a</sub>(" + aargtxt + ")</td><td style='border-bottom:1px solid #449bd1;'>(" + ASOR[0] + ")</td></tr><tr><td style='border-right:1px solid #449bd1;'>" + bmode + "<sub>b</sub>(" + bargtxt + ")</td><td>(" + _.dropRight(BSOR[0][0]) + ")</td></tr></table><table class='genout-nyil'><tr><td>" + AFAZIS[0] + "</td></tr><tr><td>&rarr;</td></tr></table>";
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

if (document.title != "Explicit formula" && document.title != "Poset of Compositions")
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

function out01Clear() {
    const elem = document.querySelector("#ideout01 .sagecell_sessionOutput")
    if (elem)
        elem.innerHTML = "";
};

function outd01Clear() {
    const elem = document.querySelector("#ideoutd01 .sagecell_sessionOutput")
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
    reducedv = document.getElementById("reducev").checked;
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

if (document.title != "Explicit formula" && document.title != "Generalized zeta" && document.title != "Poset of Compositions")
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
    head.replace(/\+ *\-/g, " − ");
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
if (document.title != "Explicit formula" && document.title != "Generalized zeta" && document.title != "Poset of Compositions")
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
    return "<span style='margin-right:3px;display:inline-block;border-left: 2px solid;border-right: 2px solid;border-radius: calc(min(30%,10px));'><table style='border-collapse: collapse;margin: 0 5px;'><tr><td>" + n + "</td></tr><tr><td>" + k + "</td></tr></table></span>";
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

if (document.title != "Explicit formula" && document.title != "Generalized zeta" && document.title != "Poset of Compositions")
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
            val = " − " + (-1 * val) + "&lowast;Le<sub>(" + k + ")</sub>";
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

function cegyutthli() {
    var sum = 0;
    for (let y of it) {
        sum += komb(nnn, y);
    }
    if (sum == 0)
        sum = "";
    else if (sum == 1) {
        sum = "Li<sub>(" + c_sor.map(y => y + 1).toString() + ")</sub>(x) + ";
    } else
        sum += "&lowast;Li<sub>(" + c_sor.map(y => y + 1).toString() + ")</sub>(x) + ";
    return sum;
};

function eshuffli() {
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
        LL += cegyutthli();
    }
    return LL;
};

function calc_shLi() {
    const elem1 = document.getElementById("figyshLi");
    elem1.innerHTML = "";
    const elem = document.getElementById("shoutLi");

    var a_sor0 = kiszed_sh("avli");
    var b_sor0 = kiszed_sh("bvli");
    if (a_sor0 !== undefined && b_sor0 != undefined) {
        a_sor = a_sor0.map(y => y - 1);
        b_sor = b_sor0.map(y => y - 1);
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
            sh = eshuffli();
            if (sh == "")
                sh = "Nem megfelelő bemenet"
            else {
                sh = "Li<sub>(" + a_sor0.toString() + ")</sub>(x)&lowast;Li<sub>(" + b_sor0.toString() + ")</sub>(x) = Li<sub>[(" + a_sor0.toString() + ")ˇ<span style='font-size:28px;'>&#x29E2;</span>(" + b_sor0.toString() + ")ˇ]^</sub> (x) = Li<sub>[(" + a_sor.toString() + ")<span style='font-size:28px;'>&#x29E2;</span>(" + b_sor.toString() + ")]^</sub> (x) = <br/><br/>= " + sh;
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
    const ts = factorial(p) * factorial(q) / (factorial(s) * factorial(t));
    const fn = factorial(n - 1);
    var elojel = " + ";
    var relojel = "";
    if ((p + t) % 2 == 1) {
        elojel = " − ";
        relojel = " − "
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
        elojel = " − ";
        relojel = " − ";
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
            elojel = " − ";
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
                hezag = " − ";
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
            fnt = fnt.replaceAll("*", " ⋅ ").replace(/(log\(x\))\^(\d*)/g, "<b>$1<sup>$2</sup></b>").replace(/\^(\d*)/g, "<sup>$1</sup>").replaceAll("+ -", " − ");
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
    comps = fracsAdd(_.flatten(comps.map(y => grps(y, av, fv))).map(z => vlistProd(z)));
    return comps;
};

function prCoeff(k, n, av, fv) {
    const N = av.length;
    var elojel = " + ";
    if (((k + _.sum(fv)) % 2) == 1)
        elojel = " − ";
    var oszto = 1;
    for (var i = 0; i < N; i++)
        oszto *= Math.pow(av[i], fv[i]);
    var s = elocomp(n, av, fv);
    s = fractionReduce(s[0], s[1] * oszto);
    return [elojel, s];
};

function sformazottTortHTML(a, b) {
    var txt = "";
    if (b == 1 && a == -1)
        txt = " − ";
    else if (b == 1 && a != 1 && a != -1)
        txt = a;
    else if (b != 1 || typeof(b) == 'string')
        txt = "<span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>" + a + "</td></tr><tr><td>" + b + "</td></tr></table></span>";
    return txt;
};

function formazottTortHTML(a, b) {
    var txt = "";
    if (b == 1 && a !== 1)
        txt = a;
    else if (b != 1 || typeof(b) == 'string')
        txt = "<span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;line-height:normal;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>" + a + "</td></tr><tr><td>" + b + "</td></tr></table></span>";
    return txt;
};

function oformazottTortHTML(a, b) {
    var txt = "";
    if (b == 1)
        txt = a;
    else if (b != 1 || typeof(b) == 'string')
        txt = "<span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>" + a + "</td></tr><tr><td>" + b + "</td></tr></table></span>";
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
            m = "<span class='pzjelento' onclick='pzJelent(" + k + "," + n + "," + JSON.stringify(av) + "," + JSON.stringify(fv) + ",this,true);'>" + m + "</span>"
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
    const k = document.querySelector("#kpz").value * 1;
    const n = document.querySelector("#npz").value * 1;
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
    var elemr = document.getElementById("pzoutr");
    elem.style.fontSize = v + '%';
    elemr.style.fontSize = v * 0.8 + '%';
    const ltx = document.getElementById("setPzmode").checked;
    if (ltx)
        setTimeout(() => {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
        }, 100);
};

function grps0(cv, av, fv) {
    var out = [];
    for (var i = 0; i < cv.length; i++)
        out.push(grp(cv[i], av[i], fv[i]));
    out = cartesian(out);
    return out;
};


function formazottExpHTMLb(a) {
    var txt = "<sup class='binh'>" + a + "</sup>";
    return txt;
};

function formazottExpHTMLb1(a) {
    var txt = "<sup class='binh1'>" + a + "</sup>&lowast;";
    return txt;
};

function grpsForm(cv, av, fv) {
    var out = [];
    for (var i = 0; i < cv.length; i++)
        out.push(grp(cv[i], av[i], fv[i]).map(y => toBinomForm(av[i], y, COLORS[i] + "45")));
    out = cartesian(out);
    return out;
};

function drawPz(n, k) {
    return "<span style='margin:0 5px;padding: 0 0.12em;display:inline-block;border-left: 1px solid;border-right: 1px solid;vertical-align:middle'><table style='text-align:center;border-collapse: collapse;border-left: 1px solid;border-right: 1px solid;'><tr><td style='padding: 0 3px;'>" + n + "</td></tr><tr><td>" + k + "</td></tr></table></span>";
};

function toBinomForm(a, v, color) {
    const gr = _.countBy(v);
    var frac = "";
    var binom = "";
    _.forEach(gr, function(key, value) {
        frac += (key * 1) + "!&lowast;";
        binom += drawBinomial(a, value) + formazottExpHTMLb(key)
    });
    frac = frac.slice(0, -8);
    const txt = "<span style='box-shadow:inset  0 0 15px 10px " + color + ";padding-top:7px;border-radius:7px;display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;'><table style='border-collapse: collapse;margin: 0 5px;'><tr><td style='border-bottom:1px solid;'>" + binom + "</td></tr><tr><td>" + frac + "</td></tr></table></span><span class='tblpr'>&lowast;</span>"
    return txt;
};

function grpsForm1(cv, av, fv) {
    var out = [];
    for (var i = 0; i < cv.length; i++)
        out.push(grp(cv[i], av[i], fv[i]).map(y => toBinomForm1(av[i], y, COLORS[i] + "45")));
    out = cartesian(out);
    return out;
};

function toBinomForm1(a, v, color) {
    const gr = _.countBy(v);
    var frac = "";
    var binom = "";
    _.forEach(gr, function(key, value) {
        frac += factorial(key * 1) + "&lowast;";
        binom += binomial(a, value) + formazottExpHTMLb1(key)
    });
    frac = frac.slice(0, -8);
    binom = binom.slice(0, -8);
    const txt = "<span style='box-shadow:inset  0 0 10px 7px " + color + ";padding-top:7px;border-radius:7px;display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;'><table style='border-collapse: collapse;margin: 0 5px;'><tr><td style='border-bottom:1px solid;'>" + binom + "</td></tr><tr><td>" + frac + "</td></tr></table></span><span class='tblpr1'>&lowast;</span>"
    return txt;
};


function grpsForm2(cv, av, fv) {
    var out = [];
    for (var i = 0; i < cv.length; i++)
        out.push(grp(cv[i], av[i], fv[i]).map(y => toBinomForm2(av[i], y, COLORS[i] + "45")));
    out = cartesian(out);
    return out;
};

function toBinomForm2(a, v, color) {
    const gr = _.countBy(v);
    var frac = 1;
    var binom = 1;
    _.forEach(gr, function(key, value) {
        frac *= factorial(key * 1);
        binom *= Math.pow(binomial(a, value), key)
    });
    const txt = "<span style='box-shadow:inset 0 0 15px 10px " + color + ";padding-top:7px;border-radius:7px;display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;'><table style='border-collapse: collapse;margin: 0 5px;'><tr><td style='border-bottom:1px solid;'>" + binom + "</td></tr><tr><td>" + frac + "</td></tr></table></span><span class='tblpr1'>&lowast;</span>"
    return txt;
};

function grpsForm3(cv, av, fv) {
    var out = [];
    for (var i = 0; i < cv.length; i++)
        out.push(grp(cv[i], av[i], fv[i]).map(y => toBinomForm3(av[i], y)));
    out = cartesian(out);
    return out;
};

function toBinomForm3(a, v) {
    const gr = _.countBy(v);
    var frac = 1;
    var binom = 1;
    _.forEach(gr, function(key, value) {
        frac *= factorial(key * 1);
        binom *= Math.pow(binomial(a, value), key)
    });
    return Fraction(binom, frac);
};

$(document).on('click', '.pzjelento', function() {
    if ($(this).hasClass("monom-active")) {
        $('#pzoutr,#nyil').remove();
        $(this).removeClass("monom-active");
    } else {
        $('#pzoutr,#nyil').remove();
        $(this).after('<span id="nyil">▶</span><p id="pzoutr"></p>');
        $('.pzjelento.monom-active').removeClass("monom-active");
        $(this).addClass("monom-active");
        pzjelkell = false;
    }
});

function pzJelent(k, n, av, fv, el, b) {
    if (el.classList.contains("monom-active"))
        return;
    var elojel = "";
    if (((k + _.sum(fv)) % 2) == 1)
        elojel = "−";
    const kums = kum(fv);
    const r = av.length;
    var txt = "";
    var m = "";
    for (var i = 0; i < r; i++)
        m += "&zwj;x<sub>" + av[i] + "</sub>" + formazottExpHTML(fv[i]);
    const elojelstr = "<span style='line-height:1;display: inline-block;'>(-1)<sup class='binh5'>k + &sum;<var><b>f</b></var></sup></span>";
    const Cnk = "<span style='line-height:1;display: inline-block;'>C<sub>n</sub>(<var><b>a</b></var>;<var><b>f</b></var> )</span>";
    const aonf = "<span style='line-height:1;display: inline-block;'><var><b>a</b></var><sup class='binh4'><var><b>f</b></var></sup></span>";
    const astr = "(" + av.toString() + ")";
    const fstr = "(" + fv.toString() + ")";
    var oszto = 1;
    var ostr = "";
    var ostrab = "";
    for (var i = 0; i < r; i++) {
        oszto *= Math.pow(av[i], fv[i]);
        ostr += av[i] + "<sup class='binh1'>" + fv[i] + "</sup>&lowast;"
        ostrab += "a<sub>" + (i + 1) + "</sub><sup class='binh2'>f<sub>" + (i + 1) + "</sub></sup> &lowast;"
    };
    ostr = ostr.slice(0, -8);
    ostrab = ostrab.slice(0, -8);
    var comps = comp(n, r);
    for (var i = 0; i < r; i++) {
        comps = comps.filter(y => fv[i] <= y[i] && y[i] <= fv[i] * (av[i] - 1));
    };
    var sorokv = [];
    var sorokv1 = [];
    var sorokv2 = [];
    var sorokv3 = [];
    var sorok = [];
    var sorokbf = [];
    var sorokbf1 = [];
    var sorokbf2 = [];
    var sorokbf3 = [];
    for (let y of comps) {
        var v = grps0(y, av, fv);
        sorokv.push(grpsForm(y, av, fv));
        sorokv1.push(grpsForm1(y, av, fv));
        sorokv2.push(grpsForm2(y, av, fv));
        sorokv3.push(grpsForm3(y, av, fv));
        sorok.push(v.map(y => _.flatten(y)));
    }
    sorokv = _.flatten(sorokv);
    sorokv1 = _.flatten(sorokv1);
    sorokv2 = _.flatten(sorokv2);
    sorokv3 = _.flatten(sorokv3);
    sorok = _.flatten(sorok);
    for (let c of sorokv) {
        var bf = "";
        for (let y of c) {
            bf += y;
        }
        bf = bf.slice(0, -36);
        sorokbf.push(bf);
    };
    for (let c of sorokv1) {
        var bf = "";
        for (let y of c) {
            bf += y;
        }
        bf = bf.slice(0, -36);
        sorokbf1.push(bf);
    };
    for (let c of sorokv2) {
        var bf = "";
        for (let y of c) {
            bf += y;
        }
        bf = bf.slice(0, -36);
        sorokbf2.push(bf);
    };
    for (let c of sorokv3) {
        var bf = Fraction(1, 1);
        for (let y of c) {
            bf = bf.mul(y);
        }
        sorokbf3.push(bf);
    };
    var ns = sorok.length;
    var sum = Fraction(0);
    for (let t of sorokbf3)
        sum = sum.add(t);
    var cer = sum.mul(Fraction(1, oszto));
    sum = formazottTortHTML(sum.n, sum.d);


    txt += "Az " + m + " monom <b>C = " + elojel + formazottTortHTML(cer.n, cer.d) + "</b> együtthatóját szeretnénk kiszámítani a(z) " + drawPz(k, n) + "alappolinomban. A C együttható három tényező szorzata:<div style='text-align:center;margin: 15px 0;'><span style='padding:15px 20px 20px 17px;outline:2px solid #535353;'> C = Előjel &lowast; " + formazottTortHTML(1, "Osztó") + " &lowast; Kombinatorikus tag = " + elojelstr + "  &nbsp;&lowast; " + formazottTortHTML(1, aonf) + " &nbsp;&lowast; " + Cnk + "</span></div>";
    txt += "A monom alsó indexeiből, illetve kitevőiből képezhető az <var><b>a</b></var> = " + astr + " indexvektor, illetve az <var><b>f</b></var> = " + fstr + " kitevővektor.";
    txt += "<ol><li><b>Előjel:</b> " + elojelstr + "  = (-1)<sup class='binh5'>" + k + " + " + fstr.replace("(", "").replace(")", "").replaceAll(",", " + ") + "</sup> =  (-1)<sup class='binh5'>" + (k + _.last(kums)) + "</sup> = " + elojel + "1";
    txt += "</li><li><b>Osztó:</b> " + aonf + "  &nbsp;= " + ostrab + " = " + ostr + " = " + oszto;
    txt += "</li><li><b>Kombinatorikus tag:</b> " + Cnk + "  &nbsp;= C<sub>" + n + "</sub>(" + astr + ";" + fstr + ")</li></ol>"
    txt += "A " + Cnk + " kombinatorikus tag kiszámításához a Pascal-háromszög a<sub>i</sub>-edik sorából (a legszélső elemeket elhagyva) f<sub>i</sub> darab binomiális együtthatót kell (<i>ismétlődést is megengedve</i>) kiválasztani az összes lehetséges módon  úgy, hogy az alsó számok összege  n legyen (a felső számok összege ekkor már biztosan k lesz). Minden egyes kiválasztásban a kiválasztott binomiális együtthatókat összeszorozzuk és osztunk az ismétlődések számának faktoriálisaival. A " + Cnk + " kombinatorikus tag az így nyert számok összege. A jelen példában a szélek elhagyásával kapott Pascal-háromszög  <ul>";
    for (var i = 0; i < r; i++)
        txt += "<li> " + av[i] + ". sorából " + fv[i] + " elemet";
    txt += "</ul>  kell  kiválasztani (ismétlődést is megengedve) úgy, hogy az alsó számok összege  n = " + n + " legyen. A lehetséges kiválasztásokat és  az azokhoz kiszámított szorzatokat találjuk az alábbi táblázatban."
    txt += "<br/><table id='pqnrtbl'><tr style='border-top:2px solid;border-bottom:2px solid;'><th style=';border-left:2px solid;border-right:2px solid;'></th>";
    var szinszml0 = 0;
    for (var i = 0; i < av.length; i++) {
        var color = COLORS[szinszml0] + "35";
        for (var j = 0; j < fv[i]; j++) {
            if (j == fv[i] - 1) {
                txt += "<th style='border-right:1px solid;background-color:" + color + ";'>" + av[i] + "</th>";
                szinszml0++;
            } else
                txt += "<th style='background-color:" + color + ";'>" + av[i] + "</th>";
        }
    };
    txt += "<th colspan='4' style='border-right:1px solid;'>Számítások</th>"
    txt += "</tr>";
    for (var i = 0; i < ns; i++) {
        var szamlalo = 0;
        var szinszml = 0;
        txt += "<tr style='border-bottom:2px solid'><td class='sorkezdo'>" + (i + 1) + ". </td>";
        for (let y of sorok[i]) {
            szamlalo++;
            var color = COLORS[szinszml] + "35";
            if (kums.includes(szamlalo)) {
                txt += "<td style='border-right:1px solid;background-color:" + color + ";'>" + y + "</td>";
                szinszml++;
            } else
                txt += "<td style='background-color:" + color + ";'>" + y + "</td>";
        };
        txt += "<td style='padding:10px;border-right:1px solid;'>" + sorokbf[i] + "</td>";
        txt += "<td style='padding:10px;border-right:1px solid;'>" + sorokbf1[i] + "</td>";
        txt += "<td style='padding:10px;border-right:1px solid;'>" + sorokbf2[i] + "</td>";
        var bf = sorokbf3[i];
        txt += "<td style='padding:10px;border-right:1px solid;'>" + formazottTortHTML(bf.n, bf.d) + "</td>";
        txt += "</tr>";
    };

    txt += "<tr><td colspan='" + (_.last(kums) + 4) + "' style='text-align:right;'>C<sub>" + n + "</sub>(" + astr + ";" + fstr + ") = &sum; = </td><td style='border:2px solid;background-color: #d7d7d7;padding: 5px 2px;'>" + sum + "</td></tr>";
    txt += "</table><br/><br/>";
    txt += " A monom együtthatója: C = " + elojelstr + "  &nbsp;&lowast; " + formazottTortHTML(1, aonf) + " &nbsp;&lowast; " + Cnk + " = " + elojel + formazottTortHTML(1, oszto) + " &lowast;" + sum + " = ";
    txt += "<span style='margin-left:7px;display:inline-block;outline:4px solid #444444;outline-offset:2px;padding:2px 10px 0 10px;'>" + elojel + formazottTortHTML(cer.n, cer.d) + "</span><br/>&nbsp;";
    var elem;
    var id = "pzoutr";
    if (!b)
        id = "pzoutr01";
    setTimeout(() => {
        elem = document.getElementById(id);
        elem.innerHTML = txt;
        $(elem).css({ 'background-color': '#f1ffe1', 'padding': '5px 10px' });
        elem.scrollIntoView({
            behavior: "smooth",
            block: 'start'
        });
    }, 100)
};

// int01

function setOutputFontpqn01(v) {
    document.getElementById("pqn01out").style.fontSize = v + "px";
};

function setOutputFontpqnd01(v) {
    document.getElementById("pqnd01out").style.fontSize = v + "px";
};

function Cpqnp1q1(p, q, n, p1, q1) {
    var sum = Math.pow(-1, p + q - p1 - q1 + 1) * (n - 1) * binomial(p + q - p1 - q1, p - p1);
    var W = 0;
    for (var L = 1; L < n; L++) {
        for (var k = p1; k < p + 1; k++) {
            for (var j = q1 - 1; j < q + 1; j++) {
                var W = 0;
                for (var w = 1; w < L + 1; w++) {
                    var nu = Math.pow(-1, w) * binomial(L, w);
                    var de = Math.pow(w, q - j);
                    W += nu / de;
                };
                var nuu = Math.pow(-1, L + k + j + p1 + q1) * binomial(n, L + 1) * binomial(k + j - p1 - q1, k - p1) * r_stirlingNumber(L + 2, p - k + 2, 2);

                var os = 0;
                var dee = factorial(L);
                var e = nuu / dee;
                os += e * W;
                sum += os;
            };
        };
    };
    sum *= factorial(p) * factorial(q);
    return sum;
};

function Cpqnp1q1Q(p, q, n, p1, q1) {
    var sum = Fraction(Math.pow(-1, p + q - p1 - q1 + 1) * (n - 1) * binomial(p + q - p1 - q1, p - p1), 1);
    for (var L = 1; L < n; L++) {
        for (var k = p1; k < p + 1; k++) {
            for (var j = q1 - 1; j < q + 1; j++) {
                var W = Fraction(0, 1);
                for (var w = 1; w < L + 1; w++) {
                    var nu = Math.pow(-1, w) * binomial(L, w);
                    var de = Math.pow(w, q - j);
                    W = W.add(Fraction(nu, de));
                };
                var nnu = Fraction(Math.pow(-1, L + k + j + p1 + q1) * binomial(n, L + 1) * binomial(k + j - p1 - q1, k - p1) * r_stirlingNumber(L + 2, p - k + 2, 2), 1);
                var os = Fraction(0, 1);
                var dee = factorial(L);
                var e = Fraction(nnu, dee);
                os = e.mul(W);
                sum = sum.add(os);
            };
        };
    };
    return sum;
};

function p1q1Coeff(k, n, av, fv) {
    const N = av.length;
    const elojel = Math.pow(-1, k + _.sum(fv));
    var oszto = 1;
    for (var i = 0; i < N; i++)
        oszto *= Math.pow(av[i], fv[i]);
    var s = elocomp(n, av, fv);
    s = Fraction(elojel * s[0], s[1] * oszto);
    return s;
};

function pqnCoeff(p, q, n, m) {
    const av = m[0];
    const fv = m[1];
    const sf = _.sum(fv);
    const fakt = factorial(p) * factorial(q);
    var saf = 0;
    var sum = Fraction(0);
    for (var t = 0; t < av.length; t++)
        saf += av[t] * fv[t];
    for (var q1 = 1; q1 <= q + 1; q1++) {
        for (var p1 = p + 1 - n; p1 <= p; p1++) {
            const k = p1 + q1;
            if (saf == k) {
                var c = p1q1Coeff(k, p1, av, fv).mul(Cpqnp1q1Q(p, q, n, p1, q1));
                sum = sum.add(c);
            }
        };
    };
    if (saf == p + q + 1)
        sum = sum.add(p1q1Coeff(p + q + 1, p, av, fv))
    sum = sum.mul(fakt);
    return sum;
};

function zetamonom(av, fv) {
    const n = av.length;
    var out = "";
    for (i = 0; i < n; i++) {
        if (fv[i] * 1 == 1)
            out += "zeta(" + av[i] + ")*";
        else
            out += "zeta(" + av[i] * 1 + ")^" + fv[i] * 1 + "*";
    }
    out = out.slice(0, -1);
    return out;
};

function PzZeta(k, n) {
    var txt = "";
    var ertek = ""
    const fakt = factorial(n) * factorial(k - n - 1);
    var parts = part(k, n);
    parts = parts.map(y => _.countBy(y)).map(z => [Object.keys(z).map(t => 1 * t), Object.values(z)]);
    for (let v of parts) {
        var av = v[0];
        var fv = v[1];
        var c = prCoeff(k, n, av, fv);
        c[1] = fractionReduce(c[1][0] * fakt, c[1][1]);
        if (c[1][0] != 0) {
            var m = "";
            for (var i = 0; i < av.length; i++)
                m += "&zwj;&zeta;(" + av[i] + ")" + formazottExpHTML(fv[i]);
            m = "<span class='pzjelento' onclick='intJelent(" + k + "," + n + "," + JSON.stringify(av) + "," + JSON.stringify(fv) + ",this,true);'>" + m + "</span>"
            if (c[1][0] * c[1][1] != 1) {
                txt += c[0] + formazottTortHTML(c[1][0], c[1][1]) + "&lowast;" + m;
                ertek += c[0] + "(" + c[1][0] + "/" + c[1][1] + ")*" + zetamonom(av, fv);
            } else {
                txt += c[0] + m;
                ertek += c[0] + zetamonom(av, fv);
            }
        };
    };

    if (txt.startsWith(" + "))
        txt = txt.slice(2);
    return [txt, ertek];
};

$(document).on('click', '.int01jelento', function() {
    if ($(this).hasClass("monom-active")) {
        $('#pzoutr01,#int01nyil').remove();
        $(this).removeClass("monom-active");
    } else {
        $('#pzoutr01,#int01nyil').remove();
        $(this).after('<span id="int01nyil">▶</span><p id="pzoutr01"></p>');
        $('.int01jelento.monom-active').removeClass("monom-active");
        $(this).addClass("monom-active");
        pzjelkell = false;
    }
});

function makeCpqnTbl(p, q, n, N) {

    var txt = "<table id='Cpqntbl'><tr><th>p1/q1</th>";
    for (var j = 0 - N; j < n + N; j++)
        txt += "<th class='rstb'>" + (q + 1 - j) + "</th>";
    txt += "</tr>";
    for (var p1 = 0 - N; p1 < n + N; p1++) {
        txt += "<tr><th class='rstb'>" + (p - p1) + "</th>";
        for (var q1 = 0 - N; q1 < n + N; q1++) {
            var ert = Cpqnp1q1Q(p, q, n, p - p1, q + 1 - q1);
            var elojel = "";
            if (ert.s == -1)
                elojel = "&minus;";
            txt += "<td style='text-align:center;border: 1px solid #d2d2d2;min-width:max-content;'>" + elojel + formazottTortHTML(ert.n, ert.d) + "</td>";
        }
        txt += "</tr>";
    };
    txt += "</table>";
    return txt;
}

function formazottExpHTMLb2(a) {
    var txt = "<sup class='binh6'>" + a + "</sup>";
    return txt;
};

function intJelent(k, n, av, fv, el, spec) {
    if (el.classList.contains("monom-active"))
        return;
    const p = document.getElementById("p01").value * 1;
    const q = document.getElementById("q01").value * 1;
    var nsp = n;
    if (spec)
        nsp = 1;
    const txtint = "I<sub>" + p + "," + q + "," + nsp + "</sub> = <span class='block' style='margin:25px 10px;'><span class='sqrt-prefix sdefint' style='right: -0.7em;transform: scale(1.38424, 3.1);'>∫</span><sub class='sdefint' style='vertical-align: -120%;'><span>0</span></sub><sup class='sdefint' style='left:0.15em;'><span>1</span></sup> <span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>ln<sup>" + p + "</sup><span class='block'><span class='paren' style='transform: scale(0.99697, 1.03409);'>(</span><span class='block'>x</span><span class='paren' style='transform: scale(0.99697, 1.03409);'>)</span>&lowast;</span>ln<sup class=''>" + q + "</sup><span class='block'><span class='paren' style='transform: scale(0.99697, 1.03409);'>(</span><span class='block'>1<span class='binary-operator'>−</span>x</span><span class='paren' style='transform: scale(0.99697, 1.03409);'>)</span></span></span><span class='denominator'><span class='block'><span class='paren' style='transform: scale(1.00202, 1.06061);'>(</span><span class='block'>1<span class='binary-operator'>−</span>x</span><span class='paren' style='transform: scale(1.00202, 1.06061);'>)</span></span> <sup class=''>" + nsp + "</sup> </span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span>";
    const kums = kum(fv);
    const sf = _.last(kums);
    const r = av.length;
    const astr = "(" + av.toString() + ")";
    const fstr = "(" + fv.toString() + ")";
    var absum = "<b>a</b><b>f</b> = &sum;a<sub>i</sub>&lowast;b<sub>i</sub> = ";
    for (var h = 0; h < r; h++)
        absum += av[h] + "&lowast;" + fv[h] + " + ";
    absum = absum.slice(0, -3)
    absum += " = " + k;
    const fsum = "&sum;<b>f</b> = " + fstr.replace("(", "").replace(")", "").replaceAll(",", " + ") + " = " + sf;
    var txt = "";
    var m = "";
    for (var i = 0; i < r; i++)
        m += "&zwj;&zeta;(" + av[i] + ")" + formazottExpHTML(fv[i]);
    var mx = "";
    for (var i = 0; i < r; i++)
        mx += "&zwj;x<sub>" + av[i] + "</sub>" + formazottExpHTMLb2(fv[i]);
    const ah = Math.max(k - q - 1, p + 1 - n, sf);
    const fh = Math.min(k - sf, p);
    var indx = [];
    for (var i = ah; i <= fh; i++)
        indx.push(i);
    const indxstr = "[" + indx.toString() + "]";
    const N = Math.max(q + 2 - n - k + fh, 0);
    const tbl = makeCpqnTbl(p, q, n, N);
    const fakt = factorial(p) * factorial(q);
    var sum = Fraction(0);
    var cer = pqnCoeff(p, q, n, [av, fv]);
    if (spec)
        cer = p1q1Coeff(p + q + 1, p, av, fv).mul(fakt);
    var elojeler = "";
    if (cer.s < 0)
        elojeler = " −";
    if (spec)
        txt += "<div style='outline:2px solid red;'>Az n =1 speciális eset, amely jelentősen eltér az n > 0 esttől, és még nem teljesen implementált. Az esetek többségében helyesen működik, de előjelhibák előfordulhatnak!</div>"
    txt += "Az " + m + " monom <b>C = " + elojeler + formazottTortHTML(cer.n, cer.d) + "</b> együtthatóját szeretnénk kiszámítani az " + txtint + "határozott integrálban.<br/>";
    txt += "A monom alsó indexeiből, illetve kitevőiből képezhető az <b>a</b> = " + astr + " indexvektor, illetve az <b>f</b> = " + fstr + " kitevővektor.<br/>Az I<sub>" + p + "," + q + "," + nsp + "</sub> integrál az alábbi képlettel számítható:"
    txt += "<div style='text-align:center;margin: 15px 0;'><span style='padding:20px;outline:2px solid #535353;'> I<sub>" + p + "," + q + "," + nsp + "</sub> = p! q!&lowast;&sum;<sub>k&in;T</sub> C<sub>p,q,n</sub>(k,<b>a</b><b>f</b>-k)&lowast;<span style='display: inline-block;transform: scale(1.2,1.7);margin-right: 0.2em;'>[</span>x<sub><b>a</b></sub><sup style='margin-left:-0.2em;font-size:80%;'><b>f</b></sup><span style='display: inline-block;transform: scale(1.2,1.7);margin-left: 0.2em;'>]</span>" + drawPz('<b>a</b><b style=\"margin-right:3px;\">f</b>', 'k') + "</span></div>";
    txt += "Ahol <ul><li>p! q! = " + p + "! " + q + "! = " + factorial(p) + "&lowast;" + factorial(q) + " = " + fakt + ";</li><li>" + fsum + ";</li><li>" + absum + ";</li><li>x<sub><b>a</b></sub><sup style='margin-left:-0.2em;font-size:80%;'><b>f</b></sup> = " + mx + ";</li><li>A T indexhalmaz a [max(<b>a</b><b>f</b> - q - 1, p + 1 - n, &sum;<b>f</b>); min(<b>a</b><b>f</b> - &sum;<b>f</b>, p)] = [max(" + k + " - " + q + " - 1, " + p + " + 1 - " + nsp + ", " + sf + "); min(" + k + " - " + sf + ", " + p + ")] = [max(" + (k - q - 1) + ", " + (p + 1 - n) + ", " + sf + "); min(" + (k - sf) + ", " + p + ")] = " + indxstr + " zárt intervallum;</li><li><span style='display: inline-block;transform: scale(1.2,1.7);margin-right: 0.2em;'>[</span>x<sub><b>a</b></sub><sup style='margin-left:-0.2em;font-size:80%;'><b>f</b></sup><span style='display: inline-block;transform: scale(1.2,1.7);margin-left: 0.2em;'>]</span>" + drawPz('<b>a</b><b style=\"margin-right:3px;\">f</b>', 'k') + ": Az x<sub><b>a</b></sub><sup style='margin-left:-0.2em;font-size:80%;'><b>f</b></sup> monomnak az " + drawPz('<b>a</b><b style=\"margin-right:3px;\">f</b>', 'k') + " alappolinombeli együtthatóját jelenti;</li></ul>";
    txt += " A most kiszámított mennyiségeket behelyettesítve: <div style='text-align:center;margin: 15px 0;'><span style='padding:20px;outline:2px solid #535353;'> I<sub>" + p + "," + q + "," + nsp + "</sub> = " + fakt + "&lowast;&sum;<sub>k&in;" + indxstr + "</sub> C<sub>" + p + "," + q + "," + nsp + "</sub>(k," + k + "-k)&lowast;<span style='display: inline-block;transform: scale(1.2,1.7);margin-right: 0.2em;'>[</span>" + mx + "<span style='display: inline-block;transform: scale(1.2,1.7);margin-left: 0.2em;'>]</span>" + drawPz(k, 'k') + "</span></div>";
    txt += "A C(p,q,n,p<sub>1</sub>,q<sub>1</sub>) menyiségek nagyon bonyolultan számíthatók:";
    txt += "<div id='cpgnform' style='margin: 10px 0;background-color: #d9d9d9;padding: 5px;border: 2px solid black;width: max-content;'>\\[C(p,q,n,p_{1},q_{1}) = \\sum_{L=1}^{n-1}\\dfrac{(-1)^{L}}{L!}\\dbinom{n}{L+1}\\sum_{k=p_{1}}^{p}(-1)^{k}\\left[\\begin{array}{c} L+2\\\\ p-k+2 \\end{array}\\right]_{2}\\sum_{j=q_{1}-1}^{q}(-1)^{j}\\dbinom{k+j-p_{1}-q_{1}}{k-p_{1}}\\sum_{w=1}^{L}\\dfrac{(-1)^{w}}{w^{q-j}}\\dbinom{L}{w}-(-1)^{p+q-p_{1}-q_{1}}\\max(1,n-1)\\dbinom{p+q-p_{1}-q_{1}}{p-p_{1}}\\]</div>"
    txt += "A C<sub>" + p + "," + q + "," + nsp + "</sub>(k," + k + "-k) együtthatók értékeit az alábbi táblázatból kereshetjük ki: <div style='text-align:center;'>" + tbl + "</div>";
    txt += "<br/>A <span style='display: inline-block;transform: scale(1.2,1.7);margin-right: 0.2em;'>[</span>" + mx + "<span style='display: inline-block;transform: scale(1.2,1.7);margin-left: 0.2em;'>]</span>" + drawPz(k, 'k') + " együtthatókat pedig már a korábban megismert módon számíthatjuk. A képletben szereplő összeg  tagjait az alábbi táblázatban rendeztük el:<br/><table id='pqnrtbl'><tr style='border:2px solid black;'><td style='padding:5px 7px;'>k</th><td style='border-left:2px solid black;padding:5px 7px;'>C(k) = C(" + p + "," + q + "," + nsp + ",k," + k + "-k) </td><td style='border-left:2px solid black;padding:5px 7px;'> P(k) = <span style='display: inline-block;transform: scale(1.2,1.5);'>[</span>" + mx + "<span style='display: inline-block;transform: scale(1.2,1.5);'>]</span>" + drawPz(k, 'k') + "</td><td style='border-left:2px solid black;padding:5px 7px;'>C(k)&lowast;P(k)</td></tr>";
    for (let j of indx) {
        var c = Cpqnp1q1Q(p, q, n, j, k - j)
        var elojel = "";
        if (c.s < 0)
            elojel = " −";
        var pr = p1q1Coeff(k, j, av, fv);
        var elojel1 = "";
        if (pr.s < 0)
            elojel1 = " −";
        var cpr = c.mul(pr);
        sum = sum.add(cpr);
        var elojel2 = "";
        if (cpr.s < 0)
            elojel2 = " −";
        txt += "<tr><th style='border-left:2px solid;'>" + j + "</th><td  style='border-left:2px solid black;padding:5px 10px;'>C(" + j + "," + (k - j) + ") = " + elojel + formazottTortHTML(c.n, c.d) + "</td><td class='int01jelento' style='border-left:2px solid black;cursor:pointer;' onclick='pzJelent(" + k + "," + j + "," + JSON.stringify(av) + "," + JSON.stringify(fv) + ",this,false);'>" + elojel1 + formazottTortHTML(pr.n, pr.d) + "</td><td style='border-left:2px solid;border-right:2px solid black;'>" + elojel2 + formazottTortHTML(cpr.n, cpr.d) + "</td></tr>";
    };
    var ee = ""
    if (sum.s < 0)
        ee = " −";
    txt += "<tr><td colspan='3' style='text-align:right;border-top:2px solid black;'> &sum; = </td><td style='border:2px solid black;background-color: #d7d7d7;padding: 5px 2px;'>" + ee + formazottTortHTML(sum.n, sum.d) + "</td></tr>";
    txt += "</table><br/><br/>";
    txt += "C = " + ee + formazottTortHTML(sum.n, sum.d) + " &lowast;" + fakt + " = <span style='margin-left:7px;display:inline-block;outline:4px solid #444444;outline-offset:2px;padding:2px 10px 0 10px;'>" + elojeler + formazottTortHTML(cer.n, cer.d) + "</span><br/>&nbsp;";
    var elem;
    setTimeout(() => {
        elem = document.getElementById("pzoutr");
        elem2 = document.getElementById("pqnform");
        elem.innerHTML = txt;
        elem.scrollIntoView({
            behavior: "smooth",
            block: 'start'
        });
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem2]);
        for (let j of indx) {
            $('#Cpqntbl tr:nth-child(' + (p - j + 2 + N) + ')  td:nth-child(' + (q - k + j + 3 + N) + ')').css({ 'background-color': ' #fde8a7' });
        }
    }, 100)
};

function int01() {
    var elem = document.getElementById("pqn01out");
    const p = document.getElementById("p01").value * 1;
    const q = document.getElementById("q01").value * 1;
    const n = document.getElementById("n01").value * 1;
    const tblmode = document.getElementById("settblmode").checked;
    var txt = "";
    var txtfej = "";
    if (tblmode) {
        const N = document.getElementById("Nc").value * 1;
        txt += makeCpqnTbl(p, q, n, N);
    } else {
        if (n > p)
            txtfej += "<span style='color:red;font-size:140%;'>A képlet csak akkor ad helyes eredményt, ha az 'n' ( = " + n + ") paraméter értéke nem haladja meg a 'p' ( = " + p + ") paraméter értékét. (<b>Ha n > p, akkor az integrál értéke ∞</b>, ami nem egyezik a zetákkal számított véges értékkel.)</span><hr/>";
        txtfej += "<span class='block' style='margin:25px 10px;'><span class='sqrt-prefix sdefint' style='right: -0.7em;transform: scale(1.38424, 3.1);'>∫</span><sub class='sdefint'><span>0</span></sub><sup class='sdefint' style='left:0.15em;'><span>1</span></sup> <span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>ln<sup>" + p + "</sup><span class='block'><span class='paren' style='transform: scale(0.99697, 1.03409);'>(</span><span class='block'>x</span><span class='paren' style='transform: scale(0.99697, 1.03409);'>)</span>&lowast;</span>ln<sup class=''>" + q + "</sup><span class='block'><span class='paren' style='transform: scale(0.99697, 1.03409);'>(</span><span class='block'>1<span class='binary-operator'>−</span>x</span><span class='paren' style='transform: scale(0.99697, 1.03409);'>)</span></span></span><span class='denominator'><span class='block'><span class='paren' style='transform: scale(1.00202, 1.06061);'>(</span><span class='block'>1<span class='binary-operator'>−</span>x</span><span class='paren' style='transform: scale(1.00202, 1.06061);'>)</span></span> <sup class=''>" + n + "</sup> </span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span> = ";
        var ertek = "";
        for (var k = 1; k <= p + q; k++) {
            var parts = part(k);
            parts = parts.map(y => _.countBy(y)).map(z => [Object.keys(z).map(t => 1 * t), Object.values(z)]);
            for (let m of parts) {
                var coeff = pqnCoeff(p, q, n, m);
                if (coeff != 0) {
                    var av = m[0];
                    var fv = m[1];
                    var elojel = " + ";
                    if (coeff.s == -1)
                        elojel = " − ";
                    ertek += "+" + coeff.toFraction() + "*" + zetamonom(av, fv);
                    var ms = "";
                    for (var i = 0; i < av.length; i++)
                        ms += "&zwj;&zeta;(" + av[i] + ")" + formazottExpHTML(fv[i]);
                    ms = "<span class='pzjelento' onclick='intJelent(" + k + "," + n + "," + JSON.stringify(av) + "," + JSON.stringify(fv) + ",this,false);'>" + ms + "</span>";
                    txt += elojel + formazottTortHTML(coeff.n, coeff.d) + "&zwj;&lowast;" + ms;
                };
            };
        }
        ertek = ertek.replaceAll("+-", " - ");
        if (txt == "") {
            var txtp = PzZeta(p + q + 1, p);
            txt += txtp[0];
            ertek += txtp[1];
            ertek = ertek.replaceAll("−", "-");
        };
        ertek = "var('ern')\nern = numerical_integral(ln(x)^" + p + "*ln(1-x)^" + q + "/(1-x)^" + n + ",0,1)\nshow('1. The exact value with zetas:',fontsize=20)\nshow('\\n')\nshow(n(" + ertek + ",digits = 40),LatexExpr(r'=')," + ertek + ")";
        ertek += "\nshow('\\n')\nshow('2. Checking by numererical_integral() command',fontsize=20)\nshow('\\n')\nshow(integrate(ln(x)^" + p + "*ln(1-x)^" + q + "/(1-x)^" + n + ",x,0,1,hold=True),LatexExpr(r'='),ern[0],LatexExpr(r'\\pm'),ern[1])\nshow('\\n')\np=plot(ln(x)^" + p + "*ln(1-x)^" + q + "/(1-x)^" + n + ",x,0,1,legend_label='$\\\\dfrac{\\\\ln^{" + p + "}(x)\\\\cdot\\\\ln^{" + q + "}(1-x)}{(1-x)^" + n + "}$',fill='axis',color='blue',fillcolor='blue',fillalpha='0.2',thickness='2',title=\"Plot $\\\\dfrac{\\\\ln^{" + p + "}(x)\\\\cdot\\\\ln^{" + q + "}(1-x)}{(1-x)^{" + n + "}}$ on interval [0,1]\")\np += line([(0,0),(1,0)],thickness=\"2\", color='blue')\np.set_legend_options(back_color=(0.9,0.9,0.9), shadow=False,fontsize=20)\nd = p.get_axes_range()\ndd = (d['ymax']+d['ymin'])*0.5\np += text(\"$\\\\int_{0}^{1}\\\\dfrac{\\\\ln^{" + p + "}(x)\\\\cdot\\\\ln^{" + q + "}(1-x)}{(1-x)^{" + n + "}}\\\\text{ d}x \\\\approx\"+str(ern[0])+\"$\", (0.6, dd), fontsize=12,  color='black')\nshow('3. Plotting the function:',fontsize=20)\nshow('\\n')\nshow(p)";
        int01ertek = ertek;
    };
    elem.innerHTML = txtfej + txt;
};

function W1(L, q) {
    var W = Fraction(0);
    for (var w = 1; w < L + 1; w++) {
        var nu = Math.pow(-1, w) * binomial(L, w);
        var de = Math.pow(w, q);
        W = W.add(Fraction(nu, de));
    };
    return W;
};

function def1(p, q, n) {
    var sum = Fraction(0);
    const e = Fraction(Math.pow(-1, p + q), factorial(n));
    const K = Math.min(n, p + 1) + 1;
    for (var k = 1; k < K; k++) {
        var t = Math.pow(-1, k) * stirlingNumber(n, k) * binomial(p + q + 1 - k, q);
        t = W1(n, p + q + 1 - k).mul(t);
        sum = sum.add(t);
    }
    sum = sum.mul(e);
    return sum;
}

function poztag(p, q, n, m, av, fv) {
    var sum = Fraction(0);
    var saf = 0;
    for (var t = 0; t < av.length; t++)
        saf += av[t] * fv[t];
    const K = -n - m;
    for (var k = 0; k <= K; k++) {
        var e = Math.pow(-1, n + k) * binomial(-m, -n - m - k);
        var s = Fraction(0);
        for (var p1 = 1; p1 <= p; p1++) {
            for (var q1 = 1; q1 <= q; q1++) {
                if (saf == (p1 + q1)) {
                    s = s.add(def1(p - p1, q - q1, k + 1).mul(p1q1Coeff(p1 + q1, p1, av, fv)));
                }
            }
        }
        sum = sum.add(s.mul(e));
    };
    return sum;
};

function consttag(p, q, n, m) {
    const K = -n - m;
    var sum = Fraction(0);
    for (var k = 0; k <= K; k++) {
        var e = Math.pow(-1, n + k) * binomial(-m, -n - m - k);
        sum = sum.add(def1(p, q, k + 1).mul(e));
    };
    return sum;
};

function intd01() {
    var elem = document.getElementById("pqnd01out");
    const p = document.getElementById("pp01").value * 1;
    const q = document.getElementById("qq01").value * 1;
    const n = document.getElementById("nn01").value * 1;
    const m = document.getElementById("mm01").value * 1;
    const fakt = factorial(p) * factorial(q);
    var txt = "";
    var txtfej = "";

    if (m > p || n > q)
        txtfej += "<span style='color:red;font-size:140%;'>A képlet csak akkor ad helyes eredményt, ha az 'm' ( = " + m + ") paraméter értéke nem haladja meg a 'p' ( = " + p + ") paraméter értékét, és az 'n' ( = " + n + ") paraméter értéke nem haladja meg a 'q' ( = " + q + ") paraméter értékét. (<b>Ellenkező esetben az integrál értéke ∞</b>, ami nem egyezik a zetákkal számított véges értékkel.)</span><hr/>";
    txtfej += "<span class='block' style='margin:25px 10px;'><span class='sqrt-prefix sdefint' style='right: -0.7em;transform: scale(1.38424, 3.1);'>∫</span><sub class='sdefint'><span>0</span></sub><sup class='sdefint' style='left:0.15em;'><span>1</span></sup> <span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>ln<sup>" + p + "</sup><span class='block'><span class='paren' style='transform: scale(0.99697, 1.03409);'>(</span><span class='block'>x</span><span class='paren' style='transform: scale(0.99697, 1.03409);'>)</span>&lowast;</span>ln<sup>" + q + "</sup><span class='block'><span class='paren' style='transform: scale(0.99697, 1.03409);'>(</span><span class='block'>1<span class='binary-operator'>−</span>x</span><span class='paren' style='transform: scale(0.99697, 1.03409);'>)</span></span></span><span class='denominator'>x<sup>" + n + "</sup>&lowast;<span class='block'><span class='paren' style='transform: scale(1.00202, 1.06061);'>(</span><span class='block'>1<span class='binary-operator'>−</span>x</span><span class='paren' style='transform: scale(1.00202, 1.06061);'>)</span></span> <sup>" + m + "</sup> </span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span> = ";
    txtfej = txtfej.replace(/\<sup\>1\<\/sup\>/g, "<sup></sup>");
    var ertek = "";
    for (var l = 1; l <= p + q + 1; l++) {
        var parts = part(l);
        parts = parts.map(y => _.countBy(y)).map(z => [Object.keys(z).map(t => 1 * t), Object.values(z)]);
        for (let t of parts) {
            var coeff = Fraction(0);
            for (var k = 1; k <= n; k++)
                coeff = coeff.add(binomial(n + m - 1 - k, m - 1) * pqnCoeff(q, p, k, t));
            for (var k = 1; k <= m; k++)
                coeff = coeff.add(binomial(n + m - 1 - k, n - 1) * pqnCoeff(p, q, k, t));
            if (n <= 0 || m <= 0)
                coeff = coeff.add(poztag(p, q, n, m, t[0], t[1]).mul(fakt));
            if (coeff != 0) {
                var av = t[0];
                var fv = t[1];
                var elojel = " + ";
                if (coeff.s == -1)
                    elojel = " − ";
                ertek += "+" + coeff.toFraction() + "*" + zetamonom(av, fv);
                var ms = "";
                for (var i = 0; i < av.length; i++)
                    ms += "&zwj;&zeta;(" + av[i] + ")" + formazottExpHTML(fv[i]);
                ms = "<span class='pzjelento'>" + ms + "</span>";
                txt += elojel + formazottTortHTML(coeff.n, coeff.d) + "&zwj;&lowast;" + ms;
            };
        };
    }
    var ee = " + "
    const ktag = consttag(p, q, n, m).mul(fakt);
    if (ktag != 0) {
        if (ktag.s < 0)
            ee = " - ";
        txt += ee + formazottTortHTML(ktag.n, ktag.d)
        ertek += "+" + ktag.toFraction();
    };
    txt = txt.replace(/− 1(&zwj;)?&lowast;/g, " −").replace(/1(&zwj;)?&lowast;/g, "");
    txt = txt.replace(/\&lowast\;\<span class\=\'block\'\>\<span class\=\'paren\' style\=\'transform\: scale\(1\.00202\, 1\.06061\)\;\'\>\(\<\/span\>\<span class\=\'block\'\>1\<span class\=\'binary\-operator\'\>\−\<\/span\>x\<\/span\>\<span class\=\'paren\' style\=\'transform\: scale\(1\.00202\, 1\.06061\)\;\'\>\)\<\/span\>\<\/span\> \<sup\>0\<\/sup\> \<\/span\>/, '')
    if (txt.startsWith(" + ")) {
        txt = txt.slice(2);
        txt = "&nbsp;" + txt;
    };
    ertek = ertek.replaceAll("+-", "-");
    ertek = "var('ern')\nern = numerical_integral(ln(x)^" + p + "*ln(1-x)^" + q + "/(x^(" + n + ")*(1-x)^(" + m + ")),0,1)\nshow('1. The exact value with zetas:',fontsize=20)\nshow('\\n')\nshow(n(" + ertek + ",digits = 40),LatexExpr(r'=')," + ertek + ")";
    ertek += "\nshow('\\n')\nshow('2. Checking by numererical_integral() command',fontsize=20)\nshow('\\n')\nshow(integrate(ln(x)^" + p + "*ln(1-x)^" + q + "/(x^" + n + "*(1-x)^" + m + "),x,0,1,hold=True),LatexExpr(r'='),ern[0],LatexExpr(r'\\pm'),ern[1])\nshow('\\n')\np=plot(ln(x)^" + p + "*ln(1-x)^" + q + "/(x^" + n + "*(1-x)^" + m + "),x,0,1,legend_label='$\\\\dfrac{\\\\ln^{" + p + "}(x)\\\\cdot\\\\ln^{" + q + "}(1-x)}{(x^" + n + "*(1-x)^" + m + ")}$',fill='axis',color='blue',fillcolor='blue',fillalpha='0.2',thickness='2',plot_points=" + 300 + ",adaptive_recursion=" + 10 + ",adaptive_tolerance=" + 0.001 + ",title=\"Plot $\\\\dfrac{\\\\ln^{" + p + "}(x)\\\\cdot\\\\ln^{" + q + "}(1-x)}{x^{" + n + "}\\\\cdot (1-x)^{" + m + "}}$ on interval [0,1]\")\np += line([(0,0),(1,0)],thickness=\"2\", color='blue')\np.set_legend_options(back_color=(0.9,0.9,0.9), shadow=False,fontsize=20)\nd = p.get_axes_range()\ndd = (d['ymax']+d['ymin'])*0.5\np += text(\"$\\\\int_{0}^{1}\\\\dfrac{\\\\ln^{" + p + "}(x)\\\\cdot\\\\ln^{" + q + "}(1-x)}{x^{" + n + "}\\\\cdot (1-x)^{" + m + "}}\\\\text{ d}x \\\\approx\"+str(ern[0])+\"$\", (0.6, dd), fontsize=12,  color='black')\nshow('3. Plotting the function:',fontsize=20)\nshow('\\n')\nshow(p)";
    intd01ertek = ertek;
    elem.innerHTML = txtfej + txt;
};

function setOutputFontpqn011(v) {
    $('#ideout01 .sagecell_sessionOutput').css('font-size', v + 'px');
};

function sagepqn01() {
    $('#mycell01 .sagecell_editor textarea.sagecell_commands').val(int01ertek);
    $('#mycell01 .sagecell_input button.sagecell_evalButton').click();
    setOutputFontpqn011($('#outfont-sliderpqn011').val());
};

function setOutputFontpqnd011(v) {
    $('#ideoutd01 .sagecell_sessionOutput').css('font-size', v + 'px');
};

function sagepqnd01() {
    $('#mycelld01 .sagecell_editor textarea.sagecell_commands').val(intd01ertek);
    $('#mycelld01 .sagecell_input button.sagecell_evalButton').click();
    setOutputFontpqnd011($('#outfont-sliderpqnd011').val());
};

// ln^p(x)*ln^q(1-x)*x^n

function fpn(p, n, l, k) {
    var sum = Fraction(0);
    if (l <= p && k <= n) {
        for (var s = k; s <= n; s++) {
            var n1 = Math.pow(-1, s) * binomial(n - k, s - k);
            var d1 = Math.pow(s, p - l);
            sum = sum.add(Fraction(n1, d1));
        };
        const n2 = Math.pow(-1, p + k + l) * factorial(p - l) * binomial(p - 1, l - 1) * binomial(n, k);
        const pr = Fraction(n2, n);
        sum = sum.mul(pr);
    };

    return sum;
};

function fpnMat(p, n) {
    var mat = [];
    var b = [];
    for (var l = 1; l <= p; l++) {
        var sor = [];
        var sum = Fraction(0);
        var fakt = Math.pow(-1, l) * factorial(l - 1);
        for (var k = 1; k <= n; k++) {
            var er = fpn(p, n, l, k);
            sor.push(er);
            sum = sum.add(er);
        };
        mat.push(sor);
        b.push(sum.mul(fakt));
    };

    return [mat, [b]];
};

function fpnIter(matb) {
    const mat = matb[0];
    var b = matb[1];
    const p = mat.length;
    const n = mat[0].length;
    var out = [];
    var bnew = [];
    for (var l = 1; l <= p; l++) {
        var sor = [];
        var sumb = Fraction(0);
        var fakt = Math.pow(-1, l) * factorial(l - 1);
        for (var k = 1; k <= n; k++) {
            var sum = Fraction(0);
            for (var i = l; i <= p; i++) {
                for (var j = k; j <= n; j++) {
                    var er = fpn(i, j, l, k).mul(mat[i - 1][j - 1]);
                    sum = sum.add(er);
                }
            }
            sumb = sumb.add(sum);
            sor.push(sum);

        }
        bnew.push(sumb.mul(fakt));
        out.push(sor);
    };
    b.push(bnew);
    return [out, b];
};

function stranspose(mat) {
    const r = mat.length;
    const c = mat[0].length;
    var tmat = [];
    for (var j = 0; j < c; j++) {
        var sor = [];
        for (var i = r - 1; i >= 0; i--)
            sor.push(mat[i][j]);
        tmat.push(sor);
    };
    return tmat;
};

function fpnIterK(p, n, K) {
    var mat = fpnMat(p, n);
    for (var k = 1; k <= K; k++)
        mat = fpnIter(mat);
    mat[1] = stranspose(mat[1]);
    return mat;
};

function setOutputFontfpn(v) {
    document.getElementById("fpnout").style.fontSize = v + "px";
    $('.fpntblall table:not(.tort) td').css('height', (v * 2 + 9) + 'px');
    $('.fpntblall table.tort td').css('height', '');
};

function fpntbl(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var tbl = "<table id='fpn_" + p + "_" + n + "' class='fpntbl'>";
    for (i = 1; i <= p; i++) {
        tbl += "<tr>";
        for (j = 1; j <= n; j++) {
            var val = mat[i - 1][j - 1];
            var elojel = "";
            if (val.s == -1)
                elojel = " −";
            tbl += "<td id='fpn_" + i + "_" + j + "' style='text-align: center;border: 1px solid #d2d2d2; min-width: max-content;padding:0 3px;'>" + elojel + oformazottTortHTML(val.n, val.d) + "</td>"
        };
        tbl += "</tr>";
    };
    tbl += "</table>";
    return tbl;
};

function fpntbl0(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var tbl = "<table id='fpn_" + p + "_" + n + "' class='fpntbl'>";
    for (i = 1; i <= p; i++) {
        tbl += "<tr>";
        for (j = 1; j <= n; j++) {
            var ertek = "0";
            if (i == p && j == n)
                ertek = "1";
            tbl += "<td id='fpn_" + i + "_" + j + "' style='text-align: center;border: 1px solid #d2d2d2; min-width: max-content;padding:0 3px;'>" + ertek + "</td>";
        };
        tbl += "</tr>";
    };
    tbl += "</table>";
    return tbl;
};

function fpntblClick(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var tbl = "<table id='fpn_" + p + "_" + n + "' class='fpntblc'>";
    for (i = 1; i <= p; i++) {
        tbl += "<tr>";
        for (j = 1; j <= n; j++) {
            var val = mat[i - 1][j - 1];
            var elojel = "";
            if (val.s == -1)
                elojel = " −";
            tbl += "<td id='fpnc_" + i + "_" + j + "' onclick='fpnhl(" + i + "," + j + ");' style='text-align: center;border: 1px solid #d2d2d2; min-width: max-content;padding:0 3px;'>" + elojel + oformazottTortHTML(val.n, val.d) + "</td>"
        };
        tbl += "</tr>";
    };
    tbl += "</table>";
    return tbl;
};

function fpntblAll(p, n) {
    var tbl = "<table class='fpntblall'><tr><th></th>";
    for (var j = 1; j <= n; j++) {
        tbl += "<th>" + j + "</th>";
    }
    tbl += "</tr>";
    for (var i = 1; i <= p; i++) {
        tbl += "<tr>";
        tbl += "<th>" + i + "</th>";
        for (var j = 1; j <= n; j++) {
            var mat = fpnMat(i, j)[0];
            tbl += "<td style='height: 100%;'>" + fpntbl(mat) + "</td>"
        };
        tbl += "</tr>";
    };
    tbl += "</table>";
    return tbl;
};

function szorzotbl(p) {
    var tbl = "<table class='fpntbl'>";
    for (var i = 0; i < p; i++) {
        var elojel = "";
        if (i % 2 == 0)
            elojel = " −";
        tbl += "<tr><td style='text-align: center;'> / " + elojel + i + "!</td></tr>";
    };
    tbl += "</table>";
    return tbl;
};


function fpntblAllB(p, n, r) {
    var tbl = "<table class='fpntblall'><tr>";
    for (var j = 0; j <= r; j++)
        tbl += "<td style='text-align: center;'><b>A</b><sup>(" + j + ")</sup>(" + p + "," + n + ")" + "</td>";
    tbl += "<td style='text-align: center;'>&lowast;</td></tr><tr>";
    for (var i = 0; i <= r; i++)
        tbl += "<td style='height: 100%;'>" + fpntbl(fpnIterK(p, n, i)[0]) + "</td>";
    tbl += "<td>" + szorzotbl(p) + "</td></tr><tr>";
    for (var i = 0; i < r; i++)
        tbl += "<td style='height: 100%;'>" + fpntbl(fpnIterK(p, n, i)[1]) + "</td>";
    tbl += "<td style='height: 100%;border:1px solid red;background-color: beige;'>" + fpntbl(fpnIterK(p, n, r)[1]) + "</td>";
    tbl += "<td style='height: 100%;'> = <b>B</b><sup>(" + r + ")</sup>(" + p + "," + n + ")" + "</td>";
    tbl += "</tr></table>";
    return tbl;
};

function fpnhl(p, n) {
    const P = document.getElementById("fpnp").value * 1;
    const N = document.getElementById("fpnn").value * 1;
    $('.fpntblc td.fpnact').removeClass('fpnact');
    $('td#fpnc_' + p + '_' + n + '').addClass('fpnact');
    $('table.fpntblall .fpntbl td.fpnact').removeClass('fpnact');
    $('table.fpntblall td#fpn_' + p + '_' + n + '').addClass('fpnact');
    $('.fpntbl td.fpnact1').removeClass('fpnact1');
    for (var i = p; i <= P; i++)
        for (var j = n; j <= N; j++)
            $('table#fpn_' + P + '_' + N + ':nth(1) td#fpn_' + i + '_' + j + '').addClass('fpnact1');
    $('#fpnout #fpnoutsor').remove();
    var txt = "";
    const e = _.remove(Object.values($('.fpntblall .fpnact')).map(y => y.innerHTML), z => z != undefined);
    const m = _.remove(Object.values($('.fpnact1')).map(y => y.innerHTML), z => z != undefined);
    const em = $('.fpntblc .fpnact')[0].innerHTML;
    const ne = e.length;
    for (var t = 0; t < ne; t++)
        txt += " + " + e[t] + "&lowast;" + m[t];
    txt = txt.replaceAll(" +  −", " −");
    txt = txt.replace(/&lowast; (−.*?)(\+|\−)/g, "&lowast; <span class='parenfpn'>(</span>$1<span class='parenfpn'>)</span>$2")
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    txt = "<div id='fpnoutsor' style='margin:12px;background-color:#e6e6e6;padding:10px;'>" + txt + "&nbsp; = <b>" + em + "</b></div>";
    $('#fpnout').append(txt);
};


function fpnhl2(p, n) {
    $('.fpntblc td.fpnact').removeClass('fpnact');
    $('.fpntblc td.fpnact2').removeClass('fpnact2');
    $('td#fpnc_' + p + '_' + n + '').addClass('fpnact');
    $('td#fpnc_' + p + '_' + (n + 1) + '').addClass('fpnact2');
    $('td#fpnc_' + (p + 1) + '_' + n + '').addClass('fpnact2');
    $('table.fpntblall .fpntbl td.fpnact').removeClass('fpnact');
    $('table.fpntblall td#fpn_' + p + '_' + n + '').addClass('fpnact');
    $('table.fpntblall td#fpn_' + p + '_' + (n + 1) + '').addClass('fpnact');
    $('.fpntbl td.fpnact3').removeClass('fpnact3');
    $('.szorzotbl td:nth(' + p + ')' + '').addClass('fpnact3');
    $('.hszorzotbl td:nth(' + n + ')' + '').addClass('fpnact3');
    $('#fpnout #fpnoutsor').remove();
    var txt = "";
    const e = _.remove(Object.values($('.fpntblall .fpntbl .fpnact')).map(y => y.innerHTML), z => z != undefined);
    const m = _.remove(Object.values($('.fpnact2')).map(y => y.innerHTML), z => z != undefined);
    const ml = m.length;
    const em = $('.fpntblc .fpnact')[0].innerHTML;
    const szorzo = "<span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>" + 1 + "</td></tr><tr><td>" + n + "</td></tr></table></span>";
    txt += szorzo + "&lowast; <span class='parenfpn'>(</span>" + e[0];
    if (e[1] != undefined)
        txt += " − " + e[1];
    if (ml == 2)
        txt += " + <span style='color:blue;'>" + (n + 1) + "</span>&lowast;" + m[0] + " − <span style='color:red;'>" + p + "</span>&lowast;" + m[1];
    else if (ml == 1)
        txt += " − <span style='color:red;'>" + p + "</span>&lowast;" + m[0];
    txt += "&nbsp;<span class='parenfpn'>)</span>";
    txt = txt.replaceAll(" +  −", " −");
    txt = txt.replace(/&lowast; (−.*?)(\+|\−|\&nbsp;)/g, "&lowast; <span class='parenfpn'>(</span>$1<span class='parenfpn'>)</span>$2");
    txt = txt.replace(/&lowast; (−.*?)(\+|\−|\&nbsp;)/g, "&lowast; <span class='parenfpn'>(</span>$1<span class='parenfpn'>)</span>$2");
    txt = txt.replace(/ −  (−.*?)(\+|\−|\&nbsp;)/g, " − <span class='parenfpn'>(</span>$1<span class='parenfpn'>)</span>$2");
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    txt = "<div id='fpnoutsor' style='margin:12px;background-color:#e6e6e6;padding:10px;'>" + txt + "&nbsp; = <b>" + em + "</b></div>";
    $('#fpnout').append(txt);
};

function szorzotbl2(p) {
    var tbl = "<table class='fpntbl szorzotbl'><tr><td></td></tr>";
    for (var i = 2; i <= p; i++) {
        tbl += "<tr><td style='text-align: center;color:red;'> &uparrow; −" + (i - 1) + " &times;</td></tr>";
    };
    tbl += "</table>";
    return tbl;
};

function hszorzotbl2(n) {
    var tbl = "<table class='fpntbl hszorzotbl'><tr>";
    for (var i = 1; i <= n; i++) {
        tbl += "<td style='text-align: center;color:blue;'> &leftarrow;" + i + " &times;</td>";
    };
    tbl += "</tr></table>";
    return tbl;
};


function fpntblClick2(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var tbl = "<table id='fpn_" + p + "_" + n + "' class='fpntblc'>";
    for (i = 1; i <= p; i++) {
        tbl += "<tr>";
        for (j = 1; j <= n; j++) {
            var val = mat[i - 1][j - 1];
            var elojel = "";
            if (val.s == -1)
                elojel = " −";
            tbl += "<td id='fpnc_" + i + "_" + j + "' onclick='fpnhl2(" + i + "," + j + ");' style='text-align: center;border: 1px solid #d2d2d2; min-width: max-content;padding:0 3px;'>" + elojel + oformazottTortHTML(val.n, val.d) + "</td>"
        };
        tbl += "</tr>";
    };
    tbl += "</table>";
    return tbl;
};

function fpntbl2(p, n, r) {
    var tbl = "<table class='fpntblall'><tr>";
    for (var j = r - 1; j <= r; j++)
        tbl += "<td style='text-align: center;'><b>A</b><sup>(" + j + ")</sup>(" + p + "," + n + ")" + "</td>";
    tbl += "<td style='text-align: center;'>&lowast;</td></tr><tr>";
    if (r == 0)
        tbl += "<td style='height: 100%;'>" + fpntbl0(fpnIterK(p, n, r - 1)[0]) + "</td>";
    else
        tbl += "<td style='height: 100%;'>" + fpntbl(fpnIterK(p, n, r - 1)[0]) + "</td>";
    tbl += "<td style='height: 100%;'>" + fpntblClick2(fpnIterK(p, n, r)[0]) + "</td>";
    tbl += "<td>" + szorzotbl2(p) + "</td></tr>";
    tbl += "<tr><td></td><td>" + hszorzotbl2(n) + "</td></tr>";
    tbl += "</table>";
    return tbl;
};

function setintmode(elem) {
    const e = document.getElementById("swtarto");
    var outelem = document.getElementById("fpnout");
    if (elem.checked) {
        e.style.display = "none";
        outelem.style.minWidth = "fit-content";
    } else {
        e.style.display = "inline-block";
        outelem.style.minWidth = "max-content";
    }
};

function fpnint(p, n, r) {
    var txt = "<span class='sqrt-prefix sdefint' style='transform: scale(1, 2);vertical-align: middle;'>(</span><span class='block'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.71818);vertical-align: middle;'>∫</span><span class='fraction'><span class='numerator'><span>1</span></span><span class='denominator'>x</span><span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='sqrt-prefix sdefint' style='transform: scale(1, 2);vertical-align: middle;'>)</span><sup style='vertical-align:1em;margin-left: -0.15em'>" + r + "</sup><span class='sqrt-prefix sdefint' style='transform: scale(1.3, 2.2);vertical-align: middle;top:-0.9em;margin-left:4px'>[</span><span class='block' style='margin:25px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.71818);vertical-align: middle;'>∫</span><sub class='sdefint empty'></sub><sup class='sdefint empty' style='bottom: 13.2px; left: -5.84545px;'></sup><span class='block' style='position:relative;'>x<sup class=''><span>" + n + "</span></sup>·ln<sup class=''><span>" + p + "</span></sup><span class='block'><span class='paren' style='transform: scale(0.99697, 1.03409);'>(</span><span class='block'><span>1</span><span class='binary-operator'>−</span>x</span><span class='paren' style='transform: scale(0.99697, 1.03409);'>)</span></span></span><span class='block' style='position:relative;'>dx</span></span><span class='sqrt-prefix sdefint' style='transform: scale(1.3, 2.2);vertical-align: middle;top:-0.9em;margin-left:4px'>]</span> =";
    p += 1;
    n += 1;
    const pnrM = fpnIterK(p, n, r);
    const pnrA = pnrM[0];
    const pnrB = pnrM[1];
    for (var i = 1; i <= p; i++)
        for (var j = 1; j <= n; j++) {
            var cij = pnrA[i - 1][j - 1];
            var elojel = " +&nbsp;";
            if (cij.s == -1)
                elojel = " −&nbsp;";
            if (cij.n != 0) {
                if (j == 1) {
                    if (i == 1)
                        txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x";
                    else if (i == 2)
                        txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln(1 − x)";
                    else
                        txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                } else {
                    if (i == 1)
                        txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>";
                    else if (i == 2)
                        txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln(1 − x)";
                    else
                        txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                };
            };
        };
    for (var i = 1; i <= p; i++)
        for (var j = 1; j <= r + 1; j++) {
            var cij = pnrB[i - 1][j - 1];
            var elojel = " +&nbsp;";
            if (cij.s == -1)
                elojel = " −&nbsp;";
            if (cij.n != 0) {
                if (i == 1)
                    txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;Li<sub>( )</sub>";
                else if (i == 2)
                    txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;Li<sub>(" + j + ")</sub>(x)";
                else
                    txt += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;Li<sub>(" + j + ",&nbsp;{1}<sup>" + (i - 2) + "</sup>)</sub>(x)";
            };
        };
    return txt;
};

function fpnTbl() {
    var elem = document.getElementById("fpnout");
    const p = document.getElementById("fpnp").value * 1;
    const n = document.getElementById("fpnn").value * 1;
    const r = document.getElementById("fpnr").value * 1;
    const tblmode = document.getElementById("setfpnmode").checked;
    const abmode = document.getElementById("setABmode").checked;
    const mode12 = document.getElementById("set12mode").checked;
    const intmode = document.getElementById("setintmode").checked;
    var txt = "";
    if (intmode) {
        txt += fpnint(p, n, r);
    } else {
        if (tblmode) {
            if (abmode) {
                txt += fpntblAllB(p, n, r);
            } else {
                if (mode12) {
                    if (r < -1) {
                        txt += "Most r értéke legalább -1 legyen!";
                    } else {
                        txt += fpntbl2(p, n, r);
                    };
                } else {
                    if (r == 0) {
                        txt += "Most r értéke legalább 1 legyen!";
                    } else {
                        txt += "<span style='display: inline-block;vertical-align: middle;'>"
                        txt += fpntblAll(p, n, r - 1);
                        txt += "</span> &times; <span style='display: inline-block;vertical-align: middle;margin-left:10px;'><table><tr><td style='text-align:center;padding-bottom: 10px;'><b>A</b><sup>(" + (r - 1) + ")</sup>(" + p + "," + n + ")</td></tr><tr><td>" + fpntbl(fpnIterK(p, n, r - 1)[0]) + "</td></tr></table></span>";
                        txt += " = </span><span style='display: inline-block;vertical-align: middle;margin-left:10px;'><table><tr><td style='text-align:center;padding-bottom: 10px;'><b>A</b><sup>(" + r + ")</sup>(" + p + "," + n + ")</td></tr><tr><td style='outline:2px solid #ff5555;'>" + fpntblClick(fpnIterK(p, n, r)[0]) + "</td></tr></table></span>";
                        txt += "<br/>";
                    };
                };
            };
        } else {
            if (abmode) {
                var mat = fpnIterK(p, n, r)[1];
                txt += "<b>B</b><sup>(" + r + ")</sup>(" + p + "," + n + ") = <span style='display: inline-block;vertical-align: middle;'>";
                txt += fpntbl(mat) + "</span>";
            } else {
                var mat = fpnIterK(p, n, r)[0];
                txt += "<b>A</b><sup>(" + r + ")</sup>(" + p + "," + n + ") = <span style='display: inline-block;vertical-align: middle;'>";
                txt += fpntbl(mat) + "</span>";
            };
        };
    }
    elem.innerHTML = txt;
    $('#setoutputfontfpn').trigger('input');
};

function arpn(i, j, p, n, r) {
    var out = Fraction(0);
    if (r < -1 || i < 1 || j < 1)
        out = Fraction(0);
    else if (r == -1) {
        if (i == 1 && j == 1)
            out = Fraction(1);
        else
            out = Fraction(0);
    } else {
        out = arpn(i, j, p, n, r - 1).sub(arpn(i, j - 1, p, n, r - 1));
        out = out.add(arpn(i, j - 1, p, n, r).mul(n + 2 - j));
        out = out.sub(arpn(i - 1, j, p, n, r).mul(p + 1 - i));
        out = out.mul(Fraction(1, n + 1 - j));
    }
    return out;
};

function setOutputFontifpn(v) {
    document.getElementById("ifpnout").style.fontSize = v + "px";
};

function fpqnint() {
    var elem = document.getElementById("ifpnout");
    const p = document.getElementById("ifpnp").value * 1;
    const q = document.getElementById("ifpnq").value * 1 + 1;
    const n = document.getElementById("ifpnn").value * 1 + 1;
    var txtx = "",
        txtln = "",
        txtln1 = "";
    if (n == 2)
        txtx = "x";
    else if (n > 2)
        txtx = "x<sup>" + (n - 1) + "</sup>";
    if (n >= 2 && (p > 0 || q > 1))
        txtx += '·';

    if (p == 1)
        txtln = "ln(x)";
    else if (p > 1)
        txtln = "ln<sup>" + p + "</sup>(x)";
    if (p >= 1 && (q > 1))
        txtln += '·';

    if (q == 2)
        txtln1 = "ln(1−x)";
    else if (q > 2)
        txtln1 = "ln<sup>" + (q - 1) + "</sup>(1−x)";

    var txt = "<span class='block' style='margin:5px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.71818);vertical-align: middle;'>∫</span><sub class='sdefint empty'></sub><sup class='sdefint empty' style='bottom: 13.2px; left: -5.84545px;'></sup><span class='block' style='position:relative;'>" + txtx + txtln + txtln1 + "</span><span class='block' style='position:relative;margin-left:3px;'>dx</span></span> =";
    var txtA = "";
    var txtB = "";
    var szamlalo = 0;
    for (var r = 0; r <= p; r++) {
        var pnrM = fpnIterK(q, n, r);
        var pnrA = pnrM[0];
        var pnrB = pnrM[1];
        var cr = Fraction(Math.pow(-1, r) * factorial(p), factorial(p - r));
        for (var i = 1; i <= q; i++)
            for (var j = 1; j <= n; j++) {
                var cij = pnrA[i - 1][j - 1].mul(cr);
                var elojel = " +&nbsp;";
                if (cij.s == -1)
                    elojel = " −&nbsp;";
                if (cij.n != 0) {
                    szamlalo++;
                    if (r == p) {
                        if (j == 1) {
                            if (i == 1)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x";
                            else if (i == 2)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln(1 − x)";
                            else
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                        } else {
                            if (i == 1)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>";
                            else if (i == 2)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln(1 − x)";
                            else
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                        };
                    } else if (r == p - 1) {
                        if (j == 1) {
                            if (i == 1)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln(x)";
                            else if (i == 2)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln(x)·ln(1 − x)";
                            else
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln(x)·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                        } else {
                            if (i == 1)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln(x)";
                            else if (i == 2)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln(x)·ln(1 − x)";
                            else
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln(x)·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                        };
                    } else {
                        if (j == 1) {
                            if (i == 1)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln<sup>" + (p - r) + "</sup>(x)";
                            else if (i == 2)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln<sup>" + (p - r) + "</sup>(x)·ln(1 − x)";
                            else
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x·ln<sup>" + (p - r) + "</sup>(x)·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                        } else {
                            if (i == 1)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln<sup>" + (p - r) + "</sup>(x)";
                            else if (i == 2)
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln<sup>" + (p - r) + "</sup>(x)·ln(1 − x)";
                            else
                                txtA += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;x<sup>" + j + "</sup>·ln<sup>" + (p - r) + "</sup>(x)·ln<sup>" + (i - 1) + "</sup>(1 − x)";
                        };
                    }
                };
            };
        for (var i = 2; i <= q; i++)
            for (var j = 1; j <= r + 1; j++) {
                var cij = pnrB[i - 1][j - 1].mul(cr);
                var elojel = " +&nbsp;";
                if (cij.s == -1)
                    elojel = " −&nbsp;";
                if (cij.n != 0) {
                    szamlalo++;
                    if (r == p) {
                        if (i == 1) {
                            cc = cc.add(cij);
                            szamlalo--;
                        } else if (i == 2)
                            txtB += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;Li<sub>(" + j + ")</sub>(x)";
                        else
                            txtB += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;Li<sub>(" + j + ",&nbsp;{1}<sup>" + (i - 2) + "</sup>)</sub>(x)";
                    } else if (r == p - 1) {
                        if (i == 1) {
                            txtB += ""; //elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;ln(x)";
                            szamlalo--;
                        } else if (i == 2)
                            txtB += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;ln(x)·Li<sub>(" + j + ")</sub>(x)";
                        else
                            txtB += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;ln(x)·Li<sub>(" + j + ",&nbsp;{1}<sup>" + (i - 2) + "</sup>)</sub>(x)";
                    } else {
                        if (i == 1) {
                            txtB += ""; //elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;ln<sup>" + (p - r) + "</sup>(x)";
                            szamlalo--;
                        } else if (i == 2)
                            txtB += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;ln<sup>" + (p - r) + "</sup>(x)·Li<sub>(" + j + ")</sub>(x)";
                        else
                            txtB += elojel + formazottTortHTML(cij.n, cij.d) + "&nbsp;ln(x)<sup>" + (p - r) + "</sup>·Li<sub>(" + j + ",&nbsp;{1}<sup>" + (i - 2) + "</sup>)</sub>(x)";
                    }
                };
            };
    };
    if (txtA.startsWith(" +&nbsp;"))
        txtA = txtA.slice(2);
    txt = "<div style='color: #777;font-family: consolas;font-size: 80%;'>Az integrál " + szamlalo + " függvény összege:</div>" + txt;
    txt += txtA + txtB;
    elem.style.minWidth = "fit-content";
    elem.innerHTML = txt;
};


function fpqnintLatex() {
    var elem = document.getElementById("ifpnout");
    const p = document.getElementById("ifpnp").value * 1;
    const q = document.getElementById("ifpnq").value * 1 + 1;
    const n = document.getElementById("ifpnn").value * 1 + 1;
    var txtx = "",
        txtln = "",
        txtln1 = "";
    if (n == 2)
        txtx = "x";
    else if (n > 2)
        txtx = "x^{" + (n - 1) + "}";
    if (n >= 2 && (p > 0 || q > 1))
        txtx += '\\cdot ';

    if (p == 1)
        txtln = "\\ln(x)"
    else if (p > 1)
        txtln = "\\ln^{" + p + "}(x)";
    if (p >= 1 && (q > 1))
        txtln += '·';

    if (q == 2)
        txtln1 = "\\ln(1-x)"
    else if (q > 2)
        txtln1 = "\\ln^{" + (q - 1) + "}(1-x)";

    var txt = " \\int{" + txtx + txtln + txtln1 + "}\\,\\text{d}x = ";
    var txtA = "";
    var txtB = "";
    for (var r = 0; r <= p; r++) {
        var pnrM = fpnIterK(q, n, r);
        var pnrA = pnrM[0];
        var pnrB = pnrM[1];
        var cr = Fraction(Math.pow(-1, r) * factorial(p), factorial(p - r));
        for (var i = 1; i <= q; i++)
            for (var j = 1; j <= n; j++) {
                var cij = pnrA[i - 1][j - 1].mul(cr);
                var elojel = "+";
                if (cij.s == -1)
                    elojel = "";
                var er = elojel + cij.toLatex();
                if (cij.n != 0) {
                    if (r == p) {
                        if (j == 1) {
                            if (i == 1)
                                txtA += er + "\\,x";
                            else if (i == 2)
                                txtA += er + "\\,x\\cdot\\ln(1-x)";
                            else
                                txtA += er + "\\,x\\,\\ln^{" + (i - 1) + "}(1-x)";
                        } else {
                            if (i == 1)
                                txtA += er + "\\,x^{" + j + "}";
                            else if (i == 2)
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln(1-x)";
                            else
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln^{" + (i - 1) + "}(1-x)";
                        };
                    } else if (r == p - 1) {
                        if (j == 1) {
                            if (i == 1)
                                txtA += er + "\\,x\\cdot\\ln(x)";
                            else if (i == 2)
                                txtA += er + "\\,x\\cdot\\ln(x)\\cdot\\ln(1-x)";
                            else
                                txtA += er + "\\,x\\cdot\\ln(x)\\cdot\\ln^{" + (i - 1) + "}(1-x)";
                        } else {
                            if (i == 1)
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln(x)";
                            else if (i == 2)
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln(x)\\cdot\\ln(1-x)";
                            else
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln(x)\\cdot\\ln^{" + (i - 1) + "}(1-x)";
                        };
                    } else {
                        if (j == 1) {
                            if (i == 1)
                                txtA += er + "\\,x\\cdot\\ln^{" + (p - r) + "}(x)";
                            else if (i == 2)
                                txtA += er + "\\,x\\cdot\\ln^{" + (p - r) + "}(x)\\cdot\\ln(1-x)";
                            else
                                txtA += er + "\\,x\\cdot\\ln^{" + (p - r) + "}(x)\\cdot\\ln^{" + (i - 1) + "}(1-x)";
                        } else {
                            if (i == 1)
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln^{" + (p - r) + "}(x)";
                            else if (i == 2)
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln^{" + (p - r) + "}(x)\\cdot\\ln(1-x)";
                            else
                                txtA += er + "\\,x^{" + j + "}\\cdot\\ln^{" + (p - r) + "}(x)\\cdot\\ln^{" + (i - 1) + "}(1-x)";
                        };
                    }
                };
            };
        for (var i = 2; i <= q; i++)
            for (var j = 1; j <= r + 1; j++) {
                var cij = pnrB[i - 1][j - 1].mul(cr);
                var elojel = "+";
                if (cij.s == -1)
                    elojel = "";
                var er = elojel + cij.toLatex();
                if (cij.n != 0) {
                    if (r == p) {
                        if (i == 1) {
                            cc = cc.add(cij);
                        } else if (i == 2)
                            txtB += er + "\\,\\text{Li}_{(" + j + ")}(x)";
                        else
                            txtB += er + "\\,\\text{Li}_{(" + j + ",\\,\\lbrace 1 \\rbrace^{" + (i - 2) + "})}(x)";
                    } else if (r == p - 1) {
                        if (i == 1) {
                            txtB += "";
                        } else if (i == 2)
                            txtB += er + "\\, \\ln(x)\\cdot\\text{Li}_{(" + j + ")}(x)";
                        else
                            txtB += er + "\\,\\ln(x)·\\text{Li}_{(" + j + ",\\,\\lbrace 1 \\rbrace^{" + (i - 2) + "})}";
                    } else {
                        if (i == 1) {
                            txtB += "";
                        } else if (i == 2)
                            txtB += er + "\\,\\ln^{" + (p - r) + "}(x)·\\text{Li}_{(" + j + ")}(x)";
                        else
                            txtB += er + "\\,\\ln(x)^{" + (p - r) + "}\\cdot\\text{Li}_{(" + j + ",\\,\\lbrace 1 \\rbrace^{" + (i - 2) + "})}(x)";
                    }
                };
            };
    };
    if (txtA.startsWith("+"))
        txtA = txtA.slice(1);
    txt += txtA + txtB;
    elem.style.minWidth = "max-content";
    elem.innerHTML = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function fpntblA(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var tbl = "<table id='fpnA_" + p + "_" + n + "' class='fpntbl' style='border:none;'>";
    tbl += "<tr><td></td>";
    for (var j = 1; j <= n; j++)
        tbl += "<td style='text-align: center;border: 1px solid #cacaca;background-color:#ead7d2;min-width: max-content;padding:0 3px;'>x<sup>" + j + "</sup></td>";
    tbl += "</tr>";
    for (i = 1; i <= p; i++) {
        tbl += "<tr><td style='text-align: center;border: 1px solid #cacaca;background-color:#ead7d2;min-width: max-content;padding:0 3px;'>ln<sup>" + (i - 1) + "</sup>(1−x)</td>";
        for (j = 1; j <= n; j++) {
            var val = mat[i - 1][j - 1];
            var elojel = "";
            if (val.s == -1)
                elojel = " −";
            tbl += "<td id='fpn_" + i + "_" + j + "' style='text-align: center;border: 1px solid #d2d2d2; min-width: max-content;padding:0 3px;'>" + elojel + oformazottTortHTML(val.n, val.d) + "</td>"
        };
        tbl += "</tr>";
    };
    tbl += "</table>";
    return tbl;
};

function fpntblB(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var tbl = "<table id='fpnB_" + p + "_" + n + "' class='fpntbl' style='border:none;'>";
    tbl += "<tr><td></td>";
    for (var j = 1; j <= n; j++)
        tbl += "<td style='text-align: center;border: 1px solid #cacaca;background-color: #ead7d2;min-width: max-content;padding:0 3px;'>Li<sub>(" + j + ",•)</sup></td>";
    tbl += "</tr>";
    for (i = 2; i <= p; i++) {
        tbl += "<tr><td style='text-align: center;border: 1px solid #cacaca;background-color: #ead7d2;min-width: max-content;padding:0 3px;'>Li<sub>(•,{1}<sup>" + (i - 2) + "</sup>)</sub></td>";
        for (j = 1; j <= n; j++) {
            var val = mat[i - 1][j - 1];
            var elojel = "";
            if (val.s == -1)
                elojel = " −";
            tbl += "<td id='fpn_" + i + "_" + j + "' style='text-align: center;border: 1px solid #d2d2d2; min-width: max-content;padding:0 3px;'>" + elojel + oformazottTortHTML(val.n, val.d) + "</td>"
        };
        tbl += "</tr>";
    };
    tbl += "</table>";
    return tbl;
};

function fpqnintM() {
    var elem = document.getElementById("ifpnout");
    const p = document.getElementById("ifpnp").value * 1;
    const q = document.getElementById("ifpnq").value * 1 + 1;
    const n = document.getElementById("ifpnn").value * 1 + 1;
    var txtx = "",
        txtln = "",
        txtln1 = "";
    if (n == 2)
        txtx = "x";
    else if (n > 2)
        txtx = "x<sup>" + (n - 1) + "</sup>";
    if (n >= 2 && (p > 0 || q > 1))
        txtx += '·';

    if (p == 1)
        txtln = "ln(x)"
    else if (p > 1)
        txtln = "ln<sup>" + p + "</sup>(x)";
    if (p >= 1 && (q > 1))
        txtln += '·';

    if (q == 2)
        txtln1 = "ln(1−x)"
    else if (q > 2)
        txtln1 = "ln<sup>" + (q - 1) + "</sup>(1−x)";

    var txt = "";
    for (var r = 0; r <= p; r++) {
        var pnrM = fpnIterK(q, n, r);
        var pnrA = pnrM[0];
        var pnrB = pnrM[1];
        var cr = Fraction(Math.pow(-1, r) * factorial(p), factorial(p - r));
        var elojel = " +&nbsp;";
        if (cr.s == -1)
            elojel = " −&nbsp;"
        var Btabla = "";
        if (q > 1)
            Btabla = "<span style='display:block;text-align:center;'> + </span>" + fpntblB(pnrB)
        txt += elojel + formazottTortHTML(cr.n, cr.d) + "&nbsp;" + "ln<sup>" + (p - r) + "</sup>(x)·<span style='display:inline-block;vertical-align:middle;border-left:2px solid #777;border-right:2px solid #777;border-radius:0.5em;padding:2px 5px;margin:10px 2px;'>" + fpntblA(pnrA) + Btabla + "</span>";
    };
    if (txt.startsWith(" +&nbsp;"))
        txt = txt.slice(2);
    txt = "<span class='block' style='margin:5px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.71818);vertical-align: middle;'>∫</span><sub class='sdefint empty'></sub><sup class='sdefint empty' style='bottom: 13.2px; left: -5.84545px;'></sup><span class='block' style='position:relative;'>" + txtx + txtln + txtln1 + "</span><span class='block' style='position:relative;margin-left:3px;'>dx</span></span> =" + txt;
    elem.style.minWidth = "max-content";
    elem.innerHTML = txt;
};

function fpntblALatex(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var cek = "{c|";
    for (var k = 1; k < n; k++)
        cek += "c";
    cek += "}"
    var tbl = "\\begin{array}" + cek;
    for (var j = 1; j <= n; j++)
        tbl += " & x^{" + j + "}";
    tbl += "\\\\ \\hline";
    for (i = 1; i <= p; i++) {
        tbl += "\\ln^{" + (i - 1) + "}(1-x)";
        for (j = 1; j <= n; j++) {
            var val = mat[i - 1][j - 1];
            tbl += "& " + val.toLatex();
        };
        tbl += "\\\\";
    };
    tbl += "\\end{array}";
    return tbl;
};

function fpntblBLatex(mat) {
    const p = mat.length;
    const n = mat[0].length;
    var cek = "{c|";
    for (var k = 1; k < n + 1; k++)
        cek += "c";
    cek += "}"
    var tbl = "\\begin{array}" + cek;
    for (var j = 1; j <= n; j++)
        tbl += " & \\text{Li}_{(" + j + ",\\bullet)}";
    tbl += "\\\\ \\hline";
    for (i = 2; i <= p; i++) {
        tbl += " \\text{Li}_{(\\bullet,\\lbrace 1 \\rbrace ^{" + (i - 2) + "})}";
        for (j = 1; j <= n; j++) {
            var val = mat[i - 1][j - 1];
            tbl += " & " + val.toLatex();
        };
        tbl += " \\\\ ";
    };
    tbl += " \\end{array}";
    return tbl;
};

function fpqnintMLatex() {
    var elem = document.getElementById("ifpnout");
    const p = document.getElementById("ifpnp").value * 1;
    const q = document.getElementById("ifpnq").value * 1 + 1;
    const n = document.getElementById("ifpnn").value * 1 + 1;
    var txtx = "",
        txtln = "",
        txtln1 = "";
    if (n == 2)
        txtx = "x";
    else if (n > 2)
        txtx = "x^{" + (n - 1) + "}";
    if (n >= 2 && (p > 0 || q > 1))
        txtx += '\\cdot';

    if (p == 1)
        txtln = "\\ln(x)"
    else if (p > 1)
        txtln = "\\ln^{" + p + "}(x)";
    if (p >= 1 && (q > 1))
        txtln += '\\cdot';

    if (q == 2)
        txtln1 = "\\ln(1-x)"
    else if (q > 2)
        txtln1 = "\\ln^{" + (q - 1) + "}(1-x)";

    var txt = "";
    for (var r = 0; r <= p; r++) {
        var pnrM = fpnIterK(q, n, r);
        var pnrA = pnrM[0];
        var pnrB = pnrM[1];
        var cr = Fraction(Math.pow(-1, r) * factorial(p), factorial(p - r));
        var elojel = "+";
        if (cr.s == -1)
            elojel = ""
        var Btabla = "";
        if (q > 1)
            Btabla = fpntblBLatex(pnrB)
        txt += elojel + cr.toLatex() + "\\cdot\\ln^{" + (p - r) + "}(x)\\cdot\\left[\\begin{array}{c}" + fpntblALatex(pnrA) + " \\\\ + \\\\ " + Btabla + " \\end{array}\\right]";
    };
    if (txt.startsWith("+"))
        txt = txt.slice(1);
    txt = "\\int{" + txtx + txtln + txtln1 + "}\\,\\text{d}x = " + txt;
    elem.style.minWidth = "max-content";
    elem.innerHTML = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function fpqnInt() {
    const mode = document.getElementById("settblmodeint").checked;
    const lmode = document.getElementById("setpqnLmode").checked;

    if (mode) {
        if (lmode)
            fpqnintLatex();
        else
            fpqnint();
    } else {
        if (lmode)
            fpqnintMLatex();
        else
            fpqnintM();
    };
};

// x^n*Li(s1,s2,...,sr)(x) integráltja 

function setOutputFontxnl(v) {
    document.getElementById("xnlout").style.fontSize = v + "%";
};

function IsHTML(S, n) {
    const r = S.length;
    var s = _.dropRight(S).map(y => y + 1);
    var s1 = [];
    const e = _.last(S);
    const szorzo = formazottTortHTML(1, Math.pow(n, e));
    var txt = "";
    if (r == 1) {
        txt += "<span class='pzoutblock'>" + szorzo + "<span class='xnLix' onclick='xnLiiback(1,this);'>x<sup>" + n + "</sup></span></span>";
    } else {
        var elojels = " + ";
        if (Math.pow(-1, r + 1) == -1)
            elojels = " −&nbsp;"
        var txtveg = elojels + "<span class='xnLe' onclick='xnLiiback(" + (r + 1) + ",this);'>&zeta;*<sub  class='xlns1'>" + n + "</sub><span class='xlns'>(" + _.reverse(s) + ")</span>(x)</span>";
        s = _.reverse(s);
        for (var k = 2; k <= r; k++) {
            var elojel = " + ";
            if (Math.pow(-1, k) == -1)
                elojel = " −&nbsp;"
            txt += elojel + "<span class='xnLii' onclick='xnLiiback(" + k + ",this);'>&zeta;*<sub  class='xlns1'>" + n + "</sub>(" + s1.toString() + ")·Li<sub  class='xlns'>(" + s + ")</sub>(x)</span>";
            var csere = _.last(s);
            s = _.dropRight(s);
            s1.push(csere);
        };
        if (txt.startsWith(" + "))
            txt = txt.slice(2);
        txt = "<span class='pzoutblock'>" + szorzo + " &lowast;<span class='paren1'>[</span>" + txt + txtveg + "<span class='paren1'>]</span></span>";
    }
    return txt;
};

function jvagas(v, j) {
    const v1 = _.take(v, j - 1);
    const v2 = _.take(v, j);
    const v3 = _.drop(v, j);
    const sum1 = _.sum(v1);
    const sum2 = _.sum(v2);

    return [v1, v2, v3, sum1, sum2, j];
};

function xnlIntHTML() {
    const elem = document.getElementById("xnlout");
    const mode = document.getElementById("setmodexnl").checked;
    const s = document.getElementById("xnls").value;
    const n = document.getElementById("xnln").value * 1;
    var txtx = "",
        txts = "Li<sub class='xlns'>(" + s + ")</sub>(x)";
    if (n == 1)
        txtx = "x";
    else if (n > 1)
        txtx = "x<sup>" + n + "</sup>";
    if (n > 0)
        txtx += '·';

    var txt = "<span class='block' style='margin:5px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.71818);vertical-align: middle;'>∫</span><sub class='sdefint empty'></sub><sup class='sdefint empty' style='bottom: 13.2px; left: -5.84545px;'></sup><span class='block' style='position:relative;'>" + txtx + txts + "</span><span class='block' style='position:relative;margin-left:3px;'>dx</span></span> =";
    var txt1 = "";
    var sv = JSON.parse("[" + s + "]");
    sv[0] = sv[0] + 1;
    const r = sv.length;
    for (var j = 1; j <= r; j++) {
        const vv = jvagas(sv, j);
        const v1 = vv[0];
        const v2 = vv[1];
        const v3 = vv[2];
        const sum1 = vv[3];
        const sum2 = vv[4];
        const v1m1 = v1.map(y => y - 1);
        const v2m1 = v2.map(y => y - 1);
        const rv1m1 = [...v1m1].reverse();
        const rv2m1 = [...v2m1].reverse();
        var elojel2 = " + ";
        if ((1 + sum2) % 2 == 1)
            elojel2 = " −&nbsp;"
        for (var i = 1; i < sv[j - 1]; i++) {
            var elojel1 = " + ";
            var v3t = _.last(v2) - i;
            if ((1 + i + sum1) % 2 == 1)
                elojel1 = " −&nbsp;"
            if (v3.length > 0)
                v3t = (_.last(v2) - i) + "," + v3.toString();
            if (mode) {
                var v1m1h = [i]
                if (v1m1.length > 0)
                    v1m1h = [i, ...rv1m1];
                txt1 += elojel1 + "<span class='xnLi' onclick='xnlJelent1(this);'>Li<sub  class='xlns'>(" + v3t + ")</sub>(x)</span>&lowast;" + IsHTML(v1m1h, n + 1);
            } else {
                var v1m1t = i;
                if (v1m1.length > 0)
                    v1m1t = i + "," + rv1m1.toString();
                txt1 += elojel1 + "<span class='xnLi' onclick='xnlJelent1(this);'>Li<sub  class='xlns'>(" + v3t + ")</sub>(x)</span>&lowast;<span class='pzjelento' onclick='xnlJelent([" + v1m1t + "]," + (n + 1) + ",this);'><span style='font-size:116%;'>\u{1d4d9}</span><sub  class='xlns'>(" + v1m1t + ")</sub><span class='paren'>[</span>x<sup>" + (n + 1) + "</sup><span class='paren'>]</span></span>";
            }
        };
        if (mode) {
            var v2m1h = [];
            if (v2m1.length > 0)
                v2m1h = [0, ...rv2m1];
            txt1 += elojel2 + "<span class='xnLi' onclick='xnlJelent1(this);'>Li<sub  class='xlns'>(" + v3.toString() + ")</sub>(x)</span>&lowast;" + IsHTML(v2m1h, n + 1);
        } else {
            var v2m1t = "";
            if (v2m1.length > 0)
                v2m1t = "0," + rv2m1.toString();
            txt1 += elojel2 + "<span class='xnLi' onclick='xnlJelent1(this);'>Li<sub  class='xlns'>(" + v3.toString() + ")</sub>(x)</span>&lowast;<span class='pzjelento' onclick='xnlJelent([" + v2m1t + "]," + (n + 1) + ",this);'><span style='font-size:116%;'>\u{1d4d9}</span><sub  class='xlns'>(" + v2m1t + ")</sub><span class='paren'>[</span>x<sup>" + (n + 1) + "</sup><span class='paren'>]</span></span>";
        }
    };
    if (txt1.startsWith(" + "))
        txt1 = txt1.slice(2);
    txt += txt1;
    elem.style.minWidth = "fit-content";
    elem.innerHTML = txt;
};

var kellclick = true;
var kellclick2 = true;

function xnlJelent(s, n, elem) {
    var indx = $(elem).children('sub.xlns')[0].innerHTML;
    indx = JSON.parse("[" + indx.slice(1, -1) + "]");
    var sor = indx.length;
    var oszlop = indx[0];
    if (sor > 1)
        oszlop++;
    const c = kiszed_c('xnls');
    const r = c.length;
    const veg = sor > r;
    if (veg) {
        const kc = kum(c);
        var k = [0];
        for (var i = 1; i < r; i++) {
            k.push(kc[i - 1] - i);
        };
        var L = _.last(k) + _.last(c);
        sor = r + 1;
        oszlop = L;
    }
    setTimeout(() => {
        var elem = document.getElementById("pzoutr");
        const txt = IsHTML(s, n);
        if (elem) {
            elem.innerHTML = txt;
            if (kellclick2) {
                $(".xnLi").removeClass('hl');
                $('.zLi.shown').removeClass('shown');
            }
            kellclick = false;
            if (kellclick2)
                $('.tgomb.shown[onclick="cdat_xn(this,' + sor + ',' + oszlop + ')"]').trigger('click');
        }
    }, 100);
    setTimeout(() => {
        kellclick = true;
        kellclick2 = true;
    }, 150);
};

function xnlJelent1(elem) {
    $('.zLi.shown').removeClass('shown');
    const c = kiszed_c('xnls');
    const r = c.length;
    var indx = $(elem).children('sub.xlns')[0].innerHTML;
    indx = JSON.parse("[" + indx.slice(1, -1) + "]");
    var sor = r + 1 - indx.length;
    var oszlop = c[sor - 1] + 1 - indx[0] * 1;
    const veg = sor > r;
    if (veg) {
        const kc = kum(c);
        var k = [0];
        for (var i = 1; i < r; i++) {
            k.push(kc[i - 1] - i);
        };
        var L = _.last(k) + _.last(c);
        sor = r + 1;
        oszlop = L;
    }
    var ne = $(elem).next('.pzoutblock');
    setTimeout(() => { ne.addClass('pznext'); }, 100);
    $(".xnLii,.xnLe,.xnLix").removeClass('hl');
    $('.tgomb.shown[onclick="cdat_xn(this,' + sor + ',' + oszlop + ')"]').trigger('click');
};

function IsLatex(S, n) {
    const r = S.length;
    var s = _.dropRight(S).map(y => y + 1);
    var s1 = [];
    const e = _.last(S);
    const szorzo = "\\frac{1}{" + Math.pow(n, e) + "}";
    var txt = "";
    if (r == 1) {
        txt += szorzo + "\\; x^{" + n + "}";
    } else {
        var elojels = " + ";
        if (Math.pow(-1, r + 1) == -1)
            elojels = " - "
        var txtveg = elojels + " {_{" + n + "}}\\widehat{\\text{Le}}_{(" + _.reverse(s) + ")}(x)";
        s = _.reverse(s);
        for (var k = 2; k <= r; k++) {
            var elojel = " + ";
            if (Math.pow(-1, k) == -1)
                elojel = " - "
            txt += elojel + "\\zeta^{*}_{" + n + "}(" + s1.toString() + ")\\;\\text{Li}_{(" + s + ")}(x)";
            var csere = _.last(s);
            s = _.dropRight(s);
            s1.push(csere);
        };
        if (txt.startsWith(" + "))
            txt = txt.slice(2);
        txt = szorzo + "\\left[" + txt + txtveg + "\\right]";
    }
    return txt;
};

function xnlIntLatex() {
    const elem = document.getElementById("xnlout");
    const mode = document.getElementById("setmodexnl").checked;
    const s = document.getElementById("xnls").value;
    const n = document.getElementById("xnln").value * 1;
    var txtx = "",
        txts = "\\text{Li}_{(" + s + ")}(x)";
    if (n == 1)
        txtx = "x";
    else if (n > 1)
        txtx = "x^{" + n + "}";
    if (n > 0)
        txtx += '\\;';

    var txt = "\\int " + txtx + txts + "\\text{d}x = ";
    var txt1 = "";
    var sv = JSON.parse("[" + s + "]");
    sv[0] = sv[0] + 1;
    const r = sv.length;
    for (var j = 1; j <= r; j++) {
        const vv = jvagas(sv, j);
        const v1 = vv[0];
        const v2 = vv[1];
        const v3 = vv[2];
        const sum1 = vv[3];
        const sum2 = vv[4];
        const v1m1 = v1.map(y => y - 1);
        const v2m1 = v2.map(y => y - 1);
        const rv1m1 = [...v1m1].reverse();
        const rv2m1 = [...v2m1].reverse();
        var elojel2 = " + ";
        if ((1 + sum2) % 2 == 1)
            elojel2 = " - "
        for (var i = 1; i < sv[j - 1]; i++) {
            var elojel1 = " + ";
            var v3t = _.last(v2) - i;
            if ((1 + i + sum1) % 2 == 1)
                elojel1 = " - "
            if (v3.length > 0)
                v3t = (_.last(v2) - i) + "," + v3.toString();
            if (mode) {
                var v1m1h = [i]
                if (v1m1.length > 0)
                    v1m1h = [i, ...rv1m1];
                txt1 += elojel1 + "\\text{Li}_{(" + v3t + ")}(x)\\," + IsLatex(v1m1h, n + 1);
            } else {
                var v1m1t = i;
                if (v1m1.length > 0)
                    v1m1t = i + "," + rv1m1.toString();
                txt1 += elojel1 + "\\text{Li}_{(" + v3t + ")}(x)\\mathscr{J}_{(" + v1m1t + ")}\\left[ x^{" + (n + 1) + "}\\right]";
            }
        };
        if (mode) {
            var v2m1h = [];
            if (v2m1.length > 0)
                v2m1h = [0, ...rv2m1];
            txt1 += elojel2 + "\\text{Li}_{(" + v3.toString() + ")}(x)\\," + IsLatex(v2m1h, n + 1);
        } else {
            var v2m1t = "";
            if (v2m1.length > 0)
                v2m1t = "0," + rv2m1.toString();
            txt1 += elojel2 + "\\text{Li}_{(" + v3.toString() + ")}(x)\\mathscr{J}_{(" + v2m1t + ")}\\left[ x^{" + (n + 1) + "}\\right]";
        }
    };
    if (txt1.startsWith(" + "))
        txt1 = txt1.slice(2);
    txt += txt1;
    elem.style.minWidth = "max-content";
    elem.innerHTML = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function xnlInt() {
    const latex = document.getElementById("setxnlLmode").checked;
    if (latex)
        xnlIntLatex();
    else
        xnlIntHTML();
};

// zeta[a,b](s1,s2,..,sr) és zeta*[a,b](s1,s2,..,sr)

gZe = function(S, a, b) {
    var n = S.length,
        p = Fraction(0),
        h = Fraction(0),
        e = 0;
    const l = _.last(S);
    const SS = _.dropRight(S);
    if (n == 0)
        h = Fraction(1);
    else if (b < a || a <= 0)
        h = Fraction(0);
    else {
        for (var k = a; k <= b; k++) {
            e = Math.pow(k, l);
            p = gZe(SS, k, b).div(e);
            h = h.add(p);
        }
    }

    return h;
};

gZef = function(S, a, b) {
    var n = S.length,
        p = 0,
        h = 0;
    const SS = _.dropRight(S);
    const l = _.last(S);
    if (n == 0)
        h += 1;
    else if (b < a || a <= 0)
        h = 0;
    else {
        for (var k = a; k <= b; k++) {
            var e = Math.pow(k, l);
            p = gZe(SS, k, b);
            h += p / e;
        }
    }
    return h;
};

function Harmonic(k, n) {
    var sum = Fraction(0);
    if (n >= 0)
        for (var j = 1; j <= k; j++) {
            sum = sum.add(Fraction(1).div(Fraction(Math.pow(j, n))));
        }
    else
        for (var j = 1; j <= k; j++) {
            sum = sum.add(Fraction(Math.pow(j, Math.abs(n))));
        }
    return sum;
};

gZ = function(S, a, b) {
    var n = S.length,
        p = Fraction(0),
        h = Fraction(0),
        e = 0;

    const f = _.first(S);
    const l = _.last(S);
    const SS = _.dropRight(S);
    if (n == 0)
        h = Fraction(1);
    else if (b < a || a <= 0)
        h = Fraction(0);
    else if (n == 1)
        h = Harmonic(b, f).sub(Harmonic(a - 1, f));
    else {
        for (var k = a; k <= b; k++) {
            e = Math.pow(k, l);
            p = gZ(SS, k + 1, b).div(e);
            h = h.add(p);
        }
    }

    return h;
};

function kiszed_avbv(id, figyid) {
    var elemfigy = document.querySelector("#" + figyid);
    elemfigy.style.display = "none";
    var av = document.getElementById(id).value;
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', figyid);
        gZClear(false);
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
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', figyid);
        gZClear(false, figyid);
        return;
    };
    return av;
};

function gZClear(kell, figyid) {
    if (figyid == "figygZ") {
        var elem = document.querySelector("#gZ");
        var elem1 = document.querySelector("#gZe");
    } else if (figyid == "figygZj") {
        var elem = document.querySelector("#gZj");
        var elem1 = document.querySelector("#gZje");
    } else {
        var elem = document.querySelector("#gH");
        var elem1 = document.querySelector("#gHe");
    }
    var elemfigy = document.querySelector("#" + figyid);
    elem.innerText = "";
    elem1.innerText = "";
    if (kell)
        elemfigy.style.display = "none";
};

function setOutputFontgZ(v) {
    var elem = document.getElementById("gZ");
    var elemr = document.getElementById("gZe");
    elem.style.fontSize = v + '%';
    elemr.style.fontSize = v + '%';

    setTimeout(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemr]);
    }, 100);

};

function gzetaltx(sv, a, b, ism) {
    const r = sv.length;
    var ooindx = sv.indexOf(oo);
    var hasstr = _.findIndex(sv, y => typeof y == 'string') > -1
    var ab = [];
    for (var j = a; j <= b; j++)
        ab.push(j);
    let cb = Combvr(ab, r, ism);
    let cs = "";
    let koz = "";
    var Zv;
    var meret = 1;
    if (ism) {
        cs = "^{*}";
        if (!hasstr) {
            if (ooindx > -1)
                if (a == 1) {
                    var sv1 = sv.slice(0, ooindx)
                    Zv = gZe(sv1, 1, b);
                } else
                    Zv = Fraction(0);
            else
                Zv = gZe(sv, a, b);
        }
        meret = binomial(b - a + r - 1, r) * (r - 2);
    } else {
        if (!hasstr) {
            if (ooindx > -1)
                if (a == 1 && ooindx == r - 1) {
                    var sv1 = _.dropRight(sv)
                    Zv = gZ(sv1, 2, b) //Haz(sv, b);
                } else
                    Zv = Fraction(0);
            else
                Zv = gZ(sv, a, b);
        }
        meret = binomial(b - a, r) * (r - 2);
    };
    if (ooindx > -1)
        sv = oo2strInf(sv);
    const sltx = "(" + JSON.stringify(sv).replaceAll('"', '').slice(1, -1) + ")";
    var ltx = "";
    if (r == 0) {
        ltx = 1;
        if (b == 1 && a == 1)
            ltx = 1;
        ltx = "\\phantom{\\zeta}_{" + a + "}{\\zeta}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
        return ltx;
    };
    if (meret > Hmax)
        ltx = "\\text{ Az összeg mérete meghaladja a " + Hmax + "-at}";
    else {
        while (true) {
            const item = cb.next();
            if (item.done) break;
            ltx += zhFormaz([...item.value].reverse(), sv);
            // ltx += zhFormaz(item.value, sv);
        };
        ltx = ltx.slice(1);
    }
    if (ltx == "")
        ltx = 0;
    if (!isNaN(Zv) && !hasstr)
        koz = " = " + Zv.toLatex() + "\\approx" + Zv;
    ltx = "\\phantom{\\zeta}_{" + a + "}{\\zeta}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx + koz;
    return ltx;
};

function htmlFormaz(nv, sv) {
    var ooindx = sv.indexOf(oo);
    if (ooindx > -1)
        sv = oo2strInf(sv);
    var txt = "";
    const nl = nv.length;
    for (let i = 0; i < nl - 1; i++) {
        txt += nv[i] + "<sup>" + sv[i] + "</sup>·"
    };
    txt += nv[nl - 1] + "<sup>" + sv[nl - 1] + "</sup>"
    txt = " + " + formazottTortHTML(1, txt);
    return txt;
};

function gzetaHTML(sv, a, b, ism) {
    const r = sv.length;
    var ooindx = sv.indexOf(oo);
    var hasstr = _.findIndex(sv, y => typeof y == 'string') > -1
    var ab = [];
    var dd = 0;
    for (var j = a; j <= b; j++)
        ab.push(j);
    let cb = Combvr(ab, r, ism);
    let cs = "";
    let koz = "";
    var Zv;
    var meret = 1;
    if (ism) {
        cs = "<sup>*</sup>";
        dd = -0.4;
        if (!hasstr) {
            if (ooindx > -1)
                if (a == 1) {
                    var sv1 = sv.slice(0, ooindx)
                    Zv = gZe(sv1, 1, b)
                } else
                    Zv = Fraction(0);
            else
                Zv = gZe(sv, a, b);
        }
        meret = binomial(b - a + r - 1, r) * (r - 2);
    } else {
        if (!hasstr) {
            if (ooindx > -1)
                if (a == 1 && ooindx == r - 1) {
                    var sv1 = _.dropRight(sv)
                    Zv = gZ(sv1, 2, b)
                } else
                    Zv = Fraction(0);
            else
                Zv = gZ(sv, a, b);
        }
        meret = binomial(b - a, r) * (r - 2);
    };
    if (ooindx > -1)
        sv = oo2strInf(sv);
    const sltx = "(" + JSON.stringify(sv).replaceAll('"', '').slice(1, -1) + ")";
    var ltx = "";
    if (r == 0) {
        ltx = 1;
        if (b == 1 && a == 1)
            ltx = 1;
        ltx = "<sub>" + a + "</sub>&zeta;<sub>" + b + "</sub>" + cs + sltx + " = " + ltx;
        return ltx;
    };
    if (meret > 5 * Hmax)
        ltx = "Az összeg mérete meghaladja a " + Hmax + "-at";
    else {
        while (true) {
            const item = cb.next();
            if (item.done) break;
            ltx += htmlFormaz([...item.value].reverse(), sv);
            // ltx += zhFormaz(item.value, sv);
        };
        ltx = ltx.slice(2);
    }
    if (ltx == "")
        ltx = 0;
    if (!isNaN(Zv) && !hasstr)
        koz = " = " + formazottTortHTML(Zv.n, Zv.d) + " &approx; " + Zv;
    ltx = "<sub>" + a + "</sub>&zeta;" + cs + "<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + sltx + " = " + ltx + koz;
    return ltx;
};

function kitoltgZ(a, b, ism, idfrom, idto) {
    const sv = kiszed_avbv(idfrom, "figygZ");
    const elemto = document.getElementById(idto);
    const latex = document.getElementById("setgZLmode").checked;
    let ltx = "";
    if (sv == "vegtelenhiba" || sv == "hiba" || sv == undefined)
        return;
    else {
        if (latex) {
            ltx = gzetaltx(sv, a, b, ism);
            elemto.innerHTML = "\\[" + ltx + "\\]";
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
        } else {
            ltx = gzetaHTML(sv, a, b, ism);
            elemto.innerHTML = ltx;
        }
    }
};

function gZszamitas() {
    const a = document.getElementById("a").value * 1;
    const b = document.getElementById("b").value * 1;
    kitoltgZ(a, b, false, "sv", "gZ");
    kitoltgZ(a, b, true, "sv", "gZe");
};

//gZj gZje

function setOutputFontgZj(v) {
    var elem = document.getElementById("gZj");
    var elemr = document.getElementById("gZje");
    elem.style.fontSize = v + '%';
    elemr.style.fontSize = v + '%';

    setTimeout(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemr]);
    }, 100);

};

function gjzetaltx(sv, a, b, jj, ism) {
    var r0 = sv.length;
    var sv0 = [...sv];
    var ooindx = sv.indexOf(oo);
    var ab = [];
    for (var j = a; j <= b; j++)
        ab.push(j);
    let cs = "";
    if (ism)
        cs = "^{*}";
    var ltx = "";

    if (ooindx > -1)
        sv0 = oo2strInf(sv0)
    const sve0 = sv0.slice(0, jj - 1);
    const svj0 = sv0[jj - 1];
    const svv0 = sv0.slice(jj, r0);
    const sltx1 = JSON.stringify(sve0).slice(1, -1);
    const sltxj = "\\overline{" + svj0 + "}";
    const sltx2 = JSON.stringify(svv0).slice(1, -1);
    if (1 <= jj && jj <= r0)
        var sltx = sltx1 + "," + sltxj + "," + sltx2;
    else if (jj <= 1)
        var sltx = JSON.stringify(sv0).slice(1, -1);
    else
        var sltx = sltx1 + "," + sltx2;
    if (sltx.startsWith(","))
        sltx = sltx.slice(1);
    if (sltx.endsWith(","))
        sltx = sltx.slice(0, -1);
    sltx = "(" + sltx + ")(x)";
    if (ooindx > -1)
        sltx = sltx.replaceAll('"', '');

    if (ooindx > -1) {
        if (a > 1) {
            ltx = Fraction(0);
            ltx = "\\phantom{\\zeta}_{" + a + "}{\\zeta}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
            return ltx;
        } else if (ism) {
            sv = sv.slice(0, ooindx);
        } else if (!ism && ooindx == r0 - 1) {
            sv = sv.slice(0, ooindx);
            a++;
        } else {
            ltx = Fraction(0);
            ltx = "\\phantom{\\zeta}_{" + a + "}{\\zeta}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
            return ltx;
        }
    }

    var r = sv.length;
    if (jj > r0 || jj < 1) {
        if (ism)
            ltx = gZe(sv, 1, b).toLatex();
        else
            ltx = gZ(sv, 2, b).toLatex();
        ltx = "\\phantom{\\zeta}_{" + a + "}{\\zeta}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
        return ltx;
    } else if (ooindx > -1 && jj > ooindx) {
        if (ism)
            ltx = gZe(sv, 1, b).toLatex() + "\\,x";
        else
            ltx = gZ(sv, 2, b).toLatex() + "\\,x";
        ltx = "\\phantom{\\zeta}_{" + a + "}{\\zeta}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
        return ltx;
    } else {
        const sve = sv.slice(0, jj - 1);
        const svj = sv[jj - 1] || 0;
        const svv = sv.slice(jj, r);

        if (ism)
            for (var k = a; k <= b; k++) {
                var coeff = gZe(svv, a, k).mul(gZe(sve, k, b));
                coeff = coeff.div(Math.pow(k, svj));
                if (!coeff.equals(0))
                    ltx += "+" + coeff.toLatex() + "\\; x^{" + k + "}";
            }
        else
            for (var k = a; k <= b; k++) {
                var coeff = gZ(svv, a, k - 1).mul(gZ(sve, k + 1, b));
                coeff = coeff.div(Math.pow(k, svj));
                if (!coeff.equals(0))
                    ltx += "+" + coeff.toLatex() + "\\; x^{" + k + "}";
            }
        ltx = ltx.slice(1);
        if (ltx == "")
            ltx = 0;
        ltx = "\\phantom{\\zeta}_{" + a + "}{\\zeta}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
    }
    return ltx;
};

function gjzetaHTML(sv, a, b, jj, ism) {
    var r0 = sv.length;
    var sv0 = [...sv];
    var ooindx = sv.indexOf(oo);
    var ab = [];
    var dd = 0;
    for (var j = a; j <= b; j++)
        ab.push(j);
    let cs = "";
    if (ism)
        cs = "<sup style='margin-left:-0.4em;'>*</sup>";
    var ltx = "";

    if (ooindx > -1)
        sv0 = oo2strInf(sv0)
    const sve0 = sv0.slice(0, jj - 1);
    const svj0 = sv0[jj - 1];
    const svv0 = sv0.slice(jj, r0);
    const sltx1 = JSON.stringify(sve0).slice(1, -1);
    const sltxj = "<span style='border-top:2px solid;padding-top:2px;'>" + svj0 + "</span>";
    const sltx2 = JSON.stringify(svv0).slice(1, -1);
    if (1 <= jj && jj <= r0)
        var sltx = sltx1 + "," + sltxj + "," + sltx2;
    else if (jj <= 1)
        var sltx = JSON.stringify(sv0).slice(1, -1);
    else
        var sltx = sltx1 + "," + sltx2;
    if (sltx.startsWith(","))
        sltx = sltx.slice(1);
    if (sltx.endsWith(","))
        sltx = sltx.slice(0, -1);
    sltx = "(" + sltx + ")(x)";
    if (ooindx > -1)
        sltx = sltx.replaceAll('"', '');

    if (ooindx > -1) {
        if (a > 1) {
            ltx = Fraction(0);
            ltx = "<sub>" + a + "</sub>&zeta;<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
            return ltx;
        } else if (ism) {
            sv = sv.slice(0, ooindx);
        } else if (!ism && ooindx == (r0 - 1)) {
            sv = sv.slice(0, ooindx);
            a++;
        } else {
            ltx = Fraction(0);
            ltx = "<sub>" + a + "</sub>&zeta;<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
            return ltx;
        }
    }

    var r = sv.length;
    if (jj > r0 || jj < 1) {
        if (ism)
            var s = gZe(sv, 1, b);
        else
            var s = gZ(sv, 2, b);
        ltx = formazottTortHTML(s.n, s.d)
        ltx = "<sub>" + a + "</sub>&zeta;<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
        return ltx;
    } else if (ooindx > -1 && jj > ooindx) {
        if (ism)
            var s = gZe(sv, 1, b);
        else
            var s = gZ(sv, 2, b);
        ltx = formazottTortHTML(s.n, s.d) + " x";
        ltx = "<sub>" + a + "</sub>&zeta;<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
        return ltx;
    } else {
        const sve = sv.slice(0, jj - 1);
        const svj = sv[jj - 1] || 0;
        const svv = sv.slice(jj, r);
        if (ism)
            for (var k = a; k <= b; k++) {
                var coeff = gZe(svv, a, k).mul(gZe(sve, k, b));
                coeff = coeff.div(Math.pow(k, svj));
                if (!coeff.equals(0)) {
                    ltx += " + " + formazottTortHTML(coeff.n, coeff.d) + " x<sup>" + k + "</sup>"
                };
            }
        else
            for (var k = a; k <= b; k++) {
                var coeff = gZ(svv, a, k - 1).mul(gZ(sve, k + 1, b));
                coeff = coeff.div(Math.pow(k, svj));
                if (!coeff.equals(0)) {
                    ltx += " + " + formazottTortHTML(coeff.n, coeff.d) + " x<sup>" + k + "</sup>"
                };
            }
        ltx = ltx.slice(2);
        if (ltx == "")
            ltx = 0;
        ltx = "<sub>" + a + "</sub>&zeta;<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
    }
    return ltx;
};

function kitoltgZj(a, b, j, ism, idfrom, idto) {
    const sv = kiszed_avbv(idfrom, "figygZj");
    const elemto = document.getElementById(idto);
    const latex = document.getElementById("setgZjLmode").checked;
    let ltx = "";
    if (sv == "vegtelenhiba" || sv == "hiba" || sv == undefined)
        return;
    else {
        if (latex) {
            ltx = gjzetaltx(sv, a, b, j, ism);
            elemto.innerHTML = "\\[" + ltx + "\\]";
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
        } else {
            ltx = gjzetaHTML(sv, a, b, j, ism);
            elemto.innerHTML = ltx;
        }
    }
};

function gZjszamitas() {
    const a = document.getElementById("ja").value * 1;
    const b = document.getElementById("jb").value * 1;
    const j = document.getElementById("j").value * 1;
    kitoltgZj(a, b, j, false, "jsv", "gZj");
    kitoltgZj(a, b, j, true, "jsv", "gZje");
};

//gH gHe

function Hj_igazitas(val) {
    var elem = document.getElementById("Hj");
    var r = val.split(",").length;
    elem.setAttribute("max", r);
    if (elem.value > r)
        elem.value = r;
};

function Hk_igazitas() {
    var elem = document.getElementById("Hk");
    var j = document.getElementById("Hj").value * 1;
    var r = document.getElementById("Hsv").value.split(",").length;
    var a = document.getElementById("Ha").value * 1;
    var b = document.getElementById("Hb").value * 1;
    var ma = b - j + 2;
    var mi = a + r - j;
    elem.setAttribute("max", ma);
    elem.setAttribute("min", mi);
    if (elem.value > ma)
        elem.value = ma;
    if (elem.value < mi)
        elem.value = mi;
};

function setOutputFontgH(v) {
    var elem = document.getElementById("gH");
    var elemr = document.getElementById("gHe");
    elem.style.fontSize = v + '%';
    elemr.style.fontSize = v + '%';

    setTimeout(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemr]);
    }, 100);

};

function gHltx(sv, a, b, jj, kk, ism) {
    var r0 = sv.length;
    var sv0 = [...sv];
    var ooindx = sv.indexOf(oo);
    var ab = [];
    for (var j = a; j <= b; j++)
        ab.push(j);
    let cs = "";
    if (ism)
        cs = "^{*}";
    var ltx = "";

    if (ooindx > -1)
        sv0 = oo2strInf(sv0)
    const sve0 = sv0.slice(0, jj - 1);
    const svj0 = sv0[jj - 1];
    const svv0 = sv0.slice(jj, r0);
    const sltx1 = JSON.stringify(sve0).slice(1, -1);
    const sltxj = "\\overline{" + svj0 + "^{" + kk + "}}";
    const sltx2 = JSON.stringify(svv0).slice(1, -1);
    if (1 <= jj && jj <= r0)
        var sltx = sltx1 + "," + sltxj + "," + sltx2;
    else if (jj <= 1)
        var sltx = JSON.stringify(sv0).slice(1, -1);
    else
        var sltx = sltx1 + "," + sltx2;
    if (sltx.startsWith(","))
        sltx = sltx.slice(1);
    if (sltx.endsWith(","))
        sltx = sltx.slice(0, -1);
    sltx = "^{(" + sltx + ")}";
    if (ooindx > -1)
        sltx = sltx.replaceAll('"', '');

    if (ooindx > -1) {
        if (a > 1) {
            ltx = Fraction(0);
            ltx = "\\phantom{\\text{H}}_{" + a + "}{\\text{H}}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
            return ltx;
        } else if (ism) {
            sv = sv.slice(0, ooindx);
        } else if (!ism && ooindx == r0 - 1) {
            sv = sv.slice(0, ooindx);
            a++;
        } else {
            ltx = Fraction(0);
            ltx = "\\phantom{\\text{H}}_{" + a + "}{\\text{H}}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
            return ltx;
        }
    }

    var r = sv.length;
    if (jj > r0 || jj < 1) {
        ltx = "\\text{A j = " + jj + " paraméter értékének az [a,b] = [" + a + "," + b + "] intervallumba kell esnie.}";
        return ltx;
    } else if (ooindx > -1 && jj > ooindx) {
        if (ism)
            ltx = gZe(sv, 1, b).toLatex();
        else
            ltx = gZ(sv, 2, b).toLatex();
        //ltx = "\\phantom{\\text{H}}_{" + a + "}{\\text{H}}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
        ltx = "?";
        return ltx;
    } else {
        const sve = sv.slice(0, jj - 1);
        const svj = sv[jj - 1] || 0;
        const svv = sv.slice(jj, r);

        if (ism) {
            var coeff = gZe(svv, a, kk).mul(gZe(sve, kk, b));
            coeff = coeff.div(Math.pow(kk, svj));
            if (!coeff.equals(0))
                ltx += "+" + coeff.toLatex() + "\\approx " + coeff;
        } else {
            var coeff = gZ(svv, a, kk - 1).mul(gZ(sve, kk + 1, b));
            coeff = coeff.div(Math.pow(kk, svj));
            if (!coeff.equals(0))
                ltx += "+" + coeff.toLatex() + "\\approx " + coeff;
        }
        ltx = ltx.slice(1);
        if (ltx == "")
            ltx = 0;
        ltx = "\\phantom{\\text{H}}_{" + a + "}{\\text{H}}_{" + b + "}" + cs + "{" + sltx + "}=" + ltx;
    }
    return ltx;
};

function gHHTML(sv, a, b, jj, kk, ism) {
    var r0 = sv.length;
    var sv0 = [...sv];
    var ooindx = sv.indexOf(oo);
    var ab = [];
    var dd = 0;
    for (var j = a; j <= b; j++)
        ab.push(j);
    let cs = "";
    if (ism)
        cs = "<sup style='margin-left:-0.4em;'>*</sup>";
    var ltx = "";

    if (ooindx > -1)
        sv0 = oo2strInf(sv0)
    const sve0 = sv0.slice(0, jj - 1);
    const svj0 = sv0[jj - 1];
    const svv0 = sv0.slice(jj, r0);
    const sltx1 = JSON.stringify(sve0).slice(1, -1);
    //const sltxj = "<span style='border-top:2px solid;padding-top:2px;'>" + svj0 + "</span>" + "| k<sub>" + jj + "</sub> = " + kk;
    const sltxj = "<span style='border-top:0.1em solid;padding-top:0.25em;'>" + svj0 + "<sup>" + kk + "</sup></span>";
    const sltx2 = JSON.stringify(svv0).slice(1, -1);
    if (1 <= jj && jj <= r0)
        var sltx = sltx1 + "," + sltxj + "," + sltx2;
    else if (jj <= 1)
        var sltx = JSON.stringify(sv0).slice(1, -1);
    else
        var sltx = sltx1 + "," + sltx2;
    if (sltx.startsWith(","))
        sltx = sltx.slice(1);
    if (sltx.endsWith(","))
        sltx = sltx.slice(0, -1);
    sltx = "<sup>(" + sltx + ")</sup>";
    if (ooindx > -1)
        sltx = sltx.replaceAll('"', '');

    if (ooindx > -1) {
        if (a > 1) {
            ltx = Fraction(0);
            ltx = "<sub>" + a + "</sub>H<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
            return ltx;
        } else if (ism) {
            sv = sv.slice(0, ooindx);
        } else if (!ism && ooindx == (r0 - 1)) {
            sv = sv.slice(0, ooindx);
            a++;
        } else {
            ltx = Fraction(0);
            ltx = "<sub>" + a + "</sub>H<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
            return ltx;
        }
    }

    var r = sv.length;
    if (jj > r0 || jj < 1) {
        ltx = "A j = " + jj + " paraméter értékének az [a,b] = [" + a + "," + b + "] intervallumba kell esnie.";
        return ltx;
    } else if (ooindx > -1 && jj > ooindx) {
        if (ism)
            var s = gZe(sv, 1, b);
        else
            var s = gZ(sv, 2, b);
        ltx = "?";
        return ltx;
    } else {
        const sve = sv.slice(0, jj - 1);
        const svj = sv[jj - 1] || 0;
        const svv = sv.slice(jj, r);
        if (ism) {
            var coeff = gZe(svv, a, kk).mul(gZe(sve, kk, b));
            coeff = coeff.div(Math.pow(kk, svj));
            if (!coeff.equals(0)) {
                ltx += " + " + formazottTortHTML(coeff.n, coeff.d) + " &approx; " + coeff;
            };
        } else {
            var coeff = gZ(svv, a, kk - 1).mul(gZ(sve, kk + 1, b));
            coeff = coeff.div(Math.pow(kk, svj));
            if (!coeff.equals(0)) {
                ltx += " + " + formazottTortHTML(coeff.n, coeff.d) + " &approx; " + coeff;
            };
        }
        ltx = ltx.slice(2);
        if (ltx == "")
            ltx = 0;
        ltx = "<sub>" + a + "</sub>H<sub style='margin-left:" + dd + "em;'>" + b + "</sub>" + cs + sltx + " = " + ltx;
    }
    return ltx;
};

function kitoltgH(a, b, j, k, ism, idfrom, idto) {
    const sv = kiszed_avbv(idfrom, "figygH");
    const elemto = document.getElementById(idto);
    const latex = document.getElementById("setgHLmode").checked;
    let ltx = "";
    if (sv == "vegtelenhiba" || sv == "hiba" || sv == undefined)
        return;
    else {
        if (latex) {
            ltx = gHltx(sv, a, b, j, k, ism);
            elemto.innerHTML = "\\[" + ltx + "\\]";
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
        } else {
            ltx = gHHTML(sv, a, b, j, k, ism);
            elemto.innerHTML = ltx;
        }
    }
};

function gHszamitas() {
    const a = document.getElementById("Ha").value * 1;
    const b = document.getElementById("Hb").value * 1;
    const j = document.getElementById("Hj").value * 1;
    const k = document.getElementById("Hk").value * 1;
    kitoltgH(a, b, j, k, false, "Hsv", "gH");
    kitoltgH(a, b, j, k, true, "Hsv", "gHe");
};

///// x^n*Li(x)*Li(1-x)
function setOutputFontxll(v) {
    document.getElementById("genout").style.fontSize = v + "px";
};

function setOutputFontxll02(v) {
    $('#ideout02 .sagecell_sessionOutput').css('font-size', v + 'px');
};

function setgenKeplet10() {
    const xinter = document.querySelector("#setxllinter").checked;
    if (!xinter) {
        var a = document.querySelector("#avg").value;
        var b = document.querySelector("#bvg").value;
    } else {
        var b = document.querySelector("#avg").value;
        var a = document.querySelector("#bvg").value;
    }
    var na = a.length;
    var nb = b.length;
    a = a.replaceAll("oo", "∞");
    b = b.replaceAll("oo", "∞");
    var tort = "x";
    var arg_a = "1-x";
    var arg_b = "\\frac{x}{x-1}";
    if (xinter) {
        tort = "1-x";
        arg_b = "\\frac{x-1}{x}";
        arg_a = "x";
    }

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

function setgenKeplet1() {
    const elem = document.querySelector("#k1set");
    const txt = setgenKeplet10();
    elem.style.visibility = "hidden";
    elem.innerText = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    setTimeout(() => {
        elem.style.visibility = "visible";
    }, 200);
};

function toldas() {
    const N = document.getElementById("xlln").value * 1;
    const xinter = document.getElementById("setxllinter").checked;
    const lat = "<span style='font-size:80%;opacity:0.6'> (+1)<span>";
    var kitevo = N + lat;
    if (xinter)
        kitevo = "L";
    const xv = "<span style='color:#bb0909;'>,{0}<sup>" + kitevo + "</sup>,<b>k</b></span>";
    return xv
};

function formazbhtml1(b, told) {
    return "<tr><td class='bsor'>" + elojele(_.last(b)) + "(" + _.dropRight(b) + told + ")</td></tr>";
};

function formazbhtmlsep1(b, told) {
    return "<tr><td class='bsor sep'>" + elojele(_.last(b)) + "(" + _.dropRight(b) + told + ")</td></tr>";
};

function abhtml1(i, reszl, eloj) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    const n1 = BSOR[i].length || 0;
    var told = "";
    if (reszl) {
        told = toldas();
    }
    var ltx = "<table class='genout-sor'><tr><td class='asor' style='border-bottom:1px solid #777;'>" + elojele(Math.pow(-1, i) * eloj) + "(" + a + ")</td></tr>";
    for (var j = 0; j < n; j++) {
        if (n != n1) {
            if (j == (n / 2 - 1))
                ltx += formazbhtmlsep1(b[j], told);
            else
                ltx += formazbhtml1(b[j], told);
        } else {
            ltx += formazbhtml1(b[j], told);
        }
    }
    ltx += "</table>";
    return ltx;
};

function cFiner1(vec, n, mode) {
    const c = kiszed_c(vec);
    var txt = "";
    if (c == "Hibás bemenet")
        txt += c;
    else {
        const s = _.sum(c);
        const r = c.length;
        const ctxt = JSON.stringify(c).replaceAll("[", "(").replaceAll("]", ")");
        var out = invPv(c);
        txt += "<div style='margin:10px 0;padding-bottom:10px;border-bottom: 1px solid #bac6c6;'>A<span style='color:#888;'>(z)</span> " + ctxt + " vektornál finomabb vektorok száma: " + 2 + "<sup>" + s + "  −&nbsp;" + r + "</sup> = 2<sup>" + (s - r) + "</sup> = " + Math.pow(2, s - r) + ".";
        txt += "<br><b>K</b> =  {<b>k</b> | <b>k</b> &succeq; " + ctxt + "} = ";
        txt += JSON.stringify(out).replaceAll("],[", "), (").replace("[[", "{(").replace("]]", ")}") + "</div>";
        if (!mode) {
            const v0 = Array(n).fill(0);
            out = out.map(y => _.concat(v0, y));
            out = [...out, ...out.map(y => _.concat(0, y))];
        }
    }

    return [txt, out];
};

function formazbhtml2(bp) {
    const b = bp[0];
    const p = bp[1];
    return "<tr><td class='bsor'>" + elojele(_.last(b)) + "(<b>" + _.dropRight(b) + "</b>,<span class='bsorh'>" + p + "</span>)</td></tr>";
};

function formazbhtmlsep2(bp) {
    const b = bp[0];
    const p = bp[1];
    return "<tr><td class='bsor sep'>" + elojele(_.last(b)) + "(<b>" + _.dropRight(b) + "</b>,<span class='bsorh'>" + p + "</span>)</td></tr>";
};


function formazbhtml3(bp) {
    const e = bp[0];
    const b = bp[1];
    const p = bp[2];
    var coeff = ""
    if (e != 1)
        coeff = e + "&lowast;";
    //sss++;
    return "<tr><td class='bsor'>" + elojele(_.last(b)) + coeff + "(<b>" + _.dropRight(b) + "</b>,<span class='bsorh'>" + p + "</span>)</td></tr>";
};

function out02Clear() {
    const elem = document.querySelector("#ideout02 .sagecell_sessionOutput")
    if (elem)
        elem.innerHTML = "";
};


function abhtml2tbl(i, P, al, bl, np, mode) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    const np2 = np / 2;
    const N = document.getElementById("xlln").value * 1;
    if (!mode)
        var se = elojele(Math.pow(-1, i + bl + N + 1));
    else
        var se = elojele(Math.pow(-1, i + al + 1));
    var ltx = "<table class='genout-sor'><tr><td class='asor' style='border-bottom:1px solid #777;'>" + se + "(" + a + ")</td></tr>";
    if (!mode) {
        var s = 0;
        for (var j = 0; j < n; j++) {
            s = 0;
            for (let p of P) {
                s++
                if (s % np2 == 0)
                    ltx += formazbhtmlsep2([b[j], p]);
                else
                    ltx += formazbhtml2([b[j], p]);
            }
        };
    } else {
        for (var j = 0; j < n; j++) {
            var nv = [];
            for (var t = 0; t <= N + 1; t++) {
                nv = Array(t).fill(0);
                var P0 = [...P.map(y => _.concat(nv, y))];
                for (let p of P0) {
                    ltx += formazbhtml3([binomial(N + 1, t), b[j], p]);
                }
            }
        };
    }
    ltx += "</table>";
    return ltx;
};

function genhtml2tbl(P, al, bl, np, mode) {
    const n = BSOR.length - 1;
    if (!mode) {
        const N = document.getElementById("xlln").value * 1;
        var eloj = Math.pow(-1, bl + N + 1);
    } else
        var eloj = Math.pow(-1, al + 1);
    var ltx = "<table class='genout-fej'  style='vertical-align: top;'><tr><td style='border-bottom:1px solid #449bd1;border-right:1px solid #449bd1;'>" + amode + "<sub>a</sub>(" + aargtxt + ")</td><td style='border-bottom:1px solid #449bd1;'>(" + ASOR[0] + ")</td></tr><tr><td style='border-right:1px solid #449bd1;'>" + bmode + "<sub>b</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + bargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></td><td>(" + _.dropRight(BSOR[0][0]) + ")</td></tr></table><table class='genout-nyil'><tr><td>" + AFAZIS[0] + "</td></tr><tr><td>&rarr;</td></tr><tr><td class='tdeloj'>" + elojele(eloj) + "</td></tr></table>";
    if (mode)
        ltx = "<table class='genout-fej' style='vertical-align: top;'><tr><td style='border-right:1px solid #449bd1;border-bottom:1px solid #449bd1;'>" + bmode + "<sub>b</sub>(" + bargtxt + ")</td><td style='border-bottom:1px solid #449bd1;'>(" + ASOR[0] + ")</td></tr><tr><td style='border-right:1px solid #449bd1;'>" + amode + "<sub>a</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + aargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></td><td>(" + _.dropRight(BSOR[0][0]) + ")</td></tr></table><table class='genout-nyil'><tr><td>" + AFAZIS[0] + "</td></tr><tr><td>&rarr;</td></tr><tr><td class='tdeloj'>" + elojele(eloj) + "</td></tr></table>"
    for (var i = 0; i < n; i++) {
        ltx += abhtml2tbl(i, P, al, bl, np, mode);
        if (i < n - 1)
            ltx += "<table class='genout-nyil'><tr><td>" + AFAZIS[i + 1] + "</td></tr><tr><td>&rarr;</td></tr></table>"
    };
    ltx = ltx.replaceAll('Infinity', '∞');
    return ltx;
};

function abhtml2fx(i, P, al, bl, mode) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    const N = document.getElementById("xlln").value * 1;
    if (!mode)
        var se = elojele(_.last(b[0]) * Math.pow(-1, i + bl + N + 1));
    else
        var se = elojele(_.last(b[0]) * Math.pow(-1, i + al + 1));
    var ltx = "";
    if (!mode) {
        for (var j = 0; j < n; j++) {
            for (let p of P) {
                ltx += " + Li<sub>(" + _.dropRight(b[j]) + "," + p + ")</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + bargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span>";
            }
        };
        ltx = se + "<span style='background-color:#fffd9b;padding:5px;'>Li<sub>(" + a + ")</sub>(1−x)</span>&lowast;<span style='display: inline-block;transform: scale(1.3, 2.3);margin-left: 2px;'>[</span>" + ltx.slice(3) +
            "<span style='display: inline-block;transform: scale(1.3, 2.3);margin-left: 2px;'>]</span>";
    } else {
        for (var j = 0; j < n; j++) {
            var nv = [];
            for (var t = 0; t <= N + 1; t++) {
                nv = Array(t).fill(0);
                var P0 = [...P.map(y => _.concat(nv, y))];
                var coeff = "";
                var s = binomial(N + 1, t);
                if (s != 1)
                    coeff = s + "&lowast;"
                for (let p of P0) {
                    ltx += " + " + coeff + "Li<sub>(" + _.dropRight(b[j]) + "," + p + ")</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + aargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span>";
                }
            }
        };
        ltx = se + "<span style='background-color:#fffd9b;padding:5px;'>Li<sub>(" + a + ")</sub>(x)</span>&lowast;<span style='display: inline-block;transform: scale(1.3, 2.3);margin-left: 2px;'>[</span>" + ltx.slice(3) +
            "<span style='display: inline-block;transform: scale(1.3, 2.3);margin-left: 2px;'>]</span>";
    }
    return ltx;
};

function genhtml2fx(P, al, bl, mode) {
    const n = BSOR.length - 1;
    var ltx = "";
    for (var i = 0; i < n; i++) {
        ltx += abhtml2fx(i, P, al, bl, mode);
    };
    ltx = ltx.replaceAll('Infinity', '∞');
    return ltx;
};

function sagexnll02() {
    $('#mycell02 .sagecell_editor textarea.sagecell_commands').val(mapleertek);
    $('#mycell02 .sagecell_input button.sagecell_evalButton').click();
    setOutputFontxll02($('#outfont-sliderxnll02').val());
};


function hatarIgazitas(v) {
    const also = document.getElementById("maplea");
    const felso = document.getElementById("mapleb");
    if (v) {
        also.value = 0.55;
        felso.value = 0.9;
    } else {
        also.value = 0.05;
        felso.value = 0.45;
    }
}

function plotfx() {
    const elem = document.querySelector("#genout");
    const n = document.getElementById("xlln").value * 1;
    const Digits = document.getElementById("mapleDigits").value * 1;
    const N = document.getElementById("mapleNN").value * 1;
    const also = document.getElementById("maplea").value * 1;
    const felso = document.getElementById("mapleb").value * 1;
    const a = document.getElementById("avg").value;
    const b = document.getElementById("bvg").value;
    const bl = b.split(',').length;
    const al = a.split(',').length;
    const xinter = document.querySelector("#setxllinter").checked;
    fazis.init = nov;
    fazis.std = bov;
    fazis.atv = mbovmnov;
    fazis.veg = mbovmnov;
    aargtxt = "1−x";
    bargtxt = formazottTortHTML("x", "x−1");
    if (xinter) {
        fazis.init = mnov;
        aargtxt = formazottTortHTML("x−1", "x");
        bargtxt = "x";
    }
    aSor1(xinter, true);
    bSor1(xinter, true);

    if (!xinter)
        var bontas2 = cFiner1("bvg", n, false);
    else
        var bontas2 = cFiner1("avg", n, true);
    var P = bontas2[1];

    const nb = BSOR.length - 1;
    var ltx = "";
    for (var i = 0; i < nb; i++) {
        var ai = ASOR[i + 1];
        var bi = BSOR[i + 1];
        var ni = bi.length;
        //var se = elojele(_.last(bi[0]) * Math.pow(-1, i + bl + n + 1));
        if (!xinter)
            var se = elojele(_.last(bi[0]) * Math.pow(-1, i + bl + n + 1));
        else
            var se = elojele(_.last(bi[0]) * Math.pow(-1, i + al + 1));
        /////
        var ltxi = "";
        if (!xinter) {
            for (var j = 0; j < ni; j++) {
                for (let p of P) {
                    ltxi += " + Ls([" + _.dropRight(bi[j]) + "," + p + "],x/(x-1),NN)";
                };
            };
            ltx += se + "Ls([" + ai + "],1-x,NN)*(" + ltxi.slice(3) + ")";
        } else {
            for (var j = 0; j < ni; j++) {
                var nv = [];
                for (var t = 0; t <= n + 1; t++) {
                    nv = Array(t).fill(0);
                    var P0 = [...P.map(y => _.concat(nv, y))];
                    var coeff = "";
                    var s = binomial(n + 1, t);
                    if (s != 1)
                        coeff = s + "*"
                    for (let p of P0) {
                        ltxi += " + " + coeff + "Ls([" + _.dropRight(bi[j]) + "," + p + "],(x-1)/x,NN)";
                    }
                }
            };
            ltx += se + "Ls([" + ai + "],x,NN)*(" + ltxi.slice(3) + ")";
        }

        //ltx += se + "Ls([" + ai + "],x,NN)*(" + ltxi.slice(3) + ")";

        //ltx += abhtml2fx(i, P, al, bl, false);
    };
    ltx = ltx.replaceAll('−', '-').replaceAll(' ', '');
    if (!xinter)
    //ltx = "Digits:=" + Digits + ":\nNN:=" + N + ":\nff:=sorba(" + ltx + ",0,NN+1):\ngg:=sorba(x^" + n + "*Ls([" + b + "],x,NN)*Ls([" + a + "],1-x,NN),0,NN):\nigg:=int(gg,x):\nalso:=" + also + ":\nfelso:=" + felso + ":\nprint(Int(x^" + n + "*LLi[[" + b + "]](x)*LLi[[" + a + "]](1-x),x));\nplot([ff,gg,igg],x=also..felso,color=[\"Red\",\"Blue\",\"Green\"]);";
        ltx = "Digits:=" + Digits + ":\nNN:=" + N + ";\nff:=sorba(" + ltx + ",0,NN+1):\ngg:=sorba(x^" + n + "*Ls([" + b + "],x,NN)*Ls([" + a + "],1-x,NN),0,NN):\nigg:=int(gg,x):\nalso:=" + also + ":\nfelso:=" + felso + ":\nprint(Int(x^" + n + "*LLi[[" + b + "]](x)*LLi[[" + a + "]](1-x),x));\nplot([ff,gg,igg],x=also..felso,color=[\"Red\",\"Blue\",\"Green\"]);";
    else
        ltx = "Digits:=" + Digits + ":\nNN:=" + N + ":\nff:=sorba(" + ltx + ",1,NN+1):\ngg0:=x^" + n + "*Ls([" + b + "],x,NN)*Ls([" + a + "],1-x,NN):\ngg:=sorba(x^" + n + "*Ls([" + b + "],x,NN)*Ls([" + a + "],1-x,NN),1,NN):\nalso:=" + also + ":\nfelso:=" + felso + ":\ncg:=subs(x = 1, igg):\ncf:=subs(x = 1, ff):\nigg:=int(gg,x):\nprint(Int(x^" + n + "*LLi[[" + b + "]](x)*LLi[[" + a + "]](1-x),x));\ncc0:=evalf(int(gg0,x=0..1)):\ncc:=evalf(subs(x=1,igg)):\nplot([ff-cf+cc+cc0,gg,igg-cg+cc+cc0,cc+cc0,0],x=also..felso,color=[\"Red\",\"Blue\",\"Green\",\"Yellow\",\"White\"]);";
    mapleertek = ltx;
    elem.innerHTML = "<h2 style='color:#0023dd;text-align:center;'>Maple input</h2><p style='color:#0023dd;'>The content below is copied to clipboard.</p>" + ltx;
    elem.style.backgroundColor = "#f7e8b0";
    navigator.clipboard.writeText(ltx);
};

function viewTgl(id) {
    var elem = document.getElementById(id);
    var open = elem.style.display;
    var doc = elem.childNodes[1].src;
    if (open == "none" || !doc.endsWith("plot_seged.pdf")) {
        elem.childNodes[1].src = "../mapleout/plot_seged.pdf";
        elem.style.display = "block";
    } else
        elem.style.display = "none";
};

const normalizeLineEndings = (str, normalized = '\r\n') =>
    str.replace(/\r?\n/g, normalized);

function downloadmapleTxt() {
    var str = normalizeLineEndings(mapleertek);
    const aletolt = document.createElement("a");
    aletolt.href = URL.createObjectURL(new Blob([str], {
        type: "text/plain"
    }));
    aletolt.setAttribute("download", "mapleinput.txt");
    document.body.appendChild(aletolt);
    aletolt.addEventListener('click', (e) => {
        setTimeout(() => URL.revokeObjectURL(aletolt.href), 30 * 1000);
    });
    aletolt.click();
    document.body.removeChild(aletolt);
};

function setTblfx(v) {
    const elem = document.getElementById("tblfx");
    if (v) {
        elem.style.opacity = 1;
        elem.style.pointerEvents = "all";
    } else {
        elem.style.opacity = 0.3;
        elem.style.pointerEvents = "none";
    }
};

function setKepletes() {
    const elemr = document.getElementById("totalis");
    const elemk = document.getElementById("kepletes");
    const kepletes = elemk.style.display == "block";
    if (kepletes) {
        elemk.style.display = "none";
        elemr.style.display = "block";
        if (xllmeret > 10000)
            elemr.innerHTML = "<span style='color:red'> A feladat mérete: " + xllmeret + " meghaladja a 10 000-et.</span>";
    } else {
        elemr.style.display = "none";
        elemk.style.display = "block";
    }
};

function makeFej(mode) {
    const n = document.getElementById("xlln").value * 1;
    const a = document.getElementById("avg").value;
    const b = document.getElementById("bvg").value;
    const fx = document.getElementById("settblfx").checked;
    const bl = b.split(',').length;
    const al = a.split(',').length;
    var txtx = "",
        txts = "Li<sub>(" + a + ")</sub>(1−x)&lowast;Li<sub>(" + b + ")</sub>(x)";
    if (n == 1)
        txtx = "x&lowast;";
    else if (n > 1)
        txtx = "x<sup>" + n + "</sup>&lowast;";
    if (n > 0)
        txtx += '&nbsp;';
    if (mode) {
        var bontas2 = cFiner1("avg", n, mode);
    } else {
        var bontas2 = cFiner1("bvg", n, mode);
    }
    var bontas = bontas2[0];
    var P = bontas2[1];
    if (!mode)
        var txt = "<div style='min-width:max-content;margin:10px 0;padding:20px 0 10px 0;text-align:center;background-color: #dbdbdd;border: 1px solid #bac6c6;'><span class='block' style='margin:5px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.8);vertical-align: middle;'>∫</span><span class='block' style='position:relative;'>x<sup>n</sup>&lowast;Li<sub><b>a</b></sub>(1−x)&lowast;Li<sub><b>b</b></sub>(x)</span><span class='block' style='position:relative;margin-left:3px;'>dx</span></span> = (-1)<sup>|<b>b</b>|+n+1</sup>&nbsp;<span class='sqrt-prefix' style='transform: scale(1.8) translateX(0.2em);vertical-align: middle;'>&sum;</span><sub style='vertical-align:-0.5em;margin-left: 1em;'><b>k</b>&succeq;<b>b</b></sub><span class='block' style='margin:5px;position:relative;top:0.2em;vertical-align: middle;'><span class='sqrt-prefix sdefint' style='right: -0.1em;transform: scale(1.38424, 3.2) translateY(-0.1em);'>∫</span><span class='block' style='position:relative;bottom: 0.9em;'><span class='fraction'><span class='numerator'>Li<sub><b>a</b></sub><span class='block'>(<span class='block'>1−x</span>)&lowast;</span>Li<sub>({0}<sup>n+1</sup>,<b>k</b>)</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + bargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></span><span class='denominator'><span class='block'>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span><span class='block' style='position:relative;top:0.9em;left:-0.2em'>dx</span></span></div>";
    else
        var txt = "<div style='min-width:max-content;margin:10px 0;padding:20px 0 10px 0;text-align:center;background-color: #dbdbdd;border: 1px solid #bac6c6;'><span class='block' style='margin:5px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.8);vertical-align: middle;'>∫</span><span class='block' style='position:relative;'>x<sup>n</sup>&lowast;Li<sub><b>a</b></sub>(1−x)&lowast;Li<sub><b>b</b></sub>(x)</span><span class='block' style='position:relative;margin-left:3px;'>dx</span></span> = (-1)<sup>|<b>a</b>|+1</sup>&nbsp;<span class='sqrt-prefix' style='transform: scale(1.8) translateX(0.2em);vertical-align: middle;'>&sum;</span><sub style='vertical-align:-0.5em;margin-left: 1em;'>0&leq;L&leq;n+1</sub><span style='vertical-align:-1em;margin:0 5px;'>" + drawBinomial('n+1', 'L') + "</span><span class='sqrt-prefix' style='transform: scale(1.8) translateX(0.2em);vertical-align: middle;'>&sum;</span><sub style='vertical-align:-0.5em;margin-left: 1em;'><b>k</b>&succeq;<b>a</b></sub><span class='block' style='margin:5px;position:relative;top:0.2em;vertical-align: middle;'><span class='sqrt-prefix sdefint' style='right: -0.1em;transform: scale(1.38424, 3.2) translateY(-0.1em);'>∫</span><sub style='vertical-align: -2.5em;'>*</sub><span class='block' style='position:relative;bottom: 0.9em;'><span class='fraction'><span class='numerator'>Li<sub><b>b</b></sub><span class='block'>(<span class='block'>x</span>)&lowast;</span>Li<sub>({0}<sup>L+1</sup>,<b>k</b>)</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + aargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></span><span class='denominator'><span class='block'>1−x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span><span class='block' style='position:relative;top:0.9em;left:-0.2em'>dx</span></span></div>"

    txt += "<div style='min-width:max-content;margin:10px 0;padding:10px 0;border-bottom: 1px solid #bac6c6;'><span class='block' style='margin:5px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.8);vertical-align: middle;'>∫</span><span class='block' style='position:relative;'>" + txtx + txts + "</span><span class='block' style='position:relative;margin-left:3px;'>dx</span></span> = ";
    var told = toldas();
    if (!mode)
        txt += "<span style=' background-color: #9ee844; #9ee844;padding: 1.5em 0.2em;border-radius: 50%;'>(-1)<sup>" + bl + "+" + n + "+1</sup></span>&nbsp;<span class='sqrt-prefix' style='transform: scale(1.8) translateX(0.2em);vertical-align: middle;'>&sum;</span><sub style='vertical-align:-0.5em;margin-left: 1em;'><b>k</b>&succeq;(" + b + ")</sub><span class='block' style='margin:5px;position:relative;top:0.2em;vertical-align: middle;'><span class='sqrt-prefix sdefint' style='right: -0.1em;transform: scale(1.38424, 3.2) translateY(-0.1em);'>∫</span> <span class='block' style='position:relative;bottom: 0.9em;'><span class='fraction'><span class='numerator'>Li<sub>(" + ASOR[0] + ")</sub><span class='block'>(<span class='block'>1−x</span>)&lowast;</span>Li<sub>({0}<sup>" + n + "+1</sup>,<b>k</b>)</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + bargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></span><span class='denominator'><span class='block'>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span><span class='block' style='position:relative;top:0.9em;left:-0.2em'>dx</span></span></div>" + bontas + "<div style='margin:10px 0;padding:10px 0;border-bottom: 1px solid #bac6c6;'>Elegendő az &nbsp;&nbsp; I = <span class='block' style='margin:5px;position:relative;top:0.2em;vertical-align: middle;'><span class='sqrt-prefix sdefint' style='right: -0.1em;transform: scale(1.38424, 3.2) translateY(-0.1em);'>∫</span><sub style='vertical-align: -2.5em;'>*</sub><span class='block' style='position:relative;bottom: 0.9em;'><span class='fraction'><span class='numerator'>Li<sub>(" + ASOR[0] + ")</sub>(<span class='block'>1−x</span>)&lowast;Li<sub>(0)</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + bargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></span><span class='denominator'><span class='block'>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span><span class='block' style='position:relative;top:0.9em;left:-0.2em'>dx</span></span> integrált kiszámítani, majd az integrálósorban minden egyes vektort  megtoldani az <i style='text-decoration:underline;'>összes</i> (..." + told + ") vektorral, ahol <b>k</b>&in;<b>K</b>.</div>";
    else
        txt += "<span style=' background-color: #9ee844;padding: 1.1em 0.2em;border-radius: 50%;'>(-1)<sup>" + al + "+1</sup></span>&nbsp;<span class='sqrt-prefix' style='transform: scale(1.8) translateX(0.2em);vertical-align: middle;'>&sum;</span><sub style='vertical-align:-0.5em;margin-left: 1em;'>0&leq;L&leq;" + (n + 1) + "</sub><span style='vertical-align:-1em;margin:0 5px;'>" + drawBinomial(n + 1, 'L') + "</span><span class='sqrt-prefix' style='transform: scale(1.8) translateX(0.2em);vertical-align: middle;'>&sum;</span><sub style='vertical-align:-0.5em;margin-left: 1em;'><b>k</b>&succeq;(" + a + ")</sub><span class='block' style='margin:5px;position:relative;top:0.2em;vertical-align: middle;'><span class='sqrt-prefix sdefint' style='right: -0.1em;transform: scale(1.38424, 3.2) translateY(-0.1em);'>∫</span><sub style='vertical-align: -2.5em;'>*</sub><span class='block' style='position:relative;bottom: 0.9em;'><span class='fraction'><span class='numerator'>Li<sub>(" + ASOR[0] + ")</sub><span class='block'>(<span class='block'>x</span>)&lowast;</span>Li<sub>({0}<sup>L+1</sup>,<b>k</b>)</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + aargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></span><span class='denominator'><span class='block'>1−x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span><span class='block' style='position:relative;top:0.9em;left:-0.2em'>dx</span></span></div>" + bontas + "<div style='margin:10px 0;padding:10px 0;border-bottom: 1px solid #bac6c6;'>Elegendő az &nbsp;&nbsp; I = <span class='block' style='margin:5px;position:relative;top:0.2em;vertical-align: middle;'><span class='sqrt-prefix sdefint' style='right: -0.1em;transform: scale(1.38424, 3.2) translateY(-0.1em);'>∫</span><sub style='vertical-align: -2.5em;'>*</sub><span class='block' style='position:relative;bottom: 0.9em;'><span class='fraction'><span class='numerator'>Li<sub>(" + ASOR[0] + ")</sub><span class='block'>(<span class='block'>x</span>)&lowast;</span>Li<sub>(0)</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + aargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></span><span class='denominator'><span class='block'>1−x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span><span class='block' style='position:relative;top:0.9em;left:-0.2em'>dx</span></span> integrált kiszámítani, majd az integrálósorban minden egyes vektort megtoldani az <i style='text-decoration:underline;'>összes</i> (..." + told + ") vektorral, és megszorozni <span style='vertical-align:middle;display:inline-block;'>" + drawBinomial(n + 1, 'L') + "</span>-el, ahol 0&leq;L&leq;" + (n + 1) + ", és  <b>k</b>&in;<b>K</b>.</div>";
    const np = P.length;
    var lab = "Mind kiírva (Táblázatban)";
    if (fx)
        lab = "Mind kiírva (Egy sorban)";
    txt += "<div style='margin-bottom:5px;border-bottom:1px solid #ddd;padding-bottom:5px;'><span style='font-size:85%;margin-left:5px;margin-right:5px;'>Képletesen</span> <label class='switch'><input type='checkbox' onchange='setKepletes();'><span class='slider round'></span></label> <span style='font-size:85%;margin-left:5px;margin-right:5px;'>" + lab + "</span></div>";
    if (fx)
        txt += "<div id='totalis' style='display:none;'><span class='block' style='margin:5px 0;'><span class='sqrt-prefix sdefint' style='transform: scale(1, 1.8);vertical-align: middle;'>∫</span><span class='block' style='position:relative;'>" + txtx + txts + "</span><span class='block' style='position:relative;margin-left:3px;'>dx</span></span> = " + genhtml2fx(P, al, bl, mode) + "</div>";
    else
        txt += "<div id='totalis' style='display:none;'>" + genhtml2tbl(P, al, bl, np, mode) + "</div>";
    return txt;
}

function calcMeretab(a, b) {
    const al = a.length;
    const bl = b.length;
    const ma = Math.pow(2, _.sum(a) - al);
    var mb = 0;
    for (var i = 1; i <= bl; i++)
        mb += Math.pow(2, i) * b[i - 1];
    return ma * (mb + Math.pow(2, bl + 1));
};

function calcMeret() {
    const N = document.getElementById("xlln").value * 1;
    const a = kiszed_v1("avg");
    const b = kiszed_v1("bvg");
    const reszl = document.getElementById("setmodexll").checked;
    const mode = document.getElementById("setxllinter").checked;
    if (!reszl)
        var meret = genmeret();
    else if (!mode) {
        var meret = calcMeretab(b, a);
    } else
        var meret = calcMeretab(a, b) * (N + 2) / 2;
    xllmeret = meret;
    return meret;
};

function calcForm(a) {
    var txt = "2<sup>|<b>" + a + "</b>|+1</sup> + <span class='sqrt-prefix' style='transform: scale(1.8) translateX(0.2em);vertical-align: middle;'>&sum;</span><sub style='vertical-align:-0.5em;margin-left: 1em;'>1&leq;k&leq;|<b>" + a + "</b>|</sub>&nbsp;2<sup>k</sup>&lowast;" + a + "<sub>k</sub>";
    return txt;
};

function genhtml1(mode, reszl) {
    const n = BSOR.length - 1;
    const N = document.getElementById("xlln").value * 1;
    const a = kiszed_v1("avg");
    const b = kiszed_v1("bvg");
    var fej = "";
    if (reszl)
        fej = makeFej(mode);
    if (mode) {
        var eloj = Math.pow(-1, ASOR[0].length + 1);
    }
    if (!reszl)
        var meret = genmeret();
    else if (!mode) {
        const bl = b.length;
        var eloj = Math.pow(-1, bl + N + 1);
        var meret = calcMeretab(b, a);
    } else
        var meret = calcMeretab(a, b) * (N + 2) / 2;
    var mform = "";
    if (mode) {
        if (reszl)
            mform = "2<sup>&sum;<b>a</b>−|<b>a</b>|−1</sup>&lowast;(n+2)&lowast;<span style='display: inline-block;transform: scale(1, 2.3);margin-right: 2px;'>(</span>" + calcForm("b") + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span>";
        else
            mform = calcForm("b");
    } else {
        if (reszl)
            mform = "2<sup>&sum;<b>b</b>−|<b>b</b>|</sup>&lowast;<span style='display: inline-block;transform: scale(1, 2.3);margin-right: 2px;'>(</span>" + calcForm("a") + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span>";
        else
            mform = calcForm("a");
    };
    var ltx = "<div class='meret style='font-size:100%;'>Az integrál " + mform + " = <b style='margin:0 5px;'>" + meret + "</b> általánosított polilogaritmus függvény szorzatösszege:</div>" + fej + "<div id='kepletes' style='display:block;'><table class='genout-fej'  style='vertical-align: top;'><tr><td style='border-bottom:1px solid #449bd1;border-right:1px solid #449bd1;'>" + amode + "<sub>a</sub>(" + aargtxt + ")</td><td style='border-bottom:1px solid #449bd1;'>(" + ASOR[0] + ")</td></tr><tr><td style='border-right:1px solid #449bd1;'>" + bmode + "<sub>b</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + bargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></td><td>(" + _.dropRight(BSOR[0][0]) + ")</td></tr></table><table class='genout-nyil'><tr><td>" + AFAZIS[0] + "</td></tr><tr><td>&rarr;</td></tr><tr><td class='tdeloj'>" + elojele(eloj) + "</td></tr></table>";
    if (mode)
        ltx = "<div class='meret' style='font-size:100%;'>Az integrál " + mform + " = <b style='margin:0 5px;'>" + meret + "</b> általánosított polilogaritmus függvény szorzatösszege:</div>" + fej + "<div id='kepletes' style='display:block;'><table class='genout-fej' style='vertical-align: top;'><tr><td style='border-right:1px solid #449bd1;border-bottom:1px solid #449bd1;'>" + bmode + "<sub>b</sub>(" + bargtxt + ")</td><td style='border-bottom:1px solid #449bd1;'>(" + ASOR[0] + ")</td></tr><tr><td style='border-right:1px solid #449bd1;'>" + amode + "<sub>a</sub><span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>(</span>" + aargtxt + "<span style='display: inline-block;transform: scale(1, 2.3);margin-left: 2px;'>)</span></td><td>(" + _.dropRight(BSOR[0][0]) + ")</td></tr></table><table class='genout-nyil'><tr><td>" + AFAZIS[0] + "</td></tr><tr><td>&rarr;</td></tr><tr><td class='tdeloj'>" + elojele(eloj) + "</td></tr></table>";
    for (var i = 0; i < n; i++) {
        ltx += abhtml1(i, reszl, eloj);
        if (i < n - 1)
            ltx += "<table class='genout-nyil'><tr><td>" + AFAZIS[i + 1] + "</td></tr><tr><td>&rarr;</td></tr></table>"
    };
    ltx += "</div>"
    ltx = ltx.replaceAll('Infinity', '∞');
    return ltx;
};

function kiszed_v1(id, mode, reszl) {
    if (mode)
        if (id == "avg")
            id = "bvg";
        else
            id = "avg";
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

    if (reszl)
        if (!mode && id == "bvg")
            var av = "[0]";
        else if (mode && id == "avg")
        var av = "[0]";

    try {
        av = JSON.parse(av);
        var indx = av.indexOf(oo);
        if (!mode) {
            if (id == "avg" && av.some(v => v < 0)) {
                setfigy("Az <b>a</b> indexvektor most csak nem negatív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figygen");
                genClear();
                return;
            } else if (id == "avg" && indx > -1) {
                av = oo2strInf(av);
                setfigy("A kiüritendő <b>a</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figygen");
                genClear();
                return;
            } else if (id == "bvg" && av.length == 0 && document.getElementById("avg").value.trim() !== "") {
                setfigy("Az <b>a</b> indexvektor nem lehet üres! " + '<span class="outhiba"> <b>a</b> = ( )</span>', "figygen");
                genClear();
                return;
            }
            if (id == "bvg" && indx > -1)
                av = oo2Inf(av);
        } else if (mode) {
            if (id == "bvg" && av.some(v => v < 0)) {
                setfigy("A <b>b</b> indexvektor most csak nem negatív elemeket tartalmazhat! " + '<span class="outhiba"><b>b</b> = (' + av + ')</span>', "figygen");
                genClear();
                return;
            } else if (id == "bvg" && indx > -1) {
                av = oo2strInf(av);
                setfigy("A kiüritendő <b>b</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>b</b> = (' + av + ')</span>', "figygen");
                genClear();
                return;
            } else if (id == "avg" && av.length == 0 && document.getElementById("bvg").value.trim() !== "") {
                setfigy("A <b>b</b> indexvektor nem lehet üres! " + '<span class="outhiba"> <b>b</b> = ( )</span>', "figygen");
                genClear();
                return;
            }
            if (id == "avg" && indx > -1)
                av = oo2Inf(av);
        }

    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figygen");
        genClear();
        return;
    };
    return av;
};

function aFazis1(mode, reszl) {
    AFAZIS = [];
    const a = kiszed_v1("avg", mode, reszl);
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

function aSor1(mode, reszl) {
    ASOR = [];
    const a = kiszed_v1("avg", mode, reszl);
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

function bSor1(mode, reszl) {
    BSOR = [];
    const L = aFazis1(mode, reszl);
    if (L == undefined)
        return [];
    const b = kiszed_v1("bvg", mode, reszl);
    if (b == undefined)
        return [];
    BSOR.push([
        [...b, 1]
    ]);
    for (let i of L) {
        var fn = fazis[i];
        BSOR.push(fn(_.last(BSOR)));
    };
    return BSOR;
};

function pozValtas1() {
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
    setTimeout(() => { genoutput1(); }, 300);
};

function genoutput1s() {
    const elemfigy = document.getElementById("figygen");
    const xinter = document.querySelector("#setxllinter").checked;
    elemfigy.style.display = "none";
    const ures = document.getElementById("avg").value.trim() + document.getElementById("bvg").value.trim() == "";
    if (ures) {
        setfigy("Mind a két indexvektor nem lehet üres!", "figygen");
        genClear();
        return;
    }
    var txt = "HIBA";
    fazis.init = bovnov;
    fazis.std = bov;
    fazis.atv = mbovmnov;
    fazis.veg = mbovmnov;
    aargtxt = "1−x";
    bargtxt = formazottTortHTML("x", "x−1");
    if (xinter) {
        fazis.init = mbovmnov;
        aargtxt = formazottTortHTML("x−1", "x");
        bargtxt = "x";
    }
    aSor1(xinter, false);
    bSor1(xinter, false);
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
            txt = genhtml1(xinter, false);
        const elem = document.querySelector("#genout");
        elem.style.backgroundColor = "#e7fdf5";
        elem.innerHTML = txt;
    }
};

function genoutput1r() {
    const elemfigy = document.getElementById("figygen");
    const xinter = document.querySelector("#setxllinter").checked;
    elemfigy.style.display = "none";
    const ures = document.getElementById("avg").value.trim() + document.getElementById("bvg").value.trim() == "";
    if (ures) {
        setfigy("Mind a két indexvektor nem lehet üres!", "figygen");
        genClear();
        return;
    }
    var txt = "HIBA";
    fazis.init = nov;
    fazis.std = bov;
    fazis.atv = mbovmnov;
    fazis.veg = mbovmnov;
    aargtxt = "1−x";
    bargtxt = formazottTortHTML("x", "x−1");
    if (xinter) {
        fazis.init = mnov;
        aargtxt = formazottTortHTML("x−1", "x");
        bargtxt = "x";
    }
    aSor1(xinter, true);
    bSor1(xinter, true);
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
        var meret = calcMeret();
        if (meret > 100000)
            txt = "A feladat mérete meghaladja a 100 000-et.";
        else if (AFAZIS.length * BSOR.length * ASOR.length > 0)
            txt = genhtml1(xinter, true);
        const elem = document.querySelector("#genout");
        elem.style.backgroundColor = "#e7fdf5";
        elem.innerHTML = txt;
    }
};

function genoutput1() {
    const reszletes = document.querySelector("#setmodexll").checked;
    if (reszletes)
        genoutput1r();
    else
        genoutput1s();
};


