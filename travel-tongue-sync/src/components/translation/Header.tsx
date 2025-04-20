import { Button } from "@/components/ui/button";
import { Settings, LogOut, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface HeaderProps {
  onSettingsClick: () => void;
  onLogout: () => void;
}

export default function Header({ onSettingsClick, onLogout }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <span className="mr-2">🌐</span>
            Travel Tongue Sync
          </h1>
          <Badge variant="outline" className="animate-fade-in">
            <Globe className="h-3 w-3 mr-1" />
            Groq Powered
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:scale-110 transition-transform"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:scale-110 transition-transform"
            onClick={onSettingsClick}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:scale-110 transition-transform"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6 text-center italic">
        Experience real-time language translation powered by Groq's AI technology – Your perfect companion for global communication
      </p>
    </>
  );
}
