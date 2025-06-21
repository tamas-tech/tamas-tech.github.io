// poset of compositions

function setOutputFontc(v) {
    var elem = document.getElementById("cout");
    elem.style.fontSize = v + 'px';
};

function allcomps(n) {
    var out = [];
    for (var k = 1; k <= n; k++) {
        var c = comp(n, k);
        for (let v of c)
            out.push(v);
    };
    return out;
};

function invPv(v) {
    var c = [],
        out = [];
    for (let k of v)
        c.push(allcomps(k));
    out = cartesian(c);
    out = out.map(y => _.flatten(y));
    return out;
};

function strictinvPv(v) {
    return _.tail(invPv(v), v);
};


function kiszed_c(id) {
    var av = document.getElementById(id).value;
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "figyC");
        idClear('#cout')
        return "Hibás bemenet";
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
        if (av.some(v => v <= 0)) {
            setfigy("Az <b>a</b> vektor nem tartalmazhat negatív elemet vagy 0-át! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figyC");
            idClear('#cout')
            return "Hibás bemenet";
        } else if (indx > -1) {
            av = oo2strInf(av);
            setfigy("Az <b>a</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figyC");
            idClear('#cout')
            return "Hibás bemenet";
        }

    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figyC");
        idClear('#cout')
        return "Hibás bemenet";
    };
    return av;
};

function groupawithb(a, b) {
    var out = [];
    for (let i of b) {
        out.push(_.sum(_.take(a, i)));
        a = a.slice(i);
    }
    return out;
};

function coarser(c) {
    var out = [];
    const grp = _.reverse(allcomps(c.length));
    for (let g of grp)
        out.push(groupawithb(c, g));
    return out;
};

/* function elozoje(c) {
    const n = c.length - 1;
    var out = [];
    const grp = allcomps(c.length).filter(y => y.length == n);
    for (let g of grp)
        out.push(groupawithb(c, g));
    return out;
}; */

function kovetoje(c) {
    const n = c.length + 1;
    return invPv(c).filter(y => y.length == n);
};

function elozoje(c) {
    const n = c.length - 1;
    return coarser(c).filter(y => y.length == n);
};

function kisebbnagyobb(elem) {
    var s = elem.dataset.a;
    if (s == "kisebb") {
        elem.dataset.a = "nagyobb";
        elem.innerHTML = "&preceq;";
    } else {
        elem.dataset.a = "kisebb";
        elem.innerHTML = "&succeq;";
    }
};

function cFiner() {
    const elem = document.getElementById("cout");
    const allas = document.getElementById("knr").dataset.a;
    const c = kiszed_c('cvec');
    var txt = "";
    if (c == "Hibás bemenet")
        txt += c;
    else if (allas == "nagyobb") {
        const s = _.sum(c);
        const r = c.length;
        const ctxt = JSON.stringify(c).replaceAll("[", "(").replaceAll("]", ")");
        var out = invPv(c);
        txt += "A<span style='color:#888;'>(z)</span> " + ctxt + " vektornál <b>finomabb</b> vektorok száma: " + 2 + "<sup>" + s + "  −&nbsp;" + r + "</sup> = 2<sup>" + (s - r) + "</sup> = " + Math.pow(2, s - r) + ".";
        txt += "<br> {<b>k</b> | " + ctxt + "&preceq; <b>k</b> } = ";
        txt += JSON.stringify(out).replaceAll("],[", "), (").replace("[[", "{(").replace("]]", ")}");
    } else {
        const r = c.length;
        const ctxt = JSON.stringify(c).replaceAll("[", "(").replaceAll("]", ")");
        var out = coarser(c);
        txt += "A<span style='color:#888;'>(z)</span> " + ctxt + " vektornál <b>durvább</b> vektorok száma: " + 2 + "<sup>" + r + "  −&nbsp;1</sup> = 2<sup>" + (r - 1) + "</sup> = " + Math.pow(2, r - 1) + ".";
        txt += "<br> {<b>k</b> | " + ctxt + " &succeq;<b>k</b>} = ";
        txt += JSON.stringify(out).replaceAll("],[", "), (").replace("[[", "{(").replace("]]", ")}");
    }
    elem.innerHTML = txt;
};

