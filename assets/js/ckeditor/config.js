/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
  // %REMOVE_START%
  // The configuration options below are needed when running CKEditor from source files.
  config.plugins =
    "basicstyles,blockquote,dialogui,dialog,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,resize,enterkey,entities,popup,filetools,filebrowser,floatingspace,htmlwriter,wysiwygarea,indent,indentlist,fakeobjects,link,list,magicline,maximize,pastetext,pastefromword,removeformat,showborders,sourcearea,specialchar,menubutton,scayt,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc,autolink,base64image,bt_table,panelbutton,btquicktable,justify,pastefromexcel,preview,quicktable,ckeditortablecellsselection,tableresize,image2,colorbutton,colordialog,listblock,richcombo,font,lineheight,liststyle,imageresize,imagepaste,SimpleLink,more";
  config.skin = "moono-lisa";
  // %REMOVE_END%

  // Define changes to default configuration here.
  // For complete reference see:
  // http://docs.ckeditor.com/#!/api/CKEDITOR.config

  // The toolbar groups arrangement, optimized for two toolbar rows.
  //	config.toolbarGroups = [
  //		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
  //		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
  //		{ name: 'links' },
  //		{ name: 'insert' },
  //		{ name: 'forms' },
  //		{ name: 'tools' },
  //		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
  //		{ name: 'others' },
  //		'/',
  //		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
  //		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
  //		{ name: 'styles' },
  // { name: 'colors' },
  //		{ name: 'about' }
  //	];

  // default border
  config.border = "solid 1px #e0e0e0";

  // config.font_defaultLabel = 'Tahoma';
  config.fontSize_defaultLabel = "14px";

  config.toolbar = [
    { name: "styles", items: ["Font", "FontSize", "lineheight"] },
    { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    {
      name: "paragraph",
      items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent", "-"],
    },
    {
      name: "align",
      items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
    },
    { name: "insert", items: ["Image"] },
    //  { name: 'insert', items: [ 'Image', 'Table', 'Maximize' ] },
    //                      { name: 'links', items: [ 'SimpleLink', 'Blockquote'] },
    //                      { name: 'document', items: [ 'Preview', 'Source' ] }
    { name: "more", items: ["more"] },
  ];

  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  config.removeButtons = "Subscript,Superscript";

  // Set the most common block elements.
  config.format_tags = "p;h1;h2;h3;pre";

  // Simplify the dialog windows.
  config.removeDialogTabs = "image:advanced;link:advanced";

  config.filebrowserUploadUrl = "uploadEditorImage";
  config.imageUploadUrl = "uploadEditorImage";
  //
  config.image2_alignClasses = ["image-left", "image-center", "image-right"];

  config.disallowedContent = "img{width,height,float}";
  config.extraAllowedContent = "img[width,height,align]";

  config.htmlEncodeOutput = true;
  config.allowedContent = true;
};
