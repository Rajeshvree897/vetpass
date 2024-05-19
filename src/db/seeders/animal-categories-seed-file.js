'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "animal_categories",
      [
         {
            "id":1,
            "category":"Amphibian",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":2,
            "category":"Bird",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":3,
            "category":"Cat",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":4,
            "category":"Dog",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":5,
            "category":"Farm Animal",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":6,
            "category":"Fish",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":7,
            "category":"Horse",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":1
         },
         {
            "id":8,
            "category":"Insect, Arachnid",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":10,
            "category":"Reptile",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":11,
            "category":"Small Mammal",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":12,
            "category":"Visitor",
            "status":true,
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":1,
            "updated_by":1
         },
         {
            "id":14,
            "category":"Vet",
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
    const animalCategoryIds = [1,2,3,4,5,6,7,8,10,11,12,14];
      await queryInterface.bulkDelete(
        "animal_categories",
        {
          id: animalCategoryIds
        },
        {}
      );
  }
};