from PyQt5 import QtWidgets

from src.utils import styles
from src.widgets.icon_button_widget import IconButton


class VideoPathWidget(QtWidgets.QWidget):
    def __init__(self, parent=None, *, title: str, path: str, is_file: bool = None):
        super().__init__(parent)

        self.is_file = is_file

        color = styles.qss_vars['@colorIcon']
        active_color = styles.qss_vars['@colorActiveIcon']

        self.path_line_edit = QtWidgets.QLineEdit()
        self.select_path_button = IconButton(icon_name='fa.search', color=color, active_color=active_color)
        self.label = QtWidgets.QLabel()
        self.edit_container = QtWidgets.QHBoxLayout()
        self.container = QtWidgets.QVBoxLayout()

        self.path_line_edit.setStyleSheet("""
            QLineEdit {
                padding-left: 12px;
                padding-right: 12px;
                padding-top: 8px;
                padding-bottom: 8px;
            }
        """)

        self.label.setText(title)
        self.path_line_edit.setText(path)
        self.select_path_button.clicked.connect(self.select_path)

        self.edit_container.addWidget(self.path_line_edit)
        self.edit_container.addWidget(self.select_path_button)

        self.container.addWidget(self.label)
        self.container.addLayout(self.edit_container)

        self.setLayout(self.container)

    @property
    def path(self) -> str:
        return self.path_line_edit.text()

    def select_path(self):
        if self.is_file:
            path, _ = QtWidgets.QFileDialog.getOpenFileName(self, 'Selecionar arquivo', self.path_line_edit.text())
        else:
            path = QtWidgets.QFileDialog.getExistingDirectory(self, 'Selecionar pasta', self.path_line_edit.text())
        self.path_line_edit.setText(path)
