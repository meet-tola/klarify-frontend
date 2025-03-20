import { ArrowRight } from "lucide-react";

export default function AnimatedButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="group relative inline-flex items-center overflow-hidden">
      {/* Button text */}
      <span className="relative z-10 pr-14 pl-4 py-2 text-slate-900 font-medium transition-colors duration-300 ease-in-out group-hover:text-white">
        {children}
      </span>

      {/* Arrow container - always dark */}
      <span className="absolute z-20 right-0 top-0 flex items-center justify-center w-10 h-full bg-slate-900 rounded-full">
        <ArrowRight className="h-4 w-4 text-white" />
      </span>

      {/* Expanding background */}
      <span className="absolute right-0 top-0 bottom-0 w-10 bg-slate-900 rounded-full transition-all duration-300 ease-in-out group-hover:w-full -z-0"></span>
    </div>
  );
}
