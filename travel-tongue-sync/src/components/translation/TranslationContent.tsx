
import TranslationCard from "../TranslationCard";
import { Button } from "@/components/ui/button";

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          onClick={onSwapLanguages}
          variant="secondary"
          className="mx-2"
        >
          Swap Languages
        </Button>
        <Button 
          onClick={onTranslate}
          disabled={!sourceText || isTranslating}
          className="mx-2"
        >
          {isTranslating ? "Translating..." : "Translate"}
        </Button>
      </div>
    </>
  );
}
