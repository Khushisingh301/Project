import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import CardsGrid from '../components/CardsGrid';



export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <CardsGrid />
      
    </div>
  );
}