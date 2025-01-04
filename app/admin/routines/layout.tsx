import { Providers } from "./providers";
import { ReactNode } from "react";

export default function RoutineLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-full h-full">
      <Providers>{children}</Providers>
    </section>
  );
}
