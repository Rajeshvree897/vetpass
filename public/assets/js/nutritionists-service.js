$(() => {
  $.validator.addMethod("validateNutritionistServiceName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#service'),
          data = { "service" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkNutritionistServicesName",
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
  
  $('#nutritionistsServiceForm').validate({
    rules: {
      service: {
        required: true,
        validateNutritionistServiceName: true,
        maxlength: 255,
        regexWhitespace: true
      }
    },
    messages: {
      service: {
        required: 'Nutritionist Service Name is required',
        validateNutritionistServiceName: 'Nutritionist Service Name already exists',
        maxlength: 'Nutritionist Service Name length should not be greater than 255',
        regexWhitespace: 'Nutritionist Service Name should not contain only whitespace',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
