// poset of compositions

function setCard(e) {
    const $card = $(e).parent('.uitok').parent('div');
    const $cel = $card.find(".nobr");

    if ($cel.length > 0) {
        $(e).css('line-height', '1.2').html('&#8626;');
        $cel.removeClass("nobr").addClass("nobrn");

    } else {
        $(e).css('line-height', '').html('&#8677;');;
        $card.find(".nobrn").removeClass("nobrn").addClass("nobr");
    }
};

//var kivetelouts = ["outdet"]

function setkijelzoW(id, val) {
    const elem = document.getElementById(id)
    if (val == 6)
        $(elem).addClass('nobrkij').css('width', 'auto');
    else {
        $(elem).removeClass('nobrkij');
        if (val == 1) {
            elem.style.width = 'auto';
            elem.style.maxWidth = '';
        } else {
            elem.style.width = 'calc(' + val * 100 + 'vw)';
            //if (!kivetelouts.includes(id))
            elem.style.maxWidth = 'unset';
            //else
            //elem.style.maxWidth = 'calc(100vw - 24px)';
        }

    }
    const w = Math.min(4000, $(elem).width());
    elem.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
    setTimeout(() => { $(elem).parent().animate({ scrollLeft: w + 50 }, w); }, 800);
    setTimeout(() => { $(elem).parent().animate({ scrollLeft: -w - 50 }, w); }, 1200 + w);
    //setTimeout(() => { elem.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" }); }, 800);
    //setTimeout(() => { elem.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" }); }, 1800);
};

var ra = undefined;
var cN = 1;
var cN2 = 1;
var egyezes = 2;
var rfb_last = { "v": [], "deriv_path": [], "s": 0, "C": [], "Li": 0, "o": 0, "bfelett": 0 };
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
        for (var t = boszlopa; t < ce.length; t++)
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

function dualofv(v0) {
    let v = [...v0];
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

function conc(a, b) {
    return _.concat(a, b);
};

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

function Conc(L) {
    var out = [];
    for (let v of L)
        out = _.concat(out, v);
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
    var out = hatas1r(nv, mv);
    elem.innerHTML = out;
};

function hatas1r(nv, mv) {
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

// Általános slick-------------------------------------------------

function updSlickID(id, kezdolap) {
    $('#' + id).slick('unslick').html("");
    $('#' + id).append(kezdolap)
}

function goToSlick(id, n, elem) {
    $('.onslick').removeClass('onslick');
    $(elem).addClass('onslick');
    $('#' + id).slick('slickGoTo', n);
    const e = document.getElementById(id)
    e.scrollIntoView({
        behavior: "smooth",
        block: 'start'
    });
};

function goToOnSlick() {
    const e = $('.onslick')[0];
    e.scrollIntoView({
        behavior: "smooth",
        block: 'start'
    });
};

function makeSlicks(oCt, kezdolap, fulcim, id, slickid) {
    const elem = document.getElementById(id);
    updSlickID(slickid, kezdolap);
    var szamlalo = 0;
    var out = '';
    var tabs = "";
    for (let nm of oCt) {
        szamlalo++;
        var cimek = nm[2];
        var t = nm[3];
        var L = t.length;
        var dat = nm[1].match(/\((\d[\,|\)])*/)[0].slice(1, -1).replaceAll(",", "-");
        if (dat == "")
            dat = "zero";
        out += '<span onclick=goToSlick("' + slickid + '",' + szamlalo + ',this) style="cursor:pointer;" data-slk="' + dat + '">' + nm[0] + '</span>';
        tabs = "<div><h3 class='slickh3'>" + nm[1] + "</h3>";
        tabs += "<div id='my_tabs-" + szamlalo + "' class='styled_tabs'><div class='controls'><a href='#' class='control active'>" + cimek[0] + "</a>";
        for (var j = 1; j < L; j++)
            tabs += "<a href='#' class='control'>" + cimek[j] + "</a>"
        tabs += fulcim + "</div><div class='targets'>";
        for (var j1 = 0; j1 < L; j1++)
            tabs += "<div class='target'>" + t[j1] + "</div>"
        tabs += "</div></div></div>";
        $('#Li-slick').append(tabs);
        $('#my_tabs-' + szamlalo).tabs();
    };
    szamlalo++
    if (out.startsWith(' + '))
        out = out.slice(3);
    out = out.replace('()', '( )');
    slickno = szamlalo - 1;
    $('#' + slickid).slick({
        mobileFirst: true,
        //fade: true,
        speed: 500,
        arrows: false,
    });
    elem.innerHTML = out;
};

function hatas1(nv, mv) {
    var Out = [];
    var out1 = ""
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

            out1 = eloj + '<span style="display:inline-block;color:' + COLORS[k] + ';font-weight:800;background-color:#e3e3e3;padding:3px 5px;border-radius:3px;">' + clntxt + formln + '</span>';

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
            Out.unshift([out1 + outk])
        }
    }
    if (out.startsWith(' + '))
        out = out.slice(3);
    return Out;
};

function Lifbint(s) {
    oCt = [];
    const rc = ribbon_comp(s);
    const rcl = rc.slice(0, -1);
    const ss = _.sum(s);
    const d = 1 - (ss % 2);
    var szamlalo = 0;
    for (var k = 0; k < rcl.length; k++)
        oCt.push([
            ["", "", ["0", "1"],
                ["0", "1"]
            ]
        ]);
    for (let nm of rcl) {
        szamlalo++;
        var eloj = ' + ';
        if ((szamlalo + d) % 2 == 1)
            eloj = ' − ';
        var u = nm[0][0];
        var l = nm[0][1];
        var oCtk = oCt[szamlalo - 1]
        oCtk[0] = eloj + '<span style="font-weight:600;color:#d50000;">C<sub>(' + nm[1].toString() + ')</sub></span><span class="sqrt-prefix sdefint" style="transform: scaleY( 2.2) translateY(0.13em);font-weight:600;">∫</span><span style="display:inline-block;vertical-align: middle;text-align:center;font-size:90%;line-height:normal;"><table><tr><td>(' + u + ')</td></tr><tr><td>(' + l + ')</td></tr></table></span>[1]';

        oCtk[1] = eloj + "C<sub>(" + nm[1].toString() + ")</sub><button class='vissza1' onclick='goToOnSlick();'> </button>";

        oCtk[2] = [];
        oCtk[3] = [];
        var t3 = hatas1(...nm[0]);
        for (var h = 0; h < t3.length; h++) {
            oCtk[2].push(h);
            oCtk[3].push(t3[h][0]);
        };
    };
    oCt[szamlalo - 1][0] = '+<span style="font-weight:600;color:#d50000;">C<sub>(' + s.toString() + ')</sub></span>';
    oCt[szamlalo - 1][1] = "+C<sub>(" + s.toString() + ")</sub></span>";
    oCt[szamlalo - 1][3] = [];
    oCt[szamlalo - 1][3].push('<span style="display:inline-block;color:#2484c1;font-weight:800;background-color:#e3e3e3;padding:3px 5px;border-radius:3px;">ln<sup>0</sup>(x)</span>·Li<sub>( )</sub>(x)');
    makeSlicks(oCt, "<div><h3 class='slickh3'>C</h3>ln<sup>p</sup>(x)·Li<sub><b>a</b></sub>(x)</div>", "", "outfb", "Li-slick");
    oCt = [];
};

function Lifbkibontva(s) {
    oCt = [];
    const rc = ribbon_comp(s);
    const rcl = rc.slice(0, -1);
    const ss = _.sum(s);
    const d = 1 - (ss % 2);
    var szamlalo = 0;
    for (var k = 0; k < rcl.length; k++)
        oCt.push([
            ["", "", ["0", "1"],
                ["0", "1"]
            ]
        ]);

    for (let nm of rcl) {
        szamlalo++;
        var eloj = ' + ';
        if ((szamlalo + d) % 2 == 1)
            eloj = ' − ';
        var oCtk = oCt[szamlalo - 1]
        var Ctxt0 = "";
        Ctxt0 += nm[1].toString();
        var Ctxt = "";

        oCtk[1] = eloj + "C<sub>(" + Ctxt0 + ")</sub><button class='vissza1' onclick='goToOnSlick();'> </button>";
        oCtk[2] = [];
        oCtk[3] = [];
        var t3 = hatas1(...nm[0])
        for (var h = 0; h < t3.length; h++) {
            oCtk[2].push(h);
            oCtk[3].push(t3[h][0]);
            Ctxt += t3[h][0];
        };
        if (Ctxt.startsWith(" + "))
            Ctxt = Ctxt.slice(3)
        oCtk[0] = eloj + '<span class="cc">C<sub>(' + Ctxt0 + ')</sub></span>·<span class="paren">{</span>' + Ctxt + '<span class="paren">}</span>';
    };
    oCt[szamlalo - 1][0] = '+<span class="cc">C<sub>(' + s.toString() + ')</sub></span>';
    oCt[szamlalo - 1][1] = "+C<sub>(" + s.toString() + ")</sub>";
    oCt[szamlalo - 1][3] = [];
    oCt[szamlalo - 1][3].push('<span style="display:inline-block;color:#2484c1;font-weight:800;background-color:#e3e3e3;padding:3px 5px;border-radius:3px;">ln<sup>0</sup>(x)</span>·Li<sub>( )</sub>(x)');
    makeSlicks(oCt, "<div><h3 class='slickh3'>C</h3>ln<sup>p</sup>(x)·Li<sub><b>a</b></sub>(x)</div>", "", "outfb", "Li-slick");
    oCt = [];
}

function LifB() {
    const kibontva = document.getElementById("setfb").checked;
    const s = kiszed_nm("fbs");
    if (kibontva) {
        out = Lifbkibontva(s);
    } else {
        Lifbint(s);
    }
};

$(document).on('afterChange', '#Li-slick', function(event, slick, currentSlide) {
    $('.onslick').removeClass('onslick');
    var indx = $('.slick-slide.slick-current h3.slickh3 sub').text();
    if (currentSlide == 0)
        return;
    if (currentSlide == 1) {
        $('#outfb span[data-slk=zero]').addClass('onslick');
    } else if (indx.length > 0) {
        indx = indx.match(/\((\d[\,|\)])*/)[0].slice(1, -1).replaceAll(",", "-");
        $('#outfb span[data-slk=' + indx + ']').addClass('onslick');
    } else
        return;
});


var oCt = [
    ["O1", "C11", ["0", "1"],
        ["tab-11", "tab-12"]
    ],
    ["O1", "C21", ["0"],
        ["tab-21"]
    ],
    ["O1", "C31", ["0", "1", "2"],
        ["tab-31", "tab-32", "tab-33"]
    ],
    ["O1", "C41", ["0-aaaaaaa", "1-llllll", "2-bbbbbbbbbbb", "3-cccc", "4", "5", "6", "7"],
        ["tab-41", "tab-42", "tab-43", "tab-44", "tab-45", "tab-46", "tab-47", "tab-48"]
    ]
]

// DETERMINANT OF A MATRIX
// recursive with fraction input

const determinant1 = m =>
    m.length == 1 ?
    m[0][0] :
    m.length == 2 ?
    m[0][0] * m[1][1] - m[0][1] * m[1][0] :
    m[0].reduce((r, e, i) =>
        r + (-1) ** (i + 2) * e * determinant1(m.slice(1).map(c =>
            c.filter((_, j) => i != j))), 0);

const determinant2 = m =>
    m.length == 1 ?
    m[0][0] :
    m.length == 2 ?
    m[0][0] + "*" + m[1][1] + "-" + m[0][1] + "*" + m[1][0] :
    m[0].reduce((r, e, i) =>
        r + (-1) ** (i + 2) + "*" + e + "*" + determinant2(m.slice(1).map(c =>
            c.filter((_, j) => i != j))), 0);


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
            determinantOfMatrixRecursive0(submatrix, n - 1);
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

