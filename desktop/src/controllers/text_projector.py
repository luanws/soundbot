
from typing import TYPE_CHECKING, Any, Dict

if TYPE_CHECKING:
    from src.ui.text_projector import TextProjectorWindow


class TextProjectorController:
    text_projector_window: 'TextProjectorWindow'

    def __init__(self, text_projector_window: 'TextProjectorWindow') -> None:
        self.text_projector_window = text_projector_window

    def show_text(self, data: Dict[str, Any]) -> str:
        text = data['text']
        self.text_projector_window.show_in_last_screen()
        self.text_projector_window.text = text
        return text

    def close_text_projector(self, data: Dict[str, Any]):
        self.text_projector_window.close()
