from typing import List, OrderedDict, Union

from django.db.models import QuerySet
from django.shortcuts import Http404

from rt_app.models import MindMap, MindCard

from .serializers import EdgesListSerializer


class MindMapService:
    def get_mind_card(self, mind_card: QuerySet[MindCard], pk: int) -> Union[MindCard, None]:
        try:
            return mind_card.get(pk=pk)
        except MindCard.DoesNotExist:
            return None

    @staticmethod
    def change_position(card: MindCard, x: int, y: int):
        card.x_coord = x
        card.y_coord = y
        card.save()

    def connect_cards(self, mind_map: MindMap, edges: List[OrderedDict]):
        mind_edges = mind_map.mindedges_set.select_related('mind_map').all()
        mind_edges.delete()

        mind_cards = mind_map.mindcard_set.all()

        for edge in edges:
            # Получаем карточку из mind_map
            source = self.get_mind_card(mind_cards, edge['source'])
            if not source:
                continue

            # Проверка карты на Target(Таргет не имеет родителя)
            if source.type_card == 'T':
                # Если имеет то пропустить
                continue
            else:
                # Если не имеет то
                # Получить родительскую карточку
                target = self.get_mind_card(mind_cards, edge['target'])
                if target:
                    # если родитель сущетсвует то имезменить
                    source.mindedges_set.create(mind_map=mind_map, source=source, target=target.pk)
                else:
                    # Иначе пропустить
                    continue
        return