function symbDeterminantOfMatrixRecursive(mat, n) {
    if (n === 1) {
        return mat[0][0];
    }
    let det = "";
    let sign = "+";
    for (let i = 0; i < n; i++) {
        let submatrix = createSubmatrix(mat, i, n);
        det += sign + mat[0][i] + "*(" + symbDeterminantOfMatrixRecursive(submatrix, n - 1) + ")";
        if (sign == "+")
            sign = "-"
        else
            sign = "-"
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

//---------------------SYMBOLIC DETERMINANT
/**
 * Checks if a permutation has an even number of inversions.
 * @param {number[]} p - The permutation array.
 * @returns {number} The sign of the permutation (+1 or -1).
 */
function getSign(p) {
    let inversions = 0;
    const n = p.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (p[i] > p[j]) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0 ? 1 : -1;
}

/**
 * Generates all permutations of an array.
 * @param {any[]} arr - The array to permuted.
 * @returns {any[][]} A list of all permutations.
 */
function permuted(arr) {
    const result = [];
    const n = arr.length;

    function backtrack(index, currentPermutation) {
        if (index === n) {
            result.push([...currentPermutation]);
            return;
        }
        for (let i = 0; i < n; i++) {
            if (!currentPermutation.includes(arr[i])) {
                currentPermutation.push(arr[i]);
                backtrack(index + 1, currentPermutation);
                currentPermutation.pop();
            }
        }
    }

    backtrack(0, []);
    return result;
}

/**
 * Calculates the determinant of a symbolic matrix using the permutation definition.
 * @param {string[][]} matrix - The symbolic matrix.
 * @returns {string} The determinant as a symbolic string.
 */
function symbDet(matrix) {
    const n = matrix.length;
    if (n === 0) return "0";

    // For symbolic matrices, we cannot directly compute the determinant as a number
    // For a symbolic matrix, we must construct the string representation.

    const columnIndices = Array.from({ length: n }, (_, i) => i);
    const permutations = permuted(columnIndices);

    let terms = [];
    for (const p of permutations) {
        let sign = getSign(p);
        let term = [];
        let expression = "";

        for (let i = 0; i < n; i++) {
            term.push(matrix[i][p[i]]);
        }

        // Format the term as a string
        if (sign === 1) {
            expression = term.join("*");
        } else {
            expression = `-${term.join("*")}`;
        }
        terms.push(expression);
    }
    return terms
}
//----------------------SYMBOLIC DETERMINANT END


function generateMonotoneArrays(n, k) {
    const results = [];

    function backtrack(currentArray, start) {
        // Base case: if the current array is of the desired length, add it to the results
        if (currentArray.length === k) {
            results.push([...currentArray]);
            return;
        }

        // Iterate through possible next elements
        // The loop starts from `start` to ensure strictly increasing order
        // and continues up to `n` - (k - currentArray.length) + 1 to ensure there are enough numbers left for the remaining elements
        for (let i = start; i <= n - (k - currentArray.length) + 1; i++) {
            // Add the current number to the array
            currentArray.push(i);
            // Recursively call backtrack with the updated array and the next starting number
            backtrack(currentArray, i + 1);
            // Backtrack: remove the last added number to explore other possibilities
            currentArray.pop();
        }
    }

    // Start the backtracking process with an empty array and the starting number 1
    backtrack([], 1);
    return results;
}

var Uo = [{ 'c': 3, '2': 1 }, { 'c': -4, '3': 1, '2,1': 2 }, { 'c': 0, '4': 3 }];
var Vo = [{ 'c': -2, '2': 1 }, { 'c': 2, '2,1': 1 }];
var U3 = [{ 'c': 3, '2': 1, '3,1': 2 }, { 'c': 2, '4': 2 }];
var obj1 = { 'c': 2, '2,1': 1, '3,2': 2 };
var obj2 = { 'c': -7, '2,1': 5, '4,5,3': 4, '5,2,3': 2, '2,3': 7 };
var egy = [{ 'c': 1 }];

function customizer(o1, o2, key) {
    if (key == 'c')
        return o1 * o2;
    else
        return (o1 || 0) + (o2 || 0);
};

function dense0(vList) {
    if (vList.length > 1)
        vList = _.reject(vList, (o => o.c == 0));
    if (vList.length == 0)
        vList = [{ 'c': 0 }];
    return vList;
}

function symbVprod(U, V) {
    U = dense0(U);
    V = dense0(V);
    var out = [];
    for (let u of U)
        for (let v of V) {
            var su = _.clone(u);
            var sv = _.clone(v);
            out.push(_.mergeWith(su, sv, customizer));
        }
    return dense0(out);
};

function symbVProd(vList) {
    var out = [];
    const n = vList.length;
    if (n <= 1)
        out = vList;
    if (n > 1) {
        var out0 = vList[0];
        for (var j = 1; j < n; j++)
            out0 = symbVprod(out0, vList[j]);
        out.push(out0);
    };
    return dense0(out[0]);
};

function ovhato(obj1, obj2) {
    return _.isEqual(_.omit(obj1, 'c'), _.omit(obj2, 'c'));
};

function symbOv(vList) {
    var out = [];
    const n = vList.length;
    if (n <= 1)
        out = vList;
    if (n > 1) {
        var szamlalo = 0;
        while (vList.length > 0 && szamlalo < 100000) {
            e = _.first(vList);
            var ov = vList.filter(x => ovhato(x, e));
            _.pullAllWith(vList, [e], ovhato);
            var cc = _.sum(ov.map(y => y.c));
            e.c = cc
            szamlalo++
            out.push(e)
        }
    }
    out = dense0(out);
    return out;
};

function kiigazit(t) {
    if (t.startsWith('-'))
        if (/\]\*\[/.test(t))
            t = t.slice(1).replace("]*[", ']W[').replace(/"c":(?=.*W)/g, '"c":-').replace('W', '*').replaceAll('--', '');
        else
            t = t.slice(1).replace('"c":', '"c":-').replaceAll('--', '');
    t = '[' + t.replaceAll('*', ',') + ']';
    return t;
};

function detM(mat) {
    var strmat = mat.map(y => y.map(z => JSON.stringify(z)));
    var det = symbDet(strmat);
    det = det.map(y => JSON.parse(kiigazit(y)));
    det = det.map(y => symbOv(symbVProd(y)));
    det = dense0(_.flatten(det));
    if (det.length > 400)
        out = "A determináns közel " + det.length + "hosszú amit már nagyon időigényes összevonni."
    else {
        det = symbOv(det);
        console.log("összevonás kész")
    };

    return det;
};

//............................ better determinant calculator >
function dominoEredeti(A, v) {
    const n = A.length;
    var out = [{ "c": 1 }];
    if (n > 0) {
        const vn = v.length;
        var L = [];
        var veg = _.cloneDeep(A[n - 1][v[vn - 1] - 1]);
        if (vn % 2 == 1)
            veg.map(o => o.c = -1 * o.c);
        L.push(veg);
        for (i = 0; i < vn - 1; i++)
            L.push(A[v[i + 1] - 1][v[i] - 1]);

        out = symbVProd(L);
    }
    return out;
};

const range = (start, stop) =>
    Array.from({ length: stop - start + 1 },
        (_, i) => start + i,
    );

function bhezEredeti(A, k) {
    const n = A.length;
    const b = A[k - 1][n - 1];
    if (k < n) {
        const pS = powerSet(range(k + 1, n - 1));
        var L = [];
        for (let a of pS) {
            L.push(symbVprod(b, domino(A, [k, ...a])));
        }
        L = _.flatten(L);
        return L;
    } else
        return b;
}

// tukrozott

function domino(A, v, k) {
    const n = A.length;
    var out = [{ "c": 1 }];
    if (n > 0) {
        const vn = v.length;
        var L = [];
        var veg = _.cloneDeep(A[v[vn - 1] - 1][k - 1]);
        if (vn % 2 == 1)
            veg.map(o => o.c = -1 * o.c);
        L.push(veg);
        for (i = 0; i < vn - 1; i++)
            L.push(A[v[i] - 1][v[i + 1] - 1]);

        out = symbVProd(L);
    }
    return out;
};

function bhez(A, k) {
    const n = A.length;
    const b = A[k - 1][0];
    if (k == 1)
        return b;
    if (k < n + 1) {
        const pS = powerSet(range(2, k - 1));
        var L = [];
        for (let a of pS) {
            //if (a.length > 0)
            L.push(symbVprod(b, domino(A, [1, ...a], k)));
        }
        L = _.flatten(L);
        return L;
    } else
        return b;
};

//.....................  formális kimenetekkel

function dominof(v, k) {
    var out = "";
    var L = [];
    const vn = v.length;
    var veg = [v[vn - 1], k];
    L.push(veg);
    for (i = 0; i < vn - 1; i++)
        L.push([v[i], v[i + 1]]);
    L = L.sort();
    console.log(L)
    for (ii = 0; ii < L.length - 1; ii++)
        out += "&middot;A<sub>" + L[ii].toString() + "</sub>";
    out += "&middot;A<sub>" + L[vn - 1].toString() + "</sub>"
    out = out.slice(8);
    if (vn % 2 == 1 && out.length > 0)
        out = " − " + out;
    if (!out.startsWith(" − ") && out.length > 0)
        out = " + " + out;
    return out;
};

function formbhez(k) {
    var L = "";
    if (k == 1)
        return "1";
    const pS = powerSet(range(2, k - 1));
    for (let a of pS) {
        L += dominof([1, ...a], k);
    }
    if (L.startsWith(" + "))
        L = L.slice(3);
    //document.getElementById('callout').innerHTML = L;
    return L;
};

function detMnewForm(n) {
    var out = "";
    for (var k = 1; k <= n; k++)
        out += " + " + "b<sub>" + k + "</sub>&lowast;[" + formbhez(k) + "]";
    document.getElementById('callout').innerHTML = out;
    return out;
};

//.................................
function dominoV(v, k) {
    var L = [];
    const vn = v.length;
    var veg = [v[vn - 1], k];
    L.push(veg);
    for (i = 0; i < vn - 1; i++)
        L.push([v[i], v[i + 1]]);
    L = L.sort();
    return L;
};

function bhezV(k) {
    var L = [];
    const pS = powerSet(range(2, k - 1));
    for (let a of pS) {
        L.push(dominoV([1, ...a], k));
    }
    return L;
};

//document.getElementById("callout").innerHTML=monomvec2HTML(bhezt(PmA8,6))

function detMnew(A0) {
    const A = _.cloneDeep(A0);
    dettagok = 0;
    var out = [];
    const n = A.length;
    for (var k = 1; k <= n; k++)
        out.push(bhez(A, k));
    out = dense0(_.flatten(out));
    dettagok = out.length;
    if (dettagok > 1050) {
        detov = false;
        return out;
    } else {
        detov = true;
        out = symbOv(out);
        dettagok = out.length;
    }

    return out;
};
//...........................<end
var dettagok = 0;
var detov = true;
var k29tagok = 0;
var kuldmax = 2000;
var tagmax = 2000;
var blep = 1;
var blepes = 1;
var blepesek = [];

function monom2HTML(obj) {
    if (_.isEqual(obj, { 'c': 1 }))
        return "1";
    if (_.isEqual(obj, { 'c': 0 }))
        return "0";
    var C = obj.c * 1;
    if (C == 1)
        C = " + "
    else if (C == -1)
        C = " − ";
    else if (C > 1)
        C = " + " + C + "&hairsp;"; //MAPLEBE
    else if (C < 1)
        C = " − " + -C + "&hairsp;"; //MAPLEBE

    obj = _.omit(obj, 'c');
    var m = "";
    _.forEach(obj, function(value, key) {
        if (value > 1)
            m += '&zeta;<sup>' + value + '</sup><sub class="zhindx">' + key + '</sub>'; //MAPLEBE
        else
            m += '&zeta;<sub class="zindx">' + key + '</sub>'; //MAPLEBE
    });
    m = C + m;
    return m;
};

function monomvec2HTML(mv) {
    var txt = "";
    for (let m of mv) {
        txt += monom2HTML(m);
    }
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    return txt;
};

function monom2HTMLWithId(obj) {
    if (_.isEqual(obj, { 'c': 1 }))
        return "1";
    if (_.isEqual(obj, { 'c': 0 }))
        return "0";
    var C = obj.c * 1;
    if (C == 1)
        C = " + "
    else if (C == -1)
        C = " − ";
    else if (C > 1)
        C = " + " + C + "&hairsp;";
    else if (C < 1)
        C = " − " + -C + "&hairsp;";

    obj = _.omit(obj, 'c');
    var m = "";
    var keydata = ""
    _.forEach(obj, function(value, key) {
        keydata += key + "-";
        if (value > 1)
            m += '&zeta;<sup>' + value + '</sup><sub class="zhindx">' + key + '</sub>';
        else
            m += '&zeta;<sub class="zindx">' + key + '</sub>';
    });
    keydata = keydata.slice(0, -1);
    m = '<span class="bvec" data-b="' + keydata + '">' + C + m + '</span>';
    return m;
};

function monomvec2HTMLWithId(mv) {
    var txt = "";
    for (let m of mv) {
        txt += monom2HTMLWithId(m);
    }
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    return txt;
};

function monom2gp(obj) {
    if (_.isEqual(obj, { 'c': 1 }))
        return "1";
    if (_.isEqual(obj, { 'c': 0 }))
        return "0";
    var C = obj.c * 1;
    if (C == 1)
        C = "+"
    else if (C == -1)
        C = "-";
    else if (C > 1)
        C = "+" + C + "*";
    else if (C < 1)
        C = "-" + -1 * C + "*";

    obj = _.omit(obj, 'c');
    var m = "";
    _.forEach(obj, function(value, key) {
        if (value > 1)
            m += 'zetamult([' + key + '])^' + value + '*';
        else
            m += 'zetamult([' + key + '])*';
    });
    m = C + m;
    m = m.slice(0, -1);
    return m;
};

function monomvec2gp(mv) {
    var txt = "";
    for (let m of mv) {
        txt += monom2gp(m);
    }
    txt = "gp(\"" + txt + "\")";
    return txt;
};

function detValasz(det) {
    const elem = document.getElementById("detertek");
    if (dettagok > kuldmax)
        elem.innerHTML = "  &rightarrow; Az összeg tagjainak száma(" + dettagok + ") meghaladta a maximálisan elküldhető <b style='color:red;'>" + kuldmax + "</b> értéket.";
    else {
        const t = 100000;
        $('#mycelldet .sagecell_editor textarea.sagecell_commands').val(monomvec2gp(det));
        $('#mycelldet .sagecell_input button.sagecell_evalButton').click();
        var ra = setInterval(() => {
            valasz = $('#ideoutdet .sagecell_sessionOutput pre').text();
            if (valasz != "") {
                clearInterval(ra);
                clearInterval(to);
                elem.innerHTML = " = " + valasz;
            }
        }, 50);
        var to = setTimeout(() => {
            clearInterval(ra);
            elem.innerHTML = " &rightarrow;A válasz " + t / 1000 + " sec alatt nem érkezett meg.";
        }, t)
    }
};

// regshuff determinant

function reg_shuff2gp(s) {
    const de = genDual(s);

    var txt = '';
    for (let v of de) {
        var c = v[0];
        var ertek = dualofv(v[1]).toString();
        if (c == -1)
            c = "-"
        else if (c == 1)
            c = "+"
        else if (c > 1)
            c = "+" + c + "*";
        else if (c < 1)
            c += "*";
        if (v[1] != "")
            txt += c + "zetamult([" + ertek + "])";
    };
    txt = "gp(\"" + txt + "\")";
    return txt;
};

function regshuffValasz(s) {
    const elem = document.getElementById("detshuffertek");
    const t = 100000;
    $('#mycelldetshuff .sagecell_editor textarea.sagecell_commands').val(reg_shuff2gp(s));
    $('#mycelldetshuff .sagecell_input button.sagecell_evalButton').click();
    var ra = setInterval(() => {
        valasz = $('#ideoutdetshuff .sagecell_sessionOutput pre').text();
        if (valasz != "") {
            clearInterval(ra);
            clearInterval(to);
            elem.innerHTML = " = " + valasz;
        }
    }, 50);
    var to = setTimeout(() => {
        clearInterval(ra);
        elem.innerHTML = " &rightarrow;A válasz " + t / 1000 + " sec alatt nem érkezett meg.";
    }, t)
};

function reg_shuff_det(s) {
    //const s = JSON.parse("[" + $('#selects option:selected').text().slice(1, -1) + "]");
    const de = genDual(s);

    var dtxt = '&zeta;(reg<sub><span style="font-size:larger;">&#x29E2;</span></sub>(' + s.toString() + ')) = ';
    for (let v of de) {
        var c = v[0];
        var ertek = dualofv(v[1]).toString();
        if (c == -1)
            c = " − "
        else if (c == 1)
            c = " + "
        else if (c > 1)
            c = " + " + c + "&hairsp;";
        else if (c < 1)
            c = " − " + Math.abs(c) + "&hairsp;";
        if (v[1] != "")
            dtxt += c + "&zeta;<sub class='zindx'>" + ertek + "</sub>";
    };

    dtxt = dtxt.replaceAll("=  +", "= ");
    return dtxt;
};

// keplet29 zetaval 

function Poztagzeta(w) {
    let a = w[0];
    let p = w[1];
    let b = w[2];
    var tag = [];
    if (b.length > 0) {
        for (var k = 0; k <= p; k++) {
            let d1 = expDeriv(conjugate(a), k);
            let d2 = expDeriv(dualofv(b), p - k);
            let coeff = Math.pow(-1, _.sum(a) + p + k + 1) * binomial(p, k) / factorial(p);
            for (let v1 of d1) {
                for (let v2 of d2) {
                    tag.push([coeff * v1[0] * v2[0], v1[1], v2[1]]);
                }
            }
        }
    } else {
        var d = expDeriv(conjugate(a), p);
        var coeff = Math.pow(-1, _.sum(a) + 1) / factorial(p);
        for (let v of d)
            tag.push([coeff * v[0], v[1]]);
    }
    return tag;
};

function keplet29zeta(s) {
    return out = _.flatten(pozvagas(s).map(y => Poztagzeta(y)));
};

function k29zeta2gp(s) {
    const de = keplet29zeta(s);
    var txt = "";
    if (de.length > 400)
        txt = monomvec2gp(vList2obj(de, 1));
    else
        txt = monomvec2gp(symbOv(vList2obj(de, 1)));
    /* var txt = "";
    for (let v of de) {
        var c = v[0];
        var e1 = v[1].toString();
        var e2 = "";
        if (v.length == 3)
            e2 = v[2].toString();
        if (c == -1)
            c = "-"
        else if (c == 1)
            c = "+"
        else if (c > 1)
            c = "+" + c + "*";
        else if (c < 1)
            c += "*";
        txt += c + "zetamult([" + e1 + "])";
        if (v.length == 3)
            txt += "*zetamult([" + e2 + "])";
    };
    txt = "gp(\"" + txt + "\")";*/
    return txt;
};

function k29_det(s) {
    k29tagok = 0;
    const de = keplet29zeta(s);
    const deobj = vList2obj(de, 1);
    k29tagok = deobj.length;
    var dtxt = '&zeta;<sub>k29</sub>(' + s.toString() + ')';
    if (de.length < 1050) {
        var ov = symbOv(deobj);
        k29tagok = ov.length;
        dtxt += " (összevonás után) = " + monomvec2HTML(ov);
    } else {
        dtxt += " (összevonás nélkül) = " + monomvec2HTML(deobj);
        /* for (let v of de) {
            var c = v[0];
            var e1 = v[1].toString();
            if (v.length == 3)
                var e2 = v[2].toString();
            if (c == -1)
                c = " − "
            else if (c == 1)
                c = " + "
            else if (c > 1)
                c = " + " + c + "&hairsp;";
            else if (c < 1)
                c = " − " + Math.abs(c) + "&hairsp;";
            dtxt += c + "&zeta;<sub class='zindx'>" + e1 + "</sub>"
            if (v.length == 3)
                dtxt += "&hairsp;&zeta;<sub class='zindx'>" + e2 + "</sub>";
            k29tagok++;
        }; */
    }
    dtxt = dtxt.replaceAll("=  +", "= ");
    return dtxt;
};

function k29Valasz(s) {
    const elem = document.getElementById("detk29ertek");
    if (k29tagok > kuldmax)
        elem.innerHTML = "  &rightarrow; Az összeg tagjainak száma(" + k29tagok + ") meghaladta a maximálisan elküldhető <b style='color:red;'>" + kuldmax + "</b> értéket.";
    else {
        const t = 100000;
        $('#mycellk29 .sagecell_editor textarea.sagecell_commands').val(k29zeta2gp(s));
        $('#mycellk29 .sagecell_input button.sagecell_evalButton').click();
        var ra = setInterval(() => {
            valasz = $('#ideoutk29 .sagecell_sessionOutput pre').text();
            if (valasz != "") {
                clearInterval(ra);
                clearInterval(to);
                elem.innerHTML = " = " + valasz;
            }
        }, 50);
        var to = setTimeout(() => {
            clearInterval(ra);
            elem.innerHTML = " &rightarrow;A válasz " + t / 1000 + " sec alatt nem érkezett meg.";
        }, t)
    }
};

function detmk29Valasz(kul) {
    const elem = document.getElementById("detmk29ertek");
    const t = 100000;
    $('#mycelldetmk29 .sagecell_editor textarea.sagecell_commands').val(monomvec2gp(kul));
    $('#mycelldetmk29 .sagecell_input button.sagecell_evalButton').click();
    var ram = setInterval(() => {
        valasz = $('#ideoutdetmk29 .sagecell_sessionOutput pre').text();
        if (valasz != "") {
            clearInterval(ram);
            clearInterval(tom);
            elem.innerHTML = " = " + valasz;
        }
    }, 50);
    var tom = setTimeout(() => {
        clearInterval(ram);
        elem.innerHTML = " &rightarrow;A válasz " + t / 1000 + " sec alatt nem érkezett meg.";
    }, t)
};

////////
var sarokv = [];

function sarokIndexek() {
    const $table = $('#outdet table');
    const meret = $('#outdet table thead tr th').length - 1;
    const sarkok = $('#outdet table tbody tr td').filter(function() { return (this.innerText == "1" || this.innerText == "0") && $(this).prev('td').text() !== "0" && $(this).prev('td').text() !== "1" }) /*.addClass('sarokleft')*/ ;
    const egyek = $('#outdet table tbody tr td').filter(function() { return this.innerText == "1" }).addClass('egyatlo');
    const ne = egyek.length;
    sarokv = [];
    sarkok.each(function() {
        var colIndex = this.cellIndex
        sarokv.push(colIndex);
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + colIndex + ")")
            .addClass('columnline');
        $table.find("tbody tr:nth(" + (colIndex - 1) + ")")
            .addClass('rowline');
        $table.find("tbody tr:nth(" + (colIndex - 1) + ")")
            .children(":nth-child(" + colIndex + ")")
            .addClass('sarokelem');
        $table.find("thead tr")
            .children(":nth-child(" + colIndex + ")")
            .addClass('sarokelem');

    });
    const lastegy = $table.find("tbody tr:nth(" + ne + ")")
        .children(":nth-child(" + (ne + 1) + ")")

    if (lastegy != undefined && lastegy.text() != "0") {
        lastegy.addClass('sarokelem');
        lastegy.closest('tr').addClass('rowline');
        sarokv.push(ne + 1);
    }
    sarokv = _.uniq(sarokv);
    if (_.last(sarokv) == meret)
        $table.find("tbody tr, thead tr")
        .children(":nth-child(" + meret + ")")
        .addClass('columnline');
    sarokv.push(meret + 1);
};

function sarokIndexekTukor() {
    const $table = $('#outdet table');
    const meret = $('#outdet table thead tr th').length - 1;
    //const sarkok = $('#outdet table tbody tr td').filter(function() { return (this.innerText == "1" || this.innerText == "0") && $(this).prev('td').text() !== "0" && $(this).prev('td').text() !== "1" });
    const sarkok = $('#outdet table tbody tr td').filter(function() { return this.celIndex != 2 && (this.innerText == "1" || this.innerText == "0") && ($(this).next('td').text() !== "0" && $(this).next('td').text() !== "1") });
    const egyek = $('#outdet table tbody tr td').filter(function() { return this.innerText == "1" }).addClass('egyatlo');
    //const ne = egyek.length;
    sarokv = [];
    sarkok.each(function(t) {
        var colIndex = this.cellIndex;
        sarokv.push(colIndex);
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + (2) + ")")
            .addClass('columnlinetuk');
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + (colIndex + 2) + ")")
            .addClass('columnlinetukor');
        $table.find("thead tr")
            .addClass('rowlinetukor');
        $table.find("tbody tr:nth(" + (colIndex - 1) + ")")
            .addClass('rowlinetukor');
        $table.find("tbody tr:nth(" + (colIndex - 1) + ")")
            .children(":nth-child(" + (colIndex + 2) + ")")
            .addClass('sarokelem');
        $table.find("thead tr")
            .children(":nth-child(" + (colIndex + 1) + ")")
            .addClass('sarokelem');

    });
    const lastegy = $table.find("tbody tr:nth(" + 0 + ")")
        .children(":nth-child(" + (2 + 1) + ")");

    if (lastegy != undefined && lastegy.text() != "0") {
        lastegy.addClass('sarokelem');
        lastegy.closest('tr').addClass('rowlinetukor');
        sarokv.unshift(1);
    }
    sarokv = _.uniq(sarokv);
    if (_.first(sarokv) == 1) {
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + 3 + ")")
            .addClass('columnlinetukor');
    }
    sarokv.push(meret + 1);
};

