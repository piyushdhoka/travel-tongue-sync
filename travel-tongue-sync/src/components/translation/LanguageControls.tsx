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
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-[180px]">
        <LanguageSelector
          value={sourceLanguage}
          onChange={onSourceLanguageChange}
          label="From"
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-center w-8 h-8 rotate-90 sm:rotate-0">
        <ArrowLeftRight className="w-5 h-5 text-muted-foreground animate-pulse" />
      </div>
      <div className="w-full sm:w-[180px]">
        <LanguageSelector 
          value={targetLanguage}
          onChange={onTargetLanguageChange}
          label="To"
          className="w-full"
        />
      </div>
    </div>
  );
}
