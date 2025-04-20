
// Translation service using Groq API
import { toast } from "@/components/ui/sonner";

// Languages we support
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'pt', name: 'Portuguese' },
];

let apiKey = '';

export const setApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem('groqApiKey', key);
};

export const getApiKey = (): string => {
  if (!apiKey) {
    const storedKey = localStorage.getItem('groqApiKey');
    if (storedKey) {
      apiKey = storedKey;
    }
  }
  return apiKey;
};

interface TranslateTextParams {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export const translateText = async ({ text, sourceLanguage, targetLanguage }: TranslateTextParams): Promise<string> => {
  try {
    const key = getApiKey();
    if (!key) {
      throw new Error('API key not set');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a translation assistant. Translate the text from ${sourceLanguage} to ${targetLanguage}. Only return the translation without any additional text or explanation.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to translate text');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to translate text';
    toast.error(errorMessage);
    throw error;
  }
};

// Speech recognition setup
export const startSpeechRecognition = (
  language: string, 
  onResult: (text: string) => void,
  onError: (error: Error) => void
): (() => void) => {
  if (!('webkitSpeechRecognition' in window)) {
    onError(new Error('Speech recognition not supported in this browser'));
    return () => {};
  }

  // @ts-ignore - SpeechRecognition is not in TypeScript's lib.dom.d.ts
  const recognition = new webkitSpeechRecognition();
  recognition.lang = language;
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event: any) => {
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(new Error(`Speech recognition error: ${event.error}`));
  };

  recognition.start();
  
  return () => {
    recognition.stop();
  };
};

// Text-to-speech
export const speakText = (text: string, language: string): void => {
  if (!('speechSynthesis' in window)) {
    toast.error('Text-to-speech is not supported in this browser');
    return;
  }

  // Stop any current speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  
  // Find a voice for the language if possible
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(language));
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};
