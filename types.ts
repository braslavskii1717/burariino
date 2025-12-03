import React from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
}

export interface DocSection {
  id: string;
  title: string;
  content: string; // Markdown supported
  type: 'text' | 'code' | 'table' | 'financials';
  language?: string;
}

export interface ProjectModule {
  id: string;
  title: string;
  icon: React.ReactNode;
  sections: DocSection[];
}

export enum AgentType {
  GENERAL = 'general',
  CODING = 'coding',
  LEGAL = 'legal',
  FINANCE = 'finance'
}