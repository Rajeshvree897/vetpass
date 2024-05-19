'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "specialities",
      [
        {
           "id":1,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"United Kingdom",
           "sort_id":1,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":2,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ireland",
           "sort_id":2,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":3,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Europe",
           "sort_id":3,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":4,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Europe ex UK",
           "sort_id":4,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":5,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"International",
           "sort_id":5,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":6,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"United States of America",
           "sort_id":6,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":7,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Alabama",
           "sort_id":7,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":8,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Alaska",
           "sort_id":8,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":9,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"American Samoa",
           "sort_id":9,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":10,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Arizona",
           "sort_id":10,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":11,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Arkansas",
           "sort_id":11,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":12,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"California",
           "sort_id":12,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":13,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Colorado",
           "sort_id":13,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":14,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Connecticut",
           "sort_id":14,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":15,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Delaware",
           "sort_id":15,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":16,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"District of Columbia",
           "sort_id":16,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":17,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Florida",
           "sort_id":17,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":18,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Georgia",
           "sort_id":18,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":19,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Guam",
           "sort_id":19,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":20,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Hawaii",
           "sort_id":20,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":21,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Idaho",
           "sort_id":21,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":22,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Illinois",
           "sort_id":22,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":23,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Indiana",
           "sort_id":23,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":24,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Iowa",
           "sort_id":24,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":25,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Kansas",
           "sort_id":25,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":26,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Kentucky",
           "sort_id":26,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":27,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Louisiana",
           "sort_id":27,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":28,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Maine",
           "sort_id":28,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":29,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Maryland",
           "sort_id":29,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":30,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Massachusetts",
           "sort_id":30,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":31,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Michigan",
           "sort_id":31,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":32,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Minnesota",
           "sort_id":32,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":33,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mississippi",
           "sort_id":33,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":34,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Missouri",
           "sort_id":34,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":35,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Montana",
           "sort_id":35,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":36,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nebraska",
           "sort_id":36,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":37,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nevada",
           "sort_id":37,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":38,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New Hampshire",
           "sort_id":38,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":39,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New Jersey",
           "sort_id":39,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":40,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New Mexico",
           "sort_id":40,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":41,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New York",
           "sort_id":41,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":42,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"North Carolina",
           "sort_id":42,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":43,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"North Dakota",
           "sort_id":43,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":44,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Northern Mariana Islands",
           "sort_id":44,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":45,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ohio",
           "sort_id":45,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":46,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Oklahoma",
           "sort_id":46,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":47,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Oregon",
           "sort_id":47,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":48,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pennsylvania",
           "sort_id":48,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":49,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Puerto Rico",
           "sort_id":49,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":50,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Rhode Island",
           "sort_id":50,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":51,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"South Carolina",
           "sort_id":51,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":52,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"South Dakota",
           "sort_id":52,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":53,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tennessee",
           "sort_id":53,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":54,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Texas",
           "sort_id":54,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":55,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"U.S. Minor Outlying Islands",
           "sort_id":55,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":56,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Utah",
           "sort_id":56,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":57,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Vermont",
           "sort_id":57,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":58,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Virgin Islands",
           "sort_id":58,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":59,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Virginia",
           "sort_id":59,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":60,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Washington",
           "sort_id":60,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":61,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"West Virginia",
           "sort_id":61,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":62,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Wisconsin",
           "sort_id":62,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":63,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Wyoming",
           "sort_id":63,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":64,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Afghanistan (Islamic Emirate)",
           "sort_id":64,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":65,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Albania",
           "sort_id":65,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":66,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Algeria",
           "sort_id":66,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":67,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"American Samoa",
           "sort_id":67,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":68,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Andorra",
           "sort_id":68,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":69,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Angola",
           "sort_id":69,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":70,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Anguilla",
           "sort_id":70,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":71,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Antigua and Barbuda",
           "sort_id":71,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":72,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Argentina",
           "sort_id":72,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":73,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Armenia",
           "sort_id":73,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":74,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Aruba",
           "sort_id":74,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":75,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Australia",
           "sort_id":75,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":76,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New South Wales",
           "sort_id":76,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":77,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Northern Territory",
           "sort_id":77,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":78,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Queensland",
           "sort_id":78,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":79,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tasmania",
           "sort_id":79,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":80,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Victoria",
           "sort_id":80,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":81,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Western Australia",
           "sort_id":81,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":82,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Austria",
           "sort_id":82,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":83,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Azerbaijan",
           "sort_id":83,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":84,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bahamas",
           "sort_id":84,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":85,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bahrain",
           "sort_id":85,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":86,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bangladesh",
           "sort_id":86,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":87,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Barbados",
           "sort_id":87,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":88,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Belarus",
           "sort_id":88,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":89,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Belgium",
           "sort_id":89,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":90,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Belize",
           "sort_id":90,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":91,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Benin",
           "sort_id":91,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":92,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bermuda",
           "sort_id":92,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":93,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bhutan",
           "sort_id":93,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":94,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bolivia",
           "sort_id":94,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":95,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bosnia and Herzegovina",
           "sort_id":95,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":96,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Botswana",
           "sort_id":96,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":97,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Brazil",
           "sort_id":97,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":98,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Brunei Darussalam",
           "sort_id":98,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":99,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bulgaria",
           "sort_id":99,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":100,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Burkina Faso",
           "sort_id":100,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":101,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Burundi",
           "sort_id":101,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":102,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cabo Verde",
           "sort_id":102,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":103,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Canada",
           "sort_id":103,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":104,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Alberta",
           "sort_id":104,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":105,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"British Columbia",
           "sort_id":105,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":106,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Manitoba",
           "sort_id":106,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":107,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New Brunswick",
           "sort_id":107,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":108,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Newfoundland and Labrador",
           "sort_id":108,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":109,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Northwest Territories",
           "sort_id":109,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":110,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nova Scotia",
           "sort_id":110,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":111,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nunavut",
           "sort_id":111,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":112,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Prince Edward Island",
           "sort_id":112,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":113,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Quebec",
           "sort_id":113,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":114,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Saskatchewan",
           "sort_id":114,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":115,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Yukon",
           "sort_id":115,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":116,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cambodia",
           "sort_id":116,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":117,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cameroon",
           "sort_id":117,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":118,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cayman Islands",
           "sort_id":118,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":119,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Central African Republic",
           "sort_id":119,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":120,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Chad",
           "sort_id":120,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":121,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Chile",
           "sort_id":121,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":122,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"China",
           "sort_id":122,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":123,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Chinese Taipei",
           "sort_id":123,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":124,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Christmas Island",
           "sort_id":124,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":125,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cocos (Keeling) Islands",
           "sort_id":125,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":126,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Colombia",
           "sort_id":126,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":127,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Comoros",
           "sort_id":127,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":128,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Congo (Brazzaville)",
           "sort_id":128,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":129,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Congo (Democratic Republic)",
           "sort_id":129,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":130,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cook Islands",
           "sort_id":130,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":131,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Costa Rica",
           "sort_id":131,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":132,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Côte D'Ivoire",
           "sort_id":132,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":133,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Croatia (Hrvatska)",
           "sort_id":133,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":134,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cuba",
           "sort_id":134,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":135,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cyprus",
           "sort_id":135,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":136,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Czech Republic",
           "sort_id":136,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":137,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Denmark",
           "sort_id":137,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":138,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Djibouti",
           "sort_id":138,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":139,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Dominica",
           "sort_id":139,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":140,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Dominican Republic",
           "sort_id":140,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":141,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ecuador",
           "sort_id":141,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":142,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Egypt",
           "sort_id":142,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":143,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"El Salvador",
           "sort_id":143,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":144,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Equatorial Guinea",
           "sort_id":144,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":145,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Eritrea",
           "sort_id":145,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":146,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Estonia",
           "sort_id":146,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":147,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ethiopia",
           "sort_id":147,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":148,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Falkland Islands (Malvinas)",
           "sort_id":148,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":149,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Faroe Islands",
           "sort_id":149,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":150,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Fiji",
           "sort_id":150,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":151,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Finland",
           "sort_id":151,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":152,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"France",
           "sort_id":152,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":153,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"French Guiana",
           "sort_id":153,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":154,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"French Polynesia",
           "sort_id":154,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":155,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Gabon",
           "sort_id":155,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":156,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Gambia",
           "sort_id":156,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":157,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Georgia",
           "sort_id":157,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":158,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Germany",
           "sort_id":158,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":159,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ghana",
           "sort_id":159,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":160,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Gibraltar",
           "sort_id":160,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":161,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Greece",
           "sort_id":161,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":162,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Greenland",
           "sort_id":162,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":163,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Grenada",
           "sort_id":163,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":164,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Guadeloupe",
           "sort_id":164,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":165,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Guam",
           "sort_id":165,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":166,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Guatemala",
           "sort_id":166,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":167,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Guinea",
           "sort_id":167,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":168,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Guinea-Bissau",
           "sort_id":168,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":169,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Guyana",
           "sort_id":169,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":170,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Haiti",
           "sort_id":170,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":171,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Honduras",
           "sort_id":171,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":172,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Hong Kong S.A.R.",
           "sort_id":172,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":173,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Hungary",
           "sort_id":173,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":174,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Iceland",
           "sort_id":174,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":175,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"India",
           "sort_id":175,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":176,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Indonesia",
           "sort_id":176,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":177,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Iran (Islamic Republic)",
           "sort_id":177,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":178,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Iraq",
           "sort_id":178,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":179,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ireland",
           "sort_id":179,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":180,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Israel",
           "sort_id":180,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":181,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Italy",
           "sort_id":181,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":182,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Jamaica",
           "sort_id":182,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":183,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Japan",
           "sort_id":183,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":184,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Jordan",
           "sort_id":184,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":185,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Kazakhstan",
           "sort_id":185,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":186,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Kenya",
           "sort_id":186,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":187,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Kiribati",
           "sort_id":187,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":188,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Korea (Democratic People's Republic)",
           "sort_id":188,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":189,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Korea (Republic of South)",
           "sort_id":189,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":190,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Kuwait",
           "sort_id":190,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":191,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Kyrgyzstan",
           "sort_id":191,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":192,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Laos (Lao PDR)",
           "sort_id":192,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":193,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Latvia",
           "sort_id":193,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":194,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Lebanon",
           "sort_id":194,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":195,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Lesotho",
           "sort_id":195,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":196,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Liberia",
           "sort_id":196,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":197,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Libya",
           "sort_id":197,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":198,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Liechtenstein",
           "sort_id":198,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":199,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Lithuania",
           "sort_id":199,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":200,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Luxembourg",
           "sort_id":200,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":201,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Macau S.A.R.",
           "sort_id":201,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":202,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Macedonia Republic of North",
           "sort_id":202,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":203,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Madagascar",
           "sort_id":203,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":204,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Malawi",
           "sort_id":204,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":205,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Malaysia",
           "sort_id":205,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":206,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Maldives",
           "sort_id":206,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":207,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mali",
           "sort_id":207,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":208,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Malta",
           "sort_id":208,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":209,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Marshall Islands",
           "sort_id":209,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":210,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Martinique",
           "sort_id":210,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":211,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mauritania",
           "sort_id":211,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":212,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mauritius",
           "sort_id":212,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":213,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mayotte",
           "sort_id":213,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":214,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mexico",
           "sort_id":214,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":215,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Micronesia Federated States",
           "sort_id":215,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":216,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Moldova",
           "sort_id":216,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":217,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Monaco",
           "sort_id":217,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":218,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mongolia",
           "sort_id":218,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":219,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Montenegro Republic",
           "sort_id":219,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":220,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Montserrat",
           "sort_id":220,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":221,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Morocco",
           "sort_id":221,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":222,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Mozambique",
           "sort_id":222,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":223,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Myanmar",
           "sort_id":223,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":224,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Namibia",
           "sort_id":224,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":225,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nauru",
           "sort_id":225,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":226,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nepal",
           "sort_id":226,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":227,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Netherlands",
           "sort_id":227,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":228,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Netherlands Antilles",
           "sort_id":228,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":229,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New Caledonia",
           "sort_id":229,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":230,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"New Zealand",
           "sort_id":230,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":231,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nicaragua",
           "sort_id":231,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":232,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Niger",
           "sort_id":232,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":233,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nigeria",
           "sort_id":233,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":234,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Niue",
           "sort_id":234,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":235,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Norfolk Island",
           "sort_id":235,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":236,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Northern Mariana Islands",
           "sort_id":236,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":237,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Norway",
           "sort_id":237,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":238,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Oman",
           "sort_id":238,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":239,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pakistan",
           "sort_id":239,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":240,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Palau",
           "sort_id":240,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":241,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Palestinian Territory Occupied",
           "sort_id":241,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":242,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Panama",
           "sort_id":242,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":243,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Papua New Guinea",
           "sort_id":243,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":244,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Paraguay",
           "sort_id":244,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":245,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Peru",
           "sort_id":245,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":246,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Philippines",
           "sort_id":246,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":247,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pitcairn Island",
           "sort_id":247,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":248,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Poland",
           "sort_id":248,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":249,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Portugal",
           "sort_id":249,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":250,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Puerto Rico USA",
           "sort_id":250,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":251,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Qatar",
           "sort_id":251,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":252,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Reunion",
           "sort_id":252,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":253,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Romania",
           "sort_id":253,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":254,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Russia",
           "sort_id":254,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":255,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Rwanda",
           "sort_id":255,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":256,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Saint Helena and also Tristan Da Cunha",
           "sort_id":256,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":257,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Saint Kitts and Nevis",
           "sort_id":257,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":258,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Saint Lucia",
           "sort_id":258,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":259,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Saint Pierre and Miquelon",
           "sort_id":259,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":260,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Saint Vincent and the Grenadines",
           "sort_id":260,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":261,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Samoa",
           "sort_id":261,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":262,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"San Marino",
           "sort_id":262,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":263,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"São Tomé and Principe",
           "sort_id":263,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":264,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Saudi Arabia",
           "sort_id":264,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":265,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Senegal",
           "sort_id":265,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":266,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Serbian Republic",
           "sort_id":266,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":267,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Seychelles",
           "sort_id":267,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":268,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Sierra Leone",
           "sort_id":268,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":269,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Singapore",
           "sort_id":269,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":270,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Slovakia",
           "sort_id":270,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":271,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Slovenia",
           "sort_id":271,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":272,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Solomon Islands",
           "sort_id":272,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":273,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Somalia",
           "sort_id":273,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":274,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"South Africa",
           "sort_id":274,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":275,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"South Sudan",
           "sort_id":275,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":276,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Spain",
           "sort_id":276,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":277,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Sri Lanka",
           "sort_id":277,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":278,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Sudan",
           "sort_id":278,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":279,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Suriname",
           "sort_id":279,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":280,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Svalbard and Jan Mayen Islands",
           "sort_id":280,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":281,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Swaziland",
           "sort_id":281,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":282,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Sweden",
           "sort_id":282,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":283,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Switzerland",
           "sort_id":283,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":284,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Syrian Arab Republic",
           "sort_id":284,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":285,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tajikistan",
           "sort_id":285,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":286,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tanzanian United Republic",
           "sort_id":286,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":287,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Thailand",
           "sort_id":287,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":288,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Timor-Leste",
           "sort_id":288,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":289,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Togo",
           "sort_id":289,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":290,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tokelau",
           "sort_id":290,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":291,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tonga",
           "sort_id":291,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":292,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Trinidad and Tobago",
           "sort_id":292,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":293,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tunisia",
           "sort_id":293,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":294,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Turkey",
           "sort_id":294,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":295,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Turkmenistan",
           "sort_id":295,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":296,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Turks and Caicos Islands",
           "sort_id":296,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":297,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Tuvalu",
           "sort_id":297,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":298,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Uganda",
           "sort_id":298,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":299,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ukraine",
           "sort_id":299,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":300,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"United Arab Emirates",
           "sort_id":300,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":301,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Uruguay",
           "sort_id":301,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":302,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Uzbekistan",
           "sort_id":302,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":303,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Vanuatu",
           "sort_id":303,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":304,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Vatican City State (Holy See)",
           "sort_id":304,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":305,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Venezuela Bolivarian Republic",
           "sort_id":305,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":306,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Vietnam Democratic Republic (DRV)",
           "sort_id":306,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":307,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Vietnam Socialist Republic",
           "sort_id":307,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":308,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Virgin Islands (British)",
           "sort_id":308,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":309,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Virgin Islands (USA)",
           "sort_id":309,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":310,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Wallis and Futuna Islands",
           "sort_id":310,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":311,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Yemen",
           "sort_id":311,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":312,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zambia",
           "sort_id":312,
           "created_by":null,
           "updated_by":null
        },
        {
           "id":313,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zimbabwe",
           "sort_id":313,
           "created_by":null,
           "updated_by":null
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const specialityIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313];
      await queryInterface.bulkDelete(
        "specialities",
        {
          id: specialityIds
        },
        {}
      );
  }
};