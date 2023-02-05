from flask_restful import Resource

from src.utils.files import count_files_in_file_tree, get_file_tree_from_path
from src.utils.remote.remote_controls import get_remote_api
from src.utils.settings.video_path_settings import VideoPathSettings


class TasteAndSeeResource(Resource):
    def __init__(self):
        self.remote_api = get_remote_api()
        self.video_path_settings = VideoPathSettings()

    def get(self):
        video_path = self.video_path_settings.taste_and_see
        file_tree = get_file_tree_from_path(video_path)
        print(f'Found {count_files_in_file_tree(file_tree)} files in {video_path}')
        return file_tree.to_dict()
