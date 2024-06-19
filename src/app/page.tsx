'use client';

import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from '@/components/googlemap';

export default function Home() {
  return (
    <Wrapper language="en" region="CA" apiKey={process.env.GOOGLEMAP_API_KEY || ''}>
      <MapComponent />
    </Wrapper>
  )
}