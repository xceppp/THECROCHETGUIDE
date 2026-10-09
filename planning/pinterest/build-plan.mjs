import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const inv = JSON.parse(readFileSync("planning-tmp-inventory.json", "utf8"));
const bySlug = Object.fromEntries(inv.articles.map((a) => [a.slug, a]));

/** Scores are editorial. Demand is an estimate unless basis starts with "verified". */
const rows = [
  ["how-to-crochet-a-pumpkin-step-by-step", "Trending now", 25, 16, "adjacent-official", 16, 18, 9, 4, "Halloween Crochet", "Home Crochet Projects", "crochet pumpkin", "fall crochet; pumpkin decor", "stuffed pumpkin", "Oct 9-31, 2026", "Make fall decor", "An orange crochet pumpkin with a green stem, shown as an illustration of the finished shape.", "The tutorial shows the sphere, the grooves, and the stem as separate steps.", "Crochet pumpkin", "Pumpkin tutorial", ""],
  ["how-to-crochet-a-pumpkin-treat-bag", "Trending now", 24, 15, "adjacent-official", 16, 18, 9, 4, "Halloween Crochet", "Small Crochet Gifts", "crochet pumpkin treat bag", "halloween candy bag; pumpkin bag", "pumpkin treat bag", "Oct 9-31, 2026", "Make a candy bag", "A small orange pumpkin bag with a drawstring, illustrated for a handful of wrapped candy.", "The pin shows the finished bag and says the size is a gauge estimate.", "Pumpkin treat bag", "Candy bag tutorial", "Gauge estimate, not a fitted sample."],
  ["how-to-crochet-a-ghost-candy-bag", "Trending now", 24, 15, "estimate", 16, 18, 9, 4, "Halloween Crochet", "Small Crochet Gifts", "crochet ghost candy bag", "halloween treat bag; ghost bag", "ghost candy bag", "Oct 9-31, 2026", "Make a treat bag", "A small white ghost bag with a drawstring, illustrated for wrapped candy.", "Show the bag open enough that a reader can see it is a bag, not a stuffed ghost.", "Ghost candy bag", "Ghost bag tutorial", "Gauge estimate, not a fitted sample."],
  ["crochet-ghost-amigurumi-for-beginners", "Trending now", 24, 14, "estimate", 16, 18, 9, 4, "Halloween Crochet", "Beginner Crochet", "crochet ghost", "ghost amigurumi; beginner halloween crochet", "beginner ghost", "Oct 9-31, 2026", "Make a small ghost", "A small white crochet ghost standing up, illustrated as the finished shape.", "Show the ghost and mention the face is embroidered.", "Beginner crochet ghost", "Ghost tutorial", ""],
  ["how-to-crochet-a-spider-and-web", "Trending now", 23, 13, "estimate", 15, 16, 6, 4, "Halloween Crochet", "Home Crochet Projects", "crochet spider", "crochet spider web; halloween decor", "spider and web", "Oct 9-31, 2026", "Make hanging decor", "A crochet spider on a flat web, illustrated as a hanging pair.", "Show the spider and the web as two pieces that get sewn together.", "Crochet spider and web", "Spider tutorial", ""],
  ["halloween-crochet-card-wallet", "Trending now", 23, 14, "estimate", 16, 16, 8, 4, "Halloween Crochet", "Small Crochet Gifts", "halloween crochet card wallet", "ghost card holder; crochet wallet", "ghost card wallet", "Oct 9-31, 2026", "Make a small gift", "An orange card wallet with a tiny ghost, illustrated with a flap and button.", "Show a card next to the wallet so the size is obvious.", "Halloween card wallet", "Wallet tutorial", "Measure a real card."],
  ["free-pattern-halloween-coasters", "Trending now", 23, 15, "adjacent-official", 13, 16, 9, 3, "Halloween Crochet", "Home Crochet Projects", "halloween crochet coasters", "pumpkin coaster; granny square coaster", "pumpkin coaster set", "Oct 9-31, 2026", "Make table decor", "A flat pumpkin coaster beside orange, black, and purple granny squares.", "Show the flat discs, not a hot pad, and say counts were checked on paper.", "Halloween coasters", "Coaster tutorial", "Not a hot pad. Not microwave use."],
  ["bat-amigurumi-wings-body-and-ears", "Trending now", 23, 14, "estimate", 15, 16, 6, 4, "Halloween Crochet", "Beginner Crochet", "crochet bat", "bat amigurumi; halloween crochet", "small bat", "Oct 9-31, 2026", "Make a bat", "A small crochet bat with two wings and ears, illustrated as the finished piece.", "Show the body and the wings before they are sewn on.", "Crochet bat", "Bat tutorial", ""],
  ["gothic-bat-earbuds-pouch", "Trending now", 22, 14, "estimate", 15, 15, 8, 4, "Halloween Crochet", "Small Crochet Gifts", "crochet bat pouch", "gothic crochet; earbud pouch", "bat earbud pouch", "Oct 9-31, 2026", "Make a small pouch", "A black bat pouch with purple wings and a button flap.", "Show the pouch closed, with the keychain loop visible.", "Bat earbud pouch", "Pouch tutorial", "Measure the case. Not drop-proof."],
  ["halloween-granny-square-variations", "Trending now", 22, 13, "estimate", 14, 15, 8, 4, "Halloween Crochet", "Beginner Crochet", "halloween granny square", "candy corn granny square; crochet squares", "halloween granny squares", "Oct 9-31, 2026", "Learn a color layout", "Four halloween granny squares in orange, black, and cream.", "Show one classic square and one candy-corn color order.", "Halloween granny squares", "Square color ideas", ""],
  ["how-to-crochet-a-ghost-coin-pouch", "Trending now", 22, 13, "estimate", 15, 16, 8, 4, "Halloween Crochet", "Small Crochet Gifts", "crochet ghost coin pouch", "ghost pouch; halloween crochet", "ghost coin pouch", "Oct 9-31, 2026", "Make a tiny pouch", "A small white ghost pouch with a drawstring.", "Show the pouch next to a coin so the scale is clear.", "Ghost coin pouch", "Pouch tutorial", "Size is an estimate."],
  ["ghost-crochet-mini-wallet", "Trending now", 22, 13, "estimate", 15, 16, 8, 4, "Halloween Crochet", "Small Crochet Gifts", "crochet ghost wallet", "ghost card holder; mini wallet", "ghost mini wallet", "Oct 9-31, 2026", "Make a card holder", "A white ghost mini wallet with a button flap.", "Show the wallet with a standard card for scale.", "Ghost mini wallet", "Wallet tutorial", "Sized around an ID-1 card."],
  ["how-to-crochet-a-pumpkin-zipper-pouch", "Trending now", 22, 14, "adjacent-official", 15, 16, 8, 4, "Halloween Crochet", "Small Crochet Gifts", "crochet pumpkin pouch", "pumpkin zipper pouch; halloween gift", "pumpkin zipper pouch", "Oct 9-31, 2026", "Make a zipper pouch", "An orange pumpkin pouch with a sewn zipper and a green stem.", "Show the zipper as sewn on, not crocheted.", "Pumpkin zipper pouch", "Zipper pouch tutorial", "Inches are gauge estimates."],
  ["how-to-crochet-a-fall-leaf", "Trending now", 22, 14, "adjacent-official", 12, 15, 9, 3, "Home Crochet Projects", "Halloween Crochet", "crochet fall leaf", "fall crochet; leaf applique", "fall leaf", "Oct 9-Nov 26, 2026", "Make a small applique", "One flat fall leaf in autumn colors, illustrated as a small piece.", "Show the leaf flat, with the stem, and say the counts were checked on paper.", "Crochet fall leaf", "Leaf tutorial", "Not a yarn sample."],
  ["how-to-crochet-a-chunky-beanie", "Rising soon", 20, 14, "adjacent-official", 16, 18, 9, 4, "Winter Crochet Projects", "Small Crochet Gifts", "chunky crochet beanie", "crochet hat; bulky beanie", "chunky beanie", "Oct 9-Dec 15, 2026", "Make a hat", "A bulky beanie with a ribbed brim, illustrated as the intended shape.", "Show the brim and the crown as two stages.", "Chunky crochet beanie", "Beanie tutorial", "Swatch before you trust the example count."],
  ["how-to-crochet-a-beginner-scarf", "Rising soon", 20, 15, "adjacent-official", 13, 17, 10, 4, "Winter Crochet Projects", "Beginner Crochet", "easy crochet scarf", "beginner scarf; half double crochet scarf", "beginner scarf", "Oct 9-Dec 15, 2026", "Make a first scarf", "A long straight scarf in one stitch, illustrated as the finished length.", "Show a short swatch and the full scarf so the edge stays the point.", "Easy crochet scarf", "Scarf tutorial", "Not a yarn-tested sample."],
  ["how-to-crochet-an-ear-warmer", "Rising soon", 19, 14, "adjacent-official", 15, 17, 9, 4, "Winter Crochet Projects", "Small Crochet Gifts", "crochet ear warmer", "crochet headband; winter crochet", "ear warmer", "Oct 9-Dec 15, 2026", "Make a headband", "A ribbed ear warmer, illustrated as a band that meets at the back.", "Show the band flat before it is seamed.", "Crochet ear warmer", "Ear warmer tutorial", "Stop when it fits the head."],
  ["how-to-crochet-fingerless-gloves", "Rising soon", 19, 14, "adjacent-official", 15, 17, 8, 4, "Winter Crochet Projects", "Small Crochet Gifts", "crochet fingerless gloves", "crochet gloves; thumb opening", "fingerless gloves", "Oct 9-Dec 15, 2026", "Make gloves", "A pair of fingerless gloves with a thumb opening.", "Show one glove on its side so the thumb hole is visible.", "Fingerless gloves", "Glove tutorial", "Counts are an example, not a fitted pair."],
  ["easy-crochet-christmas-ornaments", "Rising soon", 18, 14, "historical", 16, 17, 9, 4, "Christmas Crochet", "Small Crochet Gifts", "crochet christmas ornaments", "easy ornament; crochet star", "christmas ornaments", "Oct 20-Dec 20, 2026", "Make small ornaments", "A small set of crochet ornaments, with the written star as the complete piece.", "Show the flat star and say the other shapes link to their own tutorials.", "Easy crochet ornaments", "Ornament ideas", "The star is not a yarn-tested sample."],
  ["how-to-crochet-a-christmas-gift-card-holder", "Rising soon", 18, 14, "estimate", 15, 17, 9, 4, "Christmas Crochet", "Small Crochet Gifts", "crochet gift card holder", "christmas gift card; small crochet gift", "gift card holder", "Oct 15-Dec 20, 2026", "Make a gift wrap", "A small green pocket sized for a US gift card.", "Show a gift card sliding into the pocket.", "Gift card holder", "Card holder tutorial", "Inch estimates are not from a sample."],
  ["crochet-christmas-gift-ideas", "Rising soon", 18, 14, "estimate", 12, 16, 8, 4, "Christmas Crochet", "Beginner Crochet", "crochet christmas gift ideas", "handmade christmas gifts; crochet gifts", "gift idea guide", "Oct 15-Dec 15, 2026", "Choose a gift to make", "A still life of small crochet gifts, labeled as an illustration of the guide.", "Show three different objects and say each one has its own tutorial.", "Christmas crochet gifts", "Gift idea list", "This page is a guide, not a new pattern."],
  ["how-to-crochet-a-hooded-scarf", "Rising soon", 18, 13, "adjacent-official", 15, 16, 6, 4, "Winter Crochet Projects", "Beginner Crochet", "crochet hooded scarf", "crochet hood; winter scarf", "hooded scarf", "Oct 15-Dec 15, 2026", "Make a hooded scarf", "A scarf with a hood sewn at the center, illustrated as the finished shape.", "Show the scarf and the hood as two pieces before sewing.", "Hooded scarf", "Hood tutorial", "Length comes from your tape."],
  ["crochet-santa-amigurumi-for-beginners", "Rising soon", 17, 13, "estimate", 16, 17, 9, 4, "Christmas Crochet", "Beginner Crochet", "crochet santa", "santa amigurumi; christmas crochet", "santa amigurumi", "Nov 1-Dec 20, 2026", "Make a santa", "A small crochet Santa with a hat and beard.", "Show the body before the beard is added.", "Beginner crochet Santa", "Santa tutorial", ""],
  ["how-to-crochet-a-christmas-stocking", "Rising soon", 17, 13, "estimate", 16, 17, 6, 4, "Christmas Crochet", "Home Crochet Projects", "crochet christmas stocking", "crochet stocking; heel and toe", "christmas stocking", "Oct 20-Dec 15, 2026", "Make a stocking", "A crochet stocking with a cuff, illustrated as the intended shape.", "Show the cuff and the foot so the heel is part of the story.", "Crochet Christmas stocking", "Stocking tutorial", "Example size is a gauge estimate."],
  ["how-to-crochet-a-christmas-tree", "Rising soon", 17, 13, "estimate", 15, 16, 9, 4, "Christmas Crochet", "Home Crochet Projects", "crochet christmas tree", "small crochet tree; holiday decor", "christmas tree", "Oct 20-Dec 20, 2026", "Make a small tree", "A small crochet Christmas tree that stands up.", "Show a cone tree and mention the page also covers a flat triangle.", "Crochet Christmas tree", "Tree tutorial", ""],
  ["how-to-crochet-a-wine-bottle-bag", "Rising soon", 17, 13, "estimate", 15, 16, 8, 4, "Christmas Crochet", "Small Crochet Gifts", "crochet wine bottle bag", "hostess gift; bottle bag", "wine bottle bag", "Nov 1-Dec 24, 2026", "Make a hostess gift", "A drawstring bag tall enough for a wine bottle.", "Show the bag beside a bottle and say to measure that bottle.", "Wine bottle bag", "Bottle bag tutorial", "Not a guaranteed fit."],
  ["how-to-crochet-a-snowflake", "Rising soon", 16, 12, "historical", 14, 15, 8, 4, "Christmas Crochet", "Home Crochet Projects", "crochet snowflake", "flat snowflake; christmas ornament", "snowflake", "Nov 1-Dec 20, 2026", "Make an ornament", "A six-point snowflake blocked flat.", "Show a curled snowflake next to a flat one. The point is blocking.", "Crochet snowflake", "Snowflake tutorial", ""],
  ["how-to-crochet-a-gnome", "Rising soon", 16, 12, "estimate", 14, 15, 8, 4, "Christmas Crochet", "Beginner Crochet", "crochet gnome", "christmas gnome; crochet hat", "gnome", "Nov 1-Dec 20, 2026", "Make a gnome", "A crochet gnome with a tall hat and a beard.", "Show the cone, hat, nose, and beard as four pieces.", "Crochet gnome", "Gnome tutorial", ""],
  ["how-to-crochet-a-phone-case", "Evergreen", 16, 16, "verified-name", 15, 16, 8, 4, "Crochet Bags & Accessories", "Beginner Crochet", "crochet phone case", "crochet phone sleeve; laced up", "phone case", "Year-round; Laced Up is a 2026 Predicts theme", "Make a phone sleeve", "A crochet phone sleeve in a solid color, illustrated around a phone.", "Show the sleeve before it is seamed so the rectangle is clear.", "Crochet phone case", "Phone sleeve tutorial", "Sized in the article for one phone model. Measure yours."],
  ["how-to-crochet-a-lace-bandana", "Evergreen", 16, 16, "verified-name", 15, 15, 6, 4, "Crochet Bags & Accessories", "Beginner Crochet", "crochet bandana", "lace bandana; triangle bandana", "lace bandana", "Year-round; Laced Up is a 2026 Predicts theme", "Make a bandana", "A cream triangle bandana with ties, illustrated as lace clusters.", "Show the long edge and the ties, and say to measure the edge.", "Crochet lace bandana", "Bandana tutorial", "Not a worn sample."],
  ["how-to-crochet-a-christmas-tree-skirt", "Rising soon", 16, 12, "estimate", 14, 14, 6, 3, "Christmas Crochet", "Home Crochet Projects", "crochet tree skirt", "christmas tree skirt; holiday crochet", "tree skirt", "Nov 1-Dec 10, 2026", "Make a tree skirt", "A circular crochet skirt with a slit and a center hole.", "Show the slit and the center opening, not a finished room.", "Crochet tree skirt", "Tree skirt tutorial", "Not yarn-tested and not used under a tree."],
  ["christmas-granny-square-variations", "Rising soon", 16, 12, "estimate", 13, 14, 8, 4, "Christmas Crochet", "Beginner Crochet", "christmas granny square", "red and green granny square", "christmas granny squares", "Nov 1-Dec 20, 2026", "Choose holiday colors", "Granny squares in red, green, and cream.", "Show two color orders and say the page is about color, not a new square.", "Christmas granny squares", "Holiday color layouts", ""],
  ["crochet-mug-cozy-for-beginners", "Evergreen", 14, 12, "estimate", 15, 16, 9, 4, "Practical Crochet Patterns", "Small Crochet Gifts", "crochet mug cozy", "mug sleeve; beginner crochet gift", "mug cozy", "Oct 9-Dec 24, 2026", "Make a mug sleeve", "A crochet mug cozy with a button, illustrated on a plain mug.", "Show the rectangle before it wraps the mug.", "Crochet mug cozy", "Mug cozy tutorial", ""],
  ["how-to-crochet-a-baby-blanket", "Rising soon", 14, 12, "estimate", 12, 16, 8, 4, "Small Crochet Gifts", "Beginner Crochet", "crochet baby blanket", "beginner baby blanket; half double crochet blanket", "baby blanket", "Oct-Dec gift season; play-mat note is adjacent only", "Plan a baby blanket", "A simple baby blanket in one stitch, illustrated as a flat rectangle.", "Show the blanket corner and say the size comes from a swatch.", "Crochet baby blanket", "Blanket tutorial", "Not a tested sample. No buttons or ties."],
  ["how-to-crochet-slippers", "Rising soon", 16, 12, "estimate", 12, 13, 8, 3, "Winter Crochet Projects", "Practical Crochet Patterns", "crochet slippers", "house slippers; crochet sole", "open-instep slippers", "Nov-Dec, with a hard-floor warning", "Make house slippers", "Open-instep slippers: a sole, a short toe cap, and a heel tab.", "Show the three pieces flat before they are sewn.", "Crochet slippers", "Slipper tutorial", "Soles slide on hard floors. Not shoes. Not yarn-tested."],
  ["how-to-crochet-a-phone-crossbody", "Evergreen", 12, 12, "estimate", 15, 15, 8, 4, "Crochet Bags & Accessories", "Small Crochet Gifts", "crochet phone crossbody", "phone bag; crochet strap", "phone crossbody", "Year-round", "Make a phone bag", "A small phone sleeve with a long strap.", "Show the strap length beside the sleeve.", "Phone crossbody", "Crossbody tutorial", "Not waterproof. Measure the phone."],
  ["how-to-crochet-a-tumbler-sleeve", "Evergreen", 12, 11, "estimate", 14, 15, 8, 4, "Practical Crochet Patterns", "Small Crochet Gifts", "crochet tumbler sleeve", "cup sleeve; cotton cozy", "tumbler sleeve", "Year-round, stronger in cold weather", "Make a cup sleeve", "A cotton sleeve with a button, illustrated on a handled tumbler.", "Show the sleeve open so it is clearly not a brand fit.", "Tumbler sleeve", "Sleeve tutorial", "Not a brand fit. Not oven or microwave use."],
  ["how-to-crochet-a-market-bag", "Evergreen", 10, 11, "estimate", 16, 16, 6, 4, "Crochet Bags & Accessories", "Practical Crochet Patterns", "crochet market bag", "mesh market bag; cotton bag", "market bag", "Year-round", "Make a shopping bag", "A cotton market bag with a solid base and mesh sides.", "Show the solid base before the mesh starts.", "Crochet market bag", "Market bag tutorial", "Not a load rating."],
  ["how-to-crochet-a-granny-square-tote", "Evergreen", 10, 11, "estimate", 16, 15, 6, 4, "Crochet Bags & Accessories", "Beginner Crochet", "granny square tote", "crochet tote bag; granny squares", "granny square tote", "Year-round", "Make a tote", "A tote made of classic granny squares and solid straps.", "Show one square and the joined bag.", "Granny square tote", "Tote tutorial", "Open holes can drop small objects. Not yarn-tested."],
  ["how-to-crochet-a-scrunchie", "Evergreen", 10, 11, "estimate", 14, 14, 9, 4, "Small Crochet Gifts", "Beginner Crochet", "crochet scrunchie", "crochet hair tie; one evening crochet", "scrunchie", "Year-round", "Make a scrunchie", "A crochet scrunchie over an elastic.", "Show the tube before it is pulled onto the hair tie.", "Crochet scrunchie", "Scrunchie tutorial", ""],
  ["how-to-crochet-a-mini-shoulder-bag", "Evergreen", 10, 10, "estimate", 15, 14, 8, 4, "Crochet Bags & Accessories", "Small Crochet Gifts", "crochet mini shoulder bag", "small crochet bag; folded rectangle bag", "mini shoulder bag", "Year-round", "Make a small bag", "A small bag folded from a rectangle, with a short strap.", "Show the flat rectangle before the fold.", "Mini shoulder bag", "Bag tutorial", "Size is a gauge estimate."],
  ["crochet-bag-charm-ideas", "Evergreen", 10, 10, "estimate", 14, 14, 8, 4, "Small Crochet Gifts", "Beginner Crochet", "crochet bag charm", "scrap yarn charm; tiny crochet", "bag charms", "Year-round", "Use scrap yarn", "A few tiny charms, with the heart as the one complete piece.", "Show the heart and say the other shapes are ideas, not full patterns.", "Crochet bag charms", "Charm ideas", "Only the heart is a complete written piece. Not yarn-tested."],
  ["how-to-crochet-a-simple-flower", "Evergreen", 10, 10, "estimate", 14, 13, 9, 4, "Beginner Crochet", "Small Crochet Gifts", "crochet flower", "crochet applique; five petal flower", "simple flower", "Year-round", "Make an applique", "A flat five-petal flower.", "Show the flower sewn on a hat or bag as the use, not a bouquet pattern.", "Simple crochet flower", "Flower tutorial", ""],
  ["how-to-crochet-a-makeup-pouch", "Evergreen", 10, 10, "estimate", 14, 14, 8, 4, "Crochet Bags & Accessories", "Small Crochet Gifts", "crochet makeup pouch", "drawstring pouch; cotton pouch", "makeup pouch", "Year-round", "Make a pouch", "A cotton drawstring pouch.", "Show the pouch open.", "Makeup pouch", "Pouch tutorial", "Inches are gauge estimates."],
  ["how-to-crochet-a-book-sleeve", "Evergreen", 9, 10, "estimate", 14, 14, 8, 4, "Practical Crochet Patterns", "Small Crochet Gifts", "crochet book sleeve", "book cozy; paperback sleeve", "book sleeve", "Year-round", "Cover a book", "A sleeve folded around a paperback.", "Show the book being measured, not a laptop.", "Crochet book sleeve", "Book sleeve tutorial", "Soft cover only. Not water protection."],
  ["how-to-crochet-a-bowl-cozy", "Evergreen", 12, 11, "estimate", 13, 12, 7, 3, "Home Crochet Projects", "Practical Crochet Patterns", "crochet bowl cozy", "cotton bowl holder; kitchen crochet", "bowl cozy", "Fall and winter table use", "Make a bowl holder", "A square cotton cozy with pinched corners and a bowl inside.", "Show two solid single-crochet squares before the corners are pinched.", "Cotton bowl cozy", "Bowl cozy tutorial", "Not heat-tested. Does not promise microwave safety."],
  ["how-to-crochet-a-laptop-sleeve", "Evergreen", 9, 10, "estimate", 13, 13, 8, 4, "Practical Crochet Patterns", "Crochet Bags & Accessories", "crochet laptop sleeve", "laptop cover; crochet sleeve", "laptop sleeve", "Year-round", "Cover a laptop", "A sleeve folded from a rectangle, illustrated around a closed laptop.", "Show a tape on the closed laptop, not the screen size on the box.", "Laptop sleeve", "Sleeve tutorial", "Not waterproof and not drop protection."],
  ["yarn-for-christmas-crochet", "Rising soon", 15, 11, "estimate", 8, 12, 8, 4, "Christmas Crochet", "Beginner Crochet", "yarn for christmas crochet", "sparkle yarn; ornament yarn", "yarn guide", "Nov-Dec", "Choose holiday yarn", "Skeins of worsted, thread, and metallic yarn on a table.", "Show metallic yarn beside a plain skein. The pin is about which yarn to buy.", "Christmas crochet yarn", "Yarn guide", ""],
  ["how-to-crochet-an-earbud-pouch", "Evergreen", 9, 9, "estimate", 13, 13, 8, 4, "Small Crochet Gifts", "Practical Crochet Patterns", "crochet earbud pouch", "airpods pouch; button pouch", "earbud pouch", "Year-round", "Make a small pouch", "A small sage pouch with a button flap.", "Show the pouch next to an earbud case for scale.", "Earbud pouch", "Pouch tutorial", "Not drop-proof or waterproof."],
  ["how-to-crochet-a-lip-balm-holder", "Evergreen", 8, 8, "estimate", 13, 13, 9, 4, "Small Crochet Gifts", "Beginner Crochet", "crochet lip balm holder", "lip balm sleeve; keychain crochet", "lip balm holder", "Year-round", "Make a tiny holder", "A small sleeve and key loop for a lip balm tube.", "Show the tube next to the sleeve.", "Lip balm holder", "Holder tutorial", "Measure the tube."],
  ["how-to-crochet-a-cable-organizer", "Low priority", 8, 8, "estimate", 12, 12, 8, 4, "Practical Crochet Patterns", "Small Crochet Gifts", "crochet cable organizer", "cord wrap; charging cable holder", "cable organizer", "Year-round, low seasonal pull", "Wrap a cable", "A short strap wrapped around one coiled cable.", "Show one cable, not a whole drawer of cords.", "Cable organizer", "Wrap tutorial", "Not crush-proof."],
  ["basic-crochet-stitches", "Evergreen", 8, 10, "estimate", 8, 12, 10, 4, "Beginner Crochet", "", "basic crochet stitches", "single crochet; double crochet", "five stitches", "Year-round", "Learn the stitches", "Five stitch swatches in a row, labeled sc, hdc, dc, tr, and slip stitch.", "Show one swatch growing from slip stitch to treble.", "5 basic crochet stitches", "Stitch order", ""],
  ["what-you-need-to-start-crocheting", "Evergreen", 8, 9, "estimate", 8, 12, 10, 4, "Beginner Crochet", "", "what you need to start crocheting", "beginner crochet supplies; first hook", "starter supplies", "Year-round", "Buy a first kit", "One hook and one skein of light solid yarn.", "Show the hook size chart as a reason to open the page.", "Start crocheting", "Supply list", ""],
  ["left-handed-crochet", "Evergreen", 7, 8, "estimate", 8, 14, 9, 4, "Beginner Crochet", "", "left handed crochet", "mirror a crochet pattern; left handed tutorial", "left-handed guide", "Year-round", "Follow patterns left-handed", "Hands holding a hook, with the working yarn on the left.", "Show a diagram arrow reversed. The page is the explanation.", "Left-handed crochet", "How to mirror a pattern", ""],
  ["crochet-in-the-round", "Evergreen", 7, 8, "estimate", 7, 10, 9, 4, "Beginner Crochet", "", "crochet in the round", "magic ring; crochet spiral", "magic ring", "Year-round", "Start a circle", "A magic ring pulled closed, next to a spiral.", "Show a circle that has turned into a bowl, which is the mistake the page fixes.", "Crochet in the round", "Magic ring help", ""],
  ["crochet-abbreviations-chart", "Low priority", 6, 8, "estimate", 7, 10, 8, 4, "Beginner Crochet", "", "crochet abbreviations", "US UK crochet terms; crochet chart", "abbreviations chart", "Year-round", "Look up a term", "A printed abbreviations chart on paper.", "Show US sc next to the UK name so the mismatch is the reason to click.", "Crochet abbreviations", "US and UK chart", ""],
  ["crochet-hook-size-conversion-chart", "Low priority", 6, 8, "estimate", 7, 10, 8, 4, "Beginner Crochet", "", "crochet hook size chart", "US hook to mm; hook conversion", "hook chart", "Year-round", "Convert a hook size", "A row of hooks with letter and millimeter labels.", "Show one hook labeled with both systems.", "Hook size chart", "US to millimeters", ""],
  ["yarn-weight-chart", "Low priority", 6, 8, "estimate", 7, 10, 8, 4, "Beginner Crochet", "", "yarn weight chart", "worsted vs bulky; yarn categories", "yarn weight chart", "Year-round", "Identify a yarn weight", "Eight yarn skeins from lace to jumbo.", "Show a worsted skein beside a bulky skein.", "Yarn weight chart", "8 yarn weights", ""],
  ["how-to-read-a-crochet-pattern", "Low priority", 6, 7, "estimate", 6, 10, 9, 4, "Beginner Crochet", "", "how to read a crochet pattern", "crochet pattern shorthand", "pattern reading", "Year-round", "Decode a pattern", "A printed pattern line with one abbreviation circled.", "Show the materials line and the first row.", "Read a crochet pattern", "Pattern shorthand", ""],
  ["crochet-gauge", "Low priority", 6, 7, "estimate", 6, 9, 8, 4, "Beginner Crochet", "", "crochet gauge", "crochet swatch; gauge too small", "gauge", "Year-round", "Fix a size problem", "A swatch with a tape measure on it.", "Show two hats, one smaller, as the reason gauge matters.", "Crochet gauge", "How to swatch", ""],
  ["crochet-increase-decrease", "Low priority", 6, 7, "estimate", 7, 9, 8, 4, "Beginner Crochet", "", "crochet increase and decrease", "invisible decrease; shaping", "increases and decreases", "Year-round", "Shape a piece", "A swatch that gets wider, then narrower.", "Show an invisible decrease beside a regular one.", "Increase and decrease", "Shaping tutorial", ""],
  ["changing-yarn-color-crochet", "Low priority", 6, 7, "estimate", 7, 9, 8, 4, "Beginner Crochet", "", "change yarn color crochet", "crochet color change; no knot", "color change", "Year-round", "Change color cleanly", "Two colors meeting in one row with no knot.", "Show a wrong-colored turning chain, which is the mistake.", "Change yarn color", "Clean color change", ""],
  ["where-to-find-free-crochet-patterns", "Low priority", 6, 7, "estimate", 5, 8, 6, 3, "Beginner Crochet", "", "free crochet patterns", "where to find crochet patterns", "pattern sources", "Year-round", "Find real patterns", "A notebook and a skein, no fake pattern screenshot.", "The pin should not look like a pattern download.", "Where to find patterns", "Avoid fake patterns", ""],
  ["crochet-turning-chain", "Low priority", 5, 6, "estimate", 6, 8, 7, 4, "Beginner Crochet", "", "crochet turning chain", "slanted crochet edge", "turning chain", "Year-round", "Fix slanted edges", "A swatch with one straight edge and one slanted edge.", "Circle the turning chain on a slanted edge.", "Turning chain", "Why edges slant", ""],
  ["weaving-in-ends-and-blocking", "Low priority", 5, 6, "estimate", 6, 8, 7, 4, "Beginner Crochet", "", "weaving in ends crochet", "blocking crochet", "finishing", "Year-round", "Finish a piece", "A yarn needle weaving an end into the back of a swatch.", "Show a pinned snowflake only as the blocking example.", "Weave in ends", "Blocking basics", ""],
];

