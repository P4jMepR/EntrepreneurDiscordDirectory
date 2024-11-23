import discord, json, re 
from discord.ext import commands

bot = commands.Bot(command_prefix='>', self_bot=True)


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


@bot.event
async def on_message(message):
    if message.author == bot.user:
        return  
    if message.channel.id not in ALLOWED_CHANNEL_IDS:
        return
    
    channel = message.channel
    user = message.author
    message_text = message.content


    save_detection_data(message_text)

    non_detection_data = {
        'user': user.display_name,
        'trigger_message': message.content,
    }
    save_detection_data(non_detection_data)

bot.run("")
