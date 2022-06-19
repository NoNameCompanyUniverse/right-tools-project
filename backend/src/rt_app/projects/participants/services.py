from typing import List

from django.db.models import QuerySet

from rt_app.models import Project, User


class ParticipantService:
    @staticmethod
    def validate_participants(project: Project, value: List[int]) -> QuerySet[User]:
        admin: User = project.admin
        project_participants: QuerySet[User] = project.participant.all()
        users: QuerySet[User] = User.objects.filter(pk__in=value).exclude(pk=admin.pk)\
            .exclude(pk__in=project_participants)
        return users

    @staticmethod
    def add_participants(project: Project, participants: QuerySet[User]) -> QuerySet[User]:
        for participant in participants:
            project.participant.add(participant)
        return participants

    @staticmethod
    def remove_participants(project: Project, participants: QuerySet[User]) -> None:
        for participant in participants:
            project.participant.remove(participant)