if (rows.length !== 65) throw new Error(`expected 65 rows, got ${rows.length}`);
const seen = new Set();
for (const r of rows) {
  if (seen.has(r[0])) throw new Error(`duplicate ${r[0]}`);
  seen.add(r[0]);
  if (!bySlug[r[0]]) throw new Error(`missing inventory ${r[0]}`);
}
for (const a of inv.articles) {
  if (!seen.has(a.slug)) throw new Error(`unscored ${a.slug}`);
}

const sitemap = await (await fetch("https://www.crochetexplained.com/sitemap-0.xml")).text();
const liveLocs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

function csv(value) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}
function line(cells) {
  return cells.map(csv).join(",");
}

const scored = rows.map((r) => {
  const [slug, klass, season, demand, basis, visual, click, useful, quality, board, secondary, keyword, keywords2, product, window, intent, hookA, hookB, headA, headB, caveat] = r;
  const article = bySlug[slug];
  const total = season + demand + visual + click + useful + quality;
  const band = total >= 85 ? "A" : total >= 70 ? "B" : total >= 50 ? "C" : "D";
  const url = `https://www.crochetexplained.com/${slug}/`;
  return {
    article, slug, klass, season, demand, basis, visual, click, useful, quality, total, band,
    board, secondary, keyword, keywords2, product, window, intent, hookA, hookB, headA, headB, caveat, url,
    inSitemap: liveLocs.has(url),
  };
});

