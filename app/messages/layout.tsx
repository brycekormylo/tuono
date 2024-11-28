import { Providers } from "./providers";
import { ReactNode } from "react";

export default function MessagesLayout({ children }: { children: ReactNode }) {
  return (
    <section className="block w-full h-full">
      <Providers>{children}</Providers>
    </section>
  );
}
