(function() {
	tinymce.create('tinymce.plugins.CloudinaryImagePlugin', {
		init : function(ed, url) {
			ed.addCommand('mceCldImage', function() {
				if (ed.dom.getAttrib(ed.selection.getNode(), 'class', '').indexOf('mceItem') != -1)
					return;
				ed.windowManager.open({
					file : url + '/image.htm',
					width : 1000 + parseInt(ed.getLang('cloudinaryimage.delta_width', 0)),
					height : 620 + parseInt(ed.getLang('cloudinaryimage.delta_height', 0))
				}, { plugin_url : url });
			});

			ed.addButton('image', { title : 'cloudinaryimage.image_desc', cmd : 'mceCldImage' });
		},
		getInfo : function() {
			return {
				longname : 'Cloudinary image',
				author : 'Cloudinary Ltd.',
				authorurl : 'http://cloudinary.com',
				version : '1.0'
			};
		}
	});
	tinymce.PluginManager.add('cloudinaryimage', tinymce.plugins.CloudinaryImagePlugin);
})();