const status = new Map();
await Promise.all(scored.map(async (item) => {
  const res = await fetch(item.url, { redirect: "manual" });
  status.set(item.slug, res.status);
}));

scored.sort((a, b) => b.total - a.total || a.slug.localeCompare(b.slug));

mkdirSync("planning/pinterest", { recursive: true });

const inventoryHeader = ["title", "url", "topic", "primary_keyword", "secondary_keywords", "category", "level", "finished_product", "image_count", "related_slugs", "http_status", "in_sitemap", "publication_status", "pinterest_class", "priority_band", "score", "existing_pins"];
writeFileSync("planning/pinterest/01-inventory.csv", [inventoryHeader, ...scored.map((s) => [
  s.article.title, s.url, s.product, s.keyword, s.keywords2, s.article.category, s.article.level || "",
  s.product, s.article.imageCount, (s.article.links || []).join("; "), status.get(s.slug), s.inSitemap ? "yes" : "no",
  status.get(s.slug) === 200 ? "live" : "check", s.klass, s.band, s.total, "none on file",
])].map(line).join("\n") + "\n", "utf8");

const scoreHeader = ["rank", "score", "band", "class", "title", "url", "season_25", "demand_20", "demand_basis", "visual_20", "click_20", "useful_10", "quality_5", "primary_board", "keyword"];
writeFileSync("planning/pinterest/02-ranked-scores.csv", [scoreHeader, ...scored.map((s, i) => [
  i + 1, s.total, s.band, s.klass, s.article.title, s.url, s.season, s.demand, s.basis, s.visual, s.click, s.useful, s.quality, s.board, s.keyword,
])].map(line).join("\n") + "\n", "utf8");

