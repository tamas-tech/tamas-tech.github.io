function HideColumnIndex0() {
    var $el = $(this);
    var $cell = $el.closest('th,td');
    var $table = $cell.closest('table');

    if ($el.hasClass('hide-col0')) {
        var colIndex = $cell[0].cellIndex + 1;
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + colIndex + ")")
            .removeClass('hide-col0')
    } else {
        var colIndex = $cell[0].cellIndex + 1;
        $table.find("tbody tr, thead tr")
            .children(":nth-child(" + colIndex + ")")
            .addClass('hide-col0');
    };
};

$(document).on('click', '.hide-column0', HideColumnIndex0);

var curr_v = [];
var curr_txt = "0";
var store_sign = 1;
var wfejlec = "";
var nofejlec = false;
var storefej = "";
var tempstoreback = "";
var wertekkel = false;

var Store = {};
Store.v1 = [];
Store.v2 = [];
Store.txt1 = "";
Store.txt2 = "";
Store.fej1 = "";
Store.fej2 = "";
Store.state1 = {};
Store.state2 = {};
Store.L = 2;
Store.n = 0;

function resetStore() {
    const n = document.getElementById("nstore").value * 1;
    Store = {};
    for (var i = 1; i <= n; i++) {
        Store["v" + i] = [];
        Store["txt" + i] = "";
        Store["fej" + i] = "";
        Store["state" + i] = {};
    };
    Store.L = n;
    Store.n = 0;
    updLstore();
    if ($("#shoutstore").css("display") == "block") {
        closeStore();
        $('#storetglbtn').trigger('click');
    };
};

function trimStore() {
    const N = Store.n * 1;
    const n = document.getElementById("nstore").value * 1;
    if (n < N) {
        for (var i = n + 1; i < N + 1; i++) {
            delete Store["v" + i];
            delete Store["txt" + i];
            delete Store["fej" + i];
            delete Store["state" + i];
        }
        Store.n = n;
    } else if (n > N) {
        for (var i = N + 1; i < n + 1; i++) {
            Store["v" + i] = [];
            Store["txt" + i] = "";
            Store["fej" + i] = "";
            Store["state" + i] = {};
        }
    }
    Store.L = n;
    if (n > 2)
        $("#setsign").removeClass("dumb");
    else
        $("#setsign").addClass("dumb");
    updLstore();
    const opened = $("#shoutstore").css("display") == "block";
    closeStore();
    if (opened)
        $('#storetglbtn').trigger('click');
};

function updLstore() {
    const n = Store.n;
    const L = Store.L;
    document.getElementById("lstore").innerHTML = n + " / " + L;
    if (n == 0) {
        $('#storebackbtn').addClass('dumb');
        $('#storeinbtn').removeClass('dumb');
    } else if (n == L && L > 2) {
        $('#storeinbtn').addClass('dumb');
    } else if (n > 0) {
        $('#storeinbtn,#storebackbtn').removeClass('dumb');
    };
};

function undoStore() {
    const n = Store.n * 1;
    Store["v" + n] = [];
    Store["txt" + n] = "";
    Store["fej" + n] = "";
    Store["state" + n] = {};
    updOpenedStore();
    if (n > 0)
        Store.n--;
    updLstore();
    $('.lastviewer[data-view=' + n + ']').html('').addClass('dumb');
    $('.storeback[data-back=' + n + ']').addClass('dumb');
};

function updOpenedStore() {
    if ($("#shoutstore").css("display") == "block") {
        var n = Store.n * 1;
        var L = Store.L * 1;
        const stxt = Store["txt" + n];
        if (stxt.length > 0) {
            $('.lastviewer[data-view=' + n + ']').html(stxt).removeClass('dumb');
            $('.storeback[data-back=' + n + ']').removeClass('dumb');
        };
        if (L == 2) {
            $('.lastviewer[data-view="2"]').html(Store.txt2);
            $('.lastviewer[data-view="1"]').html(Store.txt1);
            $('.lastprebtn:nth(1)').html(Store.fej2 || "&#x2205;");
            $('.lastprebtn:nth(0)').html(Store.fej1 || "&#x2205;");
            var w = strList_Ov(_.flatten([Store.v1, Store.v2.map(y => [Fraction(y[0]).mul(Fraction(-1)), y[1]])]));
            if (document.getElementById("xymonom").checked)
                txt += formazxyMonom(w);
            else
                txt += formazxyV(w, true, true);
            txt = txt.replace("undefined", "")
            $('#lastprev').html(txt);
        } else {
            $('.lastprebtn:nth(' + (n - 1) + ')').html(Store["fej" + n] || "&#x2205;");
            var w = []
            var txt = "";
            for (var j = 1; j <= n; j++)
                w.push(Store["v" + j])
            w = strList_Ov(_.flatten(w));
            if (document.getElementById("xymonom").checked)
                txt += formazxyMonom(w);
            else
                txt += formazxyV(w, true, true);
            $('#lastprev').html(txt);
        }
    };
};

function shiftStore() {
    //$(btn).removeClass('dumb');
    const L = Store.L * 1;
    const n = Store.n * 1;
    if (L == 2) {
        /* Store.v1 = [...Store.v2];
        Store.v2 = [...curr_v];
        Store.txt1 = Store.txt2;
        Store.txt2 = curr_txt;
        Store.fej1 = Store.fej2;
        Store.fej2 = storefej; */
        Store.v2 = [...Store.v1];
        Store.v1 = [...curr_v];
        Store.txt2 = Store.txt1;
        Store.txt1 = curr_txt;
        Store.fej2 = Store.fej1;
        Store.fej1 = storefej;
        Store.state2 = {...Store.state1 };
        Store.state1 = makeParamObj();
        if (n < L)
            Store.n++;
        updOpenedStore();
        $('#shouth').addClass('villbgdark');
        setTimeout(() => {
            $('#shouth').removeClass('villbgdark');
        }, 300);
    } else if (n == L) {
        return;
    } else if (n < L) {
        Store["v" + (n + 1)] = [...curr_v];
        Store["txt" + (n + 1)] = curr_txt;
        Store["fej" + (n + 1)] = storefej;
        Store["state" + (n + 1)] = makeParamObj();
        Store.n++;
        updOpenedStore();
        $('#shouth').addClass('villbgdark');
        setTimeout(() => { $('#shouth').removeClass('villbgdark') }, 300);
    };
    updLstore();
};

function inStore(v, txt) {
    if (Store.L == 2 || store_sign == 1) {
        curr_v = [...v];
        curr_txt = txt;
    } else {
        curr_v = [...v.map(y => [Fraction(y[0]).mul(Fraction(-1)), y[1]])];
        curr_txt = "<span class='negstore'> − (</span>" + txt + "<span class='negstore'>)</span>";
    }
};

function storeSign(e) {
    store_sign = -1 * store_sign;
    if (store_sign == -1) {
        e.innerHTML = "-";
        e.style.backgroundColor = "#f2b9b9";
    } else {
        e.innerHTML = "+";
        e.style.backgroundColor = "";
    }
};

function storeTglAll(elem) {
    const state = elem.innerText == 'Hide All';
    if (state) {
        $('#shoutstore .lastviewer.shown').removeClass('shown');
        $('#lastprev.shown').removeClass('shown');
        elem.innerText = "Show All";
    } else {
        console.log("kinyit");
        $('#shoutstore .lastviewer').addClass('shown');
        $('#lastprev.shown').addClass('shown');
        elem.innerText = "Hide All";
    };
};

function tglStore(e) {
    const sto = $("#shoutstore");
    const L = Store.L;
    const opened = sto.css("display");
    var txt = "";
    if (opened == "block") {
        sto.html("").css("display", "none");
        $(e).html("&#128448;");
        return;
    } else if (L == 2) {
        $(e).html("&#128449;");
        var stxt1 = Store.txt1;
        var stxt2 = Store.txt2;
        var dumb1 = " dumb";
        var dumb2 = " dumb";
        if (stxt1.length > 0)
            dumb1 = "";
        if (stxt2.length > 0)
            dumb2 = "";
        txt += "<span class='storeback" + dumb1 + "' onclick='storeBack(this);' data-back='1'>A legutóbbi (1)</span> <span class='lastprebtn' onclick='tglLast(" + 1 + ");'>" + (Store.fej1 || "&#x2205;") + "</span><br/><div class='lastviewer shown' data-view='1'>" + (stxt1 || "()") + "</div><span class='storeback" + dumb2 + "' onclick='storeBack(this);' data-back='2'>és az azt megelöző (2)</span><span class='lastprebtn' onclick='tglLast(" + 2 + ");'>" + (Store.fej2 || "&#x2205;") + "</span><br/><div class='lastviewer shown' data-view='2'>" + (stxt2 || "()") + "</div><br/> két kimenet különbsége: <span class='lastprebtn' style='background-color: #ffcbcb;' onclick='tglLastPrev();'>(1) - (2)</span><div id='lastprev' class='shown'>";
        var w = strList_Ov(_.flatten([Store.v1, Store.v2.map(y => [Fraction(y[0]).mul(Fraction(-1)), y[1]])]));
    } else if (L > 2) {
        $(e).html("&#128449;");
        txt += "A legutóbbi " + L + " kimenet<button  class='showpre1' style='margin-left:20px;margin-bottom:10px;background-color:#ae8404;' onclick='storeTglAll(this);'>Hide All</button><br/>"
        for (var i = 1; i <= L; i++) {
            var stxt = Store["txt" + i];
            var dumb = " dumb";
            if (stxt.length > 0)
                dumb = "";
            txt += "<span class='storeback" + dumb + "' onclick='storeBack(this);' data-back=" + i + ">Kimenet (" + (i - 1 - L) + ")</span><span class='lastprebtn' onclick='tglLast(" + i + ");'>" + (Store["fej" + i] || "&#x2205;") + "</span><br/><div class='lastviewer shown " + dumb + "' data-view='" + i + "'>" + (stxt || "()") + "</div>";
        };
        txt += "összege: <span class='lastprebtn' style='background-color: #ffcbcb;' onclick='tglLastPrev();'>&sum;</span> <div id='lastprev' class='shown'>"
        var w = []
        for (var j = 1; j <= L; j++)
            w.push(Store["v" + j])
        w = strList_Ov(_.flatten(w));
    };
    if (document.getElementById("xymonom").checked)
        txt += formazxyMonom(w);
    else
        txt += formazxyV(w, true, true);
    txt += "<div>";
    sto.css("display", "block");
    sto.html(txt);
};

function closeStore() {
    $("#shoutstore").html("").css("display", "none");
    $("#storetglbtn").html("&#128448;");
};

function tglLast(i) {
    $('.lastviewer[data-view=' + i + ']').toggleClass('shown');
};

function tglLastPrev() {
    $('#lastprev').toggleClass('shown');
};

function setFejlec(elem) {
    nofejlec = elem.checked;
};

function setOutputFontH(v) {
    var elem = document.getElementById("shouth");
    var elem1 = document.getElementById("shoutstore");
    elem.style.fontSize = v + 'px';
    elem1.style.fontSize = v + 'px';
};

function settblw(v) {
    $('#regtbl tr:first-child td').css('min-width', v + 'em');
};

// algebra of Q(x,y) = h

var regw = "w1";
var regvalt = "alap";
var derivkell = false;


var w1conj = false;
var w1inv = false;
var dw1fok = 0;
var dw1conj = false;
var dw1inv = false;
var dw1fakt = false;
var dw1fakte = false;
var w1coeff = Fraction(1);

var w2conj = false;
var w2inv = false;
var dw2fok = 0;
var dw2conj = false;
var dw2inv = false;
var dw2fakt = false;
var dw2fakte = false;
var w2coeff = Fraction(1);

var outconj = false;
var outinv = false;
var doutfok = 0;
var doutconj = false;
var doutinv = false;
var doutfakt = false;
var doutfakte = false;
var woutcoeff = Fraction(1);

function setWform(b) {
    wertekkel = b;
    shtuffleW();
};

function derivSelect(e) {
    var diff = e.value;
    if (diff == "none") {
        return;
    } else if (diff == "mienk") {
        $("#setdX").val("xx").trigger("change");
        $("#setdY").val("xy").trigger("change");
    } else if (diff == "d") {
        $("#setdX").val("xy").trigger("change");
        $("#setdY").val("yy").trigger("change");
    };
};

function tglshouth(elem) {
    $('#shouth').toggleClass('hide');
    if (elem.innerText == "Show")
        elem.innerText = "Hide";
    else
        elem.innerText = "Show";
};

function par2tort(id) {
    var cw = document.getElementById(id).value;
    if (/\//.test(cw)) {
        var f1 = cw.split("/")
        cw = Fraction(f1[0].trim() * 1, f1[1].trim() * 1);
    } else
        cw = Fraction(cw * 1);
    return cw;
};

function setMuvelet(indx) {
    $('#shH #cshstselecttarto .jtoggler-btn-wrapper').removeClass('is-active');
    $('#shH #cshstselecttarto .jtoggler-control').removeClass('is-fully-active');
    if (indx * 1 != 1)
        $('#shH #cshstselecttarto .jtoggler-control').addClass('is-fully-active');
    $('#shH #cshstselecttarto .jtoggler-btn-wrapper:nth(' + indx + ')').addClass('is-active');
    //$('#shH #cshstselecttarto .jtoggler-btn-wrapper:nth(' + indx + ') input.jtoggler-radio').trigger('change');
};

function setParams() {
    w1conj = document.getElementById("w1conj").checked;
    w1inv = document.getElementById("w1inv").checked;
    dw1fok = document.getElementById("dw1fok").value * 1;
    dw1conj = document.getElementById("dw1conj").checked;
    dw1inv = document.getElementById("dw1inv").checked;
    dw1fakt = document.getElementById("dw1fakt").checked;
    dw1fakte = document.getElementById("dw1fakte").checked;
    w1coeff = par2tort("w1coeff");

    w2conj = document.getElementById("w2conj").checked;
    w2inv = document.getElementById("w2inv").checked;
    dw2fok = document.getElementById("dw2fok").value * 1;
    dw2conj = document.getElementById("dw2conj").checked;
    dw2inv = document.getElementById("dw2inv").checked;
    dw2fakt = document.getElementById("dw2fakt").checked;
    dw2fakte = document.getElementById("dw2fakte").checked;
    w2coeff = par2tort("w2coeff");

    outconj = document.getElementById("outconj").checked;
    outinv = document.getElementById("outinv").checked;
    doutfok = document.getElementById("doutfok").value * 1;
    doutconj = document.getElementById("doutconj").checked;
    doutinv = document.getElementById("doutinv").checked;
    doutfakt = document.getElementById("doutfakt").checked;
    doutfakte = document.getElementById("doutfakte").checked;
    woutcoeff = par2tort("woutcoeff");
};

function makeParamObj() {
    var pobj = {};
    pobj.w1conj = w1conj;
    pobj.w1inv = w1inv;
    pobj.dw1fok = dw1fok;
    pobj.dw1conj = dw1conj;
    pobj.dw1inv = dw1inv;
    pobj.dw1fakt = dw1fakt;
    pobj.dw1fakte = dw1fakte;
    pobj.w1coeff = w1coeff;

    pobj.w2conj = w2conj;
    pobj.w2inv = w2inv;
    pobj.dw2fok = dw2fok;
    pobj.dw2conj = dw2conj;
    pobj.dw2inv = dw2inv;
    pobj.dw2fakt = dw2fakt;
    pobj.dw2fakte = dw2fakte;
    pobj.w2coeff = w2coeff;

    pobj.outconj = outconj;
    pobj.outinv = outinv;
    pobj.doutfok = doutfok;
    pobj.doutconj = doutconj;
    pobj.doutinv = doutinv;
    pobj.doutfakt = doutfakt;
    pobj.doutfakte = doutfakte;
    pobj.woutcoeff = woutcoeff;

    pobj.w1 = w2xysor(document.getElementById("w1").value);
    pobj.w2 = w2xysor(document.getElementById("w2").value);
    pobj.muvelet = $('#shH #cshstselecttarto .jtoggler-btn-wrapper.is-active').index();
    pobj.sign = store_sign;

    return pobj;
};

