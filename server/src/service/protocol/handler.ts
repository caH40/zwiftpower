import { handlerCatchUp } from './catchup.js';
import { handlerClassicCommon } from './classic-common.js';
import { handlerNewbies } from './newbies/newbies.js';

// types
import { HandlerProtocolArg } from '../../types/types.interface.js';

// выбор соответствующего обработчика результатов согласно типу гонки
export async function handlerProtocol({
  eventId,
  results,
  typeRaceCustom,
}: HandlerProtocolArg) {
  switch (typeRaceCustom) {
    case 'catchUp':
      await handlerCatchUp({ eventId, results });
      break;
    case 'newbies':
      await handlerNewbies({ eventId, results });
      break;
    default: // для всех остальных обрабатывать как 'classicCommon'
      await handlerClassicCommon({ eventId, results });
  }
}
