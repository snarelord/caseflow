import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import styles from "./header-auth.module.css";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className={styles.envWarningWrapper}>
        <div className={styles.buttonGroup}>
          <Button asChild size="sm" variant="outline" disabled className={styles.disabledButton}>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" variant="default" disabled className={styles.disabledButton}>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <div className={styles.authWrapper}>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className={styles.anonActions}>
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