function stateBack(obj) {
    document.getElementById("w1conj").checked = obj.w1conj;
    document.getElementById("w1inv").checked = obj.w1inv;
    document.getElementById("dw1fok").value = obj.dw1fok;
    document.getElementById("dw1conj").checked = obj.dw1conj;
    document.getElementById("dw1inv").checked = obj.dw1inv;
    document.getElementById("dw1fakt").checked = obj.dw1fakt;
    document.getElementById("dw1fakte").checked = obj.dw1fakte;
    document.getElementById("w1coeff").value = obj.w1coeff.toFraction();

    document.getElementById("w2conj").checked = obj.w2conj;
    document.getElementById("w2inv").checked = obj.w2inv;
    document.getElementById("dw2fok").value = obj.dw2fok;
    document.getElementById("dw2conj").checked = obj.dw2conj;
    document.getElementById("dw2inv").checked = obj.dw2inv;
    document.getElementById("dw2fakt").checked = obj.dw2fakt;
    document.getElementById("dw2fakte").checked = obj.dw2fakte;
    document.getElementById("w2coeff").value = obj.w2coeff.toFraction();

    document.getElementById("outconj").checked = obj.outconj;
    document.getElementById("outinv").checked = obj.outinv;
    document.getElementById("doutfok").value = obj.doutfok;
    document.getElementById("doutconj").checked = obj.doutconj;
    document.getElementById("doutinv").checked = obj.doutinv;
    document.getElementById("doutfakt").checked = obj.doutfakt;
    document.getElementById("doutfakte").checked = obj.doutfakte;
    document.getElementById("woutcoeff").value = obj.woutcoeff.toFraction();

    document.getElementById("w1").value = obj.w1;
    document.getElementById("w2").value = obj.w2;
    setMuvelet(obj.muvelet);
    store_sign = obj.sign;
    const signbtn = document.getElementById("setsign");
    if (store_sign == -1)
        signbtn.innerHTML = "-";
    else
        signbtn.innerHTML = "+";
    $("#w1coeff").trigger('change');
};

function resetLap() {
    document.getElementById("w1conj").checked = false;
    document.getElementById("w1inv").checked = false;
    document.getElementById("dw1fok").value = '0';
    document.getElementById("dw1conj").checked = false;
    document.getElementById("dw1inv").checked = false;
    document.getElementById("dw1fakt").checked = false;
    document.getElementById("dw1fakte").checked = false;
    document.getElementById("w1coeff").value = "1";

    document.getElementById("w2conj").checked = false;
    document.getElementById("w2inv").checked = false;
    document.getElementById("dw2fok").value = '0';
    document.getElementById("dw2conj").checked = false;
    document.getElementById("dw2inv").checked = false;
    document.getElementById("dw2fakt").checked = false;
    document.getElementById("dw2fakte").checked = false;
    document.getElementById("w2coeff").value = "1";

    document.getElementById("outconj").checked = false;
    document.getElementById("outinv").checked = false;
    document.getElementById("doutfok").value = '0';
    document.getElementById("doutconj").checked = false;
    document.getElementById("doutinv").checked = false;
    document.getElementById("doutfakt").checked = false;
    document.getElementById("doutfakte").checked = false;
    document.getElementById("woutcoeff").value = "1";

    document.getElementById("w1").value = "xy";
    document.getElementById("w2").value = "yy";

    $('#regvtarto div.jtoggler-wrapper.jtoggler-wrapper-multistate div.jtoggler-control label.jtoggler-btn-wrapper input.jtoggler-radio:nth(1)').click()
    $('#cshstselecttarto div.jtoggler-wrapper.jtoggler-wrapper-multistate div.jtoggler-control label.jtoggler-btn-wrapper input.jtoggler-radio:nth(1)').click();

    if (regw == "w2")
        document.getElementById("calcw1").click();


    store_sign = 1;
    const signbtn = document.getElementById("setsign");
    signbtn.innerHTML = "+";
    document.getElementById("setwform").checked = false;

    document.getElementById("nstore").value = '2';
    trimStore();
    resetStore();
    closeStore();

    const tblf = $('table#regtbl.table-hideable tbody tr td.hide-column0')
    if (tblf.hasClass("hide-col0"))
        tblf.trigger("click")

    const hbtn = document.getElementById("hideoutbtn");
    if (hbtn.innerText == "Show")
        tglshouth(hbtn);
    if (document.getElementById("hsetting").style.display = "block")
        sbTgl('hsetting')

    const setm = document.getElementById("xymonom");
    setm.checked = false;
    set2monom(setm);
    document.getElementById("xX").checked = false;
    document.getElementById("setfejlec").checked = false;
    $("#setdX").val("xx").trigger("change");
    $("#setdY").val("xy").trigger("change");
    document.getElementById("setX").value = '';
    document.getElementById("setY").value = '';

    $("#w1coeff").trigger('change');
};


function resetNoForm() {
    document.getElementById("w1conj").checked = false;
    document.getElementById("w1inv").checked = false;
    document.getElementById("dw1fok").value = '0';
    document.getElementById("dw1conj").checked = false;
    document.getElementById("dw1inv").checked = false;
    document.getElementById("dw1fakt").checked = false;
    document.getElementById("dw1fakte").checked = false;
    document.getElementById("w1coeff").value = "1";

    document.getElementById("w2conj").checked = false;
    document.getElementById("w2inv").checked = false;
    document.getElementById("dw2fok").value = '0';
    document.getElementById("dw2conj").checked = false;
    document.getElementById("dw2inv").checked = false;
    document.getElementById("dw2fakt").checked = false;
    document.getElementById("dw2fakte").checked = false;
    document.getElementById("w2coeff").value = "1";

    document.getElementById("outconj").checked = false;
    document.getElementById("outinv").checked = false;
    document.getElementById("doutfok").value = '0';
    document.getElementById("doutconj").checked = false;
    document.getElementById("doutinv").checked = false;
    document.getElementById("doutfakt").checked = false;
    document.getElementById("doutfakte").checked = false;
    document.getElementById("woutcoeff").value = "1";

    document.getElementById("w1").value = "xy";
    document.getElementById("w2").value = "yy";

    $('#regvtarto div.jtoggler-wrapper.jtoggler-wrapper-multistate div.jtoggler-control label.jtoggler-btn-wrapper input.jtoggler-radio:nth(1)').click()
    $('#cshstselecttarto div.jtoggler-wrapper.jtoggler-wrapper-multistate div.jtoggler-control label.jtoggler-btn-wrapper input.jtoggler-radio:nth(1)').click();

    if (regw == "w2")
        document.getElementById("calcw1").click();

    store_sign = 1;
    const signbtn = document.getElementById("setsign");
    signbtn.innerHTML = "+";

    document.getElementById("nstore").value = '2';
    trimStore();
    resetStore();
    closeStore();

    const tblf = $('table#regtbl.table-hideable tbody tr td.hide-column0')
    if (tblf.hasClass("hide-col0"))
        tblf.trigger("click")

    const hbtn = document.getElementById("hideoutbtn");
    if (hbtn.innerText == "Show")
        tglshouth(hbtn);
    if (document.getElementById("hsetting").style.display = "block")
        sbTgl('hsetting')

    $("#setdX").val("xx").trigger("change");
    $("#setdY").val("xy").trigger("change");

    $("#w1coeff").trigger('change');
};

function setAll() {
    document.getElementById("w1conj").checked = true;
    document.getElementById("w1inv").checked = true;
    document.getElementById("dw1fok").value = '1';
    document.getElementById("dw1conj").checked = true;
    document.getElementById("dw1inv").checked = true;
    document.getElementById("dw1fakt").checked = true;
    document.getElementById("dw1fakte").checked = false;
    document.getElementById("w1coeff").value = "11";

    document.getElementById("w2conj").checked = true;
    document.getElementById("w2inv").checked = true;
    document.getElementById("dw2fok").value = '2';
    document.getElementById("dw2conj").checked = true;
    document.getElementById("dw2inv").checked = true;
    document.getElementById("dw2fakt").checked = false;
    document.getElementById("dw2fakte").checked = true;
    document.getElementById("w2coeff").value = "1/3";

    document.getElementById("outconj").checked = true;
    document.getElementById("outinv").checked = true;
    document.getElementById("doutfok").value = '1';
    document.getElementById("doutconj").checked = true;
    document.getElementById("doutinv").checked = true;
    document.getElementById("doutfakt").checked = false;
    document.getElementById("doutfakte").checked = true;
    document.getElementById("woutcoeff").value = "-2/7";

    document.getElementById("w1").value = "x";
    document.getElementById("w2").value = "-yx";
    //setMuvelet(1);

    $('#regvtarto div.jtoggler-wrapper.jtoggler-wrapper-multistate div.jtoggler-control label.jtoggler-btn-wrapper input.jtoggler-radio:nth(0)').click()
    $('#cshstselecttarto div.jtoggler-wrapper.jtoggler-wrapper-multistate div.jtoggler-control label.jtoggler-btn-wrapper input.jtoggler-radio:nth(2)').click();

    if (regw == "w1")
        document.getElementById("calcw2").click();

    store_sign = -1;
    const signbtn = document.getElementById("setsign");
    signbtn.innerHTML = "-";
    document.getElementById("setwform").checked = true;

    document.getElementById("nstore").value = '4';
    trimStore();

    const tblf = $('table#regtbl.table-hideable tbody tr td.hide-column0')
    if (!tblf.hasClass("hide-col0"))
        tblf.trigger("click")

    const hbtn = document.getElementById("hideoutbtn");
    if (hbtn.innerText == "Hide")
        tglshouth(hbtn);
    if (document.getElementById("hsetting").style.display = "none")
        sbTgl('hsetting')

    const setm = document.getElementById("xymonom");
    setm.checked = true;
    set2monom(setm);
    document.getElementById("xX").checked = true;
    document.getElementById("setfejlec").checked = true;
    $("#setdX").val("xyx").trigger("change");
    $("#setdY").val("-y").trigger("change");
    document.getElementById("setX").value = 'a';
    document.getElementById("setY").value = 'b';

    const storbabtn = document.getElementById("storeinbtn");
    $("#w1coeff").trigger('change');
    for (var i = 0; i < 4; i++)
        storbabtn.click();
    tglStore(document.getElementById("nstore"));
};

function cancelBack() {
    const cel = $('#shoutstore .storeback.active');
    const cel1 = $('#shoutstore .storeback.atiro');
    if (cel1.length > 0) {
        cel1.html(cel1.html().replace("Átírás?", tempstoreback));
        cel1.removeClass('atiro');
        $('.derivtok').removeClass('dumb');
        $('#shoutstore .storeback.tempdumb').removeClass('tempdumb');
    };
    if (cel.length > 0) {
        //cel.html(cel.html().replace("Visszaállás?", tempstoreback));
        cel.html(cel.html().replace("Visszaállás?", "Átírás?"));
        cel.removeClass('active').addClass("atiro");
        //$('.derivtok').removeClass('dumb');
    };
};

function storeBack(elem) {
    const $e = $(elem);
    const act = $e.hasClass('active');
    const atiro = $e.hasClass('atiro');
    const panel = $('.derivtok');
    if (!act && !atiro) {
        const indx = "state" + $e.attr('data-back');
        let st = Store[indx];
        if (st != undefined && st.hasOwnProperty("w1")) {
            $('#shoutstore .storeback.active').removeClass('active');
            $('#shoutstore .storeback.atiro').removeClass('atiro');;

            $e.addClass('active');
            tempstoreback = elem.innerHTML;
            elem.innerHTML = "Visszaállás?";
            panel.addClass('dumb');
            $('#shoutstore .storeback:not(.active)').addClass('tempdumb');
        } else {
            $e.addClass('dumb');
        };
    } else if (atiro) {
        $('#shoutstore .storeback.active').removeClass('active');
        $('#shoutstore .storeback.atiro').removeClass('atiro');
        const indx = $e.attr('data-back');

        shtuffleW();
        Store["v" + indx] = [...curr_v];
        Store["txt" + indx] = curr_txt;
        Store["fej" + indx] = storefej;
        Store["state" + indx] = makeParamObj();

        $('.lastviewer[data-view=' + indx + ']').html(Store["txt" + indx]);
        $('.lastprebtn:nth(' + (indx - 1) + ')').html(Store["fej" + indx] || "&#x2205;");
        var w = []
        var txt = "";
        for (var j = 1; j <= Store.n; j++)
            w.push(Store["v" + j])
        w = strList_Ov(_.flatten(w));
        if (document.getElementById("xymonom").checked)
            txt += formazxyMonom(w);
        else
            txt += formazxyV(w, true, true);
        $('#lastprev').html(txt);

        const kij = $('.lastviewer[data-view=' + indx + ']');
        kij.addClass('villbgdark');
        setTimeout(() => { kij.removeClass('villbgdark'); }, 500);
        elem.innerHTML = elem.innerHTML.replace("Átírás?", tempstoreback);
        $('#shoutstore .storeback.tempdumb').removeClass('tempdumb');
        $e.removeClass('atiro');
        panel.removeClass('dumb');
    } else {
        const indx = "state" + $e.attr('data-back');
        let st = Store[indx];
        if (st != undefined && st.hasOwnProperty("w1")) {
            stateBack(st);
            $e.removeClass('active').addClass('atiro');
            elem.innerHTML = elem.innerHTML.replace("Visszaállás?", "Átírás?");
            panel.addClass('dumb');
            $('#shoutstore .storeback:not(.atiro)').addClass('tempdumb');
        } else {
            alert("A kiválasztott cimkéhez még nem tartozik bejegyzés a tárolóban.");
            $e.removeClass('active');
            elem.innerHTML = elem.innerHTML.replace("Visszaállás?", "Kimenet");
        };
    };
};

function w1forma() {
    var coeff = w1coeff
    var txt = "w<sub>1</sub>";
    if (wertekkel)
        txt = xy2XYmonom(w2xysor(document.getElementById("w1").value).trim()) || "( )";
    if (w1conj && w1inv)
        if (wertekkel)
            txt = "&#x27E8;" + txt.replace("( )", " ") + "&#x27E9;<sup>&dagger;</sup>";
        else
            txt += "<sup>&dagger;</sup>";
    else if (w1inv)
        if (wertekkel)
            txt = "&#x27E8;" + txt.replace("( )", " ") + "&#x27E9;<sup>−</sup>";
        else
            txt += "<sup class='invsign'>−</sup>";
    else if (w1conj)
        if (wertekkel)
            txt = "&#x27E8;" + txt.replace("( )", " ") + "&#x27E9;*";
        else
            txt += "*";
    if (dw1fok > 0) {
        if (dw1fok == 1) {
            if (dw1inv && dw1conj)
                txt = "∂<sub class='dersub'>&dagger;</sub>(" + txt + ")";
            else if (dw1inv)
                txt = "∂_(" + txt + ")";
            else if (dw1conj)
                txt = "∂<sub  class='dersub'>&lowast;</sub>(" + txt + ")";
            else
                txt = "∂(" + txt + ")";
        } else if (dw1fok > 1) {
            if (dw1inv && dw1conj)
                txt = "∂<sub class='dersub'>&dagger;</sub><sup class='derkitevo'>" + dw1fok + "</sup>(" + txt + ")";
            else if (dw1inv)
                txt = "∂_<sup class='derkitevo'>" + dw1fok + "</sup>(" + txt + ")";
            else if (dw1conj)
                txt = "∂<sub  class='dersub'>&lowast;</sub><sup class='derkitevo'>" + dw1fok + "</sup>(" + txt + ")";
            else
                txt = "∂<sup>" + dw1fok + "</sup>(" + txt + ")";
        };

        if (dw1fakt) {
            coeff = Fraction(1 / factorial(dw1fok)).mul(coeff);
            var eloj = ""
            if (coeff.s == -1)
                eloj = "−"
            if (coeff == 1 || coeff == -1)
                txt = eloj + txt;
            else
                txt = eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;" + txt;
        };
        if (dw1fakte) {
            coeff = Fraction(Math.pow(-1, dw1fok) / factorial(dw1fok)).mul(coeff);
            var eloj = ""
            if (coeff.s == -1)
                eloj = "−"
            if (coeff == 1 || coeff == -1)
                txt = eloj + txt;
            else
                txt = eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;" + txt;
        };
    }
    if (w1coeff != 1 && !(dw1fok > 0 && (dw1fakt || dw1fakte))) {
        var eloj = ""
        if (coeff.s == -1)
            eloj = "−"
        if (coeff.n == 1)
            txt = eloj + txt;
        else if (coeff.d != 1)
            txt = eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;" + txt;
        else
            txt = eloj + coeff.n + "&nbsp;" + txt;
    };
    if (txt.startsWith("−"))
        txt = "<span id='w1tok'><span class='wtokzj left'></span>" + txt + "<span class='wtokzj right'></span></span>";
    else
        txt = "<span id='w2tok'>" + txt + "</span>";
    return txt;
};

