var publishData = require("./publishData");
var PublishItem = function (publishItem){
    this.publishItem = publishItem;

}
PublishItem.prototype.addContent = function(message, id, network, postType, fileName, url){
    var content = this.content;
    content.message = message;
    content.id = id;
    content.network = network;
    content.postType = postType;
    content.media = {fileName:fileName, url:url};
};

PublishItem.prototype.addTags = function(tag) {
    this.tags.push(tag);

};

PublishItem.prototype.addChannel = function(name, id) {
    var channels = this.channels;
    channels.push({name:name,id:id});
};

PublishItem.prototype.addGeoCountry = function(value, key) {
  this.geo.countries.push({value:value,key:key});
};

PublishItem.prototype.addGeoLanguage = function(value, key) {
  this.geo.languages.push({value:value, key:key});
};

PublishItem.prototype.addGeoCities = function(value, key) {
  this.geo.cities.push({value:value, key:key});
};

PublishItem.prototype.addGeoRegions = function(value, key) {
  this.geo.regions.push({value:value, key:key});
};


PublishItem.prototype.getData = function() {
    return publishData;
};
PublishItem.prototype.save = function() {
    publishData.push(this.publishItem);
};

module.exports = PublishItem;
