import { databases } from "./appwrite";

export async function getData(
  dbId: string,
  cId: string,
  docId: string,
  queries: any,
) {
  try {
    const result = await databases.getDocument(dbId, cId, docId, queries);
    console.log("Document retrieved:", dbId);
    return result;
  } catch (error) {
    console.error("Failed to retrieve document:", error);
    throw error;
  }
}
export async function getTable(dbId: string, tableId: string) {
  try {
    const result = await databases.listDocuments(dbId, tableId);
    console.log("Table was found:", dbId);

    return result;
  } catch (error) {
    console.error("Failed to create document:", error);
    throw error;
  }
}

export async function postData(
  dbId: string,
  cId: string,
  docId: string,
  postData: any,
  permissions?: any,
) {
  try {
    const result = await databases.createDocument(
      dbId,
      cId,
      docId,
      postData,
      permissions,
    );
    console.log("Document created:", dbId);
    return result;
  } catch (error) {
    console.error("Failed to create document:", error);
    throw error;
  }
}
export async function patchData(
  dbId: string,
  cId: string,
  docId: string,
  putData: any,
  permissions: any,
) {
  try {
    const result = await databases.updateDocument(
      dbId,
      cId,
      docId,
      putData, // optional
      permissions, // optional
    );
    console.log("Document updated:", dbId);
    return result;
  } catch (error) {
    console.error("Failed to update document:", error);
    throw error;
  }
}
export async function deleteData(
  dbId: string,
  cId: string,
  docId: string,
): Promise<void> {
  try {
    const result = await databases.deleteDocument(dbId, cId, docId);

    console.log("Document deleted:", dbId);
  } catch (error) {
    console.error("Failed to delete document:", error);
    throw error;
  }
}