function w2forma() {
    var coeff = w2coeff
    var txt = "w<sub>2</sub>";
    if (wertekkel)
        txt = xy2XYmonom(w2xysor(document.getElementById("w2").value).trim()) || "( )";
    if (w2conj && w2inv)
        if (wertekkel)
            txt = "&#x27E8;" + txt.replace("( )", " ") + "&#x27E9;<sup>&dagger;</sup>";
        else
            txt += "<sup>&dagger;</sup>";
    else if (w2inv)
        if (wertekkel)
            txt = "&#x27E8;" + txt.replace("( )", " ") + "&#x27E9;<sup>−</sup>";
        else
            txt += "<sup class='invsign'>−</sup>";
    else if (w2conj)
        if (wertekkel)
            txt = "&#x27E8;" + txt.replace("( )", " ") + "&#x27E9;*";
        else
            txt += "*";
    if (dw2fok > 0) {
        if (dw2fok == 1) {
            if (dw2inv && dw2conj)
                txt = "∂<sub class='dersub'>&dagger;</sub>(" + txt + ")";
            else if (dw2inv)
                txt = "∂_(" + txt + ")";
            else if (dw2conj)
                txt = "∂<sub  class='dersub'>&lowast;</sub>(" + txt + ")";
            else
                txt = "∂(" + txt + ")";
        } else if (dw2fok > 1) {
            if (dw2inv && dw2conj)
                txt = "∂<sub class='dersub'>&dagger;</sub><sup class='derkitevo'>" + dw2fok + "</sup>(" + txt + ")";
            else if (dw2inv)
                txt = "∂_<sup class='derkitevo'>" + dw2fok + "</sup>(" + txt + ")";
            else if (dw2conj)
                txt = "∂<sub  class='dersub'>&lowast;</sub><sup class='derkitevo'>" + dw2fok + "</sup>(" + txt + ")";
            else
                txt = "∂<sup>" + dw2fok + "</sup>(" + txt + ")";
        };

        if (dw2fakt) {
            coeff = Fraction(1 / factorial(dw2fok)).mul(coeff);
            var eloj = ""
            if (coeff.s == -1)
                eloj = "−"
            if (coeff == 1 || coeff == -1)
                txt = eloj + txt;
            else
                txt = eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;" + txt;
        };
        if (dw2fakte) {
            coeff = Fraction(Math.pow(-1, dw2fok) / factorial(dw2fok)).mul(coeff);
            var eloj = ""
            if (coeff.s == -1)
                eloj = "−"
            if (coeff == 1 || coeff == -1)
                txt = eloj + txt;
            else
                txt = eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;" + txt;
        };
    }
    if (w2coeff != 1 && !(dw2fok > 0 && (dw2fakt || dw2fakte))) {
        var eloj = ""
        if (coeff.s == -1)
            eloj = "−"
        if (coeff.n == 1)
            txt = eloj + txt;
        else if (coeff.d != 1)
            txt = eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;" + txt;
        else
            txt = eloj + coeff.n + "&nbsp;" + txt;
    };
    if (txt.startsWith("−"))
        txt = "<span id='w2tok'><span class='wtokzj left'></span>" + txt + "<span class='wtokzj right'></span></span>";
    else
        txt = "<span id='w2tok'>" + txt + "</span>";
    return txt;
};

function w1w2forma(allas) {
    //const allas = $('#shH #cshstselecttarto .jtoggler-btn-wrapper.is-active').index() * 1;
    var muvelet = "&bullet;"
    if (allas * 1 < 1)
        muvelet = "<span style='font-size:130%;'>⧢</span>";
    if (allas * 1 > 1)
        muvelet = "<span style='font-size:120%;'>&lowast;</span>";
    const bzj = "<span class='wouttokzj left'></span>";
    const jzj = "<span class='wouttokzj right'></span>";
    const bbzj = "<span class='wouttokzjbig  left'></span>";
    const bjzj = "<span class='wouttokzjbig  right'></span>";
    var zjvan = false;
    var coeff = woutcoeff;
    if (outconj || outinv) {
        var txt = "<span id='w1w2tok'>" + bzj + w1forma() + muvelet + w2forma() + jzj + "</span>";
        zjvan = true;
    } else
        var txt = "<span id='w1w2tok'>" + w1forma() + muvelet + w2forma() + "</span>";

    if (outconj && outinv)
        txt += "<sup class='outsup'>&dagger;</sup>";
    else if (outinv)
        txt += "<sup class='outsup'>−</sup>";
    else if (outconj)
        txt += "<span class='outsuplow'>&lowast;</span>";

    if (doutfok > 0) {
        if (!zjvan)
            txt = bzj + txt + jzj;
        else
            txt = bbzj + txt + bjzj;
        if (doutfok == 1) {
            if (doutinv && doutconj)
                txt = "<span class='outbig'>∂<sub class='dersub'>&dagger;</sub></span>" + txt;
            else if (doutinv)
                txt = "<span class='outbig'>∂_</span>" + txt;
            else if (doutconj)
                txt = "<span class='outbig'>∂<sub  class='dersub'>&lowast;</sub></span>" + txt;
            else
                txt = "<span class='outbig'>∂</span>" + txt;
        } else if (doutfok > 1) {
            if (doutinv && doutconj)
                txt = "<span class='outbig'>∂<sub class='dersub'>&dagger;</sub><sup class='derkitevo'>" + doutfok + "</sup></span>" + txt;
            else if (doutinv)
                txt = "<span class='outbig'>∂_<sup class='derkitevo'>" + doutfok + "</sup></span>" + txt;
            else if (doutconj)
                txt = "<span class='outbig'>∂<sub  class='dersub'>&lowast;</sub><sup class='derkitevo'>" + doutfok + "</sup></span>" + txt;
            else
                txt = "<span class='outbig'>∂<sup>" + doutfok + "</sup></span>" + txt;
        };

        if (doutfakt) {
            coeff = Fraction(1 / factorial(doutfok)).mul(coeff);
            var eloj = ""
            if (coeff.s == -1)
                eloj = "−"
            if (coeff == 1 || coeff == -1)
                txt = eloj + txt;
            else
                txt = "<span class='outbig'>" + eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;</span>" + txt;
        }
        if (doutfakte) {
            coeff = Fraction(Math.pow(-1, doutfok) / factorial(doutfok)).mul(coeff);
            var eloj = ""
            if (coeff.s == -1)
                eloj = "−"
            if (coeff == 1 || coeff == -1)
                txt = eloj + txt;
            else
                txt = "<span class='outbig'>" + eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;</span>" + txt;
        }
    } else {
        var eloj = ""
        if (coeff.s == -1)
            eloj = "−"
        if (coeff == 1 || coeff == -1)
            txt = eloj + txt;
        else
            txt = "<span class='outbig'>" + eloj + formazottTortHTML(coeff.n, coeff.d) + "&nbsp;</span>" + txt;
    };

    var signinfo = '';
    if (store_sign == -1)
        signinfo = '<span class="storeneg">&#x25ac;</span>';
    txt = signinfo + txt;
    storefej = "<span class='storefej'>" + txt + "</span>";
    txt = "<div id='wform'>" + txt + "</div>";
    if (!nofejlec)
        wfejlec = txt;
    else
        wfejlec = "";
};

function w2xysor(str) {
    if (/\d/.test(str))
        str = str.replace(/(\d)/g, "^$1").match(/(x(\^\d)?)|(y(\^\d)?)|\+(\d)?|\-(\d)?|^[\+\-]?(\d)?/g).map(y => pow2xysor(y)).join('');
    return str
};

function in1_ci(str) {
    if (w1conj)
        str = conjstr(str);
    if (w1inv)
        str = invstr(str);
    return str;
};

function in2_ci(str) {
    if (w2conj)
        str = conjstr(str);
    if (w2inv)
        str = invstr(str);
    return str;
};

function out_ci(str) {
    if (outconj)
        str = conjstr(str);
    if (outinv)
        str = invstr(str);
    return str;
};

function vLout_ci(out) {
    if (outconj)
        out = out.map(y => [y[0], conjstr(y[1])]);
    if (outinv)
        out = out.map(y => [y[0], invstr(y[1])]);
    return out;
};

function yvec2xy(v) {
    str = "";
    for (let i of v) {
        for (var j = 0; j < i - 1; j++) {
            str += "x";
        }
        str += "y";
    }
    return str;
};

function xy2vec(xy) {
    var v = xy.split("y");
    var t = "y";
    const la = _.last(v);
    if (la != "")
        t = "x";
    v = v.slice(0, -1).map(function(z) {
        if (z == "")
            return 1;
        else if (z == "x")
            return 2;
        else
            return z.split("").length + 1
    });
    if (t == "x")
        if (la == "x")
            v.push(1)
        else
            v.push(la.split("").length);
    return [v, t];
};

/**
 * Computes the shuffle product of two arrays.
 * Returns an array of all possible interleaved sequences.
 */
function shuffleProduct(arr1, arr2) {
    // Base Case: If one array is empty, return the other as the only possible shuffle
    if (arr1.length === 0) return [arr2];
    if (arr2.length === 0) return [arr1];

    const result = [];

    // Inductive Step:
    // 1. Take the first element of arr1 and shuffle it with the rest
    const shuffles1 = shuffleProduct(arr1.slice(1), arr2);
    shuffles1.forEach(s => result.push([arr1[0], ...s]));

    // 2. Take the first element of arr2 and shuffle it with the rest
    const shuffles2 = shuffleProduct(arr1, arr2.slice(1));
    shuffles2.forEach(s => result.push([arr2[0], ...s]));

    return result;
};

function polyShuffle(strL1, strL2) {
    if (document.getElementById('xX').checked) {
        strL1 = strL1.map(y => [y[0], XY2xy(y[1])]);
        strL2 = strL2.map(y => [y[0], XY2xy(y[1])]);
    };
    var sh = []
    for (let u of strL1) {
        for (let v of strL2) {
            sh.push([u[0] * v[0], shuffleProduct(u[1], v[1])]);
        }
    };
    sh = _.flatten(sh.map(y => y[1].map(z => [y[0], z])));
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key.replaceAll(",", ""))]);
        };
    });
    return shobj;
};

function elojelCsere(str) {
    if (str.startsWith(" −")) {
        str = " +" + str.slice(2);
    } else if (str.startsWith(" +")) {
        str = " −" + str.slice(2);
    }
    return str;
};

function regHighlight(elem) {
    const tartotarto = elem.parentElement.parentElement.id;
    const tarto = elem.parentElement.id;
    if (tarto == "shoutcontainer")
        return;
    else if (tartotarto == "shoutstore") {
        $("#shoutstore span.hreg.hl").removeClass('hl');
        const dat = elem.getAttribute('data-reg');
        $("#shoutstore span.hreg[data-reg='" + dat + "']").addClass('hl');
        var fltxt = ""
        $(".lastviewer .hreg.hl").each(function() {
            var str = this.innerHTML;
            if ($($(this).parent().children()[0]).hasClass('negstore'))
                str = elojelCsere(str);
            fltxt += str;
        });
        $("#floatkijelzo").css("display", "block").html((fltxt));
    } else {
        $("#shouth span.hreg.hl").removeClass('hl');
        const dat = elem.getAttribute('data-reg');
        $("#shouth span.hreg[data-reg='" + dat + "']").addClass('hl');
        if (regvalt == "Ainvsh0") {
            if ($(elem).parent('.reg0veg').length > 0) {
                var fltxt = ""
                $(".reg0veg .hreg.hl").each(function() {
                    fltxt += this.innerHTML;
                });
                $("#floatkijelzo").css("display", "block").html((fltxt));
            } else if ($(elem).parent('.kashx').length > 0) {
                const sor = $(".kashx .hreg.hl");
                var txt = "";
                sor.each(function(e) {
                    var tx = $(this).parent('.kashx').text().slice(0, 2).trim() + $(this).html().trim();
                    tx = tx.replaceAll("−−", " + ");
                    tx = tx.replaceAll("−+", " − ");
                    tx = tx.replaceAll("+−", " − ");
                    tx = tx.replaceAll("++", " + ");
                    txt += tx;
                })
                if (txt.startsWith(" + "))
                    txt = txt.slice(3);
                $("#floatkijelzo").css("display", "block").html(txt);
            } else
                $("#floatkijelzo").css("display", "none");
        } else {
            if ($(elem).parent('.kashx').length > 0) {
                const sor = $(".kashx .hreg.hl");
                var txt = "";
                sor.each(function(e) {
                    var tx = $(this).parent('.kashx').text().slice(0, 2).trim() + $(this).html().trim();
                    tx = tx.replaceAll("−−", " +");
                    tx = tx.replaceAll("−+", " −");
                    tx = tx.replaceAll("+−", "−");
                    tx = tx.replaceAll("++", " +");
                    txt += tx;
                })
                if (txt.startsWith(" + "))
                    txt = txt.slice(3);
                $("#floatkijelzo").css("display", "block").html(txt);
            } else
                $("#floatkijelzo").css("display", "none");
        }
    };
};

function formazShuffle(v, blokk, withid) {
    v = _.groupBy(v);
    var txt = ""
    var ob = [];
    var szamlalo = 1;
    _.forEach(v, function(val, key) {
        var c = val.length;
        var xy = out_ci(key.replaceAll(',', ''));
        ob.push([c, xy]);
        var eloj = "+ "
        if (szamlalo == 1)
            eloj = "";
        if (withid) {
            if (c > 1)
                c = eloj + c + "&middot;";
            else
                c = eloj;
            xy = " <span class='hreg' data-reg=" + xy + " onclick='regHighlight(this)'>" + c.toString() + xy2XYmonom(xy) + "</span>"
            txt += xy;
            szamlalo++;
        } else {
            if (c > 1)
                c = " + " + c + "&middot;";
            else
                c = " + ";
            if (xy2mon)
                txt += c + xy2monom(xy2XY(xy));
            else
                txt += c + xy;
        }
    });
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    if (blokk && !xy2mon)
        txt = txt.replaceAll('y', 'y|');
    txt = xy2XY(txt);

    return [txt, ob];
};

function shufflexy(str1, str2) {
    const w1 = str1.split("");
    const w2 = str2.split("");
    const sh = shuffleProduct(w1, w2);
    const txt = formazShuffle(sh, false, true)[0];
    return txt;
};

function shuffleW() {
    const w1 = in1_ci(w2xysor(document.getElementById("w1").value)).split("");
    const w2 = in2_ci(w2xysor(document.getElementById("w2").value)).split("");
    var sh = shuffleProduct(w1, w2);
    var txt = "";

    txt = formazShuffle(sh, true, false)[0];

    sh = formazShuffle(sh, true, false)[1];
    sh = derivOutHn(sh, doutfok);
    const coeff = w1coeff.mul(w2coeff);
    sh = sh.map(y => [Fraction(y[0]).mul(coeff), y[1]]);
    if (document.getElementById("xymonom").checked)
        txt = formazxyMonom(sh);
    else
        txt = formazxyV(sh, true, true);

    document.getElementById("shouth").innerHTML = wfejlec + txt;

    txt = txt.replaceAll("clearOv();setOvelem(this);", "");
    inStore(sh, txt);
};

function derivGen(muv) {
    const w1 = in1_ci(w2xysor(document.getElementById("w1").value));
    const w2 = in2_ci(w2xysor(document.getElementById("w2").value));
    const n1 = dw1fok;
    const n2 = dw2fok;
    var cw1 = w1coeff;
    var cw2 = w2coeff;
    var cw12 = woutcoeff;

    var coeff = cw1.mul(cw2).mul(cw12);
    var sh = muv(derivHn(w1, n1, dw1conj, dw1inv), derivHn(w2, n2, dw2conj, dw2inv));
    var fakt = 1;
    if (dw1fakt)
        fakt *= factorial(n1);
    if (dw1fakte)
        fakt *= Math.pow(-1, n1) * factorial(n1);
    if (dw2fakt)
        fakt *= factorial(n2);
    if (dw2fakte)
        fakt *= Math.pow(-1, n2) * factorial(n2);

    if (coeff != 1 || fakt != 1)
        sh = sh.map(y => [Fraction(y[0]).mul(coeff).div(Fraction(fakt)), y[1]]);

    sh = vLout_ci(sh);
    if (doutfok > 0)
        sh = derivOutHn(sh, doutfok);
    if (document.getElementById("xymonom").checked)
        var txt = formazxyMonom(sh);
    else
        var txt = formazxyV(sh, true, true);

    document.getElementById("shouth").innerHTML = wfejlec + txt;

    txt = txt.replaceAll("clearOv();setOvelem(this);", "");
    inStore(sh, txt);
};


