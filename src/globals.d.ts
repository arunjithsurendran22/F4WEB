// globals.d.ts

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined; // Use RecaptchaVerifier
    Razorpay: any; // Keep Razorpay as any
  }
}

export {};
