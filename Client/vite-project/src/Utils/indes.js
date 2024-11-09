// import {surpriseMePrompts} from '../constants';
import FileSaver from 'file-saver';
export function getRandomPrompt (prompt){
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    const randompromt = surpriseMePrompts[randomIndex];

    if(randompromt===prompt){
        return getRandomPrompt(prompt)
    }

    return randompromt
} 

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpeg`);
}