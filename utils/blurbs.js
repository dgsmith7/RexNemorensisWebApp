export function getBlurb(blurbArray) {
  // tested
  let which = parseInt(Math.random(3) * blurbArray.length);
  return blurbArray[which];
}

// bot using magic
export let botUsingCloak = [`The enemy vanished into thin air.`];
export let botUsingGauntlet = [
  `The enemy donned the Gauntlet of Strength.  You can hear the sound of your pulse in
your ears as you realize that their strikes will cost more.`,
];
export let botUsingTincutre = [
  `The enemy chugged a vile of The Tincture of Restoration.`,
];
export let botUsingRing = [
  `The enemy said 'I do' to the Ring of Protection. I bet that honeymoon 'll suck!`,
];
export let botUsingCrown = [
  `The enemy messed up their do while donning the Crown of Speed.  But they still do
double damage, even with f'd a up hairdo.`,
];

// player drops weapon
export let playerDropsWeapon = [
  `You start slipping and naturally grab for something to hold onto.  As a result, your
weapon falls into the abyss.`,
  `The cliff edge is hungry and it seems to enjoy eating weapons.  You watch sadly as
yours falls into the abyss.`,
  `You dropped your weapon over the edge, butterfingers.  There is a lost and found
booth at the bottom of the abyss where you can reclaim it later.`,
];

// bot drops weapon
export let botDropsWeapon = [
  `You hear the clanging of metal against rock below and realize that your enemy must
have accidentally dropped their weapon over the edge.`,
  `You snicker as you notice your enemy fumbling around until they drop their weapon
over the edge. People are always dropping stuff over the edge.`,
  `You see your opponent slipping near the edge of the cliff.  They grab a handhold to
save their hyde and their weapon falls into the abyss.`,
];

// player dies from falling
export let playerFallsEdge = [
  `You fell to your death, you clumsy fool!`,
  `Oopsie daisy!  You slip and fall to your death.  Wrong way, bozo.`,
  `As you make impact with the ground, you feel a whisk of cool air on your brain as a
breeze enters the fracture in your cranium.  You fell off the edge.`,
];
export let playerFallsHole = [
  `You fell a great distance down a hot, smelly hole and died a horrible, hot, smelly
death!`,
  `The stench from the hole envelopes you as you fall into it's depths and die.`,
  `You fell into the smelly hole.  That stinks, literally and figuratively.`,
];

// bot dies from falling
export let botFallsEdge = [
  `You hear sliding gravel, see a blur in the corner of your eye and realize that the
enemy fell to their death. Clumsy fool!`,
  `Out of the corner of your eye, you notice your enemy waving their arms as they
disappears over the edge.`,
  `Schadenfreude overwhelems you as your witness your enemy falling from the precipice.`,
];
export let botFallsHole = [
  `You hear the enemy scream as they fall to their hot, smelly death down a hot, smelly
hole!`,
  `Your hot smelly enemy fell into the hot smelly hole and died a hot smelly death.`,
  `A puff of stench arises as your enemy falls to their death into the hot smelly hole.`,
];

// player misses
export let playerMisses = [
  `A swing and a miss! Your enemy grins. Hey batter, batter, batter, sssssswingggggg,
batterrrrrrr!!`,
  `Your enemy's speed and agility outwit your blade as you completely miss your target.`,
  `Steeeeeeeeeee-rike!  You miss completely.`,
];
export let playerGlancingBlow = [
  `You struck a glancing blow! Your enemy grunts and furrows their brow a bit.`,
  `Your enemy lets out a little pee as your bade glances them.`,
  `Your enemy stumbles a bit as you strike an indirect blow.`,
];
export let playerDirectHits = [
  `A direct hit! The smile leaves your enemy's eyes as they stumble back.`,
  `You feel and hear a satisfying thud as your weapon makes full and
meaningful contact.`,
  `The enemy sees that you mean buiness as the direct hit knocks them straight on
their arse.`,
];
export let playerNoEnemy = [
  `You swing at what appears to be your own shadow. Your form was perfect and you looked
like a complete badass, except that there is nobody to attack.`,
  `You swing at nothing and miss - and also manage to look like a total jackass.`,
  `You attack the thin air vigorously, making it even thinner - not your best look but
at least you got in a quick workout.`,
];

