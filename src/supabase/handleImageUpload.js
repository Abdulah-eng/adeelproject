import imageServices from "./supaservices";

const bucket = 'bucketone';

export const uploadAndGetPublicUrl = async (file) => {
  if (!file) throw new Error('No file selected.');

  const filePath = `uploads/${Date.now()}_${file.name}`;

  await imageServices.uploadImage(bucket, filePath, file); // Upload image

  const publicUrl = await imageServices.getPublicUrl(bucket, filePath); // Then get public URL

  return publicUrl;
};
