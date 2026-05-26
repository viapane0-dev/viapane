import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const linkedin = formData.get('linkedin') as string;
    const message = formData.get('message') as string;
    const resumeFile = formData.get('resume') as File | null;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos.' },
        { status: 400 }
      );
    }

    // Prepare attachments
    const attachments: { filename: string; content: Buffer }[] = [];

    if (resumeFile && resumeFile.size > 0) {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Via Pane Site <onboarding@resend.dev>',
      to: ['mkt@viapane.com.br'],
      subject: `[Via Pane - Trabalhe Conosco] Candidatura de ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #001A33; padding: 32px; text-align: center;">
            <h1 style="color: #D3AF37; margin: 0; font-size: 24px;">Via Pane</h1>
            <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px;">Nova candidatura recebida pelo site</p>
          </div>
          
          <div style="padding: 32px;">
            <div style="background: #f0ebe0; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
              <p style="margin: 0; color: #001A33; font-size: 16px; font-weight: 600;">👤 ${name}</p>
              <p style="margin: 4px 0 0; color: #666; font-size: 13px;">Candidato(a) - Trabalhe Conosco</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; width: 120px; vertical-align: top;">E-mail</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #001A33; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #D3AF37; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; vertical-align: top;">Telefone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #001A33; font-size: 15px;">
                  <a href="tel:${phone.replace(/\D/g, '')}" style="color: #D3AF37; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ${linkedin ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; vertical-align: top;">LinkedIn</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #001A33; font-size: 15px;">
                  <a href="${linkedin}" target="_blank" style="color: #D3AF37; text-decoration: none;">${linkedin}</a>
                </td>
              </tr>
              ` : ''}
              ${resumeFile ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; vertical-align: top;">Currículo</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #001A33; font-size: 15px;">📎 ${resumeFile.name} (${(resumeFile.size / 1024).toFixed(0)} KB)</td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 24px;">
              <p style="color: #888; font-size: 13px; margin-bottom: 8px;">Apresentação</p>
              <div style="background: #f8f7f2; border-left: 4px solid #D3AF37; padding: 16px; border-radius: 0 8px 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="background: #f8f7f2; padding: 16px 32px; text-align: center; font-size: 12px; color: #999;">
            ${resumeFile ? '📎 O currículo está anexado a este e-mail.<br>' : ''}
            Este e-mail foi enviado automaticamente pelo formulário "Trabalhe Conosco" do site viapane.com.br
          </div>
        </div>
      `,
      replyTo: email,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Erro ao enviar e-mail.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('API work-with-us error:', err);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
