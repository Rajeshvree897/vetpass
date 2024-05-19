$(() => {
  $.validator.addMethod("validateSpecializationName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#name'),
          data = { "name" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkSpecializationName",
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
  
  $('#specializationForm').validate({
    rules: {
      name: {
        required: true,
        validateSpecializationName: true,
        maxlength: 255,
        regexWhitespace: true
      }
    },
    messages: {
      name: {
        required: 'Specialization Name is required',
        validateSpecializationName: 'Specialization Name already exists',
        maxlength: 'Specialization Name length should not be greater than 255',
        regexWhitespace: 'Specialization Name should not contain only whitespace',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
