// a list of magic items
export let magicItems = [
  "Cloak of invisibility",
  "Gauntlet of strength",
  "Tincture of restoration",
  "Ring of protection",
  "Crown of speed",
];

// inventory blurbs
export let cloak = [
  "Cloak of invisibility: Incoming attack 0 damage for 3 turns when used. Press '1' to use.",
];
export let gauntlet = [
  "Gauntlet of strength: Attack force +5 for 3 turns when used. Press '2' to use.",
];
export let tincture = [
  "Tincture of restoration: Health +5 for 3 turns when used. Press '3' to use.",
];
export let ring = [
  "Ring of protection: Shield +5 for 3 turns when used. Press '4' to use.",
];
export let crown = [
  "Crown of speed: 2x attack for three turns when used. Press '5' to use.",
];
export let axe = ["Axe. Direct hits will henceforth inflict 20 damage."];
export let sword = ["Sword. Direct hits will henceforth inflict 15 damage."];
export let shield = [
  "Shield. All hits from enemies will henceforth be reduced by 5 damage.",
];
export let loin = `The loin cloth of fortitude (always on - well, almost always).`;

// player using magic
export let playerUseCloak = [
  "You slide the cloak over your shoulders and suddenly disappear (too bad 'cuz your coiffure looks great today). You are safe from attack for now.",
];
export let playerUsingGauntlet = [
  "The gauntlet fits your hand like a.....uhhh - gauntlet, and you feel strong enough to pull the ears of a Gundark.",
];
export let playerUsingTincutre = [
  "You drink deeply. This is better than the immuno-boost at Jamba Juice. You health begins to build.",
  `Ahhhhh! The tincture kicked in, increasing your health is now`,
];
export let playerUsingRing = [
  "The ring slides easily onto your hand and you are surrounded by a strange protective aura.",
];
export let playerUsingCrown = [
  "As you carefully place the crown atop your head, careful not to mess up your elaborate hairdo, you noticed it is adorned with jeweled wings. Your hands seem twice as fast as before. Hmmmmm, you ponder, I wonder if I could attack twice in the same amount of time it takes to attack once.",
];

// player magic fading
export let claokFade = [
  `You suddenly fade back into the realm of the visible as the cloak loses its power.`,
];
export let gauntletFade = [
  `Your weapon feels heavier once again as the gauntlet of strength loses its mojo.`,
];
export let tinctureFade = [
  `You look around for a place to nap and recharge as your magic health dissipates.`,
];
export let ringFade = [
  `The aura that once enveloped you swirls away. You feel nearly naked without your magic ring shield.`,
];
export let crownFade = [
  `You take a practice swing of your weapon and it feels like its moving in slow motion as your magic speed wanes like the moon.`,
];

// bot using magic
export let botUsingCloak = ["The enemy vanished into thin air."];
export let botUsingGauntlet = [
  "The enemy donned the Gauntlet of Strength.let You can hear the sound of your pulse in your ears.",
];
export let botUsingTincutre = [
  "The enemy chugged a vile of The Tincture of Restoration.",
];
export let botUsingRing = [
  "The enemy said 'I do' to the Ring of Protection. I bet that honeymoon 'll suck!",
];
export let botUsingCrown = [
  "The enemy messed up their do while donning the Crown of Speed.",
];

