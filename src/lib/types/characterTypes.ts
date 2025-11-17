export type Character = {
  memberId: string;
  name: string;
  race: string;
  subRace: string;
  raceDescription: string;
  raceAbilities: string[];
  raceAbilityDescription: string[];
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
  rangedWeapons: boolean;
  whiteCloth: number;
  greenCloth: number;
  history: string;
  spellsPackets: number;
  imageUrl: string;
};
export type CharacterClass = {
  character: string;
  class: string;
  level: number;
};
export type ClassName = "Fighter" | "Cleric" | "Ranger" | "Mage" | "Rogue" | "";

export type FormInputs = {
  class: ClassName;
  level: number;
};
export type Class = {
  name: string;
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
  rangedWeapons: boolean;
  whiteCloth: number;
  greenCloth: number;
  spellsPackets: number;
};
export type Deity = {
  image: string;
  name: string;
  description: string;
};
export type ClassAbility = {
  class: string;
  level: number;
  title: string;
  scaling: number;
  description: string;
};
export type ClassAbilities = ClassAbility[];
export type Race = {
  name: string;

  description: string;
  ability: string;
  ability_description: string;
};
