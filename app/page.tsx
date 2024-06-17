import Background from "./(components)/background";
import Intro from "./intro/page";

export default function Home() {
  return (
    <main className="grid grid-cols-1 grid-rows-1 min-h-screen w-screen">
      <Background />
      <div className="col-start-1 col-end-1 row-start-1 row-end-1">
        <Intro />
      </div>
    </main>
  );
}
