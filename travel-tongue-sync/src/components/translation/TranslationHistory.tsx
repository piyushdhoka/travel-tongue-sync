
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/components/AuthProvider";
import { Tables } from "@/integrations/supabase/types";

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
        {activeTab === 'history' ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Original Text</TableHead>
                <TableHead>Translated Text</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {translationHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                  <TableCell>{item.source_language}</TableCell>
                  <TableCell>{item.target_language}</TableCell>
                  <TableCell>{item.original_text}</TableCell>
                  <TableCell>{item.translated_text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tip</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {travelTips.map((tip) => (
                <TableRow key={tip.id}>
                  <TableCell>{tip.country}</TableCell>
                  <TableCell>{tip.language}</TableCell>
                  <TableCell>{tip.category}</TableCell>
                  <TableCell>{tip.tip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

