import * as m from 'moment';

m.updateLocale('fr', { weekdaysShort: 'Dim._Lun._Mar._Mer._Jeu._Ven._Sam.'.split('_') });

export const moment = m;
export default { moment };
