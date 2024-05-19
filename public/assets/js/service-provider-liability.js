$(() => {
    $.validator.addMethod("validateServiceProviderLiabilityName", function(value, element)
    {   
        var flag = false;
        var inputElem = $('#name'),
            data = { "name" : inputElem.val(), "id": $('#id').val() || '' },
            eReport = ''; //error report
        $.ajax(
        {
            type: "POST",
            url: "/admin/checkServiceProviderLiabilitiesName",
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
    
    $('#serviceProviderrLiabilityForm').validate({
      rules: {
        name: {
          required: true,
          validateServiceProviderLiabilityName: true,
          maxlength: 255,
          regexWhitespace: true
        }
      },
      messages: {
        name: {
          required: 'Service Provider Liability Name is required',
          validateServiceProviderLiabilityName: 'Service Provider Liability Name already exists',
          maxlength: 'Service Provider Liability Name length should not be greater than 255',
          regexWhitespace: 'Service Provider Liability Name should not contain only whitespace',
        }
      },
      errorElement: 'span',
      errorLabelContainer: '.error',
      submitHandler: form => {
        form.submit();
      }
    });
  });
  