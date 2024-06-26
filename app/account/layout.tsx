export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-center items-start pt-48">
        <div className="flex flex-col bg-gray-300 rounded-3xl min-h-[32rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
