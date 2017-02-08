/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res, next) {
		var device = req.param("device");
        if (device == "ios" || device == "android") {
            File.find().exec(function foundFiles(err, files) {
                if (err) next(err);
                return res.json(files);
            });
        } else {
            return res.json({"result":"Error! Device type is not compatible with this web service."})
        }
	},

	upload: function (req, res) {
		var allowedExts = ['mp4'];
		// need to check extension before upload

		req.file('file').upload({ dirname: './videos', maxBytes: 52428800 }, function (err, files) {
			if (err) return res.json({message: 'Server error! Could not upload the file.'});
			var  extension = files[0].filename.split('.').pop();
			if (!allowedExts.includes(extension)) return res.json({message: '.' + extension + ' extension not allowed.'});
			console.log(files[0].fd);
			var uploadedFilename = files[0].fd.split('/').reverse()[0];
			
			var object = {
				Filename: files[0].filename,
	  			Pathname: uploadedFilename
	  		};

	  		File.create(object).exec(function createFile(err, file) {
                if (err) next(err);
                //console.log(station);

                var ffmpeg = require('fluent-ffmpeg');
                ffmpeg(files[0].fd).setStartTime('00:00:00').setDuration(10).output('/Users/abu/Sites/test-project/assets/uploads/'+uploadedFilename)
                .on('end', function (err) {
                	if (!err) console.log('Conversion Complete.');
                })
                .on('error', function (err) {
                	console.log('error: ' + err);
                }).run();

                res.json(file);
            })
		})
	},

	getAVideo: function (req, res) {
		var device = req.param("device");
		if (device == "ios" || device == "android") {
			File.find().exec(function foundFiles(err, files) {
                if (err) next(err);
                
                var obj = {
                	Filename: files[0].Filename,
                	Pathname: sails.getBaseUrl()+'/uploads/'+files[0].Pathname
                };
                return res.json(obj);
            });
		}
	}
};