const titleB = {
  "how-to-crochet-slippers": "How to crochet slippers",
  "how-to-crochet-an-earbud-pouch": "How to crochet an earbud pouch",
  "how-to-crochet-an-ear-warmer": "How to crochet an ear warmer",
  "crochet-ghost-amigurumi-for-beginners": "How to crochet a beginner ghost",
  "how-to-crochet-a-beginner-scarf": "How to crochet an easy scarf",
  "yarn-for-christmas-crochet": "Yarn for Christmas crochet",
  "basic-crochet-stitches": "The 5 basic crochet stitches",
  "what-you-need-to-start-crocheting": "What you need to start crocheting",
  "left-handed-crochet": "Left-handed crochet, explained",
  "crochet-abbreviations-chart": "Crochet abbreviations, US and UK",
  "crochet-hook-size-conversion-chart": "Crochet hook sizes, US to millimeters",
  "yarn-weight-chart": "Yarn weight chart, all 8 categories",
  "how-to-read-a-crochet-pattern": "How to read a crochet pattern",
  "crochet-gauge": "How to measure crochet gauge",
  "crochet-increase-decrease": "Crochet increases and decreases",
  "changing-yarn-color-crochet": "How to change yarn color in crochet",
  "where-to-find-free-crochet-patterns": "Where to find free crochet patterns",
  "crochet-turning-chain": "Why crochet edges slant",
  "weaving-in-ends-and-blocking": "Weaving in ends and blocking",
  "crochet-in-the-round": "How to crochet in the round",
  "crochet-christmas-gift-ideas": "Crochet Christmas gift ideas",
  "crochet-bag-charm-ideas": "Crochet bag charm ideas",
  "easy-crochet-christmas-ornaments": "Easy crochet Christmas ornaments",
  "halloween-granny-square-variations": "Halloween granny square ideas",
  "christmas-granny-square-variations": "Christmas granny square colors",
  "free-pattern-halloween-coasters": "Halloween crochet coasters",
  "how-to-crochet-fingerless-gloves": "How to crochet fingerless gloves",
};

