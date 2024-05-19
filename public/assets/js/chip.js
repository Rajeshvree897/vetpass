$(() => {
  $.validator.addMethod("validateChipName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#name'),
          data = { "name" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkChipName",
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

  $.validator.addMethod("validateSortID", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#sort_id'),
          data = { "sort_id" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkChipSortID",
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
  
  $('#chipForm').validate({
    rules: {
      name: {
        required: true,
        validateChipName: true,
        maxlength: 255,
        regexWhitespace: true
      },
      sort_id: {
        required: true,
        // validateSortID: true
      }
    },
    messages: {
      name: {
        required: 'Chip Name is required',
        validateChipName: 'Chip Name already exists',
        maxlength: 'Chip Name length should not be greater than 255',
        regexWhitespace: 'Chip Name should not contain only whitespace',
      },
      sort_id: {
        required: 'Sort ID is required',
        // validateSortID: 'Sort ID already exists',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