function drawMat(mat, felsoharomszog) {
    blepesek = [];
    blepes = 0;
    blep = 1;
    const n = mat.length;

    var txt = '<span style="display:block;width:fit-content;padding-top:15px;padding-right:15px;padding-bottom:6px;"><table id="dettbl" class="table-hideable"> <thead><tr><th></th>';
    for (var j = 0; j < n; j++)
        txt += '<th class="hide-column hide-col">' + (j + 1) + '</th>';
    txt += '</tr></thead><tbody>';
    for (var i = 0; i < n; i++) {
        txt += '<tr><th onclick="hlThisRow(this);">' + (i + 1) + '</th>';
        var v = mat[i];
        for (let w of v) {
            vec = monomvec2HTML(dense0(w));
            if (vec.startsWith(' + '))
                vec = vec.slice(3);
            txt += '<td class="hide-column"><span class="td-block">' + vec + '</span></td>';
        }
        txt += '</tr>';
    }
    txt += '</tbody></table><span id="button3" style="display:inline-block;position:sticky;left:15px;"><button class="restore-button showpre1" onclick="showhideColumns(this);" style="margin-top:8px;">Show all</button><button class="restore-button showpre1" onclick="toggleSarkok();" style="margin-top:8px;background-color:#b90045;width:90px;">Sarokelemek</button></span><br/><span id="buttonb"><span class="blepteto" onclick="bleptet(false);">▶</span><span class="blepteto" onclick="bleptet(true);" style="padding:5px 7px 5px 5px;">◀</span><input id="blepeskijelzo" type="text" onchange="bugrik(this.value);"><span id="blepesall"></span></span></span>';
    if (felsoharomszog)
        setTimeout(() => { sarokIndexekTukor(); }, 100);
    else
        setTimeout(() => { sarokIndexek(); }, 100);

    return txt;
};

// Kapcolodó részek a dokumentumban
// --> bvector of deterinant and the full determinant in object-vector  form


function drawDet() {
    document.getElementById("figydet").style.display = "none";
    const s = kiszed_dbl("sdet", "figydet");
    const alsoharomszog = document.getElementById("settukor").checked;
    const detallkell = document.getElementById("setdetall").checked;
    const detkell = document.getElementById("setdet").checked;
    const k29kell = document.getElementById("setk29").checked;
    const regshuffkell = document.getElementById("setregshuff").checked;
    const detmk29kell = document.getElementById("setdetmk29").checked;
    const elem = document.getElementById("outdet");
    elem.innerHTML = "HIBA";
    var mat = s2mat(s);
    var txt = "";
    if (detallkell) {
        if (detkell || detmk29kell) {
            var det0 = detMnew(mat);
        }
        if (detkell) {
            var det = monomvec2HTML(det0);
            var ov = " (összevonás után)";
            if (dettagok > tagmax)
                det = "A determináns tagjainak száma(" + dettagok + ") meghaladja a maximálisan megjeleníthető <b style='color:red;'>" + tagmax + "</b> értéket.";
            if (!detov)
                ov = " (összevonás nélkül)";
            txt += "A detemináns" + ov + " egy " + dettagok + " tagú összeg.<br/>" + det + "<span id='detertek' style='color:blue;'></span><hr/>";
        };
        if (k29kell) {
            var k29 = k29_det(s);
            if (k29tagok > tagmax)
                k29 = "Az összeg tagjainak száma(" + k29tagok + ") meghaladja a maximálisan megjeleníthető <b style='color:red;'>" + tagmax + "</b> értéket.";
            txt += "A <b>képlet29</b> eredménye egy " + k29tagok + " tagú összeg.<br/>" + k29 + "<span id='detk29ertek' style='color:blue;'></span><hr/>";
        };
        if (regshuffkell)
            txt += reg_shuff_det(s) + "<span id='detshuffertek' style='color:blue;'></span><hr/>";
        if (detmk29kell) {
            var det00 = _.cloneDeep(det0);
            var kul = symbOv(_.flatten([det00, symbVprod([{ "c": -1 }], vList2obj(keplet29zeta(s), 1))]));
            var detmk29 = monomvec2HTML(kul);
            var detmk29tagok = kul.length;
            if (detmk29tagok > tagmax)
                detk29 = "A különbség tagjainak száma(" + detmk29tagok + ") meghaladja a maximálisan megjeleníthető <b style='color:red;'>" + tagmax + "</b> értéket.";
            txt += "A det - képlet29 különbség összevonás után egy " + detmk29tagok + " tagból álló összeg<br/>" + detmk29 + "<span id='detmk29ertek' style='color:blue;'></span><hr/>"
        };
        if (alsoharomszog)
            mat = mat.map(y => y.reverse()).reverse();
        const table = drawMat(mat, !alsoharomszog);
        elem.innerHTML = txt + table;
        if (detkell)
            detValasz(det0);
        if (k29kell)
            k29Valasz(s);
        if (regshuffkell)
            regshuffValasz(s);
        if (detmk29kell)
            detmk29Valasz(kul);
    } else {
        if (alsoharomszog)
            mat = mat.map(y => y.reverse()).reverse();
        const table = drawMat(mat, !alsoharomszog);
        elem.innerHTML = table;
    }

    hideColumns();
};

function catalog(e) {
    document.getElementById("sdet").value = e.value;
    drawDet();
};

$(document).on('dblclick', '.hide-column', HideColumnIndex);

function toggleSarkok() {
    const fullcol = document.getElementById("setfullcol").checked;
    if (fullcol) {
        if ($('.table-hideable tr td.sarokelem.hide-col').length >= $('.table-hideable tr td.sarokelem:not(.hide-col)').length)
            $('.table-hideable tr td.columnline,.table-hideable tr td.columnlinetukor').removeClass('hide-col');
        else
            $('.table-hideable tr td.columnline,.table-hideable tr td.columnlinetukor').addClass('hide-col');
    } else {
        if ($('.table-hideable tr td.sarokelem.hide-col').length >= $('.table-hideable tr td.sarokelem:not(.hide-col)').length)
            $('.table-hideable tr td.sarokelem').removeClass('hide-col');
        else
            $('.table-hideable tr td.sarokelem').addClass('hide-col');
    };
};

function HideColumnIndex() {
    const wmode = document.getElementById("setwmode").checked;
    var $el = $(this);
    var $cell = $el.closest('th,td');
    var $table = $cell.closest('table');
    var $sp = $cell.children('.td-block');

    if ($el.hasClass('hide-col')) {
        var colIndex = $cell[0].cellIndex + 1;
        if (wmode && $cell[0].nodeName != "TH") {
            var w = Math.max(40, $sp.width() + 15);
            var cw = Math.max(40, $cell.width() + 15);
            if (cw < w) {
                $table.find("thead tr")
                    .children(":nth-child(" + colIndex + ")")
                    .removeClass('hide-col');
                $cell.removeClass('hide-col')
                    .css("max-width", w + "px");
            } else
                $table.find("tbody tr, thead tr")
                .children(":nth-child(" + colIndex + ")")
                .addClass('hide-col');
        } else {
            $table.find("tbody tr, thead tr")
                .children(":nth-child(" + colIndex + ")")
                .removeClass('hide-col')
                .css("max-width", w + 10 + "px");
        }
    } else {
        var colIndex = $cell[0].cellIndex + 1;
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + colIndex + ")")
            .addClass('hide-col');
    };
    keresztelem();
};

$(document).on('click', '.hide-column', activateIndex);

function hlThisRow(e) {
    var $el = $(e);
    var $table = $el.closest('table');
    var $row = $el.closest('tr');
    if (!$row.hasClass('active')) {
        $table.find("tbody tr.active")
            .removeClass('active');
        $row.addClass('active');
    };
    keresztelem();
};

function clearDetSor(b) {
    if (!b) {
        $('.table-hideable td.detsor').removeClass('detsor');
        $('.table-hideable td.detsor0').removeClass('detsor0');
        $('.table-hideable td.detsorfix').removeClass('detsorfix');
        $('.table-hideable td.detsorfix0').removeClass('detsorfix0');
        $('#outdet #buttonb').removeClass('shown');
    };
};

function bugrik(ii) {
    const n = blepesek.length;
    const i = ii * 1 - 1;
    if (i < 0 || i > n - 1)
        return;
    else {
        blepes = i;
        var indx = document.getElementById("blepeskijelzo");
        indx.value = blepes + 1;
        hlblepes(blepesek[blepes]);
    }
    console.log(blep, blepes)
};

function hlblepes(L) {
    $('.table-hideable td.detsor').removeClass('detsor');
    $('.table-hideable td.detsor0').removeClass('detsor0');
    /*for (let v of L)
       $('.table-hideable tr:nth(' + v[0] + ') td:nth(' + (v[1] - 1) + ')').addClass('detsor');*/
    var det = ""
        // var no = false;
    for (let v of L) {
        var elem = $('.table-hideable tr:nth(' + v[0] + ') td:nth(' + (v[1] - 1) + ')');
        var d = elem.children('.td-block').html();
        if (d == "0") {
            elem.addClass("detsor0");
            //no = true;
        } else {
            elem.addClass("detsor");
        }
        // if (no)
        //     $('.table-hideable td.detsor').removeClass('detsor').addClass("detsor0");
        det += "&middot;(" + d + ")";
    }
    if (det.startsWith('&middot;'))
        det = det.slice(8);
    document.getElementById('keresztelem').innerHTML = "d = " + det;
    $('.table-hideable td.subdiagonal').removeClass('subdiagonal');
};

function bleptet(b) {
    const n = blepesek.length;
    if (n == 0)
        return;
    if (!b) {
        if (blepes < n - 1)
            blepes++;
        else
            blepes = 0;
    } else {
        if (blepes > 0)
            blepes--;
        else
            blepes = n - 1;
    }
    var indx = document.getElementById("blepeskijelzo");
    indx.value = blepes + 1;
    hlblepes(blepesek[blepes]);
};

function keresztelem() {
    const detreszletes = document.getElementById("detreszletes").checked;
    const alsoharomszog = document.getElementById('settukor').checked;
    const blepteto = $('#outdet #buttonb');
    $('#outdet table tbody td.keresztelem').removeClass("keresztelem");
    const m = $('#outdet table tbody tr.active td.active');
    var $row = m.closest('tr');
    m.addClass("keresztelem");
    var txt = m.html() || "A kiválasztott elem...";
    if (detreszletes && $row[0] != undefined) {
        $('.table-hideable tbody tr td.subdiagonal').removeClass('subdiagonal');
        const i = $row[0].rowIndex * 1;
        const j = m[0].cellIndex * 1;
        if (!alsoharomszog) {
            if (j == 1) {
                blepteto.addClass('shown');
                if (blep != i) {
                    blep = i;
                    blepes = 0;
                    blepesek = bhezV(i);
                    $('.table-hideable td.detsorfix').removeClass('detsorfix');
                    $('.table-hideable td.detsorfix0').removeClass('detsorfix0');
                    var lp = document.getElementById("blepesall");
                    lp.innerHTML = "/ " + blepesek.length * 1;
                    var indx = document.getElementById("blepeskijelzo");
                    indx.value = blepes + 1;
                }
                if (m.children('.td-block').html() == "0")
                    m.addClass('detsorfix0');
                else
                    m.addClass('detsorfix');
                hlblepes(blepesek[Math.max(0, blepes)]);
            } else if (!m.hasClass('detsor') && !m.hasClass('detsor0')) {
                blepteto.removeClass('shown');
                if (!m.hasClass('detsor') && !m.hasClass('detsor0')) {
                    $('.table-hideable td.detsor').removeClass('detsor');
                    $('.table-hideable td.detsor0').removeClass('detsor0');
                    $('.table-hideable td.detsorfix').removeClass('detsorfix');
                    $('.table-hideable td.detsorfix0').removeClass('detsorfix0');
                };
            }
        }
        if (alsoharomszog)
            for (var k = j + 1; k < i + 1; k++)
                $('.table-hideable tr:nth(' + k + ') td:nth(' + (k - 2) + ')').addClass('subdiagonal').removeClass('hide-col');
        else
            for (var k = i + 1; k < j + 1; k++)
                $('.table-hideable tr:nth(' + (k - 1) + ') td:nth(' + (k - 1) + ')').addClass('subdiagonal').removeClass('hide-col');
        var txt0 = matrixJelentes(i, j, alsoharomszog) || "";
        if (txt0 != "")
            txt = txt0 + "<hr style='color:#f1f1f1;opacity:0.5;'/>" + txt;
    }
    document.getElementById("keresztelem").innerHTML = txt;
};

function activateIndex() {
    var $el = $(this);
    var $cell = $el.closest('th,td');
    var $table = $cell.closest('table');
    var $row = $cell.closest('tr');

    if (!$el.hasClass('active')) {
        $table.find("tbody tr td.active, thead tr th.active")
            .removeClass('active');

        var colIndex = $cell[0].cellIndex + 1;
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + colIndex + ")")
            .addClass('active');
    };

    if (!$row.hasClass('active') && $cell[0].nodeName != "TH") {
        $table.find("tbody tr.active")
            .removeClass('active');
        $row.addClass('active');
    };
    keresztelem();
};

function showColumns() {
    var $table = $('.table-hideable');
    $table.find("th, td")
        .removeClass('hide-col');
};

function hideColumns() {
    var $table = $('.table-hideable');
    $table.find("th, td")
        .addClass('hide-col');
    $('#outdet').animate({ scrollLeft: 0 }, 500)
};

function showhideColumns(e) {
    if (e.innerText == "Show all") {
        showColumns();
        e.innerText = "Hide all"
    } else {
        hideColumns();
        e.innerText = "Show all"
    }
};

//---------------------------------------------------------------------
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
    var elojel = Math.pow(-1, _.sum(_.dropRight(lv)) + p + 1);
    if (elojel < 0)
        elojel = "−";
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


// ribbon graph for Matrix determinant

var boszlopa = 0;
var bsora = 0;
var boszlopa2 = 0;
var bsora2 = 0;
var bblokkja = 1;
var detAb = 'b';
var bdet = [];

function rfb_reszlCh() {
    if (detAb == 'b') {
        const el = $('#detT .tgomb.shown.hl');
        var indx = "";
        if (el.length > 0)
            indx = el.attr('rfb-data');
        $('.tsorszam-b.hl').trigger('click');
        if (indx != "")
            $('#detT .tgomb.shown[rfb-data=' + indx + ']').trigger('click');
    } else
        return;
};

function toggleTableRow_det(row) {
    const next = row.parentElement.nextElementSibling;
    if (next && next.classList.contains("child")) {
        next.style.display = (next.style.display === "none") ? "table-row" : "none";
    }
}

function setOutputFontrfb_det(v) {
    var elem = document.getElementById("detT");
    elem.style.fontSize = v + '%';

    $('#detT .tsorszam-s,#detT .tsorszam-n,#detT .tsorszam-fix').width(20);
    $('#detT .tsorszam-s,#detT .tsorszam-n,#detT .tsorszam-fix').width(($('#detT .tsorszam-s').parent('div').width() - 10) / cN);
    $('#detT .tsorszam-s,#detT .tsorszam-n,#detT .tsorszam-fix,#detT .tsorszam-w,#detT .tsorszam-e').css({ 'font-size': v * 0.01 * 12 + "px" });
    vertVonal();
    $('#detT .tsorszam-n .vertvonal').css({ 'margin-left': -$('#detT .tsorszam-n .vertvonal').parent().width() * 0.2 + 'px' });
};

function setDerfix_det(e) {
    deriv_fix = e.checked;
    if (deriv_fix)
        make_Deriv_det();
    else if ($('#detT .tgomb.d-path').length > 0)
        $('#detT .tgomb.d-path').removeClass('d-path');
};

function moveSelect_det(e) {
    const $e = $(e);
    const esel = $e.hasClass('sel');
    const m = $('#detT .tgomb.move');
    const ed = $e.attr('rfb-data');
    const md = m.attr('rfb-data');
    const mas = m.length > 0 && !(ed == md);
    const ej = ed.split('-')[1];
    const ei = ed.split('-')[0];
    const ee = $('#detT .tgomb.no[rfb-data=' + (ei - 1) + '-' + ej + ']');
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
            else if ($('#detT .tgomb.sel').length > 0) {
                const mm = $('#detT .tgomb.sel:nth(0)')
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
        teglaTrim_det();
    }
};

function drawDerivPath_det(s, o, d) {
    const k = kum(d);
    var d_path = [];
    for (var i = 1; i <= s; i++)
        for (var j = 1; j < o; j++)
            if ($('#detT .tgomb.shown[rfb-data=' + i + '-' + j + ']').length > 0)
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
    const p = $('#detT .tsorszam-s.ln').text() * 1;
    for (var l = s - p; l <= s; l++)
        d_path.push([l, o]);
    for (let j of d_path) {
        $('#detT .tgomb[rfb-data=' + (j[0]) + '-' + (j[1]) + ']').addClass('d-path');
    }
};

function toggle_Deriv_det() {
    if (rfb_last.s > 0) {
        const s = rfb_last.s;
        const o = rfb_last.o;
        const d = rfb_last.deriv_path;
        if ($('#detT .tgomb.d-path').length > 0)
            $('#detT .tgomb.d-path').removeClass('d-path');
        else
            drawDerivPath_det(s, o, d);
    }
};

function make_Deriv_det() {
    if (rfb_last.s > 0) {
        const s = rfb_last.s;
        const o = rfb_last.o;
        const d = rfb_last.deriv_path;
        drawDerivPath_det(s, o, d);
    }
};

