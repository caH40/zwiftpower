import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setRaceResultsPage } from '../../../../redux/features/filterRaceResultsPageSlice';
import { raceResultsBtn } from '../../../../assets/navigate-buttons';

/**
 * Выбор отображения страницы с результатами Эвента: финишировавших или сошедших райдеров
 */
function FilterPageRaceResults() {
  const intervalState = useSelector((state) => state.filterRaceResultsPage.value);

  const quantityButtonsInterval = raceResultsBtn.length;
  return (
    <nav>
      {raceResultsBtn.map((pageNested, index) => {
        return (
          <ButtonForFilter
            key={pageNested.id}
            position={cn({
              left: index === 0,
              center:
                index !== 0 &&
                quantityButtonsInterval > 2 &&
                index + 1 !== quantityButtonsInterval,
              right: index !== 0 && index + 1 === quantityButtonsInterval,
            })}
            active={intervalState.name === pageNested.name}
            reducer={setRaceResultsPage}
          >
            {pageNested.name}
          </ButtonForFilter>
        );
      })}
    </nav>
  );
}

export default FilterPageRaceResults;
