'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BookOpen, ArrowLeft, ArrowRight, Lightbulb, Users, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';

interface LessonStep {
  id: string;
  title: string;
  content: string;
  type: 'tutorial' | 'exercise' | 'prompt';
  aiPrompt?: string;
}

interface Module {
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

const modules: { [key: string]: Module } = {
  'brainstorming': {
    id: 'brainstorming',
    title: 'Brainstorming',
    description: 'Learn to generate and organize creative ideas for your stories with proven techniques.',
    level: 'Beginner',
    duration: '30 mins',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    steps: [
      {
        id: 'intro',
        title: 'Welcome to Brainstorming',
        content: 'Brainstorming is the foundation of great storytelling. In this lesson, you\'ll learn proven techniques to generate creative ideas and organize them into compelling story concepts.',
        type: 'tutorial'
      },
      {
        id: 'what-if',
        title: 'The "What If" Technique',
        content: 'The most powerful brainstorming tool is asking "What if?" This simple question opens up endless possibilities for your stories.',
        type: 'tutorial'
      },
      {
        id: 'practice-what-if',
        title: 'Practice: Generate Your "What If" Ideas',
        content: 'Now it\'s your turn! Write down 5 different "What if" scenarios. Don\'t worry about making them perfect – just let your imagination flow.',
        type: 'exercise',
        aiPrompt: 'I\'m learning about brainstorming for creative writing. Can you help me understand how to create compelling "What if" scenarios for stories? Please provide some examples and guide me through the process.'
      },
      {
        id: 'mind-mapping',
        title: 'Mind Mapping Your Ideas',
        content: 'Once you have your "What if" scenarios, it\'s time to expand them using mind mapping. This visual technique helps you explore connections and develop your ideas further.',
        type: 'tutorial'
      },
      {
        id: 'create-mind-map',
        title: 'Create Your Mind Map',
        content: 'Choose your favorite "What if" scenario from the previous exercise and create a mind map around it. Think about characters, settings, conflicts, and outcomes.',
        type: 'exercise',
        aiPrompt: 'I have a "What if" scenario for a story and I want to create a mind map to develop it further. Can you help me explore different aspects like characters, settings, conflicts, and potential plot developments?'
      },
      {
        id: 'organizing-ideas',
        title: 'Organizing Your Ideas',
        content: 'Great brainstorming creates lots of ideas, but you need to organize them effectively. Learn how to sort, prioritize, and connect your creative concepts.',
        type: 'tutorial'
      },
      {
        id: 'final-concept',
        title: 'Develop Your Story Concept',
        content: 'Time to bring it all together! Use your brainstorming work to create a clear, compelling story concept that you\'re excited to develop further.',
        type: 'prompt',
        aiPrompt: 'I\'ve been brainstorming ideas for a story. Can you help me refine my concept and make sure it has all the essential elements for a compelling story? I\'d like feedback on my story concept and suggestions for improvement.'
      }
    ]
  },
  'plotting': {
    id: 'plotting',
    title: 'Plotting',
    description: 'Master the art of creating compelling plot structures that keep readers engaged.',
    level: 'Beginner',
    duration: '40 mins',
    icon: BookOpen,
    color: 'from-blue-400 to-purple-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50',
    borderColor: 'border-blue-200',
    steps: [
      {
        id: 'intro',
        title: 'Understanding Plot Structure',
        content: 'Plot is the sequence of events that make up your story. A well-structured plot keeps readers engaged and creates a satisfying reading experience.',
        type: 'tutorial'
      },
      {
        id: 'three-act',
        title: 'The Three-Act Structure',
        content: 'The most fundamental plot structure is the three-act format: Setup, Confrontation, and Resolution. This timeless structure works for stories of all lengths.',
        type: 'tutorial'
      },
      {
        id: 'plot-your-story',
        title: 'Plot Your Story',
        content: 'Take your story concept and organize it into the three-act structure. What happens in each act? How do the acts connect?',
        type: 'exercise',
        aiPrompt: 'I\'m learning about the three-act story structure. Can you help me understand how to organize my story idea into Setup, Confrontation, and Resolution? I\'d like guidance on what should happen in each act.'
      }
    ]
  },
  'characters': {
    id: 'characters',
    title: 'Creating Characters',
    description: 'Build memorable, three-dimensional characters that readers will love and remember.',
    level: 'Intermediate',
    duration: '50 mins',
    icon: Users,
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
    borderColor: 'border-green-200',
    steps: [
      {
        id: 'intro',
        title: 'Character Development Fundamentals',
        content: 'Great characters are the heart of great stories. Learn how to create characters that feel real and drive your plot forward.',
        type: 'tutorial'
      },
      {
        id: 'character-arc',
        title: 'Character Arcs',
        content: 'Characters should change throughout your story. A character arc shows how your protagonist grows and evolves from beginning to end.',
        type: 'tutorial'
      },
      {
        id: 'create-character',
        title: 'Create Your Main Character',
        content: 'Design your protagonist with depth and complexity. What are their goals, fears, and flaws? How will they change?',
        type: 'exercise',
        aiPrompt: 'I\'m creating a main character for my story. Can you help me develop a well-rounded protagonist with clear motivations, flaws, and a compelling character arc? I want to make sure they feel real and relatable.'
      }
    ]
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LessonPage() {
  const params = useParams();
  const moduleId = params.module as string;
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentModule = modules[moduleId];

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem(`storylab-${moduleId}`);
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
  }, [moduleId]);

  const saveProgress = (stepId: string) => {
    const updated = [...completedSteps, stepId];
    setCompletedSteps(updated);
    localStorage.setItem(`storylab-${moduleId}`, JSON.stringify(updated));
  };

  const handleAiInteraction = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentStepData.aiPrompt,
          userInput,
          context: `Module: ${currentModule.title}, Step: ${currentStepData.title}`
        })
      });
      
      const data = await response.json();
      setAiResponse(data.response);
    } catch {
      setAiResponse('Sorry, I encountered an error. Please try again.');
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < currentModule.steps.length - 1) {
      saveProgress(currentStepData.id);
      setCurrentStep(currentStep + 1);
      setUserInput('');
      setAiResponse('');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setUserInput('');
      setAiResponse('');
    }
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <Link href="/" className="text-purple-600 hover:text-purple-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentStepData = currentModule.steps[currentStep];
  const IconComponent = currentModule.icon;
  const progress = ((currentStep + 1) / currentModule.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 bg-gradient-to-br ${currentModule.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{currentModule.title}</h1>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(currentModule.level)}`}>
                  {currentModule.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {currentModule.steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${currentModule.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step Content */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {currentStepData.type === 'tutorial' && <BookOpen className="w-6 h-6 text-blue-500 mr-2" />}
              {currentStepData.type === 'exercise' && <Play className="w-6 h-6 text-green-500 mr-2" />}
              {currentStepData.type === 'prompt' && <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />}
              <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{currentStepData.content}</p>
          </div>

          {/* Interactive Section */}
          {(currentStepData.type === 'exercise' || currentStepData.type === 'prompt') && (
            <div className="mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Turn</h3>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Share your thoughts, ideas, or questions here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleAiInteraction}
                  disabled={isLoading || !userInput.trim()}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Getting Help...' : 'Get AI Feedback'}
                </button>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">AI Writing Coach</h4>
                  <p className="text-blue-800 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="flex items-center space-x-4">
              {completedSteps.includes(currentStepData.id) && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
              
              <button
                onClick={nextStep}
                disabled={currentStep === currentModule.steps.length - 1}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === currentModule.steps.length - 1 ? 'Complete Module' : 'Next'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Module Completion */}
        {currentStep === currentModule.steps.length - 1 && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
            <p className="text-lg mb-6">You&apos;ve completed the {currentModule.title} module!</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Continue Learning
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
