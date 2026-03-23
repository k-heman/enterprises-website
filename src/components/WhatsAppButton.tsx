import { MessageCircle } from 'lucide-react';

function WhatsAppButton() {
  const whatsappNumber = '919959916507';
  const message = 'Hello Heman Enterprises! I want to know more about your products and services.';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float flex-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  );
}

export default WhatsAppButton;
