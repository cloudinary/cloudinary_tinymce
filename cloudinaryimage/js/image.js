var CloudinaryImageDialog = {
  preInit : function() {
    tinyMCEPopup.requireLangPack();
  },

  init : function(ed) {
    var base = location.href.replace(/\/[^\/]+$/, '');
    var controller = {
      socket: new easyXDM.Socket({
        name: base + "/easyXDM.name.html",
        swf: base + "/easyxdm.swf",
        remote: tinyMCE.settings.cloudinary_cms_url,
        remoteHelper: "https://cloudinary.com/easyXDM.name.html",
        container: "cldimage",
        props: {style: {width: "100%", height: "99%"}},
        onMessage: function(message, origin){
          var json = JSON.parse(message);
          switch (json.message) {
          case "insert_into_post":
            CloudinaryImageDialog.insert_into_post(json);
            break;
          case "done": 
            CloudinaryImageDialog.close();
            break;
          }
        },
        onReady: function() {
          controller.resizeWatcher();
          el = ed.selection.getNode();
          if (el && el.nodeName == 'IMG') {
            var html = ed.selection.getContent({format : 'html'});
            controller.socket.postMessage(JSON.stringify({
              message: "edit_image",
              html: html
            }));
          }
        }
      }),
      currentWidth: 0,
      currentHeight: 0,
      resizeWatcher: function() {      
        jQuery(window).resize(CloudinaryImageDialog.update_window_dimensions);
      },
      update_window_dimensions: function() {
      }
    }; 
  },

  insert_into_post : function(args) {
    delete args.message;
    delete args.href;
    args["style"] = '';
    if (args.align && args.align != '') {
      if (args.align == 'left' || args.align == 'right')
        args["style"] = "float: " + args.align;
      else if (args.align == 'center')
        args["style"] = "display: block; margin: auto";
      else
        args["style"] = "vertical-align: " + args.align;
      delete args.align;
    }
    tinyMCEPopup.restoreSelection();
    var ed = tinyMCEPopup.editor;
    el = ed.selection.getNode();
    // Fixes crash in Safari
    if (tinymce.isWebKit) ed.getWin().focus();

     if (el && el.nodeName == 'IMG') {
       ed.dom.setAttribs(el, args);
     } else {
       tinymce.each(args, function(value, name) {
         if (value === "") {
           delete args[name];
         }
       });
       ed.execCommand('mceInsertContent', false, ed.dom.createHTML('img', args), {skip_undo : 1});
       ed.undoManager.add();
     }
     CloudinaryImageDialog.close();
  },
  
  close : function() {
    tinyMCEPopup.editor.execCommand('mceRepaint');
    tinyMCEPopup.editor.focus();
    tinyMCEPopup.close();    
  }
};
CloudinaryImageDialog.preInit();
tinyMCEPopup.onInit.add(CloudinaryImageDialog.init, CloudinaryImageDialog);
