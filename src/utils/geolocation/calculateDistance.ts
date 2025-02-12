export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function calculateDistance(
  centerCoordinates: { latitude: number; longitude: number },
  pointCoordinates: { latitude: number; longitude: number }
): number {
  const radius = 6371;

  const { latitude: lat1, longitude: lon1 } = centerCoordinates;
  const { latitude: lat2, longitude: lon2 } = pointCoordinates;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * center;
}

export function convertDistance(distance: number): string {
  return distance.toFixed(2);
}

export function convertDistanceToString(distance: number): string {
  return distance > 1
    ? `${distance.toFixed(2)} km`
    : `${(distance * 1000).toFixed(0)} m`;
}

export function getDistance(
  centerCoordinates: { latitude: number; longitude: number },
  pointCoordinates: { latitude: number; longitude: number },
  convertToString: boolean = true
): string {
  let distance = calculateDistance(centerCoordinates, pointCoordinates);
  return convertToString ? convertDistanceToString(distance) : convertDistance(distance);
}
