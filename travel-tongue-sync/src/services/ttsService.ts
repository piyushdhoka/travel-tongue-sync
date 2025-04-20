
import { toast } from "@/components/ui/sonner";

export const speakText = async (text: string, language: string): Promise<void> => {
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
