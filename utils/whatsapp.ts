/**
 * Generates a WhatsApp URL for initiating a chat with pre-filled message
 * @param phoneNumber The recipient's phone number in international format (e.g., 1234567890)
 * @param message The pre-filled message to send
 * @returns A properly formatted WhatsApp URL
 */
export function generateWhatsAppURL(phoneNumber: string, message: string): string {
  // Remove any non-digit characters from phone number
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Construct the WhatsApp URL
  return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
}

/**
 * Generates a product-specific WhatsApp message
 * @param productName The name of the product
 * @param productPrice The price of the product
 * @param productUrl The URL of the product page
 * @returns A formatted message for WhatsApp
 */
export function generateProductWhatsAppMessage(
  productName: string, 
  productPrice: number, 
  productUrl: string
): string {
  return `Hi, I'm interested in ${productName} - Rs. ${productPrice}. Can you help me with this?\n\nProduct link: ${productUrl}`;
}