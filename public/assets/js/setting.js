$(() => {
  $('#settingForm').validate({
    rules: {
      current_version: {
        required: true,
        regexWhitespace: true
      },
      minimum_version: {
        required: true,
        regexWhitespace: true
      },
      base_url: {
        required: true,
        regexWhitespace: true
      }
    },
    messages: {
      current_version: {
        required: 'Current version is required',
        regexWhitespace: 'Current version should not contain only whitespace'
      },
      minimum_version: {
        required: 'Minimum version is required',
        regexWhitespace: 'Minimum version should not contain only whitespace'
      },
      base_url: {
        required: 'Base URL is required',
        regexWhitespace: 'Base URL should not contain only whitespace'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
