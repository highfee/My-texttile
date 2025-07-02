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
import { ChevronLeft, Copy, Eye, EyeOff, Loader, Lock, X } from "lucide-react";
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
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/httpClient";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/authService";
import { useRegisterStore } from "@/store/registerStore";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { GiCheckMark } from "react-icons/gi";

const plans = [
  {
    title: "Free plan",
    price: "0",
    description:
      "Your Creative Starting Point. A solid foundation for new creators.",
    features: [
      <>
        ✔ <strong>Access</strong> to product creation tools (print-on-demand)
      </>,
      "✔ Ability to list products in the store",
      "✔ Limited design amount peaked at 10 designs max",
    ],
    buttonText: "Active",
    isActive: true,
    badge: null,
    isPopular: false,
    idealFor: "Ideal For: Hobbyists",
  },
  {
    title: "Tier 2",
    price: "19",
    description: "Sell 10 products, or $200 in total revenue",
    features: [
      "✔ Everything from the Starter Creator tier",
      <>
        ✔ <strong>25 designs</strong> max
      </>,
      "✔ Access to the Affiliate Program",
      "✔ Access to advanced design features",
      "✔ Enhanced analytics dashboard",
      "✔ Early access to new platform features",
    ],
    buttonText: "Buy this plan for $19",
    isActive: false,
    badge: "Emerging Creator",
    isPopular: true,
    idealFor: "Ideal For: Entrepreneurs",
  },
  {
    title: "Tier 3",
    price: "69.99",
    description: "$1000 in total sales or 50 products sold.",
    features: [
      "✔ Everything from the Emerging Creator tier",
      <>
        ✔ <strong>Unlimited</strong> designs
      </>,
      "✔ Ability to set promotional prices and create discount codes",
      "✔ Featured on platform as a top creator in relevant categories",
    ],
    buttonText: "Buy this plan for $69.99",
    isActive: false,
    badge: "Pro Creator",
    isPopular: false,
    idealFor: "Ideal For: Enterprises",
  },
];

