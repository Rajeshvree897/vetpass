'use strict';

const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "age_drop_downs",
      [
        {
           "id":1,
           "age":"All ages",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":2,
           "age":"Less than 1 year",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":3,
           "age":"1",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":4,
           "age":"2",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":5,
           "age":"3",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":6,
           "age":"4",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":7,
           "age":"5",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":8,
           "age":"6",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":9,
           "age":"7",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":10,
           "age":"8",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":11,
           "age":"9",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":12,
           "age":"10",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":13,
           "age":"11",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":14,
           "age":"12",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":15,
           "age":"13",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":16,
           "age":"14",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":17,
           "age":"15",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":18,
           "age":"16",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":19,
           "age":"17",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":20,
           "age":"18",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":21,
           "age":"19",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":22,
           "age":"20",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":23,
           "age":"21",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":24,
           "age":"22",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":25,
           "age":"23",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":26,
           "age":"24",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":27,
           "age":"25",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":28,
           "age":"26",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":29,
           "age":"27",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":30,
           "age":"28",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":31,
           "age":"29",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":32,
           "age":"30",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":33,
           "age":"31",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":34,
           "age":"32",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":35,
           "age":"33",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":36,
           "age":"34",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":37,
           "age":"35",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":38,
           "age":"36",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":39,
           "age":"37",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":40,
           "age":"38",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":41,
           "age":"39",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":42,
           "age":"40",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":43,
           "age":"41",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":44,
           "age":"42",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":45,
           "age":"43",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":46,
           "age":"44",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":47,
           "age":"45",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":48,
           "age":"46",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":49,
           "age":"47",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":50,
           "age":"48",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":51,
           "age":"49",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        },
        {
           "id":52,
           "age":"50 and above",
           "created_at":new Date(),
           "updated_at":new Date(),
           "created_by":null,
           "updated_by":null
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
  const ageIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
    await queryInterface.bulkDelete(
      "age_drop_downs",
      {
        id: ageIds
      },
      {}
    );
  }
};
