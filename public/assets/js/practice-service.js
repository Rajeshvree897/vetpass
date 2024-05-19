$(() => {
  $.validator.addMethod("validatePracticeServiceName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#name'),
          data = { "name" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkPracticeServicesName",
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
  
  $('#practiceServiceForm').validate({
    rules: {
      name: {
        required: true,
        validatePracticeServiceName: true,
        maxlength: 255,
        regexWhitespace: true
      },
      order: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Practice Service Name is required',
        validatePracticeServiceName: 'Practice Service Name already exists',
        maxlength: 'Practice Service Name length should not be greater than 255',
        regexWhitespace: 'Practice Service Name should not contain only whitespace',
      },
      order : {
        required: 'Order is required'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
