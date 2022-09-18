export function verifyDaysWeek(days: string[]) {
  const weekday = [
    "segunda",
    "terca",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo",
  ];
  let isDaysWeekValid: boolean = true;
  days.forEach((day: string) => {
    if (weekday.filter((wd) => wd === day.toLowerCase()).length !== 1)
      isDaysWeekValid = false;

    if (days.filter((dayWeek: string) => dayWeek === day).length !== 1)
      isDaysWeekValid = false;
  });
  return isDaysWeekValid;
}
