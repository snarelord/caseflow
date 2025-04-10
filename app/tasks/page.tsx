import { createClient } from "@/utils/supabase/server";

export default async function Tasks() {
  const supabase = await createClient();
  const { data: tasks } = await supabase.from("tasks").select();
  console.log(tasks);
  return <pre>{JSON.stringify(tasks, null, 2)}</pre>;
}
