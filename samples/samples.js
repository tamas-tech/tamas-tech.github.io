var opt_wrap = false;
var opt_pre = false;

function kuldes(elem) {
    var message = elem.nextElementSibling.innerText
    if (m !== undefined)
        message = message.replace('m_val', m);
    if (n !== undefined)
        message = message.replace('n_val', n);
    window.parent.postMessage(message, '*');
};

function setOutputFont(v) {
    $('div.sagecell_sessionOutput,div.sagecell_sessionOutput pre').css('font-size', v + 'px');
};

function wrapSwitch() {
    if (opt_wrap) {
        $('div.sagecell_sessionOutput pre').css({
            overflow: 'auto',
            'white-space': 'pre-wrap'
        })
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
    } else {
        $('div.sagecell_sessionOutput pre').css({
            'white-space': 'nowrap',
            'word-wrap': 'wrap none'
        })

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
    }
};

function preSwitch() {
    if (opt_pre) {
        $("#precover").css("display", "block");
    } else {
        $("#precover").css("display", "");
    }
};

// interactive mathJax

function parseIntPlus(st) {
    // "-4" -> -4, "+5" -> 5
    var str = st;
    if (str.charAt(0) == "+") {
        str = str.substr(1);
    }
    if (str.charAt(0) == "−") {
        str = "-" + str.substr(1);
    }
    var value = parseInt(str);
    return (value);
}

function addEvents() {

    var elems = document.getElementsByClassName("dynamic"),
        newInput;

    for (var i = 0; i < elems.length; i++) {
        var el = elems[i];
        el.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer';
            this.style.backgroundColor = "#F6CEF5";
        }, false);
        el.addEventListener('mouseout', function() {
            this.style.cursor = 'auto';
            this.style.backgroundColor = "#FFFFFF";
        }, false);
    }


    for (var i = 0; i < elems.length; i++) {
        var el = elems[i];
        el.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var inputs = this.getElementsByTagName("input");
            if (inputs.length > 0) return;
            if (!newInput) {
                newInput = document.createElement("input");
                newInput.type = "number";
                //  newInput.maxLength = 2;
                newInput.setAttribute("size", 1);
                newInput.style.fontSize = "18px";
                newInput.style.color = "red";
                newInput.style.width = "50px";
                newInput.addEventListener("blur", function() {

                    newInput.value = newInput.value.replace("-", "−");
                    newInput.parentNode.innerHTML = newInput.value;

                    if (m !== undefined)
                        m = parseIntPlus(document.getElementById("m").innerText);
                    if (n !== undefined)
                        n = parseIntPlus(document.getElementById("n").innerText);

                    document.getElementById("myDiv").innerHTML = formulaCodeGeneric(m, n);
                    if (m !== undefined)
                        document.getElementById("inp_m").value = m;
                    if (n !== undefined)
                        document.getElementById("inp_n").value = n;

                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("myDiv")], function() {
                        addEvents();
                    });

                }, false)
            }
            newInput.value = this.innerText;
            this.innerHTML = "";
            this.appendChild(newInput);
            newInput.focus();
            newInput.select()
        }.bind(el), false);
    };
}

function updInt(m, n) {
    document.getElementById("myDiv").innerHTML = formulaCodeGeneric(m, n);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("myDiv")], function() {
        addEvents();
    });
}

$(document).ready(function() {
    if (m !== undefined)
        m = document.getElementById("inp_m").value;
    if (n !== undefined)
        n = document.getElementById("inp_n").value;
    document.getElementById("myDiv").innerHTML = formulaCodeGeneric(m, n);
    MathJax.Hub.Queue(function() {
        addEvents();
    });

    document.getElementById('optwrap').onchange = function() {
        opt_wrap = this.checked;
        wrapSwitch();
    };

    $('#optwrap')[0].checked = opt_wrap;
    MathJax.Hub.Config({
        "fast-preview": { disabled: true },
        tex2jax: { preview: "none" }
    });

    $('#outfont-slider').val(16)
    setOutputFont($('#outfont-slider').val());

    document.getElementById('showpre').onchange = function() {
        opt_pre = this.checked;
        preSwitch();
    };
    if (m !== undefined)
        document.getElementById('inp_m').onchange = function() {
            m = this.value;
            if (n !== undefined)
                n = document.getElementById('inp_n').value;
            updInt(m, n)
        };

    if (n !== undefined)
        document.getElementById('inp_n').onchange = function() {
            if (m !== undefined)
                m = document.getElementById('inp_m').value;
            n = this.value;
            updInt(m, n)
        };

    document.getElementById("okbtn").onclick = function() {
        var txt = document.getElementById('code').innerText;
        if (m !== undefined)
            var m_v = document.getElementById('inp_m').value;
        if (n !== undefined)
            var n_v = document.getElementById('inp_n').value;
        txt = txt.replace('m_val', m_v).replace('n_val', n_v);
        $('textarea.sagecell_commands').val(txt);
        $('button.sagecell_evalButton').click();
        setOutputFont($('#outfont-slider').val());
    }
});
