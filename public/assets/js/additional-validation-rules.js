$.validator.addMethod(
  'regx',
  (value, element, regexpr) => value != "" ? regexpr.test(value) : true,
  'Please enter a error message'
);

$.validator.addMethod(
  'regexWhitespace',
  value => value != "" ? (/.*\S.*/).test(value) : true,
  'Please enter a error message'
);

/** Mobile Validation rule */
$.validator.addMethod(
  'mobileCheck',
  value => {
    // return '^[\d ]*$'.test(value);
    return /^(?=.*\d)[\d ]+$/.test(value);
  },
  'Mobile number must be number'
);

/** Greater than Validation rule */
$.validator.addMethod(
  'greaterThan',
  (value, element, params) => {
    var timefrom = new Date();
    temp = $(params)
      .val()
      .split(':');
    timefrom.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timefrom.setMinutes(parseInt(temp[1]));

    var timeto = new Date();
    temp = value
      .split(':');
    timeto.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timeto.setMinutes(parseInt(temp[1]));

    if (timeto < timefrom) {
      return false;
    } else {
      return true;
    }
  },
  'Closing time is invalid'
);

/** Password Validation rule */
$.validator.addMethod(
  "check_password",
  function(value, element, regexp) {
    regexp = /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return regexp.test(value);
  },
);
