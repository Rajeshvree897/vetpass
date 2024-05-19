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
          url: "/admin/checkClassificationTitle",
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
        required: 'Classification Title is required',
        validateClassificationTitle: 'Classification Title already exists',
        maxlength: 'Classification Title length should not be greater than 255',
        regexWhitespace: 'Classification Title should not contain only whitespace',
      },
      description: {
        required: 'Description is required',
        regexWhitespace: 'Description should not contain only whitespace',
      },
      order : {
        required: 'Classification Order is required'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
