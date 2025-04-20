
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { startSpeechRecognition, SUPPORTED_LANGUAGES } from "@/services/translationService";
import { speakText } from "@/services/ttsService";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface TranslationCardProps {
  title: string;
  language: string;
  text: string;
  onTextChange: (text: string) => void;
  isSource: boolean;
  isListening: boolean;
  onListeningToggle: () => void;
  className?: string;
  isTranslating?: boolean;
}

export default function TranslationCard({
  title,
  language,
  text,
  onTextChange,
  isSource,
  isListening,
  onListeningToggle,
  className = "",
  isTranslating = false,
}: TranslationCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const stopRecognitionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isListening && isSource) {
      stopRecognitionRef.current = startSpeechRecognition(
        language,
        (transcript) => {
          onTextChange(transcript);
        },
        (error) => {
          toast.error(error.message);
          onListeningToggle();
        }
      );
    } else if (stopRecognitionRef.current) {
      stopRecognitionRef.current();
      stopRecognitionRef.current = null;
    }

    return () => {
      if (stopRecognitionRef.current) {
        stopRecognitionRef.current();
      }
    };
  }, [isListening, language, isSource, onTextChange, onListeningToggle]);

  const handleSpeak = async () => {
    setIsSpeaking(true);
    await speakText(text, language);
    setIsSpeaking(false);
  };

  return (
    <Card 
      className={cn(
        `w-full transition-all duration-500 ease-out transform`,
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        isTranslating && !isSource ? "animate-pulse" : "",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {title}
            {isTranslating && !isSource && (
              <span className="inline-block animate-spin">⌛</span>
            )}
          </CardTitle>
          <Badge variant="outline" className="text-xs animate-fade-in">
            <span className="mr-1">🌐</span>
            {SUPPORTED_LANGUAGES.find(lang => lang.code === language)?.name || language}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder={isSource ? "Enter text or speak..." : "Translation will appear here..."}
          value={text}
          onChange={(e) => isSource && onTextChange(e.target.value)}
          className={cn(
            "min-h-24 resize-none transition-all duration-300",
            "focus:ring-2 focus:ring-primary focus:border-transparent",
            isTranslating && !isSource ? "animate-pulse" : ""
          )}
          readOnly={!isSource}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        {isSource ? (
          <Button
            size="icon"
            variant={isListening ? "default" : "outline"}
            onClick={onListeningToggle}
            className="transition-all duration-300 hover:scale-105"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        ) : (
          <Button
            size="icon"
            variant="outline"
            onClick={handleSpeak}
            disabled={!text || isSpeaking}
            className={cn(
              "transition-all duration-300 hover:scale-105",
              isSpeaking && "animate-pulse"
            )}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
