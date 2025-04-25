import momentJalaali from 'jalali-moment'

export type DatePickerType = 'gregorian' | 'jalaali' | undefined

export type DatePickerSizeType = 'big' | 'small'

export type DateRangeType = 'END_DATE' | 'START_DATE'

export type DateObject = {
  gregorianStartDate?: string | undefined
  gregorianEndDate?: string | undefined
  jalaaliStartDate?: string | undefined
  jalaaliEndDate?: string | undefined
}

export function jalaaliToGregorian(jalaaliDate: string): any {
  return momentJalaali(jalaaliDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD')
}

export function gregorianToJalaali(gregorianDate: string): string {
  return momentJalaali(gregorianDate, 'YYYY-MM-DD').format('jYYYY-jMM-jDD')
}

const jalaaliTimeView = {
  basicView: 'jYYYY-jMM-jDD',
  dayView: 'jDD',
  monthView: 'jMMMM',
  yearView: 'jYYYY',
}

const gregorianTimeView = {
  basicView: 'YYYY-MM-DD',
  dayView: 'DD',
  monthView: 'MMM',
  yearView: 'YYYY',
}

export function getTimeView(type: DatePickerType) {
  return type === 'jalaali' ? jalaaliTimeView : gregorianTimeView
}

export function getStartDateFromDateObject(dateObject: DateObject, type: DatePickerType) {
  if (type === 'jalaali') {
    return dateObject.gregorianStartDate
      ? gregorianToJalaali(dateObject.gregorianStartDate)
      : dateObject.jalaaliStartDate
  }
  return dateObject.jalaaliStartDate
    ? jalaaliToGregorian(dateObject.jalaaliStartDate)
    : dateObject.gregorianStartDate
}

export function getEndDateFromDateObject(dateObject: DateObject, type: DatePickerType) {
  if (type === 'jalaali') {
    return dateObject.gregorianEndDate
      ? gregorianToJalaali(dateObject.gregorianEndDate)
      : dateObject.jalaaliEndDate
  }
  return dateObject.jalaaliEndDate
    ? jalaaliToGregorian(dateObject.jalaaliEndDate)
    : dateObject.gregorianEndDate
}
