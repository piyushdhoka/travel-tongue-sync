import { useEffect, useState } from "react";
import { SUPPORTED_LANGUAGES } from "@/services/translationService";

const greetings: { [key: string]: string } = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  it: "Ciao",
  ja: "こんにちは",
  ko: "안녕하세요",
  zh: "你好",
  ru: "Здравствуйте",
  ar: "مرحبا",
  hi: "नमस्ते",
  pt: "Olá"
};

export default function LanguageGreetingBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === SUPPORTED_LANGUAGES.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300); // Reduced from 500ms to 300ms for even faster transition
    }, 2000); // Reduced from 3000ms to 2000ms for quicker cycling

    return () => clearInterval(interval);
  }, []);

  const currentLanguage = SUPPORTED_LANGUAGES[currentIndex];
  const greeting = greetings[currentLanguage.code] || "Hello";

  return (
    <div className="w-full bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-xl mx-4 my-2">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-background to-secondary/20 shadow-lg">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <div 
              className={`
                relative px-4 py-3 text-center
                transition-all duration-300 ease-out
                ${isTransitioning 
                  ? "opacity-0 transform -translate-y-2 scale-95" 
                  : "opacity-100 transform translate-y-0 scale-100"
                }
              `}
            >
              <span className="text-xl font-medium text-foreground/90 drop-shadow-sm">{greeting}</span>
            </div>
            <div className="absolute inset-0 border-y border-primary/10" />
          </div>
        </div>
      </div>
    </div>
  );
}