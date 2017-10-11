import { Component, OnInit, ViewChild, } from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Device} from '../device.interface';
import _ from 'lodash';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeviceCreateComponent } from '../create/device-create.component';
import { DeviceUpdateComponent } from '../update/device-update.component';

@Component({
  selector: 'my-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
    dialogCreateRef: MdDialogRef<DeviceCreateComponent>;
    dialogUpdateRef: MdDialogRef<DeviceUpdateComponent>;
    devices: Device[];
    messageDeleted: string = 'Device successfully deleted.';
    messageUpdated: string = 'Device successfully updated.';
    messageCreated: string = 'Device successfully created.';

  constructor(
      private service:DeviceService,
      public snackBar: MdSnackBar,
      public dialog: MdDialog
  ){}

  addDevice() {
    let dialogCreateRef = this.dialog.open(DeviceCreateComponent, {
    });
    // subscribe to created event
    const subscribe = dialogCreateRef.componentInstance.created.subscribe((device: any) => {
        this.devices.unshift(device);
        this.snackBar.open(this.messageCreated, 'Close', {duration: 3000});
    });
  }
  updateDevice(device) {
    const index = this.devices.indexOf(device);
    let dialogUpdateRef = this.dialog.open(DeviceUpdateComponent, {
        data: device
    });
    // subscribe to update event
    const subscribe = dialogUpdateRef.componentInstance.updated.subscribe((device: any) => {
        this.devices[index] = device;
        this.snackBar.open(this.messageUpdated, 'Close', {duration: 3000});
    });
  }
  // subscribe on deleted event
  onDeviceDeleted(device) {
      const index = this.devices.indexOf(device);
      this.devices.splice(index, 1);
      this.snackBar.open(this.messageDeleted, 'Close', {duration: 3000});
  }

  ngOnInit() {
      this.service.getDevices()
                .subscribe(
                    devices => {
                      console.log(devices);
                      this.devices = devices
                    },
                    err => {
                        console.log('Error fetching devices', err);
                    });

  }

}
