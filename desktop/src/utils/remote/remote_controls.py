from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from .remote_api import RemoteAPI


__remote_api: Optional['RemoteAPI'] = None


def get_remote_api() -> 'RemoteAPI':
    from .remote_api import RemoteAPI
    global __remote_api
    if __remote_api is None:
        __remote_api = RemoteAPI(prefix_length=0)
    return __remote_api