/** 
 * EZT MÉG ÁT KELL ÍRNI
 * 
 * Computes the stuffle (quasi-shuffle) product of two arrays.
 * Elements are interleaved, and matching indices may be summed.
 */
function stuffleProduct(arr1, arr2) {
    // Base Case: If one array is empty, return the other as the only result
    if (arr1.length === 0) return [arr2];
    if (arr2.length === 0) return [arr1];

    const result = [];
    const a = arr1[0];
    const b = arr2[0];
    const rest1 = arr1.slice(1);
    const rest2 = arr2.slice(1);

    // 1. Take first of arr1, stuffle remaining
    stuffleProduct(rest1, arr2).forEach(s => {
        result.push([a, ...s]);
    });

    // 2. Take first of arr2, stuffle remaining
    stuffleProduct(arr1, rest2).forEach(s => {
        result.push([b, ...s]);
    });

    // 3. Combine (stuff) first elements of both, then stuffle remaining
    const combined = a + b; // "a + b" for numbers; adjust for other types
    stuffleProduct(rest1, rest2).forEach(s => {
        result.push([combined, ...s]);
    });

    return result;
};

function xy2XY(str) {
    if (!regvalt.startsWith('hom') && document.getElementById('xX').checked) {
        var X = "X";
        var Y = "Y";
        const toX = document.getElementById("setX").value;
        const toY = document.getElementById("setY").value;
        if (toX.length > 0)
            X = toX;
        if (toY.length > 0)
            Y = toY;
        return str.replaceAll('x', X).replaceAll('y', Y);
    } else
        return str;
};

function XY2xy(str) {
    if (document.getElementById('xX').checked) {
        var X = "X";
        var Y = "Y";
        const toX = document.getElementById("setX").value;
        const toY = document.getElementById("setY").value;
        if (toX.length > 0)
            X = toX;
        if (toY.length > 0)
            Y = toY;
        return str.replaceAll(X, 'x').replaceAll(Y, 'y');
    } else
        return str;
};

function ybontas(str) {
    const pos = str.lastIndexOf("y");
    return str.slice(0, pos + 1);
};

function xystuffle(s1, s2) {
    var result = [];
    if (s1 == "")
        result = [
            [1, s2]
        ];
    else if (s2 == "")
        result = [
            [1, s1]
        ];
    else if (s1.search("y") < 0)
        result = [
            [1, s2 + s1]
        ];
    else if (s2.search("y") < 0)
        result = [
            [1, s1 + s2]
        ];
    else {
        const b1 = ybontas(s1);
        const b2 = ybontas(s2);
        const n = countEndingX(s1);
        const m = countEndingX(s2);
        const xveg = "x".repeat(n + m);
        const v1 = xy2vec(b1)[0];
        const v2 = xy2vec(b2)[0];
        const v = vecList_Ov(stuffleProduct(v1, v2));
        result = v.map(z => [z[0], yvec2xy(z[1]) + xveg]);
    };
    return result;
};

function concW() {
    const s1 = in1_ci(w2xysor(document.getElementById("w1").value)).toLowerCase();
    const s2 = in2_ci(w2xysor(document.getElementById("w2").value)).toLowerCase();
    const st = out_ci(s1 + s2);
    const n = doutfok;
    var fakt = 1;
    if (doutfakt)
        fakt *= factorial(n);
    if (doutfakte)
        fakt *= Math.pow(-1, n) * factorial(n);
    var dst = derivHn(st, doutfok, doutconj, doutinv);
    const coeff = woutcoeff.mul(w1coeff).mul(w2coeff).div(Fraction(fakt))
    dst = dst.map(y => [Fraction(y[0]).mul(coeff), y[1]]);
    if (document.getElementById("xymonom").checked)
        var txt = formazxyMonom(dst);
    else
        var txt = formazxyV(dst, true, true);
    if (txt.startsWith(" + "))
        txt = txt.slice(3);

    document.getElementById("shouth").innerHTML = wfejlec + txt;

    txt = txt.replaceAll("clearOv();setOvelem(this);", "");
    inStore(dst, txt);
};

function polyConc(m1, m2) {
    var out = [];
    if (m2 == undefined)
        m2 = [
            [1, ""]
        ];
    for (let x of m1) {
        for (let y of m2) {
            out.push([x[0] * y[0], x[1] + y[1]])
        }
    }

    var out1 = _.groupBy(out, y => y[1]);
    out1 = _.mapValues(out1, y => _.sum(y.map(z => z[0])));
    out = [];
    _.forEach(out1, function(value, key) {
        out.push([value * 1, key]);
    });
    return out;
};

function xyStuffleList(strL) {
    var out = [
        [1, ""]
    ];
    for (let w of strL)
        out = polyStuffle(out, [w]);
    return out;
};

function polyStuffle(strL1, strL2) {
    if (document.getElementById('xX').checked) {
        strL1 = strL1.map(y => [y[0], XY2xy(y[1])]);
        strL2 = strL2.map(y => [y[0], XY2xy(y[1])]);
    };
    var st = []
    for (let u of strL1) {
        for (let v of strL2) {
            st.push([u[0] * v[0], xystuffle(u[1], v[1])]);
        }
    };
    st = _.flatten(st.map(y => y[1].map(z => [y[0] * z[0], z[1]])));
    st = _.groupBy(st, y => y[1]);
    var stobj = [];
    _.forEach(st, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            stobj.push([s, xy2XY(key)]);
        };
    });
    return stobj;
};

function xyList_Ov(st) {
    st = _.groupBy(st, y => y[1]);
    var stobj = [];
    _.forEach(st, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            stobj.push([s, xy2XY(key)]);
        };
    });
    return stobj;
};

function xystuffleW(s1, s2, jelent) {
    var result = [];
    var jelentes = "";
    var st = [];
    if (s1 == "") {
        st = [
            [1, s2]
        ];
        if (jelent) {
            jelentes = "Ha w<sub>1</sub> az üres szó, akkor w<sub>1</sub>&nbsp;&lowast;&nbsp;w<sub>2</sub> = w<sub>2</sub>"
        }
    } else if (s2 == "") {
        st = [
            [1, s1]
        ];
        if (jelent) {
            jelentes = "Ha w<sub>2</sub> az üres szó, akkor w<sub>1</sub>&nbsp;&lowast;&nbsp;w<sub>2</sub> = w<sub>1</sub>"
        }
    } else if (s1.search("y") < 0) {
        st = [
            [1, s2 + s1]
        ];
        if (jelent) {
            jelentes = "Ha w<sub>1</sub>  szó csak x-et tartalmaz, akkor w<sub>1</sub>&nbsp;&lowast;&nbsp;w<sub>2</sub> = w<sub>2</sub>&nbsp;&bullet;&nbsp;w<sub>1</sub>"
        }
    } else if (s2.search("y") < 0) {
        st = [
            [1, s1 + s2]
        ];
        if (jelent) {
            jelentes = "Ha w<sub>2</sub>  szó csak x-et tartalmaz, akkor w<sub>1</sub>&nbsp;&lowast;&nbsp;w<sub>2</sub> = w<sub>1</sub>&nbsp;&bullet;&nbsp;w<sub>2</sub>"
        }
    } else {
        const b1 = ybontas(s1);
        const b2 = ybontas(s2);
        const n = countEndingX(s1);
        const m = countEndingX(s2);
        const xveg = "x".repeat(n + m);
        const v1 = xy2vec(b1)[0];
        const v2 = xy2vec(b2)[0];
        const v = vecList_Ov(stuffleProduct(v1, v2));
        var conjinv = "";
        if (outconj)
            conjinv += "<br/>Konjugálás"
        if (outinv)
            conjinv += "<br/>Invertálás"
        st = v.map(z => [z[0], yvec2xy(z[1]) + xveg]);
        if (jelent) {
            jelentes = "1. A w<sub>1</sub> = " + xy2XYmonom(s1) + " szó végéről levágjuk a(z) <b>" + n + "</b> darab " + xy2XYmonom('x') + " karaktert így a(z) " + xy2XY('y') + " karakterre végzödő <b>" + xy2XYmonom(b1) + "</b>  szót kapjuk, amit átalakítunk <b>v<sub>1</sub></b> = (" + v1 + ") vektorrá.<br/>2. A w<sub>2</sub> = " + xy2XYmonom(s2) + " szó végéről levágjuk a(z) <b>" + m + "</b> darab " + xy2XY('x') + " karaktert  így a(z)  " + xy2XY('y') + " karakterre végzödő <b>" + xy2XYmonom(b2) + "</b> szót kapjuk, amit átalakítunk <b>v<sub>2</sub></b> = (" + v2 + ") vektorrá.<br/>3. Kiszámítjuk a(z) (" + v1 + ")&nbsp;&lowast;&nbsp;(" + v2 + ") stuffle-szorzatot:<br/>";
            jelentes += ms2HTML(v);
            jelentes += "<br>4. Végül mindent vektort visszaalakítunk xy-szóvá, és mindegyik végéhez " + n + " + " + m + " = <b>" + (n + m) + "</b> darab " + xy2XY('x') + " karaktert írunk." + conjinv
        };
    };

    if (jelent)
        result = [st, jelentes];
    else
        result = st;
    return result;
};

function stuffleW() {
    const s1 = in1_ci(w2xysor(document.getElementById("w1").value)).toLowerCase();
    const s2 = in2_ci(w2xysor(document.getElementById("w2").value)).toLowerCase();
    var txt = "";
    const st = xystuffleW(s1, s2, true);
    var txt1 = "";
    var dst = derivOutHn(st[0], doutfok);
    const coeff = w1coeff.mul(w2coeff);
    dst = vLout_ci(dst).map(y => [Fraction(y[0]).mul(coeff), y[1]]);
    txt1 = formazxyV(dst, true, true);
    if (txt1.startsWith(" + "))
        txt1 = txt1.slice(3);
    txt1 = xy2XY(txt1)
    var jelentes = "";
    if (doutfok < 1)
        jelentes = "<hr/><span style='font-size:70%;color:#3e3e3e;'>" + st[1] + "</span>";
    txt = txt1 + jelentes;

    document.getElementById("shouth").innerHTML = wfejlec + txt;

    txt = txt.replaceAll("clearOv();setOvelem(this);", "");
    inStore(dst, txt1);
};

function stValasz1(det) {
    const elem = document.getElementById("sthomertek");
    const t = 100000;
    $('#mycellst1 .sagecell_editor textarea.sagecell_commands').val(det);
    $('#mycellst1 .sagecell_input button.sagecell_evalButton').click();
    var ra = setInterval(() => {
        valasz = $('#ideoutst1 .sagecell_sessionOutput pre').text();
        if (valasz != "") {
            clearInterval(ra);
            clearInterval(to);
            elem.innerHTML = " = " + valasz + "<-" + det;
        }
    }, 50);
    var to = setTimeout(() => {
        clearInterval(ra);
        elem.innerHTML = " &rightarrow;A válasz " + t / 1000 + " sec alatt nem érkezett meg.";
    }, t)
};

function stValasz2(det) {
    const elem = document.getElementById("stprodertek");
    const t = 100000;
    $('#mycellst2 .sagecell_editor textarea.sagecell_commands').val(det);
    $('#mycellst2 .sagecell_input button.sagecell_evalButton').click();
    var ra = setInterval(() => {
        valasz = $('#ideoutst2 .sagecell_sessionOutput pre').text();
        if (valasz != "") {
            clearInterval(ra);
            clearInterval(to);
            elem.innerHTML = " = " + valasz + "<-" + det;
        }
    }, 50);
    var to = setTimeout(() => {
        clearInterval(ra);
        elem.innerHTML = " &rightarrow;A válasz " + t / 1000 + " sec alatt nem érkezett meg.";
    }, t)
};

function make2ms(vl) {
    if (vl == undefined)
        return [];
    if (is_ms(vl))
        return vl;
    else
        return [vl];
};

function shHom10() {
    $('#xXsetting').addClass('dumb');
    const s1 = w2xysor(document.getElementById("w1").value).toLowerCase();
    const s2 = w2xysor(document.getElementById("w2").value).toLowerCase();
    const ms1 = xy2XYmonom(s1);
    const ms2 = xy2XYmonom(s2);

    var txt = "<i>A </i>w<sub>1</sub>&nbsp;<span style='font-size:larger;'>&#x29E2;</span>&nbsp;w<sub>2</sub> = " + ms1 + "&nbsp;<span style='font-size:larger;'>&#x29E2;</span>&nbsp;" + ms2 + " = <br/>";
    const st = polyShuffle([
        [1, s1]
    ], [
        [1, s2]
    ]);

    var txt1 = formazxyV(st, false, false);
    txt += txt1 + "<br/> <i>shuffle szorzatban minden szót helyettesítünk a shuffle-regularizáltjával</i><br/>"
    const na = st.length;
    for (var j = 0; j < na; j++) {
        var str = reg10(st[j][1]);
        txt += "<span style='text-decoration: underline;text-underline-offset: 10px;'>(<b>" + (j + 1) + "</b>) reg<sup>10</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -10px;'>&#x29E2;</sub>(" + xy2XYmonom(st[j][1]) + ")</span> = " + formazxyV(str) + "<br/>";
    }
    const regst = _.flatten(st.map(y => reg10(y[1]).map(z => [y[0] * z[0], z[1]])));
    const regstov = xyList_Ov(regst);
    var formregst = formazxyV(regst)
    if (regst.length != regstov.length)
        formregst += " = <span style='background-color:#ffaeae;'>" + formazxyV(regstov) + "</span>";

    const stvec = regstov.map(z => [z[0], xy2vec(z[1])[0]]);
    var stPari = "gp(\"1\")";
    if (stvec.length > 0)
        stPari = vecList2Pari(stvec);

    txt += "<i>A megfelelő behelyettesítés és összevonás után a</i><br/>reg<sup>10</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -10px;'>&#x29E2;</sub>(" + ms1 + "&nbsp;&#x29E2;&nbsp;" + ms2 + ") = <span style='background-color:#ffd0c6;'>" + formregst + "</span> ~ " + ms2HTML(stvec) + "<br/> <i>összeget kapjuk.</i><br/> ";
    const r1 = reg10(s1);
    const r2 = reg10(s2);
    const r1vec = r1.map(y => [y[0], xy2vec(y[1])[0]]);
    const r2vec = r2.map(y => [y[0], xy2vec(y[1])[0]]);

    txt += "<i>A </i>w<sub>1</sub> = " + ms1 + "<i> és a </i>w<sub>2</sub> = " + ms2 + "<i> szavak  shuffle-regularizáltja pedig</i><br/>";
    txt += "reg<sup>10</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -10px;'>&#x29E2;</sub>(" + ms1 + ") = <span style='background-color:#cad2ff;'>" + formazxyV(r1) + "</span> ~ " + ms2HTML(r1vec) + "<br/>" + "reg<sup>10</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -10px;'>&#x29E2;</sub>(" + ms2 + ") = <span style='background-color:#cad2ff;'>" + formazxyV(r2) + "</span> ~ " + ms2HTML(r2vec) + "<br/>";
    var pari1 = "1"
    if (r1vec.length > 0)
        pari1 = vecList2Pari(r1vec).slice(4, -2);
    var pari2 = "1"
    if (r2vec.length > 0)
        pari2 = vecList2Pari(r2vec).slice(4, -2);
    st12Pari = "gp(\"(" + pari1 + ")*(" + pari2 + ")\")";
    txt += "<i> A homomorfizmus teljesülése:</i><br/>&zeta;&hairsp;[reg<sup>10</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -10px;'>&#x29E2;</sub>(w<sub>1</sub>&nbsp;&#x29E2;&nbsp;w<sub>2</sub>)] <span id='sthomertek' style='color:blue;'></span><br/>";
    txt += "<span>&zeta;&hairsp;[reg<sup>10</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -10px;'>&#x29E2;</sub>(w<sub>1</sub>)]&nbsp;&middot;&nbsp;&zeta;&hairsp;[reg<sup>10</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -10px;'>&#x29E2;</sub>(w<sub>2</sub>)] <span id='stprodertek' style='color:blue;'></span>";

    document.getElementById("shouth").innerHTML = txt;
    stValasz1(stPari);
    stValasz2(st12Pari);
    //setTimeout(() => { stValasz2(st12Pari); }, 3000)

};

