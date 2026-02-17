import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Tier-based limits
        const tier = user.subscriptionTier || 'free';
        const aiRequests = user.usageStats?.aiRequests || 0;

        if (tier === 'free' && aiRequests >= 5) {
            return NextResponse.json({
                error: 'Limit Reached',
                message: 'Free tier is limited to 5 AI requests. Upgrade to Pro for 100 requests!',
                limitReached: true
            }, { status: 403 });
        }

        if (tier === 'pro' && aiRequests >= 100) {
            return NextResponse.json({
                error: 'Limit Reached',
                message: 'Pro tier is limited to 100 AI requests. Upgrade to Annual for unlimited access!',
                limitReached: true
            }, { status: 403 });
        }

        const { message, conversationHistory } = await req.json();
        console.log('SERVER: Incoming message:', message);
        console.log('SERVER: History length:', conversationHistory?.length || 0);

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY?.trim();

        if (!OPENROUTER_API_KEY) {
            console.error('SERVER ERROR: OPENROUTER_API_KEY is missing or empty');
            return NextResponse.json({
                error: 'AI service not configured',
                details: 'API key is missing on the server'
            }, { status: 500 });
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
        console.log('Sending request to OpenRouter with model:', 'meta-llama/llama-3.3-70b-instruct:free');

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
                'X-Title': 'NurtureNest'
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.3-70b-instruct:free',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const status = response.status;
            const statusText = response.statusText;
            let errorText = '';
            let errorData: any = null;

            try {
                errorText = await response.text();
                errorData = JSON.parse(errorText);
            } catch (e) {
                console.error(`SERVER: Failed to parse error response from OpenRouter (Status ${status}):`, e);
            }

            console.error(`SERVER: OpenRouter API error (Status ${status} ${statusText}):`, errorData || errorText);

            // Construct details for internal logging
            const finalDetails = (errorData && Object.keys(errorData).length > 0)
                ? errorData
                : (errorText ? errorText.substring(0, 200) : 'No error details available');

            return NextResponse.json({
                error: 'AI service error',
                message: `The AI service returned a ${status} error. ${errorData?.error?.message || ''}`,
                details: finalDetails,
                status: status
            }, { status: 500 });
        }

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse successful response as JSON:', e);
            return NextResponse.json({
                error: 'Invalid response from AI service',
                details: responseText.substring(0, 100)
            }, { status: 500 });
        }

        const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

        // Update usage stats for the user
        if (session?.user?.email) {
            await dbConnect();
            await User.findOneAndUpdate(
                { email: session.user.email },
                { $inc: { 'usageStats.aiRequests': 1 } }
            );
        }

        return NextResponse.json({
            response: aiResponse,
            model: data.model
        });

    } catch (error) {
        console.error('AI chat error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
