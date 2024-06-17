/**
 * 週のはじまり
 */
export const WeekStartDate = {
  Sunday: "sunday",
  Monday: "monday",
} as const;

/**
 * カレンダーの表示タイプ(月ごと／年間)
 */
export const ViewType = {
  Month: "month",
  Year: "year",
} as const;

/**
 * カレンダー共通データ
 */
export type CalendarInfo = {
  year: number,
  month: number,
  weekStartDate: string,
  viewType: string,
}
