import { TaskModel } from 'src/models/task.model';
import { SERVICE_STATUS } from 'src/models/utits';
import {
  ITaskGroupedByDateModel,
  ITaskGroupedByStatusModel,
} from 'src/models/ux.model';
import { TASK_STATUS, TASK_TYPES, TIMELINE_STATUS } from 'src/utits/constants';
export const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const proccessTask = (
  allTasks: TaskModel[]
): ITaskGroupedByDateModel[] => {
  const dates: any[] = [...new Set(allTasks.map((item) => item.DueDate))];
  let items: ITaskGroupedByDateModel[] = [];
  dates.forEach((dateString) => {
    const groupTasks = allTasks.filter((x) => x.DueDate === dateString);
    groupTasks.map((x) => (x.StatusClass = [getStatusClass(x.Status)]));
    items.push({
      Id: '',
      Active: false,
      Tasks: groupTasks,
      AllTasks: groupTasks,
      Date: dateString,
      Classes: [],
      Count: groupTasks.length,
      Name: getGroupName(dateString),
      Progress: '10%',
    });
  });
  if (items.length) {
    items[0].Classes = ['card-active'];
    items[0].Active = true;
    items[0].Id = 'active';
  }
  console.log(items);
  return items;
};

export const groupTaskByStatus = (
  allTasks: TaskModel[]
): ITaskGroupedByStatusModel[] => {
  const statuses: any[] = [...new Set(allTasks.map((item) => item.Status))];
  let items: ITaskGroupedByStatusModel[] = [];
  statuses.forEach((theStatus) => {
    const groupTasks = allTasks.filter((x) => x.Status === theStatus);
    groupTasks.map((x) => (x.StatusClass = [getStatusClass(x.Status)]));
    items.push({
      Id: '',
      Active: false,
      Tasks: groupTasks,
      AllTasks: groupTasks,
      Status: theStatus,
      Classes: [],
      Count: groupTasks.length,
      Name: getGroupName(theStatus),
      Progress: '10%',
    });
  });
  if (items.length) {
    items[0].Classes = ['card-active'];
    items[0].Active = true;
    items[0].Id = 'active';
  }
  console.log(items);
  return items;
};

export const loadTaskDates = (allTasks: TaskModel[]): string[] => {
  return [...new Set(allTasks.map((x) => x.DueDate))];
};
export const isDueToday = (date: Date): boolean => {
  const today = new Date();

  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};
export const getGroupName = (dateString: string): string => {
  const date = new Date(dateString);
  if (isDueToday(date)) return 'Today';
  if (isDueTomorrow(date)) return 'Tomorrow';

  return weekday[date.getDay()];
};

