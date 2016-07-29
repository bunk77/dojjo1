/*We first queue all the assets to be downloaded.
Then we trigger the download for each asset.
We must wait until all of the assets are downloaded before proceeding.*/


function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.downloadQueue = [];
}

//Queue up the downloads
AssetManager.prototype.queueDownload = function (path) {
    console.log("Queueing " + path);
    this.downloadQueue.push(path);
}

//is it done? Either error out, or succeed.
AssetManager.prototype.isDone = function () {
    return this.downloadQueue.length === this.successCount + this.errorCount;
}


//When we are ready to kick off the downloads.
//This loops through all the entities
AssetManager.prototype.downloadAll = function (callback) {

    /*
    var x = 0, y = 0;
    var sprite = ASSET_MANAGER.getAsset('img.earth.png');
    //to move coordinate system to center of canvas

    ctx.translate(canvas.width/2, canvas.height/2);

    // to draw image centered
    ctx.drawImage(sprite, x - sprite.width/2, y - spite.height/2);
    */

    for (var i = 0; i < this.downloadQueue.length; i++) {
        var img = new Image();
        var that = this;

        var path = this.downloadQueue[i];
        console.log(path);

        img.addEventListener("load", function () {
            console.log("Loaded " + this.src);
            that.successCount++;
            if(that.isDone()) callback();
        });

        img.addEventListener("error", function () {
            console.log("Error loading " + this.src);
            that.errorCount++;
            if (that.isDone()) callback();
        });

        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}