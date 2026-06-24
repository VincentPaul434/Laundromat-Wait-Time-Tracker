import { Input } from '@/components/ui/input';

interface AuthTextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: 'text' | 'email' | 'password';
}

export function AuthTextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
}: AuthTextFieldProps): JSX.Element {
  return (
    <div className="space-y-2.5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-xl border-border bg-white/90 px-4 text-sm text-foreground shadow-[0_6px_18px_rgba(148,163,184,0.10)] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
