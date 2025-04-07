"use client";

import Link from "next/link";
import { ArrowRight, BookText, FolderKanban, Layers } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";
import { slugify } from "@/lib/slugify";

export function ActionCards() {
  const { user } = useAuthContext();

  const cards = [
    {
      icon: <BookText />,
      title: "Continue Learning",
      description: "Resume your current tutorial or course",
      href: user?.user.pickedSkill
        ? `/my-learning/${slugify(user.user.pickedSkill)}/content`
        : "#",
    },
    {
      icon: <FolderKanban />,
      title: "View Projects",
      description: "View your projects and milestones",
      href: user?.user.pickedSkill
        ? `/my-learning/${slugify(user.user.pickedSkill)}/projects`
        : "#",
    },
    {
      icon: <Layers />,
      title: "Explore Resources",
      description: "Discover curated tutorials, articles and videos",
      href: user?.user.pickedSkill
        ? `/my-learning/${slugify(user.user.pickedSkill)}`
        : "#",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Link
          key={index}
          href={card.href}
          className="block p-6 border rounded-lg hover:border-primary bg-white hover:bg-muted"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {card.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </div>
  );
}