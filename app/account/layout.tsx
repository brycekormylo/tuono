export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-col items-end">
        <h1 className="px-8 text-4xl">Account Info</h1>
        <div className="flex flex-col justify-start items-center m-24 bg-gray-300 grow rounded-tl-[4rem] rounded-br-[4rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
