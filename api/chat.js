export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { messages } = req.body && typeof req.body === 'object' ? req.body : {};
    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ success: false, error: 'Please provide messages array.' });
    }

    try {
        const { generateChatReply } = await import('../backend/services/chat.js');
        const reply = await generateChatReply(messages);
        return res.status(200).json({ success: true, reply });
    } catch (error) {
        console.error('Chat API Error:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate response',
        });
    }
}
