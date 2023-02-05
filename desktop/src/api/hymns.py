from flask_restful import Resource

from src.utils.files import get_all_filenames_from_path
from src.utils.remote.remote_controls import get_remote_api
from src.utils.settings.video_path_settings import VideoPathSettings


class HymnsResource(Resource):
    def __init__(self):
        self.remote_api = get_remote_api()
        self.video_path_settings = VideoPathSettings()

    def get(self):
        video_path = self.video_path_settings.hymns
        filenames = get_all_filenames_from_path(video_path)
        print(f'Found {len(filenames)} files in {video_path}')
        return filenames