export const isDueTomorrow = (date: Date): boolean => {
  const today = new Date();

  return (
    today.getDate() === date.getDate() - 1 &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};
export const getTaskCounts = (tasks: TaskModel[]) => {
  const notStartedTasks = tasks.filter(
    (x) => x.Status === TASK_STATUS.NotStarted
  );
  const inProgressTasks = tasks.filter(
    (x) => x.Status === TASK_STATUS.InProgress
  );
  const pausedTasks = tasks.filter((x) => x.Status === TASK_STATUS.Paused);
  const runningTestPaused = tasks.filter(
    (x) => x.Status === TASK_STATUS.RunningTestPaused
  );
  const completedTasks = tasks.filter((x) => x.Status === TASK_STATUS.Complete);
  const runningTest = tasks.filter((x) => x.Status === TASK_STATUS.RunningTest);
  const waitingForQoute = tasks.filter(
    (x) => x.Status === TASK_STATUS.WaitingForQoute
  );
  const qouteDone = tasks.filter((x) => x.Status === TASK_STATUS.QouteDone);
  return [
    {
      Name: TASK_STATUS.NotStarted,
      Value: notStartedTasks.length,
      Classes: getStatusClass(TASK_STATUS.NotStarted),
    },
    {
      Name: TASK_STATUS.InProgress,
      Value: inProgressTasks.length,
      Classes: getStatusClass(TASK_STATUS.InProgress),
    },
    {
      Name: TASK_STATUS.Paused,
      Value: pausedTasks.length,
      Classes: getStatusClass(TASK_STATUS.Paused),
    },
    {
      Name: TASK_STATUS.RunningTestPaused,
      Value: runningTestPaused.length,
      Classes: getStatusClass(TASK_STATUS.RunningTestPaused),
    },
    {
      Name: TASK_STATUS.Complete,
      Value: completedTasks.length,
      Classes: getStatusClass(TASK_STATUS.Complete),
    },
    {
      Name: TASK_STATUS.RunningTest,
      Value: runningTest.length,
      Classes: getStatusClass(TASK_STATUS.RunningTest),
    },
    {
      Name: TASK_STATUS.WaitingForQoute,
      Value: waitingForQoute.length,
      Classes: getStatusClass(TASK_STATUS.WaitingForQoute),
    },
    {
      Name: TASK_STATUS.QouteDone,
      Value: qouteDone.length,
      Classes: getStatusClass(TASK_STATUS.QouteDone),
    },
  ].filter((x) => x.Value);
};
export const getStatusClass = (status: string = ''): string => {
  if (status === TASK_STATUS.NotStarted) return 'status-danger';
  if (status === TASK_STATUS.InProgress || status === TIMELINE_STATUS.Started)
    return 'status-progress';
  if (status === 'Pending') return 'status-warn';
  if (status === 'Draft saved') return 'status-progress';
  if (status === 'Invoiced') return 'status-succes';
  if (status === TASK_STATUS.Paused) return 'status-warn';
  if (status === TASK_STATUS.RunningTestPaused) return 'status-warn';
  if (status === TASK_STATUS.Complete) return 'status-succes';
  if (status === TASK_STATUS.QouteDone) return 'running';
  if (status === TASK_STATUS.RunningTest) return 'running';
  if (status === TASK_STATUS.WaitingForQoute) return 'status-warn';
  return '';
};

export const getTaskInitStatus = (task: TaskModel) => {
  if (task.TaskType === TASK_TYPES.WorkshopFSR)
    return SERVICE_STATUS.RUNNING_TEST.Name;
  return SERVICE_STATUS.DRAFT_SAVED.Name;
};
export const getTaskInitActionName = (task: TaskModel) => {
  if (task.TaskType === TASK_TYPES.WorkshopFSR) return 'Start test run';
  return 'Start task';
};

import { Email } from 'src/models/email.model';
import { OrderModel } from 'src/models/order.model';
import { User } from 'src/models/user.model';

export const formatEmail = (
  email: Email,
  logoUrl = 'https://gtrentapp.tybo.co.za/assets/images/logo.png'
) => `

<div style="padding: 1rem">
 
  <div   style="
  white-space: pre-wrap;
  border-top:10px solid #0e1663;
  background: #e1f7e7;
  max-width: 36rem;
  border-radius: 11px;
  padding: 2rem;
  line-height:9px;
  ">
 
    ${email.Message}

    <br /><br />
    Regards <br />
    ${email.FromName} <br />
    ${email.FromEmail} <br />
    ${email.FromPhone} <br />
    <img
    src="${logoUrl}"
    style="width: 4rem; margin-top: 0; margin-bottom: 1rem;"
    alt=""
  />
  </div>
</div>

`;

export const appendMoreEmailInfo = (user: User, task: TaskModel): string => {
  let fullMessage = '';
  fullMessage += `
  <span
  style="
    display: block;
    line-height: 18px;
    padding: 1rem;
    border: 1px dotted black;
    border-radius: 0.4rem;
  "
>
  <b>Test results</b> <br />
  <span style="color: rgb(29, 105, 1)"> ${task.Fsr.WorkDone}</span>
</span>

<b>Customer:</b> ${task.Customer?.Name}<br>
<b>Assigned to:</b> ${user.Name} <br>
<b>Task Status:</b> ${task.Status} <br>
  `;
  return fullMessage;
};
