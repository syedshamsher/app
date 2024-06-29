type NativeName = {
  [key: string]: {
    official: string;
    common: string;
  };
};

type Currency = {
  name: string;
  symbol: string;
};

type Idd = {
  root: string;
  suffixes: string[];
};

type Translation = {
  official: string;
  common: string;
};

type Demonyms = {
  f: string;
  m: string;
};

type MapLinks = {
  googleMaps: string;
  openStreetMaps: string;
};

type FlagLinks = {
  png: string;
  svg: string;
};

type CapitalInfo = {
  latlng: number[];
};

type PostalCode = {
  format: string;
  regex: string;
};

type Country = {
  name: {
    common: string;
    official: string;
    nativeName: NativeName;
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: Currency;
  };
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  translations: {
    [key: string]: Translation;
  };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: {
    eng: Demonyms;
  };
  flag: string;
  maps: MapLinks;
  population: number;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: FlagLinks;
  coatOfArms: Record<string, unknown>;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
};

export { Country };
