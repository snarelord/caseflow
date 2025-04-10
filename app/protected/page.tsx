import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
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
      <div className={styles.alert}>
        <InfoIcon size="16" strokeWidth={2} />
        This is a protected page that you can only see as an authenticated user
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Your user details</h2>
        <p>
          Email: {user.email} Last sign in: {user.last_sign_in_at}
        </p>
        {/* <pre className={styles.pre}>{JSON.stringify(user, null, 2)}</pre> */}
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Info stuff</h2>
      </div>
    </div>
  );
}
