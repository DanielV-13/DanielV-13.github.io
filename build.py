# Builds index.html (one self-contained file) from src/template.html + src/*.js
import glob, os
d = os.path.dirname(os.path.abspath(__file__))
base = open(os.path.join(d, 'src/template.html'), encoding='utf-8').read()
js = '\n'.join(open(f, encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(d, 'src/*.js'))))
open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(base.replace('<!--JS-->', '<script>\n' + js + '\n</script>'))
print('index.html built')
