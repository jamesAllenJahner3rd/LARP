import type { Models } from "node-appwrite";
import { TablesDB } from "node-appwrite";
import { getServerClient } from "./appwrite-node";
const tablesDB = async () => {
  const client = await getServerClient();
  return new TablesDB(client);
};

// Small helper to make any promise fail-fast after a timeout so server renders don't hang
function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs = Number(process.env.APPWRITE_REQUEST_TIMEOUT_MS || 5000),
) {
  let timer: NodeJS.Timeout | undefined;
  return new Promise<T>((resolve, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Request timed out after ${timeoutMs}ms`)),
      timeoutMs,
    );
    promise
      .then((v) => {
        if (timer) clearTimeout(timer);
        resolve(v);
      })
      .catch((err) => {
        if (timer) clearTimeout(timer);
        reject(err);
      });
  });
}

export async function getData(
  dbId: string,
  tableId: string,
  rowId: string,
  queries: any,
) {
  try {
    const rowPromise = await tablesDB();
    const result = withTimeout(
      rowPromise.getRow(dbId, tableId, rowId, queries),
    );
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
    const result = withTimeout(rowPromise.listRows(dbId, tableId));
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
    const result = await withTimeout(
      rowPromise.createRow(dbId, tableId, rowId, postData, permissions),
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
    const result = await withTimeout(
      rowPromise.updateRow(dbId, tableId, rowId, putData, permissions),
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
    const result = withTimeout(rowPromise.deleteRow(dbId, tableId, rowId));

    console.log("Document deleted:", dbId);
  } catch (error) {
    console.error("Failed to delete document:", error);
    throw error;
  }
}
