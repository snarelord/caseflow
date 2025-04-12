"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { AddTask } from "../../app/tasks/actions";
import styles from "@/app/protected/page.module.css";

export default function AddTaskForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    await AddTask(formData);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <form action={handleSubmit} className={styles.taskForm}>
      <input name="title" placeholder="Title" required />
      <textarea name="description" placeholder="Description" />
      <select name="status" required>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input name="due_date" type="datetime-local" placeholder="Due date" required />
      <button type="submit" disabled={isPending}>
        Add Task
      </button>
    </form>
  );
}
