from django.http import Http404

from rt_app.models import KanbanCard, KanbanColumn


class KanbanCardService:
    def get_kanban_column(self, pk: int):
        try:
            return KanbanColumn.objects.get(pk=pk)
        except KanbanColumn.DoesNotExist:
            raise Http404

    def change_column(self, kanban_card: KanbanCard, kanban_column: int):
        kanban_column: KanbanColumn = self.get_kanban_column(kanban_column)

        kanban_card__project = kanban_card.kanban_column.kanban_board.project.pk
        kanban_column__project = kanban_column.kanban_board.project.pk
        if kanban_column__project == kanban_card__project:
            kanban_card.kanban_column = kanban_column
            kanban_card.save()
