#run grabpictures.py first to make the dict urlPics[] be the latest pics
import subprocess
for i in urlPics:
	subprocess.Popen(['./findMeta.sh %s' % (i)], shell = True)
