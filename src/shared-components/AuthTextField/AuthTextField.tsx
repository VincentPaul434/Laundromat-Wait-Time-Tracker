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
      <label htmlFor={id} className="block text-[11px] font-light uppercase tracking-[0.34em] text-foreground/85">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-none border-primary/35 bg-card px-4 text-[15px] font-light tracking-[0.04em] text-foreground shadow-none placeholder:font-light placeholder:tracking-[0.04em] placeholder:text-muted-foreground/75 focus-visible:border-primary focus-visible:ring-primary/20"
      />
      {error ? <p className="text-xs font-light tracking-[0.04em] text-destructive">{error}</p> : null}
    </div>
  );
}
