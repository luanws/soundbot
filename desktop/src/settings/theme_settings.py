from src.utils import styles

from . import Settings


class ThemeSettings(Settings):
    theme: str = 'light'

    def before_notify_settings_instances(self):
        styles.update_qss_dict_and_qss_vars()
