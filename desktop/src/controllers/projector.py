
from typing import TYPE_CHECKING, Any, Dict

from PyQt5.QtWidgets import QApplication

if TYPE_CHECKING:
    from src.ui.projector import ProjectorWindow


class ProjectorController:
    projector_window: 'ProjectorWindow'

    def __init__(self, projector_window: 'ProjectorWindow') -> None:
        self.projector_window = projector_window

    def open_projector_in_last_screen(self) -> None:
        screen = QApplication.screens()[-1]
        self.projector_window.show()
        self.projector_window.windowHandle().setScreen(screen)
        self.projector_window.showFullScreen()

    def show_text(self, data: Dict[str, Any]) -> str:
        text = data['text']
        self.open_projector_in_last_screen()
        self.projector_window.text = text
        return text

    def close_projector(self, data: Dict[str, Any]):
        self.projector_window.close()
