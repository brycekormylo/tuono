import Intro from "./intro/page";
import Routine from "./routine/page";
import Notes from "./notes/page";
import Account from "./account/page";

export default function Home() {
  return (
    <div className="col-start-1 col-end-1 row-start-1 row-end-1">
      <div className="flex flex-col gap-60">
        <Intro />
        <Routine />
        <Notes />
        <Account />
      </div>
    </div>
  );
}
