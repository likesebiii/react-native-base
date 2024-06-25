import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Vortex } from "@services";
import { LIVES_TIMEOUT, getDateByDayOffset, randomValue } from "@utils";
import { Platform } from "react-native";

const NOTIFICATIONS = ["life-notification", "streak-notification"] as const;
type NotificationsType = (typeof NOTIFICATIONS)[number];

export const get4PMDateByDayOffset = (offset: number) => {
  return getDateByDayOffset(16, offset);
};

export const getCurrentDateByDayOffset = (offset: number) => {
  return getDateByDayOffset(undefined, offset);
};

export const get9AMDateByDayOffset = (offset: number) => {
  return getDateByDayOffset(9, offset);
};

export const get6PMDateByDayOffset = (offset: number) => {
  return getDateByDayOffset(18, offset);
};

export const getDateForLifeNotification = () => {
  const isPro = Vortex.select("user-vortex", "selectUserSubscriptionType");
  const date =
    Vortex.getObject("user-vortex").lives.date ??
    new Date(Date.now()).toISOString().slice(0, -1);

  return new Date(new Date(date + "Z").getTime() + LIVES_TIMEOUT[isPro] * 1000);
};

type PushNotificationsControllerType = {
  cancelNotifications: (ids: NotificationsType[]) => void;
  triggerDailyNotifications: () => void;
  triggerStreakNotification: () => void;
  triggerLifeNotification: () => void;
  cancelAllNotifications: () => void;
};

