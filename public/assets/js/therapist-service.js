$(() => {
  $.validator.addMethod("validateTherapistServiceName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#service'),
          data = { "service" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkTherapistServicesName",
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
  
  $('#therapistsServiceForm').validate({
    rules: {
      service: {
        required: true,
        validateTherapistServiceName: true,
        maxlength: 255,
        regexWhitespace: true
      }
    },
    messages: {
      service: {
        required: 'Therapist Service Name is required',
        validateTherapistServiceName: 'Therapist Service Name already exists',
        maxlength: 'Therapist Service Name length should not be greater than 255',
        regexWhitespace: 'Therapist Service Name should not contain only whitespace',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
