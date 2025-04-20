
# Travel Tongue Sync

A real-time language translation application built with React and powered by the Groq API. Perfect for travelers and remote teams needing seamless multilingual communication.

## Features

- Real-time voice-to-text translation
- Text-based translation
- Support for 12 languages
- Text-to-speech for translated content
- Simple, intuitive interface

## How to Use

1. **API Key Setup**: The app is pre-configured with your Groq API key. You can update it by clicking the settings icon in the top-right corner.

2. **Select Languages**: Choose your source and target languages from the dropdown menus.

3. **Voice Translation**: 
   - Select the "Voice" tab
   - Click the microphone button to start recording
   - Speak clearly in your selected source language
   - The app will automatically translate what you say
   - Click the speaker icon on the translation card to hear the translation

4. **Text Translation**:
   - Type or paste text in the source language
   - The app will automatically translate after you stop typing
   - Click the speaker icon to hear the translation spoken aloud

5. **Swap Languages**: Click the "Swap Languages" button to reverse the source and target languages.

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Web Speech API for speech recognition and synthesis
- Groq API for AI-powered translation

## Privacy Note

Your voice recordings and translations are processed on-device when possible, and through the Groq API when needed. No conversations are permanently stored.

## Limitations

- Speech recognition requires a modern browser with Web Speech API support
- Translation quality depends on the Groq language model
- Internet connection required for translations

Enjoy communicating across language barriers with Travel Tongue Sync!
