import os
from typing import TYPE_CHECKING, Any, Dict

from src.utils.settings.video_path_settings import VideoPathSettings

if TYPE_CHECKING:
    from src.ui.video_projector import VideoProjectorWindow


class VideoProjectorController:
    video_projector_window: 'VideoProjectorWindow'

    def __init__(self, video_projector_window: 'VideoProjectorWindow') -> None:
        self.video_projector_window = video_projector_window
        self.video_path_settings = VideoPathSettings()

    def play_video(self, data: Dict[str, Any]) -> str:
        dirname = data['dirname']
        filename = data['filename']
        video_path = os.path.join(dirname, filename)
        print(f'Playing video: {video_path}')
        self.video_projector_window.show_in_last_screen()
        self.video_projector_window.play_video(video_path)
        return video_path

    def close_video_projector(self, data: Dict[str, Any]):
        self.video_projector_window.close()
