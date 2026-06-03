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
