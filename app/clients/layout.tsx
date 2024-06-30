import NewClientButton from "./_components/new-client-button";
import AllClientsButton from "./_components/all-clients-button";

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex gap-12 justify-center items-start px-72 pt-48">
        <div className="flex flex-col gap-12">
          <NewClientButton />
          <AllClientsButton />
        </div>

        <div className="flex flex-col bg-gray-300 rounded-3xl grow min-h-[32rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
