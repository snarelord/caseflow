"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function AddTask(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  const due_date = formData.get("due_date") as string;

  await supabase.from("tasks").insert({
    title,
    description,
    status,
    due_date: due_date,
    user_id: user.id,
  });

  revalidatePath("/tasks"); // refresh task list
}
