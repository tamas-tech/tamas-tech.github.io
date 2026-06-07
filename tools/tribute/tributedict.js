var wordComp = false;

const tribnyil = '<span class="tribnyil">&#x25B6;</span>';

function tribcmd(txt) {
    return '<span class="tribcmd">' + txt + '</span>';
};

function tribkeret(txt) {
    return '<span class="tribkeret">' + txt + '</span>';
};

function tribtext(txt, cls) {
    if (cls == undefined)
        cls = "";
    return '<span class="tribtext' + cls + '">' + txt + '</span>';
};

var tribcollection = { 'base_tribute': 0, 'forms': 1, 'nerds': 2 };
var collToShow = -1;

const base_tribute = [{ //gyujto
    for: "f@",
    tag: tribcmd("f@") + tribnyil + tribtext('(Formázás)', " r"),
    indx: 1
}, {
    for: "n@",
    tag: tribcmd("n@") + tribnyil + tribtext('(Nerdamer)', " r"),
    indx: 2
}, {
    for: "l@",
    tag: tribcmd("l@") + tribnyil + tribtext('(Latex)', " r"),
    indx: 7
}, {
    for: "h@",
    tag: tribcmd("h@") + tribnyil + tribtext('(HTML)', " r"),
    indx: 8
}, {
    for: "x@",
    tag: tribcmd("x@") + tribnyil + tribtext('(n&times;m)', " r"),
    indx: 6
}];

const form = [{
    tag: tribcmd('&#x27E8;&#x27E8;  &#x27E9;&#x27E9;') + tribtext("(Kiértékelés)", " r"),
    value: '<< {c} >>'
}, {
    tag: tribcmd('$ $') + tribtext("(inline math)", " r"),
    value: '$ {c} $'
}, {
    tag: tribcmd('$$ $$') + tribtext("(display math)", " r"),
    value: '$$ {c} $$'
}, {
    tag: tribcmd('§ §') + tribtext("(definíció)", " r"),
    value: '§ {c} §'
}, {
    tag: tribcmd('§§ §§') + tribtext("(Definíció)", " r"),
    value: '§§ {c} §§'
}];

const nerd = [{ //gyujto
    for: "m@",
    tag: tribcmd("m@") + tribnyil + tribtext('(Mátrix)', " r"),
    indx: 3
}, {
    for: "v@",
    tag: tribcmd("v@") + tribnyil + tribtext('(Vektor)', " r"),
    indx: 4
}, {
    for: "a@",
    tag: tribcmd("a@") + tribnyil + tribtext('(Aritmetikai fgv)', " r"),
    indx: 5
}];

const nerd_m = [{
    tag: tribcmd('matrix([,],[,]) ') + tribtext("(Mátrix)", " r"),
    value: 'matrix([{c},],[,])'
}, {
    tag: tribcmd('imatrix(n) ') + tribtext("(Egységmátrix)", " r"),
    value: 'imatrix({c})'
}, {
    tag: tribcmd('invert(A) ') + tribtext("(Inverz)", " r"),
    value: 'invert({c})'
}, {
    tag: tribcmd('transpose(A) ') + tribtext("(Transzponált)", " r"),
    value: 'transpose({c})'
}, {
    tag: tribcmd('determinant(A) ') + tribtext("(Determináns)", " r"),
    value: 'determinant({c})'
}, {
    tag: tribcmd('matgetrow(A, i) ') + tribtext("i-edik sor", " r"),
    value: 'matgetrow({c},i)'
}, {
    tag: tribcmd('matgetcol(A,j)') + tribtext("j-edik oszlop", " r"),
    value: 'matgetcol({c},j)'
}];

const nerd_v = [{
    tag: tribcmd('vector([, , ]') + tribtext("(Vektor)", " r"),
    value: 'vector({c},,)'
}, {
    tag: tribcmd('vecget(v,i)') + tribtext("i-edik elem", " r"),
    value: 'vecget({c},i)'
}, {
    tag: tribcmd('vecset(v,i)') + tribtext("i-edik elem", " r"),
    value: 'vecset({c},i)'
}, {
    tag: tribcmd('cross(<b>a</b>,<b>b</b>)') + tribtext("<b>a</b>&times;<b>b</b>", " r"),
    value: 'cross({c},)'
}];

