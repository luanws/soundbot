import threading
from abc import abstractmethod
from typing import Any, Callable, Dict, Optional, Union

from PyQt5 import QtCore

from .command import Command


class Remote(QtCore.QObject):
    commands: Dict[Command, Callable[[Any], None]]
    __command_received = QtCore.pyqtSignal(Command, dict)
    __command_completed = QtCore.pyqtSignal(Command, str)
    on_complete_callback: Optional[Callable[[str], None]]
    remote_thread: threading.Thread

    def __init__(self, parent: Optional[QtCore.QObject] = None) -> None:
        super().__init__(parent=parent)

        self.commands = {}
        self.__command_received.connect(self.__on_command_received)
        self.__command_completed.connect(self.__on_command_completed)
        self.on_complete_callback = None

    def start(self) -> None:
        self.remote_thread = threading.Thread(target=self._run)
        self.remote_thread.start()

    @abstractmethod
    def stop(self) -> None:
        pass

    @abstractmethod
    def _run(self) -> None:
        pass

    def __on_command_received(self, command: Command, data: Dict[str, Any]) -> None:
        if command in self.commands:
            command_result = self.commands[command](data)
            self.__command_completed.emit(command, command_result)

    def __on_command_completed(self, command: Command, result: str) -> None:
        if self.on_complete_callback:
            self.on_complete_callback(result)

    def add_command_listener(self, command: Command, callable: Callable[[Any], None]) -> None:
        self.commands[command] = callable

    def execute(self, command: Union[Command, str], data: Dict[str, Any], on_complete_callback: Callable[[str], None]) -> None:
        self.on_complete_callback = on_complete_callback
        command = Command(command)
        if command in self.commands:
            self.__command_received.emit(command, data or {})
