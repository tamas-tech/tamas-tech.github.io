function gcd(x, y) {
    if (y === 0) return x;
    /* else */
    return gcd(y, x % y);
};

function egyszerusit(n, m) {
    var t = n;
    if (m != 1) {
        const g = gcd(n, m);
        const nev = m / g;
        if (nev == 1)
            t = n / g;
        else
            t = "\\frac{" + (n / g) + "}{" + (m / g) + "}";
    };
    if (t == 1)
        t = "";
    return t;
};

function factorial(n) {
    var h;
    if (n == 0)
        h = 1;
    else
        h = n * factorial(n - 1);
    return h;
};

function abfact(a, b) {
    var c = 1;
    for (j = a; j < b; j++)
        c *= factorial(j);
    return c;
}

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

function Stirling(n, k) {
    var h;

    if (n == 0 && k == 0)
        h = 1;
    else if (n == 0 || k == 0)
        h = 0;
    else {
        h = (n - 1) * Stirling(n - 1, k) + Stirling(n - 1, k - 1);
    };
    return h;
};

function tglHelp(id1, id2) {
    var elem1 = document.getElementById(id1);
    var elem2 = document.getElementById(id2);
    var open1 = elem1.style.display;
    var open2 = elem2.style.display;
    if (open1 == "none") {
        elem1.style.display = "block";
        if (open2 == "block")
            elem2.style.display = "none";
    } else
        elem1.style.display = "none";
};

function setn(elem, id) {
    var n = elem.value;
    var Nelem = document.getElementById(id + "kijelzo");
    Nelem.innerHTML = n;
    if (id == "n1")
        azonHecmplusHa();
};

function kijelzoClear(id) {
    var elem = document.getElementById(id);
    elem.innerText = "";
};

function partialFrac() {
    const n = document.getElementById("n").value * 1;
    const m = document.getElementById("m").value * 1;
    var kijelzo = document.getElementById("partfrac");
    var keplet = "\\begin{gather*}\\frac{1}{x^{" + n + "}\\cdot(1-x)^{" + m + "}}=";
    for (var k = 1; k < n + 1; k++) {
        keplet += "\\dfrac{\\dbinom{" + (n + m - 1 - k) + "}{" + (m - 1) + "}}{x^{" + k + "}}+";
    };
    for (var k = 1; k < m + 1; k++) {
        keplet += "\\dfrac{\\dbinom{" + (n + m - 1 - k) + "}{" + (n - 1) + "}}{(1-x)^{" + k + "}}+";
    };
    keplet = keplet.slice(0, -1) + " = \\\\ \\\\ =";
    for (var k = 1; k < n + 1; k++) {
        keplet += "\\frac{" + binomial((n + m - 1 - k), (m - 1)) + "}{x^{" + k + "}}+";
    };
    for (var k = 1; k < m + 1; k++) {
        keplet += "\\frac{" + binomial((n + m - 1 - k), (n - 1)) + "}{(1-x)^{" + k + "}}+";
    };
    keplet = keplet.slice(0, -1) + "\\end{gather*}";
    keplet = keplet.replaceAll("x^{1}\\cdot", "x\\cdot").replaceAll("{(1-x)^{1}", "{1-x").replaceAll("\\cdot(1-x)^{1}", "\\cdot(1-x)").replaceAll("x^{1}", "x");
    kijelzo.innerText = "\\[" + keplet + "\\]"
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, kijelzo]);
};

function elsoUpd() {
    const p = document.getElementById("p").value * 1;
    const n = document.getElementById("n").value * 1;
    const m = document.getElementById("m").value * 1;
    const elem = document.getElementById("elsoint");
    const c = binomial(n + m - 2, n - 1);
    elem.innerText = "\\(\\displaystyle\\int" + c + "\\,\\dfrac{\\ln^{" + p + "}(x)}{x}\\,\\text{d}x=" + c + "\\,\\dfrac{\\ln^{" + (p + 1) + "}(x)}{" + (p + 1) + "}\\)";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    const elem1 = document.getElementById("felsoint");
    elem1.innerText = "\\(\\displaystyle\\int\\ln^{" + p + "}(x)\\,f(x)\\,\\text{d}x\\)";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem1]);
    const elem2 = document.getElementById("esz");
    elem2.innerText = "\\(\\dfrac{" + c + "}{x}\\)";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem2]);
    const elem3 = document.getElementById("felsoint1");
    elem3.innerText = "\\(\\displaystyle\\int\\ln^{" + p + "}(x)\\,f(x)\\,\\text{d}x\\)";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem3]);
    const elem4 = document.getElementById("log");
    elem4.innerText = "\\(\\ln^{" + p + "}(x)\\)";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem4]);
};

