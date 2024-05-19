'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "insurer_lists",
      [
         {
            "id":1,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Not insured",
            "sort_id":1,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":2,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Insured but don't know insurer",
            "sort_id":2,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":3,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Insured with Home",
            "sort_id":3,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":4,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Not listed below",
            "sort_id":4,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":5,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - 24PetWatch",
            "sort_id":5,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":6,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - AKC/PetPartners",
            "sort_id":6,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":7,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Allen Financial Group",
            "sort_id":7,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":8,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - ASPCA",
            "sort_id":8,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":9,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Bivvy",
            "sort_id":9,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":10,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Blue Bridle",
            "sort_id":10,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":11,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Broadstone",
            "sort_id":11,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":12,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Embrace",
            "sort_id":12,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":13,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Eusoh",
            "sort_id":13,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":14,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Figo",
            "sort_id":14,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":15,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - GEICO",
            "sort_id":15,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":16,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Great American",
            "sort_id":16,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":17,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Hallmark",
            "sort_id":17,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":18,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Hartford",
            "sort_id":18,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":19,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Hartville",
            "sort_id":19,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":20,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - HealthyPaws",
            "sort_id":20,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":21,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Kay Cassell",
            "sort_id":21,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":22,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Lemonade",
            "sort_id":22,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":23,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Nationwide",
            "sort_id":23,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":24,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Pawp",
            "sort_id":24,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":25,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Pet Assure",
            "sort_id":25,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":26,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Pet Premium",
            "sort_id":26,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":27,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - PetFirst",
            "sort_id":27,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":28,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Petpartners",
            "sort_id":28,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":29,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Petplan",
            "sort_id":29,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":30,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Pets Best",
            "sort_id":30,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":31,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Progressive",
            "sort_id":31,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":32,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Prudent Pet",
            "sort_id":32,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":33,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Pumpkin",
            "sort_id":33,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":34,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - SPOT",
            "sort_id":34,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":35,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Trupanion",
            "sort_id":35,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":36,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - Trusted Pals",
            "sort_id":36,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":37,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - USAA",
            "sort_id":37,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":38,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"USA - VETPASS",
            "sort_id":38,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":39,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - 4Paws",
            "sort_id":39,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":40,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Admiral",
            "sort_id":40,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":41,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Agriapet",
            "sort_id":41,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":42,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Allianz",
            "sort_id":42,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":43,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Animal Friends",
            "sort_id":43,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":44,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Argos",
            "sort_id":44,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":45,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - ASDA",
            "sort_id":45,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":46,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Aviva",
            "sort_id":46,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":47,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - AXA XL",
            "sort_id":47,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":48,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Bloodlines Thoroughbred",
            "sort_id":48,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":49,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - BoughtbyMany",
            "sort_id":49,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":50,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Co-Operative",
            "sort_id":50,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":51,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - CoverMyPet",
            "sort_id":51,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":52,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Directline",
            "sort_id":52,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":53,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Emporium",
            "sort_id":53,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":54,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Equesure",
            "sort_id":54,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":55,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Everypaw",
            "sort_id":55,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":56,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - horseinsurance.co.uk",
            "sort_id":56,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":57,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - John Lewis",
            "sort_id":57,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":58,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - KBIS",
            "sort_id":58,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":59,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Legal and General",
            "sort_id":59,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":60,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Lifetimepetcover",
            "sort_id":60,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":61,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - LV",
            "sort_id":61,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":62,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - M&S",
            "sort_id":62,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":63,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Morethan/RSA",
            "sort_id":63,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":64,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - NFU",
            "sort_id":64,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":65,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - PDSA",
            "sort_id":65,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":66,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Perfect Pet",
            "sort_id":66,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":67,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Petinsurance.co.uk",
            "sort_id":67,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":68,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - RSPCA",
            "sort_id":68,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":69,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Sainsbury",
            "sort_id":69,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":70,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Scottish Equestrian",
            "sort_id":70,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":71,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Scratch & Patch",
            "sort_id":71,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":72,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Tesco",
            "sort_id":72,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":73,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - VETPASS",
            "sort_id":73,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":74,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - VetsMediCover",
            "sort_id":74,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":75,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"GBR - Waggel",
            "sort_id":75,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":76,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - Allianz",
            "sort_id":76,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":77,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - Anpostinsurance",
            "sort_id":77,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":78,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - Aviva",
            "sort_id":78,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":79,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - AXA XL",
            "sort_id":79,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":80,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - Blueinsurance.ie",
            "sort_id":80,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":81,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - Petinsurance.ie",
            "sort_id":81,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":82,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - Petinsure.ie",
            "sort_id":82,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":83,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"IRL - VETPASS",
            "sort_id":83,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":84,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Australia Post Pet",
            "sort_id":84,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":85,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Australian Seniors Pet",
            "sort_id":85,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":86,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Bondi Vet Pet",
            "sort_id":86,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":87,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Bow Wow Meow Pet",
            "sort_id":87,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":88,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Budget Direct Per",
            "sort_id":88,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":89,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Bupa Pet",
            "sort_id":89,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":90,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Coles Pet",
            "sort_id":90,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":91,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Greencross Pet",
            "sort_id":91,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":92,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Guardian Pet",
            "sort_id":92,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":93,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Guide Dogs Pet",
            "sort_id":93,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":94,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - HCF Pet",
            "sort_id":94,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":95,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - HIF Pet",
            "sort_id":95,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":96,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Insuranceline Pet",
            "sort_id":96,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":97,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Knose Pet",
            "sort_id":97,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":98,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Kogan Pet",
            "sort_id":98,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":99,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Medibank Pet",
            "sort_id":99,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":100,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - MiPet Pet",
            "sort_id":100,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":101,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - National Seniors Pet",
            "sort_id":101,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":102,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - NRMA Pet Plus",
            "sort_id":102,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":103,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Pet Australia",
            "sort_id":103,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":104,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Petbarn Pet",
            "sort_id":104,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":105,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Petcover Pet",
            "sort_id":105,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":106,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - PetInsurance.com.au",
            "sort_id":106,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":107,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Petmed Pet",
            "sort_id":107,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":108,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Petplan Pet",
            "sort_id":108,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":109,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - PetSecure Pet",
            "sort_id":109,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":110,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Petsy Pet",
            "sort_id":110,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":111,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Pounce Pet",
            "sort_id":111,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":112,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Prime Pet",
            "sort_id":112,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":113,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - PROSURE Pet",
            "sort_id":113,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":114,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - RACQ Pet",
            "sort_id":114,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":115,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - RACV Pet",
            "sort_id":115,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":116,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Real Pet",
            "sort_id":116,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":117,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - RSPCA Pet",
            "sort_id":117,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":118,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Suncorp Pet",
            "sort_id":118,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":119,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Vet Select",
            "sort_id":119,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":120,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - VETPASS",
            "sort_id":120,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":121,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Vets Choice Pet",
            "sort_id":121,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":122,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"AUS - Woolworths Pet",
            "sort_id":122,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":123,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - CAA",
            "sort_id":123,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":124,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - Desjardins",
            "sort_id":124,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":125,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - Nationwide",
            "sort_id":125,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":126,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - OVMA (Petline)",
            "sort_id":126,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":127,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - Pet Secure",
            "sort_id":127,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":128,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - Petplan",
            "sort_id":128,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":129,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - Trupanion",
            "sort_id":129,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":130,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"CAN - VETPASS",
            "sort_id":130,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":131,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"NZL - AA Pet",
            "sort_id":131,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":132,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"NZL - PD Insurance",
            "sort_id":132,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":133,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"NZL - Pet-n-Sur",
            "sort_id":133,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":134,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"NZL - Petplan",
            "sort_id":134,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":135,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"NZL - Southern Cross",
            "sort_id":135,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":136,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"NZL - VETPASS",
            "sort_id":136,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":137,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"VETPASS",
            "sort_id":137,
            "created_by":null,
            "updated_by":null
         }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const insurerListIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137];
      await queryInterface.bulkDelete(
        "insurer_lists",
        {
          id: insurerListIds
        },
        {}
      );
  }
};