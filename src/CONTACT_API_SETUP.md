# Contact Form API Setup Guide

## Overview
The Contact Us form now includes API integration for sending emails when users submit the form. This guide explains how to connect your backend API endpoint.

## Implementation Details

### Files Modified
1. **`/utils/contactApi.ts`** - Contains API logic and validation
2. **`/components/ContactUsForm.tsx`** - Updated with API integration

### Features Implemented
✅ Multi-step form validation
✅ API call on form submission
✅ Loading state (shows "Sending..." while submitting)
✅ Error handling with user-friendly messages
✅ Success message with auto-reset
✅ Email and phone validation
✅ Works on both desktop and mobile versions

---

## How to Connect Your API

### Step 1: Update API Endpoint
Open `/utils/contactApi.ts` and replace the placeholder URL with your actual endpoint:

```typescript
// Line 14 in /utils/contactApi.ts
const response = await fetch('https://your-api.com/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

**Replace `https://your-api.com/api/contact` with your actual API endpoint.**

---

### Step 2: Expected API Request Format

Your API should accept a POST request with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, I need help with my mortgage application."
}
```

**TypeScript Interface:**
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
```

---

### Step 3: Expected API Response Format

Your API should return a JSON response in one of these formats:

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Failed to send email. Please try again.",
  "error": "SMTP connection failed"
}
```

---

## Validation Rules

The form includes built-in validation:

### Email Validation
- Must be in valid email format (contains @ and domain)
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Phone Validation
- Must be at least 10 characters
- Allows digits, spaces, dashes, plus, and parentheses
- Regex: `/^[\d\s\-\+\(\)]{10,}$/`

### Name & Message Validation
- Cannot be empty (trimmed)

---

## Example Backend Implementation

### Node.js + Express Example

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Configure your email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@jigsawfinancial.com', // Your company email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message
    });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Python + Flask Example

```python
from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        message = data.get('message')

        # Validate input
        if not all([name, email, phone, message]):
            return jsonify({
                'success': False,
                'message': 'All fields are required'
            }), 400

        # Send email
        msg = MIMEMultipart()
        msg['From'] = 'your-email@gmail.com'
        msg['To'] = 'info@jigsawfinancial.com'
        msg['Subject'] = f'New Contact Form Submission from {name}'

        body = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Message:</strong></p>
        <p>{message}</p>
        """

        msg.attach(MIMEText(body, 'html'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('your-email@gmail.com', 'your-password')
        server.send_message(msg)
        server.quit()

        return jsonify({
            'success': True,
            'message': 'Your message has been sent successfully!'
        })

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({
            'success': False,
            'message': 'Failed to send message. Please try again.',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(port=3000)
```

---

## Testing Without API

For testing purposes, the current implementation simulates an API call with a delay. The form will:
1. Show loading state ("Sending...")
2. Wait briefly to simulate network request
3. Show success message
4. Reset form after 3 seconds

To see actual API integration in action, simply update the API endpoint URL in `/utils/contactApi.ts`.

---

## User Experience Flow

### Desktop & Mobile (Both work the same)

1. **Step 1:** User enters their name → Clicks "Submit & next"
2. **Step 2:** User enters their email → Clicks "Submit & next"
3. **Step 3:** User enters their phone → Clicks "Submit & next"
4. **Step 4:** User enters their message → Clicks "Submit"
5. **Loading:** Button shows "Sending..." and is disabled
6. **Success:** Shows success message with checkmark icon
7. **Auto-reset:** After 3 seconds, form resets to Step 1

### Error Handling

If submission fails:
- Error message appears below the submit button
- User can try again
- Error message auto-hides after 3 seconds

---

## Customization

### Change Validation Rules

Edit `/utils/contactApi.ts`:

```typescript
// Customize email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Modify this regex
  return emailRegex.test(email);
}

// Customize phone validation
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/; // Modify this regex
  return phoneRegex.test(phone);
}
```

### Change Success Message Duration

Edit `/components/ContactUsForm.tsx` (appears twice - once for desktop, once for mobile):

```typescript
// Line ~255 and similar location for mobile
setTimeout(() => {
  setIsSubmitted(false);
  // Reset form
}, 3000); // Change 3000 to desired milliseconds
```

---

## Security Considerations

⚠️ **Important Security Notes:**

1. **Never expose API keys in frontend code**
2. **Always validate input on the backend** (don't trust frontend validation alone)
3. **Implement rate limiting** to prevent spam
4. **Use CORS properly** to restrict which domains can call your API
5. **Sanitize user input** on the backend to prevent injection attacks
6. **Consider using reCAPTCHA** to prevent bot submissions

---

## Troubleshooting

### "Failed to send message" error
- Check if API endpoint URL is correct
- Verify API is running and accessible
- Check browser console for CORS errors
- Ensure API accepts JSON content type

### Form doesn't submit
- Check browser console for errors
- Verify all fields are filled correctly
- Ensure validation is passing

### Success message doesn't appear
- Check if API is returning correct response format
- Verify `success: true` is in the response

---

## Support

For questions or issues with the contact form implementation, please check:
- Browser console for error messages
- Network tab to see API request/response
- Backend server logs for API errors

---

**Last Updated:** December 2025
