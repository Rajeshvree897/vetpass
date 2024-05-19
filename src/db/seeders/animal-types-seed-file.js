'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "animal_types",
      [
         {
            "id":1,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Caecilian",
            "animal_category":1,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":2,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Frog",
            "animal_category":1,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":3,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Newt",
            "animal_category":1,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":4,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Amphibian",
            "animal_category":1,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":5,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Salamander",
            "animal_category":1,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":6,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Toad",
            "animal_category":1,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":7,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Bird",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":8,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Budgerigar",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":9,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Canary",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":10,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Cockatiel",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":11,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Cockatoo",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":12,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Dove",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":13,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Falcon",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":14,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Finch",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":15,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Hawk",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":16,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Hill Myna",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":17,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Lovebird",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":18,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Parrot",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":19,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Pigeon",
            "animal_category":2,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":20,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Domestic Cat",
            "animal_category":3,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":21,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Mixed Breed Cat",
            "animal_category":3,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":22,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Purebred Cat",
            "animal_category":3,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":24,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Designer Dog",
            "animal_category":4,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":26,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Purebred Dog",
            "animal_category":4,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":28,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Alpaca",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":30,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Cattle",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":31,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Chicken",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":32,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Goat",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":33,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Llama",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":34,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Ostrich",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":35,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Pig",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":36,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Sheep",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":37,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Turkey",
            "animal_category":5,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":38,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Fish  (Acquarium)",
            "animal_category":6,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":39,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Donkey",
            "animal_category":7,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":40,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Horse",
            "animal_category":7,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":41,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Pony",
            "animal_category":7,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":42,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Beetle",
            "animal_category":8,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":43,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Insect",
            "animal_category":8,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":44,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Praying Mantis",
            "animal_category":8,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":45,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Scorpion",
            "animal_category":8,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":46,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Spider",
            "animal_category":8,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":48,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Lizard",
            "animal_category":10,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":49,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Snake",
            "animal_category":10,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":50,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Terrapin",
            "animal_category":10,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":51,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Toad",
            "animal_category":10,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":52,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Tortoise",
            "animal_category":10,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":53,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Turtle",
            "animal_category":10,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":54,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Chinchilla",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":55,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Ferret",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":56,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Gerbil",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":57,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Guinea Pig",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":58,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Hamster",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":59,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Hedgehog",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":60,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Mouse",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":61,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Rabbit",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":62,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Rat",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":63,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Small Mammal",
            "animal_category":11,
            "status":true,
            "created_by":null,
            "updated_by":1
         },
         {
            "id":64,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Mixed Breed Dog",
            "animal_category":4,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":66,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Python",
            "animal_category":10,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":67,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Macaw",
            "animal_category":2,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":68,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Parakeet",
            "animal_category":2,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":69,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Tarantula",
            "animal_category":8,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":70,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Pet",
            "animal_category":12,
            "status":true,
            "created_by":1,
            "updated_by":null
         },
         {
            "id":71,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Wannabe",
            "animal_category":12,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":72,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Partner",
            "animal_category":12,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":73,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Media",
            "animal_category":12,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":74,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Veterinary",
            "animal_category":14,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":76,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Monkey",
            "animal_category":11,
            "status":true,
            "created_by":1,
            "updated_by":null
         },
         {
            "id":77,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Degu",
            "animal_category":11,
            "status":true,
            "created_by":1,
            "updated_by":null
         },
         {
            "id":78,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Service Dog",
            "animal_category":4,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":79,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Squirrel",
            "animal_category":11,
            "status":true,
            "created_by":1,
            "updated_by":null
         },
         {
            "id":80,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Sugar Glider",
            "animal_category":11,
            "status":true,
            "created_by":1,
            "updated_by":null
         },
         {
            "id":81,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Fish (Koi Carp)",
            "animal_category":6,
            "status":true,
            "created_by":1,
            "updated_by":1
         },
         {
            "id":82,
            "created_at":new Date(),
            "updated_at":new Date(),
            "type":"Fish (Pond)",
            "animal_category":6,
            "status":true,
            "created_by":1,
            "updated_by":null
         }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
  const animalTypeIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24,26,28,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,66,67,68,69,70,71,72,73,74,76,77,78,79,80,81,82];
      await queryInterface.bulkDelete(
        "animal_types",
        {
          id: animalTypeIds
        },
        {}
      );
  }
};