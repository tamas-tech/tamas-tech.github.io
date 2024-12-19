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

std = function(LL) {
    var L = _.cloneDeep(LL);
    var a = L[0];
    var b = L[1];
    var n = a.length - 1;
    var m = b.length - 1;
    a[n] = a[n] - 1;
    b[m] = b[m] + 1;
    lepessor.push("⋯");
    return [a, b];
};

csokk0 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    let n = a.length - 1;
    let m = b.length - 2;
    a[n] = a[n] - 1;
    a.push(0);
    b.splice(-1);
    b[m] = b[m] + 1;
    lepessor.push(" ⟵⌊0");
    return [a, b];
};

csokk1 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a.splice(-1);
    b.push(1);
    lepessor.push("1⌋⟶");
    return [a, b];
}

veg0 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let a1 = [...a];
    let n = a.length - 1;
    a[n] = a[n] - 1;
    a.push(1);
    lepessor.push("■⟵⌊0");
    return [
        [
            [], a
        ],
        [
            [], a1
        ]
    ]
};

veg1 = function(LL) {
    var L = _.cloneDeep(LL);
    let b = L[1];
    let b1 = [...b, 1];
    let n = b.length - 1;
    b[n] = b[n] + 1;
    lepessor.push("1⌋⟶■");
    return [
        [
            [], b1
        ],
        [
            [], b
        ]
    ]
};

pozcsere = function(L) {
    let a = L[0];
    let b = L[1];
    lepessor.push("↻");
    return [b, a];
};