// Item comes into view
export let cloakInView = [
  "You see a scarlet cloak among a pile of bones here.",
  "A scarlet swatch of velvet laying in the dirt catches your eye.",
];
export let guntletInView = [
  "A metal glove hangs from a golden bough of a nearby dead tree.",
  "A glove lays on the ground here with an extended middle finger.",
];
export let tinctureInView = [
  "There is a delicate clay bottle containing an iridescent liquid atop an altar.",
  "You catch a whiff of something delightful coming from a nearby vile.",
];
export let ringInView = [
  "A ring with an inscription, smelt of rare metal, that is laying at your feet, begins to vibrate.",
  "A glint of light and a red glow eminate from something on the ground.",
];
export let crownInView = [
  "An ornate crown fit for a king glows brightly as you approach.",
  "You trip on a jeweled crown and nearly break your ass.",
];
export let axeInView = [
  "A heavy axe with a keen edge is stuck in a nearby stump.",
  "It looks like somebody was chopping wood here.",
];
export let swordInView = [
  "You hear a low hum coming from a well-crafted sword on the ground.",
  "In the low branches of a nearby tree, you spot a shining blade.",
];
export let shieldInView = [
  "You see a sturdy shield propped on a rock.",
  "A shield hangs from a nearby tree like a piece of fruit, as if the Gods placed it there for you to pick.",
];
export let nothingInView = ["There is nothing else to see here."];

// player dies from falling
export let playerFallsEdge = ["You fell to your death, you clumsy fool!"];
export let playFallsHole = [
  "You fell a great distance down a hot, smelly hole and died a horrible, hot, smelly death!",
];

// bot dies from falling
export let botFallsEdge = [
  "You hear sliding gravel, see a blur in the corner of your eye and realize that the enemy fell to their death. Clumsy fool!",
];
export let botFallsHole = [
  "You hear the enemy scream as they fall to their hot, smelly death down a hot, smelly hole!",
];

// player misses
export let playerMisses = [
  "A swing and a miss! Your enemy grins. Hey batter, batter, batter, sssssswingggggg, batterrrrrrr!!",
  "You swing at nothing and miss - and also manage to look like a total jackass.",
  "You attack the thin air vigorously, making it even thinner - not your best look but at least you got in a quick workout.",
];
export let playerGlancingBlow = [
  "You struck a glancing blow! Your enemy grunts and furrows their brow a bit.",
];
export let playerDirectHits = [
  "A direct hit! The smile leaves your enemy's eyes as they stumble back.",
];
export let playerNoEnemy = [
  "You swing at what appears to be your own shadow. Your form was perfect and you looked like a complete badass, except that there is nobody to attack.",
];

// player does not have that item
export let playerNoHave = [
  "Good try, Rockstar, but you don't own that item.",
  "I don't think so, mate. You don't own that item.",
  "As if you own that item or something.",
  "Uhhhhh, you need to get one to wear one, Dufus.",
  "Negative, Ghost-rider, the pattern is full. You don't own that item.",
];

// player already has item
export let alreadyHaveAxe = ["You already have a sword, Greed-o."];
export let alreadyHaveSword = [
  "You decide to forgo the sword for the superior axe in hand.",
];
export let alreadyHaveShield = [
  "Carying another shield will not protect you further and will only slow you down.",
];

// nothing to get
export let nothingHere = [
  "There is nothing to get here, pal.",
  "You pick up the nothingness and it deosn't help in any way.",
];

// wall
export let wallNorth = [
  "A raven circles high above the wall of a ruin to the North.",
];
export let wallSouth = [
  "You feel the cool moisture of a stone wall to your South.",
];
export let wallEast = ["A granite boulder to the West blocks out the light."];
export let wallWest = ["The east is impassable due to a barrier."];

// edge
export let edgeNorth = [
  "The view is great, but you feel your stomach tighten as you slip on some gravel near the Northern precipice.",
];
export let edgeSouth = [
  "Something deep below your guts begins to pucker because your are near the high Southern rim.",
];
export let edgeEast = [
  "Your head feels light and your vision grows dim near the Western cliff-edge of the grove.",
];
export let edgeWest = [
  "Your knees tremble as you peer over the Eastern ledge at the gorgeous vista of Lake Nemi.",
];

// other stuff
export let hole = [
  "A foul, hot stench rises from a nearby hole in the ground.",
];

// enemy near
export let enemyNear = [
  "Your adreneline surges as you sense the closeness of your enemy.",
];

