from PyQt5 import QtCore, QtGui
from PyQt5.QtCore import QCoreApplication
from PyQt5.QtWidgets import QDesktopWidget, QMainWindow

from src.controllers import ApplicationController
from src.ui.main.window import Ui_MainWindow
from src.ui.projector import ProjectorWindow
from src.ui.projector_settings import ProjectorSettingsWindow
from src.ui.theme_settings import ThemeSettingsWindow
from src.ui.video_path_settings import VideoPathSettingsWindow
from src.utils import qrcode


class MainWindow(QMainWindow, Ui_MainWindow):
    main_window_control: ApplicationController

    def __init__(self, parent=None):
        super().__init__(parent)
        super().setupUi(self)

        self.setWindowIcon(QtGui.QIcon('icon.ico'))

        self.application: QCoreApplication = QCoreApplication.instance()

        self.projector_settings_window = ProjectorSettingsWindow()
        self.theme_settings_window = ThemeSettingsWindow()
        self.video_path_settings_window = VideoPathSettingsWindow()
        self.projector_window = ProjectorWindow()

        self.main_window_control = ApplicationController(self, self.projector_window)

        screen = QDesktopWidget().screenGeometry(2)
        self.projector_window.move(screen.left(), screen.top())

        self.action_projector_settings.triggered.connect(self.projector_settings_window.show)
        self.action_theme_settings.triggered.connect(self.theme_settings_window.show)
        self.action_video_path_settings.triggered.connect(self.video_path_settings_window.show)
        self.action_quit.triggered.connect(self.close)

    def showEvent(self, a0: QtGui.QShowEvent) -> None:
        api_address = self.main_window_control.start_api()
        self.generate_qr_code(api_address)

    def closeEvent(self, a0: QtGui.QCloseEvent) -> None:
        self.main_window_control.stop_api()
        self.application.quit()
        exit()

    def generate_qr_code(self, text: str):
        pixmap = qrcode.make_pixmap(text)
        self.qr_code_label.setAlignment(QtCore.Qt.AlignCenter)
        self.qr_code_label.setPixmap(pixmap)
        self.setFixedSize(pixmap.size())
