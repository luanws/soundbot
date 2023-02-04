from PyQt5 import QtGui
from PyQt5.QtWidgets import QMainWindow

from src.settings.video_path_settings import VideoPathSettings
from src.ui.video_path_settings.window import Ui_MainWindow

from .widgets.video_path import VideoPathWidget


class VideoPathSettingsWindow(QMainWindow, Ui_MainWindow):
    video_path_settings: VideoPathSettings

    def __init__(self, parent=None):
        super().__init__(parent)
        super().setupUi(self)

        self.video_path_settings = VideoPathSettings()

        self.setWindowIcon(QtGui.QIcon('icon.ico'))

        self.hymns_widget = VideoPathWidget(title='Hinos', path=self.video_path_settings.hymns)
        self.songs_widget = VideoPathWidget(title='Músicas', path=self.video_path_settings.songs)
        self.taste_and_see_widget = VideoPathWidget(title='Provai e vede', path=self.video_path_settings.taste_and_see)
        self.offertory_widget = VideoPathWidget(title='Ofertório', path=self.video_path_settings.offertory)

        self.vertical_layout.addWidget(self.hymns_widget)
        self.vertical_layout.addWidget(self.songs_widget)
        self.vertical_layout.addWidget(self.taste_and_see_widget)
        self.vertical_layout.addWidget(self.offertory_widget)
