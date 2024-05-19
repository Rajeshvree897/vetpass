$(() => {
  $.validator.addMethod("validateWalkerServiceName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#service'),
          data = { "service" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkWalkerServicesName",
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
  
  $('#walkersServiceForm').validate({
    rules: {
      service: {
        required: true,
        validateWalkerServiceName: true,
        maxlength: 255,
        regexWhitespace: true
      }
    },
    messages: {
      service: {
        required: 'Walker Service Name is required',
        validateWalkerServiceName: 'Walker Service Name already exists',
        maxlength: 'Walker Service Name length should not be greater than 255',
        regexWhitespace: 'Walker Service Name should not contain only whitespace',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
