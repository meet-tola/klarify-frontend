"use client";
import { useAuthContext } from "@/context/auth-provider";
import { slugify } from "@/lib/slugify";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { slug } = useParams();
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user && slugify(user.user.pickedSkill) !== slug) {
      router.push("/my-learning");
    }
  }, [user, slug]);

  return <div>Page</div>;
}
