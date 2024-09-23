const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JPV1RwSnlzSERpRWFuQlpHK0QrWmVONmdMSlZJOWVCY2svMTY2TFJGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk9taGw0QjBtVFl1M002ZkFFRXlFbEhvVDNoTkw4c1RhSXVIT3lnUndoVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSm94azNscy9MS280LzdRZHpWT0hOeWdNOEpLeXpaZUIyTWhqOGpoUW4wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoamdTRS9xVjk0b2JwK3FqR0Nad0xKSjVmemlpQ2xraVQwRElzM1NXZGpBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktMLzRJYlFiM2xZb1AxT3ZNd200c0N2cVNXaFVWelo2NGIybmFhOUpLV009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJ5MCtGdWI4ZVRPLzdBbms1N3l2OGd0RnhGb09QSzdhUXNCWXBwQ2dsa2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkpwLzU1ckpCeVQvNU9jNDd0Q20yTHAvQUR6dFpxSUVSTWJtQ2dJLy8yVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkJHTFJtTDZPSFBjbkUzS1l6VWM1N0R6dUFNbVdGclU0NHl5RTMySmRUQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkMxcHlXM3l2bVorSE5Cc2h1UGZGMG56eTB6Z3JQaTgyRllGZ0RmTmlJeWxJTVZIOFFWRTdOdU1NVG9KVFYra1JRaWtoU1RyZTVQL0tWRU92RmRnYUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiJ2MzJ4aVpVaStRcWJkcWpmWjUyWndUYXcwUkZFbEJLVGw1YVZCdndTeFV3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzgyNTQzODkzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkYzM0FFODg1QjgwQ0I4NUFBQzA3QUIyRDU1NzUxNEFDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjcwNjExOTV9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzgyNTQzODkzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVEQjU0Qjc2ODI3NkM0RDZGQTMyRTBFMjMxNkZFOTk5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjcwNjExOTZ9XSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlhEMXZ5bm84UzVxQU1Kb2k2Z0JIUHciLCJwaG9uZUlkIjoiYTgzYjk0MjktOTk0Ni00NmIxLWEyM2MtYzlkN2Y4NjYwYzUyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYwTm9PdFdQQS93cms4NUlsdlFQUTlkdVJEWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNaEZubmpraVhVeEpZMUwrMWphZVdMMHYzem89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSjQzVDlaSkwiLCJtZSI6eyJpZCI6Ijk0NzgyNTQzODkzOjc3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCfq7Dwn5KASXQncyBNZSDwn5KB8J+Pu+KAjeKZgu+4j0hhc2hhbi4uLuKYoO+4j/CfkpPimqHimqHimqEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05Uc3AvNEVFTHU1dzdjR0dBa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjFFQ2hYOHZSdUMvYVVVOUtnZ0FodFhETzJlTGhmL1VsVGlMYkovMzhJMFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjVhbEJPV2JwMnZjZm5LaEQ3UHdIQjRJN3Q1OUk3bC9OZ1lkY1ZPY0FEbGhNY2lCdmNtcm5WMnh0cVpOWEROOWJuZVVhVFdONjJ4a2FKeXduSlJxREFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0UlVHRm5Tb3hMYmF0OEIvRzdNaWRaMlZLZGlFQ2ZRbEs5N0VkMysxVjdHanFLM1FJRFpsc3JZUVR1amdQMVVjV0lMME5rM1ByYmJDOTRlRXpsOVNCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzgyNTQzODkzOjc3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRSQW9WL0wwYmd2MmxGUFNvSUFJYlZ3enRuaTRYLzFKVTRpMnlmOS9DTkUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjcwNjExOTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRU14In0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Hashan🐼☠️",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94782543893",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7721cf222f9790f3fcd1b.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
