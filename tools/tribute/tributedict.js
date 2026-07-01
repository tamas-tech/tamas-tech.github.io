var MENTION = false;
var autoCOMP = true;
var visszatorles = true;

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
    //{ key: "tags", value: "", tag: "<ul style='background:#ffff9f;'><li>nerd<ul><li>arit</li><li>mat</li><li>vec</li></ul></li><li>forms</li><li>latex</li><li>htnl</li><li>poly</li></ul>" },
    // Formázás
    { key: "kiértékelés fformáz", value: "<< {c} >>", tag: "&#x27E8;&#x27E8;  &#x27E9;&#x27E9;" },
    { key: "inline sorköz math fformáz", value: "$ {c} $", tag: "$ $" },
    { key: "display math fformáz", value: "$$ {c} $$", tag: "$$ $$" },
    { key: "def változó fformáz", value: "§ {c} §", tag: "§ §" },
    { key: "ddef változó fformáz", value: "§§ {c} §§", tag: "§§ §§" },
    //Nerdamer Constants
    { key: "piconstáállandó nerd", value: "pi", tag: "&pi;" },
    { key: "imagconstáállandó nerd", value: "i", tag: "i (Imaginary)" },
    { key: "eulerconstáállandóeuler nerd", value: "e", tag: "e (Euler)" },
    { key: "infinityvégtelenconstáállandó nerd", value: "Infinity", tag: "&#x221E;" },
    // Nerdamer hatasok
    { key: "behely Fseq  nerd", value: "Fseq({c},,)", tag: "Fseq(F,a,n)" },
    { key: "hatas1_n nerd", value: "hatas1_n({c},,)", tag: "hatas1_n(F1,a,n)" },
    { key: "hatas1  nerd", value: "hatas1({c},,)", tag: "hatas1(F1,a,n)" },
    { key: "hatas2_n  nerd", value: "hatas2_n({c},,,)", tag: "hatas2_n(F1,F2,a,n)" },
    { key: "hatas2  nerd", value: "hatas2({c},,,)", tag: "hatas2(F1,F2,a,n)" },
    { key: "hatas3_n  nerd", value: "hatas3_n({c},,,,)", tag: "hatas3_n(F1,..,a,n)" },
    { key: "hatas3  nerd", value: "hatas3({c},,,,)", tag: "hatas3(F1,..,a,n)" },
    { key: "hatas4_n  nerd", value: "hatas4_n({c},,,,,)", tag: "hatas4_n(F1,..,a,n)" },
    { key: "hatas4  nerd", value: "hatas4({c},,,,,)", tag: "hatas4(F1,..,a,n)" },

    // Nerdamer aritmetikai fgvs
    { key: "pentagonális aritmetik nerd", value: "pent({c})", tag: "&delta;<sub>5</sub>(n)" },
    { key: "osztókösszege sigma aritmetik nerd", value: "sigma({c})", tag: "&sigma;(n)" },
    { key: "osztókösszegeM sigmaM aritmetik nerd", value: "sigmaM({c},)", tag: "&sigma;<sub>m</sub>(n)" },
    { key: "osztókszáma tau aritmetik nerd", value: "tau({c})", tag: "&tau;(n)" },
    { key: "Ramanujan rtau aritmetik nerd", value: "rtau({c})", tag: "rtau(n)" },
    { key: "partició part aritmetik nerd", value: "part({c})", tag: "p(n)" },
    { key: "partició partM aritmetik nerd", value: "partM({c},)", tag: "p<sub>m</sub>(n)" },
    { key: "pell aritmetik nerd", value: "pell({c})", tag: "pell(n)" },
    { key: "eulertotient aritmetik nerd", value: "phi({c})", tag: "&phi;(n)" },
    { key: "mobius aritmetik nerd", value: "mobius({c})", tag: "&mu;(n)" },
    { key: "mahonian aritmetik nerd", value: "mahonian({c},)", tag: "mahonian(n,m)" },
    { key: "binomial aritmetik nerd", value: "binomial({c},)", tag: "binomial(n,m)" },
    //  Nerdamer többv polinomok
    { key: "függvény part többvált polinom nerd", value: "fgv({c}:)", tag: "fgv(F:képlet)" },
    { key: "Függvény part többvált polinom nerd", value: "Fgv({c},[],)", tag: "Fgv(F,[x_1,..],képlet)" },
    { key: "Zycn part többvált polinom nerd", value: "Zyc_{c}(,,)", tag: "Zyc_n(x<sub>1</sub>,..)" },
    { key: "Fabn part többvált polinom nerd", value: "Fab_{c}(,,)", tag: "Fab_n(x<sub>1</sub>,..)" },
    { key: "Fibn part többvált polinom nerd", value: "Fib_{c}(,,)", tag: "Fib_n(x<sub>1</sub>,..)" },
    { key: "Lucn part többvált polinom nerd", value: "Luc_{c}(,,)", tag: "Luc_n(x<sub>1</sub>,..)" },
    { key: "Stin part többvált polinom nerd", value: "Sti_{c}(,,)", tag: "Sti_n(x<sub>1</sub>,..)" },
    { key: "Harn part többvált polinom nerd", value: "Har_{c}(,,)", tag: "Har_n(x<sub>1</sub>,..)" },
    { key: "Wittn part többvált polinom nerd", value: "Witt_{c}(,,)", tag: "Witt_n(x<sub>1</sub>,..)" },
    { key: "comp2összetéosition2 part többvált polinom nerd", value: "comp2({c},,)", tag: "comp2(F1,F2,n)" },
    { key: "comp3összetéosition3 part többvált polinom nerd", value: "comp3({c},,,)", tag: "comp3(F1,F2,F3,n)" },
    { key: "comp4összetéosition4 part többvált polinom nerd", value: "comp4({c},,,,)", tag: "comp4(F1,..,F4,n)" },
    { key: "compSorösszetéosition2 part többvált polinom nerd", value: "compSor({c},,,)", tag: "compSor(F1,F2,Név,n)" },
    { key: "makeSor part többvált polinom nerd", value: "makeSor({c},,,,)", tag: "makeSor(F,x,n,C,b)" },
    // Nerdamer math functions
    { key: "gyöksqrt mathfncüggvény nerd", value: "sqrt({c})", tag: "sqrt(x)=√x" },
    { key: "dirichletZ mathfncüggvény nerd", value: "dirichletZ({c},)", tag: "dirichletZ(n_<sub>0</sub>,n)" },
    { key: "fibonacci mathfncüggvény nerd", value: "fib({c})", tag: "fib(n)" },
    { key: "exp mathfncüggvény nerd", value: "exp({c})", tag: "exp(x)=e<sup>x</sup>" },
    { key: "log mathfncüggvény nerd", value: "log({c})", tag: "log(x)=ln(x)" },
    { key: "log10 mathfncüggvény nerd", value: "log10({c})", tag: "lg(x)" },
    { key: "min mathfncüggvény nerd", value: "min({c},,)", tag: "min(x,y,...)" },
    { key: "max mathfncüggvény nerd", value: "max({c},,)", tag: "max(x,y,...)" },
    { key: "abs| mathfncüggvény nerd", value: "abs({c})", tag: "abs(x)=|x|" },
    { key: "floor mathfncüggvény nerd", value: "floor({c})", tag: "floor(x)=⌊x⌋" },
    { key: "ceil mathfncüggvény nerd", value: "ceil({c})", tag: "ceil(x)=⌈x⌉" },
    { key: "simplifyegyszerűsít mathfncüggvény nerd", value: "simplify({c})", tag: "simplify(expr)" },
    { key: "expandkibont mathfncüggvény nerd", value: "expand({c})", tag: "expand(expr)" },
    { key: "facktoriaális mathfncüggvény nerd", value: "factorial({c})", tag: "factorial(x)=x!" },
    { key: "duplafacktoriaális mathfncüggvény nerd", value: "dfactorial({c})", tag: "dfactorial(x)=x!!" },
    { key: "modaradék mathfncüggvény", value: "mod({c},)", tag: "mod(x,y)" },

    // Nerdamer Trigonometric
    { key: "cos trigon nerd", value: "cos({c})", tag: "cos( )" },
    { key: "sin trigon nerd", value: "sin({c})", tag: "sin( )" },
    { key: "tan trigon nerd", value: "tan({c})", tag: "tan( )" },
    { key: "cot trigon nerd", value: "cot({c})", tag: "cot( )" },
    { key: "csc trigon nerd", value: "csc({c})", tag: "csc( )" },
    { key: "sec trigon nerd", value: "sec({c})", tag: "sec( )" },
    { key: "acos trigon arc nerd", value: "acos({c})", tag: "acos( )" },
    { key: "arcsin trigon nerd", value: "asin({c})", tag: "asin( )" },
    { key: "arctan trigon nerd", value: "atan({c})", tag: "atan( )" },
    // Nerdamer Hyperbolic
    { key: "cosh hyperbolic nerd", value: "cosh({c})", tag: "cosh( )" },
    { key: "sinh hyperbolic nerd", value: "sinh({c})", tag: "sinh( )" },
    { key: "tanh hyperbolic nerd", value: "tanh({c})", tag: "tanh( )" },
    { key: "coth hyperbolic nerd", value: "coth({c})", tag: "coth( )" },
    { key: "csch hyperbolic nerd", value: "csch({c})", tag: "csch( )" },
    { key: "sech hyperbolic nerd", value: "sech({c})", tag: "sech( )" },
    { key: "arccosh hyperbolic nerd", value: "acosh({c})", tag: "acosh( )" },
    { key: "arcsinh hyperbolic nerd", value: "asinh({c})", tag: "asinh( )" },
    { key: "arctanh hyperbolic nerd", value: "atanh({c})", tag: "atanh( )" },
    // Nerdamer Matrix
    { key: "maátrix nerd", value: "matrix([{c},],[,])", tag: "matrix" },
    { key: "maátrixExpr nerd", value: "matExpr({c},,)", tag: "matExpr(n,m,expr|fgv)" },
    { key: "matMap maátrix nerd", value: "matMat({c},,)", tag: "matMap(expr,mat,[kib])" },
    { key: "nerd maátrix23", value: "matrix([{c},], [,], [,]))", tag: "matrix 3&times;2" },
    { key: "nerd maátrix33", value: "matrix([{c},,], [,,], [,,])", tag: "matrix 3&times;3" },
    { key: "nerd maátrix34", value: "matrix([{c},,,], [,,,], [,,,])", tag: "matrix 3&times;4" },
    { key: "nerd maátrix42", value: "matrix([{c},], [,], [,], [,])", tag: "matrix 4&times;2" },
    { key: "nerd maátrix43", value: "matrix([{c},,], [,,], [,,], [,,])", tag: "matrix 4&times;3" },
    { key: "nerd maátrix44", value: "matrix([{c},,,], [,,,], [,,,], [,,,])", tag: "matrix 4&times;4" },
    { key: "imaátrix egségmátrix nerd", value: "imatrix({c})", tag: "imatrix" },
    { key: "maátrix determinantáns nerd", value: "determinant({c})", tag: "determináns" },
    { key: "maátrix invertz nerd", value: "invert({c})", tag: "inverz" },
    { key: "transposeált maátrix nerd", value: "transpose({c})", tag: "transzponált" },
    { key: "sizeméretdim maátrix nerd", value: "size({c})", tag: "méret" },
    { key: "maátrix getrowsorlekér nerd ", value: "matgetrow({c},)", tag: "matgetrow(<b>A</b>,i)" },
    { key: "maátrix getcoloszloplekér nerd", value: "matgetcol({c},)", tag: "matgetcol(<b>A</b>,i)" },
    { key: "maátrix setrowsormegad nerd", value: "matsetrow({c},)", tag: "matsetrow(<b>A</b>,i)" },
    { key: "maátrix setcoloszlopmegad nerd", value: "matsetcol({c},)", tag: "matsetcol(<b>A</b>,i)" },
    { key: "maátrix getlekér nerd", value: "matget({c},,)", tag: "matget(<b>A</b>,i,j)" },
    { key: "maátrixsetmatmegad nerd", value: "matset({c},,)", tag: "matset(<b>A</b>,i,j)" },
    { key: "maátrix Toeplitz nerd ", value: " matToeplitz([{c},,])", tag: " matToeplitz(<b>v</b>)" },
    // Nerdamer Vector
    { key: "[gyorsvecktor nerd", value: "[,||{c}]", tag: "[a_1, a_2,||n]" },
    { key: "[gyorsvecktor... nerd", value: "[,,...||{c}]", tag: "[a_1,a_2,... ||n]" },
    { key: "[gyorsvecktor...f nerd", value: "[,...f(k)||{c}]", tag: "[a_1,a_2,...f(k) ||n]" },
    { key: "vecktor nerd", value: "vector({c},,)", tag: "vector(,,)" },
    { key: "ivecktor nerd", value: "ivector({c},)", tag: "ivector(dim,k)" },
    { key: "seq vecktork nerd", value: "seq({c},,)", tag: "seq(f,a,b)" },
    { key: "Fvec vecktork nerd", value: "Fvec({c},)", tag: "Fvec(F,vec)" },
    { key: "seqvar vecktor nerd", value: "seqvar({c},,,?)", tag: "seqvar(f(k,.),k,a,b,[exp])" },
    { key: "map vecktork nerd", value: "map({c},,?)", tag: "map(f,vec,[exp])" },
    { key: "map_n vecktork nerd", value: "map_n({c},,,?)", tag: "map_n(f,k,vec,[exp])" },
    { key: "skaldotszorzat vecktor nerd", value: "dot({c},)", tag: "<b>a</b>&centerdot;<b>b</b> (skaláris)" },
    { key: "concatösszefűzés  vecktor nerd", value: "concat({c},)", tag: "<b>a</b>&bullet;<b>b</b> (összefűzés)" },
    { key: "kconvuluctionszorzat  vecktor nerd", value: "conv({c},)", tag: "<b>a</b>*<b>b</b> (konv.)" },
    { key: "kconvuluctioninversze  vecktor nerd", value: "convinv({c})", tag: "<b>a</b><sup> -&lowast;</sup> (konv. inverz)" },
    { key: "keresztszorzatcross vecktor nerd", value: "cross({c},)", tag: "<b>a</b>&times;<b>b</b> (vektoriális)" },
    { key: "vecktor getlekér nerd", value: "vecget({c},)", tag: "vecget(<b>v</b>,i)" },
    { key: "vecktor setmatmegad nerd", value: "vecset({c},)", tag: "vecset(<b>v</b>,i)" },
    // Nerdamer Calculus
    { key: "sumősszeg calculusanalízis nerd", value: "sum(f{c},k,a,b)", tag: "&sum;<sub>k=a..b</sub>f(..,k)" },
    { key: "Sumősszeg calculusanalízis nerd", value: "Sum(f{c},k,a,b)", tag: "&sum;<sub>k=a..b</sub>f<sub>k</sub>(..,x)" },
    { key: "prodszorzat calculusanalízis nerd", value: "product(f{c},k,a,b)", tag: "&prod;<sub>k=a..b</sub>f(..,k)" },
     { key: "Prodszorzat calculusanalízis nerd", value: "Product(f{c},k,a,b)", tag: "&prod;<sub>k=a..b</sub>f<sub>k</sub>(..,x)" },
    { key: "truncprodszorzat calculusanalízis nerd", value: "truncprod(f{c},g,[n])", tag: "f&nbsp;&bullet;<sub>n</sub>&nbsp;g" },
    { key: "limithatárérték calculusanalízis nerd", value: "limit(f{c},x,a)", tag: "lim<sub>x&rightarrow;a</sub>f(x)" },
    { key: "diffderivált calculusanalízis nerd", value: "diff(f{c},x,n)", tag: "&part;<sup style='vertical-align:0.7em;'>(n)</sup><sub style='margin-left:-1.1em;margin-right:0.7em;'>x</sub>f(x,..)" },
    { key: "integrálhatlan calculusanalízis nerd", value: "int(f{c},x)", tag: "&int;f(x)dx" },
    { key: "határozottdefintegr calculusanalízis nerd", value: "defint(f{c},a,b,x)", tag: "&int;<sup style='margin-left:0.1em;vertical-align:0.7em;'>b</sup><sub style='margin-left:-0.6em;margin-right:0.3em;'>a</sub>f(x)dx" },
    { key: "laplacetrcalculusanalízis nerd", value: "laplace(f{c},s,t)", tag: "&#x2112;[f,s,t]" },
    { key: "inverzlaplacetr calculusanalízis nerd", value: "ilt(f{c},s,t)", tag: "&#x2112;<sup>-1</sup>[f,s,t]" },
    // Nerdamer Algebra
    { key: "divideosztó poliynom nerd", value: "divide({c},)", tag: "divide(f,g)" },
    { key: "factor poliynom nerd", value: "factor({c})", tag: "factor(f)" },
    { key: "partfrac poliynom nerd", value: "partfrac({c},)", tag: "partfrac(f,x)" },
    { key: "legkisebbköztöbblcm poliynom nerd", value: "lcm({c},)", tag: "lcm(f,g)" },
    { key: "legnagyobbközosztogcd poliynom nerd", value: "gcd({c},)", tag: "gcd(f,g)" },
    { key: "rootsgyökök poliynom ", value: "roots({c})", tag: "roots(f)" },
    { key: "coeffsegyütthatók poliyno nerd", value: "coeffs({c},)", tag: "coeffs(f,x)" },
    { key: "degfokszám poliynom nerd", value: "deg({c})", tag: "deg(f)" },
    { key: "sqcompteljesnégyzet poliynom nerd", value: "sqcomp({c},)", tag: "sqcomp(f,x)" },
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
    if (visszatorles)
        elotteTorol(e);
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
    } else if (MENTION && collToShow > -1) {
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
    if (autoCOMP)
        if (MENTION) {
            createMathTribute();
            mathTribute.attach(textar);
        } else {
            createAutoTribute();
            autoTributeC.attach(textar);
        }
};

setTribute()


function elotteTorol(e) { //EZT már nem is használjuk//
    var textarea = e.target;
    var currentCaret = textarea.selectionStart;
    var fullText = textarea.value;

    // Find where the inserted text starts
    // We subtract the text length and the trigger length to find the start point
    // console.log(e.detail.item.original.value)
    var insertedTextLength = e.detail.item.original.value.length * 1;
    //console.log(insertedTextLength)
    var triggerStartPos = currentCaret - insertedTextLength;

    // Target index of the single character BEFORE the trigger
    var charToDeletePos = triggerStartPos - 1;
    var characterAtPos = fullText.charAt(charToDeletePos);
    //console.log("The character at deletePos is:", characterAtPos);

    if (charToDeletePos >= 0 && characterAtPos === " ") {
        // Reconstruct the text excluding that one character
        textarea.value = fullText.slice(0, charToDeletePos) + fullText.slice(triggerStartPos);

        // Explicitly reposition the caret back to its correct offset (-1 character)
        textarea.selectionStart = textarea.selectionEnd = currentCaret - 1;
    } else {
        textarea.selectionStart = textarea.selectionEnd = currentCaret - 1;
    }
};
