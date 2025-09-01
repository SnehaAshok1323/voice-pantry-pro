export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      consumption_patterns: {
        Row: {
          average_weekly_consumption: number | null
          id: string
          item_name: string
          last_calculated: string | null
          seasonal_factor: number | null
          user_id: string
        }
        Insert: {
          average_weekly_consumption?: number | null
          id?: string
          item_name: string
          last_calculated?: string | null
          seasonal_factor?: number | null
          user_id: string
        }
        Update: {
          average_weekly_consumption?: number | null
          id?: string
          item_name?: string
          last_calculated?: string | null
          seasonal_factor?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consumption_patterns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      inventory: {
        Row: {
          average_consumption_rate: number | null
          brand_preference: string | null
          category: string | null
          created_at: string
          current_quantity: number | null
          expiry_date: string | null
          id: string
          item_name: string
          last_purchase_date: string | null
          minimum_stock_level: number | null
          needed_quantity: number | null
          notes: string | null
          unit: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_consumption_rate?: number | null
          brand_preference?: string | null
          category?: string | null
          created_at?: string
          current_quantity?: number | null
          expiry_date?: string | null
          id?: string
          item_name: string
          last_purchase_date?: string | null
          minimum_stock_level?: number | null
          needed_quantity?: number | null
          notes?: string | null
          unit?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_consumption_rate?: number | null
          brand_preference?: string | null
          category?: string | null
          created_at?: string
          current_quantity?: number | null
          expiry_date?: string | null
          id?: string
          item_name?: string
          last_purchase_date?: string | null
          minimum_stock_level?: number | null
          needed_quantity?: number | null
          notes?: string | null
          unit?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      platform_accounts: {
        Row: {
          account_details: Json | null
          created_at: string
          id: string
          is_active: boolean | null
          last_used: string | null
          platform_name: string
          user_id: string
        }
        Insert: {
          account_details?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          platform_name: string
          user_id: string
        }
        Update: {
          account_details?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          platform_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      price_data: {
        Row: {
          availability: boolean | null
          brand: string | null
          delivery_fee: number | null
          id: string
          item_name: string
          location: string | null
          minimum_order: number | null
          platform: string
          price: number
          price_per_unit: number
          quantity: number
          scraped_at: string
          unit: string
        }
        Insert: {
          availability?: boolean | null
          brand?: string | null
          delivery_fee?: number | null
          id?: string
          item_name: string
          location?: string | null
          minimum_order?: number | null
          platform: string
          price: number
          price_per_unit: number
          quantity: number
          scraped_at?: string
          unit: string
        }
        Update: {
          availability?: boolean | null
          brand?: string | null
          delivery_fee?: number | null
          id?: string
          item_name?: string
          location?: string | null
          minimum_order?: number | null
          platform?: string
          price?: number
          price_per_unit?: number
          quantity?: number
          scraped_at?: string
          unit?: string
        }
        Relationships: []
      }
      shopping_list_items: {
        Row: {
          created_at: string
          estimated_price: number | null
          id: string
          is_purchased: boolean | null
          item_name: string
          priority: string | null
          purchased_at: string | null
          purchased_platform: string | null
          purchased_price: number | null
          quantity: number
          shopping_list_id: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          estimated_price?: number | null
          id?: string
          is_purchased?: boolean | null
          item_name: string
          priority?: string | null
          purchased_at?: string | null
          purchased_platform?: string | null
          purchased_price?: number | null
          quantity: number
          shopping_list_id: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          estimated_price?: number | null
          id?: string
          is_purchased?: boolean | null
          item_name?: string
          priority?: string | null
          purchased_at?: string | null
          purchased_platform?: string | null
          purchased_price?: number | null
          quantity?: number
          shopping_list_id?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_items_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_lists: {
        Row: {
          cheapest_platform: string | null
          created_at: string
          id: string
          list_name: string | null
          status: string | null
          total_estimated_cost: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cheapest_platform?: string | null
          created_at?: string
          id?: string
          list_name?: string | null
          status?: string | null
          total_estimated_cost?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cheapest_platform?: string | null
          created_at?: string
          id?: string
          list_name?: string | null
          status?: string | null
          total_estimated_cost?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voice_commands: {
        Row: {
          action_taken: string | null
          confidence_score: number | null
          created_at: string
          id: string
          original_text: string
          parsed_command: Json
          processing_time_ms: number | null
          user_id: string
        }
        Insert: {
          action_taken?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          original_text: string
          parsed_command: Json
          processing_time_ms?: number | null
          user_id: string
        }
        Update: {
          action_taken?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          original_text?: string
          parsed_command?: Json
          processing_time_ms?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_commands_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
