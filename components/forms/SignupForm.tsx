"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    setServerError(null);

    if (data.email === "test@gmail.com") {
      setServerError("Email already exists");
      return;
    }

    router.push("/signin");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 lg:min-w-lg min-w-md  mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h1 className="text-2xl font-semibold text-center">Create Account</h1>

      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <Input placeholder="John" {...register("firstName")} />
        {errors.firstName && (
          <p className="text-sm text-red-600 mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <Input placeholder="Doe" {...register("lastName")} />
        {errors.lastName && (
          <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
        )}
      </div>

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
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        <p className="text-sm text-slate-600 text-center mt-2">
          Already have an account?{" "}
          <Link href="/signin" className="text-sky-600 hover:underline">
            Signin
          </Link>
        </p>
      </div>

      {serverError && <div className="text-sm text-red-600">{serverError}</div>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
}
