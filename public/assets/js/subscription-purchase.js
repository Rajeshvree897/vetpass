$(() => {
	$("#subForm").validate({
		// ignore: [],
		rules: {
			no_of_subscription_days: {
				// required: true
        required: {
					depends: function () {
						if ($('input[name="sub_id"]:checked').data("id")) {
							return true
						}
						return false;
					}
				}
			}
		},
		messages: {
			no_of_subscription_days: {
				required: 'No of subscription day is required when you choose custom subscriptions',
			},
		},
		errorElement: "span",
		errorLabelContainer: ".error",
		submitHandler: form => {
			form.submit();
		}
	});

	//   const selectedSubscription = $('input[name="sub_id"]:checked');

	//   if (selectedSubscription && selectedSubscription.data("id")) {

	//   }

	//   const per_day_price = $('input[name="sub_id"]:checked').data("id");
	//   const duration = $('#duration').val();
	// console.log(duration, per_day_price);
	// if(duration && duration === 'Custom') {
	//     $("#per_day_price").prop('disabled', false);
	//     $("#amount").prop('disabled', true);
	// } else {
	//     $("#per_day_price").prop('disabled', true);
	//     $("#amount").prop('disabled', false);
	// }
	//   $(".subscription").change(function (event) {
	//     event.preventDefault();
	//     console.log($(this).data("id"));
	//     if($(this).data("id")) {
	//         $("#no_of_subscription_days").focus();
	//         const a = $(this);
	//         const text = $($(a.parent().children()[2]).children()[2]).text(); 
	//         console.log(text)
	//         // str. slice(0, 3)
	//     }
	//   });
});