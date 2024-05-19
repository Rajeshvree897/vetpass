$(() => {
  $.validator.addMethod("validateClassificationTitle", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#title'),
          data = { "title" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkStoreClassificationTitle",
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
  
  $('#classificationForm').validate({
    rules: {
      title: {
        required: true,
        validateClassificationTitle: true,
        maxlength: 255,
        regexWhitespace: true,
      },
      description: {
        required: true,
        regexWhitespace: true
      },
      order: {
        required: true,
      }
    },
    messages: {
      title: {
        required: 'Store Classification Title is required',
        validateClassificationTitle: 'Store Classification Title already exists',
        maxlength: 'Store Classification Title length should not be greater than 255',
        regexWhitespace: 'Store Classification Title should not contain only whitespace',
      },
      description: {
        required: 'Store Classification Description is required',
        regexWhitespace: 'Store Classification Description should not contain only whitespace',
      },
      order: {
        required: 'Store Classification Order is required',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
