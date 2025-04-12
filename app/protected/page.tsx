import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import GetTasks from "../../components/get-tasks/GetTasksServer";
import { AddTask } from "../tasks/actions";
import AddTaskForm from "@/components/add-task/AddTask";
import styles from "./page.module.css";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className={styles.page}>
      <AddTaskForm />
      <div className={styles.section}>
        <h2 className={styles.heading}>To Do</h2>
        <div className={styles.taskSection}>
          <GetTasks status="To Do" />
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.heading}>In Progress</h2>
        <div className={styles.taskSection}>
          <GetTasks status="In Progress" />
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.heading}>Completed</h2>
        <div className={styles.taskSection}>
          <GetTasks status="Done" />
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
