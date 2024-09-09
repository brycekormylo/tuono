import { Providers } from "./providers";

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-end w-full">
        <Providers>{children}</Providers>
      </div>
    </section>
  );
}
