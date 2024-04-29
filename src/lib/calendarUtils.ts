export function getSchedulerCalendarHeight(windowHeight: number) {
  const navbarHeight = 56;
  const titleChunkHeight = 56;
  const bottomPadding = 20;
  return windowHeight - (navbarHeight + titleChunkHeight + bottomPadding);
}
