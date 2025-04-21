import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          <Badge variant="secondary" className="text-xs self-start sm:self-auto animate-fade-in hover:bg-primary/20">
            <span className="mr-1">🌐</span>
            {SUPPORTED_LANGUAGES.find(lang => lang.code === language)?.name || language}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Textarea
          placeholder={isSource ? "Enter text..." : "Translation will appear here..."}
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
