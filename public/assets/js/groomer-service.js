$(() => {
  $.validator.addMethod("validateGroomerServiceName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#service'),
          data = { "service" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkGroomerServicesName",
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
  
  $('#groomersServiceForm').validate({
    rules: {
      service: {
        required: true,
        validateGroomerServiceName: true,
        maxlength: 255,
        regexWhitespace: true
      }
    },
    messages: {
      service: {
        required: 'Groomer Service Name is required',
        validateGroomerServiceName: 'Groomer Service Name already exists',
        maxlength: 'Groomer Service Name length should not be greater than 255',
        regexWhitespace: 'Groomer Service Name should not contain only whitespace',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
