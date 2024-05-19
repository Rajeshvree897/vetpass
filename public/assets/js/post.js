$(() => {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
          var fileSize = document.getElementById("postMediaFile").files[0];
          var sizeType = fileSize?.type;
          if(sizeType?.includes("image") === false) {
            $("#post-img").replaceWith( "<video width='100%' height='180' poster='https://vetpass-1.s3.eu-west-2.amazonaws.com/uploads/IMG_20210101_WA_0006_f68252d59d.jpg' src='"+ e.target.result + "' id='post-img' autoplay controls></video>" );
          } else {
            $("#post-img").replaceWith( "<img width='100%' height='180' src='"+ e.target.result + "' id='post-img'>" );
          }
      }
      
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#postMediaFile").change(function() {
    readURL(this);
  });

  $.validator.addMethod("validatePostMediaSize", function(value, element)
  {     
        var fileSize = document.getElementById("postMediaFile").files[0];
        var sizeType = fileSize?.type;
        if(sizeType?.includes("image") === true) {
          var sizeInMb = (fileSize?.size / 1024) / 1024;
          var sizeLimit = 10;

          if (sizeInMb > sizeLimit) {
            return false;
          }

          return true;
        } else {
          return true
        }
  }, '');

  function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mp4':
    case 'mov':
    case 'mpg':
    case 'mpeg':
        // etc
        return true;
    }
    return false;
  }

  $('#postsForm').validate({
    rules: {
      privacy: {
        required: true
      },
      title: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      status: {
        required: true
      },
      postMediaFile: {
        required: $('#post-img').attr('src').includes('amazonaws') === true ? false : true,
        validatePostMediaSize: true
      }
    },
    messages: {
      privacy: {
        required: 'Privacy is required'
      },
      title: {
        required: 'Title is required',
        maxlength: 'Title length should not be greater than 255',
        regexWhitespace: 'Title should not contain only whitespace',
      },
      status: {
        required: 'Status is required'
      },
      postMediaFile: {
        required: 'Post Media File is required',
        validatePostMediaSize: "Post Media file size must be less than 10 MB"
      },
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      $(".loader").show();
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                enctype: 'multipart/form-data',
                data: new FormData(form),
                processData: false,
                contentType: false,
                success: function (data) {
                  window.location.href = "/admin/posts"
                }
            }
        );
    }
  });
  
  $("#postsForm").submit(function(e) {
    e.preventDefault(); 
  });   
});
