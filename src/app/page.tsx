import { BookOpen, Lightbulb, Users, Zap, Building, Star, Heart } from 'lucide-react';
import Link from 'next/link';

const modules = [
  {
    id: 'brainstorming',
    title: 'Brainstorming',
    description: 'Learn to generate and organize creative ideas for your stories with proven techniques.',
    level: 'Beginner',
    duration: '30 mins',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200'
  },
  {
    id: 'plotting',
    title: 'Plotting',
    description: 'Master the art of creating compelling plot structures that keep readers engaged.',
    level: 'Beginner',
    duration: '40 mins',
    icon: BookOpen,
    color: 'from-blue-400 to-purple-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'characters',
    title: 'Creating Characters',
    description: 'Build memorable, three-dimensional characters that readers will love and remember.',
    level: 'Intermediate',
    duration: '50 mins',
    icon: Users,
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'conflict',
    title: 'Conflict',
    description: 'Discover how to create meaningful conflicts that drive your story forward.',
    level: 'Intermediate',
    duration: '40 mins',
    icon: Zap,
    color: 'from-red-400 to-pink-500',
    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'structure',
    title: 'Story Structure',
    description: 'Learn the fundamental frameworks that make stories satisfying and complete.',
    level: 'Intermediate',
    duration: '60 mins',
    icon: Building,
    color: 'from-indigo-400 to-blue-500',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200'
  },
  {
    id: 'inciting-incidents',
    title: 'Inciting Incidents',
    description: 'Master the critical moments that launch your story into motion.',
    level: 'Advanced',
    duration: '35 mins',
    icon: Star,
    color: 'from-purple-400 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'black-moment',
    title: 'The Black Moment',
    description: 'Create powerful climactic moments that test your characters and readers.',
    level: 'Advanced',
    duration: '45 mins',
    icon: Heart,
    color: 'from-gray-600 to-gray-800',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
    borderColor: 'border-gray-300'
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">StoryLab</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium">
                Login
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Finally—A Simple Way to Learn{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              How to Write Stories That Work
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Step-by-step, guided lessons to help you turn ideas into finished stories.
          </p>
          <p className="text-lg text-gray-500 italic mb-8">
            &quot;So easy, even a kid can do it.&quot;
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Start Writing Now
          </button>
        </div>

        {/* Learning Modules Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              7 Essential Writing Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master the fundamental building blocks of great storytelling through our carefully designed learning modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Link
                  key={module.id}
                  href={`/lesson/${module.id}`}
                  className="group block"
                >
                  <div className={`${module.bgColor} ${module.borderColor} border-2 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-opacity-60`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                        {module.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {module.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {module.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {module.duration}
                      </span>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-colors">
                        Start Learning
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proven three-step approach makes learning to write stories simple and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Choose a module</h3>
              <p className="text-gray-600">
                Select from our expertly crafted learning modules based on your current skill level.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Learn by doing</h3>
              <p className="text-gray-600">
                Follow step-by-step lessons with practical exercises and real examples.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track your progress</h3>
              <p className="text-gray-600">
                Monitor your growth and earn achievements as you master each storytelling skill.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Writing Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of aspiring writers who have discovered the joy of storytelling with StoryLab.
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Get Started for Free
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">StoryLab</span>
            </div>
            
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link href="/signup" className="text-gray-600 hover:text-gray-900">Signup</Link>
            </nav>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500">
              © 2025 StoryLab. All rights reserved. &quot;So easy, even a kid can do it.&quot;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