const nerd_a = [{
    tag: tribcmd('pent(n)') + tribtext("&delta;<sub>5</sub>(n)", " r"),
    value: 'pent({c})'
}, {
    tag: tribcmd('sigma(n)') + tribtext("&sigma;(n)", " r"),
    value: 'sigma({c})'
}];

const nmMat = [{
    tag: '3 &times 2',
    value: 'matrix([{c},], [,], [,])'
}, {
    tag: '3 &times 3',
    value: 'matrix([{c},,], [,,], [,,])'
}, {
    tag: '3 &times 4',
    value: 'matrix([{c},,,], [,,,], [,,,])'
}, {
    tag: '4 &times 2',
    value: 'matrix([{c},], [,], [,], [,])'
}, {
    tag: '4 &times 3',
    value: 'matrix([{c},,], [,,], [,,], [,,])'
}, {
    tag: '4 &times 4',
    value: 'matrix([{c},,,], [,,,], [,,,], [,,,])'
}];

const latex = [{
    tag: tribcmd('\\frac{a}{b}') + tribtext("Tört", " r"),
    value: '\\frac{{c}}{}'
}, {
    tag: tribcmd('\\sqrt{n}') + tribtext("Gyök", " r"),
    value: '\\sqrt{{c}}'
}];

const html = [{
    tag: tribcmd('div') + tribtext("div elem", " r"),
    value: '<div>{c}</div>'
}, {
    tag: tribcmd('p') + tribtext("p elem", " r"),
    value: '<p>{c}</p>'
}, {
    tag: tribcmd('h1') + tribtext("Cím1", " r"),
    value: '<h1>{c}</h1>'
}, {
    tag: tribcmd('h2') + tribtext("Cím2", " r"),
    value: '<h2>{c}</h2>'
}, {
    tag: tribcmd('h3') + tribtext("Cím3", " r"),
    value: '<h3>{c}</h3>'
}, {
    tag: tribcmd('h4') + tribtext("Cím4", " r"),
    value: '<h4>{c}</h4>'
}];

///////////////////////////////////////////////////////////////////
const textar = document.getElementById("pentcinput");
const tribcontainer = document.getElementById("usersorc");

var mathTribute = new Tribute({
    collection: []
})

function createMathTribute() {
    mathTribute = new Tribute({
        collection: [{
            trigger: ' @',
            keepLetters: true,
            values: base_tribute,
            lookup: "for",
            replaceTextSuffix: '',
            menuContainer: tribcontainer,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = item.original.indx;
                return "";
            }
        }, {
            trigger: 'f@',
            keepLetters: true,
            lookup: "value",
            menuContainer: tribcontainer,
            values: form,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = -1;
                return item.original.value;
            }
        }, {
            trigger: 'n@',
            keepLetters: true,
            values: nerd,
            lookup: "for",
            menuContainer: tribcontainer,
            replaceTextSuffix: '',
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = item.original.indx;
                return "";
            }
        }, {
            trigger: 'm@',
            keepLetters: true,
            lookup: "value",
            values: nerd_m,
            menuContainer: tribcontainer,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = -1;
                return item.original.value;
            }
        }, {
            trigger: 'v@',
            keepLetters: true,
            lookup: "value",
            values: nerd_v,
            menuContainer: tribcontainer,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = -1;
                return item.original.value;
            }
        }, {
            trigger: 'a@',
            keepLetters: true,
            lookup: "value",
            values: nerd_a,
            menuContainer: tribcontainer,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = -1;
                return item.original.value;
            }

        }, {
            trigger: 'x@',
            keepLetters: true,
            lookup: "value",
            values: nmMat,
            menuContainer: tribcontainer,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = -1;
                return item.original.value;
            }
        }, {
            trigger: 'l@',
            keepLetters: true,
            lookup: "value",
            values: latex,
            menuContainer: tribcontainer,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = -1;
                return item.original.value;
            }
        }, {
            trigger: 'h@',
            keepLetters: true,
            replaceTextSuffix: null,
            lookup: "value",
            values: html,
            menuContainer: tribcontainer,
            menuItemTemplate: function(item) {
                return item.original.tag;
            },
            selectTemplate: function(item) {
                collToShow = -1;
                return item.original.value;
            }
        }]
    });
};

