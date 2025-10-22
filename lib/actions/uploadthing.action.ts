"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteUploadthingFile(fileKey: string) {
  try {
    if (!fileKey) {
      return { success: false, message: "fileKey is required" };
    }

    await utapi.deleteFiles(fileKey);

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, message: "Failed to delete file" };
  }
}
