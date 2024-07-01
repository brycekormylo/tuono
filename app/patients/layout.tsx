import NewPatientButton from "./_components/new-patient-button";
import AllPatientsButton from "./_components/all-patients-button";

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-end items-start pt-36 w-full ps-40 pe-64">
        <div className="flex flex-col gap-24 px-16 grow">
          <h1 className="self-start text-4xl">Patients</h1>
          <div className="flex flex-col gap-6 self-end">
            <NewPatientButton />
            <AllPatientsButton />
          </div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl min-h-[32rem] min-w-[24rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