//////////////

/* const autodict = [
    { key: "f", tag: tribcmd("f@") + tribnyil + tribtext('(Formázás)', " r"), value: "f", indx: 1 },
    { key: "n", tag: tribcmd("n@") + tribnyil + tribtext('(Nerdamer)', " r"), value: "n", indx: 2 },
    { key: "m", tag: tribcmd("m@") + tribnyil + tribtext('(Mátrix)', " r"), value: "m", indx: 3 },
    { key: "v", tag: tribcmd("v@") + tribnyil + tribtext('(Vektor)', " r"), value: "v", indx: 4 },
    { key: "a", tag: tribcmd("a@") + tribnyil + tribtext('(Aritmetikai fgv)', " r"), value: "a", indx: 5 },
    { key: "x", tag: tribcmd("x@") + tribnyil + tribtext('(n&times;m)', " r"), value: "x", indx: 6 },
    { key: "l", tag: tribcmd("l@") + tribnyil + tribtext('(Latex)', " r"), value: "l", indx: 7 },
    { key: "h", tag: tribcmd("h@") + tribnyil + tribtext('(HTML)', " r"), value: "h", indx: 8 },
];
var autoTribute = new Tribute({
    autocompleteMode: true,
    noMatchTemplate: '',
    keepLetters: true,
    menuContainer: tribcontainer,
    requireLeadingSpace: false,
    values: autodict,
    selectTemplate: function(item) {
        collToShow = item.original.indx;
        if (collToShow > -1) {
            return "";
        } else
            return item.original.value + '@';
    },
    menuItemTemplate: function(item) {
        return item.original.tag;
    }
}); */
///////////////

const autodictC = [
    { key: "maátrix", value: "matrix([{c},],[,])", tag: "matrix" },
    { key: "matrix23", value: "matrix([{c},], [,], [,]))", tag: "matrix 3&times;2" },
    { key: "matrix33", value: "matrix([{c},,], [,,], [,,])", tag: "matrix 3&times;3" },
    { key: "matrix34", value: "matrix([{c},,,], [,,,], [,,,])", tag: "matrix 3&times;4" },
    { key: "matrix42", value: "matrix([{c},], [,], [,], [,])", tag: "matrix 4&times;2" },
    { key: "matrix43", value: "matrix([{c},,], [,,], [,,], [,,])", tag: "matrix 4&times;3" },
    { key: "matrix44", value: "matrix([{c},,,], [,,,], [,,,], [,,,])", tag: "matrix 4&times;4" },
    { key: "imatrix egségmátrix", value: "imatrix({c})", tag: "imatrix" },
];

var autoTributeC = new Tribute({ collection: [] });

function createAutoTribute() {
    autoTributeC = new Tribute({
        autocompleteMode: true,
        noMatchTemplate: '',
        keepLetters: true,
        lookup: "key",
        requireLeadingSpace: false,
        menuContainer: tribcontainer,
        values: autodictC,
        menuItemTemplate: function(item) {
            return item.original.tag;
        }
    });
}

textar.addEventListener('tribute-replaced', function(e) {
    const input = e.target;
    const text = input.value;
    // Find where our cursor marker landed
    const marker = '{c}';
    const markerIndex = text.indexOf(marker);
    // If the marker exists, replace it and move the cursor
    if (markerIndex !== -1) {
        // Remove the marker text from the input
        input.value = text.replace(marker, '');
        // Set the cursor exactly where the marker used to be
        setTimeout(() => {
            input.setSelectionRange(markerIndex, markerIndex);
            input.focus();
        }, 0);
    } else if (!wordComp && collToShow > -1) {
        console.log("collToShow", collToShow)
            // input.selectionStart = input.selectionEnd = input.selectionStart - 1;
        setTimeout(() => {
            mathTribute.showMenuForCollection(textar, collToShow);
        }, 10)
    }
});

