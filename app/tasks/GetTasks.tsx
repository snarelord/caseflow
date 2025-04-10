import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";

interface TaskProps {
  tasks: Array<{ id: number; title: string; description: string | null; status: string; due_date: string }>;
}

export default function GetTasks({ tasks }: TaskProps) {
  if (!tasks) {
    return <p>Loading Tasks...</p>;
  }
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description || "No description provided"}</p>
            <p>Due date: {new Date(task.due_date).toLocaleString()}</p>
            <p>Status: {task.status}</p>
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
}
