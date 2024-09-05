import { Button } from "@/components/ui/button";
import { BsGoogle } from "react-icons/bs";
import LogoWhite from "/logo-white.svg";
import Typewriter from "typewriter-effect";

export const Auth = () => {
  const loginwithgoogle = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`, "_self");
  };
  return (
    <div className="light h-screen w-full lg:flex">
      <div className="hidden w-2/3 flex-col justify-between bg-[url('/src/assets/auth-bg.svg')] bg-cover bg-right-top p-8 lg:flex">
        <h1 className="flex gap-2 text-5xl font-extrabold text-white">
          <img src={LogoWhite} alt="Mind" className="grid aspect-square w-10 place-content-center" />
          MindMesh
        </h1>
        <div className="flex flex-col gap-2 text-4xl font-medium text-white">
          <p>Boost Your Productivity Together -</p>
          <span className="flex">
            <Typewriter
              options={{
                strings: ["Study", "Work"],
                autoStart: true,
                loop: true,
              }}
            />{" "}
            with Friends in Real-Time
          </span>
        </div>
      </div>
      <div className="grid flex-1 place-items-center bg-white p-6">
        <Button type="submit" size="lg" className="flex w-80 gap-2 text-xl" onClick={loginwithgoogle}>
          <span>
            <BsGoogle />
          </span>
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};
