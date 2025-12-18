import {Models} from "appwrite"
export type CharacterSheetRow = Models.Row & {
  memberId: string;
  name: string;
  race: string;
  subRace: string;
  raceDescription: string;
  raceAbilities: string;
  raceAbilityDescription: string;
  classDescription: string;
  deity: string;
  deityImage: string;
  deityDescription: string;
  lightWeapons: boolean;
  mediumWeapons: boolean;
  heavyWeapons: boolean;
  heavyArmor: boolean;
  mediumArmor: boolean;
  lightArmor: boolean;
  lightShield: boolean;
  mediumShield: boolean;
  heavyShield: boolean;
  twoWeapon: boolean;
  rangedWeapons: number;
  whiteCloth: number;
  greenCloth: number;
  history: string;
  spellsPackets: number;
  imageUrl: string;
};
export type CharacterClassRow = Models.Row & {
  character: string;
  classes: string;
  level: number;
};
export type ClassName = "Fighter" | "Cleric" | "Ranger" | "Mage" | "Rogue" | "";

export type FormInputs = {
  class: ClassName;
  level: number;
};
export type ClassRow = Models.Row &{
  classes: string;
  description: string;
  lightWeapons: boolean;
  mediumWeapons: boolean;
  heavyWeapons: boolean;
  heavyArmor: boolean;
  mediumArmor: boolean;
  lightArmor: boolean;
  lightShield: boolean;
  mediumShield: boolean;
  heavyShield: boolean;
  twoWeapon: boolean;
  rangedWeapons: number;
  whiteCloth: number;
  greenCloth: number;
  spellsPackets: number;
};
export type DeityRow = Models.Row & {
  image: string;
  name: string;
  description: string;
};
export type ClassAbilityRow = Models.Row & {
  $id: string;
  class: string;
  level: number;
  title: string;
  scaling: number;
  description: string;
};
export type ClassAbilitiesRowList = Models.RowList<ClassAbilityRow>;
export type Race = {
  name: string;
  description: string;
  ability: string;
  ability_description: string;
};
export type RaceRow = Models.Row & {
races:string;
race_description: string;
ability: string;
ability_description: string;
ability_array: string[];
};
export type RaceRowList = Models.RowList<RaceRow>;

export type CompleteCharacterSheet ={ 
  memberId: string;
  name: string;
  race: string;
  subRace: string;
  raceDescription: string;
  raceAbilities: string;
  raceAbilityDescription: string;
  classDescription: string;
  deity: string;
  deityImage: string;
  deityDescription: string;
  lightWeapons: boolean;
  mediumWeapons: boolean;
  heavyWeapons: boolean;
  heavyArmor: boolean;
  mediumArmor: boolean;
  lightArmor: boolean;
  lightShield: boolean;
  mediumShield: boolean;
  heavyShield: boolean;
  twoWeapon: boolean;
  rangedWeapons: number;
  whiteCloth: number;
  greenCloth: number;
  history: string;
  spellsPackets: number;
  imageUrl: string;
  class?: [string, number][];
  classAbilities?: { title: string; description: string }[];
};


