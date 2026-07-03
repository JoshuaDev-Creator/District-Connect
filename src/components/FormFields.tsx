import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelTa?: string;
  error?: string;
}

export function TextField({ label, labelTa, error, className = '', ...props }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {labelTa && <span className="text-gray-400 ml-1">({labelTa})</span>}
        {props.required && <span className="text-tvk-red ml-1">*</span>}
      </label>
      <input
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tvk-red focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  labelTa?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, labelTa, error, options, className = '', ...props }: SelectFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {labelTa && <span className="text-gray-400 ml-1">({labelTa})</span>}
        {props.required && <span className="text-tvk-red ml-1">*</span>}
      </label>
      <select
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tvk-red focus:border-transparent bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelTa?: string;
  error?: string;
}

export function TextAreaField({ label, labelTa, error, className = '', ...props }: TextAreaFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {labelTa && <span className="text-gray-400 ml-1">({labelTa})</span>}
        {props.required && <span className="text-tvk-red ml-1">*</span>}
      </label>
      <textarea
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tvk-red focus:border-transparent resize-y min-h-[100px] ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-tvk-red hover:bg-tvk-red-dark text-white',
    secondary: 'bg-tvk-gold hover:bg-tvk-gold-dark text-tvk-black',
    outline: 'border-2 border-tvk-red text-tvk-red hover:bg-tvk-red hover:text-white',
  };

  return (
    <button
      className={`px-6 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Alert({ type, children }: { type: 'success' | 'error' | 'info'; children: React.ReactNode }) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`border rounded-lg px-4 py-3 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
}
