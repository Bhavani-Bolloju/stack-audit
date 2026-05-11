import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, totalMonthlySavings, totalAnnualSavings, auditId } =
      await req.json();

    const recipient =
      process.env.NODE_ENV === "production" ? email : "mayra019011@gmail.com";
    
    
    console.log(totalAnnualSavings, totalMonthlySavings, "savings info resend")

    const data = await resend.emails.send({
      from: "StackAudit <onboarding@resend.dev>",
      to: recipient,
      subject: `Your StackAudit Report — Save $${totalMonthlySavings}/mo`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">Your AI Spend Audit</h1>
          <p style="color: #6b7280; margin-bottom: 32px;">Here's a summary of your StackAudit results.</p>
          
          <div style="background: #000; color: #fff; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px;">
            <p style="color: #9ca3af; font-size: 14px; margin-bottom: 8px;">Potential monthly savings</p>
            <p style="font-size: 48px; font-weight: 900; margin: 0;">$${totalMonthlySavings}</p>
            <p style="color: #9ca3af; font-size: 14px; margin-top: 8px;">$${totalAnnualSavings} per year</p>
          </div>

          ${
            totalMonthlySavings > 500 ?
              `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <p style="font-weight: 600; color: #166534; margin-bottom: 8px;">You qualify for Credex credits</p>
            <p style="color: #15803d; font-size: 14px; margin-bottom: 16px;">Get discounted AI credits and capture even more savings.</p>
            <a href="https://credex.rocks" style="background: #16a34a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Book a consultation →</a>
          </div>
          `
            : ""
          }

          <p style="color: #6b7280; font-size: 14px;">
            View your full audit at: <a href="${process.env.NEXT_PUBLIC_APP_URL}/audit/${auditId}" style="color: #000;">stackaudit.app/audit/${auditId}</a>
          </p>
        </div>
      `
    });

    console.log(data, "resend response");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

