$(() => {
    $.validator.addMethod("validateSymptomsHowLong", function(value, element)
    {   
        var flag = false;
        var inputElem = $('#name'),
            data = { "name" : inputElem.val(), "id": $('#id').val() || '' },
            eReport = ''; //error report
        $.ajax(
        {
            type: "POST",
            url: "/admin/checkSymptomsHowLong",
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

    
    $('#symptomsHowLongForm').validate({
      rules: {
        name: {
          required: true,
          validateSymptomsHowLong: true,
          maxlength: 255,
          regexWhitespace: true
        }
      },
      messages: {
        name: {
          required: 'Symptom Duration is required',
          validateSymptomsHowLong: 'Symptom Duration already exists',
          maxlength: 'Symptom Duration length should not be greater than 255',
          regexWhitespace: 'Symptom Duration should not contain only whitespace',
        }
      },
      errorElement: 'span',
      errorLabelContainer: '.error',
      submitHandler: form => {
        form.submit();
      }
    });
  });
  