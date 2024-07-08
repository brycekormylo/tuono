import { Providers } from "./providers";

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-end items-start pt-24 ps-40 me-44">
        <div className="flex flex-col gap-8 px-16">
          <div className="flex gap-24 justify-end px-8">
            <h1 className="self-start text-4xl">Patients</h1>
          </div>
          <Providers>
            <div className="flex bg-gray-300 rounded-tl-3xl rounded-br-3xl min-h-[32rem]">
              {children}
            </div>
          </Providers>
        </div>
      </div>
    </section>
  );
}
