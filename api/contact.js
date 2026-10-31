export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { name, email, subject, message } =
        req.body && typeof req.body === 'object' ? req.body : {};
    if (![name, email, message].every((value) => typeof value === 'string' && value.trim())) {
        return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }

    try {
        const { sendContactMessage } = await import('../backend/services/contact.js');
        await sendContactMessage({ name, email, subject, message });
        return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact Form Error:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
}
