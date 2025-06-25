// poset of compositions
var ra = undefined;
var cN = 1;

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
    //return set2digit(kum(c), n);
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
    var elem = document.getElementById("derivJ");
    elem.style.fontSize = v + '%';

    $('.tsorszam-s').width(20);
    $('.tsorszam-s').width(($('.tsorszam-s').parent('div').width() - 10) / cN);
};

function cdat(el, s, o) {
    $('.tgomb.hl').html('&#x25CB;');
    $('.tgomb.hl').removeClass('hl');
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
    $('.tsorszam-w').css("visibility", "hidden");
    $('.tsorszam-w.corr').html($('.tsorszam-w.corr').attr('data-n'));
    $('.tsorszam-w.corr').removeClass('corr');
    var d = 0;
    if (barg && aarg)
        d = 1;
    if (aarg == barg) {
        for (var t = 1 - d; t <= s + Math.floor(s / (r + 1)); t++)
            $('.tsorszam-w:nth(' + t + ')').css("visibility", "visible");
        if (s == r + 1)
            $('.tsorszam-w:nth(' + (s) + ')').html(1).addClass("corr");
        else
            $('.tsorszam-w:nth(' + (s) + ')').html(o).addClass("corr");
    }

    $('.tsorszam-e').css("visibility", "hidden");
    $('.tsorszam-e.corr').html($('.tsorszam-e.corr').attr('data-n'));
    $('.tsorszam-e.corr').removeClass('corr');
    for (var t = s - 1; t < r + Math.floor(s / (r + 1)); t++)
        $('.tsorszam-e:nth(' + t + ')').css("visibility", "visible");
    $('.tsorszam-e:nth(' + (s - 1) + ')').html(h[0]).addClass("corr");

    $('.tsorszam-s').css("visibility", "hidden");
    if (aarg != barg) {
        const ce = conjugate(e);
        if (!aarg)
            $('.tsorszam-s:nth(0)').css("visibility", "visible").html(0);
        for (var t = 0; t < ce.length; t++)
            $('.tsorszam-s:nth(' + (t + 1) + ')').css("visibility", "visible").html(ce[t]);
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
    keplet = "Li<sub>(" + h + ")</sub>(" + aargtxt + ")&lowast;Li<sub>(" + bv + ")</sub>(" + bargtxt + ")";
    keplet = keplet.replaceAll("<sub>(( ))</sub>", "<sub>( )</sub>");
    const elem = document.getElementById("cintkeplet");
    elem.innerHTML = keplet;
};

function cdatUPD() {
    const elem = $('.tgomb.hl');
    if (elem)
        elem.trigger('click');
};

function ribbonGraph() {
    const elem = document.getElementById("derivJ");
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
    kep += "<th style='width:21.36px'></th></th></tr></thead>";
    for (var j = 0; j < r; j++) {
        kep += "<tr><th><span class='tsorszam-w' data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div>";
        for (var t = 0; t < k[j]; t++) {
            kep += "<span class='tgomb' style='visibility:hidden;'>&#x25CB;</span> ";
        };
        for (var t = k[j]; t < k[j] + c[j]; t++) {
            kep += "<span class='tgomb shown' onclick='cdat(this," + ((j + 1) + "," + (t - k[j] + 1)) + ")'>&#x25CB;</span> ";
        };
        kep += "</div></td><th><span class='tsorszam-e'  data-n='" + c[j] + "'>" + c[j] + "</span></th>";
    };
    kep += "<tr><th><span class='tsorszam-w' data-n='1' >1</span></th><td><div>";
    var L = _.last(k) + _.last(c);
    for (var t = 0; t < L - 1; t++)
        kep += "<span class='tgomb' style='visibility:hidden;'>&#x25CB;</span> ";
    kep += "<span class='tgomb shown' style='background-color:#d5d5d5;border-radius: 50%;padding: 0 0.31em;margin-left: -0.31em;' onclick='cdat(this," + (r + 1) + "," + L + ")'>&#x25CB;</span></div></td><th><span class='tsorszam-e' data-n='( )'>( )</span></th>";
    kep += "</tr><tr><th><span class='tsorszam-s' data-n='0' style='color:red;'>0</span></th><th><div style='margin-left:-0.3em'>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-s' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "</div></th><th style='width:21.36px'></th></tr></table>";
    kep += "<div id='cintkeplet'></div>"
    elem.innerHTML = kep;
    setOutputFontintc(document.getElementById("setoutputfontintc").value);
};

function ribbonAnimate() {
    const N = $('.tgomb.shown').length;
    const t = document.getElementById("t").value * 1;
    if (N > 0) {
        var i = 0;
        ra = setInterval(() => {
            $('.tgomb.shown:nth(' + i + ')').click();
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
    //setFazis();
    setgenKepletc();
};

function setbArgc(elem) {
    barg = elem.checked;
    if (barg)
        bargtxt = "1-x";
    else
        bargtxt = "x";
    //setFazis();
    setgenKepletc();
};
