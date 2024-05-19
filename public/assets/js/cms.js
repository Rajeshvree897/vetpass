$(() => {
    $("#cmsForm").validate({
      rules: {
        title: {
          required: true,
        },
        description: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Title is required',
        },
        description: {
          required: 'Description is required',
        },
      },
      errorElement: "span",
      errorLabelContainer: ".error",
      submitHandler: (form) => {
        form.submit()
      },
    })
  })
  