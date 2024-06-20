"use client";

import { useDatabaseContext } from "@/contexts/db-context";

export default async function Notes() {
  const { database } = useDatabaseContext();
  const { data: notes } = await database.from("notes").select();

  return (
    <div>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