function id1tgl(id) {
    var elem = document.getElementById(id);
    $(elem).toggle();
};

function posetid1() {
    const elem = document.getElementById("cout");
    const s = kiszed_c('cvec');
    var txt = "";
    if (s == "Hibás bemenet")
        txt += s;
    else {
        const sf = invPv(s);
        const sc = conjugate(s);
        const scf = invPv(sc);
        const ss = _.sum(s)

        var stxt = JSON.stringify(s).replaceAll("[", "(").replaceAll("]", ")");
        var stxtr = "";
        var bo = "",
            jo = "";
        for (let k of sf) {
            stxtr += "<span class='id1' data-id='" + JSON.stringify(k).slice(1, -1).replaceAll(",", "_") + "' onclick='hlid(this);kivvec(this);'>(" + k + ")</span>,";
            var lk = k.length;
            var ck = coarser(k);
            for (let l of ck) {
                var eloj = Math.pow(-1, lk + l.length);
                if (eloj == 1)
                    eloj = " + ";
                else
                    eloj = " − ";
                bo += "<span class='id1' data-id='" + JSON.stringify(l).slice(1, -1).replaceAll(",", "_") + "' onclick='hlid(this);'>" + eloj + "A<sub>(" + l + ")</sub></span>";
            };
        };
        stxtr = "{" + stxtr.slice(0, -1) + "}";

        var sctxtr = "";
        for (let k of scf) {
            sctxtr += "<span class='id1' data-id='" + JSON.stringify(k).slice(1, -1).replaceAll(",", "_") + "' onclick='hlid(this);'>(" + k + ")</span>,";
            var lk = k.length;
            var elojs = Math.pow(-1, ss + lk);
            if (elojs == 1)
                elojs = " + ";
            else
                elojs = " − ";
            jo += "<span class='id2' data-id='" + JSON.stringify(k).slice(1, -1).replaceAll(",", "_") + "' onclick='hlid(this);'>" + elojs + "A<sub>(" + k + ")</sub></span>";
        };
        sctxtr = "{" + sctxtr.slice(0, -1) + "}";
        var sctxt = JSON.stringify(sc).replaceAll("[", "(").replaceAll("]", ")");
        txt += "<div>A <b>c</b> = " + stxt + " vektor konjugáltja a <b>c</b>* = " + sctxt + " vektor.</div> ";
        txt += "<div style='background-color: #ffd9d9;'> A <b>c</b> vektornál finomabb vektorok: {<b>k</b> | " + stxt + "&preceq; <b>k</b> } <span style='display:inline;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#f2cece;border-radius: 4px;' onclick='id1tgl(\"sf_show\");'>=</span> <span style='display:none;' id='sf_show' >" + stxtr + "</span></div>";
        txt += "<div >A kiválasztott <b>k</b> = <span id='kivec' style='color:red;'> --- </span> vektornál durvább vektorok: <span id='kivecd'> --- </span></div>"
        txt += "<div style='background-color: #ffd9d9;'>A <b>c</b>* vektornál finomabb vektorok: {<b>k</b> | " + sctxt + "&preceq; <b>k</b> } <span style='display:inline;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#f2cece;border-radius: 4px;' onclick='id1tgl(\"scf_show\");'>=</span> <span style='display:none;' id='scf_show' >" + sctxtr + "</span></div><h3 style='text-align:center;'>Az azonosság</h3>";
        txt += bo + " = " + jo;
    };

    elem.innerHTML = txt;
};

function hlid(elem) {
    const id = elem.dataset.id;
    $('.id1.hl,.id2.hl').removeClass('hl');
    $('.id1[data-id=' + id + '],.id2[data-id=' + id + ']').addClass('hl');
    const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
    const fine = _.tail(invPv(vec));

    const ff = fine.map(y => $('#sf_show .id1[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
    $('#sf_show .id1.finer').removeClass('finer');
    for (f of ff)
        f.addClass('finer');
};

function kivvec(elem) {
    const id = elem.dataset.id;
    const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
    $('#kivec').html("(" + vec + ")");
    var coa = coarser(vec).map(y => JSON.stringify(y));
    coa = "{" + coa + "}";
    coa = coa.replaceAll("[", "(").replaceAll("]", ")");
    $('#kivecd').html(coa);
};