import { SearchInput } from "@/components/SearchInput";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { useWeather } from "@/hooks/useWeather";
import { Cloud } from "lucide-react";

const Index = () => {
  const { data, isLoading, error, fetchWeather } = useWeather();

  return (
    <div className="min-h-screen sky-gradient">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Weather<span className="text-gradient">Now</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Get real-time weather, humidity, and air quality for any city
          </p>
        </header>

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <SearchInput onSearch={fetchWeather} isLoading={isLoading} />
        </div>

        {/* Weather Results */}
        <WeatherDisplay data={data} isLoading={isLoading} error={error} />

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm">
            Data is simulated for demo purposes
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
