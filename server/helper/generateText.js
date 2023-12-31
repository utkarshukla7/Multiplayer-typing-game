export const generateText = async (req, res) => {
  try {
    const body = req.body;
    // const { level } = req.body;
    const level = body.level;

    const wordsArray = [
      [
        "ace",
        "act",
        "add",
        "ado",
        "ads",
        "age",
        "ago",
        "aid",
        "ail",
        "aim",
        "air",
        "all",
        "and",
        "any",
        "ape",
        "apt",
        "arc",
        "are",
        "ark",
        "arm",
        "art",
        "ash",
        "ask",
        "asp",
        "ass",
        "ate",
        "ave",
        "awe",
        "axe",
        "aye",
        "bad",
        "bag",
        "ban",
        "bar",
        "bat",
        "bay",
        "bed",
        "bee",
        "beg",
        "bet",
        "bid",
        "big",
        "bin",
        "bit",
        "boa",
        "bob",
        "bog",
        "boo",
        "bop",
        "bow",
        "box",
        "boy",
        "bra",
        "bud",
        "bug",
        "bum",
        "bun",
        "bus",
        "but",
        "buy",
        "bye",
        "cab",
        "cad",
        "cam",
        "can",
        "cap",
        "car",
        "cat",
        "caw",
        "cob",
        "cod",
        "cog",
        "con",
        "coo",
        "cop",
        "cot",
        "cow",
        "coy",
        "cry",
        "cub",
        "cue",
        "cup",
        "cut",
        "dab",
        "dad",
        "dam",
        "day",
        "den",
        "dew",
        "did",
        "die",
        "dig",
        "dim",
        "din",
        "dip",
        "doc",
        "dog",
        "don",
        "dot",
        "dry",
        "dub",
        "dud",
        "due",
        "dug",
        "dun",
        "ear",
        "eat",
        "ebb",
        "eel",
        "egg",
      ],
      [
        "able",
        "acid",
        "aged",
        "also",
        "area",
        "army",
        "away",
        "baby",
        "back",
        "ball",
        "band",
        "bank",
        "base",
        "bath",
        "bear",
        "beat",
        "been",
        "beer",
        "bell",
        "belt",
        "bend",
        "bent",
        "best",
        "bill",
        "bird",
        "blow",
        "blue",
        "boat",
        "body",
        "bone",
        "book",
        "boom",
        "born",
        "boss",
        "both",
        "bowl",
        "bulk",
        "burn",
        "bush",
        "busy",
        "call",
        "calm",
        "came",
        "camp",
        "card",
        "care",
        "case",
        "cash",
        "cast",
        "cell",
        "chat",
        "chip",
        "city",
        "club",
        "coal",
        "coat",
        "code",
        "cold",
        "come",
        "cook",
        "cool",
        "cope",
        "copy",
        "core",
        "cost",
        "crew",
        "crop",
        "dark",
        "data",
        "date",
        "dawn",
        "days",
        "dead",
        "deal",
        "dean",
        "dear",
        "debt",
        "deep",
        "deny",
        "desk",
        "dial",
        "dice",
        "diet",
        "disc",
        "disk",
        "does",
        "done",
        "door",
        "dose",
        "doub",
        "down",
        "draw",
        "drew",
        "drop",
        "drum",
        "dual",
        "duke",
        "dull",
        "dump",
        "dust",
      ],
      [
        "abide",
        "about",
        "above",
        "acute",
        "admit",
        "adopt",
        "adult",
        "after",
        "agent",
        "agree",
        "ahead",
        "alarm",
        "album",
        "alien",
        "alive",
        "allow",
        "alone",
        "along",
        "alter",
        "among",
        "angel",
        "anger",
        "angle",
        "angry",
        "ankle",
        "apart",
        "apple",
        "apply",
        "argue",
        "arise",
        "array",
        "aside",
        "asset",
        "audio",
        "audit",
        "avoid",
        "award",
        "aware",
        "awful",
        "badge",
        "baker",
        "ballet",
        "balmy",
        "banjo",
        "basic",
        "bathe",
        "beard",
        "began",
        "being",
        "belly",
        "below",
        "berry",
        "birth",
        "black",
        "blame",
        "blend",
        "bless",
        "blind",
        "block",
        "blood",
        "bloom",
        "blown",
        "board",
        "boast",
        "bonus",
        "boost",
        "booth",
        "bound",
        "brain",
        "brand",
        "brave",
        "bread",
        "break",
        "brick",
        "brief",
        "bring",
        "brisk",
        "broad",
        "brown",
        "brush",
        "bunch",
        "burst",
        "buyer",
        "cabin",
        "cable",
        "cagey",
        "cakes",
        "calmly",
        "camel",
        "canal",
        "candy",
        "carat",
        "cargo",
        "carry",
        "carve",
        "cause",
        "cease",
        "cease",
        "cedar",
        "chaos",
        "charm",
        "chase",
        "cheat",
        "check",
        "cheek",
        "cheer",
        "chess",
        "chief",
        "child",
        "chill",
      ],
      [
        "accept",
        "access",
        "accord",
        "across",
        "acting",
        "action",
        "active",
        "actual",
        "advice",
        "affair",
        "affect",
        "afford",
        "agency",
        "agenda",
        "almost",
        "amount",
        "anchor",
        "animal",
        "answer",
        "appeal",
        "appear",
        "around",
        "arrive",
        "artist",
        "aspect",
        "assess",
        "assign",
        "assist",
        "assume",
        "attack",
        "attend",
        "author",
        "backed",
        "barely",
        "battle",
        "beauty",
        "become",
        "before",
        "behalf",
        "behave",
        "behind",
        "belief",
        "belong",
        "better",
        "beyond",
        "bitter",
        "border",
        "boring",
        "borrow",
        "bother",
        "bottle",
        "bottom",
        "bought",
        "branch",
        "breach",
        "breaks",
        "bridge",
        "bright",
        "broken",
        "budget",
        "bullet",
        "burden",
        "bureau",
        "button",
        "buying",
        "camera",
        "campus",
        "candle",
        "canine",
        "carbon",
        "career",
        "carpet",
        "carve",
        "casual",
        "cause",
        "census",
        "center",
        "chance",
        "change",
        "charge",
        "choice",
        "chosen",
        "church",
        "cigars",
        "cinema",
        "circle",
        "claims",
        "clause",
        "clean",
        "cliffs",
      ],
      [
        "absolve",
        "academy",
        "acclaim",
        "accrual",
        "achieve",
        "acquire",
        "adapter",
        "adaptor",
        "addicts",
        "address",
        "advance",
        "adverse",
        "advisor",
        "aerosol",
        "affects",
        "afflict",
        "affords",
        "against",
        "airfare",
        "airline",
        "alcohol",
        "alleged",
        "alleges",
        "allocate",
        "allure",
        "already",
        "altered",
        "alumnus",
        "amateur",
        "ambient",
        "amend",
        "amends",
        "amounts",
        "amusing",
        "anatomy",
        "anchors",
        "ancient",
        "andrews",
        "angelic",
        "angered",
        "angler",
        "angrier",
        "annoyed",
        "anomaly",
        "anthems",
        "anxiety",
        "applied",
        "applies",
        "approve",
        "aquatic",
        "archery",
        "aridest",
        "armband",
        "article",
        "artists",
        "aspired",
        "assault",
        "assists",
        "assumed",
        "assumes",
        "athiest",
        "attract",
        "auction",
        "audited",
        "augment",
        "authors",
        "autopsy",
        "avenues",
        "average",
        "aviator",
        "awakens",
        "awesome",
        "awfully",
        "backers",
        "baffled",
        "baffles",
        "baggier",
        "bailout",
        "balance",
        "balloon",
        "bananas",
        "bandage",
        "bandits",
        "bangers",
        "banging",
        "bankers",
        "banshee",
        "barbers",
        "bargain",
        "barista",
        "barrier",
        "baskets",
        "bathing",
        "batters",
        "battery",
        "battler",
        "battles",
        "bayonet",
        "beacons",
        "beaming",
      ],
      [
        "abdomens",
        "abducted",
        "abductor",
        "abdulrah",
        "abilities",
        "ablation",
        "ablative",
        "abnegate",
        "abolishs",
        "abolition",
        "abradant",
        "abrasion",
        "abrasive",
        "abridged",
        "abrogate",
        "absentee",
        "absolute",
        "absolved",
        "absorbed",
        "abstract",
        "abstruse",
        "absurdly",
        "abundant",
        "abutment",
        "academic",
        "accepted",
        "accessed",
        "accesses",
        "accident",
        "acclaims",
        "accolade",
        "accorded",
        "acoustic",
        "acquired",
        "acquires",
        "acreages",
        "actinide",
        "activate",
        "actively",
        "activity",
        "actuator",
        "adamants",
        "adapting",
        "adaptive",
        "addendum",
        "addicted",
        "addition",
        "additive",
        "adducing",
        "adenoids",
        "adequacy",
        "adherent",
        "adhesive",
        "adjacent",
        "adjoined",
        "adjourns",
        "adjudged",
        "adjuncts",
        "adjuster",
        "adjutant",
        "admirals",
        "admirers",
        "admiring",
        "admitted",
        "admixing",
        "admonish",
        "adopting",
        "adoption",
        "adorable",
        "adorably",
        "adorning",
        "adrenals",
        "adroitly",
        "adsorbed",
        "adultery",
        "advanced",
        "advances",
        "adverted",
        "advertor",
        "advisory",
        "advocacy",
        "advocate",
        "aerating",
        "aeration",
        "aerators",
        "aerially",
        "aerobics",
        "aerobios",
        "aerosols",
        "affaires",
        "affected",
        "affinity",
        "affirmed",
        "affixing",
        "affluent",
        "afforded",
        "affronts",
        "afghanis",
        "aflutter",
        "aforesaid",
      ],
      [
        "abandoned",
        "abundance",
        "accessible",
        "according",
        "adjective",
        "adventure",
        "afternoon",
        "agreement",
        "ambitious",
        "anonymous",
        "apartment",
        "appliance",
        "arbitrary",
        "architect",
        "assistant",
        "attention",
        "authority",
        "automatic",
        "available",
        "awareness",
        "background",
        "beautiful",
        "beginning",
        "biography",
        "blossom",
        "boundary",
        "brilliant",
        "building",
        "business",
        "calendar",
        "campaign",
        "carefully",
        "category",
        "challenge",
        "character",
        "chemical",
        "civilian",
        "climbing",
        "clothing",
        "colorful",
        "commerce",
        "community",
        "companion",
        "complete",
        "compound",
        "computer",
        "concrete",
        "conflict",
        "congress",
        "conscious",
        "consider",
        "constant",
        "consumer",
        "continue",
        "creative",
        "criminal",
        "currency",
        "customer",
        "decision",
        "delegate",
        "delivery",
        "describe",
        "designer",
        "detection",
        "directive",
        "disorder",
        "distance",
        "diversity",
        "domestic",
        "dramatic",
        "economic",
        "education",
        "effective",
        "efficient",
        "electric",
        "emotional",
        "employee",
        "endeavor",
        "engineer",
        "enterprise",
        "equation",
        "essential",
        "establish",
        "estimate",
        "evaluate",
        "exchange",
        "exercise",
        "expanded",
        "expansion",
        "experiment",
        "expertise",
        "explosion",
        "familiar",
        "fantastic",
        "federation",
        "financial",
        "following",
        "formation",
        "fortunate",
        "function",
      ],
      [
        "abduction",
        "abnormally",
        "absorbent",
        "accepting",
        "accessory",
        "according",
        "accurately",
        "acquaints",
        "adaptable",
        "addiction",
        "adjective",
        "adventure",
        "adversely",
        "advisable",
        "advocates",
        "affection",
        "afflicted",
        "afternoon",
        "agreeable",
        "alcoholic",
        "algorithms",
        "allegiance",
        "alleyways",
        "alliances",
        "allowable",
        "allusions",
        "alphabet",
        "ambiguous",
        "ambitions",
        "amplified",
        "analyzing",
        "ancestor",
        "anchoring",
        "announcer",
        "answering",
        "antibiotic",
        "anxiously",
        "apartments",
        "apologies",
        "appearing",
        "appetizer",
        "applauded",
        "appliance",
        "appraisal",
        "architect",
        "arguments",
        "artichoke",
        "ascendant",
        "assemblies",
        "assertion",
        "assuming",
        "athletics",
        "attaching",
        "attaining",
        "attractive",
        "audiences",
        "austere",
        "authoring",
        "authority",
        "avalanche",
        "avenue",
        "aviation",
        "awakening",
        "backlash",
        "backtrack",
        "bacterium",
        "badminton",
        "ballistic",
        "ballooned",
        "bankable",
        "barbarian",
        "barbecue",
        "barracuda",
        "baseboard",
        "bathwater",
        "beardless",
        "bedridden",
        "befuddled",
        "beginning",
        "believers",
        "belonging",
        "benefited",
        "beseeched",
        "bestowing",
        "bewildered",
        "biography",
        "birthday",
        "blameless",
        "blasphemy",
        "blistered",
      ],
      [
        "abandonment",
        "abbreviated",
        "abomination",
        "absolution",
        "absorption",
        "accelerated",
        "accentuated",
        "acceptances",
        "accessible",
        "acclimating",
        "accompanying",
        "accomplished",
        "accordionist",
        "accountable",
        "accusations",
        "accustomed",
        "achievements",
        "acknowledged",
        "acquainting",
        "acquiescent",
        "adjudicated",
        "adjustments",
        "administers",
        "admonishing",
        "adolescents",
        "advancements",
        "adventurous",
        "advertisers",
        "advocating",
        "aerosolized",
        "affectionate",
        "affiliation",
        "affirmation",
        "afflictions",
        "aftermaths",
        "aggregated",
        "aggressions",
        "agriculture",
        "ailments",
        "aimlessness",
        "airmanship",
        "alarming",
        "allegiance",
        "alligators",
        "allurement",
        "almsgiving",
        "alongside",
        "alternated",
        "altruistic",
        "amazement",
        "ambassadors",
        "ambulances",
        "amendment",
        "amputation",
        "ancestries",
        "anchovies",
        "anesthetized",
        "angered",
        "annexation",
        "annotations",
        "announcements",
        "annoyance",
        "anomalously",
        "anthropology",
        "antidepressant",
        "anticipates",
        "antiquated",
        "apostrophe",
        "appellate",
        "appliance",
        "appreciates",
        "apprehended",
        "apprentices",
        "appropriates",
        "approximate",
        "aquatically",
        "archaically",
        "archetypes",
        "aristocracy",
        "arrogantly",
        "articulates",
        "assemblies",
        "assigning",
        "assistants",
        "assumptions",
        "asymptotes",
        "atmosphere",
        "atrocities",
        "attachments",
        "attainment",
        "attentions",
        "attracting",
        "attributes",
        "auctioning",
        "auditioned",
        "auditorium",
        "augmenting",
        "authoring",
        "authored",
        "authorizing",
        "automakers",
        "automating",
        "avalanches",
        "awakening",
        "awakenings",
        "awestruck",
        "background",
        "backpacked",
        "backspaces",
        "bacterium",
      ],
    ];

    const generateRandomWordsForLevel = async (level) => {
      const words = [];
      const ratio = [14, 11, 9, 8, 5, 3];
      for (let j = 0; j < 6; j++) {
        let count = ratio[j];
        let arr = wordsArray[level + j - 1];
        for (let i = arr.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
        }

        for (let i = 0; i < count; i++) {
          words.push(arr[i]);
        }
      }
      return words;
    };

    const generateRandomParagraph = async (level) => {
      const words = await generateRandomWordsForLevel(level);
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }

      const paragraph = words.slice(0, 50).join(" ");
      return paragraph;
    };

    const paragraph = await generateRandomParagraph(level);
    res.status(200).send({
      success: true,
      message: "paragraph generated succesfully",
      paragraph: paragraph,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong in text generation!",
      error,
    });
  }
};
