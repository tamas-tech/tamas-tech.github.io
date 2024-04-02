var lastlist = [];
var numrows = 2;
var opt_sotet = false;
var opt_wrap = false;
var opt_wrapltx = false;

setTimeout(() => {
    if (!onlineSt)
        alert('You are offline! For the correct operate of calculator you need to be online.');
}, 1000);


function setCmFont(v) {
    cmeditor.getWrapperElement().style["font-size"] = v + "px";
    cmeditor.refresh();
};

function setOutputFont(v) {
    $('div.sagecell_sessionOutput,div.sagecell_sessionOutput pre').css('font-size', v + 'px');
};

function setLtxFont(v) {
    $('div#output').css('font-size', v + 'px');
};

function setCmTheme(theme) {
    cmeditor.setOption("theme", theme);
}
var beilleszt = function(x, n) {
    var btntxt = x.getAttribute('data-btn');
    insertText(btntxt, n);
};

var insertText = (text, n) => {
    var last = cmeditor.getSelection();
    if (last.length > 0) {
        cmeditor.replaceSelection(text);
        if (n > 0) {
            var back = 1;
            if (n > 1)
                back = n + 1;
            var pos = cmeditor.getCursor();
            cmeditor.setCursor({
                line: pos.line,
                ch: pos.ch - back
            });
            cmeditor.setSelection({
                line: pos.line,
                ch: pos.ch - back - 1
            }, {
                line: pos.line,
                ch: pos.ch - back
            });
            cmeditor.replaceSelection(last);
            var pos1 = cmeditor.getCursor();
            cmeditor.setCursor({
                line: pos1.line,
                ch: pos1.ch - last.length
            });
            cmeditor.setSelection({
                line: pos1.line,
                ch: pos1.ch - last.length
            }, {
                line: pos1.line,
                ch: pos1.ch + back - 1
            });
        }
    } else {
        cmeditor.replaceSelection(text);
        if (n > 0) {
            var back = 1;
            if (n > 1)
                back = n + 1
            cmeditor.execCommand('goCharLeft')
            var pos = cmeditor.getCursor();
            cmeditor.setSelection({
                line: pos.line,
                ch: pos.ch - back
            }, pos);
        }
    }
    cmeditor.focus();
};

var undocm = () => {
    cmeditor.execCommand('undo');
    cmeditor.focus();
};

var redocm = () => {
    cmeditor.execCommand('redo');
    cmeditor.focus();
};

var homecm = () => {
    cmeditor.execCommand('goLineStart');
    cmeditor.focus();
};

var endcm = () => {
    cmeditor.execCommand('goLineEnd');
    cmeditor.focus();
};

var tabcm = () => {
    cmeditor.execCommand('insertTab');
    cmeditor.focus();
};

var torolTextLeft = () => {
    cmeditor.execCommand('delCharBefore');
    cmeditor.focus();
};

var moveLeft = () => {
    cmeditor.execCommand('goCharLeft');
    cmeditor.focus();
};

var moveRight = () => {
    cmeditor.execCommand('goCharRight');
    cmeditor.focus();
};

var torol = function() {
    cmeditor.setValue('');
    cmeditor.focus();
};

var clearOutput = function() {
    var outputs = document.querySelector('div.sagecell_sessionOutput *:not(img.sagecell_spinner)');
    if (outputs)
        outputs.remove();
    output.innerHTML = "";
};

var printLatex = function() {
    if (/latex\(/.test(cmeditor.getValue())) {
        var outputtxt = document.querySelector('div.sagecell_sessionOutput *:not(img.sagecell_spinner)');
        if (outputtxt) {
            output.innerHTML = "\\[ " + outputtxt.innerText.replace(/\\log/g, '\\ln') + " \\]";
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'output']);
        } else {
            output.innerText = "There is no output";
        }
    } else {
        output.innerHTML = "The sagecell output is not a valid Latex code.";
    }
};

function themeSwitch() {
    var t1 = document.getElementById('stylelight');
    var t2 = document.getElementById('styledark');
    t1.disabled = !t1.disabled;
    t2.disabled = !t1.disabled;
};

function sbTgl() {
    $('#settingbar').toggle(300);
};

function sampleTgl() {
    $('#sample-container').toggle(300);
    $('.btn-open').toggleClass('shown');
    var btn = $('.sample-open');
    var txt = btn.text();
    if (txt == 'Show samples') {
        btn.text('Hide samples')
        setTimeout(() => {
            document.querySelector('#samples').scrollIntoView({
                behavior: "smooth",
                block: 'end'
            });
        }, 300)
    } else
        btn.text('Show samples')
};

function megnyitfn(x) {
    $('.fnbtn.kbdbtn.active').removeClass('active');
    $(x).addClass('active');
    var fncel = x.getAttribute('data-btn');
    $('.myslick.fn.show,#lastused.show').removeClass('show');
    var elem = $('.myslick.fn[data-name=' + fncel + ']')
    elem.addClass('show');
    elem.slick('setPosition')
};

function megnyitLast(x) {
    $('.fnbtn.kbdbtn.active').removeClass('active');
    $(x).addClass('active');
    var fncel = x.getAttribute('data-btn');
    $('.myslick.fn.show').removeClass('show');
    var elem = $('#lastused')
    elem.addClass('show');
};