/////////////////////////////////////////
// player already has item
export let swordForSword = [
  `You already have a sword, Greed-o.`,
  `A warrior can only handle one of these heavy swords at a time.`,
  `Easy killer - only one weapon at time.`,
];
export let swordForAxe = [
  `You decide to forgo the sword for the superior axe in hand.`,
  `You pick up the sword, then put it back down becasue there is nothing as powerful
as this axe.`,
  `The axe is a less elegant weapon for a less civilized age.  You pass up the sword
because nothing grinds meat and bone like this axe you have.`,
];
export let alreadyHasShield = [
  `Carrying another shield will not protect you further and will only slow you down.`,
  `A warrior can only carry one shiled at a time.`,
  `Only one shield, Greed-o!`,
];
export let alreadyHasAxe = [
  `You already have an Axe, you blood-thirsty maniac.`,
  `A warrior can only handle one of these heavy axes at a time.`,
  `Easy killer - only one weapon at time.  You already have the best one.`,
];

// nothing to get
export let nothingHere = [
  `There is nothing to get here, pal.`,
  `You pick up the nothingness and it doesn't help in any way.`,
  `If only you could get something when there is nothing to get.`,
];
// a list of magic items
export let magicItems = [
  `Cloak of invisibility`,
  `Gauntlet of strength`,
  `Tincture of restoration`,
  `Ring of protection`,
  `Crown of speed`,
];

// inventory blurbs
export let magicInventory = [
  `   Cloak of invisibility: Incoming attack 0 damage for 3 turns when used. Press '1' to use.`,
  `   Gauntlet of strength: Attack force +5 for 3 turns when used. Press '2' to use.`,
  `   Tincture of restoration: Health +5 for 3 turns when used. Press '3' to use.`,
  `   Ring of protection: Shield +5 for 3 turns when used. Press '4' to use.`,
  `   Crown of speed: 2x attack for three turns when used. Press '5' to use.`,
];
export let axe = [
  `battle axe. Direct hits will henceforth inflict 20 damage. Naturally, You 
immediately flip it around and start acting like Tony Iiomi.`,
  `battle axe. Direct hits will henceforth inflict 20 damage. You long for a mirror because 
you feel like a guy from a Molly Hatchet album cover.`,
  `battle axe. Direct hits will henceforth inflict 20 damage. You silently wonder if your 
  loin cloth would clash with your flannel, suspenders, and spiky boots`,
];
export let sword = [`sword. Direct hits will henceforth inflict 15 damage.`];
export let shield = [
  `shield. All hits from enemies will henceforth be reduced by 5 damage.`,
];
export let map = [`paper.  It's a map!  Press M to view.`];

// enemy near
export let enemyNear = [
  `Your adreneline surges as you sense the closeness of your enemy.`,
  `You smell the stink of your enemy as they enter your space.,`,
  `The hair on your neck stands up as you sense the enemy nearby.`,
];

// Item comes into view
export let cloakInView = [
  `You see a scarlet cloak among a pile of bones here.`,
  `A scarlet swatch of velvet laying in the dirt catches your eye.`,
  `The claok of invisibility falls into view.`,
];
export let gauntletInView = [
  `A metal glove hangs from a golden bough of a nearby dead tree.`,
  `A glove lays on the ground here with an extended middle finger.`,
  `'Shaka, brah', says a glove on the ground with the extended pinky and thumb.`,
];
export let tinctureInView = [
  `There is a delicate clay bottle containing an iridescent liquid atop an altar.`,
  `You catch a whiff of something delightful coming from a nearby vile.  Take it easy
man, there is a beverage here.`,
  `A glass full of liquid catches your fancy like a cold beer on a hot afternoon.`,
];
export let ringInView = [
  `A ring with an inscription, smelt of rare metal, that is laying at your feet, begins
to vibrate.`,
  `A glint of light and a red glow eminate from something on the ground.`,
  `You see an irresistable ring nearby, seemingly calling for your finger.`,
];
export let crownInView = [
  `An ornate crown fit for a king or queen glows brightly as you approach.`,
  `You trip on a jeweled crown and nearly break your ass.`,
  `You are captured by the aura of a jeweled crown hanging from a low branch of a Golden
Bough.`,
];
export let axeInView = [
  `A heavy battle axe with a keen edge is stuck in a nearby stump.`,
  `Based on the giant freakin' axe, it looks like Paul Bunyon was chopping wood here.`,
  `There is a big double-edged battle axe here, which seems to be as hefty and balanced as anything you've
ever lifted.`,
];
export let swordInView = [
  `You hear a low hum coming from a well-crafted sword on the ground.`,
  `In the low branches of a nearby tree, you spot a shining blade.`,
  `You see a sword.  Too many have died at its edge.  It may look pure, but only becasue
blood washes so easily from its blade.`,
];
export let shieldInView = [
  `You see a sturdy shield propped on a rock.`,
  `A shield hangs from a nearby tree like a piece of fruit, as if the Gods placed it
there for you to pick.`,
  `You see a sled that reminds you of your winter days sliding down the hills up North.
Then you realize it is actually a shield.`,
];
export let mapInView = [
  `You notice a ball of crumpled paper in the dirt and dust.`,
  `The is a ragged piece of debris swirling in a dust devil.`,
  `A tattered  paper gently flapping in the breeze is weighted down under a nearby rock.`,
];

