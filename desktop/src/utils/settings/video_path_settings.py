from . import Settings


class VideoPathSettings(Settings):
    hymns: str = ''
    songs: str = ''
    taste_and_see: str = ''
    offertory: str = ''

    def get_path_from_video_type(self, video_type: str) -> str:
        return self.to_dict()[video_type]
