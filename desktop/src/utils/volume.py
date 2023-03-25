from ctypes import POINTER, cast
from typing import Any

from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume_controller: Any = cast(interface, POINTER(IAudioEndpointVolume))


def get_volume():
    return volume_controller.GetMasterVolumeLevelScalar()


def set_volume(volume: float):
    volume_controller.SetMasterVolumeLevelScalar(volume, None)
