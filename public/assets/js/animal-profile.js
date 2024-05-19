$(() => {

  // show image before upload
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#animal-profile-img').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#profileImage").change(function() {
    readURL(this);
  });

  $('#date_of_birth').prop('max', function(){
    return new Date().toJSON().split('T')[0];
  });
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
  }, "Allow only charecters"); 
  $('#animalProfileForm').validate({
    rules: {
      name: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      gender: {
        required: true
      },
      spayed_neutered: {
        required: true
      },
      status: {
        required: true
      },
      // colour: {
      //   lettersonly: true
      // },
      user: {
        required: true
      },
      animal_type: {
        required: true
      },
      insurance: {
        required: true
      },
      insurers: {
        required: {
          depends:function() {
            return $("#insurance").val() === "Yes";
          }
        },
      },
      wantContact: {
        required: true
      },
      chip: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Name is required",
        maxlength: 'Name length should not be greater than 255',
        regexWhitespace: 'Name should not contain only whitespace',
      },
      gender: {
        required: 'Gender is required'
      },
      spayed_neutered: {
        required: 'Spayed Neutered is required'
      },
      status: {
        required: 'Status is required'
      },
      user: {
        required: 'Animal owner is required'
      },
      animal_type: {
        required: 'Animal type is required'
      },
      insurance: {
        required: 'Insurance is required'
      },
      insurers: {
        required: 'Insurer is required'
      },
      wantContact: {
        required: 'Annual insurance updates and proposals is required'
      },
      chip: {
        required: 'Chip/Registration/Ear No. Companies is required'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
