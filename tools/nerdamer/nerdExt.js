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
        m = nerdamer(m).evaluate().valueOf();
        n = nerdamer(n).evaluate().valueOf();
        var vec = _.functions.vector[0](),
            valt = nerdamer(expr).variables()[0],
            s = {},
            j;
        for (j = m; j < n + 1; j++) {
            s[valt] = j;
            var v1 = nerdamer(expr, s).evaluate();
            //var v1 = expr.sub(valt, j);
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

    function f(F, n) {
        n = nerdamer(n).evaluate().valueOf();
        var elojel = "";
        var FP = F.toString();
        if (FP.startsWith('-')) {
            FP = FP.slice(1);
            elojel = "-"
        }

        if (PartPolys.includes(FP.toString())) {
            for (var i = 1; i <= n; i++)
                getsetZycFabFib(FP, i, false);
        };
        const pars = _.functions[FP + "_" + n][2].params;
        var mat = _.functions.matrix[0](),
            valt = "",
            j;
        for (j = 1; j < n + 1; j++) {
            valt += pars[j - 1];
            var nev = FP + "_" + j;
            var v1 = nerdamer(nev + "(" + valt + ")").evaluate().symbol;
            mat.set(j - 1, 0, nev);
            mat.set(j - 1, 1, v1);
            valt += ","
        };
        if (elojel == "-")
            return nerdamer(elojel + mat)
        else
            return mat;
    }
    nerdamer.register({
        name: 'seqSor',
        visible: true,
        numargs: 2,
        build: function() {
            return f;
        }
    });
})();

(function() {
    function f(n, k) {
        var vec = nerdamer('rect(' + n + '-' + k + ')');
        return vec;
    }
    nerdamer.register({
        name: 'dirichletZ',
        visible: true,
        numargs: 2,
        build: function() {
            return f;
        }
    });
})();

