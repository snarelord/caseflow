"use client";

import { useState } from "react";
import { Database } from "../app/utils/types/supabase";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
interface Props {
  tasks: Task[];
  status: "To Do" | "In Progress" | "Done";
}

export default function GetTasks({ tasks, status }: Props) {
  const [taskList, setTaskList] = useState(tasks);

  if (!taskList || taskList.length === 0) {
    return <p>No tasks with status “{status}”</p>;
  }

  return (
    <div>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description || "No description provided"}</p>
            <p>Due: {new Date(task.due_date).toLocaleString()}</p>
            <p>Status: {task.status}</p>
          </div>
        ))
      ) : (
        <p>No tasks with status “{status}”</p>
      )}
    </div>
  );
}
