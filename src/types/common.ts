export enum Role {
  SUPER_ADMIN = 1,
  VETPASS_STAFF = 2
}

export enum SubscriptionDuration {
  Month = "Month",
  Year = "Year",
  Custom = "Custom",
}

export enum SubscriptionFor {
  "service_provider",
  "vet",
  "vet_practice",
  "third_party_company"
}

export enum SubscriptionTitle {
  "Promotion",
  "Advertisement",
  "Promotion_and_advertisement"
}

export enum CurrencyType {
  USD = "USD",
  GBP = "GBP",
  EUR = "EUR",
  AED = "AED",
  AFN = "AFN",
  ALL = "ALL",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ETB = "ETB",
  FJD = "FJD",
  FKP = "FKP",
  GEL = "GEL",
  GIP = "GIP",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  ISK = "ISK",
  JMD = "JMD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KRW = "KRW",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LBP = "LBP",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRO = "MRO",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIO = "NIO",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  PAB = "PAB",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RON = "RON",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  STD = "STD",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TOP = "TOP",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  UGX = "UGX",
  UYU = "UYU",
  UZS = "UZS",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XAF = "XAF",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
}

export enum WeightType {
  lbs = 0,
  kg = 1
}

export enum HeightType {
  cm = 0,
  inches = 1,
  hands = 2
}

export enum Gender {
  male = 0,
  female = 1,
  gender_not_known = 2,
  gender_not_applicable = 3
}

export enum SpayedNeutered {
  yes = 0,
  no = 1,
  not_applicable = 2,
  not_known = 3
}

export enum Status {
  happy = 0,
  lost = 1,
  dead = 2,
  transferred = 3,
  not_known = 4
}

export enum PostPrivacy {
  Public = 0,
  Private = 1
}

export enum PostStatus {
  Active = 1,
  Inactive = 0,
  Processing = 2
}

export enum ForumStatus {
  Active = 1,
  Inactive = 0
}

export const validImageTypes = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/octet-stream",
  "image/tiff",
  "image/bmp"
];

export const validPostFileType = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/octet-stream",
  "image/tiff",
  "image/bmp",
  'video/avi',
  'video/3gpp',
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/quicktime',
  'video/webm',
  'video/x-ms-wmv'
];

export const videoMimeTypes = [
  'video/avi',
  'video/3gpp',
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/quicktime',
  'video/webm',
  'video/x-ms-wmv'
];
