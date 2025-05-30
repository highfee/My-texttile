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
import { ChevronLeft, Eye, EyeOff, Loader, Lock, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/httpClient";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/authService";

const Auth_Dailog = () => {
  const [activeComponent, setActiveComponent] = useState("login");

  return (
    <>
      <AlertDialogContent className="max-w-[90%] md:max-w-[800px] md:min-w-[650px] lg:min-w-[800px] max-h-[95vh]  overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center md:justify-start">
            <Image
              src="/mytexttile-logo.svg"
              alt="Alert Dialog"
              width={200}
              height={100}
              className="lg:mb-4 w-28 "
            />
          </AlertDialogTitle>
          <AlertDialogDescription className=" md:mx-10">
            {activeComponent === "login" && (
              <div className="flex gap-4 items-center justify-between">
                <p className="text-sm md:text-xl font-semibold text-gray-800 w-ma">
                  Welcome Back to MyTextil,{" "}
                  <span className="text-bluebutton">Sign in</span>
                </p>
                <Button
                  onClick={() => setActiveComponent("register")}
                  className="h-8 md:h-9 text-sm md:text-base"
                >
                  Register
                </Button>
              </div>
            )}
            {activeComponent === "register" && (
              <>
                <p className="text-sm md:text-xl font-semibold text-gray-800 ">
                  Create with Mytextil, Sell on Social
                </p>
                <small>
                  Use your email or another service to continue with Owneet (It
                  {"'"}s free)
                </small>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <section className="">
          {activeComponent === "login" && (
            <LoginForm setActiveComponent={setActiveComponent} />
          )}

          {activeComponent === "forgotPassword" && (
            <ForgotPasswordForm setActiveComponent={setActiveComponent} />
          )}

          {activeComponent === "register" && (
            <RegisterForm setActiveComponent={setActiveComponent} />
          )}
        </section>

        <AlertDialogFooter>
          <AlertDialogCancel
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "w-5 md:w-8 h-5 md:h-8 bg-bluebutton rounded-full hover:bg-blue-600 border-0 absolute top-2 m:-right-20 right-2"
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

const LoginForm = ({ setActiveComponent }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      setError(null); // Reset error state before making the request
      const response = await httpClient.post("/users/login/", data);
      if (response.status !== 200) {
        throw new Error("Login failed. Please try again.");
      }
      authService.setSession(response.data["response data"]);
      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        router.refresh();
      } else {
        setError(data["response description"] || "Login failed");
        console.log(data);
      }
    },
    onError: (error) => {
      setError(error.message || "Login failed. Please try again.");
      console.log(error);
    },
  });

  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className="md:w-[75%] mx-auto md:mt-10">
      {loginMutation.isSuccess && (
        <p className="text-green-500 text-sm mb-3">
          Login successful! Redirecting...
        </p>
      )}
      {error && (
        <p className="text-[#FF5789] text-[10px] lg:text-[14px] py-2">
          ***{error || JSON.stringify(error)}
        </p>
      )}
      <Form {...form} className="">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-8 space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="example@email.com"
                      {...field}
                      type="email"
                      className="md:h-12 text-base focus-visible:ring-bluebutton pl-10"
                    />
                    <span className="font-medium text-xl absolute left-3 top-1/2  -translate-y-1/2">
                      @
                    </span>
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="00000000"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="md:h-12 text-base focus-visible:ring-bluebutton pl-10"
                    />
                    <div
                      className="font-medium text-xl absolute right-3 top-1/2  -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </div>

                    <Lock
                      size={20}
                      className="font-medium text-xl absolute left-3 top-1/2  -translate-y-1/2"
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:-translate-y-4 text-sm flex items-center justify-between">
            <span className="flex  gap-1 items-center text-gray-500">
              <Checkbox />
              Stay signed in
            </span>

            <Button
              variant="ghost"
              className="text-sm text-bluebutton underline hover:bg-transparent"
              type="button"
              onClick={() => {
                setActiveComponent("forgotPassword");
              }}
            >
              Forgot your password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full rounded-sm md:h-11 text-base md:-translate-y-5"
          >
            {loginMutation.isPending ? (
              <Loader className=" animate-spin" />
            ) : (
              " Login"
            )}
          </Button>
        </form>
      </Form>

      <div className=" text-center mt-4 md:mt-10 flex items-center md:mx-14 gap-5">
        <div className="w-full  p-[1px] bg-gray-300" />
        <span className="text-gray-500 font-medium">Or</span>
        <div className="w-full p-[1px] bg-gray-300" />
      </div>

      {/* OAuth */}

      <div className="flex flex-col items-center gap-4 my-4 md:mt-10">
        <Button className="w-full h-12" variant={"outline"}>
          <FcGoogle size={20} />
          Continue with Google
        </Button>
        <Button className="w-full h-12" variant={"outline"}>
          <FaFacebook fill="blue" />
          Continue with Facebook
        </Button>
      </div>

      <div className="md:mt-10  text-center text-gray-500 text-sm">
        By Logining in, you agree to Owneet’s{" "}
        <Link href="" className="text-bluebutton">
          Terms of Use
        </Link>{" "}
        and our{" "}
        <Link href="" className="text-bluebutton">
          Privacy Policy
        </Link>
        .
      </div>
    </section>
  );
};

