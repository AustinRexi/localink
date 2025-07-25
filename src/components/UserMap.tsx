import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { circle } from "@turf/turf";

const UserMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [radius, setRadius] = useState(50);
  const isStyleLoaded = useRef(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    if (!mapboxgl.accessToken) {
      console.error("Mapbox access token is missing!");
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-114.05, 51.05],
      zoom: 8,
    });

    map.current.on("load", () => {
      isStyleLoaded.current = true;

      updateCircle(radius);

      new mapboxgl.Marker().setLngLat([-114.05, 51.05]).addTo(map.current);
    });

    map.current.on("error", (e) => {
      console.error("Mapbox error:", e);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [radius]);

  const updateCircle = (radiusInKm: number) => {
    if (!map.current || !isStyleLoaded.current) return;

    const center = [-114.05, 51.05];
    const circleGeoJSON = circle(center, radiusInKm, {
      steps: 50,
      units: "kilometers",
    });

    if (map.current.getSource("circle")) {
      (map.current.getSource("circle") as mapboxgl.GeoJSONSource).setData(
        circleGeoJSON
      );
    } else {
      map.current.addSource("circle", {
        type: "geojson",
        data: circleGeoJSON,
      });
      map.current.addLayer({
        id: "circle-fill",
        type: "fill",
        source: "circle",
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.2,
        },
      });
      map.current.addLayer({
        id: "circle-outline",
        type: "line",
        source: "circle",
        paint: {
          "line-color": "#000",
          "line-width": 2,
        },
      });
    }
  };

  useEffect(() => {
    updateCircle(radius);
  }, [radius]);

  return (
    <div className="relative w-full  flex ">
      <div className="relative w-full max-w-[90vw] h-[70vh] max-h-[90vw] md:max-w-[80vw] md:max-h-[80vh] lg:max-w-[70vw] lg:max-h-[70vh]">
        <div
          ref={mapContainer}
          className="w-full h-full overflow-hidden"
          style={{ contain: "strict" }}
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow flex items-center z-10">
          <input
            type="range"
            min="10"
            max="100"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-48"
          />
          <span className="ml-2">{radius}km</span>
        </div>
      </div>
    </div>
  );
};

export default UserMap;
