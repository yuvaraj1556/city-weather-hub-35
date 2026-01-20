import { Cloud, Sun, CloudRain, Loader2 } from "lucide-react";
import { WeatherCard } from "./WeatherCard";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  aqi: number;
  description: string;
}

interface WeatherDisplayProps {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const getWeatherIcon = (description: string) => {
  const desc = description.toLowerCase();
  if (desc.includes("rain") || desc.includes("drizzle")) {
    return <CloudRain className="h-16 w-16 text-primary" />;
  }
  if (desc.includes("cloud")) {
    return <Cloud className="h-16 w-16 text-muted-foreground" />;
  }
  return <Sun className="h-16 w-16 text-weather-temp-warm" />;
};

export function WeatherDisplay({ data, isLoading, error }: WeatherDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-lg">Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center animate-fade-in max-w-md mx-auto">
        <div className="text-destructive mb-2">
          <Cloud className="h-12 w-12 mx-auto opacity-50" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Oops!</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="mb-6">
          <Sun className="h-20 w-20 mx-auto text-weather-temp-warm opacity-60" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Check the Weather
        </h2>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          Enter a city name above to get current temperature, humidity, and air quality.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* City Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          {getWeatherIcon(data.description)}
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          {data.city}, {data.country}
        </h2>
        <p className="text-muted-foreground text-lg capitalize mt-1">
          {data.description}
        </p>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <WeatherCard
          type="temperature"
          value={data.temperature}
          unit="°C"
          label="Temperature"
          delay={100}
        />
        <WeatherCard
          type="humidity"
          value={data.humidity}
          unit="%"
          label="Humidity"
          delay={200}
        />
        <WeatherCard
          type="aqi"
          value={data.aqi}
          unit="AQI"
          label="Air Quality"
          delay={300}
        />
      </div>
    </div>
  );
}
