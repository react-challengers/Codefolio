export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookmark: {
        Row: {
          id: string;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
      };
      comment: {
        Row: {
          content: string | null;
          id: string;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          id: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
      };
      comment_like: {
        Row: {
          comment_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          id: string;
          user_id: string;
        };
        Update: {
          comment_id?: string;
          id?: string;
          user_id?: string;
        };
      };
      follow: {
        Row: {
          follower_id: string | null;
          following_id: string | null;
          id: string;
        };
        Insert: {
          follower_id?: string | null;
          following_id?: string | null;
          id: string;
        };
        Update: {
          follower_id?: string | null;
          following_id?: string | null;
          id?: string;
        };
      };
      like: {
        Row: {
          id: string;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
      };
      notification: {
        Row: {
          context: string | null;
          created_at: string | null;
          id: number;
          is_checked: boolean | null;
          notificationKind: string | null;
          target_id: string | null;
          user_id: string | null;
        };
        Insert: {
          context?: string | null;
          created_at?: string | null;
          id?: number;
          is_checked?: boolean | null;
          notificationKind?: string | null;
          target_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          context?: string | null;
          created_at?: string | null;
          id?: number;
          is_checked?: boolean | null;
          notificationKind?: string | null;
          target_id?: string | null;
          user_id?: string | null;
        };
      };
      post: {
        Row: {
          content: string;
          created_at: string;
          github_url: string | null;
          id: string;
          is_public: boolean;
          large_category: string;
          members: string[] | null;
          progress_date: string[];
          skills: string[];
          sub_category: string | null;
          tag: string[];
          thumbnail: string | null;
          title: string;
          url: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at: string;
          github_url?: string | null;
          id: string;
          is_public: boolean;
          large_category: string;
          members?: string[] | null;
          progress_date: string[];
          skills: string[];
          sub_category?: string | null;
          tag: string[];
          thumbnail?: string | null;
          title: string;
          url?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          github_url?: string | null;
          id?: string;
          is_public?: boolean;
          large_category?: string;
          members?: string[] | null;
          progress_date?: string[];
          skills?: string[];
          sub_category?: string | null;
          tag?: string[];
          thumbnail?: string | null;
          title?: string;
          url?: string | null;
          user_id?: string;
        };
      };
      "user-profile": {
        Row: {
          birth_year: string | null;
          bookmark_folders: string[] | null;
          careerer: string | null;
          contact_email: string;
          field: string[] | null;
          gender: string | null;
          id: string;
          is_public: boolean;
          phone: string | null;
          skills: string[] | null;
          user_id: string;
          user_name: string;
        };
        Insert: {
          birth_year?: string | null;
          bookmark_folders?: string[] | null;
          careerer?: string | null;
          contact_email: string;
          field?: string[] | null;
          gender?: string | null;
          id?: string;
          is_public?: boolean;
          phone?: string | null;
          skills?: string[] | null;
          user_id: string;
          user_name: string;
        };
        Update: {
          birth_year?: string | null;
          bookmark_folders?: string[] | null;
          careerer?: string | null;
          contact_email?: string;
          field?: string[] | null;
          gender?: string | null;
          id?: string;
          is_public?: boolean;
          phone?: string | null;
          skills?: string[] | null;
          user_id?: string;
          user_name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
