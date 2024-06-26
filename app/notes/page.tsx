"use client";

import { useDatabase } from "@/contexts/database";

export default async function Notes() {
  const { database } = useDatabase();
  const { data: notes } = await database.from("notes").select();

  return (
    <div>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
