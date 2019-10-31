import slugifier from "slugify"; 
import uniqueSlugger from "unique-slug"; 

const slugText = text =>{
    return `${slugifier(text)}-${uniqueSlugger()}`;
}

export default slugText;