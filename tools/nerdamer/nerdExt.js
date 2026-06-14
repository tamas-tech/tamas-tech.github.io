(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER,
        Symbol = core.Symbol;

    function f(a, d, m, n) {
        var vec = _.functions.vector[0]();
        var j;
        for (j = m; j < n + 2; j++) {
            nerdamer.setVar('v', j);
            var v1 = _.subtract(nerdamer.getVar('v').clone(), new Symbol(2));
            var v2 = _.multiply(d.clone(), v1);
            var z = _.add(a.clone(), v2);
            vec.set(j - m - 1, z)
        }
        return vec;
    }
    nerdamer.register({
        name: 'szamtani',
        visible: true,
        numargs: 4,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER,
        Symbol = core.Symbol;

    function f(a, q, m, n) {
        var vec = _.functions.vector[0]();
        var j;
        for (j = m; j < n + 2; j++) {
            nerdamer.setVar('v', j);
            var v1 = _.subtract(nerdamer.getVar('v').clone(), new Symbol(2));
            var v2 = _.pow(q.clone(), v1);
            var z = _.multiply(a.clone(), v2);
            vec.set(j - m - 1, z)
        }
        return vec;
    }
    nerdamer.register({
        name: 'mertani',
        visible: true,
        numargs: 4,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(expr, m, n) {
        var vec = _.functions.vector[0](),
            valt = nerdamer(expr).variables()[0],
            s = {},
            j;
        for (j = m; j < n + 1; j++) {
            s[valt] = j;
            var v1 = nerdamer(expr, s).evaluate();
            vec.set(j - m, v1);
        }
        return vec;
    }
    nerdamer.register({
        name: 'seq',
        visible: true,
        numargs: 3,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(expr, valt, m, n) {
        var vec = _.functions.vector[0](),
            s = {},
            j;
        for (j = m; j < n + 1; j++) {
            s[valt] = j;
            var v1 = nerdamer(expr, s).evaluate();
            vec.set(j - m, v1);
        }
        return vec;
    }
    nerdamer.register({
        name: 'seqvar',
        visible: true,
        numargs: 4,
        build: function() {
            return f;
        }
    });
})();


(function() {
    function f(F, expr, n) {
        var nerdben = true;
        try {
            nerdamer.setFunction('TEMP', F.variables(), F.symbol.value)
                //console.log(n, F.variables())
        } catch {
            nerdben = false;
        }
        var vec = nerdamer('seq(' + expr + ',1,' + n + ')').evaluate().toString().slice(1, -1);
        if (nerdben)
            return nerdamer('TEMP(' + vec + ')');
        else {
            return nerdamer(F + '(' + vec + ')');
        }
    }
    nerdamer.register({
        name: 'Fseq',
        visible: true,
        numargs: 3,
        build: function() {
            return f;
        }
    });
})();

const PartPolys = ["Zyc", "Fib", "Fab", "Luc", "Sti", "Har"];

/// 1

(function() {
    function f(F, expr, n) {
        if (PartPolys.includes(F.toString())) {
            prelatexjs('§' + F + '_' + n + '§', true);
            return nerdamer('Fseq(' + F + '_' + n + ',' + expr + ',' + n + ')');
        } else {
            var nerdben = true;
            try {
                nerdamer.setFunction('TEMP', F.variables(), F.symbol.value)
            } catch {
                nerdben = false;
            }
            if (nerdben)
                return nerdamer('Fseq(TEMP,' + expr + ',' + n + ')');
            else {
                return nerdamer('Fseq(' + F + ',' + expr + ',' + n + ')');
            }
        }
    };
    nerdamer.register({
        name: 'hatas1_n',
        visible: true,
        numargs: 3,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(F, expr, n) {
        var vec = _.functions.vector[0](),
            j;
        for (j = 1; j <= n; j++) {
            var v1 = nerdamer('hatas1_n(' + F + ',' + expr + ',' + j + ')');
            vec.set(j - 1, v1);
        }
        return vec;
    }
    nerdamer.register({
        name: 'hatas1',
        visible: true,
        numargs: 3,
        build: function() {
            return f;
        }
    });
})();

//// 2

(function() {
    function f(fn1, fn2, n) {
        fn1 = fn1.toString();
        fn2 = fn2.toString();
        n = n.toString() * 1;
        prelatexjs('§' + fn1 + '_' + n + '§', true);
        for (var k = 1; k <= n; k++)
            prelatexjs('§' + fn2 + '_' + k + '§', true);

        var com = fn1 + "_" + n + "(";
        for (var j = 1; j <= n; j++) {
            com += fn2 + "_" + j + "(";
            for (var i = 1; i <= j; i++) {
                com += "x_" + i + ",";
            }
            com = com.slice(0, -1) + "),"
        };
        com = com.slice(0, -1) + ")";
        var txt = nerdamer("expand(" + com + ")");
        //nerdamer.setFunction(fn1 + fn2 + '_' + n, txt.variables(), txt.symbol.value);
        return txt;
    }
    nerdamer.register({
        name: 'comp2',
        visible: true,
        numargs: 3,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(fn1, fn2, expr, n) {
        fn1 = fn1.toString();
        fn2 = fn2.toString();
        n = n.toString() * 1;
        prelatexjs('§' + fn1 + '_' + n + '§', true);
        for (var k = 1; k <= n; k++)
            prelatexjs('§' + fn2 + '_' + k + '§', true);

        var com = fn1 + "_" + n + "(";
        for (var j = 1; j <= n; j++) {
            var vec = nerdamer('seq(' + expr + ',1,' + j + ')').evaluate().toString().slice(1, -1);
            com += fn2 + '_' + j + '(' + vec + '),';
        };
        com = com.slice(0, -1) + ")";
        var txt = nerdamer("expand(" + com + ")");
        return txt;
    }
    nerdamer.register({
        name: 'hatas2_n',
        visible: true,
        numargs: 4,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(F1, F2, expr, n) {
        var vec = _.functions.vector[0](),
            j;
        for (j = 1; j <= n; j++) {
            var v1 = nerdamer('hatas2_n(' + F1 + ',' + F2 + ',' + expr + ',' + j + ')');
            vec.set(j - 1, v1);
        }
        return vec;
    }
    nerdamer.register({
        name: 'hatas2',
        visible: true,
        numargs: 4,
        build: function() {
            return f;
        }
    });
})();

/// 3

(function() {
    function f(fn1, fn2, fn3, n) {
        fn1 = fn1.toString();
        fn2 = fn2.toString();
        fn3 = fn3.toString();
        n = n.toString() * 1;
        prelatexjs('§' + fn1 + '_' + n + '§', true);
        for (var k = 1; k <= n; k++) {
            prelatexjs('§' + fn2 + '_' + k + '§', true);
            prelatexjs('§' + fn3 + '_' + k + '§', true);
        }

        var com = fn1 + "_" + n + "(";
        for (var k = 1; k <= n; k++) {
            com += fn2 + "_" + k + "(";
            for (var j = 1; j <= k; j++) {
                com += fn3 + "_" + j + "(";
                for (var i = 1; i <= j; i++) {
                    com += "x_" + i + ",";
                }
                com = com.slice(0, -1) + "),"
            }
            com = com.slice(0, -1) + "),"
        };
        com = com.slice(0, -1) + ")";
        var txt = nerdamer("expand(" + com + ")");
        //nerdamer.setFunction(fn1 + fn2 + fn3 + '_' + n, txt.variables(), txt.symbol.value);
        return txt;
    }
    nerdamer.register({
        name: 'comp3',
        visible: true,
        numargs: 4,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(fn1, fn2, fn3, expr, n) {
        fn1 = fn1.toString();
        fn2 = fn2.toString();
        fn3 = fn3.toString();
        n = n.toString() * 1;
        prelatexjs('§' + fn1 + '_' + n + '§', true);
        for (var k = 1; k <= n; k++) {
            prelatexjs('§' + fn2 + '_' + k + '§', true);
            prelatexjs('§' + fn3 + '_' + k + '§', true);
        }

        var com = fn1 + "_" + n + "(";
        for (var k = 1; k <= n; k++) {
            com += fn2 + "_" + k + "(";
            for (var j = 1; j <= k; j++) {
                var vec = nerdamer('seq(' + expr + ',1,' + j + ')').evaluate().toString().slice(1, -1);
                com += fn3 + '_' + j + '(' + vec + '),';
            }
            com = com.slice(0, -1) + "),"
        };
        com = com.slice(0, -1) + ")"
        var txt = nerdamer("expand(" + com + ")");
        //nerdamer.setFunction(fn1 + fn2 + '_' + n, txt.variables(), txt.symbol.value);
        return txt;
    }
    nerdamer.register({
        name: 'hatas3_n',
        visible: true,
        numargs: 5,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(F1, F2, F3, expr, n) {
        var vec = _.functions.vector[0](),
            j;
        for (j = 1; j <= n; j++) {
            var v1 = nerdamer('hatas3_n(' + F1 + ',' + F2 + ',' + F3 + ',' + expr + ',' + j + ')');
            vec.set(j - 1, v1);
        }
        return vec;
    }
    nerdamer.register({
        name: 'hatas3',
        visible: true,
        numargs: 5,
        build: function() {
            return f;
        }
    });
})();

/// 4

(function() {
    function f(fn1, fn2, fn3, fn4, n) {
        fn1 = fn1.toString();
        fn2 = fn2.toString();
        fn3 = fn3.toString();
        fn4 = fn4.toString();
        n = n.toString() * 1;
        prelatexjs('§' + fn1 + '_' + n + '§', true);
        for (var k = 1; k <= n; k++) {
            prelatexjs('§' + fn2 + '_' + k + '§', true);
            prelatexjs('§' + fn3 + '_' + k + '§', true);
            prelatexjs('§' + fn4 + '_' + k + '§', true);
        }

        var com = fn1 + "_" + n + "(";
        for (var L = 1; L <= n; L++) {
            com += fn2 + "_" + L + "(";
            for (var k = 1; k <= L; k++) {
                com += fn3 + "_" + k + "(";
                for (var j = 1; j <= k; j++) {
                    com += fn4 + "_" + j + "(";
                    for (var i = 1; i <= j; i++) {
                        com += "x_" + i + ",";
                    }
                    com = com.slice(0, -1) + "),"
                }
                com = com.slice(0, -1) + "),"
            };
            com = com.slice(0, -1) + "),"
        };
        com = com.slice(0, -1) + ")";
        var txt = nerdamer("expand(" + com + ")");
        //nerdamer.setFunction(fn1 + fn2 + fn3 + fn4 + '_' + n, txt.variables(), txt.symbol.value);
        return txt;
    }
    nerdamer.register({
        name: 'comp4',
        visible: true,
        numargs: 5,
        build: function() {
            return f;
        }
    });
})();

(function() {
    function f(fn1, fn2, fn3, fn4, expr, n) {
        fn1 = fn1.toString();
        fn2 = fn2.toString();
        fn3 = fn3.toString();
        fn4 = fn4.toString();
        n = n.toString() * 1;
        prelatexjs('§' + fn1 + '_' + n + '§', true);
        for (var k = 1; k <= n; k++) {
            prelatexjs('§' + fn2 + '_' + k + '§', true);
            prelatexjs('§' + fn3 + '_' + k + '§', true);
            prelatexjs('§' + fn4 + '_' + k + '§', true);
        }

        var com = fn1 + "_" + n + "(";
        for (var L = 1; L <= n; L++) {
            com += fn2 + "_" + L + "(";
            for (var k = 1; k <= L; k++) {
                com += fn3 + "_" + k + "(";
                for (var j = 1; j <= k; j++) {
                    var vec = nerdamer('seq(' + expr + ',1,' + j + ')').evaluate().toString().slice(1, -1);
                    com += fn4 + '_' + j + '(' + vec + '),';
                }
                com = com.slice(0, -1) + "),"
            };
            com = com.slice(0, -1) + "),"
        };
        com = com.slice(0, -1) + ")";
        var txt = nerdamer("expand(" + com + ")");
        return txt;
    }
    nerdamer.register({
        name: 'hatas4_n',
        visible: true,
        numargs: 6,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(F1, F2, F3, F4, expr, n) {
        var vec = _.functions.vector[0](),
            j;
        for (j = 1; j <= n; j++) {
            var v1 = nerdamer('hatas4_n(' + F1 + ',' + F2 + ',' + F3 + ',' + F4 + ',' + expr + ',' + j + ')');
            vec.set(j - 1, v1);
        }
        return vec;
    }
    nerdamer.register({
        name: 'hatas4',
        visible: true,
        numargs: 6,
        build: function() {
            return f;
        }
    });
})();

////////////////////////////// 

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER,
        Symbol = core.Symbol;

    function f(w) {
        return nerdamer('Tr(x)').evaluate({ x: w });
    }
    nerdamer.register({
        name: 'TR',
        visible: true,
        numargs: 1,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(a, pos) {
        if (pos == null)
            pos = "L";
        var mat = _.functions.matrix[0]();
        const e = a.elements;
        const L = e.length;
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < L; j++) {
                if (pos == "L") {
                    if (i >= j)
                        mat.set(i, j, e[i - j].toString() * 1);
                    else
                        mat.set(i, j, 0);
                } else {
                    if (i <= j)
                        mat.set(i, j, e[j - i].toString() * 1);
                    else
                        mat.set(i, j, 0);
                }
            }
        }
        return mat;
    }
    nerdamer.register({
        name: 'matToeplitz',
        visible: true,
        numargs: [1, 2],
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(a, b) {
        var c = _.functions.vector[0]();
        const ae = a.elements;
        const be = b.elements;
        const na = ae.length;
        const nb = be.length;
        if (na != nb)
            c.set(0, "convHIBA");
        else
            for (var n = 0; n < na; n++) {
                var cn = 0;
                for (var i = 0; i <= n; i++)
                    cn += ae[i] * be[n - i];
                c.set(n, cn);
            }
        return c;
    }
    nerdamer.register({
        name: 'conv',
        visible: true,
        numargs: 2,
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(a) {

        var vec = _.functions.vector[0]();
        const e = a.elements;
        const L = e.length;
        const V = nerdamer('matgetcol(invert(matToeplitz(' + a + ')), 0)').symbol.elements;
        for (var i = 0; i < L; i++) {
            vec.set(i, V[i][0]);
        }
        return vec;
    }
    nerdamer.register({
        name: 'convinv',
        visible: true,
        numargs: 1,
        build: function() {
            return f;
        }
    });
})();

/*  KACATOK
(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(name, valt, expr) {
        //console.log(name.value, valt.elements.map(y => y.value), expr.value)
        nerdamer.setFunction(name.value, valt.elements.map(y => y.value), expr.value);
    }
    nerdamer.register({
        name: 'Fgvvv',
        visible: true,
        numargs: 3,
        build: function() {
            return f;
        }
    });
})(); */
