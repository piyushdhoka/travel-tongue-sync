import TranslationCard from "../TranslationCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, SwitchCamera } from "lucide-react";

interface TranslationContentProps {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  translatedText: string;
  isListening: boolean;
  isTranslating: boolean;
  onSourceTextChange: (text: string) => void;
  onListeningToggle: () => void;
  onSwapLanguages: () => void;
  onTranslate: () => void;
}

export default function TranslationContent({
  sourceLanguage,
  targetLanguage,
  sourceText,
  translatedText,
  isListening,
  isTranslating,
  onSourceTextChange,
  onListeningToggle,
  onSwapLanguages,
  onTranslate,
}: TranslationContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TranslationCard
          title="Original"
          language={sourceLanguage}
          text={sourceText}
          onTextChange={onSourceTextChange}
          isSource={true}
          isListening={isListening}
          onListeningToggle={onListeningToggle}
        />
        <TranslationCard
          title="Translation"
          language={targetLanguage}
          text={translatedText}
          onTextChange={() => {}}
          isSource={false}
          isListening={false}
          onListeningToggle={() => {}}
          isTranslating={isTranslating}
        />
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          onClick={onSwapLanguages}
          variant="outline"
          className="group hover:scale-105 transition-all duration-300 hover:bg-secondary/20"
        >
          <SwitchCamera className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Swap Languages
        </Button>
        <Button 
          onClick={onTranslate}
          disabled={!sourceText || isTranslating}
          className="hover:scale-105 transition-all duration-300"
        >
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          {isTranslating ? "Translating..." : "Translate"}
        </Button>
      </div>
    </div>
  );
}
