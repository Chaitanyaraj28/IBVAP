export type NavigationPage =
  | 'login'
  | 'command-center'
  | 'live-cameras'
  | 'alerts'
  | 'incidents'
  | 'watchlists'
  | 'forensic-search'
  | 'multi-camera-correlation'
  | 'intelligence-analytics'
  | 'sites-and-bops'
  | 'virtual-fence-builder'
  | 'system-health'
  | 'settings-audit-logs';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  sector: string;
  siteId: string;
  status: 'ONLINE' | 'DEGRADED' | 'FAULT';
  type: 'THERMAL_FLIR' | 'OPTICAL_PTZ' | 'FIXED_BULLET' | 'ANPR';
  fps: number;
  latencyMs: number;
  resolution: string;
  encoder: string;
  tpuLoad: number;
  temperatureC: number;
  coordinates: {
    lat: number;
    lng: number;
    alt: number;
    azimuth: number;
  };
  detectedPersons: number;
  detectedVehicles: number;
  activeAlert?: string;
  streamQuality: '1080p' | '4k' | 'thermal_spectral';
  imageUrl: string;
  targetOverlays?: {
    type: 'PERSON' | 'VEHICLE' | 'PATROL' | 'ANIMAL';
    label: string;
    trackId: string;
    confidence: number;
    box: { top: string; left: string; width: string; height: string };
    color: string;
    details?: string;
  }[];
}

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  eventType: string;
  camera: string;
  location: string;
  timestamp: string;
  riskScore: number;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'DISPATCHED' | 'RESOLVED' | 'FALSE_ALARM';
  description: string;
  targetId?: string;
  confidence: number;
  snapshotUrl?: string;
  details?: string;
}

export interface IncidentRecord {
  id: string;
  title: string;
  severity: AlertSeverity;
  riskScore: number;
  location: string;
  camera: string;
  timestamp: string;
  status: 'ACTIVE_INTERDICT' | 'VERIFIED' | 'RESOLVED' | 'UNDER_INVESTIGATION';
  objectClass: string;
  trackId: string;
  confidence: number;
  velocity: string;
  bearing: string;
  operatorNotes: { time: string; author: string; note: string }[];
  movementCorrelation: {
    camera: string;
    name: string;
    time: string;
    direction: string;
    confidence: number;
    isBreachPoint?: boolean;
    eta?: string;
  }[];
  riskBreakdown: {
    factor: string;
    points: number;
    description: string;
  }[];
  timeline: {
    time: string;
    event: string;
    camera: string;
    riskScore: number;
    severity: AlertSeverity;
  }[];
}

export interface WatchlistPerson {
  id: string;
  name: string;
  alias?: string;
  category: 'SUSPECTED_INFILTRATOR' | 'PO_INTEREST' | 'SMUGGLER' | 'HIGH_VALUE_TARGET';
  status: 'ACTIVE_ALERT' | 'MONITORED' | 'INTERDICTED';
  lastSeen: string;
  lastCamera: string;
  photoUrl: string;
  matchScore: number;
  nationalId?: string;
  notes: string;
}

export interface WatchlistVehicle {
  plateNumber: string;
  vehicleType: string;
  model: string;
  color: string;
  category: 'STOLEN' | 'CONTRABAND_SUSPECT' | 'UNREGISTERED' | 'RESTRICTED_CONVOY';
  status: 'INTERCEPT_LOCK' | 'MONITORED' | 'FLAGGED';
  lastSeen: string;
  lastCamera: string;
  site: string;
  matchScore: number;
  owner?: string;
}

export interface ForensicRecord {
  id: string;
  timestamp: string;
  camera: string;
  site: string;
  objectType: 'PERSON' | 'VEHICLE' | 'ANIMAL' | 'DRONE';
  trackId: string;
  confidence: number;
  riskScore: number;
  thumbnailUrl: string;
  tags: string[];
  eventSummary: string;
}

export interface SiteBOP {
  id: string;
  name: string;
  code: string;
  sector: string;
  coordinates: string;
  totalCameras: number;
  onlineCameras: number;
  degradedCameras: number;
  activeAlerts: number;
  connectivity: 'OFC_PRIMARY' | 'SAT_BACKUP' | 'HYBRID';
  linkLatency: number;
  edgeTpuLoad: number;
  storageUsedTb: number;
  storageTotalTb: number;
  qrtStatus: string;
  threatLevel: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
}

export interface SystemTelemetry {
  totalNodes: number;
  activeNodes: number;
  networkUptime: number;
  linkBandwidthGbps: number;
  aiPipelineFps: number;
  averageLatencyMs: number;
  tpuTemperatureC: number;
  threatLevel: 'DEFCON-1' | 'DEFCON-2' | 'DEFCON-3' | 'DEFCON-4';
}

export interface AlertRule {
  id: string;
  name: string;
  enabled: boolean;
  triggerEntity: 'Person' | 'Vehicle' | 'Unidentified' | 'Loitering Group';
  zoneCondition: string;
  timeCondition: string;
  actionSeverity: AlertSeverity;
  riskScoreAddition: number;
  dispatchQrfAutomatically: boolean;
}

export interface VirtualFenceZone {
  id: string;
  name: string;
  camera: string;
  type: 'TRIPWIRE' | 'POLYGON_RESTRICTED' | 'LOITERING_BUFFER';
  activeHours: string;
  severity: AlertSeverity;
  enabled: boolean;
  sensitivity: number;
}

export interface UserSession {
  name: string;
  badgeId: string;
  role: 'COMMAND_OFFICER' | 'WATCH_COMMANDER' | 'PATROL_LEADER' | 'ANALYST';
  clearanceLevel: string;
  station: string;
  avatarUrl: string;
}
