$(() => {
  $('#notificationTypeForm').validate({
    rules: {
      type: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
    },
    messages: {
      type: {
        required: 'Notification type is required',
        maxlength: 'Notification type length should not be greater than 255',
        regexWhitespace: 'Notification type should not contain only whitespace',
      },
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
