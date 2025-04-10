import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import styles from "./page.module.css";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className={styles.container}>
        <FormMessage message={searchParams} />
      </div>
    );
  }
  return (
    <>
      <form className={styles.form}>
        <h1 className={styles.heading}>Sign up</h1>
        <p className={styles.subtext}>
          Already have an account?{" "}
          <Link className={styles.link} href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className={styles.inputGroup}>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Your password" minLength={6} required />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
