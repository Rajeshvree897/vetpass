$(() => {
    $("#subscriptionForm").validate({
      ignore: [],
      rules: {
        title: {
          required: true,
          regexWhitespace: true
        },
        description: {
          required: function() {
            CKEDITOR.instances.description.updateElement();
          },
          regexWhitespace: true
        },
        currency_type: {
          required: true,
        },
        amount: {
          required: true,
        },
        subscription_for: {
          required: true,
        },
        duration: {
          required: true,
        },
        per_day_price: {
          required: {
            depends:function() {
              if($("#duration").val() == "Custom") {
                return true
              }
              return false;
            }
          }
        }
      },
      messages: {
        title: {
          required: 'Subscription Title is required',
          regexWhitespace: 'Subscription Title should not contain only whitespace',
        },
        description: {
          required: 'Subscription description is required',
          regexWhitespace: 'Subscription description should not contain only whitespace',
        },
        currency_type: {
          required: 'Currency Type is required',
        },
        amount: {
          required: 'Amount is required',
        },
        subscription_for: {
          required: 'Subscription for is required',
        },
        duration: {
          required: 'Subscription Duration for is required',
        },
        per_day_price: {
          required: 'Subscription per day price is required',
        },
      },
      errorElement: "span",
      errorLabelContainer: ".error",
      submitHandler: form => {
        form.submit();
      }
  });

  var duration = $('#duration').val();
  if(duration && duration === 'Custom') {
    $("#per_day_price").prop('disabled', false);
    $("#amount").prop('disabled', true);
  } else {
    $("#per_day_price").prop('disabled', true);
    $("#amount").prop('disabled', false);
  }
  $("#duration").change(function (event) {
    var duration = $('#duration option:selected').text().trim();
    if(duration && duration === 'Custom') {
      $("#per_day_price").prop('disabled', false);
      $("#amount").prop('disabled', true);
    } else {
      $("#per_day_price").prop('disabled', true);
      $("#amount").prop('disabled', false);
    }
    event.preventDefault();
  });
  
  $("#subscriptionForm").submit(function(e) {
    e.preventDefault(); 
  });   
});
  