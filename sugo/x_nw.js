lepessoronkov = 1;
strinit = "Az <div style='border:1px solid;margin:5px 0;padding:3px;'>x<sup>n</sup>w = <span class='block' style='transform: scale(1.5);'>∑</span> <sub style='vertical-align:-1.6em;margin-left:-2em;'>0&leq;k&leq;n</sub> (-1)<sup>k</sup>&nbsp;&part;_(w)<span style='margin:0 3px;font-size:130%;'>&#x29E2;</span> x<sup>n - k</sup>&nbsp;&nbsp;&nbsp;(w&in;&nbsp;&#x1d525;)</div> képletet fogjuk ellenőrizni n = 3, és w = yxyy paraméterekkel.";

lepesObj = {
    "1": { "id": "nstore", "txt": "A tár méretét <b>4</b>-re állítjuk.", "param": "4" },
    "2": { "id": "w1", "txt": "A w1 szónak <b>yxyy</b> értéket adunk", "param": "yxyy" },
    "3": { "id": "w2", "txt": "A w2 szónak <b>xxx</b> értéket adunk", "param": "xxx" },

    "4": {
        "id": {
            "name": "#cshstselecttarto input.jtoggler-radio",
            "indx": 0,
            "hl": "#cshstselecttarto .jtoggler-control"
        },
        "txt": "A műveletnek a shuffle-szorzatot választjuk"
    },
    "5": {
        "id": {
            "name": "#setwform",
            "indx": 0,
            "hl": "table#regtbl.table-hideable tbody tr td.hide-column0",
        },
        "txt": "A kimenet képleteit <b>xxyy...</b> formára állítjuk és a táblázat első oszlopát bezárjuk."
    },
    "6": { "id": "dw1inv", "txt": "Kipipáljuk a derivált &part;_ inverz transzfolmátját." },
    "7": { "id": "dw1fakte", "txt": "A &part;_ inverz deriváltakat váltakozó elójellel, és faktoriálissal osztva számítjuk." },
    "8": { "id": "storeinbtn", "txt": "A kimenetet bevisszük a tárba" },
    "9": { "id": "regtbl.table-hideable tbody tr td.hide-column0", "txt": "A táblázat első oszlopát kinyitjuk." },
    "10": { "id": "w2", "txt": "A w1 szónak <b>xx</b> értéket adunk", "param": "xx" },
    "11": { "id": "dw1fok", "txt": "A derivált fokát <b>1</b>-re növeljük.", "param": "1" },
    "12": { "id": "storeinbtn", "txt": "A kimenetet bevisszük a tárba" },
    "13": { "id": "w2", "txt": "A w1 szónak <b>x</b> értéket adunk", "param": "x" },
    "14": { "id": "dw1fok", "txt": "A derivált fokát <b>2</b>-re növeljük.", "param": "2" },
    "15": { "id": "storeinbtn", "txt": "A kimenetet bevisszük a tárba" },
    "16": { "id": "w2", "txt": "A w1 szónak <b>üres</b> értéket adunk", "param": "" },
    "17": { "id": "dw1fok", "txt": "A derivált fokát <b>3</b>-ra növeljük.", "param": "3" },
    "18": { "id": "storeinbtn", "txt": "A kimenetet bevisszük a tárba" },
    "19": { "id": "storetglbtn", "txt": "Megnyitjuk a tárat" },
    "20": {
        "id": "lastprev",
        "txt": "Megnézzük a tagok összegét.",
        "inline": "start"
    },
    "21": { "id": "storetglbtn", "txt": "Bezárjuk a tárat" },
};
sugolepes = Object.keys(lepesObj).length;
document.getElementById("blepesall").innerHTML = "/ " + sugolepes;

//<span style='font-size:22px;margin-left:5px;'>⧢</span><span id='cshstselecttarto' class=''><div class='jtoggler-wrapper jtoggler-wrapper-multistate'><input id='cshstselect' type='checkbox' style='vertical-align:baseline' class='jtoggler jqtoggler-inited' data-jtmulti-state=''><div class='jtoggler-control is-fully-active'><label class='jtoggler-btn-wrapper is-active'><input type='radio' name='options' class='jtoggler-radio'></label><label class='jtoggler-btn-wrapper'><input type='radio' name='options' class='jtoggler-radio'></label><label class='jtoggler-btn-wrapper'><input type='radio' name='options' class='jtoggler-radio'></label><div class='jtoggler-handle'></div></div></div></span><span style='margin-right:7px;font-size:120%;'>∗</span>
