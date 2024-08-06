import { Providers } from "./providers";

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-col gap-8 items-end">
        <h1 className="text-4xl pe-8">Patients</h1>
        <Providers>
          <div className="flex bg-gray-300 rounded-tl-3xl rounded-br-3xl min-h-[32rem]">
            {children}
          </div>
        </Providers>
      </div>
    </section>
  );
}
