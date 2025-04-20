
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiKey, setApiKey } from "@/services/translationService";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKeyState] = useState("");

  useEffect(() => {
    const key = getApiKey();
    if (key) {
      setApiKeyState(key);
    }
  }, [isOpen]);

  const handleSave = () => {
    setApiKey(apiKey);
    onClose();
  };

  const isValidApiKey = apiKey.startsWith("gsk_");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Groq API Key</DialogTitle>
          <DialogDescription>
            Enter your Groq API key to use the translation service.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Label htmlFor="apiKey" className="text-right">
            API Key
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="gsk_..."
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            className="w-full"
          />
          {apiKey && !isValidApiKey && (
            <p className="text-sm text-destructive">
              API key should start with "gsk_"
            </p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValidApiKey}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
