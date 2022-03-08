CKEDITOR.plugins.add( 'SimpleLink', {
    icons: 'simplelink',
    lang: 'en,ko',
    init: function( editor ) {
        editor.addCommand( 'simplelink', new CKEDITOR.dialogCommand( 'simplelinkDialog' ) );
        editor.ui.addButton( 'SimpleLink', {
            label: editor.lang.SimpleLink.title,
            icons: 'simplelink',
            command: 'simplelink'
        });

        CKEDITOR.dialog.add( 'simplelinkDialog', this.path + 'dialogs/simplelink.js' );
    }
});