function stHom0() {
    $('#xXsetting').addClass('dumb');
    const s1 = w2xysor(document.getElementById("w1").value).toLowerCase();
    const s2 = w2xysor(document.getElementById("w2").value).toLowerCase();
    const ms1 = xy2XYmonom(s1);
    const ms2 = xy2XYmonom(s2);

    var txt = "<i>A </i>w<sub>1</sub>&nbsp;&lowast;&nbsp;w<sub>2</sub> = " + ms1 + "&nbsp;&lowast;&nbsp;" + ms2 + " = <br/>";
    const st = xystuffleW(s1, s2, true);
    var nreg = st[0].filter(y => y[1].startsWith('y'));
    var txt1 = formazxyV(st[0], false, false);
    txt1 = txt1.slice(3);
    txt += txt1 + "<br/> <i>stuffle szorzatban a non-asmissible </i>"
    txt += nreg.map(z => " <b>" + xy2XYmonom(z[1]) + "</b>") + " <i>szavakat helyettesítjük a stuffle-regularizáltjukkal</i>.<br/>";
    const na = nreg.length;
    for (var j = 0; j < na; j++)
        txt += "<span style='text-decoration: underline;text-underline-offset: 10px;'>(<b>" + (j + 1) + "</b>) reg<sup>0</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -5px;'>&lowast;</sub>(" + xy2XYmonom(nreg[j][1]) + ")</span> = " + formazxyV(reghar(nreg[j][1])) + "<br/>";

    const regst = _.flatten(st[0].map(y => reghar(y[1]).map(z => [y[0] * z[0], z[1]])));
    const regstov = xyList_Ov(regst);
    var formregst = formazxyV(regst)
    if (regst.length != regstov.length)
        formregst += " = <span style='background-color:#ffaeae;'>" + formazxyV(regstov) + "</span>";

    const stvec = regstov.map(z => [z[0], xy2vec(z[1])[0]]);
    const stPari = vecList2Pari(stvec);

    txt += "<i>A megfelelő behelyettesítés és összevonás után a</i><br/>reg<sup>0</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -5px;'>&lowast;</sub>(" + s1 + "&nbsp;&lowast;&nbsp;" + s2 + ") = <span style='background-color:#ffd0c6;'>" + formregst + "</span> ~ " + ms2HTML(stvec) + "<br/> <i>összeget kapjuk.</i><br/> ";
    const r1 = reghar(s1);
    const r2 = reghar(s2);
    const r1vec = r1.map(y => [y[0], xy2vec(y[1])[0]]);
    const r2vec = r2.map(y => [y[0], xy2vec(y[1])[0]]);
    txt += "<i>A </i>w<sub>1</sub> = " + ms1 + "<i> és a </i>w<sub>2</sub> = " + ms2 + "<i> szavak  stuffle-regularizáltja pedig</i><br/>";
    txt += "reg<sup>0</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -5px;'>&lowast;</sub>(" + ms1 + ") = <span style='background-color:#cad2ff;'>" + formazxyV(r1) + "</span> ~ " + ms2HTML(r1vec) + "<br/>" + "reg<sup>0</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -5px;'>&lowast;</sub>(" + ms2 + ") = <span style='background-color:#cad2ff;'>" + formazxyV(r2) + "</span> ~ " + ms2HTML(r2vec) + "<br/>";
    var pari1 = "1"
    if (r1vec.length > 0)
        pari1 = vecList2Pari(r1vec).slice(4, -2);
    var pari2 = "1"
    if (r2vec.length > 0)
        pari2 = vecList2Pari(r2vec).slice(4, -2);
    st12Pari = "gp(\"(" + pari1 + ")*(" + pari2 + ")\")";

    txt += "<i> A homomorfizmus teljesülése:</i><br/>&zeta;&hairsp;[reg<sup>0</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -5px;'>&lowast;</sub>(w<sub>1</sub>&nbsp;&lowast;&nbsp;w<sub>2</sub>)] <span id='sthomertek' style='color:blue;'></span><br/>";
    txt += "&zeta;&hairsp;[reg<sup>0</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -5px;'>&lowast;</sub>(w<sub>1</sub>)]&nbsp;&middot;&nbsp;&zeta;&hairsp;[reg<sup>0</sup><sub style='font-size: unset;vertical-align: -8px;margin-left: -5px;'>&lowast;</sub>(w<sub>2</sub>)] <span id='stprodertek' style='color:blue;'></span>";
    //txt = xy2XY(txt)

    document.getElementById("shouth").innerHTML = txt;
    stValasz1(stPari);
    stValasz2(st12Pari);
};

function reghar(str) {
    const m = countLeadingY(str);
    const u = xy2XY(str.slice(m));
    var sh = [];
    const Y = xy2XY('y');
    for (var i = 0; i <= m; i++) {
        let yst = [
            [Fraction(Math.pow(-1, i), factorial(i)), ""]
        ];
        if (i > 0)
            for (var j = 1; j <= i; j++)
                yst.push([1, Y]);
        let my = Y.repeat(m - i);
        let yu = my + u;
        let sij = polyStuffle(xyStuffleList(yst), [
            [1, yu]
        ]);
        sh = [...sh, ...sij];
    }
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key)]);
        };
    });
    return shobj;
};

function formazreghar(id) {
    var str = w2xysor(document.getElementById(id).value).toLowerCase();
    var txt = formazxyV(reghar(str));
    document.getElementById("shouth").innerHTML = txt;
};

function invreghar(str) {
    const m = countLeadingY(str);
    const u = xy2XY(str.slice(m));
    var sh = [];
    const Y = xy2XY('y');
    for (var i = 0; i <= m; i++) {
        let yst = [
            [1 / factorial(i), ""]
        ];
        if (i > 0)
            for (var j = 1; j <= i; j++)
                yst.push([1, Y]);
        let my = Y.repeat(m - i);
        let yu = reghar(my + u);
        let sij = polyStuffle(yu, xyStuffleList(yst));
        sh = [...sh, ...sij];
    }
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key)]);
        };
    });
    return shobj;
};

function formazinvreghar(id) {
    var str = w2xysor(document.getElementById(id).value).toLowerCase();
    var txt = formazxyV(invreghar(str));
    document.getElementById("shouth").innerHTML = txt;
};

function reghar10(str) {
    const m = countLeadingY(str);
    const n = countEndingX(str);
    const u = xy2XY(str.slice(m, str.length - n));
    var sh = [];
    const X = xy2XY('x');
    const Y = xy2XY('y');
    for (var i = 0; i <= m; i++) {
        let y = [
            [Math.pow(-1, i) / factorial(i), ""]
        ];
        if (i > 0)
            for (var k = 1; k <= i; k++)
                y.push([1, Y]);
        for (var j = 0; j <= n; j++) {
            let x = X.repeat(j) || "";
            let my = Y.repeat(m - i);
            let nx = X.repeat(n - j);
            let yux = my + u + nx;
            let sij = polyStuffle(polyStuffle(xyStuffleList(y), [
                [1, yux]
            ]), [
                [Math.pow(-1, j) / factorial(j), x]
            ]);
            sh = [...sh, ...sij];
        };
    }
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key.replaceAll(",", ""))]);
        };
    });
    //shobj = shobj.map(y => [Fraction(y[0]).toFraction(), y[1]]).filter(z => z[0] != "0");
    return shobj;
};

function formazreghar10(id) {
    var str = w2xysor(document.getElementById(id).value).toLowerCase();
    var txt = formazxyV(reghar10(str));
    document.getElementById("shouth").innerHTML = txt;
};

function invreghar10(str) {
    const m = countLeadingY(str);
    const n = countEndingX(str);
    const u = xy2XY(str.slice(m, str.length - n));
    var sh = [];
    const X = xy2XY('x');
    const Y = xy2XY('y');
    for (var i = 0; i <= m; i++) {
        let y = [
            [1 / factorial(i), ""]
        ];
        if (i > 0)
            for (var k = 1; k <= i; k++)
                y.push([1, Y]);
        for (var j = 0; j <= n; j++) {
            let x = X.repeat(j) || "";
            let my = Y.repeat(m - i);
            let nx = X.repeat(n - j);
            let yux = reghar10(my + u + nx);
            let sij = polyStuffle(polyStuffle(xyStuffleList(y),
                yux
            ), [
                [1 / factorial(j), x]
            ]);
            sh = [...sh, ...sij];
        };
    }
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key.replaceAll(",", ""))]);
        };
    });
    //shobj = shobj.map(y => [Fraction(y[0]).toFraction(), y[1]]).filter(z => z[0] != "0");
    return shobj;
};

function formazinvreghar10(id) {
    var str = w2xysor(document.getElementById(id).value).toLowerCase();
    var txt = formazxyV(invreghar10(str));
    document.getElementById("shouth").innerHTML = txt;
};

function shtuffleW() {
    //closeStore();
    $('#xXsetting').removeClass('dumb');
    const elem = document.getElementById("shouth");
    const actel = $('#k1 .keplet.active .kepletvalaszto.selected');
    const allas = $('#shH #cshstselecttarto .jtoggler-btn-wrapper.is-active').index();
    w1w2forma(allas);
    const w = regw;
    regvalt = "alap";
    if (actel.length > 0)
        regvalt = actel.attr('data-reg');
    $('.derivtok').addClass('dumb');
    $('#regtbl tr td input.forderiv').addClass('dumb');

    if (regvalt == "alap") {
        $('#regtbl tr td input.forderiv').removeClass('dumb');
        const cel = $('#shoutstore .storeback.active');
        const cel1 = $('#shoutstore .storeback.atiro');
        if (cel.length + cel1.length == 0)
            $('.derivtok').removeClass('dumb');
        if (dw1fok + dw2fok != 0) {
            if (allas == 2)
                derivGen(polyStuffle);
            else if (allas == 0)
                derivGen(polyShuffle);
            else if (allas == 1)
                derivGen(polyConc);
        } else {
            if (allas == 2)
                stuffleW();
            else if (allas == 0)
                shuffleW();
            else if (allas == 1)
                concW();
        }
    } else if (regvalt == "Ash0")
        formazS0reg(w, "");
    else if (regvalt == "Ainvsh0")
        formazinvS0reg(w);
    else if (regvalt == "homsh10")
        shHom10();
    else if (regvalt == "Ash10")
        formazS10reg(w, "");
    else if (regvalt == "Ainvsh10")
        formazinvS10reg(w);
    else if (regvalt == "homst0")
        stHom0();
    else if (regvalt == "Ast0")
        formazreghar(w);
    else if (regvalt == "Ainvst0")
        formazinvreghar(w);
    else if (regvalt == "Ast10")
        formazreghar10(w);
    else if (regvalt == "Ainvst10")
        formazinvreghar10(w);
    else
        elem.innerHTML = regvalt;
};

function pickKeplet(e) {
    if (!$(e).hasClass("selected")) {
        $(e).parent().find(".selected").removeClass("selected");
        $(e).addClass("selected");
    } else {
        $(e).removeClass("selected");
    }
    shtuffleW();
};

function w1w2Csere() {
    const w1 = document.getElementById("w1");
    const w2 = document.getElementById("w2");
    const t1 = w1.value;
    const t2 = w2.value;
    w1.value = t2;
    w2.value = t1;
    setTimeout(() => { $('#w1,#w2').addClass('villbg'); }, 200)
    setTimeout(() => { $('#w1,#w2').removeClass('villbg') }, 500)
};

function setCalcw(e) {
    if ($(e).hasClass("kiur"))
        w1w2Csere();
    else {
        const id = e.id;
        if (id == "calcw1") {
            document.getElementById("calcw2").classList.remove("kiur");
            document.getElementById("calcw1").classList.add("kiur");
            regw = "w1";
        } else {
            document.getElementById("calcw1").classList.remove("kiur");
            document.getElementById("calcw2").classList.add("kiur");
            regw = "w2";
        }
        shtuffleW();
    }
};

$(document).on('jt:toggled:multi', function(event, target) {
    const id = $(target).parent().parent().parent().parent()[0].id;
    const regvelem = document.getElementById("regv");
    regvelem.parentElement.parentElement.classList.remove('dumb');
    $('.keplet.active').removeClass('active');
    if (id == "cshstselecttarto") {
        var allas = $(target).parent().index();
        var regvallas = $('#shH #regvtarto .jtoggler-btn-wrapper.is-active').index();
        if (allas == 2) {
            $(".shstlabel").html("&lowast;");
            if (regvallas == 0) {
                $('#reghar0_keplet.keplet').addClass('active');
            } else if (regvallas == 2) {
                $('#reghar10_keplet.keplet').addClass('active');
            } else if (regvallas == 1) {
                $('#alap_keplet.keplet').addClass('active');
                $('#alap_keplet.keplet #muveletjel').html("&lowast;");
            }
        } else if (allas == 0) {
            $(".shstlabel").html("&#x29E2;");
            if (regvallas == 0) {
                $('#reg0_keplet.keplet').addClass('active');
            } else if (regvallas == 2) {
                $('#reg10_keplet.keplet').addClass('active');
            } else if (regvallas == 1) {
                $('#alap_keplet.keplet').addClass('active');
                $('#alap_keplet.keplet #muveletjel').html("&#x29E2;");
            }
        } else {
            regvelem.parentElement.parentElement.classList.add("dumb");
            $('.keplet').removeClass('active');
            $('#alap_keplet.keplet').addClass('active');
            $('#alap_keplet.keplet #muveletjel').html("&bullet;");
            shtuffleW();
        }
    } else if (id == "regvtarto") {
        var allas = $(target).parent().index();
        var shallas = $('#shH #cshstselecttarto .jtoggler-btn-wrapper.is-active').index();
        if (allas == 1) {
            $('#alap_keplet.keplet').addClass('active');
        } else if (allas == 0) {
            if (shallas == 0)
                $('#reg0_keplet.keplet').addClass('active');
            else if (shallas == 2)
                $('#reghar0_keplet.keplet').addClass('active');
            else if (shallas == 1)
                $('#alap_keplet.keplet').addClass('active');
            closeStore();
        } else if (allas == 2) {
            if (shallas == 0)
                $('#reg10_keplet.keplet').addClass('active');
            else if (shallas == 2)
                $('#reghar10_keplet.keplet').addClass('active');
            else if (shallas == 1)
                $('#alap_keplet.keplet').addClass('active');
            closeStore();
        }
    }
    shtuffleW();
});

function regValtas() {
    const old = $("#k1 .keplet.active")
    const oid = old[0].id;
    var newid = "";
    if (oid == "reg0_keplet")
        newid = "reg10_keplet";
    else if (oid == "reg10_keplet")
        newid = "reg0_keplet";
    else if (oid == "reghar0_keplet")
        newid = "reghar10_keplet";
    else if (oid == "reghar10_keplet")
        newid = "reghar0_keplet";
    document.getElementById(oid).classList.remove("active");
    document.getElementById(newid).classList.add("active");
};

function shstValtas(e) {
    const st = e.checked;
    if (st) {
        $(".shstlabel").html("&lowast;")
        if ($('#reg0_keplet.keplet').hasClass('active')) {
            $('#reg0_keplet.keplet').removeClass('active');
            $('#reghar0_keplet.keplet').addClass('active');
        } else {
            $('#reg10_keplet.keplet').removeClass('active');
            $('#reghar10_keplet.keplet').addClass('active');
        }
    } else {
        $(".shstlabel").html("&#x29E2;")
        if ($('#reghar0_keplet.keplet').hasClass('active')) {
            $('#reghar0_keplet.keplet').removeClass('active');
            $('#reg0_keplet.keplet').addClass('active');
        } else {
            $('#reghar10_keplet.keplet').removeClass('active');
            $('#reg10_keplet.keplet').addClass('active');
        }
    }
    shtuffleW();
};

function countEndingX(str) {
    // Matches one or more 'x' at the end of string ($)
    str = XY2xy(str);
    const match = str.match(/x+$/);
    return match ? match[0].length : 0;
};