function clearRecent() {
    lastlist = [];
    $('#lastused .kbdbtn').remove();
};

$(document).ready(function() {
    cmeditor = document.querySelector(".CodeMirror").CodeMirror;
    $('#cm-select').val('default');

    document.getElementById('optsotet').checked = opt_sotet;

    $('#optsotet').attr('checked', opt_sotet);

    document.getElementById('optsotet').onchange = function() {
        opt_sotet = this.checked;
        themeSwitch();
    };

    document.getElementById('fntglbtn').onchange = function() {
        $('#tabcontainer').toggle(300);
    };

    document.getElementById('btglbtn').onchange = function() {
        $('#tabcontainer1').toggle(300);
    };


    //$('.sagecell_input').append('<button id="ltxbtn" class="otherbtn" onclick="printLatex();" title="Conver sagecell output to rendered Latex output if possible">Latex</button><input id="outfont-slider" oninput="setOutputFont(this.value);" type="range" min="12" max="24" value="12" style="display:inline-block;width:120px;vertical-align: middle;margin-left:10px;" title="set output\'s fontsize">')
    $('.sagecell_input').append('<label class="switch"><input id="optwrap" type="checkbox"><span class="slider round"></span></label><input id="outfont-slider" oninput="setOutputFont(this.value);" type="range" min="12" max="24" value="12" style="display:inline-block;width:120px;vertical-align: middle;margin-left:10px;" title="set output\'s fontsize">')
    $(document).on('click', '.myslick.fn .kbdbtn', function() {
        var elem = $(this)
        var name = elem.attr('data-btn')
        if (lastlist.indexOf(name) < 0) {
            console.log(name)
            lastlist.push(name)
            Clone = elem.clone(true);
            $(lastelem).append(Clone);
        };
    });

    document.getElementById('optwrap').onchange = function() {
        opt_wrap = this.checked;
        wrapSwitch();
    };

    $('#optwrap')[0].checked = opt_wrap;

    document.getElementById('optwrapltx').onchange = function() {
        opt_wrapltx = this.checked;
        wrapSwitchLtx();
    };

    $('#optwrapltx')[0].checked = opt_wrapltx;

    $('.rown').on('change', function() {
        numrows = $(this).val() * 1;
        afterResize();
    });
    var lastelem = document.getElementById('lastused');

    $('li.veg a').on('click', function(e) {
        e.preventDefault();
        $('#samples').attr('src', $(this).attr('data-src'))
    })

    document.querySelector('.sagecell_evalButton').onclick = function() {
        try {
            var w = document.getElementById('optwrap')
            document.getElementById('outfont-slider').value = 12;
            if (w && w.checked) {
                /*  w.checked = false;
                 opt_wrap = false; */
                w.click();
            }
        } catch {
            console.log('NEM SIKERÜLT')
        }
    }
});


function debounce(func) {
    var timer;
    return function(event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
};

window.addEventListener("resize", debounce(function(e) {
    afterResize();
}));

function afterResize() {
    $('.myslick').slick('unslick');
    var ww = $('#tabs').width();
    var btnNo = Math.floor(ww / 66);
    var btnw = Math.floor(ww / btnNo) - 1;
    console.log(btnw);
    $('.myslick').slick({
        //dots: true,
        mobileFirst: true,
        //adaptiveHeight: true,
        rows: numrows,
        slidesPerRow: btnNo,
    });

    $('.kbdbtn').css({
        'max-width': btnw - 16,
        'width': btnw - 16
    });
};


if (window.addEventListener) {
    window.addEventListener("message", displayMessage, false);
} else {
    window.attachEvent("onmessage", displayMessage);
}

function displayMessage(evt) {
    var message;
    message = evt.data;
    cmeditor.setValue(message);
    document.querySelector('.CodeMirror').scrollIntoView({
        behavior: "smooth",
        block: 'center'
    });
    cmeditor.execCommand('selectAll');
};

function wrapSwitch() {
    if (opt_wrap) {
        $('div.sagecell_sessionOutput pre').css({
            overflow: 'auto',
            'white-space': 'pre-wrap'
        })
    } else
        $('div.sagecell_sessionOutput pre').css({
            'white-space': 'nowrap',
            'word-wrap': 'wrap none'
        })
};

function wrapSwitchLtx() {
    if (opt_wrapltx) {
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [
                    ["$", "$"],
                    ["\\(", "\\)"]
                ]
            },
            "HTML-CSS": {
                linebreaks: { automatic: true, width: "container" }
            }
        });
    } else
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [
                    ["$", "$"],
                    ["\\(", "\\)"]
                ]
            },
            "HTML-CSS": {
                linebreaks: { automatic: false, width: "container" }
            }
        });
    printLatex();
};

//zeynep

$(function() {

    var zeynep = $('.zeynep').zeynep({
        opened: function() {
            document.querySelector('#sample-cc').scrollIntoView({
                block: 'start'
            });
            setTimeout(() => {
                $('#samples').addClass('shrinked');
            }, 100)
        }
    })

    // dynamically bind 'closing' event
    zeynep.on('closing', function() {
        $('#samples').removeClass('shrinked');
    })

    // handle zeynepjs overlay click
    $('.zeynep-overlay').on('click', function() {
        zeynep.close()
    })

    // open zeynepjs side menu
    $('.btn-open').on('click', function() {
        zeynep.open()
    })

})
