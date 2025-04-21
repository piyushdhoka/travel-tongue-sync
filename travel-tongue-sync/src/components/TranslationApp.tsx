import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { translateText } from "@/services/translationService";
import { toast } from "@/components/ui/sonner";
import Header from "./translation/Header";
import LanguageControls from "./translation/LanguageControls";
import TranslationContent from "./translation/TranslationContent";
import LanguageGreetingBar from "./translation/LanguageGreetingBar";
import FlagSlideshow from "./translation/FlagSlideshow";

export default function TranslationApp() {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setTranslatedText(sourceText);
      return;
    }

    try {
      setIsTranslating(true);
      const result = await translateText({
        text: sourceText,
        sourceLanguage,
        targetLanguage,
      });
      setTranslatedText(result);
    } catch (error) {
      // Error handling is done in the service
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    if (!sourceText) {
      setTranslatedText("");
      return;
    }

    const timer = setTimeout(() => {
      handleTranslate();
    }, 1000);

    return () => clearTimeout(timer);
  }, [sourceText, sourceLanguage, targetLanguage]);

  return (
    <div className="min-h-screen relative bg-dot-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background opacity-90" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,theme(colors.primary.DEFAULT/0.05),transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_500px,theme(colors.secondary.DEFAULT/0.05),transparent_80%)]" />
      </div>
      <div className="relative">
        <div className="pt-4">
          <LanguageGreetingBar />
        </div>
        <div className="container mx-auto max-w-5xl py-6 px-4">
          <Card className="relative p-6 shadow-xl bg-background/40 backdrop-blur-xl border border-border/20 rounded-xl">
            <Header />
            
            <div className="flex justify-between items-center mb-6">
              <LanguageControls
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                onSourceLanguageChange={setSourceLanguage}
                onTargetLanguageChange={setTargetLanguage}
              />
            </div>

            <div className="transition-all duration-500 ease-in-out">
              <TranslationContent
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                sourceText={sourceText}
                translatedText={translatedText}
                isTranslating={isTranslating}
                onSourceTextChange={setSourceText}
                onSwapLanguages={handleSwapLanguages}
                onTranslate={handleTranslate}
              />
            </div>

            <FlagSlideshow />
          </Card>
        </div>
      </div>
    </div>
  );
}
