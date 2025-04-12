// "use client";

// import { useState } from "react";
// import LearnWithAI from "@/components/learning/learn-with-ai";
// import SkillsHeader from "@/components/learning/skills-header";
// import YourCourses from "@/components/learning/skills-courses";
// import SearchSkills from "@/components/learning/search-skills";

// export default function SkillsPage() {
//   const [activeView, setActiveView] = useState<"courses" | "search" | "learn">("courses");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [skillToLearn, setSkillToLearn] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState("beginner");
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Mock data for previous courses
//   const previousCourses = [
//     {
//       id: 1,
//       title: "Intermediate UI Design with Figma",
//       level: "Intermediate",
//       lessons: 42,
//       progress: 0,
//     },
//     {
//       id: 2,
//       title: "JavaScript for Beginners: A Comprehensive Guide",
//       level: "Beginner",
//       lessons: 35,
//       progress: 3,
//     },
//   ];

//   // Mock data for skills
//   const skills = [
//     {
//       title: "UI/UX Design",
//       description: "UI/UX designers create user-friendly digital experiences for apps and websites.",
//     },
//     {
//       title: "Graphic Design",
//       description:
//         "Graphic designers craft visual content to communicate messages effectively using typography, imagery, and layout techniques.",
//     },
//     {
//       title: "Web Development",
//       description:
//         "Web developers build and maintain websites, ensuring functionality, performance, and responsiveness.",
//     },
//     {
//       title: "Data Science",
//       description: "Data scientists analyze and interpret complex data to help organizations make better decisions.",
//     },
//     {
//       title: "Digital Marketing",
//       description: "Digital marketers promote products and services using online channels and strategies.",
//     },
//     {
//       title: "Product Management",
//       description: "Product managers oversee the development and strategy of products throughout their lifecycle.",
//     },
//   ];

//   const handleGenerateCourse = () => {
//     setIsGenerating(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsGenerating(false);
//       // Here you would navigate to the generated course
//     }, 2000);
//   };

//   const filteredSkills = skills.filter(
//     (skill) =>
//       skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       skill.description.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const goBackToExplorer = () => {
//     setActiveView("courses");
//   };

//   return (
//     <div className="container mx-auto py-12 px-4 max-w-4xl">
//       <div className="flex flex-col space-y-8">
//         <SkillsHeader activeView={activeView} setActiveView={setActiveView} goBackToExplorer={goBackToExplorer} />

//         {activeView === "courses" && <YourCourses previousCourses={previousCourses} isLoading={false} />}

//         {activeView === "search" && (
//           <SearchSkills
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//             filteredSkills={filteredSkills}
//             setSkillToLearn={setSkillToLearn}
//             setActiveView={setActiveView}
//           />
//         )}

//         {activeView === "learn" && (
//           <LearnWithAI
//             skillToLearn={skillToLearn}
//             setSkillToLearn={setSkillToLearn}
//             selectedLevel={selectedLevel}
//             setSelectedLevel={setSelectedLevel}
//             handleGenerateCourse={handleGenerateCourse}
//             isGenerating={isGenerating}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

import ComingSoonPage from "@/components/coming-soon";

export default function Page() {
    return (
        <ComingSoonPage />
    );
}