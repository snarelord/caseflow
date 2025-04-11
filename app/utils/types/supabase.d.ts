// types/supabase.d.ts
export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          status: "To Do" | "In Progress" | "Done";
          due_date: string;
          created_at: string;
          updated_at: string;
          user_id: string | null;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
      };
      // Define other tables here
    };
  };
};
