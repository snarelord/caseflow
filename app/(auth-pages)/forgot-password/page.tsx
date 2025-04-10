import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import styles from "./page.module.css";

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <>
      <form className={styles.form}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Reset Password</h1>
          <p className={styles.subtext}>
            Already have an account?{" "}
            <Link className={styles.link} href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className={styles.inputGroup}>
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>Reset Password</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
