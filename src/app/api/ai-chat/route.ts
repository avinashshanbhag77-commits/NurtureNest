import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, conversationHistory } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

        if (!OPENROUTER_API_KEY) {
            console.error('OPENROUTER_API_KEY is not set');
            return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
        }

        // Build messages array for the AI
        const messages = [
            {
                role: 'system',
                content: `You are NurtureBot, a compassionate AI assistant for expecting mothers using the NurtureNest platform. 
                
Your role:
- Provide supportive, evidence-based information about pregnancy
- Offer tips on nutrition, wellness, and common pregnancy symptoms
- Be warm, empathetic, and reassuring
- ALWAYS remind users to consult their healthcare provider for medical concerns
- Never diagnose conditions or provide medical advice
- Keep responses concise (2-3 sentences) and friendly

Topics you can help with:
- General pregnancy information and week-by-week development
- Nutrition and safe foods during pregnancy
- Exercise and wellness tips
- Common pregnancy symptoms and safe remedies
- Emotional support and encouragement

Remember: You're a support companion, not a medical professional.`
            },
            ...(conversationHistory || []),
            {
                role: 'user',
                content: message
            }
        ];

        // Call OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
                'X-Title': 'NurtureNest'
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.3-70b-instruct:free', // Using a stable verified free model
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            let errorData = {};
            try {
                errorData = await response.json();
            } catch (e) {
                console.error('Failed to parse error response:', e);
            }
            console.error('OpenRouter API error (Status ' + response.status + '):', errorData);
            return NextResponse.json({
                error: 'AI service error',
                details: errorData,
                status: response.status
            }, { status: 500 });
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

        return NextResponse.json({
            response: aiResponse,
            model: data.model
        });

    } catch (error) {
        console.error('AI chat error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
