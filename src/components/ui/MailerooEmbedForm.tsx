import React, { useEffect, useRef } from 'react';

const REACLE_FORM_ID = 'ac327b5768122432279ed0a9';

interface MailerooEmbedFormProps {
  className?: string;
}

const MailerooEmbedForm: React.FC<MailerooEmbedFormProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    (window as unknown as Record<string, string>).reacleFormId = REACLE_FORM_ID;

    const existingScript = document.querySelector('script[src="https://reacle.com/static/form.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://reacle.com/static/form.js';
      script.defer = true;
      document.body.appendChild(script);
    }
    scriptLoadedRef.current = true;
  }, []);

  return (
    <div
      id='form-root-publish'
      ref={containerRef}
      className={`min-h-[200px] ${className}`}
    />
  );
};

export default MailerooEmbedForm;
