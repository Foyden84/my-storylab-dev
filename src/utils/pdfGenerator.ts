// PDF generation utilities

export interface PDFContent {
  title: string;
  subtitle: string;
  sections: PDFSection[];
  moduleId: string;
  ageGroup: string;
}

export interface PDFSection {
  heading: string;
  content: string;
  examples?: PDFExample[];
  exercises?: PDFExercise[];
  tips?: string[];
}

export interface PDFExample {
  title: string;
  scenario: string;
  before?: string;
  after: string;
  explanation: string;
  kidFriendly: boolean;
}

export interface PDFExercise {
  title: string;
  instructions: string;
  example: string;
  workspace: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Kid-friendly PDF content for Brainstorming module
export const brainstormingPDF: PDFContent = {
  title: "Story Ideas That Rock!",
  subtitle: "A Fun Guide to Brainstorming Amazing Stories",
  moduleId: "brainstorming",
  ageGroup: "Perfect for ages 10 and up!",
  sections: [
    {
      heading: "🤔 The Magic 'What If' Question",
      content: "The coolest way to create awesome stories is by asking 'What if?' It's like having a magic wand that turns boring stuff into exciting adventures!",
      examples: [
        {
          title: "Turn Boring into Awesome!",
          scenario: "Going to school",
          before: "Emma walks to school like every other day.",
          after: "What if Emma discovered that her school was actually a secret training academy for superheroes, and she was the only one who didn't know?",
          explanation: "See how we took something super normal (going to school) and made it exciting? That's the magic of 'What if!'",
          kidFriendly: true
        },
        {
          title: "Pet Power!",
          scenario: "Having a pet",
          before: "Jake has a pet hamster named Fluffy.",
          after: "What if Jake's hamster Fluffy could talk, but only Jake could hear him, and Fluffy knew all the neighborhood secrets?",
          explanation: "Pets are perfect for 'What if' stories because everyone loves animals and can imagine them doing amazing things!",
          kidFriendly: true
        },
        {
          title: "Family Fun",
          scenario: "Family dinner",
          before: "The family sits down for dinner.",
          after: "What if every time Maya's family ate dinner together, they traveled to a different time period, but they had to finish eating before they could come back?",
          explanation: "Family stories are great because everyone has family experiences they can relate to!",
          kidFriendly: true
        }
      ],
      tips: [
        "Start with something you do every day (brushing teeth, walking the dog, doing homework)",
        "Add something magical, mysterious, or just plain weird",
        "Ask yourself: 'What would happen if...?'",
        "The weirder, the better! Don't worry if it sounds silly - silly can be awesome!"
      ]
    },
    {
      heading: "🗺️ Mind Maps: Your Idea Explosion Tool",
      content: "Mind maps are like drawing a picture of your thoughts! You start with one idea in the middle, then draw lines to connect all the cool stuff you think of.",
      examples: [
        {
          title: "Pizza Mind Map Example",
          scenario: "Starting with 'Magic Pizza'",
          after: "Magic Pizza → Toppings that give powers → Pepperoni = super speed → Mushrooms = invisibility → Cheese = flying → Pizza delivery boy becomes superhero → Must save the world from evil vegetables → Broccoli army attacks → Final battle at the school cafeteria",
          explanation: "See how one silly idea (magic pizza) led to a whole adventure story? That's how mind maps work!",
          kidFriendly: true
        }
      ],
      exercises: [
        {
          title: "Your First Mind Map",
          instructions: "1. Pick something you love (video games, sports, your pet, etc.)\n2. Write it in the middle of a page\n3. Draw lines coming out like sun rays\n4. Write down everything you think of\n5. Keep adding more lines and ideas\n6. Don't stop until you have at least 20 ideas!",
          example: "If you pick 'My Dog,' you might think of: tricks, walks, treats, barking, other dogs, the park, squirrels, adventures, getting lost, finding treasure...",
          workspace: true,
          difficulty: 'easy'
        }
      ]
    }
  ]
};

// Kid-friendly PDF content for Characters module
export const charactersPDF: PDFContent = {
  title: "Creating Characters Kids Will Love!",
  subtitle: "How to Make Characters That Feel Like Real Friends",
  moduleId: "characters",
  ageGroup: "Perfect for ages 10 and up!",
  sections: [
    {
      heading: "😊 Making Characters Feel Real",
      content: "The best characters feel like real people you'd want to hang out with (or maybe run away from if they're the bad guy!). Here's how to make characters that jump off the page.",
      examples: [
        {
          title: "The Shy Kid Who's Actually Brave",
          scenario: "School setting",
          before: "Alex is quiet and doesn't talk much.",
          after: "Alex is super shy and never raises their hand in class, but when their little sister gets picked on by bullies, Alex becomes a fierce protector who stands up to kids twice their size.",
          explanation: "This character is interesting because they have two sides - shy AND brave. Real people are like this too!",
          kidFriendly: true
        },
        {
          title: "The Class Clown with a Secret",
          scenario: "Friendship story",
          before: "Sam makes everyone laugh.",
          after: "Sam tells jokes all day and makes everyone laugh, but secretly feels really lonely because they think people only like them when they're being funny, not when they're just being themselves.",
          explanation: "Sometimes the funniest people are actually sad inside. This makes Sam feel real and makes us care about them.",
          kidFriendly: true
        }
      ]
    }
  ]
};

import { generateKidFriendlyGuide } from './pdfSpecialTypes';

// Function to generate PDF with kid-friendly formatting
export async function generateModulePDF(moduleId: string): Promise<Blob> {
  // Use the specialized kid-friendly guide generator
  return generateKidFriendlyGuide(moduleId);
}

// Function to create downloadable link
export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
