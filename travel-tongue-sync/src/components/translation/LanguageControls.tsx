import LanguageSelector from "../LanguageSelector";
import { ArrowLeftRight } from "lucide-react";

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
    <div className="flex items-center gap-4">
      <LanguageSelector
        value={sourceLanguage}
        onChange={onSourceLanguageChange}
        label="From"
        className="w-[180px]"
      />
      <div className="flex items-center justify-center w-8 h-8">
        <ArrowLeftRight className="w-5 h-5 text-muted-foreground animate-pulse" />
      </div>
      <LanguageSelector 
        value={targetLanguage}
        onChange={onTargetLanguageChange}
        label="To"
        className="w-[180px]"
      />
    </div>
  );
}