function setTribute() {
    autoTributeC.detach(textar);
    mathTribute.detach(textar);
    //autoTribute.detach(textar);
    if (!wordComp) {
        createMathTribute();
        //console.log(mathTribute)
        /*  mathTribute = new Tribute({
             collection: [{
                 trigger: ' @',
                 keepLetters: true,
                 values: base_tribute,
                 lookup: "for",
                 replaceTextSuffix: '',
                 menuContainer: tribcontainer,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = item.original.indx;
                     return "";
                 }
             }, {
                 trigger: 'f@',
                 keepLetters: true,
                 lookup: "value",
                 menuContainer: tribcontainer,
                 values: form,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = -1;
                     return item.original.value;
                 }
             }, {
                 trigger: 'n@',
                 keepLetters: true,
                 values: nerd,
                 lookup: "for",
                 menuContainer: tribcontainer,
                 replaceTextSuffix: '',
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = item.original.indx;
                     return "";
                 }
             }, {
                 trigger: 'm@',
                 keepLetters: true,
                 lookup: "value",
                 values: nerd_m,
                 menuContainer: tribcontainer,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = -1;
                     return item.original.value;
                 }
             }, {
                 trigger: 'v@',
                 keepLetters: true,
                 lookup: "value",
                 values: nerd_v,
                 menuContainer: tribcontainer,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = -1;
                     return item.original.value;
                 }
             }, {
                 trigger: 'a@',
                 keepLetters: true,
                 lookup: "value",
                 values: nerd_a,
                 menuContainer: tribcontainer,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = -1;
                     return item.original.value;
                 }

             }, {
                 trigger: 'x@',
                 keepLetters: true,
                 lookup: "value",
                 values: nmMat,
                 menuContainer: tribcontainer,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = -1;
                     return item.original.value;
                 }
             }, {
                 trigger: 'l@',
                 keepLetters: true,
                 lookup: "value",
                 values: latex,
                 menuContainer: tribcontainer,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = -1;
                     return item.original.value;
                 }
             }, {
                 trigger: 'h@',
                 keepLetters: true,
                 replaceTextSuffix: null,
                 lookup: "value",
                 values: html,
                 menuContainer: tribcontainer,
                 menuItemTemplate: function(item) {
                     return item.original.tag;
                 },
                 selectTemplate: function(item) {
                     collToShow = -1;
                     return item.original.value;
                 }
             }]
         }); */
        mathTribute.attach(textar);
        //autoTribute.attach(textar);
    } else {
        //console.log(autoTributeC)
        createAutoTribute();
        /* autoTributeC = new Tribute({
            autocompleteMode: true,
            noMatchTemplate: '',
            keepLetters: true,
            lookup: "key",
            requireLeadingSpace: false,
            menuContainer: tribcontainer,
            values: autodictC,
            menuItemTemplate: function(item) {
                return item.original.tag;
            }
        }); */
        autoTributeC.attach(textar);
    }
};

setTribute()


/* function elotteTorol(e) { //EZT már nem is használjuk//
    var textarea = e.target;
    var currentCaret = textarea.selectionStart;
    var fullText = textarea.value;

    // Find where the inserted text starts
    // We subtract the text length and the trigger length to find the start point
    console.log(e.detail.item.original.value)
    var insertedTextLength = e.detail.item.original.value.length * 1 + 1; // +1 for the trigger character
    console.log(insertedTextLength)
    var triggerStartPos = currentCaret - insertedTextLength;

    // Target index of the single character BEFORE the trigger
    var charToDeletePos = triggerStartPos - 1;
    var characterAtPos = fullText.charAt(charToDeletePos);
    console.log("The character at deletePos is:", characterAtPos);

    if (charToDeletePos >= 0 && characterAtPos === charToDelete) {
        // Reconstruct the text excluding that one character
        textarea.value = fullText.slice(0, charToDeletePos) + fullText.slice(triggerStartPos);

        // Explicitly reposition the caret back to its correct offset (-1 character)
        textarea.selectionStart = textarea.selectionEnd = currentCaret - 1;
    } else if (collToShow > -1) {
        mathTribute.showMenuForCollection(textar, collToShow);
    } else {
        console.log("collToShow", collToshow)
        textarea.selectionStart = textarea.selectionEnd = currentCaret - 1;
    }
}; */