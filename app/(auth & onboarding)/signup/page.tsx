"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"; // Import Loader2
import { motion } from "framer-motion";
import LoadingScreen from "@/components/loading-screen";
import OnboardingNavbar from "@/components/onboarding/onboarding-navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupFormData,
} from "@/validation/auth.validation";
import { register } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth-provider";
import JourneyDialog from "@/components/journey-dialog";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      if (
        user.user?.verificationCode &&
        !isNaN(Number(user.user?.verificationCode))
      ) {
        router.push("/verify-email");
        return;
      }

      // Check if all fields are null or empty except pickedSkill
      const isAllNullExceptPickedSkill =
        (!user.user?.skillsAssessment ||
          user.user.skillsAssessment.length === 0) &&
        (!user.user?.selectedSkills || user.user.selectedSkills.length === 0) &&
        (!user.user?.careerAssessment ||
          user.user.careerAssessment.length === 0) &&
        (!user.user?.learningPath || user.user.learningPath.length === 0) &&
        user.user?.pickedSkill;

      if (isAllNullExceptPickedSkill) {
        router.push("/roadmap");
        return;
      }

      // If no pickedSkill and skillsAssessment and careerAssessment is empty, open dialog
      if (
        !user.user?.pickedSkill &&
        (!user.user?.skillsAssessment ||
          user.user.skillsAssessment.length === 0) &&
        (!user.user?.careerAssessment ||
          user.user.careerAssessment.length === 0)
      ) {
        // setIsDialogOpen(true);
        router.push("/roadmap");
        return;
      }

      // If the user no pickedSkill and skills Assessment, go to step two
      if (!user.user?.pickedSkill && user.user?.skillsAssessment?.length > 0) {
        router.push("/onboarding?step=two");
        return;
      }

      // If the user has pickedSkill but no selectedSkills, go to roadmap
      if (
        user.user?.pickedSkill &&
        (!user.user?.selectedSkills || user.user.selectedSkills.length === 0)
      ) {
        router.push("/roadmap");
        return;
      }

      // If the user has picked a skill but hasn't completed the career assessment, redirect to step three
      if (
        user.user?.pickedSkill &&
        user.user?.selectedSkills?.length > 0 &&
        (!user.user?.careerAssessment ||
          user.user.careerAssessment.length === 0)
      ) {
        router.push("/onboarding?step=three");
        return;
      }

      // If the user has completed the career assessment but hasn't set up a learning path, redirect to step four
      if (
        user.user?.pickedSkill &&
        user.user?.selectedSkills?.length > 0 &&
        user.user?.careerAssessment?.length > 0 &&
        (!user.user?.learningPath || user.user.learningPath.length === 0)
      ) {
        router.push("/onboarding?step=four");
        return;
      }

      // If all steps are completed, redirect to the roadmap
      router.push("/my-learning");
    }
  }, [user, router]);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    try {
      await register(data);
      toast.success("Account created, check you mail.");
      window.location.href = '/verify-email';
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Dialog for skill selection */}
      {/* <JourneyDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          router.push("/onboarding?step=one");
        }}
      /> */}

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-sm space-y-8 bg-white p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-3xl font-bold roca-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Klarify your Career
            </motion.h1>
            <motion.p
              className="mt-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              To begin, you must create an account through a simple and
              intuitive signup process.
            </motion.p>
          </div>

          <motion.form
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                placeholder="Tola"
                {...formRegister("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Tola@klarify.com"
                {...formRegister("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...formRegister("password")}
                  className={errors.password ? "border-destructive" : ""}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
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
                  {...formRegister("confirmPassword")}
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" /> // Show spinner when loading
                ) : (
                  "Create an account"
                )}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
