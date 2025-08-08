export interface SignInFormData {
  email: string;
  password: string;
  phone?: string;
  name?: string;
  confirmPassword?: string;
}

export interface LocalAuthSectionProps {
  mode: 'signin' | 'signup' | 'phone' | 'forgot';
  onModeChange: (mode: 'signin' | 'signup' | 'phone' | 'forgot') => void;
  onClose: () => void;
  onSubmit?: (formData: SignInFormData | SignUpFormData) => Promise<void>;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface AuthFormErrors {
  [key: string]: string;
}

export interface SocialAuthProvider {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface AuthContainerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup' | 'phone';
  onModeChange: (mode: 'signin' | 'signup' | 'phone' | 'forgot') => void;
}

export interface SignInFormProps {
  formData: any; // Replace 'any' with a specific type if available
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Replace 'any'
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  authMethod: 'email' | 'phone';
  setAuthMethod: React.Dispatch<React.SetStateAction<'email' | 'phone'>>;
  isOtpSent: boolean;
  setIsOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendOtp: () => void;
  onModeChange: (mode: 'signin' | 'signup' | 'phone' | 'forgot') => void; // Added onModeChange
}

export interface SignUpFormProps {
  formData: SignUpFormData; // Using specific type
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>; // Using specific type
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onModeChange: (mode: 'signin' | 'signup' | 'phone' | 'forgot') => void; // Added onModeChange
}

export interface ForgotPasswordFormProps {
  formData: any; // Replace 'any' with a specific type
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Replace 'any'
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onModeChange: (mode: 'signin' | 'signup' | 'forgot') => void;
}

export interface SocialAuthSectionProps {
  handleSocialAuth: (provider: 'google' | 'facebook' | 'linkedin' | 'twitter' | 'phone') => void;
  mode: 'signin' | 'signup' | 'phone';
}

export interface SocialAuthButtonsProps {
  handleSocialAuth: (provider: 'google' | 'facebook' | 'linkedin' | 'twitter') => void;
  mode: 'signin' | 'signup' | 'phone';
}
