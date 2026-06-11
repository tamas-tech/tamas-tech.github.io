/*
 *  Project: Long Press
 *  Description: Pops a list of alternate characters when a key is long-pressed
 *  Author: Quentin Thiaucourt, http://toki-woki.net
 *	Licence: MIT License http://opensource.org/licenses/mit-license.php
 */;(function (factory) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module depending on jQuery.
		define(["jquery"], factory , window);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		module.exports = factory(require("jquery"),window);
	} else {
		// No AMD. Register plugin with global jQuery object.
		factory(jQuery,window);
	}
})(function ($, window, undefined) {
    
    var pluginName = 'longPress',
        document = window.document,
        defaults = {/*
	        propertyName: "value"
        */};

	var moreChars={
		// extended latin (and african latin)
		// upper
		'A':'ĀĂÀÁÂÃÄÅĄⱭ∀Æ',
		'B':'Ɓ',
		'C':'ÇĆĈĊČƆ',
		'D':'ÐĎĐḎƊ',
		'E':'ÈÉÊËĒĖĘẸĚƏÆƎƐ€',
		'F':'ƑƩ',
		'G':'ĜĞĠĢƢ',
		'H':'ĤĦ',
		'I':'ÌÍÎÏĪĮỊİIƗĲ',
		'J':'ĴĲ',
		'K':'ĶƘ',
		'L':'ĹĻĽŁΛ',
		'N':'ÑŃŅŇŊƝ₦',
		'O':'ÒÓÔÕÖŌØŐŒƠƟ',
		'P':'Ƥ¶',
		'R':'ŔŘɌⱤ',
		'S':'ßſŚŜŞṢŠÞ§',
		'T':'ŢŤṮƬƮ',
		'U':'ÙÚÛÜŪŬŮŰŲɄƯƱ',
		'V':'Ʋ',
		'W':'ŴẄΩ',
		'Y':'ÝŶŸƔƳ',
		'Z':'ŹŻŽƵƷẔ',
		
		// lower
		//'a':'āăàáâãäåąɑæαª',
		'a':['asd_','Bbbfg_'],
		'b':'ßβɓ',
		'c':'çςćĉċč¢ɔ',
		'd':'ðďđɖḏɖɗ',
		'e':'èéêëēėęẹěəæεɛ€',
		'f':'ƒʃƭ',
		'g':'ĝğġģɠƣ',
		'h':'ĥħɦẖ',
		'i':'ìíîïīįịiiɨĳι',
		'j':'ĵɟĳ',
		'k':'ķƙ',
		'l':'ĺļľłλ',
		'n':'ñńņňŋɲ',
		'o':'òóôõöōøőœơɵ°',
		'p':'ƥ¶',
		'r':'ŕřɍɽ',
		's':'ßſśŝşṣšþ§',
		't':'ţťṯƭʈ',
		'u':'ùúûüūŭůűųưμυʉʊ',
		'v':'ʋ',
		'w':'ŵẅω',
		'y':'ýŷÿɣyƴ',
		//'z':'źżžƶẕʒƹ',
		'z' : ['\u{25b6}','<<>>','§§','§§§§','[]','$$','$$$$','$<<>>$','$$<<>>$$'],

		// Misc
		'$':'£¥€₩₨₳Ƀ₹¤',
		'!':'¡‼‽',
		'?':'¿‽',
		'%':'‰',
		'.':'…••',
		'-':'±‐–—',
		'+':'±†‡',
		'\'':'′″‴‘’‚‛',
		'"':'“”„‟',
		'<':'≤‹',
		'>':'≥›',
		'=':'≈≠≡'
		
	};
	var ignoredKeys=[8, 13, 37, 38, 39, 40];
	var kozepre=['z'];

	var selectedCharIndex;
	var lastWhich;
	var timer;
	var activeElement;
	//sajat: add
	var kezd;

	var popup=$('<ul class=long-press-popup />');

	$(window).mousewheel(onWheel);
	$(window).keyup(onKeyUp);

	function onKeyDown(e) {

		// Arrow key with popup visible
		if ($('.long-press-popup').length>0 && (e.which==37 || e.which==39)) {
			if (e.which==37) activePreviousLetter();
			else if (e.which==39) activateNextLetter();

			e.preventDefault();
			return;
		}

		if (ignoredKeys.indexOf(e.which)>-1) return;
		activeElement=e.target;

		if (e.which==lastWhich) {
			e.preventDefault();
			if (!timer) timer=setTimeout(onTimer, 10);
			return;
		}
		lastWhich=e.which;
	}
	function onKeyUp(e) {
		if (ignoredKeys.indexOf(e.which)>-1) return;
		if (activeElement==null) return;

		lastWhich=null;
		clearTimeout(timer);
		timer=null;

		hidePopup();
	}
	function onTimer() {
		var typedChar=$(activeElement).val().split('')[getCaretPosition(activeElement)-1];

		if (moreChars[typedChar]) {
			showPopup((moreChars[typedChar]),typedChar);   //sajat: add ,typedChar
		} else {
			hidePopup();
		}
	}
	function showPopup(chars,typedChar) {         //sajat: add ,typedChar
		//sajat
		if(autoTributeC.isActive)
			autoTributeC.hideMenu();
		popup.empty();
		var letter;
		for (var i=0; i<chars.length; i++) {
			letter=$('<li class=long-press-letter />').text(chars[i]);
			letter.mouseenter(activateLetter);
			letter.click(function(){return updateChar(typedChar)}); // sajat: add row
			popup.append(letter);
		}
		if (window.matchMedia("(max-width: 700px)").matches) 
			$('body').append(popup);
		else 
			$('#usersorc').append(popup);
		selectedCharIndex=-1;
		kezd = 1;   		// sajat
	}
	function activateLetter(e) {
		selectCharIndex($(e.target).index());
	}
	function activateRelativeLetter(i) {
		selectCharIndex(($('.long-press-letter').length+selectedCharIndex+i) % $('.long-press-letter').length);
	}
	function activateNextLetter() {
		activateRelativeLetter(1);
	}
	function activePreviousLetter() {
		activateRelativeLetter(-1);
	}
	function hidePopup() {
		popup.detach();
	}
	function onWheel(e, delta, deltaX, deltaY) {
		if ($('.long-press-popup').length==0) return;
		e.preventDefault();
		delta<0 ? activateNextLetter() : activePreviousLetter();
	}
	function selectCharIndex(i) {
		$('.long-press-letter.selected').removeClass('selected');
		$('.long-press-letter').eq(i).addClass('selected');
		selectedCharIndex=i;
		//sajat: comment --> :158
		//updateChar();
	}

	function updateChar(typedChar) { 		//sajat: add typedChar argument
		var newChar=$('.long-press-letter.selected').text();
		//sajat:
		var v = 0;
		if(kozepre.includes(typedChar))
			v = newChar.length/2;
		var pos=getCaretPosition(activeElement);
		var arVal=$(activeElement).val().split('');
		//sajat: arVal[pos-1] --> arVal[pos-kezd];
		arVal[pos-kezd]=newChar;
		$(activeElement).val(arVal.join(''));
		// sajat, add :+newChar.length-kezd
		setCaretPosition(activeElement, pos + newChar.length - kezd - v);
		kezd=0;		// sajat
	}

    function LongPress( element, options ) {

        this.element = element;
		this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

	LongPress.prototype = {

		init: function () {
			$(this.element).keydown(onKeyDown);
        }

	};

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new LongPress( this, options ));
            }
        });
    };

});
