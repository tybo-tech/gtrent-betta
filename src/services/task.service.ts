import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FsrModel, TaskModel, TimeLineModel } from 'src/models/task.model';
import { TASK_STATUS, TIMELINE_STATUS } from 'src/utits/constants';
import { TimeDiffModel } from 'src/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = '';

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  save(data: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.url}/api/task/save.php`, data);
  }

  list(
    otherId: number,
    date1 = '',
    date2 = '',
    userId = ''
  ): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      `${
        this.url
      }/api/task/list.php?OtherId=${2}&Date1=${date1}&Date2=${date2}&UserId=${userId}`
    );
  }
  listByUserId(userId: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      `${this.url}/api/task/list-by-user-id.php?UserId=${userId}`
    );
  }

  get(id: number) {
    return this.http.get<TaskModel>(
      `${this.url}/api/task/get.php?TaskId=${id}`
    );
  }

  deleteTask(id: number) {
    return this.http.get<TaskModel>(
      `${this.url}/api/task/delete.php?TaskId=${id}`
    );
  }
  search(itemType: string, parentId: number) {
    return this.http.get<TaskModel[]>(
      `${this.url}/api/task/search.php?ParentId=${parentId}&ItemType=${itemType}`
    );
  }

  initTask() {
    const date = new Date();
    let month = '' + date.getMonth() + 1;
    if (month.length < 2) month = '0' + month;
    const task: TaskModel = {
      TaskId: 0,
      Name: '',
      Description: '',
      TaskType: '',
      AssignedTo: '',
      CreatedBy: '',
      DueTime: '23:59',
      CustomerId: '',
      DueDate: `${date.getFullYear()}/${month}/${date.getDate()}`,
      ComprossorId: '',
      Status: TASK_STATUS.NotStarted,
      TimeLines: [],
      Comments: [],
      OverallTimeSpent: '',
      StarDateTime: '',
      FinishDateTime: '',
      Loaction: '',
      CreateDate: '',
      LastUpdateDate: '',
      LastUpdatedBy: '',
      Fsr: this.initFsr(),
    };
    return task;
  }
  initFsr(): FsrModel {
    return {
      WorkDone: '',
      Hours: '',
      Model: '',
      Serial: '',
      PartsUsed: [],
      Labour: [],
      Consumables: [],
      DistanceTravelled: '',
      Reference: '',
      CustomerSigniture: '',
      CustomerSignitureName: '',
      TechnicainSigniture: '',
      TechnicainName: '',
    };
  }

  initTimeLine(tasksSize = 0): TimeLineModel {
    return {
      Id: tasksSize + 1,
      StarDateTime: `${new Date()}`,
      FinishDateTime: '',
      StartStatus: TIMELINE_STATUS.Started,
      FinishStatus: '',
      FinishReason: '',
    };
  }
  initTimeDiff(): TimeDiffModel {
    return {
      days: 0,
      hours: 0,
      seconds: 0,
      minutes: 0,
    };
  }
}
