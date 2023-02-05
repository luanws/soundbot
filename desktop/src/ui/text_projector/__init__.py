from PyQt5 import QtCore, QtGui
from PyQt5.QtWidgets import QApplication, QMainWindow

from src.ui.text_projector.window import Ui_MainWindow
from src.utils.settings.projector_font_settings import ProjectorFontSettings


class TextProjectorWindow(QMainWindow, Ui_MainWindow):
    font_settings: ProjectorFontSettings
    __text: str

    def __init__(self, parent=None):
        super().__init__(parent)
        super().setupUi(self)

        self.font_settings = ProjectorFontSettings()
        self.__text = ''

        self.setWindowIcon(QtGui.QIcon('icon.ico'))

        self.font_settings.add_settings_listener(self.configure_text_label_styles)

        self.text_label.setText('')
        self.configure_text_label_styles()

    @property
    def text(self):
        return self.__text

    @text.setter
    def text(self, text: str):
        self.__text = text
        self.on_change_text(text)

    def close(self) -> bool:
        return super().close()

    def show_in_last_screen(self) -> None:
        screen = QApplication.screens()[-1]
        self.show()
        self.windowHandle().setScreen(screen)
        self.showFullScreen()

    def show(self) -> None:
        self.text_label.setText(self.text)
        return super().show()

    def on_change_text(self, text: str):
        self.text_label.setText(text)

    def configure_text_label_styles(self):
        font_settings = self.font_settings
        self.text_label.setAlignment(QtCore.Qt.AlignVCenter)
        self.text_label.setStyleSheet(f"""
            color: {font_settings.color};
            font-size: {font_settings.font_size}pt;
            font-family: '{font_settings.font_family}';
            padding: {font_settings.margin}px;
            border-image: url({font_settings.background_image_path}) 0 0 0 0 stretch stretch;
        """)
