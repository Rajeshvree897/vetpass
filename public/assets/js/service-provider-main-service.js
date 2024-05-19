$(() => {
    $.validator.addMethod("validateStatus", function(value, element)
    {   
        var flag = false;
        if($("#status").val() === "true") {
          return true;
        }
        const data = { "id": $('#id').val() || '' };
        $.ajax(
        {
            type: "POST",
            url: "/admin/mainService/validateStatus",
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
    $.validator.addMethod("validateStatus", function(value, element)
    {   
        var flag = false;
        var inputElem = $('#serviceProviderMainService :input[name="service"]'),
            data = { "service" : inputElem.val(), "id": $('#id').val() || '' },
            eReport = ''; //error report
            console.log('inputElem', data)
        $.ajax(
        {
            type: "POST",
            url: "/admin/checkService",
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

    $("#serviceProviderMainService").validate({
      rules: {
        service: {
          required: true,
          maxlength: 255,
          regexWhitespace: true,
          validateStatus: true
        },
        status: {
          required: true,
          // validateStatus: true
        }
      },
      messages: {
        service: {
          required: 'Main service is required',
          maxlength: 'Service length should not be greater than 255',
          regexWhitespace: 'Service should not contain only whitespace',
          validateStatus: "service already exists"
        },
        status: {
          required: 'service Status is required',
          // validateStatus: 'Animal Catergory is already in use so you can not make it inactive'
        },
      },
      errorElement: "span",
      errorLabelContainer: ".error",
      submitHandler: (form) => {
        form.submit()
      },
    })
  })
  