function partialStirl() {
    const n = document.getElementById("n").value * 1;
    const m = document.getElementById("m").value * 1;
    var kijelzo = document.getElementById("partstirl");
    var keplet = "\\begin{gather*}";
    for (var mm = 1; mm < m + 1; mm++) {
        var b = binomial((n + m - 1 - mm), (n - 1))
        keplet += "\\frac{" + b + "}{(1-x)^{" + mm + "}}=\\dfrac{" + b + "}{(" + mm + "-1)!}\\cdot\\left\\{";
        for (var k = 0; k < mm; k++) {
            keplet += "\\begin{bmatrix}" + (mm - 1) + "\\\\" + k + "\\end{bmatrix}\\,\\dfrac{\\text{Li}_{" + (-k) + "}(x)}{x}+";
        };
        keplet = keplet.slice(0, -1) + "\\right\\} = \\\\ \\\\ =\\dfrac{" + b + "}{" + factorial(mm - 1) + "}\\cdot\\left\\{";
        for (var k = 0; k < mm; k++) {
            keplet += Stirling(mm - 1, k) + "\\,\\dfrac{\\text{Li}_{" + (-k) + "}(x)}{x}+";
        };
        keplet = keplet.slice(0, -1) + "\\right\\} = \\\\ \\\\ =";
        for (var k = 0; k < mm; k++) {
            if (k == 0 && mm > 1)
                keplet += "";
            else
                keplet += egyszerusit(b * Stirling(mm - 1, k), factorial(mm - 1)) + "\\,\\dfrac{\\text{Li}_{" + (-k) + "}(x)}{x}+";
        };
        keplet = keplet.slice(0, -1) + " \\\\ \\\\ \\hline\\\\ \\\\";
    };
    keplet = keplet.slice(0, -5) + "\\text{Összegezve, és Li-k szerint összevonva f(x)-re az alábbit kapjuk:}\\\\ \\hline \\\\";
    keplet += "f(x) = ";
    for (var k = 2; k < n + 1; k++) {
        keplet += "\\frac{" + binomial((n + m - 1 - k), (m - 1)) + "}{x^{" + k + "}}+";
    };
    for (var k = 1; k < m + 1; k++) {
        keplet += "\\frac{" + binomial((n + m - 1 - k), (n - 1)) + "}{(1-x)^{" + k + "}}+";
    };
    keplet = keplet.slice(0, -1);
    keplet += "= \\\\ \\\\ =";
    for (var k = 2; k < n + 1; k++) {
        keplet += "\\frac{" + binomial((n + m - 1 - k), (m - 1)) + "}{x^{" + k + "}}+";
    };
    for (var j = 0; j < m; j++) {
        var c = 0;
        var s = abfact(j, m);
        for (k = j + 1; k < m + 1; k++) {
            c += Stirling(k - 1, j) * binomial(n + m - 1 - k, n - 1) * s / factorial(k - 1)
        };
        keplet += egyszerusit(c, s) + "\\,\\dfrac{\\text{Li}_{" + (-j) + "}(x)}{x}+"
    };
    keplet = keplet.slice(0, -1);
    keplet += "\\end{gather*}"
    keplet = keplet.replaceAll("{(1-x)^{1}", "{1-x");
    kijelzo.innerText = "\\[" + keplet + "\\]"
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, kijelzo]);
};

