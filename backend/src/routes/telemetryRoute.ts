import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export type TelemetryPoint = {
  distance: number;
  speed: number;
  throttle: number;
  brake: number;
};

function generateDemoTelemetry(): TelemetryPoint[] {
  const points: TelemetryPoint[] = [];
  const totalPoints = 150;
  const maxDistance = 5000; // meters

  for (let i = 0; i < totalPoints; i++) {
    const distance = (i / (totalPoints - 1)) * maxDistance;
    
    // Simulate realistic racing telemetry with acceleration, braking, and cornering
    const progress = distance / maxDistance;
    
    // Speed profile: start slow, accelerate, maintain, brake for corners, accelerate again
    let speed: number;
    if (progress < 0.1) {
      // Start: accelerating from 0
      speed = 20 + progress * 10 * 200;
    } else if (progress < 0.3) {
      // Acceleration phase
      speed = 40 + (progress - 0.1) * 5 * 200;
    } else if (progress < 0.5) {
      // High speed section
      speed = 200 + Math.sin(progress * Math.PI * 4) * 30;
    } else if (progress < 0.7) {
      // Braking for corner
      speed = 170 - (progress - 0.5) * 5 * 200;
    } else if (progress < 0.85) {
      // Cornering at lower speed
      speed = 70 + Math.sin((progress - 0.7) * Math.PI * 2) * 20;
    } else {
      // Final acceleration
      speed = 90 + (progress - 0.85) * 6.67 * 200;
    }
    
    // Clamp speed to realistic range (0-300 km/h)
    speed = Math.max(0, Math.min(300, speed));
    
    // Throttle: high when accelerating, low when braking
    let throttle: number;
    if (progress < 0.1 || (progress >= 0.7 && progress < 0.85)) {
      throttle = 0.3 + Math.random() * 0.2; // Lower throttle in slow sections
    } else if (progress < 0.3 || progress >= 0.85) {
      throttle = 0.8 + Math.random() * 0.2; // High throttle when accelerating
    } else if (progress < 0.5) {
      throttle = 0.5 + Math.random() * 0.3; // Moderate throttle at high speed
    } else {
      throttle = 0.1 + Math.random() * 0.2; // Low throttle when braking
    }
    throttle = Math.max(0, Math.min(1, throttle));
    
    // Brake: high when decelerating, low otherwise
    let brake: number;
    if (progress >= 0.5 && progress < 0.7) {
      brake = 0.6 + Math.random() * 0.3; // High brake when approaching corner
    } else if (progress >= 0.7 && progress < 0.75) {
      brake = 0.3 + Math.random() * 0.2; // Moderate brake in corner
    } else {
      brake = Math.random() * 0.1; // Minimal brake otherwise
    }
    brake = Math.max(0, Math.min(1, brake));
    
    points.push({
      distance: Math.round(distance * 10) / 10,
      speed: Math.round(speed * 10) / 10,
      throttle: Math.round(throttle * 100) / 100,
      brake: Math.round(brake * 100) / 100,
    });
  }
  
  return points;
}

export async function telemetryRoute(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.get<{ Reply: TelemetryPoint[] }>('/telemetry/demo', async (_request, reply) => {
    const telemetry = generateDemoTelemetry();
    return reply.send(telemetry);
  });
}