export const PUSH_NOTIFICATIONS_CONTROLLER: PushNotificationsControllerType = {
  cancelNotifications: (ids) => {
    if (Platform.OS !== "ios") {
      return;
    }

    PushNotificationIOS.removePendingNotificationRequests(ids);
  },
  triggerStreakNotification: () => {
    if (Platform.OS !== "ios") {
      return;
    }

    const streak_notifications = [
      {
        title: "🔥 Streak Alert!",
        body: `Hold on tight! Don't let go of that winning streak now!`,
      },
      {
        title: `🔥 Don't Break the Streak!`,
        body: `You're on a roll! Keep it up and don't break the streak!`,
      },
      {
        title: `🔥 Streakin' Strong!`,
        body: `Keep the streak alive! You're crushing it!`,
      },
      {
        title: "🔥 No Streak Breakers Allowed!",
        body: `Keep the streak intact! You're unstoppable!`,
      },
    ];
    const random = Math.ceil(randomValue(0, 3));

    PushNotificationIOS.addNotificationRequest({
      category: "streak",
      id: NOTIFICATIONS[1],
      title:
        streak_notifications[random]?.title ?? streak_notifications[0].title,
      body: streak_notifications[random]?.body ?? streak_notifications[0].body,
      badge: 1,
      repeats: false,
      fireDate: get4PMDateByDayOffset(1),
      userInfo: {
        notification_title:
          streak_notifications[random]?.title ?? streak_notifications[0].title,
      },
    });
  },
  triggerLifeNotification: () => {
    if (Platform.OS !== "ios") {
      return;
    }

    const lives_notifications = [
      {
        title: "❤️ You've got 1 life!",
        body: "Ready to learn more history? Jump back in where you left off",
      },
      {
        title: "🧐 Get the question right this time",
        body: "Your now have 1 life and can answer questions again.",
      },
      {
        title: "💪 1 life have been replenished",
        body: "You're ready for new history trivia facts! Jump back in.",
      },
    ];
    const random = Math.floor(randomValue(0, 3));

    PushNotificationIOS.addNotificationRequest({
      category: "lives",
      id: NOTIFICATIONS[0],
      title: lives_notifications[random]?.title ?? lives_notifications[0].title,
      body: lives_notifications[random]?.body ?? lives_notifications[0].body,
      badge: 1,
      repeats: false,
      fireDate: getDateForLifeNotification(),
      userInfo: {
        notification_title:
          lives_notifications[random]?.title ?? lives_notifications[0].title,
      },
    });
  },
  triggerDailyNotifications: () => {
    if (Platform.OS !== "ios") {
      return;
    }

    const daily_notifications: Record<
      number,
      { title: string; body: string; destination_path?: string }
    > = {
      1: {
        title: `🌍 The World Wonders`,
        body: `Marvel at the ancient and modern wonders that have captivated the world.`,
        destination_path: `[application]://topic-page/world-wonders/`,
      },
      2: {
        title: `🏺 World Wonders Secrets`,
        body: `Dive into the stories and mysteries behind the greatest marvels of the world.`,
        destination_path: `[application]://topic-page/world-wonders/`,
      },
      3: {
        title: `📜 The Founding Fathers`,
        body: `Discover the visionaries who forged a nation, their lives, their struggles, and their triumphs.`,
        destination_path: `[application]://topic-page/fathers/`,
      },
      4: {
        title: `🇺🇸 Founding Fathers Legacy`,
        body: `Explore how the bold decisions of The Founding Fathers shaped the future of America.`,
        destination_path: `[application]://topic-page/fathers/`,
      },
      5: {
        title: `🍵 The Boston Tea Party`,
        body: `Step into the pivotal moment that ignited a revolution and marked the dawn of a nation.`,
        destination_path: `[application]://topic-page/boston/`,
      },
      6: {
        title: `🔥 Boston Tea Party Defiance`,
        body: `Unearth the bold act of rebellion that threw a nation onto the path of independence.`,
        destination_path: `[application]://topic-page/boston/`,
      },
      7: {
        title: `🔥 The Chicago Fire`,
        body: `Discover how a devastating fire gave birth to the modern skyscraper city known as Chicago.`,
        destination_path: `[application]://topic-page/chicago/`,
      },
      8: {
        title: `🏙️ Chicago's Transformation`,
        body: `Explore Chicago's journey from the ashes of the Great Fire to becoming a symbol of resilience and rebirth.`,
        destination_path: `[application]://topic-page/chicago/`,
      },
      9: {
        title: `🗽 The Statue of Liberty`,
        body: `Dive into the story of freedom's symbol. Discover the origins and secrets of The Statue of Liberty.`,
        destination_path: `[application]://topic-page/statue-of-liberty/`,
      },
      10: {
        title: `🗽 Lady Liberty`,
        body: `Explore the enduring legacy of The Statue of Liberty as a symbol of hope and freedom.`,
        destination_path: `[application]://topic-page/statue-of-liberty/`,
      },
      11: {
        title: `⛓️ Religion and Slavery`,
        body: `Examine the complex relationship between religion and slavery through history.`,
        destination_path: `[application]://topic-page/slavery/`,
      },
      12: {
        title: `⛓️ Slavery and Faith`,
        body: `Discover how faith influenced the practice of slavery and the fight for freedom.`,
        destination_path: `[application]://topic-page/slavery/`,
      },
      13: {
        title: `🌍 Christopher Columbus`,
        body: `Journey with Columbus on his quest across the ocean that reshaped global history.`,
        destination_path: `[application]://topic-page/columbus/`,
      },
      14: {
        title: `🌎 Columbus Legacy`,
        body: `Delve into the controversial legacy of Christopher Columbus and his expeditions.`,
        destination_path: `[application]://topic-page/columbus/`,
      },
      15: {
        title: `⚔️ Conquistadors`,
        body: `Trace the footsteps of the Conquistadors who embarked on a quest for gold, glory, and God.`,
        destination_path: `[application]://topic-page/conquistadors/`,
      },
      16: {
        title: `🗡️ Era of Conquistadors`,
        body: `Uncover the stories of conquest and conflict that defined the Age of Exploration.`,
        destination_path: `[application]://topic-page/conquistadors/`,
      },
      17: {
        title: `🇺🇸 Political Titans`,
        body: `Explore the origins and evolution of the Republican and Democratic parties in American politics.`,
        destination_path: `[application]://topic-page/republicans-democrats/`,
      },
      18: {
        title: `🐘🐴 U.S. Political Parties`,
        body: `Discover how political divisions gave rise to the United States' enduring democracy.`,
        destination_path: `[application]://topic-page/republicans-democrats/`,
      },
      19: {
        title: `🏔️ Mount Rushmore`,
        body: `Behold the monumental legacy of Mount Rushmore and the presidents who shaped America.`,
        destination_path: `[application]://topic-page/rushmore/`,
      },
      20: {
        title: `🏔️ Rushmore's Legacy`,
        body: `Dive into the creation and controversy of Mount Rushmore, a symbol of American ideals.`,
        destination_path: `[application]://topic-page/rushmore/`,
      },
      21: {
        title: `🏀 Basketball Saga`,
        body: `From peach baskets to global phenomenon, explore the dynamic history of basketball.`,
        destination_path: `[application]://topic-page/basketball/`,
      },
      22: {
        title: `🏀 Court Legends`,
        body: `Dive into the stories of the sport's greatest legends and how they transformed basketball.`,
        destination_path: `[application]://topic-page/basketball/`,
      },
      23: {
        title: `🗳️ Election System`,
        body: `Navigate the complexities of the U.S. election system and its pivotal moments.`,
        destination_path: `[application]://topic-page/election-system/`,
      },
      24: {
        title: `🗳️ Ballots and Beyond`,
        body: `Discover how elections shape governance and policy in the United States.`,
        destination_path: `[application]://topic-page/election-system/`,
      },
      25: {
        title: `🇲🇽 The Aztecs`,
        body: `Step into the world of the Aztecs and uncover the sophistication of their empire.`,
        destination_path: `[application]://topic-page/aztecs/`,
      },
      26: {
        title: `🏰 Aztec Empire`,
        body: `Explore the rise of the Aztec empire and the factors leading to its downfall.`,
        destination_path: `[application]://topic-page/aztecs/`,
      },
      27: {
        title: `⚔️ Civil War`,
        body: `Journey through the pivotal conflict that tore America apart and shaped its future.`,
        destination_path: `[application]://topic-page/civil-war/`,
      },
      28: {
        title: `🇺🇸 Civil War Story`,
        body: `Discover the stories of bravery, sacrifice, and the quest for unity during the Civil War.`,
        destination_path: `[application]://topic-page/civil-war/`,
      },
      29: {
        title: `🕊️ Cold War`,
        body: `Delve into the global rivalry that defined the second half of the 20th century.`,
        destination_path: `[application]://topic-page/cold-war/`,
      },
      30: {
        title: `☢️ Cold War Era`,
        body: `Explore the clandestine operations and political maneuvering of the Cold War era.`,
        destination_path: `[application]://topic-page/cold-war/`,
      },
      31: {
        title: `⚾ Baseball History`,
        body: `Trace the roots of America's pastime and its impact on culture and society.`,
        destination_path: `[application]://topic-page/baseball/`,
      },
      32: {
        title: `⚾ Baseball Evolution`,
        body: `From sandlots to stadiums, discover how baseball became a mirror for American life.`,
        destination_path: `[application]://topic-page/baseball/`,
      },
      33: {
        title: `🎖️ American Revolution`,
        body: `Dive into the revolution that birthed a nation. From early unrest to independence.`,
        destination_path: `[application]://topic-page/american-revolution/`,
      },
      34: {
        title: `🇺🇸 Revolution Insights`,
        body: `Explore the strategies, battles, and heroes of the American Revolution.`,
        destination_path: `[application]://topic-page/american-revolution/`,
      },
      35: {
        title: `🌊 Normandy Invasion`,
        body: `Uncover the pivotal WWII operation that turned the tide in favor of the Allies.`,
        destination_path: `[application]://topic-page/normandy/`,
      },
      36: {
        title: `🏖️ D-Day: The Decisive Battle`,
        body: `Step onto the beaches of Normandy and relive the day that changed the course of history.`,
        destination_path: `[application]://topic-page/normandy/`,
      },
      37: {
        title: `🕵️ The CIA Exposed`,
        body: `Delve into the covert world of the CIA, its missions, and controversies.`,
        destination_path: `[application]://topic-page/cia/`,
      },
      38: {
        title: `🔍 Inside the CIA`,
        body: `Explore the inner workings and hidden stories of one of the world's most secretive agencies.`,
        destination_path: `[application]://topic-page/cia/`,
      },
      39: {
        title: `🇮🇱 Mossad Mysteries`,
        body: `Discover the operations of Mossad, Israel's national intelligence agency.`,
        destination_path: `[application]://topic-page/mossad/`,
      },
      40: {
        title: `💼 Mossad: Behind the Scenes`,
        body: `Get a closer look at Mossad's strategic significance and its impact on global affairs.`,
        destination_path: `[application]://topic-page/mossad/`,
      },
      41: {
        title: `🏺 Ancient Egypt`,
        body: `Travel back to the land of pharaohs, pyramids, and the Nile's secrets.`,
        destination_path: `[application]://topic-page/ancient-egypt/`,
      },
      42: {
        title: `🔎 Unearthing Egypt`,
        body: `Explore the mysteries, achievements, and enduring legacy of ancient Egypt.`,
        destination_path: `[application]://topic-page/ancient-egypt/`,
      },
      43: {
        title: `💡 Great Depression`,
        body: `Examine the causes, the crisis, and the recovery from this pivotal moment in history.`,
        destination_path: `[application]://topic-page/great-depression/`,
      },
      44: {
        title: `📉 Depression's Impact`,
        body: `Discover how the Great Depression reshaped American society and the economy.`,
        destination_path: `[application]://topic-page/great-depression/`,
      },
      45: {
        title: `🎩 Abraham Lincoln`,
        body: `From humble beginnings to the Emancipation Proclamation, explore Lincoln's legacy.`,
        destination_path: `[application]://topic-page/lincoln/`,
      },
      46: {
        title: `🇺🇸 Lincoln's Leadership`,
        body: `Learn about Lincoln's presidency, his leadership during the Civil War, and his vision for America.`,
        destination_path: `[application]://topic-page/lincoln/`,
      },
      47: {
        title: `🚀 Elon Musk`,
        body: `From PayPal to SpaceX, delve into the journey of tech visionary Elon Musk.`,
        destination_path: `[application]://topic-page/musk/`,
      },
      48: {
        title: `🛰️ Musk's Innovations`,
        body: `Explore the groundbreaking innovations and ambitious future plans of Elon Musk.`,
        destination_path: `[application]://topic-page/musk/`,
      },
      49: {
        title: `🇺🇸 Barack Obama`,
        body: `Trace the historic path of Barack Obama from Hawaii to the White House.`,
        destination_path: `[application]://topic-page/obama/`,
      },
      50: {
        title: `📖 Obama's Legacy`,
        body: `Examine the policies, challenges, and achievements of Barack Obama's presidency.`,
        destination_path: `[application]://topic-page/obama/`,
      },
      51: {
        title: `🕊️ Martin Luther King`,
        body: `Dive into the life and legacy of Dr. Martin Luther King Jr. and his dream of equality.`,
        destination_path: `[application]://topic-page/king/`,
      },
      52: {
        title: `💬 King's Speeches`,
        body: `Explore the powerful words and speeches that defined Martin Luther King's leadership.`,
        destination_path: `[application]://topic-page/king/`,
      },
      53: {
        title: `🏢 Donald Trump`,
        body: `From real estate mogul to the 45th President of the United States, discover Trump's journey.`,
        destination_path: `[application]://topic-page/trump/`,
      },
      54: {
        title: `🗳️ Trump's Presidency`,
        body: `Analyze the key moments, controversies, and achievements of Donald Trump's tenure.`,
        destination_path: `[application]://topic-page/trump/`,
      },
      55: {
        title: `🔬 Manhattan Project`,
        body: `Uncover the secrets behind the project that changed the course of WWII and the world.`,
        destination_path: `[application]://topic-page/manhattan-project/`,
      },
      56: {
        title: `💣 The Atomic Age`,
        body: `Explore how the Manhattan Project ushered in the nuclear age and its global implications.`,
        destination_path: `[application]://topic-page/manhattan-project/`,
      },
      57: {
        title: `🧠 Greatest Thinkers`,
        body: `Journey through the minds of history's greatest thinkers and their revolutionary ideas.`,
        destination_path: `[application]://topic-page/greatest-thinkers/`,
      },
      58: {
        title: `💡 Ideas That Changed the World`,
        body: `Dive into the philosophies and innovations that have shaped human thought and society.`,
        destination_path: `[application]://topic-page/greatest-thinkers/`,
      },
      59: {
        title: `🍂 Pocahontas`,
        body: `Discover the true story of Pocahontas and her pivotal role in American history.`,
        destination_path: `[application]://topic-page/pocahontas/`,
      },
      60: {
        title: `🌳 Pocahontas and Jamestown`,
        body: `Explore the interaction between Pocahontas and the Jamestown settlers, shaping the New World.`,
        destination_path: `[application]://topic-page/pocahontas/`,
      },
      61: {
        title: `🚀 Cuban Missile Crisis`,
        body: `Step into the tense 13 days that brought the world to the brink of nuclear war.`,
        destination_path: `[application]://topic-page/cuban-crisis/`,
      },
      62: {
        title: `☢️ Brink of Armageddon`,
        body: `Analyze the strategies and outcomes of the Cuban Missile Crisis and its impact on the Cold War.`,
        destination_path: `[application]://topic-page/cuban-crisis/`,
      },
      63: {
        title: `✈️ Amelia Earhart`,
        body: `Follow the adventures and mysteries surrounding the pioneering aviator Amelia Earhart.`,
        destination_path: `[application]://topic-page/amelia-earhart/`,
      },
      64: {
        title: `🛩️ Earhart's Legacy`,
        body: `Celebrate the legacy of Amelia Earhart, her contributions to aviation, and the enduring mystery of her disappearance.`,
        destination_path: `[application]://topic-page/amelia-earhart/`,
      },
      65: {
        title: `🌎 Discovery of America`,
        body: `Embark on the voyages that led to the discovery of a new world and changed history forever.`,
        destination_path: `[application]://topic-page/america-discovery/`,
      },
      66: {
        title: `🧭 Navigating New Worlds`,
        body: `Explore the expeditions, encounters, and consequences of the Age of Discovery.`,
        destination_path: `[application]://topic-page/america-discovery/`,
      },
      67: {
        title: `🎷 Jazz Evolution`,
        body: `Dive into the roots of jazz music and its profound impact on culture and the arts.`,
        destination_path: `[application]://topic-page/jazz/`,
      },
      68: {
        title: `🎶 Rhythms of Revolution`,
        body: `Experience the story of jazz from its birth in New Orleans to its global influence.`,
        destination_path: `[application]://topic-page/jazz/`,
      },
      69: {
        title: `🎬 Hollywood`,
        body: `Step behind the scenes of Hollywood, the dream factory that captivates the world.`,
        destination_path: `[application]://topic-page/hollywood/`,
      },
      70: {
        title: `🌟 Silver Screen Legends`,
        body: `Uncover the tales of ambition, fame, and the golden age of American cinema.`,
        destination_path: `[application]://topic-page/hollywood/`,
      },
      71: {
        title: `🚂 Underground Railroad`,
        body: `Trace the secret routes and safe houses of the Underground Railroad that led thousands to freedom.`,
        destination_path: `[application]://topic-page/railroad/`,
      },
      72: {
        title: `🗽 Pathways to Freedom`,
        body: `Discover the heroes and stories of courage in the quest for freedom through the Underground Railroad.`,
        destination_path: `[application]://topic-page/railroad/`,
      },
      73: {
        title: `🏺 Fall of Babylon`,
        body: `Explore the rise and dramatic fall of Babylon, one of history's greatest ancient cities.`,
        destination_path: `[application]://topic-page/babylon/`,
      },
      74: {
        title: `🌌 Mysteries of Babylon`,
        body: `Unravel the legends and the real stories behind the once-mighty empire of Babylon.`,
        destination_path: `[application]://topic-page/babylon/`,
      },
      75: {
        title: `⚔️ Mexican-American War`,
        body: `Dive into the conflicts and consequences of the Mexican-American War and its shaping of borders.`,
        destination_path: `[application]://topic-page/mexican-american-war/`,
      },
      76: {
        title: `🗺️ War and Territory`,
        body: `Examine the territorial disputes and the legacy of the Mexican-American War.`,
        destination_path: `[application]://topic-page/mexican-american-war/`,
      },
      77: {
        title: `☢️ Chernobyl Disaster`,
        body: `Investigate the causes and aftermath of the Chernobyl disaster, a pivotal moment in nuclear history.`,
        destination_path: `[application]://topic-page/chernobyl-disaster/`,
      },
      78: {
        title: `🔬 Aftermath of Chernobyl`,
        body: `Discover the environmental and human impact of the Chernobyl disaster and lessons learned.`,
        destination_path: `[application]://topic-page/chernobyl-disaster/`,
      },
      79: {
        title: `🖤 Black Death`,
        body: `Explore the devastation of the Black Death and its profound effects on medieval society.`,
        destination_path: `[application]://topic-page/black-death/`,
      },
      80: {
        title: `🌍 Pandemic History`,
        body: `Uncover the history and legacy of one of the most deadly pandemics to ever strike humanity.`,
        destination_path: `[application]://topic-page/black-death/`,
      },
      81: {
        title: `📐 History of Math`,
        body: `Journey through the evolution of mathematics from ancient symbols to modern equations.`,
        destination_path: `[application]://topic-page/the-history-of-math/`,
      },
      82: {
        title: `🔢 Math's Greatest Minds`,
        body: `Meet the mathematicians who made groundbreaking discoveries and shaped the world we know.`,
        destination_path: `[application]://topic-page/the-history-of-math/`,
      },
      83: {
        title: `🏝️ Island Ownership`,
        body: `Dive into the complex history of island territorial disputes and the struggle for control.`,
        destination_path: `[application]://topic-page/territorial-ownership-of-islands/`,
      },
      84: {
        title: `🌊 Sovereign Seas`,
        body: `Examine the geopolitics of island territories and their strategic importance throughout history.`,
        destination_path: `[application]://topic-page/territorial-ownership-of-islands/`,
      },
      85: {
        title: `🚢 Pearl Harbor`,
        body: `Revisit the day that drew the United States into WWII and changed the course of history.`,
        destination_path: `[application]://topic-page/pearl-harbor/`,
      },
      86: {
        title: `💣 Attack on Pearl Harbor`,
        body: `Explore the impact and aftermath of the surprise attack on Pearl Harbor.`,
        destination_path: `[application]://topic-page/pearl-harbor/`,
      },
      87: {
        title: `🇻🇳 Vietnam War`,
        body: `Delve into the complex conflict of the Vietnam War, its battles, strategies, and human cost.`,
        destination_path: `[application]://topic-page/vietnam-war/`,
      },
      88: {
        title: `🔥 Legacy of Vietnam`,
        body: `Investigate how the Vietnam War influenced American policy, culture, and society.`,
        destination_path: `[application]://topic-page/vietnam-war/`,
      },
      89: {
        title: `🌋 Fall of Pompeii`,
        body: `Witness the catastrophic eruption that buried Pompeii and preserved a moment in time.`,
        destination_path: `[application]://topic-page/pompeii/`,
      },
      90: {
        title: `🏛️ Secrets of Pompeii`,
        body: `Unlock the mysteries of Pompeii, from daily life to the fateful eruption of Mount Vesuvius.`,
        destination_path: `[application]://topic-page/pompeii/`,
      },
      91: {
        title: `👑 Queens of Europe`,
        body: `Discover the powerful queens who ruled, influenced, and shaped Europe's history.`,
        destination_path: `[application]://topic-page/powerful-queens/`,
      },
      92: {
        title: `🏰 Reigns of Influence`,
        body: `Explore the legacies of Europe's most influential queens and their impact on the world stage.`,
        destination_path: `[application]://topic-page/powerful-queens/`,
      },
      93: {
        title: `🎨 The Medici Family`,
        body: `Enter the world of the Medici, the power brokers of Renaissance Florence who patronized the arts and politics.`,
        destination_path: `[application]://topic-page/medici/`,
      },
      94: {
        title: `💰 Medici: Patrons of the Renaissance`,
        body: `Discover how the Medici family's patronage fostered the Renaissance's artistic and scientific explosion.`,
        destination_path: `[application]://topic-page/medici/`,
      },
      95: {
        title: `🕊️ Buddhism`,
        body: `Trace the origins and spread of Buddhism, a philosophy and faith that has shaped millions of lives.`,
        destination_path: `[application]://topic-page/buddhism/`,
      },
      96: {
        title: `🧘‍♂️ Path to Enlightenment`,
        body: `Explore the teachings, traditions, and practices of Buddhism across different cultures.`,
        destination_path: `[application]://topic-page/buddhism/`,
      },
      97: {
        title: `✝️ The Vatican City`,
        body: `Unveil the history and secrets of the Vatican City, the heart of the Catholic Church.`,
        destination_path: `[application]://topic-page/vatican/`,
      },
      98: {
        title: `🔒 Vatican Mysteries`,
        body: `Dive into the Vatican's role in religion, art, and global diplomacy over the centuries.`,
        destination_path: `[application]://topic-page/vatican/`,
      },
      99: {
        title: `🕎 The Holocaust`,
        body: `Reflect on the Holocaust, a dark period of human history, and remember the lives lost.`,
        destination_path: `[application]://topic-page/holocaust/`,
      },
      100: {
        title: `🔍 Holocaust Lessons`,
        body: `Learn about the Holocaust's impact on the world and the importance of never forgetting.`,
        destination_path: `[application]://topic-page/holocaust/`,
      },
    };

    // Generate notifications for first 30 days
    Array.from(Array(30).keys()).forEach((dayOffset) => {
      if (dayOffset === 0) {
        // Generate only the notification for 6PM
        const randomNotification = Math.ceil(randomValue(1, 100));

        PushNotificationIOS.addNotificationRequest({
          category: "daily",
          id: `daily-notification-day-${dayOffset}-${randomNotification}-1`,
          title:
            daily_notifications[randomNotification].title ??
            daily_notifications[0].title,
          body:
            daily_notifications[randomNotification].body ??
            daily_notifications[0].body,
          badge: 1,
          repeats: false,
          fireDate: get6PMDateByDayOffset(dayOffset),
          userInfo: {
            notification_title:
              daily_notifications[randomNotification].title ??
              daily_notifications[0].title,
            destination_path:
              daily_notifications[randomNotification].destination_path ?? "",
          },
        });
      } else {
        const randomNotification1 = Math.ceil(randomValue(1, 100));
        const randomNotification2 = Math.ceil(randomValue(1, 100));

        PushNotificationIOS.addNotificationRequest({
          category: "daily",
          id: `daily-notification-day-${dayOffset}-${randomNotification1}-1`,
          title:
            daily_notifications[randomNotification1].title ??
            daily_notifications[0].title,
          body:
            daily_notifications[randomNotification1].body ??
            daily_notifications[0].body,
          badge: 1,
          repeats: false,
          fireDate: getCurrentDateByDayOffset(dayOffset),
          userInfo: {
            notification_title:
              daily_notifications[randomNotification1].title ??
              daily_notifications[0].title,
            destination_path:
              daily_notifications[randomNotification1].destination_path ?? "",
          },
        });

        PushNotificationIOS.addNotificationRequest({
          category: "daily",
          id: `daily-notification-day-${dayOffset}-${randomNotification2}-2`,
          title:
            daily_notifications[randomNotification2].title ??
            daily_notifications[0].title,
          body:
            daily_notifications[randomNotification2].body ??
            daily_notifications[0].body,
          badge: 1,
          repeats: false,
          fireDate: get6PMDateByDayOffset(dayOffset),
          userInfo: {
            notification_title:
              daily_notifications[randomNotification2].title ??
              daily_notifications[0].title,
            destination_path:
              daily_notifications[randomNotification2].destination_path ?? "",
          },
        });
      }
    });
  },
  cancelAllNotifications: () => {
    if (Platform.OS !== "ios") {
      return;
    }

    // Remove pending notifications to not be displayed in the future
    PushNotificationIOS.removeAllPendingNotificationRequests();
  },
};
