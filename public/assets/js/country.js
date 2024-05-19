$(() => {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#country-img').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string

      const img = document.querySelector('#country-img');
      img.addEventListener('load', function (event) {
          const dataUrl = getDataUrl(event.currentTarget);
          $('#base64_url').val(dataUrl)
      });
    }
  }
  function getDataUrl(img) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 64;
      canvas.height = 64;
      ctx.drawImage(img, 0, 0, canvas.width+ 0.5, canvas.height+ 0.5);
      return canvas.toDataURL('image/jpeg');
  }

  $("#countryImage").change(function() {
    readURL(this);
  });
  
  $.validator.addMethod("validateCountryName", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#country'),
          data = { "country" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkCountryName",
          dataType: "json",
          data: data,
          success: function(data)
          {
            if(data.response) {
              flag = false;
              return false;
            }
            flag = true;
            return true;
          },
          async: false
      });
      return flag;
  }, '');

  $.validator.addMethod("validateSortID", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#sort_id'),
          data = { "sort_id" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkSortID",
          dataType: "json",
          data: data,
          success: function(data)
          {
            if(data.response) {
              flag = false;
              return false;
            }
            flag = true;
            return true;
          },
          async: false
      });
      return flag;
  }, '');
  
  $('#countryForm').validate({
    rules: {
      country: {
        required: true,
        validateCountryName: true,
        maxlength: 255,
        regexWhitespace: true
      },
      sort_id: {
        required: true,
        // validateSortID: true
      },
      iso_code: {
        required: true,
        regexWhitespace: true
      },
      country_code: {
        required: true,
        regexWhitespace: true
      },
      countryImage: {
        required: $("#base64_url").val() !== '' ? false : true,
      },
    },
    messages: {
      country: {
        required: 'Country Name is required',
        validateCountryName: 'Country Name already exists',
        maxlength: 'Country Name length should not be greater than 255',
        regexWhitespace: 'Country Name should not contain only whitespace',
      },
      sort_id: {
        required: 'Sort ID is required',
        // validateSortID: 'Sort ID already exists',
      },
      iso_code: {
        required: 'ISO Code is required',
        regexWhitespace: 'ISO Code should not contain only whitespace',
      },
      country_code: {
        required: 'Country Code is required',
        regexWhitespace: 'Country Code should not contain only whitespace',
      },
      countryImage: {
        required: "Country Image is required",
      },
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: form => {
      form.submit();
    }
  });
});
