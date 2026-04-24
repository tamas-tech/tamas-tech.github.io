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
            /*  nerdamer.setVar('v', j);
             s[valt] = nerdamer.getVar('v'); */
            s[valt] = j;
            var v1 = nerdamer(expr, s).evaluate();
            vec.set(j - m, v1);
        }
        console.log(vec)
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

//$seq\\left(2\\cdot u+\\frac{3}{u+9},4,9\\right)$

/* function Szamtani(a, d, n, m) {
    var v = nerdamer.getCore().PARSER.functions.szamtani[0](a, d, m, n)
    return v;
} */
/* (function() {
          var core = nerdamer.getCore();
          nerdamer.register({
              name: 'D',
              visible: true,
              numargs: 2,
              build: function() {
                  return core.Solve.solve;
              }
          })
      })();
      (function() {
          var core = nerdamer.getCore();
          var _ = core.PARSER;

          function f(a, b) {
              return core.Algebra.Simplify.ratSimp(D(a.clone(), b.clone()));
          }
          //register the function with nerdamer
          nerdamer.register({
              name: 'DD',
              numargs: 2,
              visible: true,
              build: function() {
                  return f;
              }
          });
      })();
      */