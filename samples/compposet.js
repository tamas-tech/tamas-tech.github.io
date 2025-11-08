// poset of compositions
var ra = undefined;
var cN = 1;
var cN2 = 1;
var egyezes = 2;
var rfb_last = { "v": [], "deriv_path": [], "s": 0, "C": [], "Li": 0, "o": 0 };
var rfbtegla = [
    0, []
];
deriv_fix = false;
var allcompReg = [];
var dkpts = ["none", "none", "none", "none", "none", "none"];
var osszesk = true;

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

function setOutputFontc(v) {
    var elem = document.getElementById("cout");
    elem.style.fontSize = v + 'px';
};

function setOutputFontcall(v) {
    var elem = document.getElementById("callout");
    elem.style.fontSize = v + 'px';
};

function callOutClear() {
    idClear('#callout');
    const cobj = window.cy;
    if (cobj != undefined) {
        window.cy.destroy();
        $('cy').remove();
    }
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

function idcsucUPD(setcsuc) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        if (setcsuc) {
            const fine = _.tail(invPv(vec));
            const ff = fine.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.finer').removeClass('finer');
            for (let f of ff)
                f.addClass('finer');
        } else
            $('.allid.finer').removeClass('finer');
    };
};

function idckovUPD(setckov) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        if (setckov) {
            const kov = kovetoje(vec);
            const fk = kov.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.koveto').removeClass('koveto');
            for (let f of fk) {
                f.removeClass('finer');
                f.addClass('koveto');
            };
        } else {
            const setcsuc = document.getElementById("csuc").checked;
            if (setcsuc)
                $('.allid.koveto').addClass('finer');
            $('.allid.koveto').removeClass('koveto');
        }
    };
};

function idcprecUPD(setcprec) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        if (setcprec) {
            const coa = _.tail(coarser(vec));
            const fd = coa.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.coarser').removeClass('coarser');
            for (let f of fd)
                f.addClass('coarser');
        } else
            $('.allid.coarser').removeClass('coarser');
    };
};

function idcelzUPD(setcelz) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        if (setcelz) {
            const megel = elozoje(vec);
            const fe = megel.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.elozo').removeClass('elozo');
            for (let f of fe) {
                f.removeClass('coarser');
                f.addClass('elozo');
            };
        } else {
            const setcprec = document.getElementById("cprec").checked;
            if (setcprec)
                $('.allid.elozo').addClass('coarser');
            $('.allid.elozo').removeClass('elozo');
        }
    };
};

function idccsucUPD(setccsuc) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        const cvec = conjugate(vec);
        if (setccsuc) {
            const cfine = _.tail(invPv(cvec));
            const cff = cfine.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.cfiner').removeClass('cfiner');
            for (let f of cff)
                f.addClass('cfiner');
        } else
            $('.allid.cfiner').removeClass('cfiner');
    };
};

function idcckovUPD(setcckov) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        const cvec = conjugate(vec);
        if (setcckov) {
            const ckov = kovetoje(cvec);
            const cfk = ckov.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.ckoveto').removeClass('ckoveto');
            for (let f of cfk) {
                f.removeClass('cfiner');
                f.addClass('ckoveto');
            };
        } else {
            const setccsuc = document.getElementById("ccsuc").checked;
            if (setccsuc)
                $('.allid.ckoveto').addClass('cfiner');
            $('.allid.ckoveto').removeClass('ckoveto');
        };
    };
};

function idccprecUPD(setccprec) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        const cvec = conjugate(vec);
        if (setccprec) {
            const ccoa = _.tail(coarser(cvec));
            const cfd = ccoa.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.ccoarser').removeClass('ccoarser');
            for (let f of cfd)
                f.addClass('ccoarser');
        } else
            $('.allid.ccoarser').removeClass('ccoarser');
    };
};

function idccelzUPD(setccelz) {
    const elem = $('.allid.hl')[0];
    if (elem) {
        const id = elem.dataset.id;
        const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");
        const cvec = conjugate(vec);
        if (setccelz) {
            const cmegel = elozoje(cvec);
            const cfe = cmegel.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
            $('.allid.celozo').removeClass('celozo');
            for (let f of cfe) {
                f.removeClass('ccoarser');
                f.addClass('celozo');
            };
        } else {
            const setccprec = document.getElementById("ccprec").checked;
            if (setccprec)
                $('.allid.celozo').addClass('ccoarser');
            $('.allid.celozo').removeClass('celozo');
        }
    };
};

function callidUPD() {
    const elem = $('.allid.hl')[0];
    if (!elem)
        return;
    const id = elem.dataset.id;
    $('.allid.hl').removeClass('hl');
    $(elem).addClass('hl');
    const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");

    const setcsuc = document.getElementById("csuc").checked;
    const setckov = document.getElementById("ckov").checked;
    const setcprec = document.getElementById("cprec").checked;
    const setcelz = document.getElementById("celz").checked;
    const setccsuc = document.getElementById("ccsuc").checked;
    const setcckov = document.getElementById("cckov").checked;
    const setccprec = document.getElementById("ccprec").checked;
    const setccelz = document.getElementById("ccelz").checked;

    if (setcsuc) {
        const fine = _.tail(invPv(vec));
        const ff = fine.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.finer').removeClass('finer');
        for (let f of ff)
            f.addClass('finer');
    } else
        $('.allid.finer').removeClass('finer');

    if (setckov) {
        const kov = kovetoje(vec);
        const fk = kov.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.koveto').removeClass('koveto');
        for (let f of fk) {
            f.removeClass('finer');
            f.addClass('koveto');
        };
    } else
        $('.allid.koveto').removeClass('koveto');

    if (setcprec) {
        const coa = _.tail(coarser(vec));
        const fd = coa.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.coarser').removeClass('coarser');
        for (let f of fd)
            f.addClass('coarser');
    } else
        $('.allid.coarser').removeClass('coarser');

    if (setcelz) {
        const megel = elozoje(vec);
        const fe = megel.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.elozo').removeClass('elozo');
        for (let f of fe) {
            f.removeClass('coarser');
            f.addClass('elozo');
        };
    } else
        $('.allid.elozo').removeClass('elozo');

    const cvec = conjugate(vec);
    const fc = $('.allid[data-id="' + JSON.stringify(cvec).slice(1, -1).replaceAll(",", "_") + '"]');
    $('.allid.conj').removeClass('conj');
    fc.addClass('conj');

    if (setccsuc) {
        const cfine = _.tail(invPv(cvec));
        const cff = cfine.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.cfiner').removeClass('cfiner');
        for (let f of cff)
            f.addClass('cfiner');
    } else
        $('.allid.cfiner').removeClass('cfiner');

    if (setcckov) {
        const ckov = kovetoje(cvec);
        const cfk = ckov.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.ckoveto').removeClass('ckoveto');
        for (let f of cfk) {
            f.removeClass('cfiner');
            f.addClass('ckoveto');
        };
    } else
        $('.allid.ckoveto').removeClass('ckoveto');

    if (setccprec) {
        const ccoa = _.tail(coarser(cvec));
        const cfd = ccoa.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.ccoarser').removeClass('ccoarser');
        for (let f of cfd)
            f.addClass('ccoarser');
    } else
        $('.allid.ccoarser').removeClass('ccoarser');

    if (setccelz) {
        const cmegel = elozoje(cvec);
        const cfe = cmegel.map(y => $('.allid[data-id="' + JSON.stringify(y).slice(1, -1).replaceAll(",", "_") + '"]'));
        $('.allid.celozo').removeClass('celozo');
        for (let f of cfe) {
            f.removeClass('ccoarser');
            f.addClass('celozo');
        };
    } else
        $('.allid.celozo').removeClass('celozo');
};

function hlallid(elem) {
    const id = elem.dataset.id;
    $('.allid.hl').removeClass('hl');
    $(elem).addClass('hl');
    const vec = JSON.parse("[" + id.replaceAll("_", ",") + "]");

    const cvec = conjugate(vec);
    const fc = $('.allid[data-id="' + JSON.stringify(cvec).slice(1, -1).replaceAll(",", "_") + '"]');
    $('.allid.conj').removeClass('conj');
    fc.addClass('conj');

    callidUPD();
};

