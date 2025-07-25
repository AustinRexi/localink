/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  ViewState,
} from "react-map-gl/mapbox";

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export interface MapLocationType {
  latitude: number;
  longitude: number;
  radius: number;
  id: number;
}

export interface MapProps {
  locations?: MapLocationType[];
  selectedLocation?: MapLocationType | null;
  onSelect?: (location: MapLocationType | null) => void;
  initialView?: {
    longitude: number;
    latitude: number;
    zoom?: number;
  };
  preview?: boolean;
}

export default function ReportsMap({
  initialView,
  locations,
  selectedLocation,
  onSelect,
}: MapProps) {
  const isFlying = useRef(false);
  const mapRef = useRef<any>(null);

  const [viewState] = useState<Partial<ViewState>>({
    latitude: 43.42153,
    longitude: -77.69719,
    zoom: 5,
  });

  // Smoothly transition map when initialView prop changes
  useEffect(() => {
    if (initialView && mapRef.current) {
      const map = mapRef.current;
      isFlying.current = true;
      map.flyTo({
        center: [initialView.longitude, initialView.latitude],
        zoom: initialView.zoom ?? viewState.zoom,
        duration: 2000,
        essential: true,
      });

      // Clear flying flag after animation ends
      map.once("moveend", () => {
        isFlying.current = false;
      });
    }
  }, [initialView, viewState.zoom]);

  return (
    <div className={cn("min-h-[calc(100vh-250px)]")}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={viewState}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {locations?.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(location);
              }}
              className={cn("relative")}
            >
              <div
                className={cn(
                  "transform cursor-pointer transition-transform duration-200 animate__animated bg-red-200/50 rounded-full border-2 border-red-600 flex flex-col items-center justify-baseline",
                  selectedLocation?.id == location?.id
                    ? " scale-[150%] animate__jello"
                    : "scale-100"
                )}
                style={{
                  width: `${location.radius + 32}px`,
                  height: `${location.radius + 32}px`,
                }}
              >
                <div className="flex-1"></div>
                <p className="text-red-600 font-semibold py-4 text-lg">
                  {Math.floor(
                    Math.abs(location.latitude) +
                      Math.abs(location.longitude) * Math.abs(location.radius)
                  ).toLocaleString()}
                </p>
              </div>
              <div className="bg-primary/50 size-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 "></div>
              <div
                className={cn(
                  "absolute  left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-0.5",
                  selectedLocation?.id == location?.id ? "-top-1.5" : "top-1.5"
                )}
              ></div>
            </div>
          </Marker>
        ))}

        {selectedLocation && (
          <Popup
            longitude={selectedLocation?.longitude}
            latitude={selectedLocation?.latitude}
            anchor="top"
            closeButton={false}
            closeOnClick={false}
            onClose={() => onSelect?.(null)}
          >
            <div>
              <p>More details of the location report here.</p>
            </div>
          </Popup>
        )}
        <NavigationControl />
      </Map>
    </div>
  );
}