export let nothingInView = [
  `A breeze flaps your loin cloth and you feel a tingle.  Otherwise there is nothing
else to see here.`,
  `A tumbleweed rolls by.  A swirl of dust follows.  No other items are in sight.`,
  `You look around. The grove is gorgeous.  There is nothing here.`,
  `Off on the horizon you see an armada of space cruisers amassing for battle.  There
is nothing else here.`,
  `This scenery is amazing.  If it weren't for all of the fighting, this would be a
great spot for a vacation. Otherwise, there is nothing here to see.`,
];

// other stuff
export let hole = [
  `A foul, hot stench rises from a nearby hole.  No, not because of your last meal.`,
  `You notice a foul stench arising from a nearby hole in the ground.`,
  `A nasty smell reminding you of an unrequested political opinion arises from a
nearby hole.`,
]; // wall
export let wallNorth = [
  `A raven circles high above the wall of a ruin to the North.`,
  `A granite boulder to the North blocks out the light.`,
  `You feel the cool moisture of a stone wall to your North.`,
  `The North is impassable due to a barrier.`,
];
export let wallSouth = [
  `A raven circles high above the wall of a ruin to the South.`,
  `A granite boulder to the South blocks out the light.`,
  `You feel the cool moisture of a stone wall to your South.`,
  `The South is impassable due to a barrier.`,
];
export let wallEast = [
  `A raven circles high above the wall of a ruin to the East.`,
  `A granite boulder to the East blocks out the light.`,
  `You feel the cool moisture of a stone wall to your East.`,
  `The East is impassable due to a barrier.`,
];
export let wallWest = [
  `A raven circles high above the wall of a ruin to the West.`,
  `A granite boulder to the West blocks out the light.`,
  `You feel the cool moisture of a stone wall to your West.`,
  `The West is impassable due to a barrier.`,
];

