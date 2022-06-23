from typing import List, OrderedDict

from django.db.models import QuerySet

from rt_app.models import MindCard

from .serializers import EdgesListSerializer


class MindMapService:
    @staticmethod
    def change_position(card: MindCard, x: int, y: int):
        card.x_coord = x
        card.y_coord = y
        card.save()

    def connect_cards(self, cards: QuerySet[MindCard], edges: List[OrderedDict]):
        for card in cards:
            print(card.name)

        for edge in edges:
            print(edge['id'], edge['source'], edge['target'])

        return