function countLeadingY(str) {
    str = XY2xy(str);
    // Regex to match one or more 'x' characters at the start of the string
    const regex = /^y+/;

    // Use the match() method to find the matching portion
    const match = str.match(regex);

    // If a match is found, return the length of the matched substring
    if (match) {
        return match[0].length;
    } else {
        // If no match (string doesn't start with 'x'), return 0
        return 0;
    }
}

function hlh(e, j) {
    $("#shouth span.hreg.hl").removeClass('hl');
    $('#shouth .ashx,#shouth .kashx').removeClass('hl');
    $(e).addClass('hl');
    $('#shouth .kashx[data-h=' + j + ']').addClass('hl');

};

function khlh(e, j) {
    $('#shouth .ashx,#shouth .kashx:not(.hreg)').removeClass('hl');
    $(e).addClass('hl');
    $('#shouth .ashx[data-h=' + j + ']').addClass('hl');

};

function formazS0reg(id, str0) {
    if (id == "")
        var str = str0;
    else
        str = w2xysor(document.getElementById(id).value).toLowerCase();
    const n = countEndingX(str);
    const a = str.slice(0, str.length - n);
    var ob = [
        [1, [str.split("")]]
    ];
    var txt = "<span style='display:block;background-color:#bfbfbf4f;;margin-bottom:10px;padding-left:5px;'>(A)-ban: u = " + xy2XYmonom(a) + "&in;&nbsp;&#x1d525;y;&nbsp;n = " + n;
    txt += '</span>reg<sup>0</sup><sub><span style="font-size:larger;margin-left:-0.2em;">&#x29E2;</span></sub>(' + xy2XYmonom(str) + ') = <span class="block" style="transform: scale(1.5);">∑</span><sub style="vertical-align:-1.6em;margin-left:-2em;">0&leq;j&leq;' + n + '</sub>  (-1)<sup>j</sup> ' + xy2XYmonom(a) + xy2XYmonom("x") + '<sup>' + n + ' - j</sup><span style="margin:0 3px;">&#x29E2;</span>' + xy2XYmonom("x") + '<sup>j</sup> = ';
    txt += ' <span class="ashx" onclick="hlh(this,0)" data-h="0">' + xy2XYmonom(a) + '<span style="font-weight:600;color:red;">' + xy2XYmonom("x".repeat(n)) + '</span><span style="margin:0 3px;">&#x29E2;</span>( )</span>';
    var txt2 = " <hr/><span class='kashx' data-h='0' onclick='khlh(this,0);'>   <span onclick='regHighlight(this);' class='hreg' data-reg='" + xy2XY(str) + "'>" + xy2XYmonom(str) + '</span></span>';
    if (str.endsWith("y")) {
        document.getElementById("shouth").innerHTML = txt + txt2;
        return;
    };
    var v = "x",
        e = "x".repeat(n - 1);
    for (var j = 1; j < n; j++) {
        var eloj = "+ "
        if (j % 2 == 1)
            var eloj = " − "
        txt += ' <span class="ashx" onclick="hlh(this,' + j + ')" data-h="' + j + '">' + eloj + xy2XYmonom(a) + '<span style="font-weight:600;color:red;">' + xy2XYmonom(e) + '</span>' + '<span style="margin:0 3px;">&#x29E2;</span><span style="font-weight:600;color:blue;">' + xy2XYmonom(v) + '</span></span>';
        ob.push([Math.pow(-1, j), shuffleProduct((a + e).split(""), v.split(""))]);
        txt2 += " <span onclick='khlh(this," + j + ")' class='kashx' data-h='" + j + "'>" + eloj + "<span class='paren'>(</span>" + shufflexy(a + e, v) + "<span class='paren'>)</span></span>";
        v += "x";
        e = e.slice(0, -1);
    }
    var eloj = " + "
    if (n % 2 == 1)
        var eloj = "− "
    txt += ' <span class="ashx" onclick="hlh(this,' + n + ')" data-h="' + n + '">' + eloj + xy2XYmonom(a + e) + '<span style="margin:0 3px;">&#x29E2;</span><span style="font-weight:600;color:blue;">' + xy2XYmonom(v) + '</span></span>';
    txt2 += " <span onclick='khlh(this," + n + ");' class='kashx' data-h='" + n + "'>" + eloj + "<span class='paren'>(</span>" + xy2XY(shufflexy(a + e, v)) + "<span class='paren'>)</span></span>";
    ob.push([Math.pow(-1, n), shuffleProduct((a + e).split(""), v.split(""))]);

    ob = ob.map(y => y[1].map(z => [y[0], z.join('')]));
    ob = _.groupBy(_.flatten(ob), y => y[1]);
    var ovtxt = "";
    var adm = "";
    var szamlalo = 0;
    _.forEach(ob, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        var pl = "+ ";
        if (szamlalo == 0)
            pl = "";
        if (s != 0) {
            if (s == 1) {
                ovtxt += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + pl + xy2XYmonom(key.replaceAll("y", "y|")) + "</span>";
                adm += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + pl + "(" + xy2vec(key)[0] + ")" + "</span>";
            } else if (s == -1) {
                ovtxt += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + "− " + xy2XYmonom(key.replaceAll("y", "y|")) + "</span>";
                adm += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + " − (" + xy2vec(key)[0] + ")" + "</span>";
            } else if (s > 1) {
                ovtxt += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + pl + s + "&middot;" + xy2XYmonom(key.replaceAll("y", "y|")) + "</span>";
                adm += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + pl + s + "&lowast;(" + xy2vec(key)[0] + ")" + "</span>";
            } else if (s < 1) {
                ovtxt += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + "− " + Math.abs(s) + "&middot;" + xy2XYmonom(key.replaceAll("y", "y|")) + "</span>";
                adm += " <span class='hreg' data-reg=" + xy2XY(key) + " onclick='regHighlight(this)'>" + " − " + Math.abs(s) + "&lowast;(" + xy2vec(key)[0] + ")" + "</span>";
            }
            szamlalo++;
        };
    });
    if (id == "")
        return txt + " = " + txt2 + " = " + "<hr/>" + ovtxt + " = " + "<hr/>" + adm;
    else
        document.getElementById("shouth").innerHTML = txt + " = " + txt2 + " = " + "<hr/>" + ovtxt + " = " + "<hr/>" + adm;
};

function reg0(str) {
    const n = countEndingX(str);
    if (n == 0)
        if (xy2mon)
            return [
                [1, str], xy2XYmonom(str)
            ];
        else
            return [
                [1, str], xy2XY(str.replaceAll("y", "y|"))
            ];
    const a = str.slice(0, str.length - n);
    var ob = [
        [1, [str.split("")]]
    ];
    var v = "x",
        e = "x".repeat(n - 1);
    for (var j = 1; j < n; j++) {
        ob.push([Math.pow(-1, j), shuffleProduct((a + e).split(""), v.split(""))]);
        v += "x";
        e = e.slice(0, -1);
    };
    ob.push([Math.pow(-1, n), shuffleProduct((a + e).split(""), v.split(""))]);

    ob = ob.map(y => y[1].map(z => [y[0], z.join('')]));
    ob = _.groupBy(_.flatten(ob), y => y[1]);
    var ovtxt = "";
    var shobj = [];
    var szamlalo = 0;
    _.forEach(ob, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        var pl = " + ";
        if (szamlalo == 0)
            pl = "";
        if (s != 0) {
            shobj.push([s, key]);
            if (s == 1 || s == -1) {
                ovtxt += pl + xy2XYmonom(key);
            } else {
                ovtxt += pl + Math.abs(s) + "&middot;" + xy2XYmonom(key);
            }
            szamlalo++;
        };
    });
    if (shobj[0][0] < 0)
        ovtxt = ' − <span class="paren">(</span>' + ovtxt + '<span class="paren">)</span>';
    else
        ovtxt = '<span class="paren">(</span>' + ovtxt + '<span class="paren">)</span>';
    //document.getElementById("shouth").innerHTML = ovtxt;
    return [shobj, ovtxt];
};

function formazPoly2Reg0(vL) {
    var txt = "";
    var szamlalo = 0;
    for (let v of vL) {
        var s = v[0];
        var xy = v[1];
        var pl = "+ ";
        if (szamlalo == 0)
            pl = "";
        if (s == 1) {
            if (xy2mon)
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + pl + xy2XYmonom(xy) + "</span>";
            else
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + pl + xy2XY(xy.replaceAll("y", "y|")) + "</span>";
        } else if (s == -1) {
            if (xy2mon)
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + "− " + xy2XYmonom(xy) + "</span>";
            else
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + "− " + xy2XY(xy.replaceAll("y", "y|")) + "</span>";
        } else if (s > 1) {
            if (xy2mon)
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + pl + s + "&middot;" + xy2XYmonom(xy) + "</span>";
            else
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + pl + s + "&middot;" + xy2XY(xy.replaceAll("y", "y|")) + "</span>";
        } else if (s < 1) {
            if (xy2mon)
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + "− " + Math.abs(s) + "&middot;" + xy2XYmonom(xy) + "</span>";
            else
                txt += " <span class='hreg' data-reg=" + xy2XY(xy) + " onclick='regHighlight(this)'>" + "− " + Math.abs(s) + "&middot;" + xy2XY(xy.replaceAll("y", "y|")) + "</span>";
        }
        szamlalo++;
    };
    return txt;
};

function reg0pl(e, str) {
    if ($(e).hasClass('active')) {
        $('#shouth span.reg0kijelzo[data-xy=' + str + ']').removeClass('active');
        $(e).removeClass('active');
        return;
    } else {
        $('#shouth span.reg0pl.active').removeClass('active');
        $('#shouth span.reg0kijelzo.active').removeClass('active');
        $(e).addClass('active');
        const kij = $('#shouth span.reg0kijelzo[data-xy=' + str + ']');
        if (!str.endsWith('y')) {
            var strki = formazS0reg("", str);
            kij.addClass('active');
            kij[0].innerHTML = strki;
        } else {
            kij.addClass('active');
            kij[0].innerHTML = str;
        }
    };
};

function masodiktgl(j) {
    var elem = $('.masodik[data-id=' + j + ']')[0];
    $(elem).toggle();
};

function formazinvS0reg(id) {
    const str = w2xysor(document.getElementById(id).value).toLowerCase();
    const n = countEndingX(str);
    const a = str.slice(0, str.length - n);
    var txt = "<span style='display:block;background-color:#bfbfbf4f;margin-bottom:10px;padding-left:5px;'>(A')-ben: u = " + xy2XYmonom(a) + "&in;&nbsp;&#x1d525;y;&nbsp;n = " + n;
    if (n == 0) {
        txt += '</span><div class="reg0sor"><b style="background-color:#bfbfbf54;padding:0 5px;outline:1px solid #aaa;margin-right: 10px;">j = 0</b><span class="reg0pl" onclick="reg0pl(this,\'' + str + '\');">reg<sup>0</sup><sub><span style="font-size:larger;margin-left:-0.2em;">&#x29E2;</span></sub>(' + xy2XYmonom(a) + '<span style="font-weight:600;color:red;">' + xy2XYmonom("x".repeat(n)) + '</span>)</span>' + '<span style="margin:0 3px;">&#x29E2;</span><span style="font-weight:600;color:blue;">( )</span> =<br/><span class="reg0kijelzo" data-xy="' + str + '"></span><span class="reg0veg">' + str + '<span></div>';
        document.getElementById("shouth").innerHTML = txt;
        return;
    }
    const r0 = reg0(str);
    const r00 = polyShuffle(r0[0], [
        [1, ""]
    ]);
    txt += '</span><div class="reg0sor"><b style="background-color:#bfbfbf54;padding:0 5px;outline:1px solid #aaa;margin-right: 10px;">j = 0</b><span class="reg0pl" onclick="reg0pl(this,\'' + str + '\');">reg<sup>0</sup><sub><span style="font-size:larger;margin-left:-0.2em;">&#x29E2;</span></sub>(' + xy2XYmonom(a) + '<span style="font-weight:600;color:red;">' + xy2XYmonom("x".repeat(n)) + '</span>)</span>' + '<span style="margin:0 3px;">&#x29E2;</span><span style="font-weight:600;color:blue;">( )</span><span style="display:inline;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#fffd9f;border-radius: 4px;" onclick="masodiktgl(&quot;0&quot;);">=</span><br/><span class="reg0kijelzo" data-xy="' + str + '"></span><span class="masodik" data-id="0">' + r0[1] + '<span style="margin:0 3px;">&#x29E2;</span><span style="font-weight:600;color:blue;">( )</span> =</span><span class="reg0veg">' + formazPoly2Reg0(r00) + '<span></div>';
    var v = "x",
        e = "x".repeat(n - 1);
    for (var j = 1; j <= n; j++) {
        var r = reg0(a + e);
        if (j == n)
            var er = polyShuffle([r[0]], [
                [1, v]
            ]);
        else
            var er = polyShuffle(r[0], [
                [1, v]
            ]);
        txt += '<div class="reg0sor"><b style="background-color:#bfbfbf54;padding:0 5px;outline:1px solid #aaa;margin-right: 10px;">j = ' + j + '</b><span class="reg0pl" onclick="reg0pl(this,\'' + (a + e).toString().trim() + '\');">reg<sup>0</sup><sub><span style="font-size:larger;margin-left:-0.2em;">&#x29E2;</span></sub>(' + xy2XYmonom(a) + '<span style="font-weight:600;color:red;">' + xy2XYmonom(e) + '</span>)</span>' + '<span style="margin:0 3px;">&#x29E2;</span><span style="font-weight:600;color:blue;">' + xy2XYmonom(v) + '</span></span> <span style="display:inline;border:1px solid #eac2c2;padding:2px 10px;margin:0 10px;vertical-align: middle;cursor:pointer;background-color:#fffd9f;border-radius: 4px;" onclick="masodiktgl(&quot;' + j + '&quot;);">=</span><span class="reg0kijelzo" data-xy="' + (a + e) + '"></span><span class="masodik" data-id="' + j + '">' + r[1] + '<span style="margin:0 3px;">&#x29E2;</span><span style="font-weight:600;color:blue;">' + xy2XYmonom(v) + '</span> =</span><span class="reg0veg">' + formazPoly2Reg0(er) + '<span></div>';
        v += "x";
        e = e.slice(0, -1);
    }
    document.getElementById("shouth").innerHTML = txt;
};

function helpTglafh1(id) {
    var elem = document.getElementById(id);
    var open = elem.style.display;
    var doc = elem.childNodes[1].src;
    if (open == "none" || !doc.endsWith("base_of_halgebra_1.pdf")) {
        elem.childNodes[1].src = "../docs/base_of_halgebra_1.pdf";
        elem.style.display = "block";
    } else
        elem.style.display = "none";
};

function formazxyV(vL, blokk, withid) {
    if (vL.length == 0)
        return "( )";
    var txt = ""
    for (let v of vL) {
        var c = v[0];
        if (c == 1)
            c = " + ";
        else if (c > 0) {
            var cc = Fraction(1 * c).toFraction();
            if (cc != "0")
                c = " + " + cc + "&middot;";
            else
                c = 0;
        } else if (c == -1)
            c = " − ";
        else if (c < 0) {
            var cc = Fraction(-1 * c).toFraction();
            if (cc != "0")
                c = " − " + cc + "&middot;";
            else
                c = 0;
        }
        var xy = v[1];
        const xyid = xy;
        if (blokk && !xy2mon)
            xy = xy.replaceAll('y', 'y|');
        if (withid) {
            if (c != 0)
                xy = " <span class='hreg' data-reg=" + xyid + " data-c='" + v[0] + "' onclick='regHighlight(this);clearOv();setOvelem(this);'>" + (c + xy2XYmonom(xy)) + "</span>"
            txt += xy;
        } else {
            if (c != 0)
                if (xy2mon)
                    txt += c + xy2monom(xy2XY(xy));
                else
                    txt += c + xy;
        }
    };
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    txt = xy2XY(txt);
    return txt;
};

var ovosszeg = 0;

