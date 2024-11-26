# Project Name

A web application with an integrated Discord bot.

## Stack

### Web Application
- **Framework**: TypeScript & Remix
- **Styling**: TailwindCSS
- **Components**: Shadcn UI
- **Accessibility**: Radix UI
- **Icons**: Lucide
- **Linting**: Biome

### Discord Bot
- **Language**: Python
- **Database**: MongoDB
- **Libraries**:
  - discord.py (Discord API)
  - Pillow (Image processing)
  - python-dotenv (Environment variables)
  - pymongo (MongoDB client)
  - requests (HTTP client)

## Getting Started

### Web Application Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3105](http://localhost:3105) in your browser

### Discord Bot Setup

1. Install Python dependencies:
```bash
# Windows
python -m pip install -r Bot/requirements.txt

# Unix/MacOS
python3 -m pip install -r Bot/requirements.txt
```

2. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add your Discord bot token: `DISCORD_TOKEN=your_token_here`

   ![Discord Token Location](https://camo.githubusercontent.com/500b4e0690d83f3db5cd08f44bc4efe41d49fa0b658f923e8140fdb1d922df1e/687474703a2f2f692e696d6775722e636f6d2f5861546c386b412e706e67)

3. Start the bot:
```bash
# Windows
python Bot/DcBot.py

# Unix/MacOS
python3 Bot/DcBot.py
```