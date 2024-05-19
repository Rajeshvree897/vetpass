$(() => {
  $.validator.addMethod("validatePractitionerLiabilityName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#name'),
          data = { "name" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkPractitionerLiabilitiesName",
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
  
  $('#practitionerLiabilityForm').validate({
    rules: {
      name: {
        required: true,
        validatePractitionerLiabilityName: true,
        maxlength: 255,
        regexWhitespace: true
      }
    },
    messages: {
      name: {
        required: 'Practitioner Liability Name is required',
        validatePractitionerLiabilityName: 'Practitioner Liability Name already exists',
        maxlength: 'Practitioner Liability Name length should not be greater than 255',
        regexWhitespace: 'Practitioner Liability Name should not contain only whitespace',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
