interface SortActivitiesParams {
  helpList?: object[];
  limit?: boolean;
}

export function sortActivitiesByDistance({
  helpList = [],
  limit
}: SortActivitiesParams): object[] {
  let list: object[] = [...helpList];

  const hasDistanceValue = (item: any): item is { distanceValue: number } =>
    typeof item.distanceValue === "number";

  list = list.filter(hasDistanceValue).sort((a, b) => {
    const distanceA = a.distanceValue ?? Infinity;
    const distanceB = b.distanceValue ?? Infinity;

    return distanceA - distanceB;
  });

  return limit ? list.slice(0, 15) : list;
}
