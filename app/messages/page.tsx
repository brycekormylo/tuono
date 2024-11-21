import NewDraftButton from "./_components/new_draft_button";
import ConversationDisplay from "./conversation/page";
import History from "./history/page";

export default function Messages() {
  return (
    <div className="grid m-4 w-full h-full bg-white rounded-xl ring-2 ring-black grid-cols-[1fr,1.6fr] max-w-[76rem]">
      <div className="flex flex-col col-start-1 border-r-2 border-black grow">
        <NewDraftButton />
        <History />
      </div>
      <div className="flex flex-col col-start-2 min-h-[40rem] grow">
        <ConversationDisplay />
      </div>
    </div>
  );
}
