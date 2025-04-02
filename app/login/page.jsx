import { GalleryVerticalEnd } from "lucide-react"
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/login-form"
import Link from "next/link";
export default function LoginPage() {
  return (
    (<div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">
              <ArrowLeft size={20} />
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
        
      </div>
      <div className="relative hidden bg-neutral-100 lg:block dark:bg-neutral-800">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>)
  );
}