function drawGraph(n, elem) {
    $(elem).empty();
    $(elem).append("<div id='cy'></div>");
    var nodes0 = [];
    var edges0 = [];
    const comps = allcomps(n);
    for (let c of comps) {
        nodes0.push({ data: { id: '(' + c + ')', foo: 3, bar: 5, baz: 2 } });
        var targets = kovetoje(c);
        for (let t of targets)
            edges0.push({ data: { id: '(' + c + '_' + t + ')', weight: 1, source: '(' + c + ')', target: '(' + t + ')' } });
    }

    cytoscape({
        container: document.getElementById('cy'),

        style: cytoscape.stylesheet('#cy {position: relative;}')

            .selector('node')
            .css({
                'position': 'relative',
                'width': '60px',
                'height': '60px',
                'content': 'data(id)',
                'stripe-size': '100%',
                'stripe-direction': 'vertical',
                'stripe-1-background-color': '#E8747C',
                'stripe-1-background-size': 'mapData(foo, 0, 10, 0, 100)',
                'stripe-2-background-color': '#74CBE8',
                'stripe-2-background-size': 'mapData(bar, 0, 10, 0, 100)',
                'stripe-3-background-color': '#74E883',
                'stripe-3-background-size': 'mapData(baz, 0, 10, 0, 100)'
            })
            .selector('edge')
            .css({
                'curve-style': 'bezier',
                'width': 4,
                'target-arrow-shape': 'triangle',
                'opacity': 0.5
            })
            .selector(':selected')
            .css({
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black',
                'opacity': 1
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements: {
            nodes: nodes0,

            edges: edges0,
        },

        layout: {
            name: 'circle',
            padding: 10
        },

        ready: function() {
            window.cy = this;
        }
    });
    $("#cy").css({
        position: 'relative'
    })
};

function cPoset() {
    const elem = document.getElementById("callout");
    const n = document.getElementById("cn").value * 1;
    const setrepr = document.getElementById("setrepr").checked;
    const setgraph = document.getElementById("setgraph").checked;
    var txt = "";
    var comps = _.groupBy(allcomps(n), y => y.length);
    if (setgraph)
        drawGraph(n, elem)
    else {
        for (var i = 1; i <= n; i++) {
            var ci = comps[n - i + 1];
            var txti = "<div class='allcdiv'>";
            for (let k of ci) {
                if (!setrepr)
                    txti += "<span class='allid' data-id='" + JSON.stringify(k).slice(1, -1).replaceAll(",", "_") + "' onclick='hlallid(this);'>(" + k + ")</span>,";
                else {
                    var h = setRepr(k, n - 1)
                    txti += "<span class='chalv'>(" + k + ")&rarr;</span><span class='allid' data-id='" + JSON.stringify(k).slice(1, -1).replaceAll(",", "_") + "' onclick='hlallid(this);'>{" + h + "}</span>,";
                }
            };
            txt += txti.slice(0, -1) + "</div>";
        };
        elem.innerHTML = txt;
    }
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
        cN = _.sum(av) + 1 - av.length || 1;
    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figyC");
        idClear('#cout')
        return "Hibás bemenet";
    };
    return av;
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
    for (let f of ff)
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

// set reprezentation

function setRepr(c) {
    c = _.dropRight(c);
    return kum(c);
};

$(document).on("doubleclick,dbltap", "#cy div canvas", function() {
    idClear('#callout');
    const cobj = window.cy;
    if (cobj != undefined) {
        window.cy.destroy();
        $('cy').remove();
    }
})

function drawGraph() {
    const n = document.getElementById("cn").value * 1;
    var elem = document.getElementById('callout');
    $(elem).empty();
    $(elem).append("<div id='cy'></div>");
    var nodes0 = [];
    var edges0 = [];
    const comps = allcomps(n);
    for (let c of comps) {
        nodes0.push({ data: { id: '(' + c + ')' } });
        var targets = kovetoje(c);
        for (let t of targets)
            edges0.push({ data: { id: '(' + c + '_' + t + ')', weight: 1, source: '(' + c + ')', target: '(' + t + ')' } });
    }
    cytoscape({
        container: document.getElementById('cy'),

        style: cytoscape.stylesheet('#cy {position: relative;}')

            .selector('node')
            .css({
                'position': 'relative',
                'width': '60px',
                'height': '60px',
                'content': 'data(id)',
                'stripe-size': '100%',
                'stripe-direction': 'vertical',
                'stripe-1-background-color': '#E8747C',
                'stripe-1-background-size': 'mapData(foo, 0, 10, 0, 100)',
                'stripe-2-background-color': '#74CBE8',
                'stripe-2-background-size': 'mapData(bar, 0, 10, 0, 100)',
                'stripe-3-background-color': '#74E883',
                'stripe-3-background-size': 'mapData(baz, 0, 10, 0, 100)'
            })
            .selector('edge')
            .css({
                'curve-style': 'bezier',
                'width': 4,
                'target-arrow-shape': 'triangle',
                'opacity': 0.5
            })
            .selector(':selected')
            .css({
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black',
                'opacity': 1
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements: {
            nodes: nodes0,

            edges: edges0,
        },

        layout: {
            name: 'circle',
            padding: 10
        },

        ready: function() {
            window.cy = this;
        }
    });
    $("#cy").css({
        position: 'relative'
    })
};

// master integral

function setOutputFontintc(v) {
    var elem = document.getElementById("derivT");
    elem.style.fontSize = v + '%';

    $('#derivT .tsorszam-s').width(20);
    $('#derivT .tsorszam-s').width(($('#derivT .tsorszam-s').parent('div').width() - 10) / cN);
    $('#derivT .tsorszam-s,#derivT .tsorszam-w,#derivT .tsorszam-e').css({ 'font-size': v * 0.01 * 12 + "px" });
};

function cdat(el, s, o) {
    $('#derivT .tgomb.hl:not(.szelso)').html('&#x25CB;');
    $('#derivT .tgomb.hl.szelso').html('&#x25CE;');
    $('#derivT .tgomb.hl').removeClass('hl');
    if ($(el).hasClass('szelso'))
        $(el).html('&#x25C9;');
    else
        $(el).html('&#x25CF;');
    $(el).addClass('hl');

    const c = kiszed_c('intc');
    const r = c.length;
    var e = _.take(c, s - 1);
    if (s <= r)
        e.push(o);
    else
        e.push(1);
    var h = _.takeRight(c, r - s);

    if (s <= r)
        h.unshift(c[s - 1] - o + 1);
    else
        h = ["( )"];
    $('#derivT .tsorszam-w').css("visibility", "hidden");
    $('#derivT .tsorszam-w.corr').html($('#derivT .tsorszam-w.corr').attr('data-n'));
    $('#derivT .tsorszam-w.corr').removeClass('corr');
    var d = 0;
    if (barg && aarg)
        d = 1;
    if (aarg == barg) {
        for (var t = 1 - d; t <= s + Math.floor(s / (r + 1)); t++)
            $('#derivT .tsorszam-w:nth(' + t + ')').css("visibility", "visible");
        if (s == r + 1)
            $('#derivT .tsorszam-w:nth(' + (s) + ')').html(1).addClass("corr");
        else
            $('#derivT .tsorszam-w:nth(' + (s) + ')').html(o).addClass("corr");
    }

    $('#derivT .tsorszam-e').css("visibility", "hidden");
    $('#derivT .tsorszam-e.corr').html($('#derivT .tsorszam-e.corr').attr('data-n'));
    $('#derivT .tsorszam-e.corr').removeClass('corr');
    for (var t = s - 1; t < r + Math.floor(s / (r + 1)); t++)
        $('.tsorszam-e:nth(' + t + ')').css("visibility", "visible");
    $('#derivT .tsorszam-e:nth(' + (s - 1) + ')').html(h[0]).addClass("corr");

    $('#derivT .tsorszam-s').css("visibility", "hidden");
    if (aarg != barg) {
        const ce = conjugate(e);
        if (!aarg)
            $('#derivT .tsorszam-s:nth(0)').css("visibility", "visible").html(0);
        for (var t = 0; t < ce.length; t++)
            $('#derivT .tsorszam-s:nth(' + (t + 1) + ')').css("visibility", "visible").html(ce[t]);
    };
    var bv = [];
    var keplet = "";
    if (aarg) {
        if (barg) {
            bv = e.reverse();
            bv.push(0);
        } else {
            bv = conjugate(e).reverse();
        }
    } else {
        if (barg) {
            bv = conjugate(e).reverse();
            bv.push(0);
        } else {
            bv = e.reverse();
        }
    };
    keplet = "&rightarrow;&nbsp;Li<sub>(" + h + ")</sub>(" + aargtxt + ")&lowast;Li<sub>(" + bv + ")</sub>(" + bargtxt + ")";
    keplet = keplet.replaceAll("<sub>(( ))</sub>", "<sub>( )</sub>");
    //const elem = document.getElementById("cintkeplet");
    $('#derivT .cintkeplet').html('').removeClass('cintkeplet');
    $("#derivT #ebbe-" + s).html(keplet).addClass('cintkeplet');
};

function cdatUPD() {
    const elem = $('#derivT .tgomb.hl');
    if (elem)
        elem.trigger('click');
};

function ribbonGraph() {
    const elem = document.getElementById("derivT");
    const c = kiszed_c('intc');
    const kc = kum(c);
    const r = c.length;
    var k = [0];
    for (var i = 1; i < r; i++) {
        k.push(kc[i - 1] - i);
    };

    var kep = "<table style='border-collapse:collapse;'><thead><tr><th><span class='tsorszam-w' data-n='0' style='color:red;'>0</span></th><th>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-n' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "<th style='width:21.36px'></th></th><td></td></tr></thead>";
    for (var j = 0; j < r; j++) {
        kep += "<tr><th><span class='tsorszam-w' data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div>";
        for (var t = 0; t < k[j]; t++) {
            kep += "<span class='tgomb' style='visibility:hidden;'>&#x25CB;</span> ";
        };
        for (var t = k[j]; t < k[j] + c[j]; t++) {
            kep += "<span class='tgomb shown' onclick='cdat(this," + ((j + 1) + "," + (t - k[j] + 1)) + ")'>&#x25CB;</span> ";
        };
        kep += "</div></td><th><span class='tsorszam-e'  data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div  id='ebbe-" + (j + 1) + "'></div></td>";
    };
    kep += "<tr><th><span class='tsorszam-w' data-n='1' >1</span></th><td><div>";
    var L = _.last(k) + _.last(c);
    for (var t = 0; t < L - 1; t++)
        kep += "<span class='tgomb' style='visibility:hidden;'>&#x25CB;</span> ";
    kep += "<span class='tgomb shown' style='background-color:#d5d5d5;border-radius: 50%;padding: 0 0.31em;margin-left: -0.31em;' onclick='cdat(this," + (r + 1) + "," + L + ")'>&#x25CB;</span></div></td><th><span class='tsorszam-e' data-n='( )'>( )</span></th><td><div  id='ebbe-" + (r + 1) + "'></div></td>";
    kep += "</tr><tr><th><span class='tsorszam-s' data-n='0' style='color:red;'>0</span></th><th><div style='margin-left:-0.3em'>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-s' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "</div></th><th style='width:21.36px'></th></tr></table>";
    elem.innerHTML = kep;
    setOutputFontintc(document.getElementById("setoutputfontintc").value);
};

function ribbonAnimate() {
    const N = $('#derivT .tgomb.shown').length;
    const t = document.getElementById("t").value * 1;
    if (N > 0) {
        var i = 0;
        ra = setInterval(() => {
            $('#derivT .tgomb.shown:nth(' + i + ')').click();
            i++;
            if (i == N) {
                clearInterval(ra);
            }
        }, t);
    } else
        return;
}

function setgenKeplet0c() {
    var a = document.querySelector("#intc").value;
    var b = "0";
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
    return txt;
};

function setgenKepletc() {
    const elem = document.querySelector("#k1set");
    const txt = setgenKeplet0c();
    elem.style.visibility = "hidden";
    elem.innerText = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    setTimeout(() => {
        elem.style.visibility = "visible";
    }, 200);
};

function setaArgc(elem) {
    aarg = elem.checked;
    if (aarg)
        aargtxt = "1-x";
    else
        aargtxt = "x";
    setgenKepletc();
};

function setbArgc(elem) {
    barg = elem.checked;
    if (barg)
        bargtxt = "1-x";
    else
        bargtxt = "x";
    setgenKepletc();
};

/////

var Lihlvec = [];

function cdat_xn(el, s, o) {
    $('#derivT .tgomb.hl').html('&#x25CB;');
    $('#derivT .tgomb.hl').removeClass('hl');
    $(el).html('&#x25CF;');
    $(el).addClass('hl');

    const c = kiszed_c('xnls');
    const n = document.getElementById("xnln").value * 1;
    const r = c.length;
    const mode = document.getElementById("setmodexnl").checked;
    var e = _.take(c, s - 1);
    if (s <= r)
        e.push(o);
    else
        e.push(1);
    var h = _.takeRight(c, r - s);

    if (s <= r)
        h.unshift(c[s - 1] - o + 1);
    else
        h = ["( )"];
    $('.tsorszam-w').css("visibility", "hidden");
    $('.tsorszam-w.veg').html($('.tsorszam-w.veg').attr('data-n'));
    $('.tsorszam-w.veg').removeClass('veg');
    $('.tsorszam-w.corr').html($('.tsorszam-w.corr').attr('data-n'));
    $('.tsorszam-w.corr').removeClass('corr');

    for (var t = 1; t <= s + Math.floor(s / (r + 1)); t++)
        $('.tsorszam-w:nth(' + t + ')').css("visibility", "visible");
    if (s == r + 1)
        $('.tsorszam-w:nth(' + s + ')').html(1).addClass("corr");
    else
        $('.tsorszam-w:nth(' + s + ')').html(o).addClass("corr");

    if (s > 1)
        $('.tsorszam-w:nth(' + 1 + ')').css("visibility", "hidden");
    $('.tsorszam-e').css("visibility", "hidden");
    $('.tsorszam-e.corr').html($('.tsorszam-e.corr').attr('data-n'));
    $('.tsorszam-e.corr').removeClass('corr');
    for (var t = s - 1; t < r + Math.floor(s / (r + 1)); t++)
        $('.tsorszam-e:nth(' + t + ')').css("visibility", "visible");

    $('.tsorszam-e:nth(' + (s - 1) + ')').html(h[0]).addClass("corr");
    if (s < r + 1 && s > 1)
        $('.tsorszam-w:nth(' + (s + 1) + ')').html("( )").addClass("veg").css("visibility", "visible");

    $('.tsorszam-s').css("visibility", "hidden");
    if (s == r + 1)
        $('.tsorszam-s[data-n=0]').html("( )").addClass("veg").css("visibility", "visible");
    $('.tsorszam-w.hl').removeClass('hl');
    $('#derivT table tr th.hl').removeClass('hl');
    var bv = [];
    var keplet = "";

    bv = _.dropRight(e.reverse());

    keplet = "&rightarrow;&nbsp;Li<sub>(" + h + ")</sub>(x)&lowast;&sum;&zeta;*<sub class='xlns1'>" + (n + 1) + "</sub>&rightarrow;(" + [...bv].reverse() + ")&leftarrow;Li";

    keplet = keplet.replaceAll("<sub>(( ))</sub>", "<sub>( )</sub>");
    $('.cintkeplet').html('').removeClass('cintkeplet');
    $("#ebbe-" + s).html(keplet).addClass('cintkeplet');

    Lihlvec = [...bv];
    var htxt = [...h];
    if (_.last(h) == "( )")
        htxt = "";
    if (mode) {
        $('.pznext').removeClass('pznext');
        $(".xnLii,.xnLe,.xnLix").removeClass('hl');
        $(".xnLi .xlns:contains('(" + htxt + ")')").parent('.xnLi').next('.pzoutblock').addClass('pznext');
    }
    if (kellclick)
        $(".pzjelento.monom-active").trigger("click");
    $(".xnLi").removeClass('hl');
    $('.zLi.shown').removeClass('shown');
    $(".xnLi .xlns:contains('(" + htxt + ")')").parent('.xnLi').addClass('hl');
};

function Lihl(j) {
    const n = Lihlvec.length + 2;
    const mode = document.getElementById("setmodexnl").checked;
    // const N = document.getElementById("xnln").value * 1 + 1;
    $('.tsorszam-w.hl,.tsorszam-s.hl').removeClass('hl');
    $('.zLi.shown').removeClass('shown');
    $('.tsorszam-w:nth(' + j + ')').addClass('hl');
    $('#derivT table tr th.hl').removeClass('hl');
    $('#derivT table tr .tsorszam-w:nth(' + j + ')').parent('th').addClass('hl');
    if (j > 1) {
        $('.tsorszam-w:nth(' + j + ')').parent('th').next('.zLi').html('&uparrow;Li').addClass('shown'); //uj
        $('.tsorszam-w:nth(' + (j - 1) + ')').parent('th').next('.zLi').html('&downarrow;&zeta;*').addClass('shown'); //uj
    } else {
        $('.tsorszam-w:nth(' + j + ')').parent('th').next('.zLi').html('&downarrow;x<sup>n</sup>').addClass('shown');
    }

    const helem = $(".xnLi.hl");
    var htxt = _.take(Lihlvec, n - j);
    var keplet = "";
    if (mode) {
        const jelem = helem.next('.pzoutblock');
        $('.pznext').removeClass('pznext');
        jelem.addClass('pznext')
        $(".xnLii,.xnLe,.xnLix").removeClass('hl');
        if (j == 1) {
            $('.pznext span.xnLix').addClass('hl');
            keplet = "&rightarrow;&nbsp;" + $('.xnLi.hl').html() + "&lowast;" + $('.xnLix.hl').html();
            $('.cintkeplet').html(keplet);
        } else {
            if (htxt.length == 0) {
                htxt = [...Lihlvec].reverse();
                $(".pznext .xnLe .xlns:contains('(" + htxt + ")')").parent('.xnLe').addClass('hl');
                keplet = "&rightarrow;&nbsp;" + $('.xnLi.hl').html() + "&lowast;" + $('.xnLe.hl').html();
                $('.cintkeplet').html(keplet);
            } else {
                $(".pznext .xnLii .xlns:contains('(" + htxt + ")')").parent('.xnLii').addClass('hl');
                keplet = "&rightarrow;&nbsp;" + $('.xnLi.hl').html() + "&lowast;" + $('.xnLii.hl').html();
                $('.cintkeplet').html(keplet);
            }
        };
    } else {
        const jelem = helem.next('.pzjelento');

        kellclick2 = true;
        if (!jelem.hasClass('monom-active'))
            jelem.trigger('click');

        $(".xnLii,.xnLe,.xnLix").removeClass('hl');
        if (j == 1)
            setTimeout(() => {
                $('#pzoutr span.xnLix').addClass('hl');
                keplet = "&rightarrow;&nbsp;" + $('.xnLi.hl').html() + "&lowast;" + $('.xnLix.hl').html();
                $('.cintkeplet').html(keplet);
            }, 100);
        else {
            if (htxt.length == 0) {
                htxt = [...Lihlvec].reverse();
                setTimeout(() => {
                    $(".xnLe .xlns:contains('(" + htxt + ")')").parent('.xnLe').addClass('hl');
                    keplet = "&rightarrow;&nbsp;" + $('.xnLi.hl').html() + "&lowast;" + $('.xnLe.hl').html();
                    $('.cintkeplet').html(keplet);
                }, 100);
            } else
                setTimeout(() => {
                    $(".xnLii .xlns:contains('(" + htxt + ")')").parent('.xnLii').addClass('hl');
                    keplet = "&rightarrow;&nbsp;" + $('.xnLi.hl').html() + "&lowast;" + $('.xnLii.hl').html();
                    $('.cintkeplet').html(keplet);
                }, 100);
        };
        kellclick2 = false;
        setTimeout(() => { kellclick2 = true; }, 200);
    }
};

function Lihlveg(j) {
    $('.tsorszam-s.hl,.tsorszam-w.hl').removeClass('hl');
    $('.tsorszam-s[data-n=0]').addClass('hl');
    $('#derivT table tr th.hl').removeClass('hl');
    $('.zLi.shown').removeClass('shown');
    $('#derivT table tr .tsorszam-s[data-n=0]').parent('th').addClass('hl');
    var keplet = "";
    if (j > 1) {
        $('#derivT table tr .tsorszam-s[data-n=0]').parent('th').next('.zLi').html('&uparrow;Li').addClass('shown'); //uj
        $('.tsorszam-w:nth(' + (j - 1) + ')').parent('th').next('.zLi').html('&downarrow;&zeta;*').addClass('shown'); //uj
    } else {
        $('#derivT table tr .tsorszam-s[data-n=0]').parent('th').next('.zLi').html('&downarrow;x<sup>n</sup>').addClass('shown');
    }
    const helem = $(".xnLi.hl");
    const jelem = helem.next('.pzjelento');
    kellclick2 = true;
    if (!jelem.hasClass('monom-active'))
        jelem.trigger('click');
    $(".xnLii,.xnLe,.xnLix").removeClass('hl');
    var htxt = [...Lihlvec].reverse();

    setTimeout(() => {
        $(".xnLe .xlns:contains('(" + htxt + ")')").parent('.xnLe').addClass('hl');
        keplet = "&rightarrow;&nbsp;" + $('.xnLi.hl').html() + "&lowast;" + $('.xnLe.hl').html();
        $('.cintkeplet').html(keplet);
    }, 100);

    kellclick2 = false;
    setTimeout(() => { kellclick2 = true; }, 200);
};

function ribbonGraph_xn() {
    const elem = document.getElementById("derivT");
    const c = kiszed_c('xnls');
    const kc = kum(c);
    const r = c.length;
    var k = [0];
    for (var i = 1; i < r; i++) {
        k.push(kc[i - 1] - i);
    };

    var kep = "<table style='border-collapse:collapse;'><thead><tr><th><span class='tsorszam-w' data-n='0' style='color:red;'>0</span></th><td class='zLi'></td><th>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-n' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "<th style='width:21.36px'></th></th><td></td></tr></thead>";
    for (var j = 0; j < r; j++) {
        kep += "<tr><th><span class='tsorszam-w' style='cursor:pointer;' onclick='Lihl(" + (j + 1) + ");' data-n='" + c[j] + "'>" + c[j] + "</span></th><td class='zLi'></td><td><div>";
        for (var t = 0; t < k[j]; t++) {
            kep += "<span class='tgomb' style='visibility:hidden;'>&#x25CB;</span> ";
        };
        for (var t = k[j]; t < k[j] + c[j]; t++) {
            kep += "<span class='tgomb shown' onclick='cdat_xn(this," + ((j + 1) + "," + (t - k[j] + 1)) + ")'>&#x25CB;</span> ";
        };
        kep += "</div></td><th><span class='tsorszam-e'  data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div  id='ebbe-" + (j + 1) + "'></div></td>";
    };
    kep += "<tr><th><span class='tsorszam-w' data-n='1' onclick='Lihl(" + (r + 1) + ");' style='cursor:pointer;'>1</span></th><td class='zLi'></td><td><div>";
    var L = _.last(k) + _.last(c);
    for (var t = 0; t < L - 1; t++)
        kep += "<span class='tgomb' style='visibility:hidden;'>&#x25CB;</span> ";
    kep += "<span class='tgomb shown' style='background-color:#d5d5d5;border-radius: 50%;padding: 0 0.31em;margin-left: -0.31em;' onclick='cdat_xn(this," + (r + 1) + "," + L + ")'>&#x25CB;</span></div></td><th><span class='tsorszam-e' data-n='( )'>( )</span></th><td><div  id='ebbe-" + (r + 1) + "'></div></td>";
    kep += "</tr><tr><th><span class='tsorszam-s' data-n='0' style='color:red;cursor:pointer;'onclick='Lihlveg(" + (r + 2) + ");'>0</span></th><td class='zLi'></td><th><div style='margin-left:-0.3em'>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-s' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "</div></th><th style='width:21.36px'></th></tr></table>";
    elem.innerHTML = kep;
    setOutputFontintc(document.getElementById("setoutputfontxnl").value);
    $('#derivT table tr:nth(1) td:nth(0),#derivT table tr:nth(1) th,#derivT table tr:nth(1) td:nth(1)').css('border-bottom', '1px dashed #70808e');
};

function xnLiiback(j, el) {
    const mode = document.getElementById("setmodexnl").checked;
    const gomb = $('.tsorszam-w[onclick="Lihl(' + j + ');"]');
    if (mode && !$(el).parent().prev().hasClass('hl'))
        return;
    if (gomb.length != 0)
        gomb.trigger('click');
    else {
        const gomb2 = $('.tsorszam-s[onclick="Lihlveg(' + j + ');"]');
        gomb2.trigger('click');
    }
};

// ZIG-ZAG INTEGRATE

function setOutputFontintc2(v) {
    var elem = document.getElementById("derivT2");
    elem.style.fontSize = v + '%';

    $('#derivT2 .tsorszam-n').width(20);
    $('#derivT2 .tsorszam-n').width(($('#derivT2 .tsorszam-n').parent('div').width() * 1 + 10) / cN2);
    $('#derivT2 .tsorszam-n,#derivT2 .tsorszam-w,#derivT2 .tsorszam-e').css({ 'font-size': v * 0.01 * 12 + "px" });
};

function homalyosit() {
    $('#derivT2,#genout').css({ 'filter': 'blur(3px) contrast(0.5)', 'pointer-events': 'none' });
    $('#szamitofelhivas').addClass('on');
};

function dehomalyosit() {
    $('#derivT2,#genout').css({ 'filter': 'none', 'pointer-events': 'all' });
    $('#szamitofelhivas').removeClass('on');
};

function set_abmode() {
    amode = "Li";
    bmode = "Li";
};

function setnArg2(elem) {
    narg = elem.checked;
    if (narg)
        nargtxt = "1-x";
    else
        nargtxt = "x";
    setFazis();
    setgenKeplet2();
    homalyosit();
};

function setaArg2(elem) {
    aarg = elem.checked;
    if (aarg)
        aargtxt = "1-x";
    else
        aargtxt = "x";
    setFazis();
    setgenKeplet2();
    homalyosit();
};

function setbArg2(elem) {
    barg = elem.checked;
    if (barg)
        bargtxt = "1-x";
    else
        bargtxt = "x";
    setFazis();
    setgenKeplet2();
    homalyosit();
};

function setegyezes() {
    var e = 1;
    if (aarg == barg) {
        if (narg == aarg)
            e = 2
        else
            e = 0
    };
    egyezes = e;
};

function setgenKeplet20() {
    setegyezes();
    set_abmode();
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
    txt = "\\text{Egyezés: }" + egyezes + ";\\;\\hspace{1cm}\\int \\dfrac{" + txt1 + szorzat + txt2 + "}{" + tort + "}\\,{\\text{d} x}"
    txt += "\\hspace{2cm}\\begin{bmatrix}" + fltx[fazis.init.name] + " &" + fltx[fazis.std.name] + "\\\\" + fltx[fazis.atv.name] + " &" + fltx[fazis.veg.name] + "\\end{bmatrix}";
    return txt;
};

function setnyiltbl() {
    const tblelem = document.querySelector("#nyiltbl");
    var txt = '';
    if (egyezes == 0)
        txt = '<span style="transform: rotate(90deg) translateX(-0.15em) translateY(-0.45em);display: inline-block;margin-right: 2px;">⧬</span><span style="transform: rotate(-90deg) translateX(-0.65em) translateY(-0.25em);display: inline-block;">⧭</span>';
    else if (egyezes == 1)
        txt = '<span style="transform: rotate(180deg) translateY(-0.25em);display: inline-block;margin-right: 2px;">⧭</span><span style="transform: rotate(-90deg) translateX(-0.3em) translateY(0.05em);display: inline-block;">⧬</span>';
    else
        txt = '<span style="transform: rotate(90deg) translateX(0.27em);display: inline-block;margin-right: 2px;">⧬</span><span style="transform: rotate(-90deg) translateX(-0.27em) translateY(0.1em);display: inline-block;">⧭</span>';
    tblelem.innerHTML = txt;
};

function setgenKeplet2() {
    const elem = document.querySelector("#k2set");
    const txt = setgenKeplet20();
    elem.style.visibility = "hidden";
    elem.innerText = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    setTimeout(() => { setnyiltbl(); }, 100);
    setTimeout(() => {
        elem.style.visibility = "visible";
    }, 200);
};

function near_concat(a, b) {
    return [..._.dropRight(a), _.last(a) + _.first(b), ..._.drop(b)];
}

function kiszed_cd(id) {

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
        if (indx > -1) {
            av = oo2strInf(av);
            setfigy("Az <b>a</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figyC");
            idClear('#cout')
            return "Hibás bemenet";
        }
        cN = _.sum(av) + 1 - av.length || 1;
    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figyC");
        idClear('#cout')
        return "Hibás bemenet";
    };
    return av;
};

function abillesztes(a, b) {
    a.push(1);
    b.push(1);
    if (b.length == 1 && b[0] == 0)
        b = [1, 1]
        //b = b.filter(y => y != 0);
    setegyezes();
    const rb = [...b].reverse();
    var sorszam = _.sum(b);
    // var ill = "fole";
    var ori = "le";
    var c = near_concat(rb, a);
    if (egyezes == 1) {
        //ill = "melle";
        if (aarg == narg) {
            c = near_concat(conjugate(rb), a);
        } else {
            c = near_concat(conjugate([...a].reverse()), b);
            sorszam = _.sum(a);
            ori = "fel";
        }
    } else if (egyezes == 0) {
        c = _.concat(rb, a);
    }
    return [c, sorszam, ori];
}

function pozValtas2() {
    var a = document.getElementById("avg");
    var b = document.getElementById("bvg");
    var al = document.getElementById("avgl");
    var bl = document.getElementById("bvgl");
    var eaarg = document.getElementById("setaarg2").checked;
    var ebarg = document.getElementById("setbarg2").checked;
    if (eaarg != ebarg) {
        document.getElementById("setaarg2").click();
        document.getElementById("setbarg2").click();
        dehomalyosit();
    }
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
    setTimeout(() => {
        genoutput();
        setgenKeplet2();
    }, 30);
    haspv = !haspv;
};

function takarbe() {
    $('#burkolo,#jelento').addClass('on');
    $('#burkolo #k2set,#nyiltbl,#burkolo *').css({ 'background-color': '#BDB9B9' });
};

function takarki() {
    $('#burkolo,#jelento').removeClass('on');
    $('#burkolo #k2set,#nyiltbl,#burkolo *').css({ 'background-color': '' });
};

function burkoloki() {
    $('#derivT2 .tgomb.shown:not(.ori):first').trigger('click');
};

function cdat2(el, s, o) {
    $('#derivT2 .tgomb.hl:not(.szelso)').html('&#x25CB;');
    $('#derivT2 .tgomb.hl.szelso').html('&#x25CE;');
    $('#derivT2 .tgomb.hl').removeClass('hl');
    if ($(el).hasClass('szelso'))
        $(el).html('&#x25C9;');
    else
        $(el).html('&#x25CF;');
    $(el).addClass('hl');
    var a = kiszed_cd('avg');
    var b = kiszed_cd('bvg');

    if ($(el).hasClass('ori')) {
        takarbe();
        if (!haspv) {
            pozValtas2();
            setTimeout(() => {
                $(el).trigger('click');
                $('#genout').css({ 'opacity': '0.65', 'background-color': '#fff7b8' });
            }, 60)
        }
        if (aarg == barg && haspv) {
            a = kiszed_cd('bvg');
            b = kiszed_cd('avg');
        }
    } else {
        takarki();
        if (haspv) {
            pozValtas2();
            setTimeout(() => {
                $(el).trigger('click');
                $('#genout').css({ 'opacity': '1', 'background-color': '#e3e3e3' });
            }, 60)
        }
    };

    const cill = abillesztes(a, b);
    const c = cill[0];

    const r = c.length;
    var e = _.take(c, s - 1);
    if (s <= r)
        e.push(o);
    else
        e.push(1);
    var h = _.takeRight(c, r - s);

    if (s <= r)
        h.unshift(c[s - 1] - o + 1);
    else
        h = ["( )"];
    $('.tsorszam-w').css("visibility", "hidden");
    $('.tsorszam-w.corr').html($('.tsorszam-w.corr').attr('data-n'));
    $('.tsorszam-w.corr').removeClass('corr');

    if (aarg == barg) {
        for (var t = 2; t <= s + Math.floor(s / (r + 1)); t++)
            $('.tsorszam-w:nth(' + t + ')').css("visibility", "visible");
        if (s == r + 1)
            $('.tsorszam-w:nth(' + s + ')').html(1).addClass("corr");
        else
            $('.tsorszam-w:nth(' + s + ')').html(o).addClass("corr");
        if (s == 1 && o == 1)
            $('.tsorszam-w:nth(1)').html("( )").css("visibility", "visible");
    }


    $('#derivT2 .tsorszam-e').css("visibility", "hidden");
    $('#derivT2 .tsorszam-e.corr').html($('.tsorszam-e.corr').attr('data-n'));
    $('#derivT2 .tsorszam-e.corr').removeClass('corr');
    for (var t = s - 1; t < r + Math.floor(s / (r + 1)) - 1; t++)
        $('#derivT2 .tsorszam-e:nth(' + t + ')').css("visibility", "visible");
    $('#derivT2 .tsorszam-e:nth(' + (s - 1) + ')').html(h[0]).addClass("corr");
    if (s == r)
        $('#derivT2 .tsorszam-e:nth(-1)').html("( )").css("visibility", "visible");

    $('#derivT2 .tsorszam-n').css("visibility", "hidden");
    if (aarg != barg) {
        const ce = conjugate(e);
        for (var t = 1; t < ce.length; t++)
            $('#derivT2 .tsorszam-n:nth(' + t + ')').css("visibility", "visible").html(ce[t]);
        if (s == 1 && o == 1)
            $('#derivT2 .tsorszam-n:nth(0)').html("( )").css("visibility", "visible");
    };

    var bv = [];
    var keplet = "";
    if (aarg) {
        if (barg) {
            bv = e.reverse();
        } else {
            bv = conjugate(e).reverse();
        }
    } else {
        if (barg) {
            bv = conjugate(e).reverse();
        } else {
            bv = e.reverse();
        }
    };
    var argtxt1 = aargtxt;
    var argtxt2 = bargtxt;
    if (egyezes == 1 && narg != aarg) {
        argtxt1 = bargtxt;
        argtxt2 = aargtxt;
    }

    keplet = "&rightarrow;&nbsp;Li<sub>(" + _.dropRight(h) + ")</sub>(" + argtxt1 + ")&lowast;Li<sub>(" + _.dropRight(bv) + ")</sub>(" + argtxt2 + ")";
    keplet = keplet.replaceAll("<sub>(( ))</sub>", "<sub>( )</sub>");
    $('.cintkeplet').html('').removeClass('cintkeplet');
    $("#ebbe-" + s).html(keplet).addClass('cintkeplet');


    var ezt = [];
    if (!haspv) {
        if (egyezes == 1 && narg != aarg)
            var ezt = _.dropRight(bv).toString();
        else
            var ezt = _.dropRight(h).toString();
    } else {
        if (egyezes == 1 && narg != barg)
            var ezt = _.dropRight(h).toString();
        else
            var ezt = _.dropRight(bv).toString();
    }

    var celok = $(".genout-sor .asor");
    $('.zztbl').removeClass('zztbl');
    for (let y of celok) {
        if (y.innerText.replace(/[() +−]/g, "") == ezt) {
            $(y).parent().parent().parent().addClass("zztbl")
        }
    }
};

function ribbonGraph2() {
    const elem = document.getElementById("derivT2");
    const a = kiszed_cd('avg');
    const b = kiszed_cd('bvg');
    var kep = "";
    if (b.length == 1 && b[0] == 0 && (egyezes == 0 || (egyezes == 1 && aarg == narg))) {
        kep = "Ez nagyon más integrálhoz vezet.";
        elem.innerHTML = kep;
        document.getElementById("genout").innerHTML = kep;
        setOutputFontintc2(document.getElementById("outfont-slider").value * 1);
        dehomalyosit();
    } else {
        const cill = abillesztes(a, b);
        const c = cill[0];
        const kc = kum(c);
        const r = c.length;
        var k = [0];
        for (var i = 1; i < r; i++) {
            k.push(kc[i - 1] - i);
        };
        cN2 = _.sum(c) + 1 - r || 1;
        kep = "<table style='border-collapse:collapse;'><thead><tr><th><span class='tsorszam-w' data-n='0' style='color:red;'>0</span></th><th><div>";
        for (var i = 1; i < _.last(kc) - r + 2; i++) {
            kep += "<span class='tsorszam-n' data-n='" + i + "'>" + i + "</span>";
        };
        kep += "<th style='width:21.36px'></th></div></th><td></td></tr></thead>";
        for (var j = 0; j < r; j++) {
            kep += "<tr><th><span class='tsorszam-w' data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div>";
            for (var t = 0; t < k[j]; t++) {
                kep += "<span class='tgomb' style='visibility:hidden;'>&#x25CB;</span> ";
            };
            for (var t = k[j]; t < k[j] + c[j]; t++) {
                kep += "<span class='tgomb shown' onclick='cdat2(this," + ((j + 1) + "," + (t - k[j] + 1)) + ")'>&#x25CB;</span> ";
            };
            kep += "</div></td><th><span class='tsorszam-e'  data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div  id='ebbe-" + (j + 1) + "'></div></td>";
        };

        kep += "</th></tr></table>";
        elem.innerHTML = kep;
        const hatar = cill[1];
        $('#derivT2 .tgomb.shown:nth(0),#derivT2 .tgomb.shown:nth(-1)').addClass('szelso').html('&#x25CE;');;
        $('#derivT2 .tgomb.shown:nth(' + (hatar - 1) + ')').addClass('illesztoveg');
        $('#derivT2 .tgomb.shown:nth(' + hatar + ')').addClass('illesztokezd');

        if (cill[2] == "le") {
            for (var u = 0; u < hatar; u++)
                $('#derivT2 .tgomb.shown:nth(' + u + ')').addClass('ori');
        } else {
            for (var v = hatar; v < _.sum(c) + 1; v++) {
                $('#derivT2 .tgomb.shown:nth(' + v + ')').addClass('ori');
            }
        }
        setOutputFontintc2(document.getElementById("outfont-slider").value * 1);
        dehomalyosit();
    }
};

// DUALITY OF MZVs

function setOutputFont5(v) {
    var elem = document.getElementById("dual_html");
    elem.style.fontSize = v + 'px';
    $('div.sagecell_sessionOutput,div.sagecell_sessionOutput pre').css('font-size', v + 'px');
};

function out5Clear() {
    const elem = document.querySelector("#ideout5 .sagecell_output_elements div");
    if (elem)
        elem.innerHTML = "";
};

function setn100(elem, id) {
    var n = elem.value;
    var Nelem = document.getElementById(id + "kijelzo");
    Nelem.innerHTML = n * 100;
};

function dualofv(v) {
    v[0] = v[0] - 1;
    v.push(1);
    if (v[0] == 0)
        v = _.drop(v, 1);
    return _.reverse(conjugate(v));
};

function gokartya(n) {
    const e = document.getElementById("k" + n)
    e.scrollIntoView({
        behavior: "smooth",
        block: 'center'
    });
};

function extractHTML(node) {

    // return a blank string if not a valid node
    if (!node) return ''

    // if it is a text node just return the trimmed textContent
    if (node.nodeType === 3) return node.textContent.trim()

    //beyond here, only deal with element nodes
    if (node.nodeType !== 1) return ''
    if (node.classList.contains('textarea')) return ''

    let html = ''
        // clone the node for its outer html sans inner html
    let outer = node.cloneNode()

    // if the node has a shadowroot, jump into it
    node = node.shadowRoot || node

    if (node.children.length) {

        // we checked for children but now iterate over childNodes
        // which includes #text nodes (and even other things)
        for (let n of node.childNodes) {

            // if the node is a slot
            if (n.assignedNodes) {

                // an assigned slot
                if (n.assignedNodes()[0]) {
                    // Can there be more than 1 assigned node??
                    html += extractHTML(n.assignedNodes()[0])

                    // an unassigned slot
                } else { html += n.innerHTML }

                // node is not a slot, recurse
            } else { html += extractHTML(n) }
        }

        // node has no children
    } else { html = node.innerHTML }

    // insert all the (children's) innerHTML 
    // into the (cloned) parent element
    // and return the whole package
    outer.innerHTML = html
    return outer.outerHTML
};

function tglKepek() {
    var elem = document.getElementById("kepek");
    var open = elem.style.display;
    if (open == "none") {
        elem.style.display = "block";
    } else
        elem.style.display = "none";
};

function html_dual() {
    const elem = document.getElementById("dual_html");
    const bizonyitassal = document.getElementById("setbiz").checked;
    const vanzar = document.getElementById("jelento").classList.contains("on");
    const a = kiszed_cd("ad");
    var txt = "HIBA";
    const b = dualofv([...a]);
    var frd = "";
    var rag = "";
    if (a[0] > 1)
        rag = ',' + (a[0] - 1);
    if (a.length > 1)
        frd = ',' + [...a.slice(1)].reverse().toString();
    if (a != undefined && b != undefined && !a[0] < 2) {
        txt = '<b>a</b><sup>&dagger;</sup>&nbsp;=&nbsp;(' + a.toString() + ')<sup>&dagger;</sup>&nbsp;=&nbsp;(1' + frd + rag + ')<sup>*</sup>&nbsp;=&nbsp;(' + b.toString() + ')&nbsp;&Rightarrow;&nbsp;&zeta;(' + a.toString() + ')&nbsp;=&nbsp;&nbsp;&zeta;(' + b.toString() + ')';
    };
    if (bizonyitassal) {
        const ak = [a[0] - 1, ...a.slice(1)];
        var kep1 = '';
        var kep2 = '';
        var kep3 = '';
        if (vanzar)
            burkoloki();
        document.getElementById("avg").value = ak;
        document.getElementById("bvg").value = 0;
        if (document.getElementById("setnarg2").checked)
            $("#setnarg2").trigger("click");
        if (!document.getElementById("setaarg2").checked)
            $("#setaarg2").trigger("click");
        if (document.getElementById("setbarg2").checked)
            $("#setbarg2").trigger("click");
        setTimeout(() => {
            $("#ribbonbtn").trigger("click");

        }, 200);
        setTimeout(() => {
            $('#derivT2 .tgomb.shown.szelso.ori').trigger('click');
        }, 300);
        setTimeout(() => {
            kep1 = extractHTML(document.getElementById('derivT2'));
            kep1 = kep1.replaceAll('id="derivT2"', '');
            kep1 += extractHTML(document.getElementById('genout'));
            kep1 = kep1.replace(/(\<p id="genout".*)(\<div class=\"meret\"\>)(.*)(\<\/p\>)/g, "<hr style='color:#aaa;margin-top: 15px;'/>$2$3");
        }, 900);
        setTimeout(() => {
            $('#derivT2 .tgomb.shown.szelso:not(.ori)').trigger('click');
        }, 1000);
        setTimeout(() => {
            $('table.genout-sor:nth(0)').before('<table class="genout-sor" style="background-color:transparent;border:none;"><tbody><tr><td class="bsor" style="background-color:transparent;color:#ff0060;"><sub style="margin-right:2px;font-size:120%;vertical-align: -0.3em;">-</sub><b>a</b>&nbsp;&rightarrow;</td></tr><tr><td class="bsor">&nbsp</td></tr></tbody></table>');
            $('table.genout-sor.zztbl').after('<table class="genout-sor" style="background-color:transparent;border:none;"><tbody><tr><td class="bsor" style="background-color:transparent;">&nbsp</td></tr><tr><td class="bsor" style="color: #ff0060;">&leftarrow;&nbsp;<b>a</b><sup>&dagger;</sup></td></tr></tbody></table>');
            kep2 = extractHTML(document.getElementById('derivT2'));
            kep2 = kep2.replaceAll('id="derivT2"', '');
            kep2 += extractHTML(document.getElementById('genout'));
            kep2 = kep2.replace(/(\<p id="genout".*)(\<div class=\"meret\"\>)(.*)(\<\/p\>)/g, "<hr style='color:#aaa;margin-top: 15px;'/>$2$3");
        }, 1600);

        setTimeout(() => {
            txt = genltxfgv();
            const elem = document.querySelector("#gen_math");
            elem.innerText = "\\[" + txt + "\\]";
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
        }, 1700);

        setTimeout(() => {
            kep3 = extractHTML(document.getElementById('gen_math'));
        }, 2500);

        setTimeout(() => {
            document.getElementById('gen_math').style.display = "none";
        }, 2800);

        setTimeout(() => {
            document.getElementById('kephook1').innerHTML = "(1) " + kep1
            document.getElementById('kephook2').innerHTML = "(2) " + kep2
            document.getElementById('kephook3').innerHTML = kep3;
        }, 2600);

        txt += "<br/><br/><b style='margin-right:10px;'>Bizonyítás:</b><button  class='showpre1' onclick='tglKepek();'>Képekben</button><div id='kepek' style='display:none;'><span id='kephook1' class='kephook'></span><span id='kephook2' class='kephook'></span><span id='kephook3' class='kephook'></span></div><br/>";
        txt += "<div style='color:#df007e;'>A dualitási tétel egyszerűen következik <span class='block' style='margin:10px;'><span class='sqrt-prefix sdefint' style='transform: scale(1.38424, 3.1);'>∫</span><span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>Li<sub><sub style='margin-right:2px;font-size:120%;vertical-align: -0.25em;'>-</sub><b>a</b></sub><span class='block'><span class='block'>(1−x)</span></span> Li<sub>(0)</sub>(x)</span><span class='denominator'><span class='block'><span class='block'>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span> integrál pozíciócserével nyert két eredményének összevetéséből.</div>"
        txt += "Az <span class='block' style='margin:10px;'><span class='sqrt-prefix sdefint' style='transform: scale(1.38424, 3.1);'>∫</span><span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>Li<sub><sub style='margin-right:2px;font-size:120%;vertical-align: -0.3em;'>-</sub><b>a</b></sub><span class='block'><span class='block'>(1−x)</span></span></span><span class='denominator'><span class='block'><span class='block'>1<span class='binary-operator'>−</span>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span>  integrált számítjuk ki két féle módon. / <sub style='margin-right:2px;font-size:120%;vertical-align: -0.3em;'>-</sub><b>a</b> := (a<sub>1</sub>−1,a<sub>2</sub>,...,a<sub>n</sub>) = (" + ak.toString() + ") /<br/> (1) <span class='block' style='margin:10px;'><span class='sqrt-prefix sdefint' style='transform: scale(1.38424, 3.1);'>∫</span><span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>Li<sub><sub style='margin-right:2px;font-size:120%;vertical-align: -0.25em;'>-</sub><b>a</b></sub><span class='block'><span class='block'>(1−x)</span></span></span><span class='denominator'><span class='block'><span class='block'>1<span class='binary-operator'>−</span>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span> = −Li<sub><b>a</b></sub>(1−x) <br/>";
        txt += " (2) <span class='block' style='margin:10px;'><span class='sqrt-prefix sdefint' style='transform: scale(1.38424, 3.1);'>∫</span><span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>Li<sub><sub style='margin-right:2px;font-size:120%;vertical-align: -0.25em;'>-</sub><b>a</b></sub><span class='block'><span class='block'>(1−x)</span></span></span><span class='denominator'><span class='block'><span class='block'>1<span class='binary-operator'>−</span>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span> = <span class='block' style='margin:10px;'><span class='sqrt-prefix sdefint' style='transform: scale(1.38424, 3.1);'>∫</span><span class='block' style='position:relative;'><span class='fraction'><span class='numerator'>Li<sub><sub style='margin-right:2px;font-size:120%;vertical-align: -0.25em;'>-</sub><b>a</b></sub><span class='block'><span class='block'>(1−x)</span></span> Li<sub>(0)</sub>(x)</span><span class='denominator'><span class='block'><span class='block'>x</span></span></span> <span style='display:inline-block;width:0'>&nbsp;</span></span></span><span class='block' style='position:relative;'>dx</span></span> =<span class='block' style='transform: scale(1.5);margin:0 7px;'>&sum;</span><sub style='vertical-align:-0.6em;'><b>u</b>,<b>v</b>&geq;(1)</sub>Li<sub><b>u</b></sub>(1-x) Li<sub><b>v</b></sub>(x) + Li<sub><b>a</b><sup>&dagger;</sup></sub>(x)<br/> Az integrál paramétereit be is állítottuk az <span class='kartyabtn' onclick='gokartya(" + 4 + ");'>4. kártyán</span> és már ki is számítottuk. Ha ezt megtekinti (az előző kártyára teker, vagy a sárgás gombra kattint, de a [Képekben] gombra kattintva is láthatja a kimeneteket), akkor jól láthatja, hogy a deriváló sorban az <sub style='margin-right:2px;font-size:120%;vertical-align: -0.3em;'>-</sub><b>a</b> = (" + ak.toString() + ") vektorral induló integrál éppen az  <b>a</b><sup>&dagger;</sup> = (" + b.toString() + ") vektorral zárul az integráló sorban. ";
        txt += "A két integrálási eredményt összevetve az alábbit írhatjuk: <div style='text-align:center;'><span style='display:inline-block;outline:2px solid #a87d73;background-color:#e5e1f9;margin:5px;padding:10px;'> −Li<sub><b>a</b></sub>(1−x) + C =<span class='block' style='transform: scale(1.5);margin:0 7px;'>&sum;</span><sub style='vertical-align:-0.6em;'><b>u</b>,<b>v</b>&geq;(1)</sub>Li<sub><b>u</b></sub>(1-x) Li<sub><b>v</b></sub>(x) + Li<sub><b>a</b><sup>&dagger;</sup></sub>(x)<span></div> A C konstans kiszámításának -és az egész bizonyításnak is- a másik alappillére az a tény, hogy <span style='color:#df007e;'><b>u</b>,<b>v</b>&nbsp;&geq;&nbsp;(1) indexvektorok esetén az f<sub><b>u</b>,<b>v</b></sub>(x) =  Li<sub><b>u</b></sub>(1-x) Li<sub><b>v</b></sub>(x) függvények x = 0-ban, és x = 1-ben is zérus értéket vesznek fel.</span> (Erről  meg is győződhetünk a <span class='kartyabtn'  onclick='gokartya(" + 6 + ");'>6. kártyán</span> a függvények \"közelítő\" ábrázolásával.) Ennek pedig triviális következménye, hogy az egyenletben szereplő F(x) = <span class='block' style='transform: scale(1.5);margin:0 7px;'>&sum;</span><sub style='vertical-align:-0.6em;'><b>u</b>,<b>v</b>&geq;(1)</sub>Li<sub><b>u</b></sub>(1-x) Li<sub><b>v</b></sub>(x) összegfüggvény is zérus értéket vesz fel x = 0-ban, illetve x = 1-ben.<br/> (a) Ha az egyenletünkbe x = 1 értéket írjuk, akkor az −Li<sub><b>a</b></sub>(0) + C = 0 + Li<sub><b>a</b><sup>&dagger;</sup></sub>(1) &Leftrightarrow; C = &zeta;(<b>a</b><sup>&dagger;</sup>) egyenletet kapjuk. <br/> (b) Ha pedig az egyenletünkbe az x = 0 értéket helyettesítjük, akkor az −Li<sub><b>a</b></sub>(1) + C = 0 + Li<sub><b>a</b><sup>&dagger;</sup></sub>(0) = 0 &Leftrightarrow; −&zeta;(<b>a</b>) + C = 0 egyenletet nyerjük.<br/> Az (a) és (b) összevetésével pedig: −&zeta;(<b>a</b>) +  &zeta;(<b>a</b><sup>&dagger;</sup>) = 0  &Leftrightarrow; &zeta;(<b>a</b>) =  &zeta;(<b>a</b><sup>&dagger;</sup>)."
    };

    elem.innerHTML = txt;
};

function sage_dual() {
    const a = kiszed_cd("ad");
    const b = dualofv([...a]);
    const n = document.getElementById("nd").value * 100;
    var txt = "show('HIBA');";
    var rag = "";
    if (a[0] > 1)
        rag = ',' + (a[0] - 1);
    var frd = "";
    if (a.length > 1)
        frd = ',' + [...a.slice(1)].reverse().toString();
    if (a != undefined && b != undefined && !a[0] < 2) {
        var ra = [...a].reverse();
        var rb = [...b].reverse();
        var txt0 = 'show(LatexExpr(r"\\boldsymbol{a}^{\\dagger}\\,=\\,(1' + frd + rag + ')^{*}\\,=\\,(' + b.toString() + ')"),"\\n\\n");';
        var txt1 = 'show(LatexExpr(r"\\zeta(\\boldsymbol{a})\\,=\\,"),Multizeta(' + a.toString() + '),LatexExpr(r"\\,=\\,"),Multizeta(' + b.toString() + '),LatexExpr(r"\\,=\\,\\zeta(\\boldsymbol{a}^{\\dagger})"),"\\n\\n");';
        var txt2 = 'show(n(Multizeta(' + ra.toString() + '),prec = ' + n + '));';
        var txt3 = 'show(n(Multizeta(' + rb.toString() + '),prec = ' + n + '));';
        var txt = txt0 + txt1 + txt2 + txt3;
    };
    $('#mycell5 .sagecell_editor textarea.sagecell_commands').val(txt);
    $('#mycell5 .sagecell_input button.sagecell_evalButton').click();
    setOutputFont5($('#outfont-slider5').val());
};


// plotLi(1-x)*Li(x)

function setNLi(elem) {
    var N = elem.value;
    var Nelem = document.getElementById("seriesNLiLi");
    Nelem.innerHTML = N;
    sorfejtesLiLi1();
};

function seriesLiLiClear() {
    var elem = document.querySelector("#sorLiLi");
    var elemfn = document.querySelector("#fnplLiLi");
    var elemfigy = document.querySelector("#figy");
    elem.innerText = "";
    functionPlot({
        target: '#plotLiLi',
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

function nLiLi1(a, b, N, x) {
    const n = b.length;
    var ca = [],
        cb = [];
    for (var i = 0; i < n + N + 1; i++)
        cb[i] = Ha(a, i);
    for (var j = 0; i < n + N + 1; i++)
        ca[i] = Ha(b, n + j);
    var c = 0;
    for (var t = 0; t <= n + N; t++) {
        var ct = 0;
        for (var j = 0; j <= t; j++) {
            var cj = 0;
            var ej = Math.pow(-1, j);
            for (var k = Math.max(n, j); k <= N; k++) {
                cj += Ha(b, k) * binomial(k, j);
            }
            cj = cj * ej * Ha(a, t - j);
            ct += cj;
        };
        c += ct * Math.pow(x, t);
    };
    return c;
};

function maxLiLi1(a, b, N) {
    var c = [];
    for (j = 1; j < 9; j++)
        c.push(nLiLi1(a, b, N, 0.1 * j));
    return _.max(c) * 1.1;
};

function LiLi1(a, b, N) {
    const n = b.length;
    var ca = [],
        cb = [];
    for (var i = 0; i < n + N + 1; i++)
        cb[i] = FHa(a, i);
    for (var j = 0; i < n + N + 1; i++)
        ca[i] = FHa(b, n + j);
    var c = "";
    var cltx = "";
    for (var t = 0; t <= n + N; t++) {
        var ct = Fraction(0);
        for (var j = 0; j <= t; j++) {
            var cj = Fraction(0);
            var ej = Math.pow(-1, j);
            for (var k = Math.max(n, j); k <= N; k++) {
                cj = cj.add(FHa(b, k).mul(binomial(k, j)));
            }
            cj = cj.mul(ej).mul(FHa(a, t - j));
            ct = ct.add(cj)
        };
        c += ct.toFraction() + "*x^" + t + "+";
        if (ct != 0)
            cltx += ct.toLatex() + "\\;x^{" + t + "}+";
    };
    c = c.slice(0, -1);
    c = c.replaceAll("+-", "-");
    cltx = cltx.slice(0, -1);
    cltx = cltx.replaceAll("+-", "-");
    const m = maxLiLi1(a, b, N);
    return [c, cltx, [-0.1 * m, m]];
};

function sorfejtesLiLi1() {
    sorhiba = false;
    const lengtelem = document.querySelector("#series-sliderLiLi");
    const elem = document.querySelector("#sorLiLi");
    const elemfn = document.querySelector("#fnplLiLi");
    elemfn.style.display = "block";
    const a = kiszed_cd('avLiLi');
    const b = kiszed_cd('bvLiLi');
    const N = lengtelem.value * 1;

    const c = LiLi1(a, b, N);
    const fn = c[0];
    const txt = c[1];
    const yD = c[2];
    if (!sorhiba) {
        elem.innerText = "\\[" + txt + "\\]";
        functionPlot({
            target: '#plotLiLi',
            title: "Li(" + a.toString() + ")(x)*Li(" + b.toString() + ")(1-x)",
            grid: true,
            disableZoom: true,
            xAxis: {
                domain: [0, 1]
            },
            yAxis: {
                domain: yD
            },
            tip: {
                xLine: true,
                yLine: true,
                renderer: function(x, y, index) {}
            },
            data: [{
                fn: fn,
                graphType: 'polyline',
                color: "#ff0000"
            }]
        });
        document.querySelector('svg.function-plot text.title').setAttribute('x', 140);
    } else {
        var pl = document.querySelector('.function-plot');
        if (pl)
            pl.remove();
        elem.innerText = "\\[\\text{There is some problem with input data!}\\]";
    };
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

// fibrationBasis

function setOutputFont6(v) {
    var elem = document.getElementById("outnm");
    elem.style.fontSize = v + 'px';
};

function setOutputFont7(v) {
    var elem = document.getElementById("outfb");
    elem.style.fontSize = v + 'px';
};

function trailing0(v) {
    return _.dropRightWhile(v, y => y == 0);
};

function told0val(a, b) {
    const na = a.length;
    const nb = b.length;
    if (na > nb) {
        k = na - nb;
        for (var i = 1; i <= na - nb; i++)
            b.unshift(0);
    } else {
        k = nb - na;
        for (var i = 1; i <= nb - na; i++)
            a.unshift(0);
    };

    return [a, b];
};

function hosszill(a, b) {
    const na = a.length;
    const nb = b.length;
    if (na > nb) {;
        for (var i = 0; i < na - nb; i++)
            b.push(0);

    } else if (nb > na) {
        for (var i = 0; i < nb - na; i++)
            a.push(0);
    }
    return [a, b];
};

function revlexelotte(s) {
    const n = s.length;
    var out = [];
    for (var j = 0; j < n; j++) {
        for (var k = 0; k < s[n - 1 - j]; k++) {
            var cv;
            if (j == 0 && k == 0)
                cv = [];
            else if (j > 0 && k == 0)
                cv = _.takeRight(s, j);
            else {
                cv = _.takeRight(s, j);
                cv.unshift(k);
            }

            out.push(cv);
        }
    }
    out.push(s);
    return out;
};

function rbontas(v) {
    const n = v.length;
    var u = [],
        l = [],
        nl = 0;
    for (var i = 0; i < n; i++) {
        var e = v[i];
        if (e > 1) {
            u.push(e - 1);
            l.push(1);
            nl++;
        } else if (nl > 0)
            l[nl - 1]++;
        else {
            l.push(1);
            nl++;
        }
    };

    return told0val(u, l);
};

function inv_nconc(a, b) {
    return trailing0(_.zipWith(...told0val(a, b), (x, y) => x - y));
};

function ribbon_comp(s) {
    const rs = revlexelotte(s);
    const bs = rbontas(s)
    var out = [];
    for (let sv of rs)
        out.push([hosszill(..._.zipWith(bs, rbontas(sv), (x, y) => inv_nconc(x, y))), sv]);
    return out;
};
//...............................................

function szabdal(a, v) {
    const nv = v.length - 1;
    var out = [];
    for (var j = 0; j < nv; j++)
        out.push(a.slice(v[j], v[j + 1]))
    return out;
};

function comp0spec(n, k) {
    allcomp0 = [];
    if (n == 0 && k == 0)
        allcomp0 = [
            []
        ];
    else if (k == 0)
        allcomp0 = [];
    else if (n == 0 && k > 0)
        allcomp0 = [Array(k).fill(0)];
    else {
        var composition = [];
        for (var exists = get_first_weak_composition(n, k, composition); exists; exists = get_next_weak_composition(n, k, composition)) {
            display_composition(allcomp0, composition);
        };
    }
    return allcomp0;
};

function ncomp0(N, nv) {
    const kumnv = [0, ...kum(nv)];
    const l = _.last(kumnv);
    return comp0spec(N, l).map(y => szabdal(y, kumnv));
}

function nconc(a, b) {
    if (a.length == 0)
        return b;
    else if (b.length == 0)
        return a;
    else
        return [...a.slice(0, -1), _.last(a) + b[0], ...b.slice(1)];
};

function Nconc(L) {
    var out = [];
    for (let v of L)
        out = nconc(out, v);
    return out;
};

function fuzottcomp(Av, Bv) {
    const kiv = _.isEqual(Bv, []) && _.includes((Av.map(y => _.isEqual(y, []))), true);
    var out = [];
    if (!kiv) {
        const r = Av.length;
        var c = [];
        for (var j = 0; j <= r - 2; j++)
            c.push(_.concat(Av[r - j - 1], Bv[r - 2 - j]));
        out = Nconc([...c, Av[0]]);
    };

    return out;
};

function conjcomp(v) {
    if (_.isEqual(v, []))
        return [];
    else
        return conjugate(v);
}

function hatas1(nv, mv) {
    var out = '';
    const rnv = [...nv].reverse();
    const rmv = [...mv].reverse();
    const rr = nv.length;
    const nmc = fuzottcomp(rnv.map(y => conjcomp([y])), rmv.slice(1));
    const M = rmv[0];
    var outL = [];
    var outk = "";
    var obj = {};
    var b = 1;
    for (var k = 0; k <= M; k++) {
        outL = [];
        outk = "";
        obj = {};
        for (var N = 0; N <= k; N++) {
            var T = ncomp0(N, rnv);
            for (let t of T) {
                var Tm = comp0spec(k - N, rr - 1);
                for (let m of Tm) {
                    b = 1;
                    for (var l = 2; l <= rr; l++) {
                        b = b * binomial(rmv[l - 1] - 1 + m[l - 2], rmv[l - 1] - 1);
                    }
                    var tm = fuzottcomp(t, m.map(y => [y]));
                    var indx = _.zipWith(nmc, tm, (u, v) => u + v);
                    outL.push([b, indx]);
                }
            }
        }
        if (outL.length > 0) {
            var eloj = Math.pow(-1, k);
            if (eloj == 1)
                eloj = " + ";
            else
                eloj = " − ";
            var cln = Fraction(1, factorial(M - k));
            var clntxt = "";
            var formln = "";
            if (cln.d > 1)
                clntxt = formazottTortHTML(cln.n, cln.d) + ' ';
            formln = 'ln<sup>' + (M - k) + '</sup>(x)'

            out += eloj + '<span style="display:inline-block;color:' + COLORS[k] + ';font-weight:800;background-color:#e3e3e3;padding:3px 5px;border-radius:3px;">' + clntxt + formln + '</span>'; //ln(x)^M-k


            obj = _.groupBy(outL, y => y[1]);
            var ke = Object.keys(obj);
            for (let k of ke) {
                var b = _.sum(obj[k].map(z => z[0]));
                var prefix = "+";
                if (b > 1)
                    prefix += b + '·';
                outk += prefix + 'Li<sub>(' + k + ')</sub>(x)';
            }
            outk = outk.slice(1);
            if (ke.length > 1)
                outk = '·<span class="paren">[</span>' + outk + '<span class="paren">]</span>';
            else
                outk = '·' + outk;
            out += outk;
        }
    }
    if (out.startsWith(' + '))
        out = out.slice(3);
    return out;
};

function kiszed_nm(id) {
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
        /*  if (av.some(v => v <= 0)) {
             setfigy("Az <b>a</b> vektor nem tartalmazhat negatív elemet vagy 0-át! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figyC");
             idClear('#cout')
             return "Hibás bemenet";
         } else */
        if (indx > -1) {
            av = oo2strInf(av);
            setfigy("Az <b>a</b> indexvektor nem tartalmazhat ∞-t! " + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', "figyC");
            idClear('#cout')
            return "Hibás bemenet";
        }
        cN = _.sum(av) + 1 - av.length || 1;
    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figyC");
        idClear('#cout')
        return "Hibás bemenet";
    };
    return av;
};

function hatas1en() {
    const elem = document.getElementById("outnm");
    const nv = kiszed_nm("nuv");
    const mv = kiszed_nm("muv");
    var out = hatas1(nv, mv);
    elem.innerHTML = out;
};

function Lifb(s) {
    const rc = ribbon_comp(s);
    const rcl = rc.slice(0, -1);
    var out = '';
    for (let nm of rcl) {
        out += ' + <span class="cc">C<sub>(' + nm[1].toString() + ')</sub></span><span class="paren">·{</span>' + hatas1(...nm[0]) + '<span class="paren">}</span>';
    };
    out.slice(3);
    out = out.replace('()', '( )')
    return out;
};

function Lifbkibontva(s) {
    const rc = ribbon_comp(s);
    const rcl = rc.slice(0, -1);
    const ss = _.sum(s);
    const d = 1 - (ss % 2);
    var szamlalo = 0;
    var out = '';
    for (let nm of rcl) {
        szamlalo++;
        var eloj = ' + ';
        if ((szamlalo + d) % 2 == 1)
            eloj = ' − ';
        var eloj = ' + ';
        if ((szamlalo + d) % 2 == 1)
            eloj = ' − ';
        out += eloj + '<span class="cc">C<sub>(' + nm[1].toString() + ')</sub></span>·<span class="paren">{</span>' + hatas1(...nm[0]) + '<span class="paren">}</span>';
    };
    out += ' + <span class="cc">C<sub>(' + s.toString() + ')</sub></span>';
    if (out.startsWith(' + '))
        out = out.slice(3);
    out = out.replace('()', '( )')
    return out;
};

function Lifbint(s) {
    const rc = ribbon_comp(s);
    const rcl = rc.slice(0, -1);
    const ss = _.sum(s);
    const d = 1 - (ss % 2);
    var szamlalo = 0;
    var out = '';
    for (let nm of rcl) {
        szamlalo++;
        var eloj = ' + ';
        if ((szamlalo + d) % 2 == 1)
            eloj = ' − ';
        var u = nm[0][0];
        var l = nm[0][1];
        out += eloj + '<span style="display:inline-block;"><span style="font-weight:600;color:#d50000;">C<sub>(' + nm[1].toString() + ')</sub></span><span class="sqrt-prefix sdefint" style="transform: scaleY( 2.2) translateY(0.13em);font-weight:600;">∫</span><span style="display:inline-block;vertical-align: middle;text-align:center;font-size:90%;line-height:normal;"><table><tr><td>(' + u + ')</td></tr><tr><td>(' + l + ')</td></tr></table></span>[1]</span>';

    };
    out += ' + <span style="font-weight:600;color:#d50000;">C<sub>(' + s.toString() + ')</sub></span>';
    if (out.startsWith(' + '))
        out = out.slice(3);
    out = out.replace('()', '( )')
    return out;
};

function LifB() {
    const kibontva = document.getElementById("setfb").checked;
    const elem = document.getElementById("outfb");
    const s = kiszed_nm("fbs");
    var out = "";
    if (kibontva)
        out = Lifbkibontva(s);
    else
        out = Lifbint(s);
    elem.innerHTML = out;
};

// DETERMINANT OF A MATRIX

// recursive with fraction input

function determinantOfMatrixRecursive0(mat, n) {
    if (n === 1) {
        return mat[0][0];
    }
    let det = 0;
    let sign = 1;
    for (let i = 0; i < n; i++) {
        let submatrix =
            createSubmatrix(mat, i, n);
        det += sign * mat[0][i] *
            determinantOfMatrixRecursive(submatrix, n - 1);
        sign = -sign;
    }
    return det;
};

function determinantOfMatrixRecursive(mat, n) {
    if (n === 1) {
        return Fraction(mat[0][0]);
    }
    let det = Fraction(0);
    let sign = Fraction(1);
    for (let i = 0; i < n; i++) {
        let submatrix =
            createSubmatrix(mat, i, n);
        det = det.add(sign.mul(Fraction(mat[0][i]).mul(
            determinantOfMatrixRecursive(submatrix, n - 1))));
        sign = sign.mul(Fraction(-1));
    }
    return det;
};

// Function to find sub-matrices of different orders
function createSubmatrix(mat, colToRemove, n) {
    let submatrix = [];
    for (let i = 1; i < n; i++) {
        let newRow = [];
        for (let j = 0; j < n; j++) {
            if (j !== colToRemove) {
                newRow.push(mat[i][j]);
            }
        }
        submatrix.push(newRow);
    }
    return submatrix;
};

function Tegla(V) {
    var it = [],
        T = [];
    for (let v of V) {
        var vj = [];
        for (var i = 0; i <= v; i++) {
            vj.push(i);
        };
        it.push(vj);
    };

    T = cartesian(it);
    return T;
};

function suly(a, b) {
    const r = a.length;
    const T = Tegla(a);
    s = 0;
    for (let t of T) {
        var p = 1;
        for (var j = 0; j < r; j++) {
            p *= binomial(b[j] + t[j], b[j]);
        };
        s += p;
    };
    return s;
};

function int1nm(nv, mv) {
    const sumn = _.sum(nv);
    const mv1 = mv.slice(0, -1).map(y => y - 1);
    const knv = kum(nv).slice(0, -1).map(y => y + 1);
    const rnv = [...nv].reverse().map(y => conjugate([y]));
    const rmv = [...nv].reverse().slice(0, -1);
    const nmc = fuzottcomp(rnv, rmv);
    const T = comp0(_.last(mv), sumn);
    var out = "";
    for (let t of T) {
        var tknv = [];
        for (let j of knv)
            tknv.push(t[j - 1]);
        var ot = _.zipWith(nmc, t, (x, y) => x + y);
        var szorzo = suly(tknv, mv1);
        if (szorzo == 1)
            szorzo = "";
        out += " + " + szorzo + "&nbsp&zeta;(" + ot + ")";
    }
    out = out.slice(2);
    const elem = document.getElementById("outfb");
    elem.innerHTML = out;
};

// ribbon graph for fibrationBasis

function toggleTableRow(row) {
    const next = row.parentElement.nextElementSibling;
    if (next && next.classList.contains("child")) {
        next.style.display = (next.style.display === "none") ? "table-row" : "none";
    }
}

function setOutputFontrfb(v) {
    var elem = document.getElementById("rfbT");
    elem.style.fontSize = v + '%';

    $('#rfbT .tsorszam-s,#rfbT .tsorszam-fix').width(20);
    $('#rfbT .tsorszam-s,#rfbT .tsorszam-fix').width(($('#rfbT .tsorszam-s').parent('div').width() - 10) / cN);
    $('#rfbT .tsorszam-s,#rfbT .tsorszam-fix,#rfbT .tsorszam-w,#rfbT .tsorszam-e').css({ 'font-size': v * 0.01 * 12 + "px" });
};

function setDerfix(e) {
    deriv_fix = e.checked;
    if (deriv_fix)
        make_Deriv();
    else if ($('#rfbT .tgomb.d-path').length > 0)
        $('#rfbT .tgomb.d-path').removeClass('d-path');
};

function moveSelect(e) {
    const $e = $(e);
    const esel = $e.hasClass('sel');
    const m = $('#rfbT .tgomb.move');
    const ed = $e.attr('rfb-data');
    const md = m.attr('rfb-data');
    const mas = m.length > 0 && !(ed == md);
    const ej = ed.split('-')[1];
    const ei = ed.split('-')[0];
    const ee = $('#rfbT .tgomb.no[rfb-data=' + (ei - 1) + '-' + ej + ']');
    var eesel = false;
    if (ee.length > 0)
        eesel = ee.hasClass('sel');
    var mj = 0;
    if (m.length > 0)
        mj = md.split('-')[1] || 0;
    if (!eesel) {
        if (m.length == 0) {
            if (esel)
                $e.toggleClass('move');
            else if ($('#rfbT .tgomb.sel').length > 0) {
                const mm = $('#rfbT .tgomb.sel:nth(0)')
                $e.toggleClass('sel').toggleClass('move').html('&#x25CF;');
                mm.removeClass('sel').removeClass('move').html('&#x25CB;');
            }
        } else if (!mas) {
            m.removeClass('move');
        } else {
            if (!esel && ej != mj) {
                $e.toggleClass('sel').toggleClass('move').html('&#x25CF;');
                m.removeClass('sel').removeClass('move').html('&#x25CB;');
            } else if (ej != mj) {
                $e.toggleClass('move');
                m.removeClass('move');
            }
        };
        teglaTrim();
    }
};

function drawDerivPath(s, o, d) {
    const k = kum(d);
    var d_path = [];
    for (var i = 1; i <= s; i++)
        for (var j = 1; j < o; j++)
            if ($('#rfbT .tgomb.shown[rfb-data=' + i + '-' + j + ']').length > 0)
                d_path.push([i, j]);
    d_path.filter(y => y[1] < o && y[0] <= s);
    for (let v of d_path) {
        var j = v[1];
        v[0] += k[j - 1];
    };
    for (var j = 1; j < o; j++) {
        var m = _.min(d_path.filter(y => y[1] == j).map(t => t[0]));
        for (var u = 1; u <= d[j - 1]; u++) {
            d_path.push([m - u, j]);
        }
    }
    const p = $('#rfbT .tsorszam-s.ln').text() * 1;
    for (var l = s - p; l <= s; l++)
        d_path.push([l, o]);
    for (let j of d_path) {
        $('#rfbT .tgomb[rfb-data=' + j[0] + '-' + j[1] + ']').addClass('d-path');
    }
};

function toggle_Deriv() {
    if (rfb_last.s > 0) {
        const s = rfb_last.s;
        const o = rfb_last.o;
        const d = rfb_last.deriv_path;
        if ($('#rfbT .tgomb.d-path').length > 0)
            $('#rfbT .tgomb.d-path').removeClass('d-path');
        else
            drawDerivPath(s, o, d);
    }
};

function make_Deriv() {
    if (rfb_last.s > 0) {
        const s = rfb_last.s;
        const o = rfb_last.o;
        const d = rfb_last.deriv_path;
        drawDerivPath(s, o, d);
    }
};

function teglaTrim() {
    const o = rfbtegla[0];
    const v = _.dropRight([...rfbtegla[1]]);
    const db = $('#rfbT .tgomb.sel').length;
    const lLi = rfb_last["Li"];
    const diff = db - lLi;
    if (diff > 0)
        for (var d = 0; d < diff; d++)
            $('#rfbT .tgomb.sel:nth(' + d + ')').removeClass('sel move').html('&#x25CB;');
    if ($('#rfbT .tgomb.d-path').length > 0)
        $('#rfbT .tgomb.d-path').removeClass('d-path');
    var d = Array(o).fill(0);
    for (var i = 1; i < o + 1; i++) {
        for (let j of v) {
            var e = $('#rfbT .tgomb.no[rfb-data=' + j + '-' + i + ']')
            var f = $('#rfbT .tgomb.no[rfb-data=' + (j + 1) + '-' + i + ']')
            if (!f.hasClass('sel')) {
                if (e.hasClass('sel')) {
                    e.removeClass('sel').html('&#x25CB;');
                    f.addClass('sel').html('&#x25CF;');
                    if (e.hasClass('move')) {
                        e.toggleClass('move');
                        f.toggleClass('move');
                    }
                } else
                    e.removeClass('ye');
            } else {
                if (!e.hasClass('ye') && !f.hasClass('move'))
                    e.addClass('ye');
                else if (f.hasClass('move') && !e.hasClass('sel'))
                    e.removeClass('ye');
            }
        }
    };
    const vv = [...rfbtegla[1]];
    var B = 1;
    var Btext = "";
    rfb_last.deriv_path = [];
    const lv = [...rfb_last["v"]];
    for (var i = 1; i < o + 1; i++) {
        for (let j of vv) {
            var e = $('#rfbT .tgomb.no[rfb-data=' + j + '-' + i + ']')
            if (e.hasClass('sel')) {
                d[i - 1] = d[i - 1] + 1;
            }
        }
        d[i - 1] = lv[i - 1] + d[i - 1];
        B *= binomial(d[i - 1] - 1, lv[i - 1] - 1);
        rfb_last.deriv_path.push(d[i - 1] - lv[i - 1]);
        Btext += drawBinomial(d[i - 1] - 1, lv[i - 1] - 1);
    };
    rfb_last.deriv_path.push(0);
    for (var t = 0; t < o; t++)
        $('#rfbT .tsorszam-s:nth(' + (t + 1) + ')').html(d[t]);
    if (o > 0)
        Btext += "<span style='display:inline-block;position: relative;top: -30%;'> = " + "<span class='binomcolor'>" + B + "</span></span>";
    else {
        B = binomial(-1 + rfb_last.Li, -1)
        Btext = drawBinomial(-1 + rfb_last.Li, -1) + "<span style='display:inline-block;position: relative;top: -30%;'> = " + "<span class='binomcolor'>" + B + "</span></span>";
    };

    const lo = rfb_last.o;
    const ls = rfb_last.s;
    const p = $('#rfbT .tsorszam-s.ln').text() * 1;
    var elojel = Math.pow(-1, _.sum(_.dropRight(lv)) + p);
    if (elojel < 0)
        elojel = "-";
    else
        elojel = "";
    var szorzo = factorial(p);
    szorzo = "1/" + "<span class='lncolor'>" + szorzo + "</span>&lowast;";
    var keplet = "";
    keplet = "&rightarrow;&nbsp;" + elojel + szorzo + "<span class='binomcolor'>" + B + "</span>&lowast;&zeta;(" + rfb_last["C"] + ")&lowast;ln<sup class='lncolor'>" + p + "</sup>(x)&lowast;Li<sub>(" + d + ")</sub>(x)";
    keplet = keplet.replaceAll("<sub>(( ))</sub>", "<sub>( )</sub>");
    $('#rfbT .cintkeplet').html('').removeClass('cintkeplet');
    $("#rfbT #ebbe-" + ls).html(keplet).addClass('cintkeplet');
    if (rfb_last.v.length > 1)
        var av = conjugate(_.dropRight(rfb_last.v, 1));
    else
        var av = [];
    var bont = "<b>a</b> &odot; (1)<sup><i>p</i></sup> &bullet; <b>c</b> = (" + av.toString() + ")&odot;(" + Array(lLi + p).fill(1).toString() + ")&bullet;(" + rfb_last["C"] + ")";
    bont = bont.replaceAll("(( ))", "( )").replaceAll("()", "( )")
    $("#rfbT #ebbe-" + (ls + 1)).html(bont).addClass('cintkeplet');
    $("#rfbT #binomkijelzo").html(Btext);
    _.filter($('#rfbT .tgomb.shown'), function(y) {
        var tt = $(y).attr('rfb-data').split('-');
        return tt[0] < ls * 1 && tt[1] == lo * 1 && !$(y).hasClass('hlLn');
    }).map(z => $(z).addClass('hlLi'));

    $("#rfbTable span.deractive").removeClass('deractive');
    if (d.length > 0)
        $("#rfbTable span[der-data=" + d.toString().replaceAll(',', "-") + "]").addClass('deractive');
    if (deriv_fix)
        make_Deriv();
};

function derivSor(s, n) {
    const ss = _.dropRight(s, 1);
    const de = expDeriv(ss, n).reverse();
    const fakt = factorial(n);
    const el = $('#rfbTable tr.parent td #dcimke');
    const elem = $('#rfbTable tr.child td p');
    el.html("<span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;line-height:normal;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>1</td></tr><tr><td>(p - k)!</td></tr></table></span> &#8706;<sup>p - k</sup>(<b>a</b>*) = <span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;line-height:normal;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>1</td></tr><tr><td class='licolor'>" + fakt + "</td></tr></table></span>" + " (" + ss.toString() + ")<sup class='licolor'>(" + n + ")</sup> = ...")
    var dtxt = '=';
    for (let v of de) {
        var c = v[0] / fakt;
        var ertek = v[1].toString();
        if (c == 1)
            c = " +  <span der-data='" + ertek.replaceAll(",", "-") + "'>";
        else if (c > 1)
            c = " +  <span der-data='" + ertek.replaceAll(",", "-") + "'>" + c + "&lowast;";
        if (v[1] != "")
            dtxt += c + "(" + ertek + ")</span>";
    };
    dtxt = dtxt.replace("= +", "= ");
    elem.html(dtxt);
};

function fbcdat(el, s, o) {
    const Lifirst = document.getElementById('setlnLi').checked;
    const E = $("#rfbT .tgomb.hl");
    const DE = E.attr("rfb-data");
    const de = $(el).attr("rfb-data");
    const m = de.split("-")[1] * 1;
    if ($('#rfbT .tgomb.d-path').length > 0)
        $('#rfbT .tgomb.d-path').removeClass('d-path');
    if (DE == de) {
        if (m != 1)
            $(el).toggleClass('hlmove');
        if (deriv_fix)
            make_Deriv();
        return;
    } else {
        const c = kiszed_c('rfbs');
        const r = c.length;
        var e = _.take(c, s - 1);
        if (s <= r)
            e.push(o);
        else
            e.push(1);
        var h = _.takeRight(c, r - s);

        if (s <= r)
            h.unshift(c[s - 1] - o + 1);
        else
            h = ["( )"];

        $('#rfbT .tsorszam-w').css("visibility", "hidden");
        $('#rfbT .tsorszam-w.corr').html($('#rfbT .tsorszam-w.corr').attr('data-n'));
        $('#rfbT .tsorszam-w.corr').removeClass('corr');
        $('#rfbT .tsorszam-s.ln').removeClass('ln');
        $('#rfbT .tsorszam-fix.Li').removeClass('Li');
        $('#rfbT .tgomb.hlLi').removeClass('hlLi');
        const ce = conjugate(e);
        const oaz = _.isEqual(_.dropRight(ce), _.dropRight(rfb_last["v"])) && rfb_last["s"] > s && !E.hasClass('hlmove');
        const ssv = conjugate(c).slice(0, m);
        const ss = _.sum(ssv) - ssv.length + 1;
        const ssve = ssv.slice(0, m - 1);
        const sse = _.sum(ssve) - ssve.length + 1;
        if (!oaz) {
            rfbtegla = [0, []];
            rfb_last["v"] = [...ce];
            rfb_last["s"] = s;
            rfb_last["C"] = h;
            if (Lifirst && m != 1)
                rfb_last["Li"] = s - sse;
            else
                rfb_last["Li"] = 0;
            rfb_last["o"] = m;

            const pje = _.takeRight(rfb_last.v, 1) - (rfb_last.Le * 1 || 0) - 1;
            $('#rfbT .tsorszam-e').css("visibility", "hidden");
            $('#rfbT .tsorszam-e.corr').html($('#rfbT .tsorszam-e.corr').attr('data-n'));
            $('#rfbT .tsorszam-e.corr').removeClass('corr');
            for (var t = s - 2; t < r + Math.floor(s / (r + 1)); t++) {
                $('#rfbT .tsorszam-e:nth(' + t + ')').css("visibility", "visible").html(h[t - s + 1]);
            }
            $('#rfbT .tsorszam-e:nth(' + (s - 2) + ')').html("p = " + pje).addClass("corr");
            $('#rfbT .tsorszam-e:nth(' + (s - 1) + ')').html(h[0]).addClass("corr");

            $('#rfbT .tsorszam-s,#rfbT .tsorszam-fix').css("visibility", "hidden");

            $('#rfbT .tgomb.hl:not(.szelso)').html('&#x25CB;');
            $('#rfbT .tgomb.hl.szelso').html('&#x25CE;');
            $('#rfbT .tgomb.hl').removeClass('hl');
            $('#rfbT .tgomb.hlLn').removeClass('hlLn').html('&#x25CB;');
            if ($(el).hasClass('szelso'))
                $(el).html('&#x25C9;');
            else
                $(el).html('&#x25CF;');
            $(el).addClass('hl hlmove');

            $('#rfbT .tgomb.ye').removeClass('ye')
            $('#rfbT .tgomb.move').removeClass('move');
            $('#rfbT .tgomb.sel').removeClass('sel').html('&#x25CB;');

            rfbtegla[0] = m - 1;
            if (Lifirst && m != 1) {
                var d = 0;
                if ((sse == r && _.last(c) > 1) || (ss == r && _.last(c) == 1))
                    d++;
                for (var p = sse + ss - s + 1 + d; p <= ss + d; p++) {
                    $('#rfbT .tgomb.no[rfb-data=' + p + '-1]').addClass('sel').html('&#x25CF;');
                    rfbtegla[1].push(p)
                    ce[0]++
                        for (var q = 1; q < m; q++)
                            $('#rfbT .tgomb.no[rfb-data=' + p + '-' + q + ']').addClass('ye');
                };
                $('#rfbT .tgomb.sel:nth(0)').addClass('move');
            } else {
                rfbtegla[1] = [];
                _.filter($('#rfbT .tgomb.shown'), function(y) {
                    var tt = $(y).attr('rfb-data').split('-');
                    return tt[0] < s * 1 && tt[1] == m;
                }).map(z => $(z).addClass('hlLn').html('&#x25CF;'));
            }

        } else if ($(el).hasClass('hlLn')) {
            $(el).removeClass('hlLn').html('&#x25CB;');
            var pp = ss + 1;
            const rfb1 = rfbtegla[1];
            const krit = (sse == r && _.last(c) > 1) || (ss == r && _.last(c) == 1);
            if (rfb1.length > 0)
                pp = rfb1[0];
            if (krit)
                pp++;
            for (var q = 1; q < m; q++)
                $('#rfbT .tgomb.no[rfb-data=' + (pp - 1) + '-' + q + ']').addClass('ye');
            $('#rfbT .tgomb.no[rfb-data=' + (pp - 1) + '-1]').addClass('sel').html('&#x25CF;');
            $('#rfbT .tgomb.move').removeClass('move');
            if (krit && rfb1.length > 0) {
                pp--
                $('#rfbT .tgomb.no[rfb-data=' + (pp - 1) + '-1]').addClass('sel').html('&#x25CF;');
            }
            rfbtegla[1].unshift(pp - 1);
            rfb_last["Li"] = rfb_last["Li"] + 1;
        } else {
            $(el).addClass('hlLn');
            if ($(el).hasClass('szelso'))
                $(el).html('&#x25C9;');
            else
                $(el).html('&#x25CF;');
            const pp = rfbtegla[1][0];
            for (var q = 1; q < m; q++)
                $('#rfbT .tgomb.no[rfb-data=' + pp + '-' + q + ']').removeClass('ye').removeClass('sel').removeClass('move').html('&#x25CB;');
            $('#rfbT .tgomb.sel:nth(0)').addClass('move');
            rfbtegla[1] = _.drop(rfbtegla[1]);
            rfb_last["Li"] = rfb_last["Li"] - 1;
        };
        for (var t = 0; t < ce.length - 1; t++)
            $('#rfbT .tsorszam-s:nth(' + (t + 1) + ')').css("visibility", "visible").html(ce[t]);
        for (var t = 0; t < ce.length - 1; t++)
            $('#rfbT .tsorszam-fix:nth(' + (t + 1) + ')').css("visibility", "visible").html(rfb_last["v"][t]);
        $('#rfbT .tsorszam-s:nth(' + (t + 1) + ')').css("visibility", "visible").addClass('ln').html($('#rfbT .tgomb.hlLn').length);
        $('#rfbT .tsorszam-s:nth(' + (t + 2) + ')').css("visibility", "visible").html(" = k");
        $('#rfbT .tsorszam-fix:nth(' + (t + 1) + ')').css("visibility", "visible").addClass('Li').html(rfb_last["Li"]);
        $('#rfbT .tsorszam-fix:nth(' + (t + 2) + ')').css("visibility", "visible").html(" = p - k");
        if (ce.length == 1) {
            $('#rfbT .tsorszam-s:nth(0)').css("visibility", "visible");
            $('#rfbT .tsorszam-fix:nth(0)').css("visibility", "visible");
        };
        derivSor(rfb_last["v"], rfb_last["Li"]);
        teglaTrim();
    };
};

function rfbGraph() {
    rfbtegla = [0, []];
    rfb_last = { "v": [], "s": 0, "C": [], "Li": 0, "o": 0 };
    const elem = document.getElementById("rfbT");
    const c = kiszed_c('rfbs');
    const kc = kum(c);
    const r = c.length;
    var k = [0];
    for (var i = 1; i < r; i++) {
        k.push(kc[i - 1] - i);
    };
    var chk = "false";
    var kep = "<span id='show_deriv' onclick='toggle_Deriv();'>&#x25CB;</span><table style='border-collapse:collapse;display:inline-table;'><input type='checkbox' id='setderfix' onchange='setDerfix(this);' style='height:20px;width:20px;display: inline-block;position: relative;left: -40px;'><thead><tr><th><span class='tsorszam-w' data-n='0' style='color:red;'>0</span></th><th>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-n' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "<th style='width:21.36px'></th></th><td></td></tr></thead>";
    for (var j = 0; j < r; j++) {
        kep += "<tr><th><span class='tsorszam-w' data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div>";
        for (var t = 0; t < k[j]; t++) {
            kep += "<span class='tgomb no' onclick='moveSelect(this);' rfb-data='" + (j + 1) + "-" + (t + 1) + "'>&#x25CB;</span> ";
        };
        for (var t = k[j]; t < k[j] + c[j]; t++) {
            kep += "<span class='tgomb shown' rfb-data='" + (j + 1) + "-" + (t + 1) + "' onclick='fbcdat(this," + ((j + 1) + "," + (t - k[j] + 1)) + ")'>&#x25CB;</span> ";
        };
        kep += "</div></td><th><span class='tsorszam-e'  data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div  id='ebbe-" + (j + 1) + "'></div></td>";
    };
    kep += "<tr><th><span class='tsorszam-w' data-n='1' >1</span></th><td><div>";
    var L = _.last(k) + _.last(c);
    for (var t = 0; t < L - 1; t++)
        kep += "<span class='tgomb no' onclick='moveSelect(this);' rfb-data='" + (r + 1) + "-" + (t + 1) + "'>&#x25CB;</span> ";;
    kep += "<span class='tgomb shown szelso' style='border-radius: 50%;padding: 0 0.31em;margin-left: -0.31em;' onclick='fbcdat(this," + (r + 1) + "," + L + ")' rfb-data='" + (r + 1) + "-" + L + "'>&#x25CE;</span></div></td><th><span class='tsorszam-e szelso' data-n='( )'>( )</span></th><td><div  id='ebbe-" + (r + 1) + "'></div></td>";
    kep += "</tr><tr><th><span class='tsorszam-s' data-n='0'>( ) </span></th><th><div style='margin-left:-0.3em'>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-s' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "</div></th><th style='width:21.36px'></th><td><div  id='ebbe-" + (r + 2) + "'></div></td></tr>";
    kep += "<tr><th><span class='tsorszam-fix' data-n='0'>0</span></th><th><div style='margin-left:-0.3em'>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-fix' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "</div></th><th style='width:21.36px'></th><td id='binomkijelzo'></td></tr></table>";
    elem.innerHTML = kep;
    setOutputFontrfb(document.getElementById("setoutputfontrfb").value);
    $('#rfbT #show_deriv').css('top', Math.max(20, ($('#rfbT table').height() - 40) / 2) + 'px');
    if (deriv_fix)
        document.getElementById("setderfix").click();
};

// Általános Latex kimenet

function setLatexFont(v) {
    const elem = document.getElementById("gen_latex");
    elem.style.fontSize = v + '%';
    setTimeout(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    }, 100);
};

function mapleMatrix() {
    txt = document.querySelector("#latexinput").value;
    txt = txt.replaceAll("\\noalign{\\medskip}", "");
    const elem = document.querySelector("#gen_latex");
    elem.innerText = "\\[" + txt + "\\]";
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
};

function setMaxBuffer(v) {
    MathJax.Hub.Config({
        TeX: {
            MAXBUFFER: v * 1024, // Set size of buffer in bytes
        }
    });
};

// derivalas

function setCode(elem) {
    const text = elem.innerText;
    cmeditormz.setValue(text);
    document.querySelector('#sc1 .CodeMirror').scrollIntoView({
        behavior: "smooth",
        block: 'center'
    });
};

function expDeriv(s, n) {
    const sn = s.length;
    const W = comp0(n, sn);
    const fak = factorial(n);
    var out = [];
    for (let w of W) {
        var sw = _.zipWith(s, w, (u, v) => u + v);
        var p = 1;
        for (var j = 0; j < sn; j++) {
            p *= binomial(sw[j] - 1, s[j] - 1);
        };
        out.push([p * fak, sw]);
    };

    return out;
};

function leading1(v) {
    return _.dropWhile(v, y => y == 1);
};

function genDual(s) {
    const sr = leading1(s);
    const n = s.length - sr.length;
    const du = dualofv(sr);
    const p = 1 / factorial(n);
    const d = [...expDeriv(du, n)];
    var out = [];
    if (n % 2 == 0)
        for (let w of d)
            if (valasztott == 2)
                out.push([(p * w[0]).toFixed(0), dualofv(w[1])]);
            else
                out.push([(p * w[0]).toFixed(0), w[1]]);
    else
        for (let w of d)
            if (valasztott == 2)
                out.push([(-p * w[0]).toFixed(0), dualofv(w[1])]);
            else
                out.push([(-p * w[0]).toFixed(0), w[1]]);
    return out;
};

function shbeir(el) {
    var txt = el.value;
    txt = "shuffle_regularization( index(" + txt.split('').reverse().join('') + ") )";
    cmeditormz.setValue(txt);
    if ($('#sc1 .sagecell_sessionOutput pre') != undefined)
        $('#sc1 .sagecell_sessionOutput pre').text("")
}

function kiszed_gd(id) {
    var av = document.getElementById(id).value;
    if (!av.startsWith("[")) {
        av = "[" + av;
    }
    if (!av.endsWith("]")) {
        av = av + "]";
    };

    try {
        av = JSON.parse(av);
        if (av.some(v => v <= 0)) {
            setfigy("Az <b>a</b> vektor nem tartalmazhat negatív elemet vagy 0-át! " + '<span class="outhiba"><b>a</b> = (' + av + ')</span>', "figyC");
            return "Hibás bemenet";
        }
    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', "figyC");
        return "Hibás bemenet";
    };
    return av;
};
var shuff_reg = ""

function shuffreg() {
    const out = $('#sc1 .sagecell_sessionOutput pre');
    var txt = out.text();
    if (!/sh = n/.test(txt) && txt != "")
        shuff_reg = txt || "";
    else if (shuff_reg != "")
        txt = shuff_reg;
    if (!/index/.test(txt))
        return;
    const s = kiszed_gd('gendual');
    const de = genDual(s);
    var shuffzeta = 'sh = n(' + txt.replaceAll("index", "Multizeta") + ',prec = 200);\n';
    shuffzeta += 'show(LatexExpr(r"\\zeta^{\\text{reg}}(' + s.toString() + ')\\,=\\,"),sh)';
    var tgd = "";
    for (j = 0; j < de.length; j++) {
        var tag = de[j];
        tgd += "+" + tag[0] + "*Multizeta(" + [...tag[1]].reverse().toString() + ")";
    };
    tgd = tgd.replaceAll("+-", "-");
    if (tgd.startsWith("+"))
        tgd = tgd.slice(1);
    tgd = "deriv = n(" + tgd + ",prec = 200);\n";
    tgd += 'show(LatexExpr(r"\\zeta^{\\text{der}}(' + s.toString() + ')\\,=\\,"),deriv),"\\n\\n"';

    if (txt.startsWith("-")) {
        var bontas = txt.split('-');
        var glu = "-";
    } else {
        var bontas = txt.split('+');
        var glu = "+";
    };
    bontas = bontas.map(y => y.trim().split('*'));
    var bontas1 = [];
    for (let b of bontas) {
        if (b.length == 1)
            bontas1.push(["1", b[0]])
        else
            bontas1.push([b[0], b[1]]);
    };

    var ztxt = 'show(LatexExpr(r"\\zeta^{\\text{reg}}(' + s.toString() + ')\\,=\\,';
    for (let v of bontas1) {
        var c = glu;
        if (v[0] != 1)
            c += v[0];
        if (v[1] != "")
            ztxt += c + '\\zeta(' + v[1].slice(0, -1).replace("index(", "").split('').reverse().join('') + ')'
    }

    ztxt += '"));\n';
    ztxt = ztxt.replaceAll("=\\,+", "=\\,");

    var dtxt = 'show(LatexExpr(r"\\zeta^{\\text{der}}(' + s.toString() + ')\\,=\\,';
    for (let v of de) {
        var c = v[0];
        if (c == -1)
            c = "-";
        else if (c == 1)
            c = "+";
        else if (c > 1)
            c = "+" + c;
        if (v[1] != "")
            dtxt += c + '\\zeta(' + v[1].toString() + ')'
    }

    dtxt += '"));\n';
    dtxt = dtxt.replaceAll("=\\,+", "=\\,");
    const text = shuffzeta + "\n" + tgd + "\n" + ztxt + "\n" + dtxt;
    cmeditormz.setValue(text);
    $('#sc1 .sagecell_evalButton').trigger('click');
};

var valasztott = 1;

function changeValasztott(elem) {
    const id = elem.id;
    if (id == "v1" && valasztott == 2) {
        valasztott = 1;
        $('#v2').removeClass('valasztott').addClass('nemvalasztott');
        $('#v1').removeClass('nemvalasztott').addClass('valasztott');
    }
    if (id == "v2" && valasztott == 1) {
        valasztott = 2;
        $('#v1').removeClass('valasztott').addClass('nemvalasztott');
        $('#v2').removeClass('nemvalasztott').addClass('valasztott');
    }
    shuffreg();
};

// regularization 

function setOutputFont8(v) {
    var elem = document.getElementById("shreg");
    elem.style.fontSize = v + 'px';
};

function admHighlight() {
    $(".kpactive .admactive").removeClass('admactive');
    const els = $('#shreg table td.shrhl');
    els.each(function() {
        var indx = this.innerText.slice(1, -1).replaceAll(',', "-");
        $(".kpactive span[adm-data='" + indx + "']").addClass('admactive');

    });
};

function oadmHighlight() {
    const els = $('#shreg table td.shrhl');
    var v = [];
    els.each(function() {
        var w = JSON.parse('[' + this.innerText.slice(1, -1) + ']');
        v = _.concat(v, w)
    });
    $("#shreg .kpactive:nth(3) .oadmactive").removeClass('oadmactive');
    $("#shreg .ovalak .oadmactive").removeClass('oadmactive');
    $("#shreg .kpactive:nth(3) span[ov-data='" + v.toString().replaceAll(',', "-") + "']").addClass('oadmactive');
    $("#shreg .ovalak span[ov-data='" + v.toString().replaceAll(',', "-") + "']").addClass('oadmactive');
};

function shrHighlight() {
    const els = $('#shreg table td.shrhl');
    var v = [];
    els.each(function() {
        var w = JSON.parse('[' + this.innerText.slice(1, -1) + ']');
        v = _.concat(v, w)
    });
    $("#shreg span.deractive").removeClass('deractive');
    $("#shreg .kpactive:nth(3) .oadmactive").removeClass('oadmactive');
    $("#shreg .ovalak .oadmactive").removeClass('oadmactive');
    $("#shreg span[der-data=" + v.toString().replaceAll(',', "-") + "]").addClass('deractive');
    $("#shreg .kpactive:nth(3) span[ov-data='" + v.toString().replaceAll(',', "-") + "']").addClass('oadmactive');
    $("#shreg .ovalak span[ov-data='" + v.toString().replaceAll(',', "-") + "']").addClass('oadmactive');
    admHighlight();
};

function kpHighlight(v) {
    if (osszesk)
        $("#shreg span.kpactive").removeClass('kpactive');
    $("#shreg span[kp-data=" + v.toString().replaceAll(',', "-") + "]").addClass('kpactive');
    admHighlight();
    oadmHighlight();
};

function shrk(e) {
    $(e).parent().parent().find('tr td.shrhl').removeClass('shrhl');
    $(e).parent().parent().find('tr td.shrhlnu').removeClass('shrhlnu');
    $(e).addClass('shrhl');
    $(e).next('td').addClass('shrhlnu');
    shrHighlight();
};

function shrkn(e) {
    $(e).parent().parent().find('tr td.shrhl').removeClass('shrhl');
    $(e).parent().parent().find('tr td.shrhlnu').removeClass('shrhlnu');
    $(e).addClass('shrhlnu');
    $(e).prev('td').addClass('shrhl');
    shrHighlight();
};

function id2tgl(id) {
    var elem = document.getElementById(id);
    $(elem).toggle();
    var indx = id.toString().slice(3) * 1;
    if (dkpts[indx] == "none") {
        dkpts[indx] = "inline";
    } else {
        dkpts[indx] = "none";
    }
};

function regshbontas() {
    var a = kiszed_gd('ad');
    const A = a.length;
    const N = document.getElementById('nd').value * 1;
    var eloj = "";
    var kotj = " + "
    if (N % 2 == 1) {
        eloj = " − ";
        kotj = " − "
    };
    var k = document.querySelector('#kd').value;
    if (!k.startsWith("[")) {
        k = "[" + k;
    }
    if (!k.endsWith("]")) {
        k = k + "]";
    };

    try {
        k = JSON.parse(k);
        if (k.some(v => v < 0)) {
            setfigy("Az <b>a</b> vektor nem tartalmazhat negatív elemet! " + '<span class="outhiba"><b>a</b> = (' + k + ')</span>', "figyshr");
        }
    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + k + '</span>', "figyshr");
    };
    const n = k.length;
    if (osszesk) {
        var keplet = "(-1)<sup>n</sup>" + formazottSum("&sum;<b>k</b>=n, |<b>k</b>|=|<b>a</b>|", -1.6) + drawAngel("<b>a</b>+<b>k</b>", "<b>1</b>+<b>k</b>") + " = " + "(-1)<sup>" + N + "</sup>" + formazottSum("&sum;<b>k</b>=" + N + ", |<b>k</b>|=" + A, -1.6) + drawAngel("<b>a</b>+<b>k</b>", "<b>1</b>+<b>k</b>") + ' = ' + eloj + formazottSum("&sum;<b>k</b>=" + N + ", |<b>k</b>|=" + A, -1.6);
        for (var j = 0; j < A; j++) {
            keplet += drawAngel(a[j] + "+k<sub>" + (j + 1) + "</sub>", "1+k<sub>" + (j + 1) + "</sub>") + " &bullet; ";
        }
        keplet = keplet.slice(0, -9);
        keplet += "<span style='display:inline-block;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#fffd9f;border-radius: 4px;' onclick='id2tgl(\"kpt1\");'>=<span style='margin:0 .5em;opacity:0.4;font-size: 80%'>" + drawAngel(a[0] + "+<span style='color:" + COLORS[0] + ";font-weight700;text-decoration:underline;'>" + k[0] + "</span>", "1+<span style='color:" + COLORS[0] + ";font-weight700;text-decoration:underline;'>" + allcomp0[0][0] + "</span>") + " &bullet;</span>...</span> <span style='display:" + dkpts[1] + ";' id='kpt1'>" + eloj;
        comp0(N, A)
        var szamlalo = 0;
        for (let k of allcomp0) {
            const color = COLORS[szamlalo];
            keplet += "<span class='kpblokk' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k.toString().replaceAll(",", "-") + "'>"
            for (var j = 0; j < A; j++) {
                keplet += drawAngel(a[j] + "+<span style='color:" + color + ";font-weight700;text-decoration:underline;'>" + k[j] + "</span>", "1+<span style='color:" + color + ";font-weight700;text-decoration:underline;'>" + k[j] + "</span>") + " &bullet; ";
            };
            szamlalo++;
            keplet = keplet.slice(0, -9);
            keplet += "</span>" + kotj;
        };
        keplet = keplet.slice(0, -3);
        keplet += "</span><span style='display:inline-block;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#fffd9f;border-radius: 4px;' onclick='id2tgl(\"kpt2\");'>=<span style='margin:0 .5em;opacity:0.4;font-size: 80%'>" + drawAngel(a[0] + k[0], 1 + allcomp0[0][0] + "</span>") + " &bullet;</span>...</span> <span style='display:" + dkpts[2] + ";' id='kpt2'>" + eloj;
        szamlalo = 0;
        for (let kk of allcomp0) {
            const color = COLORS[szamlalo];
            keplet += "<span class='kpblokk' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + kk.toString().replaceAll(",", "-") + "'>"
            for (var j = 0; j < A; j++) {
                keplet += drawAngel(a[j] + kk[j], 1 + kk[j]) + " &bullet; ";
            };
            szamlalo++;
            keplet = keplet.slice(0, -9);
            keplet += "</span>" + kotj;
        };
        keplet = keplet.slice(0, -3);
        keplet += "</span><span style='display:inline-block;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#fffd9f;border-radius: 4px;' onclick='id2tgl(\"kpt3\");'>=<span style='margin:0 .5em;opacity:0.4;font-size: 80%'>[ ]&bullet;[ ]&bullet;</span>...</span> <span style='display:" + dkpts[3] + ";' id='kpt3'>" + eloj;
        szamlalo = 0;
        for (let k2 of allcomp0) {
            const color = COLORS[szamlalo];
            keplet += "<span class='kpblokk ov' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k2.toString().replaceAll(",", "-") + "'>"
            for (var j = 0; j < A; j++) {
                keplet += "[" + htmlAdmissible(a[j] + k2[j], 1 + k2[j]) + "] &bullet; ";
            };
            szamlalo++;
            keplet = keplet.slice(0, -9);
            keplet += "</span>" + kotj;
        };
        keplet = keplet.slice(0, -3);
        keplet += "</span><span style='display:inline-block;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#fffd9f;border-radius: 4px;' onclick='id2tgl(\"kpt4\");'>=<span style='margin:0 .5em;opacity:0.4;font-size: 80%'>4&lowast;(2,3,... ) +</span>...</span> <span style='display:" + dkpts[4] + ";' id='kpt4'>" + eloj;
        szamlalo = 0;
        for (let k3 of allcomp0) {
            const color = COLORS[szamlalo];
            keplet += "<span class='kpblokk ov' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k3.toString().replaceAll(",", "-") + "'>"
            var L = [];
            for (var j = 0; j < A; j++) {
                L.push(Admissible(a[j] + k3[j], 1 + k3[j]));
            };
            szamlalo++;
            keplet += htmlmConc(L, false, kotj);
            keplet += "</span>" + kotj;
        };
        keplet = keplet.slice(0, -3);
        keplet += "</span><span style='display:inline;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#fffd9f;border-radius: 4px;' onclick='id2tgl(\"kpt5\");'>=</span><span id='kpt5' class='ovalak'style='display:" + dkpts[5] + ";text-decoration:underline;text-underline-offset:7px;'>" + eloj;
        for (let k3 of allcomp0) {
            var L = [];
            for (var j = 0; j < A; j++) {
                L.push(Admissible(a[j] + k3[j], 1 + k3[j]));
            };
            keplet += htmlmConc(L, true, kotj) + " + ";
        };
        keplet = keplet.slice(0, -3);
        keplet += "</span>";
    } else {
        var keplet = "";
        keplet += eloj;
        comp0(N, A)
        const szamlalo = document.getElementById("lepeskijelzo").value * 1 - 1;
        const color = COLORS[szamlalo];
        console.log(szamlalo);
        keplet += "<span class='kpblokk' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k.toString().replaceAll(",", "-") + "'>"
        for (var j = 0; j < A; j++) {
            keplet += drawAngel(a[j] + "+<span style='color:" + color + ";font-weight700;text-decoration:underline;'>" + k[j] + "</span>", "1+<span style='color:" + color + ";font-weight700;text-decoration:underline;'>" + k[j] + "</span>") + " &bullet; ";
        };
        keplet = keplet.slice(0, -9);
        keplet += "</span>" + kotj;

        keplet = keplet.slice(0, -3);
        keplet += " = " + eloj;

        keplet += "<span class='kpblokk' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k.toString().replaceAll(",", "-") + "'>"
        for (var j = 0; j < A; j++) {
            keplet += drawAngel(a[j] + k[j], 1 + k[j]) + " &bullet; ";
        };
        keplet = keplet.slice(0, -9);
        keplet += "</span>" + kotj;

        keplet = keplet.slice(0, -3);
        keplet += " = " + eloj;

        keplet += "<span class='kpblokk ov kpactive' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k2.toString().replaceAll(",", "-") + "'>"
        for (var j = 0; j < A; j++) {
            keplet += "[" + htmlAdmissible(a[j] + k[j], 1 + k[j]) + "] &bullet; ";
        };
        keplet = keplet.slice(0, -9);
        keplet += "</span>" + kotj;
        keplet = keplet.slice(0, -3);
        keplet += " = " + eloj;

        keplet += "<span class='kpblokk ov kpactive' style='background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k3.toString().replaceAll(",", "-") + "'>"
        var L = [];
        for (var j = 0; j < A; j++) {
            L.push(Admissible(a[j] + k[j], 1 + k[j]));
        };
        keplet += htmlmConc(L, false, kotj);
        keplet += "</span>" + kotj;

        keplet = keplet.slice(0, -3);
        keplet += "= <span class='ovalak'style='text-decoration:underline;text-underline-offset:7px;'>" + eloj;

        var L = [];
        for (var j = 0; j < A; j++) {
            L.push(Admissible(a[j] + k[j], 1 + k[j]));
        };
        keplet += htmlmConc(L, true, kotj) + " + ";
        keplet = keplet.slice(0, -3);
        keplet += "</span>";
    }

    var out = "";
    for (var i = 0; i < n; i++) {
        out += "<table class='shregtbl'><tr><th>A(" + (a[i] + k[i]) + "," + (k[i] + 1) + ")</th><th>&nu;( )</th></tr>"
        var c = comp(a[i] + k[i], k[i] + 1).filter(y => y[0] > 1 || y.every(v => v == 1));
        for (var j = 0; j < c.length; j++) {
            var w = c[j];
            var nu = _.takeRightWhile(w, y => y == 1).length + 1;
            if (w.every(v => v == 1))
                nu = 1;
            var cls = "";
            var clsnu = "";
            if (j == 0) {
                cls = "class='shrhl' ";
                clsnu = "class='shrhlnu' ";
            }
            out += "<tr><td " + cls + "onclick='shrk(this)'>(" + w.toString() + ")</td><td " + clsnu + "onclick='shrkn(this)'>" + nu + "</td></tr>";
        }
        out = out.slice(0, -1);
        out += "</table><span style='display:inline-block;width:10px;'></span>";
    };
    document.getElementById('shrtables').innerHTML = out;
    document.getElementById('shrkeplet').innerHTML = keplet;
    shrHighlight();
    kpHighlight(k);
    const be = document.querySelector('#kd');
    const act = document.querySelector('.kpactive')
    const clr = act.style.outlineColor;
    var bclr = act.style.outlineColor;
    bclr = "rgba(" + bclr.slice(4, -1) + ", 0.25)";
    be.style.outlineColor = clr;
    be.style.backgroundColor = bclr;

};

var shrbindx = 0;

function shrugrik(e, indx) {
    const be = document.querySelector('#kd');
    const nn = allcompReg.length;
    if (indx > 0 && indx < nn + 1) {
        shrbindx = indx - 1;
        const v = allcompReg[shrbindx].toString();
        be.value = v;
        regshbontas();
    } else {
        e.value = ("☹");
    };
};

function shrleptet(b) {
    const be = document.querySelector('#kd');
    const L = allcompReg.length;
    if (b) {
        if (shrbindx > 0)
            shrbindx--;
        else
            shrbindx = L - 1;
    } else {
        if (shrbindx < L - 1)
            shrbindx++;
        else
            shrbindx = 0;
    }
    const v = allcompReg[shrbindx].toString();
    be.value = v;
    document.getElementById('lepeskijelzo').value = shrbindx + 1;
    regshbontas();
};

function Admissible(n, k) {
    var out = [];
    if (n == k)
        out.push([1, Array(n).fill(1)]);
    else {
        comp(n, k);
        const adm = allcomp.filter(y => y[0] > 1 || y.every(v => v == 1))
        for (let w of adm) {
            var nu = (_.takeRightWhile(w, y => y == 1).length + 1);
            if (w.every(v => v == 1))
                nu = 1;
            out.push([nu, w])
        }
    };
    return out;
};

function htmlAdmissible(n, k) {
    var out = "";
    const A = Admissible(n, k);
    for (let a of A) {
        var m = a[0]
        if (m == 1)
            m = "";
        else
            m += "&lowast;";
        var w = a[1].toString();

        out += "<span adm-data='" + w.replaceAll(",", "-") + "'>" + m + "(" + w + ")</span> + ";
    };
    out = out.slice(0, -3);
    return out;
};

function mconc(ov, m1, m2) {
    var out = [];
    if (m2 == undefined)
        m2 = [
            [1, []]
        ];
    for (let x of m1) {
        for (let y of m2) {
            out.push([x[0] * y[0], _.concat(x[1], y[1])])
        }
    }
    if (ov) {
        var out1 = _.groupBy(out, y => y[1]);
        out1 = _.mapValues(out1, y => _.sum(y.map(z => z[0])));
        out = [];
        _.forEach(out1, function(value, key) {
            out.push([value * 1, JSON.parse("[" + key + "]")]);
        });
    };
    return out;
};

function mConc(M, ov) {
    const m = M.length;
    var out = mconc(false, M[0], M[1]);
    for (i = 2; i < m; i++) {
        out = mconc(false, out, M[i])
    }
    if (ov) {
        var out1 = _.groupBy(out, y => y[1]);
        out1 = _.mapValues(out1, y => _.sum(y.map(z => z[0])));
        out = [];
        _.forEach(out1, function(value, key) {
            out.push([value * 1, JSON.parse("[" + key + "]")]);
        });
    };
    return out;
};

function htmlmConc(M, ov, eloj) {
    var out = "";
    const A = mConc(M, ov);
    for (let a of A) {
        var m = a[0]
        if (m == 1)
            m = "";
        else
            m += "&lowast;"
        const w = a[1].toString();
        out += "<span ov-data='" + w.replaceAll(",", "-") + "'>" + m + "(" + w + ")</span>" + eloj;
    };
    out = out.slice(0, -3);
    return out;
};

function drawAngel(n, k) {
    return "<span style='display:inline-block;vertical-align: middle'><span style='display:inline-block;transform: scaleY(2.7) scaleX(1.6) translateY(0.05em);'>&LeftAngleBracket;</span><table style='display:inline-table;border-collapse: collapse;margin: 0 5px;'><tr><td>" + n + "</td></tr><tr><td>" + k + "</td></tr></table><span style='display:inline-block;transform: scaleY(2.7) scaleX(1.6) translateY(0.05em);'>&RightAngleBracket;</span></span>";
};

function formazottSum(indx, m) {
    return '<span style="display:inline-block;vertical-align: ' + m + 'em;text-align:center;margin-right: -0.2em;margin-left:-1em;line-height:normal;"><table class="tort" style="border-collapse: collapse;margin: 0 3px;"><tr><td><span style="transform: scaleX(3) scaleY(2);display: inline-block;">&sum;</span></td></tr><tr><td style="font-size: 75%;padding-top: 0.7em;">' + indx + '</td></tr></table></span>'
}

function cegyutthshr(j) {
    var sum = 0;
    for (let y of it) {
        sum += komb(nnn, y);
    }
    if (j % 2 == 0) {
        if (sum == 0)
            sum = "";
        else if (sum == 1) {
            sum = "(" + c_sor.map(y => y + 1).toString() + ") + ";
        } else
            sum += "&lowast;(" + c_sor.map(y => y + 1).toString() + ") + ";
    } else {
        if (sum == 0)
            sum = "";
        else if (sum == 1) {
            sum = "(" + c_sor.map(y => y + 1).toString() + ") − ";
        } else
            sum += "&lowast;(" + c_sor.map(y => y + 1).toString() + ") − ";
    }
    return sum;
};

function eshuffshr(j) {
    const maxa = _.max(a_sor);
    const maxb = _.max(b_sor);
    const maxab = maxa + maxb + 1;
    var cek = comp0(sumab, nnn);
    cek = cek.filter(y => y.every(v => v < maxab));
    var LL = "";

    for (let c of cek) {
        c_sor = c;
        LL += cegyutthshr(j);
    }
    if (j % 2 == 1)
        LL = " − " + LL;
    return LL;
};

function shuff_shr(n) {
    var shn = "";
    for (var j = 0; j <= n; j++) {
        var sh = "";
        var meret = 0;;
        var a_sor0 = Array(j).fill(1);
        if (j < n)
            var b_sor0 = _.concat(Array(n - j).fill(1), kiszed_sh("ad"));
        else
            var b_sor0 = kiszed_sh("ad");

        a_sor = [...a_sor0.map(y => y - 1)];
        b_sor = [...b_sor0.map(y => y - 1)];

        if (a_sor == undefined || b_sor == undefined)
            sh = "HIBA";
        else if (a_sor.length == 0) {
            sh = "( )<span style='font-size:1.5em;'>&#x29E2;</span>(" + b_sor.map(y => y + 1) + ") = (" + b_sor.map(y => y + 1) + ")";
            sh = "<div class='meretshr'> <b style='padding:0 5px;'> j =" + j + "</b>: Az összeg <b>1</b> tagból áll.</div>" + sh;
        } else {
            sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
            kk = a_sor.length;
            nnn = kk + b_sor.length;
            meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
            if (meret < 150000000) {
                it = Choose(nnn, kk);
                sh = eshuffshr(j);
                if (sh == "")
                    sh = "Nem megfelelő bemenet"
                else {
                    var elojel = "";
                    if (j % 2 == 1)
                        elojel = "−";
                    sh = "(-1)<sup>" + j + "</sup>&lowast;(" + a_sor0.toString() + ")<span style='font-size:1.5em;'>&#x29E2;</span><sub>&lowast;</sub>(" + b_sor0.toString() + ") = " + elojel + "[(" + a_sor0.toString() + ")ˇ<span style='font-size:1.5em;'>&#x29E2;</span>(" + b_sor0.toString() + ")ˇ]^ = " + elojel + "[(" + a_sor.toString() + ")<span style='font-size:1.5em;'>&#x29E2;</span>(" + b_sor.toString() + ")]^ =<br/>= " + sh;
                    if (j % 2 == 0)
                        var db = sh.match(/ \+ /g).length;
                    else
                        var db = sh.match(/ − /g).length - 1;
                    sh = sh.slice(0, -3)
                    sh = "<div class='meretshr'> <b style='padding:0 5px;'> j =" + j + "</b>: Az összeg <b>" + db + "</b> tagból áll.</div>" + sh;
                }
            } else {
                sh = "<div class='meretshr'>A számítás mérete: <b>" + meret + "</b>  meghaladja a maximálisan megengedett 150 000 000-t</div>";
            }
        };
        shn = shn + sh;
    };
    return shn;
};

function shuffleReg(s) {
    return genDual(s).map(y => [y[0], dualofv(y[1])]);
};

function setAllk(e) {
    osszesk = !e.checked;
}

function reg_shuff() {
    const osszevet = document.getElementById('setshr').checked;
    const mivel = document.getElementById('shrvallaszto').checked;
    const elem = document.getElementById('shreg');
    var s = kiszed_gd('ad');
    const r = s.length;
    const n = document.getElementById('nd').value * 1;
    for (var j = 0; j < n; j++)
        s.unshift(1);
    const de = genDual(s);

    var dtxt = 'reg<sub><span style="font-size:larger;">&#x29E2;</span></sub>(' + s.toString() + ') = ';
    for (let v of de) {
        var c = v[0];
        var ertek = dualofv(v[1]).toString();
        if (c == -1)
            c = " −<span der-data='" + ertek.replaceAll(",", "-") + "'>";
        else if (c == 1)
            c = " +<span der-data='" + ertek.replaceAll(",", "-") + "'>";
        else if (c > 1)
            c = " +<span der-data='" + ertek.replaceAll(",", "-") + "'>" + c + "&lowast;";
        else if (c < 1)
            c = " −<span der-data='" + ertek.replaceAll(",", "-") + "'>" + Math.abs(c) + "&lowast;";
        if (v[1] != "")
            dtxt += c + "(" + ertek + ")</span>";
    };


    dtxt = dtxt.replaceAll("=  +", "= ");
    if (osszevet) {
        if (!mivel) {
            shrbindx = 0;
            var k = _.first(comp0(n, r));
            allcompReg = [...allcomp0];
            var check = "";
            if (!osszesk)
                check = "checked";
            var tables = "<hr/><div><label for='setallk' style='font-size: 80%;'>Csak a kiválasztott k értékre</label><input type='checkbox' name='setallk' id='setallk' oninput='setAllk(this);reg_shuff();' " + check + " style='height:20px;width:20px;vertical-align:middle;'></div><div id='shrkeplet'></div><div style='border-top:1px solid #a2a2a2;margin:10px 0;padding-top:10px;'><label for='fbs'><b style='padding: 2px 7px;'>k</b> =&nbsp; </label><input class='inpvec' type='text' readonly='true' id='kd' value='" + k.toString() + "' name='kd' style='margin-right:10px;outline:2px solid;outline-offset:4px'><span class='lepteto' onclick='shrleptet(false);' style='display:inline-block;padding:5px 5px 5px 7px;border:1px solid #a1a1a1;border-radius:50%;width:20px;height:20px;text-align: center;vertical-align:baseline;cursor:pointer;font-size:20px;line-height: 20px;user-select: none;'>&#x25b6</span><span class='lepteto' onclick='shrleptet(true);' style='display:inline-block;padding:5px 7px 5px 5px;margin-left:10px;margin-right:10px;border:1px solid #a1a1a1;border-radius:50%;width:20px;height:20px;text-align: center;vertical-align:baseline;cursor:pointer;font-size:20px;line-height: 20px;user-select: none;'>&#x25c0</span><input id='lepeskijelzo' value='1' type='text' onchange='shrugrik(this,this.value);' style='width: 30px;border:none;font-size:18px;text-align:right;font-family:Times New Roman;background-color: inherit;border-bottom: 1px solid #828282;margin-left:5px;' />/<span id='lepesall' style='display:inline-block;min-width:35px;font-size:18px;'>" + allcompReg.length + "</span></div><div id='shrtables'></div>"
            dtxt = dtxt + tables;
            elem.innerHTML = dtxt;
            regshbontas();
            return;
        } else {
            dtxt = dtxt + "<hr/>" + shuff_shr(n);
        }
    };
    elem.innerHTML = dtxt;
};

// double shuffle relation 

function kiszed_dbl(id, figy) {
    var av = document.getElementById(id).value;
    const elem = document.getElementById(id);
    if (pat.test(av)) {
        setfigy("Valamelyik ∞ jel hibás:" + '<span class="outhiba">' + av + '</span>', "figysh");
        elem.innerHTML = "";
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
        if (av.some(v => v < 1)) {
            setfigy("Az <b>a</b>, illetve <b>b</b>  indexvektor csak pozitív elemeket tartalmazhat! " + '<span class="outhiba"><b>index</b> = (' + av + ')</span>', figy);
            elem.innerHTML = "";
            return;
        };
        if (indx > -1) {
            av = oo2strInf(av);
            setfigy('Egyik indexvektor sem tartalmazhat ∞-t! ' + '<span class="outhiba"> <b>a</b> = (' + av + ')</span>', figy);
            elem.innerHTML = "";
            return;
        }
        if (id == "bvg" && indx > -1)
            av = oo2Inf(av);

    } catch (error) {
        setfigy("Hibás bemenet: " + '<span class="outhiba">' + av + '</span>', figy);
        elem.innerHTML = "";
        return;
    };
    return av;
};

function okshSet(e) {
    const st = e.checked;
    const btn = document.getElementById("okshst");
    if (st)
        btn.innerHTML = "<span style='margin:0 5px;'>&lowast;</span>";
    else
        btn.innerHTML = '<span style="margin:0 3px;font-size:160%;line-height:0.4;text-decoration:underline;"><span style="margin:0 3px;">&#x29E2;</span></span>';
};

function clearDbl() {
    const elem = document.querySelector("#shoutdbl");
    elem.innerHTML = "";
    if ($('#ideout1 .sagecell_sessionOutput pre') != undefined)
        $('#ideout1 .sagecell_sessionOutput pre').text("")
};

function setOutputFont9(v) {
    var elem = document.getElementById("shoutr");
    elem.style.fontSize = v + 'px';
};

function setOutputFont10(v) {
    var elem = document.getElementById("shoutdbl");
    elem.style.fontSize = v + 'px';
};

function stuffle(a, b) {
    var s = [];
    if (a.length == 0)
        s = [b];
    else if (b.length == 0)
        s = [a];
    else {
        for (let y of stuffle(a.slice(1), b))
            s.push(_.concat([a[0]], y));
        for (let x of stuffle(a, b.slice(1)))
            s.push(_.concat([b[0]], x));
        for (let u of stuffle(a.slice(1), b.slice(1)))
            s.push(_.concat([a[0] + b[0]], u));
    };

    return s;
};

function cegyutthr() {
    var sum = 0;
    for (let y of it) {
        sum += komb(nnn, y);
    }
    const cc = c_sor.map(y => y + 1);
    if (sum == 0)
        sum = "";
    else if (sum == 1) {
        sum = "(" + cc.toString() + ") + ";
    } else {
        sum += "&lowast;(" + cc.toString() + ") + ";
    }
    return sum;
};

function eshuffr() {
    const maxa = _.max(a_sor);
    const maxb = _.max(b_sor);
    const maxab = maxa + maxb + 1;
    var cek = comp0(sumab, nnn);
    cek = cek.filter(y => y.every(v => v < maxab));
    var LL = "";

    for (let c of cek) {
        c_sor = c;
        LL += cegyutthr();
    }
    return LL;
};

function rshuff() {
    const elem1 = document.getElementById("figyshst");
    elem1.innerHTML = "";
    const elem = document.getElementById("shoutr");
    a_sor = kiszed_dbl("avli", "figyshst");
    b_sor = kiszed_dbl("bvli", "figyshst");
    const a0 = a_sor;
    const b0 = b_sor;
    if (a_sor !== undefined && b_sor != undefined) {
        a_sor = a_sor.map(y => y - 1);
        b_sor = b_sor.map(y => y - 1);
    }
    var sh, meret;
    if (a_sor == undefined || b_sor == undefined)
        sh = "HIBA";
    else if (a_sor.length + b_sor.length == 0)
        sh = "( )&#x29E2;( ) = ( )";
    else if (a_sor.length == 0)
        sh = "( )&#x29E2;(" + b0 + ") = (" + b0 + " )";
    else if (b_sor.length == 0)
        sh = "(" + a0 + ")&#x29E2;( ) = (" + a0 + ")";
    else {
        sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
        kk = a_sor.length;
        nnn = kk + b_sor.length;
        meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
        if (meret < 150000000) {
            it = Choose(nnn, kk);
            sh = eshuffr();
            if (sh == "")
                sh = "Nem megfelelő bemenet"
            else {
                sh = "(" + a0.toString() + ") <span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span> (" + b0.toString() + ") = " + sh;
                sh = sh.slice(0, -3)
            }
        } else {
            sh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b>  meghaladja a maximálisan megengedett 150 000 000-t</div>";
        }
    };
    elem.innerHTML = sh;
};

function cegyutths() {
    var sum = 0;
    for (let y of it) {
        sum += komb(nnn, y);
    }
    const cc = c_sor.map(y => y + 1);
    if (sum > 0) {
        return [sum, cc];
    }
};

function eshuffs() {
    const maxa = _.max(a_sor);
    const maxb = _.max(b_sor);
    const maxab = maxa + maxb + 1;
    var cek = comp0(sumab, nnn);
    cek = cek.filter(y => y.every(v => v < maxab));
    //var out = [];
    var out = {};

    for (let c of cek) {
        c_sor = c;
        var be = cegyutths();
        if (be)
            out[be[1].toString()] = be[0];
    }
    return out;
};

function objDiff(obja, objb) {
    _.mergeWith(obja, objb, function(a, b) {
        kul = (a || 0) * 1 - (b || 0) * 1;
        return kul;
    })
    return _.omitBy(obja, y => y == 0);
};

function diffReg(a, b) {
    var obja = shuffle(a, b);
    var objb = _.countBy(stuffle(a, b));
    var out = [];
    _.forEach(objDiff(obja, objb), function(value, key) {
        out.push(shuffleReg(JSON.parse("[" + key + "]")).map(y => [value * y[0], y[1]]));
    });
    out = _.groupBy(_.flatten(out), y => y[1]);
    out = _.mapValues(out, y => _.sum(y.map(z => z[0])))
    return out;
};

function shuffle(a, b) {
    a_sor = [...a];
    b_sor = [...b];
    const a0 = a_sor;
    const b0 = b_sor;
    if (a_sor !== undefined && b_sor != undefined) {
        a_sor = a_sor.map(y => y - 1);
        b_sor = b_sor.map(y => y - 1);
    }
    var sh, meret;
    if (a_sor.length + b_sor.length == 0)
        sh = [];
    else if (a_sor.length == 0)
        sh = b0;
    else if (b_sor.length == 0)
        sh = a0;
    else {
        sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
        kk = a_sor.length;
        nnn = kk + b_sor.length;
        meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
        if (meret < 150000000) {
            it = Choose(nnn, kk);
            sh = eshuffs();
        }
    };
    return sh;
};

function stuff() {
    const elem1 = document.getElementById("figyshst");
    elem1.innerHTML = "";
    const elem = document.getElementById("shoutr");
    var a = kiszed_dbl("avli", "figyshst");
    var b = kiszed_dbl("bvli", "figyshst");
    var sh = "";
    if (a == undefined || b == undefined)
        sh = "HIBA";
    else if (a.length + b.length == 0)
        sh = "( )&lowast;( ) = ( )";
    else if (a.length == 0)
        sh = "( )&lowast;(" + b + ") = (" + b + " )";
    else if (b.length == 0)
        sh = "(" + a + ")&lowast;( ) = (" + a + ")";
    else {
        const S = _.countBy(stuffle(a, b));
        /*  for (let s of S)
             sh += "(" + s.toString() + ") + "; */
        _.forEach(S, function(value, key) {
            if (value * 1 == 1)
                sh += "(" + key + ") + ";
            else if (value * 1 > 0)
                sh += value + "&lowast;(" + key + ") +";
        });
        if (sh == "")
            sh = "Nem megfelelő bemenet"
        else {
            sh = "(" + a.toString() + ") <span style='font-size:1.5em;'>&lowast;</span> (" + b.toString() + ") = " + sh;
            sh = sh.slice(0, -3)
        }
    };
    elem.innerHTML = sh;
};

function rshtuff() {
    const st = document.getElementById('shst').checked;
    if (st)
        stuff();
    else
        rshuff();
};

function dblshuff() {
    clearDbl();
    const elem1 = document.getElementById("figyshdbl");
    elem1.innerHTML = "";
    const elem = document.getElementById("shoutdbl");
    const t = document.getElementById("tdbl").value * 1000;
    a_sor = kiszed_dbl("adbl", "figyshdbl");
    b_sor = kiszed_dbl("bdbl", "figyshdbl");
    var a0 = a_sor;
    var b0 = b_sor;
    if (a_sor !== undefined && b_sor != undefined) {
        a_sor = a_sor.map(y => y - 1);
        b_sor = b_sor.map(y => y - 1);
    };
    var sh = "",
        txt = "",
        meret;
    if (a_sor == undefined || b_sor == undefined)
        txt = "HIBA";
    else if (a_sor.length == 0 || b_sor.length == 0)
        txt = "&zeta;( )";
    else {
        sumab = a_sor.reduce((x, y) => x + y, 0) + b_sor.reduce((x, y) => x + y, 0);
        kk = a_sor.length;
        nnn = kk + b_sor.length;
        meret = binomial(sumab + nnn - 1, nnn - 1) * binomial(nnn, kk);
        if (meret < 150000000) {
            const shst = diffReg(a0, b0)
            sh = "gp(\"";
            _.forEach(shst, function(value, key) {
                if (value * 1 == 1)
                    sh += "-zetamult([" + key + "])";
                else if (value * 1 > 0)
                    sh += String(-1 * value) + "*zetamult([" + key + "])";
                else if (value * 1 < 0)
                    sh += "+" + String(-1 * value) + "*zetamult([" + key + "])";
            });
            sh += "\")";
        } else {
            sh = "<div class='meret'>A számítás mérete: <b>" + meret + "</b>  meghaladja a maximálisan megengedett 150 000 000-t</div>";
        }
    };
    if (a_sor != undefined && b_sor != undefined) {
        sh = sh.replace("+-", "-");
        txt += sh.slice(4, -2);
        txt = txt.replaceAll("1*", "")
        txt = txt.replaceAll("zetamult([", "&zeta;(");
        txt = txt.replaceAll("])", ")").replaceAll("+", " + ").replaceAll("-", " − ").replaceAll("*", "&lowast;")
        txt = "<span style='font-size:130%;font-weight: 700;margin-right:3px;'>&zeta;</span><span class='paren'>[</span>reg<sub>&#x29E2;</sub><span style='display: inline-block;transform-origin: center;transform: scale(1.2, 1.4);padding: 0 2px;'>(</span>(" + a0.toString() + ") <span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span> (" + b0.toString() + ")" + " − (" + a0.toString() + ") <span style='font-size:1.3em;'>&lowast;</span> (" + b0.toString() + ")<span style='display: inline-block;transform-origin: center;transform: scale(1.2, 1.4);padding: 0 2px;'>)</span><span class='paren'>]</span> = " + txt;
        txt = txt.replace("=  +", "=")
    }

    elem.innerHTML = txt;
    if (a_sor != undefined && b_sor != undefined && a_sor.length != 0 && b_sor.length != 0) {
        $('#mycell1 .sagecell_editor textarea.sagecell_commands').val(sh);
        $('#mycell1 .sagecell_input button.sagecell_evalButton').click();
        $('div.sagecell_sessionOutput').css('font-size', '22px');
        var ra = setInterval(() => {
            valasz = $('#ideout1 .sagecell_sessionOutput pre').text();
            if (valasz != "") {
                clearInterval(ra);
                clearInterval(to);
                elem.innerHTML = elem.innerHTML + " = <span style='color:red;font-weight:700;'>" + valasz + "</span>";
            }
        }, 50);
        var to = setTimeout(() => {
            clearInterval(ra);
            elem.innerHTML = elem.innerHTML + " &rightarrow; <span style='color:red;font-weight:700;'>A válasz " + t / 1000 + " sec alatt nem érkezett meg.</span>";
        }, t)
    }
};