const ForgotPasswordForm = ({ setActiveComponent }) => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <section>
      <Button variant="ghost" onClick={() => setActiveComponent("login")}>
        <ChevronLeft />
        <p className="text-sm  font-medium text-gray-800 w-ma">Back to login</p>
      </Button>

      <Form {...form} className="">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-8 space-y-2 max-w-[500px] mx-auto mt-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="example@email.com"
                      {...field}
                      type="email"
                      className="md:h-12 text-base focus-visible:ring-bluebutton pl-10"
                    />
                    <span className="font-medium text-xl absolute left-3 top-1/2  -translate-y-1/2">
                      @
                    </span>
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-sm md:h-11 text-base md:-translate-y-5"
          >
            Request
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center text-gray-400 mt-4 md:mt-10">
        Please check your email for the reset email
      </p>
    </section>
  );
};

const RegisterForm = ({ setActiveComponent }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await httpClient.post("/users/register/", userData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        setUserData(data["response data"]);
      } else if (data["response status"] == "failure") {
        setError(data["response data"] || "Registration failed");
      } else {
        setError(data["response description"] || "Registration failed");
      }

      console.log(error);
    },
    onError: (error) => {
      setError(error.message || "Registration failed. Please try again.");
      console.log(error);
    },
  });

  const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one symbol.",
      }),
  });

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values) {
    registerMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className="md:w-[75%] mx-auto md:mt-10">
      {error && (
        <p className=" text-sm text-destructive mb-3">** Error: {error}</p>
      )}
      <Form {...form} className="">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-5 space-y-2"
        >
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name or Brand Name *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Steve Doe"
                      {...field}
                      type="text"
                      className="md:h-12 text-base focus-visible:ring-bluebutton "
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="example@email.com"
                      {...field}
                      type="email"
                      className="md:h-12 text-base focus-visible:ring-bluebutton "
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="00000000"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="md:h-12 text-base focus-visible:ring-bluebutton "
                    />
                    <div
                      className="font-medium text-xl absolute right-3 top-1/2  -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </div>
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:mt-10  text-center text-gray-500 text-sm mb-5">
            By continueing, you agree to Owneet’s{" "}
            <Link href="" className="text-bluebutton">
              Terms of Use
            </Link>{" "}
            and our{" "}
            <Link href="" className="text-bluebutton">
              Privacy Policy
            </Link>
            .
          </div>

          <Button
            type="submit"
            className="w-full rounded-sm md:h-11 text-base "
          >
            {registerMutation.isPending ? (
              <Loader className=" animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>

      <div className="flex  justify-center gap-2 mt-4 md:mt-10 items-center text-sm text-gray-500">
        <p>Already have an account?</p>

        <Button
          className="text-bluebutton underline underline-offset-4"
          variant="ghost"
          onClick={() => setActiveComponent("login")}
        >
          Login
        </Button>
      </div>

      <div className=" text-center mt-4 md:mt-10 flex items-center md:mx-14 gap-5">
        <div className="w-full  p-[1px] bg-gray-300" />
        <span className="text-gray-500 font-medium">Or</span>
        <div className="w-full p-[1px] bg-gray-300" />
      </div>

      {/* OAuth */}

      <div className="flex flex-col items-center gap-4 my-4 md:mt-10">
        <Button className="w-full h-12" variant={"outline"}>
          <FcGoogle size={20} />
          Continue with Google
        </Button>
        <Button className="w-full h-12" variant={"outline"}>
          <FaFacebook fill="blue" />
          Continue with Facebook
        </Button>
      </div>
    </section>
  );
};
