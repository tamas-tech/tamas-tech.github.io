/**
 * jQuery plugin for tabs
 */
/* define $ as jQuery just in case */
(function ($) {
	/* tabs - my custom plugin */
	$.fn.tabs = function () {
		/* set vars */
		var tab_group = this;
		var tab_controls = tab_group.find('.control');
		var active_tabs = tab_group.find('.control.active');
		var tab_targets = tab_group.find('.target');
		var active_tab = active_tabs.first().length > 0 ? active_tabs.first() : tab_group.find('.tab_control:eq(0)');
		var target_index = active_tab.index();
		var target_el = tab_group.find('.target:eq(' + target_index + ')');

		/* set the css */
		tab_group.hide();
		//$(window).load(function () {
			/* grab the active tab and hide all other tabs */
			tab_controls.removeClass('active');
			active_tab.addClass('active');
			tab_targets.hide();
			target_el.show();

			/* show the tabs when everything is loaded */
			tab_group.show();
		//});

		/* tab click */
		tab_group.on('click', '.control', function (e) {
			/* set active class on the clicked tab */
			tab_controls.removeClass('active');
			$(this).addClass('active');

			/* grab the target tab and show it */
			var target_index = $(this).index();
			var target_el = tab_group.find('.target:eq(' + target_index + ')');
			tab_targets.hide();
			target_el.show();
			e.preventDefault();
		});
	}
})(jQuery);
