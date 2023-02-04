from flask import Blueprint
from flask_restful import Api
from werkzeug.utils import send_from_directory

from .command import CommandResource

api_routes_blueprint = Blueprint('api_routes', __name__)
api = Api(api_routes_blueprint)


@api_routes_blueprint.route('/')
def index():
    return 'Soundbot remote API'


@api_routes_blueprint.route('/favicon.ico')
def favicon():
    return send_from_directory(
        api_routes_blueprint.root_path, 'icon.ico',
    )


api.add_resource(CommandResource, '/command/<command>')
