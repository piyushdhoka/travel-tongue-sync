
import LanguageSelector from "../LanguageSelector";

interface LanguageControlsProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceLanguageChange: (lang: string) => void;
  onTargetLanguageChange: (lang: string) => void;
}

export default function LanguageControls({
  sourceLanguage,
  targetLanguage,
  onSourceLanguageChange,
  onTargetLanguageChange,
}: LanguageControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <LanguageSelector
        value={sourceLanguage}
        onChange={onSourceLanguageChange}
        label="From"
      />
      <LanguageSelector 
        value={targetLanguage}
        onChange={onTargetLanguageChange}
        label="To"
      />
    </div>
  );
}
