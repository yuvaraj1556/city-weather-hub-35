import { Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherCardProps {
  type: "temperature" | "humidity" | "aqi";
  value: number;
  unit: string;
  label: string;
  delay?: number;
}

const getIcon = (type: WeatherCardProps["type"]) => {
  switch (type) {
    case "temperature":
      return <Thermometer className="h-8 w-8" />;
    case "humidity":
      return <Droplets className="h-8 w-8" />;
    case "aqi":
      return <Wind className="h-8 w-8" />;
  }
};

const getIconColor = (type: WeatherCardProps["type"]) => {
  switch (type) {
    case "temperature":
      return "text-weather-temp-warm";
    case "humidity":
      return "text-weather-humidity";
    case "aqi":
      return "text-weather-aqi-good";
  }
};

const getAqiLabel = (value: number): string => {
  if (value <= 50) return "Good";
  if (value <= 100) return "Moderate";
  if (value <= 150) return "Unhealthy for Sensitive Groups";
  if (value <= 200) return "Unhealthy";
  return "Very Unhealthy";
};

const getAqiColor = (value: number): string => {
  if (value <= 50) return "text-weather-aqi-good";
  if (value <= 100) return "text-weather-aqi-moderate";
  return "text-weather-aqi-unhealthy";
};

export function WeatherCard({ type, value, unit, label, delay = 0 }: WeatherCardProps) {
  const iconColor = type === "aqi" ? getAqiColor(value) : getIconColor(type);
  
  return (
    <div 
      className="weather-stat animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={iconColor}>{getIcon(type)}</span>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">
            {value}
          </span>
          <span className="text-xl text-muted-foreground">{unit}</span>
        </div>
        
        {type === "aqi" && (
          <p className={`text-sm font-medium ${getAqiColor(value)}`}>
            {getAqiLabel(value)}
          </p>
        )}
      </div>
    </div>
  );
}
