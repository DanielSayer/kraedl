export function getGreeting() {
  const userHours = new Date().getHours()
  if (userHours >= 17) {
    return 'Good evening'
  }

  if (userHours >= 12) {
    return 'Good afternoon'
  }

  return 'Good morning'
}