function teglaTrim_det() {
    const o = rfbtegla[0];
    const v = _.dropRight([...rfbtegla[1]]);
    const db = $('#detT .tgomb.sel').length;
    const lLi = rfb_last["Li"];
    const diff = db - lLi;
    if (diff > 0)
        for (var d = 0; d < diff; d++)
            $('#detT .tgomb.sel:nth(' + d + ')').removeClass('sel move').html('&#x25CB;');
    if ($('#detT .tgomb.d-path').length > 0)
        $('#detT .tgomb.d-path').removeClass('d-path');
    var d = Array(o).fill(0);
    for (var i = 1; i < o + 1; i++) {
        for (let j of v) {
            var e = $('#detT .tgomb.no[rfb-data=' + j + '-' + i + ']')
            var f = $('#detT .tgomb.no[rfb-data=' + (j + 1) + '-' + i + ']')
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
            var e = $('#detT .tgomb.no[rfb-data=' + j + '-' + i + ']')
            if (e.hasClass('sel')) {
                d[i - 1] = d[i - 1] + 1;
            }
        }

        d[i - 1] = lv[i - 1] + d[i - 1];
        rfb_last.deriv_path.push(d[i - 1] - lv[i - 1]);
        dif = 0;
        if (i - 1 == boszlopa)
            dif = rfb_last.bfelett
        d[i - 1] = d[i - 1] - dif;
        if (i > boszlopa) {
            B *= binomial(d[i - 1] - 1, lv[i - 1] - dif - 1);
            Btext += drawBinomial(d[i - 1] - 1, lv[i - 1] - 1);
        }
    };
    rfb_last.deriv_path.push(0);
    for (var t = 0; t < o; t++)
        $('#detT .tsorszam-s:nth(' + (t + 1) + ')').html(d[t]);
    if (o > 0)
        Btext += "<span style='display:inline-block;position: relative;top: -30%;'> = " + "<span class='binomcolor'>" + B + "</span></span>";
    else {
        B = binomial(-1 + rfb_last.Li, -1)
        Btext = drawBinomial(-1 + rfb_last.Li, -1) + "<span style='display:inline-block;position: relative;top: -30%;'> = " + "<span class='binomcolor'>" + B + "</span></span>";
    };

    const lo = rfb_last.o;
    const ls = rfb_last.s;
    const c = rfb_last.C;
    const p = $('#detT .tsorszam-fix.Li').text() * 1;
    const ds = d.slice(boszlopa);
    var ep = p;
    if (detAb == 'b')
        ep = p + 1;
    var elojel = Math.pow(-1, _.sum(ds) + ep);
    if (elojel < 0)
        elojel = "−";
    else
        elojel = "";
    /* var szorzo = factorial(p);
    szorzo = "1/" + "<span class='lncolor'>" + szorzo + "</span>&lowast;"; */
    var keplet = "0";
    if (detAb == 'A') {
        if (ds.length > 0)
            keplet = "&rightarrow;&nbsp;" + elojel + "<span class='binomcolor'>" + B + "</span>&zeta;<sub>" + ds + "</sub>";
    } else
        keplet = "&rightarrow;&nbsp;" + elojel + "<span class='binomcolor'>" + B + "</span>&zeta;<sub>" + c + "</sub>&nbsp;&zeta;<sub>" + ds + "</sub>";
    keplet = keplet.replaceAll("<sub>(( ))</sub>", "<sub>( )</sub>");
    $('#detT .cintkeplet').html('').removeClass('cintkeplet');
    $("#detT #ebbe-" + ls).html(keplet).addClass('cintkeplet');
    if (rfb_last.v.length > 1) {
        var av = conjugate(_.dropRight(rfb_last.v, 1));
        av = _.drop(av, bsora - 1);
    } else
        var av = [];
    var strong = "1"
    if (detAb == 'A')
        strong = "0.4"
    var bont = "<b>a</b> &odot; (1)<sup><i>p</i></sup> &bullet; <b>c</b> = (" + av.toString() + ")&odot;(" + Array(p).fill(1).toString() + ")<span style='opacity:" + strong + ";'>&bullet;(" + rfb_last["C"] + ")</span>";
    bont = bont.replaceAll("(( ))", "( )").replaceAll("()", "( )")
    $("#detT #ebbe-" + (ls + 1)).html(bont).addClass('cintkeplet');
    if (rfb_last.v.length > 1) {
        av[0] -= rfb_last.bfelett;
    }
    $("#detT #binomkijelzo").html(Btext);
    _.filter($('#detT .tgomb.shown'), function(y) {
        var tt = $(y).attr('rfb-data').split('-');
        return tt[0] < ls * 1 && tt[1] == lo * 1 && !$(y).hasClass('hlLn');
    }).map(z => $(z).addClass('hlLi'));

    $("#detTable span.deractive").removeClass('deractive');
    if (d.length > 0 && detAb == 'b') {
        var dd = _.drop(d, boszlopa)
        $("#detTable span[der-data=" + dd.toString().replaceAll(',', "-") + "]").addClass('deractive');
    }
    if (deriv_fix)
        make_Deriv_det();
    vertVonal();
    $('#detbTable #bjelentes .bvec.hl').removeClass('hl');
    const reszl = document.getElementById('rfb_detreszletes').checked;
    if (detAb == 'A') {
        setTimeout(() => { $('#detbTable #bjelentes .bvec[data-b="' + ds.toString() + '"]').addClass('hl'); }, 100);
    } else if (detAb == 'b' && reszl) {
        const idvec = ds.toString();
        $('#detbTable #bjelentes .bvec[data-b="' + idvec + '"]').addClass('hl');
    } else {
        const idvec = [ds.toString() + '-' + c.toString(), c.toString() + '-' + ds.toString()];
        for (let v of idvec)
            $('#detbTable #bjelentes .bvec[data-b="' + v.replaceAll("( )-", "").replaceAll("-( )", "") + '"]').addClass('hl');
    }
};

$(document).on('click', '#detT .cintkeplet', function() {
    var cel = $('#detbTable #bjelentes .bvec.hl');
    if (cel.length > 0)
        cel[0].scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'center' });
});

