import TranslationCard from "../TranslationCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, SwitchCamera } from "lucide-react";

interface TranslationContentProps {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  translatedText: string;
  isTranslating: boolean;
  onSourceTextChange: (text: string) => void;
  onSwapLanguages: () => void;
  onTranslate: () => void;
}

export default function TranslationContent({
  sourceLanguage,
  targetLanguage,
  sourceText,
  translatedText,
  isTranslating,
  onSourceTextChange,
  onSwapLanguages,
  onTranslate,
}: TranslationContentProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TranslationCard
          title="Original"
          language={sourceLanguage}
          text={sourceText}
          onTextChange={onSourceTextChange}
          isSource={true}
        />
        <TranslationCard
          title="Translation"
          language={targetLanguage}
          text={translatedText}
          onTextChange={() => {}}
          isSource={false}
          isTranslating={isTranslating}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
        <Button 
          onClick={onSwapLanguages}
          variant="outline"
          className="group w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:bg-secondary/20"
        >
          <SwitchCamera className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Swap Languages
        </Button>
        <Button 
          onClick={onTranslate}
          disabled={!sourceText || isTranslating}
          className="w-full sm:w-auto hover:scale-105 transition-all duration-300"
        >
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          {isTranslating ? "Translating..." : "Translate"}
        </Button>
      </div>
    </div>
  );
}
