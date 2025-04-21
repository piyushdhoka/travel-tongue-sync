import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mic, Volume2, StopCircle } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/services/translationService";
import { cn } from "@/lib/utils";

interface TranslationCardProps {
  title: string;
  language: string;
  text: string;
  onTextChange: (text: string) => void;
  isSource: boolean;
  className?: string;
  isTranslating?: boolean;
}

export default function TranslationCard({
  title,
  language,
  text,
  onTextChange,
  isSource,
  className = "",
  isTranslating = false,
}: TranslationCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Initialize speech recognition only for source card
    if (isSource && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        if (event.results[0].isFinal) {
          onTextChange(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      setRecognition(recognition);
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [language]);

  const handleStartRecording = () => {
    if (recognition && !isRecording) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis is not supported in this browser');
      return;
    }

    if (!text) {
      console.error('No text to speak');
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;

      // Add event listeners for debugging
      utterance.onstart = () => {
        console.log('Started speaking');
      };

      utterance.onend = () => {
        console.log('Finished speaking');
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error during speech synthesis:', error);
    }
  };

  return (
    <Card 
      className={cn(
        "w-full transition-all duration-300 ease-out transform",
        "border-opacity-50 backdrop-blur-sm min-h-[200px] flex flex-col",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        isTranslating && !isSource ? "animate-pulse" : "",
        className
      )}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            {title}
            {isTranslating && !isSource && (
              <span className="inline-block animate-spin">⌛</span>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {isSource && (
              <Button
                variant="outline"
                size="icon"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={cn(
                  "transition-all duration-300",
                  isRecording && "bg-red-500 text-white hover:bg-red-600"
                )}
              >
                {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            )}
            {!isSource && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleSpeak}
                disabled={!text}
                className="transition-all duration-300"
                title="Listen to translation"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
            <Badge variant="secondary" className="text-xs animate-fade-in hover:bg-primary/20">
              <span className="mr-1">🌐</span>
              {SUPPORTED_LANGUAGES.find(lang => lang.code === language)?.name || language}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Textarea
          placeholder={isSource ? "Enter text or click the microphone to speak..." : "Translation will appear here..."}
          value={text}
          onChange={(e) => isSource && onTextChange(e.target.value)}
          className={cn(
            "h-full min-h-[120px] resize-none transition-all duration-300",
            "focus:ring-2 focus:ring-primary focus:border-transparent",
            "text-base sm:text-lg",
            isTranslating && !isSource ? "animate-pulse" : ""
          )}
          readOnly={!isSource}
        />
      </CardContent>
    </Card>
  );
}
