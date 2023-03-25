from enum import Enum


class Command(Enum):
    SHOW_TEXT = 'show_text'
    HIDE_TEXT = 'hide_text'
    PLAY_VIDEO = 'play_video'
    STOP_VIDEO = 'stop_video'
    SHOW_HTML = 'show_html'
    HIDE_HTML = 'hide_html'
    SET_VOLUME = 'set_volume'
