$(() => {
  $.validator.addMethod(
    "regex",
    function(value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
  );
  $.validator.addMethod("validateUserEmail", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#editProfileForm :input[name="email"]'),
          data = { "email" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkUserEmail",
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
  $("#editProfileForm").validate({
    rules: {
      // email: {
      //   required: true,
      //   email: true,
      // },
      email: {
        required: true,
        email: true,
        regex: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        validateUserEmail: true,
        normalizer: function(value) {
          // Update the value of the element
          this.value = $.trim(value);
          // Use the trimmed value for validation
          return this.value;
        }
      },
      password: {
        required: true,
        check_password: true
      },
      confirmpassword: {
        equalTo: "#password",
      },
    },
    messages: {
      // email: {
      //   required: "EMAIL is required",
      //   email: "Please enter valid EMAIL address",
      // },
      email: {
        required: 'Email is required',
        email: 'Please enter valid Email address',
        regex: "Please enter valid Email address",
        validateUserEmail: "Email already exists"
      },
      password: {
        check_password: 'Please enter a secure PASSWORD. '
          + 'A strong PASSWORD contains at least 8 characters, '
          + 'uppercase and lowercase letters, and numbers and special characters, space is not allowed',
        required: 'PASSWORD is required'
      },
      confirmpassword: {
        equalTo: "Password & Confirm password should be same",
      },
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit();
    },
  });
});
