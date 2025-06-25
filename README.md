# StoryLab 📝

> "So easy, even a kid can do it."

StoryLab is a guided writing platform that teaches storytelling fundamentals through interactive lessons powered by AI. Features colorful learning modules, step-by-step tutorials, and personalized feedback to help writers of all ages develop their creative writing skills.

## Features

- 🎨 **Colorful Dashboard** - Kid-friendly interface with 7 essential writing modules
- 📚 **Interactive Lessons** - Step-by-step tutorials with practical exercises
- 🤖 **AI Writing Coach** - OpenAI-powered feedback and guidance
- 📈 **Progress Tracking** - Save your progress and track completed lessons
- 🎯 **Age-Appropriate** - Simple language that works for kids and adults
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Learning Modules

1. **Brainstorming** (Beginner) - Generate and organize creative ideas
2. **Plotting** (Beginner) - Master compelling plot structures
3. **Creating Characters** (Intermediate) - Build memorable protagonists
4. **Conflict** (Intermediate) - Create meaningful story conflicts
5. **Story Structure** (Intermediate) - Learn fundamental frameworks
6. **Inciting Incidents** (Advanced) - Master critical story moments
7. **The Black Moment** (Advanced) - Create powerful climactic moments

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: OpenAI GPT-4
- **Storage**: LocalStorage (progress tracking)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/openai/          # OpenAI API integration
│   ├── lesson/[module]/     # Dynamic lesson pages
│   ├── page.tsx            # Main dashboard
│   └── layout.tsx          # Root layout
├── components/             # Reusable components (future)
└── lib/                   # Utilities (future)
```

## Usage

1. **Browse Modules** - Start on the dashboard to see all available writing modules
2. **Choose Your Level** - Pick from Beginner, Intermediate, or Advanced modules
3. **Take Lessons** - Follow step-by-step tutorials with interactive exercises
4. **Get AI Feedback** - Submit your writing for personalized coaching
5. **Track Progress** - Your completed lessons are automatically saved

## API Integration

The app uses OpenAI's GPT-4 model to provide:
- Writing prompts and exercises
- Personalized feedback on user submissions
- Story development guidance
- Creative writing tips and techniques

## Future Enhancements

- User authentication (Clerk)
- Payment integration (Stripe)
- More advanced lesson content
- Writing portfolio features
- Social sharing capabilities
- Progress analytics

## Contributing

This is currently a personal project, but contributions are welcome! Please feel free to submit issues and enhancement requests.

---

Built with ❤️ for aspiring writers everywhere!

<!-- GitHub workflow test - ready to develop! -->
