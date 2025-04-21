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

const API_KEY = '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'; // Replace this with your actual API key

interface TranslateTextParams {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export const translateText = async ({ text, sourceLanguage, targetLanguage }: TranslateTextParams): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a translation assistant. Translate the following text from ${sourceLanguage} to ${targetLanguage}. Provide only the translation, no explanations or additional text.`
          },
          {
            role: 'user',
            content: text
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Translation failed');
    }

    const data = await response.json();
    const translation = data.choices[0].message.content.trim();
    return translation;
  } catch (error: any) {
    toast.error('Translation failed: ' + (error.message || 'Unknown error'));
    return '';
  }
};
