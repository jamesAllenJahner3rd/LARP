"use client";
import {
  Client,
  Account,
  Storage,
  TablesDB,
  Models,
  Query,
  ID,
} from "appwrite";
import * as CharacterTypes from "@/lib/types/characterTypes";

export function getAuthenticatedAccount(): Account {
  const client = new Client()
    .setEndpoint(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
        "https://nyc.cloud.appwrite.io/v1",
    )
    .setProject(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "68bb084a0032b02608c4",
    );

  return new Account(client);
}
export function getClient() {
  return new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
}
export async function UserLogin(email: string, password: string) {
  try {
    const account = getAuthenticatedAccount();

    // account.deleteSessions();
    // const session = account.createEmailPasswordSession(email, password);
    await account.createEmailPasswordSession(email, password);
    const currentUser = await account.get(); //added
    return currentUser;
    // return session;
  } catch (error) {
    console.error("An Error occured", error);
    throw error;
  }
}

export function storage() {
  const client = getClient();
  return new Storage(client);
}

export async function getList(
  dbId: string,
  tableId: string,
): Promise<Models.RowList<Models.DefaultRow>> {
  try {
    const client = getClient();
    const tablesDB = new TablesDB(client);
    const result = await tablesDB.listRows(dbId, tableId, [Query.limit(81)]);
    console.log("Table was found:", dbId);

    return await result;
  } catch (error) {
    console.error("Failed to create document:", error);
    throw error;
  }
}
export async function uploadClientFile(aFile: File): Promise<string> {
  console.log("uploader triggered");
  const fileId = ID.unique().toString();
  console.log(fileId);
  const storageClient = await storage();
  const promise = await storageClient.createFile({
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET,
    fileId,
    file: aFile,
    // permissions: ["read("any")"] // optional
  });
  return fileId;
}
export async function saveCharacter(
  character,
  characterClasses,
  characterClassAbilities,
) {
  const characterId = ID.unique().toString();
  console.log(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
  const account = getAuthenticatedAccount();
  const user = await account.get();
  const client = new Client()
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const tablesDB = new TablesDB(client);
  function classId(className: string): string {
    switch (className) {
      case "Rogue":
        return "68cce0da0000f82f2635";
        break;
      case "Ranger":
        return "68ccf8de001f138663ae";
        break;
      case "Mage":
        return "68cce8880023fa387f8c";
        break;
      case "Cleric":
        return "68cce0da0000f82f2635";
        break;
      case "Fighter":
        return "68ccddc00032af80cb06";
        break;
    }
  }
  console.log(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
  try {
    tablesDB.createRow({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      tableId: "characters",
      rowId: characterId,
      data: {
        memberId: user.$id,
        name: character.name,
        race: character.race,
        subrace: character.subRace,
        raceAbilities: character.raceAbilities,
        lightWeapons: character.lightWeapons,
        mediumWeapons: character.mediumWeapons,
        heavyWeapons: character.heavyWeapons,
        heavyArmor: character.heavyArmor,
        mediumArmor: character.mediumArmor,
        lightArmor: character.lightArmor,
        lightShield: character.lightShield,
        mediumShield: character.mediumShield,
        heavyShield: character.heavyShield,
        classAbilities: character.classAbilities,
        twoWeapon: character.twoWeapon,
        rangedWeapons: character.rangedWeapons,
        whiteCloth: character.whiteCloth,
        greenCloth: character.greenCloth,
        history: character.history,
        spellsPackets: character.spellsPackets,
        imageUrl: character.imageUrl,
        classDescription: character.classDescription,
        deity: character.deity,
        raceDescription: character.raceDescription,
        raceAbilityDescription: JSON.stringify(
          character.raceAbilityDescription,
        ),
        deityImage: character.deityImage,
        deityDescription: character.deityDescription,
        characterId,
      },
    });
    characterClassAbilities.forEach((ability: CharacterTypes.ClassAbility) => {
      tablesDB.createRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: "characterclassabilities",
        rowId: ID.unique(),
        data: {
          level: ability.level,
          characterId,
          classAbilityId: ability.$id,
        },
      });
    });
    characterClasses.forEach((value, key) => {
      tablesDB.createRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        tableId: "characterclasses",
        rowId: ID.unique(),
        data: {
          characterId,
          classes: classId(key),
          level: value,
        },
      });
    });

    console.log("Character Created");
  } catch (error) {
    console.log(error, "Character failed to save");
  }
}
//tableIDs:
//characterclassabilities
//characterclasses
//characters
