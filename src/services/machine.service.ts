import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Machine } from 'src/models/machine.model';
import { MachineParts } from 'src/models/machineparts.model';

@Injectable({
  providedIn: 'root',
})
export class MachineService {

 

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  getMachines(companyId: string, userType: string) {
    return this.http.get<Machine[]>(
      `${this.url}/api/machine/get-machines.php?CompanyId=${companyId}&UserType=${userType}`
    );
  }

  getMachine(machineId: string) {
    return this.http.get<Machine>(
      `${this.url}/api/machine/get-machine.php?MachineId=${machineId}`
    );
  }

  getMachineByEmailandCompanyIdSync(email: string, companyId: string) {
    return this.http.get<Machine>(
      `${this.url}/api/machine?Email=${email}&CompanyId=${companyId}`
    );
  }

  updateMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(
      `${this.url}/api/machine/update-machine.php`,
      machine
    );
  }

  add(machine: Machine) {
    return this.http.post<Machine>(
      `${this.url}/api/machine/add-machine.php`,
      machine
    );
  }
  addMachinepartsRange(machineparts: MachineParts[]) {
    return this.http.post<MachineParts[]>(
      `${this.url}/api/machineparts/add-machineparts-range.php`,
      machineparts
    );
  }
  updateMachinePartsSync(MachineParts: MachineParts): Observable<MachineParts> {
    return this.http.post<MachineParts>(`${this.url}/api/machineparts/update-machineparts.php`, MachineParts);
  }

  addPart(MachineParts: MachineParts) {
    return this.http.post<MachineParts>(`${this.url}/api/machineparts/add-machinepart.php`, MachineParts);
  }
  initMachine(companyId: string): Machine {
    return {
      MachineId: '',
      CompanyId: companyId,
      MachineType: '',
      Name: '',
      Make: '',
      Model: '',
      Size: '',
      Serial: '',
      Hours: '',
      Motor: '',
      Moreinfo1: '',
      Moreinfo2: '',
      Moreinfo3: '',
      Moreinfo4: '',
      MachineStatus: 'Active',
      CreateUserId: '',
      ModifyUserId: '',
      StatusId: 1,
    };
  }
}
