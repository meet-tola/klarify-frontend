export type loginType = { email: string; password: string };
export type LoginResponseType = {
  message: string;
  user: {
    _id: string;
    currentWorkspace: string;
  };
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

// USER TYPE
export type UserType = {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  lastLogin: Date | null;
  verificationCode?: string;
  skillsAssessment: {
    questionId: string;
    answer: string;
  }[];
  selectedSkills: string[];
  pickedSkill?: string;
  careerAssessment: {
    questionId: string;
    answer: string;
  }[];
  learningPath: {
    skill?: string;
    level?: string;
    steps?: string[];
    youtubeVideos?: {
      title: string;
      url: string;
      thumbnail: string;
    }[];
    articles?: {
      title: string;
      url: string;
      author: string;
    }[];
    projects?: {
      name: string;
      description: string;
      features: string[];
    }[];
    roadmap?: string; 
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export type CurrentUserResponseType = {
  message: string; 
  user: {
    _id: string;
    name: string;
    email: string;
    isActive: boolean;
    lastLogin: Date | null;
    verificationCode?: string;
    skillsAssessment: {
      questionId: string;
      answer: string;
    }[];
    selectedSkills: string[];
    pickedSkill?: string | null; 
    careerAssessment: {
      questionId: string;
      answer: string;
    }[];
    learningPath: {
      skill?: string;
      level?: string;
      steps?: string[];
      youtubeVideos?: {
        title: string;
        url: string;
        thumbnail: string;
      }[];
      articles?: {
        title: string;
        url: string;
        author: string;
      }[];
      projects?: {
        name: string;
        description: string;
        features: string[];
      }[];
      roadmap?: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
    __v?: number; 
  };
};

// ROADMAP TYPE
export type ResourceType = {
  videos: string[];
  articles: string[];
  books: string[];
};

export type WeekType = {
  week: string;
  topic: string;
  overview: string;
  concepts: string[];
  exercises: string[];
  resources: ResourceType;
  illustration: string;
};

export type PhaseType = {
  title: string;
  description: string;
  weeks: WeekType[];
};

export type RoadmapType = {
  _id: string;
  userId: string;
  skill: string;
  level: string;
  phases: PhaseType[];
  createdAt: Date;
  updatedAt: Date;
};

//CAREER TYPE
export type CareerQuestionType = {
  _id: string;
  question: string;
  answers: string[];
};

export type CareerType = {
  skill: string;
  questions: CareerQuestionType[];
};


// SKILL TYPE
export type SkillType = {
  _id: string;
  name: string;
};

export type SkillQuestionType = {
  _id: string;
  questionText: string;
  options: string[];
  skillMapping: {
    [key: string]: string[]; // Example: { "Frontend": ["React", "Vue"] }
  };
  createdAt: Date;
  updatedAt: Date;
};
