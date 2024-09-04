import { Providers } from "./providers";

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-col items-start p-8 w-full">
        <Providers>{children}</Providers>
      </div>
    </section>
  );
}
