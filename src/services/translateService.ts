import ApiTranslate from "../api/ApiTranslate";
import { FromLanguage, Language } from "../types";


interface Props{
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}

export const translateService = async({fromLanguage, toLanguage, text}:Props) => {

    if (fromLanguage === toLanguage) return text

    try {
      const {data} = await ApiTranslate.post('/', {fromLanguage, toLanguage, text}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
    // console.log(data)
    return data.result
    } catch (error) {
      console.error(error);
    }

   
}