function veger() {
    const p = document.getElementById("p").value * 1;
    const n = document.getElementById("n").value * 1;
    const m = document.getElementById("m").value * 1;
    const c = binomial(n + m - 2, n - 1);

    var kijelzo = document.getElementById("veger");
    var keplet = "\\int\\dfrac{\\ln^{" + p + "}(x)}{x^{" + n + "}\\,(1-x)^{" + m + "}}\\,\\text{d}x=\\dfrac{" + c + "}{" + (p + 1) + "}\\,\\ln^{" + (p + 1) + "}(x)+\\\\ \\\\";
    for (var k = 0; k < p + 1; k++) {
        var elojel = "+";
        var nextjel = "-";
        if ((k % 2) == 1) {
            elojel = "-";
            nextjel = "+";
        };
        keplet += elojel + "\\ln^{" + (p - k) + "}(x)\\cdot\\left\\{";
        var s22 = factorial(p);
        var s23 = factorial(p - k);
        var s2 = s22 / s23;
        for (var t = 0; t < m; t++) {
            var cc = 0;
            var s1 = abfact(t, m);
            for (r = t + 1; r < m + 1; r++) {
                cc += Stirling(r - 1, t) * binomial(n + m - 1 - r, n - 1) * s1 * s2 / factorial(r - 1);
            };
            keplet += egyszerusit(cc, s1) + "\\,\\text{Li}_{" + (k + 1 - t) + "}(x)+"
        };

        keplet = keplet.slice(0, -1) + nextjel;
        if ((k % 2) == 0)
            keplet += "\\left(";
        for (var tt = 2; tt < n + 1; tt++) {
            var ct = binomial(n + m - 1 - tt, m - 1) * s22;
            keplet += egyszerusit(ct, Math.pow(tt - 1, k + 1) * s23) + "\\,\\dfrac{1}{x^{" + (tt - 1) + "}}+"
        };
        keplet = keplet.slice(0, -1);
        if ((k % 2) == 0)
            keplet += "\\right)";
        keplet += "\\right\\}" + nextjel + " \\\\  \\\\ ";
    };
    keplet = keplet.slice(0, -9);
    keplet = keplet.replaceAll("\\ln^{0}(x)\\cdot", "").replaceAll("\\ln^{1}(x)", "\\ln(x)").replaceAll("^{1}", "");
    kijelzo.innerText = "\\[" + keplet + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, kijelzo]);


    var cek = "{c|";
    for (var u = 2; u < m + n + 1; u++) {
        cek += "c";
        if (u == m + 1)
            cek += "|";
    };
    szab = "\\begin{gather*}\\begin{array}" + cek + "}";
    var ures = "";
    for (var s = 1; s < n + m - 1; s++) {
        ures += "\\bullet &";
    };
    ures += "\\bullet \\\\";

    for (var s = 0; s < n + m; s++) {
        if (s == 0)
            szab += "\\ln^{k}(x)&";
        else if (s < m + 1)
            szab += "\\text{Li} &";
        else
            szab += "x^{-" + (s - m) + "} &";
    };
    szab = szab.slice(0, -1) + "\\\\ \\hline";
    for (var v = 1; v < 2 * p + 1; v++) {
        if (v % 2 == 1)
            szab += "\\ln^{" + (p + 1 - (v + 1) / 2) + "}(x)&" + ures;
        else {
            for (var s = 0; s < n + m; s++) {
                var sor = p - v / 2 + 1;
                if (s == 0)
                    szab += " &";
                else if (s < m + 1)
                    szab += "{\\Large\\downarrow} " + sor + "\\times &";
                else
                    szab += "{\\large\\downarrow} " + sor + "/" + (s - m) + "\\times &";
            };
            szab = szab.slice(0, -1) + "\\\\";
        };
    };

    szab += "\\ln^{0}(x)&" + ures;
    szab = szab.slice(0, -2);
    szab += "\\end{array}\\\\ \\\\ ";

    var cek1 = "{c|";
    for (var u = 1; u < m + 1; u++) {
        cek1 += "c";
    };
    szab += "\\begin{array}" + cek1 + "}";
    for (var s = 0; s < m + 1; s++) {
        if (s == 0)
            szab += "\\ln^{k}(x)&";
        else
            szab += s + " &";
    };
    szab = szab.slice(0, -1) + "\\\\ \\hline";
    for (var v = 1; v < p + 2; v++) {
        for (var s = 0; s < m + 1; s++) {
            var sor = p - v + 1;
            if (s == 0)
                szab += "\\ln^{" + (p + 1 - v) + "}(x)&"
            else
                szab += "\\text{Li}_{" + (v + 1 - s) + "} &";
        };
        szab = szab.slice(0, -1) + "\\\\";
    };
    szab += "\\end{array}\\end{gather*}";
    var kijelzo1 = document.getElementById("szabaly");
    kijelzo1.innerText = "\\[" + szab + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, kijelzo1]);
}