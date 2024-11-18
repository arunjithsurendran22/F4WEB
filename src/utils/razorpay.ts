// utils/razorpay.ts

export interface PaymentOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    customerName: string;
    customerEmail: string;
    customerContact: string;
}

export interface RazorpayPaymentResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export const loadRazorpay = () => {
    return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve();
        };
        document.body.appendChild(script);
    });
};

export const initiatePayment = async (paymentData: PaymentOptions): Promise<RazorpayPaymentResponse> => {
    if (typeof window !== 'undefined') await loadRazorpay();

    return new Promise((resolve, reject) => {
        const options = {
            key: paymentData.key,
            amount: paymentData.amount * 100, // Amount is in currency subunits
            currency: paymentData.currency,
            name: paymentData.name,
            description: paymentData.description,
            image: paymentData.image,
            order_id: paymentData.order_id, // Use order_id obtained from your server
            handler: function (response: RazorpayPaymentResponse) {
                // Handle successful payment here
                resolve(response); // Resolve with the response
            },
            modal: {
                ondismiss: function () {
                    // Handle payment modal dismissal if necessary
                    reject(new Error('Payment dismissed'));
                }
            },
            prefill: {
                name: paymentData.customerName,
                email: paymentData.customerEmail,
                contact: paymentData.customerContact,
            },
            theme: {
                color: '#F37254', // Customize the color
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    });
};
