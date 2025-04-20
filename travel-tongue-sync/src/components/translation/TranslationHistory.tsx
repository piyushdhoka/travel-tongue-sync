// import React from "react";
import  { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/components/AuthProvider";
import { Tables } from "@/integrations/supabase/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type TranslationHistoryItem = Tables<'translation_history'>;
type TravelTip = Tables<'travel_tips'>;

export default function TranslationHistory() {
  const [translationHistory, setTranslationHistory] = useState<TranslationHistoryItem[]>([]);
  const [travelTips, setTravelTips] = useState<TravelTip[]>([]);
  const [activeTab, setActiveTab] = useState<'history' | 'tips'>('history');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchTranslationHistory = async () => {
      const { data, error } = await supabase
        .from('translation_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching translation history:', error);
      } else {
        setTranslationHistory(data || []);
      }
    };

    const fetchTravelTips = async () => {
      const { data, error } = await supabase
        .from('travel_tips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching travel tips:', error);
      } else {
        setTravelTips(data || []);
      }
    };

    fetchTranslationHistory();
    fetchTravelTips();
  }, [user]);

  if (!user) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            Translation History
          </Button>
          <Button 
            variant={activeTab === 'tips' ? 'default' : 'outline'}
            onClick={() => setActiveTab('tips')}
          >
            Travel Tips
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-16rem)] w-full rounded-md border">
          <div className="p-2 md:p-4">
            {activeTab === 'history' ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] min-w-[100px]">Date</TableHead>
                      <TableHead className="w-[80px] min-w-[80px]">From</TableHead>
                      <TableHead className="w-[80px] min-w-[80px]">To</TableHead>
                      <TableHead className="min-w-[150px]">Original Text</TableHead>
                      <TableHead className="min-w-[150px]">Translated Text</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {translationHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="whitespace-nowrap">{new Date(item.created_at).toLocaleString()}</TableCell>
                        <TableCell className="whitespace-nowrap">{item.source_language}</TableCell>
                        <TableCell className="whitespace-nowrap">{item.target_language}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{item.original_text}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{item.translated_text}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] min-w-[100px]">Country</TableHead>
                      <TableHead className="w-[100px] min-w-[100px]">Language</TableHead>
                      <TableHead className="w-[100px] min-w-[100px]">Category</TableHead>
                      <TableHead className="min-w-[200px]">Tip</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {travelTips.map((tip) => (
                      <TableRow key={tip.id}>
                        <TableCell className="whitespace-nowrap">{tip.country}</TableCell>
                        <TableCell className="whitespace-nowrap">{tip.language}</TableCell>
                        <TableCell className="whitespace-nowrap">{tip.category}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{tip.tip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

