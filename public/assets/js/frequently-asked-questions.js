$(() => {
  $("#questionForm").validate({
    rules: {
      question: {
        required: true,
        regexWhitespace: true
      },
      answer: {
        required: true,
        regexWhitespace: true
      },
      application: {
        required: true
      }
    },
    messages: {
      question: {
        required: 'Question is required',
        regexWhitespace: 'Question should not contain only whitespace',
      },
      answer: {
        required: 'Answer is required',
        regexWhitespace: 'Answer should not contain only whitespace',
      },
      application: {
        required: 'Application is required',
      }
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  })
})