lepes = function(LL0) {
    var poz = LL0[0];
    var L0 = LL0[1];
    var h, ut, ujpoz, out, Out;
    if (poz == -100)
        return;
    else {
        L = L0[poz];
        h = L.length;
        ut = L[h - 1];
        ujpoz = poz;
    }
    if (poz == 0) {
        if (ut > 1) {
            out = std(L0);
        } else if (ut < 1) {
            out = pozcsere(L0);
            ujpoz = (poz + 1) % 2;
        } else if (ut == 1) {
            if (h > 1) {
                out = csokk1(L0);
            } else {
                out = veg1(L0);
                ujpoz = -100;
            }
        }
    } else {
        if (poz == 1) {
            if (ut < 0) {
                out = std(L0);
            } else if (ut > 0) {
                out = pozcsere(L0);
                ujpoz = (poz + 1) % 2;
            } else if (ut == 0) {
                if (h > 1) {
                    out = csokk0(L0);
                } else {
                    out = veg0(L0);
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

    av = av.replaceAll("oo", oo);
    bv = bv.replaceAll("oo", oo);

    try {
        av = JSON.parse(av);
        bv = JSON.parse(bv);
        ha = av.length;
        hb = bv.length;

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
                refreskiura();
            }
        } else {
            outelem.innerText = "lepesinit():try>>>\n Mind a két vektor nem tartalmazhat ∞-t";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211"
            return;
        };

        if (outelem.style.color == "rgb(255, 34, 17)")
            outelem.innerText = "";
    } catch (error) {

        outelem.innerText = "lepesinit():try>>>\n A bevitt adatok valamelyike hibás";
        outelem.style.opacity = "1";
        outelem.style.color = "#ff2211"
    }
};

sor = function(S) {
    var poz, n, elem, out;
    out = [...S];
    poz = 1;
    while (poz > -1) {
        n = out.length - 1;
        elem = [...out[n]];
        elem = lepes(elem);
        poz = elem[0];
        out.push(elem);

    };
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

Inf2oo = function(v) {
    var out = v.map(function(y) {
        if (y == Infinity) return "oo";
        else return y;
    });
    return out;
};

ltxformaz = function(s) {
    var x, y, l, out;
    x = s[1][0];
    y = s[1][1];
    if (s[0] == 0) {
        l = "\\rfloor";
    } else {
        l = "\\lfloor"
    }
    x = JSON.stringify(x).replaceAll(",", "").replace("[", "\\left(\\text{").replace("]", "}");
    y = JSON.stringify(y).replaceAll(",", "").replace("[", "\\text{").replace("]", "}\\right)")
    out = x + l + y;
    return out;
};

sformaz = function(s) {
    var x, y, l, out;
    x = s[1][0];
    y = s[1][1];
    if (s[0] == 0) {
        l = "⌋";
    } else {
        l = "⌊";
    }

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

var sForma = 1;

SFormaz = function(S) {
    var out = "";
    var n = S.length;
    var szamlalo = 0;
    for (var i = 0; i < n - 1; i++) {
        var str = S[i];
        var e = elojele(Math.pow(-1, i));
        var kiesik = "";
        if (lepessor[i] == "↻" || lepessor[i - 1] == "↻")
            kiesik = "*";
        if (sForma == 1) {
            out = out + JSON.stringify(i) + "." + kiesik + " " + e + sformaz(str) + "\u00a0\u00a0\u00a0\u00a0 " + lepessor[i] + "\n";
        } else if (sForma == 2) {
            if (kiesik !== "*") {
                out = out + JSON.stringify(szamlalo) + ". " + e + sformaz(str) + "\u00a0\u00a0\u00a0\u00a0 " + lepessor[i] + "\n";
                szamlalo++;
            }
        } else if (sForma == 3) {
            if (kiesik !== "*") {
                out = out + e + sformaz(str);
            }
        } else {
            out = out + e + sformaz(str) + kiesik;
        }
    }
    var ut = "";
    var vegtor = "";
    if (sForma == 1 || sForma == 2) {
        if (sForma == 1)
            ut = n - 1 + ". ";
        if (sForma == 2)
            ut = szamlalo + ". ";
        vegtor = "\n \u00a0\u00a0\u00a0\u00a0 \u00a0\u00a0\u00a0";
    };

    var utolso1 = S[n - 1][1][0][1];
    var utolso2 = S[n - 1][1][1][1];
    var indx1 = utolso1.indexOf(Infinity);
    var indx2 = utolso2.indexOf(Infinity);
    if (indx1 > -1)
        utolso1 = Inf2oo(utolso1);
    if (indx2 > -1)
        utolso2 = Inf2oo(utolso2);
    var vege = ut + elojele(Math.pow(-1, n + 1)) + JSON.stringify(utolso1).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞") + vegtor + elojele(Math.pow(-1, n)) + JSON.stringify(utolso2).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
    out = out + vege;
    if (sForma == 0 || sForma == 3)
        out = out.slice(3);
    return out;
};

var poz = 0;
const oo = 12345678912321;

urites = function() {
    lepessor = [];
    var elem, masik, inp;
    var av = document.getElementById("av").value;
    var bv = document.getElementById("bv").value;
    var outelem = document.getElementById("mpout");
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
    av = av.replaceAll("oo", oo);
    bv = bv.replaceAll("oo", oo);

    try {
        av = JSON.parse(av);
        bv = JSON.parse(bv);

        var aindx = av.indexOf(oo);
        var bindx = bv.indexOf(oo);
        if (aindx > -1)
            av = oo2Inf(av);
        if (bindx > -1)
            bv[bindx] = Infinity;

        if (poz == 0 && aindx < 0) {
            elem = av;
            masik = bv;
        } else if (poz == 1 && bindx < 0) {
            elem = bv;
            masik = av;
        } else {
            outelem.innerText = "urites():try>>>\nA kiüritendő vektor nem tartalmazhat ∞-t!";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211"
            return;
        }
        outelem.style.color = "";
    } catch (error) {
        outelem.innerText = "urites():try>>>\nA bevitt adatok valamelyike hibás!";
        outelem.style.opacity = "1";
        outelem.style.color = "#ff2211"
    };

    var elast = elem[elem.length - 1];
    var mlast = masik[masik.length - 1];
    if (elast >= 0) {
        var tmasik = masik.slice(0, -1)
        tmasik.push(mlast + 1);
        inp = [
            [0, [elem, tmasik]]
        ];

    } else {
        var telem = elem.slice(0, -1)
        telem.push(elast + 1);
        inp = [
            [1, [masik, telem]]
        ];
    };

    var Q = sor(inp);
    out = SFormaz(Q);
    outelem.innerText = out;
    outelem.style.opacity = "1";
};

setsForma = function() {
    var forma = document.getElementById("setsForma").value;
    sForma = forma * 1;
    urites();
};

aSumRefresh = function() {
    document.getElementById("mpout").style.opacity = "0.3";
    var av = document.getElementById("av").value;
    if (!av.startsWith("[")) {
        av = "[" + av;
    };
    if (!av.endsWith("]")) {
        av = av + "]";
    };
    av = av.replaceAll("oo", oo);
    try {
        av = JSON.parse(av);
        var aindx = av.indexOf(oo);
        if (aindx > -1)
            av[aindx] = Infinity;
        var asv = av.reduce((x, y) => Math.abs(x) + Math.abs(y), 0);
        if (asv == Infinity)
            asv = "∞";
        document.getElementById("as").innerText = asv;

    } catch {}
};

bSumRefresh = function() {
    document.getElementById("mpout").style.opacity = "0.3";
    var bv = document.getElementById("bv").value;
    if (!bv.startsWith("[")) {
        bv = "[" + bv;
    };
    if (!bv.endsWith("]")) {
        bv = bv + "]";
    };
    bv = bv.replaceAll("oo", oo);
    try {
        bv = JSON.parse(bv);
        var bindx = bv.indexOf(oo);
        if (bindx > -1)
            bv[bindx] = Infinity;
        var bsv = bv.reduce((x, y) => Math.abs(x) + Math.abs(y), 0);
        if (bsv == Infinity)
            bsv = "∞";
        document.getElementById("bs").innerText = bsv;

    } catch {}
};

mpoutClear = function() {
    document.getElementById("mpout").style.opacity = "0.3";
};

refreskiura = function() {
    poz = 0;
    document.getElementById("avl").classList.add("kiur");
    document.getElementById("bvl").classList.remove("kiur");
};

refreskiurb = function() {
    poz = 1;
    document.getElementById("bvl").classList.add("kiur");
    document.getElementById("avl").classList.remove("kiur");
};

function sbTgl() {
    var elem = document.getElementById("settingbar");
    var open = elem.style.display;
    if (open == "none")
        elem.style.display = "block";
    else
        elem.style.display = "none";
};

function setOutputFont(v) {
    var elem = document.getElementById("mpout");
    elem.style.fontSize = v + '%';
};

opt_wrap = false;

function wrapSwitch(t) {
    opt_wrap = t.checked;
    var elem = document.getElementById("mpout");
    if (opt_wrap)
        elem.style.width = "fit-content";
    else
        elem.style.width = "max-content";
};
