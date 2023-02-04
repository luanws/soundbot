from flask import request
from flask_restful import Resource

from src.utils.remote.remote_controls import get_remote_api


class CommandResource(Resource):
    def __init__(self):
        self.remote_api = get_remote_api()

    def post(self, command: str):
        data = request.get_json()
        print(f'Command: {command}, data: {data}')

        command_result: str = ''
        command_completed: bool = False

        def on_complete(result: str) -> None:
            nonlocal command_result, command_completed
            command_result = result
            command_completed = True

        self.remote_api.execute(command, data, on_complete)

        while not command_completed:
            pass
        return command_result
