import { Lightbulb, BookOpen, Users, Zap, Building, Star, Heart } from 'lucide-react';

export interface LessonStep {
  id: string;
  title: string;
  content: string;
  type: 'tutorial' | 'exercise' | 'prompt';
  aiPrompt?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  steps: LessonStep[];
}

export const modules: { [key: string]: Module } = {
  'brainstorming': {
    id: 'brainstorming',
    title: 'Brainstorming',
    description: 'Learn to generate and organize creative ideas for your stories with proven techniques.',
    level: 'Beginner',
    duration: '45 mins',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    steps: [
      {
        id: 'intro',
        title: 'Welcome to Brainstorming',
        content: 'Brainstorming is the foundation of great storytelling. Every amazing story starts with a spark of imagination that gets developed through creative thinking. In this lesson, you\'ll learn proven techniques used by professional writers to generate endless story ideas and organize them into compelling concepts.\n\nThink of brainstorming like planting a garden - you scatter lots of seeds (ideas), nurture the ones that sprout (develop promising concepts), and eventually harvest the best ones (turn them into stories). The key is to be playful, curious, and open to unexpected connections.',
        type: 'tutorial'
      },
      {
        id: 'what-if',
        title: 'The "What If" Technique',
        content: 'The most powerful brainstorming tool is asking "What if?" This simple question opens up endless possibilities for your stories. It works by taking something ordinary and adding a twist, or combining two unrelated things to see what happens.\n\nHere\'s how to use it effectively:\n\n• Start with everyday situations: "What if you woke up tomorrow and..."\n• Combine opposites: "What if the quietest kid in school was secretly..."\n• Add magical elements: "What if mirrors could..."\n• Change the rules: "What if gravity only worked on Tuesdays?"\n\nThe best "what if" questions make you immediately want to know what happens next. They create instant curiosity and conflict, which are the building blocks of great stories.',
        type: 'tutorial'
      },
      {
        id: 'practice-what-if',
        title: 'Practice: Generate Your "What If" Ideas',
        content: 'Now it\'s your turn! Create 5 different "What if" scenarios using these starter prompts. Don\'t worry about making them perfect – just let your imagination flow and have fun with it.\n\nTry these approaches:\n1. What if you could [magical ability] but only [limitation]?\n2. What if everyone in your town suddenly [strange event]?\n3. What if you discovered that your [family member/friend] was secretly [surprising truth]?\n4. What if [everyday object] could [impossible thing]?\n5. What if you had to [challenging task] in order to [important goal]?\n\nRemember: The weirder and more unexpected, the better! Great stories often come from the most unusual combinations.',
        type: 'exercise',
        aiPrompt: 'I\'m learning about brainstorming for creative writing using "What if" scenarios. Can you help me understand how to create compelling "What if" questions that lead to interesting stories? Please provide some examples and guide me through developing my own scenarios. I want to make sure they have built-in conflict and curiosity.'
      }
    ]
  }
};