const Auth_Dailog = () => {
  const [activeComponent, setActiveComponent] = useState("pricing");

  return (
    <>
      <AlertDialogContent
        className={cn(
          "max-w-[90%] md:max-w-[850px] md:min-w-[650px] lg:min-w-[950px] max-h-[95vh]  overflow-auto",
          { "p-0": ["checkout"].includes(activeComponent) }
        )}
      >
        {!["pricing", "checkout"].includes(activeComponent) && (
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
                    Use your email or another service to continue with MyTextil
                    (It
                    {"'"}s free)
                  </small>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
        )}

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

          {activeComponent === "confirmation" && (
            <Confirmation setActiveComponent={setActiveComponent} />
          )}

          {activeComponent === "pricing" && (
            <Pricing setActiveComponent={setActiveComponent} />
          )}

          {activeComponent === "checkout" && (
            <Checkout setActiveComponent={setActiveComponent} />
          )}
        </section>

        {!["pricing", "checkout"].includes(activeComponent) && (
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
        )}
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
              <Checkbox id="stay" />
              <Label htmlFor="stay">Stay signed in</Label>
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
        By Logging in, you agree to MyTextil’s{" "}
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

  const { setUserData } = useRegisterStore();

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await httpClient.post("/users/register/", userData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        setUserData(data["response data"]);
        setActiveComponent("confirmation");
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
            By continuing, you agree to MyTextil’s{" "}
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
            disabled={registerMutation.isPending}
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

const Confirmation = ({ setActiveComponent }) => {
  const [resendTimer, setResendTimer] = useState(300);
  const { UserData } = useRegisterStore();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const confirmCodeMutation = useMutation({
    mutationFn: async (data) => {
      const response = await httpClient.post("/users/activate/", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        setActiveComponent("pricing");
      } else {
        setError(data["response description"] || "Invalid or expired code");
      }
    },
    onError: (error) => {
      setError(error.message || "Invalid or expired code");
      console.log(error);
    },
  });
  const codeSchema = z.object({
    code: z.string().min(6, { message: "Code have to be 6 character." }),
  });

  const form = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });
  console.log(UserData);

  function onSubmit(values) {
    const res = {
      code: values.code,
      user_id: UserData.id,
      resend_code: false, // Set to true if you want to resend the code
    };

    confirmCodeMutation.mutate(res);
  }

  const handleResendCode = () => {
    setResendTimer(24); // Reset the timer

    confirmCodeMutation.mutate({
      user_id: UserData.id,
      resend_code: true, // Indicate that this is a resend request
    });
  };
  // Helper to format seconds as mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <section>
      <div>
        <h2 className="text-gray-600 text-xl font-medium">
          Let's finalize your account
        </h2>
        <p className="text-sm mt-1 text-gray-500">
          Enter the code we sent to your email address
        </p>
      </div>

      <Form {...form} className="">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-6 space-y-2 max-w-[500px] mx-auto mt-10 -translate-y-5"
        >
          {confirmCodeMutation.isError && (
            <p className="text-[#FF5789] text-[10px] lg:text-[14px] ">
              **{confirmCodeMutation.error.message || "Invalid or expired code"}
            </p>
          )}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="000000"
                      {...field}
                      type="text"
                      className="md:h-12 text-base focus-visible:ring-bluebutton pl10"
                    />
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
            {confirmCodeMutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>

          <div className="flex justify-between items-center text-sm md:-translate-y-5">
            <Button
              className=" text-sm  hover:bg-transparent"
              variant="ghost"
              type="button"
            >
              Didn’t get a code?{" "}
              {resendTimer > 0 ? (
                <span className="text-blue">{formatTime(resendTimer)}</span>
              ) : (
                <span
                  className="font-medium text-blue cursor-pointer"
                  onClick={handleResendCode}
                >
                  Resend
                </span>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="text-bluebutton underline underline-offset-4 hover:bg-transparent"
              onClick={() => setActiveComponent("login")}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-sm text-center text-gray-400 mt-4 md:mt-10">
        Please check your email for the confirmation email
      </p>
    </section>
  );
};

const Pricing = ({ setActiveComponent }) => {
  const [monthly, setMonthly] = useState(true);
  return (
    <section>
      <header className="fle items-center justify-between relative">
        <span> </span>
        <p className="font-semibold text-2xl text-center">
          Upgrade to enjoy the best of MyTextil
        </p>
        <Button
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "text-gray-500 bg-transparent shadow-none hover:bg-transparent border-0 absolute top-0 right-0"
          )}
          onClick={() => setActiveComponent("login")}
        >
          Skip
        </Button>
      </header>

      <p className="text-gray-600 text-center mt-3  text-xs">
        Tier 2 offers you the best of our platform and fuels your dreams
      </p>

      <div className="flex items-center justify-center mt-11 gap-10 text-sm text-gray-500">
        <p className={cn({ "font-semibold text-gray-800": monthly })}>
          Monthly
        </p>
        <Switch
          className="data-[state=checked]:bg-bluebutton"
          onCheckedChange={() => setMonthly(!monthly)}
        />
        <p className={cn({ "font-semibold text-gray-800": !monthly })}>
          Annually
        </p>
      </div>

      {/* plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {/* {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))} */}
        <PlanCard
          title="Free plan"
          subtitle="Starter Creator"
          price="$0"
          description="Your Creative Starting Point: A solid foundation for new creators."
          heading="Basic Design Tools"
          features={[
            "Access to product creation tools (print-on-demand)",
            "Ability to list products in the store",
            <>
              Limited designs amount peaked at{" "}
              <spam span className="font-bold text-black">
                10 designs max
              </spam>{" "}
              .
            </>,
          ]}
          idealFor="hobbyists"
          buttonText="Active"
          tier="tier1"
          buttonDisabled={false}
          onClick={() => setActiveComponent("login")}
        />

        <PlanCard
          title="Tier 2"
          subtitle="Emerging Creator"
          price={`$${monthly ? "19" : "200"}`}
          description="Your Creative Starting Point: A solid foundation for new creators."
          heading="Sell 10 products, or $200 in total revenue"
          features={[
            <>
              Everything from the{" "}
              <span className="font-bold text-black">
                Starter creator tier.
              </span>
            </>,
            <span className="font-bold text-black">25 designs max</span>,
            "Access to Affiliate Program",
            "Access to advanced design features",
            "Enhanced analytics dashboard",
            "Early access to new platform features",
          ]}
          idealFor="Entrepreneurs"
          buttonText={`Buy this plan for $${monthly ? "19" : "200"}`}
          tier="tier2"
          extraText="OR"
          onClick={() => setActiveComponent("checkout")}
        />

        <PlanCard
          title="Tier 3"
          subtitle="Pro Creator"
          price={`$${monthly ? "69.99" : "899"}`}
          description="Your Creative Starting Point: A solid foundation for new creators."
          heading="$1000 in total sales or 50 products sold."
          features={[
            <>
              Everything from{" "}
              <span className="font-bold text-black">
                Emerging Creator tier.
              </span>
            </>,
            "Unlimited design",
            "Ability to set promotional prices and create discount sales codes",
            "Featured on platform as a top creator in relevant categories",
          ]}
          idealFor="Enterprises"
          buttonText={`Buy this plan for $${monthly ? "69.99" : "899"}`}
          tier="tier3"
          extraText="OR"
          onClick={() => setActiveComponent("checkout")}
        />
      </div>
    </section>
  );
};

function PlanCard({
  title,
  subtitle,
  price,
  description,
  features,
  idealFor,
  buttonText,
  buttonDisabled,
  tier,
  heading,
  extraText,
  onClick,
}) {
  return (
    <div className="rounded-lg flex flex-col items-center text-center">
      <div
        className={`rounded-lg w-full p-4 h-[256px] flex flex-col justify-between ${
          tier === "tier2" ? "bg-bluebutton" : "bg-bluebg"
        }`}
      >
        <div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col text-left">
              <p
                className={`text-[14px] font-semibold ${
                  tier === "tier2" ? "text-white" : "text-black"
                }`}
              >
                {title}
              </p>
              <p
                className={`text-graycolor opacity-[0.44] text-[13px] ${
                  tier === "tier2" ? "text-white" : "text-black"
                }`}
              >
                {subtitle}
              </p>
            </div>
            <h4
              className={`text-3xl font-bold ${
                tier === "tier2" ? "text-white" : "text-black"
              }`}
            >
              {price}
            </h4>
          </div>

          <div className="flex flex-col items-start w-full text-left py-6 tracking-[-1px] leading-[19.6px]">
            <p
              className={`text-[13px] opacity-[0.44] ${
                tier === "tier2" ? "text-white" : "text-black"
              }`}
            >
              {description}
            </p>
            <p
              className={`text-[14px] font-semibold ${
                tier === "tier2" ? "text-white" : "text-black"
              }`}
            >
              {heading}
            </p>
          </div>

          {extraText && (
            <p
              className={`text-[12px] font-medium  ${
                tier === "tier2" ? "text-white" : "text-black"
              }`}
            >
              {extraText}
            </p>
          )}
        </div>

        {/* Button with Conditional Styling */}
        <button
          className={cn("w-full rounded-sm h-9 text-sm cursor-pointer", {
            "bg-[#898F95] text-white ": tier === "tier1",
            "bg-white text-gray-900 ": tier === "tier2",
            "bg-black text-white ": tier === "tier3",
          })}
          disabled={buttonDisabled}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
      <ul className="text-sm text-gray-600 space-y-2 mt-4 text-left w-full">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div>
              <GiCheckMark className="text-black mr-2" />
            </div>
            <p>{feature}</p>
          </li>
        ))}
        <li className="text-graycolor opacity-[0.44]">Ideal For: {idealFor}</li>
      </ul>
    </div>
  );
}

