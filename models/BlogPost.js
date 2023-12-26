const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
//slug = plugin used to generate a slug for a given string

const domPurify = require('dompurify');
//dompurify = plugin used to sanitize the html
const {JSDOM} = require('jsdom');
//JSDOM = plugin used to parse the html
const htmlPurify= domPurify(new JSDOM().window);
//htmlPurify = plugin used to sanitize the html

let stripHtml;
import('string-strip-html')
  .then(module => {
    stripHtml = module.default;
    // Use stripHtml as needed within this scope
  })
  .catch(err => {
    // Handle any import errors here
    console.error('Error during dynamic import:', err);
  });
//stripHtml = function that strips html tags from a string

// Initialising slug
mongoose.plugin(slug);
//mongoose.plugin = method used to add a plugin to a model.

// Create a new schema
const blogSchema = new mongoose.Schema({
    //mongoose.Schema = create a new schema
    title: {
        type: String,
        required: true,
    },
    metaDescription:{
        type: String,
    },
    author:{
        type: String,
        required: true,
    },
    twitter:{
        type: String,
        required: true,
    },
    instagram:{
        type: String,
        required: true,
    },
    website:{
        type: String,
    },
    aboutAuthor:{
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    timeCreated: {
        //virtual field
        type: Date,
        default: () => Date.now(),
    },
    snippet:{
        type: String,
    },
    img:{
        type: String,
    },
    slug: {
        type: String,
        slug: 'title',
        //slug will be generated from the title
        unique: true,
        //slug will be unique for each blog
        slug_padding_size:2
        //number of digits to be added to the slug
    },
    likeCount: {
        type: Array,
    },
    tags: {
        type: Array,
    },
    metaKeywords:{
        type: String,
    }
});

blogSchema.pre('validate', function (next) {
    if(this.description){
            
        this.description = htmlPurify.sanitize(this.description);
        this.snippet = stripHtml(this.description.substring(0, 200)).result;
  }

    next();
})

module.exports = mongoose.model('BlogPost', blogSchema);
