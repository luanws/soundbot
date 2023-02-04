from typing import List

from PyQt5 import QtGui
from PyQt5.QtWidgets import QMainWindow

from src.ui.theme_settings.window import Ui_MainWindow
from src.utils import styles
from src.utils.settings.theme_settings import ThemeSettings


class ThemeSettingsWindow(QMainWindow, Ui_MainWindow):
    theme_settings: ThemeSettings

    def __init__(self, parent=None):
        super().__init__(parent)
        super().setupUi(self)

        self.theme_settings = ThemeSettings()

        self.setWindowIcon(QtGui.QIcon('icon.ico'))
        self.setFixedSize(self.size())

        self.configure_initial_values()
        self.configure_events()

    def change_theme(self, theme: str) -> None:
        self.theme_settings.theme = theme
        self.theme_settings.save()

    def configure_initial_values(self):
        self.themes_combo_box.addItems(styles.get_themes())
        self.themes_combo_box.setCurrentText(self.theme_settings.theme)

    def configure_events(self):
        self.themes_combo_box.currentTextChanged.connect(
            self.on_change_theme)

    def on_change_theme(self):
        theme = self.themes_combo_box.currentText()
        self.change_theme(theme)
