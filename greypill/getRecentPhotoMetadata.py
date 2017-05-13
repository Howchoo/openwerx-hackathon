import subprocess
from grabpictures import grabPictures
urlPics = grabPictures() #gets the urlPics set up
for i in urlPics:
	subprocess.Popen(['./findMeta.sh %s' % (i)], shell = True)
