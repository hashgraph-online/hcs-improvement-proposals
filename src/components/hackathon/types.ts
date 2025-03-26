import React from 'react';

export interface SocialLink {
  type: 'twitter' | 'linkedin' | 'github';
  url: string;
}

export interface PersonInfo {
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  socials: SocialLink[];
}

export interface RegistrationFormData {
  name: string;
  email: string;
  github: string;
  organization: string;
  role: string;
}

export interface Tool {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

export interface TimelineEvent {
  icon: React.ReactNode;
  date: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export interface Prize {
  position: string;
  amount: string;
  trackName: string;
}

export interface HackathonTrack {
  name: string;
  description: string;
  prizes: Prize[];
} 