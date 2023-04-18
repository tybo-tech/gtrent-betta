import { TaskModel } from 'src/models/task.model';
import { SERVICE_STATUS } from 'src/models/utits';
import {
  ITaskGroupedByDateModel,
  ITaskGroupedByStatusModel,
} from 'src/models/ux.model';
import { TASK_STATUS, TASK_TYPES, TIMELINE_STATUS } from 'src/utits/constants';
import { formatToTwoDigits } from './date.helper';
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
  return items;
};

export const groupTaskByStatus = (
  allTasks: TaskModel[]
): ITaskGroupedByStatusModel[] => {
  const statuses: string[] = [...new Set(allTasks.map((item) => item.Status))];
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
      Classes: [getStatusClass(theStatus)],
      Count: groupTasks.length,
      Name: getGroupName(theStatus),
      Progress: '10%',
    });
  });
  if (items.length) {
    items[0].Classes.push ('card-active');
    items[0].Active = true;
    items[0].Id = 'active';
  }
  return items;
};

export const loadTaskDates = (allTasks: TaskModel[]): string[] => {
  return [...new Set(allTasks.map((x) => formatDateToStrinfDateOnly(x.CreateDate)))];
};
export const formatDateToStrinfDateOnly = (s: string): string => {
  const date = new Date(s);
  //2023-02-08
  return `${date.getFullYear()}-${formatToTwoDigits(date.getMonth()+1)}-${formatToTwoDigits(date.getDate())}`
};
export const gatTaskCardStatus = (allTasks: TaskModel[]): TaskModel[] => {
  return allTasks.map((x) => {
  if(x.Status === TASK_STATUS.NotStarted){
    x.CardStatusClass = [];
    const difference = getDateDiff(`${new Date()}`, x.CreateDate);
    if (difference >= 7) x.CardStatusClass = ['__warn'];
    if (difference >= 14) x.CardStatusClass = ['__danger'];
  }
    return x;
  });
};
export const getDateDiff = (s1: string, s2: string) => {
  const a = new Date(s1);
  const b = new Date(s2);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
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

export const isTaskComplete = (task: TaskModel) => {
  console.log(task);
  
  if (task.TaskType === TASK_TYPES.WorkshopFSR) return 'Start test run';
  return 'Start task';
};

