import { Button } from "@/components/ui/button";
import { BsGoogle } from "react-icons/bs";
import LogoWhite from "/logo-white.svg";
import Typewriter from "typewriter-effect";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router-dom";
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
        <GoogleLoginBtn />
      </div>
    </div>
  );
};
const GoogleLoginBtn = ({}) => {
  const navigate= useNavigate()
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess:async ({ code }) => {
      await useUserStore.getState().authGoogle(code);
      navigate("/dashboard")
    },
    onFailure: (res) => {
      console.error(res);
    },
  });

  return (
    <>
      <Button
      className="flex gap-2"
        onClick={login}
      >
        <FcGoogle height={19} width={19} />
        Continue with Google
      </Button>
    </>
  );
};