function reg10hl(e) {
    const $e = $(e);
    $('#shouth table td.hl').removeClass('hl');
    $e.addClass('hl');
    const rs = formazxyV(JSON.parse($e.attr('data-reg')), true, true);
    const elem = $('#shouth #reg10r');
    elem.addClass('active').html(rs);

    if ($e.find('.ov').length == 0) {
        const fixelem = $('#shouth #reg10ov .hreg.hl');
        const fixreg = fixelem.attr('data-reg');
        fixelem.addClass('szamlalva');
        if (fixreg != undefined) {
            setOvjelj();
        } else if (ovelem != "") {
            document.getElementById("ovjelentes").classList.add('active');
            document.getElementById("ovjelentesj").innerHTML = '<span class="oveleje">0</span>' + xy2XYmonom(ovelem);
            document.getElementById("ovjelentesb").innerHTML = "0";
        } else
            return;
        let parja = $('#shouth #reg10r .hreg[data-reg=' + ovelem + ']');
        let c = 0;
        if (parja.length > 0) {
            c = parja.attr('data-c');
            ovosszeg += 1 * c;
            document.getElementById("ovjelentesb").innerHTML = ovosszeg.toString();
            parja.addClass('hl');
        };
        if (c == 0)
            $e.append('<span class="ov halvany">' + c + '</span>');
        else
            $e.append('<span class="ov">' + c + '</span>');
    } else {
        if (ovelem != "") {
            let parja = $('#shouth #reg10r .hreg[data-reg=' + ovelem + ']');
            parja.addClass('hl');
        }
    };
};

var ovelem = "";

function setOvelem(e) {
    ovelem = $(e).attr('data-reg');
};

function setOvjelj() {
    document.getElementById("ovjelentes").classList.add('active');
    const txt = $('#shouth #reg10ov .hreg.hl.szamlalva').html().trim().replace("+", "").replace("−", "-") || ovelem;
    const pat = new RegExp(`[(${xy2XY('x')}${xy2XY('y')})]`);
    const indx = txt.search(pat);
    var eleje = txt.slice(0, indx - 1).replace('·', '');
    if (eleje == "")
        eleje = "1";
    else if (eleje == "-")
        eleje = "-1";
    eleje = "<span class='oveleje'>" + eleje + "</span>";
    const vege = txt.slice(indx);

    document.getElementById("ovjelentesj").innerHTML = eleje + vege;
};

function clearOv() {
    clearInterval(ra);
    ovosszeg = 0;
    $("#shouth .hreg.hl.szamlalva").removeClass("szamlalva");
    $('#shouth table td .ov').remove();
    $("#ovjelentes").removeClass('active');
    $("#ovjelentesj").html("");
    $("#ovjelentesb").html(ovosszeg);
};

function ovAnimate() {
    ovosszeg = 0;
    document.getElementById("ovjelentesb").innerHTML = ovosszeg;
    $('#shouth table td .ov').remove();
    $('#reg10tbl td.hl').removeClass('hl');
    const N = $('#reg10tbl td:not(.matrixzj)').length;
    const t = document.getElementById("animt").value * 1;
    if (N > 0) {
        var i = 0;
        ra = setInterval(() => {
            $('#reg10tbl td:not(.matrixzj):nth(' + i + ')').click();
            i++;
            if (i == N) {
                clearInterval(ra);
            }
        }, t);
    } else
        return;
};

function reg10(str) {
    const m = countLeadingY(str);
    const n = countEndingX(str);
    const u = xy2XY(str.slice(m, str.length - n));
    var sh = [];
    const X = xy2XY('x');
    const Y = xy2XY('y');
    for (var i = 0; i <= m; i++) {
        let y = Y.repeat(i) || "";
        for (var j = 0; j <= n; j++) {
            let x = X.repeat(j) || "";
            let my = Y.repeat(m - i);
            let nx = X.repeat(n - j);
            let yux = my + u + nx;
            let sij = polyShuffle(polyShuffle([
                [Math.pow(-1, i), y]
            ], [
                [1, yux]
            ]), [
                [Math.pow(-1, j), x]
            ]);
            sh = [...sh, ...sij];
        };
    }
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key.replaceAll(",", ""))]);
        };
    });
    return shobj;
};

function polyreg10(strL) {
    if (document.getElementById('xX').checked)
        strL = strL.map(y => [y[0], XY2xy(y[1])]);
    var sh = []
    for (let u of strL)
        sh.push(reg10(u[1]).map(y => [u[0] * y[0], y[1]]));
    sh = _.flatten(sh);
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key.replaceAll(",", ""))]);
        };
    });
    document.getElementById("shouth").innerHTML = JSON.stringify(shobj);
    return shobj;
};

function reg10With(str) {
    //str = XY2xy(str);
    const m = countLeadingY(str);
    const n = countEndingX(str);
    const u = xy2XY(str.slice(m, str.length - n));
    /* if (u.length == 0 && n * m == 0) {
        let fej = "<span style='display:block;background-color:#bfbfbf4f;;margin-bottom:10px;padding-left:5px;'>(B)-ben: u = ( ) " + "&notin;&nbsp;&#x1d525;y;&nbsp;m = " + m + ";&nbsp;n = " + n + "</span>";
        let tbl = "";
        let txt = "Ezen speciális paraméterekkel az implementáció nem működik.";
        shobj = [];
        return [fej, tbl, txt, shobj];
    } */

    var sh = [];
    var sc = 2 * m + 1.2;
    var scx = 2.5;
    if (m == 0)
        scx = 1;
    var tbl = "<table id='reg10tbl' class='table-hideable'><tr><td class='matrixzj' rowspan=" + (m + 1) + "><span style='transform: scaleY(" + sc + ") scaleX(" + scx + ");display: inline-block;'>(</span></td>";
    var tbly = "<table id='regytbl' class='table-hideable'>";
    var tblx = "<table  id='regxtbl' class='table-hideable'>";
    const X = xy2XY('x');
    const Y = xy2XY('y');
    for (var j = 0; j <= n; j++) {
        let x = X.repeat(j) || "";
        var scy = 2 * n + 1.2;
        var scxx = 2.3;
        if (n == 0)
            scx = 1;
        if (j == 0)
            tblx += "<tr><td class='matrixzj' rowspan=" + (n + 1) + "><span style='transform: scaleY(" + scy + ") scaleX(" + scx + ");display: inline-block;'>(</span><td style='font-weight:800;'>1</td><td class='matrixzj' rowspan=" + (n + 1) + "><span style='transform: scaleY(" + scy + ") scaleX(" + scx + ");display: inline-block;'>)</span></td><td rowspan=" + (n + 1) + "><span id='ovjelentes'><span id='ovjelentesb'></span><span class='lepteto' onclick='ovAnimate();' style='display:inline-block;padding:5px 5px 5px 7px;margin:4px 5px 4px 5px;border:1px solid #a1a1a1;border-radius:50%;width:20px;height:20px;text-align: center;vertical-align:baseline;cursor:pointer;font-size:20px;line-height: 20px;user-select: none;box-shadow: 0 0 10px 3px #bdbdbd;'>▶</span><span id='ovjelentesj'></span><span class='ovclose' onclick='clearOv();'>&times;</span></span></td></tr>";
        else
            tblx += "<tr><td>" + xy2XYmonom(x) + "</td></tr>";
    };
    tblx += "</table>";
    var vesszo = ","
    for (var i = 0; i <= m; i++) {
        if (i > 0)
            tbl += "<tr>";
        let y = Y.repeat(i) || "";
        for (var j = 0; j <= n; j++) {
            let x = X.repeat(j) || "";
            let my = Y.repeat(m - i);
            let nx = X.repeat(n - j);
            let yux = my + u + nx;
            let sij = polyShuffle(polyShuffle([
                [Math.pow(-1, i), y]
            ], [
                [1, yux]
            ]), [
                [Math.pow(-1, j), x]
            ]);
            sh = [...sh, ...sij];

            vesszo = "";
            if (m == 0 && j != n)
                vesszo = ","
            let eloj = "";
            if ((i + j) % 2 == 1)
                eloj = "−";
            var ustr = u;
            if (i == m && j == n && u == "")
                ustr = "1";
            tbl += "<td data-reg='" + JSON.stringify(sij) + "' onclick='reg10hl(this);'>" + eloj + "<span class='yux y'>" + xy2XYmonom(my) + "</span><span class='yux u'>" + xy2XYmonom(ustr) + "</span><span class='yux x'>" + xy2XYmonom(nx) + "</span>" + vesszo + "</td>";

            if (j == 0) {
                vesszo = ",";
                if (i == m)
                    vesszo = "";
                if (i == 0)
                    tbly += "<tr><td class='matrixzj'><span style='transform: scaleX(1.2);display: inline-block;'>(</span><td style='font-weight:800;'>1" + vesszo + "</td>";
                else
                    tbly += "<td>" + xy2XYmonom(y) + vesszo + "</td>";
                if (i == m)
                    tbly += "<td class='matrixzj'><span style='transform: scaleX(1.2);display: inline-block;'>)</span></td></tr>";
            }
        };
        if (i == 0)
            tbl += "<td class='matrixzj' rowspan=" + (m + 1) + "><span style='transform: scaleY(" + sc + ") scaleX(" + scxx + ");display: inline-block;'>)</span></td>"
        tbl += "</tr>";
    }
    tbl += "</table>";
    tbly += "</table>";
    tbl = "<div class='reg10tarto'>" + tbly + "<span style='margin:0 3px;'>⧢</span>" + tbl + "<span style='margin:0 3px;'>⧢</span>" + tblx + "</div>";
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    var txt = "";
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key.replaceAll(",", ""))]);
            if (s == 1)
                s = " + ";
            else if (s > 1)
                s = " + " + s + "&middot;"
            else if (s == -1)
                s = " − ";
            else if (s < -1)
                s = " − " + (-1 * s) + "&middot;";
            var xy = key.replaceAll(',', '');
            if (xy2mon)
                xy = " <span class='hreg' data-reg=" + xy + " onclick='regHighlight(this);clearOv();setOvelem(this);'>" + s + xy2monom(xy) + "</span>";
            else
                xy = " <span class='hreg' data-reg=" + xy + " onclick='regHighlight(this);clearOv();setOvelem(this);'>" + s + xy.replaceAll('y', 'y|') + "</span>";
            txt += xy;
        };
    });
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    txt = "<div id='reg10ov'>" + txt + "</div>"
    let fej = "<span style='display:block;background-color:#bfbfbf4f;;margin-bottom:10px;padding-left:5px;'>(B)-ben: u = " + xy2XYmonom(u) + "&in;&nbsp;&#x1d525;y;&nbsp;m = " + m + ";&nbsp;n = " + n + "</span>";
    return [fej, tbl, txt, shobj];
};

function formazS10reg(id, str0) {
    if (id == "")
        var str = str0;
    else
        str = w2xysor(document.getElementById(id).value).toLowerCase();
    const reg = reg10With(str);
    const fej = reg[0];
    const tbl = reg[1];
    const txt = reg[2];
    const kij = "<div id='reg10r'></div>";
    document.getElementById("shouth").innerHTML = fej + tbl + kij + txt;
};

function invreg10With(str) {
    //str = XY2xy(str);
    const m = countLeadingY(str);
    const n = countEndingX(str);
    const u = xy2XY(str.slice(m, str.length - n));
    var sh = [];
    var sc = 2 * m + 1.2;
    var scx = 2.5;
    if (m == 0)
        scx = 1;
    var tbl = "<table id='reg10tbl' class='table-hideable'><tr><td class='matrixzj' rowspan=" + (m + 1) + "><span style='transform: scaleY(" + sc + ") scaleX(" + scx + ");display: inline-block;'>(</span></td>";
    var tbly = "<table id='regytbl' class='table-hideable'>";
    var tblx = "<table  id='regxtbl' class='table-hideable'>";
    const X = xy2XY('x');
    const Y = xy2XY('y');
    for (var j = 0; j <= n; j++) {
        let x = X.repeat(j) || "";
        var scy = 2 * n + 1.2;
        var scxx = 2.3;
        if (n == 0)
            scx = 1;
        if (j == 0)
            tblx += "<tr><td class='matrixzj' rowspan=" + (n + 1) + "><span style='transform: scaleY(" + scy + ") scaleX(" + scx + ");display: inline-block;'>(</span><td style='font-weight:800;'>1</td><td class='matrixzj' rowspan=" + (n + 1) + "><span style='transform: scaleY(" + scy + ") scaleX(" + scx + ");display: inline-block;'>)</span></td><td rowspan=" + (n + 1) + "><span id='ovjelentes'><span id='ovjelentesb'></span><span class='lepteto' onclick='ovAnimate();' style='display:inline-block;padding:5px 5px 5px 7px;margin:4px 5px 4px 5px;border:1px solid #a1a1a1;border-radius:50%;width:20px;height:20px;text-align: center;vertical-align:baseline;cursor:pointer;font-size:20px;line-height: 20px;user-select: none;box-shadow: 0 0 10px 3px #bdbdbd;'>▶</span><span id='ovjelentesj'></span><span class='ovclose' onclick='clearOv();'>&times;</span></span></td></tr>";
        else
            tblx += "<tr><td>" + xy2XYmonom(x) + "</td></tr>";
    };
    tblx += "</table>";
    var vesszo = ","
    for (var i = 0; i <= m; i++) {
        if (i > 0)
            tbl += "<tr>";
        let y = Y.repeat(i) || "";
        for (var j = 0; j <= n; j++) {
            let x = X.repeat(j) || "";
            let my = Y.repeat(m - i);
            let nx = X.repeat(n - j);
            let yux = reg10(my + u + nx);
            let sij = polyShuffle(polyShuffle([
                [1, y]
            ], yux), [
                [1, x]
            ]);
            sh = [...sh, ...sij];

            vesszo = "";
            if (m == 0 && j != n)
                vesszo = ","
            var ustr = u;
            if (i == m && j == n && u == "")
                ustr = "1";
            tbl += "<td data-reg='" + JSON.stringify(sij) + "' onclick='reg10hl(this);'>" + "<span class='yux y'>" + xy2XYmonom(my) + "</span><span class='yux u'>" + xy2XYmonom(ustr) + "</span><span class='yux x'>" + xy2XYmonom(nx) + "</span>" + vesszo + "</td>";

            if (j == 0) {
                vesszo = ",";
                if (i == m)
                    vesszo = "";
                if (i == 0)
                    tbly += "<tr><td class='matrixzj'><span style='transform: scaleX(1.2);display: inline-block;'>(</span><td style='font-weight:800;'>1" + vesszo + "</td>";
                else
                    tbly += "<td>" + xy2XYmonom(y) + vesszo + "</td>";
                if (i == m)
                    tbly += "<td class='matrixzj'><span style='transform: scaleX(1.2);display: inline-block;'>)</span></td></tr>";
            }
        };
        if (i == 0)
            tbl += "<td class='matrixzj' rowspan=" + (m + 1) + "><span style='transform: scaleY(" + sc + ") scaleX(" + scxx + ");display: inline-block;'>)</span></td>"
        tbl += "</tr>";
    }
    tbl += "</table>";
    tbly += "</table>";
    tbl = "<div class='reg10tarto'>" + tbly + "<span style='margin:0 3px;'>⧢</span>" + tbl + "<span style='margin:0 3px;'>⧢</span>" + tblx + "</div>";
    sh = _.groupBy(sh, y => y[1]);
    var shobj = [];
    var txt = "";
    _.forEach(sh, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            shobj.push([s, xy2XY(key.replaceAll(",", ""))]);
            if (s == 1)
                s = " + ";
            else if (s > 1)
                s = " + " + s + "&middot;"
            else if (s == -1)
                s = " − ";
            else if (s < -1)
                s = " − " + (-1 * s) + "&middot;";
            var xy = key.replaceAll(',', '');
            if (xy2mon)
                xy = " <span class='hreg' data-reg=" + xy + " onclick='regHighlight(this);clearOv();setOvelem(this);'>" + s + xy2monom(xy) + "</span>";
            else
                xy = " <span class='hreg' data-reg=" + xy + " onclick='regHighlight(this);clearOv();setOvelem(this);'>" + s + xy.replaceAll('y', 'y|') + "</span>";
            txt += xy;
        };
    });
    if (txt.startsWith("+ "))
        txt = txt.slice(2);
    txt = "<div id='reg10ov'>" + txt + "</div>"
    let fej = "<span style='display:block;background-color:#bfbfbf4f;;margin-bottom:10px;padding-left:5px;'>(B)-ben: u = " + xy2XY(u) + "&in;&nbsp;&#x1d525;y;&nbsp;m = " + m + ";&nbsp;n = " + n + "</span>";
    return [fej, tbl, txt, shobj];
};

