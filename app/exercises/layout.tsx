import { Providers } from "./providers";
import { ReactNode } from "react";

export default function ExercisesLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className="flex justify-end w-full">
        <Providers>{children}</Providers>
      </div>
    </section>
  );
}
