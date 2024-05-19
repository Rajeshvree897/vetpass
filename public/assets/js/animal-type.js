$(() => {
  // show image before upload
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#animal-type-img').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#icon").change(function() {
    readURL(this);
  });
  $.validator.addMethod("validateStatus", function(value, element)
  {   
      var flag = false;
      if($("#status").val() === "true") {
        return true;
      }
      const data = { "id": $('#id').val() || '' };
      $.ajax(
      {
          type: "POST",
          url: "/admin/animalType/validateStatus",
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
  $('#typeForm').validate({
    rules: {
      type: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      category: {
        required: true
      },
      status: {
        required: true,
        // validateStatus: true
      },
    },
    messages: {
      type: {
        required: "Animal Type is required",
        maxlength: 'Animal Type length should not be greater than 255',
        regexWhitespace: 'Animal Type should not contain only whitespace',
      },
      category: {
        required: 'Animal Category is required'
      },
      status: {
        required: 'Animal Type Status is required',
        // validateStatus: 'Animal Type is already in use so you can not make it inactive'
      },
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
