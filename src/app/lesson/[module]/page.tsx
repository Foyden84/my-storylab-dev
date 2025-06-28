'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BookOpen, ArrowLeft, ArrowRight, Lightbulb, Users, CheckCircle, Play, Zap, Building, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import WritingTips from '../../../components/WritingTips';
import WritingExamples from '../../../components/WritingExamples';
import PDFDownloads from '../../../components/PDFDownloads';

interface LessonStep {
  id: string;
  title: string;
  content: string;
  type: 'tutorial' | 'exercise' | 'prompt';
  aiPrompt?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  steps: LessonStep[];
}

const modules: { [key: string]: Module } = {
  'brainstorming': {
    id: 'brainstorming',
    title: 'Brainstorming',
    description: 'Learn to generate and organize creative ideas for your stories with proven techniques.',
    level: 'Beginner',
    duration: '45 mins',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    steps: [
      {
        id: 'intro',
        title: 'Welcome to Brainstorming',
        content: 'Brainstorming is the foundation of great storytelling. Every amazing story starts with a spark of imagination that gets developed through creative thinking. In this lesson, you\'ll learn proven techniques used by professional writers to generate endless story ideas and organize them into compelling concepts.\n\nThink of brainstorming like planting a garden - you scatter lots of seeds (ideas), nurture the ones that sprout (develop promising concepts), and eventually harvest the best ones (turn them into stories). The key is to be playful, curious, and open to unexpected connections.',
        type: 'tutorial'
      },
      {
        id: 'what-if',
        title: 'The "What If" Technique',
        content: 'The most powerful brainstorming tool is asking "What if?" This simple question opens up endless possibilities for your stories. It works by taking something ordinary and adding a twist, or combining two unrelated things to see what happens.\n\nHere\'s how to use it effectively:\n\n• Start with everyday situations: "What if you woke up tomorrow and..."\n• Combine opposites: "What if the quietest kid in school was secretly..."\n• Add magical elements: "What if mirrors could..."\n• Change the rules: "What if gravity only worked on Tuesdays?"\n\nThe best "what if" questions make you immediately want to know what happens next. They create instant curiosity and conflict, which are the building blocks of great stories.',
        type: 'tutorial'
      },
      {
        id: 'practice-what-if',
        title: 'Practice: Generate Your "What If" Ideas',
        content: 'Now it\'s your turn! Create 5 different "What if" scenarios using these starter prompts. Don\'t worry about making them perfect – just let your imagination flow and have fun with it.\n\nTry these approaches:\n1. What if you could [magical ability] but only [limitation]?\n2. What if everyone in your town suddenly [strange event]?\n3. What if you discovered that your [family member/friend] was secretly [surprising truth]?\n4. What if [everyday object] could [impossible thing]?\n5. What if you had to [challenging task] in order to [important goal]?\n\nRemember: The weirder and more unexpected, the better! Great stories often come from the most unusual combinations.',
        type: 'exercise',
        aiPrompt: 'I\'m learning about brainstorming for creative writing using "What if" scenarios. Can you help me understand how to create compelling "What if" questions that lead to interesting stories? Please provide some examples and guide me through developing my own scenarios. I want to make sure they have built-in conflict and curiosity.'
      },
      {
        id: 'mind-mapping',
        title: 'Mind Mapping Your Ideas',
        content: 'Once you have your "What if" scenarios, it\'s time to expand them using mind mapping. This visual technique helps you explore connections and develop your ideas in all directions, like branches growing from a tree.\n\nHere\'s how to create an effective mind map:\n\n1. **Start with your central idea** in the middle of a page\n2. **Create main branches** for key story elements:\n   • Characters (Who is involved?)\n   • Setting (Where and when does it happen?)\n   • Conflict (What problems arise?)\n   • Stakes (What happens if they fail?)\n   • Theme (What\'s the deeper meaning?)\n\n3. **Add sub-branches** with specific details:\n   • Character traits, backgrounds, relationships\n   • Specific locations, time periods, atmosphere\n   • Types of obstacles, internal struggles\n   • Consequences, rewards, emotional impact\n\n4. **Look for unexpected connections** between different branches - these often lead to the most interesting story developments!\n\nMind mapping helps you see the full potential of your idea and discover elements you might have missed.',
        type: 'tutorial'
      },
      {
        id: 'create-mind-map',
        title: 'Create Your Mind Map',
        content: 'Choose your favorite "What if" scenario from the previous exercise and create a detailed mind map around it. Start with your central concept and branch out to explore every aspect of your potential story.\n\nAs you create your mind map, ask yourself:\n• Who would be affected by this situation?\n• Where would this story take place?\n• What complications could arise?\n• How might different characters react differently?\n• What emotions would be involved?\n• What would be at stake?\n• How could this situation get worse before it gets better?\n\nDon\'t limit yourself - add colors, drawings, symbols, or anything that helps you visualize your story world. The goal is to generate as many connected ideas as possible.',
        type: 'exercise',
        aiPrompt: 'I have a "What if" scenario for a story and I want to create a comprehensive mind map to develop it further. Can you help me explore different aspects like characters, settings, conflicts, themes, and potential plot developments? I want to make sure I\'m considering all the story possibilities and finding interesting connections between different elements.'
      },
      {
        id: 'organizing-ideas',
        title: 'Organizing Your Ideas',
        content: 'Great brainstorming creates lots of ideas, but you need to organize them effectively to turn them into a workable story. Think of this step like sorting through treasure - you want to keep the gems and set aside the rest for later.\n\nHere\'s how to organize your brainstormed ideas:\n\n**1. Sort by Story Element:**\n• Characters: Main protagonist, antagonist, supporting characters\n• Plot: Beginning situation, major events, climax, resolution\n• Setting: Time, place, atmosphere, world-building details\n• Themes: What your story is really about underneath\n\n**2. Prioritize by Importance:**\n• Core elements (essential to your story)\n• Supporting elements (enhance the story)\n• Bonus elements (nice to have but not necessary)\n\n**3. Look for Patterns:**\n• Which ideas keep appearing in different forms?\n• What themes naturally emerge?\n• Which characters seem most interesting?\n• What conflicts feel most compelling?\n\n**4. Create Connections:**\n• How do your characters relate to each other?\n• How does the setting affect the plot?\n• How do smaller conflicts build to the main conflict?\n\nThis organization process helps you see the shape of your story and identify what you need to develop further.',
        type: 'tutorial'
      },
      {
        id: 'idea-evaluation',
        title: 'Evaluate Your Best Ideas',
        content: 'Not every idea will become a story, and that\'s perfectly fine! Learning to evaluate your ideas helps you focus your energy on the most promising concepts. Use these criteria to assess your brainstormed ideas:\n\n**The "Excitement Test":**\n• Does this idea make you excited to write it?\n• Would you want to read this story if someone else wrote it?\n• Do you find yourself thinking about it when you\'re not actively brainstorming?\n\n**The "Conflict Test":**\n• Is there a clear problem or challenge?\n• Are there obstacles that will be difficult to overcome?\n• Can the conflict get worse before it gets better?\n\n**The "Character Test":**\n• Can you imagine interesting characters in this situation?\n• Would these characters have reasons to care about the outcome?\n• Do they have the potential to grow and change?\n\n**The "Uniqueness Test":**\n• What makes this story different from others you\'ve read?\n• What\'s your unique angle or twist?\n• What can only you bring to this story?\n\nRate each of your top 3 ideas on these criteria. The one that scores highest is probably your best bet for development!',
        type: 'exercise',
        aiPrompt: 'I\'ve brainstormed several story ideas and need help evaluating which ones have the most potential. Can you help me assess my concepts using criteria like excitement level, conflict potential, character possibilities, and uniqueness? I want to choose the most promising idea to develop further.'
      },
      {
        id: 'final-concept',
        title: 'Develop Your Story Concept',
        content: 'Time to bring it all together! Use your brainstorming work to create a clear, compelling story concept that captures the essence of your idea in a way that excites both you and potential readers.\n\nA strong story concept should include:\n\n**1. Your Protagonist:** Who is the main character and what makes them interesting?\n\n**2. The Central Conflict:** What major problem or challenge drives the story?\n\n**3. The Stakes:** What happens if the protagonist fails? What do they stand to gain or lose?\n\n**4. The Hook:** What makes this story unique and compelling?\n\n**Example Concept:**\n"When 12-year-old Maya discovers she can hear the thoughts of plants, she must use her new ability to save her grandmother\'s dying garden before the family loses their home - but the plants\' constant chatter is driving her crazy, and some of them have very dark secrets about the neighborhood."\n\nThis concept tells us who (Maya), what (save the garden), why it matters (family home), what makes it unique (hearing plants), and hints at complications (overwhelming ability, dark secrets).\n\nNow create your own story concept using the same structure!',
        type: 'prompt',
        aiPrompt: 'I\'ve been brainstorming ideas for a story and now I want to develop a clear, compelling story concept. Can you help me refine my idea and make sure it has all the essential elements: an interesting protagonist, clear central conflict, meaningful stakes, and a unique hook? I want to create a concept that would make readers immediately want to know what happens next.'
      }
    ]
  },
  'plotting': {
    id: 'plotting',
    title: 'Plotting',
    description: 'Master the art of creating compelling plot structures that keep readers engaged.',
    level: 'Beginner',
    duration: '50 mins',
    icon: BookOpen,
    color: 'from-blue-400 to-purple-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50',
    borderColor: 'border-blue-200',
    steps: [
      {
        id: 'intro',
        title: 'Understanding Plot Structure',
        content: 'Plot is the sequence of events that make up your story - it\'s the "what happens" that keeps readers turning pages. Think of plot as the skeleton of your story: without it, everything else falls apart, but with a strong structure, you can build something amazing.\n\nA well-structured plot does several important things:\n• **Creates momentum** - Each event leads naturally to the next\n• **Builds tension** - Problems get more complicated as the story progresses\n• **Provides satisfaction** - Conflicts are resolved in a way that feels earned\n• **Maintains focus** - Every scene serves the main story\n\nPlot is different from just "things happening." Random events don\'t make a plot - there needs to be cause and effect, where each event creates the conditions for the next one. When your character makes a choice, it should lead to consequences that create new problems or opportunities.\n\nThe best plots feel both surprising and inevitable - readers don\'t see exactly what\'s coming, but when it happens, it makes perfect sense.',
        type: 'tutorial'
      },
      {
        id: 'three-act',
        title: 'The Three-Act Structure',
        content: 'The most fundamental plot structure is the three-act format: Setup, Confrontation, and Resolution. This timeless structure works for stories of all lengths because it mirrors how we naturally experience challenges in real life.\n\n**Act 1: Setup (25% of your story)**\n• Introduce your main character in their normal world\n• Show what they want and what\'s stopping them\n• Present the inciting incident that changes everything\n• End with the character committing to face the main challenge\n\n**Act 2: Confrontation (50% of your story)**\n• Your character tries to solve their problem but faces obstacles\n• Complications arise that make things worse\n• The character learns, grows, and adapts their approach\n• Reach the midpoint where everything changes\n• Build to the climax where the main conflict reaches its peak\n\n**Act 3: Resolution (25% of your story)**\n• The final confrontation or climax occurs\n• The main conflict is resolved (for better or worse)\n• Show how the character and their world have changed\n• Tie up loose ends and provide closure\n\nThink of it like climbing a mountain: Act 1 is preparing for the journey, Act 2 is the difficult climb with many obstacles, and Act 3 is reaching the summit and coming back down transformed.',
        type: 'tutorial'
      },
      {
        id: 'plot-points',
        title: 'Essential Plot Points',
        content: 'Within the three-act structure, there are specific plot points that help create a compelling story rhythm. These are like landmarks on your story journey that help both you and your readers stay oriented.\n\n**Key Plot Points:**\n\n**1. Opening Hook (First few pages)**\n• Grab the reader\'s attention immediately\n• Show your character in action or facing a problem\n• Establish the tone and genre of your story\n\n**2. Inciting Incident (End of Act 1)**\n• The event that disrupts your character\'s normal world\n• Forces them to face the main story problem\n• Can\'t be ignored or easily solved\n\n**3. First Plot Point (25% mark)**\n• Character commits to pursuing their goal\n• No turning back - they\'re fully in the story now\n• Often involves leaving the familiar world behind\n\n**4. Midpoint (50% mark)**\n• Major revelation or reversal\n• Changes how the character approaches their goal\n• Raises the stakes significantly\n\n**5. Second Plot Point (75% mark)**\n• The "all is lost" moment\n• Character faces their greatest fear or failure\n• Forces them to find inner strength for the final push\n\n**6. Climax (80-90% mark)**\n• Final confrontation with the main obstacle\n• Character uses everything they\'ve learned\n• The main conflict is decided\n\n**7. Resolution (Final 10%)**\n• Show the new normal after the conflict\n• Demonstrate how the character has changed\n• Provide emotional satisfaction\n\nThese plot points create a rhythm that feels natural and satisfying to readers.',
        type: 'tutorial'
      },
      {
        id: 'plot-your-story',
        title: 'Plot Your Story Using Three Acts',
        content: 'Now it\'s time to take your story concept and organize it into the three-act structure. This exercise will help you see the overall shape of your story and identify any gaps that need to be filled.\n\nFor each act, think about:\n\n**Act 1 Planning:**\n• How will you introduce your main character?\n• What is their normal world like?\n• What inciting incident will disrupt their life?\n• Why can\'t they just ignore the problem?\n• What goal will they commit to pursuing?\n\n**Act 2 Planning:**\n• What obstacles will they face first?\n• How will these obstacles get progressively harder?\n• What will they learn about themselves or their world?\n• What major revelation or setback happens at the midpoint?\n• How will they grow and change through these challenges?\n\n**Act 3 Planning:**\n• What is the final, most difficult challenge?\n• How will they use what they\'ve learned to overcome it?\n• What will victory or defeat look like?\n• How will their world be different at the end?\n• What will they have learned or how will they have grown?\n\nDon\'t worry about getting every detail perfect - focus on the major story beats and how they connect to each other.',
        type: 'exercise',
        aiPrompt: 'I\'m learning about the three-act story structure and need help organizing my story idea into Setup, Confrontation, and Resolution. Can you help me identify the key plot points and make sure each act serves its purpose? I want to create a compelling plot that builds tension and provides satisfying resolution.'
      },
      {
        id: 'cause-and-effect',
        title: 'Creating Cause and Effect',
        content: 'The secret to a compelling plot is making sure every event leads naturally to the next one. This is called "cause and effect" - each scene should be a consequence of what came before and should create the conditions for what comes next.\n\n**How to Create Strong Cause and Effect:**\n\n**1. Character Choices Drive Events**\n• Your character makes a decision\n• That decision has consequences (often unexpected)\n• Those consequences create new problems or opportunities\n• The character must make another choice\n\n**2. Escalating Complications**\n• Each attempt to solve the problem creates new problems\n• The stakes get higher with each complication\n• The character must adapt and try new approaches\n\n**3. The "Yes, But" and "No, And" Technique**\n• When your character succeeds: "Yes, but..." (they get what they want but it creates a new problem)\n• When your character fails: "No, and..." (they don\'t get what they want and things get worse)\n\n**Example Chain:**\n• Character wants to ask someone to the dance\n• They finally get the courage to ask (Yes, but...)\n• The person says yes, but their ex-boyfriend gets jealous (No, and...)\n• The ex-boyfriend spreads rumors about the character, and now their reputation is ruined\n• Character must decide whether to fight back or find another way to handle the situation\n\nEach event flows naturally from the previous one, creating momentum that pulls readers forward.',
        type: 'tutorial'
      },
      {
        id: 'plot-problems',
        title: 'Fix Common Plot Problems',
        content: 'Even experienced writers run into plot problems. Learning to recognize and fix these issues will make your stories much stronger. Here are the most common plot problems and how to solve them:\n\n**Problem 1: Sagging Middle**\n• *Symptoms:* Act 2 feels slow, repetitive, or boring\n• *Solution:* Add a major midpoint reversal that changes everything\n• *Tip:* Make sure each scene either advances the plot or develops character\n\n**Problem 2: Convenient Solutions**\n• *Symptoms:* Problems are solved too easily or by coincidence\n• *Solution:* Make your character work for every victory\n• *Tip:* If you can solve the problem by having someone else show up to help, find a harder way\n\n**Problem 3: Unclear Stakes**\n• *Symptoms:* Readers don\'t care what happens\n• *Solution:* Make it clear what the character will lose if they fail\n• *Tip:* Stakes should be personal, specific, and meaningful to your character\n\n**Problem 4: Passive Protagonist**\n• *Symptoms:* Things happen to your character instead of because of them\n• *Solution:* Give your character agency - let them make choices that drive the plot\n• *Tip:* Ask "What would my character do?" not "What do I need to happen?"\n\n**Problem 5: Rushed Ending**\n• *Symptoms:* The climax feels too easy or happens too quickly\n• *Solution:* Make sure your character has to use everything they\'ve learned\n• *Tip:* The final challenge should test both their skills and their character growth\n\nIdentify which of these problems might affect your story and brainstorm solutions.',
        type: 'exercise',
        aiPrompt: 'I\'m working on plotting my story and want to avoid common plot problems like sagging middles, convenient solutions, or passive protagonists. Can you help me analyze my plot structure and identify potential issues? I want to make sure my story maintains momentum and that my character drives the action through their choices.'
      },
      {
        id: 'plot-outline',
        title: 'Create Your Plot Outline',
        content: 'Now that you understand plot structure, it\'s time to create a detailed outline for your story. This outline will serve as your roadmap, helping you stay on track while still allowing room for creativity and discovery.\n\n**Your Plot Outline Should Include:**\n\n**Opening (First 10%)**\n• Hook that grabs attention\n• Character introduction in their normal world\n• Hint at the coming conflict\n\n**Inciting Incident (10-15%)**\n• The event that changes everything\n• Character\'s initial reaction\n• Why they can\'t ignore it\n\n**Rising Action (15-50%)**\n• Character\'s first attempts to solve the problem\n• Obstacles and complications\n• Character growth and learning\n\n**Midpoint (50%)**\n• Major revelation or reversal\n• Stakes are raised\n• New approach needed\n\n**Complications (50-75%)**\n• Bigger obstacles\n• Character\'s greatest fears realized\n• Preparation for final confrontation\n\n**Climax (75-85%)**\n• Final confrontation\n• Character uses all they\'ve learned\n• Main conflict resolved\n\n**Resolution (85-100%)**\n• New normal established\n• Character growth demonstrated\n• Emotional satisfaction provided\n\nFor each section, write 2-3 sentences describing what happens. Focus on the major story beats rather than every detail - you\'ll discover the specifics as you write!',
        type: 'prompt',
        aiPrompt: 'I want to create a detailed plot outline for my story using the three-act structure and key plot points. Can you help me organize my story events into a clear roadmap that maintains good pacing, strong cause-and-effect relationships, and compelling character development? I want an outline that guides me while still leaving room for creative discovery.'
      }
    ]
  },
  'characters': {
    id: 'characters',
    title: 'Creating Characters',
    description: 'Build memorable, three-dimensional characters that readers will love and remember.',
    level: 'Intermediate',
    duration: '60 mins',
    icon: Users,
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
    borderColor: 'border-green-200',
    steps: [
      {
        id: 'intro',
        title: 'Character Development Fundamentals',
        content: 'Great characters are the heart of great stories. They\'re what readers remember long after they\'ve forgotten the plot details. Think about your favorite books - chances are, you remember the characters more vividly than the specific events.\n\nWhat makes a character memorable and compelling?\n\n**1. They Feel Real**\n• Have believable motivations and reactions\n• Make mistakes and have flaws like real people\n• Have unique voices and ways of thinking\n• Show growth and change throughout the story\n\n**2. They Drive the Story**\n• Make choices that create consequences\n• Have goals that conflict with obstacles\n• Take action rather than just reacting to events\n• Face internal struggles that mirror external conflicts\n\n**3. They Connect with Readers**\n• Have relatable emotions and experiences\n• Face universal human challenges\n• Show vulnerability and strength\n• Surprise us while staying true to their nature\n\nRemember: Characters aren\'t just people in your story - they ARE your story. Everything else (plot, setting, theme) exists to reveal who your characters truly are and how they grow.',
        type: 'tutorial'
      },
      {
        id: 'character-motivation',
        title: 'Understanding Character Motivation',
        content: 'What drives your character? Understanding their deepest desires, fears, and goals is crucial for creating believable characters. Motivation is the engine that powers every choice your character makes.\n\n**The Three Layers of Motivation:**\n\n**1. Surface Want (What they think they want)**\n• The obvious, external goal\n• What they tell other people\n• Often related to plot events\n• Example: "I want to win the competition"\n\n**2. Deep Need (What they actually need)**\n• The internal, emotional requirement for growth\n• Often hidden from the character themselves\n• Related to character development\n• Example: "I need to learn to trust others"\n\n**3. Fear (What they\'re trying to avoid)**\n• The thing that terrifies them most\n• Often the opposite of their need\n• Creates internal conflict\n• Example: "I\'m afraid of being vulnerable"\n\n**The Magic Formula:**\nThe best characters want one thing, need something else, and fear the very thing that would help them grow. This creates natural internal conflict that drives compelling character arcs.\n\n**Example:**\n• Want: To be the best student in school\n• Need: To learn that friendship is more important than grades\n• Fear: Being seen as ordinary or not special\n\nThis setup creates built-in tension and opportunities for growth throughout your story.',
        type: 'tutorial'
      },
      {
        id: 'character-flaws',
        title: 'Creating Character Flaws',
        content: 'Perfect characters are boring because they have nowhere to grow. Flaws make characters human, relatable, and give them room for development. But not all flaws are created equal - the best flaws are directly connected to your story\'s themes and conflicts.\n\n**Types of Character Flaws:**\n\n**1. Fatal Flaws (Major)**\n• Could destroy the character if not overcome\n• Directly related to the main conflict\n• Examples: Pride, fear of commitment, inability to trust\n\n**2. Personality Flaws (Moderate)**\n• Make the character difficult or annoying sometimes\n• Create smaller conflicts and complications\n• Examples: Impatience, stubbornness, sarcasm\n\n**3. Quirks (Minor)**\n• Make the character unique and memorable\n• Usually harmless but distinctive\n• Examples: Always late, talks to plants, collects weird things\n\n**How to Choose the Right Flaw:**\n\n• **Connect to Theme:** If your story is about forgiveness, give your character a flaw related to holding grudges\n• **Create Conflict:** The flaw should make their goal harder to achieve\n• **Allow Growth:** The character should be able to overcome or manage the flaw by the end\n• **Make it Believable:** The flaw should fit the character\'s background and personality\n\n**The Flaw-Growth Connection:**\nYour character\'s greatest strength often comes from overcoming their greatest weakness. A coward can become brave, a liar can learn honesty, a loner can discover the value of friendship.',
        type: 'tutorial'
      },
      {
        id: 'character-arc',
        title: 'Character Arcs: The Journey of Change',
        content: 'Characters should change throughout your story. A character arc shows how your protagonist grows and evolves from beginning to end. This internal journey is often more important than the external plot.\n\n**The Three-Part Character Arc:**\n\n**1. Starting Point (Who they are)**\n• Show the character\'s current state\n• Reveal their flaw or limitation\n• Establish their worldview and beliefs\n• Demonstrate how their flaw affects their life\n\n**2. The Journey (How they change)**\n• Present challenges that test their beliefs\n• Force them to confront their flaw\n• Show them trying and failing with old methods\n• Gradually reveal new ways of thinking or being\n\n**3. Transformation (Who they become)**\n• Character overcomes their flaw or learns to manage it\n• Demonstrates new understanding or ability\n• Shows how they\'ve grown from the experience\n• Proves the change through action, not just words\n\n**Types of Character Arcs:**\n\n**Positive Arc:** Character overcomes their flaw and grows (most common)\n**Negative Arc:** Character is consumed by their flaw and falls\n**Flat Arc:** Character doesn\'t change but helps others change around them\n\n**Arc Planning Questions:**\n• What limiting belief does your character start with?\n• What experiences will challenge this belief?\n• What will finally convince them to change?\n• How will they demonstrate their growth?\n• What will they be capable of at the end that they couldn\'t do at the beginning?\n\nRemember: The external plot should force the internal change. Every obstacle should test not just their skills, but their character.',
        type: 'tutorial'
      },
      {
        id: 'create-character',
        title: 'Create Your Main Character',
        content: 'Now it\'s time to design your protagonist with depth and complexity. Use everything you\'ve learned about motivation, flaws, and character arcs to create a character that feels real and compelling.\n\n**Character Development Worksheet:**\n\n**Basic Information:**\n• Name, age, occupation\n• Physical appearance (focus on distinctive features)\n• Background and family situation\n• Current living situation\n\n**Motivation Triangle:**\n• What do they WANT? (surface goal)\n• What do they NEED? (deep emotional requirement)\n• What do they FEAR? (what they\'re trying to avoid)\n\n**Personality:**\n• Greatest strength\n• Fatal flaw (connected to story theme)\n• Personality quirks that make them unique\n• How they talk (speech patterns, favorite phrases)\n• How they react under pressure\n\n**Relationships:**\n• Who do they care about most?\n• Who challenges them?\n• Who do they conflict with and why?\n• What do they need from others?\n\n**Character Arc Planning:**\n• How do they start the story?\n• What belief or limitation holds them back?\n• What will force them to change?\n• How will they be different at the end?\n\n**The Character Test:**\nOnce you\'ve developed your character, ask: "If I put this character in a room with strangers, would they act differently from any other character I\'ve created?" If the answer is no, dig deeper into what makes them unique.',
        type: 'exercise',
        aiPrompt: 'I\'m creating a main character for my story and want to develop them with depth and complexity. Can you help me work through their motivations (want vs. need vs. fear), meaningful flaws, and a compelling character arc? I want to make sure they feel real, relatable, and drive the story forward through their choices and growth.'
      },
      {
        id: 'supporting-characters',
        title: 'Building Supporting Characters',
        content: 'Supporting characters help your protagonist grow and add depth to your story world. Each supporting character should serve a specific purpose in your narrative and feel like a real person with their own goals and motivations.\n\n**Types of Supporting Characters:**\n\n**1. The Mentor**\n• Guides and teaches the protagonist\n• Has wisdom or skills the protagonist needs\n• May have their own flaws or limitations\n• Example: Dumbledore, Mr. Miyagi, Gandalf\n\n**2. The Ally**\n• Supports the protagonist\'s journey\n• Often provides friendship, loyalty, or assistance\n• May have complementary skills\n• Example: Hermione and Ron, Samwise Gamgee\n\n**3. The Antagonist**\n• Opposes the protagonist\'s goal\n• Should have understandable (even sympathetic) motivations\n• Often represents what the protagonist could become\n• Example: Darth Vader, Voldemort, The Joker\n\n**4. The Foil**\n• Contrasts with the protagonist to highlight their qualities\n• Often makes opposite choices in similar situations\n• Helps readers understand the protagonist better\n• Example: Draco Malfoy to Harry Potter\n\n**5. The Love Interest**\n• Provides emotional stakes and growth opportunities\n• Should be a complete character, not just a prize\n• Often challenges the protagonist to be better\n• Example: Elizabeth Bennet, Katniss Everdeen\n\n**Creating Memorable Supporting Characters:**\n• Give them their own goals and motivations\n• Make sure they have distinct voices and personalities\n• Show how they change or are affected by the story\n• Avoid making them exist only to serve the protagonist\n• Give them at least one memorable trait or quirk\n\nEach supporting character should feel like the hero of their own story, even if we only see a small part of it.',
        type: 'tutorial'
      },
      {
        id: 'character-relationships',
        title: 'Design Character Relationships',
        content: 'Characters don\'t exist in isolation - they\'re defined by their relationships with others. Strong character relationships create conflict, drive plot, and reveal character depth. Design relationships that serve your story and feel authentic.\n\n**Relationship Dynamics to Consider:**\n\n**Power Dynamics:**\n• Who has authority over whom?\n• How do characters challenge or submit to power?\n• What happens when power shifts?\n\n**Emotional Connections:**\n• Who does your protagonist trust?\n• Who challenges their beliefs?\n• Who brings out their best or worst qualities?\n\n**Conflicting Goals:**\n• Which characters want different things?\n• How do their goals create tension?\n• When do they have to choose between relationships and goals?\n\n**History and Backstory:**\n• What shared experiences shaped these relationships?\n• What secrets or unresolved issues exist?\n• How do past events affect current interactions?\n\n**Character Relationship Exercise:**\nFor your main character, create:\n1. Someone who believes in them when they don\'t believe in themselves\n2. Someone who challenges their worldview\n3. Someone who represents their greatest fear\n4. Someone who shows them what they could become (positive or negative)\n5. Someone who needs their help or protection\n\nEach relationship should test different aspects of your character and provide opportunities for growth, conflict, and revelation.',
        type: 'exercise',
        aiPrompt: 'I need to create supporting characters and design meaningful relationships for my story. Can you help me develop characters that serve specific narrative purposes while feeling like real people with their own goals? I want to create relationships that generate conflict, drive character growth, and feel authentic.'
      },
      {
        id: 'character-voice',
        title: 'Developing Character Voice',
        content: 'Every character should have a unique voice - a distinctive way of speaking and thinking that makes them instantly recognizable. Character voice goes beyond dialogue; it includes how they see the world, what they notice, and how they express themselves.\n\n**Elements of Character Voice:**\n\n**1. Vocabulary and Word Choice**\n• Formal vs. casual language\n• Technical jargon vs. simple words\n• Regional dialects or accents\n• Generational differences in speech\n\n**2. Sentence Structure**\n• Short, choppy sentences vs. long, flowing ones\n• Complete thoughts vs. fragments\n• Questions vs. statements\n• Active vs. passive voice\n\n**3. Emotional Expression**\n• How they show anger, joy, fear, sadness\n• Whether they\'re direct or indirect\n• How much they reveal vs. hide\n• Their sense of humor (or lack thereof)\n\n**4. Worldview and Perspective**\n• What they notice first in any situation\n• How they interpret events\n• What they value most\n• Their biases and blind spots\n\n**5. Speech Patterns and Habits**\n• Favorite phrases or expressions\n• How they avoid difficult topics\n• Whether they interrupt or wait their turn\n• How they react under pressure\n\n**Voice Development Exercise:**\nWrite the same scene (like ordering coffee) from three different characters\' perspectives. Notice how their personalities, backgrounds, and current emotional states affect:\n• What details they notice\n• How they interact with the barista\n• What they\'re thinking about while waiting\n• How they express their preferences\n\nEach version should feel completely different, even though the basic situation is the same.',
        type: 'prompt',
        aiPrompt: 'I want to develop distinct voices for my characters so they feel unique and recognizable. Can you help me understand how to create different speech patterns, vocabulary choices, and perspectives that reflect each character\'s personality, background, and worldview? I want readers to be able to identify who\'s speaking even without dialogue tags.'
      }
    ]
  },
  'conflict': {
    id: 'conflict',
    title: 'Conflict',
    description: 'Discover how to create meaningful conflicts that drive your story forward.',
    level: 'Intermediate',
    duration: '50 mins',
    icon: Zap,
    color: 'from-red-400 to-pink-500',
    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
    borderColor: 'border-red-200',
    steps: [
      {
        id: 'intro',
        title: 'Understanding Conflict',
        content: 'Conflict is the engine of your story. Without conflict, there\'s no story - just a series of events. Conflict creates tension, drives character development, and keeps readers engaged from beginning to end.\n\nThink of conflict as the friction that creates fire. When your character\'s desires meet obstacles, that friction generates the energy that powers your narrative. The stronger the desire and the bigger the obstacle, the more compelling your story becomes.\n\n**Why Conflict Matters:**\n• **Creates Stakes:** Gives readers a reason to care about the outcome\n• **Reveals Character:** Shows who your character really is under pressure\n• **Drives Plot:** Forces characters to make choices that advance the story\n• **Generates Emotion:** Makes readers feel tension, excitement, and satisfaction\n• **Enables Growth:** Challenges characters to change and develop\n\n**The Conflict Equation:**\nDesire + Obstacle = Conflict\nThe stronger each element, the more compelling your story becomes.\n\n**Types of Conflict:**\n• **Internal:** The battle within the character\'s mind and heart\n• **Interpersonal:** Conflicts between characters\n• **Societal:** Character vs. society, culture, or institutions\n• **Environmental:** Character vs. nature, technology, or circumstances\n• **Supernatural:** Character vs. fate, gods, or otherworldly forces\n\nThe best stories layer multiple types of conflict, with internal and external conflicts reflecting and amplifying each other.',
        type: 'tutorial'
      },
      {
        id: 'internal-conflict',
        title: 'Internal Conflict: The Battle Within',
        content: 'Internal conflict is the battle within your character\'s mind and heart. It\'s often more important than external conflict because it creates emotional depth and makes readers truly care about your character.\n\n**Types of Internal Conflict:**\n\n**1. Moral Dilemmas**\n• Choosing between right and wrong\n• Conflicting values or principles\n• Example: Should I tell the truth if it hurts someone I love?\n\n**2. Emotional Struggles**\n• Fear vs. courage\n• Love vs. duty\n• Hope vs. despair\n• Example: Wanting to trust someone but being afraid of betrayal\n\n**3. Identity Conflicts**\n• Who am I vs. who others expect me to be\n• Past self vs. desired future self\n• Example: A former criminal trying to live an honest life\n\n**4. Desire vs. Need**\n• What the character wants vs. what they actually need\n• Short-term pleasure vs. long-term good\n• Example: Wanting revenge but needing forgiveness\n\n**Creating Powerful Internal Conflict:**\n\n• **Make it Personal:** Connect to the character\'s deepest fears and desires\n• **Create Impossible Choices:** Force them to choose between two things they value\n• **Use the Character\'s Past:** Let old wounds and experiences create current struggles\n• **Mirror External Conflict:** Make the internal struggle reflect the external obstacles\n• **Show Physical Manifestations:** Internal conflict should affect how characters act, speak, and move\n\n**Internal Conflict in Action:**\nDon\'t just tell us about the conflict - show it through:\n• Contradictory actions\n• Hesitation at crucial moments\n• Physical tension or nervous habits\n• Internal dialogue or thoughts\n• Reactions that surprise even the character',
        type: 'tutorial'
      },
      {
        id: 'external-conflict',
        title: 'External Conflict: Obstacles in the World',
        content: 'External conflict consists of the obstacles and challenges your character faces in the outside world. While internal conflict creates emotional depth, external conflict drives the plot forward and gives your story momentum.\n\n**Types of External Conflict:**\n\n**1. Person vs. Person (Interpersonal)**\n• Antagonist with opposing goals\n• Family conflicts and relationship struggles\n• Competition or rivalry\n• Example: Hero vs. villain, siblings fighting over inheritance\n\n**2. Person vs. Society**\n• Fighting against social norms or injustice\n• Challenging institutions or systems\n• Cultural or generational conflicts\n• Example: Standing up to discrimination, rebelling against tradition\n\n**3. Person vs. Nature**\n• Natural disasters or harsh environments\n• Survival situations\n• Animals or environmental threats\n• Example: Surviving a storm, escaping a wild animal\n\n**4. Person vs. Technology**\n• Machines or systems that threaten humanity\n• Dependence on technology gone wrong\n• AI or robotic conflicts\n• Example: Fighting against an AI takeover, dealing with technology addiction\n\n**5. Person vs. Fate/Supernatural**\n• Destiny or prophecy\n• Gods, magic, or otherworldly forces\n• Curses or supernatural threats\n• Example: Fighting against a predetermined fate, battling magical creatures\n\n**Creating Effective External Conflict:**\n\n• **Make it Personal:** The obstacle should threaten something the character cares about\n• **Escalate Gradually:** Start small and build to bigger challenges\n• **Create Multiple Layers:** Combine different types of external conflict\n• **Connect to Internal Conflict:** External obstacles should force internal growth\n• **Make it Active:** The character should be able to take action against the obstacle\n\n**The Best External Conflicts:**\n• Force the character to make difficult choices\n• Reveal character traits under pressure\n• Create opportunities for growth and change\n• Feel both surprising and inevitable\n• Have clear consequences for success or failure',
        type: 'tutorial'
      },
      {
        id: 'conflict-layers',
        title: 'Layering Multiple Conflicts',
        content: 'The most compelling stories don\'t rely on just one type of conflict. They layer multiple conflicts that interact with and amplify each other, creating a rich, complex narrative that keeps readers engaged on multiple levels.\n\n**How to Layer Conflicts Effectively:**\n\n**1. Start with Internal Conflict**\n• Identify your character\'s core internal struggle\n• This becomes the emotional heart of your story\n• Example: A character struggling with self-doubt\n\n**2. Create Reflecting External Conflicts**\n• Design external obstacles that force the character to confront their internal conflict\n• The external conflict should make the internal conflict worse\n• Example: The self-doubting character must lead a team through a crisis\n\n**3. Add Interpersonal Conflicts**\n• Create relationships that challenge the character\n• Some people should make the conflict worse, others should offer growth opportunities\n• Example: A mentor who believes in them vs. a rival who confirms their doubts\n\n**4. Include Societal or Environmental Pressures**\n• Add broader conflicts that affect everyone in your story world\n• These create urgency and raise the stakes\n• Example: A deadline, natural disaster, or social upheaval\n\n**Conflict Interaction Examples:**\n\n**Internal:** Fear of commitment\n**External:** Must work closely with someone they\'re attracted to\n**Interpersonal:** That person is also afraid of relationships\n**Societal:** They\'re in a profession where personal relationships are discouraged\n**Environmental:** They\'re trapped together in a dangerous situation\n\nEach layer makes the others more complicated and interesting. The character can\'t solve one conflict without addressing the others.',
        type: 'tutorial'
      },
      {
        id: 'create-conflict',
        title: 'Design Your Story\'s Conflict',
        content: 'Now it\'s time to identify and design the main conflicts in your story. Remember, the best conflicts are personal, escalating, and interconnected. Use this exercise to map out the different layers of conflict your character will face.\n\n**Conflict Design Worksheet:**\n\n**1. Core Internal Conflict**\n• What is your character\'s biggest internal struggle?\n• What fear, doubt, or flaw holds them back?\n• How does this conflict affect their daily life?\n• What would they have to overcome to grow as a person?\n\n**2. Primary External Conflict**\n• What is the main obstacle preventing your character from achieving their goal?\n• Who or what is actively working against them?\n• Why can\'t they simply avoid or ignore this conflict?\n• What will happen if they fail to overcome this obstacle?\n\n**3. Secondary Conflicts**\n• What interpersonal conflicts complicate their journey?\n• What societal or environmental pressures add urgency?\n• How do these smaller conflicts connect to the main conflict?\n• Which conflicts will be resolved early vs. late in the story?\n\n**4. Conflict Connections**\n• How does the external conflict force the character to face their internal conflict?\n• Which relationships make their struggles harder or easier?\n• How do the different conflicts escalate and interact with each other?\n• What must the character learn or overcome internally to succeed externally?\n\n**Conflict Testing Questions:**\n• Does this conflict matter deeply to your character?\n• Will overcoming it require real growth and change?\n• Can the conflict get worse before it gets better?\n• Are there multiple ways the character could try to solve it?\n• Will readers care about the outcome?',
        type: 'exercise',
        aiPrompt: 'I\'m working on creating meaningful, layered conflicts for my story. Can you help me develop both internal and external conflicts that interconnect and amplify each other? I want to create conflicts that will challenge my character, drive plot forward, and force real growth and change.'
      },
      {
        id: 'escalating-conflict',
        title: 'Escalating Tension Throughout Your Story',
        content: 'Learning how to build and escalate conflict throughout your story is crucial for keeping readers engaged and creating a satisfying climax. Conflict should start small and grow progressively more challenging, both externally and internally.\n\n**The Escalation Pattern:**\n\n**1. Introduction (10-15%)**\n• Hint at the coming conflict\n• Show the character\'s normal way of handling problems\n• Establish what they have to lose\n\n**2. First Challenge (15-25%)**\n• Present the initial conflict\n• Character tries their usual approach\n• It works partially but creates new problems\n\n**3. Complications (25-50%)**\n• Obstacles become more difficult\n• Character\'s attempts make things worse\n• Stakes are raised\n• Internal conflict intensifies\n\n**4. Midpoint Crisis (50%)**\n• Major setback or revelation\n• Character realizes their approach isn\'t working\n• Must find a new way forward\n• Stakes are raised again\n\n**5. Mounting Pressure (50-75%)**\n• Conflicts converge and amplify each other\n• Character is pushed to their limits\n• Time pressure increases\n• Support systems may fail\n\n**6. Crisis Point (75-85%)**\n• Character faces their greatest fear\n• All conflicts reach maximum intensity\n• Character must choose between old and new ways\n• Everything seems lost\n\n**7. Resolution (85-100%)**\n• Character applies what they\'ve learned\n• Conflicts are resolved (or accepted)\n• New equilibrium is established\n\n**Escalation Techniques:**\n• **Raise the Stakes:** Make failure more costly\n• **Add Time Pressure:** Create deadlines\n• **Remove Support:** Take away help or resources\n• **Multiply Problems:** Let one conflict create others\n• **Force Difficult Choices:** Make the character choose between important things\n• **Reveal New Information:** Change the character\'s understanding of the situation',
        type: 'tutorial'
      },
      {
        id: 'conflict-resolution',
        title: 'Resolving Conflicts Satisfyingly',
        content: 'How you resolve your conflicts determines whether readers feel satisfied or disappointed with your story. The best resolutions feel both surprising and inevitable - readers don\'t see them coming, but they make perfect sense in hindsight.\n\n**Principles of Satisfying Conflict Resolution:**\n\n**1. Earn the Victory**\n• Character must use skills, knowledge, or growth gained during the story\n• No convenient coincidences or last-minute rescues\n• The solution should come from the character\'s choices and actions\n\n**2. Address Both Internal and External Conflicts**\n• External victory without internal growth feels hollow\n• Internal growth without external consequences feels incomplete\n• The best resolutions solve both simultaneously\n\n**3. Make the Character Pay a Price**\n• Victory should cost something meaningful\n• Character may have to sacrifice something they value\n• This makes the resolution feel earned and realistic\n\n**4. Show the Change**\n• Demonstrate how the character has grown\n• They should be capable of something at the end they couldn\'t do at the beginning\n• The change should be evident in their actions, not just stated\n\n**Types of Conflict Resolution:**\n\n**Complete Victory:** Character overcomes all obstacles and achieves their goal\n**Pyrrhic Victory:** Character wins but at great cost\n**Compromise:** Character gets some of what they want but not everything\n**Noble Defeat:** Character fails but grows and learns important lessons\n**Tragic Fall:** Character is defeated by their own flaws\n\n**Resolution Planning Questions:**\n• What has your character learned that they can apply to the final conflict?\n• How can they demonstrate their internal growth through external action?\n• What price should they pay for victory?\n• How will their world be different after the conflict is resolved?\n• What loose ends need to be tied up?\n\nRemember: The goal isn\'t always for the character to get what they want, but for them to get what they need to grow.',
        type: 'prompt',
        aiPrompt: 'I want to understand how to escalate conflict throughout my story and resolve it satisfyingly. Can you help me plan how tensions can build progressively and create a resolution that feels both surprising and inevitable? I want to make sure my character earns their victory through growth and that both internal and external conflicts are addressed.'
      }
    ]
  },
  'structure': {
    id: 'structure',
    title: 'Story Structure',
    description: 'Learn the fundamental frameworks that make stories satisfying and complete.',
    level: 'Intermediate',
    duration: '70 mins',
    icon: Building,
    color: 'from-indigo-400 to-blue-500',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200',
    steps: [
      {
        id: 'intro',
        title: 'Why Structure Matters',
        content: 'Story structure provides the skeleton that holds your narrative together. Just like a house needs a strong foundation and framework, your story needs structure to support all the other elements - characters, plot, theme, and style.\n\n**Why Structure is Essential:**\n\n• **Creates Reader Expectations:** Readers unconsciously expect certain story rhythms\n• **Provides Emotional Satisfaction:** Well-structured stories feel complete and fulfilling\n• **Helps Writers Stay Focused:** Structure prevents wandering plots and maintains momentum\n• **Enables Effective Pacing:** Knowing where you\'re going helps you control the speed\n• **Supports Theme Development:** Structure can reinforce your story\'s deeper meaning\n\n**Structure vs. Formula:**\nStructure is not a rigid formula that makes all stories the same. Think of it like music - all songs have rhythm and melody, but infinite variety is possible within those frameworks. Structure provides the underlying pattern that allows creativity to flourish.\n\n**The Universal Story Pattern:**\nMost satisfying stories follow this basic pattern:\n1. **Stability:** Show the normal world\n2. **Disruption:** Something changes or goes wrong\n3. **Struggle:** Character tries to restore balance or achieve a goal\n4. **Discovery:** Character learns something important\n5. **New Stability:** A new normal is established\n\nThis pattern appears in everything from fairy tales to blockbuster movies because it mirrors how we experience change and growth in real life. Different story structures are simply different ways of organizing this universal pattern.',
        type: 'tutorial'
      },
      {
        id: 'three-act-deep',
        title: 'Deep Dive: Three-Act Structure',
        content: 'The three-act structure is the foundation of most Western storytelling. Master this structure, and you\'ll understand the rhythm that readers expect and find satisfying.\n\n**Act 1: Setup (25% of your story)**\n\n*Purpose:* Establish the world, character, and central conflict\n\n• **Opening Hook (0-5%):** Grab attention immediately\n• **Ordinary World (5-10%):** Show the character\'s normal life\n• **Inciting Incident (10-15%):** The event that changes everything\n• **Plot Point 1 (20-25%):** Character commits to the journey\n\n*Key Questions Act 1 Must Answer:*\n- Who is the protagonist and what do they want?\n- What world do they live in?\n- What problem disrupts their world?\n- Why can\'t they ignore this problem?\n\n**Act 2: Confrontation (50% of your story)**\n\n*Purpose:* Develop conflict and character through escalating challenges\n\n• **First Half (25-50%):** Character tries to solve the problem\n• **Midpoint (50%):** Major revelation or reversal\n• **Second Half (50-75%):** Complications intensify\n• **Plot Point 2 (75%):** The "all is lost" moment\n\n*Key Elements of Act 2:*\n- Progressive complications that test the character\n- Character growth through struggle and failure\n- Relationships that support or challenge the protagonist\n- Rising stakes that make failure more costly\n\n**Act 3: Resolution (25% of your story)**\n\n*Purpose:* Resolve conflicts and show character transformation\n\n• **Climax (75-85%):** Final confrontation with the main obstacle\n• **Falling Action (85-95%):** Immediate consequences of the climax\n• **Resolution (95-100%):** New normal and character growth demonstrated\n\n*Act 3 Must Accomplish:*\n- Resolve the main conflict satisfyingly\n- Show how the character has changed\n- Tie up important loose ends\n- Provide emotional closure\n\n**Pacing Tips:**\n- Act 1: Establish quickly but thoroughly\n- Act 2: Build steadily with a major midpoint shift\n- Act 3: Move swiftly to a powerful conclusion',
        type: 'tutorial'
      },
      {
        id: 'heros-journey',
        title: 'The Hero\'s Journey',
        content: 'Joseph Campbell\'s Hero\'s Journey (also called the monomyth) is a powerful story structure found in myths and stories across all cultures. It\'s been used in countless successful stories from Star Wars to Harry Potter to The Lion King.\n\n**The 12 Stages of the Hero\'s Journey:**\n\n**1. Ordinary World**\n• Hero\'s normal life before transformation\n• Establishes what they have to lose\n• Shows their current limitations\n\n**2. Call to Adventure**\n• The inciting incident that disrupts normal life\n• Presents the central challenge or quest\n• Often involves helping others or discovering truth\n\n**3. Refusal of the Call**\n• Hero hesitates or refuses the challenge\n• Shows the magnitude of what they\'re facing\n• Demonstrates their current fears or limitations\n\n**4. Meeting the Mentor**\n• Wise figure provides advice, magical aid, or training\n• Gives hero confidence to begin the journey\n• Often provides tools or knowledge needed later\n\n**5. Crossing the Threshold**\n• Hero commits to the adventure\n• Leaves the familiar world behind\n• Point of no return\n\n**6. Tests, Allies, and Enemies**\n• Hero faces challenges in the new world\n• Discovers who can be trusted\n• Learns the rules of this new environment\n\n**7. Approach to the Inmost Cave**\n• Preparation for the major challenge\n• Hero gathers resources and allies\n• Final planning before the ordeal\n\n**8. The Ordeal**\n• The crisis point of the journey\n• Hero faces their greatest fear\n• Appears to fail or die (literally or metaphorically)\n\n**9. Reward (Seizing the Sword)**\n• Hero survives and gains something important\n• Could be an object, knowledge, or experience\n• Moment of triumph, but journey isn\'t over\n\n**10. The Road Back**\n• Hero begins journey back to ordinary world\n• Often pursued by forces from the special world\n• Must commit to completing the transformation\n\n**11. Resurrection**\n• Final test where hero must use everything learned\n• Death and rebirth (literal or symbolic)\n• Hero emerges transformed\n\n**12. Return with the Elixir**\n• Hero returns home changed\n• Brings something to benefit the ordinary world\n• Completes the circle of transformation\n\n**When to Use the Hero\'s Journey:**\n- Stories about personal growth and transformation\n- Adventure and fantasy narratives\n- Coming-of-age stories\n- Stories where the protagonist must save others\n\nNot every story needs all 12 stages, but the pattern of departure, initiation, and return is powerful and universal.',
        type: 'tutorial'
      },
      {
        id: 'story-beats',
        title: 'Essential Story Beats',
        content: 'Story beats are the key moments that every compelling narrative needs, regardless of which overall structure you choose. Think of them as the essential ingredients that make readers feel satisfied.\n\n**The 15 Essential Story Beats:**\n\n**Opening Image (0-1%)**\n• First impression that sets tone and theme\n• Often contrasts with the closing image\n• Should intrigue and engage immediately\n\n**Theme Stated (5%)**\n• The story\'s central question or lesson\n• Often spoken by a character other than the protagonist\n• May not be understood until the end\n\n**Setup (1-10%)**\n• Introduce protagonist in their ordinary world\n• Show what\'s missing in their life\n• Establish the stakes\n\n**Catalyst/Inciting Incident (12%)**\n• Life-changing event that starts the story\n• Disrupts the protagonist\'s world\n• Creates the central problem\n\n**Debate (12-25%)**\n• Protagonist weighs their options\n• Shows the difficulty of the choice\n• Builds tension before commitment\n\n**Break into Two (25%)**\n• Protagonist makes the decision to act\n• Enters the new world or situation\n• Point of no return\n\n**B Story (30%)**\n• Secondary plot line, often romantic\n• Provides character development\n• Usually involves relationships\n\n**Fun and Games (30-50%)**\n• Promise of the premise delivered\n• What the audience came to see\n• Lighter moments before things get serious\n\n**Midpoint (50%)**\n• Major shift in the story\n• False victory or false defeat\n• Stakes are raised significantly\n\n**Bad Guys Close In (50-75%)**\n• Forces of opposition regroup\n• Internal and external pressure mounts\n• Team may fall apart\n\n**All Is Lost (75%)**\n• Lowest point for the protagonist\n• Opposite of what they wanted\n• Often involves a sacrifice\n\n**Dark Night of the Soul (75-85%)**\n• Protagonist processes the loss\n• Moment of reflection and growth\n• Discovers what they need to do\n\n**Break into Three (85%)**\n• Protagonist chooses to act\n• Uses lessons learned throughout story\n• Final push toward resolution\n\n**Finale (85-99%)**\n• Final confrontation\n• Protagonist proves they\'ve changed\n• All storylines converge\n\n**Final Image (99-100%)**\n• Opposite of opening image\n• Shows how much has changed\n• Provides closure and satisfaction\n\n**Using Story Beats:**\nNot every story needs every beat, but most successful stories hit the major ones. Use these as checkpoints to ensure your story maintains proper pacing and emotional rhythm.',
        type: 'tutorial'
      },
      {
        id: 'choose-structure',
        title: 'Choose Your Story Structure',
        content: 'Different types of stories work better with different structures. Your choice should depend on your story\'s genre, theme, and the kind of journey your protagonist takes.\n\n**Matching Structure to Story Type:**\n\n**Three-Act Structure - Best for:**\n• Most contemporary fiction\n• Stories focused on external goals\n• Clear problem-solution narratives\n• Straightforward character arcs\n\n**Hero\'s Journey - Best for:**\n• Adventure and fantasy stories\n• Coming-of-age narratives\n• Stories about personal transformation\n• Myths and legends\n\n**Seven-Point Structure - Best for:**\n• Character-driven stories\n• Complex narratives with multiple plot lines\n• Stories where the ending mirrors the beginning\n• Literary fiction\n\n**Five-Act Structure - Best for:**\n• Longer works (novels, series)\n• Complex plots with multiple turning points\n• Stories with ensemble casts\n• Historical or epic narratives\n\n**Structure Selection Questions:**\n\n1. **What\'s your story\'s primary focus?**\n   - External adventure → Hero\'s Journey\n   - Internal growth → Character-driven structure\n   - Problem-solving → Three-Act Structure\n\n2. **How does your protagonist change?**\n   - Dramatic transformation → Hero\'s Journey\n   - Gradual growth → Three-Act Structure\n   - Complex evolution → Seven-Point Structure\n\n3. **What\'s your story\'s scope?**\n   - Personal story → Three-Act Structure\n   - Epic adventure → Hero\'s Journey\n   - Multiple storylines → Five-Act Structure\n\n4. **What genre are you writing?**\n   - Fantasy/Adventure → Hero\'s Journey\n   - Contemporary Fiction → Three-Act Structure\n   - Literary Fiction → Seven-Point Structure\n\n**Structure Adaptation Exercise:**\nTake your story concept and try outlining it using two different structures. Notice how each structure emphasizes different aspects of your story. Choose the one that feels most natural and serves your story\'s needs best.\n\nRemember: Structure should serve your story, not constrain it. Feel free to adapt and modify any structure to fit your unique narrative.',
        type: 'exercise',
        aiPrompt: 'I need to choose and apply a story structure to my narrative. Can you help me determine which structure (three-act, hero\'s journey, seven-point, etc.) would work best for my specific story type and help me outline it? I want to make sure the structure serves my story\'s themes and character development.'
      },
      {
        id: 'structure-flexibility',
        title: 'When and How to Break the Rules',
        content: 'Understanding when and how to deviate from traditional structures is an advanced skill that can make your story stand out. But remember: you need to know the rules before you can break them effectively.\n\n**Why Writers Break Structure:**\n• To create surprise and originality\n• To match the story\'s theme or mood\n• To reflect the protagonist\'s mental state\n• To challenge reader expectations\n• To serve the story\'s unique needs\n\n**Safe Ways to Modify Structure:**\n\n**1. Adjust the Timing**\n• Start with action (in medias res)\n• Delay the inciting incident for character development\n• Extend or compress different acts\n• Move the climax earlier or later\n\n**2. Play with Order**\n• Use flashbacks or flash-forwards\n• Tell the story in reverse\n• Use parallel timelines\n• Start at the end and work backward\n\n**3. Multiple Perspectives**\n• Alternate between different characters\n• Show the same events from different viewpoints\n• Use ensemble storytelling\n• Shift perspective at key moments\n\n**4. Nested Structures**\n• Story within a story\n• Multiple plot lines with different structures\n• Episodic structure with overarching arc\n• Circular structure that returns to the beginning\n\n**Dangerous Structure Breaks:**\n\n**Avoid These Unless You\'re Very Experienced:**\n• Eliminating conflict entirely\n• Having no character growth\n• Providing no resolution\n• Making events completely random\n• Ignoring cause and effect\n\n**Guidelines for Breaking Structure:**\n\n1. **Have a Good Reason:** Don\'t break structure just to be different\n2. **Maintain Emotional Logic:** Even if events are non-linear, emotions should make sense\n3. **Keep Reader Oriented:** Don\'t confuse readers unnecessarily\n4. **Preserve Satisfaction:** Readers still need emotional payoff\n5. **Test with Readers:** Get feedback to ensure your experiment works\n\n**Examples of Successful Structure Breaking:**\n• **Memento:** Reverse chronology serves the theme of memory loss\n• **Pulp Fiction:** Non-linear structure reflects the chaotic world\n• **The Princess Bride:** Story-within-story structure adds layers of meaning\n• **Groundhog Day:** Repetitive structure mirrors the protagonist\'s situation\n\nThe key is that the structural choice should enhance your story\'s meaning, not just show off your creativity.',
        type: 'tutorial'
      },
      {
        id: 'structure-outline',
        title: 'Create Your Structural Outline',
        content: 'Now it\'s time to create a detailed structural outline for your story using the framework you\'ve chosen. This outline will serve as your roadmap, helping you maintain proper pacing and ensure all essential story beats are included.\n\n**Structural Outline Template:**\n\n**Story Information:**\n• Title and genre\n• Target word count\n• Chosen structure and why\n• Central theme or message\n\n**Character Arc Summary:**\n• Who is your protagonist at the beginning?\n• What do they need to learn or overcome?\n• How will they be different at the end?\n• What will force this change?\n\n**Plot Structure Breakdown:**\n\nFor each major section of your chosen structure, include:\n• **Percentage/Page Range:** Where this section falls in your story\n• **Purpose:** What this section needs to accomplish\n• **Key Events:** 2-3 major plot points\n• **Character Development:** How the protagonist grows\n• **Conflict Escalation:** How tension increases\n• **Emotional Beats:** What readers should feel\n\n**Scene-by-Scene Outline:**\n\nFor each planned scene:\n• **Scene Purpose:** Why this scene exists\n• **Conflict:** What obstacle or tension drives the scene\n• **Character Goal:** What the protagonist wants in this scene\n• **Outcome:** How the scene ends and leads to the next\n• **Character Growth:** How this scene develops the protagonist\n\n**Structure Checkpoints:**\n\nReview your outline against these questions:\n• Does each act/section serve its structural purpose?\n• Are the major story beats present and well-placed?\n• Does conflict escalate throughout the story?\n• Is character growth evident in each section?\n• Will readers feel satisfied with the resolution?\n• Does the structure serve your story\'s theme?\n\n**Flexibility Notes:**\nRemember that this outline is a guide, not a prison. As you write, you may discover better ways to tell your story. The outline should support your creativity, not limit it.',
        type: 'prompt',
        aiPrompt: 'I want to create a detailed structural outline for my story using the framework I\'ve chosen. Can you help me organize my plot points, character development, and story beats into a clear roadmap that maintains proper pacing and ensures all essential elements are included? I want an outline that guides me while still allowing for creative discovery during writing.'
      }
    ]
  },
  'inciting-incidents': {
    id: 'inciting-incidents',
    title: 'Inciting Incidents',
    description: 'Master the critical moments that launch your story into motion.',
    level: 'Advanced',
    duration: '45 mins',
    icon: Star,
    color: 'from-purple-400 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    borderColor: 'border-purple-200',
    steps: [
      {
        id: 'intro',
        title: 'What is an Inciting Incident?',
        content: 'The inciting incident is the event that sets your story in motion. It\'s the moment when your character\'s ordinary world is disrupted and they\'re forced into the main conflict of your story. Think of it as the domino that starts the entire chain reaction.\n\n**Key Characteristics of an Inciting Incident:**\n\n• **Disrupts the Status Quo:** Changes the character\'s normal routine or world\n• **Creates Urgency:** Demands immediate attention or response\n• **Cannot be Ignored:** The character must deal with it somehow\n• **Connects to the Main Conflict:** Directly relates to the story\'s central problem\n• **Forces a Choice:** The character must decide how to respond\n\n**What an Inciting Incident is NOT:**\n• Just any dramatic event\n• Background information or setup\n• Something that happened in the past\n• An event that can be easily resolved\n• Unrelated to the main story conflict\n\n**The Inciting Incident\'s Job:**\n\n1. **Hook the Reader:** Create immediate interest and questions\n2. **Launch the Plot:** Set the main story events in motion\n3. **Test the Character:** Force them to make choices that reveal personality\n4. **Establish Stakes:** Show what the character has to gain or lose\n5. **Create Forward Momentum:** Make readers want to know what happens next\n\n**Examples of Strong Inciting Incidents:**\n• Harry Potter receives his Hogwarts letter\n• Katniss\'s sister is chosen for the Hunger Games\n• Dorothy\'s house is swept up by a tornado\n• Luke Skywalker finds Princess Leia\'s message\n• Elizabeth Bennet meets Mr. Darcy at the ball\n\nNotice how each of these events completely changes the protagonist\'s world and forces them into the main story conflict.',
        type: 'tutorial'
      },
      {
        id: 'timing-placement',
        title: 'Perfect Timing and Placement',
        content: 'The timing of your inciting incident is crucial for maintaining reader engagement. Place it too early and readers won\'t care about your character yet. Place it too late and they\'ll lose interest before the story really begins.\n\n**The Goldilocks Zone: 10-15% of Your Story**\n\nFor most stories, the inciting incident should occur within the first 10-15% of your narrative. This gives you enough time to:\n• Establish your character and their normal world\n• Make readers care about what happens to them\n• Set up the stakes and context\n• Create anticipation for change\n\n**Before the Inciting Incident:**\n\n**Show the Ordinary World (5-10%)**\n• Establish your character\'s routine, relationships, and environment\n• Reveal their current goals, fears, and limitations\n• Hint at the coming change without revealing it\n• Make readers invested in the character\'s well-being\n\n**Create Anticipation**\n• Use foreshadowing to suggest something is coming\n• Show small signs that the ordinary world is unstable\n• Build tension through minor conflicts or problems\n• Establish what your character has to lose\n\n**Timing Variations by Story Length:**\n\n**Short Stories (under 5,000 words):** Within the first 500-750 words\n**Novellas (20,000-50,000 words):** Within the first 2,000-7,500 words\n**Novels (80,000+ words):** Within the first 8,000-12,000 words\n**Series/Epics:** May have multiple inciting incidents across books\n\n**Warning Signs of Poor Timing:**\n\n**Too Early:**\n• Readers don\'t understand why they should care\n• Character reactions seem unmotivated\n• The incident lacks emotional impact\n• Context is missing for understanding the significance\n\n**Too Late:**\n• Readers are bored and may stop reading\n• Too much setup without payoff\n• Story feels slow to start\n• Momentum is lost before it begins\n\n**Genre Considerations:**\n• **Thrillers:** Often start with immediate action, then reveal context\n• **Literary Fiction:** May take more time establishing character and world\n• **Romance:** Often begins with the meeting of romantic interests\n• **Fantasy/Sci-Fi:** May need more setup to establish the world rules',
        type: 'tutorial'
      },
      {
        id: 'types-incidents',
        title: 'Types of Inciting Incidents',
        content: 'Not all inciting incidents are dramatic explosions or life-threatening events. The best inciting incident for your story depends on your genre, character, and theme. Understanding the different types helps you choose the most effective approach.\n\n**1. External Events**\n\n*Description:* Something happens in the outside world that affects your character\n\n*Examples:*\n• Natural disasters (earthquake, storm, fire)\n• Accidents (car crash, injury, equipment failure)\n• Attacks or threats (robbery, war, invasion)\n• Unexpected arrivals (stranger, letter, phone call)\n• Discoveries (finding something hidden or lost)\n\n*Best for:* Action, adventure, thriller, mystery genres\n\n**2. Internal Realizations**\n\n*Description:* Character suddenly understands something important about themselves or their world\n\n*Examples:*\n• Discovering a lie they\'ve been told\n• Realizing they\'re unhappy with their life\n• Understanding their true feelings about someone\n• Recognizing a pattern or truth they\'ve been blind to\n• Having an epiphany about their purpose or identity\n\n*Best for:* Literary fiction, character-driven stories, coming-of-age narratives\n\n**3. Relationship Disruptions**\n\n*Description:* A significant change in an important relationship\n\n*Examples:*\n• Death of a loved one\n• Betrayal by a trusted friend\n• Meeting someone who changes everything\n• Breakup or divorce\n• Reunion with someone from the past\n\n*Best for:* Romance, family drama, literary fiction\n\n**4. Opportunity or Challenge**\n\n*Description:* Character is presented with a chance or test they can\'t ignore\n\n*Examples:*\n• Job offer in a new city\n• Invitation to compete or participate\n• Challenge to prove themselves\n• Opportunity to achieve a dream\n• Request for help from someone important\n\n*Best for:* Coming-of-age, sports stories, career-focused narratives\n\n**5. Secrets Revealed**\n\n*Description:* Hidden information comes to light that changes everything\n\n*Examples:*\n• Learning about their true parentage\n• Discovering a family secret\n• Finding evidence of wrongdoing\n• Uncovering a conspiracy\n• Learning about hidden abilities or heritage\n\n*Best for:* Mystery, fantasy, family saga, thriller\n\n**Choosing the Right Type:**\n\n• **Consider your character\'s personality:** Would they respond more to external pressure or internal realization?\n• **Match your genre expectations:** Readers of different genres expect different types of incidents\n• **Align with your theme:** The type of incident should reflect what your story is really about\n• **Think about your character\'s growth:** What kind of incident would force the specific growth your character needs?',
        type: 'tutorial'
      },
      {
        id: 'craft-incident',
        title: 'Craft Your Perfect Inciting Incident',
        content: 'Now it\'s time to design the perfect inciting incident for your specific story. A well-crafted inciting incident should feel both surprising and inevitable - readers don\'t see it coming, but once it happens, it makes perfect sense.\n\n**The Inciting Incident Design Process:**\n\n**Step 1: Identify Your Story\'s Core Elements**\n• What is your character\'s main goal or desire?\n• What is their greatest fear or weakness?\n• What theme are you exploring?\n• What genre expectations do you need to meet?\n• What kind of journey will your character take?\n\n**Step 2: Choose Your Incident Type**\n• External event, internal realization, relationship disruption, opportunity, or secret revealed?\n• Which type best serves your story\'s needs?\n• Which type would most effectively challenge your specific character?\n\n**Step 3: Connect to Character and Theme**\n• How does this incident relate to your character\'s flaw or limitation?\n• Does it force them to confront what they\'ve been avoiding?\n• How does it connect to your story\'s deeper meaning?\n• Will overcoming this challenge require the growth you want to show?\n\n**Step 4: Ensure Proper Impact**\n• Is the incident significant enough to sustain an entire story?\n• Does it create enough conflict and complications?\n• Will it generate multiple obstacles and challenges?\n• Can it escalate throughout the story?\n\n**Step 5: Test for Effectiveness**\n• Does it make the character\'s goal harder to achieve?\n• Does it force them out of their comfort zone?\n• Will readers immediately want to know what happens next?\n• Does it feel organic to your story world?\n\n**Inciting Incident Checklist:**\n\n✓ Disrupts the character\'s normal world\n✓ Cannot be ignored or easily resolved\n✓ Connects directly to the main conflict\n✓ Forces the character to make a choice\n✓ Creates forward momentum\n✓ Feels surprising but logical\n✓ Matches the story\'s tone and genre\n✓ Sets up the character\'s growth journey\n✓ Establishes clear stakes\n✓ Generates reader questions and interest\n\n**Common Mistakes to Avoid:**\n• Making it too small or easily resolved\n• Having no connection to the main story\n• Placing it too early or too late\n• Making it feel random or coincidental\n• Failing to show its impact on the character\n• Creating an incident that doesn\'t match your genre\n• Making it so dramatic it overshadows the rest of the story',
        type: 'exercise',
        aiPrompt: 'I need to create a compelling inciting incident for my story that will effectively launch my plot and connect to my story\'s main themes. Can you help me design an event that disrupts my character\'s world, forces them into the main conflict, and sets up their growth journey? I want to make sure it feels both surprising and inevitable.'
      },
      {
        id: 'multiple-incidents',
        title: 'Managing Multiple Inciting Incidents',
        content: 'Some stories have multiple plotlines, ensemble casts, or complex narratives that require more than one inciting incident. Learning to manage multiple incidents effectively can create rich, layered storytelling without confusing readers.\n\n**When to Use Multiple Inciting Incidents:**\n\n• **Ensemble Stories:** Multiple main characters each need their own journey\n• **Subplots:** Secondary storylines require their own launching events\n• **Series/Sequels:** Each book or season needs its own inciting incident\n• **Complex Narratives:** Stories with multiple time periods or perspectives\n• **Genre Blending:** Different story elements may need different triggers\n\n**Types of Multiple Incident Structures:**\n\n**1. Staggered Incidents**\n• One main inciting incident starts the story\n• Secondary incidents launch subplots at different points\n• Each incident affects different characters or aspects of the story\n• Example: Main character loses job (main plot), then discovers spouse\'s affair (subplot)\n\n**2. Simultaneous Incidents**\n• Multiple incidents happen at the same time\n• Each affects different characters in the same story world\n• Often connected by a single larger event\n• Example: Natural disaster affects multiple families in different ways\n\n**3. Cascading Incidents**\n• One incident triggers a series of other incidents\n• Each new incident escalates the conflict\n• Creates a domino effect throughout the story\n• Example: Bank robbery leads to car chase, which leads to hostage situation\n\n**4. Parallel Incidents**\n• Similar incidents happen to different characters\n• Often used to show different responses to similar challenges\n• Can highlight theme through contrast\n• Example: Two characters both lose parents but react differently\n\n**Managing Multiple Incidents Effectively:**\n\n**Establish Hierarchy**\n• Identify which incident is primary and which are secondary\n• Give the main incident more weight and attention\n• Ensure secondary incidents support rather than compete with the main story\n\n**Create Connections**\n• Link incidents thematically or causally\n• Show how different incidents affect each other\n• Use incidents to bring characters together or drive them apart\n\n**Control Pacing**\n• Don\'t overwhelm readers with too many incidents at once\n• Space incidents to maintain momentum without confusion\n• Allow time for readers to process each incident\'s implications\n\n**Maintain Focus**\n• Each incident should serve the overall story purpose\n• Avoid incidents that don\'t contribute to character growth or plot advancement\n• Ensure all incidents eventually converge or resolve\n\n**Common Pitfalls:**\n• Too many incidents competing for attention\n• Incidents that don\'t connect to the main story\n• Confusing timeline or causality\n• Overwhelming readers with complexity\n• Failing to resolve all the incidents satisfactorily',
        type: 'tutorial'
      },
      {
        id: 'incident-aftermath',
        title: 'The Aftermath: What Happens Next',
        content: 'The inciting incident is just the beginning. How your character responds to this disruption is what actually drives your story forward. The aftermath of the inciting incident should show character, create momentum, and set up the conflicts to come.\n\n**Immediate Character Responses:**\n\n**1. Emotional Reaction**\n• Shock, fear, anger, excitement, confusion\n• Should feel authentic to the character and situation\n• Can reveal character traits and values\n• Sets the emotional tone for what follows\n\n**2. Practical Response**\n• What does the character do first?\n• How do they try to handle the situation?\n• What resources do they turn to?\n• Who do they tell or ask for help?\n\n**3. Decision Point**\n• Character must choose how to respond\n• This choice should reflect their current mindset and limitations\n• Often the "wrong" choice that creates more problems\n• Sets up the character\'s journey and growth\n\n**Building Momentum After the Incident:**\n\n**Create Complications**\n• The character\'s initial response should create new problems\n• Show how the incident affects other areas of their life\n• Introduce obstacles that make resolution difficult\n• Escalate the stakes beyond the initial incident\n\n**Introduce New Characters**\n• People who can help or hinder the character\n• Characters who are also affected by the incident\n• Allies, enemies, or neutral parties with their own agendas\n• Relationships that will be important throughout the story\n\n**Establish New Goals**\n• What does the character now want or need?\n• How has the incident changed their priorities?\n• What obstacles stand in the way of these new goals?\n• How do these goals conflict with what others want?\n\n**The Commitment Point:**\n\nAfter the inciting incident and initial response, your character needs a moment where they commit to the journey ahead. This is often called "crossing the threshold" and typically happens around the 25% mark of your story.\n\n**Elements of the Commitment:**\n• Character accepts they can\'t go back to the old normal\n• They choose to pursue a specific goal or course of action\n• They understand (at least partially) what they\'re getting into\n• They take the first major step into the new world or situation\n\n**Aftermath Planning Questions:**\n• How does your character\'s personality affect their response?\n• What would they try first, and why would it fail or create complications?\n• Who in their life would be affected by this incident?\n• What new relationships or conflicts might emerge?\n• How does this incident change what your character wants?\n• What would convince them to fully commit to the journey ahead?',
        type: 'prompt',
        aiPrompt: 'I\'ve designed my inciting incident and now need to plan what happens immediately afterward. Can you help me develop my character\'s response, the complications that arise, and how to build momentum toward their commitment to the main story journey? I want to make sure the aftermath feels authentic and sets up compelling conflicts.'
      }
    ]
  },
  'black-moment': {
    id: 'black-moment',
    title: 'The Black Moment',
    description: 'Create powerful climactic moments that test your characters and readers.',
    level: 'Advanced',
    duration: '55 mins',
    icon: Heart,
    color: 'from-gray-600 to-gray-800',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
    borderColor: 'border-gray-300',
    steps: [
      {
        id: 'intro',
        title: 'Understanding the Black Moment',
        content: 'The black moment is when everything seems lost. Your protagonist faces their greatest fear and appears to have failed completely. It\'s the darkest point in your story - the moment when both your character and your readers believe that all hope is gone.\n\n**What Makes a True Black Moment:**\n\n• **All Seems Lost:** The character appears to have failed in their main goal\n• **Greatest Fear Realized:** They face what they\'ve been trying to avoid all along\n• **Support Systems Fail:** Friends, allies, or resources are gone or unavailable\n• **Internal Crisis:** The character questions everything they believe about themselves\n• **No Obvious Solution:** There\'s no clear way forward or easy fix\n• **Stakes at Maximum:** Everything important is at risk\n\n**The Purpose of the Black Moment:**\n\n1. **Tests Character Growth:** Forces the character to use everything they\'ve learned\n2. **Creates Emotional Catharsis:** Provides the low point that makes victory meaningful\n3. **Proves Transformation:** Shows the character has truly changed\n4. **Maximizes Reader Investment:** Makes readers desperately want the character to succeed\n5. **Sets Up the Climax:** Creates the conditions for the final confrontation\n\n**Where the Black Moment Occurs:**\n\nTypically happens around 75-80% of your story, just before the final climax. It\'s the "all is lost" moment that precedes the character\'s final push toward resolution.\n\n**Black Moment vs. Climax:**\n• **Black Moment:** The character appears to fail and loses hope\n• **Climax:** The character finds the strength to try one more time and succeeds\n\nThe black moment is about despair; the climax is about triumph. The deeper the despair, the more satisfying the eventual victory.\n\n**Examples of Powerful Black Moments:**\n• Harry Potter appears to die in the Forbidden Forest\n• Katniss and Peeta are about to eat the poisonous berries\n• Luke Skywalker learns Darth Vader is his father\n• Elizabeth Bennet believes she\'s lost Darcy forever\n• Simba believes he\'s responsible for his father\'s death\n\nNotice how each moment forces the character to confront their deepest fears and seems to destroy their chances of achieving their goal.',
        type: 'tutorial'
      },
      {
        id: 'emotional-impact',
        title: 'Creating Maximum Emotional Impact',
        content: 'The black moment should hit both your character and your readers hard. The emotional impact comes not just from what happens, but from how well you\'ve prepared readers to care about the outcome.\n\n**Building Emotional Investment:**\n\n**1. Make Readers Care Deeply**\n• Spend time developing the character\'s relationships\n• Show what the character has to lose\n• Demonstrate their growth and progress throughout the story\n• Create emotional connections between character and reader\n\n**2. Raise the Stakes Progressively**\n• Start with personal stakes (character\'s happiness, safety, goals)\n• Expand to include loved ones (family, friends, romantic interests)\n• Broaden to community or world (if appropriate to your story)\n• Make failure increasingly costly throughout the story\n\n**3. Use Foreshadowing and Setup**\n• Plant seeds of the coming crisis early in the story\n• Show the character\'s greatest fears and vulnerabilities\n• Establish what would hurt them most\n• Create patterns that the black moment will break\n\n**Techniques for Emotional Impact:**\n\n**Contrast and Irony**\n• Place the black moment just after a moment of hope\n• Use the character\'s greatest strength against them\n• Make their virtues become their downfall\n• Show how close they came to success\n\n**Sensory and Physical Details**\n• Use concrete, specific imagery\n• Show the character\'s physical reaction to the crisis\n• Engage multiple senses to make the moment vivid\n• Use setting and atmosphere to reinforce the mood\n\n**Internal Monologue**\n• Show the character\'s thoughts and feelings\n• Reveal their self-doubt and despair\n• Let readers experience the character\'s internal collapse\n• Use the character\'s voice to convey the emotional weight\n\n**Pacing and Structure**\n• Slow down to let the impact sink in\n• Use shorter sentences to create urgency\n• Allow moments of silence or stillness\n• Build to the moment, then let it breathe\n\n**Common Mistakes That Reduce Impact:**\n• Making the moment too easy to resolve\n• Not establishing enough emotional investment beforehand\n• Rushing through the character\'s emotional response\n• Making the crisis feel random or unconnected to the story\n• Providing an immediate solution or rescue\n• Failing to show how the moment affects the character internally',
        type: 'tutorial'
      },
      {
        id: 'character-growth',
        title: 'Character Growth Through Crisis',
        content: 'The black moment is where your character\'s growth is truly tested. Everything they\'ve learned, every way they\'ve changed throughout the story, must be put to the ultimate test. This is where they prove they\'ve become someone new.\n\n**How the Black Moment Tests Growth:**\n\n**1. Confronts the Core Flaw**\n• The crisis should directly challenge the character\'s main weakness\n• Forces them to face what they\'ve been avoiding\n• Tests whether they\'ve truly overcome their limitation\n• Shows the consequences of their old way of thinking\n\n**2. Requires New Responses**\n• Old methods and approaches must fail\n• Character must use skills or wisdom gained during the story\n• Forces them to act against their natural instincts\n• Demands they trust in their growth and change\n\n**3. Isolates the Character**\n• Removes external support and resources\n• Forces them to rely on internal strength\n• Tests their independence and self-reliance\n• Shows they can succeed without their usual crutches\n\n**The Growth Paradox:**\n\nOften, the black moment requires the character to do the very thing they\'ve been afraid of all along:\n• The coward must be brave\n• The loner must trust others\n• The perfectionist must accept failure\n• The cynic must have faith\n• The people-pleaser must disappoint someone\n\n**Types of Character Growth Tested:**\n\n**Moral Growth**\n• Choosing right over easy\n• Standing up for principles under pressure\n• Sacrificing personal gain for others\n• Taking responsibility for past mistakes\n\n**Emotional Growth**\n• Facing fears instead of running\n• Expressing vulnerability instead of hiding\n• Choosing love over safety\n• Accepting loss and moving forward\n\n**Practical Growth**\n• Using new skills under pressure\n• Leading when they\'ve always followed\n• Making decisions they\'ve always avoided\n• Taking action instead of waiting\n\n**The Internal Battle:**\n\nThe black moment often features an internal struggle where:\n• Old self argues for giving up\n• New self pushes for one more try\n• Character must choose which voice to follow\n• The choice reveals who they\'ve truly become\n\n**Growth Validation:**\n\nThe character\'s response to the black moment should show:\n• They\'ve internalized the lessons of their journey\n• They can access strength they didn\'t know they had\n• They\'re willing to risk everything for what matters\n• They\'ve become the person the story needed them to be',
        type: 'tutorial'
      },
      {
        id: 'types-black-moments',
        title: 'Types of Black Moments',
        content: 'Not all black moments involve physical danger or external catastrophe. The most effective black moment for your story depends on your character\'s journey, your genre, and what your character fears most.\n\n**1. The Apparent Death**\n\n*Description:* Character appears to die or be destroyed\n*Examples:* Harry Potter in the Forbidden Forest, Gandalf falling in Moria\n*Best for:* Fantasy, adventure, action stories\n*Impact:* Ultimate sacrifice, tests love and loyalty of others\n\n**2. The Moral Failure**\n\n*Description:* Character compromises their values or betrays someone important\n*Examples:* Character lies to save themselves, abandons a friend in need\n*Best for:* Character-driven stories, moral dilemmas\n*Impact:* Tests integrity, forces character to face their true nature\n\n**3. The Loss of Everything**\n\n*Description:* Character loses everything they\'ve worked for or care about\n*Examples:* Business fails, family rejects them, home is destroyed\n*Best for:* Stories about ambition, family, identity\n*Impact:* Forces character to discover what truly matters\n\n**4. The Revelation of Truth**\n\n*Description:* Character learns something that destroys their worldview\n*Examples:* Discovering a loved one\'s betrayal, learning their life is a lie\n*Best for:* Mystery, psychological drama, coming-of-age\n*Impact:* Forces character to rebuild their understanding of reality\n\n**5. The Impossible Choice**\n\n*Description:* Character must choose between two things they value equally\n*Examples:* Save the city or save a loved one, tell the truth or protect someone\n*Best for:* Moral dilemmas, superhero stories, family drama\n*Impact:* Tests character\'s priorities and values\n\n**6. The Return of the Past**\n\n*Description:* Something from the character\'s past returns to haunt them\n*Examples:* Old enemy returns, past mistakes catch up, buried secrets surface\n*Best for:* Redemption stories, thrillers, family sagas\n*Impact:* Forces character to confront unresolved issues\n\n**7. The Failure of Growth**\n\n*Description:* Character reverts to old patterns and fails because of it\n*Examples:* Recovering addict relapses, reformed criminal returns to crime\n*Best for:* Addiction stories, redemption arcs, character studies\n*Impact:* Tests whether change is real or superficial\n\n**Choosing Your Black Moment Type:**\n\n• **Character-Driven Stories:** Focus on moral failures or impossible choices\n• **Plot-Driven Stories:** Use apparent death or loss of everything\n• **Relationship Stories:** Employ revelation of truth or return of the past\n• **Internal Journey Stories:** Try failure of growth or moral failure\n\n**Customizing for Your Character:**\n\n• **What does your character fear most?** Use that as the basis\n• **What would hurt them more than physical pain?** Emotional or moral crisis\n• **What have they been running from?** Force them to face it\n• **What do they value most?** Threaten or take it away\n• **What growth have they achieved?** Test it to the breaking point',
        type: 'tutorial'
      },
      {
        id: 'design-black-moment',
        title: 'Design Your Black Moment',
        content: 'Now it\'s time to create a black moment that will test your character\'s core beliefs and force them to make a choice that defines who they are. This moment should feel both devastating and inevitable.\n\n**Black Moment Design Process:**\n\n**Step 1: Identify Your Character\'s Deepest Fear**\n• What terrifies them more than anything else?\n• What would they do anything to avoid?\n• What past trauma or wound drives their behavior?\n• What do they believe would destroy them?\n\n**Step 2: Determine What They Value Most**\n• Who or what do they care about above all else?\n• What goal has driven them throughout the story?\n• What relationships are most important to them?\n• What principles or beliefs define them?\n\n**Step 3: Find the Connection**\n• How can their fear threaten what they value?\n• What situation would force them to choose between safety and values?\n• How can their greatest strength become a weakness?\n• What would make them question everything they believe?\n\n**Step 4: Build the Setup**\n• What events throughout the story lead to this moment?\n• How have you foreshadowed this crisis?\n• What support systems need to be removed first?\n• How can you make the moment feel inevitable?\n\n**Step 5: Craft the Moment**\n• What specific event triggers the black moment?\n• How does the character initially respond?\n• What internal struggle do they face?\n• How do they process the apparent failure?\n\n**Black Moment Checklist:**\n\n✓ Directly challenges the character\'s main flaw or fear\n✓ Threatens what the character values most\n✓ Feels like a natural consequence of story events\n✓ Removes obvious solutions or easy escapes\n✓ Forces the character to rely on internal growth\n✓ Creates genuine doubt about the outcome\n✓ Connects to the story\'s central theme\n✓ Sets up the final climactic choice\n✓ Feels emotionally devastating but not manipulative\n✓ Provides opportunity for character to prove their growth\n\n**Testing Your Black Moment:**\n\n**Emotional Test:**\n• Does it make you feel something when you imagine it?\n• Would readers who care about your character be devastated?\n• Does it feel earned by the story that came before?\n\n**Character Test:**\n• Does it force your character to confront their core issue?\n• Would their old self handle this differently than their new self?\n• Does it require them to use everything they\'ve learned?\n\n**Story Test:**\n• Does it connect logically to previous events?\n• Does it raise the stakes to their highest point?\n• Does it set up a satisfying climax and resolution?\n\n**Revision Questions:**\n• Is the moment specific and concrete, not vague?\n• Have you shown the character\'s internal response?\n• Does it feel too easy or too impossible to overcome?\n• Have you balanced despair with the possibility of hope?',
        type: 'exercise',
        aiPrompt: 'I need to create a powerful black moment for my story that will test my character\'s growth and create maximum emotional impact. Can you help me design a crisis that confronts their deepest fears, threatens what they value most, and forces them to prove they\'ve truly changed? I want it to feel both devastating and inevitable.'
      },
      {
        id: 'resolution-hope',
        title: 'From Darkness to Light: The Path to Resolution',
        content: 'The transition from the black moment to resolution is one of the most critical parts of your story. How your character finds hope and strength to overcome their darkest hour determines whether your ending feels earned and satisfying.\n\n**The Recovery Process:**\n\n**1. The Moment of Despair (Let it breathe)**\n• Allow the character to fully experience the loss\n• Show their emotional and physical response\n• Let readers feel the weight of the moment\n• Don\'t rush to provide comfort or solutions\n\n**2. The Spark of Realization**\n• Character remembers something important\n• Sees the situation from a new perspective\n• Recalls a lesson learned during their journey\n• Finds strength they didn\'t know they had\n\n**3. The Choice to Act**\n• Character decides to try one more time\n• Chooses hope over despair\n• Commits to using their growth and change\n• Takes responsibility for the outcome\n\n**4. The Final Push**\n• Character applies everything they\'ve learned\n• Uses new skills, wisdom, or perspective\n• Often requires sacrifice or risk\n• Demonstrates their transformation\n\n**Sources of Renewed Strength:**\n\n**Internal Sources:**\n• Remembering their core values\n• Accessing inner strength developed during the journey\n• Applying lessons learned from mentors or experiences\n• Choosing love over fear, hope over despair\n\n**External Sources:**\n• Help from unexpected allies\n• Resources planted earlier in the story\n• Support from relationships they\'ve built\n• Opportunities created by their previous actions\n\n**Memory and Reflection:**\n• Recalling words of wisdom from a mentor\n• Remembering why they started the journey\n• Thinking of people they\'re fighting for\n• Connecting to their deeper purpose\n\n**The Resurrection Moment:**\n\nThis is when your character "comes back to life" - literally or metaphorically:\n• They find the strength to continue\n• Discover a solution they couldn\'t see before\n• Access abilities or resources they\'d forgotten\n• Make a choice that defines their new self\n\n**Common Transition Techniques:**\n\n**The Mentor\'s Voice**\n• Character remembers advice given earlier\n• Hears the mentor\'s words in their mind\n• Applies a lesson they didn\'t understand before\n\n**The Love Connection**\n• Thinks of someone they care about\n• Realizes what they\'re fighting for\n• Finds strength in their relationships\n\n**The Inner Voice**\n• Character\'s new self speaks up\n• Challenges the despair and defeatism\n• Reminds them of their growth and capabilities\n\n**The External Sign**\n• Something in the environment provides inspiration\n• A symbol or reminder appears\n• Nature or circumstances offer a new perspective\n\n**Avoiding Common Pitfalls:**\n\n• **Deus Ex Machina:** Don\'t have someone else solve the problem\n• **Convenient Solutions:** The resolution should require character growth\n• **Rushed Recovery:** Allow time for the emotional journey\n• **Unearned Victory:** Make sure the character has to work for success\n• **Ignoring the Cost:** Show that the black moment had real consequences\n\n**The Resolution Should Show:**\n• Character has internalized their growth\n• They can succeed where they would have failed before\n• The victory comes from who they\'ve become, not luck\n• They\'re willing to sacrifice for what matters\n• The journey has fundamentally changed them',
        type: 'tutorial'
      },
      {
        id: 'aftermath-integration',
        title: 'The Aftermath: Integrating the Experience',
        content: 'After your character overcomes their black moment and achieves their goal, there\'s still important work to do. The aftermath should show how the experience has changed them and establish their new normal.\n\n**Elements of a Satisfying Aftermath:**\n\n**1. Show the Victory\'s Cost**\n• What did the character sacrifice to succeed?\n• How has the journey changed them?\n• What relationships or aspects of their old life are different?\n• What wisdom have they gained through suffering?\n\n**2. Demonstrate Growth**\n• How does the character handle situations differently now?\n• What can they do that they couldn\'t do at the beginning?\n• How do they relate to others in new ways?\n• What fears have they overcome or learned to manage?\n\n**3. Establish New Normal**\n• What does the character\'s life look like now?\n• How has their world changed as a result of their journey?\n• What new relationships or opportunities exist?\n• What ongoing challenges or responsibilities do they face?\n\n**4. Provide Emotional Closure**\n• Allow characters and readers to process the experience\n• Show the character at peace with their choices\n• Demonstrate that the struggle was worthwhile\n• Offer hope for the future\n\n**The Integration Process:**\n\n**Reflection and Understanding**\n• Character processes what they\'ve been through\n• Gains perspective on their journey\n• Understands how they\'ve changed\n• Accepts both the gains and losses\n\n**Sharing the Wisdom**\n• Character helps others with similar struggles\n• Passes on lessons learned\n• Becomes a mentor or guide\n• Uses their experience to benefit their community\n\n**Living the Change**\n• Character consistently acts from their new understanding\n• Makes choices based on their growth\n• Handles challenges with new skills and perspective\n• Maintains the positive changes they\'ve made\n\n**Types of Aftermath Scenes:**\n\n**The Return Home**\n• Character comes back to their original world\n• Shows how they\'ve changed by contrast\n• Demonstrates new perspective on old situations\n\n**The New Beginning**\n• Character starts a new phase of life\n• Shows the opportunities their growth has created\n• Establishes their new goals and relationships\n\n**The Wisdom Sharing**\n• Character helps someone else facing similar challenges\n• Demonstrates their growth through teaching or mentoring\n• Shows the cycle of growth continuing\n\n**The Peaceful Moment**\n• Character enjoys a quiet moment of satisfaction\n• Reflects on their journey and growth\n• Appreciates what they\'ve gained and learned\n\n**Balancing Hope and Realism:**\n\nThe aftermath should be:\n• **Hopeful but not perfect:** Character has grown but still faces normal life challenges\n• **Satisfying but not complete:** Some questions may remain unanswered\n• **Changed but recognizable:** Character is transformed but still themselves\n• **Peaceful but not static:** Growth continues, just not as dramatically\n\nThe goal is to show that the character\'s journey through the black moment has fundamentally changed them for the better, while acknowledging that life continues with its normal mix of joys and challenges.',
        type: 'prompt',
        aiPrompt: 'After my character overcomes their black moment, I want to create a satisfying aftermath that shows their growth and establishes their new normal. Can you help me plan how to demonstrate their transformation, show the cost of their victory, and provide emotional closure while setting up their future? I want readers to feel that the journey was worthwhile and the character has truly changed.'
      }
    ]
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LessonPage() {
  const params = useParams();
  const moduleId = params.module as string;
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentModule = modules[moduleId];

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem(`storylab-${moduleId}`);
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
  }, [moduleId]);

  const saveProgress = (stepId: string) => {
    const updated = [...completedSteps, stepId];
    setCompletedSteps(updated);
    localStorage.setItem(`storylab-${moduleId}`, JSON.stringify(updated));
  };

  const handleAiInteraction = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentStepData.aiPrompt,
          userInput,
          context: `Module: ${currentModule.title}, Step: ${currentStepData.title}`
        })
      });
      
      const data = await response.json();
      setAiResponse(data.response);
    } catch {
      setAiResponse('Sorry, I encountered an error. Please try again.');
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < currentModule.steps.length - 1) {
      saveProgress(currentStepData.id);
      setCurrentStep(currentStep + 1);
      setUserInput('');
      setAiResponse('');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setUserInput('');
      setAiResponse('');
    }
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <Link href="/" className="text-purple-600 hover:text-purple-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentStepData = currentModule.steps[currentStep];
  const IconComponent = currentModule.icon;
  const progress = ((currentStep + 1) / currentModule.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 bg-gradient-to-br ${currentModule.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{currentModule.title}</h1>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(currentModule.level)}`}>
                  {currentModule.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {currentModule.steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${currentModule.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Lesson Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step Content */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {currentStepData.type === 'tutorial' && <BookOpen className="w-6 h-6 text-blue-500 mr-2" />}
              {currentStepData.type === 'exercise' && <Play className="w-6 h-6 text-green-500 mr-2" />}
              {currentStepData.type === 'prompt' && <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />}
              <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{currentStepData.content}</p>
          </div>

          {/* Interactive Section */}
          {(currentStepData.type === 'exercise' || currentStepData.type === 'prompt') && (
            <div className="mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Turn</h3>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Share your thoughts, ideas, or questions here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleAiInteraction}
                  disabled={isLoading || !userInput.trim()}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Getting Help...' : 'Get AI Feedback'}
                </button>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">AI Writing Coach</h4>
                  <p className="text-blue-800 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="flex items-center space-x-4">
              {completedSteps.includes(currentStepData.id) && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
              
              <button
                onClick={nextStep}
                disabled={currentStep === currentModule.steps.length - 1}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === currentModule.steps.length - 1 ? 'Complete Module' : 'Next'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Module Completion */}
        {currentStep === currentModule.steps.length - 1 && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
            <p className="text-lg mb-6">You&apos;ve completed the {currentModule.title} module!</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Continue Learning
            </Link>
          </div>
        )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PDFDownloads
                moduleId={moduleId}
                moduleTitle={currentModule.title}
                userProgress={{
                  completedSteps,
                  totalSteps: currentModule.steps.length
                }}
              />
              <WritingTips />
              <WritingExamples currentModule={moduleId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
