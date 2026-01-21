import React, { useState } from 'react';
import { FiCheck, FiLoader, FiAlertCircle } from 'react-icons/fi';

export type NewsletterRole = 'developer' | 'enthusiast' | 'founder';

interface NewsletterFormProps {
  onSuccess?: () => void;
  className?: string;
  apiEndpoint?: string;
}

interface FormData {
  name: string;
  email: string;
  role: NewsletterRole | null;
  consent: boolean;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  onSuccess,
  className = '',
  apiEndpoint = 'https://hol.org/points/api/newsletter/subscribe',
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: null,
    consent: false,
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleRoleChange = (role: NewsletterRole) => {
    setFormData((prev) => ({
      ...prev,
      role: prev.role === role ? null : role,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!formData.consent) {
      setStatus('error');
      setErrorMessage('Please agree to receive newsletters');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
          consent: formData.consent,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      onSuccess?.();
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred. Please try again.',
      );
    }
  };

  if (status === 'success') {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-8 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            You&apos;re subscribed!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for subscribing to our newsletter. You&apos;ll receive updates about the
            latest developments in HCS standards and the Hedera ecosystem.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 ${className}`}
    >
      <div className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="newsletter-name"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            What should we call you?<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="newsletter-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="NAME"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            E.g. John, DegenDev
          </p>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="newsletter-email"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Enter your email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="EMAIL"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Provide your email address to subscribe. For e.g abc@xyz.com
          </p>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Which word best describes you?<span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {(['developer', 'enthusiast', 'founder'] as NewsletterRole[]).map((role) => (
              <label
                key={role}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                    formData.role === role
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 dark:border-gray-500 group-hover:border-blue-400'
                  }`}
                >
                  {formData.role === role && (
                    <FiCheck className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-gray-700 dark:text-gray-300 capitalize">
                  {role}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors mt-0.5 ${
                formData.consent
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300 dark:border-gray-500'
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, consent: !prev.consent }))
              }
            >
              {formData.consent && <FiCheck className="w-3 h-3 text-white" />}
            </div>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="sr-only"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I agree to receive your newsletters and accept the data privacy
              statement.<span className="text-red-500">*</span>
            </span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-8">
            You may unsubscribe at any time using the link in our newsletter.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex-shrink-0">
            <svg
              className="w-10 h-10 text-blue-500"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 12v8M20 24v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Stars around the shield */}
              <circle cx="8" cy="12" r="1.5" fill="currentColor" />
              <circle cx="32" cy="12" r="1.5" fill="currentColor" />
              <circle cx="6" cy="20" r="1" fill="currentColor" />
              <circle cx="34" cy="20" r="1" fill="currentColor" />
              <circle cx="8" cy="28" r="1.5" fill="currentColor" />
              <circle cx="32" cy="28" r="1.5" fill="currentColor" />
              <circle cx="12" cy="8" r="1" fill="currentColor" />
              <circle cx="28" cy="8" r="1" fill="currentColor" />
              <circle cx="12" cy="32" r="1" fill="currentColor" />
              <circle cx="28" cy="32" r="1" fill="currentColor" />
            </svg>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            We use Maileroo as our email platform. By submitting this form you
            agree that the personal data you provided will be transferred to
            Maileroo for processing in accordance with{' '}
            <a
              href="https://maileroo.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Maileroo&apos;s Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Error Message */}
        {status === 'error' && errorMessage && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <FiAlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto px-8 py-3 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'SUBSCRIBE'
          )}
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;
