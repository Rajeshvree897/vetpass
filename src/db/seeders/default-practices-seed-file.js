'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "vet_practices",
      [  
         {
            "id":1,
            "practice_name":"VETPASS UK & ROI",
            "address1":"71-75 Shelton Street",
            "address2":"Soho",
            "country":220,
            "state":177,
            "city":"UK",
            "zip_code":"WC2H 9JQ",
            "int_code":"44",
            "business_phone":"02074594249",
            "out_of_hr_phone":"02074594249",
            "email":"ukroil@vetpass4vets.com",
            "website":"www.vetpass.com",
            "practice_accreditation_no":"123456768",
            "created_at":"2021-06-02T00:00:00.000Z",
            "updated_at":"2021-11-05T16:32:05.000Z",
            "speciality":"French Bulldogs,cavachon",
            "img_path":"https://vetpass-1.s3.eu-west-2.amazonaws.com/uploads/LOGO4(1).jpg",
            "latitude":51.5149037,
            "longitude":-0.1235842,
            "location":null,
            "created_by":null,
            "updated_by":1,
            "distance":null,
            "public_email":"admin@vetpass.com",
            "flag":"UK"
         },
         {
            "id":2,
            "practice_name":"VETPASS USA",
            "address1":"VETPASS Global Vets USA address",
            "address2":"VETPASS Global Vets USA address",
            "country":1,
            "state":null,
            "city":"USA",
            "zip_code":null,
            "int_code":null,
            "business_phone":"1 585 531 8377",
            "out_of_hr_phone":"",
            "email":"usa@vetpass4vets.com",
            "website":"",
            "practice_accreditation_no":"",
            "created_at":"2021-06-02T00:00:00.000Z",
            "updated_at":"2021-09-16T10:11:12.000Z",
            "speciality":null,
            "img_path":"https://vetpass-1.s3.eu-west-2.amazonaws.com/uploads/Yellow_Paw_Flat.jpg",
            "latitude":35.8373219,
            "longitude":-95.9422206,
            "location":null,
            "created_by":null,
            "updated_by":1,
            "distance":null,
            "public_email":"",
            "flag":"USA"
         },
         {
            "id":3,
            "practice_name":"VETPASS Rest of World",
            "address1":"20",
            "address2":"Harcourt Street",
            "country":220,
            "state":288,
            "city":"Dublin",
            "zip_code":"D02 H364",
            "int_code":"44",
            "business_phone":"0207 459 4249",
            "out_of_hr_phone":"0207 459 4249",
            "email":"row@vetpass4vets.com",
            "website":"www.vetpass.com",
            "practice_accreditation_no":"0987654321",
            "created_at":"2021-06-02T00:00:00.000Z",
            "updated_at":"2021-11-05T16:31:45.000Z",
            "speciality":"Small Animals",
            "img_path":"https://vetpass-1.s3.eu-west-2.amazonaws.com/uploads/Purple_Paw.jpg",
            "latitude":53.3360196,
            "longitude":-6.263609,
            "location":null,
            "created_by":null,
            "updated_by":1,
            "distance":null,
            "public_email":"admin@vetpass.com",
            "flag":"ROI"
         }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
  const vetPracticeIds = [1,2,3];
    await queryInterface.bulkDelete(
      "vet_practices",
      {
        id: vetPracticeIds
      },
      {}
    );
  }
};
