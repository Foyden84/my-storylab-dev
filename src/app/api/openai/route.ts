import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { prompt, userInput, context } = await request.json();

    if (!userInput || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `You are an expert writing coach for StoryLab, a platform that teaches storytelling to writers of all ages with the tagline "So easy, even a kid can do it." Your role is to provide encouraging, constructive feedback that helps users improve their writing skills.

Guidelines for your responses:
- Be encouraging and positive while providing helpful criticism
- Use simple, clear language that a child can understand, but don't be condescending
- Provide specific, actionable advice
- Ask follow-up questions to encourage deeper thinking
- Use examples when helpful
- Keep responses concise but thorough
- Focus on fundamental storytelling principles
- Celebrate creativity and original thinking

Context: ${context}
Learning objective: ${prompt}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `The user is working on: ${prompt}

Their input: ${userInput}

Please provide helpful, encouraging feedback and guidance.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    return NextResponse.json({ response });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Check if it's an API key issue
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add your OPENAI_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    );
  }
}
