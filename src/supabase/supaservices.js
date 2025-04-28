import { supabase } from './supabaseClient';

class ImageService {
  constructor() {
    this.supabase = supabase;
  }

  async uploadImage(bucket, filePath, file) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false, 
      });

    if (error) {
      throw new Error(`Error uploading image: ${error.message}`);
    }

    return filePath; // Just return the filePath, not data
  }

  async getPublicUrl(bucket, filePath) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);  // 👈 notice here

    if (error) {
      throw new Error(`Error getting public URL: ${error.message}`);
    }

    return data.publicUrl; // 👈 now correctly return publicUrl
  }
}

const imageServices = new ImageService();
export default imageServices;
