import { AuthService } from './../../common/services/auth.service';
// Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Device } from '../devices/device.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DeviceService {
  // Resolve HTTP using the constructor
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // Fetch all devices
  getDevices(): Observable<Device[]> {
    console.log(this.auth.getAuthenticatedHeader());
    if (this.auth.getAuthenticatedHeader().keys().length > 1) {
      return this.http.get(`${environment.API_URL}/clients`, {
        headers: this.auth.getAuthenticatedHeader()
      })
        // ...and calling .json() on the response to return data
        // .map((res: Response) => res.json())
        .map((res: any) => res.clients)
        .catch((error: any) => Observable.throw(error || 'Server error'));
    } else {
      return Observable.throw('no auth');
    }
  }
  // Add Device
  addDevice(data): Observable<Device[]> {
    console.log(222, data);
    data.type = 'device';
    return this.http.post(`${environment.API_URL}/clients`, data,
      {
        headers: this.auth.getAuthenticatedHeader()
      })
      // .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  // Delete device
  removeDevice(id: string): Observable<Device[]> {
    return this.http.delete(`${environment.API_URL}/clients/${id}`, {
      headers: this.auth.getAuthenticatedHeader()
    })
      // .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  // Delete device
  updateDevice(id: string, data): Observable<Device[]> {
    return this.http.put(`${environment.API_URL}/clients/${id}`, data, {
      headers: this.auth.getAuthenticatedHeader()
    })
      // .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}