const pins = [];
for (const s of scored) {
  const caveat = s.caveat ? ` ${s.caveat}` : "";
  pins.push({
    ...s,
    design: "A",
    pinTitle: `${s.headA}: see the written tutorial`,
    description: `${s.hookA} US terms. ${s.keyword}. ${s.keywords2.replaceAll(";", ",")}.${caveat} Open the full tutorial on Crochet Explained.`,
    headline: s.headA,
    cta: "See the tutorial",
    composition: `Design A, finished product. Large illustration of the ${s.product} on a warm wood or paper background. One short headline. No fake button, no star ratings, no "tested pattern" badge.`,
    alt: `Illustration of a ${s.product}, not a yarn-tested sample. Headline: ${s.headA}.`,
  });
  pins.push({
    ...s,
    design: "B",
    pinTitle: titleB[s.slug] || `How to crochet a ${s.product}`,
    description: `${s.hookB} The written steps, materials, and the mistakes to watch for are on the page.${caveat} ${s.keyword}.`,
    headline: s.headB,
    cta: "Get the instructions",
    composition: `Design B, tutorial teaser. The finished ${s.product} stays large. Add at most one accurate detail from the article, such as a piece laid flat or a measuring tape. Do not invent row counts on the image.`,
    alt: `Illustration introducing the ${s.product} tutorial. Headline: ${s.headB}.`,
  });
}

