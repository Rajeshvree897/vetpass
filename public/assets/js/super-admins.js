$(function () { 
    $.validator.addMethod(
    "regex",
    function(value, element, regexp) {
      return this.optional(element) || !regexp.test(value);
    },
  );

  $.validator.addMethod("validateUserEmail", function(value, element) {   
    var flag = false;
    var inputElem = $('#usersForm :input[name="email"]');
    var data = { "email": inputElem.val(), "id": $('#id').val() || '' };
    $.ajax({
        type: "POST",
        url: "/admin/checkAdminUserEmail",
        dataType: "json",
        data: data,
        success: function(data)
        {
          flag = data.response ? false : true;
          return true;
        },
        async: false
    });
  
    return flag;
  }, '');

  $("#usersForm").validate({   
    rules: {
      email: {
        required: true,
        regx: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        validateUserEmail: true
      },
      firstname: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      lastname: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      } 
    },
    messages: {
      email: {
        required: "Email is required",
        regx: "Please enter valid Email address",
        validateUserEmail: "Email already exists"
      },
      firstname: {
        required: "First name is required",
        maxlength: 'First name length should not be greater than 255',
        regexWhitespace: 'First name should not contain only whitespace',
      },
      lastname: {
        required: "Last name is required",
        maxlength: 'Last name length should not be greater than 255',
        regexWhitespace: 'Last name should not contain only whitespace',
      },
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  });

  $('.custom-save-btn').click(function(e) {
    $("#usersForm").valid();
  });
})
