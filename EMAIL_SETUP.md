# EmailJS Setup Instructions

## 🚀 Setting up Email Functionality for Project Inquiries

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Connect Gmail Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as the provider
4. Connect your Gmail account (technorchid.dev@gmail.com)
5. Name it "service_gmail" (or use the ID provided)

### Step 3: Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:**
New Project Inquiry from {{from_name}}

**Body:**
```
Hi Subrata,

You have received a new project inquiry!

📋 Project Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Client Information:
• Name: {{from_name}}
• Email: {{from_email}}
• Company: {{company}}

🎯 Project Requirements:
• Project Type: {{project_type}}
• Budget Range: {{budget}}
• Timeline: {{timeline}}

📝 Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
Portfolio Contact Form
```

4. Save the template with ID "template_project_inquiry"

### Step 4: Get Your Keys
1. In dashboard, go to "Account" → "General"
2. Copy your Public Key
3. Note your Service ID and Template ID

### Step 5: Configure Environment Variables
Update your `.env` file with the actual values:

```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### Step 6: Test the Form
1. Run your development server: `npm run dev`
2. Fill out the contact form
3. Submit to test email delivery
4. Check your email (technorchid.dev@gmail.com)

## 📧 Email Template Variables
- `{{from_name}}` - Client's name
- `{{from_email}}` - Client's email
- `{{company}}` - Company name (optional)
- `{{project_type}}` - Type of project
- `{{budget}}` - Budget range
- `{{timeline}}` - Project timeline
- `{{message}}` - Detailed message

## 🔧 Troubleshooting
- Make sure all environment variables are set correctly
- Verify your Gmail service is connected and verified
- Check that your email template uses the correct variable names
- Ensure your EmailJS account has available email quota (free tier: 200 emails/month)

## 💡 Pro Tips
- Test the form thoroughly before going live
- Monitor your EmailJS dashboard for delivery status
- Consider upgrading to a paid plan for higher limits
- Add email validation on the frontend for better UX