const pinHeader = ["article_title", "url", "design", "pin_title", "description", "image_headline", "cta", "visual_composition", "board", "secondary_board", "alt_text", "primary_keyword", "search_intent", "seasonal_window", "pin_category", "score", "band"];
writeFileSync("planning/pinterest/05-pin-concepts.csv", [pinHeader, ...pins.map((p) => [
  p.article.title, p.url, p.design, p.pinTitle, p.description, p.headline, p.cta, p.composition, p.board, p.secondary, p.alt, p.keyword, p.intent, p.window, p.design === "A" ? "Finished product" : "Tutorial teaser", p.total, p.band,
])].map(line).join("\n") + "\n", "utf8");

const start = new Date("2026-10-09T12:00:00Z");
const days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(start);
  d.setUTCDate(start.getUTCDate() + i);
  return d.toISOString().slice(0, 10);
});
const buckets = days.map(() => []);
const eligible = pins.filter((p) => p.band !== "D");
eligible.sort((a, b) => {
  const band = { A: 0, B: 1, C: 2 }[a.band] - { A: 0, B: 1, C: 2 }[b.band];
  if (band) return band;
  if (a.design !== b.design) return a.design === "A" ? -1 : 1;
  return b.total - a.total;
});
const lastSlugDay = new Map();
for (const pin of eligible) {
  let placed = false;
  const minDay = pin.design === "B" ? 4 : 0;
  for (let i = minDay; i < 30; i++) {
    if (buckets[i].length >= 6) continue;
    if (lastSlugDay.get(pin.slug) === i) continue;
    if (pin.design === "B" && lastSlugDay.has(pin.slug) && i - lastSlugDay.get(pin.slug) < 6) continue;
    const sameBoard = buckets[i].filter((p) => p.board === pin.board).length;
    if (sameBoard >= 3) continue;
    buckets[i].push(pin);
    lastSlugDay.set(pin.slug, i);
    placed = true;
    break;
  }
  if (!placed) {
    for (let i = 0; i < 30; i++) {
      if (buckets[i].length >= 8) continue;
      if (lastSlugDay.get(pin.slug) === i) continue;
      buckets[i].push(pin);
      lastSlugDay.set(pin.slug, i);
      placed = true;
      break;
    }
  }
  if (!placed) throw new Error(`unscheduled ${pin.slug} ${pin.design}`);
}

