import { useEffect, useState } from "react";
import { SUPPORTED_LANGUAGES } from "@/services/translationService";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Map of country codes to their famous places
const FAMOUS_PLACES: { [key: string]: { image: string; name: string } } = {
  en: {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    name: "Big Ben, London"
  },
  es: {
    image: "/Sagrada_Familia_Barcelona.png", 
    name: "Sagrada Familia, Barcelona"
  },
  fr: {
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    name: "Eiffel Tower, Paris"
  },
  de: {
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc",
    name: "Brandenburg Gate, Berlin"
  },
  it: {
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    name: "Colosseum, Rome"
  },
  ja: {
    image: "/mount_fuji.png",
    name: "Mount Fuji, Japan"
  },
  ko: {
    image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58",
    name: "Gyeongbokgung Palace, Seoul"
  },
  zh: {
    image: "https://images.unsplash.com/photo-1508804052814-cd3ba865a116",
    name: "Great Wall of China"
  },
  ru: {
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d",
    name: "Saint Basil's Cathedral, Moscow"
  },
  ar: {
    image: "/burj_khalifa.png",
    name: "Burj Khalifa, Dubai"
  },
  hi: {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
    name: "Taj Mahal, India"
  },
  pt: {
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a",
    name: "Christ the Redeemer, Rio"
  }
};

export default function FlagSlideshow() {
  const [places, setPlaces] = useState(SUPPORTED_LANGUAGES.map(lang => ({
    code: lang.code,
    ...FAMOUS_PLACES[lang.code],
    languageName: lang.name
  })));

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaces(prevPlaces => {
        const newPlaces = [...prevPlaces];
        const firstPlace = newPlaces.shift();
        if (firstPlace) newPlaces.push(firstPlace);
        return newPlaces;
      });
    }, 3000); // Slightly longer interval for places

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-4">
      <Card className="relative overflow-hidden bg-background/40 backdrop-blur-xl border-border/20 py-4">
        <div className="flex items-center justify-center gap-4 overflow-hidden px-4">
          {places.slice(0, 5).map(({ image, name }, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-lg overflow-hidden transition-all duration-500 ease-out transform cursor-pointer hover:scale-110",
                index === 2 ? "h-32 w-40" : "h-24 w-32",
                index === 1 || index === 3 ? "opacity-80" : "opacity-50",
                index === 2 && "opacity-100 shadow-lg"
              )}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {index === 2 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center">
                  {name}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}