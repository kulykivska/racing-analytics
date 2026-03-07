// API client for racing analytics backend

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json() as Promise<{ status: string }>;
}
