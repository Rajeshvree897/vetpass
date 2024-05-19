$(() => {
    $.validator.addMethod("validatePetServiceName", function(value, element)
    {   
        var flag = false;
        var inputElem = $('#name'),
            data = { "name" : inputElem.val(), "id": $('#id').val() || '' },
            eReport = ''; //error report
        $.ajax(
        {
            type: "POST",
            url: "/admin/checkPetServicesName",
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
    
    $('#petServiceForm').validate({
      rules: {
        name: {
          required: true,
          validatePetServiceName: true,
          maxlength: 255,
          regexWhitespace: true
        },
        order: {
          required: true
        }
      },
      messages: {
        name: {
          required: 'Pet Service Name is required',
          validatePetServiceName: 'Pet Service Name already exists',
          maxlength: 'Pet Service Name length should not be greater than 255',
          regexWhitespace: 'Pet Service Name should not contain only whitespace',
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
  