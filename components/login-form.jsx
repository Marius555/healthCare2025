"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginResolver from "@/resolvers/loginResolver";
import { Loader2 } from "lucide-react";
import { loginWithEmail } from "@/appWrite";
import { useState } from "react";
import AnimatedError from "./ui/animatedError";
import { useRouter } from "next/navigation";
import { AppwriteLoginServer } from "@/appwriteUtils/appwriteLoginServer";

export function LoginForm({ className, ...props }) {
  const router = useRouter()
  const [isLogin, setisLogin] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting,  },
  } = useForm({ resolver: yupResolver(loginResolver), mode: "onChange" });
  const [responseError, setresponseError] = useState(null)

  const login = async (values) => {
    setisLogin(true)
    const req = await AppwriteLoginServer(values);
    if (req.success && req.type && req.collectionId) {
      router.push(`/auth/${req.type}/dashboard/${req.collectionId}`);
    }
    else{
      setresponseError(req.message)
      setisLogin(false)
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(login)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-neutral-500 dark:text-neutral-400">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
            required
            {...register("email")}
          />
        </div>
        <AnimatedError error={errors?.email?.message}/>
        <div className="grid gap-4">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            {...register("password")}
            placeholder="Your password"
          />
          <AnimatedError error={errors?.password?.message}/>
        </div>

        <Button disabled={isLogin} type="submit" className="w-full">
          {isLogin ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>

        <AnimatedError error={responseError}/>
        
        <div className="relative flex items-center justify-center text-sm">
          <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
          <span className="z-10 bg-dark px-2 dark:bg-neutral-950 dark:text-white">
            Or continue with
          </span>
          <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
        </div>

        <Button variant="outline" className="w-full bg-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 3.22 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 1.606-.015 2.896-.015 3.286 .315.21.69.825.57C20.565 22.092 24 17.592 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/registration" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
