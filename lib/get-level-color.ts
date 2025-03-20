export const getLevelColor = (level: any) => {
    switch (level) {
      case "Beginner":
        return "text-blue-800";
      case "Intermediate":
        return "text-yellow-800";
      case "Advanced":
        return "text-red-800";
      default:
        return "text-gray-800";
    }
  };