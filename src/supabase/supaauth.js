

import { supabase } from "./supabaseClient";

class AuthService {
  constructor() {
   
    this.supabase = supabase;
  }

  async signInWithEmail({ email, password }) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Login error:', error.message);
      return { error };
    }
  }

  async signUpWithEmail({ email, password }) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Signup error:', error.message);
      return { error };
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error.message);
      return { error };
    }
  }

  async getCurrentUser() {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      if (error) throw error;
      return { user: data.user };
    } catch (error) {
      console.error('Get current user error:', error.message);
      return { error };
    }
  }

  onAuthStateChange(callback) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  
  onAuthStateChangedOnce() {
    return new Promise(async (resolve) => {
      const { data: { session } } = await this.supabase.auth.getSession();
  
      // If session already exists, resolve immediately
      if (session?.user) {
        resolve(session.user);
      } else {
        // Otherwise, wait for it to be created
        const { data: listener } = this.supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            listener.subscription.unsubscribe(); // run once
            resolve(session.user);
          }
        });
  
        // Optional fallback: timeout after 5s
        setTimeout(() => {
          listener.subscription.unsubscribe();
          resolve(null);
        }, 5000);
      }
    });
  }
  

  getClient() {
    return this.supabase;
  }
}

const auth = new AuthService();
export default auth;
