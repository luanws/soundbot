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

        hymns_path = self.video_path_settings.hymns
        songs_path = self.video_path_settings.songs
        taste_and_see_path = self.video_path_settings.taste_and_see
        offertory_path = self.video_path_settings.offertory

        self.hymns_widget = VideoPathWidget(title='Hinos', path=hymns_path)
        self.songs_widget = VideoPathWidget(title='Músicas', path=songs_path)
        self.taste_and_see_widget = VideoPathWidget(title='Provai e vede', path=taste_and_see_path)
        self.offertory_widget = VideoPathWidget(title='Ofertório', path=offertory_path, is_file=True)

        self.vertical_layout.addWidget(self.hymns_widget)
        self.vertical_layout.addWidget(self.songs_widget)
        self.vertical_layout.addWidget(self.taste_and_see_widget)
        self.vertical_layout.addWidget(self.offertory_widget)

    def closeEvent(self, event: QtGui.QCloseEvent) -> None:
        self.video_path_settings.hymns = self.hymns_widget.path
        self.video_path_settings.songs = self.songs_widget.path
        self.video_path_settings.taste_and_see = self.taste_and_see_widget.path
        self.video_path_settings.offertory = self.offertory_widget.path

        self.video_path_settings.save()

        event.accept()
