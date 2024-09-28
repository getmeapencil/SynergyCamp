import FError from "@/assets/f-error.svg";

export const Error = ({ errorMessage = "Something went wrong :/" }) => {
  return (
    <div className="flex min-h-screen place-content-center items-center gap-6 p-4">
      <img src={FError} className="h-36 md:h-52 lg:h-full" />
      <div className="flex flex-col gap-4">
        <span className="text-2xl lg:text-3xl">MindMashed</span>
        <span className="text-5xl lg:text-7xl">{errorMessage}</span>
      </div>
    </div>
  );
};
