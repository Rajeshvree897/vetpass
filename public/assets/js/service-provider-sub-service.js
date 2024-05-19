$(() => {
    $.validator.addMethod("validateStatus", function(value, element)
    {   
        var flag = false;
        var inputElem = $('#serviceProvidersubService :input[name="service"]'),
            data = { "service" : inputElem.val(), "id": $('#id').val() || '' },
            eReport = ''; //error report
            console.log('inputElem', data)
        $.ajax(
        {
            type: "POST",
            url: "/admin/checkSubService",
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
    $('#serviceProvidersubService').validate({
      rules: {
        service: {
          required: true,
          maxlength: 255,
          regexWhitespace: true,
          validateStatus: true

        },
        main_service_id: {
          required: true
        },
        status: {
          required: true,
          // validateStatus: true
        },
        duration: {
          required: false,
        },
        description: {
          required: false,
        },
        appointment: {
          required: false,
        },
      },
      messages: {
        service: {
          required: "Service  is required",
          maxlength: ' Service length should not be greater than 255',
          regexWhitespace: 'Service should not contain only whitespace',
          validateStatus: "Sub service already exists"
        },
        main_service_id: {
          required: 'Main service  is required'
        },
        status: {
          required: 'Status is required',
          // validateStatus: 'Animal Type is already in use so you can not make it inactive'
        },
      },
      errorElement: 'span',
      errorLabelContainer: '.error',
      submitHandler: form => {
        form.submit();
      }
    });
  });
  