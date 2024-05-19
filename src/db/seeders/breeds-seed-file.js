'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "breeds",
      [
         {
            "id":1,
            "name":"Pet",
            "animal_type":1,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":2,
            "name":"African Bull",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":3,
            "name":"Amazon Milk",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":4,
            "name":"American Green Tree",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":5,
            "name":"Budgett",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":6,
            "name":"Bumblebee Dart",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":7,
            "name":"Banded Bull",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":8,
            "name":"Gray Tree",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":9,
            "name":"Pacman ",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":10,
            "name":"Pet",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":11,
            "name":"Pixie",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":12,
            "name":"Red-Eye Tree",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":13,
            "name":"Tomato",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":14,
            "name":"Waxy Monkey",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":15,
            "name":"White Lipped",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":16,
            "name":"White's Tree",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":17,
            "name":"Xenopus Clawed",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":18,
            "name":"Yellow and Black Dart",
            "animal_type":2,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":19,
            "name":"Eastern",
            "animal_type":3,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":20,
            "name":"Fire Belly",
            "animal_type":3,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":21,
            "name":"Pet",
            "animal_type":3,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":22,
            "name":"Pet",
            "animal_type":4,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":23,
            "name":"Axolotl",
            "animal_type":5,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":24,
            "name":"Pet",
            "animal_type":5,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":25,
            "name":"Tiger",
            "animal_type":5,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":26,
            "name":"Oriental Fire-Bellied",
            "animal_type":6,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":27,
            "name":"Pet",
            "animal_type":6,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":28,
            "name":"Pet",
            "animal_type":7,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":29,
            "name":"Albino and Lutino",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":30,
            "name":"Blackface",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":31,
            "name":"Cinnamon",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":32,
            "name":"Fallow",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":33,
            "name":"Normal",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":34,
            "name":"Opaline",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":35,
            "name":"Pet",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":36,
            "name":"Spangle",
            "animal_type":8,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":37,
            "name":"Belgian",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":38,
            "name":"Border Fancy",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":39,
            "name":"Crested",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":40,
            "name":"Fife Fancy",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":41,
            "name":"Frilled",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":42,
            "name":"Gloster",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":43,
            "name":"Harlequin Portuguese",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":44,
            "name":"Irish Fancy",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":45,
            "name":"Jaspe",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":46,
            "name":"Lancashire",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":47,
            "name":"Lizard",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":48,
            "name":"Norwich",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":49,
            "name":"Pet",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":50,
            "name":"Rubino",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":51,
            "name":"Scotch Fancy",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":52,
            "name":"Spanish Llarguet",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":53,
            "name":"Spanish Raza",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":54,
            "name":"Stafford",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":55,
            "name":"Warwick",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":56,
            "name":"Yorkshire",
            "animal_type":9,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":57,
            "name":"Cinnamon",
            "animal_type":10,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":58,
            "name":"Lutino",
            "animal_type":10,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":59,
            "name":"Normal Grey",
            "animal_type":10,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":60,
            "name":"Pearl",
            "animal_type":10,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":61,
            "name":"Pet",
            "animal_type":10,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":62,
            "name":"Pied",
            "animal_type":10,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":63,
            "name":"Whiteface",
            "animal_type":10,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":64,
            "name":"Bare-Eyed",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":65,
            "name":"Black Palm",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":66,
            "name":"Citron",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":67,
            "name":"Goffin's",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":68,
            "name":"Major Mitchell's",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":69,
            "name":"Moluccan",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":70,
            "name":"Pet",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":71,
            "name":"Rose-Breasted",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":72,
            "name":"Slender-Billed",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":73,
            "name":"Sulphur-Crested",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":74,
            "name":"Umbrella",
            "animal_type":11,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":75,
            "name":"Diamond",
            "animal_type":12,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":76,
            "name":"Pet",
            "animal_type":12,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":77,
            "name":"Ring-Necked",
            "animal_type":12,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":78,
            "name":"American Kestrel",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":79,
            "name":"European Kestrel",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":80,
            "name":"Gyr x Peregrine",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":81,
            "name":"Gyr x Saker",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":82,
            "name":"Hobby",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":83,
            "name":"Merlin",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":85,
            "name":"Peregrine",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":86,
            "name":"Peregrine x Merlin",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":87,
            "name":"Peregrine x Prairie",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":88,
            "name":"Peregrine x Saker",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":89,
            "name":"Saker",
            "animal_type":13,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":90,
            "name":"Chestnut Munia",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":91,
            "name":"Cut-Throat",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":92,
            "name":"Diamond Firetail",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":93,
            "name":"Double-Barred",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":94,
            "name":"Gouldian",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":95,
            "name":"Java Sparrow",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":96,
            "name":"Lavender Waxbill",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":97,
            "name":"Parrot",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":98,
            "name":"Pet",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":99,
            "name":"Plum-Headed",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":100,
            "name":"Scaly-Breasted Munia",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":101,
            "name":"Star",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":102,
            "name":"Strawberry",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":103,
            "name":"Zebra",
            "animal_type":14,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":104,
            "name":"Eurasian Sparrow",
            "animal_type":15,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":105,
            "name":"Gos",
            "animal_type":15,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":106,
            "name":"Harris",
            "animal_type":15,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":108,
            "name":"Common",
            "animal_type":16,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":109,
            "name":"Pet",
            "animal_type":16,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":110,
            "name":"Black-Masked",
            "animal_type":17,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":111,
            "name":"Fischer's",
            "animal_type":17,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":112,
            "name":"Peach-Faced",
            "animal_type":17,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":113,
            "name":"Pet",
            "animal_type":17,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":114,
            "name":"African Grey",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":115,
            "name":"Amazon",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":116,
            "name":"Blue-Headed",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":117,
            "name":"Caique",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":118,
            "name":"Conure",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":119,
            "name":"Blue-Crowned Conure",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":120,
            "name":"Green-Cheeked Conure",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":121,
            "name":"Eclectus",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":122,
            "name":"Hahn's",
            "animal_type":67,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":124,
            "name":"Pet",
            "animal_type":67,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":125,
            "name":"Blue and Gold",
            "animal_type":67,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":126,
            "name":"Green (Red and Green) Winged",
            "animal_type":67,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":127,
            "name":"Hyacinth",
            "animal_type":67,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":128,
            "name":"Pacific Parrotlet",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":129,
            "name":"Bourke's",
            "animal_type":68,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":130,
            "name":"Indian Ringneck",
            "animal_type":68,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":131,
            "name":"Lineolated",
            "animal_type":68,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":132,
            "name":"Monk (Quaker Parrot)",
            "animal_type":68,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":135,
            "name":"Senegal",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":136,
            "name":"Yellow-Head Amazon",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":137,
            "name":"Yellow-Crowned Amazon",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":138,
            "name":"Yellow-Naped Amazon",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":139,
            "name":"Fantail",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":140,
            "name":"Homer",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":141,
            "name":"King",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":142,
            "name":"Pet",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":143,
            "name":"Tumbler",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":145,
            "name":"American Curl",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":146,
            "name":"Birman",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":147,
            "name":"Burmese",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":148,
            "name":"Cymric",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":149,
            "name":"Devon Rex",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":150,
            "name":"Himalayan",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":151,
            "name":"Kurilian Bobtail",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":152,
            "name":"Maine Coon",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":153,
            "name":"Manx",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":154,
            "name":"Munchkin",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":155,
            "name":"Norwegian Forest",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":156,
            "name":"Persian",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":157,
            "name":"Ragamuffin",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":158,
            "name":"Ragdoll",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":159,
            "name":"Siamese",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":160,
            "name":"Siberian",
            "animal_type":21,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":161,
            "name":"Abyssinian",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":162,
            "name":"American Bobtail Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":163,
            "name":"American Bobtail Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":164,
            "name":"American Curl Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":165,
            "name":"American Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":167,
            "name":"Asian Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":168,
            "name":"Balinese",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":169,
            "name":"Bengal",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":170,
            "name":"Birman",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":171,
            "name":"Bombay",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":172,
            "name":"British Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":173,
            "name":"British Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":174,
            "name":"Burmese",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":175,
            "name":"Burmilla Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":176,
            "name":"Chartreux",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":177,
            "name":"Colorpoint Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":178,
            "name":"Cornish Rex",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":179,
            "name":"Devon Rex",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":180,
            "name":"Domestic Medium Hair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":181,
            "name":"Domestic Short Hair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":182,
            "name":"Egyptian Mau",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":184,
            "name":"Exotic Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":187,
            "name":"Japanese Bobtail Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":188,
            "name":"Japanese Bobtail Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":189,
            "name":"Javanese",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":190,
            "name":"Maine Coon",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":191,
            "name":"Manx Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":192,
            "name":"Manx Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":193,
            "name":"Norwegian Forest",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":194,
            "name":"Ocelet",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":195,
            "name":"Oriental Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":196,
            "name":"Oriental Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":198,
            "name":"Persian - Himalayan",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":204,
            "name":"Ragamuffin",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":205,
            "name":"Ragdoll",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":206,
            "name":"Russian Blue",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":207,
            "name":"Scottish Fold Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":208,
            "name":"Scottish Fold Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":209,
            "name":"Selkirk Rex Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":210,
            "name":"Selkirk Rex Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":211,
            "name":"Siamese",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":212,
            "name":"Siberian",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":213,
            "name":"Singapura",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":214,
            "name":"Sphynx",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":215,
            "name":"Tonkinese",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":216,
            "name":"Turkish Angora",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":224,
            "name":"Cavachon",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":225,
            "name":"Cavapoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":226,
            "name":"Cockapoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":227,
            "name":"Goldador",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":228,
            "name":"Goldendoodle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":229,
            "name":"Pugapoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":230,
            "name":"Schnoodle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":231,
            "name":"Shih-Poo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":232,
            "name":"Shorkie",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":233,
            "name":"Springador",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":234,
            "name":"Sprollie",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":235,
            "name":"Sproodle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":236,
            "name":"Westiepoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":237,
            "name":"Whoodle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":238,
            "name":"Yorkipoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":239,
            "name":"Giant (over 45kg / over 100lbs)",
            "animal_type":64,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":240,
            "name":"Large (23-45kg / 51-100lbs)",
            "animal_type":64,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":241,
            "name":"Small (5-11kg / 11-25lbs)",
            "animal_type":64,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":242,
            "name":"Affenpinscher",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":243,
            "name":"Afghan Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":244,
            "name":"Airedale Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":245,
            "name":"American Akita",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":246,
            "name":"Alaskan Malamute",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":247,
            "name":"American English Coonhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":248,
            "name":"American Eskimo",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":249,
            "name":"American Foxhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":250,
            "name":"American Hairless Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":251,
            "name":"American Staffordshire Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":253,
            "name":"Anatolian Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":254,
            "name":"Australian Cattle",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":255,
            "name":"Australian Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":256,
            "name":"Australian Silky Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":257,
            "name":"Australian Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":258,
            "name":"Azawakh",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":259,
            "name":"Barbet",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":260,
            "name":"Basenji",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":261,
            "name":"Basset Bleu de Gascogne",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":262,
            "name":"Basset Fauve de Bretagne",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":263,
            "name":"Basset Griffon Vendeen (Grand)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":264,
            "name":"Basset Griffon Vendeen (Petit)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":265,
            "name":"Basset Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":266,
            "name":"Bavarian Mountain Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":267,
            "name":"Beagle",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":268,
            "name":"Collie (Bearded)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":269,
            "name":"Beauceron",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":270,
            "name":"Bedlington Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":274,
            "name":"Belgian Shepherd (Groenendael)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":275,
            "name":"Belgian Shepherd (Laekenois)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":276,
            "name":"Belgian Shepherd (Malinois)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":277,
            "name":"Belgian Shepherd (Tervueren)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":279,
            "name":"Bergamasco",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":280,
            "name":"Berger Picard",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":281,
            "name":"Bernese Mountain",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":282,
            "name":"Bichon Frise",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":283,
            "name":"Biewer Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":285,
            "name":"Black and Tan Coonhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":286,
            "name":"Black Russian Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":287,
            "name":"Bloodhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":288,
            "name":"Bluetick Coonhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":289,
            "name":"Boerboel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":290,
            "name":"Bolognese",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":291,
            "name":"Collie (Border)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":292,
            "name":"Border Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":293,
            "name":"Borzoi",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":294,
            "name":"Boston Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":295,
            "name":"Bouvier des Flandres",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":296,
            "name":"Boxer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":297,
            "name":"Boykin Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":298,
            "name":"Bracco Italiano",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":299,
            "name":"Braque d’Auvergne",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":300,
            "name":"Briard",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":301,
            "name":"Brittany",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":302,
            "name":"Brussels Griffon",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":303,
            "name":"Bull Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":304,
            "name":"Bull Terrier (Miniature)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":305,
            "name":"English Bulldog",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":306,
            "name":"Bullmastiff",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":307,
            "name":"Cairn Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":308,
            "name":"Canaan",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":309,
            "name":"Canadian Eskimo",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":310,
            "name":"Cane Corso",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":312,
            "name":"Catalan Sheep",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":314,
            "name":"Cesky Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":315,
            "name":"Chesapeake Bay Retriever",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":317,
            "name":"Chihuahua (Long Coat)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":318,
            "name":"Chihuahua (Smooth Coat)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":319,
            "name":"Chinese Crested",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":320,
            "name":"Chinese Shar-Pei",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":321,
            "name":"Chinook",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":322,
            "name":"Chow Chow",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":323,
            "name":"Cirneco Dell’Etna",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":327,
            "name":"Collie",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":328,
            "name":"Collie (Rough)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":329,
            "name":"Collie (Smooth)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":330,
            "name":"Coton de Tulear",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":331,
            "name":"Curly-Coated Retriever",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":332,
            "name":"Dachshund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":333,
            "name":"Dachshund (Long Haired)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":334,
            "name":"Dachshund (Miniature Long Haired)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":335,
            "name":"Dachshund (Miniature Smooth Haired)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":336,
            "name":"Dachshund (Miniature Wire Haired)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":337,
            "name":"Dachshund (Smooth Haired)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":338,
            "name":"Dachshund (Wire Haired)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":339,
            "name":"Dalmatian",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":340,
            "name":"Dandie Dinmont Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":341,
            "name":"Deerhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":342,
            "name":"Doberman Pinscher",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":343,
            "name":"Dobermann",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":344,
            "name":"Dogo Argentino",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":345,
            "name":"Dogue de Bordeaux",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":346,
            "name":"Dutch Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":347,
            "name":"English Cocker Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":348,
            "name":"English Foxhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":349,
            "name":"English Setter",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":351,
            "name":"English Toy Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":352,
            "name":"English Toy Terrier (Black and Tan)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":353,
            "name":"Entlebucher Mountain",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":354,
            "name":"Estrela Mountain",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":355,
            "name":"Eurasier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":357,
            "name":"Finnish Lapphund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":358,
            "name":"Finnish Spitz",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":359,
            "name":"Flat-Coated Retriever",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":360,
            "name":"Fox Terrier (Smooth)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":361,
            "name":"Fox Terrier (Wire)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":362,
            "name":"Foxhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":363,
            "name":"French Bulldog",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":364,
            "name":"German Longhaired Pointer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":365,
            "name":"German Pinscher",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":366,
            "name":"German Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":367,
            "name":"German Shorthaired Pointer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":368,
            "name":"German Spitz (Klein)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":369,
            "name":"German Spitz (Mittel)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":370,
            "name":"German Wirehaired Pointer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":371,
            "name":"Giant Schnauzer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":372,
            "name":"Glen of Imaal Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":373,
            "name":"Golden Retriever",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":374,
            "name":"Gordon Setter",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":376,
            "name":"Grand Bleu de Gascogne",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":377,
            "name":"Great Dane",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":379,
            "name":"Great Swiss Mountain",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":381,
            "name":"Greenland",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":382,
            "name":"Greyhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":383,
            "name":"Griffon Bruxellois",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":384,
            "name":"Griffon Fauve de Bretagne",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":385,
            "name":"Hamiltonstovare",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":386,
            "name":"Harrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":387,
            "name":"Havanese",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":388,
            "name":"Hovawart",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":389,
            "name":"Hungarian Kuvasz",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":390,
            "name":"Hungarian Puli",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":391,
            "name":"Hungarian Pumi",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":392,
            "name":"Hungarian Vizsla",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":393,
            "name":"Hungarian Wirehaired Vizsla",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":394,
            "name":"Ibizan Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":395,
            "name":"Icelandic Sheep",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":396,
            "name":"Irish Red & White Setter",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":397,
            "name":"Irish Setter",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":398,
            "name":"Irish Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":400,
            "name":"Irish Wolfhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":401,
            "name":"Italian Greyhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":403,
            "name":"Jack Russell Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":404,
            "name":"Japanese Akita Inu",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":405,
            "name":"Japanese Chin",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":406,
            "name":"Japanese Shiba Inu",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":407,
            "name":"Japanese Spitz",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":408,
            "name":"Keeshond (German Spitz)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":409,
            "name":"Kerry Blue Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":410,
            "name":"Cavalier King Charles Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":411,
            "name":"Komondor",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":413,
            "name":"Korean Jindo",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":414,
            "name":"Korthals Griffon",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":416,
            "name":"Lagotto Romagnolo",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":417,
            "name":"Lakeland Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":418,
            "name":"Lancashire Heeler",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":419,
            "name":"Large Munsterlander",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":420,
            "name":"Leonberger",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":421,
            "name":"Lhasa Apso",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":422,
            "name":"Lowchen",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":423,
            "name":"Maltese",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":424,
            "name":"Manchester Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":425,
            "name":"Maremma Sheep",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":427,
            "name":"Mastiff",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":428,
            "name":"Miniature American Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":429,
            "name":"Miniature Bull Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":430,
            "name":"Miniature Pinscher",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":431,
            "name":"Miniature Schnauzer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":432,
            "name":"Mudi",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":433,
            "name":"Neapolitan Mastiff",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":434,
            "name":"Nederlandse Kooikerhondje",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":436,
            "name":"Newfoundland",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":437,
            "name":"Norfolk Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":438,
            "name":"Norrbottenspets",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":439,
            "name":"Norwegian Buhund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":440,
            "name":"Norwegian Elkhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":441,
            "name":"Norwegian Lundehund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":442,
            "name":"Norwich Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":443,
            "name":"Nova Scotia Duck Tolling Retriever",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":444,
            "name":"Old English Sheep",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":445,
            "name":"Otterhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":446,
            "name":"Papillon",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":447,
            "name":"Parson Russell Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":448,
            "name":"Pekingese",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":450,
            "name":"Peruvian Inca Orchid",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":452,
            "name":"Pharaoh Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":454,
            "name":"Plott Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":455,
            "name":"Pointer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":456,
            "name":"Polish Lowland Sheep",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":457,
            "name":"Pomeranian",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":458,
            "name":"Poodle (Miniature)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":459,
            "name":"Poodle (Standard)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":460,
            "name":"Poodle (Toy)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":462,
            "name":"Portuguese Podengo Pequeno",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":463,
            "name":"Portuguese Pointer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":464,
            "name":"Portuguese Water Dog",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":465,
            "name":"Pug",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":466,
            "name":"Puli",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":467,
            "name":"Pumi",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":468,
            "name":"Pyrenean Mastiff",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":469,
            "name":"Pyrenean Mountain Great Pyrenees",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":470,
            "name":"Pyrenean (Long Haired) Sheep Dog",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":471,
            "name":"Pyrenean (Smooth Faced) Sheep Dog",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":473,
            "name":"Rat Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":474,
            "name":"Redbone Coonhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":479,
            "name":"Labrador Retriever",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":481,
            "name":"Rhodesian Ridgeback",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":482,
            "name":"Rottweiler",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":483,
            "name":"Russell Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":484,
            "name":"Russian Black Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":485,
            "name":"Russian Toy",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":486,
            "name":"Saint Bernard",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":487,
            "name":"Saluki",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":488,
            "name":"Samoyed",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":489,
            "name":"Schipperke",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":490,
            "name":"Schnauzer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":491,
            "name":"Scottish Deerhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":492,
            "name":"Scottish Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":493,
            "name":"Sealyham Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":495,
            "name":"Shetland Sheep",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":496,
            "name":"Shiba Inu",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":497,
            "name":"Shih Tzu",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":498,
            "name":"Siberian Husky",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":499,
            "name":"Silky Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":500,
            "name":"Skye Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":501,
            "name":"Sloughi",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":503,
            "name":"Small Munsterlander",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":504,
            "name":"Smooth Fox Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":505,
            "name":"Soft Coated Wheaten Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":506,
            "name":"American Cocker Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":507,
            "name":"American Water Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":508,
            "name":"Clumber Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":510,
            "name":"English Springer Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":511,
            "name":"Working Spaniel (Field)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":512,
            "name":"Irish Water Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":513,
            "name":"Sussex Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":514,
            "name":"Welsh Springer Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":515,
            "name":"Spanish Water",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":516,
            "name":"Spinone Italiano",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":518,
            "name":"Staffordshire Bull Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":519,
            "name":"Standard Schnauzer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":521,
            "name":"Swedish Lapphund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":522,
            "name":"Swedish Vallhund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":523,
            "name":"Teddy Roosevelt Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":524,
            "name":"Tibetan Mastiff",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":525,
            "name":"Tibetan Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":526,
            "name":"Tibetan Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":527,
            "name":"Toy Fox Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":528,
            "name":"Treeing Walker Coonhound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":529,
            "name":"Turkish Kangal",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":531,
            "name":"Weimaraner",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":532,
            "name":"Welsh Corgi (Cardigan)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":533,
            "name":"Welsh Corgi (Pembroke)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":535,
            "name":"Welsh Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":536,
            "name":"West Highland White Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":537,
            "name":"Whippet",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":538,
            "name":"White Swiss Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":539,
            "name":"Wire Fox Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":540,
            "name":"Wirehaired Pointing Griffon",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":542,
            "name":"Xoloitzcuintle (Min)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":543,
            "name":"Xoloitzcuintle (Std)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":544,
            "name":"Xoloitzcuintle (Toy/Int)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":546,
            "name":"Yorkshire Terrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":547,
            "name":"American Bulldog",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":548,
            "name":"American Leopard Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":549,
            "name":"Appenzeller Sennenhund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":550,
            "name":"Australian Kelpie",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":551,
            "name":"Australian Stumpy Tail Cattle",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":554,
            "name":"Bohemian Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":556,
            "name":"Braque de Bourbonnais",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":557,
            "name":"Braque Francais (Pyrenean)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":558,
            "name":"Broholmer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":559,
            "name":"Carolina",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":560,
            "name":"Louisiana Catahoula Leopard",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":561,
            "name":"Caucasian Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":562,
            "name":"Central Asian Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":563,
            "name":"Croatian Sheep",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":564,
            "name":"Czechoslovakian Vlack",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":565,
            "name":"Danish-Swedish Farm",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":566,
            "name":"Deutscher Wachtelhund",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":567,
            "name":"Dingo",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":568,
            "name":"Drentsche Patrijshond",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":569,
            "name":"Drever",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":572,
            "name":"French Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":574,
            "name":"German Spitz (Groß)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":576,
            "name":"Hanoverian Scenthound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":577,
            "name":"Hokkaido",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":579,
            "name":"Jagdterrier",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":580,
            "name":"Jindo",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":581,
            "name":"Kai Ken",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":582,
            "name":"Karelian Bear",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":583,
            "name":"Kishu Ken",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":584,
            "name":"Kromfohrlander",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":585,
            "name":"Lapponian Herder",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":586,
            "name":"Mountain Cur",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":587,
            "name":"Perro de Presa Canario",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":589,
            "name":"Porcelaine",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":591,
            "name":"Portuguese Sheep Dog",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":592,
            "name":"Pudelpointer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":594,
            "name":"Rafeiro de Alentejo",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":595,
            "name":"Romanian Mioritic Shepherd",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":596,
            "name":"Russian Tsvetnaya Bolonka",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":597,
            "name":"Schapendoes",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":598,
            "name":"Segugio Italiano",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":599,
            "name":"Shikoku",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":600,
            "name":"Slovakian (Wirehair/Rough Hair) Pointer",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":601,
            "name":"Slovensky Cuvac",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":602,
            "name":"Slovensky Kopov",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":604,
            "name":"Spanish Mastiff",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":605,
            "name":"Stabyhoun",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":607,
            "name":"Taiwan",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":608,
            "name":"Thai Ridgeback",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":609,
            "name":"Tornjak",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":610,
            "name":"Tosa",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":611,
            "name":"Transylvanian Hound",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":612,
            "name":"Treeing Tennessee Brindle",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":613,
            "name":"Wetterhoun",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":614,
            "name":"Working Kelpie",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":615,
            "name":"Yakutian Laika",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":616,
            "name":"Huacaya",
            "animal_type":28,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":618,
            "name":"Aberdeen Black Angus",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":619,
            "name":"Ayrshire",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":620,
            "name":"Belted Galloway (Oreo)",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":621,
            "name":"Brahman",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":622,
            "name":"British White",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":623,
            "name":"Charolais (Charlois)",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":624,
            "name":"Dexter",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":625,
            "name":"English Longhorn",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":626,
            "name":"Gelbvieh",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":627,
            "name":"Hereford",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":628,
            "name":"Holstein",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":629,
            "name":"Limousin",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":631,
            "name":"Piedmontese",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":632,
            "name":"Red Angus",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":633,
            "name":"Red Poll",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":634,
            "name":"Scottish Highland",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":635,
            "name":"Shorthorn",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":636,
            "name":"Simmental",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":637,
            "name":"South Devon",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":638,
            "name":"Texas Longhorn",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":639,
            "name":"Watusi (Ankole Watusi)",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":640,
            "name":"White Park",
            "animal_type":30,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":641,
            "name":"Australorp",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":642,
            "name":"Barnevelder",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":643,
            "name":"Brahma",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":644,
            "name":"Cemani",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":645,
            "name":"Cochin",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":646,
            "name":"Gingernut Ranger",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":647,
            "name":"ISA Brown",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":648,
            "name":"Japanese Bantam",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":649,
            "name":"Leghorn",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":650,
            "name":"Maran",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":651,
            "name":"Miss Pepperpot",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":652,
            "name":"New Hampshire Red",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":653,
            "name":"Orpington",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":655,
            "name":"Pekin Bantam",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":656,
            "name":"Plymouth Rock",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":657,
            "name":"Polish",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":658,
            "name":"Rhode Island Red",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":659,
            "name":"Silkie",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":660,
            "name":"Speckledy Hen",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":661,
            "name":"Sussex Bantam",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":662,
            "name":"Wynadotte",
            "animal_type":31,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":663,
            "name":"African Pygmy",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":664,
            "name":"Anglo Nubian",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":665,
            "name":"Angora",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":666,
            "name":"Bagot",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":667,
            "name":"Boer",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":668,
            "name":"British",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":669,
            "name":"British Alpine",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":670,
            "name":"British Guernsey",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":671,
            "name":"British Saanen",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":672,
            "name":"British Toggenburg",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":673,
            "name":"Cashmere",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":674,
            "name":"English",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":675,
            "name":"Golden Guernsey",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":676,
            "name":"Harness",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":677,
            "name":"Nigerian Dwarf",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":678,
            "name":"Oberhasli (Swiss Alpine)",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":680,
            "name":"Pashmina",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":681,
            "name":"American Pygmy",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":682,
            "name":"Saanen",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":683,
            "name":"Toggenburg",
            "animal_type":32,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":684,
            "name":"Classic",
            "animal_type":33,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":685,
            "name":"Common",
            "animal_type":34,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":686,
            "name":"Berkshire BK",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":687,
            "name":"British Saddleback BS",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":688,
            "name":"Duroc DU",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":689,
            "name":"Gloucestershire Old Spot GS",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":690,
            "name":"Hampshire HP",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":691,
            "name":"Landrace LA",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":692,
            "name":"Large Black LB",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":693,
            "name":"Yorkshire LW",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":694,
            "name":"Manglitza MG",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":695,
            "name":"Middle White MW",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":696,
            "name":"Oxford Sandy and Black OS",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":697,
            "name":"Pietrain PT",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":698,
            "name":"Tamworth TW",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":699,
            "name":"Welsh WE",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":700,
            "name":"British Lop",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":701,
            "name":"Chester White",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":702,
            "name":"Miniature",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":703,
            "name":"Hereford",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":704,
            "name":"Meishan",
            "animal_type":35,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":706,
            "name":"Black Welsh Mountain",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":707,
            "name":"Bluefaced Leicester",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":708,
            "name":"Charollais ",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":709,
            "name":"Cheviot",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":710,
            "name":"Connemara Hill Lamb",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":711,
            "name":"Cordero de Extremadura",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":712,
            "name":"Dorper",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":713,
            "name":"Dorset",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":714,
            "name":"East Friesan",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":716,
            "name":"Hampshire",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":717,
            "name":"Katahdin",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":718,
            "name":"Leicester Longwool",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":719,
            "name":"Lincoln",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":720,
            "name":"Lincoln Longwool",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":721,
            "name":"Merino",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":722,
            "name":"Rambouillet",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":723,
            "name":"Romney",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":724,
            "name":"Ryeland",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":725,
            "name":"Shetland",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":726,
            "name":"Southdown",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":727,
            "name":"Suffolk",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":728,
            "name":"Tsigai",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":729,
            "name":"Turcana",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":730,
            "name":"Welsh Mountain",
            "animal_type":36,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":731,
            "name":"Domestic",
            "animal_type":37,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":732,
            "name":"Angel",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":733,
            "name":"Betta",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":734,
            "name":"Cherry Barb",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":735,
            "name":"Zebra Danio",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":736,
            "name":"Discus",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":737,
            "name":"Gold",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":738,
            "name":"Guppy",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":739,
            "name":"Killifish",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":740,
            "name":"Mollie",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":741,
            "name":"Oscar",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":742,
            "name":"Pearl Gourami",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":743,
            "name":"Pet",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":744,
            "name":"Platy",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":745,
            "name":"Plecostomus",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":746,
            "name":"Rainbow",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":747,
            "name":"Swordtail",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":748,
            "name":"Neon Tetra",
            "animal_type":38,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":749,
            "name":"American Mammoth Jack",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":750,
            "name":"Andaluz",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":751,
            "name":"Catalan",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":752,
            "name":"Cotentin (Âne du Cotentin)",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":753,
            "name":"Our",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":754,
            "name":"Parlag",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":755,
            "name":"Zamorano-Leonés",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":756,
            "name":"American Paint",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":757,
            "name":"Andalusian",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":758,
            "name":"Appaloosa",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":759,
            "name":"Arabian",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":760,
            "name":"Carolina Marsh Tucky",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":761,
            "name":"Cob",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":762,
            "name":"Connemara",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":763,
            "name":"English Thoroughbred",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":764,
            "name":"Friesan",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":765,
            "name":"Gypsy",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":766,
            "name":"Hackney",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":767,
            "name":"Haflinger",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":768,
            "name":"Hanoverian",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":769,
            "name":"Irish Draught",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":770,
            "name":"Irish Thoroughbred",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":771,
            "name":"Marwari",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":772,
            "name":"Miniature",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":773,
            "name":"Missouri Fox Trotter",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":774,
            "name":"Morgan",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":775,
            "name":"Mustang",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":776,
            "name":"Our",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":777,
            "name":"Palomino",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":778,
            "name":"Percheron",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":779,
            "name":"Quarter",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":780,
            "name":"Shetland",
            "animal_type":41,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":781,
            "name":"Tennessee Walking",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":782,
            "name":"French Thoroughbred",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":783,
            "name":"British Riding",
            "animal_type":41,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":784,
            "name":"Our",
            "animal_type":41,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":785,
            "name":"Ponie of the Americas",
            "animal_type":41,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":786,
            "name":"Welsh",
            "animal_type":41,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":787,
            "name":"Flower",
            "animal_type":42,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":788,
            "name":"Pet",
            "animal_type":42,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":789,
            "name":"Rhino",
            "animal_type":42,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":790,
            "name":"Stag",
            "animal_type":42,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":791,
            "name":"Ant",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":792,
            "name":"Cockroach",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":793,
            "name":"Cricket",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":794,
            "name":"Doodlebug",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":795,
            "name":"Mealworm",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":796,
            "name":"Millipede",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":797,
            "name":"Pet",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":798,
            "name":"Stick",
            "animal_type":43,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":799,
            "name":"African (Sphodromantis lineola, Green, African Lined)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":800,
            "name":"Arizona Unicorn (Pseudovates arizonae)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":801,
            "name":"Giant Shield (Rhombodera basalis, Malaysian Shield)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":802,
            "name":"Egyptian Pygmy (Miomantis paykullii)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":803,
            "name":"Chinese (Tenodera sinensis)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":804,
            "name":"Panther (Tarachodula pantherina)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":805,
            "name":"Devil Flower (Idolomantis diabolica)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":806,
            "name":"Flower Mantis (Creobroter; China - Yunnan, Indian, Thai, Malaysian)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":807,
            "name":"New Zealand (Orthodera novaezealandiae)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":808,
            "name":"Ghost (Phyllocrania paradoxa)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":809,
            "name":"Giant Asian (Hierodula membranacea)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":810,
            "name":"Dead Leaf (Deroplatys desiccata)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":812,
            "name":"European (Mantis religiosa)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":813,
            "name":"Orchid (Pink and White, Hymenopus coronatus)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":814,
            "name":"Giant African (Sphodromantis viridis)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":815,
            "name":"Peacock (Pseudempusa pinnapavonis)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":816,
            "name":"Pet",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":817,
            "name":"Spiny Flower (Pseudocreobotra wahlbergii)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":818,
            "name":"Asian Forest",
            "animal_type":45,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":819,
            "name":"Giant Vinegaroon",
            "animal_type":45,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":820,
            "name":"Malay Vinegroon",
            "animal_type":45,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":821,
            "name":"Pet",
            "animal_type":45,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":822,
            "name":"Giant Trap Door",
            "animal_type":46,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":823,
            "name":"Pet",
            "animal_type":46,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":824,
            "name":"Pet",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":825,
            "name":"Brazilian Black",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":826,
            "name":"Chaco Golden Knee",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":827,
            "name":"Chile Gold Burst",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":828,
            "name":"Chilean Rose",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":829,
            "name":"Costa Rican Zebra",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":830,
            "name":"Desert Blonde",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":831,
            "name":"Fishing",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":832,
            "name":"Gooty Ornamental",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":833,
            "name":"Grass",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":834,
            "name":"Honduran Curly Hair",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":835,
            "name":"Jumping",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":836,
            "name":"Mexican Red Knee",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":837,
            "name":"Mexican Red Rump",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":838,
            "name":"Mexican Redleg",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":839,
            "name":"New River Rust Rump",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":840,
            "name":"Pink Toe",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":841,
            "name":"Pink Zebra Beauty",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":842,
            "name":"Wolf",
            "animal_type":69,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":843,
            "name":"Our",
            "animal_type":70,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":844,
            "name":"Anole",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":845,
            "name":"Bahaman Anole",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":846,
            "name":"Green Anole",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":847,
            "name":"Bearded Dragon",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":848,
            "name":"Chameleon",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":849,
            "name":"Gecko",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":850,
            "name":"Crested Gecko",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":851,
            "name":"Leopard Gecko",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":852,
            "name":"Green Basilisk",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":853,
            "name":"Iguana",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":854,
            "name":"Spiny-Tailed",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":855,
            "name":"Mountain Horned Dragon",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":856,
            "name":"Pet",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":857,
            "name":"Skink",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":858,
            "name":"Blue Tongue Skink",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":859,
            "name":"Spiny-Tailed Monitor",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":860,
            "name":"Veiled Chameleon",
            "animal_type":48,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":861,
            "name":"Anaconda",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":862,
            "name":"Black Rat",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":863,
            "name":"Boa Constrictor",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":864,
            "name":"Kenyan Sand Boa",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":865,
            "name":"Red-Tail Boa",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":866,
            "name":"California King",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":867,
            "name":"Corn",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":868,
            "name":"Green",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":870,
            "name":"Milk",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":871,
            "name":"Pet",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":873,
            "name":"Ball",
            "animal_type":66,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":874,
            "name":"Blood",
            "animal_type":66,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":875,
            "name":"Burmese",
            "animal_type":66,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":876,
            "name":"Carpet",
            "animal_type":66,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":877,
            "name":"Green Tree",
            "animal_type":66,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":878,
            "name":"Reticulated",
            "animal_type":66,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":879,
            "name":"Royal",
            "animal_type":66,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":880,
            "name":"Water",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":881,
            "name":"Western Hognose",
            "animal_type":49,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":882,
            "name":"Diamondback",
            "animal_type":50,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":886,
            "name":"Hermann's",
            "animal_type":52,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":887,
            "name":"Russian Horsfield",
            "animal_type":52,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":888,
            "name":"Indian Star",
            "animal_type":52,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":889,
            "name":"Marginated",
            "animal_type":52,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":890,
            "name":"Pet",
            "animal_type":52,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":891,
            "name":"Red Foot",
            "animal_type":52,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":892,
            "name":"Sulcata",
            "animal_type":52,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":893,
            "name":"Box",
            "animal_type":53,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":894,
            "name":"Map",
            "animal_type":53,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":895,
            "name":"Painted",
            "animal_type":53,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":896,
            "name":"Pet",
            "animal_type":53,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":897,
            "name":"Long Tailed",
            "animal_type":54,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":899,
            "name":"Short Tailed",
            "animal_type":54,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":900,
            "name":"Albino",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":901,
            "name":"Black",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":902,
            "name":"Black Sable",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":903,
            "name":"Black Sable Mitt",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":904,
            "name":"Blaze",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":905,
            "name":"Champagne",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":906,
            "name":"Chocolate",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":907,
            "name":"Chocolate Mitt",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":908,
            "name":"Cinnamon",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":909,
            "name":"Cinnamon Mitt",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":910,
            "name":"Dalmatian",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":911,
            "name":"Dark Eyed White",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":912,
            "name":"Light Pattern",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":913,
            "name":"Medium Pattern",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":914,
            "name":"Panda",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":915,
            "name":"Pet",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":916,
            "name":"Sable",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":917,
            "name":"Sable Mitt",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":918,
            "name":"Siamese",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":919,
            "name":"Silver",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":920,
            "name":"Siamese Mitt",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":921,
            "name":"Striped White",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":922,
            "name":"White with dark eyes",
            "animal_type":55,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":923,
            "name":"Fat Tailed",
            "animal_type":56,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":924,
            "name":"Mongolian",
            "animal_type":56,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":925,
            "name":"Pet",
            "animal_type":56,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":926,
            "name":"Abyssinian",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":927,
            "name":"Abyssinian Satin",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":928,
            "name":"Alpaca",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":929,
            "name":"American",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":930,
            "name":"Baldwin",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":931,
            "name":"Coronet",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":932,
            "name":"Himalayan",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":933,
            "name":"Magpie",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":934,
            "name":"Peruvian",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":936,
            "name":"Pet",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":937,
            "name":"Rex",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":938,
            "name":"Silkie",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":939,
            "name":"Teddy",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":940,
            "name":"Texel",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":941,
            "name":"White Crested",
            "animal_type":57,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":942,
            "name":"Campbell’s Russian",
            "animal_type":58,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":943,
            "name":"Chinese",
            "animal_type":58,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":944,
            "name":"Pet",
            "animal_type":58,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":945,
            "name":"Roborovski",
            "animal_type":58,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":946,
            "name":"Winter White",
            "animal_type":58,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":947,
            "name":"African Pygmy",
            "animal_type":59,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":948,
            "name":"Pet",
            "animal_type":59,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":949,
            "name":"Abyssinian Rosette",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":950,
            "name":"American Harvest",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":951,
            "name":"Angora",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":952,
            "name":"Big-Eared Hopping",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":953,
            "name":"Bolam",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":954,
            "name":"Brush",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":955,
            "name":"Door",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":956,
            "name":"Eurasian Harvest",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":957,
            "name":"Field",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":958,
            "name":"Florida",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":959,
            "name":"Flying",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":960,
            "name":"Forest",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":961,
            "name":"Golden",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":962,
            "name":"Pet",
            "animal_type":60,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":963,
            "name":"American",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":964,
            "name":"Belgian Hare",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":965,
            "name":"Blanc de Hotot",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":966,
            "name":"Californian",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":967,
            "name":"Checkered Giant",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":969,
            "name":"American Fuzzy Lop",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":970,
            "name":"Dutch",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":971,
            "name":"Dwarf Hotot",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":972,
            "name":"English Lop",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":973,
            "name":"English Spot",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":974,
            "name":"Flemish Giant",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":975,
            "name":"Florida White",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":976,
            "name":"French Angora",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":977,
            "name":"Harlequin",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":978,
            "name":"Havana",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":979,
            "name":"Himalayan",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":980,
            "name":"Holland Lop",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":981,
            "name":"Jersey Wooly",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":982,
            "name":"Lionhead",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":983,
            "name":"Mini Lop",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":984,
            "name":"Mini Rex",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":985,
            "name":"Netherland Dwarf",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":986,
            "name":"New Zealand",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":987,
            "name":"Polish - Britannia Petite",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":988,
            "name":"Tan",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":989,
            "name":"Bristle Coat",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":990,
            "name":"Dumbo",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":991,
            "name":"Hairless",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":992,
            "name":"Pet",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":993,
            "name":"Rex",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":994,
            "name":"Satin",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":995,
            "name":"Standard",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":996,
            "name":"Tailless",
            "animal_type":62,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":997,
            "name":"Pet",
            "animal_type":63,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":999,
            "name":"Indoor",
            "animal_type":20,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1000,
            "name":"Outdoor",
            "animal_type":20,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1001,
            "name":"Indoor and Outdoor",
            "animal_type":20,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1002,
            "name":"Jackapoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1003,
            "name":"Lykoi",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1006,
            "name":"Australian Mist",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1007,
            "name":"Aztec",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1008,
            "name":"American Curl Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1009,
            "name":"American Wirehair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1010,
            "name":"Burmilla Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1011,
            "name":"European Burmese",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1012,
            "name":"Exotic Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1013,
            "name":"Havana Brown",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1014,
            "name":"Korat",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1015,
            "name":"LaPerm Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1016,
            "name":"LaPerm Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1017,
            "name":"Nebelung",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1018,
            "name":"Ocicat",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1019,
            "name":"Snowshoe",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1020,
            "name":"Sokoke",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1021,
            "name":"Somali Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1022,
            "name":"Somali Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1023,
            "name":"Toyger",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1024,
            "name":"Toybob",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1025,
            "name":"Thai",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1026,
            "name":"Turkish Van",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1028,
            "name":"American Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1029,
            "name":"Colorpoint Longhair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1031,
            "name":"King Charles Spaniel",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1033,
            "name":"Spaniel (Other)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1034,
            "name":"Braque Francais (Gascogne)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1035,
            "name":"Cavoodle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1036,
            "name":"Puggle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1037,
            "name":"Golden Irish",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1039,
            "name":"American Thoroughbred",
            "animal_type":40,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1040,
            "name":"French Lop",
            "animal_type":61,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1043,
            "name":"Pet Parent",
            "animal_type":71,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1044,
            "name":"Commercial",
            "animal_type":72,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1045,
            "name":"Advertising",
            "animal_type":73,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1046,
            "name":"Press",
            "animal_type":73,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1047,
            "name":"Puddle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1048,
            "name":"Pomsky",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1049,
            "name":"Labradoodle",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1050,
            "name":"Crestepoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1051,
            "name":"Maltipoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1052,
            "name":"Poodle (Royal)",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1053,
            "name":"Poochon",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1054,
            "name":"Burro",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1055,
            "name":"Hinny",
            "animal_type":39,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1056,
            "name":"Medium (12-22kg / 26-50lbs)",
            "animal_type":64,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1057,
            "name":"Toy (upto 4kg / 10lbs)",
            "animal_type":64,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1058,
            "name":"Nurse",
            "animal_type":74,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1059,
            "name":"Surgeon",
            "animal_type":74,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1060,
            "name":"Technician",
            "animal_type":74,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1061,
            "name":"Student",
            "animal_type":74,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1062,
            "name":"Administrator",
            "animal_type":74,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1063,
            "name":"Capuchin",
            "animal_type":76,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1064,
            "name":"Pet",
            "animal_type":80,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1065,
            "name":"Pet",
            "animal_type":79,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1066,
            "name":"Pet",
            "animal_type":77,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1068,
            "name":"Pet",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1069,
            "name":"Pet",
            "animal_type":26,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1070,
            "name":"Pet",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1071,
            "name":"Pet",
            "animal_type":68,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1072,
            "name":"Pet",
            "animal_type":18,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1073,
            "name":"African Owl",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1074,
            "name":"American Show Racer",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1075,
            "name":"Band-Tailed",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1076,
            "name":"Belgian Postal",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1077,
            "name":"Berlin Short-Faced Tumbler",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1078,
            "name":"Black German",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1079,
            "name":"Chinese Owl",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1080,
            "name":"Damask",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1081,
            "name":"Dark Check Show",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1082,
            "name":"Domestic Show Flight",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1083,
            "name":"Dragoon",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1084,
            "name":"English Quarry",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1085,
            "name":"Exhibition Blue Bar Homer",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1086,
            "name":"Fancy",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1087,
            "name":"Feral",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1088,
            "name":"Flying Baldhead Kite",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1089,
            "name":"French Mondain",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1090,
            "name":"German Elster",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1091,
            "name":"German Long Face Tumbler",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1092,
            "name":"German Owl",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1093,
            "name":"Jacobin",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1094,
            "name":"Kalot",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1095,
            "name":"Magpie",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1096,
            "name":"Modena",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1097,
            "name":"Moscow Monk",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1098,
            "name":"Opal French Mondain",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1099,
            "name":"Portuguese Tumbler",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1100,
            "name":"Red Carneau",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1101,
            "name":"Roller (Birmingham)",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1102,
            "name":"Runt",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1103,
            "name":"Tape Turman",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1104,
            "name":"Tula Hot Turman",
            "animal_type":19,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1105,
            "name":"Squirrel",
            "animal_type":76,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1106,
            "name":"Guenon",
            "animal_type":76,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1107,
            "name":"Tamarin",
            "animal_type":76,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1108,
            "name":"Marmoest",
            "animal_type":76,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1109,
            "name":"Pet",
            "animal_type":76,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1110,
            "name":"American Staffordshire Terrier",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1111,
            "name":"Beagle",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1112,
            "name":"Belgian Shepherd (Malinois)",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":1114,
            "name":"Bloodhound",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1115,
            "name":"Collie (Rough)",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1116,
            "name":"Doberman Pinscher",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1117,
            "name":"Dobermann",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1118,
            "name":"Dutch Shepherd",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1119,
            "name":"English Springer Spaniel",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1120,
            "name":"German Shepherd",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1121,
            "name":"Golden Retriever",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1122,
            "name":"Great Dane",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1123,
            "name":"Labrador Retriever",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1124,
            "name":"Pomeranian",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1125,
            "name":"Poodle (Miniature)",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1126,
            "name":"Poodle (Standard)",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1127,
            "name":"Poodle (Toy)",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1128,
            "name":"Samoyed",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1129,
            "name":"Bernese Mountain",
            "animal_type":78,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1130,
            "name":"Asian Shorthair",
            "animal_type":22,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1131,
            "name":"Budwing (Parasphendale affinis, argrionina)",
            "animal_type":44,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1132,
            "name":"Asagi",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1133,
            "name":"Bekko",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1134,
            "name":"Chagoi",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1135,
            "name":"Goshiki",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1136,
            "name":"Hajiro",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1137,
            "name":"Hariwake",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1138,
            "name":"Hi Utsuri",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1139,
            "name":"Ki Goi",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1140,
            "name":"Ki Utsuri",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1141,
            "name":"Kin Showa",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1142,
            "name":"Kohaku",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1143,
            "name":"Koromo Goromo",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1144,
            "name":"Kujaku",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1145,
            "name":"Kumonryu",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1146,
            "name":"Ochiba Shigure",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1147,
            "name":"Ogon",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1148,
            "name":"Sanke",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1149,
            "name":"Shiro Utsuri",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1150,
            "name":"Showa",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1151,
            "name":"Shusui",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1152,
            "name":"Soragoi",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1153,
            "name":"Tancho Kohaku",
            "animal_type":81,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1154,
            "name":"Goldfish",
            "animal_type":82,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         },
         {
            "id":1155,
            "name":"Peekapoo",
            "animal_type":24,
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":null
         }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
  const breedIds = [1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,101,102,103,104,105,106,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,124,125,126,127,128,129,130,131,132,135,136,137,138,139,140,141,142,143,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,184,187,188,189,190,191,192,193,194,195,196,198,204,205,206,207,208,209,210,211,212,213,214,215,216,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,274,275,276,277,279,280,281,282,283,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,312,314,315,317,318,319,320,321,322,323,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,351,352,353,354,355,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,376,377,379,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,400,401,403,404,405,406,407,408,409,410,411,413,414,416,417,418,419,420,421,422,423,424,425,427,428,429,430,431,432,433,434,436,437,438,439,440,441,442,443,444,445,446,447,448,450,452,454,455,456,457,458,459,460,462,463,464,465,466,467,468,469,470,471,473,474,479,481,482,483,484,485,486,487,488,489,490,491,492,493,495,496,497,498,499,500,501,503,504,505,506,507,508,510,511,512,513,514,515,516,518,519,521,522,523,524,525,526,527,528,529,531,532,533,535,536,537,538,539,540,542,543,544,546,547,548,549,550,551,554,556,557,558,559,560,561,562,563,564,565,566,567,568,569,572,574,576,577,579,580,581,582,583,584,585,586,587,589,591,592,594,595,596,597,598,599,600,601,602,604,605,607,608,609,610,611,612,613,614,615,616,618,619,620,621,622,623,624,625,626,627,628,629,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,706,707,708,709,710,711,712,713,714,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,870,871,873,874,875,876,877,878,879,880,881,882,886,887,888,889,890,891,892,893,894,895,896,897,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,999,1000,1001,1002,1003,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1028,1029,1031,1033,1034,1035,1036,1037,1039,1040,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1066,1068,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155];
      await queryInterface.bulkDelete(
        "breeds",
        {
          id: breedIds
        },
        {}
      );
  }
};