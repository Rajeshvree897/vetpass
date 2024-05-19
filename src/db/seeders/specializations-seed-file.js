'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "specializations",
      [
        {
           "id":1,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Anaesthesia",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":2,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Animal Welfare Science, Ethics and Law",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":3,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Animal Welfare Science, Ethics and Law: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":4,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Behavioural Medicine",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":5,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Bovine Reproduction: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":6,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Camelid Health & Production",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":7,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cardiology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":8,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cattle Health & Production",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":9,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cattle Health & Production (Dairy)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":10,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cattle Health & Production (Mastitis)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":11,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Cattle Health and Production: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":12,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Clinical Nutrition (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":13,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Companion Animal Behaviour: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":14,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Dentistry",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":15,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Dentistry (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":16,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Dermatology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":17,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Diagnostic Imaging",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":18,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Diagnostic Imaging (Large Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":19,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Emergency and Critical Care",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":20,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Emergency and Critical Care: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":21,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Endocrinology (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":22,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Epidemiology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":23,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Equine Dentistry: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":24,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Equine Internal Medicine: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":25,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Equine Practice: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":26,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Equine Stud Medicine: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":27,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Equine Surgery - Orthopaedics: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":28,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Equine Surgery - Soft Tissue: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":29,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Exotic Animal Medicine",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":30,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Feline Medicine",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":31,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Fish Health & Production",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":32,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Fish Health and Production: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":33,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Gastroenterology (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":34,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"General Small Animal Surgery: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":35,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Internal Medicine (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":36,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Internal Medicine (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":37,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Neurology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":38,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Neurology (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":39,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Nutrition",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":40,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Oncology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":41,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Oncology (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":42,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Oncology, Surgical (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":43,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Ophthalmology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":44,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Orthopaedic Surgery (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":45,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Orthopaedic Surgery (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":46,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Orthopaedics (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":47,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Parasitology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":48,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pathology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":49,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pathology (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":50,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pathology (Farm Animals)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":51,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pathology (Microbiology)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":52,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pathology (Small Domestic Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":53,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pathology (Zoo and Wildlife)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":54,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pathology, Clinical",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":55,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pharmacology and Toxicology",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":56,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pig Medicine",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":57,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Pig Medicine: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":58,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Poultry Health and Production: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":59,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Poultry Medicine & Production",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":60,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Public Health",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":61,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Reproduction",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":62,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Reproduction (Cattle and Sheep)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":63,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Reproduction (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":64,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Reproduction (Theriogenology)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":65,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Sheep Health & Production",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":66,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Sheep Health and Production: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":67,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Cardiology: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":68,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Dentistry: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":69,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Dermatology: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":70,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Medicine",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":71,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Medicine - Feline: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":72,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Medicine: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":73,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Orthopaedics: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":74,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Practice: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":75,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Small Animal Surgery: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":76,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Soft Tissue Surgery (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":77,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Soft Tissue Surgery (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":78,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Sports Medicine (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":79,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"State Veterinary Medicine",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":80,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Surgery (Equine)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":81,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Surgery (Small Animal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":82,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Anaesthesia and Analgesia",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":83,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Anaesthesia: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":84,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Cardiology: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":85,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Dermatology: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":86,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Diagnostic Imaging (Radiation Oncology)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":87,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Diagnostic Imaging: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":88,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Ophthalmology: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":89,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Pain Management: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":90,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Pathology (Laboratory Animals)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":91,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Veterinary Public Health: AP",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":92,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Wildlife Medicine (Mammalian)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":93,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zoo & Wildlife Medicine",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":94,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zoo & Wildlife Medicine (Avian)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":95,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zoo & Wildlife Medicine (Mammalian)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":96,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zoo & Wildlife Medicine (Small Mammal)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":97,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zoo & Wildlife Medicine (Wildlife Population Health)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":98,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zoo & Wildlife Medicine (Zoo Health Management)",
           "created_by":null,
           "updated_by":null
        },
        {
           "id":99,
           "created_at":new Date(),
           "updated_at":new Date(),
           "name":"Zoological Medicine: AP",
           "created_by":null,
           "updated_by":null
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const specializationIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99];
      await queryInterface.bulkDelete(
        "specializations",
        {
          id: specializationIds
        },
        {}
      );
  }
};