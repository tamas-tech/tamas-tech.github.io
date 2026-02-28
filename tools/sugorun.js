var fnpsugorun = false;

function fnploadjs(file) {
    var cim = file.split("/");
    var l = cim.length;
    cim = cim[l - 1];
    console.log(cim);
    sugorun = true;
    setTimeout(() => {
        fnploadjsOK(file);
        console.log("sugorun:" + sugorun);
        $('body,body input:not([type="text"]),body .sbtglbtn,body input[type="text"].forderiv').css({
            'pointer-events': 'none',
            'filter': 'contrast(70%)',
        });
        $('#buttonb').addClass('showndown');
    }, 100);
};

function fnploadjsOK(file) {
    var script0 = document.getElementById("fnpsugos");
    if (script0 !== undefined)
        script0.remove();
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = file;
    script.id = "fnpsugos";
    document.body.appendChild(script);
    console.log(script)
    resetNoForm();
    initLepes();
};

function sugoStop() {
    console.log("most megállít")
    lepessoronkov = 1;
    $('body,body input:not([type="text"]),body .sbtglbtn,body input[type="text"].forderiv').css({
        'pointer-events': '',
        'filter': 'none',
    });
    const elem = document.getElementById("floatkijelzo");
    elem.style.display = "none";
    elem.innerHTML = "";
    $('#buttonb').removeClass('showndown');
    $("#blepeskijelzo").html("");
};

function str2float(str) {
    const elem = document.getElementById("floatkijelzo");
    elem.style.display = "block";
    elem.innerHTML = str;
};

function elemClick(id, time, inline) {
    const villog = document.getElementsByClassName("clicked").item(0);
    if (villog != undefined)
        villog.classList.remove("clicked");
    var elem = undefined;
    if (typeof id == "string") {
        id = "#" + id;
        elem = document.querySelector(id);
    } else if (typeof id == "object") {
        const name = id["name"];
        const indx = id["indx"];
        if (indx == "all") {
            elem = document.querySelectorAll(name).forEach(function(elem) {
                elem.classList.add("clicked");
                elem.scrollIntoView({ behavior: "smooth", block: "center", inline: inline });
                setTimeout(() => { elem.click(); }, time - 500);
                setTimeout(() => { elem.classList.remove("clicked") }, time);
            });
            return;
        } else
            elem = document.querySelectorAll(name)[indx];
    }
    if (id["hl"] == undefined) {
        elem.classList.add("clicked");
        elem.scrollIntoView({ behavior: "smooth", block: "center", inline: inline });
        setTimeout(() => { elem.click(); }, time - 500);
        setTimeout(() => { elem.classList.remove("clicked") }, time);
    } else if (id["hl"] != undefined) {
        const elemhl = document.querySelector(id["hl"]);
        elemhl.classList.add("clicked");
        elemhl.scrollIntoView({ behavior: "smooth", block: "center", inline: inline });
        setTimeout(() => { elem.click(); }, time - 500);
        setTimeout(() => { elemhl.classList.remove("clicked") }, time);
    }
};

function elemBeir(id, str) {
    $("#" + id).val(str).trigger("change")
    $("#w1coeff").trigger('change');
};

function initLepes() {
    setTimeout(() => { str2float(strinit); }, 200);
};

function sugotLeptet() {
    const T = root.style.getPropertyValue('--anim-time').replace("s", "") * 2000;
    if (lepessoronkov <= sugolepes) {
        $("#blepeskijelzo").html(lepessoronkov);
        const lepes = lepesObj[lepessoronkov];
        const id = lepes["id"];
        const txt = lepes["txt"];
        const param = lepes["param"];
        var inline = lepes["inline"];
        if (inline == undefined)
            inline = "center";
        str2float(txt);
        lepessoronkov++;
        if (id != "") {
            elemClick(id, T, inline);
            if (param != undefined)
                setTimeout(() => { elemBeir(id, param) }, T * 0.75);
        };
    } else
        sugoStop();
};
