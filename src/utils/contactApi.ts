import { getApiUrl } from "./apiConfig";

// TypeScript interface for contact form data

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  captcha?: string; // Answer to logic challenge
}

// TypeScript interface for API response
export interface ContactApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

// API function to submit contact form
export async function submitContactForm(formData: ContactFormData): Promise<ContactApiResponse> {
  try {
    const response = await fetch(getApiUrl('contact.php'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const data = await response.json();
    
    return {
      success: true,
      message: data.message || 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Validation functions
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Basic phone validation - adjust regex based on your requirements
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateFormData(formData: ContactFormData): {
  isValid: boolean;
  errors: { [key: string]: string };
} {
  const errors: { [key: string]: string } = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  }

  // Captcha answer is required
  if (formData.captcha === undefined || formData.captcha === '') {
    errors.captcha = 'Security answer is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
