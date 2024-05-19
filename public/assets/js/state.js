$(() => {
  // $.validator.addMethod("validateCountryName", function(value, element)
  // {   
  //     var flag = false;
  //     var inputElem = $('#country'),
  //         data = { "country" : inputElem.val(), "id": $('#id').val() || '' },
  //         eReport = ''; //error report
  //     $.ajax(
  //     {
  //         type: "POST",
  //         url: "/admin/checkCountryName",
  //         dataType: "json",
  //         data: data,
  //         success: function(data)
  //         {
  //           if(data.response) {
  //             flag = false;
  //             return false;
  //           }
  //           flag = true;
  //           return true;
  //         },
  //         async: false
  //     });
  //     return flag;
  // }, '');

  $('#stateForm').validate({
    rules: {
      state: {
        required: true,
        // validateCountryName: true,
        maxlength: 255,
        regexWhitespace: true
      },
      country: {
        required: true,
      }
    },
    messages: {
      state: {
        required: 'State Name is required',
        // validateCountryName: 'State Name already exists',
        maxlength: 'State Name length should not be greater than 255',
        regexWhitespace: 'State Name should not contain only whitespace',
      },
      country: {
        required: "Country is required",
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      console.log(new FormData(form))
      form.submit();
    }
  });
});