const calendar = [];
buckets.forEach((dayPins, i) => {
  for (const p of dayPins) {
    calendar.push([days[i], p.article.title, p.url, p.pinTitle, p.design === "A" ? "Finished product" : "Tutorial teaser", p.board, p.keyword, p.cta, p.total, p.band]);
  }
});
writeFileSync("planning/pinterest/06-calendar.csv", [["date", "article", "url", "pin_title", "design", "board", "primary_keyword", "cta", "priority_score", "band"], ...calendar].map(line).join("\n") + "\n", "utf8");

const trackHeader = ["pin_title", "pin_url", "destination_url", "publication_date", "impressions", "pin_clicks", "outbound_clicks", "saves", "outbound_ctr_percent", "us_website_sessions", "review_7_day", "review_14_day", "review_30_day", "notes"];
const trackRows = calendar.map((c) => [c[3], "", c[2], c[0], "", "", "", "", "", "", "", "", "", "Leave CTR blank when impressions are 0."]);
writeFileSync("planning/pinterest/07-tracking-template.csv", [trackHeader, ...trackRows].map(line).join("\n") + "\n", "utf8");

const top = scored.slice(0, 20);
const counts = { A: 0, B: 0, C: 0, D: 0 };
const classes = {};
for (const s of scored) {
  counts[s.band]++;
  classes[s.klass] = (classes[s.klass] || 0) + 1;
}
const failed = scored.filter((s) => status.get(s.slug) !== 200 || !s.inSitemap);
const perDay = buckets.map((b) => b.length);
writeFileSync("planning/pinterest/build-summary.json", JSON.stringify({
  articles: scored.length,
  failed,
  counts,
  classes,
  pins: pins.length,
  scheduled: calendar.length,
  held: pins.filter((p) => p.band === "D").length,
  perDay,
  maxDay: Math.max(...perDay),
}, null, 2), "utf8");

