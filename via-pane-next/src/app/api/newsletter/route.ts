import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e e-mail são obrigatórios.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Via Pane Site <onboarding@resend.dev>',
      to: ['mkt@viapane.com.br'],
      subject: `[Via Pane - Newsletter] Nova mensagem de ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #001A33; padding: 32px; text-align: center;">
            <h1 style="color: #D3AF37; margin: 0; font-size: 24px;">Via Pane</h1>
            <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px;">Nova inscrição na newsletter / mensagem pelo site</p>
          </div>
          
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; width: 120px; vertical-align: top;">Nome</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #001A33; font-size: 15px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; vertical-align: top;">E-mail</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #001A33; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #D3AF37; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
            
            ${message ? `
            <div style="margin-top: 24px;">
              <p style="color: #888; font-size: 13px; margin-bottom: 8px;">Mensagem</p>
              <div style="background: #f8f7f2; border-left: 4px solid #D3AF37; padding: 16px; border-radius: 0 8px 8px 0; color: #333; font-size: 15px; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}
          </div>
          
          <div style="background: #f8f7f2; padding: 16px 32px; text-align: center; font-size: 12px; color: #999;">
            Este e-mail foi enviado automaticamente pelo formulário de newsletter do site viapane.com.br
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Erro ao enviar e-mail.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('API newsletter error:', err);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
