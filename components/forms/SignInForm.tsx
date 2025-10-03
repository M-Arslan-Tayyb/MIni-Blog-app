"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SigninForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInSchema) => {
    setServerError(null);

    if (data.email === "test@gmail.com" && data.password === "password") {
      Cookies.set("authUser", data.email, { expires: 1 });

      router.push("/dashboard");
    } else {
      setServerError("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 min-w-md mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h1 className="text-2xl font-semibold text-center">Sign In</h1>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
        <p className="text-sm text-slate-600 text-center mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-sky-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>

      {serverError && <div className="text-sm text-red-600">{serverError}</div>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
