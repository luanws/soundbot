import sys

from PyQt5 import QtWidgets
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QApplication, QSplashScreen

from src.settings.theme_settings import ThemeSettings
from src.ui.main import MainWindow
from src.utils import styles


def configure_app_theme(app: QApplication):
    app.setStyleSheet(styles.get_qss_stylesheet('src/styles/global.qss'))


def main():
    app = QApplication(sys.argv)

    splash_screen = QSplashScreen(QPixmap('res/img/splash.png'))
    splash_screen.show()

    styles.update_qss_dict_and_qss_vars()
    configure_app_theme(app)
    theme_settings = ThemeSettings()
    theme_settings.add_settings_listener(lambda: configure_app_theme(app))

    main_window = MainWindow()
    main_window.setWindowFlag(Qt.WindowMaximizeButtonHint, False)
    main_window.show()

    splash_screen.close()

    app.exec()


def except_hook(cls, exception, traceback):
    message_box = QtWidgets.QMessageBox()
    message_box.setIcon(QtWidgets.QMessageBox.Critical)
    message_box.setText("Error")
    message_box.setInformativeText(str(exception))
    message_box.setWindowTitle("Error")
    message_box.exec_()


if __name__ == '__main__':
    sys.excepthook = except_hook
    main()
