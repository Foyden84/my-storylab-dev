import React from 'react';
import { BookOpen, Lightbulb, Star, Heart, Users, Zap, Target, Compass } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  content: string;
  type: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ComponentType<{ className?: string }>;
}

const tips: Tip[] = [
  {
    id: 'show-dont-tell',
    title: 'Show, Don\'t Tell',
    content: 'Instead of telling readers "Sarah was sad," show it: "Sarah\'s shoulders slumped as she stared at the empty swing set." Let readers experience emotions through actions and details.',
    type: 'beginner',
    icon: BookOpen
  },
  {
    id: 'strong-verbs',
    title: 'Use Strong Verbs',
    content: 'Replace weak verbs with powerful ones. Instead of "walked quickly," try "hurried," "rushed," or "sprinted." Strong verbs make your writing more dynamic and engaging.',
    type: 'beginner',
    icon: Star
  },
  {
    id: 'dialogue-tags',
    title: 'Dialogue Tag Alternatives',
    content: 'Avoid overusing "said." Try whispered, shouted, muttered, declared, or exclaimed. But remember - "said" is often the best choice because it\'s invisible to readers.',
    type: 'intermediate',
    icon: Users
  },
  {
    id: 'conflict-every-scene',
    title: 'Conflict in Every Scene',
    content: 'Every scene should have some form of conflict - internal, external, or interpersonal. If there\'s no tension or problem to solve, consider cutting or combining scenes.',
    type: 'intermediate',
    icon: Lightbulb
  },
  {
    id: 'emotional-beats',
    title: 'Emotional Beats',
    content: 'Balance action with emotion. After intense scenes, give readers and characters a moment to process. These quiet beats make the big moments more impactful.',
    type: 'advanced',
    icon: Heart
  },
  {
    id: 'brainstorming-freely',
    title: 'Brainstorm Without Judgment',
    content: 'During brainstorming, write down every idea - even the "bad" ones. Often, seemingly weak ideas lead to breakthrough moments. Edit later, create now.',
    type: 'beginner',
    icon: Lightbulb
  },
  {
    id: 'character-wants-vs-needs',
    title: 'Character Wants vs. Needs',
    content: 'Your character should want one thing but need something else. They might want revenge but need forgiveness. This creates internal conflict and character growth.',
    type: 'intermediate',
    icon: Users
  },
  {
    id: 'plot-structure-flexibility',
    title: 'Structure as Foundation',
    content: 'Think of story structure like a house foundation - it supports everything above. You can decorate differently, but you need that solid base to build upon.',
    type: 'beginner',
    icon: Compass
  },
  {
    id: 'escalating-stakes',
    title: 'Escalating Stakes',
    content: 'Each conflict should raise the stakes. Start with personal stakes, then expand to affect loved ones, communities, or entire worlds. Make failure increasingly costly.',
    type: 'intermediate',
    icon: Zap
  },
  {
    id: 'inciting-incident-timing',
    title: 'Inciting Incident Timing',
    content: 'Place your inciting incident after readers care about your character but before they get bored. Usually within the first 10-15% of your story.',
    type: 'advanced',
    icon: Target
  }
];

const getTipColor = (type: string) => {
  switch (type) {
    case 'beginner': return 'bg-green-50 border-green-200 text-green-800';
    case 'intermediate': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    case 'advanced': return 'bg-red-50 border-red-200 text-red-800';
    default: return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'beginner': return 'text-green-500';
    case 'intermediate': return 'text-yellow-500';
    case 'advanced': return 'text-red-500';
    default: return 'text-gray-500';
  }
};

export default function WritingTips() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
        Quick Writing Tips
      </h3>
      
      <div className="space-y-4">
        {tips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <div
              key={tip.id}
              className={`p-4 rounded-lg border-2 ${getTipColor(tip.type)}`}
            >
              <div className="flex items-start space-x-3">
                <IconComponent className={`w-5 h-5 mt-0.5 ${getIconColor(tip.type)}`} />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{tip.title}</h4>
                  <p className="text-sm leading-relaxed">{tip.content}</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-white/50">
                    {tip.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
