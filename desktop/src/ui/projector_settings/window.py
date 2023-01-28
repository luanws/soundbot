from PyQt5 import QtCore, QtGui, QtWidgets
class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(800, 600)
        MainWindow.setUnifiedTitleAndToolBarOnMac(False)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setStyleSheet("* {\n"
"    padding: 0px;\n"
"}")
        self.centralwidget.setObjectName("centralwidget")
        self.verticalLayout = QtWidgets.QVBoxLayout(self.centralwidget)
        self.verticalLayout.setObjectName("verticalLayout")
        self.scrollArea = QtWidgets.QScrollArea(self.centralwidget)
        self.scrollArea.setWidgetResizable(True)
        self.scrollArea.setAlignment(QtCore.Qt.AlignHCenter|QtCore.Qt.AlignTop)
        self.scrollArea.setObjectName("scrollArea")
        self.scrollAreaWidgetContents = QtWidgets.QWidget()
        self.scrollAreaWidgetContents.setGeometry(QtCore.QRect(0, 0, 780, 580))
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.scrollAreaWidgetContents.sizePolicy().hasHeightForWidth())
        self.scrollAreaWidgetContents.setSizePolicy(sizePolicy)
        self.scrollAreaWidgetContents.setObjectName("scrollAreaWidgetContents")
        self.verticalLayout_2 = QtWidgets.QVBoxLayout(self.scrollAreaWidgetContents)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.verticalLayout_3 = QtWidgets.QVBoxLayout()
        self.verticalLayout_3.setObjectName("verticalLayout_3")
        self.gridLayout = QtWidgets.QGridLayout()
        self.gridLayout.setSpacing(8)
        self.gridLayout.setObjectName("gridLayout")
        self.font_size_spin_box = QtWidgets.QSpinBox(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.font_size_spin_box.sizePolicy().hasHeightForWidth())
        self.font_size_spin_box.setSizePolicy(sizePolicy)
        self.font_size_spin_box.setMinimumSize(QtCore.QSize(60, 0))
        self.font_size_spin_box.setMaximumSize(QtCore.QSize(60, 16777215))
        self.font_size_spin_box.setStyleSheet("padding: 8px;")
        self.font_size_spin_box.setMaximum(1638)
        self.font_size_spin_box.setObjectName("font_size_spin_box")
        self.gridLayout.addWidget(self.font_size_spin_box, 3, 1, 1, 1)
        self.label_2 = QtWidgets.QLabel(self.scrollAreaWidgetContents)
        self.label_2.setObjectName("label_2")
        self.gridLayout.addWidget(self.label_2, 2, 3, 1, 1)
        self.font_family_combo_box = QtWidgets.QFontComboBox(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.font_family_combo_box.sizePolicy().hasHeightForWidth())
        self.font_family_combo_box.setSizePolicy(sizePolicy)
        self.font_family_combo_box.setStyleSheet("padding: 8px;")
        self.font_family_combo_box.setObjectName("font_family_combo_box")
        self.gridLayout.addWidget(self.font_family_combo_box, 3, 0, 1, 1)
        self.apply_button = QtWidgets.QPushButton(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.apply_button.sizePolicy().hasHeightForWidth())
        self.apply_button.setSizePolicy(sizePolicy)
        self.apply_button.setMinimumSize(QtCore.QSize(71, 0))
        self.apply_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.apply_button.setStyleSheet("padding: 8px;")
        self.apply_button.setObjectName("apply_button")
        self.gridLayout.addWidget(self.apply_button, 1, 3, 1, 1)
        self.margin_spin_box = QtWidgets.QSpinBox(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.margin_spin_box.sizePolicy().hasHeightForWidth())
        self.margin_spin_box.setSizePolicy(sizePolicy)
        self.margin_spin_box.setMinimumSize(QtCore.QSize(60, 0))
        self.margin_spin_box.setMaximumSize(QtCore.QSize(60, 16777215))
        self.margin_spin_box.setStyleSheet("padding: 8px;")
        self.margin_spin_box.setMaximum(1000000)
        self.margin_spin_box.setObjectName("margin_spin_box")
        self.gridLayout.addWidget(self.margin_spin_box, 3, 3, 1, 1)
        self.preview_text_line_edit = QtWidgets.QLineEdit(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.preview_text_line_edit.sizePolicy().hasHeightForWidth())
        self.preview_text_line_edit.setSizePolicy(sizePolicy)
        self.preview_text_line_edit.setStyleSheet("padding: 8px;")
        self.preview_text_line_edit.setPlaceholderText("")
        self.preview_text_line_edit.setObjectName("preview_text_line_edit")
        self.gridLayout.addWidget(self.preview_text_line_edit, 1, 0, 1, 3)
        self.label = QtWidgets.QLabel(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.label.sizePolicy().hasHeightForWidth())
        self.label.setSizePolicy(sizePolicy)
        self.label.setObjectName("label")
        self.gridLayout.addWidget(self.label, 2, 0, 1, 3)
        self.change_color_button = QtWidgets.QPushButton(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.change_color_button.sizePolicy().hasHeightForWidth())
        self.change_color_button.setSizePolicy(sizePolicy)
        self.change_color_button.setMinimumSize(QtCore.QSize(24, 24))
        self.change_color_button.setMaximumSize(QtCore.QSize(24, 24))
        self.change_color_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.change_color_button.setStyleSheet("border-style: solid;\n"
"border-radius: 2px;\n"
"background-color: #ffffff;\n"
"border-color: black;\n"
"border-width: 1px;\n"
"")
        self.change_color_button.setText("")
        self.change_color_button.setObjectName("change_color_button")
        self.gridLayout.addWidget(self.change_color_button, 3, 2, 1, 1)
        self.verticalLayout_3.addLayout(self.gridLayout)
        self.preview_label = QtWidgets.QLabel(self.scrollAreaWidgetContents)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.preview_label.sizePolicy().hasHeightForWidth())
        self.preview_label.setSizePolicy(sizePolicy)
        self.preview_label.setMinimumSize(QtCore.QSize(0, 200))
        font = QtGui.QFont()
        font.setFamily("Arial")
        font.setPointSize(20)
        self.preview_label.setFont(font)
        self.preview_label.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.preview_label.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.preview_label.setStyleSheet("background-color: black;\n"
"color: white;\n"
"padding: 16px;")
        self.preview_label.setAlignment(QtCore.Qt.AlignLeading|QtCore.Qt.AlignLeft|QtCore.Qt.AlignVCenter)
        self.preview_label.setWordWrap(True)
        self.preview_label.setObjectName("preview_label")
        self.verticalLayout_3.addWidget(self.preview_label)
        self.verticalLayout_2.addLayout(self.verticalLayout_3)
        self.scrollArea.setWidget(self.scrollAreaWidgetContents)
        self.verticalLayout.addWidget(self.scrollArea)
        MainWindow.setCentralWidget(self.centralwidget)
        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)
    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "Configurações de projeção"))
        self.label_2.setText(_translate("MainWindow", "Margem"))
        self.apply_button.setText(_translate("MainWindow", "Aplicar"))
        self.preview_text_line_edit.setText(_translate("MainWindow", "Texto de teste"))
        self.label.setText(_translate("MainWindow", "Fonte:"))
        self.preview_label.setText(_translate("MainWindow", "Texto de teste"))
