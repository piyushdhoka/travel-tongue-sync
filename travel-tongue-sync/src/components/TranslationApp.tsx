import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthProvider";
import ApiKeyModal from "./ApiKeyModal";
import { getApiKey, setApiKey, translateText } from "@/services/translationService";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import Header from "./translation/Header";
import LanguageControls from "./translation/LanguageControls";
import TranslationTabs from "./translation/TranslationTabs";
import TranslationContent from "./translation/TranslationContent";
import TranslationHistory from "./translation/TranslationHistory";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function TranslationApp() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("voice");
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    const storedApiKey = getApiKey();
    if (!storedApiKey) {
      const userProvidedKey = "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";
      if (userProvidedKey) {
        setApiKey(userProvidedKey);
        toast.success("API key set successfully");
      } else {
        setIsApiKeyModalOpen(true);
      }
    }
  }, []);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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

      if (user) {
        await supabase.from("translation_history").insert({
          user_id: user.id,
          source_language: sourceLanguage,
          target_language: targetLanguage,
          original_text: sourceText,
          translated_text: result,
        });
      }
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
    <div 
      className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 shadow-lg bg-card/95 backdrop-blur-sm border-t border-white/20">
          <Header
            onSettingsClick={() => setIsApiKeyModalOpen(true)}
            onLogout={handleLogout}
          />
          
          <div className="flex justify-between items-center mb-4">
            <LanguageControls
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceLanguageChange={setSourceLanguage}
              onTargetLanguageChange={setTargetLanguage}
            />
            <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <BookOpen className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <TranslationHistory />
              </DialogContent>
            </Dialog>
          </div>

          <TranslationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <TranslationContent
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            sourceText={sourceText}
            translatedText={translatedText}
            isListening={isListening}
            isTranslating={isTranslating}
            onSourceTextChange={setSourceText}
            onListeningToggle={() => setIsListening(!isListening)}
            onSwapLanguages={handleSwapLanguages}
            onTranslate={handleTranslate}
          />
        </Card>

        <ApiKeyModal 
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
        />
      </div>
    </div>
  );
}
