export function getSchedulerCalendarHeight(windowHeight: number) {
  const navbarHeight = 56;
  const bottomPadding = 35;
  return windowHeight - (navbarHeight + bottomPadding);
}
