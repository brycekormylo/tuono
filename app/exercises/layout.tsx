import { Providers } from "./providers";
import { ReactNode } from "react";

export default function ExercisesLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className="flex flex-col gap-8 items-end">
        <h1 className="text-4xl pe-8">Exercises</h1>
        <Providers>
          <div className="flex p-4 bg-gray-300 rounded-tl-3xl rounded-br-3xl min-h-[32rem]">
            {children}
          </div>
        </Providers>
      </div>
    </section>
  );
}
