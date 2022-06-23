from typing import List, OrderedDict, Union

from django.db.models import QuerySet
from django.shortcuts import Http404

from rt_app.models import MindMap, MindCard

from .serializers import EdgesListSerializer


class MindMapService:
    def get_mind_card(self, pk: int) -> Union[MindCard, None]:
        try:
            return MindCard.objects.get(pk=pk)
        except MindCard.DoesNotExist:
            return None

    @staticmethod
    def change_position(card: MindCard, x: int, y: int):
        card.x_coord = x
        card.y_coord = y
        card.save()

    def connect_cards(self, mind_map: MindMap, edges: List[OrderedDict]):
        for edge in edges:
            card = mind_map.mindcard_set.get(pk=edge['source'])
            # Проверка карты на Target(Таргет не имеет родителя)
            if card.type_card == 'T':
                # Если имеет то пропустить
                continue
            else:
                # Если не имеет то
                # Получить родительскую карточку
                parent = self.get_mind_card(edge['target'])
                if parent:
                    # если родитель сущетсвует то имезменить
                    card.parent = parent
                    card.save()
                else:
                    # Иначе пропустить
                    continue
        return
