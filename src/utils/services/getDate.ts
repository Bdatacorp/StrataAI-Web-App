export default function getDate() {
  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      return "Good Morning!";
    } else if (hours < 18) {
      return "Good Afternoon!";
    } else if (hours < 21) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  };

  const now = new Date();

  const options: any = {
    timeZone: "Australia/Melbourne",
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDateEnglish = now.toLocaleDateString("en-AU", options);

  return { formattedDateEnglish, greeting: getGreeting() };
}
