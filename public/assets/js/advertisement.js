$(() => {
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
          $('#advertisement-img').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]); // convert to base64 string
      }
    }

    $.validator.addMethod("validateAdvertisementImageSize", function(value, element)
    {     
        var fileSize = document.getElementById("advertisementImage").files[0];
        var sizeInMb = (fileSize?.size / 1024) / 1024;
        var sizeLimit = 10;

        if (sizeInMb > sizeLimit) {
          return false;
        }

        return true;
    }, '');

    $("#advertisementImage").change(function() {
      readURL(this);
    });
    
    $("#forumsForm").validate({
      rules: {
        text: {
          required: true,
          maxlength: 255,
          regexWhitespace: true
        },
        user_id: {
          required: true,
        },
        advertisementImage: {
          required: $('#advertisement-img').attr('src').includes('amazonaws') === true ? false : true,
          validateAdvertisementImageSize: true
        },
        userId: {
          required: true
        },
        website: {
          required: true,
          regx: /\bhttps?:\/\/(?:(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)(?:\/[+~%\/.\w_-]*\??(?:[-+=&;%@.\w_]*)#?[.!\/\\\w]*)?/
          // regx: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
        },
        country: {
          required: true
        },
        state: {
          required: $('#country').val() ? true : false
        }
      },
      messages: {
        text: {
          required: 'Advertisement Text is required',
          maxlength: 'Advertisement Text length should not be greater than 255',
          regexWhitespace: 'Advertisement Text should not contain only whitespace',
        },
        user_id: {
          required: 'Service provider is required',
        },
        advertisementImage: {
          required: 'Advertisement Image is required',
          validateAdvertisementImageSize: "Advertisement Image File size must be less than 10 MB"
        },
        website: {
          required: 'Website is required',
          regx: 'Invalid website URL (It should have the prefix https:// or http://)'
        },
        country: {
          required: 'Country is required',
        },
        state: {
          required: 'State is required',
        }
      },
      errorElement: "span",
      errorLabelContainer: ".error",
      submitHandler: (form) => {
        console.log(">> 2", $(form).attr('action'));
        $(".loader").show();
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                enctype: 'multipart/form-data',
                data: new FormData(form),
                processData: false,
                contentType: false,
                success: function (data) {
                  console.log(data.url);
                  const url = data.url || "/admin/advertisements";
                  // if (url == "/admin/advertisements") {
                  //   window.alert("Advertisement is updated successfully")
                  // }
                  window.location.href = url
                }
            }
        );
    }
  });
  
  $("#forumsForm").submit(function(e) {
    e.preventDefault(); 
  });   
});
  