import { StorageService } from '@/services/StorageService';
import { Place } from '@/types/googlePlaces';
import React, { createContext, useContext, useEffect, useState } from 'react';

type HistoryContextType = {
  searchHistory: Place[];
  loadSearchHistory: () => void;
  saveToHistory: (place: Place) => Promise<void>;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState<Place[]>([]);

  const loadSearchHistory = async () => {
    try {
      const history = await StorageService.getSearchHistory();
      setSearchHistory(history);
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const saveToHistory = async (place: Place) => {
    try {
      await StorageService.saveSearchHistory(place);
      loadSearchHistory();
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);

  return (
    <HistoryContext.Provider value={{ searchHistory, loadSearchHistory, saveToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistoryContext must be used within HistoryProvider');
  return context;
};
