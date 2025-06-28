import { PDFContent } from '../utils/pdfGenerator';

// All kid-friendly PDF content for every module
export const kidFriendlyPDFs: { [key: string]: PDFContent } = {
  'brainstorming': {
    title: "Story Ideas That Rock! 🚀",
    subtitle: "A Fun Guide to Brainstorming Amazing Stories",
    moduleId: "brainstorming",
    ageGroup: "Perfect for ages 10 and up!",
    sections: [
      {
        heading: "🤔 The Magic 'What If' Question",
        content: "The coolest way to create awesome stories is by asking 'What if?' It's like having a magic wand that turns boring stuff into exciting adventures!",
        examples: [
          {
            title: "School Adventures",
            scenario: "Going to school",
            before: "Emma walks to school like every other day.",
            after: "What if Emma discovered that her school was actually a secret training academy for superheroes, and she was the only one who didn't know?",
            explanation: "See how we took something super normal (going to school) and made it exciting? That's the magic of 'What if!'",
            kidFriendly: true
          },
          {
            title: "Pet Power!",
            scenario: "Having a pet",
            before: "Jake has a pet hamster named Fluffy.",
            after: "What if Jake's hamster Fluffy could talk, but only Jake could hear him, and Fluffy knew all the neighborhood secrets?",
            explanation: "Pets are perfect for 'What if' stories because everyone loves animals and can imagine them doing amazing things!",
            kidFriendly: true
          },
          {
            title: "Homework Heroes",
            scenario: "Doing homework",
            before: "Sarah sits down to do her math homework.",
            after: "What if every math problem Sarah solved correctly made something magical happen in real life - but wrong answers caused chaos?",
            explanation: "Even boring homework can become an adventure with the right 'What if' question!",
            kidFriendly: true
          }
        ],
        tips: [
          "Start with something you do every day (brushing teeth, walking the dog, doing homework)",
          "Add something magical, mysterious, or just plain weird",
          "Ask yourself: 'What would happen if...?'",
          "The weirder, the better! Don't worry if it sounds silly - silly can be awesome!"
        ]
      }
    ]
  },

  'plotting': {
    title: "Building Epic Adventures! ⚡",
    subtitle: "How to Plan Stories That Keep Everyone Reading",
    moduleId: "plotting",
    ageGroup: "Perfect for ages 10 and up!",
    sections: [
      {
        heading: "🎢 The Story Roller Coaster",
        content: "Every great story is like a roller coaster - it starts slow, builds up excitement, has a big thrilling moment, then brings you safely back down. Let's learn how to build your own story roller coaster!",
        examples: [
          {
            title: "The Lost Puppy Adventure",
            scenario: "Finding a lost pet",
            before: "A kid finds a lost puppy and returns it.",
            after: "Beginning: Maya finds a lost puppy in the park. Middle: She tries to find the owner but discovers the puppy has a magical collar that lets it talk - and it's actually a prince from another world who needs her help! End: Maya helps the puppy-prince save his kingdom and he gives her a magical friendship bracelet before returning home.",
            explanation: "See how we started simple, added excitement in the middle, and ended with the problem solved plus a special reward?",
            kidFriendly: true
          },
          {
            title: "The Science Fair Disaster",
            scenario: "School project",
            before: "A student does a science project.",
            after: "Beginning: Alex builds a volcano for the science fair. Middle: The volcano accidentally creates a real tiny dragon that starts causing chaos around school! End: Alex must catch the dragon and figure out how to send it back to where it came from before the principal finds out.",
            explanation: "This story takes a normal school situation and makes it magical and exciting!",
            kidFriendly: true
          }
        ],
        tips: [
          "Start with your character in their normal world",
          "Something exciting or weird happens to change everything",
          "The character tries to fix things but it gets harder",
          "Finally, they solve the problem and learn something new"
        ]
      }
    ]
  },

  'characters': {
    title: "Creating Characters Kids Will Love! 😊",
    subtitle: "How to Make Characters That Feel Like Real Friends",
    moduleId: "characters",
    ageGroup: "Perfect for ages 10 and up!",
    sections: [
      {
        heading: "😊 Making Characters Feel Real",
        content: "The best characters feel like real people you'd want to hang out with (or maybe run away from if they're the bad guy!). Here's how to make characters that jump off the page.",
        examples: [
          {
            title: "The Shy Kid Who's Actually Brave",
            scenario: "School setting",
            before: "Alex is quiet and doesn't talk much.",
            after: "Alex is super shy and never raises their hand in class, but when their little sister gets picked on by bullies, Alex becomes a fierce protector who stands up to kids twice their size.",
            explanation: "This character is interesting because they have two sides - shy AND brave. Real people are like this too!",
            kidFriendly: true
          },
          {
            title: "The Class Clown with a Secret",
            scenario: "Friendship story",
            before: "Sam makes everyone laugh.",
            after: "Sam tells jokes all day and makes everyone laugh, but secretly feels really lonely because they think people only like them when they're being funny, not when they're just being themselves.",
            explanation: "Sometimes the funniest people are actually sad inside. This makes Sam feel real and makes us care about them.",
            kidFriendly: true
          },
          {
            title: "The Perfect Student's Problem",
            scenario: "Academic pressure",
            before: "Riley gets good grades.",
            after: "Riley gets straight A's and everyone thinks they're perfect, but they're terrified of making mistakes and stay up all night worrying about tests. When they finally get a B+, they think their world is ending.",
            explanation: "Even 'perfect' characters need problems to make them interesting and relatable!",
            kidFriendly: true
          }
        ],
        tips: [
          "Give your character something they're good at AND something they struggle with",
          "Think about what they want most and what they're most afraid of",
          "Make them act like real kids you know - with good days and bad days",
          "Give them a hobby, favorite food, or something that makes them unique"
        ]
      }
    ]
  },

  'conflict': {
    title: "Creating Epic Conflicts! ⚔️",
    subtitle: "How to Make Problems That Create Amazing Stories",
    moduleId: "conflict",
    ageGroup: "Perfect for ages 10 and up!",
    sections: [
      {
        heading: "💥 Problems Make Stories Exciting",
        content: "Without problems, stories would be super boring! Imagine reading about someone who woke up, had a perfect day, and went to bed happy. YAWN! Problems create excitement and make us want to keep reading.",
        examples: [
          {
            title: "The Friendship Dilemma",
            scenario: "Friend conflict",
            before: "Two friends disagree about something.",
            after: "Maya's two best friends both invite her to their birthday parties on the same day. She can't hurt either friend's feelings, but she can't be in two places at once! She tries to go to both parties but ends up missing the important moments at each one.",
            explanation: "This is a problem every kid can understand - wanting to make everyone happy but not being able to!",
            kidFriendly: true
          },
          {
            title: "The Pet Responsibility Challenge",
            scenario: "Family responsibility",
            before: "A kid wants a pet.",
            after: "Jordan finally convinces their parents to get a dog, but they promise to take care of it completely. When the dog gets sick and needs expensive medicine, Jordan realizes they spent all their allowance on video games and can't help pay for it.",
            explanation: "This shows how getting what we want can create new, harder problems!",
            kidFriendly: true
          }
        ],
        tips: [
          "Make problems that feel real to kids (friend drama, family rules, school stress)",
          "Start with small problems that get bigger",
          "Make your character choose between two things they both want",
          "Remember: the harder the problem, the more exciting the solution!"
        ]
      }
    ]
  },

  'structure': {
    title: "Building Amazing Story Structures! 🏗️",
    subtitle: "How to Organize Your Stories Like a Pro",
    moduleId: "structure",
    ageGroup: "Perfect for ages 10 and up!",
    sections: [
      {
        heading: "🎢 The Story Roller Coaster",
        content: "Every great story is like a roller coaster ride! It starts slow (getting on), builds up excitement (climbing the big hill), has a thrilling moment (the big drop), then brings you safely back down. Let's learn how to build your own story roller coaster!",
        examples: [
          {
            title: "The Magic Backpack Adventure",
            scenario: "School adventure",
            before: "A kid finds a magic backpack.",
            after: "Beginning: Sam finds a weird old backpack at a garage sale. Middle: Every time Sam puts something in the backpack, it comes to life! First a toy dinosaur, then a drawing of a dragon. But when Sam accidentally puts in homework about volcanoes, a real mini-volcano appears and starts causing chaos at school! End: Sam figures out how to reverse the magic and saves the day, but keeps the backpack for future adventures.",
            explanation: "See how we started normal, added magic and problems, then solved everything with the character being smarter and braver?",
            kidFriendly: true
          }
        ],
        tips: [
          "Start with your character in their normal world",
          "Add something exciting that changes everything",
          "Make the problem get bigger and scarier",
          "Let your character save the day using what they've learned"
        ]
      }
    ]
  },

  'inciting-incidents': {
    title: "Story Starters That Hook Readers! 🎣",
    subtitle: "How to Begin Stories That Nobody Can Put Down",
    moduleId: "inciting-incidents",
    ageGroup: "Perfect for ages 10 and up!",
    sections: [
      {
        heading: "🚀 The Moment Everything Changes",
        content: "The inciting incident is like pressing the START button on a video game - it's the moment when the normal, boring world suddenly becomes an adventure! It's what makes readers think 'Whoa, what happens next?'",
        examples: [
          {
            title: "The Mysterious Text Message",
            scenario: "Modern mystery",
            before: "A kid gets a text message.",
            after: "While doing homework, Zoe's phone buzzes with a text from an unknown number: 'The treasure is hidden where the old oak remembers the lightning.' But Zoe lives in a new neighborhood with no old trees, and she's never told anyone about her secret obsession with treasure hunting.",
            explanation: "This incident is perfect because it's mysterious, personal, and makes us immediately want to know more!",
            kidFriendly: true
          },
          {
            title: "The Substitute Teacher Secret",
            scenario: "School mystery",
            before: "A new substitute teacher arrives.",
            after: "When Ms. Rodriguez, the substitute teacher, accidentally drops her bag, instead of normal teacher stuff, out spills a map of the school, night-vision goggles, and a walkie-talkie. She quickly stuffs everything back and acts like nothing happened, but Alex saw everything.",
            explanation: "This makes us wonder: What is the substitute teacher really doing? Is she a spy? A treasure hunter? We have to keep reading!",
            kidFriendly: true
          }
        ],
        tips: [
          "Make it happen early - don't wait too long!",
          "Make it weird, mysterious, or exciting",
          "Connect it to something your character cares about",
          "Make readers immediately ask 'What happens next?'"
        ]
      }
    ]
  },

  'black-moment': {
    title: "The Darkest Hour! 🌑",
    subtitle: "How to Create Moments That Make Readers Worry",
    moduleId: "black-moment",
    ageGroup: "Perfect for ages 10 and up!",
    sections: [
      {
        heading: "😰 When Everything Goes Wrong",
        content: "The black moment is when your character feels like they've lost everything and can't win. It's like when you're playing a video game and you're down to your last life, facing the final boss, and it looks impossible. But that's what makes the victory so awesome!",
        examples: [
          {
            title: "The Science Fair Disaster",
            scenario: "School competition",
            before: "A student's project breaks.",
            after: "The night before the science fair, Emma's volcano project - the one she's worked on for months - explodes and destroys not only her project but also her little brother's art homework and her mom's important work papers. Her family is angry, her project is ruined, and the science fair is tomorrow. She sits in her room thinking she's the worst daughter and student ever.",
            explanation: "This feels terrible for Emma, but it's also when she'll discover she's stronger and more creative than she thought!",
            kidFriendly: true
          },
          {
            title: "The Lost Best Friend",
            scenario: "Friendship crisis",
            before: "Two friends have a fight.",
            after: "After the biggest fight ever, Kai's best friend Maya won't talk to him, sits with different people at lunch, and even unfriended him online. When Kai overhears Maya telling someone 'I never want to see Kai again,' he realizes he might have lost his best friend forever. He feels completely alone and like it's all his fault.",
            explanation: "This is every kid's worst nightmare - losing their best friend. But it's also when Kai will learn how to truly apologize and be a better friend.",
            kidFriendly: true
          }
        ],
        tips: [
          "Make your character feel like they've lost what matters most",
          "Show them thinking it's all their fault",
          "Make it feel really, really hard to fix",
          "But remember - this is when they'll find their inner strength!"
        ]
      }
    ]
  }
};

