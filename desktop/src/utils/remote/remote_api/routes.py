from typing import Any, Callable, Dict, Optional, Union

from flask import Blueprint, request
from werkzeug.utils import send_from_directory

from src.utils.remote import Command

api_routes_blueprint = Blueprint('api_routes', __name__)

execute: Callable[[Union[Command, str], Optional[Dict[str, Any]], Callable[[str], None]], None]


@api_routes_blueprint.route('/')
def index():
    return 'Soundbot remote API'


@api_routes_blueprint.route('/favicon.ico')
def favicon():
    return send_from_directory(
        api_routes_blueprint.root_path, 'icon.ico',
    )


@api_routes_blueprint.route('/<command>', methods=['POST'])
def command(command: str):
    global execute
    data = request.get_json()

    command_result: str = ''
    command_completed: bool = False

    def on_complete(result: str) -> None:
        nonlocal command_result, command_completed
        command_result = result
        command_completed = True

    execute(command, data, on_complete)

    while not command_completed:
        pass
    return command_result
