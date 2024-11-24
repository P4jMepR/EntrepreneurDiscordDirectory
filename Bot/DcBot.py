import json, datetime, requests, re, os, base64
from discord.ext import commands
from dotenv import load_dotenv
from pymongo import MongoClient



load_dotenv("../.env")
screenshots_api_key = os.getenv('TOKEN_SCREENSHOT_API')
discord_token = os.getenv('DISCORD_TOKEN')




# MONGO_URI = f"mongodb://{os.getenv('MONGO_USERNAME')}:{os.getenv('MONGO_PASSWORD')}@{os.getenv('MONGO_HOST')}:{os.getenv('MONGO_PORT')}"
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client['furlough']
users_collection = db['users']

bot = commands.Bot(command_prefix='', self_bot=True, chunk_guilds_at_startup=False)

ALLOWED_CHANNEL_IDS = [1259935421194960968, 1268207657207206010] # First - #Furlough main / general, Second - #Quantum's bot-testing
LOGS_FILE = 'logs.json'

async def get_screenshot(url):
    try:
        screenshot_api_url = 'https://windmill.goodwatch.app/api/w/flickvibe/jobs/run_wait_result/p/f/other/screenshot'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {screenshots_api_key}'
        }
        data = {
            'url': url
        }
        
        response = requests.post(screenshot_api_url, headers=headers, json=data)
        if response.status_code == 200:
            return base64.b64encode(response.content).decode('utf-8')
        print(f"Screenshot API returned status code: {response.status_code}")
        return None
    except Exception as e:
        print(f"Screenshot API error: {e}")
        return None

async def save_detection_data(data):
    try:
        mongo_data = {
            'user_id': data['user_id'],
            'username': data['username'],
            'bio': data['bio'],
            'links': [],
            'date_first_message': datetime.datetime.fromisoformat(data['date_first_message']),
            'created_at': datetime.datetime.utcnow()
        }
        
        if data['links']:  # Only try to get screenshot if links exist
            first_link = data['links'][0]
            screenshot = await get_screenshot(first_link)
            mongo_data['links'].append({
                    'url': first_link,
                    'screenshot': screenshot
                })
        
        users_collection.insert_one(mongo_data)
        print(f"Saved user data to MongoDB: {data['username']}")
    except Exception as e:
        print(f"Failed to save data to MongoDB: {e}")

def has_user_been_logged(user_id):
    try:
        return users_collection.find_one({'user_id': user_id}) is not None
    except Exception as e:
        print(f"MongoDB query error: {e}")
        return False

async def extract_links(text):
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
                'authorization': discord_token,
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
            bio = "https://quantumhire.io"
            links = await extract_links(bio)
            user_data = {
                'user_id': message.author.id,
                'username': str(message.author).split("#")[0],
                'bio': bio,
                'links': links,
                'date_first_message': datetime.datetime.now().isoformat()
            }
            
            await save_detection_data(user_data)
            print(f"Logged new user: {user_data['username']}")
            print(f"Bio: {user_data['bio']}")
            print(f"Links found: {user_data['links']}")

    except Exception as e:
        print(f"Error in on_message: {e}")

try:
    if not discord_token:
        raise ValueError("No token found in .env file")    
    bot.run(discord_token.strip(), bot=False)

except Exception as e:

    print(f"Failed to start bot: {e}")
