
from typing import TYPE_CHECKING, Any, Dict

from src.utils.settings.video_path_settings import VideoPathSettings

if TYPE_CHECKING:
    from src.ui.video_projector import VideoProjectorWindow


class VideoProjectorController:
    video_projector_window: 'VideoProjectorWindow'

    def __init__(self, video_projector_window: 'VideoProjectorWindow') -> None:
        self.video_projector_window = video_projector_window
        self.video_path_settings = VideoPathSettings()

    def make_video_path(self, video_type: str, filename: str) -> str:
        path = self.video_path_settings.get_path_from_video_type(video_type)
        if video_type == 'offertory':
            return path
        return f'{path}/{filename}'

    def play_video(self, data: Dict[str, Any]) -> str:
        video_type = data['type']
        filename = data.get('filename', '')
        video_path = self.make_video_path(video_type, filename)
        print(f'Playing video: {video_path}')
        self.video_projector_window.show_in_last_screen()
        self.video_projector_window.play_video(video_path)
        return filename

    def close_video_projector(self, data: Dict[str, Any]):
        self.video_projector_window.close()
