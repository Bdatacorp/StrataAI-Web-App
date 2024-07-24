export default function categorizeDate(timestamp: number): string {
  // Convert the timestamp to milliseconds (assuming the timestamp is in seconds)
  const date = new Date(timestamp * 1000);

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Get the date 7 days ago
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Get the date 30 days ago
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Compare the dates
  if (date >= today) {
    return "today";
  } else if (date >= yesterday && date < today) {
    return "yesterday";
  } else if (date >= sevenDaysAgo && date < yesterday) {
    return "previous 7 days";
  } else if (date >= thirtyDaysAgo && date < sevenDaysAgo) {
    return "previous month";
  } else if (date < thirtyDaysAgo) {
    return "later than a month";
  } else {
    return "other";
  }
}
