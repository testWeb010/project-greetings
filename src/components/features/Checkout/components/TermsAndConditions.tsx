import React from 'react';

interface TermsAndConditionsProps {
  agreeTerms: boolean;
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Use a more specific type if possible
  errors: Record<string, string>;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  agreeTerms,
  setFormData,
  errors,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, agreeTerms: e.target.checked }))}
          className={`mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
            errors.agreeTerms ? 'border-red-500' : ''
          }`}
        />
        <div className="text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>.
          I understand that my subscription will auto-renew unless cancelled.
        </div>
      </label>
      {errors.agreeTerms && (
        <p className="mt-2 text-sm text-red-600">{errors.agreeTerms}</p>
      )}
    </div>
  );
};

export default TermsAndConditions;
