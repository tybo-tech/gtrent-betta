export const CONSTANTS = {
  Cusomer: 'Customer',
};

export const TASK_STATUS = {
  All: 'All',
  NotStarted: 'Not Started',
  Paused: 'Paused',
  InProgress: 'In progress',
  RunningTest: 'Running Test',
  RunningTestPaused: 'Running Test Paused',
  WaitingForQoute: 'Waiting for a qoute',
  QouteDone: 'Qoute done, task can resume',
  Complete: 'Complete',
  
};
export const TASK_STATUS_LIST = [
  TASK_STATUS.NotStarted,
  TASK_STATUS.Paused,
  TASK_STATUS.InProgress,
  TASK_STATUS.Complete,
  TASK_STATUS.RunningTest,
  TASK_STATUS.RunningTest,
  TASK_STATUS.WaitingForQoute,
  TASK_STATUS.QouteDone,
];
export const FSR_STATUS = {
  Draft: 'Draft',
  ReadyForProccesing: 'Pending',
  Proccesed: 'Proccesed',
  All: 'All',
};
export const LOCAL_STORAGE = {
  TaskStatus: 'task__status',
  TaskDate: 'task__date',
};
export const TIMELINE_STATUS = {
  All: 'All',
  Started: 'Started',
  Paused: 'Paused',
  InProgress: 'In progress',
  Complete: 'Complete',
  RunningTest: 'Running Test',
  RunningTestPaused: 'Running Test Paused'
};
export const TASK_TYPES = {
  OnsiteFSR: 'Onsite FSR',
  WorkshopFSR: 'Workshop FSR',
  General: 'General',
};
export const TASK_TYPES_LIST = [
  TASK_TYPES.OnsiteFSR,
  TASK_TYPES.WorkshopFSR,
  TASK_TYPES.General,
];


export const ITEM_TYPES = {
  SERVICE_LABOUR: {
    Name: 'ServiceLabour',
  },
  SERVICE_CONSUMABLES: {
    Name: 'ServiceConsumable',
  },
  PARTS_USED: {
    Name: 'PartsUsered',
  },
  LABOUR: {
    Name: 'Labour',
  },
  CONSUMABLES: {
    Name: 'Consumable',
  },
  TRAVEL_CHARGE: {
    Name: 'TravelRates',
  },

  BANNER: {
    Name: 'Banner',
  },

  SETTINGS: {
    Name: 'Settings',
  },
};


// export const COMPANY_EMIAL = 'mrnnmthembu@gmail.com';
export const COMPANY_EMIAL = 'mrnnmthembu@gmail.com,info@trentcompressors.com';
// export const COMPANY_EMIAL = 'info@trentcompressors.com';