function formazinvS10reg(id, str0) {
    const elem = document.getElementById("shouth");
    if (id == "")
        var str = str0;
    else
        str = w2xysor(document.getElementById(id).value).toLowerCase();
    const reg = invreg10With(str);
    const fej = reg[0];
    const tbl = reg[1];
    const txt = reg[2];
    const kij = "<div id='reg10r'></div>";
    elem.innerHTML = fej + tbl + kij + txt;

};

// Admissible kiterjesztes

function Adm(n, k) {
    var out = [];
    if (n > k) {
        comp(n, k);
        out = allcomp.filter(y => y[0] > 1 || y.every(v => v == 1))
    };
    return out;
};

function nonAdm(n, k) {
    comp(n, k);
    return allcomp.filter(y => y[0] == 1);
};


// derivalas h-n

var derivOfX = ["xx"];
var derivOfY = ["xy"];
var dxcoeff = [1];
var dycoeff = [1];
var xy2mon = false;

//       "-2x^7y^3xy^4x^7".replace(/(x\^\d)|(y\^\d)/g,)
function html2string() {
    const elem = document.getElementById("shouth");
    var txt = elem.innerHTML;
    txt = txt.replace(/[·|]/g, "");
    txt = txt.replace(/\<sup\>(\d+)\<\/sup\>/g, "^$1 ");
    elem.innerHTML = txt;
};

function store2string() {
    $('.lastviewer').each(function() {
        var txt = this.innerHTML;
        txt = txt.replace(/[·|]/g, "");
        txt = txt.replace(/\<sup\>(\d+)\<\/sup\>/g, "^$1 ");
        this.innerHTML = txt;
    });
    const elem = document.getElementById("lastprev");
    if (elem) {
        var txt = elem.innerHTML;
        txt = txt.replace(/[·|]/g, "");
        txt = txt.replace(/\<sup\>(\d+)\<\/sup\>/g, "^$1 ");
        elem.innerHTML = txt;
    };
};

function pow2xysor(str) {
    if (str.indexOf("^") < 0)
        return str;
    else {
        const b = str.split("^");
        return b[0].repeat(b[1] * 1);
    }
};

function monom2xysor(str) {
    var e = str.match(/^[\+\-]?\d?/);
    if (e[0] != "")
        str = str.replace(e, "");
    return e + str.match(/(x\^\d)|(y\^\d)/g).map(y => pow2xysor(y)).join('');
}

function xy2monom(str) {
    const pat = new RegExp(`(${xy2XY('x')})+|(${xy2XY('y')})+`, "g");
    const v = str.match(pat);
    //const v = str.match(/(y)+|(x)+/g);
    if (!v)
        return str;
    var txt = "";
    for (let c of v) {
        if (c.length == 1)
            txt += c[0];
        else
            txt += c[0] + "<sup>" + c.length + "</sup>";
    }
    return txt;
};

function formazxyMonom(vL) {
    if (vL.length == 0)
        return "( )";
    var txt = ""
    for (let v of vL) {
        var c = v[0];
        if (c == 1)
            c = " + ";
        else if (c > 0) {
            var cc = Fraction(1 * c).toFraction();
            if (cc != "0")
                c = " + " + cc + "&middot;";
            else
                c = 0;
        } else if (c == -1)
            c = " − ";
        else if (c < 0) {
            var cc = Fraction(-1 * c).toFraction();
            if (cc != "0")
                c = " − " + cc + "&middot;";
            else
                c = 0;
        }
        var xy = v[1];

        if (xy.length == 0)
            c = c.replace("&middot;", "");
        /*  if (c != 0)
             txt += c + xy2monom(xy2XY(xy)); */

        if (c != 0)
            txt += " <span class='hreg' data-reg=" + xy + " data-c='" + v[0] + "' onclick='regHighlight(this);'>" + (c + xy2XYmonom(xy)) + "</span>"

    };
    if (txt.startsWith(" + "))
        txt = txt.slice(3);
    return txt;
};

function set2monom(e) {
    xy2mon = e.checked;
};

function xy2XYmonom(str) {
    if (xy2mon)
        return xy2monom(xy2XY(str));
    else
        return xy2XY(str);
};

function invstr(str) {
    if (str.length == 0)
        return str;
    return _.reverse(str.split('')).join('');
};

function conjstr(str) {
    if (str.length == 0)
        return str;
    var str1 = str.replaceAll("x", "z").replaceAll("y", "x");
    return str1.replaceAll("z", "y");
};

function countX(str) {
    return str.match(/x/g).length;
};

function countY(str) {
    return str.match(/y/g).length;
};

function makexCoeff(str) {
    if (/[^xy]/.test(str)) {
        derivOfX.push(str.replace(/[^xy]/g, ""));
        var nonxy = str.match(/[^xy]/g).join('')
        if (nonxy == "-")
            dxcoeff.push(-1);
        else if (nonxy == "+")
            dxcoeff.push(1);
        else
            dxcoeff.push(nonxy * 1);
    } else {
        derivOfX.push(str);
        dxcoeff.push(1);
    }
};

function makeyCoeff(str) {
    if (/[^xy]/.test(str)) {
        derivOfY.push(str.replace(/[^xy]/g, ""));
        var nonxy = str.match(/[^xy]/g).join('')
        if (nonxy == "-")
            dycoeff.push(-1);
        else if (nonxy == "+")
            dycoeff.push(1);
        else
            dycoeff.push(nonxy * 1);
    } else {
        derivOfY.push(str);
        dycoeff.push(1);
    }
};

function setxyDer(elem, ch) {
    var nstr = elem.value;
    if (nstr.indexOf("^") > -1)
        nstr = nstr.match(/(x(\^\d)?)|(y(\^\d)?)|\+(\d)?|\-(\d)?|^[\+\-]?(\d)?/g).map(y => pow2xysor(y)).join('');
    //nstr = nstr.match(/^[\+\-]?\d?|(x(\^\d)?)|(y(\^\d)?)|\+(\d)?|\-(\d)?/g).map(y => pow2xysor(y)).join(''); régi változat
    var strv = nstr.match(/(\++|\-+)*(\d)*[xy]*/g);
    if (strv[0] != "")
        strv = strv.filter(y => y != "");

    if (ch == "x") {
        derivOfX = [];
        dxcoeff = [];
        for (let str of strv)
            makexCoeff(str);
        console.log(derivOfX, dxcoeff)
    } else {
        derivOfY = [];
        dycoeff = [];
        for (let str of strv)
            makeyCoeff(str);
        console.log(derivOfY, dycoeff)
    }
};

function resetSelectDiff() {
    document.getElementById("selectdiff").value = "none";
};

function setxyFakt(e) {
    const id = e.id;
    if (id == "dw1fakt")
        document.getElementById("dw1fakte").checked = false;
    else if (id == "dw1fakte")
        document.getElementById("dw1fakt").checked = false;
    else if (id == "dw2fakt")
        document.getElementById("dw2fakte").checked = false;
    else if (id == "dw2fakte")
        document.getElementById("dw2fakt").checked = false;
    else if (id == "doutfakt")
        document.getElementById("doutfakte").checked = false;
    else if (id == "doutfakte")
        document.getElementById("doutfakt").checked = false;
};

function strList_Ov(st) {
    st = _.groupBy(st, y => y[1]);
    var stobj = [];
    _.forEach(st, function(val, key) {
        var s = _.sum(val.map(y => y[0]));
        if (s != 0) {
            stobj.push([s, key]);
        };
    });
    return stobj;
};

function wordDer(w, coeff, conj, inv) {
    const n = w.length;
    if (conj)
        w = conjstr(w);
    if (inv)
        w = invstr(w);
    var out = [];
    for (var i = 0; i < n; i++) {
        var xy = w.charAt(i);
        if (xy == "x") {
            for (var j = 0; j < derivOfX.length; j++)
                out.push([coeff * dxcoeff[j], cserelAt(w, i, derivOfX[j])]);
        } else {
            for (var j = 0; j < derivOfY.length; j++)
                out.push([coeff * dycoeff[j], cserelAt(w, i, derivOfY[j])]);
        }
    }
    out = strList_Ov(out);
    if (conj)
        out = out.map(y => [y[0], conjstr(y[1])]);
    if (inv)
        out = out.map(y => [y[0], invstr(y[1])]);
    return out;
};

function derivH(strL, conj, inv) {
    var der = [];
    for (let v of strL) {
        der.push(wordDer(v[1], v[0], conj, inv));
    };
    der = strList_Ov(_.flatten(der));
    return der;
};

function derivHn(str, n, conj, inv) {
    var out = [
        [1, str]
    ];
    if (n > 0 /*&& str.length > 0*/ )
        for (var j = 0; j < n; j++)
            out = derivH(out, conj, inv);
    return out;
};

function derivOutHn(strL, n) {
    var out = strL;
    var fakt = 1;
    if (doutfakt)
        fakt *= factorial(n);
    if (doutfakte)
        fakt *= Math.pow(-1, n) * factorial(n);
    if (n > 0)
        for (var j = 0; j < n; j++)
            out = derivH(out, doutconj, doutinv);
    if (woutcoeff != 1 || fakt != 1)
        out = out.map(y => [Fraction(y[0]).mul(woutcoeff).div(Fraction(fakt)), y[1]]);
    return out;
};

function setAnimKeplet(elem) {
    $('#animtbl td.selected').removeClass('selected');
    $(elem).addClass("selected");
};

function alapAnim() {
    sugorun = true;
    lepessoronkov = 1;
    const nstr = document.getElementById("nofanim").value;
    const n = nstr * 1;
    const w = w2xysor(document.getElementById("wofanim").value);
    const label = $("#animtbl td.selected .animlabel").text().replace(/[\(\)]/g, "");
    const keplet = $("#animtbl td.selected .animkeplet").html().replaceAll("\n", "").replace(/\s\s+/g, "");
    const Nab = label.split(".")
    const N = Nab[0];
    const ab = Nab[1]
    var xy = "x";
    if (N % 2 == 0)
        xy = "y";
    var muvelet = 0;
    var muvstr = "Műveletnek a shuffle-szorzatot állítjuk be.";
    var bomuvstr = "A baloldal művelete az összefűzés, így azon nem kell állítanunk.";
    if (ab == "a") {
        muvelet = 1;
        muvstr = "A művelet maradhat az összefűzés.";
        bomuvstr = "A baloldali művelet shuffle-szorzatára állunk";
    };
    var w1be = w;
    var dw = "1";
    var xynsora = "2";
    var w2be = xy.repeat(n);
    if (N == 2 || N == 3) {
        w1be = xy.repeat(n);
        w2be = w;
        dw = "2";
        xynsora = "1";
    };
    var dwfokid = "dw" + dw + "fok";
    var rare = "-re";
    if ([3, 6, 8].includes(nstr.slice(-1) * 1 + 2))
        rare = "-ra";

    strinit = "A(z) <div style='border:1px solid;margin:5px 0;padding:3px;'>" + keplet + "</div> képletet fogjuk ellenőrizni <i>n</i> = " + n + ", és <i>w</i> = " + w + " paraméterekkel.";

    lepesObj = {
        "1": { "id": "nstore", "txt": "A tár méretét <i>n</i> + 2 = <b>" + (n + 2) + "</b>" + rare + " állítjuk.", "param": n + 2 },
        "2": { "id": "w1", "txt": "A w<sub>1</sub> szónak <b>" + w1be + "</b> értéket adunk", "param": w1be },
        "3": { "id": "w2", "txt": "A w<sub>2</sub> szónak <b>" + w2be + "</b> értéket adunk", "param": w2be },
        "4": {
            "id": {
                "name": "#cshstselecttarto input.jtoggler-radio",
                "indx": (muvelet + 1) % 2,
                "hl": "#cshstselecttarto .jtoggler-control"
            },
            "txt": bomuvstr
        },
        "5": { "id": "setsign", "txt": "A baloldali szorzatnak ellentétes előjelet adunk..." },
        "6": { "id": "storeinbtn", "txt": "..., és bevisszük a tárba." },
        "7": { "id": "setsign", "txt": "Az ellentétes előjel gombot visszaállítjuk pozitívra." },
        "8": {
            "id": {
                "name": "#cshstselecttarto input.jtoggler-radio",
                "indx": muvelet,
                "hl": "#cshstselecttarto .jtoggler-control"
            },
            "txt": muvstr
        },
        "9": {
            "id": {
                "name": "#setwform",
                "indx": 0,
                "hl": "table#regtbl.table-hideable tbody tr td.hide-column0",
            },
            "txt": "A kimenet képleteit <b>xxyy...</b> formára állítjuk és a táblázat első oszlopát bezárjuk."
        },
    };

    if (N == 1)
        lepesObj["10"] = { "id": "", "txt": "Mivel a képletben a &part; derivált szerepel, ezért w<sub>" + dw + "</sub> sorában a &part;<sub>&lowast;</sub> konjugált és a &part;_ inverz transzformáltak maradhatnak üresen." };
    else if (N == 2)
        lepesObj["10"] = {
            "id": {
                "name": "#dw" + dw + "conj,#dw" + dw + "inv",
                "indx": "all",
            },
            "txt": "Mivel a képletben a &part;<sub>&dagger;</sub> duális derivált szerepel, ezért w<sub>" + dw + "</sub> sorában ki kell pipálnunk a derivált &part;<sub>&lowast;</sub> konjugáltát és a derivált &part;_ inverzét is."
        };
    else if (N == 3)
        lepesObj["10"] = { "id": "dw" + dw + "inv", "txt": "Mivel a képletben a &part;_ inverz derivált szerepel, ezért w<sub>" + dw + "</sub> sorában ki kell pipálnunk a derivált &part;_ inverz transzfolmátját." };
    else if (N == 4)
        lepesObj["10"] = { "id": "dw" + dw + "conj", "txt": "Mivel a képletben a &part;<sub>&lowast;</sub>  konjugált derivált szerepel, ezért w<sub>" + dw + "</sub> sorában ki kell pipálnunk a derivált &part;<sub>&lowast;</sub> konjugált transzfolmátját." };
    if (ab == "a")
        lepesObj["11"] = { "id": "dw" + dw + "fakt", "txt": "A deriváltakat  a fokszámuk faktoriálisával osztva számítjuk." };
    else
        lepesObj["11"] = { "id": "dw" + dw + "fakte", "txt": "A deriváltakat  a fokszámuknak megfelelő előjellel és annak faktoriálisával osztva számítjuk." },
        " + dw + "

    lepesObj["12"] = { "id": "storeinbtn", "txt": "A jobboldali összeg k = 0-hoz tartozó tagját bevisszük a tárba." };
    lepesObj["13"] = { "id": "regtbl.table-hideable tbody tr td.hide-column0", "txt": "A táblázat első oszlopát kinyitjuk." };

    for (var i = 0; i < n; i++) {
        var w2cs = xy.repeat(n - 1 - i);
        lepesObj[(14 + 3 * i).toString()] = { "id": "w" + xynsora, "txt": "A w<sub>" + xynsora + "</sub> szónak <b>" + (w2cs || "üres") + "</b> értéket adunk", "param": w2cs };
        lepesObj[(15 + 3 * i).toString()] = { "id": dwfokid, "txt": "A derivált fokát <b>" + (i + 1) + "</b>-re növeljük.", "param": (i + 1).toString() };
        lepesObj[(16 + 3 * i).toString()] = { "id": "storeinbtn", "txt": "A kimenetet bevisszük a tárba" };
    };

    lepesObj[(14 + 3 * n).toString()] = { "id": "storetglbtn", "txt": "Megnyitjuk a tárat" };
    lepesObj[(15 + 3 * n).toString()] = {
        "id": "lastprev",
        "txt": "Megnézzük a tagok összegét.",
        "inline": "start"
    };
    lepesObj[(16 + 3 * n).toString()] = { "id": "storetglbtn", "txt": "Bezárjuk a tárat" };


    $('body,body input:not([type="text"]),body .sbtglbtn,body input[type="text"].forderiv').css({
        'pointer-events': 'none',
        'filter': 'contrast(70%)',
    });
    $('#buttonb').addClass('showndown');
    sugolepes = Object.keys(lepesObj).length;
    document.getElementById("blepesall").innerHTML = " / " + sugolepes;
    $("#blepeskijelzo").html("0");
    resetLap();
    initLepes();
};
