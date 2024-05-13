import { setDefaultOptions } from "date-fns";
import { fr } from 'date-fns/locale';

//Config for date-fns
setDefaultOptions({
    weekStartsOn: 1,
    locale:  fr
})