export class GeoHelper {

    static deg2rad(deg: number): number {
      return deg * (Math.PI / 180);
    }
  
    static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
      const R = 6371;
  
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
  
      return distance;
    }
    
  }
  