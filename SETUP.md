# StoryLab Setup Instructions

## Quick Start

1. **Copy the environment template**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your OpenAI API key**
   
   Open `.env.local` and replace `your_openai_api_key_here` with your actual OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting an OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and paste it into your `.env.local` file

## Testing the Application

1. **Dashboard**: Visit the home page to see all 7 writing modules
2. **Lessons**: Click on any module (e.g., "Brainstorming") to start a lesson
3. **AI Interaction**: In exercise steps, write something in the text area and click "Get AI Feedback" to test the OpenAI integration
4. **Progress**: Your progress through lessons is automatically saved in localStorage

## Features to Test

- ✅ Colorful, responsive dashboard
- ✅ Interactive lesson navigation
- ✅ AI-powered writing feedback (requires API key)
- ✅ Progress tracking
- ✅ Mobile-friendly design

## Troubleshooting

**"OpenAI API key not configured" error:**
- Make sure you've created `.env.local` file
- Verify your API key is correct and has sufficient credits
- Restart the development server after adding the API key

**Build errors:**
- Run `npm run build` to check for TypeScript errors
- All current errors have been fixed

**Can't access lessons:**
- Make sure you're clicking on the module cards or using URLs like `/lesson/brainstorming`

## Next Steps

The core application is ready! Future enhancements could include:
- User authentication (Clerk)
- Payment processing (Stripe)  
- More advanced lesson content
- Writing portfolio features
- Social sharing capabilities