// edge
export let edgeNorth = [
  `The view is great, but you feel your stomach tighten as you slip on some gravel near
the Northern precipice.`,
  `Something in your nether regions begins to tighten up as you approach the Northern
edge of the cliff.`,
  `You feel a natural apprehension as you approach the Northern edge of the mesa.`,
];
export let edgeSouth = [
  `Something deep below your guts begins to pucker because your are near the high
Southern rim.`,
  `Something in your nether regions begins to tighten up as you approach the Southern
edge of the cliff.`,
  `You feel a natural apprehension as you approach the Southern edge of the mesa.`,
];
export let edgeEast = [
  `Your head feels light and your vision grows dim near the Eastern cliff-edge of the
grove.`,
  `Something in your nether regions begins to tighten up as you approach the Eastern
edge of the cliff.`,
  `You feel a natural apprehension as you approach the Eastern edge of the mesa.`,
];
export let edgeWest = [
  `Your knees tremble as you peer over the Western ledge at the gorgeous vista of Lake
Nemi.`,
  `Something in your nether regions begins to tighten up as you approach the Western
edge of the cliff.`,
  `You feel a natural apprehension as you approach the Western edge of the mesa.`,
];
// player using magic
export let playerUsingCloak = [
  `You slide the cloak over your shoulders and suddenly disappear (too bad 'cuz your
coiffure looks great today). You are safe from attack for now.`,
  `You wear the cloak like a ballerina in a tutu.  As you squeeze in, you notice that 
you cannot be seen by your enemies.  Isn't that conveeenient!`,
  `Your midsection nearly busts the seams out of the damn cloak, but once it is on, you
are like an invisible sausage that cannot be sliced.`,
];
export let playerUsingGauntlet = [
  `The gauntlet fits your hand like a.....uhhh - gauntlet, and you feel strong enough
to pull the ears of a Gundark.`,
  `You clumsily don the glove like a pig wears a watch.  Despite your ineptitude, you
are stronger than you were before putting it on.`,
  `Once the glove is on, you feel your veins pulsing, your muscles growing, your eyes
and skin turning green.  Mr. McGee, dont make me angry.  You wouldn't like me when I'm
angry.`,
];
export let playerUsingTincture = [
  `You drink deeply. This is better than the immuno-boost at Jamba Juice. You health
begins to build.`,
  `Gulp, gulp, gulp!, You feel pumped like a roid-soaked gym rat.  Enjoy the health
boost while it lasts.`,
  `As you imbibe the fluid, you feel like there are lighting bolts shooting from every
orifice on your body.  But this isn't really happening, its just your ego.  What's
really happening is that your health is increased for a while.`,
];
export let playerUsingRing = [
  `The ring slides easily onto your hand and you are surrounded by a strange but
comforting protective aura.`,
  `You slide into the ring like a Sunday morning slides in after a big Saturday night.
In spite of the troubles, a protective glow surrounds you.`,
  `You wear the ring and are surrounded by a protective field.  Precious!  Precious!
My Precious!`,
];
export let playerUsingCrown = [
  `As you carefully place the crown atop your head, careful not to mess up your
elaborate hairdo, you noticed it is adorned with jeweled wings. Your hands seem twice
as fast as before. Hmmmmm, you ponder, I wonder if I could attack twice in the same
amount of time it takes to attack once.`,
  `Like a greek god or a paratrooper, your attacks are twice as fast now, allowing two
times the damage.`,
  `You don the tiara like a super model.  Lipstick cherry all over the lens as you're
falling.  Your attacks now inflict damage x 2 while it lasts.`,
];

// player does not have that item
export let playerNoHave = [
  `Good try, Rockstar, but you don't own that item.`,
  `I don't think so, mate. You don't own that item.`,
  `As if you own that item or something.`,
  `Uhhhhh, you need to find one to use one, Dufus.`,
  `Negative, Ghost-rider, the pattern is full. You don't own that item.`,
];

export let raggedMap = [
  `The map is nearly falling apart from age and wear but it has all the info you need.`,
  `The ragged paper is torn and spattered with the blood of a million guards like you.`,
  `Your sweat drips on the grimy, ragged paper as you unfold the tattered map.`,
];

// player magic fading
export let cloakFade = [
  `You suddenly fade back into the realm of the visible as the cloak loses its power.`,
  `The effects of the cloak fade, and you are now as vulnerable as the rest of us.`,
  `As the cloak of invisibility loses its mojo, you feel like you lost your loin cloth.`,
];
export let gauntletFade = [
  `Your weapon feels heavier once again as the gauntlet of strength loses its mojo.`,
  `The gauntlet power fades and you are as slow and weak as ever.`,
  `The gauntlet power fades.  Life is a bitch, then you die, and people you never knew
wear your clothes to places you've never been.`,
];
export let tinctureFade = [
  `You look around for a place to nap and recharge as your magic health dissipates.`,
  `As if you lost your insurance coverage, your health is no longer as assured as it
was just a turn ago.`,
  `The tindture wears off, and now you are as fragile as a lamb.`,
];
export let ringFade = [
  `The aura that once enveloped you swirls away. You feel nearly naked without your
magic ring shield.`,
  `The ring power fades, the aura thins, and now the shield has dissipated.`,
  `Precious!  The ring is gone.  The power too.  What now?`,
];
export let crownFade = [
  `You take a practice swing of your weapon and it feels like its moving in slow motion
as your magic speed wanes like the moon.`,
  `Your double speed just slowed to real time.  Kinda like losing your broadband to
dialup.`,
  `Sorry queeny.  No more double damage.  The crown has lost its luster.`,
];

