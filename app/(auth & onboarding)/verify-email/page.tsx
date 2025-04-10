"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { verificationSchema } from "@/validation/auth.validation";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  verifyEmail as verifyEmailAPI,
  resendVerificationCode,
} from "@/lib/api";
import JourneyDialog from "@/components/journey-dialog";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isResending, setIsResending] = useState(false);

  const userId = user?.user._id;


  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updatedCode = [...verificationCode];
    updatedCode[index] = value.slice(-1);
    setVerificationCode(updatedCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const updatedCode = pastedData.split("");
    setVerificationCode(updatedCode);
    inputRefs.current[Math.min(updatedCode.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const code = verificationCode.join("");

    try {
      verificationSchema.parse({ code });
      setIsLoading(true);
      await verifyEmailAPI({ code });
      toast.success("Email verified successfully!");
      // setIsDialogOpen(true);
      router.push("/roadmap");
    } catch (error: any) {
      toast.error(error?.message || "Please check your code and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await resendVerificationCode();
      toast.success("Verification code resent!", {
        description: "Check your email for the new code.",
      });
    } catch (error: any) {
      toast.error("Failed to resend code", {
        description: "Please try again later.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {/* <JourneyDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          router.push("/roadmap");
        }}
        userId={userId}
      /> */}

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 bg-white p-6 rounded-lg">
          {/* SVG Illustration */}
          <div className="flex justify-center">
            <Image
              src="/assets/jumping.svg"
              alt="Info Illustration"
              width={130}
              height={34}
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold roca-bold">Verify Your Email</h1>
            <p className="mt-2 text-muted-foreground">
              Enter the 6-digit code we sent to your email.
            </p>
          </div>

          {/* Verification Code Inputs */}
          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-bold" // Responsive sizing
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Verify Email"}
          </Button>

          <div className="text-center">
            <p className="text-sm">
              Didn't get the code?{" "}
              <button
                onClick={handleResendCode}
                className="text-primary hover:underline"
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