// intro
export let intro = [
  "You are a mage and warrior. For your mettle, you have been honored to serve a priesthood for the Goddess Diana. In this role, your final role, you have been cast atop the windswept cliffs of The Grove at Nemi. In this place there are ruins and holes and cliff edges. Here you are relegated to stand an endless guard until you are killed by another exiled soul. Another like you currently stands guard awaiting your challenge to usurp their reign which you shall hold...as long as you live. For you, a violent death is assured - the question is how soon. How many battles will you survive if you can take the guard? You are armed with only your fists and a dagger, but there are other, more powerful weapons strewn about the mesa. There are also magical items, each with varying powers. Watch your step - you may fall to your death off the edge of the mesa or into a hole forevermore. The other guard lurks in the grove, awaiting the challengers.",
];
export let enterAMove = ["Ponder your next move and press a key: "];
export let peom = [
  `Those trees in whose dim shadow
The ghastly priest doth reign
The priest who slew the slayer,
And shall himself be slain.  -McCaulay`,
];

// player wins
export let playerWins = [`You are victorious.`];
export let gameResetAfterWin = [
  `Your reign continues. A new challenger has entered the grove.`,
];
export let regenerate = [
  `You make your way back to your camp to sharpen your weapons, grab some grub, and get cleaned up.
You clean your loin cloth and your health improves by 25 points.
Another soul has been exiled to the Grove to challenge your reign.
You almost feel sorry for them, then you remember that poem.`,
];
export let strongerEnemyTaunt = [
  `The more newly exiled souls you slaughter, the stronger they get, eh?`,
];
export let help = [
  `
-----------------------------HELP----------------------------------
| Rows run from 0 West to 7 East, Columns 0 North to 7 South |
| These do not cost a turn: These moves cost one turn: |
| H - Help N, S, E, W - move |
| I - Inventory and status 1, 2, 3, 4, 5 - Use Magic Item |
| Q - Quit A - Attack with strongest weapon |
| G - get item |

---
`,
];

export let gameOver = `You hear the tolling of a death knell.`;

// player loses
export let playerLoses = [
  `You are defeated. A haloed cherub touches your head. You hear their whisper from behind, 'All glory is fleeting...'.  You turn too see their eyes glowing a firey red.`,
];

/*
You picked up the " + item + " Press I for inventory.
The enemy picked up the " + item + ". Oh, snap!
top + " struck with the " + pri.weapon + " inflicting " + finalDamage + " points damage, " + magicStuff
Your health is " + protagonist.health + ". The enemy's health is " + enemy.health
You have defeated " + protagonist.wins + " challengers.
*/

