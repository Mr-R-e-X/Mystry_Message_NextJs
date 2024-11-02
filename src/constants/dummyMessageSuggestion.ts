export interface DummyMessageObject {
  message: string;
  title: string;
  received: string;
}

const dummyMessages: DummyMessageObject[] = [
  {
    message: "What's a skill you've always wanted to learn?",
    title: "Message from 'WonderSeeker'",
    received: "1 day ago",
  },
  {
    message: "If you could visit any fictional world, where would you go?",
    title: "Message from 'DreamChaser'",
    received: "2 days ago",
  },
  {
    message: "What's a movie or show that always makes you laugh?",
    title: "Message from 'LaughLover'",
    received: "1 hour ago",
  },
  {
    message:
      "If you could master any instrument instantly, which one would you choose?",
    title: "Message from 'RhythmWizard'",
    received: "3 hours ago",
  },
  {
    message: "What's the best book you've read recently?",
    title: "Message from 'PageTurner'",
    received: "4 hours ago",
  },
  {
    message:
      "If you could time-travel, would you go to the past or the future?",
    title: "Message from 'TimeTraveler'",
    received: "5 hours ago",
  },
  {
    message: "What's one small act of kindness that made your day better?",
    title: "Message from 'KindHeart'",
    received: "6 hours ago",
  },
  {
    message:
      "If you could spend a day with any animal, real or fictional, which one would it be?",
    title: "Message from 'AnimalAdventurer'",
    received: "7 hours ago",
  },
  {
    message: "What's your favorite way to unwind after a long day?",
    title: "Message from 'ZenMaster'",
    received: "8 hours ago",
  },
  {
    message:
      "If you could teleport anywhere in the world right now, where would you go?",
    title: "Message from 'JetSetter'",
    received: "9 hours ago",
  },
  {
    message: "What’s the most creative project you've worked on?",
    title: "Message from 'IdeaMachine'",
    received: "10 hours ago",
  },
  {
    message: "What’s something small that makes you smile every time?",
    title: "Message from 'SmileGiver'",
    received: "11 hours ago",
  },
  {
    message:
      "If you could instantly learn any language, which one would it be and why?",
    title: "Message from 'PolyglotPro'",
    received: "12 hours ago",
  },
  {
    message:
      "What's a food or dish that you think everyone should try at least once?",
    title: "Message from 'FoodieExplorer'",
    received: "13 hours ago",
  },
  {
    message: "What's your favorite memory from a vacation or trip?",
    title: "Message from 'TravelTales'",
    received: "14 hours ago",
  },
  {
    message:
      "If you could live in any period of history, when would you choose?",
    title: "Message from 'HistoryBuff'",
    received: "15 hours ago",
  },
  {
    message: "What's a quote or saying that inspires you?",
    title: "Message from 'QuoteKeeper'",
    received: "16 hours ago",
  },
  {
    message: "What's something unusual or unique you’re really interested in?",
    title: "Message from 'CuriosityGuru'",
    received: "17 hours ago",
  },
  {
    message: "What’s the last thing that made you laugh unexpectedly?",
    title: "Message from 'GiggleWizard'",
    received: "18 hours ago",
  },
  {
    message: "If you could invent a holiday, what would it celebrate?",
    title: "Message from 'FestiveDreamer'",
    received: "19 hours ago",
  },
  {
    message: "What's your favorite way to spend a weekend?",
    title: "Message from 'WeekendWanderer'",
    received: "20 hours ago",
  },
  {
    message: "What's a movie or song that brings back great memories?",
    title: "Message from 'NostalgiaVibes'",
    received: "21 hours ago",
  },
  {
    message: "What's a goal or dream you're excited to work toward?",
    title: "Message from 'DreamBuilder'",
    received: "22 hours ago",
  },
  {
    message:
      "If you could swap lives with any character from a book or show, who would it be?",
    title: "Message from 'StoryShifter'",
    received: "23 hours ago",
  },
  {
    message: "What’s a hobby or interest that you never get bored of?",
    title: "Message from 'PassionPioneer'",
    received: "1 day ago",
  },
  {
    message: "What's one thing you wish more people knew about?",
    title: "Message from 'KnowledgeNinja'",
    received: "2 days ago",
  },
  {
    message: "What's a hidden talent you have, or wish you had?",
    title: "Message from 'TalentScout'",
    received: "3 days ago",
  },
  {
    message: "If you could change one thing about the world, what would it be?",
    title: "Message from 'WorldChanger'",
    received: "4 days ago",
  },
  {
    message: "What's your favorite way to celebrate small wins?",
    title: "Message from 'VictoryVibe'",
    received: "5 days ago",
  },
  {
    message: "What’s something you’d love to do or try this year?",
    title: "Message from 'BucketLister'",
    received: "6 days ago",
  },
  {
    message: "If you had unlimited resources, what project would you start?",
    title: "Message from 'Visionary'",
    received: "7 days ago",
  },
];

export function shuffleMessages(
  messages: DummyMessageObject[]
): DummyMessageObject[] {
  for (let i = messages.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [messages[i], messages[randomIndex]] = [messages[randomIndex], messages[i]];
  }
  return messages;
}

export function anyThreeMessages(messages: DummyMessageObject[]): string {
  let suggestion: string = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * 31);
    if (i == 2) {
      suggestion = suggestion + messages[randomIndex].message;
    } else {
      suggestion = suggestion + messages[randomIndex].message + "||";
    }
  }
  return suggestion;
}
export default dummyMessages;
