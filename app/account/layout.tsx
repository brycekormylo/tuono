export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-center items-start pt-48">
        <div className="flex flex-col justify-start items-center bg-gray-300 rounded-tl-[4rem] rounded-br-[4rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
