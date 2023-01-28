from typing import TYPE_CHECKING


from src.utils.remote import Command
from src.utils.remote.remote_api import RemoteAPI

if TYPE_CHECKING:
    from src.ui.main import MainWindow
    from src.ui.projector import ProjectorWindow

from .projector import ProjectorController


class ApplicationController:
    main_window: 'MainWindow'
    projector_window: 'ProjectorWindow'
    projector_controller: ProjectorController

    def __init__(self, main_window: 'MainWindow', projector_window: 'ProjectorWindow') -> None:
        self.main_window = main_window
        self.projector_window = projector_window

        self.projector_controller = ProjectorController(self.projector_window)

        self.remote_api = RemoteAPI(prefix_length=40)

        commands = [
            (Command.SHOW_TEXT, self.projector_controller.show_text),
        ]

        for command, callback in commands:
            self.remote_api.add_command_listener(command, callback)

    def start_api(self) -> str:
        self.remote_api.start()
        return self.remote_api.address

    def stop_api(self):
        self.remote_api.stop()
