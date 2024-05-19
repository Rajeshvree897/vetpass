/* eslint-env browser */
$(document).ready(() => {
  $.validator.addMethod(
    "regex",
    function(value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
  );
  $.validator.addMethod(
    "mobileRegex",
    function(value, element, regexp) {
      return this.optional(element) || !regexp.test(value);
    },
  );
  $.validator.addMethod(
    "regex1",
    function(value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
  );
  $.validator.addMethod(
    "length",
    function(value) {
      var spaceCount = (value.split(" ").length - 1);
      var length = value.length;
      length = value.length - spaceCount;
      return length < 8 || length > 15 ? false : true; 
    },
  );
  $.validator.addMethod(
    "checkPassword",
    function(value, element, regexp) {
      return this.optional(element) || value && $("#password").val() == $("#confirm_password").val();
    },
  );
  $('#loginForm').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      },
    },
    messages: {
      email: {
        required: 'EMAIL is required',
        email: 'Please enter valid EMAIL address'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });

  $('#registraionForm').validate({
    rules: {
      company_name: {
        required: true
      },
      first_name: {
        required: true
      },
      last_name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        checkPassword: true,
        regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      },
      confirm_password: {
        required: true,
        checkPassword: true
      },
      int_code: {
        required: true
      },
      mobile: {
        required: true,
        regexWhitespace: true,
        mobileRegex: /[^\s]([ ]{2,})[^\s]/,
        regex1: /^[^\s]+(\s+[^\s]+)*$/,
        mobileCheck: true,
        length: true,
      },
    },
    messages: {
      company_name: {
        required: "Company Name is required"
      },
      first_name: {
        required: "First Name is required"
      },
      last_name: {
        required: "Last Name is required"
      },
      email: {
        required: 'EMAIL is required',
        email: 'Please enter valid EMAIL address'
      },
      password: {
        required: 'Password is required',
        regex: "Enter Password which contains Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        checkPassword: "Password and Confirm Password should be the same"
      },
      confirm_password: {
        required: 'Confirm Password is required',
        checkPassword: "Password and Confirm Password should be the same"
      },
      int_code: {
        required: "Int Code is required"
      },
      mobile: {
        required: "Contact number is required",
        regexWhitespace: "Contact number should not contain only whitespace",
        mobileRegex: "Contact number should not contain more than one whitespace in between",
        regex1: "Contact number should not contain whitespace at the beginning and end",
        length: "Contact number must be between 8-15 digits",
      },
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });

  $('#forgot-password').validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      email: {
        required: 'EMAIL is required',
        email: 'Please enter valid EMAIL address'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });

  $('#reset-password').validate({
    rules: {
      password: {
        check_password: true,
        required: true
      },
      confirmPassword: {
        required: true,
        equalTo: '#password'
      }
    },
    messages: {
      password: {
        check_password: 'Please enter a secure PASSWORD. '
          + 'A strong PASSWORD contains at least 8 characters, '
          + 'uppercase and lowercase letters, and numbers and special characters, space is not allowed',
        required: 'PASSWORD is required'
      },
      confirmPassword: {
        required: 'CONFIRM PASSWORD is required',
        equalTo: "Password & Confirm password should be same",
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });
});
