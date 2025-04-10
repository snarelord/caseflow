import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";
import styles from "./smtp-message.module.css";

export function SmtpMessage() {
  return (
    <div className={styles.container}>
      <InfoIcon size={16} className={styles.icon} />
      <div className={styles.content}>
        <small className={styles.note}>
          <strong>Note:</strong> Emails are rate limited. Enable Custom SMTP to increase the rate limit.
        </small>
        <div>
          <Link href="https://supabase.com/docs/guides/auth/auth-smtp" target="_blank" className={styles.link}>
            Learn more <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
