import { NextResponse } from 'next/server';
import { sendContactInquiryEmails } from '@/lib/mailer';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  category: 'business' | 'feedback' | 'complaint' | 'general' | string;
  subject: string;
  message: string;
  targetEmail: string;
  createdAt: string;
  status: 'received' | 'in_review' | 'resolved';
}

// In-memory inquiry store for current server lifecycle
// Super Admin can retrieve inquiries
const contactInquiries: ContactInquiry[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, category, subject, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address so we can reply.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Please provide a subject line (minimum 3 characters).' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please write a message with at least 10 characters.' },
        { status: 400 }
      );
    }

    // 2. Generate unique tracking ticket ID
    const ticketId = `NOOR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const targetEmail = 'salam@nooreilahi.com';

    const newInquiry: ContactInquiry = {
      id: ticketId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      organization: organization?.trim() || undefined,
      category: category || 'general',
      subject: subject.trim(),
      message: message.trim(),
      targetEmail,
      createdAt: new Date().toISOString(),
      status: 'received',
    };

    contactInquiries.unshift(newInquiry);

    // Keep memory cache trimmed to last 100 entries
    if (contactInquiries.length > 100) {
      contactInquiries.pop();
    }

    console.log(`[NOOR CONTACT] New Inquiry [${ticketId}] from ${newInquiry.email} for ${targetEmail}`);
    console.log(`Category: ${newInquiry.category} | Subject: ${newInquiry.subject}`);

    // 3. Dispatch real emails via FastWebHost SMTP (in10.fastwebhost.com)
    const emailResult = await sendContactInquiryEmails({
      ticketId,
      name: newInquiry.name,
      email: newInquiry.email,
      phone: newInquiry.phone,
      organization: newInquiry.organization,
      category: newInquiry.category,
      subject: newInquiry.subject,
      message: newInquiry.message,
    });

    console.log(`[NOOR CONTACT] Email dispatch result for ${ticketId}:`, emailResult);

    return NextResponse.json({
      success: true,
      ticketId,
      targetEmail,
      emailDispatched: emailResult.adminSent,
      message: `Assalamu Alaikum, ${newInquiry.name}. Your message has been received and routed to ${targetEmail}. Our team will respond within 24 hours.`,
      inquiry: {
        id: ticketId,
        category: newInquiry.category,
        createdAt: newInquiry.createdAt,
      },
    });
  } catch (error: any) {
    console.error('[NOOR CONTACT ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing contact request.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Allow authorized dashboard or super admin to view recent contact queries
  return NextResponse.json({
    targetEmail: 'salam@nooreilahi.com',
    totalInquiries: contactInquiries.length,
    recentInquiries: contactInquiries.slice(0, 20),
  });
}
