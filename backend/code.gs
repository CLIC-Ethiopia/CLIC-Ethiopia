/**
 * Google Apps Script Backend for CLIC Website
 * 
 * INSTRUCTIONS:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code into Code.gs.
 * 4. Run the 'setupDatabase' function once to create sheets and headers.
 * 5. Run the 'fillSampleData' function to populate with initial data.
 * 6. Deploy as Web App:
 *    - Click 'Deploy' > 'New deployment'
 *    - Select type: 'Web app'
 *    - Description: 'v1'
 *    - Execute as: 'Me'
 *    - Who has access: 'Anyone' (IMPORTANT for public access)
 *    - Copy the Web App URL.
 */

// --- Configuration ---
const SHEETS = {
  // Content Sheets (Read-Only for App)
  CONTENT_STEAM: 'Content_STEAM',
  CONTENT_IE: 'Content_IE',
  CONTENT_CURRICULUM: 'Content_Curriculum',
  CONTENT_LABS: 'Content_Labs',
  CONTENT_PROJECTS: 'Content_Projects',
  CONTENT_SPOTLIGHT: 'Content_Spotlight',
  CONTENT_VIDEOS: 'Content_Videos',
  
  // E-commerce
  PRODUCTS: 'Products',
  ORDERS: 'Orders',
  
  // User Data (Write-Heavy)
  STUDENTS: 'Students',
  MENTORS: 'Mentors',
  DONATIONS: 'Donations',
  MESSAGES: 'Messages', // General contact
  NEWSLETTER_SUB: 'newsletter sub',
  EVENTS: 'Events',
  EVENT_REGISTRATION: 'Event Registration',
  
  // Admin
  SITE_ADMIN: 'site_admin'
};

// --- Setup Function ---
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Content: STEAM Section
  createSheetIfNotExists(ss, SHEETS.CONTENT_STEAM, [
    'id', 'title', 'description', 'icon_name', 'color_hex', 'detailed_content_markdown'
  ]);

  // 2. Content: Innovation & Entrepreneurship (IE)
  createSheetIfNotExists(ss, SHEETS.CONTENT_IE, [
    'id', 'title', 'description', 'icon_name', 'color_hex', 'detailed_content_markdown'
  ]);

  // 3. Content: Curriculum
  createSheetIfNotExists(ss, SHEETS.CONTENT_CURRICULUM, [
    'id', 'title', 'level', 'duration', 'description', 'modules_json', 'icon_name', 'color_hex'
  ]);

  // 4. Content: Labs
  createSheetIfNotExists(ss, SHEETS.CONTENT_LABS, [
    'id', 'name', 'description', 'icon_name', 'color_hex', 'equipment_json', 'capacity', 'stats_json', 'detailed_content_markdown', 'image_url'
  ]);

  // 5. Content: Projects
  createSheetIfNotExists(ss, SHEETS.CONTENT_PROJECTS, [
    'id', 'category', 'project_count', 'icon_name', 'color_hex', 'items_json', 'stats_json', 'detailed_content_markdown', 'image_url'
  ]);

  // 6a. Content: Innovator Spotlight
  createSheetIfNotExists(ss, SHEETS.CONTENT_SPOTLIGHT, [
    'id', 'name', 'project', 'image_url', 'prototype_url', 'problem', 'solution', 'impact'
  ]);

  // 6b. Content: Latest Videos
  createSheetIfNotExists(ss, SHEETS.CONTENT_VIDEOS, [
    'id', 'title', 'thumbnail_url', 'duration', 'video_id'
  ]);

  // 7. Products (Merch)
  createSheetIfNotExists(ss, SHEETS.PRODUCTS, [
    'id', 'name', 'price', 'category', 'image_url', 'description', 'options_json', 'stock_status'
  ]);

  // 8. Orders
  createSheetIfNotExists(ss, SHEETS.ORDERS, [
    'order_id', 'created_at', 'status', 'customer_name', 'email', 'phone', 'address', 'items_json', 'total_amount', 'payment_method'
  ]);

  // 9. Students Registration
  createSheetIfNotExists(ss, SHEETS.STUDENTS, [
    'student_id', 'registration_date', 'first_name', 'last_name', 'email', 'membership_type', 'interests_json', 'status'
  ]);

  // 10. Mentors Registration
  createSheetIfNotExists(ss, SHEETS.MENTORS, [
    'mentor_id', 'application_date', 'first_name', 'last_name', 'email', 'expertise_area', 'message', 'status'
  ]);

  // 11. Donations
  createSheetIfNotExists(ss, SHEETS.DONATIONS, [
    'donation_id', 'date', 'donor_name', 'email', 'phone', 'amount', 'message', 'payment_status'
  ]);
  
  // 12. Messages
  createSheetIfNotExists(ss, SHEETS.MESSAGES, [
    'message_id', 'date', 'name', 'email', 'subject', 'message', 'status'
  ]);
  
  // 13. Newsletter Subscriptions
  createSheetIfNotExists(ss, SHEETS.NEWSLETTER_SUB, [
    'subscription_id', 'date', 'name', 'email', 'phone', 'status'
  ]);

  // 14. Events
  createSheetIfNotExists(ss, SHEETS.EVENTS, [
    'event_id', 'title', 'date', 'time', 'location', 'type', 'spots', 'color'
  ]);

  // 15. Event Registration
  createSheetIfNotExists(ss, SHEETS.EVENT_REGISTRATION, [
    'registration_id', 'date', 'name', 'email', 'phone', 'organization', 'event_id', 'event_title'
  ]);

  // 16. Site Admin
  createSheetIfNotExists(ss, SHEETS.SITE_ADMIN, [
    'admin_id', 'email', 'password', 'role', 'name'
  ]);
}

