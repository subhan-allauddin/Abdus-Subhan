import express from 'express';
import cors from 'cors';
import { sendContactMessage } from './services/contact.js';

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (![name, email, message].every((value) => typeof value === 'string' && value.trim())) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        await sendContactMessage({ name, email, subject, message });

        return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact Form Error:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
