import discord, json, re, datetime
from discord.ext import commands
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

bot = commands.Bot(command_prefix='>', self_bot=True, chunk_guilds_at_startup=False)

ALLOWED_CHANNEL_IDS = [1268207657207206010]
LOGS_FILE = 'logs.json'

def save_detection_data(data):
    try:
        file_path = LOGS_FILE

        try:
            with open(file_path, 'r') as file:
                all_data = json.load(file)
        except FileNotFoundError:
            all_data = []
        all_data.append(data)
        with open(file_path, 'w') as file:
            json.dump(all_data, file, indent=4)
    except Exception as e:
        print(f"Failed to save data: {e}")

def has_user_been_logged(user_id):
    try:
        with open(LOGS_FILE, 'r') as file:
            all_data = json.load(file)
            return any(isinstance(entry, dict) and entry.get('user_id') == user_id for entry in all_data)
    except (FileNotFoundError, json.JSONDecodeError):
        return False

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')

@bot.event
async def on_message(message):
    try:
        if message.author == bot.user:
            return  
        if message.channel.id not in ALLOWED_CHANNEL_IDS:
            return
        
        # Check if this is the first message from this user
        if not has_user_been_logged(message.author.id):
            user_data = {
                'user_id': message.author.id,
                'username': str(message.author),
                'display_name': message.author.display_name,
                'description': message.author.description,
                'date_first_message': datetime.datetime.now().isoformat(),
                'server_id': message.guild.id if message.guild else None,
                'channel_id': message.channel.id,
                'first_message': message.content
            }
            save_detection_data(user_data)
            print(f"Logged new user: {user_data['username']}")
    except Exception as e:
        print(f"Error in on_message: {e}")

try:
    # Get token from environment variables
    token = os.getenv('DISCORD_TOKEN')
    if not token:
        raise ValueError("No token found in .env file")
    bot.run(token.strip(), bot=False)
except Exception as e:
    print(f"Failed to start bot: {e}")
