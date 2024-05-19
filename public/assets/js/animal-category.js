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
          url: "/admin/animalCategory/validateStatus",
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

  $("#animalCategoriesForm").validate({
    rules: {
      category: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      status: {
        required: true,
        // validateStatus: true
      },
      order: {
        required: true,
      }
    },
    messages: {
      category: {
        required: 'Animal Catergory is required',
        maxlength: 'Animal Catergory length should not be greater than 255',
        regexWhitespace: 'Animal Catergory should not contain only whitespace'
      },
      status: {
        required: 'Animal Catergory Status is required',
        // validateStatus: 'Animal Catergory is already in use so you can not make it inactive'
      },
      order : {
        required: 'Animal Catergory Order is required'
      }
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  })
})
