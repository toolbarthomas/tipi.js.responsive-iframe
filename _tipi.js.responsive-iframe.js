/*
	Tipi Component - Responsive iFrame

	Created by: toolbarthomas
	Build: 17.03.16
*/

function setResponsiveIframe(origin, filter) {
	if(typeof origin === 'undefined') {
		origin = $('body');
	}

	if(origin.length > 0) {
		var iframe;
		iframe = origin.find('iframe');

		if(typeof filter === 'string') {
			iframe = iframe.filter(filter);
		}

		if(iframe.length > 0) {
			iframe.on({
				'tipi.ui.responsiveIframe.resize' : function(event, iframe) {
					resizeResponsiveIframe(iframe);
				}
			});

			iframe.each(function() {
				var iframeEach = $(this);
				iframeEach.trigger('tipi.ui.responsiveIframe.resize', [iframeEach]);
			});

			var updateEvent;
			$(window).on({
				resize : function() {
					clearTimeout(updateEvent);
					updateEvent = setTimeout(function() {
						iframe.trigger('tipi.ui.responsiveIframe.resize', [iframe]);
					}, 100);
				}
			});
		}
	}
}

function resizeResponsiveIframe(iframe) {
	if(typeof iframe != 'undefined') {
		iframe.each(function() {
			var iframe = $(this);
			var iframeParent = iframe.parent();
			var iframeParent_width = iframeParent.width();
			var iframeParent_Height = iframeParent.height();

			var iframe_width = iframe.outerWidth();
			var iframe_height = iframe.outerHeight();

			var ratio = (100 / iframe_width) * iframe_height / 100;
			var iframe_heightNew = iframeParent_width * ratio;

			var width = '';
			var height = '';
			if(iframe_heightNew > 0) {
				if (typeof iframe.attr('data-responsive-iframe-fit') !== 'undefined') {
					if(iframe_heightNew > iframeParent_Height) {
						console.log('groter');
						height = iframeParent_Height;
						width = 100 * iframeParent_Height / (ratio * 100);


					} else {
						width = iframeParent_width;
						height = iframe_heightNew;
					}
				} else {
					width = iframeParent_width;
					height = iframe_heightNew;
				}
			}

			iframe.css({
				width: width,
				height: height
			});
		});
	}
}