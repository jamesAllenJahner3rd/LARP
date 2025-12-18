
import { getClient } from "@/lib/appwrite"
import { Models,Query,TablesDB } from "appwrite"
import {CharacterClassRow, ClassRow, ClassAbilityRow,ClassAbilitiesRowList,CompleteCharacterSheet} from "@/lib/types/characterTypes"
import dynamic from "next/dynamic"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "68ccc1ab0001250042a8"
    const CLASS_ABLITIES_TABLE_ID = "characterclassabilities"
    const   CLASS_TABLE_ID = "characterclasses"
    const CLASSES_LIST_TABLE_ID = "classes"
    const CLASS_ABILITY_TABLE_ID = "class_abilities"
    const client = getClient()
        const tableDB = new TablesDB(client);
        

export async function getClassAndLevelMap(id: string): Promise<Map<string, number> >{
  try{           
                     const QUERIES = [Query.equal("characterId", id)]
                     const classLevelMap  = new Map()
  const classData = await tableDB.listRows<CharacterClassRow>({
                        databaseId: DATABASE_ID,
                        tableId: CLASS_TABLE_ID,
                        queries: QUERIES,    
                    });
                    console.log("ClassData:")
                     console.dir(classData)
                     // This returns each classes ID for the character ID In a row list

const classesList  = await tableDB.listRows<ClassRow>({
                        databaseId: DATABASE_ID,
                        tableId: CLASSES_LIST_TABLE_ID, 
                    });
                    // This will use This will grab table of classes In a row list form

                     classData?.rows.forEach((row:CharacterClassRow)=>{
                     const classInfo = classesList?.rows.find((classRow)=> row.classes === classRow.$id )
                      classLevelMap.set(classInfo.classes, row.level)
                     })
 return classLevelMap
 // This returns the class names with their respective levels As a map
  }catch(error){
    console.error(error,"couldn't find class List")
  };
}
  
  export async function getClassAbilitiesArray(ID:string, classesAndLevelMap:Map<string,number>):Promise<ClassAbilitiesRowList>{
    
    try{ 
      const dynamicQuery=[]

      classesAndLevelMap.forEach((level, clss)=>{
        if (clss){
          dynamicQuery.push(//Query.and(
           // [
                Query.equal('class', [clss]),//,
                Query.lessThan('level', level+1)
          //])
       )}
      });
      
      
const ABILITY_QUERIES =classesAndLevelMap.size >1? [
        Query.or(dynamicQuery)
    ]   : dynamicQuery;
      const classAbilitiesRowList = await tableDB.listRows<ClassAbilityRow>({
                        databaseId: DATABASE_ID,
                        tableId: CLASS_ABILITY_TABLE_ID,
                        queries: ABILITY_QUERIES,    
                    });
 console.log("classAbilitiesRowList:")
                     console.dir(classAbilitiesRowList)
      // We are going to fetch the possibilities For our character
return classAbilitiesRowList
    }catch(error){
      console.error("Couldn't get the class Abilities Array - getCharacterData",error);
    };
  }


