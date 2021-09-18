import { FaWhatsapp } from 'react-icons/fa';
export function StickyWaLink() {
  return (
    <a
      title="Chat with me"
      target="__blank"
      href="https://wa.me/6282240183482"
      className="fixed bottom-1 right-1 z-50 p-2"
      style={{
        color: '#0C9715'
      }}
    >
      <FaWhatsapp className="w-10 h-10" />
    </a>
  );
}
