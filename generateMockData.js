import fs from 'fs';

const countries = [
    "Argentina", "Australia", "Brazil", "Canada", "China", "France", "Germany", "India", "Indonesia", "Italy",
    "Japan", "Mexico", "Netherlands", "Philippines", "Poland", "Russia", "South Korea", "Spain", "Sweden",
    "Thailand", "Turkey", "UK", "USA", "Vietnam"
];

const assignees = ['Alex', 'Bryan', 'Sarah', 'Mike', 'Jessica'];
const sources = ['Global Game Jam 2024', 'Organic', 'Cold Mail', 'Referral', 'Game Jam', 'LinkedIn', 'Twitter'];
const stages = ['new', 'outreach', 'negotiating', 'signed', 'rejected'];
const gamePrefixes = ['Super', 'Mega', 'Ultra', 'Hyper', 'Epic', 'Tiny', 'Pixel', 'Voxel', 'Cyber', 'Space'];
const gameSuffixes = ['Runner', 'Tycoon', 'Simulator', 'RPG', 'Fighter', 'Puzzle', 'Shooter', 'Racer', 'Builder', 'Quest'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateGames = () => {
    const numGames = Math.floor(Math.random() * 3) + 1;
    const games = [];
    for (let i = 0; i < numGames; i++) {
        games.push(`${getRandomElement(gamePrefixes)} ${getRandomElement(gameSuffixes)}`);
    }
    return games;
};

const initialLeads = {
    'lead-1': { id: 'lead-1', name: 'PixelMaster_KR', legalName: 'Min-ho Park', email: 'minho@example.com', discordId: 'pixelmaster#1234', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel', games: ['Space Jump', 'K-Pop Tycoon'], stage: 'negotiating', country: 'South Korea', notes: [], assignee: 'Alex', source: 'Global Game Jam 2024' },
    'lead-2': { id: 'lead-2', name: 'BuilderBob', legalName: 'Bob Smith', email: 'bob@example.com', discordId: 'builderbob#5678', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', games: ['Mega Obby', 'City Life RP'], stage: 'signed', country: 'USA', notes: [], assignee: 'Bryan', source: 'Organic' },
    'lead-3': { id: 'lead-3', name: 'AnimeDev_JP', legalName: 'Kenji Sato', email: 'kenji@example.com', discordId: 'animedev#9012', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anime', games: ['Ninja Fight', 'RPG World'], stage: 'outreach', country: 'Japan', notes: [], assignee: 'Sarah', source: 'Cold Mail' },
    'lead-4': { id: 'lead-4', name: 'CreativeMind', legalName: 'Emily Jones', email: 'emily@example.com', discordId: 'creative#3456', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mind', games: ['Pet Simulator', 'Fashion Show'], stage: 'new', country: 'UK', notes: [], assignee: 'Alex', source: 'Referral' },
    'lead-5': { id: 'lead-5', name: 'RedDragon', legalName: 'Wei Chen', email: 'wei@example.com', discordId: 'reddragon#7890', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Red', games: ['Dungeon Crawler'], stage: 'rejected', country: 'China', notes: [], assignee: 'Bryan', source: 'Organic' },
    'lead-6': { id: 'lead-6', name: 'SpeedRunner', legalName: 'Lucas Silva', email: 'lucas@example.com', discordId: 'speed#2345', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Speed', games: ['Parkour Pro', 'Lava Run'], stage: 'negotiating', country: 'Brazil', notes: [], assignee: 'Sarah', source: 'Game Jam' },
    'lead-7': { id: 'lead-7', name: 'VoxelArtist', legalName: 'Sarah Miller', email: 'sarah@example.com', discordId: 'voxel#6789', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Voxel', games: ['Block City', 'Survival Island'], stage: 'new', country: 'Canada', notes: [], assignee: 'Alex', source: 'Cold Mail' },
};

const leads = { ...initialLeads };
const columns = {
    'new': { id: 'new', title: 'New Leads', leadIds: ['lead-4', 'lead-7'] },
    'outreach': { id: 'outreach', title: 'Outreach', leadIds: ['lead-3'] },
    'negotiating': { id: 'negotiating', title: 'Negotiating', leadIds: ['lead-1', 'lead-6'] },
    'signed': { id: 'signed', title: 'Signed', leadIds: ['lead-2'] },
    'rejected': { id: 'rejected', title: 'Rejected', leadIds: ['lead-5'] },
};

for (let i = 8; i <= 57; i++) {
    const id = `lead-${i}`;
    const name = `Creator_${i}`;
    const legalName = `Legal Name ${i}`;
    const email = `creator${i}@example.com`;
    const discordId = `creator${i}#${Math.floor(1000 + Math.random() * 9000)}`;
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
    const games = generateGames();
    const stage = getRandomElement(stages);
    const country = getRandomElement(countries);
    const assignee = getRandomElement(assignees);
    const source = getRandomElement(sources);

    leads[id] = {
        id, name, legalName, email, discordId, avatar, games, stage, country, notes: [], assignee, source
    };

    columns[stage].leadIds.push(id);
}

const output = `export const initialData = {
    leads: ${JSON.stringify(leads, null, 4)},
    columns: ${JSON.stringify(columns, null, 4)},
    columnOrder: ['new', 'outreach', 'negotiating', 'signed', 'rejected'],
};`;

fs.writeFileSync('src/data/mockData.js', output);
console.log('Mock data generated successfully!');
