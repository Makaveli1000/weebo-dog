// ======================================================
// ZEUS AI INTRO ENGINE
// ======================================================

const zeusGreetings = [
  "Welcome back, Champion.",
  "Searching for tomorrow's legends...",
  "Scanning athletes across America...",
  "Connecting schools from around the world...",
  "Recruiters are discovering new talent right now...",
  "Zeus AI is analyzing the nation's top performers...",
  "The world's next superstar may be one click away.",
  "Welcome to the future of sports.",
  "Champions are not simply born... they are discovered.",
  "Every great athlete has a story. Let us find yours.",
  "Greatness has no borders.",
  "The next legend may already be here."
];

const zeusLiveAnnouncements = [
  "New athletes are joining the network today.",
  "Live games are being broadcast across the sports world.",
  "Recruiters are actively searching for new talent.",
  "New highlights are trending across the country.",
  "Girls Flag Football continues to grow nationwide.",
  "Football recruiting activity is increasing.",
  "Basketball rankings are being analyzed by Zeus AI.",
  "Schools are adding new athletes and programs.",
  "Fans are watching highlights from around the world.",
  "Zeus AI is searching for tomorrow's stars."
];

function getRandomItem(items = []) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }

  return items[
    Math.floor(
      Math.random() * items.length
    )
  ];
}

export function getRandomZeusGreeting() {
  return getRandomItem(
    zeusGreetings
  );
}

export function getRandomZeusAnnouncement() {
  return getRandomItem(
    zeusLiveAnnouncements
  );
}

export function buildZeusIntroLines() {
  return [
    getRandomZeusGreeting(),

    "Attention athletes...",
    "Coaches...",
    "Schools...",
    "Recruiters...",
    "Families...",
    "Fans...",

    "Welcome to Snt.L.Mo. Sports Network...",

    "The global home of athletic excellence.",

    "From every city...",
    "Every state...",
    "Every country...",
    "Every level of competition...",

    "Whether you are taking your first steps onto the field...",
    "Or competing on the world's biggest stages...",

    "Your journey begins here.",

    getRandomZeusAnnouncement(),

    "Discover elite athletes from around the globe...",
    "Watch game-changing highlights...",
    "Explore schools and athletic programs...",
    "Follow live games and national rankings...",
    "Connect with recruiters...",
    "Build your legacy...",

    "Powered by Zeus AI.",

    "The future of sports has arrived.",

    "Now...",

    "Let us discover the next generation of greatness."
  ];
}

export function buildZeusHeroScript() {
  return [
    getRandomZeusGreeting(),
    "The global home of athletic excellence.",
    "Every athlete...",
    "Every school...",
    "Every coach...",
    "Every recruiter...",
    "Every family...",
    "Every fan...",
    "From every city...",
    "Every state...",
    "Every country...",
    "Discover athletes from around the world...",
    "Watch game-changing highlights...",
    "Explore school programs...",
    "Follow national and global rankings...",
    "Connect through recruiting...",
    "Build your legacy...",
    getRandomZeusAnnouncement()
  ];
}

export function buildZeusDashboardBriefing({
  adminName = "Champion",
  athleteCount = 0,
  recruitingUpdates = 0,
  schoolCount = 0,
  featuredAthlete = ""
} = {}) {
  const featuredLine =
    featuredAthlete
      ? `Today's featured athlete is ${featuredAthlete}.`
      : "Today's featured athlete is still being selected.";

  return [
    `Good morning, ${adminName}.`,
    `There are ${athleteCount} active athletes in the system.`,
    `There are ${recruitingUpdates} recruiting updates waiting for review.`,
    `${schoolCount} schools are currently connected to the network.`,
    featuredLine,
    "What would you like to do?",
    "Find an athlete.",
    "Watch highlights.",
    "View rankings.",
    "Open recruiting.",
    "Or enter the War Room."
  ];
}