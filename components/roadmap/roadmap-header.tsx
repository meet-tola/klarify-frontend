export interface RoadmapHeaderProps {
    selectedSkill: string | null
  }
  
  export default function RoadmapHeader({ selectedSkill }: RoadmapHeaderProps) {
    return (
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold roca-bold mb-2">Your Learning Roadmap</h1>
        <p className="text-muted-foreground">
          {selectedSkill
            ? `Personalized learning path for your ${selectedSkill} journey`
            : "Discover your personalized learning path"}
        </p>
      </div>
    )
  }
  