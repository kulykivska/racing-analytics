// API client for racing analytics backend

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export type TelemetryPoint = {
  distance: number;
  speed: number;
  throttle: number;
  brake: number;
};

export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json() as Promise<{ status: string }>;
}

export async function fetchDemoTelemetry(): Promise<TelemetryPoint[]> {
  const response = await fetch(`${API_BASE_URL}/telemetry/demo`);
  if (!response.ok) {
    throw new Error(`Failed to fetch telemetry: ${response.statusText}`);
  }
  return response.json() as Promise<TelemetryPoint[]>;
}
