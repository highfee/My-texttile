import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";

const Auth_Dailog = () => {
  return (
    <>
      <AlertDialogContent className="max-w-[425px] md:min-w-[650px] lg:min-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Image
              src="/mytexttile-logo.svg"
              alt="Alert Dialog"
              width={200}
              height={180}
              className="mb-4 w-28"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="flex gap-40 items-center justify-between md:mx-10">
            <p className=" md:text-xl font-semibold text-gray-800">
              Welcome Back to MyTextil,{" "}
              <span className="text-bluebutton">Sign in</span>
            </p>
            <Button>Register</Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "w-8 h-8 bg-bluebutton rounded-full hover:bg-blue-600 border-0 absolute top-0 md:-right-20 -right-5"
            )}
          >
            <X color="white" size={25} />
          </AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
};

export default Auth_Dailog;
