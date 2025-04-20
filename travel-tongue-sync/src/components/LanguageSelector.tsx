import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_LANGUAGES } from "@/services/translationService";

const getLanguageEmoji = (code: string): string => {
  const emojiMap: { [key: string]: string } = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
    it: '🇮🇹',
    ja: '🇯🇵',
    ko: '🇰🇷',
    zh: '🇨🇳',
    ru: '🇷🇺',
    ar: '🇸🇦',
    hi: '🇮🇳',
    pt: '🇵🇹',
  };
  return emojiMap[code] || '🌐';
};

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export default function LanguageSelector({ 
  value, 
  onChange, 
  label,
  className = "",
}: LanguageSelectorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full transition-all duration-300 hover:ring-2 hover:ring-primary/20">
          <SelectValue 
            placeholder="Select a language"
            className="flex items-center gap-2"
          >
            {value && (
              <span className="flex items-center gap-2">
                <span>{getLanguageEmoji(value)}</span>
                {SUPPORTED_LANGUAGES.find(lang => lang.code === value)?.name}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem 
                key={lang.code} 
                value={lang.code}
                className="transition-colors duration-200 hover:bg-primary/10"
              >
                <span className="flex items-center gap-2">
                  <span>{getLanguageEmoji(lang.code)}</span>
                  {lang.name}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
