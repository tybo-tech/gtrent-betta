import { TimeDiffModel } from 'src/models/shared.model';
import { TaskModel } from 'src/models/task.model';
import { TASK_STATUS, TIMELINE_STATUS } from 'src/utits/constants';
import { getStatusClass } from './task.helper';
const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getTimeSpentOnaTask = (date: Date): string => {
  let time = '';
  const today = new Date();
  console.log(date);
  time += `${getDiff(today.getHours(), date.getHours())}`;
  time += `:${getDiff(today.getMinutes(), date.getMinutes())}`;
  time += `:${getDiff(today.getSeconds(), date.getSeconds())}`;
  return time;
};

export const getDiff = (a: number, b: number): string => {
  let d = `${Math.abs(a - b)}`;
  if (d.length === 1) d = '0' + d;
  return d;
};
export const formatToTwoDigits = (a: number): string => {
  let d = a.toString();
  if (d.length === 1) d = '0' + d;
  return d;
};
export const formatDate = (a: Date): string => {
  let y = a.getFullYear();
  let m = formatToTwoDigits(a.getMonth() + 1);
  let d = formatToTwoDigits(a.getDate());

  return `${y}-${m}-${d}`;
};
export const calculateTimeElapsed = (task: TaskModel): TimeDiffModel => {
  // debugger
  let combinedTimeElapsed: TimeDiffModel = {
    days: 0,
    hours: 0,
    seconds: 0,
    minutes: 0,
  };
  let timeLine = task.TimeLines.filter(
    (x) =>
      x.FinishStatus === TIMELINE_STATUS.Paused ||
      x.FinishStatus === TIMELINE_STATUS.RunningTestPaused ||
      x.FinishStatus === TIMELINE_STATUS.Complete ||
      x.FinishStatus === TASK_STATUS.WaitingForQoute
  );
  if (timeLine.length) {
    timeLine.forEach((tm) => {
      const timePassed = getTimeDiffAndPrettyText(
        new Date(tm.StarDateTime),
        new Date(tm.FinishDateTime || tm.StarDateTime)
      );
      console.log('timePassed', timePassed);
      combinedTimeElapsed.days += timePassed.days;
      combinedTimeElapsed.hours += timePassed.hours;
      combinedTimeElapsed.minutes += timePassed.minutes;
      combinedTimeElapsed.seconds += timePassed.seconds;
    });
  }
  return combinedTimeElapsed;
};
export const fixSecondsTo60 = (timePassed: TimeDiffModel): TimeDiffModel => {
  timePassed.minutes += parseInt(`${timePassed.seconds / 60}`);
  timePassed.seconds = timePassed.seconds % 60;
  return timePassed;
};
export const fixMinutesTo60 = (timePassed: TimeDiffModel): TimeDiffModel => {
  timePassed.hours += parseInt(`${timePassed.minutes / 60}`);
  timePassed.minutes = timePassed.minutes % 60;
  return timePassed;
};
export const getReadyForViewTime = (timePassed: TimeDiffModel): string => {
  return ` ${formatToTwoDigits(timePassed.hours)}
  : ${formatToTwoDigits(timePassed.minutes)}
  : ${formatToTwoDigits(timePassed.seconds)}`;
};
export const fixDaysTo0 = (timePassed: TimeDiffModel): TimeDiffModel => {
  timePassed.hours = timePassed.days * 24 + timePassed.hours;
  return timePassed;
};
export const combineTimeDiff = (
  t1: TimeDiffModel,
  t2: TimeDiffModel
): TimeDiffModel => {
  let combinedTimeElapsed: TimeDiffModel = {
    days: t1.days + t2.days,
    hours: t1.hours + t2.hours,
    seconds: t1.seconds + t2.seconds,
    minutes: t1.minutes + t2.minutes,
  };
  return combinedTimeElapsed;
};

export const getTimeDiffAndPrettyText = (
  startDate: Date,
  endDate = new Date()
): TimeDiffModel => {
  let timePassed: TimeDiffModel = { days: 0, hours: 0, seconds: 0, minutes: 0 };

  let nDiff = endDate.getTime() - startDate.getTime();

  // Get diff in days
  timePassed.days = Math.floor(nDiff / 1000 / 60 / 60 / 24);
  nDiff -= timePassed.days * 1000 * 60 * 60 * 24;

  // Get diff in hours
  timePassed.hours = Math.floor(nDiff / 1000 / 60 / 60);
  nDiff -= timePassed.hours * 1000 * 60 * 60;

  // Get diff in minutes
  timePassed.minutes = Math.floor(nDiff / 1000 / 60);
  nDiff -= timePassed.minutes * 1000 * 60;

  // Get diff in seconds
  timePassed.seconds = Math.floor(nDiff / 1000);
  return timePassed;
};

export const getDaysArray = function (start: Date, end: Date) {
  const arr: IYearDates[] = [];
  for (
    let dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    const d = new Date(dt);
    arr.push({
      fullDate: formatDate(d),
      day: getDayName(d),
      week: getWeekFor(d),
    });
  }
  return arr;
};

export const getGroupWeeks = (
  allWekks: IYearDates[],
  tasks: TaskModel[]
): IWeekGroup[] => {
  const weeks = [...new Set(allWekks.map((x) => x.week))];
  let items: IWeekGroup[] = [];
  const currentWeek = getWeekFor(new Date());
  tasks.map((x) => (x.StatusClass = [getStatusClass(x.Status)]));

  weeks.forEach((week) => {
    let days: IDayGroup[] = [];
    allWekks
      .filter((x) => x.week === week)
      .forEach((d) => {
        days.push({
          Active: false,
          Tasks: tasks.filter(t=>t.DueDate === d.fullDate),
          AllTasks: tasks.filter(t=>t.DueDate === d.fullDate),
          Classes: [],
          Week: week,
          FullDate: d.fullDate,
          DayName: d.day,
          Date: new Date(d.fullDate)?.getDate(),
        });
        // console.log(tasks.filter(t=>t.DueDate === d.fullDate));
        
      });
    items.push({
      Active: Number(week) === currentWeek,
      Classes: [],
      Days: days,
      Week: week,
      WeekName:  `Week of ${days[0]?.FullDate} to ${days[days.length-1]?.FullDate}`,
      WeekName1:  `${days[0]?.FullDate}`,
      WeekName2:  `${days[days.length-1]?.FullDate}`,
    });
  });
  console.log(items.find(x=>x.Active));
  console.log(items);
  return items;
};

export const getDayName = (date: Date): string => {
  return weekday[date.getDay()];
};

const getWeekFor = (date: Date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  const utc = new Date(d.setUTCDate(d.getUTCDate() + 4 - dayNum));
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1)).getTime();
  return Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
};

export interface IYearDates {
  fullDate: string;
  week: number;
  day: string;
}
export interface IWeekGroup {
  Week: number;
  WeekName: string;
  WeekName1: string;
  WeekName2: string;
  Active: boolean;
  Classes: string[];
  Days: IDayGroup[];
}
export interface IDayGroup {
  Week: number;
  DayName: string;
  FullDate: string;
  Date: number;
  Active: boolean;
  Classes: string[];
  Tasks: TaskModel[];
  AllTasks: TaskModel[];
}
