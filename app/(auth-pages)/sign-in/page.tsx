import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <form className={styles.form}>
      <h1 className={styles.heading}>Sign in</h1>
      <p className={styles.subtext}>
        Don't have an account?{" "}
        <Link className={styles.link} href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className={styles.inputGroup}>
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className={styles.inlineGroup}>
          <Label htmlFor="password">Password</Label>
          <Link className={styles.inlineLink} href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <Input type="password" name="password" placeholder="Your password" required />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
