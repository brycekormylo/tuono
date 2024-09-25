import { Providers } from "./providers";
import { ReactNode } from "react";

export default function RoutineLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className="flex flex-col grow">
        <div className="flex justify-end w-full">
          <Providers>{children}</Providers>
        </div>
      </div>
    </section>
  );
}
