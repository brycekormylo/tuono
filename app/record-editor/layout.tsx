import ActionButtons from "./_components/action-buttons";
import { usePatientList } from "@/contexts/patient-list";

export default function RecordEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-center items-start px-72 pt-48">
        <ActionButtons />
        <div className="flex flex-col bg-gray-300 rounded-3xl grow min-h-[32rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
