let twoDigitsLanguage = (lang)=>{
    let language = lang
    switch(language){
    case 'arabic':
    language = 'ar';
    break;
    case 'danish':
    language = 'da';
    break;
    case 'french':
    language = 'fr';
    break;
    case 'german':
    language = 'de';
    break;
    case 'greek':
    language = 'el';
    break;
    case 'hebrew':
    language = 'he';
    break;
    case 'italian':
    language = 'it';
    break;
    case 'norwegian':
    language = 'no';
    break;
    case 'portuguese':
    language = 'pt';
    break;
    case 'romanian':
    language = 'ro';
    break;
    case 'russian':
    language = 'ru';
    break;
    case 'serbian':
    language = 'sr';
    break;
    case 'spanish':
    language = 'es';
    break;
    case 'turkish':
    language = 'tr';
    break;
    case 'ukranian':
    language = 'uk';
    break;
    case 'basque':
    language = 'eu';
    break;
    case 'catalan':
    language = 'ca';
    break;
    case 'chinese':
    language = 'zh';
    break;
    default:
    language = 'en';
    break;
    }
    return lang
}