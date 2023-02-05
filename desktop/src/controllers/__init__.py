from typing import TYPE_CHECKING

from src.controllers.video_projector import VideoProjectorController
from src.utils.remote.command import Command
from src.utils.remote.remote_controls import get_remote_api

from .text_projector import TextProjectorController

if TYPE_CHECKING:
    from src.ui.text_projector import TextProjectorWindow
    from src.ui.video_projector import VideoProjectorWindow


class ApplicationController:
    text_projector_controller: TextProjectorController
    video_projector_controller: VideoProjectorController

    def __init__(
        self,
        text_projector_window: 'TextProjectorWindow',
        video_projector_window: 'VideoProjectorWindow',
    ) -> None:
        self.text_projector_controller = TextProjectorController(text_projector_window)
        self.video_projector_controller = VideoProjectorController(video_projector_window)

        self.remote_api = get_remote_api()

        commands = [
            (Command.SHOW_TEXT, self.text_projector_controller.show_text),
            (Command.HIDE_TEXT, self.text_projector_controller.close_text_projector),
            (Command.PLAY_VIDEO, self.video_projector_controller.play_video),
            (Command.STOP_VIDEO, self.video_projector_controller.close_video_projector),
        ]

        for command, callback in commands:
            self.remote_api.add_command_listener(command, callback)

    def start_api(self) -> str:
        self.remote_api.start()
        return self.remote_api.address

    def stop_api(self):
        self.remote_api.stop()
