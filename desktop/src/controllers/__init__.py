from typing import TYPE_CHECKING

from src.utils.remote.command import Command

if TYPE_CHECKING:
    from src.ui.main import MainWindow
    from src.ui.text_projector import TextProjectorWindow

from src.utils.remote.remote_controls import get_remote_api

from .text_projector import TextProjectorController


class ApplicationController:
    main_window: 'MainWindow'
    projector_window: 'TextProjectorWindow'
    text_projector_controller: TextProjectorController

    def __init__(self, main_window: 'MainWindow', projector_window: 'TextProjectorWindow') -> None:
        self.main_window = main_window
        self.projector_window = projector_window

        self.text_projector_controller = TextProjectorController(self.projector_window)

        self.remote_api = get_remote_api()

        commands = [
            (Command.SHOW_TEXT, self.text_projector_controller.show_text),
            (Command.HIDE_TEXT, self.text_projector_controller.close_projector),
        ]

        for command, callback in commands:
            self.remote_api.add_command_listener(command, callback)

    def start_api(self) -> str:
        self.remote_api.start()
        return self.remote_api.address

    def stop_api(self):
        self.remote_api.stop()