const Checkout = ({ setActiveComponent }) => {
  const [method, setMethod] = useState("card");
  return (
    <section className="grid grid-cols-5 grid-rows-6 min-h-[650px]">
      <div className="col-span-3 row-span-6 p-7 py-7 flex flex-col justify-between gap-10">
        <div>
          <p className="font-bold text-2xl text-gray-900">Checkout</p>
          <p className="text-xs text-gray-600 my-4">
            Complete your subscription payment quickly and securely. Choose your
            preferred payment methods.
          </p>

          <div className="flex justify-between items-center gap-5">
            <Button
              className={cn("h-12", {
                "border-2 border-bluebutton": method === "card",
              })}
              variant="outline"
              onClick={() => setMethod("card")}
            >
              <Image
                src={"/signup/mastercard.svg"}
                alt=""
                height={20}
                width={20}
              />
              Card Payment
            </Button>
            <Button
              className={cn("h-12", {
                "border-2 border-bluebutton": method === "crypto",
              })}
              variant="outline"
              onClick={() => setMethod("crypto")}
            >
              <Image src={"/signup/crypto.svg"} alt="" height={20} width={20} />
              Pay with crypto
            </Button>
            <Button
              className={cn("h-12", {
                "border-2 border-bluebutton": method === "paypal",
              })}
              variant="outline"
              onClick={() => setMethod("paypal")}
              disabled
            >
              <Image src={"/signup/paypal.svg"} alt="" height={20} width={20} />
              Paypal
            </Button>
          </div>
        </div>

        {/* card details */}
        {method === "card" && (
          <div className="">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <Label>Credit card number</Label>
                <Input
                  placeholder="xxxx   -   xxxx   -   xxx   -   xxxx "
                  className="h-12 text-base focus-visible:ring-bluebutton "
                />
              </div>
              <div>
                <Label>Exp. date</Label>
                <Input
                  placeholder="12/27"
                  className="h-12 text-base focus-visible:ring-bluebutton"
                />
              </div>

              <div>
                <Label>CVV</Label>
                <Input
                  placeholder="****"
                  className="h-12 text-base focus-visible:ring-bluebutton"
                />
              </div>
            </div>
          </div>
        )}

        {method === "crypto" && (
          <div className="grid place-items-center gap-5">
            <p className="text-sm text-gray-600 ">Scan to make Payment</p>
            <Image
              src={"/signup/qr.svg"}
              alt="crypto-qr"
              height={150}
              width={150}
            />

            <div className="flex items-center gap-2">
              <p className="text-sm text-blue max-w-[240px] overflow-clip overflow-ellipsis">
                0xfd6423ca76a0bb9520c7f8c8969156cd17ef3g3h3j4jkkk4l6l6lllbhgy5n6k
              </p>

              <span className="flex items-center gap-1 cursor-pointer text-xs bg-gray-100 text-gray-500 p-0.5 px-1 rounded-md hover:bg-gray-200">
                <Copy size={10} className="text-gray-500" onClick={() => {}} />
                <p>Copy</p>
              </span>
            </div>

            <Button variant="ghost" className="text-base">
              Connect Wallet
            </Button>
          </div>
        )}

        <div>
          <p className="text-gray-700 text-lg font-medium mb-4">
            Order Summary
          </p>
          <div className="font-bold text-sm flex justify-between items-center mb-3">
            <p>Tier 3- Pro Creator</p>
            <p>{"a"}</p>
          </div>
          <div className="font-bold text-sm flex justify-between items-center">
            <p>Tax/fees</p>
            <p>{"a"}</p>
          </div>

          <Button className="w-full h-12 my-5 text-lg font-light">
            Make Payment
          </Button>
        </div>
      </div>

      {/*  */}
      <div className="col-span-2 row-span-2 bg-black"></div>

      {/*  */}
      <div className="col-span-2 row-span-4 bg-[#F2F8FD]"></div>
    </section>
  );
};
