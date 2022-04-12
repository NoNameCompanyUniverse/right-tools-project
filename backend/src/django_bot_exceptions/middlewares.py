import traceback

import aiohttp
from django.http import HttpRequest

from django_bot_exceptions.conf import conf

TELEGRAM_METHOD = f"https://api.telegram.org/bot{conf.TELEGRAM_BOT.get('TOKEN')}/sendMessage"


class TelegramExceptionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest):
        return self.get_response(request)

    async def process_exception(self, request: HttpRequest, exception: Exception):
        """ Логирование Exception """
        data = {
            "text": str(traceback.format_exc()),
            "chat_id": "1"
        }
        async with aiohttp.ClientSession() as session:
            chats = conf.TELEGRAM_BOT.get('CHATS', set())
            for chat_id in chats:
                data['chat_id'] = chat_id
                async with session.post(TELEGRAM_METHOD, json=data) as res:
                    data = await res.json()
                    print(data)
