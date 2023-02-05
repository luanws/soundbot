import enum
import os
from typing import List


class FileTreeType(enum.Enum):
    FILE = 'file'
    DIRECTORY = 'directory'


class FileTree:
    type: FileTreeType
    name: str
    dirname: str
    children: List['FileTree']

    def __init__(self, *, type: FileTreeType, name: str, dirname: str, children: List['FileTree'] = None):
        self.type = type
        self.name = name
        self.dirname = dirname
        self.children = children if children else []

    def to_dict(self) -> dict:
        return {
            'type': self.type.value,
            'name': self.name,
            'dirname': self.dirname,
            'children': [child.to_dict() for child in self.children],
        }


def get_all_filenames_from_path(path: str) -> List[str]:
    return [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]


def get_file_tree_from_path(path: str) -> FileTree:
    name = os.path.basename(path)
    if os.path.isfile(path):
        return FileTree(type=FileTreeType.FILE, name=name, dirname=os.path.dirname(os.path.normpath(path)))
    else:
        children = [get_file_tree_from_path(os.path.join(path, child)) for child in os.listdir(path)]
        return FileTree(type=FileTreeType.DIRECTORY, name=name, dirname=os.path.normpath(path), children=children)


def count_files_in_file_tree(file_tree: FileTree) -> int:
    if file_tree.type == FileTreeType.FILE:
        return 1
    else:
        return sum([count_files_in_file_tree(child) for child in file_tree.children])
