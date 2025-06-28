import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, Star } from 'lucide-react';

interface Example {
  id: string;
  title: string;
  concept: string;
  before?: string;
  after: string;
  explanation: string;
  module: string;
}

const examples: Example[] = [
  {
    id: 'show-vs-tell',
    title: 'Show vs. Tell',
    concept: 'Character Emotion',
    before: 'Sarah was very sad about losing her dog.',
    after: 'Sarah pressed her face against the window, watching the empty yard where Max used to chase his favorite tennis ball.',
    explanation: 'Instead of telling readers Sarah is sad, we show her behavior and let readers feel her sadness through the image.',
    module: 'characters'
  },
  {
    id: 'mind-mapping-brainstorm',
    title: 'Mind Mapping Example',
    concept: 'Idea Organization',
    after: 'Start with a central idea: "Book Club" and branch out: themes, genres, member roles, discussion topics.',
    explanation: 'Mind mapping visually organizes and expands your initial ideas, offering a comprehensive view on how to develop them further.',
    module: 'brainstorming'
  },
  {
    id: 'three-act-structure',
    title: 'Three-Act Structure',
    concept: 'Plot Structure',
    after: 'Act 1: Hero discovers a hidden talent. Act 2: Faces challenges and adversaries. Act 3: Triumphs against the odds.',
    explanation: 'This structure divides the story into easily digestible phases, ensuring a coherent and engaging narrative flow.',
    module: 'plotting'
  },
  {
    id: 'strong-verbs',
    title: 'Strong Verbs',
    concept: 'Action Description',
    before: 'The man walked quickly across the street.',
    after: 'The man sprinted across the street.',
    explanation: 'Replace weak verbs with specific, powerful ones. "Sprinted" immediately tells us the speed and urgency.',
    module: 'plotting'
  },
  {
    id: 'character-flaw',
    title: 'Character Flaws',
    concept: 'Protagonist Development',
    after: 'Despite being the smartest kid in class, Alex never raised his hand - his fear of being wrong paralyzed him more than ignorance ever could.',
    explanation: 'This shows a character who is intelligent but has a crippling fear of failure, making them relatable and giving them room to grow.',
    module: 'characters'
  },
  {
    id: 'inciting-incident',
    title: 'Inciting Incident',
    concept: 'Story Opening',
    after: 'Emma had lived in the same house for sixteen years, but when she found the letter hidden behind her bedroom wall, everything she thought she knew about her family shattered.',
    explanation: 'This incident disrupts Emma\'s normal world and forces her into the main conflict - discovering family secrets.',
    module: 'inciting-incidents'
  },
  {
    id: 'conflict-example',
    title: 'Internal vs External Conflict',
    concept: 'Story Tension',
    after: 'While the storm raged outside (external), Maria battled an even fiercer tempest within - should she tell her sister the truth about their father, or let her live with the beautiful lie? (internal)',
    explanation: 'Both conflicts work together: the storm creates urgency while the internal conflict creates emotional stakes.',
    module: 'conflict'
  },
  {
    id: 'story-structure-example',
    title: 'Hero\'s Journey in Modern Stories',
    concept: 'Story Framework',
    after: 'Ordinary World: Harry lives with the Dursleys. Call to Adventure: Hogwarts letter arrives. Mentor: Hagrid guides him. Trials: Dark magic challenges. Return: Harry returns to Platform 9¾, forever changed.',
    explanation: 'The Hero\'s Journey provides a tested framework that resonates with readers because it mirrors real-life growth and transformation.',
    module: 'structure'
  },
  {
    id: 'black-moment-example',
    title: 'The Black Moment',
    concept: 'Climactic Crisis',
    after: 'Everything Rachel had worked for lay in ruins. Her business was bankrupt, her team had abandoned her, and now her daughter wouldn\'t even take her calls. She sat in her empty office, wondering if success was worth losing everything she actually cared about.',
    explanation: 'This black moment forces Rachel to confront her priorities and choose between success and relationships, leading to character growth.',
    module: 'black-moment'
  },
  {
    id: 'what-if-brainstorm',
    title: '"What If" Scenarios',
    concept: 'Idea Generation',
    after: 'What if libraries could loan out experiences instead of books? What if mirrors showed your true self instead of your reflection? What if you could trade memories like currency?',
    explanation: 'These "what if" questions spark imagination and lead to unique story concepts by combining familiar elements in unexpected ways.',
    module: 'brainstorming'
  },
  {
    id: 'inciting-incident-timing',
    title: 'Perfect Timing for Inciting Incidents',
    concept: 'Story Pacing',
    before: 'Chapter 1: Jake\'s boring morning routine. Chapter 2: More routine. Chapter 3: Still more routine. Chapter 5: Finally, the alien invasion begins.',
    after: 'Chapter 1: Jake\'s morning routine gets interrupted when strange lights appear in the sky and his coffee mug starts floating.',
    explanation: 'The inciting incident happens early, after we get just enough normal world to care about Jake, but before readers lose interest.',
    module: 'inciting-incidents'
  }
];

interface WritingExamplesProps {
  currentModule?: string;
}

export default function WritingExamples({ currentModule }: WritingExamplesProps) {
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  
  // Filter examples for current module if specified, otherwise show all
  const filteredExamples = currentModule 
    ? examples.filter(example => example.module === currentModule)
    : examples;

  const toggleExample = (id: string) => {
    setExpandedExample(expandedExample === id ? null : id);
  };

  if (filteredExamples.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Star className="w-6 h-6 text-orange-500 mr-2" />
        Writing Examples
      </h3>
      
      <div className="space-y-4">
        {filteredExamples.map((example) => (
          <div
            key={example.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleExample(example.id)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <div>
                <h4 className="font-semibold text-gray-900">{example.title}</h4>
                <p className="text-sm text-gray-600">{example.concept}</p>
              </div>
              {expandedExample === example.id ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedExample === example.id && (
              <div className="p-4 border-t border-gray-200">
                {example.before && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-red-600 mb-2">❌ Weak Example:</h5>
                    <p className="text-sm bg-red-50 p-3 rounded border-l-4 border-red-200 italic">
                      &quot;{example.before}&quot;
                    </p>
                  </div>
                )}
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-green-600 mb-2">✅ Strong Example:</h5>
                  <p className="text-sm bg-green-50 p-3 rounded border-l-4 border-green-200">
                    &quot;{example.after}&quot;
                  </p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded">
                  <h5 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Why This Works:
                  </h5>
                  <p className="text-sm text-blue-700">{example.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
