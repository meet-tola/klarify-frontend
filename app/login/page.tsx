"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2, Verified } from "lucide-react"; // Import Loader2
import OnboardingNavbar from "@/components/onboarding-navbar";
import LoadingScreen from "@/components/loading-screen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/validation/auth.validation";
import { login as loginAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth-provider";
import JourneyDialog from "@/components/journey-dialog";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userId = user?.user._id;

  useEffect(() => {
    if (user) {
      // Check if all fields are null or empty except pickedSkill
      const isAllNullExceptPickedSkill =
        (!user.user?.skillsAssessment || user.user.skillsAssessment.length === 0) &&
        (!user.user?.selectedSkills || user.user.selectedSkills.length === 0) &&
        (!user.user?.careerAssessment || user.user.careerAssessment.length === 0) &&
        (!user.user?.learningPath || user.user.learningPath.length === 0) &&
        user.user?.pickedSkill; 
  
      if (isAllNullExceptPickedSkill) {
        router.push("/roadmap"); 
        return;
      }
  
      // If no pickedSkill and skillsAssessment is empty, open dialog
      if (
        !user.user?.pickedSkill &&
        (!user.user?.skillsAssessment || user.user.skillsAssessment.length === 0)
      ) {
        setIsDialogOpen(true);
        return;
      }
  
      // If the user has both pickedSkill and selectedSkills, go to step two
      if (user.user?.pickedSkill && user.user?.selectedSkills?.length > 0) {
        router.push("/onboarding?step=two");
        return;
      }
  
      // If the user has pickedSkill but no selectedSkills, go to roadmap
      if (user.user?.pickedSkill && (!user.user?.selectedSkills || user.user.selectedSkills.length === 0)) {
        router.push("/roadmap");
        return;
      }
  
      // If the user has picked a skill but hasn't completed the career assessment, redirect to step three
      if (!user.user?.careerAssessment || user.user.careerAssessment.length === 0) {
        router.push("/onboarding?step=three");
        return;
      }
  
      // If the user has completed the career assessment but hasn't set up a learning path, redirect to step four
      if (!user.user?.learningPath || user.user.learningPath.length === 0) {
        router.push("/onboarding?step=four");
        return;
      }
  
      // If all steps are completed, redirect to the dashboard
      router.push("/dashboard");
    }
  }, [user, router]);  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => { 
    setIsLoading(true);
  
    try {
      const loggedInUser = await loginAPI(data);
  
      // If the user has a verification code, redirect to the email verification page
      if (
        loggedInUser.user?.verificationCode &&
        !isNaN(Number(loggedInUser.user?.verificationCode))
      ) {
        router.push("/verify-email");
        return;
      }
  
      // Set the logged-in user in state
      setUser(loggedInUser);
  
      toast.success("Login Successful");
  
      // Check if all fields are null or empty except pickedSkill
      const isAllNullExceptPickedSkill =
        (!loggedInUser.user?.skillsAssessment || loggedInUser.user.skillsAssessment.length === 0) &&
        (!loggedInUser.user?.selectedSkills || loggedInUser.user.selectedSkills.length === 0) &&
        (!loggedInUser.user?.careerAssessment || loggedInUser.user.careerAssessment.length === 0) &&
        (!loggedInUser.user?.learningPath || loggedInUser.user.learningPath.length === 0) &&
        loggedInUser.user?.pickedSkill; // pickedSkill is set
  
      if (isAllNullExceptPickedSkill) {
        router.push("/roadmap"); // Redirect to roadmap
        return;
      }
  
      // If no pickedSkill and skillsAssessment is empty, open dialog
      if (
        !loggedInUser.user?.pickedSkill &&
        (!loggedInUser.user?.skillsAssessment || loggedInUser.user.skillsAssessment.length === 0)
      ) {
        setIsDialogOpen(true);
        return;
      }
  
      // If the user has both pickedSkill and selectedSkills, go to step two
      if (loggedInUser.user?.pickedSkill && loggedInUser.user?.selectedSkills?.length > 0) {
        router.push("/onboarding?step=two");
        return;
      }
  
      // If the user has pickedSkill but no selectedSkills, go to roadmap
      if (loggedInUser.user?.pickedSkill && (!loggedInUser.user?.selectedSkills || loggedInUser.user.selectedSkills.length === 0)) {
        router.push("/roadmap");
        return;
      }
  
      // If the user has picked a skill but hasn't completed the career assessment, redirect to step three
      if (!loggedInUser.user?.careerAssessment || loggedInUser.user.careerAssessment.length === 0) {
        router.push("/onboarding?step=three");
        return;
      }
  
      // If the user has completed the career assessment but hasn't set up a learning path, redirect to step four
      if (!loggedInUser.user?.learningPath || loggedInUser.user.learningPath.length === 0) {
        router.push("/onboarding?step=four");
        return;
      }
  
      // If all steps are completed, redirect to the dashboard
      router.push("/dashboard");
  
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <>
      <JourneyDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          router.push("/roadmap")
        }}
        userId={userId}
      />
      <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
        <OnboardingNavbar />

        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div
            className="w-full max-w-sm space-y-8 bg-white p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {" "}
            <div className="text-center">
              <motion.h1
                className="text-3xl font-bold roca-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back
              </motion.h1>
              <motion.p
                className="mt-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Sign in to continue your career journey.
              </motion.p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
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
                    {...register("password")}
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

              <div className="text-sm text-right">
                <Link
                  href="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
              </Button>
            </form>
            <div className="text-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
