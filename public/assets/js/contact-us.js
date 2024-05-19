$(() => {
  $("#contactUsForm").validate({
    rules: {
      contact_email: {
        required: true,
        email: true
      },
      contact_mobile: {
        required: true,
      },
      compnay_name: {
        required: true,
      },
      contact_address: {
        required: true
      }
    },
    messages: {
      contact_email: {
        required: 'Contact Email is required',
        email: 'Please enter valid email',
      },
      contact_mobile: {
        required: 'Contact Mobile is required',
      },
      compnay_name: {
        required: 'Company Name is required',
      },
      contact_address: {
        required: 'Contact Address is required'
      }
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  })
})
