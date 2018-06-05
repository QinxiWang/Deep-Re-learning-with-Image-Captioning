from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from collections import Counter
from collections import namedtuple
from datetime import datetime
import json
import os.path
import random
import sys
import threading
import numpy as np
from six.moves import xrange
import tensorflow as tf

data = np.genfromtxt('feedbacks.csv', delimiter=',', dtype=None)
id = data[1:,2]
filename = id
captions = data[1:, 4]
print(id)
print(captions)

dic = {}
images, annotations =[], {}
dic['images'] = []
dic['annotations'] = []

for i in range(len(id)):
    dic['images'].append({'id':id[i], 'file_name':id[i]})
    dic['annotations'].append({'image_id':id[i], 'caption':captions[i]})

with open('feedbacks.json', 'w') as fp:
    json.dump(dic, fp)