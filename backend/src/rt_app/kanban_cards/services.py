from django.http import Http404

from rt_app.models import KanbanCard, KanbanColumn


class KanbanCardService:
    def get_kanban_column(self, pk: int):
        try:
            return KanbanColumn.objects.get(pk=pk)
        except KanbanColumn.DoesNotExist:
            raise Http404

    def change_column(self, kanban_card: KanbanCard, kanban_column_position: int):
        kanban_board = kanban_card.kanban_column.kanban_board
        kanban_column = KanbanColumn.objects.select_related('kanban_board')\
            .get(kanban_board=kanban_board, position=kanban_column_position-1)
        kanban_card.kanban_column = kanban_column
        kanban_card.save()
