import os, re

captions = []

linenum = 0

with open("caption.txt") as f:
	line = f.readline()
	while line:
		if linenum % 4 == 1:
			search = re.search('0\) (.*) \(', line)
			captions.append(search.group(1))
		line = f.readline()
		linenum += 1
i = 0
for file in os.listdir('../images'):
	with open(file[:-4] + '.txt', 'w') as f:
		f.write(captions[i])
	i += 1
	