(function() {
    function f(n, k) {
        var vec = nerdamer('seqvar(rect(' + k + ' - x), x, 1, ' + n + ')').evaluate().symbol;
        return vec;
    }
    nerdamer.register({
        name: 'ivector',
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
        name: 'seqvarREGI',
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

    function f(expr, valt, m, n, kibont) {
        m = nerdamer(m).evaluate().valueOf();
        n = nerdamer(n).evaluate().valueOf();
        var vec = _.functions.vector[0](),
            j;
        var pat = new RegExp('(\\w*_' + valt + ')', 'g');
        if (pat.test(expr.toString())) {
            var indx = expr.toString().match(pat);
            for (j = m; j < n + 1; j++) {
                var exprj = expr;
                for (let v of indx)
                    exprj = exprj.sub(v, v.slice(0, -1) + j)
                    //console.log("seqvar:", 1)
                var v1 = exprj.sub(valt, j) //.evaluate();
                if (kibont)
                    v1 = nerdamer('expand(' + v1 + ')').symbol;
                vec.set(j - m, v1);
            }
        } else {
            for (j = m; j < n + 1; j++) {
                try {
                    var v1 = expr.sub(valt, j);
                    //console.log("seqvar", 2)
                    if (kibont)
                        v1 = nerdamer('expand(' + v1 + ')').symbol;
                } catch {
                    //console.log("seqvar", 3)
                    var v1 = nerdamer(expr.toString().replaceAll(valt, j)).evaluate().symbol;
                }
                //console.log("seqvar v1", v1)
                vec.set(j - m, v1);
            }
        }
        return vec;
    }
    nerdamer.register({
        name: 'seqvar',
        visible: true,
        numargs: [4, 5],
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(expr, vec, kibont) {
        if (_.functions[expr]) {
            var fn = _.functions[expr]['2'];
            var valt = fn.params.filter(y => y != '__')[0],
                expr = nerdamer(fn.body).symbol;

        } else
            var valt = nerdamer(expr).variables().filter(y => y != '__')[0];
        var v = vec.elements,
            n = v.length,
            j;
        for (j = 0; j < n; j++) {
            var v1 = expr.sub(valt, v[j]).sub('__', j + 1);
            if (kibont)
                v1 = nerdamer('expand(' + v1 + ')').symbol;
            vec.set(j, v1);
        }

        return vec;
    }
    nerdamer.register({
        name: 'map',
        visible: true,
        numargs: [2, 3],
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(expr, k, vec, kibont) {
        if (_.functions[expr]) {
            var fn = _.functions[expr]['2'];
            var valt = fn.params.filter(y => y != '__')[k - 1],
                expr = nerdamer(fn.body).symbol;

        } else
            var valt = nerdamer(expr).variables().filter(y => y != '__')[k - 1];

        var v = vec.elements,
            n = v.length,
            j;
        for (j = 0; j < n; j++) {
            var v1 = expr.sub(valt, v[j]).sub('__', j + 1);
            if (kibont)
                v1 = nerdamer('expand(' + v1 + ')').symbol;
            vec.set(j, v1);
        }

        return vec;
    }
    nerdamer.register({
        name: 'map_n',
        visible: true,
        numargs: [3, 4],
        build: function() {
            return f;
        }
    });
})();

(function() {
    function f(F, expr, n) {
        var nerdben = true;
        try {
            nerdamer.setFunction('TEMP', F.variables(), F.symbol.value);
            //console.log(n, F.variables())
        } catch {
            nerdben = false;
        };
        // console.log("nerdben:", nerdben)
        var vec = nerdamer('seq(' + expr + ',1,' + n + ')').evaluate().toString().slice(1, -1);
        if (nerdben)
            return nerdamer('TEMP(' + vec + ')').evaluate().symbol;
        else {
            return nerdamer(F + '(' + vec + ')').evaluate().symbol;
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

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(F, vec) {
        const spec = PartPolys.includes(F.toString());
        const n = vec.elements.length;
        vec = vec.toString().slice(1, -1);
        if (spec) {
            getsetZycFabFib(F.toString(), n, false);
            //console.log(F + '_' + n + '(' + vec + ')');
            return nerdamer(F + '_' + n + '(' + vec + ')');
        } else if (_.functions[F.toString() + '_' + n]) {
            return nerdamer(F + '_' + n + '(' + vec + ')');
        } else {
            return nerdamer(F + '(' + vec + ')');
        }
    }
    nerdamer.register({
        name: 'Fvec',
        visible: true,
        numargs: 2,
        build: function() {
            return f;
        }
    });
})();

const PartPolys = ["Zyc", "Fib", "Fab", "Luc", "Sti", "Har", "Witt", "Pr"];

/// 1

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(F, expr, n) {
        if (PartPolys.includes(F.toString())) {
            for (var i = 1; i <= n; i++)
                getsetZycFabFib(F.toString(), i, false);
            return nerdamer('Fseq(' + F + '_' + n + ',' + expr + ',' + n + ')');
        } else if (_.functions[F.toString() + '_' + n]) {
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
            else
                return nerdamer('Fseq(' + F + ',' + expr + ',' + n + ')');
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
        __ = core.PARSER;

    function f(F, expr, n, tr) {
        n = nerdamer(n).evaluate().valueOf();
        var vec = __.functions.vector[0](),
            j;
        if (expr.elements) {
            if (n)
                if (tr)
                    n = undefined;
                else
                    tr = n;
            n = expr.elements.length;
            expr = nerdamer('vecget(' + expr + ', k - 1)');
        }
        if (F.toString().startsWith("Sti")) {
            var ve = nerdamer('seq(' + expr + ',1,' + n + ')').evaluate().symbol.elements;
            ve.unshift(0);
            ve = evaluateCycleIndexSubstitution(n, ve)[1].slice(1);
            for (j = 0; j < n; j++) {
                vec.set(j, ve[j]);
            };
        } else
            for (j = 1; j <= n; j++) {
                var v1 = nerdamer('hatas1_n(' + F + ',' + expr + ',' + j + ')');
                vec.set(j - 1, v1);
            };
        if (tr)
            vec = nerdamer('map(' + tr + ',' + vec + ')').evaluate().symbol;

        pentsorout = nerdamer(vec).latex();
        return vec;
    }
    nerdamer.register({
        name: 'hatas1',
        visible: true,
        numargs: [2, 4],
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
        if (PartPolys.includes(fn1))
            getsetZycFabFib(fn1, n, false);
        if (PartPolys.includes(fn2))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn2, k, false);

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
        if (PartPolys.includes(fn1))
            getsetZycFabFib(fn1, n, false);
        if (PartPolys.includes(fn2))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn2, k, false);

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

    function f(F1, F2, expr, n, tr) {
        n = nerdamer(n).evaluate().valueOf();
        var vec = _.functions.vector[0](),
            j;
        if (expr.elements) {
            if (n)
                if (tr)
                    n = undefined;
                else
                    tr = n;
            n = expr.elements.length;
            expr = nerdamer('vecget(' + expr + ', k - 1)');
        };
        for (j = 1; j <= n; j++) {
            var v1 = nerdamer('hatas2_n(' + F1 + ',' + F2 + ',' + expr + ',' + j + ')');
            vec.set(j - 1, v1);
        };
        if (tr)
            vec = nerdamer('map(' + tr + ',' + vec + ')').evaluate().symbol;

        pentsorout = nerdamer(vec).latex();
        return vec;
    }
    nerdamer.register({
        name: 'hatas2',
        visible: true,
        numargs: [3, 5],
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
        if (PartPolys.includes(fn1))
            getsetZycFabFib(fn1, n, false);
        if (PartPolys.includes(fn2))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn2, k, false);

        if (PartPolys.includes(fn3))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn3, k, false);

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
        if (PartPolys.includes(fn1))
            getsetZycFabFib(fn1, n, false);
        if (PartPolys.includes(fn2))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn2, k, false);
        if (PartPolys.includes(fn3))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn3, k, false);

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

    function f(F1, F2, F3, expr, n, tr) {
        n = nerdamer(n).evaluate().valueOf();
        var vec = _.functions.vector[0](),
            j;
        if (expr.elements) {
            if (n)
                if (tr)
                    n = undefined;
                else
                    tr = n;
            n = expr.elements.length;
            expr = nerdamer('vecget(' + expr + ', k - 1)');
        };
        for (j = 1; j <= n; j++) {
            var v1 = nerdamer('hatas3_n(' + F1 + ',' + F2 + ',' + F3 + ',' + expr + ',' + j + ')');
            vec.set(j - 1, v1);
        };
        if (tr)
            vec = nerdamer('map(' + tr + ',' + vec + ')').evaluate().symbol;

        pentsorout = nerdamer(vec).latex();
        return vec;
    }
    nerdamer.register({
        name: 'hatas3',
        visible: true,
        numargs: [4, 6],
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
        if (PartPolys.includes(fn1))
            getsetZycFabFib(fn1.toString(), n, false);
        if (PartPolys.includes(fn2))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn2, k, false);
        if (PartPolys.includes(fn3))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn3, k, false);
        if (PartPolys.includes(fn4))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn4, k, false);


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
        if (PartPolys.includes(fn1))
            getsetZycFabFib(fn1, n, false);
        if (PartPolys.includes(fn2))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn2, k, false);
        if (PartPolys.includes(fn3))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn3, k, false);
        if (PartPolys.includes(fn4))
            for (var k = 1; k <= n; k++)
                getsetZycFabFib(fn4, k, false);

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

    function f(F1, F2, F3, F4, expr, n, tr) {
        n = nerdamer(n).evaluate().valueOf();
        var vec = _.functions.vector[0](),
            j;
        if (expr.elements) {
            if (n)
                if (tr)
                    n = undefined;
                else
                    tr = n;
            n = expr.elements.length;
            expr = nerdamer('vecget(' + expr + ', k - 1)');
        };
        for (j = 1; j <= n; j++) {
            var v1 = nerdamer('hatas4_n(' + F1 + ',' + F2 + ',' + F3 + ',' + F4 + ',' + expr + ',' + j + ')');
            vec.set(j - 1, v1);
        };
        if (tr)
            vec = nerdamer('map(' + tr + ',' + vec + ')').evaluate().symbol;

        pentsorout = nerdamer(vec).latex();
        return vec;
    }
    nerdamer.register({
        name: 'hatas4',
        visible: true,
        numargs: [5, 7],
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
                        mat.set(i, j, e[i - j].toString());
                    else
                        mat.set(i, j, 0);
                } else {
                    if (i <= j)
                        mat.set(i, j, e[j - i].toString());
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

    function f(n, m, expr, kibont) {
        n = nerdamer(n).evaluate().valueOf();
        m = nerdamer(m).evaluate().valueOf();
        if (_.functions[expr]) {
            var fn = _.functions[expr]['2'];
            var valt = fn.params,
                expr = nerdamer(fn.body).symbol;

        } else
            var valt = nerdamer(expr).variables();
        //console.log(valt)
        var mat = _.functions.matrix[0]();
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < m; j++) {
                var t = expr.sub(valt[0], i).sub(valt[1], j);
                if (kibont)
                    t = nerdamer('expand(' + t + ')').evaluate().symbol; //t = nerdamer('expand(' + t + ')').symbol;  volt
                mat.set(i, j, t);
            }
        }
        return mat;
    }
    nerdamer.register({
        name: 'matExpr',
        visible: true,
        numargs: [3, 4],
        build: function() {
            return f;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(expr, mat, kibont) {
        if (_.functions[expr]) {
            var fn = _.functions[expr]['2'];
            var valt = fn.params[0],
                expr = nerdamer(fn.body).symbol;

        } else
            var valt = nerdamer(expr).variables()[0];
        var v = mat.elements,
            n = v.length,
            m = v[0].length,
            j;

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < m; j++) {
                var t = expr.sub(valt, v[i][j]);
                if (kibont)
                    t = nerdamer('expand(' + t + ')').evaluate().symbol; //t = nerdamer('expand(' + t + ')').symbol;  volt
                mat.set(i, j, t);
            }
        }

        return mat;
    }
    nerdamer.register({
        name: 'matMap',
        visible: true,
        numargs: [2, 3],
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

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function f(a, b) {
        var c = _.functions.vector[0]();
        const ae = a.elements;
        const be = b.elements;
        const na = ae.length;
        const nb = be.length;
        const n = na + nb;
        for (var i = 0; i < n; i++) {
            if (i < na)
                c.set(i, ae[i]);
            else
                c.set(i, be[i - na]);
        }
        return c;
    }
    nerdamer.register({
        name: 'concat',
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

    function F(f, g, n) {
        var c = _.functions.vector[0]();
        var fn = _.functions[f]['2'];
        var gn = _.functions[g]['2'];

        if (n == null) {
            var df = nerdamer('deg(' + fn.body + ',x)') * 1;
            var dg = nerdamer('deg(' + gn.body + ',x)') * 1;
            n = Math.max(df, dg);
        };
        c = nerdamer('coeffs(expand((' + fn.body + ')*(' + gn.body + ')),x)');
        return nerdamer('sum(vecget(' + c + ',k)*x^k,k,0,' + n + ')').evaluate().symbol;
    }
    nerdamer.register({
        name: 'truncprod',
        visible: true,
        numargs: [2, 3],
        build: function() {
            return F;
        }
    });
})();

(function() {
    var core = nerdamer.getCore(),
        _ = core.PARSER;

    function F(f, g, n) {
        var c = _.functions.vector[0]();
        var fc = _.functions.vector[0]();
        var gc = _.functions.vector[0]();
        var txtv = _.functions.vector[0]();
        var fn = _.functions[f]['2'];
        var gn = _.functions[g]['2'];

        if (n == null) {
            var df = nerdamer('deg(' + fn.body + ',x)') * 1;
            var dg = nerdamer('deg(' + gn.body + ',x)') * 1;
            n = Math.max(df, dg) * 1;
        };
        c = nerdamer('coeffs(expand((' + fn.body + ')*(' + gn.body + ')),x)');
        var cc = c.symbol.elements
        fc = nerdamer('coeffs(' + fn.body + ',x)').symbol.elements;
        gc = nerdamer('coeffs(' + gn.body + ',x)').symbol.elements;
        //console.log(c);
        var txt = '<table class="trpr-table"><thead><tr><th>S</th><th>M</th>';
        for (var j = 0; j <= n; j++)
            txt += '<th>$x^{' + j + '}$</th>';
        txt += '</tr></thead>';


        txt += '<thead><tr><th>S</th><th>M</th>';
        for (var j = 0; j <= n; j++)
            txt += '<th>$' + gc[j] + '$</th>';
        txt += '</tr></thead>';
        for (var i = 0; i <= n; i++) {
            txt += '<tr><th>$x^{' + i + '}$</th><th>$' + fc[i] + '$</th>';
            for (var j = 0; j <= n; j++) {
                var pr = '';
                if ((i + j) <= n)
                    pr = '$' + nerdamer(fc[i] + '*' + gc[j]).evaluate().symbol.latex() + '$';

                txt += '<td>' + pr + '</td>';
            };
            txt += '</tr>';
        }

        txt += '</table>';
        txtv.set(0, txt)
        console.log(txt, TXT);
        return txtv;
    }
    nerdamer.register({
        name: 'drawtruncprod',
        visible: true,
        numargs: [2, 3],
        build: function() {
            return F;
        }
    });
})();
