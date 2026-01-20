import { useState } from "react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  aqi: number;
  description: string;
}

// Mock weather data for demonstration
// In production, you would connect to a real weather API
const mockWeatherData: Record<string, WeatherData> = {
  london: {
    city: "London",
    country: "UK",
    temperature: 12,
    humidity: 78,
    aqi: 42,
    description: "Partly cloudy",
  },
  paris: {
    city: "Paris",
    country: "France",
    temperature: 15,
    humidity: 65,
    aqi: 55,
    description: "Sunny",
  },
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    temperature: 22,
    humidity: 70,
    aqi: 85,
    description: "Clear sky",
  },
  "new york": {
    city: "New York",
    country: "USA",
    temperature: 18,
    humidity: 55,
    aqi: 68,
    description: "Cloudy",
  },
  sydney: {
    city: "Sydney",
    country: "Australia",
    temperature: 25,
    humidity: 60,
    aqi: 35,
    description: "Sunny",
  },
  dubai: {
    city: "Dubai",
    country: "UAE",
    temperature: 35,
    humidity: 45,
    aqi: 95,
    description: "Hot and sunny",
  },
  singapore: {
    city: "Singapore",
    country: "Singapore",
    temperature: 30,
    humidity: 85,
    aqi: 52,
    description: "Light rain",
  },
  beijing: {
    city: "Beijing",
    country: "China",
    temperature: 20,
    humidity: 50,
    aqi: 145,
    description: "Hazy",
  },
  mumbai: {
    city: "Mumbai",
    country: "India",
    temperature: 32,
    humidity: 80,
    aqi: 120,
    description: "Humid",
  },
  berlin: {
    city: "Berlin",
    country: "Germany",
    temperature: 10,
    humidity: 72,
    aqi: 38,
    description: "Overcast",
  },
};

// Generate random weather for unknown cities
const generateRandomWeather = (cityName: string): WeatherData => {
  return {
    city: cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase(),
    country: "Unknown",
    temperature: Math.floor(Math.random() * 35) + 5,
    humidity: Math.floor(Math.random() * 50) + 40,
    aqi: Math.floor(Math.random() * 150) + 20,
    description: ["Sunny", "Cloudy", "Partly cloudy", "Clear sky", "Light rain"][
      Math.floor(Math.random() * 5)
    ],
  };
};

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const normalizedCity = city.toLowerCase().trim();
      
      // Check if we have mock data for this city
      const weatherData = mockWeatherData[normalizedCity] || generateRandomWeather(city);
      
      setData(weatherData);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchWeather };
}
