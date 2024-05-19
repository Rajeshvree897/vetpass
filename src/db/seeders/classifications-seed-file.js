'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "classifications",
      [
         {
            "id":1,
            "title":"Alternative Health",
            "description":"Alternative veterinary medicine including homeopathy, acupuncture, integrative nutrition, botanical medicine, chiropractic, massage therapy, and nutraceuticals. May be offered as a separate service or in conjunction with a more common methods of diagnosis and treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":2,
            "title":"Amphibian & Reptile (Specialists)",
            "description":"Practice with a recognized qualification in the breeding and care of alternative health.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":3,
            "title":"Amphibian (Specialists)",
            "description":"Practice with a recognized qualification in the breeding and care of amphibian & reptile (specialists).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":4,
            "title":"Amphibians",
            "description":"Practice with an interest or specialization in the breeding and care of amphibians.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":5,
            "title":"Amphibians & Reptiles",
            "description":"Practice with an interest or specialization in the breeding and care of amphibians & reptiles.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":6,
            "title":"Animal & Pet Nutrition",
            "description":"Practice and/or associated professionals with an interest or focus in animal and pet nutrition which may include healthy weight, weight loss and maximization programs and non-medicinal treatments for ailments, animal care and disease.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":7,
            "title":"Animal Breeding",
            "description":"Practice, organization, breeder or individual with an interest or focus, or actively involved in breeding services including artificial insemination for a variety of large and small animals, advanced assisted reproductive techniques, breeding soundness evaluations, obstetrics, management of diseases or complications of the postpartum period, and medical or surgical management of diseases of the reproductive tracts.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":8,
            "title":"Animal Training",
            "description":"Practice and/or associated professionals with an interest or focus in the training of animals as companions, or for agility and obedience or competition. This does not include training for behavioral, service or therapy.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":9,
            "title":"Artificial Intelligence",
            "description":"Organization, businesses, academics, researchers and veterinarians with an interest or focus in the applications of artificial intelligence to improve the lives of animals. This may overlap with remote monitoring.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":10,
            "title":"Beef Cattle",
            "description":"Practice and/or associated professionals with a specialization or interest in cattle raised for meat.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":11,
            "title":"Beef Cattle (Specialists)",
            "description":"Practice with a recognized specialization in the care of cattle raised for meat.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":12,
            "title":"Birds (Avian)",
            "description":"Practice with an interest or specialization in the care of birds which may include individual species or specific breeds among the 18,000 different species of birds (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":13,
            "title":"Birds (Avian) - Hunting (Hawks, Falcons )",
            "description":"Practice with an interest or specialization in the care of birds which may include individual species or specific breeds among the 18,000 different species of birds (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":14,
            "title":"Birds (Avian) - Racing & Homing Pigeons",
            "description":"Practice with an interest or specialization in the care of racing & homing pigeons.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":15,
            "title":"Birds (Avian) Specialists",
            "description":"Practice with a recognized specialization in the care of birds which may include individual species or specific breeds among the 18,000 different species of birds (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":16,
            "title":"Blood or Sperm Bank",
            "description":"Organizations and businesses holding animal blood or sperm samples for the purposes of breeding, teaching or research (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":17,
            "title":"Breeding (Cats)",
            "description":"Practice, organization, breeder or individual with an interest or focus, or actively involved in the breeding of Cats.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":18,
            "title":"Breeding (Dogs)",
            "description":"Practice, organization, breeder or individual with an interest or focus, or actively involved in the breeding of Dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":19,
            "title":"Breeding (Horse)",
            "description":"Practice, organization, breeder or individual with an interest or focus, or actively involved in the breeding of Horses.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":20,
            "title":"Cancer Treatment",
            "description":"Practice with an interest or specialization in the treatment of cancer.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":21,
            "title":"Canine/Feline",
            "description":"Practice with an interest or specialization in the care of Dogs and Cats which may include specific breeds.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":22,
            "title":"Canine/Feline (Specialists)",
            "description":"Practice with a recognized specialization in the care of our wonderful Dogs and Cats which may include specific breeds.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":23,
            "title":"Cat (Specialists)",
            "description":"Practice with a recognized specialization in the care of our wonderful Cats which may include specific breeds.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":24,
            "title":"Cat Visiting",
            "description":"Your cat cared for in your own home by an experienced cat visitor.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":25,
            "title":"Cats",
            "description":"Practice with an interest or specialization in the care of our Cats which may include individual species or specific breeds.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":26,
            "title":"Charity",
            "description":"Provider is a registered charity.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":27,
            "title":"Charity - Animals Australia",
            "description":"Recognized Australian animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":28,
            "title":"Charity - ASPCA",
            "description":"Recognized North American animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":29,
            "title":"Charity - Best Friends Animal Society",
            "description":"Recognized North American animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":30,
            "title":"Charity - Farm Sanctuary",
            "description":"Recognized North American animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":31,
            "title":"Charity - Friends of Animals",
            "description":"Recognized North American animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":32,
            "title":"Charity - Humane Canada",
            "description":"Recognized Canadian animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":33,
            "title":"Charity - Irish Blue Cross",
            "description":"Recognized Irish animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":34,
            "title":"Charity - ISPCA Ireland",
            "description":"Recognized Irish animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":35,
            "title":"Charity - Middle East Animal Foundation (MEAF)",
            "description":"Recognized leading Middle Eastern animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":36,
            "title":"Charity - Neutering and/or Spaying Centre",
            "description":"Charity which provides neutering and/or spaying services. May include not for profit organizations.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":37,
            "title":"Charity - NSPCA South Africa",
            "description":"Recognized South African animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":38,
            "title":"Charity - PDSA UK",
            "description":"Recognized UK animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":39,
            "title":"Charity - RSPCA Australia",
            "description":"Recognized Australian animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":40,
            "title":"Charity - RSPCA UK",
            "description":"Recognized UK animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":41,
            "title":"Charity - SPCA New Zealand",
            "description":"Recognized New Zealand animal charity which provides veterinary services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":42,
            "title":"Chauffeur (Pets)",
            "description":"Pet taxi service.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":43,
            "title":"Chipping & Registration",
            "description":"Animal chipping & registration services. May be provided by providers other than veterinarians.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":44,
            "title":"Chipping & Registration (Mobile)",
            "description":"Mobile animal chipping & registration services. May be provided by providers other than veterinarians.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":45,
            "title":"Companion Animals",
            "description":"Most common general veterinary practice classification covering Amphibians, Birds, Cats, Dogs, Insects and Arachnids, Reptiles and Small Mammals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":46,
            "title":"Companion Animals (Cats and Dogs)",
            "description":"Most common general veterinary practice classification covering Cats and Dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":47,
            "title":"Companion Animals (Cats, Dogs and Small Animals)",
            "description":"Most common general veterinary practice classification covering Amphibians, Birds, Cats, Dogs, Insects and Arachnids, Reptiles and Small Mammals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":48,
            "title":"Competition, Show & Entertainment",
            "description":"Practice and/or associated professionals who provide care, clinical and advisory services to organizations, owners and pets in competition, shows, and the entertainment industry. Services may include assessment, examination, training, supervision and care. ",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":49,
            "title":"Continuing Professional Development/Education (CPD,CEE)",
            "description":"Organizations, businesses and institutions involved in the continuing career development, education and examination of veterinarians.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":50,
            "title":"Dairy",
            "description":"Practice and/or associated professionals with a specialization or interest in the dairy industry (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":51,
            "title":"Dairy (Specialists)",
            "description":"Practice with a recognized specialization in all aspects of animals in the dairy industry.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":52,
            "title":"Daycare (Dogs)",
            "description":"Dog care services. May also provide dog walking services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":53,
            "title":"Daycare (Pets)",
            "description":"Pet care services. May also provide walking services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":54,
            "title":"Daycare at Home (Dogs)",
            "description":"Dog care services in your home.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":55,
            "title":"Dentistry",
            "description":"Practice and/or associated professionals with a specialization or interest in animal or pet dentistry (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":56,
            "title":"Dentistry (Specialists)",
            "description":"Practice with a recognized specialization in animal or pet dentistry (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":57,
            "title":"Diagnostics",
            "description":"Laboratories and Practices providing diagnostic services which may include blood tests, ultrasound, MRIs and endoscopic testing.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":58,
            "title":"Diagnostics - DNA",
            "description":"DNA testing services for Cats, Dogs, or Horses which includes a selection of disease tests, DNA profiling and parentage verification.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":59,
            "title":"Diagnostics - Doppler (Ultrasonic Blood Pressure)",
            "description":"Laboratories and Practices providing blood pressure measurement.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":60,
            "title":"Diagnostics - Endoscopy",
            "description":"Laboratories and Practices providing endoscopic services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":61,
            "title":"Diagnostics - Ultrasound",
            "description":"Laboratories and Practices providing ultrasound services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":62,
            "title":"Diagnostics - Ultrasound & Endoscopy",
            "description":"Laboratories and Practices providing ultrasound and endoscope services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":63,
            "title":"Dog (Specialists)",
            "description":"Practice with a recognized specialization in the care of our wonderful Dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":64,
            "title":"Dogs",
            "description":"Practice with an interest or specialization in the care of our Dogs which may include individual species or specific breeds.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":65,
            "title":"End of Life Care",
            "description":"Pet hospice care, also known as palliative care for animals suffering from a terminal illness when a cure is not possible. Will also include peaceful euthanasia options.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":66,
            "title":"End of Life Care & Removal",
            "description":"Compassionate, gentle and respectful \"At Home End of Life Care” with removal of animals suffering from a terminal illness when a cure is not possible.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":67,
            "title":"End of Life Care & Removal (Large Animals)",
            "description":"Compassionate, gentle and respectful \"At Home End of Life Care” with removal of large animals suffering from a terminal illness when a cure is not possible.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":68,
            "title":"End of Life Care & Removal (Small Animals)",
            "description":"Compassionate, gentle and respectful \"At Home End of Life Care” with removal of small animals suffering from a terminal illness when a cure is not possible.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":69,
            "title":"End of Life Care (Large Animals)",
            "description":"Pet hospice care, also known as palliative care for animals suffering from a terminal illness when a cure is not possible. Will also include peaceful euthanasia options.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":70,
            "title":"End of Life Care (Mobile)",
            "description":"Compassionate, gentle and respectful \"At Home Euthanasia” for animals suffering from a terminal illness when a cure is not possible.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":71,
            "title":"End of Life Care (Mobile) (Large Animals)",
            "description":"Compassionate, gentle and respectful end of life options for large animals suffering from a terminal illness when a cure is not possible.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":72,
            "title":"End of Life Care (Mobile) (Small Animals)",
            "description":"Compassionate, gentle and respectful \"At Home Euthanasia” for small animals suffering from a terminal illness when a cure is not possible.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":73,
            "title":"End of Life Care (Small Animals)",
            "description":"Pet hospice care, also known as palliative care for animals suffering from a terminal illness when a cure is not possible. Will also include peaceful euthanasia options.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":74,
            "title":"Equine",
            "description":"Practice with an interest or specialization in the care of Horses which may include individual breeds.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":75,
            "title":"Equine (Specialists)",
            "description":"Practice with a recognized specialization in the care of Horses.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":76,
            "title":"Exotic Companion Mammal (Specialists)",
            "description":"Practice with a recognized specialization in the care of \"Exotic\" pet mammals defined as relatively rare or unusual to keep, for example rats, chinchillas, and sugar gliders.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":77,
            "title":"Exotic Companion Mammals",
            "description":"Practice with an interest or specialization in the care of \"Exotic\" pet mammals defined as relatively rare or unusual to keep, for example rats, chinchillas, or sugar gliders.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":78,
            "title":"Exotics",
            "description":"Practice with an interest or specialization in the care of \"Exotic\" animals defined as relatively rare or unusual to keep, for example rats, chinchillas, sugar gliders, Amphibians, Birds, Insects and Arachnids, and Reptiles).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":79,
            "title":"Exotics (Specialists)",
            "description":"Practice with a recognized specialization in the care of \"Exotic\" animals defined as relatively rare or unusual to keep, for example rats, chinchillas, sugar gliders, Amphibians, Birds, Insects and Arachnids, and Reptiles).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":80,
            "title":"Fertility",
            "description":"Practice, organization, breeders and individuals with an interest or focus, or actively involved in breeding services including artificial insemination, advanced assisted reproductive techniques, breeding soundness evaluations of male and female, obstetrics, management of diseases or complications of the postpartum period, and medical or surgical management of diseases of the reproductive tracts.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":81,
            "title":"Fish Professionals (non-veterinary)",
            "description":"Professional non-veterinarian organizations and business with a focus in the care of Fish.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":82,
            "title":"Food Animal",
            "description":"Practice, business, organization, researchers and academics with an interest or specialization in the breeding and care of animals in the food chain.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":83,
            "title":"Food Animal (Specialists)",
            "description":"Practice, business, organization, researchers and academics with a recognized qualification in the breeding and care of animals in the food chain.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":84,
            "title":"Grooming",
            "description":"Animal grooming services. May include cleaning of teeth.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":85,
            "title":"Grooming (Mobile)",
            "description":"Mobile animal grooming services. May include cleaning of teeth.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":86,
            "title":"Holistic Health",
            "description":"Practice, business, organization, or veterinarians who take a whole animal, as in the mind, body, and spirit approach to animal care. This may be a more “natural” and “common sense” approach to your pet's health care. Holistic health may be offered as a separate service or in conjunction with a symptom-based approach to diagnosis and treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":87,
            "title":"Holistic Health (Specialists)",
            "description":"Veterinarians who have achieved a recognised qualification through further study in holistic animal health care. Holistic Health includes practices, businesses, organizations, veterinarians who take a whole animal, as in the mind, body, and spirit approach to animal care. This may be a more “natural” and “common sense” approach to your pet's health care. Holistic health may be offered as a separate service or in conjunction with a symptom-based approach to diagnosis and treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":88,
            "title":"Home Boarding (Dogs)",
            "description":"Your dog placed in a warm, loving family setting and not a kennel with a carer on a bespoke basis.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":89,
            "title":"Home Boarding (Overnight)",
            "description":"Your pet placed in a warm, loving family setting with a carer on a bespoke basis in their home overnight or longer periods.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":90,
            "title":"Home Boarding (Pets)",
            "description":"Your pet placed in a warm, loving family setting with a carer on a bespoke basis in their home.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":91,
            "title":"Horse - Farrier",
            "description":"Farrier services connected with, or close to a veterinary practice.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":92,
            "title":"Horse - Livery",
            "description":"Horse livery services connected with, or close to veterinary practice.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":93,
            "title":"Horse - Riding School",
            "description":"Riding school connected with, or close to veterinary practice.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":94,
            "title":"Horse - Stables & Training",
            "description":"Stables & training facilities connected with, or close to veterinary practice.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":95,
            "title":"Horse (Specialist)",
            "description":"Practice with a recognized qualification in the care of Horses.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":96,
            "title":"Horseboxes",
            "description":"Horsebox services for rent or full service provision.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":97,
            "title":"Horses",
            "description":"Practice with an interest or specialization in the care of Horses.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":98,
            "title":"Hospital",
            "description":"Full service hospital for large and small animals including diagnosis and surgical treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":99,
            "title":"Hospital & School",
            "description":"Full service hospital for large and small animals including diagnosis and surgical treatment and the education and training of veterinarians.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":100,
            "title":"Hospital (Horse and Large Animal)",
            "description":"Full service hospital for Horses and large animals including diagnosis and surgical treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":101,
            "title":"Hospital (Horse)",
            "description":"Full service hospital for Horses including diagnosis and surgical treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":102,
            "title":"Hospital (Large Animal)",
            "description":"Full service hospital for large animals including diagnosis and surgical treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":103,
            "title":"Hospital (Small Animal)",
            "description":"Full service hospital for small animals including diagnosis and surgical treatment.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":104,
            "title":"Hotel and Holiday (Boarding) Cats",
            "description":"Temporary home for Cats. May also undertake breeding.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":105,
            "title":"Hotel and Holiday (Boarding) Dogs",
            "description":"Temporary home for Dogs. May also undertake breeding.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":106,
            "title":"Hotel and Holiday (Boarding) Pets",
            "description":"Temporary home for pets.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":107,
            "title":"Hotel and Holiday (Overnight Boarding) Pets",
            "description":"Temporary home for pets with overnight services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":108,
            "title":"Laboratory",
            "description":"Laboratory veterinarians (Research, Diagnosis & Testing).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":109,
            "title":"Large Animal (Specialists)",
            "description":"Practice with a recognized specialization in large animals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":110,
            "title":"Large Animal, Livestock & Food Production",
            "description":"Practice with an interest or specialization in the care of large animal, livestock & food production.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":111,
            "title":"Large Animal, Livestock & Food Production (Specialists)",
            "description":"Practice with a recognized qualification in the breeding and care of large animal, livestock & food production.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":112,
            "title":"Large Animals",
            "description":"Practice with an interest or specialization in the are of large animals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":113,
            "title":"Mammal (Specialists)",
            "description":"Practice with a recognized qualification in the care of mammals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":114,
            "title":"Mammals",
            "description":"Practice with an interest or specialization in the breeding and care of mammals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":115,
            "title":"Medical Cannabis",
            "description":"Practice with an interest or specialization in the breeding and care of medical cannabis.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":116,
            "title":"Mixed (Large & Small Animals)",
            "description":"Practice with an interest or specialization in the care of large & small animals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":117,
            "title":"Mixed (Large & Small Animals) (Specialists)",
            "description":"Practice serving large & small animals with a recognized specializations in both large and small animals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":118,
            "title":"Mixed Large & Small Animal (Specialists)",
            "description":"Practice serving large & small animals with a recognized specialization in small animals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":119,
            "title":"Mixed Small & Large Animal (Specialists)",
            "description":"Practice serving small & large animals with a recognized specialization in large animals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":120,
            "title":"Neutering and/or Spaying",
            "description":"Veterinary facilities that focus on neutering and spaying in a surgical clinic.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":121,
            "title":"Neutering and/or Spaying (Mobile)",
            "description":"Mobile veterinary spay and neuter surgical clinic that operates out of a fully functional, state-of-the-art surgical room on wheels.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":122,
            "title":"Nutrition",
            "description":"Practice with an interest or specialization in the breeding and care of nutrition.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":123,
            "title":"Nutrition (Specialists)",
            "description":"Practice with a recognized qualification in the breeding and care of nutrition.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":124,
            "title":"Online Reviews",
            "description":"Online and diagnosis review services for examples of X-rays and cardiograms (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":125,
            "title":"Osteopath",
            "description":"Most commonly treating Horses, Cats and Dogs to aid or improve the animals' function by relieving pain, preventing injury and maximizing movement and performance. May be offered as a separate service or in conjunction with other veterinary care.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":126,
            "title":"Other",
            "description":"Other care not classified (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":127,
            "title":"Pet Store",
            "description":"Pet Store may contain veterinary practice facilities, be associated with or close by.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":128,
            "title":"Pet Store & Online",
            "description":"Pet store may house the actual veterinary practice facilities, be associated with or close by. Practice or pet store website also offers an online store.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":129,
            "title":"Pet Store Online",
            "description":"Practice website also offers an online store for your pet or animal.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":130,
            "title":"Pharmacy",
            "description":"Practice has a dispensing facility in-clinic for prescription and over-the-counter (OTC) medical items.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":131,
            "title":"Pharmacy in-Clinic & Online",
            "description":"Practice has a dispensing facility in-clinic for prescriptions and over-the-counter (OTC) items. Practice website also offers an online pharmacy for example for repeat prescriptions.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":132,
            "title":"Pharmacy Online",
            "description":"Practice website offers an online pharmacy for example for repeat prescriptions.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":133,
            "title":"Physiotherapy",
            "description":"Animal physiotherapists commonly treating Cats, Dogs and Horses to aid or improve the animals' function by relieving pain, preventing injury and maximizing movement and performance. May be offered as a separate service or in conjunction with other veterinary care.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":134,
            "title":"Professionals (not involved in front line animal care)",
            "description":"Organizations, businesses and individuals supporting or serving the veterinary profession.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":135,
            "title":"RCVS Accreditation: Equine, Core Standards",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Equine, Core Standards\" is the first level of Accreditation. Out-of-hours may be provided by an \"Emergency Services Clinic\". It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":136,
            "title":"RCVS Accreditation: Equine, Emergency Services Clinic",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Equine, Emergency Services Clinic\" can deal with emergency cases in the field, and provides out-of-hours services. It has met the \"Core\" or higher \"General Practice\" requirements of veterinary service and the \"ESC Emergency (Ambulatory)\" module. It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":137,
            "title":"RCVS Accreditation: Equine, General (Ambulatory)",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Equine, General (Ambulatory)\" has met the \"Core\" and higher \"General Practice\" Standards for equine medicine albeit they do not have stabling facilities or premises where horses are treated. Out-of-hours may be provided by an \"Emergency Services Clinic\". It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":138,
            "title":"RCVS Accreditation: Equine, General Practice",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Equine, General Practice\" is the higher level of Accreditation. Out-of-hours may be provided by an \"Emergency Services Clinic\". It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":139,
            "title":"RCVS Accreditation: Equine, Veterinary Hospital",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Equine, Veterinary Hospital\" has met the \"Core\" and higher, \"General Practice\" Standards and the additional requirements of facilities and protocols for the investigation and treatment of more complex issues. It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":140,
            "title":"RCVS Accreditation: Farm Animal, Core Standards",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Farm Animal, Core Standards\" is the first level of Accreditation. Out-of-hours may be provided by an \"Emergency Services Clinic\". It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":141,
            "title":"RCVS Accreditation: Farm Animal, General Practice ",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Farm Animal, General Practice\" is the higher level of Accreditation. Out-of-hours may be provided by an \"Emergency Services Clinic\". It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":142,
            "title":"RCVS Accreditation: Small Animal, Core Standards",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Small Animal, Core Standards\" is the first level of Accreditation. Out-of-hours may be provided by an \"Emergency Services Clinic\". It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":143,
            "title":"RCVS Accreditation: Small Animal, Emergency Services Clinic",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Small Animal, Emergency Services Clinic\" can deal with emergency and critical care cases without an appointment. Out-of-hours may be provided by an \"Emergency Services Clinic\". The practice has met the \"Core\" and higher \"General Practice\" requirements and the \"ESC Emergency and Critical Care\" module. It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":144,
            "title":"RCVS Accreditation: Small Animal, General Practice",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Small Animal, General Practice\" is the higher level of Accreditation. Out-of-hours may be provided by an \"Emergency Services Clinic\". It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":145,
            "title":"RCVS Accreditation: Small Animal, Veterinary Hospital",
            "description":"The Royal College of Veterinary Science Practice Standards Scheme (PSS) is a voluntary quality assurance system to promote the highest standards of veterinary care. \"Small Animal, Veterinary Hospital\" has met the \"Core\" and higher \"General Practice\" Standards and the additional requirements of facilities and protocols for the investigation and treatment of more complex issues. It is a requirement that UK veterinary surgeons practice to at least the Core Standards. Accredited Practices volunteer for spot-checks and a four-yearly rigorous assessment to meet a range of minimum standards including hygiene, 24-hour emergency cover, staff training, certain types of equipment and cost estimation procedures. Above the accreditation the RCVS also makes awards (\"Good\" or \"Outstanding\") which require everyone in the clinical team to be working and thinking to the highest possible standards, and for a hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and also interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":146,
            "title":"RCVS Award: Equine, Ambulatory Service (G)",
            "description":"Good, Equine, Ambulatory Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":147,
            "title":"RCVS Award: Equine, Ambulatory Service (O)",
            "description":"Outstanding, Equine, Ambulatory Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":148,
            "title":"RCVS Award: Equine, Client Service (G)",
            "description":"Good, Equine, Client Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":149,
            "title":"RCVS Award: Equine, Client Service (O)",
            "description":"Outstanding, Equine, Client Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":150,
            "title":"RCVS Award: Equine, Diagnostic Service (G)",
            "description":"Good, Equine, Diagnostic Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":151,
            "title":"RCVS Award: Equine, Diagnostic Service (O)",
            "description":"Outstanding, Equine, Diagnostic Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":152,
            "title":"RCVS Award: Equine, In-Patient Service (G)",
            "description":"Good, Equine, In-Patient Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":153,
            "title":"RCVS Award: Equine, In-Patient Service (O)",
            "description":"Outstanding, Equine, In-Patient Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":154,
            "title":"RCVS Award: Equine, Team & Professional Responsibility (G)",
            "description":"Good, Equine, Team & Professional Responsibility. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":155,
            "title":"RCVS Award: Equine, Team & Professional Responsibility (O)",
            "description":"Outstanding, Equine, Team & Professional Responsibility. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":156,
            "title":"RCVS Award: Farm Animal, Client Service (G)",
            "description":"Good, Farm Animal, Client Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":157,
            "title":"RCVS Award: Farm Animal, Client Service (O)",
            "description":"Outstanding, Farm Animal, Client Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":158,
            "title":"RCVS Award: Farm Animal, Diagnostic Service (G)",
            "description":"Good, Farm Animal, Diagnostic Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":159,
            "title":"RCVS Award: Farm Animal, Diagnostic Service (O)",
            "description":"Outstanding, Farm Animal, Diagnostic Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":160,
            "title":"RCVS Award: Farm Animal, Team & Professional Responsibility (G)",
            "description":"Good, Farm Animal, Team & Professional Responsibility. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":161,
            "title":"RCVS Award: Farm Animal, Team & Professional Responsibility (O)",
            "description":"Outstanding, Farm Animal, Team & Professional Responsibility. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":162,
            "title":"RCVS Award: Small Animal, Client Service (G)",
            "description":"Good, Small Animal, Client Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":163,
            "title":"RCVS Award: Small Animal, Client Service (O)",
            "description":"Outstanding, Small Animal, Client Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":164,
            "title":"RCVS Award: Small Animal, Diagnostic Service (G)",
            "description":"Good, Small Animal, Diagnostic Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":165,
            "title":"RCVS Award: Small Animal, Diagnostic Service (O)",
            "description":"Outstanding, Small Animal, Diagnostic Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":166,
            "title":"RCVS Award: Small Animal, Emergency & Critical Care (G)",
            "description":"Good, Small Animal, Emergency & Critical Care. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":167,
            "title":"RCVS Award: Small Animal, Emergency & Critical Care Service (O)",
            "description":"Outstanding, Small Animal, Emergency & Critical Care Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":168,
            "title":"RCVS Award: Small Animal, In-patient Service (G)",
            "description":"Good, Small Animal, In-patient Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":169,
            "title":"RCVS Award: Small Animal, In-patient Service (No Dentistry) (G)",
            "description":"Good, Small Animal, In-patient Service (No Dentistry). The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":170,
            "title":"RCVS Award: Small Animal, In-patient Service (No Dentistry) (O)",
            "description":"Outstanding, Small Animal, In-patient Service (No Dentistry). The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":171,
            "title":"RCVS Award: Small Animal, In-patient Service (O)",
            "description":"Outstanding, Small Animal, In-patient Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":172,
            "title":"RCVS Award: Small Animal, Patient Consultation Service (G)",
            "description":"Good, Small Animal, Patient Consultation Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":173,
            "title":"RCVS Award: Small Animal, Patient Consultation Service (O)",
            "description":"Outstanding, Small Animal, Patient Consultation Service. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":174,
            "title":"RCVS Award: Small Animal, Team & Professional Responsibility (G)",
            "description":"Good, Small Animal, Team & Professional Responsibility. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":175,
            "title":"RCVS Award: Small Animal, Team & Professional Responsibility (O)",
            "description":"Outstanding, Small Animal, Team & Professional Responsibility. The Royal College of Veterinary Science Award of \"Good\" or \"Outstanding\" is part of the voluntary Practice Standards Scheme of quality assurance and Accreditation to promote the highest standards of veterinary care. It requires everyone in the clinical team to be working and thinking to the highest possible standards, and for the hospital or practice to have a strong culture of continuous improvement. Assessment is based on a review of processes and documentation and interviews with team members.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":176,
            "title":"Referrals (from Owners & Vets)",
            "description":"If you are an Owner, your primary care or general practitioner veterinarian will recommend whether they think a referral to a specialist is necessary. They’ll either make a referral on your behalf, providing all of your pet’s medical information, or give you what you need for the referral. All of the information required should be or can be stored in the App, making this painful process a lot easier and enabling you to find specialists all around the world. Many presenting conditions will require your wonderful pet to visit the specialist in person. Vet Client Patient Relationships (VCPRs)(see our FAQs) are very important in the diagnosis and treatment of our wonderful animals and pets.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":177,
            "title":"Referrals (only from Vets)",
            "description":"If you are an Owner, you can ask your primary care or general practitioner veterinarian to make a referral to this specialist practice. They can make a referral providing all of your pet’s medical information, or give you what you need t progress the referral. All of the information required should be or can be stored in the App, making this process a lot easier and enabling you to find specialists all around the world. Many presenting conditions will require your wonderful pet to visit the specialist in person. Vet Client Patient Relationships (see our FAQs) are very important in the diagnosis and treatment of our wonderful animals and pets. If you are a vet you can make a referral in the (blue) veterinary app.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":178,
            "title":"Remote Monitoring",
            "description":"Practice, organization, business, or academics, researchers and veterinarians with an interest or focus in the remote monitoring of animals. This may be to improve the lives of animals through monitoring of activity, health and conditions. This may overlap with Artificial Intelligence.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":179,
            "title":"Reproduction (Breeding, Insemination, Fertility & Storage)",
            "description":"Practice, business or laboratory offering breeding, insemination, reproduction and storage services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":180,
            "title":"Reptile (Specialists)",
            "description":"Practice with a recognized qualification in the breeding and care of reproduction (breeding, insemination, fertility & storage).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":181,
            "title":"Reptiles",
            "description":"Practice with an interest or specialization in the breeding and care of reptiles.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":182,
            "title":"Rescue",
            "description":"Practice, organization, or individuals that \"rescue\" abused, unwanted, lost, found, offered for adoption, homeless, or deemed unsuitable for adoption.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":183,
            "title":"School - Teaching & Research",
            "description":"Veterinary school involved the teaching and qualification of veterinarians (vets and technicians/nurses) in-school and/or online. School may also be active in research.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":184,
            "title":"School - Teaching & Research (Technicians & Nurses)",
            "description":"Veterinary school involved the teaching and qualification of veterinary technicians and nurses in-school and/or online. School may also be active in research.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":185,
            "title":"School - Teaching & Research (Veterinarians)",
            "description":"Veterinary school involved in the teaching and qualification of veterinary surgeons. School may also be active in research.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":186,
            "title":"Second Opinions",
            "description":"Practice may provide a range of services at all or different levels including, 1. Answer any question that you have on your pet’s case. 2. Review all your animal veterinary information including your pet’s records. Contact your regular veterinarian and request a copy of your pet’s records. 3. Give you a \"Second\" opinion regarding your pet’s diagnosis, tests results, treatment options and general prognosis. VETPASS may also be able through its Forums or Chat to answer simple questions of interpretation and terminology, or understanding a diagnosis and care plans.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":187,
            "title":"Service Dogs",
            "description":"Practice with an interest or specialization in the training of Service Dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":188,
            "title":"Service Dogs - Allergy",
            "description":"Practice with an interest or specialization in the training of allergy dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":189,
            "title":"Service Dogs - Autism Service",
            "description":"Practice with an interest or specialization in the training of autism service dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":190,
            "title":"Service Dogs - Diabetic Alert",
            "description":"Practice with an interest or specialization in the training of diabetic alert dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":191,
            "title":"Service Dogs - Guide Dogs",
            "description":"Practice with an interest or specialization in the training of guide dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":192,
            "title":"Service Dogs - Hearing",
            "description":"Practice with an interest or specialization in the training of hearing dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":193,
            "title":"Service Dogs - Mobility Assistance",
            "description":"Practice with an interest or specialization in the training of mobility assistance dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":194,
            "title":"Service Dogs - Psychiatric",
            "description":"Practice with an interest or specialization in the training of psychiatric dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":195,
            "title":"Service Dogs - Seizure Alert & Response",
            "description":"Practice with an interest or specialization in the training of seizure alert & response dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":196,
            "title":"Service Dogs - Therapy",
            "description":"Practice with an interest or specialization in the training of therapy dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":197,
            "title":"Shelter",
            "description":"Practice, organization, or individuals that provide a temporary, \"Shelter\", for animals found, offered for adoption, homeless, or deemed unsuitable for adoption.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":198,
            "title":"Shelter (Animals)",
            "description":"Practice, organization, or individuals that provide temporary, \"Shelter\" including homes for dogs, cats, and other animals that are found, offered for adoption, homeless, or deemed unsuitable for adoption.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":199,
            "title":"Shelter (Avian)",
            "description":"Practice, organization, or individuals that provide a \"Shelter\" for Birds.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":200,
            "title":"Shelter (Cats)",
            "description":"Practice, organization, or individuals that provide a temporary shelter for Cats offered for adoption, homeless, or deemed unsuitable for adoption.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":201,
            "title":"Shelter (Dogs)",
            "description":"Practice, organization, or individuals that provide a temporary shelter for Dogs offered for adoption, homeless, or deemed unsuitable for adoption.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":202,
            "title":"Shelter (Exotics)",
            "description":"Practice, organization, or individuals that provide a temporary shelter for Exotics offered for adoption, homeless, or deemed unsuitable for adoption.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":203,
            "title":"Shelter (Small Mammals)",
            "description":"Practice, organization, or individuals that provide a temporary shelter for Small Mammals offered for adoption, homeless, or deemed unsuitable for adoption.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":204,
            "title":"Specialists",
            "description":"Practice with one or more recognized qualifications.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":205,
            "title":"Specialists - Advanced Imaging",
            "description":"Practice with a recognized specialization in advanced imaging including MRI and CT scanning. Common conditions treated joint and spinal problems, trauma, ear and nasal disease, oncological issues and tumors.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":206,
            "title":"Specialists - Anesthesia",
            "description":"Practice with a recognized specialization in anesthesia.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":207,
            "title":"Specialists - Animal Welfare",
            "description":"Practice with a recognized specialization in animal welfare.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":208,
            "title":"Specialists - Behavior",
            "description":"Practice with a recognized specialization in behavior.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":209,
            "title":"Specialists - Dentistry",
            "description":"Practice with a recognized specialization in dentistry.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":210,
            "title":"Specialists - Dermatology",
            "description":"Practice with a recognized specialization in dermatology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":211,
            "title":"Specialists - Emergency & Critical Care",
            "description":"Practice with a recognized specialization in emergency & critical care.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":212,
            "title":"Specialists - Internal Medicine",
            "description":"Practice with a recognized specialization in internal medicine. Practice may have facilities for ultrasonography, chemotherapy, endoscopy, digital radiography and hospitalization. Conditions treated may include gastrointestinal and pancreatic problems, the liver, respiratory system, kidneys, circulatory system and Addison's disease.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":213,
            "title":"Specialists - Laboratory Animal Medicine",
            "description":"Practice with a recognized specialization in laboratory animal medicine.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":214,
            "title":"Specialists - Microbiology",
            "description":"Practice with a recognized specialization in microbiology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":215,
            "title":"Specialists - Neurology",
            "description":"Practice with a recognized specialization in neurology. Conditions treated may include vestibular disease, epilepsy, brain tumors, canine degenerative myelopathy, steroid responsive meningitis-arteritis, intervertebral disc disease, atlantoaxial subluxation, spinal fractures, wobbler syndrome, GME, meningoencephalitis, and lumbosacral disease.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":216,
            "title":"Specialists - Nutrition",
            "description":"Practice with a recognized specialization in nutrition.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":217,
            "title":"Specialists - Ophthalmology",
            "description":"Practice with a recognized specialization in ophthalmology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":218,
            "title":"Specialists - Orthopedics",
            "description":"Practice with a recognized specialization in orthopedics. Practice may feature operating theatres, complete with CT and MRI scanning capabilities. Procedures may include total hip replacement, digital x-ray and arthroscopy technology and the treatment of bone cancer, growth deformities, spinal problems and limb sparing/salvage.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":219,
            "title":"Specialists - Pathology",
            "description":"Practice with a recognized specialization in pathology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":220,
            "title":"Specialists - Pharmacology",
            "description":"Practice with a recognized specialization in pharmacology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":221,
            "title":"Specialists - Poultry",
            "description":"Practice with a recognized specialization in poultry.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":222,
            "title":"Specialists - Preventive Medicine",
            "description":"Practice with a recognized specialization in preventive medicine.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":223,
            "title":"Specialists - Radiology",
            "description":"Practice with a recognized specialization in radiology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":224,
            "title":"Specialists - Soft Tissue Surgery",
            "description":"Practice with a recognized specialization in soft tissue surgery. Soft tissue surgery usually refers to any condition that do not involve the brain or bones/joints. It covers conditions involving most organs, including the stomach, liver and intestines, as well as those involving the muscles, skin and fat. Specialists may also treat reconstructive surgery, wound management, abdominal surgery, ear nose and throat surgery, and urinary incontinence.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":225,
            "title":"Specialists - Sports Medicine & Rehabilitation",
            "description":"Practice with a recognized specialization in sports medicine & rehabilitation.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":226,
            "title":"Specialists - Surgery",
            "description":"Practice with a recognized specialization in surgery.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":227,
            "title":"Specialists - Theriogenology",
            "description":"Practice with a recognized specialization in theriogenology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":228,
            "title":"Specialists - Toxicology",
            "description":"Practice with a recognized specialization in toxicology.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":229,
            "title":"Stables & Training",
            "description":"Practice with a recognized specialization in stables & training.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":230,
            "title":"State or Local Authority Work",
            "description":"Practice associated with or employed by local authorities or the State, for example veterinary inspectors (see \"Areas of Interest, Specializations\" for more information).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":231,
            "title":"Swine Health Management",
            "description":"Practice with an interest or specialization in the breeding and care of swine.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":232,
            "title":"Swine Health Management (Specialists)",
            "description":"Practice with a recognized qualification in the breeding and care of swine.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":233,
            "title":"Taxi (Pets)",
            "description":"Pet taxi service.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":234,
            "title":"Teaching & Research",
            "description":"Practice, organization, or individuals providing teaching & research.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":235,
            "title":"Teeth Cleaning",
            "description":"Animal teeth cleaning services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":236,
            "title":"Therapy & Animal Behavior",
            "description":"Practice, school, hospital, organization or individuals involved in, or offering therapy & animal behavior services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":237,
            "title":"Thoroughbreds",
            "description":"Practice with an interest or specialization in the treatment of thoroughbred horses.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":238,
            "title":"Training (Animals & Pets)",
            "description":"Practice, business or individuals involved in training animals and pets.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":239,
            "title":"Training (Animals)",
            "description":"Practice, business or individuals involved in training animals.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":240,
            "title":"Training (Dogs inc. Older Dogs)",
            "description":"Practice, business or individuals involved in training dogs with an interest or focus on older dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":241,
            "title":"Training (Dogs inc. Puppies)",
            "description":"Practice, business or individuals involved in training dogs with an interest or focus on puppies.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":242,
            "title":"Training (Dogs)",
            "description":"Practice, business or individuals involved in training dogs.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":243,
            "title":"Veterinary Examination Body (CE, CPD)",
            "description":"Academic body, organization, or business providing examining and accreditation services for veterinarians including continuing education (CE) and continuing professional development (CPD).",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":244,
            "title":"Veterinary School",
            "description":"Education and training of veterinarians.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":245,
            "title":"Walking (Dog) Services",
            "description":"Dog walking services. Dog sharing services. Dog care services.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":246,
            "title":"Zoological Medicine",
            "description":"Practice with an interest or specialization in zoological medicine. May be part of a zoo or similar facility.",
            "created_at":new Date(),
            "updated_at":new Date(),
            "created_by":null,
            "updated_by":null
         },
         {
            "id":247,
            "title":"Zoological Medicine (Specialists)",
            "description":"Practice with a recognized qualification in in zoological medicine. May be part of a zoo or similar facility.",
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
    const classificationIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247];
      await queryInterface.bulkDelete(
        "classifications",
        {
          id: classificationIds
        },
        {}
      );
  }
};