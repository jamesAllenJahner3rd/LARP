import type { Models } from "node-appwrite";
import { TablesDB } from "node-appwrite";
import { getServerClient } from "./appwrite-node";
const tablesDB = async () => {
  const client = await getServerClient();
  return new TablesDB(client);
};

export async function getData(
  dbId: string,
  tableId: string,
  rowId: string,
  queries: any,
) {
  try {
    const rowPromise = await tablesDB();
    const result = rowPromise.getRow(dbId, tableId, rowId, queries);
    console.log("Document retrieved:", dbId);
    return result;
  } catch (error) {
    console.error("Failed to retrieve document:", error);
    throw error;
  }
}
export async function getList(
  dbId: string,
  tableId: string,
): Promise<Models.RowList<Models.DefaultRow>> {
  try {
    const rowPromise = await tablesDB();
    const result = rowPromise.listRows(dbId, tableId);
    console.log("Table was found:", dbId);

    return result;
  } catch (error) {
    console.error("Failed to create document:", error);
    throw error;
  }
}

export async function postData<Row extends Models.Row = Models.DefaultRow>(
  dbId: string,
  tableId: string,
  rowId: string,
  postData: Row extends Models.DefaultRow
    ? Partial<Models.Row> & Record<string, any>
    : Partial<Models.Row> & Omit<Row, keyof Models.Row>,
  //any,
  permissions?: string[],
): Promise<Row> {
  try {
    const rowPromise = await tablesDB();
    const result = rowPromise.createRow(
      dbId,
      tableId,
      rowId,
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
  tableId: string,
  rowId: string,
  putData: any,
  permissions: any,
) {
  try {
    const rowPromise = await tablesDB();
    const result = rowPromise.updateRow(
      dbId,
      tableId,
      rowId,
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
  tableId: string,
  rowId: string,
): Promise<void> {
  try {
    const rowPromise = await tablesDB();
    const result = rowPromise.deleteRow(dbId, tableId, rowId);

    console.log("Document deleted:", dbId);
  } catch (error) {
    console.error("Failed to delete document:", error);
    throw error;
  }
}
