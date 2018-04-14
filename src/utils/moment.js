import * as moment from 'moment';

moment.updateLocale('fr', {
  weekdaysShort: 'Dim._Lun._Mar._Mer._Jeu._Ven._Sam.'.split('_'),
});

export default moment;
