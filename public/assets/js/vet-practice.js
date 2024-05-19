$(() => {
  // show image before upload
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#practice-img').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#practiceImage").change(function() {
    readURL(this);
  });

  // check email already exist or not.
  $.validator.addMethod("validateVetPracticeEmail", function(value, element)
  {   
      var flag = false;
      var inputElem = $('#vetPracticesForm :input[name="email"]'),
          data = { "email" : inputElem.val(), "id": $('#id').val() || '' },
          eReport = ''; //error report
      $.ajax(
      {
          type: "POST",
          url: "/admin/checkVetPracticeEmail",
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

  $("#vetPracticesForm").validate({
    rules: {
      practice_name: {
        required: true,
        maxlength: 255,
        regexWhitespace: true
      },
      address1: {
        required: true,
        regexWhitespace: true
      },
      // address2: {
      //   required: true
      // },
      city: {
        // required: true,
        regexWhitespace: true
      },
      country: {
        required: true
      },
      state: {
        required: true
      },
      zip_code: {
        required: false,
        maxlength: 10
      },
      int_code: {
        maxlength: 5,
      },
      email: {
        required: true,
        regx: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        validateVetPracticeEmail: true
      },
      monday_from: {
      },
      monday_to: {
        greaterThan: "#monday_from"
      },
      tuesday_from: {
      },
      tuesday_to: {
        greaterThan: "#tuesday_from"
      },
      wednesday_from: {
      },
      wednesday_to: {
        greaterThan: "#wednesday_from"
      },
      thursday_from: {
      },
      thursday_to: {
        greaterThan: "#thursday_from"
      },
      friday_from: {
      },
      friday_to: {
        greaterThan: "#friday_from"
      },
      saturday_from: {
      },
      saturday_to: {
        greaterThan: "#saturday_from"
      },
      sunday_from: {
      },
      sunday_to: {
        greaterThan: "#sunday_from"
      },
      business_phone: {
        required: true,
        regexWhitespace: true,
        regex: /[^\s]([ ]{2,})[^\s]/,
        regex1: /^[^\s]+(\s+[^\s]+)*$/,
        mobileCheck: true,
        length: true,
      },
      website: {
        regx: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
      },
      out_of_hr_phone: {
        regx: /^(?=.*\d)[\d ]+$/
      }
    },
    messages: {
      email: {
        required: "Email is required",
        regx: "Please enter valid Email address",
        validateVetPracticeEmail: "Email already exists"
      },
      practice_name: {
        required: "Practice name is required",
        maxlength: 'Practice name length should not be greater than 255',
        regexWhitespace: 'Practice name should not contain only whitespace',
      },
      address1: {
        required: "Address1 is required",
        regexWhitespace: 'Address1 should not contain only whitespace',
      },
      // address2: {
      //   required: "Address2 is required"
      // },
      city: {
        // required: "City is required",
        regexWhitespace: 'City should not contain only whitespace',
      },
      country: {
        required: "Country is required"
      },
      state: {
        required: "State is required"
      },
      zip_code: {
        maxlength: "Zip code should not more than 10 digits"
      },
      int_code: {
        maxlength: 'Int code should not more than 5 digits'
      },
      business_phone: {
        required: "Business phone number is required",
        regexWhitespace: "Business phone number should not contain only whitespace",
        regex: "Business phone number should not contain more than one whitespace in between",
        regex1: "Business phone number should not contain whitespace at the beginning and end",
        length: "Business phone number must be between 8-15 digits",
      },
      out_of_hr_phone: {
        regx: "Phone number must be number"
      },
      website: {
        regx: 'Invalid website URL'
      }
    },
    errorElement: "span",
    errorLabelContainer: ".error",
    submitHandler: (form, event) => {
      event.preventDefault();
      timeValidate();
      form.submit()
    },
  })

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

  function timeValidate() {
    let mon, tue, wed, thu, fri, sat, sun;
    mon = tue = wed = thu = fri = sat = sun = true;
    let monInvalid, tueInvalid, wedInvalid, thuInvalid, friInvalid, satInvalid, sunInvalid;
    monInvalid = tueInvalid = wedInvalid = thuInvalid = friInvalid = satInvalid = sunInvalid = false;
    for(var i = 0; i < $('.mondayTime').length; i++) {
      if($('.mondayTime')[i].value === '') {
        mon = false;
        if(!$($('.mondayTime')[i]).hasClass("custom-error")) {
          const error = "<div class=\"custom-error-span\">From or To time can not be blank</div>";
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
          const error = "<div class=\"custom-error-span\">From or To time can not be blank</div>";
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
          const error = "<div class=\"custom-error-span\">From or To time can not be blank</div>";
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
          const error = "<div class=\"custom-error-span\">From or To time can not be blank</div>";
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
          const error = "<div class=\"custom-error-span\">From or To time can not be blank</div>";
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
          const error = "<div class=\"custom-error-span\">From or To time can not be blank</div>";
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
          const error = "<div class=\"custom-error-span\">From or To time can not be blank</div>";
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
    $("#vetPracticesForm").valid();
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

    const invalidSlotError = "<span class=\"custom-error-span\">Invalid time slot</span>";
    const sameSlotError = "<span class=\"custom-error-span\">From and To time can not be same</span>";
    const occupiedError = "<span class=\"custom-error-span\">This time is already occupied</span>";

    if(timeFromArray[0] && timeFromArray[0].value && timeToArray[0] && timeToArray[0].value) {
      if(timeFromArray[0].value == timeToArray[0].value) {
        if(!timeToArray[0].object.hasClass("custom-error")) {
          timeToArray[0].object.addClass('custom-error');
          timeToArray[0].object.parent().append(sameSlotError);
          console.log("FORM HERE >>>>", 1);
          errorCount++;
        }
      } else if(!(timeFromArray[0].value < timeToArray[0].value) && !(timeFromArray[0].value >= 24)) {
        if(!timeToArray[0].object.hasClass("custom-error")) {
          timeToArray[0].object.addClass('custom-error');
          timeToArray[0].object.parent().append(invalidSlotError);
          console.log("FORM HERE >>>>", 2);
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
            // if(!timeFromArray[currentIndex].object.hasClass("custom-error")) {
            //   timeFromArray[currentIndex].object.addClass('custom-error');
            //   timeFromArray[currentIndex].object.parent().append(occupiedError);
            //   console.log("FORM HERE >>>>", 3);
            //   errorCount++;
            // }
          } else if(timeFromArray[currentIndex].value < timeToArray[index].value) {
            if(!timeFromArray[currentIndex].object.hasClass("custom-error")) {
              timeFromArray[currentIndex].object.addClass('custom-error');
              timeFromArray[currentIndex].object.parent().append(invalidSlotError);
              console.log("FORM HERE >>>>", 4);
              errorCount++;
            }
          } else if(timeFromArray[currentIndex].value == timeToArray[currentIndex].value) {
            if(!timeFromArray[currentIndex].object.hasClass("custom-error")) {
              timeFromArray[currentIndex].object.addClass('custom-error');
              timeFromArray[currentIndex].object.parent().append(sameSlotError);
              console.log("FORM HERE >>>>", 5);
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
            // if(!timeToArray[currentIndex].object.hasClass("custom-error")) {
            //   timeToArray[currentIndex].object.addClass('custom-error');
            //   timeToArray[currentIndex].object.parent().append(occupiedError);
            //   console.log("FORM HERE >>>>", 6);
            //   errorCount++;
            // }
          }
          //  else if(timeFromArray[currentIndex].value > timeToArray[currentIndex].value || timeToArray[currentIndex].value < timeToArray[index].value) {
          //   if(!timeToArray[currentIndex].object.hasClass("custom-error")) {
          //     timeToArray[currentIndex].object.addClass('custom-error');
          //     timeToArray[currentIndex].object.parent().append(invalidSlotError);
          //     console.log("FORM HERE >>>>", 7);
          //     errorCount++;
          //   }
          // }
           else if(timeToArray[currentIndex].value == timeFromArray[currentIndex].value) {
            if(!timeToArray[currentIndex].object.hasClass("custom-error")) {
              timeToArray[currentIndex].object.addClass('custom-error');
              timeToArray[currentIndex].object.parent().append(sameSlotError);
              console.log("FORM HERE >>>>", 8);
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

  $("#mon-add").click(function() {
    var lastField = $("#mon-buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var mon_fieldWrapper = $("<div class=\"form-group mon_fieldwrapper\" id=\"field" + intId + "\"/>");
    mon_fieldWrapper.data("idx", intId);
    var newData = $("<label for=\"monday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id mon\"> "+ intId + "</label>&nbsp;<label class=\"mon-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"monday[]\" id=\"monday" + intId +"\" class=\"form-control mondayTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to\">" +
      "<input type=\"time\" name=\"monday[]\" id=\"monday" + (intId + 1) +"\" class=\"form-control mondayTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>");
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
    });
    mon_fieldWrapper.append(newData);
    mon_fieldWrapper.append(removeButton);
    $("#mon-buildyourform").append(mon_fieldWrapper);
  });

  $("#tue-add").click(function() {
    var lastField = $("#tue-buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var tue_fieldWrapper = $("<div class=\"form-group tue_fieldwrapper\" id=\"field" + intId + "\"/>");
    tue_fieldWrapper.data("idx", intId);
    var newData = $("<label for=\"tuesday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id tue\"> "+ intId + "</label>&nbsp;<label class=\"tue-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"tuesday[]\" id=\"tuesday" + intId +"\" class=\"form-control tuesdayTime tueTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to custom-to\">" +
      "<input type=\"time\" name=\"tuesday[]\" id=\"tuesday" + (intId + 1) +"\" class=\"form-control tuesdayTime tueTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>");
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
    });
    tue_fieldWrapper.append(newData);
    tue_fieldWrapper.append(removeButton);
    $("#tue-buildyourform").append(tue_fieldWrapper);
  });

  $("#wed-add").click(function() {
    var lastField = $("#wed-buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var wed_fieldWrapper = $("<div class=\"form-group wed_fieldwrapper\" id=\"field" + intId + "\"/>");
    wed_fieldWrapper.data("idx", intId);
    var newData = $("<label for=\"wednesday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id wed\"> "+ intId + "</label>&nbsp;<label class=\"wed-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"wednesday[]\" id=\"wednesday" + intId +"\" class=\"form-control wednesdayTime wedTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to custom-to\">" +
      "<input type=\"time\" name=\"wednesday[]\" id=\"sunday_to\" class=\"form-control wednesdayTime wedTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>");
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
    });
    wed_fieldWrapper.append(newData);
    wed_fieldWrapper.append(removeButton);
    $("#wed-buildyourform").append(wed_fieldWrapper);
  });

  $("#thu-add").click(function() {
    var lastField = $("#thu-buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var thu_fieldWrapper = $("<div class=\"form-group thu_fieldwrapper\" id=\"field" + intId + "\"/>");
    thu_fieldWrapper.data("idx", intId);
    var newData = $("<label for=\"thursday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id thu\"> "+ intId + "</label>&nbsp;<label class=\"thu-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"thursday[]\" id=\"thursday" + intId +"\" class=\"form-control thursdayTime thuTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to custom-to\">" +
      "<input type=\"time\" name=\"thursday[]\" id=\"sunday_to\" class=\"form-control thursdayTime thuTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>");
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
    });
    thu_fieldWrapper.append(newData);
    thu_fieldWrapper.append(removeButton);
    $("#thu-buildyourform").append(thu_fieldWrapper);
  });

  $("#fri-add").click(function() {
    var lastField = $("#fri-buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var fri_fieldWrapper = $("<div class=\"form-group fri_fieldwrapper\" id=\"field" + intId + "\"/>");
    fri_fieldWrapper.data("idx", intId);
    var newData = $("<label for=\"friday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id fri\"> "+ intId + "</label>&nbsp;<label class=\"fri-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"friday[]\" id=\"friday" + intId +"\" class=\"form-control fridayTime friTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to custom-to\">" +
      "<input type=\"time\" name=\"friday[]\" id=\"sunday_to\" class=\"form-control fridayTime friTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>");
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
    });
    fri_fieldWrapper.append(newData);
    fri_fieldWrapper.append(removeButton);
    $("#fri-buildyourform").append(fri_fieldWrapper);
  });

  $("#sat-add").click(function() {
    var lastField = $("#sat-buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var sat_fieldWrapper = $("<div class=\"form-group sat_fieldwrapper\" id=\"field" + intId + "\"/>");
    sat_fieldWrapper.data("idx", intId);
    var newData = $("<label for=\"saturday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id sat\"> "+ intId + "</label>&nbsp;<label class=\"sat-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"saturday[]\" id=\"saturday" + intId +"\" class=\"form-control saturdayTime satTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to custom-to\">" +
      "<input type=\"time\" name=\"saturday[]\" id=\"sunday_to\" class=\"form-control saturdayTime satTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>");
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
    });
    sat_fieldWrapper.append(newData);
    sat_fieldWrapper.append(removeButton);
    $("#sat-buildyourform").append(sat_fieldWrapper);
  });

  $("#sun-add").click(function() {
    var lastField = $("#sun-buildyourform div:last");
    var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
    var sun_fieldWrapper = $("<div class=\"form-group sun_fieldwrapper\" id=\"field" + intId + "\"/>");
    sun_fieldWrapper.data("idx", intId);
    var newData = $("<label for=\"sunday" + intId + "\" class=\"\">Slot </label>&nbsp;<label class=\"slot-id sun\"> "+ intId + "</label>&nbsp;<label class=\"sun-invalid-time time-error\"></label><br/>" +
    "<div class=\"col-sm-2 form-inline custom-input-padding from-time\">" +
      "<input type=\"time\" name=\"sunday[]\" id=\"sunday" + intId +"\" class=\"form-control sundayTime sunTime typeTime fromtime\" value=\"<%= typeof responseData==='object'?responseData.sunday_from:'' %>\">" +
    "</div>" +
    "<div class=\"col-sm-2 form-inline to-time custom-to custom-to\">" +
      "<input type=\"time\" name=\"sunday[]\" id=\"sunday_to\" class=\"form-control sundayTime sunTime typeTime totime\" value=\"<%= typeof responseData==='object'?responseData.sunday_to:'' %>\">" + 
    "</div>");
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
})
