'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "chip_lists",
      [
         {
            "id":1,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Add later",
            "sort_id":1,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":2,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Don't know",
            "sort_id":2,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":3,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Not Applicable",
            "sort_id":3,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":4,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Not Listed",
            "sort_id":4,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":5,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Other",
            "sort_id":5,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":6,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Global - VETPASS Registry",
            "sort_id":6,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":7,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - 24 PET WATCH",
            "sort_id":7,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":8,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - 911PetChip & Free Pet Chip Registry",
            "sort_id":8,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":9,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - ACA MARRS",
            "sort_id":9,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":10,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - AKC CAR/EID",
            "sort_id":10,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":11,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - AKC Reunite",
            "sort_id":11,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":12,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - ALLFLEX",
            "sort_id":12,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":13,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Animal ID",
            "sort_id":13,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":14,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - AVID",
            "sort_id":14,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":15,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - aZoo.me Identification",
            "sort_id":15,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":16,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Banfield",
            "sort_id":16,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":17,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - BC Pet Registry",
            "sort_id":17,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":18,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - BeKind PetFind",
            "sort_id":18,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":19,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - BuddyID™",
            "sort_id":19,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":20,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Crystal Tag",
            "sort_id":20,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":21,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Datamars",
            "sort_id":21,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":22,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Destron Fearing",
            "sort_id":22,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":23,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Digital Angel",
            "sort_id":23,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":24,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - EIDAP",
            "sort_id":24,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":25,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Emili",
            "sort_id":25,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":26,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Fi",
            "sort_id":26,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":27,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Found Animals",
            "sort_id":27,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":28,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Furreka",
            "sort_id":28,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":29,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - HomeAgain",
            "sort_id":29,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":30,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Homeward Bound Pet",
            "sort_id":30,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":31,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Identrac Inc.",
            "sort_id":31,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":32,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - International Pet Registry",
            "sort_id":32,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":33,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Lifechip",
            "sort_id":33,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":34,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Microchip I.D. Solutions",
            "sort_id":34,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":35,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - MyPetsChip",
            "sort_id":35,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":36,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Nanochip ID Inc.",
            "sort_id":36,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":37,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - National Animal Identification Center",
            "sort_id":37,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":38,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Other",
            "sort_id":38,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":39,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Peeva",
            "sort_id":39,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":40,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - PetKey",
            "sort_id":40,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":41,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - PetLink",
            "sort_id":41,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":42,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Petstablished",
            "sort_id":42,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":43,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Prime Trackr",
            "sort_id":43,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":44,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - ResQ",
            "sort_id":44,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":45,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - Save This Life",
            "sort_id":45,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":46,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - SSwitzerlandring Plough",
            "sort_id":46,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":47,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - SmartTag Microchip",
            "sort_id":47,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":48,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - uPet",
            "sort_id":48,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":49,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United States of America - VETPASS USA",
            "sort_id":49,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":50,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Animal Microchips",
            "sort_id":50,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":51,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Animal Tracker",
            "sort_id":51,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":52,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Chipworks",
            "sort_id":52,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":53,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Identibase",
            "sort_id":53,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":54,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - MicroChip Central",
            "sort_id":54,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":55,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - MicroDogID",
            "sort_id":55,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":56,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - MyPet",
            "sort_id":56,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":57,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Other",
            "sort_id":57,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":58,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - National Veterinary Data Service",
            "sort_id":58,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":59,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Pet Chip Register",
            "sort_id":59,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":60,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Pet Identity UK",
            "sort_id":60,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":61,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Petlog",
            "sort_id":61,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":62,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - Pet Scanner",
            "sort_id":62,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":63,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - ProtectedPet",
            "sort_id":63,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":64,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - SmartTrace",
            "sort_id":64,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":65,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - UK PETtrac MicroChip Database",
            "sort_id":65,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":66,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - VETPASS UK",
            "sort_id":66,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":67,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"United Kingdom  - We Trace Pets",
            "sort_id":67,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":68,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ireland - Animark",
            "sort_id":68,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":69,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ireland - Fido",
            "sort_id":69,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":70,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ireland - Irish Kennel Club",
            "sort_id":70,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":71,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ireland - Microdog ID Ltd (Irish Coursing Club)",
            "sort_id":71,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":72,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ireland - Other",
            "sort_id":72,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":73,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ireland - VETPASS IRE",
            "sort_id":73,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":74,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Global - VETPASS Registry",
            "sort_id":74,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":75,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Global - Other Registry",
            "sort_id":75,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":76,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Afghanistan (Islamic Emirate) - VETPASS",
            "sort_id":76,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":77,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Albania - VETPASS",
            "sort_id":77,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":78,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Algeria - VETPASS",
            "sort_id":78,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":79,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"American Samoa - VETPASS",
            "sort_id":79,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":80,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Andorra - VETPASS",
            "sort_id":80,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":81,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Angola - VETPASS",
            "sort_id":81,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":82,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Anguilla - VETPASS",
            "sort_id":82,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":83,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Antigua and Barbuda - VETPASS",
            "sort_id":83,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":84,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Argentina - VETPASS",
            "sort_id":84,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":85,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Armenia - VETPASS",
            "sort_id":85,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":86,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Aruba - VETPASS",
            "sort_id":86,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":87,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - Australasian Animal Registry",
            "sort_id":87,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":88,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - Central Animal Records",
            "sort_id":88,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":89,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - Global Micro Animal Registry",
            "sort_id":89,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":90,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - Greyhound Racing Victoria",
            "sort_id":90,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":91,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - Homesafe ID",
            "sort_id":91,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":92,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - Other",
            "sort_id":92,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":93,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - Petsafe Register",
            "sort_id":93,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":94,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Australia - VETPASS AUS",
            "sort_id":94,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":95,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Austria - ANIMALDATA.COM",
            "sort_id":95,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":96,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Austria - Bundesministerium für Gesundheit",
            "sort_id":96,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":97,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Austria - Krems",
            "sort_id":97,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":98,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Austria - Other",
            "sort_id":98,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":99,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Austria - Petcard",
            "sort_id":99,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":100,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Austria - VETPASS AUT",
            "sort_id":100,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":101,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Azerbaijan - VETPASS",
            "sort_id":101,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":102,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bahamas - VETPASS",
            "sort_id":102,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":103,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bahrain - VETPASS",
            "sort_id":103,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":104,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bangladesh - VETPASS",
            "sort_id":104,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":105,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Barbados - VETPASS",
            "sort_id":105,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":106,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belarus - General database of chipped animals of the Republic of Belarus",
            "sort_id":106,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":107,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belarus - Other",
            "sort_id":107,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":108,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belarus - VETPASS BLR",
            "sort_id":108,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":109,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belgium - Cat ID",
            "sort_id":109,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":110,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belgium - Dog ID",
            "sort_id":110,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":111,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belgium - ID Chips asbl-vzw",
            "sort_id":111,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":112,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belgium - Other",
            "sort_id":112,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":113,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belgium - VETPASS BEL",
            "sort_id":113,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":114,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Belize - VETPASS",
            "sort_id":114,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":115,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Benin - VETPASS",
            "sort_id":115,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":116,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bermuda - VETPASS",
            "sort_id":116,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":117,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bhutan - VETPASS",
            "sort_id":117,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":118,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bolivia - VETPASS",
            "sort_id":118,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":119,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bosnia and Herzegovina - VETPASS",
            "sort_id":119,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":120,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Botswana - VETPASS",
            "sort_id":120,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":121,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Brazil - VETPASS",
            "sort_id":121,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":122,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Brunei Darussalam - VETPASS",
            "sort_id":122,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":123,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Bulgaria - VETPASS",
            "sort_id":123,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":124,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Burkina Faso - VETPASS",
            "sort_id":124,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":125,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Burundi - VETPASS",
            "sort_id":125,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":126,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cabo Verde - VETPASS",
            "sort_id":126,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":127,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cambodia - VETPASS",
            "sort_id":127,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":128,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cameroon - VETPASS",
            "sort_id":128,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":129,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Canada - Datamars Inc.",
            "sort_id":129,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":130,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Canada - EIDAP Inc.",
            "sort_id":130,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":131,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Canada - Microchip 4 Solutions Inc.",
            "sort_id":131,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":132,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Canada - Other",
            "sort_id":132,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":133,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Canada - Pethealth Inc.",
            "sort_id":133,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":134,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Canada - Petidco/Avid Canadaada The Microchip Company",
            "sort_id":134,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":135,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Canada - VETPASS CAN",
            "sort_id":135,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":136,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cayman Islands - VETPASS",
            "sort_id":136,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":137,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Central African Republic - VETPASS",
            "sort_id":137,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":138,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Chad - VETPASS",
            "sort_id":138,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":139,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Chile - VETPASS",
            "sort_id":139,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":140,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"China - VETPASS",
            "sort_id":140,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":141,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Chinese Taipei - VETPASS",
            "sort_id":141,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":142,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Christmas Island - VETPASS",
            "sort_id":142,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":143,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cocos (Keeling) Islands - VETPASS",
            "sort_id":143,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":144,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Colombia - VETPASS",
            "sort_id":144,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":145,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Comoros - VETPASS",
            "sort_id":145,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":146,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Congo (Brazzaville) - VETPASS",
            "sort_id":146,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":147,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Congo (Democratic Republic) - VETPASS",
            "sort_id":147,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":148,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cook Islands - VETPASS",
            "sort_id":148,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":149,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Costa Rica - VETPASS",
            "sort_id":149,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":150,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Côte D'Ivoire - VETPASS",
            "sort_id":150,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":151,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Croatia (Hrvatska) - VETPASS",
            "sort_id":151,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":152,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cuba - VETPASS",
            "sort_id":152,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":153,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cypress - Paphiakos & CCP Animal Welfare",
            "sort_id":153,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":154,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Cyprus - VETPASS",
            "sort_id":154,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":155,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Czech Republic - VETPASS",
            "sort_id":155,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":156,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Czechoslovakia - Back Home Czechoslovakiach Republic",
            "sort_id":156,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":157,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Czechoslovakia - Czechoslovakiach Pet Net",
            "sort_id":157,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":158,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Czechoslovakia - Other",
            "sort_id":158,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":159,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Czechoslovakia - VETPASS CZE",
            "sort_id":159,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":160,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Denmark - Danish Cat Register",
            "sort_id":160,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":161,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Denmark - Danish Dog Register",
            "sort_id":161,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":162,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Denmark - Inges Kattehjem",
            "sort_id":162,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":163,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Denmark - Other",
            "sort_id":163,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":164,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Denmark - VETPASS DEN",
            "sort_id":164,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":165,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Djibouti - VETPASS",
            "sort_id":165,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":166,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Dominica - VETPASS",
            "sort_id":166,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":167,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Dominican Republic - VETPASS",
            "sort_id":167,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":168,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ecuador - VETPASS",
            "sort_id":168,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":169,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Egypt - VETPASS",
            "sort_id":169,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":170,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"El Salvador - VETPASS",
            "sort_id":170,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":171,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Equatorial Guinea - VETPASS",
            "sort_id":171,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":172,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Eritrea - VETPASS",
            "sort_id":172,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":173,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Estonia - Eesti Lemmikloomaregister",
            "sort_id":173,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":174,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Estonia - Other",
            "sort_id":174,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":175,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Estonia - VETPASS EST",
            "sort_id":175,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":176,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ethiopia - VETPASS",
            "sort_id":176,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":177,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Falkland Islands (Malvinas) - VETPASS",
            "sort_id":177,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":178,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Faroe Islands - VETPASS",
            "sort_id":178,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":179,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Fiji - VETPASS",
            "sort_id":179,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":180,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Finland - VETPASS",
            "sort_id":180,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":181,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"France - I-CAD - Société d'Identification des Carnivores Domestiques",
            "sort_id":181,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":182,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"France - Other",
            "sort_id":182,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":183,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"France - VETPASS FRA",
            "sort_id":183,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":184,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"French Guiana - VETPASS",
            "sort_id":184,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":185,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"French Polynesia - VETPASS",
            "sort_id":185,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":186,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Gabon - VETPASS",
            "sort_id":186,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":187,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Gambia - VETPASS",
            "sort_id":187,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":188,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Georgia - VETPASS",
            "sort_id":188,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":189,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Germany - Für Jagd in Deutschland e.V. - Verein für nachhaltigen Wild- und Naturschutz",
            "sort_id":189,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":190,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Germany - Other",
            "sort_id":190,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":191,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Germany - TASSO e.V.",
            "sort_id":191,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":192,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Germany - VETPASS DEU",
            "sort_id":192,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":193,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ghana - VETPASS",
            "sort_id":193,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":194,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Gibraltar - VETPASS",
            "sort_id":194,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":195,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Greece - VETPASS",
            "sort_id":195,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":196,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Greenland - VETPASS",
            "sort_id":196,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":197,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Grenada - VETPASS",
            "sort_id":197,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":198,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Guadeloupe - VETPASS",
            "sort_id":198,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":199,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Guam - VETPASS",
            "sort_id":199,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":200,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Guatemala - VETPASS",
            "sort_id":200,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":201,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Guinea - VETPASS",
            "sort_id":201,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":202,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Guinea-Bissau - VETPASS",
            "sort_id":202,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":203,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Guyana - VETPASS",
            "sort_id":203,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":204,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Haiti - VETPASS",
            "sort_id":204,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":205,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Honduras - VETPASS",
            "sort_id":205,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":206,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Hong Kong S.A.R. - VETPASS",
            "sort_id":206,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":207,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Hungary - Hungarian Veterinary Chamber - Petvetdata",
            "sort_id":207,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":208,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Hungary - Other",
            "sort_id":208,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":209,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Hungary - VETPASS",
            "sort_id":209,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":210,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Hungary - VETPASS HUN",
            "sort_id":210,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":211,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Iceland - VETPASS",
            "sort_id":211,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":212,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"India - VETPASS",
            "sort_id":212,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":213,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Indonesia - VETPASS",
            "sort_id":213,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":214,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Iran (Islamic Republic) - VETPASS",
            "sort_id":214,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":215,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Iraq - VETPASS",
            "sort_id":215,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":216,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Israel - VETPASS",
            "sort_id":216,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":217,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Italy - VETPASS",
            "sort_id":217,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":218,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Jamaica - VETPASS",
            "sort_id":218,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":219,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Japan - VETPASS",
            "sort_id":219,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":220,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Jordan - VETPASS",
            "sort_id":220,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":221,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Kazakhstan - VETPASS",
            "sort_id":221,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":222,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Kenya - VETPASS",
            "sort_id":222,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":223,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Kiribati - VETPASS",
            "sort_id":223,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":224,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Korea (Democratic People's Republic) - VETPASS",
            "sort_id":224,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":225,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Korea (Republic of South) - VETPASS",
            "sort_id":225,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":226,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Kuwait - VETPASS",
            "sort_id":226,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":227,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Kyrgyzstan - VETPASS",
            "sort_id":227,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":228,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Laos (Lao PDR) - VETPASS",
            "sort_id":228,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":229,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Latvia - Agricultural Data Centre",
            "sort_id":229,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":230,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Latvia - Other",
            "sort_id":230,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":231,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Latvia - VETPASS LVA",
            "sort_id":231,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":232,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Lebanon - VETPASS",
            "sort_id":232,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":233,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Lesotho - VETPASS",
            "sort_id":233,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":234,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Liberia - VETPASS",
            "sort_id":234,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":235,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Libya - VETPASS",
            "sort_id":235,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":236,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Liechtenstein - VETPASS",
            "sort_id":236,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":237,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Lithuania - Gyvunu Registravimo Centras (Animal Registration Center)",
            "sort_id":237,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":238,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Lithuania - Lithuanian Small Animal Veterinary Association (LSAVA)",
            "sort_id":238,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":239,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Lithuania - Other",
            "sort_id":239,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":240,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Lithuania - VETPASS LTU",
            "sort_id":240,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":241,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Luxembourg - LAK - Register",
            "sort_id":241,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":242,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Luxembourg - Other",
            "sort_id":242,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":243,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Luxembourg - VETPASS LUX",
            "sort_id":243,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":244,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Macau S.A.R. - VETPASS",
            "sort_id":244,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":245,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Macedonia Republic of North - VETPASS",
            "sort_id":245,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":246,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Madagascar - VETPASS",
            "sort_id":246,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":247,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Malawi - VETPASS",
            "sort_id":247,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":248,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Malaysia - VETPASS",
            "sort_id":248,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":249,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Maldives - VETPASS",
            "sort_id":249,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":250,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Mali - VETPASS",
            "sort_id":250,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":251,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Malta - VETPASS",
            "sort_id":251,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":252,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Marshall Islands - VETPASS",
            "sort_id":252,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":253,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Martinique - VETPASS",
            "sort_id":253,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":254,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Mauritania - VETPASS",
            "sort_id":254,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":255,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Mauritius - VETPASS",
            "sort_id":255,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":256,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Mayotte - VETPASS",
            "sort_id":256,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":257,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Mexico - VETPASS",
            "sort_id":257,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":258,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Micronesia Federated States - VETPASS",
            "sort_id":258,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":259,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Moldova - VETPASS",
            "sort_id":259,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":260,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Monaco - VETPASS",
            "sort_id":260,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":261,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Mongolia - VETPASS",
            "sort_id":261,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":262,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Montenegro Republic - VETPASS",
            "sort_id":262,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":263,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Montserrat - VETPASS",
            "sort_id":263,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":264,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Morocco - VETPASS",
            "sort_id":264,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":265,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Mozambique - VETPASS",
            "sort_id":265,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":266,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Myanmar - VETPASS",
            "sort_id":266,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":267,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Namibia - VETPASS",
            "sort_id":267,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":268,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Nauru - VETPASS",
            "sort_id":268,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":269,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Nepal - VETPASS",
            "sort_id":269,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":270,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Netherlands - NDG - Nederlandse Databank Gezelschapdieren",
            "sort_id":270,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":271,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Netherlands - NDG Stichting Databank Gezelschapsdieren Nederland",
            "sort_id":271,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":272,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Netherlands - Other",
            "sort_id":272,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":273,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Netherlands - PetBase",
            "sort_id":273,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":274,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Netherlands - Stichting CHIP Centraal Huisdieren Identificatie Punt",
            "sort_id":274,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":275,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Netherlands - VETPASS ANT",
            "sort_id":275,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":276,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Netherlands Antilles - VETPASS",
            "sort_id":276,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":277,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"New Caledonia - VETPASS",
            "sort_id":277,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":278,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"New Zealand - National Dog Data Base",
            "sort_id":278,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":279,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"New Zealand - New Zealand Companion Animal Register (CAR) ",
            "sort_id":279,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":280,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"New Zealand - Other",
            "sort_id":280,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":281,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"New Zealand - VETPASS NZL",
            "sort_id":281,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":282,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Nicaragua - VETPASS",
            "sort_id":282,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":283,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Niger - VETPASS",
            "sort_id":283,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":284,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Nigeria - VETPASS",
            "sort_id":284,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":285,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Niue - VETPASS",
            "sort_id":285,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":286,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Norfolk Island - VETPASS",
            "sort_id":286,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":287,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Northern Mariana Islands - VETPASS",
            "sort_id":287,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":288,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Norway - DyreID AS",
            "sort_id":288,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":289,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Norway - Other",
            "sort_id":289,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":290,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Norway - VETPASS NOR",
            "sort_id":290,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":291,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Oman - VETPASS",
            "sort_id":291,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":292,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Pakistan - VETPASS",
            "sort_id":292,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":293,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Palau - VETPASS",
            "sort_id":293,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":294,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Palestinian Territory Occupied - VETPASS",
            "sort_id":294,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":295,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Panama - VETPASS",
            "sort_id":295,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":296,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Papua New Guinea - VETPASS",
            "sort_id":296,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":297,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Paraguay - VETPASS",
            "sort_id":297,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":298,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Peru - VETPASS",
            "sort_id":298,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":299,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Philippines - VETPASS",
            "sort_id":299,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":300,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Pitcairn Island - VETPASS",
            "sort_id":300,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":301,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Poland - IDENTYFIKACJA.PL - AID",
            "sort_id":301,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":302,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Poland - Other",
            "sort_id":302,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":303,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Poland - SAFE-ANIMAL",
            "sort_id":303,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":304,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Poland - Tanowo - SzCzechoslovakiacin",
            "sort_id":304,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":305,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Poland - VETPASS POL",
            "sort_id":305,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":306,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Portugal - Other",
            "sort_id":306,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":307,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Portugal - SIRA - Sistema de Identificação e Recuperação Animal",
            "sort_id":307,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":308,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Portugal - VETPASS PRT",
            "sort_id":308,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":309,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Puerto Rico USA - VETPASS",
            "sort_id":309,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":310,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Qatar - VETPASS",
            "sort_id":310,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":311,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Reunion - VETPASS",
            "sort_id":311,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":312,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Romania - VETPASS",
            "sort_id":312,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":313,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Russia - Animal Face",
            "sort_id":313,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":314,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Russia - Free Chip",
            "sort_id":314,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":315,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Russia - Moi-Zver",
            "sort_id":315,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":316,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Russia - Other",
            "sort_id":316,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":317,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Russia - Russian National Identification Database",
            "sort_id":317,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":318,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Russia - VETPASS RUS",
            "sort_id":318,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":319,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Rwanda - VETPASS",
            "sort_id":319,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":320,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Saint Helena and also Tristan Da Cunha - VETPASS",
            "sort_id":320,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":321,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Saint Kitts and Nevis - VETPASS",
            "sort_id":321,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":322,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Saint Lucia - VETPASS",
            "sort_id":322,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":323,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Saint Pierre and Miquelon - VETPASS",
            "sort_id":323,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":324,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Saint Vincent and the Grenadines - VETPASS",
            "sort_id":324,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":325,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Samoa - VETPASS",
            "sort_id":325,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":326,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"San Marino - VETPASS",
            "sort_id":326,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":327,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"São Tomé and Principe - VETPASS",
            "sort_id":327,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":328,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Saudi Arabia - VETPASS",
            "sort_id":328,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":329,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Senegal - VETPASS",
            "sort_id":329,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":330,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Serbian Republic - VETPASS",
            "sort_id":330,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":331,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Seychelles - VETPASS",
            "sort_id":331,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":332,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sierra Leone - VETPASS",
            "sort_id":332,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":333,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Singapore - VETPASS",
            "sort_id":333,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":334,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Slovakia - VETPASS",
            "sort_id":334,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":335,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Slovenia - VETPASS",
            "sort_id":335,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":336,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Solomon Islands - VETPASS",
            "sort_id":336,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":337,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Somalia - VETPASS",
            "sort_id":337,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":338,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"South Africa - Identipet National Animal Database",
            "sort_id":338,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":339,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"South Africa - Other",
            "sort_id":339,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":340,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"South Africa - VETPASS ZAF ",
            "sort_id":340,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":341,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"South Sudan - VETPASS",
            "sort_id":341,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":342,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Spain - Anicom",
            "sort_id":342,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":343,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Spain - Other",
            "sort_id":343,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":344,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Spain - REIAC - Red Española de Identificación de Animales de Compañía",
            "sort_id":344,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":345,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Spain - VETPASS ESP",
            "sort_id":345,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":346,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sri Lanka - VETPASS",
            "sort_id":346,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":347,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sudan - VETPASS",
            "sort_id":347,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":348,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Suriname - VETPASS",
            "sort_id":348,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":349,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Svalbard and Jan Mayen Islands - VETPASS",
            "sort_id":349,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":350,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Swaziland - VETPASS",
            "sort_id":350,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":351,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sweden - Dog Registry Swedish Board of Agriculture",
            "sort_id":351,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":352,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sweden - Other",
            "sort_id":352,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":353,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sweden - Swedish Kennel Club",
            "sort_id":353,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":354,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sweden - VETPASS SWE",
            "sort_id":354,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":355,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Sweden- Sollentuna",
            "sort_id":355,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":356,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Switzerland - AMICUS (Identitas AG)",
            "sort_id":356,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":357,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Switzerland - ANIS (Identitas AG)",
            "sort_id":357,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":358,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Switzerland - Other",
            "sort_id":358,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":359,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Switzerland - VETPASS SUI",
            "sort_id":359,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":360,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Syrian Arab Republic - VETPASS",
            "sort_id":360,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":361,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Tajikistan - VETPASS",
            "sort_id":361,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":362,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Tanzanian United Republic - VETPASS",
            "sort_id":362,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":363,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Thailand - VETPASS",
            "sort_id":363,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":364,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Timor-Leste - VETPASS",
            "sort_id":364,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":365,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Togo - VETPASS",
            "sort_id":365,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":366,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Tokelau - VETPASS",
            "sort_id":366,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":367,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Tonga - VETPASS",
            "sort_id":367,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":368,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Trinidad and Tobago - VETPASS",
            "sort_id":368,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":369,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Tunisia - VETPASS",
            "sort_id":369,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":370,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Turkey - Other",
            "sort_id":370,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":371,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Turkey - PET BUL Turkey",
            "sort_id":371,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":372,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Turkey - VETPASS TUR",
            "sort_id":372,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":373,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Turkmenistan - VETPASS",
            "sort_id":373,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":374,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Turks and Caicos Islands - VETPASS",
            "sort_id":374,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":375,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Tuvalu - VETPASS",
            "sort_id":375,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":376,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"UAE - Dubai Municipality ",
            "sort_id":376,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":377,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"UAE - Findmypet",
            "sort_id":377,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":378,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"UAE - Other\r\n",
            "sort_id":378,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":379,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"UAE - VETPASS UAE",
            "sort_id":379,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":380,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Uganda - VETPASS",
            "sort_id":380,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":381,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ukraine - Chmelnyzkyi",
            "sort_id":381,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":382,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ukraine - Other",
            "sort_id":382,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":383,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Ukraine - VETPASS UKR",
            "sort_id":383,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":384,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Uruguay - VETPASS",
            "sort_id":384,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":385,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Uzbekistan - VETPASS",
            "sort_id":385,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":386,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Vanuatu - VETPASS",
            "sort_id":386,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":387,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Vatican City State (Holy See) - VETPASS",
            "sort_id":387,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":388,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Venezuela Bolivarian Republic - VETPASS",
            "sort_id":388,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":389,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Vietnam Democratic Republic (DRV) - VETPASS",
            "sort_id":389,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":390,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Vietnam Socialist Republic - VETPASS",
            "sort_id":390,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":391,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Virgin Islands (British) - VETPASS",
            "sort_id":391,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":392,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Virgin Islands (USA) - VETPASS",
            "sort_id":392,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":393,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Wallis and Futuna Islands - VETPASS",
            "sort_id":393,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":394,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Yemen - VETPASS",
            "sort_id":394,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":395,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Zambia - VETPASS",
            "sort_id":395,
            "created_by":null,
            "updated_by":null
         },
         {
            "id":396,
            "created_at":new Date(),
            "updated_at":new Date(),
            "name":"Zimbabwe - VETPASS",
            "sort_id":396,
            "created_by":null,
            "updated_by":null
         }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const chipListIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396];
      await queryInterface.bulkDelete(
        "chip_lists",
        {
          id: chipListIds
        },
        {}
      );
  }
};