export let quitMessage = [
  `Thanks for playing.`,
  `You hear your enemy "Come back, you yellow bastard.  I'll bite your legs off!"`,
  `This is the end.  Beau-ti-ful friend, the end.`,
];

// player wins
export let playerWins = [`You are victorious.`];

export let gameResetAfterWin = [
  `Your reign continues. A new challenger has entered the grove.`,
];

export let regenerate = [
  `You make your way back to your camp to sharpen your weapons, grab some grub, and
get cleaned up. Time passes, walls become rubble, the ground shifts, trees grow.  
Its as if you are in a new place altogether, but still hauntingly familiar.  Any map
you had is now useless.  You clean your loin cloth then enjoy a good sleep. Your 
health improves by 25 points.
Another soul has been exiled to the Grove to challenge your reign.
You almost feel sorry for them, then you remember that poem.`,
];

export let strongerEnemyTaunt = [
  `The more newly exiled souls you slaughter, the stronger they get, eh?`,
];

export let gameOver = [`You hear the tolling of a death knell.`];

// player loses
export let playerLoses = [
  `You are defeated. A haloed child touches your head. You hear their whisper from
behind, 'All glory is fleeting...'.`,
  `Your vision blurs.  Your hear a voice.  You turn too see two eyes glowing a firey red.`,
  `You see a bright light and you are drawn to it.  Suddenly everything begins to fade
to black.  Then there is nothing.`,
];

export let loin = [
  `The Loin Cloth of Fortitude. Modesty +50 when worn. Aho, warrior!`,
  `The Loin Cloth of Fortitude. Commando bonus when not worn.`,
  `The Loin Cloth of Fortitude. Always on - well, almost always.`,
];

export let nakedness = [
  `Commando bonus!!!`,
  `You tingle all over.`,
  `All good things are wild and free.`,
  `A cold breeze moves past you and shrinkage begins to set in.`,
  `Fighting nude, eh?  Your brazen actions will surely scare the hell out of the enemy.`,
];

export let clothed = [
  `You feel ready to fight.`,
  `Modesty is a virtue.`,
  `Come on, just a bit longer.`,
  `Commando bonus secured.`,
];

export let extraQuip = [`Your loin cloth flaps with the wind...You blush.`];
// intro
export let intro = [
  `   You are a mage and warrior. For your mettle, you have been honored to serve a 
priesthood for the Goddess Diana. In this role, your final role, you have been 
cast atop the windswept cliffs of The Grove at Nemi. In this place there are ruins 
and holes and cliff edges. Here you are relegated to stand an endless guard until 
you are killed by another exiled soul. Another like you currently stands guard 
awaiting your challenge to usurp their reign which you shall hold...but only for 
as long as you survive. For you, a violent death is assured - the question is how
soon. How many battles will you survive if you can take the guard? You are armed 
with only your fists and a dagger, but there are other, more powerful weapons strewn 
about the mesa. There are also magical items, each with varying powers. Watch your 
step - you may fall to your death off the edge of the mesa or into a hole forevermore.
The other guard lurks in the grove, awaiting the challengers.

Press H for Help.

`,
];

export let enterAMove = [
  `Ponder your next move and press a key: `,
  `Everyone waits with bated breath for your next move: `,
  `Your move, chief: `,
];

export let peom = [
  `Those trees in whose dim shadow
The ghastly priest doth reign
The priest who slew the slayer,
And shall himself be slain.  -McCaulay`,
];

export let help = [
  `     _____________________________________________________________________________  
     |                                   HELP                                    |
     |  Rows run from 0 West to 7 East, and Columns run from 0 North to 7 South  |
     |                                                                           |
     |        These moves do not cost a turn (enemy move does not follow):       |
     |              H-Help    I-Inventory & status    M-Map   Q-Quit             |
     |           There are others ??? injected purely for entertainment          |
     |                                                                           |
     |     These moves cost one turn (enemy gets move immediately following):    |
     |             N, S, E, W - move    1, 2, 3, 4, 5 - Use Magic Item           |
     |             G - Get item       A - Attack with strongest weapon           |
     |___________________________________________________________________________|
`,
];

export let unknownCommand = [
  `I do not know how to do that.`,
  `Try again, Ace!`,
  `You can always just type 'h' for help.`,
];