function createSheetIfNotExists(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Style headers
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f3f3f3');
    sheet.setFrozenRows(1);
  }
}

// --- Sample Data Function (Populates with App Data) ---
function fillSampleData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. STEAM Data
  const steamSheet = ss.getSheetByName(SHEETS.CONTENT_STEAM);
  if (steamSheet && steamSheet.getLastRow() === 1) {
    const steamData = [
      ['steam_1', 'Science', 'Gives tools to experiment, test, and evaluate ideas to understand the world.', 'FlaskConical', '#ef4444', 'Our Science curriculum covers Biotechnology, Agricultural Science, Chemical Science, and Environmental Science. Students engage in hands-on experiments to understand the fundamental laws of nature and apply them to solve local challenges.'],
      ['steam_2', 'Technology', 'Teaches how to process, connect, and make things in a variety of environments.', 'Cpu', '#f97316', 'Focuses on Electronics, IoT Systems, Computer Programming, and Digital Communications. Students learn to build smart devices, code applications, and leverage digital tools for industrial transformation.'],
      ['steam_3', 'Engineering', 'Teaches the cycle of innovation, inventing solutions, and making changes.', 'Compass', '#22c55e', 'Covers Architecture, Manufacturing, Process Automation, and Robotics. Students learn the engineering design process, from ideation to prototyping and final production.'],
      ['steam_4', 'Arts', 'Teaches symbolic & expressive capacities that reach across cultural barriers.', 'Palette', '#3b82f6', 'Integrates Fine Arts, Digital Arts, and Technical Arts. We believe creativity is the catalyst for innovation. Students explore graphics design, 3D modeling, and multimedia storytelling.'],
      ['steam_5', 'Mathematics', 'Provides the tools & structures to analyze facts, events, and scenarios.', 'Calculator', '#a855f7', 'Applied Mathematics, Statistics, and Data Science. We move beyond theory to application, using math to model real-world systems, analyze business data, and optimize industrial processes.']
    ];
    steamData.forEach(row => steamSheet.appendRow(row));
  }

  // 2. IE Data
  const ieSheet = ss.getSheetByName(SHEETS.CONTENT_IE);
  if (ieSheet && ieSheet.getLastRow() === 1) {
    const ieData = [
      ['ie_1', 'Innovation', 'Fostering a culture of creativity and problem-solving. We provide the tools and environment for students to experiment, prototype, and develop unique solutions to real-world challenges.', 'Lightbulb', '#f97316', 'Our Innovation hub focuses on Research & Development, Prototyping, and Design Thinking. We support students in protecting their intellectual property through patent support and connecting them with industrial partners for pilot testing.'],
      ['ie_2', 'Entrepreneurship', 'Building the business leaders of tomorrow. We offer incubation support, mentorship, and resources to help transform innovative projects into viable, scalable startups.', 'Rocket', '#22c55e', 'The Entrepreneurship track includes Business Incubation, Startup Mentorship, and Market Analysis. We guide young entrepreneurs through the entire lifecycle of a startup, from business plan development to securing seed funding and scaling operations.']
    ];
    ieData.forEach(row => ieSheet.appendRow(row));
  }

  // 3. Curriculum Data
  const currSheet = ss.getSheetByName(SHEETS.CONTENT_CURRICULUM);
  if (currSheet && currSheet.getLastRow() === 1) {
    const currData = [
      ['curr_1', 'Foundation', 'Science & Mathematics', '3 Months', 'The journey begins with curiosity. Students grasp the fundamental laws of nature (Science) and the logic of patterns (Math).', JSON.stringify(['Concept & Theory']), 'FlaskConical', '#ef4444'],
      ['curr_2', 'Creation', 'Engineering & Arts', '6 Months', 'Knowledge takes shape. Through Engineering, we build structure and function. Through Arts, we add human-centric design and aesthetics.', JSON.stringify(['Prototype & Design']), 'Hammer', '#f97316'],
      ['curr_3', 'Innovation', 'Technology', '6 Months', 'The prototype gets smarter. We integrate digital intelligence, automation, and connectivity.', JSON.stringify(['Smart Solution']), 'Cpu', '#22c55e'],
      ['curr_4', 'Enterprise', 'Entrepreneurship', '1 Year', 'The solution becomes a business. Students learn to package, market, and sell their innovation.', JSON.stringify(['Marketable Product']), 'Briefcase', '#3b82f6']
    ];
    currData.forEach(row => currSheet.appendRow(row));
  }

  // 4. Labs Data
  const labsSheet = ss.getSheetByName(SHEETS.CONTENT_LABS);
  if (labsSheet && labsSheet.getLastRow() === 1) {
    const labsData = [
      ['lab_1', 'Digital Labs', 'The Future of Classrooms. E-learning platforms for remote classes, using VR & AR as new training methods.', 'BookOpen', '#3b82f6', JSON.stringify(['VR Units', 'Computers', 'IoT Kits']), '500+ Students', JSON.stringify([{label: 'Students', value: '500+'}, {label: 'Courses', value: '25'}, {label: 'VR Units', value: '50'}]), 'Digital Labs are designed for learning skills using digital means. Includes Basic Literacy Skills (Language, Computer HW/SW) and Theoretical Skills delivered via virtual classrooms. Features a Data Center for digital solutions, IoT, and AI.', 'https://loremflickr.com/600/400/computer,code,classroom?lock=1'],
      ['lab_2', 'Fabrication Labs', 'Smart workshops for practical lessons. Prototyping & small scale production labs using smart fabrication technologies.', 'Factory', '#f97316', JSON.stringify(['CNC Machines', '3D Printers', 'Laser Cutters']), '200+ Tools', JSON.stringify([{label: 'Machines', value: '15+'}, {label: 'Tools', value: '200+'}, {label: 'Safety', value: '100%'}]), 'Workshops for hands-on skills using state-of-the-art tools. Covers Basic Tools Skills, Design & Fabrication (CAD/CAM), and Prototyping & Manufacturing. Learn to manufacture, distribute, and market products.', 'https://loremflickr.com/600/400/robotics,factory,workshop?lock=2'],
      ['lab_3', 'Field Labs', 'State of the Art field projects. On-the-job hands-on practical trainings and large scale production plants.', 'Sprout', '#22c55e', JSON.stringify(['Farm Equipment', 'Solar Arrays', 'Irrigation Systems']), '10 Sites', JSON.stringify([{label: 'Sites', value: '10'}, {label: 'Projects', value: '15'}, {label: 'Impact', value: 'High'}]), 'Includes Field Workshops for digital learning in the field, Practical Attachment for on-the-job training with professionals, and On-the-Job Trainings for short-term assignments on field projects.', 'https://loremflickr.com/600/400/agriculture,solar,farm?lock=3'],
      ['lab_4', 'Smart City Labs', 'A place for 10,000 to 100,000 innovators per region! Smart houses, smart factories, and smart businesses.', 'Building2', '#a855f7', JSON.stringify(['Smart Grid', 'Data Center', 'Incubator']), '10k+ Capacity', JSON.stringify([{label: 'Capacity', value: '10k+'}, {label: 'Zones', value: '3'}, {label: 'Vision', value: '2025'}]), 'Smart industrial cities built as a business & manufacturing hub. Features Smart Industry (Smart factories, R&D), Smart Business (Data centers, Incubation), and Smart Living (Budget housing, Smart energy, Smart farming).', 'https://loremflickr.com/600/400/smartcity,architecture,modern?lock=4']
    ];
    labsData.forEach(row => labsSheet.appendRow(row));
  }

  // 5. Projects Data
  const projectsSheet = ss.getSheetByName(SHEETS.CONTENT_PROJECTS);
  if (projectsSheet && projectsSheet.getLastRow() === 1) {
    const projectsData = [
      ['proj_1', 'Smart Agriculture', '5 Projects', 'Sprout', '#22c55e', JSON.stringify(['Phytoponics & Hydroponics', 'Vertical Agriculture', 'Smart Livestock Farming']), JSON.stringify([{label: 'Yield', value: '+300%'}, {label: 'Water', value: '-90%'}, {label: 'Space', value: 'Optimized'}]), 'Includes Phytoponics (Hydroponics farming powered by solar), Vertical agriculture systems for any size of space, and Smart Livestock Farming with automation in poultry farms. Aiming to increase vegetable production multiple folds.', ''],
      ['proj_2', 'Smart Healthcare', '10 Projects', 'HeartHandshake', '#ef4444', JSON.stringify(['Portable Smart Healthcare', '4G Enabled IT Systems', 'Solar Powered Medical Kits']), JSON.stringify([{label: 'Portability', value: '100%'}, {label: 'Access', value: 'Remote'}, {label: 'Cost', value: 'Low'}]), 'Highly portable smart healthcare systems that fit into a suitcase. Ultra-efficient 4G enabled IT systems including handheld ultrasound, smart phones, and wearable devices. Applications for cancer, HIV/AIDS, Diabetes, and emergency care.', ''],
      ['proj_3', 'Smart Manufacturing', '12 Projects', 'Factory', '#f97316', JSON.stringify(['Smart Factories', 'Specialty Robotics', 'Process Automation']), JSON.stringify([{label: 'Efficiency', value: 'High'}, {label: 'Waste', value: 'Zero'}, {label: 'Quality', value: 'Best'}]), 'Smart factories for different industrial sectors. Includes Smart Industrial Robotics (Computer Aided Design, Machine Assembly), and Smart Metal, Plastic, Wood, Textile & Leather Works using small-scale fabrication technologies.', ''],
      ['proj_4', 'Smart Construction', '7 Projects', 'Building2', '#3b82f6', JSON.stringify(['3D House Printing', 'Modular Prefabrication', 'Digital Construction Mgmt']), JSON.stringify([{label: 'Speed', value: 'Fast'}, {label: 'Cost', value: 'Affordable'}, {label: 'Eco', value: 'Friendly'}]), 'Use of state-of-the-art technologies to build smart industrial villages. Resource efficient tools including 3D house printing machineries and modular concrete prefabrication technologies for rural areas.', ''],
      ['proj_5', 'Smart Mobility', '5 Projects', 'Car', '#a855f7', JSON.stringify(['Electric UTVs/ATVs', 'Solar Powered Batteries', 'Smart Traffic Systems']), JSON.stringify([{label: 'Cost', value: '-40%'}, {label: 'Emission', value: '0%'}, {label: 'Range', value: '150km'}]), 'Modular city mobility solutions and electric utility vehicles for rural Ethiopia. Powered by efficient battery packs and solar charging. Includes conversion kits for old engines to electric.', ''],
      ['proj_6', 'Smart Energy', '5 Projects', 'Zap', '#22c55e', JSON.stringify(['Modular Wind Energy', 'Micro Hydropower', 'Off-grid Metering']), JSON.stringify([{label: 'Power', value: '24/7'}, {label: 'Green', value: '100%'}, {label: 'Cost', value: 'Low'}]), 'Harvesting green energy using modular systems. Bringing electricity to villages not connected to the national grid using solar, wind, and hydro sources. Smart off-grid metering systems.', ''],
      ['proj_7', 'Smart Finance', '6 Projects', 'Coins', '#ef4444', JSON.stringify(['Digital Coins', 'Smart POS Systems', 'Mobile Payments']), JSON.stringify([{label: 'Speed', value: 'Instant'}, {label: 'Security', value: 'High'}, {label: 'Access', value: 'All'}]), 'Integration of digital payment solutions and smart POS infrastructures. Enabling safe and secured transactions across all industries and private citizens. Includes crypto currency integration.', ''],
      ['proj_8', 'Smart Education', '7 Projects', 'GraduationCap', '#f97316', JSON.stringify(['E-learning Platforms', 'VR/AR Classrooms', 'STEM Kits']), JSON.stringify([{label: 'Reach', value: 'Remote'}, {label: 'Content', value: 'Rich'}, {label: 'Skills', value: 'Future'}]), 'Smart education delivery including remote areas. Offers highly specialized technical skills and content-oriented practical lessons via digital platforms and virtual reality.', ''],
      ['proj_9', 'Smart Lifestyle', '3 Projects', 'Home', '#3b82f6', JSON.stringify(['Smart Cooking Stoves', 'Solar LED Lamps', 'Android TV Systems']), JSON.stringify([{label: 'Smoke', value: '0%'}, {label: 'Power', value: 'Solar'}, {label: 'Life', value: 'Better'}]), 'Improving daily life with smart home technologies. Includes smokeless cooking stoves using biodegradable fuel, efficient solar lighting, and educational entertainment systems.', ''],
      ['proj_10', 'Smart Environment', '4 Projects', 'Recycle', '#a855f7', JSON.stringify(['Plastic Recycling', 'Textile Waste Mgmt', 'Bio-fuel Production']), JSON.stringify([{label: 'Waste', value: '-80%'}, {label: 'Value', value: 'Added'}, {label: 'Eco', value: 'Safe'}]), 'Small scale recycling plants for textiles and plastic wastes. Converting waste into usable products and energy sources. Environmentally friendly and safe operating atmosphere.', ''],
      ['proj_11', 'Smart Infrastructure', '12 Projects', 'Server', '#22c55e', JSON.stringify(['National Data Centers', 'Smart Roads', 'Digital Services']), JSON.stringify([{label: 'Uptime', value: '99.9%'}, {label: 'Connect', value: 'Fast'}, {label: 'Data', value: 'Secure'}]), 'Nationally connected data centers and smart road construction technologies for efficient transportation, supply chain, and logistics. Digital services for every industrial sector.', ''],
      ['proj_12', 'Smart Governance', '15 Projects', 'Landmark', '#ef4444', JSON.stringify(['Public Service Apps', 'Digital ID Systems', 'Civic Engagement']), JSON.stringify([{label: 'Service', value: 'Fast'}, {label: 'Transp.', value: '100%'}, {label: 'Access', value: 'Easy'}]), 'Digitizing public services for better governance. Smart systems for efficient administration, citizen engagement, and smart public projects.', '']
    ];
    projectsData.forEach(row => projectsSheet.appendRow(row));
  }
  
  // 6a. Innovator Spotlight Data
  const spotlightSheet = ss.getSheetByName(SHEETS.CONTENT_SPOTLIGHT);
  if (spotlightSheet && spotlightSheet.getLastRow() === 1) {
    const spotlightData = [
      ['1', 'Betelhem Desalegn', 'Solar-Smart Irrigation', 'https://loremflickr.com/400/400/student,ethiopian,woman?lock=5', 'https://loremflickr.com/400/300/solar,sensor,farm?lock=6', 'Local farmers were losing 30% of crops due to improper watering and water scarcity.', 'Developed a low-cost, solar-powered soil moisture sensor that automates irrigation, saving 40% water.', 'Deployed in 5 local farms.'],
      ['2', 'Yared Haile', '3D Printed Mobility', 'https://loremflickr.com/400/400/student,ethiopian,man?lock=7', 'https://loremflickr.com/400/300/prosthetic,3dprint?lock=8', 'Prosthetic limbs are too expensive for many rural amputees.', 'Created a customizable, 3D-printed prosthetic leg using recycled plastics for under $50.', 'Helped 12 patients regain mobility.'],
      ['3', 'Saron & Team', 'Agri-AI Doctor', 'https://loremflickr.com/400/400/students,team,africa?lock=9', 'https://loremflickr.com/400/300/app,farming,phone?lock=10', 'Crop diseases spread unnoticed, destroying entire harvests.', 'Built an offline AI app that detects plant diseases from a simple photo and suggests organic remedies.', 'Used by 200+ smallholder farmers.']
    ];
    spotlightData.forEach(row => spotlightSheet.appendRow(row));
  }

  // 6b. Latest Videos Data
  const videosSheet = ss.getSheetByName(SHEETS.CONTENT_VIDEOS);
  if (videosSheet && videosSheet.getLastRow() === 1) {
    const videosData = [
      ['1', 'CLIC Ethiopia Official Launch', 'https://loremflickr.com/640/360/conference,ethiopia?lock=11', '12:45', 'LXb3EKWsInQ'],
      ['2', 'Student Success Stories: Smart Agriculture', 'https://loremflickr.com/640/360/farming,technology?lock=12', '05:30', 'ysz5S6P_z-U'],
      ['3', 'Tour of the New Fabrication Lab', 'https://loremflickr.com/640/360/laboratory,robotics?lock=13', '08:15', 'M7lc1UVf-VE'],
      ['4', 'Interview with Dr. Frehun Adefris', 'https://loremflickr.com/640/360/interview,man?lock=14', '24:10', 'ScMzIvxBSi4'],
      ['5', 'STEAM Education in Rural Areas', 'https://loremflickr.com/640/360/education,rural?lock=15', '15:20', 'LXb3EKWsInQ'],
      ['6', 'Future of Tech in Ethiopia', 'https://loremflickr.com/640/360/tech,future?lock=16', '45:00', 'ysz5S6P_z-U']
    ];
    videosData.forEach(row => videosSheet.appendRow(row));
  }

  // 7. Products Data (Merch)
  const prodSheet = ss.getSheetByName(SHEETS.PRODUCTS);
  if (prodSheet && prodSheet.getLastRow() === 1) {
    const prodData = [
      ['prod_1', "CLIC 'Future Innovator' Tee", 450, "Apparel", "https://loremflickr.com/600/600/tshirt,tech,fashion?lock=17", "Premium cotton t-shirt featuring the 'Future Innovator' slogan. Perfect for lab work or casual wear.", JSON.stringify([{name:"Size",values:["XXS","XS","S","M","L","XL","XXL"]},{name:"Color",values:["White","Black","Navy Blue"]}]), 'In Stock'],
      ['prod_2', "Official CLIC Hoodie", 1200, "Apparel", "https://loremflickr.com/600/600/hoodie,streetwear?lock=18", "Warm and comfortable hoodie with the embroidered CLIC logo. Essential for late-night coding sessions.", JSON.stringify([{name:"Size",values:["XS","S","M","L","XL","XXL"]},{name:"Color",values:["Heather Grey","Black"]}]), 'In Stock'],
      ['prod_3', "STEAM-IE Canvas Tote", 300, "Accessories", "https://loremflickr.com/600/600/bag,tote?lock=19", "Durable canvas tote bag, spacious enough for your laptop and project materials.", JSON.stringify([{name:"Color",values:["Natural","Black"]}]), 'In Stock'],
      ['prod_4', "Engineering Grid Notebook", 250, "Stationery", "https://loremflickr.com/600/600/notebook,stationery?lock=20", "High-quality grid paper notebook for sketching designs, drafting circuits, and taking notes.", JSON.stringify([{name:"Type",values:["Grid","Lined","Blank"]}]), 'In Stock'],
      ['prod_5', "CLIC Snapback Cap", 350, "Apparel", "https://loremflickr.com/600/600/cap,hat?lock=21", "Adjustable snapback cap with 3D puff embroidery. Represents the CLIC community style.", JSON.stringify([{name:"Color",values:["Black","Navy","Red"]}]), 'In Stock'],
      ['prod_6', "Eco-Metal Water Bottle", 500, "Accessories", "https://loremflickr.com/600/600/bottle,water?lock=22", "Stainless steel water bottle to keep you hydrated during long workshops. Eco-friendly and durable.", JSON.stringify([{name:"Color",values:["Silver","Matte Black","Blue"]}]), 'In Stock']
    ];
    prodData.forEach(row => prodSheet.appendRow(row));
  }

  // 8. Events Data
  const eventsSheet = ss.getSheetByName(SHEETS.EVENTS);
  if (eventsSheet && eventsSheet.getLastRow() === 1) {
    const eventsData = [
      ['1', 'National STEAM Hackathon', 'Oct 15, 2026', '09:00 AM - 05:00 PM', 'Addis Ababa University', 'Hackathon', 200, 'var(--color-clic-blue)'],
      ['2', 'Fad.Lab Instructor Training', 'Nov 02, 2026', '10:00 AM - 03:00 PM', 'Virtual', 'Workshop', 50, 'var(--color-clic-orange)'],
      ['3', 'Women in Tech Bootcamp', 'Nov 20, 2026', '08:00 AM - 04:00 PM', 'CLIC HQ, Addis Ababa', 'Bootcamp', 100, 'var(--color-clic-red)'],
      ['4', 'AI for Agriculture Symposium', 'Dec 05, 2026', '09:00 AM - 12:00 PM', 'Hawassa University', 'Symposium', 150, 'var(--color-clic-green)']
    ];
    eventsData.forEach(row => eventsSheet.appendRow(row));
  }

  // 9. Event Registration Data
  const eventRegSheet = ss.getSheetByName(SHEETS.EVENT_REGISTRATION);
  if (eventRegSheet && eventRegSheet.getLastRow() === 1) {
    const eventRegData = [
      ['reg_1', new Date().toISOString(), 'Abebe Bikila', 'abebe@example.com', '+251911234567', 'AAU', '1', 'National STEAM Hackathon'],
      ['reg_2', new Date().toISOString(), 'Tirunesh Dibaba', 'tirunesh@example.com', '+251911234568', 'Hawassa Uni', '4', 'AI for Agriculture Symposium']
    ];
    eventRegData.forEach(row => eventRegSheet.appendRow(row));
  }
}

