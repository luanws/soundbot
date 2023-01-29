import os
import re
import shutil
import subprocess
import traceback
from contextlib import suppress
from typing import List, Tuple

import PyInstaller.__main__

from version import version

application_name = 'Soundbot'

dist_path = os.path.join('dist')
portable_path = os.path.join(dist_path, f'{application_name} {version} portable', application_name)
zip_path = os.path.join(dist_path, f'{application_name} {version}')

assets_to_copy = [
    ('icon.ico', portable_path),
    ('res', os.path.join(portable_path, 'res')),
]


def remove_path(path: str):
    with suppress(FileNotFoundError):
        if os.path.isfile(path):
            os.remove(path)
        elif os.path.isdir(path):
            shutil.rmtree(path)


def clear_build(application_name: str):
    remove_path('build')
    remove_path(f'{application_name}.spec')


def copy_assets(assets: List[Tuple[str, str]]):
    for source, target in assets:
        if os.path.isfile(source):
            shutil.copy(source, target)
        elif os.path.isdir(source):
            shutil.copytree(source, target)


def make_zip(target_path: str, source_path: str):
    shutil.make_archive(target_path, 'zip', source_path)


def run_pyinstaller(application_name: str, dist_path: str):
    PyInstaller.__main__.run([
        'main.py',
        '--name=%s' % application_name,
        '--icon=icon.ico',
        '--onefile',
        '--windowed',
        '--distpath=%s' % dist_path,
    ])


def run_command(command: str) -> str:
    stdout = subprocess.run(command, shell=True, stdout=subprocess.PIPE).stdout
    encodings = ['utf-8', 'cp1252', 'latin-1']
    for encoding in encodings:
        with suppress(UnicodeDecodeError):
            return stdout.decode(encoding)
    return stdout


def update_version_in_inno_setup_script(path: str):
    with open(path) as file:
        content = file.read()
        pattern = r'#define MyAppVersion "(.*)"'
        new_content = re.sub(pattern, f'#define MyAppVersion "{version}"', content)
    with open(path, 'w') as file:
        file.write(new_content)


def create_setup():
    print('Creating setup...')
    update_version_in_inno_setup_script('scripts/assets/setup.iss')
    inno_setup_path = 'scripts/assets/setup.iss'
    result = run_command(f'iscc {inno_setup_path}')
    print(result)


def setup():
    try:
        remove_path(portable_path)
        run_pyinstaller(application_name, portable_path)
        copy_assets(assets_to_copy)
        make_zip(zip_path, os.path.join(portable_path, '..'))
        create_setup()
    except:
        traceback.print_exc()
    finally:
        clear_build(application_name)


if __name__ == '__main__':
    setup()