export let profanityReply = [
  `Such language in a high-class establishment like this.`,
  `Go wash your mouth out with soap, youngster!`,
  `Hey, fuggedaboutit!`,
  `Having a bad day, are we?`,
];

//Shield, sword, and axe image ASCIIfied by https://manytools.org/hacker-tools/convert-images-to-ascii-art/ based on image from https://pixabay.com/users/clker-free-vector-images-3736/
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
----------- Those trees in whose dim shadow----------(C) 2023 By David G. Smith----------
----------- The ghastly priest doth reign------------------------------------------------
----------- The priest who slew the slayer,----------------------------------------------
----------- And shall himself be slain.--------------------@%----------------------------
------------------------------ --McCaulay---------------(@@------------------------------
----------------------------------------------------@@@@&###-----------------------------
------/%%%/,,-------------------------------------%%%&%%%%##.----------------------------
------%(...,..,--------------------------------###@&&&%%%%##/----------/-----------------
------,.,..,,,,------------------------------@&&@@@&&&&%%%###/-----*@(-------------------
------..,.,,,,,----------------------------&&@@@@&&&&%%%####(.-.#(@*,--------------------
---------,..,,,,,-------------------------##@@@@@@&&&%%%%###((#&(%/,---------------------
----------.,...,.,,-----------------------#%@@@@@@&&&&%%%###(%@%(,/.,----------/(--------
------------,-.,.,,,,--/------------------&@@@@@@&//%&%%%#(%@%(*/(%%%%####((((//%--------
------------%&,....,.,%%#########%%%%%%&&&&&&&&&&&%%%%##(%/&(*/#&&%%%%####((((//@--------
------------%&&&-....,,,%/%(((##%%&&%%%%&%%%%##%%%&&&&@%@&(**#&&&&&%%%%###((((/%&--------
------------%&&&&...,.(%%&,,,,,,,,,*%%%%%,,,,,,,,,...%@#*(%.%((&&&&%%%%####(((((---------
------------&&&&&.***%%&&%%&,,,,,,**%%%%%,,,,,,,,,.#@#*/%...%(((&&&%%%%####((%%----------
------------&&&&*.....%%%&&%%@,,,,,*%%%%#,,,,,,,,.@%//%.....%#((#&&&%%%%###@@%-----------
------------&&&&&.......#%%&&%%@#,**%%%%#,,,,,,,@%/*#.......&#((-&&&%%%%%%%--------------
------------&&&&%......../(%%&&%%&,*#%%%#,,,,,&&(*#.........&##(%&#((((*-----------------
------------&&&&#.......,,,/%%%&&%%%#%%%%,,,&&(,(,..........&###-------------------------
------------&&&&#........,,,,(%%%&&%%%#%%,%@#*(*,,..........&###-------------------------
------------&%&&(.......,,,,,,,#%%%&&%%#%@#*/&,,,...........&###-------------------------
------------%%%&(........,,,,,,(/%%%%&&%%(/%(&,,,...........&%##-------------------------
------------%%%%&&&&&&&&&&%%%%%,&&&%%%%&&%%/((%%&&&&&&&&&&%%%%##-------------------------
------------%%%%@&&%##((((##%&&&%&&&@%%%%&&%%(.&&%%##(((##%%&%%#-------------------------
------------%%%%%.......,,,,,,,,&&&(,(@%%%&&&&%#,...........&%%%-------------------------
------------%%%%%.......,,,,,,,%@&*(#(((&%%%@&&&%#..........%%%%-------------------------
------------##%%&.......,,,,,%@#*//*#####*&%%%@&&&%%........%%%%-------------------------
------------###%&.......,,,#@%/*%,**####(,,%%%%%@&&&%&......#%%%-------------------------
------------/##%%.......,*@%/*#,,,**%###(,,,,#%%%%@@&&%@...,&&%&-------------------------
-------------###%%......&&(,(,,,,,**%%###,,,,,,#%%%%@@&&%@,&&&%--------------------------
--------------%##%%%..,....,,,,,,,**%%%##,,,,,,,,#%%%%@@&&%&&#---------------------------
----------------%#%,.,..,.,,,,,,,,**%%%%%,,,,,,,,.(#%%%%@@&&%&---------------------------
------------------,,...,,,,,,,,,,***%%%%%,,,,,,,,..*&%%%%%@@&&%%-------------------------
----------------.,....%%&&*,,,,,,***%%%%&,,,,,,,,.&%%%&%%%%%@@&&%%-----------------------
--------------,,....,--&&&&&&#,,,***%%%%&,,,,,,##%%%%@--@%%%%%@@&&#----------------------
------------.,.....-------%&&&&&(,**%%%%&,,%######%------@@%%%%&@@&%---------------------
----------@/,....------------%&&&&&&&%%%%%%####------------&%%%%@@@@---------------------
-----------&%*#------------------%%&&%%%%%&-------------------&&@@%&---------------------
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
`;

export let titleText1 = `
    _____  _____  ___    _  _________   ___ ___  ____   ______  ________________
   / __  \\/ __/ \\/ _/   / \\/  / ___/ \\ /  / _  \\/ __ \\ / ___/ \\/  / ____/_/ ___/
  / /_/ // _/ \\   /    /   \\ / _/ /      / / / / /_/ // _/ /   \\ /\\__ \\/ /\\__ \\
 / /\\ \\ / /_ _/ _ \\   / /\\  / /__/ /\\_/ / /_/ / /\\ \\ / /__/ /\\  /___/ / /___/ /
/_/  \\//___//__/ \\/  /_/  \\/____/_/  /_/\\____/_/  \\//____/_/  \\/_____/_/_____/\n
Rex Nemorensis - a text adventure game     Copyright(c) 2023 - David G. Smith

                                       ######################################
                                       #                                    #
                                       #          \\              /          #
     Those trees in whose dim shadow   #           \\\\          //           #
     The ghastly priest doth reign     #       +---\\\\\\--------///---+       #
     The priest who slew the slayer,   #       |. . \\\\\\ .  . /// . .|       #
     And shall himself be slain.       #       | . . \\\\\\ .. /// . . |       #
                         --McCaulay    #       |. . . \\\\\\  /// . . .|       #
                                       #       | . . . \\\\\\/// . . . |       #
                                       #       |. . . . \\\\\\/ . . . .|       #
                                       #       | . . . ./\\\\\\. . . . |       #
                                       #        \\ . . .///\\\\\\. . . /        #
                                       #         \\ \\\\ ///  \\\\\\ // /         #
                                       #          \\ \\\\// .. \\\\// /          #
                                       #           -/\\\\------//\\            #
                                       #           // \\\\    // \\\\           #
                                       #          //            \\\\          #
         Press RETURN to play          #                                    #
                                       ######################################
`;

// lyrics
export let song = [
  `This is the end.  Beau-ti-ful friend, the end.  (Oh wait, thats the movie.)`,
  `Yo-ho-ho-ho, a pirate's life for me.  (Oops, wrong adventure).`,
  `I'm a priest who sings a song, until another comes along...`,
];

export let rules = [`this will be a more verbose explantion of game.`];

export let poem = [
  `
  Those trees in whose dim shadow
  The ghastly priest doth reign
  The priest who slew the slayer,
  And shall himself be slain.    -McCaulay

`,
];

/* 
You struck a glancing blow! Your enemy grunts and furrows their brow a bit.
You struck with the axe inflicting 15 points damage,  while using the following magic items: 
The loin cloth of fortitude (always on - well, almost always).
Your health is 45.  The enemy's health is -10

You hear the tolling of a death knell.
Game over.

You are victorious. 
You have defeated 1 challengers.

Press ENTER to continue.

---------------------
You make your way back to your camp to sharpen your weapons, grab some grub, and get cleaned up.

You clean your loin cloth and your health improves by 25 points.

Another soul has been exiled to the Grove to challenge your reign.

You almost feel sorry for them, then you remember that poem.

       Those trees in whose dim shadow
       The ghastly priest doth reign
       The priest who slew the slayer,
       And shall himself be slain.    -McCaulay

The more newly exiled souls you slaughter, the stronger they get, eh?

Enemy health: 105
Enemy shield: 1

Press ENTER to continue.

---------------------
You reign continues.  A new challenger has entered the grove.

INVENTORY AND STATUS:
Your have 70 health points.
Your strongest weapon is a axe - each direct hit removes 20 health from your enemy.
Your shield (or lack thereof) provides 0 protection from any attack.
These are your magic items: 
   none
Active magic Items:
   none
You have defeated 1 challengers.

Press ENTER to continue.

*/
