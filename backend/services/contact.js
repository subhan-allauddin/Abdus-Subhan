import { Resend } from 'resend';
import connectDB from '../config/db.js';
import config from '../config/config.js';
import Contact from '../models/Contact.js';

const recipient = 'subhanallauddin@gmail.com';

const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character]);

export async function sendContactMessage({ name, email, subject, message }) {
    if (!config.RESEND_URI) {
        throw new Error('Resend API key is not configured.');
    }

    const hasDb = await connectDB();
    if (hasDb) {
        try {
            const newContact = new Contact({ name, email, subject, message });
            await newContact.save();
        } catch (dbError) {
            console.error('Failed to save contact message to database:', dbError.message);
        }
    }

    const resend = new Resend(config.RESEND_URI);
    const { error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: recipient,
        subject: subject || 'New Message from Contact Form',
        html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong> ${escapeHtml(message)}</p>
        `,
    });

    if (error) {
        throw new Error(error.message);
    }
}
