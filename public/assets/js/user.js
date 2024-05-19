$(() => {
  // show image before upload
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#user-profile-img').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#userImage").change(function() {
    readURL(this);
  });

  $.validator.addMethod(
    "regex",
    function(value, element, regexp) {
      return this.optional(element) || !regexp.test(value);
    },
  );

  $.validator.addMethod(
    "regex1",
    function(value, element, regexp) {
      return this.optional(element) || regexp.test(value);
    },
  );
  
  $.validator.addMethod(
    "length",
    function(value) {
      var spaceCount = (value.split(" ").length - 1);
      var length = value.length;
      length = value.length - spaceCount;
      return length < 8 || length > 15 ? false : true; 
    },
  );

  $.validator.addMethod("validateUserEmail", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#usersForm :input[name="email"]'),
          data = { "email" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkUserEmail",
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
  $("#usersForm").validate({
    rules: {
      email: {
        required: true,
        regx: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        validateUserEmail: true
      },
      first_name: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      last_name: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      address1: {
        maxlength: 255,
      },
      address2: {
        maxlength: 255,
      },
      city: {
        maxlength: 255,
      },
      education: {
        maxlength: 255,
      },
      // educationDuration: {
      //   maxlength: 255,
      // },
      speciality: {
        maxlength: 255,
      },
      personal_bio: {
        maxlength: 500,
      },
      registration_number: {
        maxlength: 255,
      },
      mobile: {
        required: true,
        regexWhitespace: true,
        regex: /[^\s]([ ]{2,})[^\s]/,
        regex1: /^[^\s]+(\s+[^\s]+)*$/,
        mobileCheck: true,
        length: true,
      },
      role: {
        required: true
      },
      practiceId: {
        required: true
      },
      zip_code: {
        required: false,
        maxlength: 10,
      },
      int_code: {
        required: true
      },
      currency_type: {
        required: {
          depends:function() {
            if($("#is_in_clinic_consultation").prop('checked') || $("#is_online_consultation").prop('checked') || $('#roleId option:selected').text().trim() == "Service Provider" || $('#roleId option:selected').text().trim() == "Vet" || $('#roleId option:selected').text().trim() == "Vet Technician/Nurse") {
              return true
            }
            return false;
          }
        }
      },
      serviceProviderServices: {
        required: true
      },
      // b_user_name: {
      //   required: true
      // },
      b_user_email: {
        // required: true,
        regx: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
      },
      // b_country: {
      //   required: true
      // },
      // b_currency: {
      //   required: true
      // },
      // b_account_number: {
      //   required: true,
      //   maxlength: 15,
      // },
      // b_iban: {
      //   required: true
      // },
      // b_ncc: {
      //   required: true
      // },
      // b_sort_code: {
      //   required: true
      // },
      // b_swiftbic: {
      //   required: true
      // },
      // bank_name: {
      //   required: true
      // },
      // b_address: {
      //   required: true
      // },
      online_consultation: {
        required: {
          depends:function() {
            if($("#is_online_consultation").prop('checked') == true) {
              return true
            }
            return false;
          }
        }
      },
      in_clinic_consultation: {
        required: {
          depends:function() {
            if($("#is_in_clinic_consultation").prop('checked') == true) {
              return true
            }
            return false;
          }
        }
      },
      educationDuration: {
        regx: /^(0[1-9]|1[0-2])\/(19|20)\d{2}$|^((19|20)\d{2})$/,
      },
      passout_date: {
        regx: /^(0[1-9]|1[0-2])\/(19|20)\d{2}$|^((19|20)\d{2})$/,
      },
      price: {
        required: true,
        min: 1
      },
      groomersServiceId: {
        required: {
          depends:function() {
            if ($('.groomersServiceList li').length == 0) {
              return true;
            }
            return false;
          }
        },
      }, 
      walkersServiceId: {
        required: {
          depends:function() {
            if ($('.walkersServiceList li').length == 0) {
              return true;
            }
            return false;
          }
        },
      },
      therapistsServiceId: {
        required: {
          depends:function() {
            if ($('.therapistsServiceList li').length == 0) {
              return true;
            }
            return false;
          }
        },
      },
      nutritionistsServiceId: {
        required: {
          depends:function() {
            if ($('.nutritionistsServiceList li').length == 0) {
              return true;
            }
            return false;
          }
        },
      }, 
      breedersServiceId: {
        required: {
          depends:function() {
            if ($('.breedersServiceList li').length == 0) {
              return true;
            }
            return false;
          }
        },
      }, 
    },
    messages: {
      email: {
        required: "Email is required",
        regx: "Please enter valid Email address",
        validateUserEmail: "Email already exists"
      },
      first_name: {
        required: "First name is required",
        maxlength: 'First name length should not be greater than 255',
        regexWhitespace: 'First name should not contain only whitespace',
      },
      last_name: {
        required: "Last name is required",
        maxlength: 'Last name length should not be greater than 255',
        regexWhitespace: 'Last name should not contain only whitespace',
      },
      role: {
        required: 'Role is required',
      },
      mobile: {
        required: "Mobile number is required",
        regexWhitespace: "Mobile number should not contain only whitespace",
        regex: "Mobile number should not contain more than one whitespace in between",
        regex1: "Mobile number should not contain whitespace at the beginning and end",
        length: "Mobile number must be between 8-15 digits",
      },
      practiceId: {
        required: 'Practice is required'
      },
       practiceId: {
        required: 'Practice is required'
      },
      serviceProviderServices :{
        required: 'service is required'
      },
      zip_code: {
        maxlength: 'Zip code should not more than 10 digits'
      },
      int_code: {
        required: 'Int code is required'
      },
      address1: {
        maxlength: "Address1 length should not be greater than 255"
      },
      address2: {
        maxlength: "Address2 length should not be greater than 255"
      },
      city: {
        maxlength: "City length should not be greater than 255"
      },
      education: {
        maxlength: "Education length should not be greater than 255"
      },
      educationDuration: {
        maxlength: "Education duration length should not be greater than 255"
      },
      speciality:{
        maxlength: "Speciality length should not be greater than 255"
      },
      personal_bio: {
        maxlength: "Personal bio length should not be greater than 500"
      },
      registration_number: {
        maxlength: "Registration number should not be greater than 255"
      },
      currency_type: {
        required: 'Currency type is required'
      },
      b_user_name: {
        required: 'User name is required',
      },
      b_user_email: {
        required: "Email is required",
        regx: "Please enter valid Email address",
      },
      b_country: {
        required: 'Country is required',
      },
      b_currency: {
        required: 'Currency is required',
      },
      b_account_number: {
        required: 'Account number is required',
        maxlength: "Account number length should not be greater than 15"
      },
      b_iban: {
        required: 'IBAN is required',
      },
      b_ncc: {
        required: 'NCC is required',
      },
      b_sort_code: {
        required: 'Sort code is required',
      },
      b_swiftbic: {
        required: 'SWIFTBIC is required',
      },
      bank_name: {
        required: 'Bank name is required',
      },
      b_address: {
        required: 'Bank address is required',
      },
      online_consultation: {
        required: 'Online consultation price is required',
      },
      in_clinic_consultation: {
        required: 'In clinic consultation price is required',
      },
      educationDuration: {
        regx: "Qualification Date must be in MM/YYYY or YYYY format",
      },
      passout_date: {
        regx: "Specialization, Advanced Practitioner Date must be in MM/YYYY or YYYY format",
      },
      price: {
        required: "Required!",
        // min: "Minimum Required "
      },
      groomersServiceId: {
        required: "Service is required",
      }, 
      walkersServiceId: {
        required: "Service is required",
      },
      therapistsServiceId: {
        required: "Service is required",
      },
      nutritionistsServiceId: {
        required: "Service is required",
      },
      breedersServiceId: {
        required: "Service is required",
      },
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  });

  // slot id change 
  $('.remove').click(function() {
    const lblvalue = $($(this).parent().children('label').eq(1)).text();
    if($(this).parent().hasClass("mon_fieldwrapper")) {
      $('.slot-id.mon').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      var lastField = $("#mon-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      } else {
        lastField.data("idx", intId-2);
        $(this).parent().remove();
      }
    }
    if($(this).parent().hasClass("tue_fieldwrapper")) {
      $('.slot-id.tue').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      var lastField = $("#tue-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      } else {
        lastField.data("idx", intId-2);
        $(this).parent().remove();
      }
    }
    if($(this).parent().hasClass("wed_fieldwrapper")) {
      $('.slot-id.wed').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      var lastField = $("#wed-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      } else {
        lastField.data("idx", intId-2);
        $(this).parent().remove();
      }
    }
    if($(this).parent().hasClass("thu_fieldwrapper")) {
      $('.slot-id.thu').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      var lastField = $("#thu-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      } else {
        lastField.data("idx", intId-2);
        $(this).parent().remove();
      }
    }
    if($(this).parent().hasClass("fri_fieldwrapper")) {
      $('.slot-id.fri').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      var lastField = $("#fri-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      } else {
        lastField.data("idx", intId-2);
        $(this).parent().remove();
      }
    }
    if($(this).parent().hasClass("sat_fieldwrapper")) {
      $('.slot-id.sat').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      var lastField = $("#sat-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      } else {
        lastField.data("idx", intId-2);
        $(this).parent().remove();
      }
    }
    if($(this).parent().hasClass("sun_fieldwrapper")) {
      $('.slot-id.sun').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      var lastField = $("#sun-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      } else {
        lastField.data("idx", intId-2);
        $(this).parent().remove();
      }
    }
  });

  // update intervals based on fromtime and totime
  $(document).on("change", ".typeTime", function (e) {
     let serviceProviderRole = availabilitieValidationStatus();
    let addOption = serviceProviderRole ? '<option  selected value="0">0</option>' : "<option disabled selected>Interval</option>";
    if($(this).hasClass("fromtime")) {
      const interval = $($(this)).parent().next().next().find('#interval');
      const fromtime = $(this).val();
      const totime = $($(this)).parent().next().find('.totime').val();
      if(fromtime && totime) {
        var diff =  new Date("1970-1-1 " + totime) - new Date("1970-1-1 " + fromtime);
        var seconds = Math.floor(diff/1000); //ignore any left over units smaller than a second
        var minutes = Math.floor(seconds/60); 
        seconds = seconds % 60;
        var hours = Math.floor(minutes/60);
        minutes = minutes % 60;
        let html = addOption;
        if(minutes && !(hours >= 1)) {
          for (let j=5; j <= minutes; j+=5 ) {
            html += `<option value="${j}">${j}</option>`;
          }
          interval.html(html);
        } else {
          if (hours >= 1) {
            for (let j=5; j <= 60; j+=5 ) {
              html += `<option value="${j}">${j}</option>`;
            }
          } else if(minutes) {
            for (let j=5; j <= minutes; j+=5 ) {
              html += `<option value="${j}">${j}</option>`;
            }
          }
          interval.html(html);
        }
      }
    }
    if($(this).hasClass("totime")) {
      const interval = $($(this)).parent().next().find('#interval');
      const fromtime = $($(this)).parent().prev().find('.fromtime').val();
      const totime = $(this).val();
      if(fromtime && totime) {
        var diff =  new Date("1970-1-1 " + totime) - new Date("1970-1-1 " + fromtime);
        var seconds = Math.floor(diff/1000); //ignore any left over units smaller than a second
        var minutes = Math.floor(seconds/60); 
        seconds = seconds % 60;
        var hours = Math.floor(minutes/60);
        minutes = minutes % 60;
        let html = addOption;
        if(minutes && !(hours >= 1)) {
          for (let j=5; j <= minutes; j+=5 ) {
            html += `<option value="${j}">${j}</option>`;
          }
          interval.html(html);
        } else {
          if (hours >= 1) {
            for (let j=5; j <= 60; j+=5 ) {
              html += `<option value="${j}">${j}</option>`;
            }
          } else if(minutes) {
            for (let j=5; j <= minutes; j+=5 ) {
              html += `<option value="${j}">${j}</option>`;
            }
          }
          interval.html(html);
        }
      }
    }
    // updateInterval('monday');
  });
  // $(".mondayTime").change(function() {
  //   alert();
  // });

  function availabilitieValidationStatus(){
    var selectedRoleByName = $('#roleId option:selected').text().trim();
    if(selectedRoleByName === serviceProviderRoleName){
      return  true;
    }else{
      return false;
    }  
  }


  function timeValidate() {
    let mon, tue, wed, thu, fri, sat, sun;
    mon = tue = wed = thu = fri = sat = sun = true;
    let monInvalid, tueInvalid, wedInvalid, thuInvalid, friInvalid, satInvalid, sunInvalid;
    monInvalid = tueInvalid = wedInvalid = thuInvalid = friInvalid = satInvalid = sunInvalid = false;
    // ---------- start stack and interval validations ------------
    $(".custom-select[name='monday[]']").each(function () {
      let serviceProviderStatus = availabilitieValidationStatus(); 
      if(!$(this).val() && !serviceProviderStatus) {
        mon = false;
        if(!$(this).hasClass("custom-error")) {
          $(this).addClass("custom-error");
          const error = "<div class=\"custom-error-span\">Required</div>";
          $(this).parent().append(error);
        }
      } else {
        $(this).removeClass("custom-error");
        $(this).parent().find('.custom-error-span').remove();
      }
    });

    $(".custom-select[name='tuesday[]']").each(function () {
      let serviceProviderStatus = availabilitieValidationStatus(); 
      if(!$(this).val() && !serviceProviderStatus) {
        tue = false;
        if(!$(this).hasClass("custom-error")) {
          $(this).addClass("custom-error");
          const error = "<div class=\"custom-error-span\">Required</div>";
          $(this).parent().append(error);
        }
      } else {
        $(this).removeClass("custom-error");
        $(this).parent().find('.custom-error-span').remove();
      }
    });

    $(".custom-select[name='wednesday[]']").each(function () {
      let serviceProviderStatus = availabilitieValidationStatus(); 
      if(!$(this).val() && !serviceProviderStatus) {
        wed = false;
        if(!$(this).hasClass("custom-error")) {
          $(this).addClass("custom-error");
          const error = "<div class=\"custom-error-span\">Required</div>";
          $(this).parent().append(error);
        }
      } else {
        $(this).removeClass("custom-error");
        $(this).parent().find('.custom-error-span').remove();
      }
    });
    
    $(".custom-select[name='thursday[]']").each(function () {
      let serviceProviderStatus = availabilitieValidationStatus(); 
      if(!$(this).val() && !serviceProviderStatus) {
        thu = false;
        if(!$(this).hasClass("custom-error")) {
          $(this).addClass("custom-error");
          const error = "<div class=\"custom-error-span\">Required</div>";
          $(this).parent().append(error);
        }
      } else {
        $(this).removeClass("custom-error");
        $(this).parent().find('.custom-error-span').remove();
      }
    });

    $(".custom-select[name='friday[]']").each(function () {
      let serviceProviderStatus = availabilitieValidationStatus(); 
      if(!$(this).val() && !serviceProviderStatus) {
        fri = false;
        if(!$(this).hasClass("custom-error")) {
          $(this).addClass("custom-error");
          const error = "<div class=\"custom-error-span\">Required</div>";
          $(this).parent().append(error);
        }
      } else {
        $(this).removeClass("custom-error");
        $(this).parent().find('.custom-error-span').remove();
      }
    });

    $(".custom-select[name='saturday[]']").each(function () {
      let serviceProviderStatus = availabilitieValidationStatus(); 
      if(!$(this).val() && !serviceProviderStatus) {
        sat = false;
        if(!$(this).hasClass("custom-error")) {
          $(this).addClass("custom-error");
          const error = "<div class=\"custom-error-span\">Required</div>";
          $(this).parent().append(error);
        }
      } else {
        $(this).removeClass("custom-error");
        $(this).parent().find('.custom-error-span').remove();
      }
    });

    $(".custom-select[name='sunday[]']").each(function () {
      let serviceProviderStatus = availabilitieValidationStatus(); 
      if(!$(this).val() && !serviceProviderStatus) {
        sun = false;
        if(!$(this).hasClass("custom-error")) {
          $(this).addClass("custom-error");
          const error = "<div class=\"custom-error-span\">Required</div>";
          $(this).parent().append(error);
        }
      } else {
        $(this).removeClass("custom-error");
        $(this).parent().find('.custom-error-span').remove();
      }
    });
    // ---------- end stack and interval validations ------------

    for(var i = 0; i < $('.mondayTime').length; i++) {
      if($('.mondayTime')[i].value === '') {
        mon = false;
        if(!$($('.mondayTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">Required</div>";
          $($('.mondayTime')[i]).addClass("custom-error");
          $($('.mondayTime')[i]).parent().append(error);
        }
      } else {
        $($('.mondayTime')[i]).removeClass("custom-error");
        $($('.mondayTime')[i]).parent().find('.custom-error-span').remove();
      }
      if($($('.mondayTime.fromtime')[i]).val() && $($('.mondayTime.totime')[i]).val()) {
        var timefrom = new Date();
        var tempfrom = $($('.mondayTime.fromtime')[i]).val().split(":");
        timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(tempfrom[1]));
  
        var timeto = new Date();
        var tempto = $($('.mondayTime.totime')[i]).val().split(":");
        timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(tempto[1]));
        
        if (false) {
          mon = false;
          monInvalid = true;
          $($('.mon-invalid-time')[i]).text(" Invalid time");
        } else {
          $($('.mon-invalid-time')[i]).text("");
        }
      }
    }

    for(var i = 0; i < $('.tueTime').length; i++) {
      if($('.tueTime')[i].value === '') {
        tue = false;
        if(!$($('.tueTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">Required</div>";
          $($('.tueTime')[i]).addClass("custom-error");
          $($('.tueTime')[i]).parent().append(error);
        }
      } else {
        $($('.tueTime')[i]).removeClass("custom-error");
        $($('.tueTime')[i]).parent().find('.custom-error-span').remove();
      }
      if($($('.tueTime.fromtime')[i]).val() && $($('.tueTime.totime')[i]).val()) {
        var timefrom = new Date();
        var tempfrom = $($('.tueTime.fromtime')[i]).val().split(":");
        timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(tempfrom[1]));
    
        var timeto = new Date();
        var tempto = $($('.tueTime.totime')[i]).val().split(":");
        timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(tempto[1]));
        if (false) {
          tue = false;
          tueInvalid = true;
          $($('.tue-invalid-time')[i]).text(" Invalid time");
        } else {
          $($('.tue-invalid-time')[i]).text("");
        }
      }
    }

    for(var i = 0; i < $('.wedTime').length; i++) {
      if($('.wedTime')[i].value === '') {
        wed = false;
        if(!$($('.wedTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">Required</div>";
          $($('.wedTime')[i]).addClass("custom-error");
          $($('.wedTime')[i]).parent().append(error);
        }
      } else {
        $($('.wedTime')[i]).removeClass("custom-error");
        $($('.wedTime')[i]).parent().find('.custom-error-span').remove();
      }
      if($($('.wedTime.fromtime')[i]).val() && $($('.wedTime.totime')[i]).val()) {
        var timefrom = new Date();
        var tempfrom = $($('.wedTime.fromtime')[i]).val().split(":");
        timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(tempfrom[1]));
    
        var timeto = new Date();
        var tempto = $($('.wedTime.totime')[i]).val().split(":");
        timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(tempto[1]));
        if (false) {
          wed = false;
          wedInvalid = true;
          $($('.wed-invalid-time')[i]).text(" Invalid time");
        } else {
          $($('.wed-invalid-time')[i]).text("");
        }
      }
    }

    for(var i = 0; i < $('.thuTime').length; i++) {
      if($('.thuTime')[i].value === '') {
        thu = false;
        if(!$($('.thuTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">Required</div>";
          $($('.thuTime')[i]).addClass("custom-error");
          $($('.thuTime')[i]).parent().append(error);
        }
      } else {
        $($('.thuTime')[i]).removeClass("custom-error");
        $($('.thuTime')[i]).parent().find('.custom-error-span').remove();
      }
      if($($('.thuTime.fromtime')[i]).val() && $($('.thuTime.totime')[i]).val()) {
        var timefrom = new Date();
        var tempfrom = $($('.thuTime.fromtime')[i]).val().split(":");
        timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(tempfrom[1]));
    
        var timeto = new Date();
        var tempto = $($('.thuTime.totime')[i]).val().split(":");
        timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(tempto[1]));
        if (false) {
          thu = false;
          thuInvalid = true;
          $($('.thu-invalid-time')[i]).text(" Invalid time");
        } else {
          $($('.thu-invalid-time')[i]).text("");
        }
      }
    }

    for(var i = 0; i < $('.friTime').length; i++) {
      if($('.friTime')[i].value === '') {
        fri = false;
        if(!$($('.friTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">Required</div>";
          $($('.friTime')[i]).addClass("custom-error");
          $($('.friTime')[i]).parent().append(error);
        }
      } else {
        $($('.friTime')[i]).removeClass("custom-error");
        $($('.friTime')[i]).parent().find('.custom-error-span').remove();
      }
      if($($('.friTime.fromtime')[i]).val() && $($('.friTime.totime')[i]).val()) {
        var timefrom = new Date();
        var tempfrom = $($('.friTime.fromtime')[i]).val().split(":");
        timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(tempfrom[1]));
    
        var timeto = new Date();
        var tempto = $($('.friTime.totime')[i]).val().split(":");
        timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(tempto[1]));
        if (false) {
          fri = false;
          friInvalid = true;
          $($('.fri-invalid-time')[i]).text(" Invalid time");
        } else {
          $($('.fri-invalid-time')[i]).text("");
        }
      }
    }

    for(var i = 0; i < $('.satTime').length; i++) {
      if($('.satTime')[i].value === '') {
        sat = false;
        if(!$($('.satTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">Required</div>";
          $($('.satTime')[i]).addClass("custom-error");
          $($('.satTime')[i]).parent().append(error);
        }
      } else {
        $($('.satTime')[i]).removeClass("custom-error");
        $($('.satTime')[i]).parent().find('.custom-error-span').remove();
      }
      if($($('.satTime.fromtime')[i]).val() && $($('.satTime.totime')[i]).val()) {
        var timefrom = new Date();
        var tempfrom = $($('.satTime.fromtime')[i]).val().split(":");
        timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(tempfrom[1]));
    
        var timeto = new Date();
        var tempto = $($('.satTime.totime')[i]).val().split(":");
        timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(tempto[1]));
        if (false) {
          sat = false;
          satInvalid = true;
          $($('.sat-invalid-time')[i]).text(" Invalid time");
        } else {
          $($('.sat-invalid-time')[i]).text("");
        }
      }
    }

    for(var i = 0; i < $('.sunTime').length; i++) {
      if($('.sunTime')[i].value === '') {
        sun = false;
        if(!$($('.sunTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">Required</div>";
          $($('.sunTime')[i]).addClass("custom-error");
          $($('.sunTime')[i]).parent().append(error);
        }
      } else {
        $($('.sunTime')[i]).removeClass("custom-error");
        $($('.sunTime')[i]).parent().find('.custom-error-span').remove();
      }
      if($($('.sunTime.fromtime')[i]).val() && $($('.sunTime.totime')[i]).val()) {
        var timefrom = new Date();
        var tempfrom = $($('.sunTime.fromtime')[i]).val().split(":");
        timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(tempfrom[1]));
    
        var timeto = new Date();
        var tempto = $($('.sunTime.totime')[i]).val().split(":");
        timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(tempto[1]));
        if (false) {
          sun = false;
          sunInvalid = true;
          $($('.sun-invalid-time')[i]).text(" Invalid time");
        } else {
          $($('.sun-invalid-time')[i]).text("");
        }
      }
    }

    if(!mon) {
      if(monInvalid) {
        $("#mon-span").text("Invalid time");
        $("#mon-span").css("display","block");  
      }else {
        $("#mon-span").text("Required");
        $("#mon-span").css("display","block");
      }
    }else {
      $("#mon-span").css("display","none");
    }
    if(!tue) {
      if(tueInvalid) {
        $("#tue-span").text("Invalid time");
        $("#tue-span").css("display","block");  
      }else {
        $("#tue-span").text("Required");
        $("#tue-span").css("display","block");
      }
    }else {
      $("#tue-span").css("display","none");
    }
    if(!wed) {
      if(wedInvalid) {
        $("#wed-span").text("Invalid time");
        $("#wed-span").css("display","block");  
      }else {
        $("#wed-span").text("Required");
        $("#wed-span").css("display","block");
      }
    }else {
      $("#wed-span").css("display","none");
    }
    if(!thu) {
      if(thuInvalid) {
        $("#thu-span").text("Invalid time");
        $("#thu-span").css("display","block");  
      }else {
        $("#thu-span").text("Required");
        $("#thu-span").css("display","block");
      }
    }else {
      $("#thu-span").css("display","none");
    }
    if(!fri) {
      if(friInvalid) {
        $("#fri-span").text("Invalid time");
        $("#fri-span").css("display","block");  
      }else {
        $("#fri-span").text("Required");
        $("#fri-span").css("display","block");
      }
    }else {
      $("#fri-span").css("display","none");
    }
    if(!sat) {
      if(satInvalid) {
        $("#sat-span").text("Invalid time");
        $("#sat-span").css("display","block");  
      }else {
        $("#sat-span").text("Required");
        $("#sat-span").css("display","block");
      }
    }else {
      $("#sat-span").css("display","none");
    }
    if(!sun) {
      if(sunInvalid) {
        $("#sun-span").text("Invalid time");
        $("#sun-span").css("display","block");  
      }else {
        $("#sun-span").text("Required");
        $("#sun-span").css("display","block");
      }
    }else {
      $("#sun-span").css("display","none");
    }

    if(mon && tue && wed && thu && fri && sat && sun && !monInvalid && !tueInvalid && !wedInvalid && !thuInvalid && !friInvalid && !satInvalid && !sunInvalid) {
      return timeslotValidate();
    }
    return false;
  }
  $('.custom-save-btn').click(function(e) {
    $("#usersForm").valid();
    return timeValidate();
  });

  function timeslotValidate() {
    let monday, tuesday, wednesday, thursday, friday, saturday, sunday;
    var className = [];
      className[0] = 'monday';
      className[1] = 'tuesday';
      className[2] = 'wednesday';
      className[3] = 'thursday';
      className[4] = 'friday';
      className[5] = 'saturday';
      className[6] = 'sunday';
      
      className.forEach(day => {
        if(day == 'monday') {
          monday = validateTimeByDay(day);
        } else if(day == 'tuesday') {
          tuesday = validateTimeByDay(day);
        } else if(day == 'wednesday') {
          wednesday = validateTimeByDay(day);
        } else if(day == 'thursday') {
          thursday = validateTimeByDay(day);
        } else if(day == 'friday') {
          friday = validateTimeByDay(day);
        } else if(day == 'saturday') {
          saturday = validateTimeByDay(day);
        } else if(day == 'sunday') {
          sunday = validateTimeByDay(day);
        }
      });

      if(monday == 0) {
        $("#mon-span").text("");
        $("#mon-span").css("display","block"); 
      } else {
        $("#mon-span").text("Invalid time!");
        $("#mon-span").css("display","block");
      }
      if(tuesday == 0) {
        $("#tue-span").text("");
        $("#tue-span").css("display","block"); 
      } else {
        $("#tue-span").text("Invalid time!");
        $("#tue-span").css("display","block");
      }
      if(wednesday == 0) {
        $("#wed-span").text("");
        $("#wed-span").css("display","block"); 
      } else {
        $("#wed-span").text("Invalid time!");
        $("#wed-span").css("display","block");
      }
      if(thursday == 0) {
        $("#thu-span").text("");
        $("#thu-span").css("display","block"); 
      } else {
        $("#thu-span").text("Invalid time!");
        $("#thu-span").css("display","block");
      }
      if(friday == 0) {
        $("#fri-span").text("");
        $("#fri-span").css("display","block"); 
      } else {
        $("#fri-span").text("Invalid time!");
        $("#fri-span").css("display","block");
      }
      if(saturday == 0) {
        $("#sat-span").text("");
        $("#sat-span").css("display","block"); 
      } else {
        $("#sat-span").text("Invalid time!");
        $("#sat-span").css("display","block");
      }
      if(sunday == 0) {
        $("#sun-span").text("");
        $("#sun-span").css("display","block"); 
      } else {
        $("#sun-span").text("Invalid time!");
        $("#sun-span").css("display","block");
      }
      if(monday == 0 && tuesday == 0 && wednesday == 0 && thursday == 0 && friday == 0 && saturday == 0 && sunday == 0) {
        return true;
      } else {
        return false;
      }
  }
  Number.prototype.between = function (a, b) {
    var min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
  };

  function getTimeFormateForCompare(timeVal) {
    var time = timeVal.split(":");
    var hour = time[0];
    if (hour == "00") {
      hour = 24;
    }
    var min = time[1];
    return Number(hour + "." + min);
  }

  function validateTimeByDay(className) {
    var timeFromArray = [];
    var timeToArray = [];
    let errorCount = 0;

    var values = $("input."+className+"Time[name='"+className+"[]']")
      .each(function () {
        var inputObject = {};
        inputObject.value = getTimeFormateForCompare($(this).val());
        inputObject.object = $(this);
        if($(this).hasClass('fromtime')){
          timeFromArray.push(inputObject);
        } else {
          timeToArray.push(inputObject);
        }
      })
      .get();
    const invalidSlotError = "<div class=\"custom-error-span\">Invalid time slot</div>";
    const sameSlotError = "<div class=\"custom-error-span\">From and To time can not be same</div>";
    const occupiedError = "<div class=\"custom-error-span\">This time is already occupied</div>";
    if(timeFromArray[0] && timeFromArray[0].value && timeToArray[0] && timeToArray[0].value) {
      if(timeFromArray[0].value == timeToArray[0].value) {
        if(!timeToArray[0].object.hasClass("custom-error")) {
          timeToArray[0].object.addClass('custom-error');
          timeToArray[0].object.parent().append(sameSlotError);
          errorCount++;
        }
      } else if(!(timeFromArray[0].value < timeToArray[0].value) && !(timeFromArray[0].value >= 24)) {
        if(!timeToArray[0].object.hasClass("custom-error")) {
          timeToArray[0].object.addClass('custom-error');
          timeToArray[0].object.parent().append(invalidSlotError);
          errorCount++;
        }
      } else {
        if(timeToArray[0].object.hasClass("custom-error")) {
          $(timeToArray[0].object).removeClass("custom-error");
          $(timeToArray[0].object).parent().find('.custom-error-span').remove();
          errorCount--;
        }
      }
    }

    timeFromArray.forEach((fromTimeCurrent, currentIndex) => {
      timeFromArray.forEach((fromTime, index) => {
        if(currentIndex > index){
          if(timeFromArray[currentIndex].value.between(timeFromArray[index].value, timeToArray[index].value) || timeFromArray[currentIndex].value == timeFromArray[index].value) {
            if(!timeFromArray[currentIndex].object.hasClass("custom-error")) {
              timeFromArray[currentIndex].object.addClass('custom-error');
              timeFromArray[currentIndex].object.parent().append(occupiedError);
              errorCount++;
            }
          } else if(timeFromArray[currentIndex].value < timeToArray[index].value) {
            if(!timeFromArray[currentIndex].object.hasClass("custom-error")) {
              timeFromArray[currentIndex].object.addClass('custom-error');
              timeFromArray[currentIndex].object.parent().append(invalidSlotError);
              errorCount++;
            }
          } else if(timeFromArray[currentIndex].value == timeToArray[currentIndex].value) {
            if(!timeFromArray[currentIndex].object.hasClass("custom-error")) {
              timeFromArray[currentIndex].object.addClass('custom-error');
              timeFromArray[currentIndex].object.parent().append(sameSlotError);
              errorCount++;
            }
          } else {
            if(timeFromArray[currentIndex].object.hasClass("custom-error")) {
              $(timeFromArray[currentIndex].object).removeClass("custom-error");
              $(timeFromArray[currentIndex].object).parent().find('.custom-error-span').remove();
              errorCount--;
            }
          }
          if(timeToArray[currentIndex].value.between(timeFromArray[index].value, timeToArray[index].value) || timeToArray[currentIndex].value == timeFromArray[index].value) {
            if(!timeToArray[currentIndex].object.hasClass("custom-error")) {
              timeToArray[currentIndex].object.addClass('custom-error');
              timeToArray[currentIndex].object.parent().append(occupiedError);
              errorCount++;
            }
          } else if(timeFromArray[currentIndex].value > timeToArray[currentIndex].value || timeToArray[currentIndex].value < timeToArray[index].value) {
            if(!timeToArray[currentIndex].object.hasClass("custom-error")) {
              timeToArray[currentIndex].object.addClass('custom-error');
              timeToArray[currentIndex].object.parent().append(invalidSlotError);
              errorCount++;
            }
          } else if(timeToArray[currentIndex].value == timeFromArray[currentIndex].value) {
            if(!timeToArray[currentIndex].object.hasClass("custom-error")) {
              timeToArray[currentIndex].object.addClass('custom-error');
              timeToArray[currentIndex].object.parent().append(sameSlotError);
              errorCount++;
            }
          } else {
            if(timeToArray[currentIndex].object.hasClass("custom-error")) {
              $(timeToArray[currentIndex].object).removeClass("custom-error");
              $(timeToArray[currentIndex].object).parent().find('.custom-error-span').remove();
              errorCount--;
            }
          }
        }
      });
    });
    return errorCount;
  }
  function getCustomStyleByRole(){
    var selectedRoleName = $('#roleId option:selected').text().trim();
      if(selectedRoleName === serviceProviderRoleName){
        return false; //"display:none";
      }else{
        return true;//"display:block";
      }
  }
  $("#mon-add").click(function() {
    var lastField = $("#mon-buildyourform div:last"); 
    let role = getCustomStyleByRole(); 
    let addCustomStyle = role ? "display:block" : "display:none";
    let addOption = !role ? '<option  selected value="0">0</option>' : '';
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var mon_fieldWrapper = $("<div class=\"form-group mon_fieldwrapper\" id=\"field" + intId + "\"/>");
    mon_fieldWrapper.data("idx", intId);
    let interval = "";
    let stack = "";
    // for (let j=5; j <= 60; j+=5 ) {
    //   interval += `<option value="${j}">${j}</option>`;
    // }
    for (let j=1; j <= 5; j++ ) {
      stack += `<option value="${j}">${j}</option>`;
    }
    var newData = $(
      // "<label for=\"monday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id mon\"> "+ intId + "</label>&nbsp;<label class=\"mon-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"monday[]\" id=\"monday" + intId +"\" class=\"form-control mondayTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
      "<input type=\"time\" name=\"monday[]\" id=\"monday" + (intId + 1) +"\" class=\"form-control mondayTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+ addCustomStyle +"' >" +
    "<select name=\"monday[]\" class=\"form-control type-select-box custom-select mon-buildyourform-selector\" id=\"interval\">" +
    "<option selected disabled>Interval</option>" +
    addOption +
    interval +
    "</select></div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\"  data-idx="+ intId +" style=\'"+addCustomStyle+"'>" +
    "<select name=\"monday[]\" class=\"form-control type-select-box custom-select mon-buildyourform-selector\" id=\"stack\">" +
    "<option selected disabled>Appointment</option>" +
    addOption +
    stack +
    "</select></div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove mon\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $('.slot-id.mon').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      $(this).parent().remove();
      var lastField = $("#mon-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
      removeErrorClass('monday');
    });
    mon_fieldWrapper.append(newData);
    mon_fieldWrapper.append(removeButton);
    $("#mon-buildyourform").append(mon_fieldWrapper);
    
  });

  var removeErrorClass = (field) => {
    let id = field.substring(0, 3);
    if(document.getElementsByName(`${field}[]`).length == 0) {
      $(`#${id}-span`).css("display", "none");
    }
  }

  $("#tue-add").click(function() {
    var lastField = $("#tue-buildyourform div:last");
    let role = getCustomStyleByRole(); 
    let addCustomStyle = role ? "display:block" : "display:none";
    let addOption = !role ? '<option  selected value="0">0</option>' : '';
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var tue_fieldWrapper = $("<div class=\"form-group tue_fieldwrapper\" id=\"field" + intId + "\"/>");
    tue_fieldWrapper.data("idx", intId);
    let interval = "";
    let stack = "";
    // for (let j=5; j <= 60; j+=5 ) {
    //   interval += `<option value="${j}">${j}</option>`;
    // }
    for (let j=1; j <= 5; j++ ) {
      stack += `<option value="${j}">${j}</option>`;
    }
    var newData = $(
      // "<label for=\"tuesday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id tue\"> "+ intId + "</label>&nbsp;<label class=\"tue-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"tuesday[]\" id=\"tuesday" + intId +"\" class=\"form-control tuesdayTime tueTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
      "<input type=\"time\" name=\"tuesday[]\" id=\"tuesday" + (intId + 1) +"\" class=\"form-control tuesdayTime tueTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"tuesday[]\" class=\"form-control type-select-box custom-select tue-buildyourform-selector\" id=\"interval\">" +
    "<option selected disabled>Interval</option>" +
    addOption +
    interval +
    "</select></div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"' >" +
    "<select name=\"tuesday[]\" class=\"form-control type-select-box custom-select tue-buildyourform-selector\" id=\"stack\">" +
    "<option selected disabled>Appointment</option>" +
    addOption +
    stack +
    "</select></div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove tue\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $('.slot-id.tue').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      $(this).parent().remove();
      var lastField = $("#tue-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
      removeErrorClass('tuesday');
    });
    tue_fieldWrapper.append(newData);
    tue_fieldWrapper.append(removeButton);
    $("#tue-buildyourform").append(tue_fieldWrapper);
    
  });

  $("#wed-add").click(function() {
    var lastField = $("#wed-buildyourform div:last");
    let role = getCustomStyleByRole(); 
    let addCustomStyle = role ? "display:block" : "display:none";
    let addOption = !role ? '<option  selected value="0">0</option>' : ''; 
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var wed_fieldWrapper = $("<div class=\"form-group wed_fieldwrapper\" id=\"field" + intId + "\"/>");
    wed_fieldWrapper.data("idx", intId);
    let interval = "";
    let stack = "";
    // for (let j=5; j <= 60; j+=5 ) {
    //   interval += `<option value="${j}">${j}</option>`;
    // }
    for (let j=1; j <= 5; j++ ) {
      stack += `<option value="${j}">${j}</option>`;
    }
    var newData = $(
      // "<label for=\"wednesday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id wed\"> "+ intId + "</label>&nbsp;<label class=\"wed-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"wednesday[]\" id=\"wednesday" + intId +"\" class=\"form-control wednesdayTime wedTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
      "<input type=\"time\" name=\"wednesday[]\" id=\"sunday_to\" class=\"form-control wednesdayTime wedTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"wednesday[]\" class=\"form-control type-select-box custom-select wed-buildyourform-selector\" id=\"interval\">" +
    "<option selected disabled>Interval</option>" +
    addOption +
    interval +
    "</select></div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"wednesday[]\" class=\"form-control type-select-box custom-select wed-buildyourform-selector\" id=\"stack\">" +
    "<option selected disabled>Appointment</option>" +
    addOption +
    stack +
    "</select></div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove wed\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $('.slot-id.wed').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      $(this).parent().remove();
      var lastField = $("#wed-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
      removeErrorClass('wednesday');
    });
    wed_fieldWrapper.append(newData);
    wed_fieldWrapper.append(removeButton);
    $("#wed-buildyourform").append(wed_fieldWrapper);
    
  });

  $("#thu-add").click(function() {
    var lastField = $("#thu-buildyourform div:last");
    let role = getCustomStyleByRole(); 
    let addCustomStyle = role ? "display:block" : "display:none";
    let addOption = !role ? '<option  selected value="0">0</option>' : '';
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var thu_fieldWrapper = $("<div class=\"form-group thu_fieldwrapper\" id=\"field" + intId + "\"/>");
    thu_fieldWrapper.data("idx", intId);
    let interval = "";
    let stack = "";
    // for (let j=5; j <= 60; j+=5 ) {
    //   interval += `<option value="${j}">${j}</option>`;
    // }
    for (let j=1; j <= 5; j++ ) {
      stack += `<option value="${j}">${j}</option>`;
    }
    var newData = $(
      // "<label for=\"thursday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id thu\"> "+ intId + "</label>&nbsp;<label class=\"thu-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"thursday[]\" id=\"thursday" + intId +"\" class=\"form-control thursdayTime thuTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
    "<input type=\"time\" name=\"thursday[]\" id=\"sunday_to\" class=\"form-control thursdayTime thuTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"thursday[]\" class=\"form-control type-select-box custom-select thu-buildyourform-selector\" id=\"interval\">" +
    "<option selected disabled>Interval</option>" +
    addOption +
    interval +
    "</select></div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"thursday[]\" class=\"form-control type-select-box custom-select thus-buildyourform-selector\" id=\"stack\">" +
    "<option selected disabled>Appointment</option>" +
    addOption +
    stack +
    "</select></div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove thu\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $('.slot-id.thu').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      $(this).parent().remove();
      var lastField = $("#thu-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
      removeErrorClass('thursday');
    });
    thu_fieldWrapper.append(newData);
    thu_fieldWrapper.append(removeButton);
    $("#thu-buildyourform").append(thu_fieldWrapper);
    
  });

  $("#fri-add").click(function() {
    var lastField = $("#fri-buildyourform div:last");
    let role = getCustomStyleByRole(); 
    let addCustomStyle = role ? "display:block" : "display:none";
    let addOption = !role ? '<option  selected value="0">0</option>' : '';   
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var fri_fieldWrapper = $("<div class=\"form-group fri_fieldwrapper\" id=\"field" + intId + "\"/>");
    fri_fieldWrapper.data("idx", intId);
    let interval = "";
    let stack = "";
    // for (let j=5; j <= 60; j+=5 ) {
    //   interval += `<option value="${j}">${j}</option>`;
    // }
    for (let j=1; j <= 5; j++ ) {
      stack += `<option value="${j}">${j}</option>`;
    }
    var newData = $(
      // "<label for=\"friday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id fri\"> "+ intId + "</label>&nbsp;<label class=\"fri-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"friday[]\" id=\"friday" + intId +"\" class=\"form-control fridayTime friTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
      "<input type=\"time\" name=\"friday[]\" id=\"sunday_to\" class=\"form-control fridayTime friTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"friday[]\" class=\"form-control type-select-box custom-select fri-buildyourform-selector\" id=\"interval\">" +
    "<option selected disabled>Interval</option>" +
    addOption +
    interval +
    "</select></div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"friday[]\" class=\"form-control type-select-box custom-select fri-buildyourform-selector\" id=\"stack\">" +
    "<option selected disabled>Appointment</option>" +
    addOption +
    stack +
    "</select></div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove fri\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $('.slot-id.fri').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      $(this).parent().remove();
      var lastField = $("#fri-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
      removeErrorClass('friday');
    });
    fri_fieldWrapper.append(newData);
    fri_fieldWrapper.append(removeButton);
    $("#fri-buildyourform").append(fri_fieldWrapper);
    
  });

  $("#sat-add").click(function() {
    var lastField = $("#sat-buildyourform div:last");
    let role = getCustomStyleByRole(); 
    let addCustomStyle = role ? "display:block" : "display:none";
    let addOption = !role ? '<option  selected value="0">0</option>' : ''; 
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var sat_fieldWrapper = $("<div class=\"form-group sat_fieldwrapper\" id=\"field" + intId + "\"/>");
    sat_fieldWrapper.data("idx", intId);
    let interval = "";
    let stack = "";
    // for (let j=5; j <= 60; j+=5 ) {
    //   interval += `<option value="${j}">${j}</option>`;
    // }
    for (let j=1; j <= 5; j++ ) {
      stack += `<option value="${j}">${j}</option>`;
    }
    var newData = $(
      // "<label for=\"saturday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id sat\"> "+ intId + "</label>&nbsp;<label class=\"sat-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"saturday[]\" id=\"saturday" + intId +"\" class=\"form-control saturdayTime satTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
      "<input type=\"time\" name=\"saturday[]\" id=\"sunday_to\" class=\"form-control saturdayTime satTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"' >" +
    "<select name=\"saturday[]\" class=\"form-control type-select-box custom-select sat-buildyourform-selector\" id=\"interval\">" +
    "<option selected disabled>Interval</option>" +
    addOption +
    interval +
    "</select></div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"' >" +
    "<select name=\"saturday[]\" class=\"form-control type-select-box custom-select sat-buildyourform-selector\" id=\"stack\">" +
    "<option selected disabled>Appointment</option>" +
    addOption +
    stack +
    "</select></div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove sat\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $('.slot-id.sat').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      $(this).parent().remove();
      var lastField = $("#sat-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
      removeErrorClass('saturday');
    });
    sat_fieldWrapper.append(newData);
    sat_fieldWrapper.append(removeButton);
    $("#sat-buildyourform").append(sat_fieldWrapper);
    
  });

  $("#sun-add").click(function() {
    var lastField = $("#sun-buildyourform div:last");
    let role = getCustomStyleByRole(); 
    let addCustomStyle = role ? "display:block" : "display:none";
    let addOption = !role ? '<option  selected value="0">0</option>' : '';
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var sun_fieldWrapper = $("<div class=\"form-group sun_fieldwrapper\" id=\"field" + intId + "\"/>");
    sun_fieldWrapper.data("idx", intId);
    let interval = "";
    let stack = "";
    // for (let j=5; j <= 60; j+=5 ) {
    //   interval += `<option value="${j}">${j}</option>`;
    // }
    for (let j=1; j <= 5; j++ ) {
      stack += `<option value="${j}">${j}</option>`;
    }
    var newData = $(
      // "<label for=\"sunday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id sun\"> "+ intId + "</label>&nbsp;<label class=\"sun-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"sunday[]\" id=\"sunday" + intId +"\" class=\"form-control sundayTime sunTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
      "<input type=\"time\" name=\"sunday[]\" id=\"sunday_to\" class=\"form-control sundayTime sunTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\" style=\'"+addCustomStyle+"'>" +
    "<select name=\"sunday[]\" class=\"form-control type-select-box custom-select sun-buildyourform-selector\" id=\"interval\">" +
    "<option selected disabled>Interval</option>" +
    addOption +
    interval +
    "</select></div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to availabilitie-selector\"  style=\'"+addCustomStyle+"'>" +
    "<select name=\"sunday[]\" class=\"form-control type-select-box custom-select sun-buildyourform-selector\" id=\"stack\">" +
    "<option selected disabled>Appointment</option>" +
    addOption +
    stack +
    "</select></div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove sun\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $('.slot-id.sun').each(function( index ) {
        if(parseInt($(this).text()) > parseInt(lblvalue)) {
          let val = parseInt($(this).text());
          val--;
          $(this).text(val.toString());
        }
      });
      $(this).parent().remove();
      var lastField = $("#sun-buildyourform div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
      removeErrorClass('sunday');
    });
    sun_fieldWrapper.append(newData);
    sun_fieldWrapper.append(removeButton);
    $("#sun-buildyourform").append(sun_fieldWrapper);
    
  });

  $('div.custom-slot').css("display","none");
  $('div.custom-slot.active').css("display","block");
  $(".mon-lbl").click(function(e) {
    $('div.custom-slot').css("display","none");
    $('div.custom-slot.active').css("display","block");
  });
  $(".tue-lbl").click(function(e) {
    $('div.custom-slot').css("display","none");
    $('div.tue-div').css("display","block");
  });
  $(".wed-lbl").click(function(e) {
    $('div.custom-slot').css("display","none");
    $('div.wed-div').css("display","block");
  });
  $(".thu-lbl").click(function(e) {
    $('div.custom-slot').css("display","none");
    $('div.thu-div').css("display","block");
  });
  $(".fri-lbl").click(function(e) {
    $('div.custom-slot').css("display","none");
    $('div.fri-div').css("display","block");
  });
  $(".sat-lbl").click(function(e) {
    $('div.custom-slot').css("display","none");
    $('div.sat-div').css("display","block");
  });
  $(".sun-lbl").click(function(e) {
    $('div.custom-slot').css("display","none");
    $('div.sun-div').css("display","block");
  });

  // UNAVAILABILITY DATA-TABLE
  const userId = $('#id').val();
  $("#unavailabilitiesList").dataTable({
    "processing": true,
    "language": {
          "infoFiltered": "",
          processing: '<i style="color: rgb(41, 43, 44);" class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><span class="sr-only"></span> ',
          paginate: {
            previous: '<i class="fa fa-angle-left fa-5" aria-hidden="true"></i>',
            next:     '<i class="fa fa-angle-right fa-5" aria-hidden="true"></i>',
        },
    },
    "serverSide": true,
    "ajax": `/admin/unavailabilities/data/${userId}`,
    'columns': [
      { data: "id" },
      { data: "description" },
      { data: "date" },
      {
        data: "id",
        searchable: false,
        sortable: false,
        render: function (id, type, full, meta) {
          return '<a data-id=' + id + ' data-toggle="tooltip" class="edit-icon" data-toggle="modal" data-target="#UnavailabilityModal" title="Edit"><i class="fa fa-pencil"></i></a> &nbsp; &nbsp; <span data-id=' + id + ' data-toggle="modal" data-target="#deleteUnavailConfirmModal" class="text-red delete-icon"><i class="fa fa-trash" data-toggle="tooltip" title="Delete"></i></span>';
        }
      },
    ]
  });

  $(document).on("click", "input[name='unavailOptions']", function (e) {
    let serviceProviderStatus = availabilitieValidationStatus(); 
    if ($("input[name='unavailOptions']:checked").val() === 'unavailability') {
      $(".hide-desc").hide();
      $("#unavailability-slot").show();
      if(serviceProviderStatus){
      if($('#date').val()){
            $('.service-provider-unavai-block').show();
          }else{
            $('.service-provider-unavai-block').hide();
          }
        }
    } else {
      $(".hide-desc").show();
      $("#unavailability-slot").hide();
      if(serviceProviderStatus){
        $('.service-provider-unavai-block').hide();
      }
    }
    if ($("input[name='unavailOptions']:checked").val() === 'holiday') {
      $(".hide-desc").show();
      $("#unavailability-slot").hide();
      if(serviceProviderStatus){
          $('.service-provider-unavai-block').hide();
      }
    } else {
      $(".hide-desc").hide();
      $("#unavailability-slot").show();
    }
  });

  if($("input[name='unavailOptions']:checked").val() === "unavailability") {
    let serviceProviderStatus = availabilitieValidationStatus(); 
    $(".hide-desc").hide();
    $("#unavailability-slot").show();
    if(serviceProviderStatus){
      if($('#date').val()){
        $('.service-provider-unavai-block').show();
      }else{
        $('.service-provider-unavai-block').hide();
      }
    }
  } else {
    $(".hide-desc").show();
    $("#unavailability-slot").hide();
    $('.service-provider-unavai-block').hide();
  }
//unvaibility time validation 
function unavaibilityServiceProviderTimeValidate() {
  let unavaiTime = true;
  let unaviTimeInvalid = false
  $(".custom-select[name='unavai_time[]']").each(function () {
    if(!$(this).val()) {
      unavaiTime = false;
      if(!$(this).hasClass("custom-error")) {
        $(this).addClass("custom-error");
        const error = "<div class=\"custom-error-span\">Required</div>";
        $(this).parent().append(error);
      }
    } else {
      $(this).removeClass("custom-error");
      $(this).parent().find('.custom-error-span').remove();
    }
  });
  for(var i = 0; i < $('.unAvaiTime').length; i++) {
    if($('.unAvaiTime')[i].value === '') {
      unavaiTime = false;
      if(!$($('.unAvaiTime')[i]).hasClass("custom-error")) {
        const error = "<div class=\"custom-error-span\">Required</div>";
        $($('.unAvaiTime')[i]).addClass("custom-error");
        $($('.unAvaiTime')[i]).parent().append(error);
      }
    } else {
      $($('.unAvaiTime')[i]).removeClass("custom-error");
      $($('.unAvaiTime')[i]).parent().find('.custom-error-span').remove();
    }
    if($($('.unAvaiTime.fromtime')[i]).val() && $($('.unAvaiTime.totime')[i]).val()) {
      var unavaibilityTimeVali = false;
      var unavaibilityTimeValiMessage = `Unavailability time should be between`;
      var timefrom = new Date();
      var tempfrom = $($('.unAvaiTime.fromtime')[i]).val().split(":");
      timefrom.setHours((parseInt(tempfrom[0]) - 1 + 24) % 24);
      timefrom.setMinutes(parseInt(tempfrom[1]));
      var timeto = new Date();
      var tempto = $($('.unAvaiTime.totime')[i]).val().split(":");
      timeto.setHours((parseInt(tempto[0]) - 1 + 24) % 24);
      timeto.setMinutes(parseInt(tempto[1]));
      if(serviceProviderTimeSlots && serviceProviderTimeSlots.length){
        let UnfromTime = getTimeFormateForCompare($($('.unAvaiTime.fromtime')[i]).val());
        let UnToTime = getTimeFormateForCompare($($('.unAvaiTime.totime')[i]).val());
        serviceProviderTimeSlots.forEach(function(time, index, arr){
          let fromExistTime = getTimeFormateForCompare(time['from']);
          let toExistTime = getTimeFormateForCompare(time['to']);
          if(fromExistTime <= UnfromTime && toExistTime > UnfromTime && UnfromTime!= UnToTime && UnfromTime < UnToTime && toExistTime >= UnToTime && fromExistTime < UnToTime){
            unavaibilityTimeVali = true;
          }else{
            unavaibilityTimeValiMessage += ` From - ${time['from']} To - ${time['to']} & ` 
          }
        })
      }
      if(!unavaibilityTimeVali){
        unavaiTime = false;
        unaviTimeInvalid = true;
        if(!$($('#unavai-inavalid-time-span')).hasClass("custom-error")) {
          const error = `<div class=\"custom-error-span\">${unavaibilityTimeValiMessage}</div>`;
          $($('#unavai-inavalid-time-span')).addClass("custom-error");
          $($('#unavai-inavalid-time-span')).append(error);
        }
      }
    }
  }
  if(!unavaiTime) {
    if(unaviTimeInvalid) {
      $("#unavai-time-span").text("Invalid time");
      $("#unavai-time-span").css("display","block"); 

    }else {
      $("#unavai-time-span").text("Required");
      $("#unavai-time-span").css("display","block");
    }
  }else {
    $($('#unavai-inavalid-time-span')).removeClass("custom-error");
    $($('#unavai-inavalid-time-span')).parent().find('.custom-error-span').remove();
    $("#unavai-time-span").css("display","none");
  }

  if(unavaiTime && !unaviTimeInvalid) {
    return ServiceProvidertimeslotValidate();
  }
  return false;
}
function ServiceProvidertimeslotValidate() {
  let timevalidate = validateTimeByDay('unavai_time');
    if(timevalidate == 0) {
      $("#unavai-time-span").text("");
      $("#unavai-time-span").css("display","block"); 
    } else {
      $("#unavai-time-span").text("Invalid time!");
      $("#unavai-time-span").css("display","block");
    }
    if(timevalidate == 0) {
      return true;
    } else {
      return false;
    }
}

$('.submit-unavil').click(function(e) {
  let serviceProvider = availabilitieValidationStatus();
  if(serviceProvider){
    $("#unavailabilities-form").valid();
  return unavaibilityServiceProviderTimeValidate();
  }
});


  // ON SUBMIT ADD/UPDATE UNAVAILABILITY
  $(document).on("click", ".submit-unavil", function (e) {
    e.preventDefault();
    let serviceProviderStatus = availabilitieValidationStatus(); 
      $("#unavailabilities-form").valid();
      const user_id = $("#id").val();
      const description = $("#description").val();
      const date = $("#date").val();
      const unAvilId = $("#unAvilId").val()
      const is_full_day = $("input[name='unavailOptions']:checked").val() === "holiday" ? 1 : 0;
      if(serviceProviderStatus){
        const unavaavailableSlotTimes = $.map($('input[name="unavai_time[]"]'), function(c){ return c.value; });
        if($("input[name='unavailOptions']:checked").val() === "unavailability" && (!date || (unavaavailableSlotTimes && !unavaavailableSlotTimes.length))) {
          return false;
        }
        if($("input[name='unavailOptions']:checked").val() === "holiday" && (!description || !date)) {
          return false;
        }

        if(unAvilId) {
          $.ajax({
            url: `/admin/service-provider/unavailabilities/update`,
            type: "post",
            data: { id: unAvilId, user_id, description, date, unavaavailableSlotTimes, is_full_day },
          }).done(function (result) {
            if(result && result.data) {
              $("#date-error").remove();
              $('#UnavailabilityModal').modal('hide');
              $('#unavailabilitiesList').DataTable().ajax.reload();
              $("#unavailabilities-form").each(function() {
                this.reset();
              });
            } else {
              $("input#date").after('<span id="date-error" class="error">Date is already exist</span>');
            }
          });
        }else{
          $.ajax({
            url: `/admin/serviceprovider-unavailabilities`,
            type: "post",
            data: { user_id, description, date, unavaavailableSlotTimes, is_full_day },
          }).done(function (result) {
            if(result && result.data) {
              $("#date-error").remove();
              $('#UnavailabilityModal').modal('hide');
              $('#unavailabilitiesList').DataTable().ajax.reload();
              //$("#unavailability-slot").html("<label for=\"holiday\" class=\"holiday-slot\">Slots: </label>");
              $("#unavailabilities-form").each(function(){
                this.reset();
              });
            } else {
              $("input#date").after('<span id="date-error" class="error">Date is already exist</span>');
            }
          });
        }
      }else{
        const slotId = $.map($('input[name="slotId[]"]:unchecked'), function(c){ return c.value; });
        if($("input[name='unavailOptions']:checked").val() === "unavailability" && (!date || (slotId && !slotId.length))) {
          return false;
        }
        if($("input[name='unavailOptions']:checked").val() === "holiday" && (!description || !date)) {
          return false;
        }
        const availableSlotId = $.map($('input[name="slotId[]"]:checked'), function(c){ return c.value; });
        //const is_full_day = $("input[name='unavailOptions']:checked").val() === "holiday" ? 1 : 0;
        if(unAvilId) {
          $.ajax({
            url: `/admin/unavailabilities/update`,
            type: "post",
            data: { id: unAvilId, user_id, description, date, slotId, is_full_day },
          }).done(function (result) {
            if(result && result.data) {
              $("#date-error").remove();
              $('#UnavailabilityModal').modal('hide');
              $('#unavailabilitiesList').DataTable().ajax.reload();
              $("#unavailability-slot").html("<label for=\"holiday\" class=\"holiday-slot\">Slots: </label>");
              $("#unavailabilities-form").each(function() {
                this.reset();
              });
            } else {
              $("input#date").after('<span id="date-error" class="error">Date is already exist</span>');
            }
          });
        } else {
          // if(slotId && !slotId.length) {
          //   $('.submit-unavil').prop('disabled', true);
          //   return false;
          // } else {
          //   $('.submit-unavil').prop('disabled', false);
          // }
          $.ajax({
            url: `/admin/unavailabilities`,
            type: "post",
            data: { user_id, description, date, slotId, is_full_day },
          }).done(function (result) {
            if(result && result.data) {
              $("#date-error").remove();
              $('#UnavailabilityModal').modal('hide');
              $('#unavailabilitiesList').DataTable().ajax.reload();
              $("#unavailability-slot").html("<label for=\"holiday\" class=\"holiday-slot\">Slots: </label>");
              $("#unavailabilities-form").each(function(){
                this.reset();
              });
            } else {
              $("input#date").after('<span id="date-error" class="error">Date is already exist</span>');
            }
          });
        }
      }
  });


  // ON MODAL CLOSE RESET FORM
  $('#UnavailabilityModal').on('hidden.bs.modal', function () {
    $("#unavailability-slot").html("<label for=\"holiday\" class=\"holiday-slot\">Slots: </label>");
    $("#unavailabilities-form").each(function(){
      this.reset();
    });
    $("#date").prop('disabled', false);
    $("#unAvilId").val('');
    $("#optionsRadios1").prop('checked', true); 
    $('#optionsRadios2').prop('checked', false);
    if ($("input[name='unavailOptions']:checked").val() === 'unavailability') {
      $(".hide-desc").hide();
      $("#unavailability-slot").show();
    } else {
      $(".hide-desc").show();
      $("#unavailability-slot").hide();
    }
  })


  // GET UNAVAILABILITY DATA
  $(document).on("click", ".edit-icon", function (e) {
    e.preventDefault();
    let serviceProviderStatus = availabilitieValidationStatus(); 
    if($("input[name='unavailOptions']:checked").val() === "unavailability") {
      $(".hide-desc").hide();
    } else {
      $(".hide-desc").show();
    }
    var id = $(this).attr("data-id");
    $("#date").prop('disabled', true);
    $("#use_id").val(id);
    if(serviceProviderStatus){
      $.ajax({
        url: `/admin/serviceprovider-unavailabilities/${id}`,
        type: "get",
      }).done(function (result) {
        if(result && result.data) {
          if (result.data.description) {
            $("#optionsRadios1").prop('checked', false); 
            $('#optionsRadios2').prop('checked', true);
            $(".hide-desc").show();
            $('.service-provider-unavai-block').hide();
          } else {
            $('#optionsRadios1').attr('checked');
            $('.service-provider-unavai-block').show();
          }
          $("#unAvilId").val(result.data.id);
          $("#description").val(result.data.description);
          $("#date").val(result.data.date);
          getServiceProviderAppointmentTimes(result.data.id);
          if(result.data.UnAvailabilitiesComponents){
            $(".serviceProvider-slot,.custom-error-span").empty();
            $('#service-unavaibility-times').show();
            result.data.UnAvailabilitiesComponents.forEach(function (slot, i) {
            addUnavaiField(slot.from, slot.to);
            });
          }
        }
      });
    }else{
        $.ajax({
          url: `/admin/unavailabilities/${id}`,
          type: "get",
        }).done(function (result) {
          let html = "<label for=\"holiday\" class=\"holiday-slot\">Slots: </label>";
          if(result && result.data) {
            if (result.data.description) {
              $("#unavailability-slot").hide();
              $("#optionsRadios1").prop('checked', false); 
              $('#optionsRadios2').prop('checked', true);
              $(".hide-desc").show();
            } else {
              $("#unavailability-slot").show();
              $('#optionsRadios1').attr('checked');
            }
            $("#unAvilId").val(result.data.id);
            $("#description").val(result.data.description);
            $("#date").val(result.data.date);
            result.data.slots.forEach(function (slot, i) {
            let check = result.data.UnAvailabilitiesComponents.includes(slot.id) ? 'unchecked' : 'checked';
            html += "<div class=\"checkbox unavailability-slot\"><label>" +
                    "<input name=\"slotId[]\" value=\""+slot.id+"\" type=\"checkbox\" style=\"border-radius: 15px !important;\" "+check+">" +
                    `${slot.from} - ${slot.to}` + 
                    "</label></div>";
            });
            $("#unavailability-slot").html(html);
          }
        });
      }
    $('#UnavailabilityModal').modal('show');
  });
  
  // DELETE UNAVAILABILITY
  $(document).on("click", ".delete-icon", function () {
    var id = $(this).attr("data-id");
    $('.delete-item').attr("data-id", id);
  });
  $(document).on("click", ".delete-item", function (e) {
    e.preventDefault();
    let serviceProviderStatus = availabilitieValidationStatus(); 
    var id = $(this).attr("data-id");
    if(serviceProviderStatus){
      $.ajax({
        url: `/admin/serviceprovider-unavailabilities/${id}/delete`,
        type: "get",
      }).done(function (result) {
        if(result) {
          $('#deleteUnavailConfirmModal').modal('hide');
          $('#unavailabilitiesList').DataTable().ajax.reload();
        }
      });
    }else{
      $.ajax({
        url: `/admin/unavailabilities/${id}/delete`,
        type: "get",
      }).done(function (result) {
        if(result) {
          $('#deleteUnavailConfirmModal').modal('hide');
          $('#unavailabilitiesList').DataTable().ajax.reload();
        }
      });
    }
  });

  $(document).on('click', '.custom-un-avail-btn', function(){
    $('.serviceProvider-slot').empty();
    $('#unavai-inavalid-time-span, #unavai-time-span').empty();
    $('#service-unavaibility-times').hide();
  });

  // GET SLOTS ON DATE CHANGE
  var serviceProviderTimeSlots = [];
  $('#date').change(function(){
    let serviceProviderStatus = availabilitieValidationStatus(); 
    $('#date').prop('min', function() {
      return new Date().toJSON().split('T')[0];
    });
    $("#date-error").remove();
    if(serviceProviderStatus){
      getServiceProviderAppointmentTimes(null);
    }else{
      $.ajax({
        url: "/admin/unavailabilities/getSlots",
        type: "post",
        data: { user_id: $("#id").val(), date: $("#date").val() }
      }).done(function (result) {
        let html = "<label for=\"holiday\" class=\"holiday-slot\">Slots: </label>";
        
        if(result && result.data && result.data && result.data.length) {
          result.data.forEach(function (slot, i) {
            html += "<div class=\"checkbox unavailability-slot\"><label>" +
              "<input name=\"slotId[]\" value=\""+slot.id+"\" type=\"checkbox\" style=\"border-radius: 15px !important;\" checked>" +
              `${slot.from} - ${slot.to}` + 
              "</label></div>";
          });
          $("#unavailability-slot").html(html);
          // $(".submit-unavil").css("pointer-events", "unset");
        } else {
          $("#unavailability-slot").html(html+"<p class=\"no-slot\">No slots available.</p>");
          // $(".submit-unavil").css("pointer-events", "none");
        }
      });
    }
  });
 
function getServiceProviderAppointmentTimes(updateID = null){
  $.ajax({ 
    url: "/admin/unavailabilities/getTimes",
    type: "post",
    data: { user_id: $("#id").val(), date: $("#date").val() }
  }).done(function (result) {
    if(result && result.data && result.data && result.data.length && !result.data.status) {
      serviceProviderTimeSlots = result.data;
      if(!updateID){
        $('.no-slot').remove();
        $(".serviceProvider-slot").empty();
        addUnavaiField(null, null);
        $('#service-unavaibility-times').show();
        $(".submit-unavil").css("pointer-events", "unset");
      }
    } else {
      $('.service-provider-unavai-block').show();
      $('#service-unavaibility-times').hide(); 
      $(".serviceProvider-slot").html("<p class=\"no-slot\">No slots available.</p>");
      $(".submit-unavil").css("pointer-events", "none");
    }
  });
}


  // UNAVAILABILITY FORM VALDATION    FOR VET
  $("#unavailabilities-form").validate({
    rules: {
      description: {
        required: {
          depends:function() {
            if($("input[name='unavailOptions']:checked").val() === "unavailability") {
              return false
            }
            return true;
          }
        }
      },
      date: {
        required: true,
      },
    },
    messages: {
      description: {
        required: 'Description is required',
      },
      date: {
        required: 'Date is required',
      },
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form) => {
      form.submit()
    },
  });
  function addUnavaiField(from = null, to = null){
    var lastField = $(".serviceProvider-slot div:last"); 
    let role = getCustomStyleByRole(); 
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var times_fieldWrapper = $("<div class=\"form-group times_fieldwrapper\" id=\"field" + intId + "\"/>");
    times_fieldWrapper.data("idx", intId);
    var newData = $(
      "<div class=\"col-sm-6 form-inline custom-input-padding from-time\">" +
        "<input type=\"time\"   name=\"unavai_time[]\" value=\""+from+"\" id=\"unvaib-time" + intId +"\" class=\"form-control unavai_timeTime unAvaiTime fromtime\">" +
      "</div>" +
      "<div class=\"col-sm-6 form-inline to-time custom-to\">" +
        "<input type=\"time\"  name=\"unavai_time[]\" value=\""+to+"\" id=\"unvaib-time" + (intId+1) +"\" class=\"form-control unavai_timeTime unAvaiTime totime\">" + 
      "</div>"
    );
    newData.data("idx", intId);
    var removeButton = $("<input type=\"button\" class=\"remove times\" value=\"-\" style=\"position: absolute;margin-left: -2%;padding-top: 4px;padding-bottom: 4px;\" /><br\/><br\/>");
    removeButton.click(function() {
      const lblvalue = $($(this).parent().children('label').eq(1)).text();
      $(this).parent().remove();
      var lastField = $(".serviceProvider-slot div:last");
      var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
      if(parseInt(lblvalue) === intId){
        lastField.data("idx", intId-1);
      }else {
        lastField.data("idx", intId-2);
      }
    });
    times_fieldWrapper.append(newData);
    times_fieldWrapper.append(removeButton);
    if ($("input[name='unavailOptions']:checked").val() != 'holiday') {
    $('.service-provider-unavai-block').show();
    }
    $(".serviceProvider-slot").append(times_fieldWrapper); 
  }
  //service provider unavaibility times add
  $("#service-unavaibility-times").click(function() {
    addUnavaiField(null, null);
  });


  $('#is_online_consultation').click(function(){
    if($(this).is(":checked")){
      $("#online_consultation").prop('disabled', false);
    }
    else if($(this).is(":not(:checked)")){
      $("#online_consultation").prop('disabled', true);
    }
  });

  $('#is_in_clinic_consultation').click(function(){
    if($(this).is(":checked")){
      $("#in_clinic_consultation").prop('disabled', false);
    }
    else if($(this).is(":not(:checked)")){
      $("#in_clinic_consultation").prop('disabled', true);
    }
  });

  if($("#is_online_consultation").prop('checked') == true) {
    $("#online_consultation").prop('disabled', false);
  } else {
    $("#online_consultation").prop('disabled', true);
  }

  if($("#is_in_clinic_consultation").prop('checked') == true || $('#roleId option:selected').text().trim() == "Groomers" || $('#roleId option:selected').text().trim() == "Walkers" || $('#roleId option:selected').text().trim() == "Therapists" || $('#roleId option:selected').text().trim() == "Nutritionists" || $('#roleId option:selected').text().trim() == "Breeders") {
    $("#in_clinic_consultation").prop('disabled', false);
  } else {
    $("#in_clinic_consultation").prop('disabled', true);
  }
})