// Quick reference content for each module
export const quickReferenceCards: { [key: string]: {
  title: string;
  tips: string[];
  examples: string[];
} } = {
  'brainstorming': {
    title: "Brainstorming Cheat Sheet 🧠",
    tips: [
      "Ask 'What if?' about normal stuff",
      "Combine two random things",
      "Make mind maps with pictures",
      "Write down EVERY idea, even silly ones",
      "Start with what you know and love"
    ],
    examples: ["What if my backpack was magic?", "What if dogs could drive cars?", "What if homework did itself?"]
  },
  'plotting': {
    title: "Story Planning Cheat Sheet 📝",
    tips: [
      "Start with normal life",
      "Add something exciting that changes everything",
      "Make problems get bigger and harder",
      "Character learns and grows",
      "Everything gets solved in an awesome way"
    ],
    examples: ["Normal → Magic appears → Chaos → Learning → Victory"]
  },
  'characters': {
    title: "Character Creation Cheat Sheet 👥",
    tips: [
      "Give them something they're good at",
      "Give them something they struggle with",
      "What do they want most?",
      "What are they afraid of?",
      "What makes them unique?"
    ],
    examples: ["Shy but brave", "Funny but lonely", "Smart but forgetful"]
  },
  'conflict': {
    title: "Problem-Making Cheat Sheet ⚡",
    tips: [
      "Make problems kids can relate to",
      "Start small, then make it bigger",
      "Force characters to choose between good things",
      "The harder the problem, the better the solution"
    ],
    examples: ["Friend drama", "Family rules", "School stress", "Pet problems"]
  },
  'structure': {
    title: "Story Structure Cheat Sheet 🏗️",
    tips: [
      "Beginning: Normal world + something changes",
      "Middle: Problems get bigger + character struggles",
      "End: Character wins using what they learned"
    ],
    examples: ["Like a roller coaster: slow start → big climb → exciting drop → safe landing"]
  },
  'inciting-incidents': {
    title: "Story Starters Cheat Sheet 🚀",
    tips: [
      "Happen early in the story",
      "Make readers ask 'What happens next?'",
      "Connect to what character cares about",
      "Be mysterious, exciting, or weird"
    ],
    examples: ["Mysterious message", "Strange new person", "Weird discovery", "Unexpected invitation"]
  },
  'black-moment': {
    title: "Dark Moments Cheat Sheet 🌑",
    tips: [
      "Character loses what matters most",
      "Feels like it's all their fault",
      "Seems impossible to fix",
      "But this is when they find inner strength!"
    ],
    examples: ["Lost best friend", "Failed at something important", "Disappointed family", "Broke something precious"]
  }
};
