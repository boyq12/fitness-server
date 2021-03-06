"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
const config = require("libs/config");
const misc_1 = require("libs/misc");
const request_1 = require("request");
const sharp = require("sharp");
const schemas_1 = require("schemas");
class ImageHelper {
    async resize(file) {
        try {
            //noinspection TypeScriptUnresolvedVariable
            let imageSizeCfg = config.image_size;
            let imageSizes = {
                large: imageSizeCfg && imageSizeCfg.large || 520,
                medium: imageSizeCfg && imageSizeCfg.medium || 460,
                small: imageSizeCfg && imageSizeCfg.small || 240,
                thumbnail: imageSizeCfg && imageSizeCfg.thumbnail || 100
            };
            if (!file || !file.path)
                throw {
                    message: 'file not found'
                };
            file.resizedName = {};
            for (let sizeName of Object.keys(imageSizes)) {
                let size = imageSizes[sizeName];
                await sharp(file.path)
                    .resize(size)
                    .jpeg()
                    .toFile(`${file.destination}${file.filename}_${size}.jpg`);
                file.resizedName[sizeName] = `${file.filename}_${size}.jpg`;
            }
            // convert origin image to jpeg
            await sharp(file.path)
                .jpeg()
                .toFile(`${file.destination}${file.filename}.jpg`);
            file.filename = `${file.filename}.jpg`;
            try {
                fs.unlinkSync(file.path);
            }
            catch (e) {
                throw e;
            }
            return file;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async downloadImage(imageUrl) {
        console.log("DOWNLOADING: ", imageUrl);
        return new Promise((resolve, reject) => {
            let NOW = new Date().getTime();
            let fileName = misc_1.default.sha1(NOW.toString());
            let path = `${(config.dictionary && config.directory.image) || "public/uploads"}/${fileName}.png`;
            var transformer = sharp()
                .png()
                .toFile(path, function (err, info) {
                if (err) {
                    console.log(imageUrl, "=>", imageUrl);
                    reject(err);
                }
                else {
                    resolve({
                        filename: `${fileName}`,
                        type: 'png',
                        path: path,
                        destination: `${(config.dictionary && config.directory.image) || "public/uploads"}/`
                    });
                }
            });
            request_1.default(imageUrl).on('error', function (err) {
                reject(err);
            })
                .pipe(transformer);
        });
    }
    async createImageObject(src, f_image) {
        let image_resize = await this.resize(f_image);
        let f = {
            title: image_resize.originalname,
            src: `${src}/${f_image.filename}`,
        };
        for (let sizeName of Object.keys(image_resize.resizedName)) {
            f[sizeName] = `${src}/${image_resize.resizedName[sizeName]}`;
        }
        return f;
    }
    async createImage(src, f_image) {
        let f = await this.createImageObject(src, f_image);
        let i_file = await schemas_1.schemas.Image.create(f);
        return i_file;
    }
}
exports.ImageHelper = ImageHelper;
const imageHelper = new ImageHelper();
exports.default = imageHelper;

//# sourceMappingURL=image-helper.js.map
