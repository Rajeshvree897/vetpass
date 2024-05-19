$(() => {

  $('.choose-profile-forum').imageUploader({
    extensions: ['.jpg', '.png', '.gif', '.pdf'],
    mimes: ['image/jpeg','image/png','image/gif', 'application/pdf'],
    maxSize: 10485760,
    maxFiles: 3,
    label:'Drag & Drop files here or click to browse',
    imagesInputName: 'newForumImages',
    preloaded: preloadedImages,
    preloadedInputName: 'oldForumFiles'
  })

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
          $('#forum-img').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]); // convert to base64 string
      }
    }

    $.validator.addMethod("validateForumImageSize", function(value, element)
    {     
        var fileSize = document.getElementById("forumImage").files[0];
        var sizeInMb = (fileSize?.size / 1024) / 1024;
        var sizeLimit = 10;

        if (sizeInMb > sizeLimit) {
          return false;
        }

        return true;
    }, '');

    $("#forumImage").change(function() {
      readURL(this);
    });
    
    $("#forumsForm").validate({
      rules: {
        question: {
          required: true,
          maxlength: 255,
          regexWhitespace: true
        },
        category: {
          required: true,
          regexWhitespace: true
        },
        status: {
          required: true,
        },
        privacy: {
          required: true,
        },
        forumImage: {
          validateForumImageSize: true
        },
        userId: {
          required: {
            depends:function() {
              let privacy = $("#privacy").val();
              if(typeof privacy === 'string' && privacy === "Private" && $("#userList li").length === 0) {
                return true
              }
              return false;
            }
          },
        },
      },
      messages: {
        question: {
          required: 'Forum Question is required',
          maxlength: 'Forum Question length should not be greater than 255',
          regexWhitespace: 'Forum Question should not contain only whitespace',
        },
        category: {
          required: 'Forum Category is required',
          regexWhitespace: 'Forum Category should not contain only whitespace',
        },
        status: {
          required: 'Forum Status is required',
        },
        privacy: {
          required: 'Forum Privacy is required',
        },
        forumImage: {
          validateForumImageSize: "Forum Image File size must be less than 10 MB"
        },
        userId: {
          required: 'Forum Vet_User is required',
        },
      },
      errorElement: "span",
      errorLabelContainer: ".error",
      submitHandler: (form) => {
        $(".loader").show();
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                enctype: 'multipart/form-data',
                data: new FormData(form),
                processData: false,
                contentType: false,
                success: function (data) {
                  window.location.href = "/admin/forums"
                }
            }
        );
    }
  });
  
  $("#forumsForm").submit(function(e) {
    e.preventDefault(); 
  });   
});
  