const boardMap = new Map();
for (const s of scored) {
  for (const board of [s.board, s.secondary].filter(Boolean)) {
    if (!boardMap.has(board)) boardMap.set(board, []);
    boardMap.get(board).push(s);
  }
}
let boardsMd = "# Pinterest board mapping\n\nPrimary board is where the pin is published. A secondary board is only for a later save if the pin is genuinely useful there. Do not post the same image to both boards on the same day.\n\nCrochet Basics is not a separate board. Skill and chart pages sit on Beginner Crochet, and the low-scoring ones stay off the 30-day calendar.\n\n";
for (const [board, items] of boardMap) {
  boardsMd += `## ${board}\n\n`;
  boardsMd += items.map((s) => `- ${s.article.title} (${s.band}, ${s.total}) — ${s.url}`).join("\n");
  boardsMd += "\n\n";
}
writeFileSync("planning/pinterest/04-boards.md", boardsMd, "utf8");

let topMd = "# Top 20 Pinterest opportunities\n\nScores are opportunity estimates for US Pinterest clicks from October 9, 2026. They are not measured traffic. Demand points are estimates except where the basis says a Pinterest source named the theme.\n\n";
topMd += top.map((s, i) => `${i + 1}. **${s.article.title}** — ${s.total} (${s.band}, ${s.klass}). ${s.url}\n   Keyword: ${s.keyword}. Board: ${s.board}. Demand basis: ${s.basis}.`).join("\n\n");
topMd += "\n";
writeFileSync("planning/pinterest/03-top-20.md", topMd, "utf8");

console.log(JSON.stringify({ counts, classes, scheduled: calendar.length, failed: failed.map((f) => f.slug), maxDay: Math.max(...perDay) }));
