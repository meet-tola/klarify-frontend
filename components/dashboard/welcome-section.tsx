"use client";

import { motion } from "framer-motion";
import { useAuthContext } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function WelcomeSection() {
  const { user } = useAuthContext();
  const router = useRouter();
  
  useEffect(() => {
    if (!user?.user?.learningPath || user?.user.learningPath.length === 0) {
      router.push("/roadmap");
    }
  }, [user, router]);

  return (
    <div>
      <motion.h1
        className="text-3xl font-bold roca-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome, {user?.user.name}
        <span role="img" aria-label="waving">
          👋
        </span>
      </motion.h1>
      <motion.p
        className="mt-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        You're mastering {user?.user.learningPath[0].skill}! Keep going!
      </motion.p>
    </div>
  );
}
