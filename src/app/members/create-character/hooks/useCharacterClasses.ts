"use client";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { Models } from "appwrite";
import * as CharacterTypes from "@/lib/types/characterTypes";

type useCharacterClassesProps = {
  setCharacterClasses: React.Dispatch<
    React.SetStateAction<Map<string, number>>
  >;
  characterClasses: Map<string, number>;
  character: CharacterTypes.Character;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterTypes.Character>>;
  formInputs: CharacterTypes.FormInputs;
  setFormInputs: React.Dispatch<
    React.SetStateAction<CharacterTypes.FormInputs>
  >;
  classList: Models.RowList<Models.DefaultRow> | null;
  characterClassAbilities: CharacterTypes.ClassAbilities | null;
  setCharacterClassAbilities: React.Dispatch<
    React.SetStateAction<CharacterTypes.ClassAbilities>
  >;
  classAbilitiesList: Models.RowList<Models.DefaultRow> | null;
};
type UseCharacterClassesReturn = {
  decreaseLevel: () => void;
  increaseLevel: () => void;
  classSelected: (className: CharacterTypes.ClassName) => void;
  updateClassInfo: () => void;
};

const useCharacterClasses = ({
  character,
  setCharacterClasses,
  characterClasses,
  setCharacter,
  formInputs,
  setFormInputs,
  classList,
  characterClassAbilities,
  setCharacterClassAbilities,
  classAbilitiesList,
}: useCharacterClassesProps): UseCharacterClassesReturn => {
  //const useCharacterClasses = (props: useCharacterClassesProps): UseCharacterClassesReturn => { ... }
  const CLASSNAMES = ["Fighter", "Cleric", "Ranger", "Mage", "Rogue"];
  // The responsibility of this function is to return the list of class abilities to display in the summary.
  const getCharacterAbilities = (
    characterClasses: Map<string, number>,
    setCharacterClassAbilities: React.Dispatch<
      React.SetStateAction<CharacterTypes.ClassAbilities>
    >,
    classAbilitiesList: Models.RowList<Models.DefaultRow> | null,
  ) => {
    if (!classAbilitiesList) return [];

    const CharacterAbilitiesList: any[] = [];

    characterClasses.forEach((level: number, className: string) => {
      const abilitiesArray = classAbilitiesList.rows.filter(
        (ability) => ability.level <= level && ability.class === className,
      );
      CharacterAbilitiesList.push(...abilitiesArray);
    });
    const correctLevelAbilities: CharacterTypes.ClassAbilities = [];

    CharacterAbilitiesList.forEach((ability) => {
      const level = characterClasses.get(ability.class);
      if (level && level >= ability.level) {
        const existingIndex: number = correctLevelAbilities.findIndex(
          (currentAbility) => currentAbility.title === ability.title,
        );

        if (existingIndex === -1) {
          correctLevelAbilities.push({
            class: ability.class,
            level: ability.level,
            title: ability.title,
            description: ability.description,
            scaling: ability.scaling,
          });
        } else if (
          existingIndex !== -1 &&
          correctLevelAbilities[existingIndex].scaling <= ability.scaling
        ) {
          correctLevelAbilities[existingIndex] = {
            class: ability.class,
            level: ability.level,
            title: ability.title,
            description: ability.description,
            scaling: ability.scaling,
          };
        }
      }
    });
    setCharacterClassAbilities(correctLevelAbilities);
    // return correctLevelAbilities
  };
  const updateClassInfo = useCallback(() => {
    console.log("updateClassInfo: update Class info triggered");
    if (!classList) return;
    const currentClasses = Array.from(characterClasses?.keys());
    const matched = currentClasses.map((className) =>
      classList.rows.find((row) => row.classes === className),
    );
    const reducedClassInfo = matched.reduce(
      (acc, cur) => {
        if (!cur) return acc;
        return {
          classDescription: cur.description,
          lightWeapons: acc.lightWeapons || cur.lightWeapons,
          mediumWeapons: acc.mediumWeapons || cur.mediumWeapons,
          heavyWeapons: acc.heavyWeapons || cur.heavyWeapons,
          heavyArmor: acc.heavyArmor || cur.heavyArmor,
          mediumArmor: acc.mediumArmor || cur.mediumArmor,
          lightArmor: acc.lightArmor || cur.lightArmor,
          lightShield: acc.lightShield || cur.lightShield,
          mediumShield: acc.mediumShield || cur.mediumShield,
          heavyShield: acc.heavyShield || cur.heavyShield,
          twoWeapon: acc.twoWeapon || cur.twoWeapon,
          rangedWeapons: acc.rangedWeapons || cur.rangedWeapons,
          whiteCloth: Math.max(acc.whiteCloth, cur.whiteCloth),
          greenCloth: Math.max(acc.greenCloth, cur.greenCloth),
          spellsPackets: Math.max(acc.spellsPackets, cur.spellsPackets),
        };
      },
      {
        classDescription: "",
        lightWeapons: false,
        mediumWeapons: false,
        heavyWeapons: false,
        heavyArmor: false,
        mediumArmor: false,
        lightArmor: false,
        lightShield: false,
        mediumShield: false,
        heavyShield: false,
        twoWeapon: false,
        rangedWeapons: false,
        whiteCloth: 0,
        greenCloth: 0,
        spellsPackets: 0,
      },
    );

    setCharacter((character) => ({
      ...character!,
      classDescription: reducedClassInfo.classDescription,
      lightWeapons: reducedClassInfo.lightWeapons,
      mediumWeapons: reducedClassInfo.mediumWeapons,
      heavyWeapons: reducedClassInfo.heavyWeapons,
      heavyArmor: reducedClassInfo.heavyArmor,
      mediumArmor: reducedClassInfo.mediumArmor,
      lightArmor: reducedClassInfo.lightArmor,
      lightShield: reducedClassInfo.lightShield,
      mediumShield: reducedClassInfo.mediumShield,
      heavyShield: reducedClassInfo.heavyShield,
      twoWeapon: reducedClassInfo.twoWeapon,
      rangedWeapons: reducedClassInfo.rangedWeapons,
      whiteCloth: reducedClassInfo.whiteCloth,
      greenCloth: reducedClassInfo.greenCloth,
      spellsPackets: reducedClassInfo.spellsPackets,
    }));
    getCharacterAbilities(
      characterClasses,
      setCharacterClassAbilities,
      classAbilitiesList,
    );
  }, [characterClasses, classList]);

  const decreaseLevel = useCallback(() => {
    let tempLevel = 0;
    console.log("decrease pressed");
    // Check to see if there are three classes. Need to check if the total classes or 10
    console.log(
      " Checking to see if the class exists,that this character has a class, and  on you actually have a level in the class",
      formInputs.class &&
        totalLevel(characterClasses) > 0 &&
        characterClasses.size > 0,
    );
    if (
      formInputs.class &&
      totalLevel(characterClasses) > 0 &&
      characterClasses.size > 0
    ) {
      // check To see if the selected class is in the  characterClass object already
      console.log(characterClasses.has(formInputs.class));
      if (characterClasses.has(formInputs.class)) {
        console.log("This character's level can decrease");
        //      Else we will increment the level of the current class.
        setCharacterClasses((characterClasses) => {
          const CharacterClassList = new Map(characterClasses);
          CharacterClassList.set(formInputs.class, formInputs.level - 1);
          if (CharacterClassList.get(formInputs.class) <= 0) {
            CharacterClassList.delete(formInputs.class);
          }
          return CharacterClassList;
        });
        setFormInputs((formInputs) => ({
          ...formInputs,
          level: formInputs.level - 1,
        }));
        tempLevel = formInputs.level - 1;
        console.log("trigger update class info from increase");
      }
      console.log(
        "decreaseLevel - trigger update class info from increase",
        characterClasses,
      );
      console.dir(formInputs);

      updateClassInfo();
    }
  }, [formInputs, characterClasses]);
  const increaseLevel = useCallback(() => {
    let tempLevel = 0;
    console.log("increase pressed");
    // Check to see if there are three classes. Need to check if the total classes or 10
    if (
      formInputs.class &&
      totalLevel(characterClasses) < 10 &&
      characterClasses.size <= 3
    ) {
      // check To see if the selected class is in the  characterClass object already
      if (!characterClasses.has(formInputs.class)) {
        //If the class has not been added we need to add the Class and the level of one to the characterClass array
        setCharacterClasses((characterClasses) => {
          const updatedClasses = new Map(characterClasses);
          updatedClasses.set(formInputs.class, 1);
          tempLevel = 1;
          return updatedClasses;
        });
        setFormInputs((formInputs) => ({
          ...formInputs,
          class: formInputs.class,
          level: 1,
        }));
        console.log("This character hasn't a level in this class");
      } else {
        console.log("This character's level");
        //      Else we will increment the level of the current class.
        setCharacterClasses((characterClasses) => {
          const CharacterClassList = new Map(characterClasses);
          CharacterClassList.set(formInputs.class, formInputs.level + 1);
          return CharacterClassList;
        });
        setFormInputs((formInputs) => ({
          ...formInputs,
          level: formInputs.level + 1,
        }));
        tempLevel = formInputs.level + 1;
        console.log("trigger update class info from increase");
      }
      console.log(
        "IncreaseLevel - trigger update class info from increase",
        characterClasses,
      );
      console.dir(formInputs);

      updateClassInfo();
    }
  }, [formInputs, characterClasses]);
  useEffect(() => {
    if (characterClasses.size > 0 && classList) {
      updateClassInfo();
    }
  }, [characterClasses, formInputs.class, classList]);

  const classSelected = useCallback(
    (chosenClass: CharacterTypes.ClassName): void => {
      setFormInputs((inputs) => {
        return {
          ...inputs,
          class: chosenClass,
          level: characterClasses.get(chosenClass) || 0,
        };
      });
    },
    [characterClasses],
  );
  return {
    increaseLevel,
    decreaseLevel,
    classSelected,
    updateClassInfo,
  };
};
export default useCharacterClasses;
export function totalLevel(classLevelPairs: Map<string, number>): number {
  const toBeSummed = Array.from(classLevelPairs.values());
  if (Array.isArray(toBeSummed)) {
    return toBeSummed?.reduce((sum, addends) => sum + addends, 0);
  } else return 0;
}
