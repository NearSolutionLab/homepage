/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @fileOverview Preview plugin.
 */

( function() {
	var pluginPath;
	var onMore = false;

	var moreCmd = { modes: { wysiwyg: 1, source: 1 },
		canUndo: false,
		readOnly: 1,
		exec: function( editor ) {
		    var ckeToolbars = $(editor.element.$).next().find('.cke_top .cke_toolbar');
        if (ckeToolbars.length<3) {
            return;
        }
        var moreIcon = $(editor.element.$).next().find('.cke_button__more_icon');
        var iconStyle = moreIcon.attr('style');
		    if (onMore) {
            $(ckeToolbars[ckeToolbars.length-3]).hide();
            $(ckeToolbars[ckeToolbars.length-2]).hide();
            moreIcon.attr('style', iconStyle.replace('closed.png', 'more.png'))
            moreIcon.parent().attr('title', 'more');
            moreIcon.next().text('more');
		    } else {
            $(ckeToolbars[ckeToolbars.length-3]).show();
            $(ckeToolbars[ckeToolbars.length-2]).show();
            moreIcon.attr('style', iconStyle.replace('more.png', 'closed.png'))
            moreIcon.parent().attr('title', 'close');
            moreIcon.next().text('close');
		    }
		    onMore = !onMore;
		}
	};

	var pluginName = 'more';

	// Register a plugin named "preview".
	CKEDITOR.plugins.add( pluginName, {
		// jscs:disable maximumLineLength
		lang: 'af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
		// jscs:enable maximumLineLength
		icons: 'more,closed', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%
		init: function( editor ) {

			// Preview is not used for the inline creator.
			if ( editor.elementMode == CKEDITOR.ELEMENT_MODE_INLINE )
				return;

			pluginPath = this.path;

			editor.addCommand( pluginName, moreCmd );
			editor.ui.addButton && editor.ui.addButton( 'more', {
				label: 'more',
				command: pluginName,
				toolbar: 'more,39'
			} );

			editor.on('loaded', function(evt){
			    var editor = evt.editor;
			    var ckeToolbars = $(editor.element.$).next().find('.cke_top .cke_toolbar');
          if (ckeToolbars.length>3) {
              $(ckeToolbars[ckeToolbars.length-3]).hide();
              $(ckeToolbars[ckeToolbars.length-2]).hide();
          }
			});

		}
	} );
} )();

/**
 * Event fired when executing `preview` command, which allows additional data manipulation.
 * With this event, the raw HTML content of the preview window to be displayed can be altered
 * or modified.
 *
 * @event contentPreview
 * @member CKEDITOR
 * @param {CKEDITOR.editor} editor This editor instance.
 * @param data
 * @param {String} data.dataValue The data that will go to the preview.
 */
