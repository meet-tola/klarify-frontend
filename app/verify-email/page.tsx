"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/onboarding-navbar";
import LoadingScreen from "@/components/loading-screen";
import { verificationSchema } from "@/validation/auth.validation";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { verifyEmail as verifyEmailAPI } from "@/lib/api";
import JourneyDialog from "@/components/journey-dialog";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      setErrorMessage("");

      await verifyEmailAPI({ code });

      setIsLoading(false);
      setIsDialogOpen(true);
    } catch (error: any) {
      if (error.errors?.[0]?.message) {
        setErrorMessage(error.errors[0].message);
      } else {
        setErrorMessage("Invalid verification code.");
      }
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen message="Verifying your email..." />
    );
  }

  return (
    <>
      <JourneyDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          router.push("/onboarding?step=one");
        }}
      />

      <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
        <Navbar />

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
              <h1 className="text-3xl font-bold roca-bold">
                Verify Your Email
              </h1>
              <p className="mt-2 text-muted-foreground">
                Enter the 6-digit code we sent to your email.
              </p>
            </div>

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
                  className="w-12 h-12 text-center text-lg font-bold"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {errorMessage && (
              <p className="text-sm text-destructive text-center">
                {errorMessage}
              </p>
            )}

            <Button onClick={handleVerify} className="w-full">
              Verify Email
            </Button>

            <div className="text-center">
              <p className="text-sm">
                Didn't get the code?{" "}
                <button
                  onClick={() => setVerificationCode(Array(6).fill(""))}
                  className="text-primary hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
