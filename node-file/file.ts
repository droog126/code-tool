import fs from 'fs';
export async function mk_file(path, content = '') {
    var paths = path.split('/');
    var len = paths.length;
    var dir_path = paths.slice(0, len-1);
    fs.mkdirSync(dir_path.join('/'), { recursive: true });
    fs.writeFileSync(path, content);
    return true;
}