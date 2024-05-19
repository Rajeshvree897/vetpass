$(() => {
  // show image before upload
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#fan-page-img').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  function readBannerURL(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#fan-page-banner-img').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#fanPageImage").change(function() {
    readURL(this);
  });
  
  $("#fanPageBannerImage").change(function() {
    readBannerURL(this);
  });

  $.validator.addMethod("validateFanPageImageSize", function(value, element)
  {     
        var fileSize = document.getElementById("fanPageImage").files[0];
        var sizeInMb = (fileSize?.size / 1024) / 1024;
        var sizeLimit = 10;

        if (sizeInMb > sizeLimit) {
          return false;
        }

        return true;
  }, '');

  $.validator.addMethod("validateFanPageBannerImageSize", function(value, element)
  {     
        var fileSize = document.getElementById("fanPageBannerImage").files[0];
        var sizeInMb = (fileSize?.size / 1024) / 1024;
        var sizeLimit = 10;

        if (sizeInMb > sizeLimit) {
          return false;
        }

        return true;
  }, '');

  $.validator.addMethod(
    "regex",
    function(value, element, regexp) {
      return this.optional(element) || !regexp.test(value);
    },
  );

  $.validator.addMethod(
    "regex1",
    function(value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
  );

  $.validator.addMethod(
    "length",
    function(value) {
      var spaceCount = (value.split(" ").length - 1);
      var length = value.length;
      length = value.length - spaceCount;
      return length < 8 || length > 15 ? false : true; 
    },
  );

  $.validator.addMethod("validateFanPageName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#fanPageForm :input[name="title"]'),
          data = { "title" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkFanPageName",
          dataType: "json",
          data: data,
          success: function(data)
          {
            if(data.response) {
              flag = false;
              return false;
            }
            flag = true;
            return true;
          },
          async: false
      });
      return flag;
  }, '');

  $("#fanPageForm").validate({
    rules: {
      title: {
        required: true,
        maxlength: 255,
        regexWhitespace: true,
        validateFanPageName: true
      },
      description: {
        required: true,
        regexWhitespace: true
      },
      status: {
        required: true,
      },
      website: {
        required: true,
        regexWhitespace: true
      },
      email: {
        required: true,
        regx: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
      },
      int_code: {
        required: true,
        maxlength: 5,
      },
      mobile: {
        required: true,
        regexWhitespace: true,
        regex: /[^\s]([ ]{2,})[^\s]/,
        regex1: /^[^\s]+(\s+[^\s]+)*$/,
        mobileCheck: true,
        length: true,
      },
      fanPageImage: {
        required: $('#fan-page-img').attr('src').includes('amazonaws') === true ? false : true,
        validateFanPageImageSize: true
      },
      fanPageBannerImage: {
        required: $('#fan-page-banner-img').attr('src').includes('amazonaws') === true ? false : true,
        validateFanPageBannerImageSize: true
      }
    },
    messages: {
      title: {
        required: "Fanpage Title is required",
        maxlength: 'Fanpage Title length should not be greater than 255',
        regexWhitespace: 'Fanpage Title should not contain only whitespace',
        validateFanPageName: "Fan Page Name already exists"
      },
      description: {
        required: "Fanpage Description is required",
        regexWhitespace: 'Fanpage Description should not contain only whitespace',
      },
      status: {
        required: "Fanpage Status is required",
      },
      website: {
        required: "Fanpage Website is required",
        regexWhitespace: 'Fanpage Website should not contain only whitespace',
      },
      email: {
        required: "Fanpage Email is required",
        regx: "Please enter valid Email address",
      },
      int_code: {
        required: "Fanpage Int code is required",
        maxlength: 'Int code should not more than 5 digits'
      },
      mobile: {
        required: "Fanpage Mobile number is required",
        regexWhitespace: "Mobile number should not contain only whitespace",
        regex: "Mobile number should not contain more than one whitespace in between",
        regex1: "Mobile number should not contain whitespace at the beginning and end",
        length: "Mobile number must be between 8-15 digits",
      },
      fanPageImage: {
        required: 'Fanpage Image is required',
        validateFanPageImageSize: "Fanpage Image file size must be less than 10 MB"
      },
      fanPageBannerImage: {
        required: 'Fanpage Banner Image is required',
        validateFanPageBannerImageSize: "Fanpage Banner Image file size must be less than 10 MB"
      },
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  });
});