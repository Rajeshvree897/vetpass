$(() => {
  $("#breedsForm").validate({
    rules: {
      name: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      type: {
        required: true,
      },
      status: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Breed is required",
        maxlength: 'Breed length should not be greater than 255',
        regexWhitespace: 'Breed should not contain only whitespace',
      },
      type: {
        required: 'Animal type is required',
      },
      status: {
        required: 'Breed Status is required',
      },
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  })
})
