"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/validation/auth.validation";
import { validateResetToken, completePasswordReset } from "@/lib/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const params = useParams();
  const router = useRouter();

  const token = Array.isArray(params.token) ? params.token[0] : params.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        router.push("/reset-password");
        return;
      }

      try {
        await validateResetToken(token);
        setIsValidToken(true);
      } catch (error: any) {
        toast.error("Invalid token", {
          description: "The reset link is invalid or has expired.",
        });
        router.push("/reset-password");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, router]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    setIsLoading(true);
    try {
      await completePasswordReset({ token, newPassword: data.newPassword });
      toast.success("Password reset", {
        description: "Your password has been updated successfully.",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Error resetting password", {
        description: error?.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!isValidToken) {
    return null; // Already handled by useEffect
  }

  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-sm space-y-8 bg-white p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <Image
            src="/assets/key.svg"
            alt="New Password"
            width={130}
            height={34}
          />
        </div>

        <div className="text-center">
          <motion.h1
            className="text-3xl font-bold roca-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            New Password
          </motion.h1>
          <motion.p
            className="mt-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Create a new password for your account
          </motion.p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password*</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("newPassword")}
                className={errors.newPassword ? "border-destructive" : ""}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password*</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Reset Password"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm">
            Remember your password?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
}