export let art = `
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
--@@@@-----------------@@----@-----------------------------------------------------------
--@---@----------------@@@---@-----------------------------------------------------------
--@---@--@@@--@---@----@--@--@---@@@---@-@@@--@@@--@-@@----@@@---@-@@---@@@---@---@@@----
--@@@@--@---@--@-@-----@--@--@--@---@--@@@@@-@---@-@@--@--@---@--@@--@-@---------@-------
--@-@---@@@@@---@------@---@-@--@@@@@--@-@-@-@---@-@------@@@@@--@---@--@@@---@---@@@----
--@--@--@------@-@-----@---@@@--@------@-@-@-@---@-@------@------@---@-----@--@------@---
--@---@--@@@@-@---@----@----@@---@@@@--@---@--@@@--@-------@@@@--@---@--@@@---@---@@@----
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
-----------|Those trees in whose dim shadow----------------------------------------------
-----------|The ghastly priest doth reign------------------------------------------------
-----------|The priest who slew the slayer,----------------------------------------------
-----------|And shall himself be slain.-------------------@%-----------------------------
---------------------------------McCaulay--------------(@@-------------------------------
--------------------------------------------------@@@@&###-------------------------------
----/%%%/,,--------------------------------------%%%&%%%%##.-----------------------------
----%(...,..,---------------------------------###@&&&%%%%##/-----------/-----------------
----,.,..,,,,------------------------------@&&@@@&&&&%%%###/-------*@(-------------------
----..,.,,,,,----------------------------&&@@@@&&&&%%%####(.-.#(@*,----------------------
-------,..,,,,,-------------------------##@@@@@@&&&%%%%###((#&(%/,-----------------------
--------.,...,.,,-----------------------#%@@@@@@&&&&%%%###(%@%(,/.,----------/(----------
----------,-.,.,,,,--/------------------&@@@@@@&//%&%%%#(%@%(*/(%%%%####((((//%----------
----------%&,....,.,%%#########%%%%%%&&&&&&&&&&&%%%%##(%/&(*/#&&%%%%####((((//@----------
----------%&&&-....,,,%/%(((##%%&&%%%%&%%%%##%%%&&&&@%@&(**#&&&&&%%%%###((((/%&----------
----------%&&&&...,.(%%&,,,,,,,,,*%%%%%,,,,,,,,,...%@#*(%.%((&&&&%%%%####(((((-----------
----------&&&&&.***%%&&%%&,,,,,,**%%%%%,,,,,,,,,.#@#*/%...%(((&&&%%%%####((%%------------
----------&&&&*.....%%%&&%%@,,,,,*%%%%#,,,,,,,,.@%//%.....%#((#&&&%%%%###@@%-------------
----------&&&&&.......#%%&&%%@#,**%%%%#,,,,,,,@%/*#.......&#((-&&&%%%%%%%----------------
----------&&&&%......../(%%&&%%&,*#%%%#,,,,,&&(*#.........&##(%&#((((*-------------------
----------&&&&#.......,,,/%%%&&%%%#%%%%,,,&&(,(,..........&###---------------------------
----------&&&&#........,,,,(%%%&&%%%#%%,%@#*(*,,..........&###---------------------------
----------&%&&(.......,,,,,,,#%%%&&%%#%@#*/&,,,...........&###---------------------------
----------%%%&(........,,,,,,(/%%%%&&%%(/%(&,,,...........&%##---------------------------
----------%%%%&&&&&&&&&&%%%%%,&&&%%%%&&%%/((%%&&&&&&&&&&%%%%##---------------------------
----------%%%%@&&%##((((##%&&&%&&&@%%%%&&%%(.&&%%##(((##%%&%%#---------------------------
----------%%%%%.......,,,,,,,,&&&(,(@%%%&&&&%#,...........&%%%---------------------------
----------%%%%%.......,,,,,,,%@&*(#(((&%%%@&&&%#..........%%%%---------------------------
----------##%%&.......,,,,,%@#*//*#####*&%%%@&&&%%........%%%%---------------------------
----------###%&.......,,,#@%/*%,**####(,,%%%%%@&&&%&......#%%%---------------------------
----------/##%%.......,*@%/*#,,,**%###(,,,,#%%%%@@&&%@...,&&%&---------------------------
-----------###%%......&&(,(,,,,,**%%###,,,,,,#%%%%@@&&%@,&&&%----------------------------
------------%##%%%..,....,,,,,,,**%%%##,,,,,,,,#%%%%@@&&%&&#-----------------------------
--------------%#%,.,..,.,,,,,,,,**%%%%%,,,,,,,,.(#%%%%@@&&%&-----------------------------
----------------,,...,,,,,,,,,,***%%%%%,,,,,,,,..*&%%%%%@@&&%%---------------------------
--------------.,....%%&&*,,,,,,***%%%%&,,,,,,,,.&%%%&%%%%%@@&&%%-------------------------
------------,,....,--&&&&&&#,,,***%%%%&,,,,,,##%%%%@--@%%%%%@@&&#------------------------
----------.,.....-------%&&&&&(,**%%%%&,,%######%------@@%%%%&@@&%-----------------------
--------@/,....------------%&&&&&&&%%%%%%####------------(&%%%%@@@@@@--------------------
---------&%*#------------------%%&&%%%%%&--------------------&&@@%&@---------------------
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
`;
