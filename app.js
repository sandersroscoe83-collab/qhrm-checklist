(() => {
  const PR = window.htmPreact;
  const h = PR.h;
  const Fragment = PR.Fragment || ((p) => p.children);
  const render = PR.render;
  const useState = PR.useState;
  const useEffect = PR.useEffect;
  const useMemo = PR.useMemo;
  const useRef = PR.useRef;
  const APP_VERSION = "1.0.0";
  const TH = {
    fill: { successSubtle: "var(--okS)", warningSubtle: "var(--warnS)", dangerSubtle: "var(--badS)", secondary: "var(--fill2)" },
    text: { success: "var(--ok)", warning: "var(--warn)", danger: "var(--bad)", primary: "var(--tx)", secondary: "var(--tx2)", tertiary: "var(--tx3)", accent: "var(--acc)" },
    border: { default: "var(--bd)", subtle: "var(--bds)" },
    bg: { base: "var(--bg)", subtle: "var(--bg2)" },
    radius: { md: 8, lg: 12 },
    font: { family: "var(--font)", mono: "var(--mono)" },
    weight: { medium: 500, semibold: 600 },
    dataviz: { other: "var(--other)" }
  };
  function useGrokTheme() {
    return TH;
  }
  function Page(props) {
    return /* @__PURE__ */ h("main", { class: "page" }, /* @__PURE__ */ h("h1", { class: "ptitle" }, props.title), props.summary ? /* @__PURE__ */ h("p", { class: "psum" }, props.summary) : null, props.children);
  }
  function Section(props) {
    const [o, setO] = useState(props.defaultOpen !== false);
    const isOpen = !props.collapsible || o;
    return /* @__PURE__ */ h("section", { id: props.id, class: "sec" }, props.collapsible ? /* @__PURE__ */ h("button", { type: "button", class: "sech", "aria-expanded": o, onClick: () => setO(!o) }, /* @__PURE__ */ h("h2", null, o ? "▾ " : "▸ ", props.heading)) : /* @__PURE__ */ h("h2", null, props.heading), isOpen ? /* @__PURE__ */ h("div", { class: "secb" }, props.children) : null);
  }
  function Text(props) {
    return /* @__PURE__ */ h("p", { class: "txt" }, props.children);
  }
  function Callout(props) {
    return /* @__PURE__ */ h("div", { class: "callout " + (props.tone || ""), role: "alert" }, props.lead ? /* @__PURE__ */ h("b", null, props.lead, " ") : null, props.children);
  }
  function NumberedList(props) {
    return /* @__PURE__ */ h("ol", { class: "nl" }, props.items.map((x, i) => /* @__PURE__ */ h("li", { key: i }, x)));
  }
  function Segmented(props) {
    return /* @__PURE__ */ h("div", { class: "seg", role: "group" }, props.options.map((o) => {
      const on = o.value === props.value;
      return /* @__PURE__ */ h("button", { type: "button", key: o.value, class: on ? "on" : "", "aria-pressed": on, onClick: () => props.onChange(o.value) }, o.label, o.count !== void 0 ? /* @__PURE__ */ h("span", { class: "cnt" }, o.count) : null);
    }));
  }
  function Button(props) {
    return /* @__PURE__ */ h("button", { type: "button", class: "btn" + (props.variant === "primary" ? " pri" : ""), disabled: !!props.disabled, onClick: props.onClick }, props.label);
  }
  function Input(props) {
    return /* @__PURE__ */ h("label", { class: "inp" }, props.label ? /* @__PURE__ */ h("span", { class: "lab" }, props.label) : null, /* @__PURE__ */ h("input", { value: props.value, placeholder: props.placeholder || "", onInput: (e) => props.onChange(e.target.value) }));
  }
  function Table(props) {
    return /* @__PURE__ */ h("div", { class: "tblw" }, /* @__PURE__ */ h("table", { class: "tbl" }, /* @__PURE__ */ h("thead", null, /* @__PURE__ */ h("tr", null, props.columns.map((c) => /* @__PURE__ */ h("th", { key: c }, c)))), /* @__PURE__ */ h("tbody", null, props.rows.map((r, i) => /* @__PURE__ */ h("tr", { key: i }, r.map((c, j) => /* @__PURE__ */ h("td", { key: j }, c && typeof c === "object" ? /* @__PURE__ */ h("span", { class: "tone " + c.tone }, c.text) : c)))))));
  }
  function TableOfContents(props) {
    return /* @__PURE__ */ h("nav", { class: "toc" }, props.items.map((x) => /* @__PURE__ */ h("a", { key: x.id, href: "#" + x.id }, x.label)));
  }
  function askPersist() {
    try {
      const st = navigator.storage;
      if (!st || !st.persist) return Promise.resolve("unsupported");
      return st.persisted().then((p) => p ? true : st.persist()).then((p) => p ? "granted" : "not granted", () => "unsupported");
    } catch (e) {
      return Promise.resolve("unsupported");
    }
  }
  const RAW = [
    ["FRONT OF HOUSE", "Health & Safety - Compliance Certificates", "Health & Safetly / Compliance", [["Trained First Aid staff with valid certificate", "g"], ["Health & Safety file with all relevant certificates", "g"], ["Evacuation plan prominently displayed with allocated assembly point", "g"], ["Staff rolecall sheet", "g"], ["Basic Conditions of Employment Act / Occupational Health & Safety Act", "g"], ["First Aid kit stocked and up to date", "g"], ["Emergency exit signs visible and working", "g"], ["Emergency services numbers prominently displayed", "g"], ["All fire fighting equipment available and serviced", "g"], ["Èxtraction system serviced bi-annually with certification", "g"], ["Liquor Licence.  Electrical COC.  Plumbing COC.  Polution Certificate.  Occupancy Certificate. Fire Department Certificate.  Licence to sell food on premises.  Certificate of Acceptability.", "g", "Certificates to be displayed"]]],
    ["FRONT OF HOUSE", "Management Responsibilities", "Management Responsibilities", [["Training file", "g"], ["Food Manual (Updated & condition)", "g"], ["Check sheet (FOH & BOH)", "g"], ["Coffee grinds checked", "g"], ["In store QHRM Report done", "g"], ["Meetings being held", "g"], ["Incentive structure in place", "g"], ["Marketing drive for the past month", "g"], ["GM Spending 5 days in kitchen", "g"]]],
    ["FRONT OF HOUSE", "PILOT REPORTING", "Pilot Reporting", [["20 Best and worst seller combined & separate", "g"], ["Wastage at rand value and percentage of turnover", "g"], ["Turnover Comparrison year on year for the month", "g"], ["Previous months food cost", "g"], ["Time sales analysis", "g"], ["Detailed discounts", "g"]]],
    ["FRONT OF HOUSE", "EXTERIOR & DECK AREA", "Exterior & Deck area", [["Cleanliness of car park, walkways, Deck area etc.", "g"], ["Drains clear and grates in place", "g"], ["O/S - furniture & fittings / plant boxes)", "g"], ["Umbrellas / coverings / footstands / awnings", "g"], ["Ashtrays (Sufficient available and cleanliness)", "g"], ["Shop front (walls, doors, frames & O/S floors)", "g"], ["Windows (decals, cleanliness)", "g"], ["Lighting", "g"], ["Store Signage (all interior and exterior)", "g"]]],
    ["FRONT OF HOUSE", "MENU NUMBER & CONDITION", "Menu Count And Condition", [["Main Menu number & condition", "c"], ["Kids Menu number & condition", "c"], ["Wine Menu number & condition", "c"]]],
    ["FRONT OF HOUSE", "RESTAURANT AREA", "Restaurant area", [["All duty sheets and cleaning rosters being followed", "g"], ["Ceilings", "g"], ["Floors & Carpets", "g"], ["Decor / lighting and globes - working and dusted", "g"], ["Walls - paintwork and general appearance", "g"], ["Raised areas and handrails (if applicable)", "g"], ["Skirtings", "g"], ["Cash desk (clean and organised)", "g"], ["Balustrades / glass partitions / decals", "g"], ["Waitron stations  Condiment shelf (organized, clean, well stocked)", "g"], ["Staff uniforms - all departments - Jackson & Black branded - good condition", "g"], ["Plants, plant boxes and wood chips", "g"], ["Tabletops & stable table bases - check paintwork", "g"], ["Table condiment stands (filled and clean)", "g"], ["Table talkers, placemats, wineglasses and table setting", "g"], ["Seating - bench seats (clean, not torn and stable)", "g"], ["Seating - single seats (clean not torn and stable)", "g"], ["Air conditioning - temperature and cleanliness", "g"], ["Accessable plug point in working condition", "g"], ["Correct extraction and ventilation/on and effective", "g"], ["Audio Visual (music system, TV's)", "g"], ["CCTV System - all cameras operational and recording / sufficient coverage", "g"], ["Wifi - speed and ease of access", "g"], ["Kids : colouring in forms and crayons", "g"], ["Baby chairs - cleanliness, safety and availability", "g"], ["Bathroom signage visible", "g", "Bathrooms"], ["Odour, cleanliness and hygiene", "g", "Bathrooms"], ["Stable toilet seats and toilet roll holders", "g", "Bathrooms"], ["Basins clean and taps polished", "g", "Bathrooms"], ["Mirrors polished", "g", "Bathrooms"], ["Hand sanitisers and soap dispensers full", "g", "Bathrooms"], ["Bins emptied", "g", "Bathrooms"], ["Urinals clean and with odour mats", "g", "Bathrooms"], ["Baby changing facilities", "g", "Bathrooms"], ["Hourly bathroom check sheet signed", "g", "Bathrooms"]]],
    ["FRONT OF HOUSE", "SERVICE BAR / COFFEE STATION - TECHNICAL", "Service bar section - Technical", [["Ceilings", "g"], ["Floors", "g"], ["Decor / lighting and globes - working and dusted", "g"], ["Electrical points - safety / cleanliness / working order", "g"], ["Fridges (check seals, temperature, hygiene)", "g"], ["Ice cream machine ready and correctly set", "g"], ["Printer clean and working with backup paper", "g"], ["Handwash basin (plumbing, hygiene)", "g"], ["Bar counter clean", "g"], ["Shelving clean and stocked", "g"], ["Milkshake machine clean and in working order", "g"], ["Coffee machine and grinder clean and in working order", "g"], ["Glassware clean", "g"], ["Dripmats (clean and not sticky)", "g"]]],
    ["FRONT OF HOUSE", "COFFEE STATION - PRODUCTS", "Service bar section - Products", [["Slo Jo Syrups (Vanilla, Chocolate, Bubblegum, Strawberry, Butterscoth)", "g"], ["Peppermint Crisp Topping", "g"], ["Hazelnut", "g"], ["Salted caramel", "g"], ["Ice cream", "g"], ["Whipped cream", "g"], ["Pouring cream", "g"], ["Decaf coffee", "g"], ["Happy Hobo coffee beans", "g"], ["Chai", "g"], ["Rooibos tea", "g"], ["Five roses tea", "g"], ["Hot chocolate", "g"], ["Milk", "g"], ["Almond milk", "g"]]],
    ["FRONT OF HOUSE", "MAIN BAR SECTION - TECHNICAL", "Main bar section - Technical", [["Ceilings - cleanliness and all panels present", "g"], ["Walls - paintwork and cleanliness", "g"], ["Floors - (check under and behind equipment)", "g"], ["Floor mats & drains - clean and odour", "g"], ["Doors and windows - cleanliness", "g"], ["Lighting - all working and diffusers clean", "g"], ["Barmen uniforms - cleanliness and condition", "g"], ["Variety menus available", "g"], ["Foot rails - clean and condition of paintwork", "g"], ["Tables and chairs - sanitized and in good condition", "g"], ["Chest Freezer - clean and all products available", "g"], ["Audio (playlist and music quality)", "g"], ["Visual (cleanliness and correct programming)", "g"], ["Representative branding- on and clean", "g"], ["Cocktail Blenders - good working order", "g"], ["Garnish tray, jigger, strainers, green cutting board, paring knife, muddler, bar spoon, Boston shaker, citrus press", "g"], ["Champagne Stopper", "g"], ["Glassware (all spec, quantity and cleanliness)", "g"], ["Fridges (check seals, hygiene, decals, codensers and cleanliness)", "g"], ["Promo fridges - clean and on display", "g"], ["Ice shaver / crusher", "g"], ["Draught machines - switched on and cooling beers", "g"], ["Draught taps - clean and lighting", "g"], ["Bar printer(paper, back up paper and ribbon)", "g"], ["Bar surfaces (clean and uncluttered)", "g"], ["Speed rails - clean and stocked", "g"], ["Undercounter cleanliness", "g"], ["Bar shelved - stocked and presentable", "g"], ["Bar fridges stocked and presentable", "g"], ["Beer wall (full, neat and clean)", "g"], ["Ice buckets", "g"], ["Drip mats (clean, not sticky)", "g"], ["Ice wells and Ice Scoop(clean not leaking or rusted)", "g"]]],
    ["FRONT OF HOUSE", "MAIN BAR SECTION - PRODUCTS", "Main bar section - Products", [["All spirits as per prep sheet", "g"], ["All beers and ciders as per prep sheet (Inc. Non-acl beers)", "g"], ["All premiums as per prep sheet", "g"], ["All wines as per prep sheet", "g"], ["Cans (200ml) -  various", "g"], ["Bottles (300ml) - various", "g"], ["Tizers", "g"], ["Bos Ice Tea - various", "g"], ["Cordials", "g"], ["Red Bull - all relivant flavours available", "g"], ["Mineral water - La Vie still and sparkling (500ml & 750ml)", "g"], ["Monin syrups (passionfruit, mango, strawberry, grapefruit, mint  and kiwi)", "g"], ["Cocktail garnish (limes, lemons, orange, mint, pineapple, strawberry)", "g"], ["Green Olives", "g"], ["Maraschino cherries", "g"], ["Whipped cream", "g"], ["Tabasco", "g"], ["Glass rimmer", "g"], ["Juice (all available and freshness) Sir Fruit", "g"], ["Freezer - shooters to be stored in the freezer", "g"], ["Cocktail premixes - all variations available", "g"], ["Wine saver pump", "g"], ["Wrapped bio straws", "g"]]],
    ["FRONT OF HOUSE", "PACKAGING", "Packaging", [["Kraft burger boxes", "g"], ["Pizza box med", "g"], ["Kraft salad boxes", "g"], ["Kraft t/a bags", "g"]]],
    ["STORES", "STORE ROOMS", "Store Room", [["Floors clean and mopped", "g"], ["Walls clean", "g"], ["Lighting all working", "g"], ["Shelving clean and no rust", "g"], ["All open products in sealed containers", "g"], ["No chemicals stored with food stuff", "g"]]],
    ["BACK OF HOUSE", "WALK IN FRIDGE", "Walk in Fridge", [["Floor and corners clean", "g"], ["Walls clean", "g"], ["Shelving clean and no rust", "g"], ["All products wrapped or covered", "g"], ["All products within expiry dates", "g"], ["All portions dated", "g"], ["Fridge temp correct (3 - 5 degrees)", "g"], ["Fan and evaporator clean", "g"], ["Fridge door seals intact with emergency exit button", "g"], ["Lights working and clean", "g"]]],
    ["BACK OF HOUSE", "WALK IN FREEZER", "Walk in Freezer", [["Floor and corners clean", "g"], ["Walls clean", "g"], ["Shelving clean and no rust", "g"], ["All products wrapped or covered", "g"], ["All products within expiry dates", "g"], ["All portions dated", "g"], ["Fridge temp correct (MIN -18 degrees)", "g"], ["Fan and evaporator clean", "g"], ["Fridge door seals intact with emergency exit button", "g"], ["Lights working and clean", "g"], ["No ice build up", "g"]]],
    ["BACK OF HOUSE", "KITCHEN SECTION - TECHNICAL", "Kitchen section - Technical", [["Ceilings - Cleanliness and all panels present", "g"], ["Fresh air inlet and extraction working / filters clean", "g"], ["Extraction (canopy, filters, drip trays, lighting & ducting)", "g"], ["Walls - no cracked /chipped tiles or grouting", "g"], ["Floors - no cracked / chipped tiles or grouting", "g"], ["Lighting - all working and diffusers clean", "g"], ["Prep board - being utilized correctly and up to date", "g"], ["Bun toaster (clean and working)", "g"], ["Grill - cleanliness and in working condition", "g"], ["Grill brush in good condition", "g"], ["Electrical points - safety / cleanliness / working order", "g"], ["Proper shelving and storage containers in fridges", "g"], ["Fridges - check seals, temperature, hygiene", "g"], ["Sectional food manual (condtion, updated & in colour)", "g"], ["Scales - portion and bulk scales, clean and maintained", "g"], ["Solid Spoons / Perforated Spoons / tongs / knives / peelers / burger turners / egg rings / grater / etc.", "g"], ["Pans / pots / chip baskets / sieves - clean and in good condition", "g"], ["Pizza oven - correct temperature and in good condition", "g"], ["Basting brushes - nylon", "g"], ["Fryers operational and oil in good condition / oil strained", "g"], ["Chip dump working / heating element / bulb working", "g"], ["Spice shakers - clean and filled", "g"], ["Salamander operational and clean", "g"], ["Spider Skimmers", "g"], ["Sufficient shelving and storage space in all areas", "g"], ["All dressing and sauce containers clean and filled", "g"], ["Temperature gun / flashlight", "g"], ["All relivant crockery - clean and no chips:", "g"], ["Rational oven working and cleaning cycle run", "g"], ["Colour-coded cutting boards & stands (Red, Blue, Green, Yellow, Brown, White)", "g"], ["Colour-coded cutting board chart in sections", "g"], ["Handwash basin (plumbing, hygiene)", "g"]]],
    ["BACK OF HOUSE", "KITCHEN AREA - SCULLERY/ PREP SECTION", "Kitchen area - scullery / prep section", [["Back door / security gate", "g"], ["Stainless steel tables & shelving", "g"], ["Dishwasher (dirties table, inlet, outlet, basin, sprayer)", "g"], ["Drying racks", "g"], ["Plumbing - cleanliness and hygiene", "g"], ["Sinks (demarcated per use - potwash, veg prep, etc.)", "g"], ["Grease trap (sealed and hygienic / odourless) / service regularly", "g"], ["Insect-O-Cutor - on and regularly serviced", "g"], ["Staff facilities - signs, doors, ceilings, lighting, vents, walls, floors, toilets, hygiene", "g"], ["Refuse area (cleanliness and hygiene)", "g"]]],
    ["BACK OF HOUSE", "GRILL SECTION - PRODUCTS", "Grill section - Products", [["Burger pattie 150g", "w"], ["Karan Fillet 200g", "w"], ["Karan Fillet 300g", "w"], ["Karan Fillet 500g", "w"], ["Karan Rib-eye 400g", "w"], ["Karan Rump 200g", "w"], ["Karan Rump 300g", "w"], ["Karan Rump 500g", "w"], ["Karan Sirloin 200g", "w"], ["Karan Sirloin 300g", "w"], ["Karan Sirloin 500g", "w"], ["Karan Tomahawk 750g", "w"], ["Karan T-bone 600g", "w"], ["Bacon Port 30g", "w"], ["Eisbien 800g", "w"], ["Pork Belly Ribs 400g", "w"], ["Avo", "g"], ["Basting", "g"], ["Bearinaise", "g"], ["Butter", "g"], ["Caramelised White Onion", "g"], ["Cheddar slices", "g"], ["Jalapeno Slices", "g"], ["Sliced gherkins", "g"], ["Green Fig", "g"], ["Jackson Aioli", "g"], ["Wings 8 piece (4 Drumlet & 4 Winglet)", "g"], ["Lamb Tails", "g"], ["Mustard Mayo", "g"], ["Mozzerella port 20g", "g"], ["Beef Koftas", "g"], ["Portabelini Mushrooms", "g"], ["Dijon Mustard", "g"], ["Butter Lettuce", "g"], ["Tomatoes", "g"], ["Chopped Chillies", "g"], ["Sriracha Mayo", "g"], ["Cherry Tomatoes", "g"], ["Peppercorns - Black Crushed", "g"], ["Olive Oil", "g"], ["Salt", "g"], ["Six Guns spice", "g"], ["Skilpadjies", "g"], ["Truffle oil", "g"], ["Trio of mustard sauce", "g"], ["Tennessee sauce", "g"], ["Peri-peri sauce", "g"], ["Madgascan Green peppercorn", "g"], ["Rich Cheddar", "g"], ["Creamy Mushroom", "g"], ["Creamy Blue Cheese", "g"], ["Café De Paris Butter", "g"]]],
    ["BACK OF HOUSE", "PIZZA SECTION - PRODUCTS", "Pizza section - Products", [["Bacon portions (60g)", "w"], ["Chicken (100g)", "w"], ["Chipotle Pulled Pork (100g)", "w"], ["Chorizo (45g)", "w"], ["Feta (40g)", "w"], ["Ham portions (45g)", "w"], ["Mozzarella portions (140g)", "w"], ["Salami (45g)", "w"], ["Pizza Bases - Back Up and Proving", "g"], ["Olive Oil", "g"], ["Artichokes", "g"], ["Chopped Garlic", "g"], ["Avo", "g"], ["Origanum", "g"], ["Mushrooms", "g"], ["Olives", "g"], ["Pineapple", "g"], ["Pomodoro", "g"], ["Red Onion", "g"], ["White Onion", "g"], ["Wild Rocket", "g"], ["Rosemary Leaves", "g"], ["Fresh Basil", "g"], ["Pepper Grinder", "g"], ["Salt Grinder", "g"], ["Roasted Red Pepper", "g"], ["Basting", "g"], ["Anchovies", "g"], ["Gluten free bases", "g"], ["Grated Parmasan", "g"], ["Hellman's Mayo", "g"], ["Sweet Chilli Mayo", "g"], ["Peppadews", "g"], ["Capers", "g"], ["Chopped Chilles", "g"], ["Fresh Green Peppers", "g"], ["Banana", "g"], ["Vegan Mozzarella", "n"]]],
    ["BACK OF HOUSE", "CHIPPING & SECTION - PRODUCTS", "Chipping section - Products", [["Chips Blanced-For Service", "g"], ["Chips Cut-Back Up", "g"], ["Onion Rings Cut-Service", "g"], ["Onions Peeled-Back Up", "g"], ["Potato Peeled-Back Up", "g"], ["Salt and pepper flour mix", "g"], ["Salt", "g"], ["Sweet Potato Fries", "g"]]],
    ["BACK OF HOUSE", "PRAWNING SECTION - PRODUCTS", "Prawning section - Products", [["Bacon (150g)", "w"], ["Calamari Rings Port (150g)", "w"], ["Chicken Breast Port (300g)", "w"], ["Chicken Livers Port (150g)", "w"], ["Chorizo Port (20g)", "w"], ["Kingklip Port (200g)", "w"], ["Lamb Kidneys (100g)", "w"], ["Ham (45g)", "w"], ["Mussels Port (250g)", "w"], ["Penne Port (250g)", "w"], ["Pork Belly Port (300g)", "w"], ["Salmon Port (200g)", "w"], ["Tagliatelle Port (250g)", "w"], ["Bechamel sauce", "g"], ["Butter", "g"], ["Chilli - Chopped", "g"], ["Chimmichuri", "g"], ["Cream", "g"], ["Fresh Basil", "g"], ["Garlic - Chopped", "g"], ["Grana Padano", "g"], ["Grated Pecorino", "g"], ["Green Beans", "g"], ["Milk Wash", "g"], ["Napolitana Sauce", "g"], ["Olive Oil", "g"], ["Panko Bread Crumbs", "g"], ["Prawns Port", "g"], ["Snails Port", "g"], ["Spring Onion", "g"], ["White Wine", "g"], ["Halloumi", "g"], ["Hummus (Mediteranean)", "g"], ["Crème Freche", "g"], ["Bitter Ballen", "g"], ["Trinchado Sauce", "g"], ["Tzatziki", "g"], ["Roasted exotic tomatoes", "g"], ["Lemon Wedges (pitted & cores removed)", "g"], ["Baby Jacket potatoes", "g"], ["Rosemary", "g"], ["Diced White Onion", "g"], ["Aromat", "g"], ["Italian Parsley", "g"], ["Button Mushrooms", "g"], ["Bread Crumbs", "g"], ["Garlic Aioli", "g"], ["Veggie Seasoned Flour", "g"], ["Basil Pesto", "g"], ["Arancini Balls", "g"], ["Pork Crackling", "g"], ["Sesame Seeds (Black & White)", "g"], ["Honey Soy Glaze", "g"], ["Tom Yum Coleslaw", "g"], ["Garlic & Parsley Butter", "g"], ["Chicken Spice", "g"], ["Camembert", "g"], ["Fig Preserve", "g"], ["Spicy Caramelized Nuts", "g"], ["Wild Rocket", "g"], ["Cake Flour", "g"], ["Sweet Mustard Mayo", "g"], ["Seafood Seasoned Flour", "g"], ["Tartar Sauce", "g"], ["Sriracha Mayo", "g"], ["Lemon Butter", "g"], ["Garlic Butter", "g"], ["Bearnaise", "g"], ["Creamy Spinach", "g"], ["Butternut", "g"], ["Cider Jus", "g"], ["Butternut Puree", "g"], ["Apple & Tamarind Puree", "g"], ["Chicken Seasoned Flour", "g"], ["Pineapple Rings", "g"], ["Baby Marrow", "g"], ["Aubergine", "g"], ["Mixed Peppers", "g"], ["Olives, Pitted", "g"], ["Italian Sausage", "g"], ["Mascarpone", "g"], ["Fish Sauce", "g"], ["Spinach & Feta Canaloni", "g"]]],
    ["BACK OF HOUSE", "COLD / SALAD SECTION - PRODUCTS", "Cold / Salad section - Products", [["Sundried tomato in oil, chopped", "g"], ["Avo", "g"], ["Chopped Coriander", "g"], ["Mixed Baby Butter Lettuce", "g"], ["Olive Oil", "g"], ["Baby Cos Lettuce", "g"], ["Cherry Tomatoes", "g"], ["Tomatoes", "g"], ["Cucumber", "g"], ["Olives", "g"], ["Pumpkin Seeds", "g"], ["Fig Preserve", "g"], ["Sourdough Bread", "g"], ["Jumbo Burger Rolls", "g"], ["Cream", "g"], ["Grated Pecorino", "g"], ["Fresh Red Onion", "g"], ["Grana Padano Shavings", "g"], ["Edamame Beans", "g"], ["Lime dressing", "g"], ["Homemade Caeser dressing", "g"], ["Wild Rocket", "g"], ["Feta Port", "g"], ["Focaccia Bread", "g"], ["Brown Bread", "g"], ["Sweet Chilli Sauce", "g"], ["Blanched Green Beans", "g"], ["Croutons", "g"], ["Fried Anchovies", "g"], ["Roasted Red Onion", "g"], ["Roasted Garlic", "g"], ["Hummus (Mediteranean)", "g"], ["Tzatziki", "g"], ["Tender Stem Broccoli", "g"], ["Deep Fried Capers", "g"], ["Rosendal Vinegar", "g"], ["Origanum", "g"], ["Toasted Pumkin Seeds", "g"], ["Smoked Salmon", "g"], ["Spring onion", "g"], ["Mixed sesame seeds", "g"], ["Pap & Sauce", "g"], ["Braaibroodjies", "g"], ["Tom Yum Coleslaw", "g"], ["Savoury Rice", "g"], ["Tomatoes", "g"]]],
    ["BACK OF HOUSE", "DESSERT SECTION - PRODUCTS", "Dessert section - Products", [["Crème Brulee", "g"], ["Chocolate Brownie", "g"], ["Mississippi Mud Pie", "g"], ["Baked cheesecake", "g"], ["Strawberries", "g"], ["Amarula Malva Pudding", "g"], ["Mini Marshmallows", "g"], ["Maple syrup", "g"], ["Ice Cream", "g"], ["Salted Caramel", "g"], ["Peanut brittle", "g"], ["Chocolate sauce", "g"], ["Castor sugar", "g"], ["Custard", "g"], ["Belgium Waffles", "g"], ["Gelato (Chocolate & Vanilla)", "g"], ["Nutella", "g"], ["Whipped Cream", "g"], ["Candied nuts", "g"], ["Fresh Mint", "g"], ["Peppermint Crisp Topping", "g"], ["Caramel Popcorn", "g"]]],
    ["BACK OF HOUSE", "HYGEINE STANDARDS AND EQUIPMENT", "Hygeine standards and equipment", [["Wringer buckets - codition and cleanliness", "g"], ["Colour coded hygeine buckets and cloths", "g"], ["Colour coded Brooms and Mops", "g"], ["Chemical spray bottles", "g"], ["Hand sanitizer and anti-bacterial soap", "g"], ["Dustbins", "g"], ["Sectional colour coding being followed", "g"]]],
    ["BACK OF HOUSE", "MEAT AGING AND RECEIVING", "Meat Aging", [["Quality of meat cuts", "g"], ["Correct ageing of bulk meats", "g"], ["Correct use of meat ageing register", "g"], ["Correct use of meat receiving register", "g"], ["Correct quantities of bulk meat available", "g"], ["Fridges - check seals, temperature, hygiene, cleanliness", "g"]]]
  ];
  const SECS = RAW.map((r, si) => ({
    id: "s" + si,
    area: r[0],
    title: r[1],
    label: r[2],
    items: r[3].map((it, ii) => ({ id: "s" + si + "i" + ii, text: it[0], t: it[1], sg: it[2] || "" }))
  }));
  const TOTAL = SECS.reduce((n, s) => n + s.items.length, 0);
  const AREAS = ["FRONT OF HOUSE", "STORES", "BACK OF HOUSE"];
  const DETAILS = [["ldate", "Letter date (blank = today)"], ["name", "Restaurant name & location"], ["addr", "Store address (one line per row)"], ["owner", "Restaurant owner"], ["att", "Attention (owners, as on the letter)"], ["dear", "Greeting names (Dear ...)"], ["team", "Management team"], ["when", "Date & time"], ["last", "Last grading"], ["this", "This grading"], ["food", "Foodcost %"], ["sig", "Letter signed by"], ["org", "Signer's company"]];
  const DETAIL_HINT = { ldate: "e.g. 16 September 2026", addr: "Street\nTown\nPostal code", att: "Defaults to Restaurant owner", dear: "e.g. Jopie, Tercia (Management Team is added)", sig: "Roscoe Sanders", org: "Bossa Group" };
  function cmR(v, id) {
    const c = v[id + ":c"] || "";
    return v[id + ":r"] ? (c ? c + " " : "") + "(Repeat)" : c;
  }
  const AUTO_C = ["Poor hygiene standards", "Poor building standards (excessive R&M)", "Poor state of equipment", "Non use of licensed/recommended products", "Off (unservable) diversified or unavailable products", "Non-conformance to operational requirements", "Non rectification of previous/outstanding points & reply on H/O letter", "Altering/non conformance to franchise recipes"];
  const NONCON = ["1. CONDITION OF EQUIPMENT", "2. NON-USE OF LICENCED / RECOMMENDED PRODUCTS", "3. OFF (UNSERVABLE) DIVERSIFIED OR UNAVAILABLE PRODUCTS", "4. NON-CONFORMANCE TO OPERATIONAL REQUIREMENTS", "5. NON-RECTIFICATION OF PREVIOUS / OUTSTANDING POINTS & REPLY ON H/O LETTER", "6. ALTERING / NON-CONFORMANCE TO FRANCHISE RECIPES"];
  const SIGN = [["at", "Signed at"], ["fr", "For & on behalf of Franchisor"], ["frn", "Full name (Franchisor)"], ["sr", "Snr. Store Representative"], ["srn", "Full name (Store Representative)"]];
  const KEY = "qhrm-checklist-jb-paarl-v1";
  const DEFAULTS = {};
  const STORES = [
    { id: "strand", label: "Jackson & Black Strand", short: "Strand", file: "Strand", d: { name: "Jackson & Black Strand", addr: "Ocean Breeze Hotel & Conference Centre\n17-19 Beach Road\nStrand\n7130", owner: "Jopie & Tercia Kuhn", att: "Jopie & Tercia Kuhn", dear: "Jopie, Tercia", team: "Marius & Christal", last: "B" } },
    { id: "tyger", label: "Jackson & Black Tyger Valley", short: "Tyger Valley", file: "TygerValley", d: { name: "Jackson & Black Tygervalley", addr: "Cnr Bill Bezuidenhout & Sportica Crescent\nBellville\nTygervalley\n7530", owner: "Rudi & Monica", att: "Rudi & Monica", dear: "Rudi, Monica", last: "B" } },
    { id: "paarl", label: "Jackson & Black Paarl", short: "Paarl", file: "Paarl", d: { name: "Jackson & Black Paarl", addr: "40 Main Street\nPaarl\n7646" } }
  ];
  const PROFILE_F = ["name", "addr", "owner", "att", "dear", "team", "last"];
  const PKEY = "qhrm-store-profiles-v1";
  const DKEY = "qhrm-draft-v1-";
  function storeOf(id) {
    for (const s of STORES) if (s.id === id) return s;
    return null;
  }
  function readJson(k) {
    try {
      const r = window.localStorage.getItem(k);
      return r ? JSON.parse(r) : null;
    } catch (e) {
      return null;
    }
  }
  function storeDetails(id, useSaved) {
    const s = storeOf(id);
    const prof = useSaved ? readJson(PKEY) || {} : {};
    const p = prof[id];
    const out = {};
    for (const f of PROFILE_F) {
      const x = p && typeof p[f] === "string" ? p[f] : s ? s.d[f] || "" : "";
      if (x) out["d:" + f] = x;
    }
    return out;
  }
  function entryCount(v) {
    return Object.keys(v).filter((k) => k.indexOf("d:") !== 0 && !!v[k]).length;
  }
  function two(n) {
    return ("0" + n).slice(-2);
  }
  const BKEY = "qhrm-last-backup-v1";
  const XKEY = "qhrm-dirty-v1";
  const REMIND_N = 12;
  const REMIND_MS = 15 * 60 * 1e3;
  function loadLastBk() {
    const o = readJson(BKEY);
    const out = {};
    if (o) for (const k of Object.keys(o)) {
      const x = o[k];
      if (typeof x === "number") out[k] = x;
    }
    return out;
  }
  function fmtWhen(ts) {
    const d = new Date(ts);
    const now = /* @__PURE__ */ new Date();
    const hm = two(d.getHours()) + ":" + two(d.getMinutes());
    if (d.toDateString() === now.toDateString()) return hm;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + (d.getFullYear() !== now.getFullYear() ? " " + d.getFullYear() : "") + " " + hm;
  }
  function isoDay(v) {
    const w = v["d:when"] || "";
    const m = w.match(/\d{4}-\d{2}-\d{2}/);
    if (m) return m[0];
    let t = new Date(w.replace(/(\d)(st|nd|rd|th)\b/g, "$1"));
    if (!w || isNaN(t.getTime())) t = /* @__PURE__ */ new Date();
    return t.getFullYear() + "-" + two(t.getMonth() + 1) + "-" + two(t.getDate());
  }
  function storeFile(v) {
    const s = storeOf(v["d:store"] || "");
    if (s) return s.file;
    const n = (v["d:name"] || "").replace(/jackson\s*(&|and)\s*black/i, "").replace(/[^0-9A-Za-z]+/g, "");
    return n || "Store";
  }
  const GL = { A: "A", B: "B", C: "C", NA: "N/A" };
  function loadInitial() {
    try {
      const raw = window.localStorage.getItem(KEY);
      const v = raw ? migrate(JSON.parse(raw)) : { ...DEFAULTS };
      try {
        window.localStorage.setItem(KEY + "-probe", "1");
        window.localStorage.removeItem(KEY + "-probe");
      } catch (e2) {
        return { vals: v, ok: false };
      }
      return { vals: v, ok: true };
    } catch (e) {
      return { vals: { ...DEFAULTS }, ok: false };
    }
  }
  const WITEMS = SECS.reduce((a, s) => a.concat(s.items.filter((it) => it.t === "w")), []);
  function migrate(src) {
    const v = { ...src };
    for (const it of WITEMS) {
      const old = v[it.id + ":w"];
      if (old !== void 0) {
        if (old && !v[it.id + ":w1"]) v[it.id + ":w1"] = old;
        delete v[it.id + ":w"];
      }
      const g = v[it.id + ":g"];
      if (g) {
        const c = v[it.id + ":c"] || "";
        v[it.id + ":c"] = (c ? c + " " : "") + "[Earlier grade: " + (GL[g] || g) + "]";
        delete v[it.id + ":g"];
      }
    }
    return v;
  }
  function specOf(text) {
    const m = text.match(/(\d+(?:[.,]\d+)?)\s*g\b/gi);
    return m ? m[m.length - 1].replace(/\s+/g, "").toLowerCase() : "";
  }
  function wNum(s) {
    const m = (s || "").replace(",", ".").match(/-?\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }
  function wAvg(v, id) {
    const ns = [1, 2, 3].map((i) => wNum(v[id + ":w" + i] || "")).filter((n) => n !== null);
    if (!ns.length) return "";
    const a = ns.reduce((x, y) => x + y, 0) / ns.length;
    return (Math.round(a * 10) / 10).toString() + (ns.length < 3 ? " (" + ns.length + " of 3)" : "");
  }
  function isDone(it, v) {
    if (it.t === "w") return !!v[it.id + ":w1"] && !!v[it.id + ":w2"] && !!v[it.id + ":w3"];
    if (v[it.id + ":g"]) return true;
    if (it.t === "c") return !!v[it.id + ":n"];
    return false;
  }
  function stats(items, v) {
    const s = { done: 0, total: items.length, A: 0, B: 0, C: 0, NA: 0 };
    for (const it of items) {
      if (isDone(it, v)) s.done++;
      const g = v[it.id + ":g"];
      if (g === "A") s.A++;
      else if (g === "B") s.B++;
      else if (g === "C") s.C++;
      else if (g === "NA") s.NA++;
    }
    return s;
  }
  function q(s) {
    return '"' + (s || "").replace(/"/g, '""') + '"';
  }
  const DB_NAME = "qhrm-photos-jb-paarl";
  const PSTORE = "photos";
  const KEYLABEL = {};
  const KEYORDER = [];
  SECS.forEach((s) => {
    s.items.forEach((it) => {
      KEYLABEL[it.id] = s.title + " - " + it.text;
      KEYORDER.push(it.id);
    });
    KEYLABEL["sec:" + s.id] = s.title + " - additional comments";
    KEYORDER.push("sec:" + s.id);
  });
  function openDb() {
    return new Promise((resolve, reject) => {
      try {
        const req = window.indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(PSTORE)) db.createObjectStore(PSTORE, { keyPath: "id" });
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        req.onblocked = () => reject(new Error("blocked"));
      } catch (e) {
        reject(e);
      }
    });
  }
  function idbTx(db, fn) {
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(PSTORE, "readwrite");
        fn(tx.objectStore(PSTORE));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      } catch (e) {
        reject(e);
      }
    });
  }
  function idbAll(db) {
    return new Promise((resolve, reject) => {
      try {
        const req = db.transaction(PSTORE, "readonly").objectStore(PSTORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      } catch (e) {
        reject(e);
      }
    });
  }
  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => resolve({ img, url });
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("unreadable"));
      };
      img.src = url;
    });
  }
  function shrink(img, max, quality) {
    const w0 = img.naturalWidth || img.width;
    const h0 = img.naturalHeight || img.height;
    const s = Math.min(1, max / Math.max(w0, h0));
    const cv = document.createElement("canvas");
    cv.width = Math.max(1, Math.round(w0 * s));
    cv.height = Math.max(1, Math.round(h0 * s));
    const ctx = cv.getContext("2d");
    if (!ctx) throw new Error("no canvas");
    ctx.drawImage(img, 0, 0, cv.width, cv.height);
    return cv.toDataURL("image/jpeg", quality);
  }
  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  function esc(s) {
    return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function secOfKey(k) {
    return k.indexOf("sec:") === 0 ? k.slice(4) : k.slice(0, k.indexOf("i"));
  }
  const REPORT_CSS = "body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:820px;margin:24px auto;padding:0 16px;line-height:1.4}h1{font-size:22px}h2{font-size:18px;margin-top:28px;border-bottom:1px solid currentColor;padding-bottom:4px}h3{font-size:15px;margin:20px 0 6px}.m{opacity:.65;font-weight:normal;font-size:13px}.kv th{text-align:left;padding:2px 12px 2px 0;font-weight:600;vertical-align:top}.f{padding:8px 0;border-top:1px dotted currentColor;page-break-inside:avoid}.c{margin-top:4px;white-space:pre-wrap}.g{display:inline-block;min-width:22px;text-align:center;border-radius:4px;font-weight:700;padding:0 4px;border:1.5px solid currentColor}.gC{border-width:3px}.ph{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}.ph img{width:calc(50% - 4px);max-width:380px;height:auto;border-radius:6px}.wt{border-collapse:collapse;width:100%;font-size:14px}.wt th,.wt td{text-align:left;padding:4px 6px;border-bottom:1px solid currentColor}.wt th{opacity:.7}@media print{body{margin:0}}";
  function buildReport(v, byKey) {
    const st = stats(SECS.reduce((a, s) => a.concat(s.items), []), v);
    const imgs = (k) => {
      const ps = byKey[k] || [];
      return ps.length ? '<div class="ph">' + ps.map((p) => '<img src="' + p.full + '" alt="">').join("") + "</div>" : "";
    };
    const used = {};
    const H = [];
    H.push('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>QHRM findings - ' + esc(v["d:name"] || "") + "</title><style>" + REPORT_CSS + "</style></head><body>");
    H.push('<h1>QHRM Inspection - Findings report</h1><table class="kv">');
    for (const [k, lab] of DETAILS) H.push("<tr><th>" + esc(lab) + "</th><td>" + esc(v["d:" + k] || "") + "</td></tr>");
    H.push("</table>");
    H.push("<p>Progress: " + st.done + "/" + TOTAL + " &middot; A " + st.A + " &middot; B " + st.B + " &middot; C " + st.C + " &middot; N/A " + st.NA + "<br>Overall grading (inspector): <b>" + esc(v["ov"] || "-") + "</b></p>");
    if (v["ovn"]) H.push('<p class="c">' + esc(v["ovn"]) + "</p>");
    H.push("<h2>Findings (B &amp; C)</h2>");
    let any = false;
    for (const s of SECS) {
      const f = s.items.filter((it) => v[it.id + ":g"] === "B" || v[it.id + ":g"] === "C");
      const sk = "sec:" + s.id;
      const sn = v["sn:" + s.id];
      const sg = v["sg:" + s.id];
      const sp = (byKey[sk] || []).length;
      if (!f.length && !sn && !sp && sg !== "B" && sg !== "C") continue;
      any = true;
      H.push("<h3>" + esc(s.title) + ' <span class="m">' + esc(s.area) + " &middot; section grade " + esc(sg || "-") + "</span></h3>");
      for (const it of f) {
        used[it.id] = true;
        const g = v[it.id + ":g"];
        H.push('<div class="f"><span class="g g' + g + '">' + g + "</span> " + esc(it.text) + (cmR(v, it.id) ? '<div class="c">' + esc(cmR(v, it.id)) + "</div>" : "") + imgs(it.id) + "</div>");
      }
      if (sn || sp) {
        used[sk] = true;
        H.push('<div class="f"><b>Additional comments</b>' + (sn ? '<div class="c">' + esc(sn) + "</div>" : "") + imgs(sk) + "</div>");
      }
    }
    if (!any) H.push("<p>No B or C grades recorded.</p>");
    const wsecs = SECS.filter((s) => s.items.some((it) => it.t === "w" && (v[it.id + ":w1"] || v[it.id + ":w2"] || v[it.id + ":w3"] || v[it.id + ":c"] || (byKey[it.id] || []).length)));
    if (wsecs.length) {
      H.push('<h2>Portion weights (g)</h2><p class="m">Three weighings per line; the average is plain arithmetic. Spec is the weight in the item name; the sheet gives no tolerance, so no pass/fail is applied.</p>');
      for (const s of wsecs) {
        H.push("<h3>" + esc(s.title) + '</h3><table class="wt"><tr><th>Item</th><th>Spec</th><th>W1</th><th>W2</th><th>W3</th><th>Avg</th></tr>');
        const extra = [];
        for (const it of s.items) {
          if (it.t !== "w") continue;
          H.push("<tr><td>" + esc(it.text) + "</td><td>" + esc(specOf(it.text) || "-") + "</td>" + [1, 2, 3].map((i) => "<td>" + esc(v[it.id + ":w" + i] || "-") + "</td>").join("") + "<td><b>" + esc(wAvg(v, it.id) || "-") + "</b></td></tr>");
          if (v[it.id + ":c"] || (byKey[it.id] || []).length) {
            used[it.id] = true;
            extra.push('<div class="f"><b>' + esc(it.text) + "</b>" + (cmR(v, it.id) ? '<div class="c">' + esc(cmR(v, it.id)) + "</div>" : "") + imgs(it.id) + "</div>");
          }
        }
        H.push("</table>" + extra.join(""));
      }
    }
    const ncRows = NONCON.map((n, i) => v["nc" + i + ":g"] || v["nc" + i + ":c"] ? "<tr><th>" + esc(n) + "</th><td>" + esc(v["nc" + i + ":g"] || "-") + (v["nc" + i + ":c"] ? " - " + esc(v["nc" + i + ":c"]) : "") + "</td></tr>" : "").join("");
    if (ncRows) H.push('<h2>Non-conformance</h2><table class="kv">' + ncRows + "</table>");
    const other = KEYORDER.filter((k) => !used[k] && (byKey[k] || []).length > 0);
    if (other.length) {
      H.push("<h2>Other photo evidence</h2>");
      for (const k of other) H.push('<div class="f">' + esc(KEYLABEL[k] || k) + (v[k + ":g"] ? ' <span class="m">grade ' + esc(GL[v[k + ":g"]] || "") + "</span>" : "") + (cmR(v, k) ? '<div class="c">' + esc(cmR(v, k)) + "</div>" : "") + imgs(k) + "</div>");
    }
    H.push('<h2>Sign-off</h2><table class="kv">' + SIGN.map(([k, lab]) => "<tr><th>" + esc(lab) + "</th><td>" + esc(v["x:" + k] || "") + "</td></tr>").join("") + "</table>");
    H.push('<p class="m">Generated ' + esc((/* @__PURE__ */ new Date()).toLocaleString()) + "</p></body></html>");
    return H.join("\n");
  }
  function buildFindings(v, pc = {}) {
    const all = stats(SECS.reduce((a, s) => a.concat(s.items), []), v);
    const L = ["QHRM INSPECTION - FINDINGS (B / C)"];
    for (const [k, lab] of DETAILS) L.push(lab + ": " + (v["d:" + k] || ""));
    L.push("Progress: " + all.done + "/" + TOTAL + " | A " + all.A + " | B " + all.B + " | C " + all.C + " | N/A " + all.NA);
    L.push("Overall grading (inspector): " + (v["ov"] || "-"));
    if (v["ovn"]) L.push("Comments on operational standards: " + v["ovn"]);
    for (const s of SECS) {
      const f = s.items.filter((it) => v[it.id + ":g"] === "B" || v[it.id + ":g"] === "C");
      const sg = v["sg:" + s.id];
      const sn = v["sn:" + s.id];
      if (!f.length && sg !== "B" && sg !== "C" && !sn && !pc["sec:" + s.id]) continue;
      L.push("");
      L.push("== " + s.title + " (" + s.area + ") - section grade: " + (sg || "-") + " ==");
      for (const it of f) {
        let extra = "";
        if (pc[it.id]) extra += " [" + pc[it.id] + " photo" + (pc[it.id] > 1 ? "s" : "") + "]";
        L.push("[" + v[it.id + ":g"] + "] " + it.text + extra + (cmR(v, it.id) ? " - " + cmR(v, it.id) : ""));
      }
      const spc = pc["sec:" + s.id] || 0;
      if (sn || spc) L.push("Additional comments: " + (sn || "") + (spc ? " [" + spc + " photo" + (spc > 1 ? "s" : "") + "]" : ""));
    }
    const wsecs = SECS.filter((s) => s.items.some((it) => it.t === "w" && (v[it.id + ":w1"] || v[it.id + ":w2"] || v[it.id + ":w3"] || v[it.id + ":c"] || pc[it.id])));
    if (wsecs.length) {
      L.push("");
      L.push("== PORTION WEIGHTS (g; 3 weighings, average is arithmetic only) ==");
      for (const s of wsecs) {
        L.push(s.title + ":");
        for (const it of s.items) {
          if (it.t !== "w") continue;
          const ws = [1, 2, 3].map((i) => v[it.id + ":w" + i] || "-").join(" / ");
          const sp = specOf(it.text);
          L.push("  " + it.text + ": " + ws + " | avg " + (wAvg(v, it.id) || "-") + (sp ? " | spec " + sp : "") + (pc[it.id] ? " [" + pc[it.id] + " photo" + (pc[it.id] > 1 ? "s" : "") + "]" : "") + (cmR(v, it.id) ? " - " + cmR(v, it.id) : ""));
        }
      }
    }
    const nc = NONCON.filter((n, i) => v["nc" + i + ":g"] || v["nc" + i + ":c"]);
    if (nc.length) {
      L.push("");
      L.push("== NON-CONFORMANCE ==");
      NONCON.forEach((n, i) => {
        if (v["nc" + i + ":g"] || v["nc" + i + ":c"]) L.push(n + ": " + (v["nc" + i + ":g"] || "-") + (v["nc" + i + ":c"] ? " - " + v["nc" + i + ":c"] : ""));
      });
    }
    return L.join("\n");
  }
  function buildCsv(v, pc = {}) {
    const L = [["Area", "Section", "Subgroup", "Item", "Type", "Grade", "Spec weight", "Weight 1", "Weight 2", "Weight 3", "Average weight (g)", "Count", "Par lev", "Top-up", "Comment", "Photos"].map(q).join(",")];
    const row = (a, b, c, d, ty, g, cm, ph) => [a, b, c, d, ty, g, "", "", "", "", "", "", "", "", cm, ph].map(q).join(",");
    for (const [k, lab] of DETAILS) L.push(row("STORE DETAILS", "", "", lab, "detail", "", v["d:" + k] || "", ""));
    const TY = { g: "A/B/C", w: "3 portion weights (no grade)", c: "count/par/top-up", n: "no boxes on paper" };
    for (const s of SECS) {
      for (const it of s.items) {
        const isW = it.t === "w";
        L.push([s.area, s.title, it.sg, it.text, TY[it.t], isW ? "" : GL[v[it.id + ":g"]] || "", isW ? specOf(it.text) : "", v[it.id + ":w1"] || "", v[it.id + ":w2"] || "", v[it.id + ":w3"] || "", isW ? wAvg(v, it.id) : "", v[it.id + ":n"] || "", v[it.id + ":p"] || "", v[it.id + ":u"] || "", cmR(v, it.id), String(pc[it.id] || 0)].map(q).join(","));
      }
      L.push(row(s.area, s.title, "", "SECTION GRADE", "section", v["sg:" + s.id] || "", v["sn:" + s.id] || "", String(pc["sec:" + s.id] || 0)));
    }
    L.push(row("OVERALL", "", "", "OVERALL GRADING: Store Operational Standards", "overall", v["ov"] || "", v["ovn"] || "", ""));
    NONCON.forEach((n, i) => L.push(row("NON-CONFORMANCE", "", "", n, "non-conformance", v["nc" + i + ":g"] || "", v["nc" + i + ":c"] || "", "")));
    for (const [k, lab] of SIGN) L.push(row("SIGN-OFF", "", "", lab, "detail", "", v["x:" + k] || "", ""));
    return L.join("\r\n");
  }
  function GradeRow(props) {
    const th = useGrokTheme();
    const opts = props.na ? ["A", "B", "C", "NA"] : ["A", "B", "C"];
    return /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, opts.map((g) => {
      const sel = props.value === g;
      const bg = g === "A" ? th.fill.successSubtle : g === "B" ? th.fill.warningSubtle : g === "C" ? th.fill.dangerSubtle : th.fill.secondary;
      const fg = g === "A" ? th.text.success : g === "B" ? th.text.warning : g === "C" ? th.text.danger : th.text.primary;
      const st = {
        flex: "1 1 52px",
        minHeight: 46,
        borderRadius: th.radius.md,
        cursor: "pointer",
        padding: "0 8px",
        border: "1px solid " + (sel ? fg : th.border.default),
        background: sel ? bg : "transparent",
        color: sel ? fg : th.text.secondary,
        fontFamily: th.font.family,
        fontSize: 17,
        fontWeight: sel ? th.weight.semibold : th.weight.medium
      };
      return /* @__PURE__ */ h("button", { key: g, type: "button", style: st, onClick: () => props.onPick(sel ? "" : g) }, GL[g]);
    }));
  }
  function NoteBox(props) {
    const th = useGrokTheme();
    return /* @__PURE__ */ h(
      "textarea",
      {
        value: props.value,
        placeholder: props.placeholder,
        rows: 2,
        onInput: (e) => props.onChange(e.target.value),
        style: { width: "100%", boxSizing: "border-box", marginTop: 8, minHeight: 60, padding: 10, fontSize: 16, fontFamily: th.font.family, color: th.text.primary, background: th.bg.base, border: "1px solid " + th.border.default, borderRadius: th.radius.md, resize: "vertical" }
      }
    );
  }
  function SmallField(props) {
    const th = useGrokTheme();
    return /* @__PURE__ */ h("label", { style: { display: "flex", flexDirection: "column", gap: 4, flex: "1 1 90px", fontSize: 13, color: th.text.secondary, fontFamily: th.font.family } }, props.label, /* @__PURE__ */ h(
      "input",
      {
        value: props.value,
        placeholder: props.placeholder,
        inputMode: "decimal",
        onInput: (e) => props.onChange(e.target.value),
        style: { minHeight: 42, padding: "0 10px", fontSize: 16, fontFamily: th.font.family, color: th.text.primary, background: th.bg.base, border: "1px solid " + th.border.default, borderRadius: th.radius.md, boxSizing: "border-box", width: "100%" }
      }
    ));
  }
  function ProgressBar(props) {
    const th = useGrokTheme();
    const t = props.s.total || 1;
    const seg = (n, c) => /* @__PURE__ */ h("div", { style: { width: n / t * 100 + "%", background: c } });
    return /* @__PURE__ */ h("div", { style: { display: "flex", height: 6, borderRadius: 3, overflow: "hidden", background: th.fill.secondary, marginTop: 6 } }, seg(props.s.A, th.text.success), seg(props.s.B, th.text.warning), seg(props.s.C, th.text.danger), seg(props.s.done - props.s.A - props.s.B - props.s.C, th.dataviz.other));
  }
  function App() {
    const th = useGrokTheme();
    const init = useMemo(() => loadInitial(), []);
    const [vals, setVals] = useState(init.vals);
    const [ok, setOk] = useState(init.ok);
    const [savedAt, setSavedAt] = useState("");
    const [open, setOpen] = useState({});
    const [notes, setNotes] = useState({});
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const [exportText, setExportText] = useState("");
    const [restore, setRestore] = useState("");
    const [arm, setArm] = useState(false);
    const [allPhotos, setPhotos] = useState([]);
    const [swArm, setSwArm] = useState("");
    const [rsArm, setRsArm] = useState(false);
    const [smsg, setSmsg] = useState("");
    const cur = vals["d:store"] || "";
    const curS = storeOf(cur);
    const photos = useMemo(() => allPhotos.filter((p) => (p.st || "") === cur), [allPhotos, cur]);
    const allRef = useRef([]);
    allRef.current = allPhotos;
    const [pstat, setPstat] = useState("checking");
    const [busy, setBusy] = useState("");
    const [pmsg, setPmsg] = useState("");
    const [view, setView] = useState(null);
    const [delArm, setDelArm] = useState(false);
    const dbRef = useRef(null);
    const pending = useRef("");
    const camRef = useRef(null);
    const galRef = useRef(null);
    const fileRef = useRef(null);
    const [lastBk, setLastBk] = useState(loadLastBk);
    const x0 = useMemo(() => {
      const o = readJson(XKEY);
      return o && typeof o === "object" ? o : {};
    }, []);
    const [dirty, setDirty] = useState(x0.dirty || {});
    const [dism, setDism] = useState(x0.dism || {});
    useEffect(() => {
      try {
        window.localStorage.setItem(XKEY, JSON.stringify({ dirty, dism }));
      } catch (e) {
      }
    }, [dirty, dism]);
    const [persist, setPersist] = useState("checking");
    const askedRef = useRef(false);
    const ask = () => {
      askPersist().then((r) => setPersist(r));
    };
    useEffect(() => {
      ask();
    }, []);
    const [upd, setUpd] = useState(false);
    const [inst, setInst] = useState(null);
    useEffect(() => {
      const onUpd = () => setUpd(true);
      const onInst = (e) => {
        e.preventDefault();
        setInst(e);
      };
      window.addEventListener("qhrm-update", onUpd);
      window.addEventListener("beforeinstallprompt", onInst);
      if (window.__qhrmUpdate) setUpd(true);
      return () => {
        window.removeEventListener("qhrm-update", onUpd);
        window.removeEventListener("beforeinstallprompt", onInst);
      };
    }, []);
    const [now, setNow] = useState(Date.now());
    const [bkMsg, setBkMsg] = useState("");
    const curRef = useRef("");
    curRef.current = cur;
    useEffect(() => {
      const t = window.setInterval(() => setNow(Date.now()), 3e4);
      return () => window.clearInterval(t);
    }, []);
    const markDirty = (k, st) => {
      const sk = (st === void 0 ? curRef.current : st) || "_";
      setDirty((prev) => {
        const d = prev[sk];
        if (d && d.n.indexOf(k) >= 0) return prev;
        return { ...prev, [sk]: { n: d ? d.n.concat(k) : [k], first: d && d.n.length ? d.first : Date.now() } };
      });
    };
    const clearDirty = (sk) => {
      setDirty((prev) => {
        if (!prev[sk]) return prev;
        const n = { ...prev };
        delete n[sk];
        return n;
      });
      setDism((prev) => {
        if (!prev[sk]) return prev;
        const n = { ...prev };
        delete n[sk];
        return n;
      });
    };
    const saveLastBk = (m) => {
      setLastBk(m);
      try {
        window.localStorage.setItem(BKEY, JSON.stringify(m));
      } catch (e) {
        setOk(false);
      }
    };
    useEffect(() => {
      let done = false;
      const fail = () => {
        if (done) return;
        done = true;
        dbRef.current = null;
        setPstat("memory");
      };
      const timer = window.setTimeout(fail, 4e3);
      const run = async () => {
        try {
          if (!window.indexedDB) throw new Error("no idb");
          const db = await openDb();
          const probe = "__probe_" + newId();
          await idbTx(db, (st) => {
            st.put({ id: probe, key: "", full: "", thumb: "", ts: 0 });
          });
          await idbTx(db, (st) => {
            st.delete(probe);
          });
          const list = await idbAll(db);
          if (done) return;
          done = true;
          window.clearTimeout(timer);
          dbRef.current = db;
          list.sort((a, b) => a.ts - b.ts);
          setPhotos(list.filter((p) => !!p.key));
          setPstat("ok");
        } catch (e) {
          window.clearTimeout(timer);
          fail();
        }
      };
      run();
      return () => window.clearTimeout(timer);
    }, []);
    const byKey = useMemo(() => {
      const m = {};
      for (const p of photos) {
        if (!m[p.key]) m[p.key] = [];
        m[p.key].push(p);
      }
      return m;
    }, [photos]);
    const pc = useMemo(() => {
      const m = {};
      for (const k of Object.keys(byKey)) m[k] = byKey[k].length;
      return m;
    }, [byKey]);
    const secPc = useMemo(() => {
      const m = {};
      for (const p of photos) {
        const s = secOfKey(p.key);
        m[s] = (m[s] || 0) + 1;
      }
      return m;
    }, [photos]);
    const pBytes = useMemo(() => photos.reduce((n, p) => n + p.full.length + p.thumb.length, 0) * 0.75, [photos]);
    const flash = (s) => {
      setPmsg(s);
      window.setTimeout(() => setPmsg(""), 6e3);
    };
    const pick = (key, cam) => {
      pending.current = key;
      const el = cam ? camRef.current : galRef.current;
      if (el) {
        el.value = "";
        el.click();
      }
    };
    const onFiles = async (e) => {
      const key = pending.current;
      const files = e.target.files ? Array.from(e.target.files) : [];
      e.target.value = "";
      if (!key || !files.length) return;
      const added = [];
      let bad = 0;
      for (let i = 0; i < files.length; i++) {
        setBusy("Processing photo " + (i + 1) + " of " + files.length + "…");
        try {
          const r = await loadImage(files[i]);
          const full = shrink(r.img, 1280, 0.7);
          const thumb = shrink(r.img, 240, 0.6);
          URL.revokeObjectURL(r.url);
          added.push({ id: newId(), key, full, thumb, ts: Date.now() + i, st: cur });
        } catch (err) {
          bad++;
        }
      }
      let saved = dbRef.current !== null;
      const db = dbRef.current;
      if (db && added.length) {
        try {
          await idbTx(db, (st) => {
            added.forEach((p) => st.put(p));
          });
        } catch (err) {
          saved = false;
          dbRef.current = null;
          setPstat("memory");
        }
      }
      setPhotos((prev) => prev.concat(added));
      added.forEach((p) => markDirty("p:" + p.id, cur));
      setBusy("");
      const n = added.length;
      flash((n ? n + " photo" + (n > 1 ? "s" : "") + (saved ? " saved on this device" : " added but NOT saved on this device (storage full or blocked)") : "No photo added") + (bad ? "; " + bad + " file(s) could not be read" : "") + ".");
    };
    const delPhoto = async (p) => {
      const db = dbRef.current;
      if (db) {
        try {
          await idbTx(db, (st) => {
            st.delete(p.id);
          });
        } catch (err) {
          setPstat("memory");
          flash("Could not delete the photo from device storage.");
        }
      }
      setPhotos((prev) => prev.filter((x) => x.id !== p.id));
      markDirty("pd:" + p.id);
    };
    const replacePhotos = async (list, st = cur) => {
      const tagged = list.map((p) => ({ ...p, st }));
      const gone = allRef.current.filter((p) => (p.st || "") === st);
      const keep = allRef.current.filter((p) => (p.st || "") !== st);
      allRef.current = keep.concat(tagged);
      setPhotos(keep.concat(tagged));
      setView(null);
      const db = dbRef.current;
      if (!db) return list.length === 0;
      try {
        await idbTx(db, (s2) => {
          gone.forEach((p) => s2.delete(p.id));
          tagged.forEach((p) => s2.put(p));
        });
        return true;
      } catch (err) {
        dbRef.current = null;
        setPstat("memory");
        return false;
      }
    };
    const retag = async (from, to) => {
      const moved = allRef.current.filter((p) => (p.st || "") === from).map((p) => ({ ...p, st: to }));
      if (!moved.length) return;
      const ids = moved.map((p) => p.id);
      const next = allRef.current.map((p) => ids.indexOf(p.id) >= 0 ? { ...p, st: to } : p);
      allRef.current = next;
      setPhotos(next);
      const db = dbRef.current;
      if (db) {
        try {
          await idbTx(db, (s2) => {
            moved.forEach((p) => s2.put(p));
          });
        } catch (err) {
          setPstat("memory");
          flash("Could not update photo storage on this device.");
        }
      }
    };
    const sLabel = (id) => {
      const s = storeOf(id);
      return s ? s.label : "no store";
    };
    const parkCurrent = () => {
      if (!cur) return true;
      try {
        if (entryCount(vals) > 0) window.localStorage.setItem(DKEY + cur, JSON.stringify(vals));
        else window.localStorage.removeItem(DKEY + cur);
        return true;
      } catch (e) {
        setOk(false);
        return false;
      }
    };
    const doSwitch = async (to) => {
      setSwArm("");
      if (to === cur) return;
      const n0 = entryCount(vals);
      if (!cur && (n0 > 0 || photos.length > 0)) {
        const n2 = { ...vals, "d:store": to };
        const sd = storeDetails(to, true);
        for (const k of Object.keys(sd)) n2[k] = sd[k];
        setVals(n2);
        await retag("", to);
        setDirty((prev) => {
          if (!prev["_"]) return prev;
          const m = { ...prev, [to]: prev["_"] };
          delete m["_"];
          return m;
        });
        if (lastBk["_"]) {
          const m = { ...lastBk, [to]: lastBk["_"] };
          delete m["_"];
          saveLastBk(m);
        }
        setSmsg("The " + n0 + " entries and " + photos.length + " photo(s) on this page are now the " + sLabel(to) + " inspection. Store details were filled in for " + sLabel(to) + ".");
        return;
      }
      if (!parkCurrent()) {
        setSmsg("This browser cannot save on the device, so the " + sLabel(cur) + " entries could not be kept. Switch cancelled: download a full backup first.");
        return;
      }
      const o = readJson(DKEY + to);
      const n = o ? migrate(o) : storeDetails(to, true);
      n["d:store"] = to;
      setVals(n);
      setOpen({});
      setNotes({});
      setView(null);
      setArm(false);
      setRsArm(false);
      const kept = cur && (n0 > 0 || photos.length > 0) ? " The " + sLabel(cur) + " draft (" + n0 + " entries, " + photos.length + " photo(s)) is kept on this device; pick it again to carry on." : "";
      setSmsg((o ? "Continuing the saved " + sLabel(to) + " draft." : "New " + sLabel(to) + " inspection; store details filled in.") + kept);
    };
    const askSwitch = (to) => {
      if (to === cur) {
        setSwArm("");
        return;
      }
      if (entryCount(vals) > 0 || photos.length > 0) {
        setSwArm(to);
        return;
      }
      doSwitch(to);
    };
    const resetStore = () => {
      if (!cur) return;
      if (!rsArm) {
        setRsArm(true);
        window.setTimeout(() => setRsArm(false), 4e3);
        return;
      }
      setRsArm(false);
      try {
        const prof = readJson(PKEY) || {};
        delete prof[cur];
        window.localStorage.setItem(PKEY, JSON.stringify(prof));
      } catch (e) {
        setOk(false);
      }
      const sd = storeDetails(cur, false);
      setVals((prev) => {
        const n = { ...prev };
        for (const f of PROFILE_F) {
          const k = "d:" + f;
          if (sd[k]) n[k] = sd[k];
          else delete n[k];
        }
        return n;
      });
      setSmsg("Store details reset to the defaults for " + sLabel(cur) + ".");
    };
    const backupTarget = (bv, top) => {
      const named = bv["d:store"] || (typeof top === "string" ? top : "");
      const target = storeOf(named) ? named : cur;
      if (target !== cur && !parkCurrent()) return null;
      if (target) bv["d:store"] = target;
      else delete bv["d:store"];
      return target;
    };
    const applyBackup = async (txt) => {
      try {
        const o = JSON.parse(txt);
        if (!o || typeof o !== "object" || Array.isArray(o)) throw new Error("bad");
        if (o["v"] === 2 && o["vals"] && typeof o["vals"] === "object") {
          const bv = migrate(o["vals"]);
          const target = backupTarget(bv, o["store"]);
          if (target === null) {
            setMsg("This browser cannot save on the device, so the current store's entries could not be kept. Restore cancelled.");
            return;
          }
          const raw = Array.isArray(o["photos"]) ? o["photos"] : [];
          const list = raw.filter((p) => !!p && typeof p.full === "string" && typeof p.key === "string").map((p, i) => ({ id: p.id || newId(), key: p.key, full: p.full, thumb: p.thumb || p.full, ts: p.ts || Date.now() + i }));
          setVals(bv);
          setOpen({});
          setNotes({});
          setBusy("Restoring " + list.length + " photos…");
          const ok2 = await replacePhotos(list, target);
          setBusy("");
          setMsg("Backup restored for " + sLabel(target) + ": entries and " + list.length + " photo(s)" + (ok2 ? "." : ". The photos could not be saved on this device, so keep the backup file.") + (target !== cur && cur ? " The " + sLabel(cur) + " entries are kept as a draft." : ""));
        } else {
          const bv = migrate(o);
          const target = backupTarget(bv, "");
          if (target === null) {
            setMsg("This browser cannot save on the device, so the current store's entries could not be kept. Restore cancelled.");
            return;
          }
          setVals(bv);
          setOpen({});
          setNotes({});
          setMsg("Backup restored for " + sLabel(target) + " (entries only; that store's photos on this device were kept).");
        }
        setRestore("");
      } catch (e) {
        setBusy("");
        setMsg("That is not a valid backup.");
      }
    };
    const onRestoreFile = (e) => {
      const f = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!f) return;
      setBusy("Reading backup…");
      f.text().then((t) => {
        setBusy("");
        applyBackup(t);
      }, () => {
        setBusy("");
        setMsg("Could not read that file.");
      });
    };
    useEffect(() => {
      if (!ok) return;
      const t = window.setTimeout(() => {
        try {
          window.localStorage.setItem(KEY, JSON.stringify(vals));
          setSavedAt((/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        } catch (e) {
          setOk(false);
        }
      }, 300);
      return () => window.clearTimeout(t);
    }, [vals]);
    useEffect(() => {
      if (!ok || !cur) return;
      const t = window.setTimeout(() => {
        try {
          const prof = readJson(PKEY) || {};
          const p = {};
          for (const f of PROFILE_F) p[f] = vals["d:" + f] || "";
          prof[cur] = p;
          window.localStorage.setItem(PKEY, JSON.stringify(prof));
        } catch (e) {
          setOk(false);
        }
      }, 400);
      return () => window.clearTimeout(t);
    }, [vals]);
    const valsRef = useRef(vals);
    valsRef.current = vals;
    const okRef = useRef(ok);
    okRef.current = ok;
    useEffect(() => {
      const flush = () => {
        if (!okRef.current) return;
        const v = valsRef.current;
        try {
          window.localStorage.setItem(KEY, JSON.stringify(v));
          const c = v["d:store"] || "";
          if (c) {
            const prof = readJson(PKEY) || {};
            const p = {};
            for (const f of PROFILE_F) p[f] = v["d:" + f] || "";
            prof[c] = p;
            window.localStorage.setItem(PKEY, JSON.stringify(prof));
          }
        } catch (e) {
          setOk(false);
        }
      };
      const onVis = () => {
        if (document.visibilityState === "hidden") flush();
      };
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("pagehide", flush);
      return () => {
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("pagehide", flush);
      };
    }, []);
    const set = (k, val) => {
      if (!askedRef.current && persist !== "granted") {
        askedRef.current = true;
        ask();
      }
      setVals((prev) => {
        const n = { ...prev };
        if (val) n[k] = val;
        else delete n[k];
        return n;
      });
      markDirty(k);
    };
    const secStats = useMemo(() => SECS.map((s) => stats(s.items, vals)), [vals]);
    const all = secStats.reduce((a, s) => ({ done: a.done + s.done, total: a.total + s.total, A: a.A + s.A, B: a.B + s.B, C: a.C + s.C, NA: a.NA + s.NA }), { done: 0, total: 0, A: 0, B: 0, C: 0, NA: 0 });
    const ql = query.trim().toLowerCase();
    const visible = (s, it) => {
      if (filter === "todo" && isDone(it, vals)) return false;
      if (filter === "bc" && vals[it.id + ":g"] !== "B" && vals[it.id + ":g"] !== "C") return false;
      if (ql && it.text.toLowerCase().indexOf(ql) < 0 && s.title.toLowerCase().indexOf(ql) < 0) return false;
      return true;
    };
    const findings = [];
    for (const s of SECS) for (const it of s.items) if (vals[it.id + ":g"] === "B" || vals[it.id + ":g"] === "C") findings.push({ s, it });
    const secFind = SECS.filter((s) => !!vals["sn:" + s.id] || (pc["sec:" + s.id] || 0) > 0);
    const copyText = (txt, label) => {
      setExportText(txt);
      try {
        navigator.clipboard.writeText(txt).then(
          () => setMsg(label + " copied to the clipboard."),
          () => setMsg("Copying is blocked here. Select the text below and copy it.")
        );
      } catch (e) {
        setMsg("Copying is blocked here. Select the text below and copy it.");
      }
    };
    const download = (name, txt, mime, showText = true) => {
      if (showText) setExportText(txt);
      else setExportText("");
      try {
        const blob = new Blob([txt], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 2e3);
        setMsg("Download started: " + name + (showText ? ". If nothing downloads, copy the text below." : ". It goes to the phone's Downloads folder; if nothing appears, use Save backup to phone or Share photo report."));
        return true;
      } catch (e) {
        setMsg("Downloads are blocked here. Select the text below and copy it.");
        return false;
      }
    };
    const stamp = "QHRM_" + storeFile(vals) + "_" + isoDay(vals);
    const backupText = () => JSON.stringify({ v: 2, store: cur, storeName: curS ? curS.label : vals["d:name"] || "", vals, photos });
    const markBackedUp = () => {
      const t = Date.now();
      saveLastBk({ ...lastBk, [cur || "_"]: t });
      clearDirty(cur || "_");
      setNow(t);
    };
    const shareBackup = async () => {
      const txt = backupText();
      const np = photos.length + " photo" + (photos.length === 1 ? "" : "s");
      const nav = navigator;
      const tries = [];
      try {
        tries.push(new File([txt], stamp + "_backup.json", { type: "application/json" }));
        tries.push(new File([txt], stamp + "_backup.txt", { type: "text/plain" }));
      } catch (e) {
      }
      const f = typeof nav.share === "function" && nav.canShare ? tries.find((x) => {
        try {
          return nav.canShare({ files: [x] });
        } catch (e) {
          return false;
        }
      }) : void 0;
      if (!f) {
        doBackup();
        setBkMsg((m) => "Sharing files is not supported in this browser, so the backup was downloaded instead. " + m);
        return;
      }
      try {
        setBusy("Preparing backup…");
        await nav.share({ files: [f], title: f.name });
        setBusy("");
        markBackedUp();
        setBkMsg("Backup handed to the share sheet: " + f.name + " (" + np + ")." + (f.name.endsWith(".txt") ? " Android shares it as .txt; it is the same backup, and Restore and the report generator accept it as it is." : ""));
      } catch (e) {
        setBusy("");
        if (e && e.name === "AbortError") {
          setBkMsg("Sharing cancelled; no backup was saved.");
          return;
        }
        doBackup();
      }
    };
    const doBackup = () => {
      const name = stamp + "_backup.json";
      const sk = cur || "_";
      if (!download(name, backupText(), "application/json", false)) {
        setBkMsg("Downloads are blocked in this browser. Use Save backup to phone instead.");
        return;
      }
      const t = Date.now();
      saveLastBk({ ...lastBk, [sk]: t });
      clearDirty(sk);
      setNow(t);
      setBkMsg("Download started: " + name + " (" + photos.length + " photo" + (photos.length === 1 ? "" : "s") + "). It is in the phone's Downloads folder.");
    };
    const sk0 = cur || "_";
    const dCur = dirty[sk0];
    const nDirty = dCur ? dCur.n.length : 0;
    const lastTs = lastBk[sk0] || 0;
    const rBase = dism[sk0] || { n: 0, t: dCur ? dCur.first : now };
    const remind = nDirty > 0 && (nDirty - rBase.n >= REMIND_N || now - rBase.t >= REMIND_MS);
    const saveOff = !ok || pstat === "memory";
    const lastTxt = lastTs ? "Last backup: " + fmtWhen(lastTs) : "No backup yet";
    const drafts = STORES.filter((s) => s.id !== cur).map((s) => {
      const o = readJson(DKEY + s.id);
      return { s, n: o ? entryCount(o) : 0, p: allPhotos.filter((x) => (x.st || "") === s.id).length };
    }).filter((d) => d.n > 0 || d.p > 0);
    const muted = { fontSize: 13, color: th.text.secondary, fontFamily: th.font.family };
    const linkBtn = { background: "transparent", border: "none", padding: "8px 0", color: th.text.accent, fontSize: 14, fontFamily: th.font.family, cursor: "pointer" };
    const shareReport = async () => {
      const name = stamp + "_findings.html";
      try {
        const file = new File([buildReport(vals, byKey)], name, { type: "text/html" });
        const nav = navigator;
        if (typeof nav.share === "function" && nav.canShare && nav.canShare({ files: [file] })) {
          await nav.share({ files: [file], title: "QHRM findings" });
          setMsg("Report handed to your phone's share sheet.");
          return;
        }
        setMsg("Sharing files is not supported in this browser. Use Download photo report instead.");
      } catch (e) {
        setMsg("Sharing was cancelled or blocked here. Use Download photo report instead.");
      }
    };
    const photoBar = (key, where) => {
      const ps = byKey[key] || [];
      const v = view && view.key === key && view.where === where && ps.length ? view : null;
      const vi = v ? Math.min(v.idx, ps.length - 1) : 0;
      const cur2 = v ? ps[vi] : null;
      const canAdd = where === "list";
      if (!canAdd && !ps.length) return null;
      return /* @__PURE__ */ h("div", { style: { marginTop: 4, fontFamily: th.font.family } }, canAdd ? /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: "0 18px", alignItems: "center" } }, /* @__PURE__ */ h("button", { type: "button", style: linkBtn, onClick: () => pick(key, true) }, "📷 Camera"), /* @__PURE__ */ h("button", { type: "button", style: linkBtn, onClick: () => pick(key, false) }, "🖼 Gallery"), ps.length ? /* @__PURE__ */ h("span", { style: { ...muted, fontSize: 12 } }, ps.length, " photo", ps.length > 1 ? "s" : "") : null) : null, ps.length ? /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 } }, ps.map((p, i) => {
        const selp = !!cur2 && cur2.id === p.id;
        return /* @__PURE__ */ h("img", { key: p.id, src: p.thumb, alt: "Photo " + (i + 1), loading: "lazy", onClick: () => {
          setDelArm(false);
          setView(selp ? null : { key, idx: i, where });
        }, style: { width: 64, height: 64, objectFit: "cover", borderRadius: th.radius.md, cursor: "pointer", boxSizing: "border-box", border: selp ? "2px solid " + th.text.accent : "1px solid " + th.border.default } });
      })) : null, cur2 && v ? /* @__PURE__ */ h("div", { style: { marginTop: 8 } }, /* @__PURE__ */ h("img", { src: cur2.full, alt: "Enlarged photo", onClick: () => setView(null), style: { width: "100%", height: "auto", borderRadius: th.radius.md, display: "block", border: "1px solid " + th.border.default } }), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, alignItems: "center" } }, ps.length > 1 ? /* @__PURE__ */ h(Button, { label: "‹ Prev", onClick: () => {
        setDelArm(false);
        setView({ key, where, idx: (vi - 1 + ps.length) % ps.length });
      } }) : null, ps.length > 1 ? /* @__PURE__ */ h(Button, { label: "Next ›", onClick: () => {
        setDelArm(false);
        setView({ key, where, idx: (vi + 1) % ps.length });
      } }) : null, /* @__PURE__ */ h(Button, { label: delArm ? "Tap again to delete" : "Delete photo", onClick: () => {
        if (!delArm) {
          setDelArm(true);
          window.setTimeout(() => setDelArm(false), 4e3);
          return;
        }
        setDelArm(false);
        delPhoto(cur2);
        setView(ps.length > 1 ? { key, where, idx: Math.max(0, vi - 1) } : null);
      } }), /* @__PURE__ */ h(Button, { label: "Close", onClick: () => {
        setDelArm(false);
        setView(null);
      } }), /* @__PURE__ */ h("span", { style: { ...muted, fontSize: 12 } }, vi + 1, " / ", ps.length, " · ", new Date(cur2.ts).toLocaleString([], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })))) : null);
    };
    return /* @__PURE__ */ h(Page, { title: "QHRM Inspection Checklist – Jackson & Black", summary: "Bossa QHRM operations report for Jackson & Black Strand, Tyger Valley and Paarl (pick the store at the top), " + TOTAL + " line items in the paper form's order. Tap A, B or C per item and add photo evidence; entries and photos stay on this device and export as a photo report, text or CSV.", width: "column" }, upd ? /* @__PURE__ */ h("div", { class: "note", role: "status" }, "A new version of the app is ready. Your entries are saved. ", /* @__PURE__ */ h("button", { type: "button", class: "btn", onClick: () => window.location.reload() }, "Reload")) : null, inst ? /* @__PURE__ */ h("div", { class: "note" }, "Install the checklist on this phone for offline use and safer storage. ", /* @__PURE__ */ h("button", { type: "button", class: "btn", onClick: () => {
      inst.prompt();
      inst.userChoice.then(() => {
        setInst(null);
        ask();
      }, () => setInst(null));
    } }, "Install app")) : null, saveOff ? /* @__PURE__ */ h(Callout, { tone: "danger", lead: !ok ? "Saving is OFF in this browser." : "Saving photos is OFF in this browser." }, !ok ? "Your entries and photos will be LOST when this page closes or refreshes. Download a full backup (with photos) regularly. Check the browser is not in private (incognito) mode and the phone has free space." : "Your photos will be LOST when this page closes or refreshes (entries still save on this device). Download a full backup (with photos) regularly. Check the browser is not in private (incognito) mode and the phone has free space.") : null, /* @__PURE__ */ h("div", { style: { position: "sticky", top: 0, zIndex: 5, background: th.bg.base, padding: "8px 0 10px", borderBottom: "1px solid " + th.border.subtle, fontFamily: th.font.family } }, /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px 14px", fontSize: 15, color: th.text.primary } }, /* @__PURE__ */ h("span", { style: { fontWeight: th.weight.semibold, color: curS ? th.text.primary : th.text.danger } }, curS ? curS.short : "No store picked"), /* @__PURE__ */ h("span", { style: { fontWeight: th.weight.semibold } }, all.done, " / ", TOTAL, " done"), /* @__PURE__ */ h("span", { style: { color: th.text.success } }, "A ", all.A), /* @__PURE__ */ h("span", { style: { color: th.text.warning } }, "B ", all.B), /* @__PURE__ */ h("span", { style: { color: th.text.danger } }, "C ", all.C), /* @__PURE__ */ h("span", { style: { color: th.text.secondary } }, "N/A ", all.NA)), /* @__PURE__ */ h(ProgressBar, { s: all }), ok ? /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 12, marginTop: 4 } }, savedAt ? "Saved on this device " + savedAt : "Saves automatically on this device") : /* @__PURE__ */ h("div", { style: { fontSize: 13, marginTop: 4, color: th.text.danger, fontWeight: th.weight.semibold } }, "⚠ Saving is OFF: entries and photos are lost when this page closes. Download a full backup."), /* @__PURE__ */ h("div", { "data-t": "storage", style: { ...muted, fontSize: 12, marginTop: 2, color: !ok ? th.text.danger : th.text.secondary } }, "Saving on this phone: " + (!ok ? "OFF" : pstat === "memory" ? "ON for entries, OFF for photos" : "ON") + " · Persistent storage: " + (persist === "granted" ? "granted" : persist === "checking" ? "checking…" : persist === "unsupported" ? "not available in this browser" : "not granted yet (install the app to help)")), /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 12, marginTop: 2, color: busy || pmsg ? th.text.accent : pstat === "memory" ? th.text.danger : th.text.secondary } }, busy ? busy : pmsg ? pmsg : pstat === "checking" ? "Checking photo storage…" : pstat === "ok" ? "Photos: " + photos.length + " saved on this device (" + (pBytes / 1048576).toFixed(1) + " MB)" : "⚠ Photos can't be saved on this device in this browser (" + photos.length + " held until you close the page). Download the photo report or full backup before leaving."), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px 12px", alignItems: "center", marginTop: 8 } }, /* @__PURE__ */ h(Button, { label: "Save backup to phone", variant: "primary", onClick: () => {
      shareBackup();
    } }), /* @__PURE__ */ h(Button, { label: "Download backup", onClick: () => doBackup() }), /* @__PURE__ */ h("span", { style: { fontSize: 13, color: !lastTs && saveOff ? th.text.danger : th.text.secondary } }, lastTxt, curS ? " (" + curS.short + ")" : "", nDirty ? " · " + nDirty + " change" + (nDirty > 1 ? "s" : "") + " since" : "")), bkMsg ? /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 12, marginTop: 4 } }, bkMsg) : null, remind ? /* @__PURE__ */ h("div", { role: "status", style: { marginTop: 8, padding: "8px 10px", borderRadius: th.radius.md, background: saveOff ? th.fill.dangerSubtle : th.fill.warningSubtle, border: "1px solid " + (saveOff ? th.text.danger : th.text.warning) } }, /* @__PURE__ */ h("div", { style: { fontSize: 14, lineHeight: "20px", color: saveOff ? th.text.danger : th.text.warning, fontWeight: th.weight.semibold, marginBottom: 6 } }, "Backup reminder: " + nDirty + " change" + (nDirty > 1 ? "s" : "") + " not in a backup yet. " + lastTxt + "." + (saveOff ? " Saving is OFF here, so they are lost if the page closes." : "")), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: "Save backup to phone", variant: "primary", onClick: () => {
      shareBackup();
    } }), /* @__PURE__ */ h(Button, { label: "Download backup now", onClick: () => doBackup() }), /* @__PURE__ */ h(Button, { label: "Dismiss", onClick: () => setDism({ ...dism, [sk0]: { n: nDirty, t: Date.now() } }) }))) : null), /* @__PURE__ */ h("input", { ref: camRef, type: "file", accept: "image/*", capture: "environment", multiple: true, onChange: (e) => {
      onFiles(e);
    }, style: { display: "none" } }), /* @__PURE__ */ h("input", { ref: galRef, type: "file", accept: "image/*", multiple: true, onChange: (e) => {
      onFiles(e);
    }, style: { display: "none" } }), /* @__PURE__ */ h("input", { ref: fileRef, type: "file", accept: ".json,application/json,text/plain", onChange: (e) => onRestoreFile(e), style: { display: "none" } }), /* @__PURE__ */ h(TableOfContents, { items: [{ label: "Store details", id: "details" }, { label: "Automatic C grading", id: "autoc" }, { label: "Checklist", id: "checklist" }, { label: "Findings (B & C)", id: "findings" }, { label: "Gradings and sign-off", id: "gradings" }, { label: "Export and backup", id: "export" }, { label: "How grading works", id: "notes" }] }), /* @__PURE__ */ h(Section, { heading: "Store details", id: "details" }, /* @__PURE__ */ h("div", { style: { fontFamily: th.font.family } }, /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 14, marginBottom: 6 } }, "Store being inspected"), /* @__PURE__ */ h(Segmented, { options: STORES.map((s) => ({ value: s.id, label: s.short })), value: cur, onChange: (x) => askSwitch(x) }), /* @__PURE__ */ h("div", { style: { ...muted, marginTop: 6 } }, curS ? curS.label : "No store picked yet. Pick the store to fill in its details" + (entryCount(vals) > 0 || photos.length > 0 ? "; the entries already on this page will become that store's inspection." : ".")), swArm ? /* @__PURE__ */ h("div", { style: { marginTop: 8, padding: 10, border: "1px solid " + th.border.default, borderRadius: th.radius.md } }, /* @__PURE__ */ h("div", { style: { fontSize: 14, color: th.text.primary, marginBottom: 8 } }, cur ? "Switch to " + sLabel(swArm) + "? The " + sLabel(cur) + " entries (" + entryCount(vals) + ") and photos (" + photos.length + ") stay saved on this device as a draft; pick " + (curS ? curS.short : "it") + " again to carry on." + (ok ? "" : " Warning: this browser cannot save on the device, so download a full backup first.") : "Pick " + sLabel(swArm) + "? The " + entryCount(vals) + " entries and " + photos.length + " photo(s) on this page become the " + sLabel(swArm) + " inspection."), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: (cur ? "Switch to " : "Use for ") + sLabel(swArm), variant: "primary", onClick: () => {
      doSwitch(swArm);
    } }), /* @__PURE__ */ h(Button, { label: "Cancel", onClick: () => setSwArm("") }))) : null, drafts.length ? /* @__PURE__ */ h("div", { style: { ...muted, marginTop: 6 } }, "Drafts kept on this device: " + drafts.map((d) => d.s.short + " (" + d.n + " entries, " + d.p + " photos)").join("; ")) : null, smsg ? /* @__PURE__ */ h("div", { style: { fontSize: 13, color: th.text.accent, marginTop: 6 } }, smsg) : null), DETAILS.map(([k, lab]) => k === "addr" ? /* @__PURE__ */ h("div", { key: k, style: { fontFamily: th.font.family } }, /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 14 } }, lab), /* @__PURE__ */ h(NoteBox, { value: vals["d:" + k] || "", onChange: (x) => set("d:" + k, x), placeholder: DETAIL_HINT[k] || "" })) : /* @__PURE__ */ h(Input, { key: k, label: lab, value: vals["d:" + k] || "", onChange: (x) => set("d:" + k, x), placeholder: DETAIL_HINT[k] })), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: "Set letter date to today", onClick: () => set("d:ldate", (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })) }), curS ? /* @__PURE__ */ h(Button, { label: rsArm ? "Tap again to reset " + curS.short + " details" : "Reset store details to defaults", onClick: () => resetStore() }) : null), /* @__PURE__ */ h("div", { style: muted }, "Picking a store fills in its name, address, Attention, owner, greeting, management team and last grading. Changes you make to these are remembered for that store on this device and filled in next time; Reset puts back the defaults. Defaults come from the QHRM letters: Strand from the 16 Sept 2026 letter, Tyger Valley from the 20 July 2026 letter (management team blank, as on that letter). Paarl has only its address, from the liquor licence renewal notice; fill in its owners and team once. Each store keeps its own entries and photos, so switching store does not wipe another store's draft."), /* @__PURE__ */ h("div", { style: muted }, "The letter fields (letter date, address, attention, greeting, signer) are used by the QHRM letter generator. A blank letter date means the date the letter is generated; blank signer fields default to Roscoe Sanders, Bossa Group.")), /* @__PURE__ */ h(Section, { heading: "Automatic C grading", id: "autoc", collapsible: true, defaultOpen: false }, /* @__PURE__ */ h(Text, null, "Major non-conformance to required operational standards of Bossa may result in an automatic C grading for the entire section or the overall report, with specific reference to:"), /* @__PURE__ */ h(NumberedList, { items: AUTO_C })), /* @__PURE__ */ h(Section, { heading: "Checklist", id: "checklist" }, /* @__PURE__ */ h(Segmented, { options: [{ value: "all", label: "All" }, { value: "todo", label: "To do", count: TOTAL - all.done }, { value: "bc", label: "B & C", count: all.B + all.C }], value: filter, onChange: (x) => setFilter(x) }), /* @__PURE__ */ h(Input, { value: query, onChange: (x) => setQuery(x), placeholder: "Search items or sections" }), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: "Expand all", onClick: () => {
      const o = {};
      SECS.forEach((s) => {
        o[s.id] = true;
      });
      setOpen(o);
    } }), /* @__PURE__ */ h(Button, { label: "Collapse all", onClick: () => setOpen({}) })), /* @__PURE__ */ h("div", { style: { fontFamily: th.font.family } }, AREAS.map((area) => {
      const secs = SECS.filter((s) => s.area === area);
      return /* @__PURE__ */ h("div", { key: area, style: { marginTop: 18 } }, /* @__PURE__ */ h("div", { style: { fontSize: 12, letterSpacing: "0.06em", color: th.text.tertiary, fontWeight: th.weight.semibold, marginBottom: 6 } }, area), secs.map((s) => {
        const si = SECS.indexOf(s);
        const st = secStats[si];
        const vis = s.items.filter((it) => visible(s, it));
        const filtering = filter !== "all" || !!ql;
        if (filtering && vis.length === 0) return null;
        const isOpen = filtering ? true : !!open[s.id];
        const sg = vals["sg:" + s.id] || "";
        let lastSg = "";
        return /* @__PURE__ */ h("div", { key: s.id, style: { border: "1px solid " + th.border.default, borderRadius: th.radius.lg, marginBottom: 10, overflow: "hidden" } }, /* @__PURE__ */ h("button", { type: "button", onClick: () => setOpen({ ...open, [s.id]: !open[s.id] }), style: { display: "block", width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "14px 14px 12px", cursor: "pointer", fontFamily: th.font.family, color: th.text.primary } }, /* @__PURE__ */ h("div", { style: { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" } }, /* @__PURE__ */ h("span", { style: { fontSize: 16, fontWeight: th.weight.semibold } }, isOpen ? "▾ " : "▸ ", s.title), /* @__PURE__ */ h("span", { style: { fontSize: 14, color: st.done === st.total ? th.text.success : th.text.secondary, flexShrink: 0 } }, st.done, "/", st.total)), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: "2px 12px", fontSize: 13, marginTop: 4, color: th.text.secondary } }, /* @__PURE__ */ h("span", { style: { color: st.A ? th.text.success : th.text.tertiary } }, "A ", st.A), /* @__PURE__ */ h("span", { style: { color: st.B ? th.text.warning : th.text.tertiary } }, "B ", st.B), /* @__PURE__ */ h("span", { style: { color: st.C ? th.text.danger : th.text.tertiary } }, "C ", st.C), /* @__PURE__ */ h("span", { style: { color: th.text.tertiary } }, "N/A ", st.NA), sg ? /* @__PURE__ */ h("span", null, "Section grade ", sg) : null, secPc[s.id] ? /* @__PURE__ */ h("span", { style: { color: th.text.accent } }, "📷 ", secPc[s.id]) : null), /* @__PURE__ */ h(ProgressBar, { s: st })), isOpen ? /* @__PURE__ */ h("div", { style: { padding: "0 14px 14px" } }, vis.map((it) => {
          const n = s.items.indexOf(it) + 1;
          const g = vals[it.id + ":g"] || "";
          const c = vals[it.id + ":c"] || "";
          const showNote = !!c || !!notes[it.id];
          const header = it.sg && it.sg !== lastSg ? it.sg : "";
          lastSg = it.sg;
          return /* @__PURE__ */ h("div", { key: it.id }, header ? /* @__PURE__ */ h("div", { style: { fontSize: 13, fontWeight: th.weight.semibold, color: th.text.secondary, padding: "12px 0 2px" } }, header, ":") : null, /* @__PURE__ */ h("div", { style: { padding: "14px 0", borderTop: "1px solid " + th.border.subtle } }, /* @__PURE__ */ h("div", { style: { fontSize: 16, lineHeight: "22px", color: th.text.primary, marginBottom: 10 } }, /* @__PURE__ */ h("span", { style: { color: th.text.tertiary } }, n, ". "), it.text), it.t === "w" ? /* @__PURE__ */ h("div", { style: { marginBottom: 6 } }, /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 12, marginBottom: 6 } }, specOf(it.text) ? "Spec " + specOf(it.text) + " (from the item name)" : "No spec weight on the sheet", " · weigh 3 portions, in grams"), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, [1, 2, 3].map((wi) => /* @__PURE__ */ h(SmallField, { key: wi, label: "Weight " + wi, value: vals[it.id + ":w" + wi] || "", onChange: (x) => set(it.id + ":w" + wi, x), placeholder: "g" }))), /* @__PURE__ */ h("div", { style: { fontSize: 14, color: th.text.primary, marginTop: 8 } }, "Average: ", /* @__PURE__ */ h("b", null, wAvg(vals, it.id) ? wAvg(vals, it.id) + " g" : "–"), specOf(it.text) ? /* @__PURE__ */ h("span", { style: { color: th.text.secondary } }, " · spec ", specOf(it.text)) : null)) : null, it.t === "c" ? /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ h(SmallField, { label: "Count", value: vals[it.id + ":n"] || "", onChange: (x) => set(it.id + ":n", x) }), /* @__PURE__ */ h(SmallField, { label: "Par lev", value: vals[it.id + ":p"] || "", onChange: (x) => set(it.id + ":p", x) }), /* @__PURE__ */ h(SmallField, { label: "Top-up", value: vals[it.id + ":u"] || "", onChange: (x) => set(it.id + ":u", x) })) : null, it.t === "n" || it.t === "c" ? /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 12, marginBottom: 6 } }, it.t === "n" ? "No A/B/C boxes on the paper form for this line; grade optional" : "Grade optional (the paper form has no A/B/C boxes here)") : null, it.t !== "w" ? /* @__PURE__ */ h(GradeRow, { value: g, na: true, onPick: (x) => {
            set(it.id + ":g", x);
            if (x === "B" || x === "C") setNotes({ ...notes, [it.id]: true });
          } }) : null, showNote ? /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(NoteBox, { value: c, onChange: (x) => set(it.id + ":c", x), placeholder: g === "B" || g === "C" ? "What needs fixing?" : "Comment" }), /* @__PURE__ */ h("button", { type: "button", "aria-pressed": !!vals[it.id + ":r"], onClick: () => set(it.id + ":r", vals[it.id + ":r"] ? "" : "1"), style: { marginTop: 6, minHeight: 36, padding: "0 12px", borderRadius: th.radius.md, cursor: "pointer", fontFamily: th.font.family, fontSize: 14, border: "1px solid " + (vals[it.id + ":r"] ? th.text.danger : th.border.default), background: vals[it.id + ":r"] ? th.fill.dangerSubtle : "transparent", color: vals[it.id + ":r"] ? th.text.danger : th.text.secondary, fontWeight: vals[it.id + ":r"] ? th.weight.semibold : th.weight.medium } }, vals[it.id + ":r"] ? "✓ Repeat finding" : "Mark as repeat")) : /* @__PURE__ */ h("button", { type: "button", style: linkBtn, onClick: () => setNotes({ ...notes, [it.id]: true }) }, "+ Comment"), photoBar(it.id, "list")));
        }), !filtering ? /* @__PURE__ */ h("div", { style: { padding: "14px 0 0", borderTop: "1px solid " + th.border.default } }, /* @__PURE__ */ h("div", { style: { fontSize: 14, fontWeight: th.weight.semibold, color: th.text.primary, marginBottom: 8 } }, "Section grade: ", s.title), /* @__PURE__ */ h(GradeRow, { value: sg, na: false, onPick: (x) => set("sg:" + s.id, x) }), /* @__PURE__ */ h(NoteBox, { value: vals["sn:" + s.id] || "", onChange: (x) => set("sn:" + s.id, x), placeholder: "Additional comments" }), photoBar("sec:" + s.id, "list")) : null) : null);
      }));
    }))), /* @__PURE__ */ h(Section, { heading: "Findings (B & C)", id: "findings" }, findings.length || secFind.length ? /* @__PURE__ */ h("div", { style: { fontFamily: th.font.family } }, /* @__PURE__ */ h("div", { style: { ...muted, marginBottom: 6 } }, findings.length, " finding", findings.length === 1 ? "" : "s", " · ", findings.reduce((n, f) => n + (pc[f.it.id] || 0), 0) + secFind.reduce((n, s) => n + (pc["sec:" + s.id] || 0), 0), " photo(s). Tap a thumbnail to enlarge."), findings.map((f) => {
      const g = vals[f.it.id + ":g"];
      const cm = cmR(vals, f.it.id);
      return /* @__PURE__ */ h("div", { key: f.it.id, style: { display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 0", borderTop: "1px solid " + th.border.subtle } }, /* @__PURE__ */ h("span", { style: { flexShrink: 0, minWidth: 28, textAlign: "center", padding: "2px 6px", borderRadius: th.radius.md, fontWeight: th.weight.semibold, fontSize: 14, background: g === "C" ? th.fill.dangerSubtle : th.fill.warningSubtle, color: g === "C" ? th.text.danger : th.text.warning } }, g), /* @__PURE__ */ h("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ h("div", { style: { fontSize: 15, lineHeight: "21px", color: th.text.primary } }, f.it.text), /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 12 } }, f.s.title, pc[f.it.id] ? " · 📷 " + pc[f.it.id] : ""), /* @__PURE__ */ h("div", { style: { fontSize: 14, marginTop: 4, whiteSpace: "pre-wrap", color: cm ? th.text.secondary : th.text.tertiary } }, cm || "No comment yet"), photoBar(f.it.id, "find")));
    }), secFind.map((s) => /* @__PURE__ */ h("div", { key: s.id, style: { padding: "12px 0", borderTop: "1px solid " + th.border.subtle } }, /* @__PURE__ */ h("div", { style: { fontSize: 15, color: th.text.primary } }, s.title, ": additional comments"), /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 12 } }, "Section grade ", vals["sg:" + s.id] || "-", pc["sec:" + s.id] ? " · 📷 " + pc["sec:" + s.id] : ""), vals["sn:" + s.id] ? /* @__PURE__ */ h("div", { style: { fontSize: 14, marginTop: 4, whiteSpace: "pre-wrap", color: th.text.secondary } }, vals["sn:" + s.id]) : null, photoBar("sec:" + s.id, "find")))) : /* @__PURE__ */ h(Text, null, "Items you grade B or C collect here with their comments and photos, as the corrective-action list. Section comments with photos also appear here.")), /* @__PURE__ */ h(Section, { heading: "Gradings and sign-off", id: "gradings" }, /* @__PURE__ */ h(
      Table,
      {
        columns: ["Section", "Done", "A / B / C", "Grade"],
        rows: SECS.map((s, i) => {
          const g = vals["sg:" + s.id] || "";
          return [s.label, secStats[i].done + "/" + secStats[i].total, secStats[i].A + " / " + secStats[i].B + " / " + secStats[i].C, g ? { text: g, tone: g === "A" ? "success" : g === "B" ? "warning" : "danger" } : "-"];
        })
      }
    ), /* @__PURE__ */ h("div", { style: { fontFamily: th.font.family } }, /* @__PURE__ */ h("div", { style: { fontSize: 15, fontWeight: th.weight.semibold, color: th.text.primary, margin: "4px 0 4px" } }, "Overall grading: Store Operational Standards"), /* @__PURE__ */ h("div", { style: { ...muted, marginBottom: 8 } }, "A = Excellent, B = Needs improvement, C = Unacceptable"), /* @__PURE__ */ h(GradeRow, { value: vals["ov"] || "", na: false, onPick: (x) => set("ov", x) }), /* @__PURE__ */ h(NoteBox, { value: vals["ovn"] || "", onChange: (x) => set("ovn", x), placeholder: "Comments on operational standards and non-conformance" }), NONCON.map((n, i) => /* @__PURE__ */ h("div", { key: n, style: { padding: "14px 0", borderTop: "1px solid " + th.border.subtle, marginTop: i === 0 ? 14 : 0 } }, /* @__PURE__ */ h("div", { style: { fontSize: 15, color: th.text.primary, marginBottom: 8 } }, n), /* @__PURE__ */ h(GradeRow, { value: vals["nc" + i + ":g"] || "", na: false, onPick: (x) => set("nc" + i + ":g", x) }), /* @__PURE__ */ h(NoteBox, { value: vals["nc" + i + ":c"] || "", onChange: (x) => set("nc" + i + ":c", x), placeholder: "Comment" })))), SIGN.map(([k, lab]) => /* @__PURE__ */ h(Input, { key: k, label: lab, value: vals["x:" + k] || "", onChange: (x) => set("x:" + k, x) }))), /* @__PURE__ */ h(Section, { heading: "Export and backup", id: "export" }, /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 14, color: th.text.primary, fontWeight: th.weight.semibold } }, "Report with photos"), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: "Download photo report (.html)", variant: "primary", onClick: () => download(stamp + "_findings.html", buildReport(vals, byKey), "text/html", false) }), /* @__PURE__ */ h(Button, { label: "Share photo report", onClick: () => {
      shareReport();
    } })), /* @__PURE__ */ h("div", { style: muted }, "One self-contained HTML file: store details, totals, every B/C finding with its comment and embedded photos, section comments, other photo evidence, non-conformance and sign-off. Open it in the phone's browser and use Print, then Save as PDF, for a PDF copy."), /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 14, color: th.text.primary, fontWeight: th.weight.semibold, marginTop: 6 } }, "Text and spreadsheet (photo counts only)"), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: "Copy findings", onClick: () => copyText(buildFindings(vals, pc), "Findings") }), /* @__PURE__ */ h(Button, { label: "Download findings (.txt)", onClick: () => download(stamp + "_findings.txt", buildFindings(vals, pc), "text/plain") }), /* @__PURE__ */ h(Button, { label: "Download full CSV", onClick: () => download(stamp + "_full.csv", "\uFEFF" + buildCsv(vals, pc), "text/csv") })), /* @__PURE__ */ h("div", { style: { ...muted, fontSize: 14, color: th.text.primary, fontWeight: th.weight.semibold, marginTop: 6 } }, "Backup"), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: "Save backup to phone", variant: "primary", onClick: () => {
      shareBackup();
    } }), /* @__PURE__ */ h(Button, { label: "Download full backup (with photos)", onClick: () => doBackup() }), /* @__PURE__ */ h(Button, { label: "Copy backup (entries only, no photos)", onClick: () => copyText(JSON.stringify(vals), "Backup (entries only, photos excluded)") })), /* @__PURE__ */ h("div", { style: muted }, lastTxt, curS ? " (" + curS.short + ")" : "", ". The full backup is a .json file containing every entry and every photo. The copied text backup holds entries only and excludes photos. Save backup to phone opens the share sheet so you can send the full backup to OneDrive, WhatsApp or email (or save it to Files); where sharing is not available it downloads instead."), msg ? /* @__PURE__ */ h(Text, null, msg) : null, exportText ? /* @__PURE__ */ h("textarea", { readOnly: true, value: exportText, rows: 8, onFocus: (e) => e.target.select(), style: { width: "100%", boxSizing: "border-box", padding: 10, fontSize: 13, fontFamily: th.font.mono, color: th.text.primary, background: th.bg.subtle, border: "1px solid " + th.border.default, borderRadius: th.radius.md } }) : null, /* @__PURE__ */ h("div", { style: { fontFamily: th.font.family } }, /* @__PURE__ */ h("div", { style: { fontSize: 14, fontWeight: th.weight.semibold, color: th.text.primary, marginTop: 6 } }, "Restore from a backup"), /* @__PURE__ */ h("div", { style: { ...muted, marginBottom: 6 } }, "Choose a full backup file (.json, restores entries and photos, replacing the photos on this device), or paste copied backup text (entries only; photos on this device are kept)."), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ h(Button, { label: "Restore from backup file", onClick: () => {
      const el = fileRef.current;
      if (el) {
        el.value = "";
        el.click();
      }
    } })), /* @__PURE__ */ h(NoteBox, { value: restore, onChange: (x) => setRestore(x), placeholder: "Or paste backup text here" }), /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 } }, /* @__PURE__ */ h(Button, { label: "Restore pasted text", disabled: !restore.trim(), onClick: () => {
      applyBackup(restore);
    } }), /* @__PURE__ */ h(Button, { label: arm ? "Tap again to clear " + (curS ? curS.short + "'s" : "all") + " entries and photos" : "Start new inspection" + (curS ? " (" + curS.short + ")" : ""), onClick: () => {
      if (!arm) {
        setArm(true);
        window.setTimeout(() => setArm(false), 4e3);
        return;
      }
      setVals(cur ? { ...storeDetails(cur, true), "d:store": cur } : { ...DEFAULTS });
      setNotes({});
      setOpen({});
      setArm(false);
      setExportText("");
      clearDirty(cur || "_");
      replacePhotos([]).then(() => setMsg("Cleared " + (curS ? curS.label + " " : "") + "entries and photos; store details kept. New inspection started. Other stores' drafts are untouched."));
    } })))), /* @__PURE__ */ h(Section, { heading: "How grading works", id: "notes", collapsible: true, defaultOpen: false }, /* @__PURE__ */ h(Text, null, "The source sheet has no formulas, weights or totals. Each section ends with a GRADING line where the inspector circles A, B or C, and the report closes with an overall grade (A = Excellent, B = Needs improvement, C = Unacceptable) chosen by the inspector. The A/B/C counts on this page are simple tallies to guide that call; the official Bossa scoring method is not in the file."), /* @__PURE__ */ h(Text, null, "N/A is an addition for items that do not apply; it is not on the paper form. Portion-weight lines take three weighings (Weight 1, 2 and 3) and no grade; they count as done once all three are entered and are left out of the A/B/C tallies. The spec shown is the weight in the item name; the sheet gives no tolerance, so the average is shown without a pass/fail. Older backups with a single weight load it as Weight 1, and any old grade on a weight line is kept as a note in its comment. Menu-count lines have no A/B/C boxes on paper, so they count as done once a count is entered."), /* @__PURE__ */ h(Text, null, 'QHRM letter: the comment on each line becomes a bullet under its section in the letter, word for word, and "Mark as repeat" adds "(Repeat)" after it. Weight lines appear in the letter only when they have a comment; the three weights are added to that bullet (e.g. 160/170/170g). Section additional comments, non-conformance grades and comments, and the letter fields under Store details are used as written. Older backups without these fields still load; the new fields are simply blank.'), /* @__PURE__ */ h(Text, null, "Photos: Camera opens the phone camera and Gallery picks existing pictures (several at once). Each photo is shrunk on the phone to at most 1280 px on the longest side (JPEG quality 0.7, usually 100-300 KB) plus a small thumbnail, and kept in this browser's on-device database. The bar at the top shows how many are saved and the space they use; a red warning means this browser cannot keep photos, so download the photo report or the full backup before closing. Photos never leave the phone unless you download or share a report or backup.")), /* @__PURE__ */ h("p", { class: "foot" }, "QHRM Checklist app v", APP_VERSION, " · works offline · entries and photos are kept only in this browser on this phone"));
  }
  render(/* @__PURE__ */ h(App, null), document.getElementById("app"));
})();
