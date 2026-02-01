import Image from 'next/image';
import './loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <Image
        src="/assests/images/Logo.png"
        alt="Loading AI Innovation Society..."
        width={200}
        height={50}
        className="loading-logo"
        priority
      />
    </div>
  );
}
