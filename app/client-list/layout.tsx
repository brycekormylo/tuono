export default function ClientListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-center items-start px-72 pt-48">
        <div className="flex flex-col bg-gray-300 rounded-3xl grow min-h-[32rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
