import { createClient } from "../../app/utils/supabase/server";
import { Database } from "../../app/utils/types/supabase";
import GetTasks from "./GetTasks";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
interface Props {
  status: "To Do" | "In Progress" | "Done";
}

export default async function GetTasksServer({ status }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <p>Not signed in</p>;

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", status)
    .order("due_date", { ascending: true });

  if (error) {
    return <p>Error fetching tasks: {error.message}</p>;
  }

  return <GetTasks status={status} tasks={tasks || []} />;
}
