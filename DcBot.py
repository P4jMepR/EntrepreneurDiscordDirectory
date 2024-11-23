import json, datetime, requests
import re
from discord.ext import commands
from dotenv import load_dotenv
import os

load_dotenv(".env")

bot = commands.Bot(command_prefix='', self_bot=True, chunk_guilds_at_startup=False)

ALLOWED_CHANNEL_IDS = [1259935421194960968, 1268207657207206010] # 1259935421194960968 - #Furlough main / general, 1268207657207206010 - #Quantum's bot-testing
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

def extract_links(text):
    url_pattern = r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
    return re.findall(url_pattern, text)

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
        
        if not has_user_been_logged(message.author.id):

            url = f'https://discord.com/api/v9/users/{message.author.id}/profile'
            params = {'with_mutual_guilds': 'true', 'with_mutual_friends': 'true', 'with_mutual_friends_count': 'false', 'guild_id': str(message.guild.id)}
            
            headers = {
                'accept': '*/*',
                'accept-language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6',
                'authorization': os.getenv('DISCORD_TOKEN'),
                'x-discord-locale': 'pl',
                'x-discord-timezone': 'Europe/Warsaw'
            }
            
            response = requests.get(url, params=params, headers=headers)
            profile = response.json()
            try:
                bio = (profile.get('user', {}).get('bio') or 
                      profile.get('user_profile', {}).get('bio') or 
                      profile.get('guild_member', {}).get('bio') or 
                      profile.get('guild_member_profile', {}).get('bio') or '')
            except Exception as e:
                bio = ''

            links = extract_links(bio)

            user_data = {
                'user_id': message.author.id,
                'username': str(message.author).split("#")[0],
                'bio': bio,
                'links': links,
                'date_first_message': datetime.datetime.now().isoformat()
            }
            save_detection_data(user_data)
            print(f"Logged new user: {user_data['username']}")
            print(f"Bio: {user_data['bio']}")
            print(f"Links found: {user_data['links']}")
    except Exception as e:
        print(f"Error in on_message: {e}")

try:
    token = os.getenv('DISCORD_TOKEN')
    if not token:
        raise ValueError("No token found in .env file")    
    bot.run(token.strip(), bot=False)

except Exception as e:

    print(f"Failed to start bot: {e}")
