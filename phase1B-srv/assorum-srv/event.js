// implementation of event object
module.exports = {
    Event: function (name, description, location, date, association, img){
            this.id = "";
            this.name = name;
            this.description = description;
            this.location = location;
            this.date  = date;
            this.association = association;
            this.img = img;
    }
}
