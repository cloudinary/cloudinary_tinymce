Cloudinary TinyMCE Plugin
=========================

Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline.

Easily upload images to the cloud. Automatically perform smart image resizing, cropping and conversion without installing any complex software. Integrate Facebook or Twitter profile image extraction in a snap, in any dimension and style to match your website’s graphics requirements. Images are seamlessly delivered through a fast CDN, and much much more.

This plugin replaces the image button of TinyMCE to allow you to add and manipulate images from Cloudinary's cloud-based media library.

## Setup

1. Install [TinyMCE's jQuery plugin](http://www.tinymce.com/wiki.php/TinyMCE3x:jQuery_Plugin)

2. Install the plugin by copying the content of cloudinaryimage to your tinymce plugin directory

3. Add cloudinaryimage to your plugins list in TinyMCE initialization, e.g.,
    ```
    tinyMCE.init({
      theme : "advanced",
      plugins : "cloudinaryimage"
    });
    ```

4. To initialize the plugin you will need to add a server side endpoint to build a signed URL. For example in Ruby on Rails:
    ```
    def cms_config
      params = {"timestamp" => Time.now.to_i.to_s, "mode"=>"tinymce"}
      Cloudinary::Utils.sign_request(params)
      render :json=>{:cloudinary_cms_url=>"https://cloudinary.com/console/media_library/cms?#{params.to_query}"}
    end
    ```

5. Use the signed URL built on the server to initialize the tinyMCE editor (textarea is the jquery element you wish to decorate), e.g.,
    ```
    $.getJSON('/cms_config', function(config) { textarea.tinymce(config); });
    ```