// --- API Endpoints ---

/**
 * Handle GET requests (Read Data)
 * Query Params:
 * - type: 'steam', 'ie', 'curriculum', 'labs', 'projects', 'spotlight', 'videos', 'products'
 */
function doGet(e) {
  try {
    const params = e.parameter;
    const type = params.type;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    let sheetName = '';

    switch(type) {
      case 'steam': sheetName = SHEETS.CONTENT_STEAM; break;
      case 'ie': sheetName = SHEETS.CONTENT_IE; break;
      case 'curriculum': sheetName = SHEETS.CONTENT_CURRICULUM; break;
      case 'labs': sheetName = SHEETS.CONTENT_LABS; break;
      case 'projects': sheetName = SHEETS.CONTENT_PROJECTS; break;
      case 'spotlight': sheetName = SHEETS.CONTENT_SPOTLIGHT; break;
      case 'videos': sheetName = SHEETS.CONTENT_VIDEOS; break;
      case 'products': sheetName = SHEETS.PRODUCTS; break;
      case 'events': sheetName = SHEETS.EVENTS; break;
      default: 
        return ContentService.createTextOutput(JSON.stringify({status: 'error', message: "Invalid or missing 'type' parameter"}))
          .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
       return ContentService.createTextOutput(JSON.stringify({status: 'success', data: []}))
          .setMimeType(ContentService.MimeType.JSON);
    }

    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    let data = [];
    
    for (let i = 1; i < rows.length; i++) {
      let row = rows[i];
      let obj = {};
      for (let j = 0; j < headers.length; j++) {
        let header = headers[j];
        let value = row[j];
        
        // Parse JSON fields automatically
        if (header.includes('_json')) {
          try {
            obj[header.replace('_json', '')] = JSON.parse(value);
          } catch (e) {
            obj[header.replace('_json', '')] = []; // Fallback to empty array/object
          }
        } else {
          obj[header] = value;
        }
      }
      data.push(obj);
    }

    return ContentService.createTextOutput(JSON.stringify({status: 'success', data: data}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests (Write Data)
 * Actions:
 * - action: 'create_order', 'register_student', 'register_mentor', 'donate'
 */
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    let postData;
    if (e.postData && e.postData.type === 'application/json') {
      postData = JSON.parse(e.postData.contents);
    } else {
      postData = e.parameter;
    }
    const action = postData.action;
    
    // 1. Create Order
    if (action === 'create_order') {
      const sheet = ss.getSheetByName(SHEETS.ORDERS);
      const orderId = 'ORD-' + Date.now();
      
      // If postData came from parameter, items is already a string. If from JSON, it's an object/array.
      const itemsStr = typeof postData.items === 'string' ? postData.items : JSON.stringify(postData.items);
      
      const newRow = [
        orderId,
        new Date(),
        'Pending',
        postData.name,
        postData.email,
        postData.phone,
        postData.address,
        itemsStr,
        postData.total,
        'Manual/Cash'
      ];
      sheet.appendRow(newRow);
      return responseJSON({status: 'success', orderId: orderId, message: 'Order placed successfully'});
    }
    
    // 2. Register Student
    if (action === 'register_student') {
      const sheet = ss.getSheetByName(SHEETS.STUDENTS);
      const studentId = 'STU-' + Date.now();
      
      const interestsStr = typeof postData.interests === 'string' ? postData.interests : JSON.stringify(postData.interests);
      
      const newRow = [
        studentId,
        new Date(),
        postData.firstName,
        postData.lastName,
        postData.email,
        postData.membershipType,
        interestsStr,
        'Pending'
      ];
      sheet.appendRow(newRow);
      return responseJSON({status: 'success', studentId: studentId, message: 'Student registration submitted'});
    }

    // 3. Register Mentor
    if (action === 'register_mentor') {
      const sheet = ss.getSheetByName(SHEETS.MENTORS);
      const mentorId = 'MNT-' + Date.now();
      const newRow = [
        mentorId,
        new Date(),
        postData.firstName,
        postData.lastName,
        postData.email,
        postData.expertise,
        postData.message,
        'Pending'
      ];
      sheet.appendRow(newRow);
      return responseJSON({status: 'success', mentorId: mentorId, message: 'Mentor application submitted'});
    }

    // 4. Donate
    if (action === 'donate') {
      const sheet = ss.getSheetByName(SHEETS.DONATIONS);
      const donationId = 'DON-' + Date.now();
      const newRow = [
        donationId,
        new Date(),
        postData.name,
        postData.email,
        postData.phone,
        postData.amount,
        postData.message,
        'Confirmed' // Mock success
      ];
      sheet.appendRow(newRow);
      return responseJSON({status: 'success', donationId: donationId, message: 'Donation recorded'});
    }

    // 5. Subscribe Newsletter
    if (action === 'subscribe_newsletter') {
      const sheet = ss.getSheetByName(SHEETS.NEWSLETTER_SUB);
      
      // Check if email already exists
      const data = sheet.getDataRange().getValues();
      const emailIndex = 3; // 0-indexed, email is the 4th column
      for (let i = 1; i < data.length; i++) {
        if (data[i][emailIndex] === postData.email) {
          return responseJSON({status: 'error', message: 'Email already exists. Please use an alternative email.'});
        }
      }

      const subId = 'SUB-' + Date.now();
      const newRow = [
        subId,
        new Date(),
        postData.name,
        postData.email,
        postData.phone,
        'Active'
      ];
      sheet.appendRow(newRow);
      return responseJSON({status: 'success', subId: subId, message: 'Subscription recorded'});
    }

    // 6. Register Event
    if (action === 'register_event') {
      const sheet = ss.getSheetByName(SHEETS.EVENT_REGISTRATION);
      const regId = 'REG-' + Date.now();
      const newRow = [
        regId,
        new Date(),
        postData.name,
        postData.email,
        postData.phone,
        postData.organization,
        postData.eventId,
        postData.eventTitle
      ];
      sheet.appendRow(newRow);
      return responseJSON({status: 'success', regId: regId, message: 'Event registration submitted'});
    }

    // 7. Admin Login
    if (action === 'admin_login') {
      let sheet = ss.getSheetByName(SHEETS.SITE_ADMIN);
      if (!sheet) {
        // Auto-create sheet and default admin if it doesn't exist
        sheet = ss.insertSheet(SHEETS.SITE_ADMIN);
        sheet.appendRow(['admin_id', 'email', 'password', 'role', 'name']);
        sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f3f3f3');
        sheet.setFrozenRows(1);
        sheet.appendRow(['admin_1', 'clic.ethiopia@gmail.com', 'admin123', 'Super Admin', 'CLIC Admin']);
      }
      
      const data = sheet.getDataRange().getValues();
      const emailIndex = 1;
      const passIndex = 2;
      
      for (let i = 1; i < data.length; i++) {
        if (data[i][emailIndex] === postData.email && data[i][passIndex] === postData.password) {
          return responseJSON({
            status: 'success', 
            message: 'Login successful',
            user: {
              id: data[i][0],
              email: data[i][1],
              role: data[i][3],
              name: data[i][4]
            }
          });
        }
      }
      return responseJSON({status: 'error', message: 'Invalid credentials'});
    }

    // 7. Admin Get Data
    if (action === 'admin_get_data') {
      // In a real app, verify token here
      const sheetName = postData.sheetName;
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) return responseJSON({status: 'error', message: 'Sheet not found. Please run setupDatabase() in Apps Script.'});
      
      const rows = sheet.getDataRange().getValues();
      if (!rows || rows.length === 0 || (rows.length === 1 && rows[0].length === 1 && rows[0][0] === '')) {
         return responseJSON({status: 'success', data: [], headers: []});
      }
      
      const headers = rows[0];
      let data = [];
      
      for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = row[j];
        }
        data.push(obj);
      }
      return responseJSON({status: 'success', data: data, headers: headers});
    }

    // 8. Admin Add Row
    if (action === 'admin_add_row') {
      const sheetName = postData.sheetName;
      const rowData = JSON.parse(postData.rowData);
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) return responseJSON({status: 'error', message: 'Sheet not found'});
      
      const headers = sheet.getDataRange().getValues()[0];
      const newRow = headers.map(h => rowData[h] || '');
      
      // Auto-generate ID if first column is an ID column and is empty
      if (headers[0].toLowerCase().includes('id') && !newRow[0]) {
        newRow[0] = 'ID-' + Date.now();
      }
      
      sheet.appendRow(newRow);
      return responseJSON({status: 'success', message: 'Row added'});
    }

    // 9. Admin Update Row
    if (action === 'admin_update_row') {
      const sheetName = postData.sheetName;
      const rowIndex = parseInt(postData.rowIndex); // 0-indexed relative to data array (so row 2 in sheet is index 0)
      const rowData = JSON.parse(postData.rowData);
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) return responseJSON({status: 'error', message: 'Sheet not found'});
      
      const headers = sheet.getDataRange().getValues()[0];
      const updateRow = headers.map(h => rowData[h] || '');
      
      // +2 because rowIndex 0 is row 2 in sheet (row 1 is headers)
      sheet.getRange(rowIndex + 2, 1, 1, headers.length).setValues([updateRow]);
      return responseJSON({status: 'success', message: 'Row updated'});
    }

    // 10. Admin Delete Row
    if (action === 'admin_delete_row') {
      const sheetName = postData.sheetName;
      const rowIndex = parseInt(postData.rowIndex);
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) return responseJSON({status: 'error', message: 'Sheet not found'});
      
      sheet.deleteRow(rowIndex + 2);
      return responseJSON({status: 'success', message: 'Row deleted'});
    }

    return responseJSON({status: 'error', message: 'Invalid action'});
    
  } catch (error) {
    return responseJSON({status: 'error', message: error.toString()});
  }
}

function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
