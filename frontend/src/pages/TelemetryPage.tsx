import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchDemoTelemetry, type TelemetryPoint } from '../api';

function TelemetryPage() {
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadTelemetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDemoTelemetry();
      setTelemetry(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load telemetry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Telemetry Analysis</h1>
      
      <button
        onClick={handleLoadTelemetry}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginBottom: '20px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Loading...' : 'Load demo telemetry'}
      </button>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

      {telemetry.length > 0 && (
        <div style={{ width: '100%', height: '500px' }}>
          <h2>Speed vs Distance</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetry}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="distance"
                label={{ value: 'Distance (m)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="speed"
                stroke="#8884d8"
                strokeWidth={2}
                name="Speed (km/h)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default TelemetryPage;
