$(() => {
    $.validator.addMethod("validateReportReason", function(value, element)
    {   
        var flag = false;
        var inputElem = $('#reason'),
            data = { "reason" : inputElem.val(), "id": $('#id').val() || '' },
            eReport = ''; //error report
        $.ajax(
        {
            type: "POST",
            url: "/admin/checkReportReason",
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

    
    $('#reportReasonForm').validate({
      rules: {
        reason: {
          required: true,
          validateReportReason: true,
          maxlength: 255,
          regexWhitespace: true
        }
      },
      messages: {
        reason: {
          required: 'Report Reason is required',
          validateReportReason: 'Report Reason already exists',
          maxlength: 'Report Reason length should not be greater than 255',
          regexWhitespace: 'Report Reason should not contain only whitespace',
        }
      },
      errorElement: 'span',
      errorLabelContainer: '.error',
      submitHandler: form => {
        form.submit();
      }
    });
  });
  