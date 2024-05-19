$(() => {
  $.validator.addMethod("validateBreederServiceName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#service'),
          data = { "service" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkBreederServicesName",
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
  
  $('#breedersServiceForm').validate({
    rules: {
      service: {
        required: true,
        validateBreederServiceName: true,
        maxlength: 255,
        regexWhitespace: true
      }
    },
    messages: {
      service: {
        required: 'Breeder Service Name is required',
        validateBreederServiceName: 'Breeder Service Name already exists',
        maxlength: 'Breeder Service Name length should not be greater than 255',
        regexWhitespace: 'Breeder Service Name should not contain only whitespace',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
