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


function uritesClear () {
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
    //var outelem = document.querySelector("#ideout2 .sagecell_sessionOutput");
    if (ism)
        cshtml = "<sup>*</sup>"
    if (outelem) {
        //var Zv = outelem.innerText.split("=")[1].replace(/\s/, '');
        //var Zv = outelem.innerText.replace(/\s/, ''); 
        //Zv = outelem.innerText; // NETEN EZ KELL
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
    return "<tr><td>" + elojele(_.last(b)) + "(" + _.dropRight(b) + ")</td></tr>";
};

function formazbhtmlsep(b) {
    return "<tr><td class='sep'>" + elojele(_.last(b)) + "(" + _.dropRight(b) + ")</td></tr>";
};

function abhtml(i) {
    const a = ASOR[i + 1];
    const b = BSOR[i + 1];
    const n = b.length;
    const n1 = BSOR[i].length || 0;
    var ltx = "<table class='genout-sor'><tr><td style='border-bottom:1px solid #777;'>" + elojele(Math.pow(-1, i)) + "(" + a + ")</td></tr>";
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

// SHUFFLE PRODUCT

function shClear() {
    const elem = document.getElementById("shout");
    elem.innerHTML = "";
};

function out3Clear() {
    const elem = document.querySelector("#ideout3 .sagecell_output_elements pre");
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

function komb(n, J) {
    var na, nb, c, k, inc, inc1;
    c = 1;
    k = 0;
    na = 0;
    nb = 0;
    // while (c > 0) {
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
    //};
    return c;
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
        sum += "&centerdot;(" + c_sor.toString() + ") + ";
    return sum;
};

function eshuff() {
    const cek = comp0(sumab, nnn);
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
        if (av.some(v => v < 0)) {
            setfigy("Az <b>a</b>, illetve <b>b</b>  indexvektor csak nem negatív elemeket tartalmazhat! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figysh");
            shClear();
            return;
        } else if (indx > -1) {
            av = oo2strInf(av);
            setfigy("A kiüritendő <b>a</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figysh");
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
    var sh, meret;
    if (a_sor == undefined || b_sor == undefined)
        sh = "HIBA";
    else if (a_sor.length + b_sor.length == 0)
        sh = "( )&#x29E2;( ) = ( )";
    else if (a_sor.length == 0)
        sh = "( )&#x29E2;(" + b_sor + ") = (" + b_sor + " )";
     else if (a_sor.length == 0)
        sh = "( )&#x29E2;(" + b_sor + ") = (" + b_sor + " )";
    else {
        sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
        kk = a_sor.length;
        nnn = kk + b_sor.length;
        meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
        if (meret < 40000000) {
            it = Choose(nnn, kk);
            sh = "(" + a_sor.toString() + ")&#x29E2;(" + b_sor.toString() + ") = " + eshuff();
            var db = sh.match(/ \+ /g).length;
            sh = sh.slice(0, -3)
            sh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b> futás. " + sumab + "-nak(nek) összesen <b>" + binomial(sumab + nnn - 1, nnn - 1) + "</b> darab " + nnn + " hosszú nem-negatív kompozíciója van. Az összegben ezekből <b>" + db + "</b> szerepel. Vagyis, nagyjából minden " + (binomial(sumab + nnn - 1, nnn - 1) / db).toFixed(3) + "-dik. </div>" + sh;
        } else {
            sh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b>  meghaladja a maximálisan megengedett 40 000 000-t</div>";
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
    const a = kiszed_sh("avg");
    const b = kiszed_sh("bvg");
    var txt = "show('HIBA');";
    if (a != undefined && b != undefined) {
        const astr = convertstr01(a);
        const bstr = convertstr01(b);
        var txt = 'from sage.combinat.shuffle import ShuffleProduct;\nfrom collections import Counter;\nL=list(ShuffleProduct(\"' + astr + '\",\"' + bstr + '\",element_constructor="".join));\nLL= Counter(L);LL;';
    };
    $('#mycell3 .sagecell_editor textarea.sagecell_commands').val(txt);
    $('#mycell3 .sagecell_input button.sagecell_evalButton').click();
    setOutputFont2($('#outfont-slider3').val());
};

function sageshtransf() {
    const elem = document.getElementById("sagetransf");
    var str = "";
    const a = kiszed_sh("avg");
    const b = kiszed_sh("bvg");
    if (a == undefined || b == undefined)
        str = "HIBA";
    else if (a.length + b.length == 0)
        str = "( )&#x29E2;( ) = ( )";
    else {
        const melem = document.querySelector("#ideout3 .sagecell_output_elements .sagecell_messages div");
        if (melem == null)
            str = "Előbb számítsa ki a sageMath kimenetet a 'SAGE' gombra kattintva!"
        else {
            var back = melem.innerHTML.match(/Counter\(.+\)/)[0].slice(8, -1).replace(/'/g, '"');
            var obj = JSON.parse(back);
            _.forEach(obj, function(value, key) {
                if (value == 1)
                    str += " + (" + str2vec(key) + ")";
                else
                    str += " + " + value + "&centerdot;(" + str2vec(key) + ")";
            });
            str = "(" + a.toString() + ")&#x29E2;(" + b.toString() + ") = " + str.slice(3);
        }
    };
    elem.innerHTML = str;
};

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

$(document).on('selectionchange', function() {
    const foo = document.querySelector('#shout')
    const foo1 = document.querySelector('#sagetransf');
    var isin = window.getSelection().containsNode(foo, true) || window.getSelection().containsNode(foo1, true);
    var selection = window.getSelection().toString();
    if (isin)
        setSearch2(selection);
});
