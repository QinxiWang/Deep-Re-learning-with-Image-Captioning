# Deep-Re-learning-with-Image-Captioning

This project explores the task of image captioning through a deep learning and a collective intelligence approach. We are interested in how effectively and accurately our model can generate captioning for any input image, and also takes in feedback of the result, and improves the performance. After generating captions for images using the LSTM model, We then created a Twitterbot using NodeJS’s Twit to get user feedback on these captions which we then can run back through our model to generate better captions!


Dependencies and Requirements:

-Tensorflow (pip)
-Bazel (use binary installer)
	-nltk for python (pip)
	-Inception V3, can be obtained using the following command:
	wget "http://download.tensorflow.org/models/inception_v3_2016_08_28.tar.gz"
	tar -xvf "inception_v3_2016_08_28.tar.gz" -C ${path_you_want_to_place_it}
	rm "inception_v3_2016_08_28.tar.gz"
	-im2txt model (at https://github.com/tensorflow/models/tree/master/research/im2txt)
	-Pretrained model (download at https://github.com/KranthiGV/Pretrained-Show-and-Tell-model)
	-(Optional: MSCOCO dataset)


Instructions on how to run the program:
I. Build the model
    cd im2txt/
    INCEPTION_DIR="${HOME}/path you placed the inception_v3.ckpt"
    MODEL_DIR="${HOME}/your path to the pretrained model"

    bazel build -c opt //im2txt/…
                 
Optional(if you have MSCOCO data and want to train more on your own):
COCO_DIR=(where you place your MSCOCO datasets in the correct tf format)
    
            bazel-bin/im2txt/train \
         --input_file_pattern="${COCO_DIR}/train-?????-of-00256" \
          --inception_checkpoint_file="${INCEPTION_CHECKPOINT}" \
         --train_dir="${MODEL_DIR}/train" \
         --train_inception=false \
          --number_of_steps= number of steps you want to train on


II. Generate captions on any given image

    cd im2txt/
CHECKPOINT_PATH="${HOME}/your path to the trained model"
VOCAB_FILE=""${HOME}/your path to the word_counts.txt in trained model"
IMAGE_FILE="${HOME}/your path to the image"

    bazel build -c opt //im2txt:run_inference

    bazel-bin/im2txt/run_inference \
      --checkpoint_path=${CHECKPOINT_PATH} \
     --vocab_file=${VOCAB_FILE} \
      --input_files=${IMAGE_FILE}


III. Incorporate new data and train the previous model checkpoint

    i.After you download the user feedbacks from the surveys as a csv file:
        Run feedbackConverter on the feeback.csv file
        Run tfrecordConverter on the output of the feedbackConverter 
(in the code replace the path to the files with your own path)
        
    ii then in im2txt directory run:

    DATA_DIR="${HOME}/your path to the tf_record file generated by tfrecordConverter"
MODEL_DIR="${HOME}/your path to the model"

bazel-bin/im2txt/train \
  --input_file_pattern="${DATA_DIR}/train-?????-of-00256" \
  --train_dir="${MODEL_DIR}" \
  --train_inception=true \
  --number_of_steps=200 #or any number of steps you want to iterate on

    The training will cumulatively save to on your previous model checkpoint on each iteration, so after the new training you can generate the captions following the same steps as in II.
