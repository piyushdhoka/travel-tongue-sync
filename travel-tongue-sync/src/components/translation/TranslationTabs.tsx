import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MessageCircle } from "lucide-react";

interface TranslationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function TranslationTabs({ activeTab, onTabChange }: TranslationTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="grid grid-cols-2 w-[400px] mx-auto p-1">
        <TabsTrigger 
          value="voice" 
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
        >
          <Mic className="h-4 w-4" />
          Voice Translation
        </TabsTrigger>
        <TabsTrigger 
          value="text" 
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
        >
          <MessageCircle className="h-4 w-4" />
          Text Translation
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
