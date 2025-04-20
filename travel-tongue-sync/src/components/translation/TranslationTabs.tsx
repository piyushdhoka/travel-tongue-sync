
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MessageCircle } from "lucide-react";

interface TranslationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function TranslationTabs({ activeTab, onTabChange }: TranslationTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-4">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="voice" className="flex items-center">
          <Mic className="h-4 w-4 mr-2" />
          Voice
        </TabsTrigger>
        <TabsTrigger value="text" className="flex items-center">
          <MessageCircle className="h-4 w-4 mr-2" />
          Text
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
