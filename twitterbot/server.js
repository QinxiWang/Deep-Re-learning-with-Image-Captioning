// Based on https://botwiki.org/resource/tutorial/random-image-tweet/

var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

var current_index = 0;

function upload_image(image){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/images/' + image),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('Now tweeting it...');
      console.log(current_index);

      fs.readFile(path.join(__dirname, '/captions/' + captions[current_index]), (err, description) => {
	      T.post('statuses/update', {
	        media_ids: new Array(data.media_id_string),
	        status: "Caption: " + description + "\nImage ID: " + image + "\nHow did we do? Help us improve! https://goo.gl/forms/2xHptdrk7JTJbOI83",

	      },
	        function(err, data, response) {
	          if (err){
	            console.log('ERROR:');
	            console.log(err);
	          }
	          else{
	            console.log('Posted an image!');
	            current_index ++;
	          }
	        }
	      );
      });
    }
  });
}

var captions = []

fs.readdir(__dirname + '/captions', function(err, files) {
  if (err){
    console.log(err);
  }
  else{
    files.forEach(function(f) {
      captions.push(f);
    });
  }
});


fs.readdir(__dirname + '/images', function(err, files) {
  if (err){
    console.log(err);
  }
  else{
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });

    setInterval(function(){
      upload_image(images[current_index]);
    }, 32727);
  }
});
