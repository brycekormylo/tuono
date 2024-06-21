import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex justify-center m-24">
      <div className="flex justify-center items-center bg-gray-300 rounded-3xl w-[36rem] h-[24rem]">
        <form className="flex flex-col gap-4 items-start">
          <div className="flex gap-8">
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="flex gap-8">
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
          </div>
          <div className="flex gap-8">
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
