import Link from "next/link";

export default function FeaturesBanner() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
            New
          </span>
          <span className="font-medium">Features Discussion</span>
        </div>
        <p className="text-sm text-muted-foreground flex-1">
          The learning content and a new feature in "Feature Discussion" can be
          explain the material problem chat.
        </p>
        <Link href="/details" className="text-sm text-primary hover:underline">
          Go to details →
        </Link>
      </div>
    </div>
  );
}
