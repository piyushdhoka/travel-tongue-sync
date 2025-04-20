
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface HeaderProps {
  onSettingsClick: () => void;
  onLogout: () => void;
}

export default function Header({ onSettingsClick, onLogout }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="text-primary mr-2">🌐</span>
          Travel Tongue Sync
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onSettingsClick}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4">
          Powered by Groq's AI technology for real-time language translation. Perfect for travelers and remote teams.
        </p>
        <Badge variant="outline" className="mb-4">
          <Globe className="h-3 w-3 mr-1" />
          Groq Powered
        </Badge>
      </div>
    </>
  );
}
