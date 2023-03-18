
from typing import TYPE_CHECKING, Any, Dict

if TYPE_CHECKING:
    from src.ui.html_projector import HTMLProjectorWindow


class HTMLProjectorController:
    html_projector_window: 'HTMLProjectorWindow'

    def __init__(self, html_projector_window: 'HTMLProjectorWindow') -> None:
        self.html_projector_window = html_projector_window

    def show_html(self, data: Dict[str, Any]) -> str:
        html = data['html']
        self.html_projector_window.show_in_last_screen()
        self.html_projector_window.html = html
        return html

    def close_html_projector(self, data: Dict[str, Any]):
        self.html_projector_window.close()
