$(() => {
    $("#sendInvoiceForm").validate({
      rules: {
        email: {
          required: true,
        },
        userId: {
          required: true,
        },
        amount: {
          required: true,
        },
        currency_type: {
          required: true,
        },
        description: {
          required: true,
        },
      },
      messages: {
        email: {
          required: 'Email is required',
        },
        userId: {
          required: 'Owner is required',
        },
        amount: {
          required: 'Amount is required',
        },
        currency_type: {
          required: 'Currency Type is required',
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
  