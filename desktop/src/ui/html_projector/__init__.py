from PyQt5 import QtGui, QtWebEngineWidgets
from PyQt5.QtWidgets import QApplication, QMainWindow

from src.ui.html_projector.window import Ui_MainWindow


class HTMLProjectorWindow(QMainWindow, Ui_MainWindow):
    __html: str

    def __init__(self, parent=None):
        super().__init__(parent)
        super().setupUi(self)

        self.setWindowIcon(QtGui.QIcon('icon.ico'))

        self.webEngineView = QtWebEngineWidgets.QWebEngineView(self.centralwidget)
        self.vertical_layout.addWidget(self.webEngineView)

        self.html = ''

    @property
    def html(self):
        return self.__html

    @html.setter
    def html(self, html: str):
        self.__html = html
        self.webEngineView.setHtml(html)

    def close(self) -> bool:
        return super().close()

    def show_in_last_screen(self) -> None:
        screen = QApplication.screens()[-1]
        self.show()
        self.windowHandle().setScreen(screen)
        self.showFullScreen()
