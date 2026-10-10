/**
 * Date & Time utilities with automatic annual dynamic calculation.
 * Ensures all experience spans, timestamps, and copyrights dynamically
 * stay updated across coming years without manual intervention.
 */

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 1) return parts[0];

  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (monthIndex >= 0 && monthIndex < 12) {
    return `${monthNames[monthIndex]} ${year}`;
  }
  return `${parts[1]}/${year}`;
};

export const calculateDuration = (
  startDateStr: string,
  endDateStr: string,
  isCurrent: boolean
): string => {
  if (!startDateStr) return "";

  const start = new Date(startDateStr);
  const end = isCurrent ? new Date() : endDateStr ? new Date(endDateStr) : new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 0) months = 0;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (remainingMonths > 0 || years === 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
};
