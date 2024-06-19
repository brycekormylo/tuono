import AccountForm from "./account-form";
import Avatar from "./avatar";
import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <AccountForm user={user} />
    </div>
  );
}
