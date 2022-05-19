export interface FeatureCollection {
  type: string
  features: Feature[]
  properties?: ymaps.IPlacemarkProperties;
  date?: string
  color?: string
}

export interface Feature {
  type: string
  id: number
  geometry: Geometry;
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}

export interface DayPlacemark {
  geometry: Geometry;
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
  timePlacemarks: Feature[]
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface GeoObjectConstructor {
  feature: ymaps.IGeoObjectFeature;
  options: ymaps.IGeoObjectOptions;
}

export interface DayDataset extends MapDataset {
  timeDatasets: MapDataset[]
}

export interface MapDataset {
  coordinates: number[]
  date: string
  time?: string
  balloonContent: string
  color: string
}
