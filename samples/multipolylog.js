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

function setMode(t) {
    mode = t.value;
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

Lef_std = function(LL) {
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

Lef_csokk0 = function(LL) {
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

Lef_csokk1 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a.splice(-1);
    b.push(1);
    lepessor.push("1⌋⟶");
    return [a, b];
}

Leff_veg0 = function(LL) {
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

Lef_veg0 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    let n = a.length - 1;
    a[n] = a[n] - 1;
    a.push(1);
    b.shift();
    lepessor.push("■⟵⌊0");
    return [a, b];
};

Leff_veg1 = function(LL) {
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

Lef_veg1 = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    a.shift();
    b.push(1);
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

Lef_rapakol = function(LL) {
    var L = _.cloneDeep(LL);
    let a = L[0];
    let b = L[1];
    let na = a.length;
    let nb = b.length;
    if (na == 0) {
        b[nb - 2] = b[nb - 2] + b[nb - 1];
        b.pop();
    } else {
        a[na - 2] = a[na - 2] + a[na - 1];
        a.pop();
    };
    lepessor.push("↶1");
    return [a, b];
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
    else if (poz == 50) {
        if (mode == "Le")
            out = Le_rapakol(L0);
        else
            out = Lef_rapakol(L0);
        ujpoz = -100;
    } else {
        L = L0[poz];
        h = L.length;
        if (mode == "Lef")
            ut = L[h - 1];
        else
            ut = L[0];
        ujpoz = poz;
    }
    if (poz == 0) {
        if (ut > 1) {
            if (mode == "Lef")
                out = Lef_std(L0);
            else
                out = std(L0);
        } else if (ut < 1) {
            out = pozcsere(L0);
            ujpoz = (poz + 1) % 2;
        } else if (ut == 1) {
            if (h > 1) {
                if (mode == "Lef")
                    out = Lef_csokk1(L0);
                else
                    out = csokk1(L0);
            } else {
                if (mode == "Lef") {
                    out = Lef_veg1(L0);
                    ujpoz = 50;
                } else {
                    out = veg1(L0);
                    if (mode == "Le")
                        ujpoz = 50;
                    else
                        ujpoz = -100;
                }
            }
        }
    } else {
        if (poz == 1) {
            if (ut < 0) {
                if (mode == "Lef")
                    out = Lef_std(L0);
                else
                    out = std(L0);
            } else if (ut > 0) {
                out = pozcsere(L0);
                ujpoz = (poz + 1) % 2;
            } else if (ut == 0) {
                if (h > 1) {
                    if (mode == "Lef")
                        out = Lef_csokk0(L0);
                    else
                        out = csokk0(L0);
                } else {
                    if (mode == "Lef") {
                        out = Lef_veg0(L0);
                        ujpoz = 50;
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
                    outelem.innerText = "lepesinit():try>>>\n Mind a két vektor nem lehet ÜRES!";
                    outelem.style.opacity = "1";
                    outelem.style.color = "#ff2211"
                    return;
                }
            }
        } else {
            outelem.innerText = "lepesinit():try>>>\n Mind a két vektor nem tartalmazhat ∞-t!";
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

var maxsor = 100;
var maxreach = false;


sor = function(S) {
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

elojel = function(e) {
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

var sForma = 1;

SFormaz = function(S) {
    var out = "";
    var n = S.length;
    var szamlalo = 0;
    var korlat = n;

    for (var i = 0; i < korlat; i++) {
        var str = S[i];
        var e = elojele(Math.pow(-1, i));
        var kiesik = "";
        if (lepessor[i] == "↻" || lepessor[i - 1] == "↻")
            kiesik = "*";
        if (sForma == 1) {
            out = out + JSON.stringify(i) + "." + kiesik + " " + e + sformaz(str) + "\u00a0\u00a0\u00a0\u00a0 " + (lepessor[i] || " ") + "\n";
        } else if (sForma == 2) {
            if (kiesik !== "*") {
                out = out + JSON.stringify(szamlalo) + ". " + e + sformaz(str) + "\u00a0\u00a0\u00a0\u00a0 " + (lepessor[i] || " ") + "\n";
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
    if (sForma == 0 || sForma == 3)
        out = out.slice(3);
    return out;
};

var poz = 0;
const oo = 12345678912321;
const BIG = 1000;
var SOR = [];
const pat = new RegExp("(?<=[^,])oo|oo(?=[^,])");
const maxLi = [100, 100, 100, 100, 100, 100, 60, 40, 30, 25, 20];

urites = function() {
    lepessor = [];
    maxreach = false;
    var elem, masik, inp;
    var av = document.getElementById("av").value;
    var bv = document.getElementById("bv").value;
    var outelem = document.getElementById("mpout");

    if (pat.test(av) || pat.test(bv)) {
        outelem.innerText = "urites()>>>\n Valamelyik ∞ jel hibás!";
        outelem.style.opacity = "1";
        outelem.style.color = "#ff2211"
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
        outelem.style.color = "#ff2211";
        return;
    };

    var ne = elem.length;
    var nm = masik.length;
    if (mode == "Lef") {
        if (ne == 0 && nm == 0) {
            outelem.innerText = "urites():try>>>\nMind a két vektor nem lehet ÜRES!";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211"
            return;
        } else if (sForma == 4) {
            outelem.innerText = "urites():try>>>\nMég nem implementált";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211"
            return;
        } else if (ne == 0 && nm > 0) {
            var mlast = masik[nm - 1];
            var tmasik = masik.slice(0, -1)
            tmasik.push(mlast + 1);
            tmasik = Inf2oo(tmasik);
            out = JSON.stringify(tmasik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
        } else if (ne > 0 && nm == 0) {
            var elast = elem[ne - 1];
            var telem = elem.slice(0, -1)
            telem.push(elast + 1);
            telem = Inf2oo(telem);
            out = JSON.stringify(telem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
        } else {
            var elast = elem[ne - 1];
            var mlast = masik[nm - 1];
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

            SOR = sor(inp);
            out = SFormaz(SOR);
        };
    } else {
        if (ne == 0 && nm == 0) {
            outelem.innerText = "urites():try>>>\nMind a két vektor nem lehet ÜRES!";
            outelem.style.opacity = "1";
            outelem.style.color = "#ff2211"
            return;
        } else if (sForma == 4) {
            var kiur = document.querySelector('.kiur').getAttribute('id').slice(0, 1);
            if (kiur == "a")
                LiMatrix(av, bv);
            else
                LiMatrix(bv, av);
            outelem.style.opacity = "1";
            return;
        } else if (ne == 0 && nm > 0) {
            var mfirst = masik[0];
            var tmasik = masik.slice(1)
            tmasik.unshift(mfirst + 1);
            tmasik = Inf2oo(tmasik);
            out = JSON.stringify(tmasik).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
            tmasik = oostr2Inf(tmasik)
            SOR = [
                [0, [
                    tmasik, []
                ]]
            ];
        } else if (ne > 0 && nm == 0) {
            var efirst = elem[0];
            var telem = elem.slice(1)
            telem.unshift(efirst + 1);
            telem = Inf2oo(telem);
            out = JSON.stringify(telem).replace("[", "(").replace("]", ")").replaceAll("\"oo\"", "∞");
        } else {
            var elast = elem[0];
            var mlast = masik[0];
            if (elast >= 0) {
                var tmasik = masik.slice(1)
                tmasik.unshift(mlast + 1);
                inp = [
                    [0, [elem, tmasik]]
                ];
            } else {
                var telem = elem.slice(1)
                telem.unshift(elast + 1);
                inp = [
                    [1, [masik, telem]]
                ];
            };

            SOR = sor(inp);
            out = SFormaz(SOR);
        };
    }
    if (maxreach)
        out = "Elértük a maximálisan megengedet " + maxsor + " lépésszámot.\nA számítás valószínűleg nem teljes.\n............\n " + out + "........"
    outelem.innerText = out;
    outelem.style.opacity = "1";
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

        } catch {}
    };
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

function helpTgl() {
    var elem = document.getElementById("helpbar");
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
    }, 100)
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

function setfigy(str) {
    var elem = document.getElementById("figy");
    if (str == "")
        elem.style.display = "none";
    else
        elem.style.display = "block";
    elem.innerHTML = str;
};

function setfigy0(str) {
    var elem = document.getElementById("figy0");
    if (str == "")
        elem.style.display = "none";
    else
        elem.style.display = "block";
    elem.innerHTML = str;
};

function setfigy1(str) {
    var elem = document.getElementById("figy1");
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
            setfigy(figy);
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
    setfigy(figy);
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
            setfigy(figy);
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
    setfigy(figy);
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

function setn(elem) {
    var n = elem.value;
    var Nelem = document.getElementById("nkijelzo");
    Nelem.innerHTML = n;
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
                setfigy0(figy);
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
    setfigy0(figy);
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
                setfigy0(figy);
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
    setfigy0(figy);
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

function HeSORnxk(n, k) {
    var ab = SOR[n][1];
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
        sum += Math.pow(-1, i) * HeSORnxk(i, k);
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
    if (a.length == 0)
        sum += He(b, k);
    else if (b.length == 0)
        sum += He(a, k);
    else
        for (var i = 1; i < k; i++) {
            sum += He(a, i) * He(b, k - i);
        };
    return sum / k;
};

function HaIntxk(a, b, k) {
    var sum = 0;
    if (a.length == 0)
        sum += Ha(b, k);
    else if (b.length == 0)
        sum += Ha(a, k);
    else
        for (var i = 1; i < k; i++) {
            sum += Ha(a, i) * Ha(b, k - i);
        };
    return sum / k;
};

// sorfejtes integralokra 3.

var sorhiba = false;

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
        //return str;
    };
    var str0 = "\\int\\frac{1}{x}\\,\\text{Li}_{\\left(" + avtxt + "\\right)}\\,\\left(x\\right)\\cdot\\text{Li}_{\\left(" + bvtxt + "\\right)}\\,\\left(x\\right)\\,\\text{d}x &=";
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
    setfigy1(figy);
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
    var str0 = "\\int\\frac{1}{x}\\,\\text{Le}_{\\left(" + avtxt + "\\right)}\\,\\left(x\\right)\\cdot\\text{Le}_{\\left(" + bvtxt + "\\right)}\\,\\left(x\\right)\\,\\text{d}x &=";
    var str1 = "";
    if (N > 4)
        hezag = "\\hspace{" + (0.05 * N + 1.4) + "cm}";
    var kezdo = 1;
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
    setfigy1(figy);
    return str1 + str2;
};

function setN(elem) {
    var N = elem.value;
    var Nelem = document.getElementById("seriesN");
    Nelem.innerHTML = N;
};

function sorfejtes() {
    //var n = SOR.length;
    sorhiba = false;
    var lengtelem = document.querySelector("#series-slider");
    var elem = document.querySelector("#keplet_sor");
    var N = lengtelem.value * 1;
    var txt = "";
    /* if (n > 30)
        elem.innerText = "\\[\\text{Legfeljebb 30 hosszu urites sorfejtese megengedett!}\\]";
    else  */
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
    var e = elojel(b[0]);
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

$(document).ready(function() {
    document.getElementById("okbtn").onclick = function() {
        var txt = LiLe0PARI();
        $('#mycell1 .sagecell_editor textarea.sagecell_commands').val(txt);
        $('#mycell1 .sagecell_input button.sagecell_evalButton').click();
        setOutputFont1($('#outfont-slider1').val());
    };
});

// H,ZETA
const Hmax = 500;

const binomial = (n, k) => {
    if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k === 1 || k === n - 1) return n;
    if (n - k < k) k = n - k;

    let res = n;
    for (let i = 2; i <= k; i++) res *= (n - i + 1) / i;
    return Math.round(res);
};

function HClear() {
    var elem = document.querySelector("#H");
    var elem1 = document.querySelector("#Hs");
    var elem2 = document.querySelector("#Z");
    var elem3 = document.querySelector("#Zs");
    var elemfigy = document.querySelector("#figyH");
    elem.innerText = "";
    elem1.innerText = "";
    elem2.innerText = "";
    elem3.innerText = "";
    elemfigy.style.display = "none";
};

function kiszed_av(id) {
    var av = document.getElementById(id).value;
    if (pat.test(av)) {
        return [];
    };
    //var avtxt = av.replaceAll('oo', '∞');
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    av = av.replaceAll('oo', oo);

    try {
        av = JSON.parse(av);
        /*  var aindx = av.indexOf(oo);
         if (aindx > -1) {
             av = oo2Inf1000(av);
         }; */

    } catch (error) {
        console.log(error);
        return;
    };
    return av;
};

function toABC() {
    let sv = kiszed_av("sv");
    let num = Math.min(6, sv[0]);
    let ABC = ["a", "b", "c", "d", "e", "f"]
    let str = '';
    for (var i = 0; i < num; i++)
        str += "\"" + ABC[i] + "\",";
    //str += "\"s_" + (i + 1).toString() + "\",";
    str = str.slice(0, -1);
    document.getElementById("sv").value = str;
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
        ltx = "\\text{ Az osszeg merete meghaladja a " + Hmax + "-at}";
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
        ltx = "\\text{ Az osszeg merete meghaladja a " + Hmax + "-at}";
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
    if (sv == undefined)
        ltx = "\\text{Hibas s vektor}";
    else
        ltx = Hltx(sv, n, ism);
    elemto.innerHTML = "\\[" + ltx + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
};

function kitoltZ(n, ism, idfrom, idto) {
    const sv = kiszed_av(idfrom);
    const elemto = document.getElementById(idto);
    let ltx = "";
    if (sv == undefined)
        ltx = "\\text{Hibas s vektor}"
    else
        ltx = zetaltx(sv, n, ism);
    elemto.innerHTML = "\\[" + ltx + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elemto]);
};

function HZszamitas() {
    const n = document.getElementById("n").value * 1;
    kitoltH(n, false, "sv", "H");
    kitoltH(n, true, "sv", "Hs");
    kitoltZ(n, false, "sv", "Z");
    kitoltZ(n, true, "sv", "Zs");
};
