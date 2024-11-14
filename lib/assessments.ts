interface BaseQuestion {
  id: string;
  type: 'multiple-choice' | 'identification' | 'labeling';
  question: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

interface IdentificationQuestion extends BaseQuestion {
  type: 'identification';
  correctAnswer: string;
  hint?: string;
}

interface LabelingQuestion extends BaseQuestion {
  type: 'labeling';
  image: string;
  labels: {
    id: string;
    text: string;
    x: number;
    y: number;
  }[];
  correctAnswers: {
    id: string;
    label: string;
  }[];
}

type Question = MultipleChoiceQuestion | IdentificationQuestion | LabelingQuestion;

const assessments: Record<string, Question[]> = {
  'intro': [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: "What is the primary function of a CPU in a computer system?",
      options: [
        "Store data permanently",
        "Process instructions and perform calculations",
        "Display images on the screen",
        "Connect to the internet"
      ],
      correctAnswer: "Process instructions and perform calculations"
    },
    {
      id: 'q2',
      type: 'identification',
      question: "What does CPU stand for?",
      correctAnswer: "Central Processing Unit",
      hint: "It's the main processing unit of a computer"
    },
    {
      id: 'q3',
      type: 'labeling',
      question: "Label the main components of a motherboard",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600",
      labels: [
        { id: "cpu", x: 30, y: 40, text: "" },
        { id: "ram", x: 60, y: 30, text: "" },
        { id: "pcie", x: 45, y: 70, text: "" }
      ],
      correctAnswers: [
        { id: "cpu", label: "CPU Socket" },
        { id: "ram", label: "RAM Slots" },
        { id: "pcie", label: "PCIe Slots" }
      ]
    },
    {
      id: 'q4',
      type: 'identification',
      question: "What is the standard unit of memory measurement in computers?",
      correctAnswer: "Byte",
      hint: "It consists of 8 bits"
    }
  ],
  'install': [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: "What should you do first before handling computer components?",
      options: [
        "Turn on the computer",
        "Ground yourself to prevent static discharge",
        "Clean the components with water",
        "Test the power supply"
      ],
      correctAnswer: "Ground yourself to prevent static discharge"
    },
    {
      id: 'q2',
      type: 'labeling',
      question: "Label the power supply connectors",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=600",
      labels: [
        { id: "24pin", x: 20, y: 30, text: "" },
        { id: "cpu", x: 50, y: 40, text: "" },
        { id: "sata", x: 70, y: 60, text: "" }
      ],
      correctAnswers: [
        { id: "24pin", label: "24-pin Motherboard" },
        { id: "cpu", label: "8-pin CPU" },
        { id: "sata", label: "SATA Power" }
      ]
    }
  ]
};

export function getPreAssessmentQuestions(courseId: string): Question[] {
  return assessments[courseId] || [];
}

export function getPostAssessmentQuestions(courseId: string): Question[] {
  return assessments[courseId] || [];
}