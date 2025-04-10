import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Tasks from "../tasks/page";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // fetch tasks and filter by status
  const { data: tasks, error } = await supabase.from("tasks").select();
  if (error) {
    return <p>Error fetching tasks: {error.message}</p>;
  }

  const toDoTasks = tasks?.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks?.filter((task) => task.status === "In Progress");
  const completedTasks = tasks?.filter((task) => task.status === "Done");

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <h2 className={styles.heading}>To Do</h2>
        <div className={styles.taskSection}>
          <Tasks tasks={toDoTasks} />
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.heading}>In Progress</h2>
        <div className={styles.taskSection}>
          <Tasks tasks={inProgressTasks} />
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.heading}>Completed</h2>
        <div className={styles.taskSection}>
          <Tasks tasks={completedTasks} />
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.heading}>Your user details</h2>
        <p>Email: {user.email}</p>
        <p>Last sign in: {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : ""}</p>
        {/* <pre className={styles.pre}>{JSON.stringify(user, null, 2)}</pre> */}
      </div>
    </div>
  );
}