function derivSor_det(s, n) {
    const ss = _.dropRight(s, 1);
    const de = expDeriv(ss, n).reverse();
    const fakt = factorial(n);
    const el = $('#detTable tr.parent td #dcimke');
    const elem = $('#detTable tr.child td p');
    el.html("<span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;line-height:normal;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>1</td></tr><tr><td>p!</td></tr></table></span> &#8706;<sup>p</sup>(<b>a</b>*) = <span style='display:inline-block;vertical-align: middle;text-align:center;font-size:90%;margin-right: -0.2em;line-height:normal;'><table class='tort' style='border-collapse: collapse;margin: 0 3px;'><tr><td style='border-bottom:1px solid;'>1</td></tr><tr><td class='licolor'>" + fakt + "</td></tr></table></span>" + " (" + ss.toString() + ")<sup class='licolor'>(" + n + ")</sup> = ...")
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

function vertVonal() {
    $('#detT .vertvonal').remove();
    $('#detT tr.trvonal').removeClass('trvonal');
    $('#detT .tsorszam-n').css({ 'visibility': 'hidden', 'text-align': 'left' });
    const elem = $('#detT .tsorszam-n[data-n=' + (rfb_last.o + 0) + ']');
    $("#detT table tbody .tgomb.shown.hl").closest('tr').addClass('trvonal');
    elem.css({ 'visibility': 'visible', 'text-align': 'left' })
    elem.html(elem.html() + "<span class='vertvonal'></span>");
    var h = $("#detT table tbody").height() - $("#detT table tbody tr:last").height() * 4 + 'px';
    $('#detT .vertvonal').css('height', h);
};

function fbcdat_det(el, s, o) {
    const E = $("#detT .tgomb.hl");
    const DE = E.attr("rfb-data");
    const de = $(el).attr("rfb-data");
    const m = de.split("-")[1] * 1;
    if ($('#detT .tgomb.d-path').length > 0)
        $('#detT .tgomb.d-path').removeClass('d-path');
    if (DE == de && detAb == 'b') {
        if (m != 1)
            $(el).toggleClass('hlmove');
        if (deriv_fix)
            make_Deriv_det();
        return;
    } else {
        const c = kiszed_c('dets');
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

        $('#detT .tsorszam-s.ln').removeClass('ln');
        $('#detT .tsorszam-fix.Li').removeClass('Li');
        $('#detT .tgomb.hlLi').removeClass('hlLi');
        const ce = conjugate(e);
        const oaz = _.isEqual(_.dropRight(ce), _.dropRight(rfb_last["v"])) && rfb_last["s"] > s && !E.hasClass('hlmove');
        const ssv = conjugate(c).slice(0, m);
        const ss = _.sum(ssv) - ssv.length + 1;
        const ssve = ssv.slice(0, m - 1);
        const sse = _.sum(ssve) - ssve.length + 1;
        if (!oaz) {
            //console.log('eset0fo')
            rfbtegla = [0, []];
            rfb_last["v"] = [...ce];
            rfb_last["s"] = s;
            rfb_last["C"] = h;
            if (m != 1)
                rfb_last["Li"] = s - sse;
            else
                rfb_last["Li"] = 0;
            rfb_last["o"] = m;
            rfb_last["bfelett"] = $('#detT table .tgomb.bfelett').length;

            $('#detT .tsorszam-e').css("visibility", "hidden");
            $('#detT .tsorszam-e.corr').html($('#detT .tsorszam-e.corr').attr('data-n'));
            $('#detT .tsorszam-e.corr').removeClass('corr');
            for (var t = s - 1; t < r + Math.floor(s / (r + 1)); t++) {
                $('#detT .tsorszam-e:nth(' + t + ')').css("visibility", "visible").html(h[t - s + 1]);
            }
            if (detAb == 'A')
                $('#detT .tsorszam-e').css("visibility", "hidden");
            $('#detT .tsorszam-e:nth(' + (s - 1) + ')').html(h[0]).addClass("corr");

            $('#detT .tsorszam-s,#detT .tsorszam-fix').css("visibility", "hidden");

            $('#detT .tgomb.hl:not(.szelso)').html('&#x25CB;');
            $('#detT .tgomb.hl.szelso').html('&#x25CE;');
            $('#detT .tgomb.hl').removeClass('hl');
            $('#detT .tgomb.hlLn').removeClass('hlLn').html('&#x25CB;');
            if ($(el).hasClass('szelso'))
                $(el).html('&#x25C9;');
            else
                $(el).html('&#x25CF;');
            $(el).addClass('hl hlmove');

            $('#detT .tgomb.ye').removeClass('ye')
            $('#detT .tgomb.move').removeClass('move');
            $('#detT .tgomb.sel').removeClass('sel').html('&#x25CB;');
            rfbtegla[0] = m - 1;

            if (m != 1) {
                //console.log('eset0mnem1')
                var d = 0;
                if ((sse == r && _.last(c) > 1) || (ss == r && _.last(c) == 1))
                    d++;
                for (var p = sse + ss - s + 1 + d; p <= ss + d; p++) {
                    $('#detT .tgomb.no[rfb-data=' + p + '-' + (boszlopa + 1) + ']').addClass('sel').html('&#x25CF;');
                    rfbtegla[1].push(p)
                    ce[0]++
                        for (var q = 1 + boszlopa; q < m; q++)
                            $('#detT .tgomb.no[rfb-data=' + p + '-' + q + ']').addClass('ye');
                };
                $('#detT .tgomb.sel:nth(0)').addClass('move');
            } else {
                //console.log('eset0megyenlo1')
                rfbtegla[1] = [];
                _.filter($('#detT .tgomb.shown'), function(y) {
                    var tt = $(y).attr('rfb-data').split('-');
                    return tt[0] < s * 1 && tt[1] == m;
                }).map(z => $(z).addClass('hlLn').html('&#x25CF;'));
            }

        }
        for (var t = boszlopa; t < ce.length - 1; t++)
            $('#detT .tsorszam-s:nth(' + (t + 1) + ')').css("visibility", "visible").html(ce[t]);
        $('#detT .tsorszam-fix:nth(' + (boszlopa + 1) + ')').css("visibility", "visible").html(rfb_last["v"][boszlopa] - rfb_last.bfelett);
        for (var t = boszlopa + 1; t < ce.length - 1; t++)
            $('#detT .tsorszam-fix:nth(' + (t + 1) + ')').css("visibility", "visible").html(rfb_last["v"][t]);
        $('#detT .tsorszam-s:nth(' + (t + 1) + ')').css("visibility", "visible").addClass('ln').html($('#detT .tgomb.hlLn').length);
        //$('#detT .tsorszam-s:nth(' + (t + 2) + ')').css("visibility", "visible").html(" = k");
        $('#detT .tsorszam-fix:nth(' + (t + 1) + ')').css("visibility", "visible").addClass('Li').html(rfb_last["Li"]);
        $('#detT .tsorszam-fix:nth(' + (t + 2) + ')').css("visibility", "visible").html(" = p");
        if (ce.length == 1) {
            $('#detT .tsorszam-s:nth(0)').css("visibility", "visible");
            $('#detT .tsorszam-fix:nth(0)').css("visibility", "visible");
        };
        var dv = _.drop(rfb_last["v"], boszlopa);
        dv[0] -= rfb_last.bfelett;
        derivSor_det(dv, rfb_last["Li"]);
        teglaTrim_det();
        if (document.getElementById("rfb_detreszletes").checked) {
            var indx = bdet.length + 1 - rfb_last.v.length + boszlopa;
            hlbts(indx);
            setTimeout(() => { $('#detT table tbody tr td div span.tgomb.sel.ye.move').trigger('click').trigger('click'); }, 200)
        };
    };
};

function zzClear() {
    $('#detT .tgomb.ye').removeClass('ye').html('&#x25CB;')
    $('#detT .tgomb.move').removeClass('move');
    $('#detT .tgomb.sel').removeClass('sel').html('&#x25CB;');
    $('#detT .cintkeplet').html('').removeClass('cintkeplet');
    $('#detT .tsorszam-e').css("visibility", "hidden");
    $('#detT .tsorszam-s,#detT .tsorszam-fix').css("visibility", "hidden");
    $("#detT #binomkijelzo").html("");
    $('#detTable tr.parent td #dcimke').html("");
    $("#detTable #derivkijdet").html("");
    $('#detT .tgomb.szelso').html('&#x25CE;');
    $('#detT .tgomb.d-path').removeClass('d-path');
    $('#detT .vertvonal').remove();
    $('#detT .tsorszam-n').css({ 'visibility': 'hidden', 'text-align': 'left' });
    $('#detT tr.trvonal').removeClass('trvonal');
};

function clearLastab(b) {
    if (!b) {
        $('#detT table .tsorszam-b.lastaelem').removeClass('lastaelem');
        $('#detT table .tsorszam-b.lastbelem').removeClass('lastbelem');
    }
};

function bClear() {
    const lastabfix = document.getElementById('lastabfix').checked;
    $('#detT table .tsorszam-b.hl').removeClass('hl');
    $('#detT table .tgomb.nobben').removeClass('nobben').html('&#x25CB;');
    $('#detT table .tgomb.hlmove').removeClass('hlmove').html('&#x25CB;');
    $('#detT table .tgomb.hl').removeClass('hl');
    $('#detT table .tgomb.bfelett').removeClass('bfelett');
    $('#detT table .tgomb.hlLi').removeClass('hlLi');
    $('#detT table .tgomb.shown.belem').html('&#x25CB;');
    $('#detT table .tgomb.shown.belem').removeClass('belem');
    $('#detT table .tgomb.shown.nobderiv').html('&#x25CB;');
    $('#detT table .tgomb.shown.nobderiv').removeClass('nobderiv');
    if (!lastabfix) {
        $('#detT table .tsorszam-b.lastaelem').removeClass('lastaelem');
        $('#detT table .tsorszam-b.lastbelem').removeClass('lastbelem');
    }
};

function setEgyenlo(a, b) {
    return _.isEqual(_.sortBy(a), _.sortBy(b));
};

function drawAij(i, j) {
    $('#detT table .tsorszam-b.hl').removeClass('hl');
    $('#detT table .tgomb.nobben').removeClass('nobben').html('&#x25CB;');
    $('#detT table .tgomb.hlmove').html('&#x25CB;');
    $('#detT table .tgomb.bfelett').removeClass('bfelett');
    $('#detT table .tgomb.hlLn').removeClass('hlLn');
    $('#detT table .tgomb.hlLi').removeClass('hlLi');
    $('#detT table .tgomb.shown.belem').html('&#x25CB;');
    $('#detT table .tgomb.shown.belem').removeClass('belem');
    $('#detT table .tgomb.shown.nobderiv').html('&#x25CB;');
    $('#detT table .tgomb.shown.nobderiv').removeClass('nobderiv');

    const $table = $('#detT table');
    const n = $('.tsorszam-b:last').attr('data-n') * 1;
    $("#detT table tbody .tsorszam-b[data-n=" + i + "]").addClass('hl');
    const ei = $("#detT table tbody tr:nth(" + (i - 1) + ") td div .tgomb.shown:last");
    ei.addClass('belem').html('&#x25CF;');
    boszlopa = ei.prevAll('.tgomb').length;
    $("#detT table tbody .tsorszam-b[data-n=" + j + "]").addClass('hl');
    const ej = $("#detT table tbody tr:nth(" + (j - 1) + ") td div .tgomb.shown:last");
    ej.addClass('belem').addClass('hlmove').html('&#x25CF;');
    boszlopa2 = ej.prevAll('.tgomb').length;
    for (var l = 0; l <= i - 2; l++) {
        $("#detT table tbody tr:nth(" + l + ") td div .tgomb:nth(" + boszlopa + ")")
            .addClass('bfelett');
    };
    rfb_last["bfelett"] = $('#detT table .tgomb.bfelett').length;
    var delem = $("#detT table tbody tr:nth(" + (bsora2 - 1) + ") td div .tgomb:nth(" + boszlopa2 + ")");

    if (bsora > 0 && bsora2 > 0)
        delem.trigger('click');
    else
        zzClear();
    for (var k = 0; k < i - 1; k++)
        $table.find("tbody tr:nth(" + k + ") td div .tgomb.shown")
        .addClass('nobben').html('&times;');
    $("#detT table tbody tr:nth(" + (i - 1) + ") td div .tgomb.belem").prevAll('.tgomb.shown').addClass('nobben').html('&times;')
    if (j > 0)
        for (var t = j; t < n + 2; t++) {
            $table.find("tbody tr:nth(" + t + ") td div .tgomb.shown")
                .addClass('nobben').html('&times;')
        };
    for (var p = i; p < j; p++) {
        $("#detT table tbody tr:nth(" + p + ") td div .tgomb:not(.no)")
            .removeClass('hlLn')
            .html('&#x25CF;')
            .addClass('nobderiv');
    };
    $('#detT table .tgomb.shown.belem').html('&#x25CF;');
    var Atext = "";
    if (bsora == 0 && bsora2 == 0)
        Atext = "Nincs egyetlen sor sem kijelölve. Két sort kell kijelölni.";
    if ((bsora == 0 && bsora2 > 0) || (bsora > 0 && bsora2 == 0))
        Atext = "Jelöljön ki még egy sort!";
    else if (bsora > 0 && bsora2 > 0) {
        var Aobj = s2mat(kiszed_c('dets'))[bsora - 1][bsora2 - 1];
        Atext = monomvec2HTMLWithId(Aobj);
    };
    document.getElementById('bjelentes').innerHTML = Atext;
    document.getElementById('bfeje').innerHTML = "<b>A</b>";
    document.getElementById('bindexe').innerHTML = bsora + "," + bsora2;
};

function drawbAij(i, add) {
    const ei = $("#detT table tbody tr:nth(" + (i - 1) + ") td div .tgomb.shown:last");
    if (add)
        ei.addClass('aelem').removeClass('afelett').html('&#x25CF;');
    else
        ei.removeClass('aelem').removeClass('afelett').html('&#x25CF;');
    var boszlopa = ei.prevAll('.tgomb').length;
    for (var l = 0; l <= i - 2; l++) {
        if (add)
            $("#detT table tbody tr:nth(" + l + ") td div .tgomb:nth(" + boszlopa + ")")
            .addClass('afelett').html('&#x25CB;');
        else
            $("#detT table tbody tr:nth(" + l + ") td div .tgomb:nth(" + boszlopa + ")")
            .removeClass('afelett').html('&#x25CF;');
    };
};

function detOszlop(n, k) {
    var sl = 0;
    var der = 0;
    var avb = false;
    for (var i = 0; i < n; i++) {
        var s = $("#detT table tbody tr:nth(" + i + ") td div .tgomb:nth(" + k + ").shown:not(.nobben)");
        sl += s.length * 1;
        if (s.hasClass('afelett'))
            der++;
        if (s.hasClass('aelem') || s.hasClass('belem'))
            avb = true;
    }
    return [sl - der, der, avb];
};

function formDetzz(s, j) {
    const v = s[j - 1];
    const m = s[j];
    var nyzj = "",
        zzj = "";
    if (j == 1 || v[2])
        nyzj = "(";
    if (m[2]) {
        zzj = ")";
        if (m[1] > 0)
            zzj += "<sup style='font-weight:400;'>[" + m[1] + "]</sup>";
    }
    return nyzj + v[0] + zzj;
};

function zetaSor_der(s, n) {
    const de = expDeriv(s, n).reverse();
    const fakt = factorial(n);
    var dtxt = '';
    for (let v of de) {
        var c = v[0] / fakt;
        var ertek = "[" + v[1].toString() + "]";
        //var ertek = v[1].toString(); //MAPLEBE
        if (c == 1)
            c = " + ";
        else if (c > 1)
            c = " +  " + c + "&hairsp;"; //MAPLEBE
        if (v[1] != "")
            dtxt += c + " &zeta;<sub>" + ertek + "</sub>";
    };
    dtxt = dtxt.replace("= +", "= ");
    dtxt = dtxt.slice(3);
    return dtxt;
};

function zetaAbHl(e, k) {
    $('#detbTable #bjelentes .hl').removeClass('hl');
    $(e).addClass('hl');
    $('#detbTable #bjelentes .bvec[data-Ab="' + k + '"]').addClass('hl');
};

function kepletDetzz(s) {
    const ss = kiszed_c('dets');
    const n = ss.length - 1;
    var indxs = ["1"];
    $("#detT table tbody tr .tsorszam-b.hlblock,#detT table tbody tr .tsorszam-b.hl").each(function() { indxs.push(this.getAttribute("data-n")) });
    indxs = _.uniq(indxs);
    var b = [];
    var L = s.length;
    while (L > 0) {
        var indx = _.findIndex(s, function(y) { return y[2] != false });
        if (indx > -1) {
            b.push(_.take(s, indx + 1))
            s = _.drop(s, indx + 1);
            L = s.length;
        } else {
            return s;
        }
    };
    for (var j = 0; j < b.length - 1; j++)
        b[j + 1].unshift(_.last(b[j]));
    var txt = "";
    var dtxt = "<span class='bvec' data-Ab='0'><span class='paren1'>(</span>" + monomvec2HTML(vList2obj(bvector(ss)[n - bsora], 1)) + "<span class='paren1'>)</span></span>";
    var cimke = "b<sub>" + bsora + "</sub>&times;";
    var szamlalo = 1;
    var ossz = 0;
    for (let w of b) {
        var k = _.last(w)[1];
        w = _.dropRight(w);
        var v = w.map(y => y[0]);
        ossz += _.sum(v)
        txt += "<span  onclick='zetaAbHl(this," + szamlalo + ");'><span style='font-size:120%;'>&zeta;</span><span class='paren'>[</span>" + formazottTortHTML("&part;<sup>" + k + "</sup>", k + "!") + "(" + v.toString() + ")<span class='paren'>]</span></span>&middot;";
        if (v.length > 1)
            dtxt += "&middot;<span class='bvec' data-Ab='" + szamlalo + "'><span class='paren1'>(</span>" + zetaSor_der(v, k) + "<span class='paren1'>)</span></span>"; // MAPLEBE * &middot;
        else
            dtxt += "&middot;<span class='bvec' data-Ab='" + szamlalo + "'>" + zetaSor_der(v, k) + "</span>"; // MAPLEBE * &middot;
        cimke += "A<sub>" + indxs[szamlalo - 1] + "," + indxs[szamlalo] + "</sub>&middot;";
        szamlalo++;
    };
    txt = txt.slice(0, -8);
    //dtxt = dtxt.slice(0, -8);
    //dtxt = monomvec2HTML(vList2obj(bvector(ss)[bsora - 1], 1)); + "&middot;" + dtxt;
    var elojel = "";
    //console.log(szamlalo + ossz + 1)
    if (cimke.endsWith('&middot;'))
        cimke = cimke.slice(0, -8);
    if ((szamlalo + ossz + 1) % 2 == 1)
        elojel = " − ";
    txt = "<span  onclick='zetaAbHl(this,0);'>b<sub>" + bsora + "</sub></span>&middot;" + txt
    document.getElementById("bjelentes").innerHTML = elojel + txt + " =<br/> = " + elojel + dtxt;
    document.getElementById("bcimke").innerHTML = cimke;
    //return txt + "=<br/>=" + dtxt;
};

function setb(e) {
    const $table = $('#detT table');
    const n = $('.tsorszam-b:last').attr('data-n') * 1;
    const reszl = document.getElementById("rfb_detreszletes").checked;
    if (detAb == 'A') {
        $('#detT table tbody tr td div .tgomb.shown').css('filter', 'none');
        const vansora = $('#detT table .tsorszam-b.hl:first').attr('data-n') * 1 || 1;
        const bsoranext = e.getAttribute('data-n') * 1;
        if (bsoranext == bsora) {
            bsora = 0;
            $('#detT table tbody tr td div .tgomb.shown').css('filter', 'blur(2px)');
        } else if (bsoranext == bsora2) {
            bsora2 = 0;
            $('#detT table tbody tr td div .tgomb.shown').css('filter', 'blur(2px)');
        } else if (bsoranext <= vansora) {
            bsora = bsoranext;
            if (bsora2 == 0)
                bsora2 = vansora;
        } else if (bsoranext > vansora && bsora2 > bsoranext) {
            var d1 = bsoranext - vansora;
            var d2 = bsora2 - bsoranext;
            if (d1 <= d2)
                bsora = bsoranext;
            else
                bsora2 = bsoranext;
        } else if (bsoranext > bsora2 && bsora == 0) {
            bsora = bsora2
            bsora2 = bsoranext;
        } else
            bsora2 = bsoranext;
        if (bsora > 0 && bsora2 > 0) {
            bsorRendez();
        };
        drawAij(bsora, bsora2);
    } else if (detAb == 'b') {
        bClear();
        bsora = e.getAttribute('data-n') * 1;
        const belem = ($("#detT table tbody tr:nth(" + (bsora - 1) + ") td div .tgomb.shown:last"));
        boszlopa = belem.prevAll('.tgomb').length;
        belem.addClass('belem').html('&#x25CF;');
        belem.prevAll('.tgomb.shown').addClass('nobben').html('&times;');
        $(e).addClass('hl');
        for (var i = 0; i < bsora - 1; i++)
            $table.find("tbody tr:nth(" + i + ") td div .tgomb.shown")
            .addClass('nobben').html('&times;');
        for (var j = bsora; j < n + 1; j++) {
            $("#detT table tbody tr:nth(" + (j) + ") td div .tgomb:nth(" + boszlopa + "):not(.no)")
                .html('&#x25CF;')
                .addClass('nobderiv');
            $("#detT table tbody tr:nth(" + (j) + ") td div .tgomb.shown:last")
                .html('&#x25CF;')
                .addClass('nobderiv');
        };
        for (var j = 0; j <= bsora - 2; j++) {
            $("#detT table tbody tr:nth(" + (j) + ") td div .tgomb:nth(" + boszlopa + "):not(.no)")
                .addClass('bfelett');
        };

        rfb_last["bfelett"] = $('#detT table .tgomb.bfelett').length;
        zzClear();
        const s = kiszed_c('dets');
        if (reszl) {
            if ($("#detbTable #bjelentes table.btable.c").length == 0)
                b2tables(s);
            $("#detbTable #bjelentes table.btable.c tbody tr td[data-bt=" + bsora + "]").trigger('click');
        } else
            document.getElementById('bjelentes').innerHTML = monomvec2HTMLWithId(symbOv(vList2obj(bvector(s)[n - bsora], 1)));
        document.getElementById('bfeje').innerHTML = "b";
        document.getElementById('bindexe').innerHTML = bsora;
    } else if (detAb == 'Ab') {
        $('#detT table tbody tr td div .tgomb.shown').css('filter', 'none');
        const indx = e.getAttribute('data-n') * 1;
        const elsoblokk = $("#detT table tbody tr .tsorszam-b[data-block='1']").length + 1;
        if (indx == 1) {
            zzClear();
            bClear();
            $("#detT table tbody tr .tsorszam-b.lastbelem").removeClass('lastbelem');
            bsora = e.getAttribute('data-n') * 1;
            const belem = $("#detT table tbody tr:nth(" + (bsora - 1) + ") td div .tgomb.shown:last");
            boszlopa = 0;
            belem.addClass('belem').html('&#x25CF;')
            $(e).addClass('hl').addClass('lastbelem');
            const onelem = $("#detT table tbody .tsorszam-b.hlblock");
            onelem.removeClass('hlblock').removeClass('lastaelem');
            onelem.parent('th').parent('tr').find('.tgomb.shown:last').removeClass('aelem');
            for (var i = 1; i < n + 1; i++) {
                $table.find("tbody tr:nth(" + i + ") td div .tgomb.shown")
                    .addClass('nobderiv')
                $table.find("tbody tr:nth(" + i + ") td div .tgomb.shown:not(.no)")
                    .html('&#x25CF;');
                $("#detT table tbody tr:nth(" + i + ") td div .tgomb.shown")
                    .removeClass('aelem')
                    .removeClass('afelett').html('&#x25CF;');
            };
            //$table.find(".tgomb.shown.szelso").css('pointer-events', 'none');
            rfb_last["bfelett"] = $('#detT table .tgomb.bfelett').length;
            document.getElementById('bjelentes').innerHTML = monomvec2HTML(symbOv(vList2obj(bvector(kiszed_c('dets'))[n - bsora], 1)));
            document.getElementById('bfeje').innerHTML = "b";
            document.getElementById('bindexe').innerHTML = bsora;
            document.getElementById("bcimke").innerHTML = "b<sub>" + bsora + "</sub>";
            return;
        } else if (indx < elsoblokk) {
            return;
        } else if (indx == bsora) {
            bClear();
            $('#detT table tbody tr td div .tgomb.shown').css('filter', 'blur(2px)');
            bsora = 0;
        } else if (indx > bsora) {
            zzClear();
            bClear();
            $("#detT table tbody tr .tsorszam-b.lastbelem").removeClass('lastbelem');
            $("#detT table tbody .tsorszam-b[data-block='" + bblokkja + "']").parent('th').parent('tr').find('td div .tgomb.shown.afelett').each(function() { $(this).removeClass('afelett').html('&#x25CF;') })
            const belem = ($("#detT table tbody tr:nth(" + (indx - 1) + ") td div .tgomb.shown:last"));
            bblokkja = $("#detT table tbody tr:nth(" + (indx - 1) + ") .tsorszam-b").attr('data-block') * 1;
            boszlopa = belem.prevAll('.tgomb').length;
            belem.addClass('belem').html('&#x25CF;');
            belem.prevAll('.tgomb.shown').addClass('nobderiv').html('&#x25CF;');
            for (var j = 0; j <= indx - 2; j++) {
                $("#detT table tbody tr:nth(" + (j) + ") td div .tgomb:nth(" + boszlopa + "):not(.no)")
                    .addClass('afelett').html('&#x25CB;');
            };
            $(e).addClass('hl').addClass('lastbelem');
            $("#detT table tbody tr .tsorszam-b.hlblock[data-block='" + bblokkja + "']")
                .removeClass('hlblock').removeClass('lastaelem');
            for (var i = 1; i < indx; i++) {
                $table.find("tbody tr:nth(" + i + ") td div .tgomb.shown")
                    .addClass('nobderiv')
                $table.find("tbody tr:nth(" + i + ") td div .tgomb.shown:not(.afelett):not(.no)")
                    .html('&#x25CF;');
            };
            for (var j = indx; j < n + 1; j++) {
                /* $("#detT table tbody tr:nth(" + j + ") td div .tgomb:nth(" + boszlopa + "):not(.no)")
                    .html('&#x25CF;')
                    .addClass('nobderiv');
                $("#detT table tbody tr:nth(" + j + ") td div .tgomb.shown:last")
                    .html('&#x25CF;')
                    .addClass('nobderiv'); */
                $("#detT table tbody tr:nth(" + j + ") .tsorszam-b.hlblock")
                    .removeClass('hlblock').removeClass('lastaelem');
                $("#detT table tbody tr:nth(" + j + ") td div .tgomb.shown")
                    .removeClass('aelem')
                    .removeClass('afelett').html('&#x25CF;');
            };
            for (var j = 0; j <= indx - 2; j++) {
                $("#detT table tbody tr:nth(" + j + ") td div .tgomb:nth(" + boszlopa + "):not(.no)")
                    .removeClass('aelem')
            };
            for (var t = indx; t < n + 2; t++) {
                $table.find("tbody tr:nth(" + t + ") td div .tgomb.shown")
                    .addClass('nobben').html('&times;')
            };

            bsora = indx;
            rfb_last["bfelett"] = $('#detT table .tgomb.bfelett').length;
        } else if (indx < bsora) {
            const bl = $(e).attr('data-block') * 1;
            const bln = $(e).attr('data-n') * 1
            if (bl !== 1 && bl != bblokkja) {
                const onelem = $("#detT table tbody .tsorszam-b.hlblock[data-block='" + bl + "']");
                const on = onelem.attr('data-n') * 1 || 0;
                onelem.removeClass('hlblock').removeClass('lastaelem');
                onelem.parent('th').parent('tr').find('.tgomb.shown:last').removeClass('aelem');
                $("#detT table tbody .tsorszam-b[data-block='" + bl + "']").parent('th').parent('tr').find('td div .tgomb.shown.afelett').each(function() { $(this).removeClass('afelett').html('&#x25CF;') })
                if (bln != on) {
                    $(e).addClass('hlblock').addClass('lastaelem');
                    drawbAij(indx, true);
                } else {
                    drawbAij(indx, false);
                };
            };
        };
        if (bsora > 0) {
            $("#detT table tbody tr:nth(0) td div .tgomb.belemfix").html('&#x25CF;');
            var ssorba = [];
            for (var k = 0; k < boszlopa + 1; k++)
                ssorba.push(detOszlop(n, k));
            $('#detT table .tsorszam-s.ln').removeClass('ln');
            $('#detT table .tsorszam-fix.Li').removeClass('Li');
            for (var j = 1; j < boszlopa + 1; j++) {
                var ds = $('#detT table .tsorszam-s[data-n="' + j + '"]');
                ds.css({
                    'visibility': 'visible',
                    'vertical-align': 'bottom'
                }).html(formDetzz(ssorba, j));
                $('#detT .tsorszam-fix[data-n="' + j + '"]').css("visibility", "visible").html(ssorba[j - 1][0] + ssorba[j - 1][1]);
            };
            const Lihez = _.last(ssorba)
            $('#detT .tsorszam-fix[data-n="' + (boszlopa + 1) + '"]').css("visibility", "visible").html(Lihez[0] + Lihez[1]).addClass('Li');
            var dsb = $('#detT table .tsorszam-s[data-n=0]');
            dsb.css({
                'visibility': 'visible',
                'vertical-align': 'bottom'
            }).html('b<sub>' + bsora + '</sub>&nbsp;&times;');
            kepletDetzz(ssorba);
            document.getElementById('bfeje').innerHTML = "b";
            document.getElementById('bindexe').innerHTML = bsora;
        } else {
            $('#detT table .tsorszam-s').css({ 'visibility': 'hidden' });
        };
    };
};

function bsorRendez() {
    var bs = Math.min(bsora, bsora2);
    var bs2 = Math.max(bsora, bsora2);
    if (bs == bs2)
        bs = 1;
    bsora = bs;
    bsora2 = bs2;
};

function detAbmode(e) {
    if (detAb == 'b') {
        detAb = 'A';
        e.innerHTML = '<b>A</b><sub>i,j</sub>';
        zzClear();
        if ($('#detT table .tsorszam-b.lastaelem').length == 1) {
            bsora = $('#detT table .tsorszam-b.lastaelem:nth(0)').attr('data-n') * 1;
            bsora2 = $('#detT table .tsorszam-b.lastbelem').attr('data-n') * 1;

        } else if ($('#detT table .tsorszam-b.lastaelem').length > 1) {
            bsora = $('#detT table .tsorszam-b.lastaelem:nth(0)').attr('data-n') * 1;
            bsora2 = $('#detT table .tsorszam-b.lastaelem:nth(1)').attr('data-n') * 1;
        } else {
            if (bsora < 1)
                bsora = 1;
            const n = $('.tsorszam-b:last').attr('data-n') * 1;
            if (bsora2 < 1)
                bsora2 = n;
        };
        bsorRendez();
        drawAij(bsora, bsora2);
    } else if (detAb == 'A') {
        detAb = 'Ab';
        e.innerHTML = 'det';
        if ($('#detT table .tsorszam-b.lastbelem').length > 0) {
            bsora = 0;
            $('#detT table .tsorszam-b.lastbelem').trigger('click');
        } else
            $('#detT table .tsorszam-b:nth(' + bsora2 + ')').trigger("click");
        if ($('#detT table .tsorszam-b.lastaelem').length > 0)
            $('#detT table .tsorszam-b.lastaelem').trigger('click');
        //$("#detT table tbody tr:last").css('display', 'none');
        $("#detT table tbody tr:nth(0) td div .tgomb.shown:last").addClass('belemfix').html('&#x25CF;');
        $('#detT table .tsorszam-b:nth(1)').addClass('hlfix');
        $("#detT table tbody tr .tgomb.shown.szelso").css('pointer-events', 'none');
    } else if (detAb == 'Ab') {
        if (bsora < 1)
            $('#detT table .tsorszam-b.lastbelem').trigger('click');
        detAb = 'b';
        e.innerHTML = 'b<sub>i</sub>';
        zzClear();
        $("#detT table tbody  tr .tgomb.shown.szelso").css('pointer-events', 'all');
        $('#detT table tbody tr td div .tgomb.shown').css('filter', 'none');
        //$("#detT table tbody tr:last").css('display', '');
        $('#detT table tbody tr .tsorszam-b.hlfix').removeClass('hlfix');
        $("#detT table tbody tr .tsorszam-b.hlblock").removeClass('hlblock');
        $("#detT table tbody tr:nth(0) td div .tgomb.shown:last").removeClass('belemfix');
        $("#detT table tbody tr td div .tgomb.shown")
            .removeClass('aelem')
            .removeClass('belem')
            .removeClass('afelett').html('&#x25CF;');
        $('#detT table .tsorszam-s:not(.ln)').css({ 'visibility': '', 'vertical-align': 'middle' })
        if (bsora < 1) {
            $('#detT table .tsorszam-b:nth(1)').trigger("click");
        } else
            $('#detT table .tsorszam-b:nth(' + bsora + ')').trigger("click");
        document.getElementById("bcimke").innerHTML = "";
    };
};

function rfbGraph_det() {
    rfbtegla = [0, []];
    rfb_last = { "v": [], "s": 0, "C": [], "Li": 0, "o": 0, "bfelett": 0 };
    boszlopa = 0;
    bsora = 0;
    boszlopa2 = 0;
    bsora2 = 0;
    bblokkja = 1;
    detAb = 'b';
    const elem = document.getElementById("detT");
    const c = kiszed_c('dets');
    const kc = kum(c);
    const r = c.length;
    const reszl = document.getElementById("rfb_detreszletes").checked;
    var k = [0];
    for (var i = 1; i < r; i++) {
        k.push(kc[i - 1] - i);
    };

    var kep = "<span id='show_deriv' onclick='toggle_Deriv_det();'>&#x25CB;</span><table style='border-collapse:collapse;display:inline-table;'><input type='checkbox' id='setderfix' onchange='setDerfix_det(this);' style='height:20px;width:20px;display: inline-block;position: relative;left: -40px;'><thead><tr><th><span class='tsorszam-b' data-n='0' style='font-size: 16px;outline: 1px solid #aaa;outline-offset: 2px;background-color: white;' onclick='detAbmode(this);'>b<sub>i</sub></span></th><th>";
    for (var i = 1; i < _.last(kc) - r + 2; i++) {
        kep += "<span class='tsorszam-n' data-n='" + i + "'>" + i + "</span>";
    };
    kep += "<th style='width:21.36px'></th></th><td></td></tr></thead>";
    var szamlalo = 1;
    var blokkok = []
    for (var j = 0; j < r; j++) {
        var oszt = "";
        var thd = " data-block='" + szamlalo + "' ";
        if (c[j] > 1) {
            oszt = " class='rowlinetukor'";
            blokkok.push(j);
        };

        if (c[j + 1] > 1) {
            szamlalo++;;
        };

        if (j < r - 1)
            kep += "<tr" + oszt + "><th><span class='tsorszam-b'" + thd + " data-n='" + (j + 1) + "' onclick='setb(this)'>" + (j + 1) + "</span></th><td><div>";
        else
            kep += "<tr" + oszt + "><span class='tsorszam-b' data-n='" + (j + 1) + "'></span><th></th><td><div>";
        for (var t = 0; t < k[j]; t++) {
            kep += "<span class='tgomb no' onclick='moveSelect_det(this);' rfb-data='" + (j + 1) + "-" + (t + 1) + "'>&#x25CB;</span> ";
        };
        for (var t = k[j]; t < k[j] + c[j]; t++) {
            kep += "<span class='tgomb shown' rfb-data='" + (j + 1) + "-" + (t + 1) + "' onclick='fbcdat_det(this," + ((j + 1) + "," + (t - k[j] + 1)) + ")'>&#x25CB;</span> ";
        };
        kep += "</div></td><th><span class='tsorszam-e'  data-n='" + c[j] + "'>" + c[j] + "</span></th><td><div  id='ebbe-" + (j + 1) + "'></div></td>";
    };
    kep += "<tr><th></th><td><div>";
    //console.log(blokkok);
    var L = _.last(k) + _.last(c);
    for (var t = 0; t < L - 1; t++)
        kep += "<span class='tgomb no' onclick='moveSelect_det(this);' rfb-data='" + (r + 1) + "-" + (t + 1) + "'>&#x25CB;</span> ";;
    kep += "<span class='tgomb shown szelso' style='border-radius: 50%;padding: 0 0.31em;margin-left: -0.31em;' onclick='fbcdat_det(this," + (r + 1) + "," + L + ")' rfb-data='" + (r + 1) + "-" + L + "'>&#x25CE;</span></div></td><th><span class='tsorszam-e szelso' data-n='( )'>( )</span></th><td><div  id='ebbe-" + (r + 1) + "'></div></td>";
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
    setOutputFontrfb_det(document.getElementById("setoutputfontrfb_det").value);
    $('#detT #show_deriv').css('top', Math.max(20, ($('#detT table').height() - 40) / 2) + 'px');
    $('#detT table .tsorszam-b:nth(1)').trigger("click");
    if (deriv_fix)
        document.getElementById("setderfix").click();
    if (reszl) {
        b2tables(c);
        setTimeout(() => { $('#detT table .tsorszam-b.hl').trigger("click"); }, 300);
    };
};

// jegcsapdiagram

function setOutputFontjcs(v) {
    var elem = document.getElementById("Jcs");
    elem.style.fontSize = v + '%';
};

function JcsGraph() {
    const elem = document.getElementById("Jcs")
    elem.innerHTML = "Itt lesz a jégcsapdiagram kimentete."
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
    const W = comp0(n, sn); //.reverse();
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

function invugras(elem) {
    var indx = elem.getAttribute("kp-data");
    indx = JSON.parse("[" + indx.replaceAll("-", ",") + "]");
    const k = _.findIndex(allcompReg, y => _.isEqual(y, indx)) + 1;
    $("#lepeskijelzo").val(k).trigger("click)").trigger("change");
}

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
            keplet += "<span class='kpblokk' style='cursor:pointer;background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k.toString().replaceAll(",", "-") + "' onclick='invugras(this)'>"
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
            keplet += "<span class='kpblokk' style='cursor:pointer;background-color:" + color + "25;outline-color:" + color + "' kp-data='" + kk.toString().replaceAll(",", "-") + "'  onclick='invugras(this)'>"
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
            keplet += "<span class='kpblokk ov' style='cursor:pointer;background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k2.toString().replaceAll(",", "-") + "'  onclick='invugras(this)'>"
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
            keplet += "<span class='kpblokk ov' style='cursor:pointer;background-color:" + color + "25;outline-color:" + color + "' kp-data='" + k3.toString().replaceAll(",", "-") + "' onclick='invugras(this)'>"
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

function htmlRAdmissible(n, k, d) {
    var out = "";
    var A = Admissible(n, k);
    var jel = "";
    if (d) {
        jel += "d";
    }
    for (let a of A) {
        var m = a[0]
        if (m == 1)
            m = "";
        else
            m += "&lowast;";
        var w = a[1].toString();
        var wj = a[1].toString();;
        if (d)
            wj = dualofv(a[1]).toString();

        out += "<span class='adm" + jel + "' adm" + jel + "-data='" + wj.replaceAll(",", "-") + "' coeff-data='" + a[0] + "' onclick='adm" + jel + "hl(this);'>" + m + "(" + w + ")</span> + ";
    };
    out = out.slice(0, -3);
    return out;
};

function admhl(elem) {
    $('#nk .adm.hl,#nk .admd.hl').removeClass('hl');
    $(elem).addClass('hl');
    const dat = elem.getAttribute('adm-data');
    const elemd = $('#nk .admd[admd-data=' + dat + ']')
    elemd.addClass('hl');
    var kijel = formazottTortHTML("s<sub>1</sub> - 1", "c") + "&nbsp;·[c&lowast;<b>s</b>] =" + formazottTortHTML(dat.split('-')[0] - 1, elem.getAttribute('coeff-data')) + "&nbsp;·" + elem.innerText + "<sup>&dagger;</sup> = " + elemd[0].innerText;
    document.getElementById("nktr").innerHTML = kijel;
};

function admdhl(elem) {
    $('#nk .adm.hl,#nk .admd.hl').removeClass('hl');
    $(elem).addClass('hl');
    const dat = elem.getAttribute('admd-data');
    const elemd = $('#nk .adm[adm-data=' + dat + ']')
    elemd.addClass('hl');
    var kijel = formazottTortHTML("s<sub>1</sub> - 1", "c") + "&nbsp;·[c&lowast;<b>s</b>] =" + formazottTortHTML(dat.split('-')[0] - 1, elemd[0].getAttribute('coeff-data')) + "&nbsp;·" + elemd[0].innerText + "<sup>&dagger;</sup> = " + elem.innerText;
    document.getElementById("nktr").innerHTML = kijel;
};

function nkWrite() {
    const elem = document.getElementById("nk");
    const n = document.getElementById("nt").value * 1;
    const k = document.getElementById("kt").value * 1;
    if (n < k)
        elem.innerHTML = drawAngel("n", "k") + " = " + drawAngel(n, k) + " nem értelmezett."
    else {
        const vonal = "<hr style='color:#d7d7d73d;'/>";
        const sor1 = drawAngel("n", "k") + " = " + drawAngel(n, k) + " = " + htmlRAdmissible(n, k, false);
        const sor3 = drawAngel("n", "n - k") + " = " + drawAngel(n, n - k) + " = " + htmlRAdmissible(n, n - k, true);
        var sortr = "<div id='nktr'> </div>";
        elem.innerHTML = sor1 + vonal + sortr + vonal + sor3;
    }
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
    return "<span style='display:inline-block;vertical-align: middle'><span style='display:inline-block;transform: scaleY(2.7) scaleX(1.6) translateY(0.05em);'>&LeftAngleBracket;</span><table style='text-align:center;display:inline-table;border-collapse: collapse;margin: 0 5px;'><tr><td>" + n + "</td></tr><tr><td>" + k + "</td></tr></table><span style='display:inline-block;transform: scaleY(2.7) scaleX(1.6) translateY(0.05em);'>&RightAngleBracket;</span></span>";
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

function setOutputFont11(v) {
    var elem = document.getElementById("nk");
    elem.style.fontSize = v + 'px';
};

function setOutputFont12(v) {
    var elem = document.getElementById("outk29");
    elem.style.fontSize = v + 'px';
};

function setOutputFontDet(v) {
    var elem = document.getElementById("outdet");
    elem.style.fontSize = v + 'px';
};

function Shuffle(a, b) {
    var s = [];
    if (a.length == 0)
        s = [b];
    else if (b.length == 0)
        s = [a];
    else if (a[0] == 1 && b[0] == 1) {
        for (let y of Shuffle(a.slice(1), b))
            s.push(_.concat([1], y));
        for (let x of Shuffle(a, b.slice(1)))
            s.push(_.concat([1], x));
    } else if (a[0] > 1 && b[0] == 1) {
        for (let y of Shuffle([a[0] - 1, ...a.slice(1)], b))
            s.push(nconc([1], y));
        for (let x of Shuffle(a, b.slice(1)))
            s.push(_.concat([1], x));
    } else if (a[0] == 1 && b[0] > 1) {
        for (let y of Shuffle(a.slice(1), b))
            s.push(_.concat([1], y));
        for (let x of Shuffle(a, [b[0] - 1, ...b.slice(1)]))
            s.push(nconc([1], x));
    } else {
        for (let y of Shuffle([a[0] - 1, ...a.slice(1)], b))
            s.push(nconc([1], y));
        for (let x of Shuffle(a, [b[0] - 1, ...b.slice(1)]))
            s.push(nconc([1], x));
    };
    return s;
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

function printShuffle(a, b) {
    const s = _.countBy(Shuffle(a, b));
    var eloj = " + ";
    var out = "";
    _.forEach(s, function(value, key) {
        eloj = " + ";
        if (value > 1)
            eloj += value + "&lowast;";
        out += eloj + "(" + key + ")"
    });
    out = out.slice(3);
    return out;
};

function Shuffle1(a, b) {
    var s = "";
    if (a.length == 0)
        s = "(" + b.toString() + ")";
    else if (b.length == 0)
        s = "(" + a.toString() + ")";
    else if (a[0] == 1 && b[0] == 1) {
        s += "(1)&bullet;[(" + a.slice(1).toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + b.toString() + ")]";
        s += " + (1)&bullet;[(" + a.toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + b.slice(1).toString() + ")]";
    } else if (a[0] > 1 && b[0] == 1) {
        s += "(1)&odot;[(" + [a[0] - 1, ...a.slice(1)].toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + b.toString() + ")]";
        s += " + (1)&bullet;[(" + a.toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + b.slice(1).toString() + ")]";
    } else if (a[0] == 1 && b[0] > 1) {
        s += "(1)&bullet;[(" + a.slice(1).toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + b.toString() + ")]";
        s += " + (1)&odot;[(" + a.toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + [b[0] - 1, ...b.slice(1)].toString() + ")]";
    } else {
        s += "(1)&odot;[(" + [a[0] - 1, ...a.slice(1)].toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + b.toString() + ")]";
        s += " + (1)&odot;[(" + a.toString() + ")<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>(" + [b[0] - 1, ...b.slice(1)].toString() + ")]";
    };
    s = s.replaceAll("()", "( )")
    document.getElementById("shoutr").innerHTML = s;
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
        out.push(shuffleReg(JSON.parse("[" + key + "]")).map(y => [-value * y[0], y[1]]));
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

// Shuffle szétbontás

function pozvagas(s) {
    const n = s.length;
    var vagas = [];
    for (var j = 0; j < n; j++) {
        if (1 < s[j]) {
            for (var i = 1; i < s[j]; i++) {
                var a = [..._.take(s, j), s[j] - i];
                var c = [i, ..._.takeRight(s, n - 1 - j)];
                var b = [...leading1(c)];
                var p = c.length - b.length;
                vagas.push([a, p, b]);
            };
        };
    };
    return vagas;
};

function Poztag(w) {
    let a = w[0];
    let p = w[1];
    let b = w[2];
    var tag = [];
    if (b.length > 0) {
        for (var k = 0; k <= p; k++) {
            let d1 = expDeriv(conjugate(a), k);
            let d2 = expDeriv(dualofv(b), p - k);
            let coeff = Math.pow(-1, _.sum(a) + p + k + 1) * binomial(p, k) / factorial(p);
            for (let v1 of d1) {
                for (let v2 of d2) {
                    tag.push([coeff * v1[0] * v2[0], v1[1], v2[1]]);
                }
            }
        }
    } else {
        var d = expDeriv(conjugate(a), p);
        var coeff = Math.pow(-1, _.sum(a) + 1) / factorial(p);
        for (let v of d)
            tag.push([coeff * v[0], v[1]]);
    }
    return tag;
};

function keplet29(s) {
    return out = pozvagas(s).map(y => Poztag(y));
};

function printShuffleId(a, b) {
    const s = _.countBy(Shuffle(a, b));
    var eloj = " + ";
    var out = "";
    _.forEach(s, function(value, key) {
        var c = "";
        if (value > 1)
            c += value + "&lowast;";
        out += eloj + "<span class='k29' data-k29='" + key.replaceAll(',', "-") + "' onclick=' k29Highlight(this)'>" + c + "(" + key + ")</span>";
    });
    out = out.slice(3);
    return out;
};

function k29Highlight(elem) {
    $("#outk29 span.k29.hl").removeClass('hl');
    $("#outk29 span.shk29.hl").removeClass('hl');
    const dat = elem.getAttribute('data-k29');
    $("#outk29 span.k29[data-k29='" + dat + "']").addClass('hl');
    var elem2 = $(elem).parent('.shk29')
    if (elem2.length > 0) {
        const dat2 = elem2[0].getAttribute('data-shk29');
        $("#outk29 span.shk29[data-shk29='" + dat2 + "']").addClass('hl');
    }
};

function shk29Highlight(elem) {
    $("#outk29 span.k29.hl").removeClass('hl');
    $("#outk29 span.shk29.hl").removeClass('hl');
    const dat = elem.getAttribute('data-shk29');
    $("#outk29 span.shk29[data-shk29='" + dat + "']").addClass('hl');
};

function cleark29() {
    $("#outk29 span.k29.hl").removeClass('hl');
    $("#outk29 span.shk29.hl").removeClass('hl');
};


function formk29() {
    const s0 = leading1(kiszed_dbl("sk29", "figyk29"));
    const n = document.getElementById("k29n").value * 1;
    const val = document.getElementById("k29vallaszto").checked;
    var s = [];
    if (val) {
        s.push(1);
        s.push(s0[0] - 1)
        for (var u = 1; u < s0.length; u++)
            s.push(s0[u]);
        s = dualofv(s);
    } else
        s = _.concat(Array(n).fill(1), s0);

    const k29 = keplet29(s);
    const stf = "<span style='font-size:1.5em;text-decoration:underline;text-underline-offset: 3px;'>&#x29E2;</span>";
    const sa = leading1(s);
    const L = s.length - sa.length;
    const fakt = Math.pow(-1, L) / factorial(L);
    const ds = expDeriv(dualofv(sa), L).map(y => [fakt * y[0], y[1]]);
    var txtd = "";
    for (let w of ds) {
        var c = w[0];
        var c0 = w[0];
        if (c == -1)
            c = " − ";
        else if (c == 1)
            c = " + ";
        else if (c > 1)
            c = " + " + c + "&lowast;";
        else if (c < 1)
            c = " − " + -1 * c + "&lowast;";
        var w1 = w[1].toString();
        txtd += c.slice(0, 3) + "<span class='k29' data-k29='" + w1.replaceAll(',', "-") + "' onclick='k29Highlight(this)'>" + c.slice(3) + "(" + w1 + ")</span>";
    };

    if (txtd.startsWith(" + "))
        txtd = txtd.slice(3);
    txtd = "<span class='out29d'>" + txtd + "</span>"
    var txt = "";
    var txt2 = "";
    var txt3 = "";
    var ss = [];
    for (let t of k29) {
        for (let w of t) {
            var c = w[0];
            var c0 = w[0];
            if (c == -1)
                c = " − ";
            else if (c == 1)
                c = " + ";
            else if (c > 1)
                c = " + " + c + "&lowast;";
            else if (c < 1)
                c = " − " + -1 * c + "&lowast;";
            if (w.length == 3) {
                var dat = (w[1].toString() + "--" + w[2].toString()).replaceAll(',', "-");
                txt += c.slice(0, 3) + "<span class='shk29' data-shk29='" + dat + "' onclick='shk29Highlight(this)'>" + c.slice(3) + "(" + w[1].toString() + ") " + stf + " (" + w[2].toString() + ")</span>";
                txt2 += c.slice(0, 3) + "<span class='shk29' data-shk29='" + dat + "'>" + c.slice(3) + "<span class='paren'>[</span>" + printShuffleId(w[1], w[2]) + "<span class='paren'>]</span></span>";
                ss.push(Shuffle(w[1], w[2]).map(y => [c0, y]));
            } else if (w.length == 2) {
                var w1 = w[1].toString();
                txt += c.slice(0, 3) + "<span class='k29' data-k29='" + w1.replaceAll(',', "-") + "' onclick='k29Highlight(this)'>" + c.slice(3) + "(" + w1 + ")</span>";;
                txt2 += c.slice(0, 3) + "<span class='k29' data-k29='" + w1.replaceAll(',', "-") + "' onclick='k29Highlight(this)'>" + c.slice(3) + "(" + w1 + ")</span>";
                ss.push([
                    [c0, w[1]]
                ]);
            }
        }
    };

    var obj = _.groupBy(_.flatten(ss), y => y[1]);
    _.forEach(obj, function(value, key) {
        obj[key] = _.sum(value.map(y => y[0]));
    });
    _.forEach(obj, function(value, key) {
        var c = value;
        if (c != 0) {
            if (c == -1)
                c = " − ";
            else if (c == 1)
                c = " + ";
            else if (c > 1)
                c = " + " + c + "&lowast;";
            else if (c < 1)
                c = " − " + -1 * c + "&lowast;";
            txt3 += c.slice(0, 3) + "<span class='k29' data-k29='" + key.replaceAll(',', "-") + "' onclick='k29Highlight(this)'>" + c.slice(3) + "(" + key + ")</span>";
        }
    });
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    txt = "<span class='out291'>" + txt + "</span>"
    if (txt2.startsWith(" + "))
        txt2 = txt2.slice(3);
    if (txt3.startsWith(" + "))
        txt3 = txt3.slice(3);
    txt3 = "<span class='out29d'>" + txt3 + "</span>";
    const rule = " = <hr style='color: #c8c8c870;'/> = "
    var txtall = txtd + rule + txt + rule + txt2 + rule + txt3;
    document.getElementById("outk29").innerHTML = txtall;
};

// bvector of deterinant and the full determinant in object-vector  form

function btag(w) {
    let a = w[0];
    let p = w[1];
    let b = w[2];
    var tag = [];
    if (b.length > 0) {
        let d = expDeriv(conjugate(a), p);
        let coeff = Math.pow(-1, _.sum(a) + 1) / factorial(p);
        for (let v of d)
            tag.push([coeff * v[0], v[1], b]);
    } else {
        var d = expDeriv(conjugate(a), p);
        var coeff = Math.pow(-1, _.sum(a) + 1) / factorial(p);
        for (let v of d)
            tag.push([coeff * v[0], v[1]]);
    }
    return tag;
};

function bvector_s(s) {
    return _.flatten(pozvagas(s).map(y => btag(y)));
};

function bvector(s) {
    const na_revs = revlexelotte(s).filter(y => y[0] == 1 && y.length > 1);
    var out = [];
    for (let w of na_revs)
        out.push(bvector_s(w));
    return dense0(out);
};

function hlbtc(e) {
    $("#detbTable #bjelentes table.btable.c td.hl").removeClass('hl');
    $("#detbTable #bjelentes table.btable.c td.bk .bknum.hl").removeClass('hl');
    const n = $("#detbTable #bjelentes table.btable.c tr:nth(0) th").length;
    $(e).children('.bknum').addClass('hl');
    const $table = $("#detbTable #bjelentes table.btable.c");
    const sor = e.closest('tr').rowIndex;
    const oszlop = e.cellIndex;
    $table.find("tr:nth(" + sor + ") td:nth(" + (oszlop - 1) + ").bk").addClass('hl');
    for (var j = oszlop; j < n + 1; j++)
        $table.find("tr:nth(1) td:nth(" + j + ")").addClass('hl');
};

function hlbtclear() {
    bdet = [];
    document.getElementById("bdetnek").innerHTML = "";
    document.getElementById('bsornak').innerHTML = "";
    $("#detbTable #bjelentes table.btable.c td.hl").removeClass('hl');
    $("#detbTable #bjelentes table.btable.c td.bk .bknum.hl").removeClass('hl');
};

function hlbts(k) {
    if (detAb == 'b') {
        if (k == 0)
            return;
        $("#detbTable #bjelentes table.btable.s td.hl").removeClass('hl');
        $("#detbTable #bjelentes table.btable.s td.bk .bknum.hl").removeClass('hl');
        const n = $("#detbTable #bjelentes table.btable.s tr:nth(0) th").length;
        const $table = $("#detbTable #bjelentes table.btable.s");
        const e = $table.find("td.bk[data-bt=" + k + "]")[0];
        $(e).children('.bknum').addClass('hl');
        if (e != undefined) {
            const sor = e.closest('tr').rowIndex;
            const oszlop = e.cellIndex;
            $table.find("tr:nth(" + sor + ") td:nth(" + (oszlop - 1) + ").bk").addClass('hl');
            for (var j = oszlop; j < n + 1; j++)
                $table.find("tr:nth(1) td:nth(" + j + ")").addClass('hl');
        }

        $("#detbTable #bjelentes table.btable.b td.hl,#detbTable #bjelentes table.btable.b th.hl").removeClass('hl');
        $("#detbTable #bjelentes table.btable.b td.hle").removeClass('hle');
        $("#detbTable #bjelentes table.btable.b td.bh").removeClass('bh');
        const n1 = $("#detbTable #bjelentes table.btable.b tr:nth(0) th").length;
        const $table1 = $("#detbTable #bjelentes table.btable.b");
        const K = n1 - k;
        const e1 = $table1.find("td:nth(" + (K - 1) + ")");
        e1.addClass('bh');
        $table1.find("tr:nth(0) th:nth(" + K + ")").addClass('hl');
        for (var i = 1; i < K; i++)
            $table1.find("tr:nth(1) td:nth(" + i + ")").addClass('hle');
        for (var j = K; j < n1; j++)
            $table1.find("tr:nth(1) td:nth(" + j + ")").addClass('hl');
        const bd = b_bontasK(bdet, K - 1);
        document.getElementById("bdetnek").innerHTML = bd;
    }
};

function b_sor(v0) {
    bdet = [];
    document.getElementById("bdetnek").innerHTML = "";
    $("#detbTable #bjelentes table.btable.s td.hl").removeClass('hl');
    $("#detbTable #bjelentes table.btable.s td.bk .bknum.hl").removeClass('hl');
    const bind = v0[0];
    const v = [...v0.slice(1)];
    bdet = v;
    const n = v.length;
    var tbl = "<table class='btable b'><thead><th>k</th>";
    for (var i = 0; i < n; i++)
        tbl += "<th>" + (n - i) + ".</th>";
    tbl += "</tr></thead><tbody><tr><td>b<sub>" + bind + "</sub></td>";
    for (var j = 0; j < n; j++)
        tbl += "<td onclick='hlbts(" + (n - j - 1) + ");'>" + v[j] + "</td>";
    tbl += "</tr></tbody></table>";

    document.getElementById('bsornak').innerHTML = tbl;
    hlbts(n - 1);
    const invelem = $('#detT table tbody tr th span[data-n=' + bind + ']');
    if (!invelem.hasClass('hl'))
        invelem.trigger('click');
};


function b_bontas(s) {
    const n = s.length;
    var out = [];
    for (var k = 1; k < n - 1; k++) {
        var vk = s.slice(0, k);
        var vnext = s[k] - 1;
        var coeff = Math.pow(-1, _.sum(vk) + 1) / factorial(vnext);
        var vege = conjcomp([1, ...s.slice(k + 1)]);
        out.push([expDeriv(vk, vnext).map(y => [y[0] * coeff, y[1]]), vege]);
    };
    var vk = s.slice(0, -1);
    var coeff = Math.pow(-1, _.sum(vk) + 1) / factorial(s[n - 2]);
    var vnext = _.last(s);
    out.push([expDeriv(vk, vnext).map(y => [y[0] * coeff, y[1]]), []]);
    return out;
};

function b_bontasK(s, k) {
    const n = s.length;
    var out = "<ul>";
    var out1 = "";
    var out2 = "";
    if (k < n - 1) {
        var vk = s.slice(0, k);
        var vnext = s[k] - 1;
        var vege = [1, ...s.slice(k + 1)];
        const indx = (_.sum(vk) - vk.length + vnext + bsora) + "-" + (boszlopa + k + 1);
        const invelem = $('#detT table tbody .tgomb.shown[rfb-data="' + indx + '"]');
        if (!invelem.hasClass('hl'))
            invelem.trigger('click');
        out += "<li>&nbsp;" + formazottTortHTML("(-1)<sup>" + (_.sum(vk) + 1) + "</sup>", vnext + "!") + "&nbsp;&part;<sup>" + vnext + "</sup><span class='hlr'>(" + vk.toString() + ")</span>&middot;<span class='hly'>(" + vege + ")</span><sup>*</sup></li>";

        var eloj = " + ";
        if (_.sum(vk) % 2 == 0)
            eloj = " − "
        var f = factorial(vnext);
        if (f == 1)
            f = "";
        else if (f > 1)
            f = formazottTortHTML(1, f);
        var p = "";
        if (vnext == 1)
            p = "&nbsp;&part;"
        else if (vnext > 1)
            p = "&nbsp;&part;<sup>" + vnext + "</sup>"

        out1 += "<li>&nbsp;" + eloj + f + p + "<span class='hlr'>(" + vk.toString() + ")</span>&middot;<span class='hly'>(" + conjcomp(vege).toString() + ")</span></li>";
        var coeff = factorial(vnext);
        var d = expDeriv(vk, vnext).map(y => [y[0] / coeff, y[1]]);
        var dtxt = "";
        const dl = d.length;
        dtxt += "<span class='bvec' data-b='" + d[0].slice(1) + "'>" + msv2HTML(d[0]).slice(3) + "</span>";
        if (dl > 1)
            for (let v of d.slice(1))
                dtxt += "<span class='bvec' data-b='" + v.slice(1) + "'>" + msv2HTML(v) + "</span>";
        //dtxt = dtxt.slice(3);
        if (d.length > 1)
            dtxt = "<span class='paren1'>[</span>" + dtxt + "<span class='paren1'>]</span>";
        out2 += "<li>&nbsp;" + eloj + dtxt + "&middot;<span class='hly'>(" + conjcomp(vege).toString() + ")</span></li></ul>";
    } else if (k == n - 1) {
        var vk = s.slice(0, -1);
        var vnext = _.last(s);
        const indx = (_.sum(vk) - vk.length + vnext + +bsora) + "-" + (boszlopa + k + 1);
        const invelem = $('#detT table tbody .tgomb.shown[rfb-data="' + indx + '"]');
        if (!invelem.hasClass('.hl'))
            invelem.trigger('click');
        out += "<li>" + formazottTortHTML("(-1)<sup>" + (_.sum(vk) + 1) + "</sup>", vnext + "!") + "&nbsp;&part;<sup>" + vnext + "</sup><span class='hlr'>(" + vk.toString() + ")</span></li>";

        var eloj = " + ";
        if (_.sum(vk) % 2 == 0)
            eloj = " − "
        var f = factorial(vnext);
        if (f == 1)
            f = "";
        else if (f > 1)
            f = formazottTortHTML(1, f);
        var p = "";
        if (vnext == 1)
            p = "&nbsp;&part;"
        else if (vnext > 1)
            p = "&nbsp;&part;<sup>" + vnext + "</sup>"
        out1 += "<li>&nbsp;" + eloj + f + p + "<span class='hlr'>(" + vk.toString() + ")</span></li></ol>";

        var coeff = factorial(vnext);
        var d = expDeriv(vk, vnext).map(y => [y[0] / coeff, y[1]]);
        var dtxt = "";
        const dl = d.length;
        dtxt += "<span class='bvec' data-b='" + d[0].slice(1) + "'>" + msv2HTML(d[0]).slice(3) + "</span>";
        if (dl > 1)
            for (let v of d.slice(1))
                dtxt += "<span class='bvec' data-b='" + v.slice(1) + "'>" + msv2HTML(v) + "</span>";
        //dtxt = dtxt.slice(3);
        if (d.length > 1)
            dtxt = "<span class='paren1'>[</span>" + dtxt + "<span class='paren1'>]</span>";
        dtxt = "<li>&nbsp;" + eloj + dtxt + "</li></ul>";
        out2 += dtxt;
    } else
        return;
    return out + out1 + out2;
};

function b_tabla(s, rev) {
    const n = s.length;
    var bk = s.slice(0, -1).filter(y => y > 1);
    const lasts = _.last(s);
    const h = Math.max(_.max(bk) - 1, lasts);
    var bkv = [];
    var l0 = -1;
    for (var j = 0; j < n - 1; j++) {
        if (s[j] > 1)
            bkv.push(j)
    };
    var ni = _.sum(bk) - bk.length;
    if (lasts > 1) {
        bkv.push(n - 1);
        bk.push(lasts);
        l0 = lasts - 1;
        ni += lasts;
    };
    var bkk = kum(bk.map(y => y - 1));
    bkk.unshift(0);
    sorsz = {};
    for (var j = 0; j < bkv.length; j++) {
        var m = bk[j]
        for (var i = 1; i < m; i++) {
            var indx = [i, bkv[j]].toString();
            sorsz[indx] = ni + 1 - i - bkk[j];
        }
    };
    if (lasts > 1) {
        var indx = [l0 + 1, _.last(bkv)].toString();
        sorsz[indx] = 1;
    };

    function specelem(l, t) {
        var indx = sorsz[[l + 1, t].toString()];
        if (rev) {
            if (bkv.includes(t)) {
                indx = ni + 1 - indx;
                const st = JSON.stringify([indx, s[t] - l, ...s.slice(t + 1)]);
                const onc = "onclick='b_sor(";
                tbl += "<td class='bk' data-bt='" + indx + "' " + onc + st + ");hlbtc(this);'>" + (s[t] - l) + "<span class='bknum'>" + indx + "</span></td>";
            } else
                tbl += "<td onclick='hlbtclear();'>" + s[t] + "</td>";
        } else {
            const onc = "onclick='valami(";
            if (bkv.includes(t)) {
                tbl += "<td class='bk' data-bt='" + indx + "' " + onc + indx + ");'>" + (s[t] - l) + "<span class='bknum'>" + indx + "</span></td>";
            } else
                tbl += "<td>" + s[t] + "</td>";
        };
    };
    var cls = "class='btable s'"
    if (rev)
        cls = "class='btable c'"
    var tbl = "<table " + cls + "><thead><tr><th>k</th>";
    for (var i = 0; i < n; i++) {
        if (rev)
            tbl += "<th>" + (n - i) + ".</th>";
        else
            tbl += "<th>" + (i + 1) + ".</th>";
    };
    tbl += "</tr></thead><tbody><tr><th>" + 1 + ".</th>";
    for (var t = 0; t < n; t++) {
        specelem(0, t);
    };
    tbl += "</tr>";
    for (var l = 1; l < h; l++) {
        tbl += "<tr><th>" + (l + 1) + ".</th>";
        if (l != l0) {
            for (var t = 0; t < n; t++) {
                if (s[t] < l + 2)
                    tbl += "<td></td>";
                else
                    specelem(l, t);
            }
        } else {
            for (var t = 0; t < n - 1; t++) {
                if (s[t] < l + 2)
                    tbl += "<td></td>";
                else
                    specelem(l, t);
            };
            var indx = sorsz[[l + 1, t].toString()];
            var onc = "hlbts(";
            if (rev) {
                indx = ni + 1 - indx;
                onc = "hlbtc(";
            };
            tbl += "<td class='bk' data-bt='" + indx + "' onclick='" + onc + indx + ");'>( )<span class='bknum'>" + indx + "</span></td>";
            //tbl += "<td class='bk'>( )<span class='bknum'>" + sorsz[[l + 1, t].toString()] + "</span></td>";
        }
        tbl += "</tr>";
    };
    tbl += "</tr></tbody></table>";
    return tbl;
};

function b2tables(s) {
    const tbls = b_tabla(s, false);
    const tblc = b_tabla(conjcomp(s), true);
    const btarto = "<div id='bsornak'>Válasszon egy indexet</div>";
    const bdetnek = "<div id='bdetnek'></div>";
    document.getElementById('bjelentes').innerHTML = tbls + tblc + btarto + bdetnek;
};

function b_bontasAll(s) {
    const n = s.length;
    var out = "<ol>";
    var out1 = "<ol>";
    var out2 = "<ol>";
    for (var k = 1; k < n - 1; k++) {
        var vk = s.slice(0, k);
        var vnext = s[k] - 1;
        var vege = [1, ...s.slice(k + 1)];
        out += "<li>&nbsp;" + formazottTortHTML("(-1)<sup>" + (_.sum(vk) + 1) + "</sup>", vnext + "!") + "&nbsp;&part;<sup>" + vnext + "</sup>(" + vk.toString() + ")&middot;(" + vege + ")<sup>*</sup></li>";

        var eloj = " + ";
        if (_.sum(vk) % 2 == 0)
            eloj = " − "
        var f = factorial(vnext);
        if (f == 1)
            f = "";
        else if (f > 1)
            f = formazottTortHTML(1, f);
        var p = "";
        if (vnext == 1)
            p = "&nbsp;&part;"
        else if (vnext > 1)
            p = "&nbsp;&part;<sup>" + vnext + "</sup>"

        out1 += "<li>&nbsp;" + eloj + f + p + "(" + vk.toString() + ")&middot;(" + conjcomp(vege).toString() + ")</li>";
        var coeff = factorial(vnext);
        var d = expDeriv(vk, vnext).map(y => [y[0] / coeff, y[1]]);
        var dtxt = ""
        for (let v of d)
            dtxt += msv2HTML(v);
        dtxt = dtxt.slice(3);
        if (d.length > 1)
            dtxt = "<span class='paren1'>[</span>" + dtxt + "<span class='paren1'>]</span>";
        out2 += "<li>&nbsp;" + eloj + dtxt + "&middot;(" + conjcomp(vege).toString() + ")</li>";
    };
    var vk = s.slice(0, -1);
    var vnext = _.last(s);
    out += "<li>" + formazottTortHTML("(-1)<sup>" + (_.sum(vk) + 1) + "</sup>", vnext + "!") + "&nbsp;&part;<sup>" + vnext + "</sup>(" + vk.toString() + ")</li></ol>";
    var eloj = " + ";
    if (_.sum(vk) % 2 == 0)
        eloj = " − "
    var f = factorial(vnext);
    if (f == 1)
        f = "";
    else if (f > 1)
        f = formazottTortHTML(1, f);
    var p = "";
    if (vnext == 1)
        p = "&nbsp;&part;"
    else if (vnext > 1)
        p = "&nbsp;&part;<sup>" + vnext + "</sup>"

    out1 += "<li>&nbsp;" + eloj + f + p + "(" + vk.toString() + ")</li></ol>";
    var coeff = factorial(vnext);
    var d = expDeriv(vk, vnext).map(y => [y[0] / coeff, y[1]]);
    var dtxt = ""
    for (let v of d)
        dtxt += msv2HTML(v);
    dtxt = dtxt.slice(3);
    if (d.length > 1)
        dtxt = "<span class='paren1'>[</span>" + dtxt + "<span class='paren1'>]</span>";
    dtxt = "<li>&nbsp;" + eloj + dtxt + "</li></ol>";
    out2 += dtxt;
    document.getElementById('bjelentes').innerHTML = tbls + tblc + btarto + out + "<hr/>" + out1 + "<hr/>" + out2 + "<hr/>" + JSON.stringify(b_bontas(s));
    return out;
};

function vec2obj(v, oszto) {
    var obj = _.countBy(v.slice(1));
    var c = Fraction(v[0]);
    obj['c'] = c.div(oszto);
    return obj;
};

function vList2obj(vL, oszto) {
    if (vL.length == 0)
        return [{ 'c': 0 }];
    var out = [];
    for (let v of vL)
        out.push(vec2obj(v, oszto));

    return dense0(out);
};

function fuzes(i, j, sarkok, diff, sobj) {
    var L = [];
    for (var t = i; t < j; t++) {
        L.push(nconc([diff[t]], sobj[sarkok[t]]));
    }
    L.push(sobj[sarkok[j]]);
    return Conc(L.reverse());
};

function fuzesForm(i, j, sarkok, diff, sobj) {
    var L = [];

    for (var t = i; t < j; t++) {
        L.push([
            [diff[t]], sobj[sarkok[t]]
        ]);
    };
    L.push([sobj[sarkok[j]]]);
    return L;
};

var matrixGraph = {}

// also háromszög mátrixot rak össze, amit az utolsó sorban megfordítunk, ezért felső háromszög mátrixot ad vissza.
function s2mat(s) {
    matrixGraph = {};
    const n = s.length - 1;
    const b = bvector(s);
    const B = blokkmeret(s);
    const sarkok = B[0].slice(0, -1);
    var diff = [];
    for (var k = 0; k < sarkok.length - 1; k++)
        diff.push(sarkok[k + 1] - sarkok[k] - 1);
    diff.push(0);
    const sarokelemek = B[1].slice(0, -1);
    const sobj = {};
    const fuzesek = {};
    const Fuzesek = {};
    for (var i = 0; i < sarkok.length; i++) {
        sobj[sarkok[i]] = sarokelemek[i];
    };
    for (var i = 0; i < sarkok.length; i++) {
        for (var j = i; j < sarkok.length; j++) {
            var indx = [sarkok[i], sarkok[j]].toString();
            fuzesek[indx] = fuzes(i, j, sarkok, diff, sobj);
            Fuzesek[indx] = fuzesForm(i, j, sarkok, diff, sobj);
        };
    };
    mat = [];
    for (var i = 0; i < n; i++) {
        const e0 = _.last(sarkok.filter(y => y <= i + 1)) || 1;
        const e1 = _.find(sarkok, y => y > i + 1) || n;
        var sor = [];
        for (var j = 0; j < n; j++) {
            const ej = _.find(sarkok, y => y > j + 1) || n;
            const indx = [ej, e0].toString();
            if (i > j) {
                if (i - j == 1) {
                    if (_.includes(sarkok, i + 1)) {
                        sor.push([vec2obj([1, sobj[i + 1]], Math.pow(-1, _.sum(sobj[i + 1])))]);
                    } else
                        sor.push([{ 'c': 0 }]);
                } else if (e0 <= j + 1 && j + 1 < e1)
                    sor.push([{ 'c': 0 }]);
                else {
                    var rend = ej - j - 2;
                    var a = nconc([i + 1 - e0], fuzesek[indx]);
                    sor.push(vList2obj(expDeriv(a, rend), factorial(rend) * Math.pow(-1, _.sum(a))));
                    matrixGraph[[i + 1, j + 1]] = { 'eleje': rend, 'kozepe': Fuzesek[indx], 'vege': i + 1 - e0, 'sarok': a };
                }
            } else if (j == n - 1) {
                //sor.push(symbOv(vList2obj(b[i], 1))); jelentos lassulast okoz
                sor.push(vList2obj(b[i], 1));
            } else if (i == j)
                sor.push([{ 'c': 1 }]);
            else
                sor.push([{ 'c': 0 }]);
        }
        mat.push(sor);
    };
    mat = mat.map(y => y.reverse()).reverse();
    return mat;
};

function blokkmeret(s) {
    s = _.dropRight(s);
    const rb = rbontas(s);
    var v = rb[1].reverse();
    var u = rb[0].reverse();
    u = u.map(y => dualofv([y + 1]))
    var kv = kum(v).map(y => y + 1);
    return [kv, u];
};

const koz = '{ "eleje": 2, "kozepe": [ [ [ 2, 1 ] ], [ [ 3 ], [ 2, 1, 1 ] ], [ [ 2 ], [ 2 ] ], [ [ 0 ], [ 2, 1 ] ] ], "vege": 2, "sarok": [ 4, 1, 5, 1, 1, 4, 2, 1 ] }'

function ff0(v) {
    var out = ""
    if (!(v.length == 1 && v[0] == 0)) {
        for (var i = 0; i < v[0]; i++)
            out += "0,";
    };
    return out;
}

function matrixJelentes(i, j, alsoharomszog) {
    const n = _.last(sarokv);
    if (!alsoharomszog) {
        i = n - i;
        j = n - j;
    }
    const obj = matrixGraph[[i, j]];
    if (obj == undefined)
        out = "A kiválasztott elemhez nem tarozik részletes jelentés."
    else {
        var k = _.cloneDeep(obj.kozepe);
        const kn = k.length;
        const p = obj.eleje;
        const s = obj.sarok;
        const e = _.sum(s);
        const c = formazottTortHTML("(-1)<sup>" + e + "</sup>", p + "!") + "&nbsp;";
        var e1 = "";
        if (e % 2 == 1)
            e1 = "−&hairsp;";
        const c1 = e1 + formazottTortHTML(1, factorial(p)) + "&nbsp;";
        const fv = "<span style='font-size:130%;color:red;'>|</span>";
        var out0 = "";
        if (alsoharomszog) {
            out0 = ff0([p]) + fv;
            for (var l = 0; l < kn - 1; l++) {
                out0 += "&zeta;<sub>" + k[l][1] + "</sub>," + ff0(k[l][0]);
            };
            out0 += "&zeta;<sub>" + k[kn - 1][0] + "</sub>," + ff0([obj.vege]);
            out0 = out0.replaceAll("," + fv, fv);
            if (out0.endsWith(','))
                out0 = out0.slice(0, -1);
            out0 += "&nbsp;&nbsp;&rightarrow;&nbsp;&nbsp;[" + p + "]" + fv;
            for (var l = 0; l < kn - 1; l++) {
                out0 += "&zeta;<sub>" + k[l][1] + "</sub>,[" + k[l][0] + "],";
            };
            out0 += "&zeta;<sub>" + k[kn - 1][0] + "</sub>,[" + obj.vege + "],";
            if (out0.endsWith(','))
                out0 = out0.slice(0, -1);
            out0 += "&nbsp;&leftarrow;&nbsp;A piros vonal elötti szám határozza meg a deriválás fokát, a piros vonal utáni részt pedig megfordítjuk.<br/>";
        } else {
            out0 += ff0([obj.vege]) + "&zeta;<sub>" + k[kn - 1][0] + "</sub>,";
            for (var l = 0; l < kn - 1; l++) {
                var ll = kn - 2 - l;
                out0 += ff0(k[ll][0]) + "&zeta;<sub>" + k[ll][1] + "</sub>,";
            };
            out0 += fv + ff0([p]);
            out0 = out0.replaceAll("," + fv, fv);
            if (out0.endsWith(','))
                out0 = out0.slice(0, -1);
            out0 += "&nbsp;&nbsp;&rightarrow;&nbsp;&nbsp;";
            out0 += "[" + obj.vege + "],&zeta;<sub>" + k[kn - 1][0] + "</sub>,";
            for (var l = 0; l < kn - 1; l++) {
                var ll = kn - 2 - l;
                out0 += "[" + k[ll][0] + "],&zeta;<sub>" + k[ll][1] + "</sub>,";
            };
            out0 += fv + "[" + p + "]";
            if (out0.endsWith(','))
                out0 = out0.slice(0, -1);
            out0 += "&nbsp;&leftarrow;&nbsp;A piros vonal utáni szám határozza meg a deriválás fokát.<br/>";
        }
        var tk = [];
        for (var i = 0; i < kn - 1; i++) {
            tk.unshift("<span style='border-radius:4px;padding:2px;background-color:#c6e7f7;color:blue;'>(" + k[i][0] + ")</span>&odot;<span style='border-radius:4px;padding:2px;background-color:#b90045;color:white;'>(" + k[i][1] + ")</span>");
        };
        tk.unshift("<span style='border-radius:4px;padding:2px;background-color:#c6e7f7;color:blue;'>(" + obj.vege + ")</span>&odot;<span style='border-radius:4px;padding:2px;background-color:#b90045;color:white;'>(" + k[kn - 1][0] + ")</span>");
        var out = "";
        for (var j = 0; j < k.length; j++) {
            out += tk[j] + "&bullet;"
        }
        out = out.slice(0, -8);
        out = c + "&part;<sup>" + p + "</sup>[" + out + "] = ";
        out += c1 + "&part;<sup>" + p + "</sup>(" + s + ") = ";
        return out0 + out;
    }
};

// derivalas altalanosan....................................................

const derivobj = { "alapDeriv": alapDeriv, "conjDeriv": 0 };
const muvobj = { "vec_add": vec_add, "conc": conc, "nconc": nconc, "vec_stuffle": vec_stuffle, "vec_shuffle": vec_shuffle };

function abValtas() {
    var al = document.getElementById("avl");
    var bl = document.getElementById("bvl");
    if (al.classList.contains("kiur")) {
        al.classList.remove("kiur");
        bl.classList.add("kiur");
    } else {
        bl.classList.remove("kiur");
        al.classList.add("kiur");
    }

    setTimeout(() => { derivInput(); }, 30);
};

function setOutputFontdiff(v) {
    var elem = document.getElementById("diffout");
    elem.style.fontSize = v + 'px';
};

function msv2HTML(msv) {
    var C = msv[0] * 1;
    if (C == 0)
        return "";
    if (C == 1)
        C = " + "
    else if (C == -1)
        C = " − ";
    else if (C > 1)
        C = " + " + C + "&lowast;";
    else if (C < 1)
        C = " − " + -C + "&lowast;";
    var m = C + "(" + msv[1] + ")";
    return m;
};

function ms2HTML(mv) {
    var txt = "";
    for (let m of mv) {
        txt += msv2HTML(m);
    }
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    if (txt == "")
        txt = "0";
    return txt;
};

function makeDual(msv) {
    return [msv[0], dualofv(msv[1])];
};

function makeConj(msv) {
    return [msv[0], conjugate(msv[1])];
};

function alapDeriv(v, n, dual, conj) {
    var u = _.cloneDeep(v);
    if (dual)
        u = dualofv(u);
    if (conj)
        u = conjugate(u);
    var out = expDeriv(u, n).reverse();
    if (dual)
        out = out.map(y => makeDual(y));
    if (conj)
        out = out.map(y => makeConj(y));
    return out;
};

function vecList_Ov(L) {
    var out1 = _.countBy(L);
    var out = [];
    _.forEach(out1, function(value, key) {
        out.push([value * 1, JSON.parse("[" + key + "]")]);
    });
    return out;
};

function vec_add(a, b) {
    const ab = told0val(a, b);
    return _.zipWith(ab[0], ab[1], (u, v) => u + v);
};

function vec_stuffle(a, b) {
    return vecList_Ov(stuffle(a, b));
};

function vec_shuffle(a, b) {
    var out = [];
    const obj = shuffle(a, b)
    _.forEach(obj, function(value, key) {
        out.push([value * 1, JSON.parse("[" + key + "]")]);
    });
    return out;
};

function vec_fuzJvel(a, b, J) {
    out = [];
    n = a.length + b.length;
    var aa = _.cloneDeep(a);
    var bb = _.cloneDeep(b);
    for (var i = 0; i < n; i++) {
        if (J.includes(i + 1)) {
            out.push(aa[0]);
            aa.shift();
        } else {
            out.push(bb[0]);
            bb.shift();
        }
    }
    return out;
};

function is_ms(v) {
    if (v[0][1] && typeof(v[0][1]) != 'number')
        return true;
    else
        return false;
};

function ms_mul(c, ms) {
    return ms.map(y => [c * y[0], y[1]])
};

function ms_vecmul(cvec, ms) {
    out = [];
    n = ms.length;
    for (i = 0; i < n; i++) {
        var c = cvec[i] || 1;
        out.push([c * ms[i][0], ms[i][1]])
    }
    return out;
};

function ms_Ov(ms) {
    var out1 = _.groupBy(ms, y => y[1]);
    out1 = _.mapValues(out1, y => _.sum(y.map(z => z[0])));
    var out = [];
    _.forEach(out1, function(value, key) {
        out.push([value * 1, JSON.parse("[" + key + "]")]);
    });
    return out;
};

function ms_deriv(deriv, n, dual, conj, ms) {
    var out0 = [];
    for (let v of ms)
        out0.push(...ms_mul(v[0], deriv(v[1], n, dual, conj)));

    var out = ms_Ov(out0);
    return out;
};

function linExtension(muv, ov, m1, m2, param) {
    var out = [];
    if (m2 == undefined)
        m2 = [
            [1, []]
        ];
    if (param != null)
        for (let x of m1) {
            for (let y of m2) {
                out.push([x[0] * y[0], muv(x[1], y[1], param)])
            }
        }
    else
        for (let x of m1) {
            for (let y of m2) {
                out.push([x[0] * y[0], muv(x[1], y[1])])
            }
        }
    if (out[0][1][0] != undefined && typeof(out[0][1][0]) != 'number') {
        //out = _.flatten(out.map(y => y[1].map(z => [y[0], z])));
        out = _.flatten(out.map(y => ms_mul(y[0], y[1])))
    };
    if (ov) {
        out = ms_Ov(out);
    };
    return out;
};

function leibnizR1(deriv, n, dual, conj, m1, m2, muv, ov, param) {
    return _.sortBy(ms_Ov(ms_deriv(deriv, n, dual, conj, linExtension(muv, ov, m1, m2, param))));
};

function leibnizR2(deriv, n, dual, conj, m1, m2, muv, ov, param) {
    var out = [];
    for (var k = 0; k < n + 1; k++) {
        //console.log(ms_mul(binomial(n, k), linExtension(muv, ov, ms_deriv(m1, k), ms_deriv(m2, n - k))))
        out.push(...ms_mul(binomial(n, k), linExtension(muv, ov, ms_deriv(deriv, k, dual, conj, m1), ms_deriv(deriv, n - k, dual, conj, m2), param)));
    };

    return _.sortBy(ms_Ov(out));
};

function elojel2num(str) {
    if (str == "+" || str == "")
        str = 1;
    else if (str == "-")
        str = -1;
    else
        str = str * 1;
    return str;
};

function txt2muv(str, muv) {
    if (/\)\.\(/.test(str)) {
        str = str.split(").(").map(y => JSON.parse("[" + y + "]"));
        str = muv(...str);
        if ([vec_stuffle, vec_shuffle].includes(muv))
            str = ms_Ov(str);
        return str;
    } else
        return JSON.parse("[" + str + "]");
};

function mse(y) {
    var out
    if (is_ms(y[1]))
        out = ms_mul(y[0], y[1]);
    else
        out = [y];
    return out;
};

function str2ms(str, muv) {
    str = str.replaceAll(" ", "");
    var out = str.split(/\)(?!\.)/).filter(y => y != "").map(z => z.split(/(?<!\.)\(/));
    out = out.map(y => [elojel2num(y[0].replace("*", "")), txt2muv(y[1], muv)]);
    if (/\)\.\(/.test(str) && [vec_shuffle, vec_stuffle].includes(muv))
        out = ms_Ov(_.flatten(out.map(y => mse(y))));
    return out;
};

function ms_kiszed(id, muv) {
    var str = document.getElementById(id).value;
    str = str2ms(str, muv);
    return str;
    //document.getElementById("diffout").innerHTML = JSON.stringify(str);
};

function displayLeibniz(deriv, n, dual, conj, muv) {
    const msa = ms_kiszed("av", muv);
    const msb = ms_kiszed("bv", muv);
    const L1 = leibnizR1(deriv, n, dual, conj, msa, msb, muv, false);
    const L2 = leibnizR2(deriv, n, dual, conj, msa, msb, muv, true);
    const txt1 = ms2HTML(L1);
    const txt2 = ms2HTML(L2);
    const txt3 = ms2HTML(ms_Ov([...L1, ...ms_mul(-1, L2)]));
    const txt = txt1 + "<hr/>" + txt2 + "<hr/><span style='color:blue;'>" + txt3 + "</span>";
    document.getElementById("diffout").innerHTML = txt;
}

function derivInput() {
    const id = $('b.kiur').parent().next('input')[0].id;
    const deriv = derivobj[document.getElementById("selectderiv").value];
    const muv = muvobj[document.getElementById("selectmuv").value];
    const n = document.getElementById("n").value * 1;
    const dual = document.getElementById("setdual").checked;
    const conj = document.getElementById("setconj").checked;
    const leibniz = document.getElementById("leibniz").checked;
    if (leibniz)
        displayLeibniz(deriv, n, dual, conj, muv);
    else {
        const ms = ms_kiszed(id, muv);
        var d = ms_deriv(deriv, n, dual, conj, ms);
        const oszto = factorial(document.getElementById("oszto").value * 1);
        d = d.map(y => [y[0] / oszto, y[1]])
            //document.getElementById("diffout").innerHTML = JSON.stringify(d);
        document.getElementById("diffout").innerHTML = ms2HTML(d);
    }
};

