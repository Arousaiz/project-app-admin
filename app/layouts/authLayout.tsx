import { ArrowLeft } from "lucide-react";
import { Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import useBack from "~/hooks/use-back";

export default function authLayout() {
  const goBack = useBack("/home");

  return (
    <div className="flex min-h-dvh flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      {/* <Button className="hidden sm:flex absolute top-6 left-6" onClick={() => goBack()}>
                <ArrowLeft></ArrowLeft>
            </Button> */}
      <div className="w-full md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
