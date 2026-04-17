export enum Specialty {
  PersonalGrowth = 1,
  FamilyCounseling = 2,
  ChildAndAdolescent = 3,
  MarriageCounseling = 4,
  Addiction = 5,
  Depression = 6,
  Anxiety = 7
}

export const SpecialtyLabels: Record<Specialty, string> = {
  [Specialty.PersonalGrowth]: 'رشد فردی',
  [Specialty.FamilyCounseling]: 'مشاوره خانواده',
  [Specialty.ChildAndAdolescent]: 'کودک و نوجوان',
  [Specialty.MarriageCounseling]: 'زوج درمانی',
  [Specialty.Addiction]: 'ترک اعتیاد',
  [Specialty.Depression]: 'درمان افسردگی',
  [Specialty.Anxiety]: 'اضطراب و استرس'
};

export enum DayOfWeek {
  Saturday = 1,
  Sunday = 2,
  Monday = 3,
  Tuesday = 4,
  Wednesday = 5,
  Thursday = 6,
  Friday = 7
}

export const DayOfWeekLabels: Record<DayOfWeek, string> = {
  [DayOfWeek.Saturday]: 'شنبه',
  [DayOfWeek.Sunday]: 'یکشنبه',
  [DayOfWeek.Monday]: 'دوشنبه',
  [DayOfWeek.Tuesday]: 'سه‌شنبه',
  [DayOfWeek.Wednesday]: 'چهارشنبه',
  [DayOfWeek.Thursday]: 'پنج‌شنبه',
  [DayOfWeek.Friday]: 'جمعه'
};

export enum CounselingType {
  InPerson = 1,
  Phone = 2,
  Online = 3
}

export const CounselingTypeLabels: Record<CounselingType, string> = {
  [CounselingType.InPerson]: 'حضوری',
  [CounselingType.Phone]: 'تلفنی',
  [CounselingType.Online]: 'آنلاین'
};

export enum DegreeLevel {
  Bachelor = 1,
  Master = 2,
  Doctorate = 3,
  PostDoc = 4
}

export const DegreeLevelLabels: Record<DegreeLevel, string> = {
  [DegreeLevel.Bachelor]: 'کارشناسی',
  [DegreeLevel.Master]: 'کارشناسی ارشد',
  [DegreeLevel.Doctorate]: 'دکتری',
  [DegreeLevel.PostDoc]: 'فوق دکتری'
};

export interface Therapist {
  id: string; // e.g. "۱۴۲۵۵-ن" or generated
  name: string;
  phone: string;
  degree: DegreeLevel;
  specialties: Specialty[];
  medicalCouncilNumber: string;
  availableDays: DayOfWeek[];
  counselingTypes: CounselingType[];
  availableTimes: string[]; // e.g. ["12:00-15:00", "18:00-22:00"]
  status: 'فعال' | 'غیرفعال';
}
