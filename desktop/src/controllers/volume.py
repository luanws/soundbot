from typing import Any, Dict

from src.utils.volume import get_volume, set_volume


class VolumeController:
    def set_volume(self, data: Dict[str, Any]) -> str:
        volume: float = data['volume']
        old_volume = get_volume()
        set_volume(volume)
        return str(old_volume)
